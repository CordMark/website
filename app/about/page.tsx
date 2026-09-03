import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Footer } from "../Footer";
import { LaplaceFeature } from "../LaplaceFeature";

export const metadata: Metadata = {
  title: "About | CordMark",
  description:
    "CordMarkは、会社の中核にAIを据えるCompanyOSの実装と、その先に生まれる人間の営みを構想するAI Native Implementation Studioです。",
};

const principles = [
  {
    number: "01",
    title: "AI at the core",
    body: "AIを一機能で終わらせず、経営と現場を動かす中核に据える。",
  },
  {
    number: "02",
    title: "Structure over tools",
    body: "一時的なツール導入ではなく、持続可能な構造設計を行う。",
  },
  {
    number: "03",
    title: "Implementation, not slogans",
    body: "言葉ではなく、成果を生む実装にこだわる。",
  },
];

const horizons = [
  {
    number: "01",
    period: "THE NEXT DECADE",
    title: "AIで、社会の仕組みを組み替える。",
    body: "企業と働き方を起点に、教育、介護をはじめとする領域へ。AIを中核に据え、意思決定・業務・知識・プロダクトを構造から変えていきます。",
  },
  {
    number: "02",
    period: "AFTER AI TRANSFORMATION",
    title: "余白に、人間の営みを形づくる。",
    body: "人と人が競い、遊び、つながり、文化をつくる。Laplaceをはじめ、AIの先に残るエンターテインメントやコミュニティを構想します。",
  },
];

const companyInfo: Array<[string, ReactNode]> = [
  ["会社名", "CordMark株式会社"],
  ["代表者", "橋本武士、山本圭亮"],
  ["設立", "2026年7月"],
  ["資本金", "80万円"],
  [
    "所在地",
    <>
      神奈川県横浜市
      <span className="about-info-note">
        ※詳細な所在地は、個人情報保護法その他法令に基づき必要な場合、本人確認のうえ遅滞なく開示します。
      </span>
    </>,
  ],
  [
    "事業内容",
    "CompanyOS / AI Native化支援、AI Agent / Workflow設計、業務プロセス再設計、AI駆動開発支援、文化・エンターテインメント領域のプロダクト開発、メディア運営",
  ],
  ["お問い合わせ", "info@cordmark.co.jp"],
];

export default function AboutPage() {
  return (
    <>
      <main id="top" className="about-page site-main">
        <section className="about-hero" aria-labelledby="about-heading">
          <div className="about-hero__copy">
            <p className="about-kicker">About CordMark</p>
            <h1 id="about-heading">
              <span>会社の中核にAIを。</span>
              <span>AIの先に、人間の営みを。</span>
            </h1>
            <p className="about-hero__lead">
              CordMarkは、経営、意思決定、業務、ナレッジ、
              <br />
              プロダクトをAIでつなぎ、会社をひとつのOSとして再設計する実装スタジオです。
            </p>
            <p>
              私たちが目指すのは、AIチャットボットを導入することではありません。
              <br />
              人間とAIがともに判断し、動き、学習する構造を会社の中核につくること。
              <br />
              そして、その変革の先に生まれる人間の時間までを構想することです。
            </p>
          </div>
          <div className="about-hero__visual" aria-hidden="true">
            <img src="/assets/about-hero.webp" alt="" loading="eager" fetchPriority="high" decoding="async" />
          </div>
        </section>

        <section id="philosophy" className="about-philosophy" aria-labelledby="about-philosophy-heading">
          <div className="about-philosophy__inner">
            <p className="about-kicker">Philosophy</p>
            <h2 id="about-philosophy-heading">
              <span>AI Native化とは、</span>
              <span>ツールを増やすことではなく、</span>
              <span className="about-philosophy-desktop-line">
                会社そのものを再設計することだ。
              </span>
              <span className="about-philosophy-mobile-line">会社そのものを</span>
              <span className="about-philosophy-mobile-line">再設計することだ。</span>
            </h2>
            <div className="about-philosophy__body">
              <p>
                AIによって変わるべきなのは、ひとつの作業だけではありません。
                <br />
                変わるべきなのは、会社が判断し、実行し、顧客に価値を届け、学習する仕組みそのものです。
              </p>
              <p>
                個人のAI活用で終わらせず、業務フロー、ナレッジ、データ、ガバナンス、
                <br />
                プロダクト開発までを接続する。
                <br />
                それによって、AIが一部の人の能力拡張ではなく、
                <br />
                会社全体のOperating Systemとして機能する状態をつくります。
              </p>
            </div>

            <div className="about-principles" aria-label="CordMarkの行動指針">
              {principles.map((principle) => (
                <article className="about-principle" key={principle.number}>
                  <span>{principle.number}</span>
                  <h3>{principle.title}</h3>
                  <p>{principle.body}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="about-future" aria-labelledby="about-future-heading">
          <div className="about-future__intro">
            <p className="about-kicker">Two Horizons</p>
            <h2 id="about-future-heading">AI変革の、さらに先まで。</h2>
            <p>
              CordMarkという名は、土器に刻まれた縄目――「縄文」に由来します。縄文の人々には、比較的豊かな余白があったとする見方があります。その余白のなかで道具に模様を刻み、文化を残したのかもしれない。私たちは、AIが社会を構造から変えたあと、人間がその余白に何を刻むのかまでを見ています。
            </p>
          </div>
          <div className="about-horizons">
            {horizons.map((horizon) => (
              <article key={horizon.number}>
                <div>
                  <span>{horizon.number}</span>
                  <p>{horizon.period}</p>
                </div>
                <h3>{horizon.title}</h3>
                <p>{horizon.body}</p>
              </article>
            ))}
          </div>
          <LaplaceFeature context="about" />
        </section>

        <section id="company" className="about-company" aria-labelledby="about-company-heading">
          <p className="about-kicker">Company</p>
          <h2 id="about-company-heading">Company Information</h2>
          <dl className="about-info-table">
            {companyInfo.map(([label, value]) => (
              <div key={label}>
                <dt>{label}</dt>
                <dd>
                  {label === "お問い合わせ" && typeof value === "string" ? (
                    <a href={`mailto:${value}`}>{value}</a>
                  ) : (
                    value
                  )}
                </dd>
              </div>
            ))}
          </dl>
          <div className="about-company__cta">
            <p>AIを試す段階から、AIで事業を動かす段階へ。</p>
            <a className="button button--dark about-company__button" href="/contact">
              無料で相談する <span aria-hidden="true">→</span>
            </a>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
