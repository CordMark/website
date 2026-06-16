"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const navItems = [
  { href: "/about", label: "About" },
  { href: "#services", label: "Services" },
  { href: "#how-we-work", label: "How We Work" },
  { href: "#cases", label: "Cases" },
];

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === "/";
  const isContactPage = pathname === "/contact";
  const hasLocalContact =
    pathname === "/ai-driven-development" ||
    pathname.startsWith("/service/") ||
    pathname.startsWith("/services/");
  const navHref = (href: string) => (href.startsWith("#") ? (isHome ? href : `/${href}`) : href);
  const contactHref = isContactPage ? "/contact" : isHome || hasLocalContact ? "#contact" : "/contact";
  const brandHref = isHome ? "#top" : "/";

  useEffect(() => {
    const updateHeader = () => setIsScrolled(window.scrollY > 10);

    updateHeader();
    window.addEventListener("scroll", updateHeader, { passive: true });

    return () => window.removeEventListener("scroll", updateHeader);
  }, []);

  return (
    <header className={`site-header${isScrolled ? " is-scrolled" : ""}`}>
      <a className="brand" href={brandHref} aria-label="CordMark home">
        CordMark
      </a>

      <nav className="site-nav" aria-label="Primary navigation">
        {navItems.map((item) => (
          <a key={item.href} href={navHref(item.href)}>
            {item.label}
          </a>
        ))}
      </nav>

      <div className="header-actions">
        <a className="header-contact" href={contactHref}>
          Contact
        </a>
      </div>
    </header>
  );
}
