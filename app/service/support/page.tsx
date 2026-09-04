import type { CSSProperties } from "react";
import type { Metadata } from "next";
import { Noto_Sans_JP, Noto_Serif_JP } from "next/font/google";
import { Footer } from "../../Footer";
import { RevealWatch } from "../../home/RevealWatch";
import "../../home/home.css";
import "../../wv-page.css";
import "./sp-page.css";

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

const pageTitle = "AI駆動開発支援 | CordMark";
const pageDescription =
  "同じ道具で、なぜ速さが違うのか。CordMarkのAI駆動開発支援は、開発チームの手の中にある工程を、仕様の書き方からレビュー、テスト、文書、環境と教育まで、AI前提の型に組み替え、チームの標準として定着させます。まだ使い方がわからないチームには、講演・研修から。";

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
        alt: "AI駆動開発支援 | CordMark",
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

/** 工程の一本の線。工程ごとに、AIが運ぶことと、人が決めることを一句ずつ */
const stages = [
  { name: "仕様", ai: "曖昧さを洗う", human: "何を作るか" },
  { name: "実装", ai: "書いて、直す", human: "設計" },
  { name: "レビュー", ai: "指摘を揃える", human: "通すか" },
  { name: "テスト", ai: "自動化する", human: "何を担保するか" },
  { name: "ドキュメント", ai: "体系化する", human: "何を残すか" },
  { name: "測定", ai: "可視化する", human: "投資" },
];

/** 三段の進め方。段ごとに、一つの開発チームで何をするか */
const steps = [
  {
    num: "01",
    role: "DIAGNOSIS",
    title: "診断する",
    body: "一つの開発チームに絞り、いまの工程を一本の線として書き出す。どこで待ちが生まれ、どこにAIの余地があるかを見つけ、測る指標と次の一手を決める。",
    leaves: "工程の現在地と、組み替えの設計図",
  },
  {
    num: "02",
    role: "PILOT",
    title: "小さく確かめる",
    body: "選んだ工程を、実際の開発の中で組み替える。AIワークフロー、開発環境、運用ルールを整え、リードタイムやレビュー待ちの変化を数字で見る。",
    leaves: "動いた工程と、測った数字",
  },
  {
    num: "03",
    role: "ROLLOUT",
    title: "標準にして、広げる",
    body: "確かめた進め方をチームの標準にし、教育と伴走で次のチームへ広げる。使う人が変わっても、同じように進む状態をつくる。",
    leaves: "組織の開発プロセス",
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

export default function SupportPage() {
  return (
    <div className={`wv wv-page ${serif.variable} ${sans.variable}`}>
      <RevealWatch />
      <main id="top" className="site-main">
        {/* 扉 — 何の章か、どこに属するか。主張はトップに置いてきた。ここは一文だけ */}
        <section className="wv-section wv-sp-hero" data-ground="paper" aria-labelledby="sp-heading">
          <div className="wv-inner">
            <div className="wv-page__opening">
              <div className="wv-page__hero" data-reveal>
                <p className="wv-label">AI駆動開発支援</p>
                <h1 className="wv-h1" id="sp-heading">
                  <span className="wv-nowrap">同じ道具で、</span>
                  <br />
                  <span className="wv-nowrap">なぜ速さが違うのか。</span>
                </h1>
              </div>
              <div className="wv-page__door" data-reveal="2">
                <aside className="wv-chapter" aria-label="この章の位置">
                  <p className="wv-chapter__num">02</p>
                  <p className="wv-chapter__role">SUPPORT</p>
                </aside>
                <p className="wv-lead">
                  ツールは入った。使える人は速い。でも、チームは速くなっていない。差は道具ではなく、進め方にあります。仕様をどう書き、AIに何を渡し、レビューとテストをどう回すか。その型を、開発チームの中につくります。
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 節1 一本の線 — この章の唯一の絵。チームの手の中の工程を、一本の型にする */}
        <section className="wv-section wv-sp-rework" data-ground="paper2" aria-labelledby="sp-rework-heading">
          <div className="wv-inner">
            <div data-reveal>
              <p className="wv-label">The Line</p>
              <h2 className="wv-h2" id="sp-rework-heading">
                <span className="wv-nowrap">速さは、道具ではなく</span>
                <span className="wv-nowrap">型でつくる。</span>
              </h2>
            </div>
            {/* 三行の表。上の行が工程の線、AIの行は運ぶこと、人の行は決めること。
                スマホでは同じ表が縦になり、工程が行、AI/人が列になる */}
            <div className="wv-sp-flow" data-reveal="2" role="table" aria-label="工程ごとに、AIが運ぶことと人が決めること">
              <span className="wv-sp-flow__head is-stage" aria-hidden="true" />
              <span className="wv-sp-flow__head">AI が運ぶ</span>
              <span className="wv-sp-flow__head is-human">人が決める</span>
              {stages.map((stage, i) => (
                <div className="wv-sp-flow__stage" key={stage.name} style={{ "--i": i } as CSSProperties} role="row">
                  <b role="rowheader">{stage.name}</b>
                  <span role="cell">{stage.ai}</span>
                  <span className="is-human" role="cell">
                    {stage.human}
                  </span>
                </div>
              ))}
            </div>
            <p className="wv-lead wv-sp-flow__lead" data-reveal="3">
              実装だけをAIに任せても、チームは速くなりません。仕様から測定まで、開発チームの手の中にある工程を一本の型にして、AIが運び、人が決める。
            </p>
          </div>
        </section>

        {/* 節2 どこから始めるか — いまの状態で二つ。まだ使い方がわからないなら講演から、入っているなら診断から */}
        <section className="wv-section wv-sp-start" data-ground="paper" aria-labelledby="sp-start-heading">
          <div className="wv-inner">
            <div data-reveal>
              <p className="wv-label">Where to start</p>
              <h2 className="wv-h2" id="sp-start-heading">
                <span className="wv-nowrap">どこから始めるかは、</span>
                <br className="wv-br-sm" />
                <span className="wv-nowrap">いまの状態で決まる。</span>
              </h2>
            </div>
            <div className="wv-split" data-reveal="2">
              <div>
                <p className="wv-split__label">まだ、使い方がわからない</p>
                <h3>講演から。</h3>
                <p>
                  誰に向けて話すかで、中身を変えます。経営層には、AIで社会と仕事がどう変わり、組織をどう設計し直すか。開発チームには、いまの時代にAIをどう使えば速くなるか。自分たちの開発で使っているものを、そのまま話します。形は用途に合わせて、講演だけでも、手を動かす回を足しても。
                </p>
                <p className="wv-sp-start__link">
                  <a className="wv-link" href="/contact?interest=talk">
                    講演・研修を相談する <Arrow />
                  </a>
                </p>
              </div>
              <div>
                <p className="wv-split__label">入ってはいるが、速くなっていない</p>
                <h3>診断から。</h3>
                <p>
                  一つの開発チームに絞り、いまの工程を線として書き出すところから始めます。進め方は下の三段です。
                </p>
                <p className="wv-sp-start__link">
                  <a className="wv-link" href="#process">
                    進め方を見る <Arrow />
                  </a>
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 節3 進め方 — この章の唯一の闇。三段の索引、段ごとに手元に残るもの */}
        <section className="wv-section wv-sp-process" id="process" data-ground="charcoal" aria-labelledby="sp-process-heading">
          <div className="wv-inner">
            <div data-reveal>
              <p className="wv-label">Process</p>
              <h2 className="wv-h2" id="sp-process-heading">
                <span className="wv-nowrap">診断し、小さく確かめ、</span>
                <br />
                <span className="wv-nowrap">標準にする。</span>
              </h2>
            </div>
            <ol className="wv-index" data-reveal="2">
              {steps.map((step) => (
                <li key={step.num} className="wv-index__row">
                  <p className="wv-index__num">{step.num}</p>
                  <div className="wv-index__main">
                    <span className="wv-index__role">{step.role}</span>
                    <h3>{step.title}</h3>
                  </div>
                  <div className="wv-index__side">
                    <p>{step.body}</p>
                    <dl className="wv-sp-leaves">
                      <dt>手元に残るもの</dt>
                      <dd>{step.leaves}</dd>
                    </dl>
                  </div>
                </li>
              ))}
            </ol>
            <p className="wv-lead wv-sp-process__lead" data-reveal="3">
              まず一つのチームから、数週間の診断で始めます。SIer、SaaS事業会社、事業会社の内製開発部門。五名のチームから数百名の開発組織まで、同じ進め方で入ります。
            </p>
          </div>
        </section>

        {/* 節4 次の章 — 開発組織の先は、Company OSへ */}
        <section className="wv-section wv-sp-next" data-ground="paper" aria-labelledby="sp-next-heading">
          <div className="wv-inner">
            <div className="wv-next" data-reveal>
              <div>
                <p className="wv-next__num">03</p>
                <span className="wv-next__role">PRODUCT</span>
              </div>
              <div className="wv-next__body">
                <p className="wv-next__label">Next</p>
                <h2 id="sp-next-heading">
                  <span className="wv-nowrap">会社全体の流れは、</span>
                  <span className="wv-nowrap">Company OSが変える。</span>
                </h2>
                <p>
                  チームの中を速くするのが、この章。チームの外との往復、営業や経営との問いと判断のやり取りを速くするのが、Company
                  OSです。速くなった開発を判断待ちで止めない仕組みは、そちらに。
                </p>
                <p className="wv-next__link">
                  <a className="wv-link" href="/company-os">
                    Company OS <Arrow />
                  </a>
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Contact — 闇でページを閉じる。Footerがそのまま続く */}
        <section
          className="wv-section wv-page__contact"
          id="contact"
          data-ground="night"
          aria-labelledby="sp-contact-heading"
        >
          <div className="wv-inner">
            <div data-reveal>
              <p className="wv-label">Contact</p>
              <h2 className="wv-h2 wv-h2--xl" id="sp-contact-heading">
                <span className="wv-nowrap">いまの開発の進め方から、</span>
                <br />
                <span className="wv-nowrap">一緒に見直しましょう。</span>
              </h2>
            </div>
            <div className="wv-contact__row" data-reveal="2">
              <p className="wv-lead">
                まだ使っていなくても、入っていても構いません。開発チームのいまを伺い、講演か診断か、最初の一歩を一緒に整理します。
              </p>
              <a className="wv-contact__cta" href="/contact?interest=aid">
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
