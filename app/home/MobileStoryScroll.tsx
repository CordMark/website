"use client";

import { useEffect } from "react";
import { companyOsScrollFraction, MOBILE_OS_STOPS } from "./companyOsProgress";

import { HERO_TRANSITION_MS, heroTransitionPosition, setHeroAnimatedScroll } from "./heroProgress";


/** One deliberate touch or wheel gesture plays one complete scene. */
export function MobileStoryScroll() {
  useEffect(() => {
    const hero = document.querySelector<HTMLElement>(".wv-hero");
    const os = document.querySelector<HTMLElement>(".wv-os");
    if (!hero || !os) return;
    const mobile = matchMedia("(max-width: 880px) and (pointer: coarse)");
    const reduced = matchMedia("(prefers-reduced-motion: reduce)");
    let raf = 0;
    let animating = false;
    let gesture: { x: number; y: number; consumed: boolean } | null = null;
    let wheelConsumed = false;
    let wheelDelta = 0;
    let lastWheelAt = -Infinity;
    const enabled = () => !reduced.matches && os.dataset.osScene === "on";
    const stops = () => {
      const top = os.getBoundingClientRect().top + window.scrollY;
      const travel = Math.max(1, os.offsetHeight - window.innerHeight);
      return [0, ...MOBILE_OS_STOPS.map(p => top + companyOsScrollFraction(p) * travel)];
    };
    const cancel = () => {
      cancelAnimationFrame(raf);
      raf = 0;
      animating = false;
      setHeroAnimatedScroll(null);
    };
    const play = (target: number, duration: number) => {
      cancel();
      const from = window.scrollY;
      const heroRect = hero.getBoundingClientRect();
      const heroTop = heroRect.top + from;
      const heroTravel = heroRect.height - (hero.querySelector("canvas")?.clientHeight ?? innerHeight);
      const useHeroTimeline = target > from && from < heroTop + heroTravel && duration === HERO_TRANSITION_MS;
      const end = (target - heroTop) / heroTravel;
      const initial = (from - heroTop) / heroTravel;
      // Resume the same timeline if a user starts partway through the hero.
      let startTime = 0;
      if (useHeroTimeline && initial > 0) {
        let lo = 0, hi = 1;
        for (let i = 0; i < 24; i++) {
          const mid = (lo + hi) / 2;
          if (heroTransitionPosition(mid, end) < initial) lo = mid; else hi = mid;
        }
        startTime = (lo + hi) / 2;
      }
      const started = performance.now();
      animating = true;
      const frame = (now: number) => {
        if (!enabled()) { cancel(); return; }
        const t = Math.min(1, (now - started) / duration);
        const eased = t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
        const position = useHeroTimeline
          ? heroTop + heroTravel * heroTransitionPosition(startTime + (1 - startTime) * t, end)
          : from + (target - from) * eased;
        if (useHeroTimeline) setHeroAnimatedScroll(position);
        window.scrollTo({ top: position, behavior: "instant" });
        if (t < 1) raf = requestAnimationFrame(frame);
        else { animating = false; raf = 0; setHeroAnimatedScroll(null); }
      };
      raf = requestAnimationFrame(frame);
    };
    const next = (direction: number) => {
      const positions = stops();
      const y = window.scrollY;
      const target = direction > 0
        ? positions.find(p => p > y + 8)
        : [...positions].reverse().find(p => p < y - 8);
      if (target === undefined) return;
      const crossesHero = Math.min(y, target) < positions[1] - 8;
      play(target, crossesHero ? HERO_TRANSITION_MS : 1050);
    };
    const onStart = (event: TouchEvent) => {
      gesture = null;
      if (!mobile.matches || !enabled() || event.touches.length !== 1) return;
      const target = event.target;
      if (!(target instanceof Element) || !target.closest(".wv-hero, .wv-os")) return;
      if (target.closest("button, input, textarea, select, [role='button']")) return;
      const y = window.scrollY;
      const positions = stops();
      if (y > positions.at(-1)! + 8) return;
      gesture = { x: event.touches[0].clientX, y: event.touches[0].clientY, consumed: animating };
    };
    const onMove = (event: TouchEvent) => {
      if (!gesture || !enabled()) return;
      if (event.touches.length !== 1) { gesture = null; cancel(); return; }
      const dx = event.touches[0].clientX - gesture.x;
      const dy = gesture.y - event.touches[0].clientY;
      if (Math.abs(dx) > Math.abs(dy) && !gesture.consumed) { gesture = null; return; }
      const positions = stops();
      // Release the page at either end. A consumed gesture cannot skip a beat.
      if (!gesture.consumed && !animating && ((dy > 0 && window.scrollY >= positions.at(-1)! - 8) || (dy < 0 && window.scrollY <= 8))) {
        gesture = null;
        return;
      }
      if (!event.cancelable) { gesture = null; return; }
      event.preventDefault();
      if (!gesture.consumed && !animating && Math.abs(dy) >= 36) {
        gesture.consumed = true;
        next(dy > 0 ? 1 : -1);
      }
    };
    const onEnd = () => { gesture = null; };
    const onWheel = (event: WheelEvent) => {
      if (!enabled() || event.ctrlKey || event.defaultPrevented) return;
      if (document.body.style.overflow === "hidden") { reset(); return; }
      if (Math.abs(event.deltaX) > Math.abs(event.deltaY) || event.deltaY === 0) return;
      const target = event.target;
      if (target instanceof Element && target.closest("input, textarea, select, [contenteditable='true'], [role='dialog']")) return;
      const y = window.scrollY;
      const positions = stops();
      if (y > positions.at(-1)! + 8) return;
      const now = performance.now();
      // A trackpad's momentum belongs to the gesture that started the scene,
      // even when its wheel events continue after the animation has ended.
      if (!animating && now - lastWheelAt > 240) {
        wheelConsumed = false;
        wheelDelta = 0;
      }
      lastWheelAt = now;
      if (!animating && !wheelConsumed && ((event.deltaY > 0 && y >= positions.at(-1)! - 8) || (event.deltaY < 0 && y <= 8))) return;
      if (!event.cancelable) return;
      event.preventDefault();
      if (animating) { wheelConsumed = true; return; }
      if (wheelConsumed) return;
      const delta = event.deltaY * (event.deltaMode === 1 ? 16 : event.deltaMode === 2 ? window.innerHeight : 1);
      if (Math.sign(delta) !== Math.sign(wheelDelta)) wheelDelta = 0;
      wheelDelta += delta;
      if (Math.abs(wheelDelta) >= 24) {
        wheelConsumed = true;
        next(wheelDelta > 0 ? 1 : -1);
      }
    };
    const onClick = (event: MouseEvent) => {
      const target = event.target;
      if (!(target instanceof Element)) return;
      const link = target.closest<HTMLAnchorElement>("a");
      if (!link) return;
      if (enabled() && link.closest(".wv-hero") && link.getAttribute("href") === "#company-os" && !event.metaKey && !event.ctrlKey && !event.shiftKey && !event.altKey) {
        event.preventDefault();
        play(stops()[1], HERO_TRANSITION_MS);
      } else cancel();
    };
    const reset = () => {
      gesture = null;
      wheelConsumed = false;
      wheelDelta = 0;
      lastWheelAt = -Infinity;
      cancel();
    };
    const onKey = () => reset();
    let viewportWidth = window.innerWidth;
    const onResize = () => {
      // Mobile browser chrome changes the height during scrolling; that must
      // not interrupt the scene midway. Rotation/layout changes do cancel it.
      if (window.innerWidth !== viewportWidth) reset();
      viewportWidth = window.innerWidth;
    };
    document.addEventListener("touchstart", onStart, { passive: true });
    document.addEventListener("touchmove", onMove, { passive: false });
    document.addEventListener("touchend", onEnd);
    document.addEventListener("touchcancel", reset);
    document.addEventListener("wheel", onWheel, { passive: false });
    document.addEventListener("click", onClick);
    document.addEventListener("keydown", onKey);
    window.addEventListener("resize", onResize);
    window.addEventListener("pagehide", reset);
    mobile.addEventListener("change", reset);
    reduced.addEventListener("change", reset);
    return () => {
      reset();
      document.removeEventListener("touchstart", onStart);
      document.removeEventListener("touchmove", onMove);
      document.removeEventListener("touchend", onEnd);
      document.removeEventListener("touchcancel", reset);
      document.removeEventListener("wheel", onWheel);
      document.removeEventListener("click", onClick);
      document.removeEventListener("keydown", onKey);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("pagehide", reset);
      mobile.removeEventListener("change", reset);
      reduced.removeEventListener("change", reset);
    };
  }, []);
  return null;
}
