import type { Metadata } from "next";
import { Noto_Sans_JP, Noto_Serif_JP } from "next/font/google";
import { Footer } from "../../Footer";
import { RevealWatch } from "../../home/RevealWatch";
import "../../home/home.css";
import "../../wv-page.css";
import "./aid-page.css";

const serif = Noto_Serif_JP({ subsets: ["latin"], weight: ["300", "400"], variable: "--wv-serif", display: "swap" });
const sans = Noto_Sans_JP({ subsets: ["latin"], weight: ["400", "500", "700"], variable: "--wv-sans", display: "swap" });

const pageTitle = "AI駆動開発支援 | CordMark";
const pageDescription =
  "ツールを配っただけでは、開発は速くなりません。CordMarkのAI駆動開発支援は、開発の進め方そのものをAI前提に組み替え、効果を測り、チームの標準として定着させる支援です。";

export const metadata: Metadata = {
  title: pageTitle,
  description: pageDescription,
  openGraph: {
    title: pageTitle,
    description: pageDescription,
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "AI駆動開発支援 | CordMark" }],
  },
  twitter: {
    card: "summary_large_image",
    title: pageTitle,
    description: pageDescription,
    images: ["/og.png"],
  },
};

/** 扉の帯。入口・対象・進め方と、相談への一本の道 */
const facts = [
  { key: "入口", value: <span className="wv-nowrap">2週間の診断</span> },
  { key: "対象", value: <span className="wv-nowrap">1部署・1開発チームから</span> },
  {
    key: "進め方",
    value: (
      <>
        <span className="wv-nowrap">診断 →</span> <span className="wv-nowrap">6週間の実装パイロット →</span>{" "}
        <span className="wv-nowrap">定着</span>
      </>
    ),
  },
];

const symptoms = [
  { title: "導入は進んだが、速度も品質も変わらない", body: "ツールは行き渡ったのに、開発の成果に現れていない。" },
  { title: "一部の人の技になり、チームの標準になっていない", body: "使える人だけが速く、次の人が同じようには進めない。" },
  { title: "レビュー、テスト、文書が工程ごとに分断している", body: "工程ごとにAIを使っていて、前後がつながっていない。" },
  { title: "導入前後の変化を測る指標がない", body: "何がどれだけ変わったかを、投資の判断に使えない。" },
  { title: "品質・セキュリティ・権限の運用ルールがない", body: "どこまで任せてよいかが、現場の判断に委ねられている。" },
  { title: "使い方の知見が個人に閉じている", body: "うまくいったやり方が、次の人へ渡っていない。" },
];

/** 工程の一本の線。AIが担うことと、人が決めることを、工程ごとに一行ずつ */
const stages = [
  { name: "仕様", ai: "要件の曖昧さを洗い出す", human: "何を作るかを決める" },
  { name: "実装", ai: "コードを書く・直す", human: "設計の判断" },
  { name: "レビュー", ai: "指摘と根拠を揃える", human: "通すかを決める" },
  { name: "テスト", ai: "テストを設計し自動化する", human: "何を担保するかを決める" },
  { name: "ドキュメント", ai: "知見を体系化し続ける", human: "残す基準を決める" },
  { name: "測定", ai: "指標を集め可視化する", human: "投資を判断する" },
];

const diagnosisFlow = [
  "Day 1 キックオフ",
  "Day 2–5 ヒアリング・現行プロセス整理",
  "Day 6–8 AI活用候補の設計",
  "Day 9–10 KPI設計",
  "Day 11–13 実装パイロット計画",
  "Day 14 報告会",
];

const diagnosisOutputs = [
  "AI活用候補リスト",
  "開発プロセス Before・After案",
  "優先順位マップ",
  "KPI測定シート",
  "6週間実装パイロット提案書",
];

const pilotMetrics = [
  "開発リードタイム",
  "PR作成時間",
  "レビュー待ち時間",
  "テスト作成時間",
  "AIツール利用率",
  "利用者満足度",
];

const targets = ["SIer / SES / 受託開発企業", "SaaS事業会社", "事業会社の内製開発部門", "チーム規模 5名〜数百名程度"];

const fitStates = [
  "AIツールを一部導入済みだが、成果が出ていない",
  "小さく検証し、効果を見極めたい",
  "効果測定の方法に課題がある",
  "セキュリティ・品質面の不安がある",
];

function Arrow() {
  return (
    <svg viewBox="0 0 16 16" aria-hidden="true">
      <path d="M2.5 8h10" />
      <path d="m8.5 4 4 4-4 4" />
    </svg>
  );
}

export default function AiDrivenDevelopmentPage() {
  return (
    <div className={`wv wv-page ${serif.variable} ${sans.variable}`}>
      <RevealWatch />
      <main id="top" className="site-main">
        {/* 扉 — 何の章か、どこに属するか、事実の帯 */}
        <section className="wv-section wv-aid-hero" data-ground="paper" aria-labelledby="aid-heading">
          <div className="wv-inner">
            <div className="wv-page__hero">
              <div className="wv-page__hero-copy" data-reveal>
                <p className="wv-label">AI駆動開発支援 — 02 / SUPPORT</p>
                <h1 className="wv-h1" id="aid-heading">
                  <span className="wv-nowrap">コードは速くなった。</span>
                  <br />
                  <span className="wv-nowrap">開発は、速くなったか。</span>
                </h1>
                <p className="wv-lead">
                  ツールを配っただけでは、開発は速くなりません。仕様を書く、レビューする、テストする、文書を残す。工程のつなぎ目が、人だけを前提にした形のままだからです。CordMarkのAI駆動開発支援は、開発の進め方そのものをAI前提に組み替え、効果を測り、チームの標準として定着させる支援です。
                </p>
              </div>
              <aside className="wv-chapter" data-reveal="2" aria-label="この章の位置">
                <p className="wv-chapter__num">02</p>
                <p className="wv-chapter__role">SUPPORT</p>
                <p className="wv-chapter__note">三つの実践の、二つ目。</p>
                <nav className="wv-chapter__links" aria-label="関連するページ">
                  <a className="wv-link" href="/service/ai-native-company">
                    組織・業務改善支援 <Arrow />
                  </a>
                  <a className="wv-link" href="/#company-os">
                    Company OS <Arrow />
                  </a>
                  <a className="wv-link" href="/#services">
                    事業の索引へ <Arrow />
                  </a>
                </nav>
              </aside>
            </div>
            <dl className="wv-facts" data-reveal="3">
              {facts.map((fact) => (
                <div key={fact.key}>
                  <dt>{fact.key}</dt>
                  <dd>{fact.value}</dd>
                </div>
              ))}
              <div>
                <dt>相談</dt>
                <dd>
                  <a className="wv-link" href="#contact">
                    相談する <Arrow />
                  </a>
                </dd>
              </div>
            </dl>
          </div>
        </section>

        {/* 節1 症状 — 二列の番号付き一覧。絵はない */}
        <section className="wv-section wv-aid-symptoms" data-ground="paper2" aria-labelledby="aid-symptoms-heading">
          <div className="wv-inner">
            <div data-reveal>
              <p className="wv-label">Symptoms</p>
              <h2 className="wv-h2" id="aid-symptoms-heading">
                <span className="wv-nowrap">ツールは入った。</span>
                <br />
                <span className="wv-nowrap">開発は、変わっていない。</span>
              </h2>
            </div>
            <ul className="wv-list wv-list--two" data-reveal="2">
              {symptoms.map((item, i) => (
                <li key={item.title}>
                  <span className="wv-list__num">0{i + 1}</span>
                  <div>
                    <b>{item.title}</b>
                    <p>{item.body}</p>
                  </div>
                </li>
              ))}
            </ul>
            <p className="wv-aid-aside" data-reveal="3">
              一つでも当てはまるなら、工程のつなぎ目が旧いままです。
            </p>
          </div>
        </section>

        {/* 節2 組み替えるもの — この章の唯一の闇。工程が一本の線でつながる */}
        <section className="wv-section wv-aid-rework" data-ground="charcoal" aria-labelledby="aid-rework-heading">
          <div className="wv-inner">
            <div data-reveal>
              <p className="wv-label">Rework</p>
              <h2 className="wv-h2" id="aid-rework-heading">
                <span className="wv-nowrap">工程を足すのではなく、</span>
                <br />
                <span className="wv-nowrap">つなぎ目を組み替える。</span>
              </h2>
            </div>
            <div className="wv-aid-flow" data-reveal="2">
              <svg className="wv-aid-flow__rail wv-aid-flow__rail--h" viewBox="0 0 1200 2" preserveAspectRatio="none" aria-hidden="true">
                <path d="M0 1H1200" />
              </svg>
              <svg className="wv-aid-flow__rail wv-aid-flow__rail--v" viewBox="0 0 2 1200" preserveAspectRatio="none" aria-hidden="true">
                <path d="M1 0V1200" />
              </svg>
              <ol className="wv-aid-flow__steps" aria-label="開発の工程">
                {stages.map((stage) => (
                  <li key={stage.name}>
                    <span className="wv-aid-flow__knot" aria-hidden="true" />
                    <b>{stage.name}</b>
                    <span className="wv-aid-flow__role">
                      <i>AI</i>
                      {stage.ai}
                    </span>
                    <span className="wv-aid-flow__role is-human">
                      <i>人</i>
                      {stage.human}
                    </span>
                  </li>
                ))}
              </ol>
            </div>
            <p className="wv-lead wv-aid-rework__lead" data-reveal="3">
              実装だけをAIに任せても、前後の工程が待ちになる。CordMarkは、仕様からKPIまでの一連の流れをAI前提に設計し直し、開発環境・ツール・運用ルールと教育まで含めて組み替えます。決めるのは、人のままです。
            </p>
          </div>
        </section>

        {/* 節3 進め方 — 索引の三行。数字の位置に期間 */}
        <section className="wv-section wv-aid-steps" data-ground="paper" aria-labelledby="aid-steps-heading">
          <div className="wv-inner">
            <div data-reveal>
              <p className="wv-label">Process</p>
              <h2 className="wv-h2" id="aid-steps-heading">
                <span className="wv-nowrap">二週間で決め、</span>
                <br className="wv-br-sm" />
                <span className="wv-nowrap">六週間で確かめ、</span>
                <br />
                <span className="wv-nowrap">以後、標準にする。</span>
              </h2>
            </div>
            <ol className="wv-index" data-reveal="2">
              <li className="wv-index__row">
                <p className="wv-index__num">2週間</p>
                <div className="wv-index__main">
                  <span className="wv-index__role">DIAGNOSIS</span>
                  <h3>AI駆動開発プロセス診断</h3>
                </div>
                <div className="wv-index__side">
                  <p>
                    1部署・1開発チームに絞り、現行プロセスの整理からAI活用の余地、優先テーマ、測るKPI、6週間のパイロット計画までを設計する。
                  </p>
                  <div className="wv-aid-notes">
                    <div>
                      <p className="wv-aid-notes__head">進み方</p>
                      <ul>
                        {diagnosisFlow.map((item) => (
                          <li key={item}>{item}</li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <p className="wv-aid-notes__head">手元に残るもの</p>
                      <ul>
                        {diagnosisOutputs.map((item) => (
                          <li key={item}>{item}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </li>
              <li className="wv-index__row">
                <p className="wv-index__num">6週間</p>
                <div className="wv-index__main">
                  <span className="wv-index__role">PILOT</span>
                  <h3>6週間の実装パイロット</h3>
                </div>
                <div className="wv-index__side">
                  <p>
                    診断で選んだテーマを対象に、AIワークフロー、Agent、開発環境、運用ルールを実装する。
                  </p>
                  <div className="wv-aid-notes wv-aid-notes--one">
                    <div>
                      <p className="wv-aid-notes__head">測る指標(例)</p>
                      <ul className="wv-aid-notes__inline">
                        {pilotMetrics.map((item) => (
                          <li key={item}>{item}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </li>
              <li className="wv-index__row">
                <p className="wv-index__num">以後</p>
                <div className="wv-index__main">
                  <span className="wv-index__role">ROLLOUT</span>
                  <h3>開発組織への定着・横展開</h3>
                </div>
                <div className="wv-index__side">
                  <p>
                    利用状況とKPIを見ながら、チーム標準の開発プロセスとして定着させ、他チームへ広げる。教育と伴走を含む。
                  </p>
                </div>
              </li>
            </ol>
            <p className="wv-aid-steps__link" data-reveal="3">
              <a className="wv-link" href="#contact">
                まず、診断の相談をする <Arrow />
              </a>
            </p>
          </div>
        </section>

        {/* 節4 合う会社 — 縦罫で二列。短く */}
        <section className="wv-section wv-aid-fit" data-ground="paper2" aria-labelledby="aid-fit-heading">
          <div className="wv-inner">
            <div data-reveal>
              <p className="wv-label">Fit</p>
              <h2 className="wv-h2" id="aid-fit-heading">
                こういう状態なら、話が早い。
              </h2>
            </div>
            <div className="wv-split" data-reveal="2">
              <div>
                <p className="wv-split__label">対象</p>
                <ul className="wv-list wv-list--plain">
                  {targets.map((item) => (
                    <li key={item}>
                      <b>{item}</b>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="wv-split__label">特に合う状態</p>
                <ul className="wv-list wv-list--plain">
                  {fitStates.map((item) => (
                    <li key={item}>
                      <b>{item}</b>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Contact — 闇でページを閉じる。Footerがそのまま続く */}
        <section className="wv-section wv-page__contact" id="contact" data-ground="night" aria-labelledby="aid-contact-heading">
          <div className="wv-inner">
            <div data-reveal>
              <p className="wv-label">Contact</p>
              <h2 className="wv-h2 wv-h2--xl" id="aid-contact-heading">
                <span className="wv-nowrap">いまの開発の進め方から、</span>
                <br />
                <span className="wv-nowrap">一緒に見直しましょう。</span>
              </h2>
            </div>
            <div className="wv-contact__row" data-reveal="2">
              <p className="wv-lead">
                診断を受けるかは決まっていなくて構いません。開発組織の現状とAIの使われ方を伺い、最初の一歩を一緒に整理します。
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
