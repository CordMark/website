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
 * A "\n" in a reply is where it breaks — a card should never break mid-word.
 * `step` is the index into STEP_AT; `role` is where it sits.
 */
type SayLine = { kind: "q" | "os" | "human"; text: string; /** shown from this p on; else from the beat's start */ at?: number };
const SAYS: { step: number; role: number; lines: SayLine[] }[] = [
  {
    step: 0,
    role: SALES,
    lines: [
      { kind: "q", text: "これって、できないんでしたっけ?" },
      { kind: "os", text: "いまの仕様と実装を確認。\n根拠付きで、その場で回答" },
    ],
  },
  { step: 1, role: ENGINEER, lines: [{ kind: "q", text: "仕様はAかBか。決めてほしい" }] },
  { step: 1, role: PM, lines: [{ kind: "os", text: "なぜ必要か、選択肢、選んだ先の影響を\n添えて、PMへ" }] },
  {
    step: 2,
    role: PM,
    lines: [
      { kind: "os", text: "営業の知る顧客の事情も揃えて" },
      // the moment the PM presses — the warm ring in the scene
      { kind: "human", text: "Bで進める。", at: 0.655 },
    ],
  },
  // only once the ping has crossed from the hub to the executive
  { step: 2, role: EXEC, lines: [{ kind: "os", text: "決定と理由を通知", at: 0.715 }] },
  { step: 3, role: ENGINEER, lines: [{ kind: "os", text: "決定Bと理由が、仕様とタスクに" }] },
  // the raw voice from the field reaches the hub, which brings the one thing
  // nobody wrote in a report to the executive — who calls the priority
  { step: 4, role: ENGINEER, lines: [{ kind: "q", text: "Bは進んでる。Cは、まだ誰も決めてない" }] },
  {
    step: 4,
    role: EXEC,
    lines: [
      { kind: "os", text: "Cは判断待ちで四日。\n止めている問いと経緯を、そのまま", at: 0.862 },
      { kind: "human", text: "Cが止まっているほうが、まずい。", at: 0.88 },
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
const STEP_AT = [0.34, 0.46, 0.58, 0.73, 0.8, 0.9];

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
  // a phone draws a small canvas, so "mid" (a sharper pixel ratio) is cheap
  // there; "low" is kept for the machines that report little memory
  const narrow = window.matchMedia("(max-width: 880px)").matches;
  if (mem <= 4) return "low";
  if (mem <= 8 || narrow) return "mid";
  return "high";
}

export function CompanyOsCanvas() {
  const hostRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const labelRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const sayRefs = useRef<(HTMLDivElement | null)[]>([]);
  const sceneRef = useRef<CompanyOsScene | null>(null);
  const [failed, setFailed] = useState(false);
  // 881px を跨ぐと、横並び(左上に文、右に場面)と縦積み(上に場面、下に文)が
  // 入れ替わる。State にしておくと Effect ごと組み直され、後片付けが走ってから
  // 正しい側で建て直る。どちらでも節は固定され、Scrollで物語が進む
  const [stacked, setStacked] = useState(false);

  useEffect(() => {
    const q = window.matchMedia("(max-width: 880px)");
    // resize も見るのは、環境によって matchMedia の change が飛ばないため。
    // setStacked は同じ値なら React が捨てるので、拾いすぎても害はない
    const sync = () => setStacked(q.matches);
    sync();
    q.addEventListener("change", sync);
    window.addEventListener("resize", sync, { passive: true });
    return () => {
      q.removeEventListener("change", sync);
      window.removeEventListener("resize", sync);
    };
  }, []);

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
      const p = clamp(-rect.top / travel);
      const shift = easeInOut(clamp((p - SHIFT_FROM) / (SHIFT_TO - SHIFT_FROM)));
      const time = (performance.now() - started) / 1000;
      // whichever block of words is on screen right now — measured, not guessed
      const textBox = (shift > 0.5 ? copyEl : overviewEl)?.getBoundingClientRect();

      scene.render(p, time, shift);
      scene.projectRoles(projected);
      scene.projectCore(coreXY);

      /* ---- write ---- */
      // one step open at a time — the list can never outgrow the pinned screen
      let next = -1;
      for (let i = 0; i < STEP_AT.length; i++) if (p >= STEP_AT[i]) next = i;
      if (next !== activeStep) {
        activeStep = next;
        stepEls.forEach((el, i) => el.classList.toggle("is-active", i === next));
        indexEls.forEach((el, i) => el.classList.toggle("is-active", i === next));
      }
      const nextPhase =
        p < SHIFT_FROM ? "overview" : p < SHIFT_TO ? "shift" : p < CLOSE_FROM ? "explain" : "closing";
      if (nextPhase !== phase) {
        phase = nextPhase;
        section.dataset.osPhase = nextPhase;
      }

      // Role names live in the DOM, never in the scene. A label that would land
      // on the words is dropped instead — the box is measured each frame, so it
      // holds whatever the text reflows to.
      const pad = stacked ? 10 : 14;
      // a phone has no margin to spare: labels may come closer to the edges
      const edge = stacked ? 36 : 74;
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
          sceneAlpha > 0.85 &&
          q.visible &&
          p > 0.1 &&
          q.x > edge &&
          q.x < vw - edge &&
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
        const s = clamp(9.5 / Math.max(1, q.depth), 0.8, stacked ? 1.35 : 1.9);
        el.style.fontSize = `${((stacked ? 11 : 12) * s).toFixed(1)}px`;
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
        const s = clamp(9.5 / Math.max(1, q.depth), 0.85, stacked ? 1.0 : vw < 1100 ? 1.15 : 1.45);
        el.style.fontSize = `${((stacked ? 12.5 : 13.5) * s).toFixed(1)}px`;
        const w = el.offsetWidth || 220;
        const h = el.offsetHeight || 40;
        const m = stacked ? 16 : 24;
        let x = 0;
        let y = 0;
        // lines with their own moment come on when p reaches it; a card whose
        // lines are all still to come is not shown, tick and all
        let anyOn = false;
        for (let j = 0; j < say.lines.length; j++) {
          const on = say.lines[j].at === undefined || p >= (say.lines[j].at as number);
          const child = el.children[j] as HTMLElement | undefined;
          if (child && child.classList.contains("is-on") !== on) child.classList.toggle("is-on", on);
          anyOn ||= on;
        }
        let placed = false;
        if (anyOn && activeStep === say.step && sceneAlpha > 0.85 && q.visible) {
          // the centred spots slide sideways to clear the words and the edges.
          // Stacked, the words are under the scene, not beside it, so only the
          // window's edges push the spot about
          const cx = clamp(q.x - w / 2, stacked ? m : Math.max(m, (textBox?.right ?? 0) + pad), vw - m - w);
          // room between the ring's edge and the words, whatever size the
          // ring is on this screen
          const off = q.r + (stacked ? 22 : 36);
          // the role name hangs off one side of the ring; the words go past it
          const labelBelow = q.y > coreXY.y + 20;
          const lh = (labelRefs.current[say.role]?.offsetHeight || 16) + 10;
          const spots: [number, number][] = stacked
            ? [
                // under or over the person first: a phone is taller than it is wide
                [cx, q.y + off + (labelBelow ? lh : 0)],
                [cx, q.y - off - 12 - h - (labelBelow ? 0 : lh)],
                [q.x + off, q.y - h / 2 + 4],
                [q.x - off - w, q.y - h / 2 + 4],
              ]
            : [
                // beside the person, the card's top a little above the ring's
                // middle — the label line lands level with the point
                [q.x + off, q.y - Math.min(h / 2, 22)],
                [q.x - off - w, q.y - Math.min(h / 2, 22)],
                // under or over: past the role name, which hangs off the ring
                [cx, q.y + off + 6 + (labelBelow ? lh : 0)],
                [cx, q.y - off - 16 - h - (labelBelow ? 0 : lh)],
              ];
          // which way the words sit from the person, in the order tried above
          const sides = stacked ? ["under", "over", "right", "left"] : ["right", "left", "under", "over"];
          for (let k = 0; k < spots.length; k++) {
            const [sx, sy] = spots[k];
            if (sx < m || sx + w > vw - m || sy < 90 || sy + h > vh - 24) continue;
            if (onWords(sx, sy + h / 2) || onWords(sx + w, sy + h / 2)) continue;
            if (onCore(sx, sy, w, h)) continue;
            x = sx;
            y = sy;
            placed = true;
            if (el.dataset.side !== sides[k]) el.dataset.side = sides[k];
            break;
          }
        }
        if (placed) el.style.transform = `translate3d(${Math.round(x)}px, ${Math.round(y)}px, 0)`;
        el.style.opacity = placed ? "1" : "0";
      }

      // The scene is position:fixed and covers the whole viewport, so it must
      // stay invisible until this section actually owns the screen — the pin
      // only fills it once rect.top reaches 0. Fading in any earlier paints
      // navy (and role labels) over the section above.
      sceneAlpha = Math.min(clamp((320 - rect.top) / 320), clamp(rect.bottom / 320));
      // the scene goes out behind the closing words
      const fade = 1 - easeInOut(clamp((p - FADE_FROM) / 0.05));
      host.style.opacity = String(sceneAlpha * fade);

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
          host.style.opacity = "0";
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
        scene.setStacked(stacked);
        sceneRef.current = scene;
        section.dataset.osScene = "on";
        section.dataset.osLayout = stacked ? "stack" : "side";
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
      sceneRef.current = null;
      delete section.dataset.osScene;
      delete section.dataset.osPhase;
      delete section.dataset.osLayout;
      stepEls.forEach((el) => el.classList.remove("is-active"));
      indexEls.forEach((el) => el.classList.remove("is-active"));
      host.style.opacity = "";
    };
  }, [stacked]);

  useEffect(() => {
    if (!failed) return;
    const section = hostRef.current?.closest<HTMLElement>(".wv-os");
    if (section) section.dataset.osScene = "off";
  }, [failed]);

  // the scene needs to know whether the words are beside it or under it
  useEffect(() => {
    sceneRef.current?.setStacked(stacked);
  }, [stacked]);

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
              <span key={line.text} className={`is-${line.kind}${line.at === undefined ? " is-on" : ""}`}>
                {line.text}
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
