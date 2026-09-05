/** Shared by the scene and the mobile gesture controller. */
export const OVERVIEW_SCROLL_SAVED = 0.09;
export const STEP_AT = [0.34, 0.46, 0.58, 0.73, 0.8, 0.9];

export function companyOsProgress(fraction: number) {
  const scroll = Math.min(1, Math.max(0, fraction)) * (1 - OVERVIEW_SCROLL_SAVED);
  return scroll <= 0.12 ? scroll : scroll < 0.21 ? 0.12 + (scroll - 0.12) / 0.5 : scroll + OVERVIEW_SCROLL_SAVED;
}

export function companyOsScrollFraction(progress: number) {
  const scroll = progress <= 0.12 ? progress : progress < 0.3 ? 0.12 + (progress - 0.12) * 0.5 : progress - OVERVIEW_SCROLL_SAVED;
  return scroll / (1 - OVERVIEW_SCROLL_SAVED);
}

// Stop after the turn, handoff and delayed dialogue, before the next beat.
export const MOBILE_OS_STOPS = [0.2, 0.45, 0.57, 0.72, 0.795, 0.895, 0.99];
