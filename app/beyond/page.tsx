import type { Metadata } from "next";
import { Noto_Sans_JP, Noto_Serif_JP } from "next/font/google";
import { Footer } from "../Footer";
import { RevealWatch } from "../home/RevealWatch";
import "../home/home.css";
import "../wv-page.css";
import "./beyond-page.css";

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

const pageTitle = "Phase 2 | AIの先で、人はどう生きるか。 | CordMark";
const pageDescription =
  "AIが行き渡った先で、人が自ら行う価値のある営みを形にする。仲間の心理を読み合う2v2の戦略ボードゲームLaplace、その先の社会と人間を考えるメディアDotCraft。";

export const metadata: Metadata = {
  title: pageTitle,
  description: pageDescription,
  openGraph: {
    title: pageTitle,
    description: pageDescription,
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "Phase 2 | CordMark" }],
  },
  twitter: {
    card: "summary_large_image",
    title: pageTitle,
    description: pageDescription,
    images: ["/og.png"],
  },
};

function Arrow() {
  return (
    <svg viewBox="0 0 16 16" aria-hidden="true">
      <path d="M2.5 8h10" />
      <path d="m8.5 4 4 4-4 4" />
    </svg>
  );
}

function External() {
  return (
    <svg viewBox="0 0 16 16" aria-hidden="true">
      <path d="M3.5 12.5 12 4" />
      <path d="M6.5 3.5h6v6" />
    </svg>
  );
}

/** DotCraftの三つの主題。名前は既存のまま、説明は本文の範囲に留める */
const themes = [
  {
    name: "LOOP ENGINEERING",
    body: "開発の現場で回している、作り方そのもの。",
  },
  { name: "AI AGENTS", body: "現場でどう使うか。仕事のどこを預けるか。" },
  {
    name: "AI & SOCIETY",
    body: "その先の社会に、人の営みとして何が残るのか。",
  },
];

export default function Beyond() {
  return (
    <div className={`wv wv-page ${serif.variable} ${sans.variable}`}>
      <RevealWatch />
      <main id="top" className="site-main">
        {/* 扉 — 何の章か、どこに属するか、事実の帯 */}
        <section className="wv-section wv-beyond__hero" data-ground="paper" aria-labelledby="wv-beyond-heading">
          <div className="wv-inner">
            <div className="wv-page__opening">
              <div className="wv-page__hero" data-reveal>
                <p className="wv-label">Phase 2 · Beyond</p>
                <h1 className="wv-h1" id="wv-beyond-heading">
                  <span className="wv-nowrap">AIの先で、</span>
                  <br />
                  <span className="wv-nowrap">人はどう生きるか。</span>
                </h1>
              </div>
              <div className="wv-page__door" data-reveal="2">
                <aside className="wv-chapter" aria-label="この章の位置">
                  <p className="wv-chapter__num">02</p>
                  <p className="wv-chapter__role">PHASE 2 · BEYOND</p>
                </aside>
                <p className="wv-lead">
                  機械が上手にこなせる仕事は、これから増えていきます。それでも、人が自ら行うからこそ価値のある営みがある。遊び、学び、競技、創作、交流。CordMarkはそれを、ゲームとメディアという二つの形で確かめています。
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Laplace — この章の唯一の闇。仕掛けは盤そのもの */}
        <section className="wv-section wv-beyond__laplace" data-ground="charcoal" aria-labelledby="wv-laplace-heading">
          <div className="wv-inner wv-beyond__feature">
            <div className="wv-beyond__copy" data-reveal>
              <p className="wv-label">Human Play · 2v2</p>
              <h2 className="wv-beyond__name" id="wv-laplace-heading">
                LAPLACE
              </h2>
              <p className="wv-beyond__tagline">盤面は見える。仲間の心は、見えない。</p>
              <p className="wv-lead">
                2対2で戦う戦略ボードゲーム。伏せられた札はなく、盤の上のことは双方に全部見えています。それでも、味方が次にどこへ置くかは分からない。
              </p>
              <p className="wv-lead">
                決まらないのは盤ではなく、隣に座っている人のほうです。相手の狙いを読むより先に、仲間の考えを読む。合図はなく、確かめる手立てもない。噛み合ったときの手応えも、すれ違ったときの悔しさも、そこから生まれます。
              </p>
              <p className="wv-lead">
                AIが行き渡った先の社会でも、人が人と競い、認め合い、つながる営みは残る。Laplaceは、それをひとつのゲームとして形にしたものです。
              </p>
              <div className="wv-beyond__actions">
                <a className="wv-button" href="https://www.laplace.zone/" target="_blank" rel="noreferrer">
                  LAPLACEを開く <External />
                </a>
                <a
                  className="wv-button wv-button--ghost"
                  href="https://www.laplace.zone/cpu?lang=ja"
                  target="_blank"
                  rel="noreferrer"
                >
                  一人でAIに挑む <External />
                </a>
              </div>
              <dl className="wv-beyond__minor" aria-label="Laplaceの周辺">
                <div>
                  <dt>SOLO</dt>
                  <dd>相手が揃わないときは、強化学習で育てた対戦AIが座ります。</dd>
                </div>
                <div>
                  <dt>BENCHMARK</dt>
                  <dd>
                    LaplaceBench — 未知のゲームに対するAIの能力を測る。
                    <a
                      className="wv-link"
                      href="https://www.laplace.zone/bench?lang=ja"
                      target="_blank"
                      rel="noreferrer"
                    >
                      開く <External />
                    </a>
                  </dd>
                </div>
              </dl>
            </div>
            <figure className="wv-beyond__board" data-reveal="2">
              <a
                href="https://www.laplace.zone/cpu?lang=ja"
                target="_blank"
                rel="noreferrer"
                aria-label="Laplaceで対戦AIと遊ぶ"
              >
                <img src="/assets/laplace-board-cutout.png" alt="LAPLACEの8×8の盤面" loading="lazy" decoding="async" />
              </a>
              <figcaption>2v2 · 8×8</figcaption>
            </figure>
          </div>
        </section>

        {/* DotCraft — 仕掛けは三つの主題の罫。ワードマークは印の大きさに留める */}
        <section className="wv-section wv-beyond__dotcraft" data-ground="paper2" aria-labelledby="wv-dotcraft-heading">
          <div className="wv-inner">
            <div className="wv-beyond__head" data-reveal>
              <div>
                <p className="wv-label">Media · Field Notes</p>
                <h2 className="wv-beyond__name" id="wv-dotcraft-heading">
                  DotCraft
                </h2>
                <p className="wv-beyond__tagline">思考の種を生む。</p>
                <p className="wv-lead">
                  「最終的に、人間には何が残るのか」。現場でどう使うかだけでなく、その先の社会と人間の営みまで考えるメディアです。開発の現場で得た問いを、映像と言葉にして手渡しています。
                </p>
              </div>
              <figure className="wv-beyond__mark">
                <img src="/assets/dotcraft-transparent.webp" alt="" loading="lazy" decoding="async" />
              </figure>
            </div>
            <ol className="wv-beyond__themes" data-reveal="2" aria-label="DotCraftで扱う三つの主題">
              {themes.map((theme, i) => (
                <li key={theme.name}>
                  <span className="wv-beyond__themes__num">0{i + 1}</span>
                  <b>{theme.name}</b>
                  <p>{theme.body}</p>
                </li>
              ))}
            </ol>
            <div className="wv-beyond__actions" data-reveal="3">
              <a
                className="wv-button wv-button--ink"
                href="https://dotcraft.cordmark.co.jp"
                target="_blank"
                rel="noreferrer"
              >
                DotCraftを見る <External />
              </a>
            </div>
          </div>
        </section>

        {/* 終節 — 二つの段階が行き来する */}
        <section className="wv-section wv-beyond__loop" data-ground="paper" aria-labelledby="wv-beyond-loop-heading">
          <div className="wv-inner">
            <div data-reveal>
              <p className="wv-label">Phase 1 · Phase 2</p>
              <h2 className="wv-h2" id="wv-beyond-loop-heading">
                問いは、行き来する。
              </h2>
              <p className="wv-lead">
                ここで見つけた「人に残るもの」の問いは、Company
                OSの設計に戻る。現場でAIを据える中で生まれる違和感は、次の探索の種になる。
              </p>
            </div>
            <nav className="wv-beyond__links" data-reveal="2" aria-label="Phase 1へ">
              <a className="wv-link" href="/company-os">
                Company OS <Arrow />
              </a>
              <a className="wv-link" href="/service/support">
                AI駆動開発支援 <Arrow />
              </a>
              <a className="wv-link" href="/about">
                私たちについて <Arrow />
              </a>
            </nav>
          </div>
        </section>

        {/* Contact — 闇でページを閉じる。Footerがそのまま続く */}
        <section
          className="wv-section wv-page__contact"
          id="contact"
          data-ground="night"
          aria-labelledby="wv-beyond-contact-heading"
        >
          <div className="wv-inner">
            <div data-reveal>
              <p className="wv-label">Contact</p>
              <h2 className="wv-h2 wv-h2--xl" id="wv-beyond-contact-heading">
                <span className="wv-nowrap">何をつくるかから、</span>
                <br />
                <span className="wv-nowrap">一緒に考えましょう。</span>
              </h2>
            </div>
            <div className="wv-contact__row" data-reveal="2">
              <p className="wv-lead">
                まだ言葉になっていない構想や問いからで構いません。現状を伺い、最初の一歩を一緒に整理します。
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
