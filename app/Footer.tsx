const footerLinks = [
  { label: "About", href: "/about" },
  { label: "Services", href: "/#services" },
  { label: "How We Work", href: "/#how-we-work" },
  { label: "Cases", href: "/#cases" },
  { label: "Privacy Policy", href: "/privacy-policy" },
];

type FooterProps = {
  homeLinks?: boolean;
};

export function Footer({ homeLinks = false }: FooterProps) {
  const formatHref = (href: string) => (homeLinks && href.startsWith("/#") ? href.slice(1) : href);
  const brandHref = homeLinks ? "#top" : "/";

  return (
    <footer className="site-footer">
      <div className="site-footer__brand">
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
