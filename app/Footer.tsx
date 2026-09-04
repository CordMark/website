/** 全体地図。サイトの節と下層ページを、順に並べる */
const footerLinks = [
  { label: "受託・共同開発", href: "/service/development" },
  { label: "AI活用支援", href: "/service/support" },
  { label: "Company OS", href: "/company-os" },
  { label: "私たちについて", href: "/about" },
  { label: "Phase 2", href: "/beyond" },
  { label: "お問い合わせ", href: "/contact" },
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
    </footer>
  );
}
