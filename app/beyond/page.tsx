import type { Metadata } from "next";
import { Noto_Sans_JP, Noto_Serif_JP } from "next/font/google";
import { Footer } from "../Footer";
import "../home/home.css";

const serif = Noto_Serif_JP({ subsets: ["latin"], weight: ["300", "400"], variable: "--wv-serif", display: "swap" });
const sans = Noto_Sans_JP({ subsets: ["latin"], weight: ["400", "500", "700"], variable: "--wv-sans", display: "swap" });

export const metadata: Metadata = {
  title: "Phase 2 | AIの先で、人はどう生きるか。 | CordMark",
  description:
    "AIが行き渡った先で、人が自ら行う価値のある営みを形にする。仲間の心理を読み合う2v2の戦略ボードゲームLaplace、AIの先の社会と人間を考えるメディアDotCraft。",
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

const topics = ["LOOP ENGINEERING", "AI AGENTS", "AI & SOCIETY"];

export default function Beyond() {
  return (
    <div className={`wv wv-page ${serif.variable} ${sans.variable}`}>
      <main id="top" className="site-main">
        {/* Intro — Phase 2とは */}
        <section className="wv-section wv-beyond__hero" data-ground="paper" aria-labelledby="wv-beyond-heading">
          <div className="wv-inner wv-beyond__hero-grid">
            <div>
              <p className="wv-label">Phase 2 · Beyond</p>
              <h1 className="wv-beyond__title" id="wv-beyond-heading">
                AIの先で、
                <br />
                人はどう生きるか。
              </h1>
              <p className="wv-lead">
                AIが行き渡ったあとにも、人が自ら行う価値のある営みがある。遊び、学び、競技、創作、交流。私たちはそれを、ゲームとメディアという形で確かめています。
              </p>
            </div>
            <dl className="wv-beyond__phases" aria-label="二つの段階">
              <div>
                <dt>PHASE 1 · AI-NATIVE</dt>
                <dd>
                  社会をAIネイティブにする。会社の意思と実行をつなぐCompany OS、組織・業務改善、受託・共同開発。
                  <a className="wv-link" href="/#company-os">
                    Company OS <Arrow />
                  </a>
                </dd>
              </div>
              <div className="is-here">
                <dt>PHASE 2 · BEYOND</dt>
                <dd>その先の、人の営みを考える。戦略ボードゲームLaplace、メディアDotCraft。</dd>
              </div>
            </dl>
          </div>
        </section>

        {/* Laplace */}
        <section className="wv-section wv-beyond__laplace" data-ground="charcoal" aria-labelledby="wv-laplace-heading">
          <div className="wv-inner wv-beyond__feature">
            <div className="wv-beyond__copy">
              <p className="wv-label">Human Play · 2v2</p>
              <h2 className="wv-beyond__name" id="wv-laplace-heading">
                LAPLACE
              </h2>
              <p className="wv-beyond__tagline">盤面は見える。仲間の心は、見えない。</p>
              <p className="wv-lead">
                2対2で戦う戦略ボードゲーム。情報は隠されていないのに、仲間が次に何を選ぶかは読み切れない。その決まらなさの中で、人と人が読み合い、噛み合う。
              </p>
              <p className="wv-lead">
                AIが発達した先の社会でも、人が人と競い、認め合い、つながる営みは残る。Laplaceは、それをひとつのゲームとして形にしたものです。一人で遊ぶときは、強化学習で育てた対戦AIが相手になります。
              </p>
              <div className="wv-beyond__actions">
                <a className="wv-button" href="https://www.laplace.zone/" target="_blank" rel="noreferrer">
                  LAPLACEを開く <External />
                </a>
                <a className="wv-button wv-button--ghost" href="https://www.laplace.zone/cpu?lang=ja" target="_blank" rel="noreferrer">
                  一人でAIに挑む <External />
                </a>
              </div>
              <a className="wv-beyond__bench" href="https://www.laplace.zone/bench?lang=ja" target="_blank" rel="noreferrer">
                <span>
                  <small>AI BENCHMARK</small>
                  <strong>LaplaceBench</strong>
                </span>
                <span>未知のゲームに対するAIの能力を測る</span>
                <External />
              </a>
            </div>
            <figure className="wv-beyond__board">
              <a href="https://www.laplace.zone/cpu?lang=ja" target="_blank" rel="noreferrer" aria-label="Laplaceで強化学習AIと対戦する">
                <img src="/assets/laplace-board-cutout.png" alt="LAPLACEの8×8の盤面" loading="lazy" decoding="async" />
              </a>
              <figcaption>2v2 · 8×8</figcaption>
            </figure>
          </div>
        </section>

        {/* DotCraft */}
        <section className="wv-section wv-beyond__dotcraft" data-ground="paper2" aria-labelledby="wv-dotcraft-heading">
          <div className="wv-inner wv-beyond__feature wv-beyond__feature--media">
            <div className="wv-beyond__copy">
              <p className="wv-label">Media · Field Notes</p>
              <h2 className="wv-beyond__name" id="wv-dotcraft-heading">
                DotCraft
              </h2>
              <p className="wv-beyond__tagline">思考の種を生む。</p>
              <p className="wv-lead">
                「最終的に、人間には何が残るのか」。AIを現場でどう使うかだけでなく、その先の社会と人間の営みまで考えるメディアです。開発の現場で得た問いを、映像と言葉にして手渡しています。
              </p>
              <ul className="wv-beyond__topics" aria-label="DotCraftで扱うテーマ">
                {topics.map((t) => (
                  <li key={t}>{t}</li>
                ))}
              </ul>
              <div className="wv-beyond__actions">
                <a className="wv-button wv-button--ink" href="https://dotcraft.cordmark.co.jp" target="_blank" rel="noreferrer">
                  DotCraftを見る <External />
                </a>
              </div>
            </div>
            <figure className="wv-beyond__wave">
              <img src="/assets/dotcraft-transparent.webp" alt="" loading="lazy" decoding="async" />
            </figure>
          </div>
        </section>

        {/* Back to Phase 1 / Contact */}
        <section className="wv-section wv-beyond__loop" data-ground="paper" aria-labelledby="wv-beyond-loop-heading">
          <div className="wv-inner wv-contact__grid">
            <div>
              <p className="wv-label">Phase 1 · Phase 2</p>
              <h2 className="wv-h2" id="wv-beyond-loop-heading">
                問いは、行き来する。
              </h2>
              <p className="wv-lead">
                ここで見つけた「人に残るもの」の問いは、Company OSの設計に戻る。現場でAIを据える中で生まれる違和感は、次の探索の種になる。
              </p>
            </div>
            <a className="wv-button wv-button--ink" href="/contact">
              相談する <Arrow />
            </a>
          </div>
        </section>
      </main>

      <Footer mark />
    </div>
  );
}
