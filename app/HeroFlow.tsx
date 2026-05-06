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
              <span className="hero-title__char" style={style} key={`${line}-${charIndex}`}>
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

export function HeroFlow() {
  const flowRef = useRef<HTMLDivElement | null>(null);
  const introRef = useRef<HTMLElement | null>(null);
  const [isIntro, setIsIntro] = useState(false);
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    const updateState = () => {
      if (!introRef.current) return;
      const introTop = introRef.current.getBoundingClientRect().top;
      const flowBottom = flowRef.current?.getBoundingClientRect().bottom ?? Infinity;

      setIsIntro(introTop <= window.innerHeight * 0.45);
      setIsDone(flowBottom <= window.innerHeight * 0.78);
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
      className={`hero-flow${isIntro ? " is-intro" : ""}${isDone ? " is-done" : ""}`}
      ref={flowRef}
    >
      <div className="hero-sticky" aria-hidden="true">
        <div className="hero-sticky__inner">
          <h1>
            <AnimatedHeroTitle />
          </h1>
          <div className="hero__marks">
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
      </div>

      <section className="hero" aria-label="CordMark hero">
        <div className="hero__shade"></div>
      </section>

      <section className="intro" id="about" ref={introRef}>
        <div className="intro__statement"></div>
        <div className="intro__copy" id="mission">
          <p className="section-kicker">Mission</p>
          <h3>
            ポストAI社会の
            <br />
            人間の営みを形づくる
          </h3>
          <p>
            CordMarkは、AIと自動化によって生活と組織の負荷を下げ、
            そこで生まれる時間と注意を、学び、制作、関係性、自治へと変換する
            生活の器を実装します。
          </p>
          <a className="pill-link" href="#about">
            私たちについて <span aria-hidden="true"></span>
          </a>
        </div>
      </section>
    </div>
  );
}
