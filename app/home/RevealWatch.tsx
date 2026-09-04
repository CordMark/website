"use client";

import { useEffect } from "react";

/**
 * Lets `[data-reveal]` elements come in as they arrive on screen.
 *
 * The hidden state is only applied once this has run (html[data-wv-reveal]),
 * so nothing stays invisible without JavaScript. Elements get `is-in` once
 * and keep it. `data-reveal="2"`, `"3"`… delays an element a little behind
 * its neighbours; see home.css.
 */
export function RevealWatch() {
  useEffect(() => {
    const root = document.querySelector<HTMLElement>(".wv");
    if (!root) return;
    const items = Array.from(root.querySelectorAll<HTMLElement>("[data-reveal]"));
    if (!items.length) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      for (const el of items) el.classList.add("is-in");
      return;
    }
    document.documentElement.dataset.wvReveal = "1";
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            (e.target as HTMLElement).classList.add("is-in");
            io.unobserve(e.target);
          }
        }
      },
      { rootMargin: "0px 0px -12% 0px", threshold: 0.05 },
    );
    for (const el of items) io.observe(el);
    return () => {
      io.disconnect();
      delete document.documentElement.dataset.wvReveal;
    };
  }, []);

  return null;
}
