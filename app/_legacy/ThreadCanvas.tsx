"use client";

import { useEffect, useRef } from "react";

/**
 * One fixed canvas behind the top page.
 *
 * The cord is a background. It never scrolls away: it stays in the same place
 * in the viewport and only changes shape as the reader scrolls.
 *
 *   Hero        loose strands            → woven cord      (weave progress)
 *   Purpose     the woven cord rests behind the text, then
 *               curls into a ring                          (curl progress)
 *   CordMark OS the ring is the core; people around it; a Question travels
 *               the company in step with the scroll        (story progress)
 *   exit        the ring splits into the CordMark mark (two linked rings)
 *               and fades under the next section
 *
 * The canvas also paints every section's ground colour so boundaries blend.
 */

const GROUND: Record<string, string> = {
  night: "#1b1f1c",
  paper: "#f1ece1",
  paper2: "#e9e2d3",
  charcoal: "#24221f",
};

const INK = "#26231f";
const COPPER = "#a8683c";
const VERMILION = "#b5482e";
const STONE = "#8b8578";
const PAPER = "#f1ece1";

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

const PEOPLE = [
  { name: "経営者", angle: -90 },
  { name: "事業責任者", angle: -30 },
  { name: "PM / SE", angle: 30 },
  { name: "エンジニア", angle: 90 },
  { name: "営業", angle: 150 },
  { name: "デザイナー", angle: 210 },
];

const SAMPLES = 220;
const STORY_SECONDS = 18;
const STORY_FROM = 3; // エンジニア
const STORY_OWNER = 1; // 事業責任者

type Pt = { x: number; y: number };

const clamp = (v: number, a = 0, b = 1) => Math.min(b, Math.max(a, v));
const smooth = (u: number) => u * u * (3 - 2 * u);
const ease = (u: number) => (u < 0.5 ? 2 * u * u : -1 + (4 - 2 * u) * u);
const seg = (t: number, a: number, b: number) => (t < a ? -1 : t > b ? 2 : ease((t - a) / (b - a)));
const mix = (a: number, b: number, u: number) => a + (b - a) * u;

function mixHex(a: string, b: string, u: number) {
  const ch = (h: string, i: number) => parseInt(h.slice(i, i + 2), 16);
  const r = Math.round(mix(ch(a, 1), ch(b, 1), u));
  const g = Math.round(mix(ch(a, 3), ch(b, 3), u));
  const bl = Math.round(mix(ch(a, 5), ch(b, 5), u));
  const hex = (v: number) => v.toString(16).padStart(2, "0");
  return `#${hex(r)}${hex(g)}${hex(bl)}`;
}

function rgba(hex: string, alpha: number) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r},${g},${b},${alpha})`;
}

export function ThreadCanvas() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const root = canvas.closest<HTMLElement>(".wv");
    const context = canvas.getContext("2d");
    if (!root || !context) return;
    const ctx: CanvasRenderingContext2D = context;

    const q = (s: string) => root.querySelector<HTMLElement>(s);
    const heroSection = q(".wv-hero");
    const heroCopy = q(".wv-hero__copy");
    const heroScrim = q(".wv-hero__scrim");
    const heroHint = q(".wv-hero__hint");
    const chainItems = Array.from(root.querySelectorAll<HTMLElement>(".wv-chain li"));
    const osSection = q(".wv-os");
    const stage = q(".wv-os__stage");
    const servicesSection = q(".wv-services");
    const headerMark = document.querySelector<HTMLElement>(".brand__mark");
    const originSection = q(".wv-origin");
    const contactSection = q(".wv-contact");
    const contactButton = q(".wv-contact .wv-button");
    const stepEls = Array.from(root.querySelectorAll<HTMLElement>(".wv-os__steps li"));
    const sections = Array.from(root.querySelectorAll<HTMLElement>("[data-ground]"));
    if (!heroSection || !heroCopy || !osSection || !stage || !servicesSection) return;

    const reduceQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const narrowQuery = window.matchMedia("(max-width: 880px)");

    let W = 0;
    let H = 0;
    let raf = 0;
    let running = false;
    const start = performance.now();
    let activeStep = -1;
    let ground = "";
    let scrolled = "";
    let docked = false;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      W = window.innerWidth;
      H = window.innerHeight;
      canvas.width = Math.round(W * dpr);
      canvas.height = Math.round(H * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      if (reduceQuery.matches) draw(performance.now());
    };

    /* ---------- helpers ---------- */
    const mono = (text: string, x: number, y: number, color: string, size = 10) => {
      ctx.font = `500 ${size}px ui-monospace, SFMono-Regular, Menlo, monospace`;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillStyle = color;
      ctx.fillText(text, x, y);
    };
    const sans = (text: string, x: number, y: number, color: string, size = 12) => {
      ctx.font = `500 ${size}px "Noto Sans JP", "Hiragino Sans", sans-serif`;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillStyle = color;
      ctx.fillText(text, x, y);
    };
    const dot = (x: number, y: number, r: number, color: string, alpha = 1) => {
      ctx.globalAlpha = alpha;
      ctx.beginPath();
      ctx.arc(x, y, r, 0, Math.PI * 2);
      ctx.fillStyle = color;
      ctx.fill();
      ctx.globalAlpha = 1;
    };

    /* ---------- paper grain (static, like the tooth of the paper) ---------- */
    const grain = document.createElement("canvas");
    grain.width = grain.height = 192;
    const gctx = grain.getContext("2d");
    let grainPattern: CanvasPattern | null = null;
    if (gctx) {
      const img = gctx.createImageData(grain.width, grain.height);
      for (let i = 0; i < img.data.length; i += 4) {
        const v = 96 + Math.random() * 96;
        img.data[i] = img.data[i + 1] = img.data[i + 2] = v;
        img.data[i + 3] = 255;
      }
      gctx.putImageData(img, 0, 0);
      grainPattern = ctx.createPattern(grain, "repeat");
    }

    /* ---------- ground ---------- */
    const paintGround = (heroScroll: number) => {
      const rects = sections.map((s) => ({ r: s.getBoundingClientRect(), c: GROUND[s.dataset.ground ?? "paper"] }));
      ctx.fillStyle = GROUND.paper;
      ctx.fillRect(0, 0, W, H);
      for (const { r, c } of rects) {
        if (r.bottom < 0 || r.top > H) continue;
        ctx.fillStyle = c;
        ctx.fillRect(0, r.top, W, r.height);
      }

      // a warm, low light behind the hero cord; it dies out before the paper begins
      const hr = rects[0]?.r;
      if (hr && hr.bottom > 0) {
        const glowAlpha = 1 - clamp((heroScroll - 0.35) / 0.5);
        if (glowAlpha > 0) {
          const gy = Math.max(hr.top, 0) + H * 0.5;
          const g = ctx.createRadialGradient(W * 0.7, gy, 0, W * 0.7, gy, W * 0.5);
          g.addColorStop(0, `rgba(78,66,50,${0.42 * glowAlpha})`);
          g.addColorStop(0.55, `rgba(52,54,46,${0.22 * glowAlpha})`);
          g.addColorStop(1, "rgba(27,31,28,0)");
          ctx.fillStyle = g;
          ctx.fillRect(0, hr.top, W, hr.height);
        }
      }

      // boundaries dissolve into each other; the first one takes most of a screen
      for (let i = 1; i < rects.length; i++) {
        const a = rects[i - 1].c;
        const b = rects[i].c;
        if (a === b) continue;
        const y = rects[i].r.top;
        const span = i === 1 ? H * (narrowQuery.matches ? 0.3 : 0.42) : H * 0.26;
        const y0 = i === 1 ? y - span : y - span * 0.5;
        const y1 = i === 1 ? y + 1 : y + span * 0.5;
        if (y1 < 0 || y0 > H) continue;
        const g = ctx.createLinearGradient(0, y0, 0, y1);
        g.addColorStop(0, a);
        // pass through a warm stone rather than a neutral grey
        g.addColorStop(0.5, mixHex(mixHex(a, b, 0.5), "#9a8c74", 0.35));
        g.addColorStop(1, b);
        ctx.fillStyle = g;
        ctx.fillRect(0, y0, W, y1 - y0);
      }

      // paper tooth
      if (grainPattern) {
        ctx.save();
        ctx.globalCompositeOperation = "overlay";
        ctx.globalAlpha = 0.11;
        ctx.fillStyle = grainPattern;
        ctx.fillRect(0, 0, W, H);
        ctx.restore();
      }

      const probe = 40;
      let dark = false;
      for (const { r, c } of rects) {
        if (r.top <= probe && r.bottom > probe) dark = c === GROUND.night || c === GROUND.charcoal;
      }
      const next = dark ? "dark" : "light";
      if (next !== ground) {
        ground = next;
        document.documentElement.dataset.wvGround = next;
      }
      const scrolledNext = window.scrollY > 24 ? "1" : "0";
      if (scrolledNext !== scrolled) {
        scrolled = scrolledNext;
        document.documentElement.dataset.wvScrolled = scrolledNext;
      }
    };

    /* ---------- the cord: a centreline, and six strands twisted around it ---------- */
    type Shape = {
      pW: number; // loose → twisted around the line
      pC: number; // line → ring
      pM: number; // ring → mark
      center: Pt;
      R: number;
      alpha: number;
      t: number;
      narrow: boolean;
    };

    const drawCord = (sh: Shape) => {
      const { pW, pC, pM, center, R, t, narrow } = sh;
      const n = STRANDS.length;
      const cy = H * 0.52;
      const spread = H * 0.28;
      const ropeAmp = 7 + H * 0.007;
      const ringAmp = R * 0.17;
      const amp = mix(ropeAmp, ringAmp, pC);
      const Rm = R * 0.92;
      const leftC = { x: center.x - Rm * 0.5, y: center.y };
      const rightC = { x: center.x + Rm * 0.5, y: center.y };
      const lineTwists = W / 150; // turns across the screen
      const ringTwists = 7; // turns around the ring
      const twistPhase = (u: number) => Math.PI * 2 * mix(u * lineTwists, u * ringTwists, pC) + t * 0.45;

      // where the centreline of strand i is at u.
      // The cord is an arc of a circle: almost flat at first (a huge radius),
      // then it coils - the radius shrinks and the arc closes into the ring.
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
          const c = i % 2 === 0 ? leftC : rightC;
          const mx = c.x + Math.cos(th) * Rm;
          const my = c.y + Math.sin(th) * Rm;
          px = mix(px, mx, pM);
          py = mix(py, my, pM);
        }
        return { x: px, y: py };
      };

      const pts: Pt[] = new Array(SAMPLES);
      const depths: number[] = new Array(SAMPLES);
      const qs: number[] = new Array(SAMPLES);
      const du = 1 / (SAMPLES - 1);

      // The cord gathers from the right: a soft front sweeps leftwards as the
      // reader scrolls, and each strand is pulled in at its own moment.
      const gather = (i: number, u: number) => {
        if (pW >= 1) return 1;
        const delay = JOIN_DELAY[i] * 0.45;
        return smooth(clamp((pW * 1.6 - delay - (1 - u) * 0.55) / 0.5));
      };

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
          // A: loose strands, each drifting on its own
          const ay =
            cy +
            off * spread * (1 + 0.18 * Math.sin(u * 3.1 + i)) +
            Math.sin(x * 0.011 + i * 1.3 + t * 0.15) * 20 +
            Math.sin(x * 0.0037 + i * 2.1 - t * 0.09) * 26;
          // B..D: twisted around the centreline
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
          const rx = c0.x - ty * o;
          const ry = c0.y + tx * o;
          pts[j] = { x: mix(x, rx, q), y: mix(ay, ry, q) };
          depths[j] = Math.cos(ph);
          qs[j] = q;
        }
        const qMean = qSum / SAMPLES;

        const base = (0.34 + 0.28 * qMean) * sh.alpha;
        const stroke = (a: number) => {
          if (narrow || pC > 0.999) {
            ctx.strokeStyle = rgba(st.color, a);
          } else {
            // keep the left side quiet so the copy stays readable
            const g = ctx.createLinearGradient(W * 0.28, 0, W * 0.6, 0);
            g.addColorStop(0, rgba(st.color, a * mix(0.14, 1, pC)));
            g.addColorStop(1, rgba(st.color, a));
            ctx.strokeStyle = g;
          }
        };
        ctx.lineCap = "round";
        ctx.lineJoin = "round";

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
          stroke(base * 1.15);
          ctx.lineWidth = st.width * 1.35;
          ctx.stroke();
        }
      }
    };

    /* ---------- Origin: the cord-mark band, and the thread that leaves it ---------- */
    const drawImprint = (y: number, x1: number, reveal: number, tt: number) => {
      const n = STRANDS.length;
      const x0 = -10;
      const xr = x0 + (x1 - x0) * reveal;
      const amp = 6 + H * 0.005;
      const twist = (Math.PI * 2) / 140;
      const M = 200;
      const pass = (offset: number, back: string, front: string, wBack: number, wFront: number) => {
        for (let i = 0; i < n; i++) {
          const phase = (Math.PI * 2 * i) / n;
          // the whole strand, quiet
          ctx.beginPath();
          let openB = false;
          ctx.strokeStyle = back;
          ctx.lineWidth = wBack;
          for (let j = 0; j <= M; j++) {
            const x = x0 + ((x1 - x0) * j) / M;
            if (x > xr) break;
            const ph = x * twist + phase + tt * 0.12;
            const yy = y + Math.sin(x * 0.006 + 0.4) * 6 + Math.sin(ph) * amp + offset;
            if (!openB) ctx.moveTo(x + offset, yy);
            else ctx.lineTo(x + offset, yy);
            openB = true;
          }
          ctx.stroke();
          // the parts that come to the front
          ctx.beginPath();
          let open = false;
          ctx.strokeStyle = front;
          ctx.lineWidth = wFront;
          for (let j = 0; j <= M; j++) {
            const x = x0 + ((x1 - x0) * j) / M;
            if (x > xr) break;
            const ph = x * twist + phase + tt * 0.12;
            const yy = y + Math.sin(x * 0.006 + 0.4) * 6 + Math.sin(ph) * amp + offset;
            if (Math.cos(ph) > -0.05) {
              if (!open) ctx.moveTo(x + offset, yy);
              else ctx.lineTo(x + offset, yy);
              open = true;
            } else if (open) {
              ctx.lineTo(x + offset, yy);
              open = false;
            }
          }
          ctx.stroke();
        }
      };
      ctx.save();
      ctx.lineCap = "round";
      // shadow of the impression, then the raised edge catching the light
      pass(1.6, "rgba(0,0,0,0)", "rgba(8,8,6,0.55)", 1, 2.4);
      pass(0, rgba("#ede7da", 0.14), rgba("#ede7da", 0.42), 1, 2);
      ctx.restore();
    };

    const drawTrail = (from: Pt, laneX: number, to: Pt, limitY: number) => {
      // from the end of the band, out to the margin, straight down, then in to the button
      const p0 = from;
      const p1 = { x: laneX, y: from.y };
      const p2 = { x: laneX, y: to.y };
      const p3 = to;
      const segs: [Pt, Pt][] = [
        [p0, p1],
        [p1, p2],
        [p2, p3],
      ];
      ctx.save();
      ctx.strokeStyle = rgba(COPPER, 0.7);
      ctx.lineWidth = 1.2;
      ctx.lineCap = "round";
      ctx.lineJoin = "round";
      ctx.beginPath();
      ctx.moveTo(p0.x, p0.y);
      let reached = true;
      for (const [a, b] of segs) {
        if (b.y <= limitY || b.y <= a.y) {
          ctx.lineTo(b.x, b.y);
        } else {
          // stop where the reader has scrolled to
          const u = clamp((limitY - a.y) / (b.y - a.y));
          ctx.lineTo(mix(a.x, b.x, u), mix(a.y, b.y, u));
          reached = false;
          break;
        }
      }
      ctx.stroke();
      ctx.restore();
      if (reached) dot(p3.x, p3.y, 3, COPPER);
    };

    /* ---------- CordMark OS story around the ring ---------- */
    const drawStory = (T: number, t: number, center: Pt, R: number, alpha: number, reduce: boolean) => {
      if (alpha <= 0.01) return;
      const { x: cx, y: cy } = center;
      const rx = Math.min(W * 0.19, 250);
      const ry = Math.min(H * 0.3, 220);
      const pos = (i: number) => {
        const a = (PEOPLE[i].angle * Math.PI) / 180;
        return { x: cx + Math.cos(a) * rx, y: cy + Math.sin(a) * ry };
      };
      const ctrl = (p: Pt) => {
        const mx = (p.x + cx) / 2;
        const my = (p.y + cy) / 2;
        const dx = cx - p.x;
        const dy = cy - p.y;
        const len = Math.hypot(dx, dy) || 1;
        return { x: mx - (dy / len) * 28, y: my + (dx / len) * 28 };
      };
      const along = (p: Pt, u: number) => {
        const c = ctrl(p);
        const a = 1 - u;
        return { x: a * a * p.x + 2 * a * u * c.x + u * u * cx, y: a * a * p.y + 2 * a * u * c.y + u * u * cy };
      };

      ctx.save();
      ctx.globalAlpha = alpha;

      for (let i = 0; i < PEOPLE.length; i++) {
        const p = pos(i);
        const c = ctrl(p);
        ctx.beginPath();
        ctx.moveTo(p.x, p.y);
        ctx.quadraticCurveTo(c.x, c.y, cx, cy);
        ctx.strokeStyle = rgba(INK, 0.22);
        ctx.lineWidth = 1;
        ctx.stroke();
        if (!reduce) {
          for (let m = 0; m < 2; m++) {
            const u = (T * 0.06 + i * 0.17 + m * 0.5) % 1;
            const ap = along(p, u);
            ctx.beginPath();
            ctx.arc(ap.x, ap.y, 1.6, 0, Math.PI * 2);
            ctx.fillStyle = rgba(COPPER, 0.35 + 0.35 * (1 - u));
            ctx.fill();
          }
        }
      }

      const cuA = (150 * Math.PI) / 180;
      const cu = { x: cx + Math.cos(cuA) * rx * 1.5, y: cy + Math.sin(cuA) * ry * 1.5 };
      const sales = pos(4);
      ctx.setLineDash([3, 4]);
      ctx.beginPath();
      ctx.moveTo(cu.x, cu.y);
      ctx.lineTo(sales.x, sales.y);
      ctx.strokeStyle = rgba(STONE, 0.5);
      ctx.lineWidth = 1;
      ctx.stroke();
      ctx.setLineDash([]);
      ctx.beginPath();
      ctx.arc(cu.x, cu.y, 7, 0, Math.PI * 2);
      ctx.strokeStyle = STONE;
      ctx.stroke();
      sans("顧客", cu.x, cu.y + 20, STONE, 11);

      mono("AI", cx, cy - 6, COPPER, 9);
      mono("CONTEXT", cx, cy + 7, COPPER, 9);

      for (let j = 0; j < PEOPLE.length; j++) {
        const pp = pos(j);
        ctx.beginPath();
        ctx.arc(pp.x, pp.y, 9, 0, Math.PI * 2);
        ctx.fillStyle = PAPER;
        ctx.fill();
        ctx.strokeStyle = INK;
        ctx.lineWidth = 1.2;
        ctx.stroke();
        ctx.beginPath();
        ctx.arc(pp.x, pp.y, 3, 0, Math.PI * 2);
        ctx.fillStyle = INK;
        ctx.fill();
        const below = Math.sin((PEOPLE[j].angle * Math.PI) / 180) >= 0;
        sans(PEOPLE[j].name, pp.x, pp.y + (below ? 24 : -22), INK);
      }

      const from = pos(STORY_FROM);
      const owner = pos(STORY_OWNER);
      const fromBelow = from.y > cy;
      const ownerBelow = owner.y > cy;

      const u1 = seg(t, 1.6, 3.0);
      if (u1 >= 0 && u1 <= 1) {
        const a1 = along(from, u1);
        dot(a1.x, a1.y, 4.5, INK);
        mono("QUESTION", a1.x, a1.y - 16, INK);
      }
      if (t >= 1.0 && t < 3.2) sans("実装者が、判断を必要として止まる", from.x, from.y + (fromBelow ? 44 : -42), STONE, 11);

      if (t >= 3.0 && t < 4.4) {
        [STORY_OWNER, (STORY_OWNER + 1) % PEOPLE.length].forEach((idx, c) => {
          const cp = pos(idx);
          const cq = ctrl(cp);
          ctx.beginPath();
          ctx.moveTo(cx, cy);
          ctx.quadraticCurveTo(cq.x, cq.y, cp.x, cp.y);
          ctx.strokeStyle = rgba(COPPER, (c === 0 ? 0.9 : 0.35) * (0.5 + 0.5 * Math.sin(T * 9)));
          ctx.lineWidth = 1.4;
          ctx.stroke();
        });
        sans("背景と過去のDecisionをつなぎ、答えるべき人を整理する", cx, cy - ry - 44, STONE, 11);
      }

      const u3 = seg(t, 4.4, 5.8);
      if (u3 >= 0 && u3 <= 1) {
        const a3 = along(owner, 1 - u3);
        dot(a3.x, a3.y, 4.5, COPPER);
        mono("QUESTION + CONTEXT", a3.x, a3.y - 16, COPPER);
      }

      if (t >= 5.8) {
        const g = Math.min(1, (t - 5.8) / 0.6);
        ctx.beginPath();
        ctx.arc(owner.x, owner.y, 14 * ease(g), 0, Math.PI * 2);
        ctx.strokeStyle = rgba(VERMILION, 0.9);
        ctx.lineWidth = 2;
        ctx.stroke();
        dot(owner.x, owner.y, 4, VERMILION);
        if (t < 8.0) {
          mono("HUMAN DECISION", owner.x, owner.y + (ownerBelow ? 42 : -40), VERMILION);
          sans("決めるのは、人。", owner.x, owner.y + (ownerBelow ? 58 : -56), VERMILION);
        }
      }

      const u5 = seg(t, 7.4, 8.8);
      if (u5 >= 0 && u5 <= 1) {
        const a5 = along(owner, u5);
        dot(a5.x, a5.y, 4.5, VERMILION);
        mono("DECISION", a5.x, a5.y - 16, VERMILION);
      }

      const u6 = seg(t, 8.8, 10.2);
      if (u6 >= 0 && u6 <= 1) {
        const a6 = along(from, 1 - u6);
        dot(a6.x, a6.y, 4.5, COPPER);
        mono("SPECIFICATION", a6.x, a6.y - 16, COPPER);
      }

      if (t >= 10.2 && t < 11.8) {
        const g7 = (t - 10.2) / 1.6;
        ctx.beginPath();
        ctx.arc(from.x, from.y, 12 + 18 * g7, 0, Math.PI * 2);
        ctx.strokeStyle = rgba(COPPER, 1 - g7);
        ctx.lineWidth = 1.5;
        ctx.stroke();
      }
      if (t >= 10.2 && t < 13.5) {
        mono("ACTION", from.x, from.y + (fromBelow ? 42 : -40), COPPER);
        sans("開発が再開する", from.x, from.y + (fromBelow ? 58 : -56), STONE, 11);
      }

      if (t >= 11.6) {
        const lead = pos(0);
        const lq = ctrl(lead);
        ctx.setLineDash([2, 5]);
        ctx.beginPath();
        ctx.moveTo(cx, cy);
        ctx.quadraticCurveTo(lq.x, lq.y, lead.x, lead.y);
        ctx.strokeStyle = rgba(VERMILION, 0.6 * clamp((t - 11.6) / 0.8));
        ctx.lineWidth = 1;
        ctx.stroke();
        ctx.setLineDash([]);
        sans("Decisionと背景が会社のContextに残り、経営者は後から追える", cx, cy + ry + 48, STONE, 11);
      }
      if (t >= 14.2) {
        dot(owner.x, owner.y - 15, 2.2, VERMILION, 0.8 * clamp((t - 14.2) / 0.6));
      }

      ctx.restore();
    };

    /* ---------- frame ---------- */
    const draw = (now: number) => {
      const T = (now - start) / 1000;
      const reduce = reduceQuery.matches;
      const narrow = narrowQuery.matches;
      const pinned = !reduce && !narrow;
      const t = reduce ? 0 : T;

      ctx.clearRect(0, 0, W, H);

      // act 1: weave with the hero scroll
      const hs = heroSection.getBoundingClientRect();
      const heroScroll = narrow ? clamp(-hs.top / (H * 0.9)) : clamp(-hs.top / Math.max(1, hs.height - H));
      paintGround(heroScroll);
      const pW = reduce ? 1 : heroScroll;
      const copyAlpha = pinned ? 1 - clamp((heroScroll - 0.55) / 0.3) : 1;
      heroCopy.style.opacity = String(copyAlpha);
      if (heroScrim) heroScrim.style.opacity = String(pinned ? 1 - clamp((heroScroll - 0.6) / 0.3) : 1);
      if (heroHint) heroHint.style.opacity = String(pinned ? 1 - clamp(heroScroll / 0.2) : 1);

      // act 2: reveal the chain as it comes into view
      chainItems.forEach((li) => li.classList.toggle("is-on", li.getBoundingClientRect().top < H * 0.78));

      // act 3: curl into the ring at the stage, then the story
      const os = osSection.getBoundingClientRect();
      const sr = stage.getBoundingClientRect();
      const pC = reduce ? 1 : smooth(clamp(1 - os.top / (H * 1.1)));
      let tStory: number;
      if (reduce) tStory = 6.5;
      else if (pinned) tStory = clamp(-os.top / Math.max(1, os.height - H)) * STORY_SECONDS;
      else tStory = clamp((H * 0.7 - sr.top) / Math.max(1, sr.height + H * 0.4)) * STORY_SECONDS;

      // ring → mark; then the mark flies up and docks next to the wordmark in the header
      const pM = reduce ? 0 : smooth(clamp((tStory - 14.6) / 3.4));
      const pF = reduce ? 0 : smooth(clamp((H * 0.85 - sr.bottom) / (H * 0.7)));
      const stageCenter = { x: sr.left + sr.width / 2, y: sr.top + sr.height / 2 };
      const stageR = Math.min(sr.width, sr.height) * (narrow ? 0.13 : 0.11);
      let center = stageCenter;
      let R = stageR;
      if (pF > 0 && headerMark) {
        const hm = headerMark.getBoundingClientRect();
        const target = { x: hm.left + hm.width / 2, y: hm.top + hm.height / 2 };
        const targetR = hm.width / 2.9; // the mark spans ~2.9 R
        const lift = Math.sin(pF * Math.PI) * H * 0.06; // a small arc on the way up
        center = { x: mix(stageCenter.x, target.x, pF), y: mix(stageCenter.y, target.y, pF) - lift };
        R = mix(stageR, targetR, pF);
      }
      const alpha = pF > 0 ? 1 - clamp((pF - 0.62) / 0.2) : 1; // hand over to the DOM mark before it slips under the nav
      const dockedNext = pF >= 0.72 || reduce;
      if (dockedNext !== docked) {
        docked = dockedNext;
        if (docked) document.documentElement.dataset.wvMark = "docked";
        else delete document.documentElement.dataset.wvMark;
      }
      const quiet = pC < 1 && heroScroll >= 1 ? 0.55 : 1; // rests behind Purpose

      if (alpha > 0.01) {
        drawCord({ pW, pC, pM, center, R, alpha: alpha * quiet * (narrow && pC < 0.5 ? 0.6 : 1), t, narrow });
        drawStory(T, tStory, stageCenter, stageR, alpha * pC * (1 - pM), reduce);
      }

      // Origin: the cord is pressed into the clay and leaves its mark - a band along the
      // bottom of the section that prints from left to right as the reader scrolls.
      // From its right end a single thread trails down the margin to the contact button.
      if (originSection && contactSection && contactButton) {
        const og = originSection.getBoundingClientRect();
        const ct = contactSection.getBoundingClientRect();
        const bandY = og.bottom - Math.min(og.height * 0.22, 190);
        const bandX1 = W * (narrow ? 0.94 : 0.9);
        const reveal = reduce ? 1 : smooth(clamp((H * 0.85 - bandY) / (H * 0.35)));
        if (og.top < H && ct.bottom > -H && reveal > 0) {
          drawImprint(bandY, bandX1, reveal, t);
          if (reveal >= 1) {
            const bt = contactButton.getBoundingClientRect();
            const laneX = W - (narrow ? 8 : Math.min(48, W * 0.035));
            const start = { x: bandX1, y: bandY };
            const end = { x: bt.right + (narrow ? 7 : 14), y: bt.top + bt.height / 2 };
            drawTrail(start, laneX, end, H * 0.86);
          }
        }
      }

      let step = -1;
      if (tStory >= 1.0 && tStory < 3.0) step = 0;
      else if (tStory >= 3.0 && tStory < 5.8) step = 1;
      else if (tStory >= 5.8 && tStory < 8.8) step = 2;
      else if (tStory >= 8.8 && tStory < 10.2) step = 3;
      else if (tStory >= 10.2) step = 4;
      if (step !== activeStep) {
        activeStep = step;
        stepEls.forEach((el, i) => el.classList.toggle("is-active", i === step));
      }

      if (running && !reduce) raf = requestAnimationFrame(draw);
    };

    const play = () => {
      if (running) return;
      running = true;
      if (!reduceQuery.matches) raf = requestAnimationFrame(draw);
    };
    const pause = () => {
      running = false;
      cancelAnimationFrame(raf);
    };
    const onScroll = () => {
      if (reduceQuery.matches) draw(performance.now());
    };
    const onVisibility = () => (document.hidden ? pause() : play());

    resize();
    play();
    window.addEventListener("resize", resize);
    window.addEventListener("scroll", onScroll, { passive: true });
    document.addEventListener("visibilitychange", onVisibility);
    reduceQuery.addEventListener("change", resize);

    return () => {
      pause();
      window.removeEventListener("resize", resize);
      window.removeEventListener("scroll", onScroll);
      document.removeEventListener("visibilitychange", onVisibility);
      reduceQuery.removeEventListener("change", resize);
      delete document.documentElement.dataset.wvGround;
      delete document.documentElement.dataset.wvScrolled;
      delete document.documentElement.dataset.wvMark;
    };
  }, []);

  return <canvas className="wv-thread" ref={ref} aria-hidden="true" />;
}
