"use client";

import { useEffect, useRef, useState } from "react";

export function BorderTrace() {
  const svgRef = useRef<SVGSVGElement>(null);
  const [path, setPath] = useState("");
  const [size, setSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const svg = svgRef.current;
    const target = svg?.parentElement;

    if (!svg || !target) return;

    const updatePath = () => {
      const { width, height } = target.getBoundingClientRect();
      const inset = 0.5;
      const w = Math.max(width - inset * 2, 0);
      const h = Math.max(height - inset * 2, 0);
      const r = Math.min(h / 2, w / 2);
      const left = inset;
      const top = inset;
      const right = left + w;
      const bottom = top + h;

      setSize({ width, height });
      setPath(
        [
          `M ${left + r} ${top}`,
          `H ${right - r}`,
          `A ${r} ${r} 0 0 1 ${right} ${top + r}`,
          `V ${bottom - r}`,
          `A ${r} ${r} 0 0 1 ${right - r} ${bottom}`,
          `H ${left + r}`,
          `A ${r} ${r} 0 0 1 ${left} ${bottom - r}`,
          `V ${top + r}`,
          `A ${r} ${r} 0 0 1 ${left + r} ${top}`,
          "Z",
        ].join(" ")
      );
    };

    updatePath();

    const observer = new ResizeObserver(updatePath);
    observer.observe(target);

    return () => observer.disconnect();
  }, []);

  return (
    <svg
      className="border-trace"
      ref={svgRef}
      viewBox={`0 0 ${size.width || 1} ${size.height || 1}`}
      aria-hidden="true"
      focusable="false"
    >
      <path className="border-trace__line" d={path} pathLength="100" />
    </svg>
  );
}
