import { Header } from "./Header";
import { HeroFlow } from "./HeroFlow";
import { NewsSection } from "./NewsSection";
import { BorderTrace } from "./BorderTrace";
import { businesses } from "./business/businessData";

const featuredLinkLabels: Record<string, { category: string; title: string }> =
  {
    "YouTubeメディア DotCraft": {
      category: "YouTubeメディア",
      title: "DotCraft",
    },
    "ボードゲーム Laplace": { category: "ボードゲーム", title: "Laplace" },
  };

export default function Home() {
  return (
    <>
      <Header />

      <main id="top">
        <HeroFlow />

        <section className="section service" id="business">
          <div className="section__head two-col">
            <div>
              <p className="section-title">SERVICE</p>
              <p>自動化から、文化共創まで</p>
            </div>
            <p>
              CordMarkは、業務改善・AI活用・自動化を通じて、組織や施設の運営負荷を下げる仕組みを実装します。さらに、人々に生まれる余白を文化的な営みへとつなぐサービスを展開し、暮らしと組織の新しいあり方をつくります。
            </p>
          </div>

          <div className="card-grid">
            {businesses.map((service, index) => (
              <article
                className={`service-card${index % 2 === 1 ? " service-card--reverse" : ""}`}
                key={service.title}
              >
                <div className="service-card__media">
                  <img src={service.image} alt={service.alt} />
                </div>
                <div className="service-card__body">
                  <h3>{service.title}</h3>
                  <p>{service.summary}</p>
                  <div className="service-card__links">
                    {service.links.map((link) => {
                      const featuredLabel = featuredLinkLabels[link];

                      return (
                        <a
                          className={`small-link${featuredLabel ? " small-link--featured" : ""}`}
                          href={`/business/${service.slug}`}
                          key={link}
                        >
                          {featuredLabel ? (
                            <span className="small-link__label">
                              <span className="small-link__category">
                                {featuredLabel.category}
                              </span>
                              <span className="small-link__title">
                                {featuredLabel.title}
                              </span>
                            </span>
                          ) : (
                            link
                          )}
                          <span
                            className="small-link__arrow"
                            aria-hidden="true"
                          ></span>
                        </a>
                      );
                    })}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <NewsSection />

        <section className="join" id="recruit">
          <div className="join__inner">
            <div>
              <p className="section-kicker">Join Us</p>
              <h2>
                次なる時代を、
                <br />
                共につくろう。
              </h2>
            </div>
            <div>
              <p>
                CordMarkは、AIによる変化を単なる技術革新ではなく、千年単位で続いてきた生活様式が組み替わる転換点として捉えています。暮らし、組織、文化の新しい基盤を、事業として共に実装していく仲間を求めています。
              </p>
              <a className="outline-link border-spin" href="#contact">
                採用情報へ <span aria-hidden="true"></span>
                <BorderTrace />
              </a>
            </div>
          </div>
        </section>

        <section className="contact" id="contact">
          <div className="contact__shade"></div>
          <div className="contact__inner">
            <div>
              <h2>Contact Us.</h2>
              <p>お気軽にご相談ください</p>
            </div>
            <form className="contact-card">
              <p className="contact-card__title">CONTACT</p>
              <p>お問い合わせ</p>
              <a
                className="primary-button"
                href="mailto:hello@cordmark.example"
              >
                お問い合わせフォームへ <span aria-hidden="true"></span>
              </a>
            </form>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="footer__inner">
          <div>
            <a className="brand brand--footer" href="#top">
              CordMark
            </a>
          </div>
          <nav className="footer-nav" aria-label="Footer menu">
            <p>Menu</p>
            <a href="#about">about</a>
            <a href="#business">business</a>
            <a href="#news">news</a>
            <a href="#recruit">recruit</a>
            <a href="#contact">contact</a>
          </nav>
          <nav className="footer-nav" aria-label="Footer other links">
            <p>Other</p>
            <a href="#top">privacy policy</a>
            <a href="#top">terms &amp; conditions</a>
          </nav>
          <div className="address">
            <p>Address</p>
            <address>
              〒150-0001 東京都渋谷区神宮前1-2-3
              <br />
              CordMark Studio
              <br />
              最寄駅: ○○駅 徒歩5分
            </address>
            <img src="/assets/map.jpg" alt="CordMark Studio周辺の地図" />
          </div>
        </div>
        <p className="copyright">© 2025 CordMark Inc.</p>
      </footer>
    </>
  );
}
