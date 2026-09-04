"use client";

import { useEffect } from "react";

/**
 * Purpose の因果を、上から順に一つずつ点す。
 *
 * 伏せた状態(opacity/transform)は CSS ではなくここで着ける。CSS に置くと、
 * この Script が動かなかったとき — SSR のまま、JS 無効、この Component の
 * 読み込み前 — 本文が 0.3 のまま貼りついたまま読めなくなる。実際、
 * 以前は `.is-on` を付ける側が _legacy にしか残っておらず、そうなっていた。
 */
export function ChainReveal() {
  useEffect(() => {
    const list = document.querySelector<HTMLElement>(".wv-chain");
    if (!list) return;
    const items = Array.from(list.querySelectorAll<HTMLElement>("li"));
    if (!items.length) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reduce.matches) return; // 伏せずに、そのまま読ませる

    list.dataset.reveal = "on";

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const el = entry.target as HTMLElement;
          // 一本の線が上から降りてくるよう、順番に間を置いて点す
          el.style.transitionDelay = `${items.indexOf(el) * 90}ms`;
          el.classList.add("is-on");
          io.unobserve(el);
        }
      },
      { rootMargin: "0px 0px -22% 0px" },
    );
    items.forEach((el) => io.observe(el));

    const onReduce = () => {
      if (!reduce.matches) return;
      delete list.dataset.reveal;
      io.disconnect();
    };
    reduce.addEventListener("change", onReduce);

    return () => {
      io.disconnect();
      reduce.removeEventListener("change", onReduce);
      delete list.dataset.reveal;
      items.forEach((el) => {
        el.style.transitionDelay = "";
        el.classList.remove("is-on");
      });
    };
  }, []);

  return null;
}
