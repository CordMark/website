"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { businesses } from "./business/businessData";

const aboutItems = [
  { href: "/about?tab=mission", label: "ミッション" },
  { href: "/about?tab=principles", label: "行動指針" },
  { href: "/about?tab=company", label: "会社概要" },
];

const businessItems = businesses.map((business) => ({
  href: `/business/${business.slug}`,
  label: business.title,
}));

export function Header() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const updateHeader = () => {
      if (pathname !== "/") {
        setIsScrolled(true);
        return;
      }

      const stickyTitle = document.querySelector(".hero-sticky h1");
      const introTitle = document.querySelector(".intro__statement h2");

      if (stickyTitle && introTitle) {
        const stickyTop = stickyTitle.getBoundingClientRect().top;
        const introTop = introTitle.getBoundingClientRect().top;
        setIsScrolled(introTop <= stickyTop + 2);
        return;
      }

      setIsScrolled(false);
    };

    updateHeader();
    window.addEventListener("scroll", updateHeader, { passive: true });
    window.addEventListener("resize", updateHeader);

    return () => {
      window.removeEventListener("scroll", updateHeader);
      window.removeEventListener("resize", updateHeader);
    };
  }, [pathname]);

  useEffect(() => {
    document.body.classList.toggle("nav-open", isOpen);
    return () => document.body.classList.remove("nav-open");
  }, [isOpen]);

  return (
    <header
      className={`site-header${isScrolled ? " is-scrolled" : ""}${
        isOpen ? " is-open" : ""
      }`}
      data-header
    >
      <a className="brand" href="/" aria-label="CordMark home">
        CordMark
      </a>
      <button
        className="nav-toggle"
        type="button"
        aria-label="メニューを開く"
        aria-expanded={isOpen}
        onClick={() => setIsOpen((current) => !current)}
      >
        <span></span>
        <span></span>
      </button>
      <nav className="site-nav" data-nav>
        <div className="nav-item has-menu">
          <a className="nav-link" href="/about" onClick={() => setIsOpen(false)}>
            私たちについて <span className="nav-caret" aria-hidden="true"></span>
          </a>
          <div className="nav-menu">
            {aboutItems.map((item) => (
              <a key={item.href} href={item.href} onClick={() => setIsOpen(false)}>
                {item.label}
              </a>
            ))}
          </div>
        </div>

        <a className="nav-link" href="/about?tab=mission" onClick={() => setIsOpen(false)}>
          ミッション
        </a>

        <div className="nav-item has-menu">
          <a className="nav-link" href="/#business" onClick={() => setIsOpen(false)}>
            事業内容 <span className="nav-caret" aria-hidden="true"></span>
          </a>
          <div className="nav-menu">
            {businessItems.map((item) => (
              <a key={item.href} href={item.href} onClick={() => setIsOpen(false)}>
                {item.label}
              </a>
            ))}
          </div>
        </div>

        <a className="nav-link" href="/#news" onClick={() => setIsOpen(false)}>
          ニュース
        </a>
        <a className="nav-link" href="/#recruit" onClick={() => setIsOpen(false)}>
          採用情報
        </a>
        <a className="nav-contact" href="/#contact" onClick={() => setIsOpen(false)}>
          お問い合わせ
        </a>
      </nav>
    </header>
  );
}
