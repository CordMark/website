const footerLinks = [
  { label: "私たちについて", href: "/about" },
  { label: "Company OS", href: "/#company-os" },
  { label: "事業", href: "/#services" },
  { label: "考え方", href: "/#principles" },
  { label: "プライバシー", href: "/privacy-policy" },
];

import { CordMark } from "./home/CordMark";

type FooterProps = {
  homeLinks?: boolean;
  /** show the brand mark above the wordmark (pages that use the .wv palette) */
  mark?: boolean;
};

export function Footer({ homeLinks = false, mark = homeLinks }: FooterProps) {
  const formatHref = (href: string) => (homeLinks && href.startsWith("/#") ? href.slice(1) : href);
  const brandHref = homeLinks ? "#top" : "/";

  return (
    <footer className="site-footer">
      <div className="site-footer__brand">
        {mark ? <CordMark className="site-footer__mark" /> : null}
        <a className="brand brand--footer" href={brandHref} aria-label="CordMark home">
          CordMark
        </a>
        <small>© 2026 CORDMARK Inc. All rights reserved.</small>
      </div>
      <nav aria-label="Footer navigation">
        {footerLinks.map((link) => (
          <a key={link.label} href={formatHref(link.href)}>
            {link.label}
          </a>
        ))}
      </nav>
      <a className="to-top" href="#top" aria-label="ページ上部へ戻る">
        ↑
      </a>
    </footer>
  );
}
