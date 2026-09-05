"use client";

import { useEffect } from "react";

/** Give the service being read the same emphasis as a desktop hover. */
export function PracticesWatch() {
  useEffect(() => {
    const rows = Array.from(document.querySelectorAll<HTMLElement>(".wv-practice"));
    const touchLayout = window.matchMedia("(max-width: 880px), (hover: none)");
    let raf = 0;
    let active: HTMLElement | undefined;

    const update = () => {
      raf = 0;
      let next: HTMLElement | undefined;
      if (touchLayout.matches) {
        const readingLine = window.innerHeight * 0.48;
        let nearest = Infinity;
        for (const row of rows) {
          const box = row.getBoundingClientRect();
          if (box.bottom <= 80 || box.top >= window.innerHeight * 0.88) continue;
          const distance = Math.abs(box.top + box.height / 2 - readingLine);
          if (distance < nearest) {
            nearest = distance;
            next = row;
          }
        }
      }
      if (next === active) return;
      active?.classList.remove("is-reading");
      next?.classList.add("is-reading");
      active = next;
    };

    const schedule = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    // Font loading and responsive reflow can move rows without a scroll event.
    const resize = new ResizeObserver(schedule);
    rows.forEach(row => resize.observe(row));
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule, { passive: true });
    touchLayout.addEventListener("change", schedule);
    update();
    return () => {
      cancelAnimationFrame(raf);
      resize.disconnect();
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      touchLayout.removeEventListener("change", schedule);
      active?.classList.remove("is-reading");
    };
  }, []);

  return null;
}
