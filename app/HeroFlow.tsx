"use client";

import type { CSSProperties } from "react";
import { useEffect, useRef, useState } from "react";
import { BorderTrace } from "./BorderTrace";

const heroLines = ["Beyond", "Efficiency,", "Toward", "Culture."];
const introScrollUnlockDelay = 2150;
const introAnimationDuration = 4300;

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
  const nightVideoRef = useRef<HTMLVideoElement | null>(null);
  const [isIntro, setIsIntro] = useState(false);
  const [isLanded, setIsLanded] = useState(false);

  useEffect(() => {
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const root = document.documentElement;
    const body = document.body;
    const previousScrollRestoration = history.scrollRestoration;
    const previousScrollBehavior = root.style.scrollBehavior;
    const lockedKeys = new Set([
      " ",
      "ArrowDown",
      "ArrowUp",
      "End",
      "Home",
      "PageDown",
      "PageUp",
    ]);

    if ("scrollRestoration" in history) {
      history.scrollRestoration = "manual";
    }

    root.style.scrollBehavior = "auto";
    window.scrollTo(0, 0);
    root.style.scrollBehavior = previousScrollBehavior;
    root.classList.add("is-reload");

    if (reduceMotion) {
      root.classList.remove("is-reload");
      return () => {
        if ("scrollRestoration" in history) {
          history.scrollRestoration = previousScrollRestoration;
        }
      };
    }

    const keepAtTop = () => {
      if (window.scrollY !== 0) {
        window.scrollTo(0, 0);
      }
    };
    const preventScroll = (event: Event) => {
      event.preventDefault();
      keepAtTop();
    };
    const preventScrollKeys = (event: KeyboardEvent) => {
      if (!lockedKeys.has(event.key)) return;
      event.preventDefault();
      keepAtTop();
    };
    const scrollLockOptions = { capture: true, passive: false };

    root.classList.add("hero-intro-lock");
    body.classList.add("hero-intro-lock");
    keepAtTop();
    window.addEventListener("wheel", preventScroll, scrollLockOptions);
    window.addEventListener("touchmove", preventScroll, scrollLockOptions);
    window.addEventListener("keydown", preventScrollKeys, { capture: true });

    const unlockScroll = () => {
      root.classList.remove("hero-intro-lock");
      body.classList.remove("hero-intro-lock");
      window.removeEventListener("wheel", preventScroll, scrollLockOptions);
      window.removeEventListener("touchmove", preventScroll, scrollLockOptions);
      window.removeEventListener("keydown", preventScrollKeys, {
        capture: true,
      });
    };

    const unlockTimer = window.setTimeout(
      unlockScroll,
      introScrollUnlockDelay,
    );
    const introEndTimer = window.setTimeout(() => {
      root.classList.remove("is-reload");
    }, introAnimationDuration);

    return () => {
      window.clearTimeout(unlockTimer);
      window.clearTimeout(introEndTimer);
      unlockScroll();
      root.classList.remove("is-reload");
      if ("scrollRestoration" in history) {
        history.scrollRestoration = previousScrollRestoration;
      }
    };
  }, []);

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

  useEffect(() => {
    const slideDuration = 18000;
    const nightSlideStart = slideDuration * 0.27;
    let interval: number | null = null;

    const playNightVideoFromStart = () => {
      const video = nightVideoRef.current;
      if (!video) return;

      try {
        video.currentTime = 0;
        void video.play().catch(() => undefined);
      } catch {
        // Ignore browsers that reject seeking before metadata is ready.
      }
    };

    const startTimer = window.setTimeout(() => {
      playNightVideoFromStart();
      interval = window.setInterval(
        playNightVideoFromStart,
        slideDuration,
      );
    }, nightSlideStart);

    return () => {
      window.clearTimeout(startTimer);
      if (interval) window.clearInterval(Number(interval));
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
          <span className="hero__slide">
            <video
              autoPlay
              loop
              muted
              playsInline
              preload="metadata"
              poster="/assets/hero-city.png"
            >
              <source src="/assets/city-video.mp4" type="video/mp4" />
            </video>
          </span>
          <span className="hero__slide">
            <video
              ref={nightVideoRef}
              loop
              muted
              playsInline
              preload="metadata"
              poster="/assets/hero-night.png"
            >
              <source src="/assets/night-video.mp4" type="video/mp4" />
            </video>
          </span>
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
          <a className="pill-link border-spin" href="#about">
            私たちについて <span aria-hidden="true"></span>
            <BorderTrace />
          </a>
        </div>
      </section>
    </div>
  );
}
