import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Noto_Sans_JP, Noto_Serif_JP } from "next/font/google";
import { Footer } from "../Footer";
import { CordMark } from "../home/CordMark";
import { RevealWatch } from "../home/RevealWatch";
import "../home/home.css";
import "../wv-page.css";
import "./about-page.css";

const serif = Noto_Serif_JP({
  subsets: ["latin"],
  weight: ["300", "400"],
  variable: "--wv-serif",
  display: "swap",
});
const sans = Noto_Sans_JP({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--wv-sans",
  display: "swap",
});

const pageTitle = "私たちについて | CordMark";
const pageDescription =
  "CordMarkは、ブリティッシュコロンビア大学でComputer Scienceを学んだ二人が、2026年に横浜で始めた会社です。AIを人の意思の側に置き、生まれた余力を人が考え、決め、創造する時間へ戻す。Company OSも開発の進め方も、まず自分たちの会社で使い、顧客の現場で確かめています。";

export const metadata: Metadata = {
  title: pageTitle,
  description: pageDescription,
  openGraph: {
    title: pageTitle,
    description: pageDescription,
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "私たちについて | CordMark",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: pageTitle,
    description: pageDescription,
    images: ["/og.png"],
  },
};

/** 節1 — 創業者。名前と役割は会社概要と同じ事実 */
const founders: Array<{ name: string; role: string; en: string }> = [
  { name: "橋本武士", role: "代表取締役CEO", en: "Takeshi Hashimoto" },
  { name: "山本圭亮", role: "代表取締役CTO", en: "Keisuke Yamamoto" },
];

/** 節2 — 自分たちの会社と、顧客の現場。順番の話 */
const grounds: Array<{ label: string; title: string; body: string }> = [
  {
    label: "01 · Ourselves",
    title: "まず、自分たちで踏む。",
    body: "Company OSも、AIを前提にした開発の進め方も、日々の自分たちの仕事で使う。使いにくいところ、決めきれないところが、提案より先に自分の手元に出る。",
  },
  {
    label: "02 · The field",
    title: "次に、顧客の現場で確かめる。",
    body: "受託・共同開発とAI駆動開発支援で、顧客の現場に入る。会社ごとに事情は違うので、自社で動いたものをそのまま持ち込まず、現場で残ったものだけを標準にする。",
  },
];

/** 節3 — 判断の仕方。原文は会社の正本、ここでは判断の場面が見える文だけ */
const principles = [
  {
    number: "01",
    title: "面白さを見失わない",
    body: "目標だけを見つめると、いまやっていることの意味を失う。目標を持ちながら、いま何をしていて、そこに面白さを見出せているかを問い続ける。つまらないことを避けるのではなく、問いや工夫、人との関わりの中に、自分たちなりの面白さをつくる。",
  },
  {
    number: "02",
    title: "遠くを見据えて今を決める",
    body: "目先の損得や自分たちの都合だけで決めない。短期的には手作業で済む仕事でも、繰り返すものはAIと仕組みで再現できる形に整える。すぐ利益にならない探索と学習にも時間を使い、未来の選択肢を広げる。",
  },
  {
    number: "03",
    title: "摩擦を価値に変える",
    body: "二人以上で働けば、意見は必ずずれる。それぞれが違う経験を積んできたからで、ずれは前進を妨げるものではなく、一人では届かない答えへの手がかりになる。対立するほど相手の誤りと決めつけず、自分に欠けている視点がないかを本気で考える。",
  },
  {
    number: "04",
    title: "確かさを積み上げる",
    body: "自分の推測を、事実だと思い込まない。小さく試し、結果を確かめ、必要なら仮説を変える。一つの成功例で分かったつもりにならず、製品の価値も市場の可能性も、自己評価ではなく外の反応で確かめる。",
  },
];

/** 会社の事実は、ここが正本 */
const companyInfo: Array<[string, ReactNode]> = [
  ["会社名", "CordMark株式会社"],
  [
    "代表者",
    <>
      <span className="wv-nowrap">代表取締役CEO 橋本武士</span>
      <br />
      <span className="wv-nowrap">代表取締役CTO 山本圭亮</span>
    </>,
  ],
  ["設立", "2026年7月3日"],
  ["資本金", "80万円"],
  ["法人番号", "3020001169482"],
  [
    "所在地",
    <>
      神奈川県横浜市
      <span className="wv-about-note">
        ※詳細な所在地は、個人情報保護法その他法令に基づき必要な場合、本人確認のうえ遅滞なく開示します。
      </span>
    </>,
  ],
  [
    "事業内容",
    "Company OSの企画・開発・展開、AI駆動開発支援（診断・導入・教育・伴走）、受託・共同開発、ボードゲーム・メディア等のプロダクト開発・運営",
  ],
  ["お問い合わせ", "info@cordmark.co.jp"],
];

function Arrow() {
  return (
    <svg viewBox="0 0 16 16" aria-hidden="true">
      <path d="M2.5 8h10" />
      <path d="m8.5 4 4 4-4 4" />
    </svg>
  );
}

export default function AboutPage() {
  return (
    <div className={`wv wv-page ${serif.variable} ${sans.variable}`}>
      <RevealWatch />
      <main id="top" className="site-main">
        {/* 扉 — 会社の名乗りと、名前そのもののマーク。帯は最小限の三項目 */}
        <section className="wv-section wv-about-hero" data-ground="paper" aria-labelledby="about-heading">
          <div className="wv-inner">
            <div className="wv-page__opening">
              <div className="wv-page__hero" data-reveal>
                <p className="wv-label">About</p>
                <h1 className="wv-h1" id="about-heading">
                  <span className="wv-nowrap">AIを、</span>
                  <span className="wv-nowrap">人の意思の側に置く。</span>
                </h1>
              </div>
              <div className="wv-page__door" data-reveal="2">
                <aside className="wv-chapter wv-about-chapter" aria-label="この章の位置">
                  <CordMark className="wv-about-chapter__mark" title="CordMarkのマーク" />
                  <p className="wv-chapter__role">CORD MARK</p>
                </aside>
                <p className="wv-lead">
                  AIを、人が考え、決め、創造するための力にする。CordMarkは、会社の意思と日々の仕事をつなぐ
                  <span className="wv-nowrap">Company OS</span>
                  の開発と、AIを前提にした開発支援に取り組んでいます。
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 節1 — 創業者。二人の名前と、AIの急発展期に重なった学生時代の話 */}
        <section className="wv-section wv-about-founders" data-ground="paper2" aria-labelledby="about-founders-heading">
          <div className="wv-inner">
            <div data-reveal>
              <p className="wv-label">Founders</p>
              <h2 className="wv-h2" id="about-founders-heading">
                <span className="wv-nowrap">変化を、</span>
                <span className="wv-nowrap">自分の手で経験した。</span>
              </h2>
            </div>
            <div className="wv-about-founders__grid">
              <div className="wv-about-founders__story" data-reveal="2">
                <p className="wv-lead">
                  橋本武士と山本圭亮は、カナダのブリティッシュコロンビア大学（UBC）でComputer Scienceを学びました。AIが急速に発展するなか、論文を読み、実装を試し、Coding Agentを使い込み、人の能力が広がる変化を経験しました。
                </p>
                <p>
                  AIで人の意思や創造性を、より大きな成果へつなげたい。その考えから、2026年7月、横浜でCordMarkを設立しました。開発事業に加え、ボードゲーム
                  <a className="wv-link wv-link--inline" href="/beyond">Laplace</a>
                  とメディア
                  <a className="wv-link wv-link--inline" href="/beyond">DotCraft</a>
                  を通じて、AIの先の遊びや表現も探っています。
                </p>
              </div>
              <dl className="wv-about-founders__names" data-reveal="3" aria-label="創業者">
                {founders.map((founder) => (
                  <div key={founder.name}>
                    <dt>{founder.role}</dt>
                    <dd>
                      <span className="wv-about-founders__name">{founder.name}</span>
                      <span className="wv-about-founders__en">{founder.en}</span>
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </section>

        {/* 節2 — 自社で使い、顧客の現場で確かめる */}
        <section className="wv-section wv-about-practice" data-ground="paper" aria-labelledby="about-practice-heading">
          <div className="wv-inner">
            <div data-reveal>
              <p className="wv-label">Practice</p>
              <h2 className="wv-h2" id="about-practice-heading">
                <span className="wv-nowrap">顧客に出す前に、</span>
                <br />
                <span className="wv-nowrap">自分たちで使う。</span>
              </h2>
              <p className="wv-lead">
                論文を読み、実装し、現場で使う。そこで得た知見を、開発支援と製品に還元しています。
              </p>
            </div>
            <div className="wv-split" data-reveal="2">
              {grounds.map((ground) => (
                <div key={ground.label}>
                  <p className="wv-split__label">{ground.label}</p>
                  <h3>{ground.title}</h3>
                  <p>{ground.body}</p>
                </div>
              ))}
            </div>
            <p className="wv-about-practice__links" data-reveal="3">
              <a className="wv-link" href="/company-os">
                Company OS <Arrow />
              </a>
              <a className="wv-link" href="/service/development">
                受託・共同開発 <Arrow />
              </a>
              <a className="wv-link" href="/service/support">
                AI駆動開発支援 <Arrow />
              </a>
            </p>
          </div>
        </section>

        {/* 節3 — このページの唯一の闇。判断の仕方を、罫と番号の四行で */}
        <section
          className="wv-section wv-about-principles"
          data-ground="charcoal"
          aria-labelledby="about-principles-heading"
        >
          <div className="wv-inner">
            <div data-reveal>
              <p className="wv-label">Principles</p>
              <h2 className="wv-h2" id="about-principles-heading">
                判断の仕方。
              </h2>
              <p className="wv-lead">
                日々の仕事で、迷ったときに立ち返る四つの指針です。
              </p>
            </div>
            <ol className="wv-index" data-reveal="2">
              {principles.map((principle) => (
                <li className="wv-index__row" key={principle.number}>
                  <p className="wv-index__num">{principle.number}</p>
                  <div className="wv-index__main">
                    <h3>{principle.title}</h3>
                  </div>
                  <div className="wv-index__side">
                    <p>{principle.body}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* 節4 — 会社概要。事実はここに一度だけ書く。名前の由来は一段落で、続きはトップへ */}
        <section className="wv-section wv-about-company" data-ground="paper" aria-labelledby="about-company-heading">
          <div className="wv-inner">
            <div data-reveal>
              <p className="wv-label">Company</p>
              <h2 className="wv-h2" id="about-company-heading">
                会社概要
              </h2>
              <p className="wv-lead wv-about-company__origin">
                社名のCordMarkは、縄文土器に残る縄目（cord mark）に由来します。
              </p>
              <p className="wv-about-company__link">
                <a className="wv-link" href="/#origin">
                  名前の話 <Arrow />
                </a>
              </p>
            </div>
            <dl className="wv-facts wv-facts--rows" data-reveal="2">
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
          </div>
        </section>

        {/* Contact — 闇で閉じる。フォームは /contact に置く */}
        <section
          className="wv-section wv-page__contact wv-about-contact"
          id="contact"
          data-ground="night"
          aria-labelledby="about-contact-heading"
        >
          <div className="wv-inner">
            <div data-reveal>
              <p className="wv-label">Contact</p>
              <h2 className="wv-h2 wv-h2--xl" id="about-contact-heading">
                <span className="wv-nowrap">何をつくるかから、</span>
                <br />
                <span className="wv-nowrap">一緒に考えましょう。</span>
              </h2>
            </div>
            <div className="wv-contact__row" data-reveal="2">
              <p className="wv-lead">
                会社のことでも、いま抱えている問いからでも構いません。現状を伺い、最初の一歩を一緒に整理します。
              </p>
              <a className="wv-contact__cta" href="/contact">
                相談する <Arrow />
              </a>
            </div>
            <dl className="wv-contact__facts" data-reveal="3">
              <div>
                <dt>Mail</dt>
                <dd>
                  <a href="mailto:info@cordmark.co.jp">info@cordmark.co.jp</a>
                </dd>
              </div>
              <div>
                <dt>Office</dt>
                <dd>神奈川県横浜市</dd>
              </div>
            </dl>
          </div>
        </section>
      </main>

      <Footer mark />
    </div>
  );
}
