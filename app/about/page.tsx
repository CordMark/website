import type { Metadata } from "next";
import { Footer } from "../Footer";

export const metadata: Metadata = {
  title: "About | CordMark",
  description:
    "CordMarkは、企業の意思決定、業務プロセス、ナレッジ、プロダクト開発をAI前提の構造へ変えていくAI Native Studioです。",
};

const principles = [
  {
    number: "01",
    title: "Human-first",
    body: "すべての意思決定の中心に、人の価値と創造性を置く。",
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

const companyInfo = [
  ["会社名", "CordMark株式会社"],
  ["代表者", "橋本武士、山本圭亮"],
  ["設立", "2026年6月"],
  ["資本金", "80万円"],
  [
    "所在地",
    "神奈川県横浜市（※詳細な所在地は、個人情報保護法その他法令に基づき必要な場合、本人確認のうえ遅滞なく開示します。）",
  ],
  [
    "事業内容",
    "AI Native化支援、AI Agent / Workflow設計、業務プロセス再設計、AI駆動開発支援",
  ],
  ["お問い合わせ", "info@cordmark.jp"],
];

export default function AboutPage() {
  return (
    <>
      <main id="top" className="about-page site-main">
        <section className="about-hero" aria-labelledby="about-heading">
          <div className="about-hero__copy">
            <p className="about-kicker">More About Us</p>
            <h1 id="about-heading">
              <span>AIを導入するのではなく、</span>
              <span>会社の動き方を再設計する。</span>
            </h1>
            <p className="about-hero__lead">
              CordMarkは、企業の意思決定、業務プロセス、ナレッジ、
              <br />
              プロダクト開発を、AI前提の構造へ変えていくAI Native Studioです。
            </p>
            <p>
              私たちは、AIを単なる効率化ツールとして扱いません。
              <br />
              人間とAIがともに考え、動き、学習するための業務構造を設計し、
              <br />
              現場で使われ続ける仕組みとして実装します。
            </p>
          </div>
          <div className="about-hero__visual" aria-hidden="true">
            <img src="/assets/ai-native-company-hero.png" alt="" />
          </div>
        </section>

        <section id="philosophy" className="about-philosophy" aria-labelledby="about-philosophy-heading">
          <div className="about-philosophy__inner">
            <p className="about-kicker">Philosophy</p>
            <h2 id="about-philosophy-heading">
              <span>AI Native化とは、</span>
              <span>人を減らすことではなく、</span>
              <span className="about-philosophy-desktop-line">
                人間が担うべき仕事を再定義することだ。
              </span>
              <span className="about-philosophy-mobile-line">人間が担うべき仕事を</span>
              <span className="about-philosophy-mobile-line">再定義することだ。</span>
            </h2>
            <div className="about-philosophy__body">
              <p>
                AIによって変わるべきなのは、ツールの数ではありません。
                <br />
                変わるべきなのは、会社が判断し、実行し、学習する仕組みそのものです。
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

        <section id="company" className="about-company" aria-labelledby="about-company-heading">
          <p className="about-kicker">Company</p>
          <h2 id="about-company-heading">Company Information</h2>
          <dl className="about-info-table">
            {companyInfo.map(([label, value]) => (
              <div key={label}>
                <dt>{label}</dt>
                <dd>
                  {label === "お問い合わせ" ? <a href={`mailto:${value}`}>{value}</a> : value}
                </dd>
              </div>
            ))}
          </dl>
          <div className="about-company__cta">
            <p>AIを試す段階から、AIで事業を動かす段階へ。</p>
            <a className="button button--dark about-company__button" href="/contact">
              Contact Us <span aria-hidden="true">→</span>
            </a>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
