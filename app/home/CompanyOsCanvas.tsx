"use client";

import { useEffect, useRef, useState } from "react";
import type { CompanyOsScene, SceneQuality } from "./three/companyOsScene";

/** the roles in the scene, in the order the scene places them */
const ROLE_LABELS = ["エンジニア", "PM", "経営", "営業"];
const ENGINEER = 0;
const PM = 1;
const EXEC = 2;
const SALES = 3;

/**
 * What appears beside a person while a beat plays. What they said, in
 * brackets, and under it what Company OS sent back, marked as such — never a
 * chat window. The role name is on the node already, so it is not repeated.
 * `step` is the index into STEP_AT; `role` is where it sits.
 */
type SayLine = { kind: "q" | "os" | "human"; text: string };
const SAYS: { step: number; role: number; lines: SayLine[] }[] = [
  {
    step: 0,
    role: SALES,
    lines: [
      { kind: "q", text: "この機能、いまどうなってますか?" },
      { kind: "os", text: "根拠付きで回答" },
    ],
  },
  { step: 1, role: ENGINEER, lines: [{ kind: "q", text: "仕様はAかBか。どちらで進めますか?" }] },
  { step: 1, role: PM, lines: [{ kind: "os", text: "背景・選択肢・影響を添えて" }] },
  {
    step: 2,
    role: PM,
    lines: [
      { kind: "os", text: "営業の知る顧客の事情を添えて" },
      { kind: "human", text: "Bで進める。" },
    ],
  },
  { step: 2, role: EXEC, lines: [{ kind: "os", text: "決定を通知" }] },
  { step: 3, role: ENGINEER, lines: [{ kind: "os", text: "決定Bと理由を、仕様・タスクに" }] },
  // the raw voice from the field, and the decision, reach the executive together
  { step: 4, role: ENGINEER, lines: [{ kind: "q", text: "Bだと、納期は厳しいかもしれない" }] },
  {
    step: 4,
    role: EXEC,
    lines: [
      { kind: "q", text: "現場は、本当に順調か" },
      { kind: "os", text: "経緯と現場の声を、そのまま" },
    ],
  },
];

/**
 * The pinned section runs in three phases.
 *
 *   0.00–0.30  OVERVIEW  the whole picture, centred, with a headline and
 *                        nothing else. Scrolling a screen and a half adds not
 *                        one line of body text — you get to look first.
 *   0.30–0.34  SHIFT     the composition moves aside and shrinks
 *   0.34–1.00  EXPLAIN   the text column appears and the story is walked
 */
const SHIFT_FROM = 0.3;
const SHIFT_TO = 0.34;
/** the scene goes out from here; then the last beat takes the middle of the screen */
const FADE_FROM = 0.9;
const CLOSE_FROM = 0.935;
const STEP_AT = [0.34, 0.46, 0.58, 0.7, 0.8, 0.9];

const clamp = (v: number, a = 0, b = 1) => Math.min(b, Math.max(a, v));
const easeInOut = (u: number) => (u < 0.5 ? 4 * u * u * u : 1 - Math.pow(-2 * u + 2, 3) / 2);

function pickQuality(): SceneQuality | null {
  if (typeof window === "undefined") return null;
  const nav = navigator as Navigator & { deviceMemory?: number; connection?: { saveData?: boolean } };
  if (nav.connection?.saveData) return null;
  try {
    if (!document.createElement("canvas").getContext("webgl2")) return null;
  } catch {
    return null;
  }
  const mem = nav.deviceMemory ?? 8;
  const narrow = window.matchMedia("(max-width: 880px)").matches;
  if (mem <= 4 || narrow) return "low";
  if (mem <= 8) return "mid";
  return "high";
}

export function CompanyOsCanvas() {
  const hostRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const labelRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const sayRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    const host = hostRef.current;
    if (!canvas || !host) return;
    const section = canvas.closest<HTMLElement>(".wv-os");
    if (!section) return;

    const reduceQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const quality = reduceQuery.matches ? null : pickQuality();
    if (!quality) {
      section.dataset.osScene = "off";
      return;
    }

    // Below 881px the CSS drops the sticky pin. There the scene is a block in
    // normal flow above the text — it never shares space with the words.
    const pinned = window.matchMedia("(min-width: 881px)").matches;
    const HELD_P = 0.2;

    let scene: CompanyOsScene | null = null;
    let raf = 0;
    let alive = true;
    let onScreen = false;
    const started = performance.now();
    const projected = Array.from({ length: ROLE_LABELS.length }, () => ({
      x: 0,
      y: 0,
      depth: 0,
      visible: false,
      dim: 0,
      r: 0,
    }));
    const coreXY = { x: 0, y: 0, r: 0 };
    let activeStep = -2;
    let phase = "";
    let sceneAlpha = 0;

    const stepEls = Array.from(section.querySelectorAll<HTMLElement>(".wv-os__steps li"));
    const indexEls = Array.from(section.querySelectorAll<HTMLElement>(".wv-os__index li"));
    const overviewEl = section.querySelector<HTMLElement>(".wv-os__overview");
    const copyEl = section.querySelector<HTMLElement>(".wv-os__copy");

    const frame = () => {
      if (!alive || !scene) return;

      /* ---- read ---- */
      const rect = section.getBoundingClientRect();
      const vh = window.innerHeight;
      const vw = canvas.clientWidth || 1;
      const travel = Math.max(1, rect.height - vh);
      const p = pinned ? clamp(-rect.top / travel) : HELD_P;
      const shift = pinned ? easeInOut(clamp((p - SHIFT_FROM) / (SHIFT_TO - SHIFT_FROM))) : 0;
      const time = (performance.now() - started) / 1000;
      // whichever block of words is on screen right now — measured, not guessed
      const textBox = (shift > 0.5 ? copyEl : overviewEl)?.getBoundingClientRect();

      scene.render(p, time, shift);
      scene.projectRoles(projected);
      scene.projectCore(coreXY);

      /* ---- write ---- */
      // one step open at a time — the list can never outgrow the pinned screen
      if (pinned) {
        let next = -1;
        for (let i = 0; i < STEP_AT.length; i++) if (p >= STEP_AT[i]) next = i;
        if (next !== activeStep) {
          activeStep = next;
          stepEls.forEach((el, i) => el.classList.toggle("is-active", i === next));
          indexEls.forEach((el, i) => el.classList.toggle("is-active", i === next));
        }
      }
      const nextPhase = !pinned
        ? "static"
        : p < SHIFT_FROM
          ? "overview"
          : p < SHIFT_TO
            ? "shift"
            : p < CLOSE_FROM
              ? "explain"
              : "closing";
      if (nextPhase !== phase) {
        phase = nextPhase;
        section.dataset.osPhase = nextPhase;
      }

      // Role names live in the DOM, never in the scene. A label that would land
      // on the words is dropped instead — the box is measured each frame, so it
      // holds whatever the text reflows to.
      const pad = 14;
      const onWords = (x: number, y: number) =>
        !!textBox &&
        x > textBox.left - pad &&
        x < textBox.right + pad &&
        y > textBox.top - pad &&
        y < textBox.bottom + pad;
      const shown: { x: number; y: number }[] = [];
      for (let i = 0; i < ROLE_LABELS.length; i++) {
        const el = labelRefs.current[i];
        if (!el) continue;
        const q = projected[i];
        // also keep labels off the edges of the window, where they get clipped
        let visible =
          pinned &&
          sceneAlpha > 0.85 &&
          q.visible &&
          p > 0.1 &&
          q.x > 74 &&
          q.x < vw - 74 &&
          q.y > 90 &&
          q.y < vh - 40 &&
          !onWords(q.x, q.y);
        // two labels on top of each other is worse than one label missing
        if (visible) {
          for (const s of shown) {
            if (Math.abs(s.x - q.x) < 78 && Math.abs(s.y - q.y) < 30) {
              visible = false;
              break;
            }
          }
        }
        if (visible) shown.push({ x: q.x, y: q.y });
        // nearer the camera, larger: the person the beat is about is close
        const s = clamp(9.5 / Math.max(1, q.depth), 0.8, 1.9);
        el.style.fontSize = `${(12 * s).toFixed(1)}px`;
        // the name sits just above the point, never on it
        // the name sits outside the ring, which grows with the person: above
        // for those behind the hub, below for whoever has come to the front,
        // so it never lands on the threads
        const below = q.y > coreXY.y + 20;
        // measured from the ring's edge, whatever size it is on this screen
        const gap = q.r + 14;
        el.style.transform = below
          ? `translate3d(${Math.round(q.x)}px, ${Math.round(q.y + gap)}px, 0) translate(-50%, 0)`
          : `translate3d(${Math.round(q.x)}px, ${Math.round(q.y - gap)}px, 0) translate(-50%, -100%)`;
        el.style.opacity = visible ? String(1 - q.dim * 0.65) : "0";
      }

      // The words beside a person. Tried to the right of the point, then to
      // the left, then under it, then over it; the first place that stays on
      // screen and off both the words and the core wins. If none does, the
      // line is not shown — a line across the threads is worse than no line.
      // Only the beat that is playing shows its lines.
      const onCore = (x: number, y: number, w: number, h: number) => {
        const nx = clamp(coreXY.x, x, x + w);
        const ny = clamp(coreXY.y, y, y + h);
        return Math.hypot(nx - coreXY.x, ny - coreXY.y) < coreXY.r + 6;
      };
      for (let i = 0; i < SAYS.length; i++) {
        const el = sayRefs.current[i];
        if (!el) continue;
        const say = SAYS[i];
        const q = projected[say.role];
        const s = clamp(9.5 / Math.max(1, q.depth), 0.85, vw < 1100 ? 1.15 : 1.45);
        el.style.fontSize = `${(13.5 * s).toFixed(1)}px`;
        const w = el.offsetWidth || 220;
        const h = el.offsetHeight || 40;
        let x = 0;
        let y = 0;
        let placed = false;
        if (pinned && activeStep === say.step && sceneAlpha > 0.85 && q.visible) {
          // the centred spots slide sideways to clear the words and the edges
          const cx = clamp(q.x - w / 2, Math.max(24, (textBox?.right ?? 0) + pad), vw - 24 - w);
          // room between the ring's edge and the words, whatever size the
          // ring is on this screen
          const off = q.r + 36;
          const spots: [number, number][] = [
            [q.x + off, q.y - h / 2 + 4],
            [q.x - off - w, q.y - h / 2 + 4],
            [cx, q.y + off + 10],
            [cx, q.y - off - 20 - h],
          ];
          for (const [sx, sy] of spots) {
            if (sx < 24 || sx + w > vw - 24 || sy < 90 || sy + h > vh - 24) continue;
            if (onWords(sx, sy + h / 2) || onWords(sx + w, sy + h / 2)) continue;
            if (onCore(sx, sy, w, h)) continue;
            x = sx;
            y = sy;
            placed = true;
            break;
          }
        }
        if (placed) el.style.transform = `translate3d(${Math.round(x)}px, ${Math.round(y)}px, 0)`;
        el.style.opacity = placed ? "1" : "0";
      }

      if (pinned) {
        // The scene is position:fixed and covers the whole viewport, so it must
        // stay invisible until this section actually owns the screen — the pin
        // only fills it once rect.top reaches 0. Fading in any earlier paints
        // navy (and role labels) over the section above.
        sceneAlpha = Math.min(clamp((320 - rect.top) / 320), clamp(rect.bottom / 320));
        // the scene goes out behind the closing words
        const fade = 1 - easeInOut(clamp((p - FADE_FROM) / 0.05));
        host.style.opacity = String(sceneAlpha * fade);
      }

      raf = requestAnimationFrame(frame);
    };

    const stop = () => {
      cancelAnimationFrame(raf);
      raf = 0;
    };
    const start = () => {
      if (!raf && alive && scene) raf = requestAnimationFrame(frame);
    };

    const io = new IntersectionObserver(
      ([entry]) => {
        onScreen = entry.isIntersecting;
        if (onScreen) start();
        else {
          stop();
          if (pinned) host.style.opacity = "0";
        }
      },
      { rootMargin: "20% 0px" },
    );

    const onVisibility = () => (document.hidden ? stop() : onScreen && start());
    let ro: ResizeObserver | null = null;

    import("./three/companyOsScene")
      .then(({ mountCompanyOsScene }) => {
        if (!alive) return;
        scene = mountCompanyOsScene({
          canvas,
          quality,
          onContextLost: () => {
            alive = false;
            stop();
            setFailed(true);
          },
        });
        section.dataset.osScene = pinned ? "on" : "static";
        io.observe(section);
        ro = new ResizeObserver(() => scene?.resize());
        ro.observe(canvas);
        document.addEventListener("visibilitychange", onVisibility);
        start();
      })
      .catch(() => {
        if (alive) setFailed(true);
      });

    return () => {
      alive = false;
      stop();
      io.disconnect();
      ro?.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
      scene?.dispose();
      delete section.dataset.osScene;
      delete section.dataset.osPhase;
      stepEls.forEach((el) => el.classList.remove("is-active"));
    };
  }, []);

  useEffect(() => {
    if (!failed) return;
    const section = hostRef.current?.closest<HTMLElement>(".wv-os");
    if (section) section.dataset.osScene = "off";
  }, [failed]);

  return (
    <div className="wv-os__scene" ref={hostRef} aria-hidden="true">
      <div className="wv-os__field" />
      {!failed && <canvas ref={canvasRef} className="wv-os__canvas" />}
      <div className="wv-os__labels">
        {ROLE_LABELS.map((role, i) => (
          <span
            key={role}
            className="wv-os__role"
            ref={(el) => {
              labelRefs.current[i] = el;
            }}
          >
            {role}
          </span>
        ))}
        {SAYS.map((say, i) => (
          <div
            key={`${say.step}-${say.role}`}
            className="wv-os__say"
            ref={(el) => {
              sayRefs.current[i] = el;
            }}
          >
            {say.lines.map((line) => (
              <span key={line.text} className={`is-${line.kind}`}>
                {line.text}
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
