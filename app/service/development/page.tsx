import type { Metadata } from "next";
import { Noto_Sans_JP, Noto_Serif_JP } from "next/font/google";
import { Footer } from "../../Footer";
import { RevealWatch } from "../../home/RevealWatch";
import "../../home/home.css";
import "../../wv-page.css";
import "./dev-page.css";

const serif = Noto_Serif_JP({ subsets: ["latin"], weight: ["300", "400"], variable: "--wv-serif", display: "swap" });
const sans = Noto_Sans_JP({ subsets: ["latin"], weight: ["400", "500", "700"], variable: "--wv-sans", display: "swap" });

const pageTitle = "受託・共同開発 | CordMark";
const pageDescription =
  "つくりたいものが仕様として固まっていなくて構いません。CordMarkの受託・共同開発は、構想や課題を言葉にする要件定義から引き受け、積み上げた開発の経験を土台に実装し、運用保守まで続けます。";

export const metadata: Metadata = {
  title: pageTitle,
  description: pageDescription,
  openGraph: {
    title: pageTitle,
    description: pageDescription,
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "受託・共同開発 | CordMark" }],
  },
  twitter: {
    card: "summary_large_image",
    title: pageTitle,
    description: pageDescription,
    images: ["/og.png"],
  },
};

/** 三段の進め方。段ごとに、こちらが持ち込むものと、顧客の手元に残るもの */
const steps = [
  {
    num: "01",
    role: "REQUIREMENTS",
    title: "要件定義",
    body: "つくるものが固まっていなくて構いません。CordMarkが主体になり、構想と課題を聞き取り、何をつくるかを言葉にするところから始めます。",
    brings: "問いを立て、決めきる進め方",
    leaves: "言葉になった要件",
  },
  {
    num: "02",
    role: "BUILD",
    title: "実装",
    body: "決まったものを、最新の手法で速く形にする。どこまで機械に任せ、どこで人が手を入れるかの勘所は、これまでの開発で積み上げたものを使います。",
    brings: "AIを使った開発の経験",
    leaves: "動くアプリ・システム",
  },
  {
    num: "03",
    role: "OPERATION",
    title: "運用保守",
    body: "つくって終わりにしない。使われ方を見ながら直し、動き続ける状態を保ちます。作った本人たちが、そのまま手を入れます。",
    brings: "継続して手を入れる体制",
    leaves: "使われ続ける仕組み",
  },
];

function Arrow() {
  return (
    <svg viewBox="0 0 16 16" aria-hidden="true">
      <path d="M2.5 8h10" />
      <path d="m8.5 4 4 4-4 4" />
    </svg>
  );
}

export default function DevelopmentPage() {
  return (
    <div className={`wv wv-page ${serif.variable} ${sans.variable}`}>
      <RevealWatch />
      <main id="top" className="site-main">
        {/* 扉 — 何の章か、どこに属するか、事実の帯 */}
        <section className="wv-section wv-dev-hero" data-ground="paper" aria-labelledby="dev-heading">
          <div className="wv-inner">
            <div className="wv-page__hero">
              <div className="wv-page__hero-copy" data-reveal>
                <p className="wv-label">受託・共同開発 — 01 / DELIVERY</p>
                <h1 className="wv-h1" id="dev-heading">
                  <span className="wv-nowrap">まだ言葉になっていない。</span>
                  <br />
                  <span className="wv-nowrap">そこから、つくり始める。</span>
                </h1>
                <p className="wv-lead">
                  つくりたいものが仕様として固まっていることは、多くありません。CordMarkの受託・共同開発は、構想と課題を言葉にする要件定義から引き受け、積み上げた開発の経験を土台に実装し、運用保守まで続けます。顧客の具体的な課題に応えるアプリ・システムを、現場を理解したうえでつくります。
                </p>
              </div>
              <aside className="wv-chapter" data-reveal="2" aria-label="この章の位置">
                <p className="wv-chapter__num">01</p>
                <p className="wv-chapter__role">DELIVERY</p>
              </aside>
            </div>
          </div>
        </section>

        {/* 節1 なぜ速いか — 見出しを左に置き、右に短い二段落。絵はない */}
        <section className="wv-section wv-dev-speed" data-ground="paper2" aria-labelledby="dev-speed-heading">
          <div className="wv-inner">
            <div className="wv-dev-speed__grid">
              <div data-reveal>
                <p className="wv-label">Speed</p>
                <h2 className="wv-h2" id="dev-speed-heading">
                  <span className="wv-nowrap">道具が同じでも、</span>
                  <br />
                  <span className="wv-nowrap">速さは同じにならない。</span>
                </h2>
              </div>
              <div className="wv-dev-speed__body" data-reveal="2">
                <p>
                  AIがまだ賢くなかった頃から、開発に使い続けてきました。どのモデルに何を任せ、どこに人が要るか。自分たちの開発の仕組みを自分たちでつくり、それで開発してきた蓄積が、いまの速さです。
                </p>
                <p className="wv-dev-proof">
                  このサイトも、仕事の合間の<span className="wv-dev-proof__num">二日</span>でつくりました。
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 節2 進め方 — この章の唯一の闇。三段を罫と番号で、段ごとに二行の札 */}
        <section className="wv-section wv-dev-process" data-ground="charcoal" aria-labelledby="dev-process-heading">
          <div className="wv-inner">
            <div data-reveal>
              <p className="wv-label">Process</p>
              <h2 className="wv-h2" id="dev-process-heading">
                <span className="wv-nowrap">言葉にする。</span>
                <br className="wv-br-sm" />
                <span className="wv-nowrap">つくる。</span>
                <span className="wv-nowrap">続ける。</span>
              </h2>
            </div>
            <ol className="wv-index" data-reveal="2">
              {steps.map((step) => (
                <li className="wv-index__row" key={step.num}>
                  <p className="wv-index__num">{step.num}</p>
                  <div className="wv-index__main">
                    <span className="wv-index__role">{step.role}</span>
                    <h3>{step.title}</h3>
                  </div>
                  <div className="wv-index__side">
                    <p>{step.body}</p>
                    <dl className="wv-dev-pair">
                      <div>
                        <dt>CordMarkが持つもの</dt>
                        <dd>{step.brings}</dd>
                      </div>
                      <div>
                        <dt>顧客に残るもの</dt>
                        <dd>{step.leaves}</dd>
                      </div>
                    </dl>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* 実績の節はここ(許可後) */}

        {/* 節3 三つの実践との関係 — 縦罫で二列。開発で得たものの行き先 */}
        <section className="wv-section wv-dev-loop" data-ground="paper" aria-labelledby="dev-loop-heading">
          <div className="wv-inner">
            <div data-reveal>
              <p className="wv-label">Practices</p>
              <h2 className="wv-h2" id="dev-loop-heading">
                <span className="wv-nowrap">現場で得たものは、</span>
                <br />
                <span className="wv-nowrap">支援とProductへ戻る。</span>
              </h2>
              <p className="wv-lead wv-dev-loop__lead">
                開発の現場でしか分からないことがあります。何が判断を止めているか、どの情報が届いていないか。そこで得た知見を、支援の内容とCompany OSの設計へ戻します。
              </p>
            </div>
            <div className="wv-split" data-reveal="2">
              <div>
                <p className="wv-split__label">02 / SUPPORT</p>
                <h3>進め方そのものを、顧客の組織へ。</h3>
                <p>自分たちの開発で確かめたやり方を、顧客のチームと会社の仕事の流れに合わせて持ち込む。</p>
                <div className="wv-index__links">
                  <a className="wv-link" href="/service/support">
                    AI活用支援 <Arrow />
                  </a>
                </div>
              </div>
              <div>
                <p className="wv-split__label">03 / PRODUCT</p>
                <h3>現場で見たものを、Productの形へ。</h3>
                <p>契約と機密性を守った範囲で、現場で見た課題をCompany OSの設計へ還元する。</p>
                <div className="wv-index__links">
                  <a className="wv-link" href="/company-os">
                    Company OS <Arrow />
                  </a>
                  <a className="wv-link" href="/#services">
                    事業の索引へ <Arrow />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Contact — 闇でページを閉じる。Footerがそのまま続く */}
        <section className="wv-section wv-page__contact" id="contact" data-ground="night" aria-labelledby="dev-contact-heading">
          <div className="wv-inner">
            <div data-reveal>
              <p className="wv-label">Contact</p>
              <h2 className="wv-h2 wv-h2--xl" id="dev-contact-heading">
                <span className="wv-nowrap">つくるものが</span>
                <br className="wv-br-sm" />
                <span className="wv-nowrap">決まる前から、</span>
                <br />
                <span className="wv-nowrap">一緒に考えましょう。</span>
              </h2>
            </div>
            <div className="wv-contact__row" data-reveal="2">
              <p className="wv-lead">
                仕様も予算も決まっていなくて構いません。いま困っていることと、その先にやりたいことを伺い、最初の一歩を一緒に整理します。
              </p>
              <a className="wv-contact__cta" href="/contact?interest=dev">
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
