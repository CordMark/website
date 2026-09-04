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
  "CordMarkは、テクノロジーによる物質的な充足を、精神的な豊かさへ還元することを目指す会社です。会社の意思と日々の仕事をつなぐCompany OSを主要商品に、ソフトウェア開発の現場からそれを始めています。";

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

/** 扉の帯。会社そのものの事実だけ */
const facts: Array<[string, ReactNode]> = [
  ["会社名", <span className="wv-nowrap">CordMark株式会社</span>],
  ["設立", "2026年7月"],
  ["所在地", "神奈川県横浜市"],
  [
    "代表",
    <>
      <span className="wv-nowrap">橋本武士</span>、<span className="wv-nowrap">山本圭亮</span>
    </>,
  ],
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

const horizons: Array<{ number: string; period: string; title: string; body: ReactNode }> = [
  {
    number: "01",
    period: "PHASE 1 · AI-NATIVE",
    title: "意思と実行を、つなぐ。",
    body: (
      <>
        会社の意思決定と日々の仕事をつなぎ、人が判断と創造に集中できる状態を、ソフトウェア開発の現場からつくる。
        <span className="wv-nowrap">Company OS、</span>組織・業務改善の支援、受託・共同開発。
      </>
    ),
  },
  {
    number: "02",
    period: "PHASE 2 · BEYOND",
    title: "人に残る営みを、形にする。",
    body: "技術が行き渡ったあとにも、人が自ら行う価値のある営みがある。仲間の心理を読み合う2v2の戦略ボードゲームLaplace、社会と人間の先を考えるメディアDotCraft。",
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
        {/* 扉 — 会社の名乗りと、名前そのもののマーク */}
        <section className="wv-section wv-about-hero" data-ground="paper" aria-labelledby="about-heading">
          <div className="wv-inner">
            <div className="wv-page__hero">
              <div className="wv-page__hero-copy" data-reveal>
                <p className="wv-label">About</p>
                <h1 className="wv-h1" id="about-heading">
                  余力を、人へ戻す。
                </h1>
                <p className="wv-lead">
                  CordMarkは、テクノロジーによる物質的な充足を、精神的な豊かさへ還元することを目指す会社です。AIで生産力が上がったとき、その力を仕事量の拡大だけに使うのではなく、人が考え、決め、創造し、他者と関わる時間へ戻す。会社の意思と日々の仕事をつなぐ<span className="wv-nowrap">Company OS</span>を主要商品に、ソフトウェア開発の現場からそれを始めています。
                </p>
              </div>
              <aside className="wv-chapter wv-about-chapter" data-reveal="2" aria-label="この章の位置">
                <CordMark className="wv-about-chapter__mark" title="CordMarkのマーク" />
                <p className="wv-chapter__role">CORD MARK</p>
                <p className="wv-chapter__note">会社の名前と、考え方の出どころ。</p>
                <nav className="wv-chapter__links" aria-label="関連するページ">
                  <a className="wv-link" href="/#origin">
                    トップの考え方へ <Arrow />
                  </a>
                  <a className="wv-link" href="/beyond">
                    Phase 2 <Arrow />
                  </a>
                </nav>
              </aside>
            </div>
            <dl className="wv-facts" data-reveal="3">
              {facts.map(([key, value]) => (
                <div key={key}>
                  <dt>{key}</dt>
                  <dd>{value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        {/* 節1 Purpose — このページの唯一の闇。一文が一行ずつ現れ、罫が左から引かれる */}
        <section
          className="wv-section wv-about-purpose"
          data-ground="charcoal"
          aria-labelledby="about-purpose-heading"
        >
          <div className="wv-inner">
            <div data-reveal>
              <p className="wv-label">Purpose</p>
              <h2 className="wv-h2 wv-lines wv-about-purpose__statement" id="about-purpose-heading">
                <span className="wv-line">
                  <span>
                    テクノロジーによる
                    <br className="wv-br-sm" />
                    <span className="wv-nowrap">物質的な充足を、</span>
                  </span>
                </span>
                <span className="wv-line">
                  <span className="wv-nowrap">精神的な豊かさへ還元する。</span>
                </span>
              </h2>
            </div>
            <div className="wv-about-purpose__body" data-reveal="2">
              <p className="wv-lead">
                ツールを一つ増やしても、会社は速くなりません。変わるべきなのは、問いが答えに届き、判断が実行に届くまでの、仕事の流れそのものです。
              </p>
              <p className="wv-lead">
                AIは、人の意思を現実へ運ぶ力であり、判断に置き換わるものではありません。誰が、何を根拠に決めたかが残り、次の判断の土台になる。その仕組みを自分たちの会社でまず動かし、顧客の現場に合わせて持ち込みます。
              </p>
            </div>
          </div>
        </section>

        {/* 節2 Principles — 罫と番号の四行 */}
        <section
          className="wv-section wv-about-principles"
          data-ground="paper"
          aria-labelledby="about-principles-heading"
        >
          <div className="wv-inner">
            <div data-reveal>
              <p className="wv-label">Principles</p>
              <h2 className="wv-h2" id="about-principles-heading">
                判断の仕方。
              </h2>
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

        {/* 節3 Origin — 名前の出どころと、二つの段階 */}
        <section className="wv-section wv-about-origin" data-ground="paper2" aria-labelledby="about-origin-heading">
          <div className="wv-inner">
            <div data-reveal>
              <p className="wv-label">Origin</p>
              <h2 className="wv-h2" id="about-origin-heading">
                <span>
                  一万年前、
                  <br className="wv-br-sm" />
                  <span className="wv-nowrap">人は余った時間で、</span>
                </span>
                <br />
                <span className="wv-nowrap">土器に縄目を刻んだ。</span>
              </h2>
              <p className="wv-lead">
                縄文の土器に残る縄目、cord
                mark。豊かな資源を人の豊かな暮らしへつなげた、豊かさの原型です。CordMarkの名前は、そこから来ています。
              </p>
              <p className="wv-lead">
                AIが生む余力で、私たちは何を刻むのか。その問いを、二つの段階で考えています。
              </p>
            </div>
            <div className="wv-split" data-reveal="2">
              <div>
                <p className="wv-split__label">{horizons[0].period}</p>
                <h3>{horizons[0].title}</h3>
                <p>{horizons[0].body}</p>
              </div>
              <div>
                <p className="wv-split__label">{horizons[1].period}</p>
                <h3>{horizons[1].title}</h3>
                <p>{horizons[1].body}</p>
                <p className="wv-about-origin__link">
                  <a className="wv-link" href="/beyond">
                    Phase 2を見る <Arrow />
                  </a>
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 節4 Company — 罫だけの表 */}
        <section className="wv-section wv-about-company" data-ground="paper" aria-labelledby="about-company-heading">
          <div className="wv-inner">
            <div data-reveal>
              <p className="wv-label">Company</p>
              <h2 className="wv-h2" id="about-company-heading">
                会社概要
              </h2>
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
