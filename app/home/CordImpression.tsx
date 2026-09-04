"use client";

import { useEffect, useId, useRef } from "react";

/**
 * The mark a cord leaves in clay: rows of short slanted ticks, the way a
 * twisted cord rolled over a pot prints them. Sits behind the Origin copy,
 * barely there, and spreads down from the top towards the middle of the
 * section as it scrolls into view. Purely decorative.
 */
export function CordImpression() {
  const ref = useRef<SVGSVGElement>(null);
  const id = useId().replace(/:/g, "");

  useEffect(() => {
    const svg = ref.current;
    const host = svg?.parentElement;
    if (!svg || !host) return;
    const edge = svg.querySelector<SVGGElement>(".wv-impression__edge");
    if (!edge) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let raf = 0;
    let last = -1;

    const update = () => {
      raf = 0;
      let p = 1;
      if (!reduce) {
        const vh = window.innerHeight;
        const r = host.getBoundingClientRect();
        // starts as the section comes up, finishes once its top third is in
        p = Math.min(1, Math.max(0, (vh * 0.9 - r.top) / (vh * 0.55 + r.height * 0.3)));
      }
      if (p !== last) {
        last = p;
        // the soft edge of the mask slides down (bounding-box units);
        // 1.3 so the fade clears the bottom
        edge.setAttribute("transform", `translate(0 ${((p - 1) * 1.3).toFixed(4)})`);
      }
    };
    const schedule = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, []);

  return (
    <svg ref={ref} className="wv-impression" aria-hidden="true" preserveAspectRatio="none">
      <defs>
        {/* herringbone of cord ticks: one row leaning one way, the next the other */}
        <pattern id={`${id}-cord`} width="26" height="18" patternUnits="userSpaceOnUse" patternTransform="rotate(-7)">
          <path d="M2 3 L8 8 M15 3 L21 8 M12 11 L6 16 M25 11 L19 16" />
        </pattern>
        <linearGradient id={`${id}-fade`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#fff" />
          <stop offset="0.7" stopColor="#fff" />
          <stop offset="1" stopColor="#000" />
        </linearGradient>
        {/* quieter towards the right and the bottom, where the copy sits */}
        <linearGradient id={`${id}-quiet`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#fff" />
          <stop offset="0.55" stopColor="#fff" stopOpacity="0.55" />
          <stop offset="1" stopColor="#fff" stopOpacity="0.12" />
        </linearGradient>
        <mask id={`${id}-mask`} maskContentUnits="objectBoundingBox">
          <g className="wv-impression__edge">
            <rect x="0" y="0" width="1" height="1.3" fill={`url(#${id}-fade)`} />
          </g>
        </mask>
        <mask id={`${id}-tone`} maskContentUnits="objectBoundingBox">
          <rect x="0" y="0" width="1" height="1" fill={`url(#${id}-quiet)`} />
        </mask>
      </defs>
      <g mask={`url(#${id}-mask)`}>
        <rect className="wv-impression__ticks" width="100%" height="100%" fill={`url(#${id}-cord)`} mask={`url(#${id}-tone)`} />
      </g>
    </svg>
  );
}
