"use client";

import { useEffect, useRef } from "react";

export function WhoWeAreVisual() {
  const visualRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const visual = visualRef.current;
    if (!visual) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0;

    const setVisualState = (progress: number) => {
      const inverted = 1 - progress;

      visual.style.setProperty("--who-progress", progress.toFixed(3));
      visual.style.setProperty("--top-x", `${-16 * inverted}px`);
      visual.style.setProperty("--top-y", `${-50 + progress * 24}px`);
      visual.style.setProperty("--second-x", `${7 * inverted}px`);
      visual.style.setProperty("--second-y", `${-24 + progress * 16}px`);
      visual.style.setProperty("--core-x", "0px");
      visual.style.setProperty("--core-y", "0px");
      visual.style.setProperty("--third-x", `${-7 * inverted}px`);
      visual.style.setProperty("--third-y", `${26 - progress * 14}px`);
      visual.style.setProperty("--bottom-x", `${14 * inverted}px`);
      visual.style.setProperty("--bottom-y", `${56 - progress * 26}px`);
      visual.style.setProperty("--top-opacity", (0.72 + progress * 0.28).toFixed(3));
      visual.style.setProperty("--shadow-scale", (0.82 + progress * 0.18).toFixed(3));
    };

    const updateProgress = () => {
      if (reducedMotion.matches) {
        setVisualState(1);
        return;
      }

      const rect = visual.getBoundingClientRect();
      const start = window.innerHeight * 0.96;
      const end = window.innerHeight * 0.18;
      const progress = Math.min(1, Math.max(0, (start - rect.top) / (start - end)));

      setVisualState(progress);
    };

    const requestUpdate = () => {
      window.cancelAnimationFrame(frame);
      frame = window.requestAnimationFrame(updateProgress);
    };

    updateProgress();
    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate);
    reducedMotion.addEventListener("change", requestUpdate);

    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);
      reducedMotion.removeEventListener("change", requestUpdate);
    };
  }, []);

  return (
    <div className="who-visual" ref={visualRef} aria-hidden="true">
      <div className="who-visual__stage">
        <span className="who-visual__slab who-visual__slab--top"></span>
        <span className="who-visual__slab who-visual__slab--second"></span>
        <span className="who-visual__slab who-visual__slab--core"></span>
        <span className="who-visual__slab who-visual__slab--third"></span>
        <span className="who-visual__slab who-visual__slab--bottom"></span>
        <span className="who-visual__line who-visual__line--one"></span>
        <span className="who-visual__line who-visual__line--two"></span>
        <span className="who-visual__shadow"></span>
      </div>
    </div>
  );
}
