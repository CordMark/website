"use client";

import { useEffect } from "react";

/**
 * Keeps the header readable, and hands the mark over to it.
 *
 * The ground colours are plain CSS now (they used to be painted by one global
 * canvas), so something still has to tell the header whether it is currently
 * sitting on a dark section or a light one:
 *
 *   html[data-wv-ground]   "dark" | "light"  — header ink and background
 *   html[data-wv-scrolled] "1" when scrolled — a scrim under the nav
 *   html[data-wv-mark]     "docked" once the hero cord has become the mark,
 *                          which is when the header logo takes over
 *   html[data-wv-hero]     "1" while the hero owns the screen — the header
 *                          keeps no backdrop then, so the mark can fly up
 *                          to it without passing behind a scrim
 */

const DARK = new Set(["night", "charcoal"]);

export function GroundWatch() {
  useEffect(() => {
    const root = document.querySelector<HTMLElement>(".wv");
    if (!root) return;
    const sections = Array.from(root.querySelectorAll<HTMLElement>("[data-ground]"));
    const hero = root.querySelector<HTMLElement>(".wv-hero");
    if (!sections.length) return;

    let raf = 0;
    let ground = "";
    let scrolled = "";
    let marked = "";
    let inHero = "";

    const update = () => {
      raf = 0;
      // read
      const probe = 40; // roughly the middle of the header
      let dark = false;
      for (const s of sections) {
        const r = s.getBoundingClientRect();
        if (r.top <= probe && r.bottom > probe) dark = DARK.has(s.dataset.ground ?? "");
      }
      const heroRect = hero?.getBoundingClientRect();
      // the cord finishes becoming the mark, and flying up to the header,
      // near the end of the hero pin (HeroCord fades it from 0.96)
      const heroP = heroRect ? -heroRect.top / Math.max(1, heroRect.height - window.innerHeight) : 1;
      const docked = heroP > 0.965;
      const heroOwns = !!heroRect && heroP < 1 && heroRect.bottom > 0;
      const isScrolled = window.scrollY > 24;

      // write
      const nextGround = dark ? "dark" : "light";
      if (nextGround !== ground) {
        ground = nextGround;
        document.documentElement.dataset.wvGround = nextGround;
      }
      const nextScrolled = isScrolled ? "1" : "0";
      if (nextScrolled !== scrolled) {
        scrolled = nextScrolled;
        document.documentElement.dataset.wvScrolled = nextScrolled;
      }
      const nextHero = heroOwns ? "1" : "";
      if (nextHero !== inHero) {
        inHero = nextHero;
        if (heroOwns) document.documentElement.dataset.wvHero = "1";
        else delete document.documentElement.dataset.wvHero;
      }
      const nextMark = docked ? "docked" : "";
      if (nextMark !== marked) {
        marked = nextMark;
        if (docked) document.documentElement.dataset.wvMark = "docked";
        else delete document.documentElement.dataset.wvMark;
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
      delete document.documentElement.dataset.wvGround;
      delete document.documentElement.dataset.wvScrolled;
      delete document.documentElement.dataset.wvMark;
      delete document.documentElement.dataset.wvHero;
    };
  }, []);

  return null;
}
