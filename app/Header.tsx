"use client";

import { useEffect, useState } from "react";

const navItems = [
  { href: "#about", label: "私たちについて" },
  { href: "#mission", label: "ミッション" },
  { href: "#business", label: "事業内容" },
  { href: "#news", label: "ニュース" },
  { href: "#recruit", label: "採用情報" },
];

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const updateHeader = () => setIsScrolled(window.scrollY > 20);

    updateHeader();
    window.addEventListener("scroll", updateHeader, { passive: true });
    return () => window.removeEventListener("scroll", updateHeader);
  }, []);

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
      <a className="brand" href="#top" aria-label="CordMark home">
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
        {navItems.map((item) => (
          <a key={item.href} href={item.href} onClick={() => setIsOpen(false)}>
            {item.label}
          </a>
        ))}
        <a className="nav-contact" href="#contact" onClick={() => setIsOpen(false)}>
          お問い合わせ
        </a>
      </nav>
    </header>
  );
}
