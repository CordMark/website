import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Noto_Sans_JP, Noto_Serif_JP } from "next/font/google";
import { Footer } from "../Footer";
import { CordMark } from "../home/CordMark";
import { RevealWatch } from "../home/RevealWatch";
import "../home/home.css";
import "../wv-page.css";
import "./about-page.css";

const serif = Noto_Serif_JP({ subsets: ["latin"], weight: ["300", "400"], variable: "--wv-serif", display: "swap" });
const sans = Noto_Sans_JP({ subsets: ["latin"], weight: ["400", "500", "700"], variable: "--wv-sans", display: "swap" });

const pageTitle = "私たちについて | CordMark";
const pageDescription =
  "CordMarkは、2026年に横浜で始めた会社です。AIで上がった生産力を、人が考え、決め、創造する時間へ戻す。Company OSも開発の進め方も、まず自分たちの会社で使い、顧客の現場で確かめています。";

export const metadata: Metadata = {
  title: pageTitle,
  description: pageDescription,
  openGraph: {
    title: pageTitle,
    description: pageDescription,
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "私たちについて | CordMark" }],
  },
  twitter: {
    card: "summary_large_image",
    title: pageTitle,
    description: pageDescription,
    images: ["/og.png"],
  },
};

/** 節1 — 自分たちの会社と、顧客の現場。順番の話 */
const grounds: Array<{ label: string; title: string; body: string }> = [
  {
    label: "01 · Ourselves",
    title: "まず、自分たちで踏む。",
    body: "Company OSも、AIを前提にした開発の進め方も、日々の自分たちの仕事で使う。使いにくいところ、決めきれないところが、提案より先に自分の手元に出る。",
  },
  {
    label: "02 · The field",
    title: "次に、顧客の現場で確かめる。",
    body: "受託・共同開発と組織・業務改善の支援で、顧客の現場に入る。会社ごとに事情は違うので、自社で動いたものをそのまま持ち込まず、現場で残ったものだけを標準にする。",
  },
];

const principles = [
  {
    number: "01",
    title: "面白さを見失わない",
    body: "仕事も、その先の営みも、人が面白いと感じることから離れない。",
  },
  {
    number: "02",
    title: "遠くを見据えて今を決める",
    body: "AIの先にある人の生き方から逆算して、今日の判断を選ぶ。",
  },
  {
    number: "03",
    title: "摩擦を価値に変える",
    body: "異なる経験と文脈のずれを消さず、判断の材料として残す。",
  },
  {
    number: "04",
    title: "確かさを積み上げる",
    body: "自分たちの会社で先に動かし、顧客の現場で確かめたものだけを広げる。",
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
  ["設立", "2026年7月"],
  ["資本金", "80万円"],
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
    "Company OSの企画・開発・展開、組織・業務改善支援、AI駆動開発の導入・教育・伴走、受託・共同開発、ボードゲーム・メディア等のプロダクト開発・運営",
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
            <div className="wv-page__hero">
              <div className="wv-page__hero-copy" data-reveal>
                <p className="wv-label">About</p>
                <h1 className="wv-h1" id="about-heading">
                  余力を、人へ戻す。
                </h1>
                <p className="wv-lead">
                  CordMarkは、2026年に横浜で始めた会社です。AIで生産力が上がった分を、仕事量の拡大ではなく、人が考え、決め、創造し、他者と関わる時間へ戻す。そのために会社の意思と日々の仕事をつなぐ<span className="wv-nowrap">Company OS</span>をつくり、まず自分たちの会社で使い、ソフトウェア開発の現場へ持ち込んでいます。
                </p>
              </div>
              <aside className="wv-chapter wv-about-chapter" data-reveal="2" aria-label="この章の位置">
                <CordMark className="wv-about-chapter__mark" title="CordMarkのマーク" />
                <p className="wv-chapter__role">CORD MARK</p>
                <p className="wv-chapter__note">社名は、土器に残る縄目から。</p>
              </aside>
            </div>
          </div>
        </section>

        {/* 節1 — 順番の話。二列を縦罫で継ぐ */}
        <section
          className="wv-section wv-about-practice"
          data-ground="paper2"
          aria-labelledby="about-practice-heading"
        >
          <div className="wv-inner">
            <div data-reveal>
              <p className="wv-label">Practice</p>
              <h2 className="wv-h2" id="about-practice-heading">
                <span className="wv-nowrap">顧客に出す前に、</span>
                <br />
                <span className="wv-nowrap">自分たちで使う。</span>
              </h2>
              <p className="wv-lead">
                仕事の流れを組み替える提案は、外から眺めているだけでは書けません。詰まるのはたいてい、機能の不足ではなく、誰がいつ何を決めるかの取り決めのほうです。だから順番を決めています。
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
              <a className="wv-link" href="/#services">
                三つの実践 <Arrow />
              </a>
            </p>
          </div>
        </section>

        {/* 節2 — このページの唯一の闇。判断の仕方を、罫と番号の四行で */}
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
                速く動く会社ほど、判断の数が増えます。二人の代表と、その場にいる人が迷ったときに戻る四つを、先に決めています。
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

        {/* 節3 — 会社概要。事実はここに一度だけ書く。名前の由来は一段落で、続きはトップへ */}
        <section className="wv-section wv-about-company" data-ground="paper" aria-labelledby="about-company-heading">
          <div className="wv-inner">
            <div data-reveal>
              <p className="wv-label">Company</p>
              <h2 className="wv-h2" id="about-company-heading">
                会社概要
              </h2>
              <p className="wv-lead wv-about-company__origin">
                社名は、縄文の土器に残る縄目、cord markから。余った力が暮らしの形になった、いちばん古い痕跡です。
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
