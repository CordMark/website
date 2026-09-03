"use client";

import { useEffect, useRef, useState } from "react";
import type { CompanyOsScene, SceneQuality } from "./three/companyOsScene";

/** the roles in the scene, in the order the scene places them */
const ROLE_LABELS = ["エンジニア", "PM", "事業責任者", "営業", "経営"];

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
const STEP_AT = [0.34, 0.45, 0.55, 0.66, 0.77];

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
    }));
    let activeStep = -2;
    let phase = "";
    let sceneAlpha = 0;

    const stepEls = Array.from(section.querySelectorAll<HTMLElement>(".wv-os__steps li"));
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

      /* ---- write ---- */
      const nextPhase = !pinned ? "static" : p < SHIFT_FROM ? "overview" : p < SHIFT_TO ? "shift" : "explain";
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
        el.style.transform = `translate3d(${Math.round(q.x)}px, ${Math.round(q.y)}px, 0) translate(-50%, -50%)`;
        el.style.opacity = visible ? "1" : "0";
      }

      // one step open at a time — the list can never outgrow the pinned screen
      if (pinned) {
        let next = -1;
        for (let i = 0; i < STEP_AT.length; i++) if (p >= STEP_AT[i]) next = i;
        if (next !== activeStep) {
          activeStep = next;
          stepEls.forEach((el, i) => el.classList.toggle("is-active", i === next));
        }
        // The scene is position:fixed and covers the whole viewport, so it must
        // stay invisible until this section actually owns the screen — the pin
        // only fills it once rect.top reaches 0. Fading in any earlier paints
        // navy (and role labels) over the section above.
        sceneAlpha = Math.min(clamp((320 - rect.top) / 320), clamp(rect.bottom / 320));
        host.style.opacity = String(sceneAlpha);
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
      </div>
    </div>
  );
}
