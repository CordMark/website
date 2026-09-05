/** The moving mark reaches the header before either mark starts fading. */
export const HERO_MARK_ARRIVAL = 0.985;
export const HERO_TRANSITION_MS = 5200;

export function heroProgress(rect: Pick<DOMRect, "top" | "height">, canvasHeight: number) {
  const top = rect.top - (animatedScroll !== null ? animatedScroll - window.scrollY : 0);
  return Math.min(1, Math.max(0, -top / Math.max(1, rect.height - canvasHeight)));
}

// Preserve subpixel progress while programmatic scrolling rounds to CSS pixels.
let animatedScroll: number | null = null;
export function setHeroAnimatedScroll(value: number | null) {
  animatedScroll = value;
}

/** Smooth monotone interpolation: immediate start, continuous speed at each beat. */
export function heroTransitionPosition(t: number, end: number) {
  // Keep the immediate opening; the flight now takes 1.8 seconds.
  const times = [0, 1140, 2565, 4365, 4593, HERO_TRANSITION_MS].map(ms => ms / HERO_TRANSITION_MS);
  const positions = [0, 0.46, 0.9, HERO_MARK_ARRIVAL, 1, end];
  const slopes = times.slice(1).map((time, i) => (positions[i + 1] - positions[i]) / (time - times[i]));
  const tangents = [slopes[0], ...slopes.slice(1).map((slope, i) => 2 * slopes[i] * slope / (slopes[i] + slope)), 0];
  let i = 0;
  while (i < times.length - 2 && t > times[i + 1]) i++;
  const h = times[i + 1] - times[i];
  const u = Math.min(1, Math.max(0, (t - times[i]) / h));
  return (2 * u ** 3 - 3 * u ** 2 + 1) * positions[i]
    + (u ** 3 - 2 * u ** 2 + u) * h * tangents[i]
    + (-2 * u ** 3 + 3 * u ** 2) * positions[i + 1]
    + (u ** 3 - u ** 2) * h * tangents[i + 1];
}

/** A more pronounced acceleration through the flight, with a soft landing. */
export function heroDockingEase(progress: number) {
  const u = Math.min(1, Math.max(0, progress));
  return u * u * u * (u * (u * 6 - 15) + 10);
}
