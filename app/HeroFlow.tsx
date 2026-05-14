"use client";

import type { CSSProperties } from "react";
import { useEffect, useRef, useState } from "react";

const heroLines = ["Beyond", "Efficiency,", "Toward", "Culture."];

function AnimatedHeroTitle() {
  let charIndex = 0;

  return (
    <>
      {heroLines.map((line, lineIndex) => (
        <span className="hero-title__line" key={line}>
          {Array.from(line).map((char) => {
            const style = { "--i": charIndex++ } as CSSProperties;

            return (
              <span
                className="hero-title__char"
                style={style}
                key={`${line}-${charIndex}`}
              >
                {char}
              </span>
            );
          })}
          {lineIndex < heroLines.length - 1 ? <br /> : null}
        </span>
      ))}
    </>
  );
}

function ColorHeroTitle() {
  return (
    <>
      {heroLines.map((line, lineIndex) => (
        <span className="hero-title__line" key={line}>
          {line}
          {lineIndex < heroLines.length - 1 ? <br /> : null}
        </span>
      ))}
    </>
  );
}

export function HeroFlow() {
  const flowRef = useRef<HTMLDivElement | null>(null);
  const introRef = useRef<HTMLElement | null>(null);
  const stickyTitleRef = useRef<HTMLHeadingElement | null>(null);
  const introTitleRef = useRef<HTMLHeadingElement | null>(null);
  const [isIntro, setIsIntro] = useState(false);
  const [isLanded, setIsLanded] = useState(false);

  useEffect(() => {
    const updateState = () => {
      if (
        !introRef.current ||
        !stickyTitleRef.current ||
        !introTitleRef.current
      )
        return;
      const introTop = introRef.current.getBoundingClientRect().top;
      const stickyTitleTop = stickyTitleRef.current.getBoundingClientRect().top;
      const stickyTitleHeight =
        stickyTitleRef.current.getBoundingClientRect().height;
      const introTitleTop = introTitleRef.current.getBoundingClientRect().top;
      const revealStart = window.innerHeight * 0.68;
      const revealEnd = stickyTitleTop + 2;
      const revealRange = Math.max(1, revealStart - revealEnd);
      const revealProgress = Math.min(
        1,
        Math.max(0, (revealStart - introTitleTop) / revealRange),
      );
      const revealLine = stickyTitleHeight * (1 - revealProgress);

      flowRef.current?.style.setProperty(
        "--hero-title-reveal",
        `${revealLine}px`,
      );

      setIsIntro(introTop <= window.innerHeight * 0.45);
      setIsLanded(introTitleTop <= stickyTitleTop + 2);
    };

    updateState();
    window.addEventListener("scroll", updateState, { passive: true });
    window.addEventListener("resize", updateState);

    return () => {
      window.removeEventListener("scroll", updateState);
      window.removeEventListener("resize", updateState);
    };
  }, []);

  return (
    <div
      className={`hero-flow${isIntro ? " is-intro" : ""}${isLanded ? " is-landed" : ""}`}
      ref={flowRef}
    >
      <div className="hero-sticky" aria-hidden="true">
        <div className="hero-sticky__inner">
          <h1 ref={stickyTitleRef}>
            <span className="hero-title__base">
              <AnimatedHeroTitle />
            </span>
            <span className="hero-title__color" aria-hidden="true">
              <ColorHeroTitle />
            </span>
          </h1>
          <div className="hero__marks">
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
      </div>

      <section className="hero" aria-label="CordMark hero">
        <div className="hero__slides" aria-hidden="true">
          <span className="hero__slide"></span>
          <span className="hero__slide"></span>
          <span className="hero__slide"></span>
        </div>
        <div className="hero__shade"></div>
      </section>

      <section className="intro" id="about" ref={introRef}>
        <div className="intro__statement">
          <h2 ref={introTitleRef}>
            Beyond
            <br />
            Efficiency,
            <br />
            Toward
            <br />
            Culture.
          </h2>
        </div>
        <div className="intro__copy" id="mission">
          <p className="section-kicker">Mission</p>
          <h3>
            ポストAI社会の
            <br />
            人間の営みを形づくる
          </h3>
          <p>
            CordMarkは、AIと自動化によって、生活と組織の負荷を下げるだけでなく、その先に生まれる余白を人間の営みへと接続します。私たちは、「自律した生活基盤」と「創発する文化的共同体」を通じて、ポストAI社会の生活の器を実装します。
          </p>
          <a className="pill-link" href="#about">
            私たちについて <span aria-hidden="true"></span>
          </a>
        </div>
      </section>
    </div>
  );
}
