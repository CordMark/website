"use client";

import { useEffect, useRef } from "react";

/**
 * The hero cord.
 *
 * One gesture, and only one: loose strands drift across the whole screen,
 * get twisted into a single cord, the cord coils into the CordMark mark
 * (two linked rings), and the mark dissolves. Then the hero is over.
 *
 * It does not carry into the Company OS section — that section has its own
 * scene. This canvas lives inside the hero pin and is transparent, so the
 * hero's own ground colour shows through.
 *
 *   0.00 – 0.46   loose strands, full width, quiet behind the copy
 *   0.42 – 0.76   the strands twist into one cord
 *   0.66 – 0.94   the cord coils and splits into the mark
 *   0.88 – 1.00   the mark dissolves
 */

const STRANDS = [
  { color: "#c98a55", width: 2.6 },
  { color: "#a66f45", width: 2.2 },
  { color: "#4e6b57", width: 2.0 },
  { color: "#d9b58a", width: 1.8 },
  { color: "#8e5a3a", width: 2.4 },
  { color: "#6b7f6e", width: 1.6 },
];

// when each strand gets pulled into the cord (0 = first, 1 = last)
const JOIN_DELAY = [0.05, 0.55, 0.3, 0.85, 0.15, 0.7];

const SAMPLES = 200;

type Pt = { x: number; y: number };

const clamp = (v: number, a = 0, b = 1) => Math.min(b, Math.max(a, v));
const smooth = (u: number) => u * u * (3 - 2 * u);
const ease = (u: number) => (u < 0.5 ? 2 * u * u : -1 + (4 - 2 * u) * u);
const mix = (a: number, b: number, u: number) => a + (b - a) * u;
/** 0 before `a`, eased 0→1 between, 1 after `b` */
const span = (t: number, a: number, b: number) => (t <= a ? 0 : t >= b ? 1 : ease((t - a) / (b - a)));

function rgba(hex: string, alpha: number) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r},${g},${b},${alpha})`;
}

export function HeroCord() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const hero = canvas.closest<HTMLElement>(".wv-hero");
    const context = canvas.getContext("2d");
    if (!hero || !context) return;
    const ctx: CanvasRenderingContext2D = context;

    const root = hero.closest<HTMLElement>(".wv");
    const heroCopy = root?.querySelector<HTMLElement>(".wv-hero__copy") ?? null;
    const heroHint = root?.querySelector<HTMLElement>(".wv-hero__hint") ?? null;

    const reduceQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const narrowQuery = window.matchMedia("(max-width: 880px)");

    let W = 0;
    let H = 0;
    let raf = 0;
    let running = false;
    const started = performance.now();

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      W = canvas.clientWidth;
      H = canvas.clientHeight;
      canvas.width = Math.round(W * dpr);
      canvas.height = Math.round(H * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      if (reduceQuery.matches) draw(performance.now());
    };

    /* ---------- the cord: a centreline, six strands twisted around it ---------- */
    const drawCord = (pW: number, pC: number, pM: number, alpha: number, t: number) => {
      const n = STRANDS.length;
      const narrow = narrowQuery.matches;
      const cy = H * 0.52;
      const spread = H * 0.3;

      // where the mark sits once the cord has coiled
      const R = Math.min(W, H) * (narrow ? 0.26 : 0.2);
      const center = { x: W * 0.5, y: H * 0.5 };
      const Rm = R * 0.92;
      const leftC = { x: center.x - Rm * 0.5, y: center.y };
      const rightC = { x: center.x + Rm * 0.5, y: center.y };

      const ropeAmp = 7 + H * 0.007;
      const ringAmp = R * 0.17;
      const amp = mix(ropeAmp, ringAmp, pC);
      const lineTwists = W / 150;
      const ringTwists = 7;
      const twistPhase = (u: number) => Math.PI * 2 * mix(u * lineTwists, u * ringTwists, pC) + t * 0.4;

      // The cord is an arc of a circle: nearly flat at first (a huge radius),
      // then the radius shrinks until the arc closes into a ring.
      const Rbig = Math.max(W, H) * 3;
      const arcA = mix((W + 20) / Rbig, Math.PI * 2, pC);
      const arcL = mix(W + 20, Math.PI * 2 * R, pC);
      const r = arcL / arcA;
      const top = { x: mix(W / 2, center.x, pC), y: mix(cy, center.y - R, pC) };
      const arcC = { x: top.x, y: top.y + r };

      const centre = (i: number, u: number): Pt => {
        const th = -Math.PI * 0.5 + (u - 0.5) * arcA;
        let px = arcC.x + Math.cos(th) * r;
        let py = arcC.y + Math.sin(th) * r + H * 0.045 * Math.sin(u * Math.PI * 1.35 + 0.7 + t * 0.07) * (1 - pC);
        if (pM > 0) {
          // odd and even strands peel apart into the two linked rings of the mark
          const c = i % 2 === 0 ? leftC : rightC;
          px = mix(px, c.x + Math.cos(th) * Rm, pM);
          py = mix(py, c.y + Math.sin(th) * Rm, pM);
        }
        return { x: px, y: py };
      };

      const pts: Pt[] = new Array(SAMPLES);
      const depths: number[] = new Array(SAMPLES);
      const qs: number[] = new Array(SAMPLES);
      const du = 1 / (SAMPLES - 1);

      // a soft front sweeps leftwards; each strand is pulled in at its own moment
      const gather = (i: number, u: number) => {
        if (pW >= 1) return 1;
        const delay = JOIN_DELAY[i] * 0.45;
        return smooth(clamp((pW * 1.6 - delay - (1 - u) * 0.55) / 0.5));
      };

      ctx.lineCap = "round";
      ctx.lineJoin = "round";

      for (let i = 0; i < n; i++) {
        const st = STRANDS[i];
        const off = (i - (n - 1) / 2) / ((n - 1) / 2);
        const phase = (Math.PI * 2 * i) / n;
        let qSum = 0;

        for (let j = 0; j < SAMPLES; j++) {
          const u = j * du;
          const x = -10 + u * (W + 20);
          const q = gather(i, u);
          qSum += q;
          // loose: each strand drifts on its own
          const ay =
            cy +
            off * spread * (1 + 0.18 * Math.sin(u * 3.1 + i)) +
            Math.sin(x * 0.011 + i * 1.3 + t * 0.15) * 20 +
            Math.sin(x * 0.0037 + i * 2.1 - t * 0.09) * 26;
          // twisted around the centreline
          const c0 = centre(i, u);
          const c1 = centre(i, Math.min(1, u + du));
          const cm = centre(i, Math.max(0, u - du));
          let tx = c1.x - cm.x;
          let ty = c1.y - cm.y;
          const len = Math.hypot(tx, ty) || 1;
          tx /= len;
          ty /= len;
          const ph = twistPhase(u) + phase;
          const o = Math.sin(ph) * amp;
          pts[j] = { x: mix(x, c0.x - ty * o, q), y: mix(ay, c0.y + tx * o, q) };
          depths[j] = Math.cos(ph);
          qs[j] = q;
        }

        const qMean = qSum / SAMPLES;
        const base = (0.36 + 0.3 * qMean) * alpha;

        // While the copy is still on screen the left side stays quiet, so the
        // words never fight the cord. Once the copy has gone the cord is free
        // to use the whole width.
        const stroke = (a: number) => {
          if (narrow || pM > 0.001) {
            ctx.strokeStyle = rgba(st.color, a);
            return;
          }
          const quiet = 1 - clamp((pC - 0.15) / 0.5); // 1 → 0 as the copy fades
          const g = ctx.createLinearGradient(0, 0, W * 0.62, 0);
          g.addColorStop(0, rgba(st.color, a * mix(1, 0.16, quiet)));
          g.addColorStop(1, rgba(st.color, a));
          ctx.strokeStyle = g;
        };

        // pass 1: the whole strand, thin and quiet (the part that runs behind)
        ctx.beginPath();
        for (let j = 0; j < SAMPLES; j++) {
          if (j === 0) ctx.moveTo(pts[j].x, pts[j].y);
          else ctx.lineTo(pts[j].x, pts[j].y);
        }
        stroke(base * (1 - 0.5 * qMean));
        ctx.lineWidth = st.width * (1 - 0.25 * qMean);
        ctx.stroke();

        // pass 2: only the parts that come to the front → the over/under of a twist
        if (qMean > 0.02) {
          ctx.beginPath();
          let open = false;
          for (let j = 0; j < SAMPLES; j++) {
            if (depths[j] > -0.05 && qs[j] > 0.5) {
              if (!open) ctx.moveTo(pts[j].x, pts[j].y);
              else ctx.lineTo(pts[j].x, pts[j].y);
              open = true;
            } else if (open) {
              ctx.lineTo(pts[j].x, pts[j].y);
              open = false;
            }
          }
          stroke(base * 1.18);
          ctx.lineWidth = st.width * 1.35;
          ctx.stroke();
        }
      }
    };

    /* ---------- frame ---------- */
    const draw = (now: number) => {
      const reduce = reduceQuery.matches;
      const t = reduce ? 0 : (now - started) / 1000;
      const rect = hero.getBoundingClientRect();

      ctx.clearRect(0, 0, W, H);

      // 0 at the top of the hero, 1 when the pin is about to release
      const travel = Math.max(1, rect.height - H);
      const p = reduce ? 0.28 : clamp(-rect.top / travel);

      const pW = span(p, 0.0, 0.46);
      const pC = span(p, 0.42, 0.76);
      const pM = span(p, 0.66, 0.94);
      const alpha = 1 - span(p, 0.88, 1.0);

      // a warm, low light behind the cord — it dies out before the paper begins
      const glow = (1 - span(p, 0.72, 1.0)) * alpha;
      if (glow > 0.01) {
        const gx = mix(W * 0.68, W * 0.5, pC);
        const g = ctx.createRadialGradient(gx, H * 0.5, 0, gx, H * 0.5, Math.max(W, H) * 0.52);
        g.addColorStop(0, `rgba(78,66,50,${0.4 * glow})`);
        g.addColorStop(0.55, `rgba(52,54,46,${0.2 * glow})`);
        g.addColorStop(1, "rgba(27,31,28,0)");
        ctx.fillStyle = g;
        ctx.fillRect(0, 0, W, H);
      }

      drawCord(pW, pC, pM, alpha, t);

      // the copy leaves before the mark forms, so the two never compete
      if (heroCopy) heroCopy.style.opacity = String(1 - span(p, 0.34, 0.6));
      if (heroHint) heroHint.style.opacity = String(1 - span(p, 0.02, 0.18));

      if (running && !reduce) raf = requestAnimationFrame(draw);
    };

    /* ---------- only run while the hero is on screen ---------- */
    const startLoop = () => {
      if (running || reduceQuery.matches) return;
      running = true;
      raf = requestAnimationFrame(draw);
    };
    const stopLoop = () => {
      running = false;
      cancelAnimationFrame(raf);
    };

    const io = new IntersectionObserver(
      ([entry]) => (entry.isIntersecting ? startLoop() : stopLoop()),
      { rootMargin: "10% 0px" },
    );
    io.observe(hero);

    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    const onReduce = () => {
      stopLoop();
      if (reduceQuery.matches) draw(performance.now());
      else startLoop();
    };
    reduceQuery.addEventListener("change", onReduce);

    resize();
    draw(performance.now());

    return () => {
      stopLoop();
      io.disconnect();
      ro.disconnect();
      reduceQuery.removeEventListener("change", onReduce);
      if (heroCopy) heroCopy.style.opacity = "";
      if (heroHint) heroHint.style.opacity = "";
    };
  }, []);

  return <canvas ref={ref} className="wv-hero__cord" aria-hidden="true" />;
}
