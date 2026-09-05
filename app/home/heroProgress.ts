/** The moving mark reaches the header before either mark starts fading. */
export const HERO_MARK_ARRIVAL = 0.985;

export function heroProgress(rect: Pick<DOMRect, "top" | "height">, canvasHeight: number) {
  return Math.min(1, Math.max(0, -rect.top / Math.max(1, rect.height - canvasHeight)));
}
