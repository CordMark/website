"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

type NavItem = {
  href: string;
  label: string;
  children?: {
    href: string;
    label: string;
  }[];
};

const navItems: NavItem[] = [
  { href: "/about", label: "About" },
  {
    href: "#services",
    label: "Services",
    children: [
      { href: "/service/ai-driven-development", label: "AI-Driven Development" },
      { href: "/service/ai-native-company", label: "AI Native Company Transformation" },
    ],
  },
  { href: "#how-we-work", label: "How We Work" },
  { href: "#cases", label: "Cases" },
];

const mobileMenuId = "mobile-navigation";

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === "/";
  const navHref = (href: string) => (href.startsWith("#") ? (isHome ? href : `/${href}`) : href);
  const brandHref = isHome ? "#top" : "/";
  const closeMenu = () => setIsMenuOpen(false);

  useEffect(() => {
    const updateHeader = () => setIsScrolled(window.scrollY > 10);

    updateHeader();
    window.addEventListener("scroll", updateHeader, { passive: true });

    return () => window.removeEventListener("scroll", updateHeader);
  }, []);

  useEffect(() => {
    if (!isMenuOpen) return;

    const previousOverflow = document.body.style.overflow;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsMenuOpen(false);
      }
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", closeOnEscape);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [isMenuOpen]);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    const desktopQuery = window.matchMedia("(min-width: 1101px)");
    const closeOnDesktop = () => {
      if (desktopQuery.matches) {
        setIsMenuOpen(false);
      }
    };

    closeOnDesktop();
    desktopQuery.addEventListener("change", closeOnDesktop);

    return () => desktopQuery.removeEventListener("change", closeOnDesktop);
  }, []);

  return (
    <header className={`site-header${isScrolled ? " is-scrolled" : ""}${isMenuOpen ? " is-menu-open" : ""}`}>
      <a className="brand" href={brandHref} aria-label="CordMark home">
        CordMark
      </a>

      <nav className="site-nav" aria-label="Primary navigation">
        {navItems.map((item) => (
          item.children ? (
            <div className="site-nav__item site-nav__item--dropdown" key={item.href}>
              <a
                className="site-nav__trigger"
                href={navHref(item.href)}
                aria-haspopup="true"
              >
                {item.label}
              </a>
              <div className="site-nav__menu" aria-label={`${item.label} menu`}>
                {item.children.map((child) => (
                  <a className="site-nav__menu-link" href={child.href} key={child.href}>
                    {child.label}
                  </a>
                ))}
              </div>
            </div>
          ) : (
            <a key={item.href} href={navHref(item.href)}>
              {item.label}
            </a>
          )
        ))}
      </nav>

      <div className="header-actions">
        <a className="header-contact" href="/contact">
          Contact
        </a>
        <button
          className="mobile-menu-toggle"
          type="button"
          aria-controls={mobileMenuId}
          aria-expanded={isMenuOpen}
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          onClick={() => setIsMenuOpen((current) => !current)}
        >
          <span className="mobile-menu-toggle__lines" aria-hidden="true">
            <span />
            <span />
            <span />
          </span>
        </button>
      </div>

      <button
        className="mobile-menu-overlay"
        type="button"
        aria-label="Close menu"
        tabIndex={isMenuOpen ? 0 : -1}
        onClick={closeMenu}
      />

      <aside className="mobile-menu-panel" id={mobileMenuId} aria-hidden={!isMenuOpen}>
        <nav className="mobile-menu-nav" aria-label="Mobile navigation">
          {navItems.map((item) => (
            item.children ? (
              <div className="mobile-menu-nav__group" key={item.href}>
                <a
                  className="mobile-menu-nav__link mobile-menu-nav__link--parent"
                  href={navHref(item.href)}
                  onClick={closeMenu}
                >
                  {item.label}
                </a>
                <div className="mobile-menu-nav__children" aria-label={`${item.label} menu`}>
                  {item.children.map((child) => (
                    <a
                      className="mobile-menu-nav__child-link"
                      href={child.href}
                      key={child.href}
                      onClick={closeMenu}
                    >
                      {child.label}
                    </a>
                  ))}
                </div>
              </div>
            ) : (
              <a
                className="mobile-menu-nav__link"
                key={item.href}
                href={navHref(item.href)}
                onClick={closeMenu}
              >
                {item.label}
              </a>
            )
          ))}
          <a className="mobile-menu-contact" href="/contact" onClick={closeMenu}>
            Contact
          </a>
        </nav>
      </aside>
    </header>
  );
}
