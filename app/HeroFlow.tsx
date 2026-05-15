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

type AmbientDrop = {
  x: number;
  y: number;
  maxRadius: number;
  dotRadius: number;
  life: number;
  age: number;
  alpha: number;
  color: string;
  hasRipple: boolean;
};

function MissionAmbient({ active }: { active: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    if (!("IntersectionObserver" in window)) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { rootMargin: "160px 0px", threshold: 0 },
    );

    observer.observe(canvas);

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !active || !isVisible) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reduceMotion) return;

    const context = canvas.getContext("2d", { alpha: true });
    if (!context) return;

    let frame = 0;
    let lastTime = performance.now();
    let spawnIn = 0;
    let drops: AmbientDrop[] = [];
    const colors = ["29, 118, 201", "87, 154, 186", "120, 172, 210"];

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.max(1, Math.floor(rect.width * dpr));
      canvas.height = Math.max(1, Math.floor(rect.height * dpr));
      context.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const randomBetween = (min: number, max: number) =>
      min + Math.random() * (max - min);

    const spawnDrop = () => {
      const rect = canvas.getBoundingClientRect();
      const isLargeDrop = Math.random() < .18;

      drops.push({
        x: randomBetween(rect.width * .08, rect.width * .92),
        y: randomBetween(rect.height * .1, rect.height * .9),
        maxRadius: isLargeDrop
          ? randomBetween(rect.width * .4, rect.width * .62)
          : randomBetween(rect.width * .16, rect.width * .42),
        dotRadius: isLargeDrop ? randomBetween(9, 15) : randomBetween(4, 10),
        life: isLargeDrop ? randomBetween(8200, 12800) : randomBetween(5600, 10200),
        age: 0,
        alpha: isLargeDrop ? randomBetween(.035, .07) : randomBetween(.045, .085),
        color: colors[Math.floor(Math.random() * colors.length)],
        hasRipple: Math.random() < .3,
      });

      if (drops.length > 14) {
        drops = drops.slice(-14);
      }
    };

    const easeOut = (value: number) => 1 - Math.pow(1 - value, 3);
    const easeInOut = (value: number) =>
      value < .5 ? 2 * value * value : 1 - Math.pow(-2 * value + 2, 2) / 2;

    const draw = (time: number) => {
      const delta = Math.min(48, time - lastTime);
      lastTime = time;
      const rect = canvas.getBoundingClientRect();

      context.clearRect(0, 0, rect.width, rect.height);

      spawnIn -= delta;
      if (spawnIn <= 0) {
        spawnDrop();
        spawnIn = randomBetween(600, 1250);
      }

      drops = drops
        .map((drop) => ({ ...drop, age: drop.age + delta }))
        .filter((drop) => drop.age < drop.life);

      for (const drop of drops) {
        const progress = drop.age / drop.life;
        const spread = easeOut(progress);
        const fade = Math.pow(1 - progress, 1.45);
        const impactLife = drop.hasRipple ? .16 : .58;
        const arrival = Math.max(0, 1 - progress / impactLife);
        const radius = Math.max(1, drop.maxRadius * spread);
        const opacity = drop.alpha * fade;

        if (drop.hasRipple) {
          const gradient = context.createRadialGradient(
            drop.x,
            drop.y,
            0,
            drop.x,
            drop.y,
            radius,
          );

          context.filter = "blur(18px)";
          gradient.addColorStop(0, `rgba(${drop.color}, ${opacity * .28})`);
          gradient.addColorStop(
            .34 + easeInOut(progress) * .12,
            `rgba(${drop.color}, ${opacity * .2})`,
          );
          gradient.addColorStop(
            .72,
            `rgba(${drop.color}, ${opacity * .08})`,
          );
          gradient.addColorStop(1, `rgba(${drop.color}, 0)`);

          context.fillStyle = gradient;
          context.fillRect(0, 0, rect.width, rect.height);
        }

        if (arrival > 0) {
          const dotSpread = drop.hasRipple ? 1 - progress / .16 : 1 + progress * 2.8;
          const dotRadius = drop.dotRadius * Math.max(.25, dotSpread);
          const dot = context.createRadialGradient(
            drop.x,
            drop.y,
            0,
            drop.x,
            drop.y,
            dotRadius * (drop.hasRipple ? 7 : 12),
          );

          const dotAlpha = drop.hasRipple ? arrival * .16 : arrival * .095;

          context.filter = drop.hasRipple ? "none" : "blur(12px)";
          dot.addColorStop(0, `rgba(${drop.color}, ${dotAlpha})`);
          dot.addColorStop(.3, `rgba(${drop.color}, ${dotAlpha * .48})`);
          dot.addColorStop(1, `rgba(${drop.color}, 0)`);
          context.fillStyle = dot;
          context.fillRect(0, 0, rect.width, rect.height);
        }

        context.filter = "none";
      }

      frame = window.requestAnimationFrame(draw);
    };

    resize();
    window.addEventListener("resize", resize);
    frame = window.requestAnimationFrame(draw);

    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("resize", resize);
      drops = [];
      context.clearRect(0, 0, canvas.width, canvas.height);
    };
  }, [active, isVisible]);

  return <canvas className="intro__ambient" ref={canvasRef} aria-hidden="true" />;
}

export function HeroFlow() {
  const flowRef = useRef<HTMLDivElement | null>(null);
  const heroRef = useRef<HTMLElement | null>(null);
  const introRef = useRef<HTMLElement | null>(null);
  const stickyTitleRef = useRef<HTMLHeadingElement | null>(null);
  const introTitleRef = useRef<HTMLHeadingElement | null>(null);
  const cityVideoRef = useRef<HTMLVideoElement | null>(null);
  const nightVideoRef = useRef<HTMLVideoElement | null>(null);
  const [isIntro, setIsIntro] = useState(false);
  const [isLanded, setIsLanded] = useState(false);
  const [isHeroVisible, setIsHeroVisible] = useState(true);

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
    const hero = heroRef.current;
    if (!hero || !("IntersectionObserver" in window)) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsHeroVisible(entry.isIntersecting);
      },
      { rootMargin: "120px 0px", threshold: 0 },
    );

    observer.observe(hero);

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const cityVideo = cityVideoRef.current;
    const nightVideo = nightVideoRef.current;

    if (isHeroVisible) {
      void cityVideo?.play().catch(() => undefined);
      return;
    }

    cityVideo?.pause();
    nightVideo?.pause();
  }, [isHeroVisible]);

  useEffect(() => {
    const slideDuration = 18000;
    const nightSlideStart = slideDuration * 0.27;
    let interval: number | null = null;
    let startTimer: number | null = null;

    const playNightVideoFromStart = () => {
      const video = nightVideoRef.current;
      if (!video || !isHeroVisible) return;

      try {
        video.currentTime = 0;
        void video.play().catch(() => undefined);
      } catch {
        // Ignore browsers that reject seeking before metadata is ready.
      }
    };

    if (!isHeroVisible) {
      return () => undefined;
    }

    startTimer = window.setTimeout(() => {
      playNightVideoFromStart();
      interval = window.setInterval(
        playNightVideoFromStart,
        slideDuration,
      );
    }, nightSlideStart);

    return () => {
      if (startTimer) window.clearTimeout(startTimer);
      if (interval) window.clearInterval(Number(interval));
    };
  }, [isHeroVisible]);

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

      <section className="hero" aria-label="CordMark hero" ref={heroRef}>
        <div className="hero__slides" aria-hidden="true">
          <span className="hero__slide">
            <video
              autoPlay
              ref={cityVideoRef}
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
        <MissionAmbient active={isLanded} />
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
