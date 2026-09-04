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

const pageTitle = "AI活用支援 | CordMark";
const pageDescription =
  "AIを入れた会社と、AIで動く会社は、違う。CordMarkのAI活用支援は、開発組織から入るAI駆動開発支援と、会社全体から入る組織・業務改善支援の二つの入口から、仕事の進め方をAI前提に組み替えます。";

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
        alt: "AI活用支援 | CordMark",
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

/* ---------- 入口A 開発組織から ---------- */

const devSymptoms = [
  {
    title: "導入は進んだが、速度も品質も変わらない",
    body: "ツールは行き渡ったのに、開発の成果に現れていない。",
  },
  {
    title: "一部の人の技になり、チームの標準になっていない",
    body: "使える人だけが速く、次の人が同じようには進めない。",
  },
  {
    title: "レビュー、テスト、文書が工程ごとに分断している",
    body: "工程ごとにAIを使っていて、前後がつながっていない。",
  },
  {
    title: "導入前後の変化を測る指標がない",
    body: "何がどれだけ変わったかを、投資の判断に使えない。",
  },
];

/** 工程の一本の線。AIが担うことと、人が決めることを、工程ごとに一行ずつ */
const stages = [
  { name: "仕様", ai: "要件の曖昧さを洗い出す", human: "何を作るかを決める" },
  { name: "実装", ai: "コードを書く・直す", human: "設計の判断" },
  { name: "レビュー", ai: "指摘と根拠を揃える", human: "通すかを決める" },
  {
    name: "テスト",
    ai: "テストを設計し自動化する",
    human: "何を担保するかを決める",
  },
  {
    name: "ドキュメント",
    ai: "知見を体系化し続ける",
    human: "残す基準を決める",
  },
  { name: "測定", ai: "指標を集め可視化する", human: "投資を判断する" },
];

const devDiagnosisFlow = [
  "Day 1 キックオフ",
  "Day 2–5 ヒアリング・現行プロセス整理",
  "Day 6–8 AI活用候補の設計",
  "Day 9–10 KPI設計",
  "Day 11–13 実装パイロット計画",
  "Day 14 報告会",
];

const devDiagnosisOutputs = [
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

const devTargets = [
  "SIer / SES / 受託開発企業",
  "SaaS事業会社",
  "事業会社の内製開発部門",
  "チーム規模 5名〜数百名程度",
];

const devFit = [
  "AIツールを一部導入済みだが、成果が出ていない",
  "小さく検証し、効果を見極めたい",
  "効果測定の方法に課題がある",
  "セキュリティ・品質面の不安がある",
];

/* ---------- 入口B 会社全体から ---------- */

const orgSymptoms = [
  {
    title: "部署ごとに試しており、全社で広がらない",
    body: "うまくいったやり方が、隣の部署へ渡っていない。",
  },
  {
    title: "PoCやツール導入で止まり、運用に乗らない",
    body: "試すところまでは進み、日々の仕事には入っていない。",
  },
  {
    title: "業務プロセス自体が人間前提のまま",
    body: "人が集まって決める形は変わらず、手順だけが増える。",
  },
  {
    title: "ガバナンスが曖昧で、本格展開できない",
    body: "どこまで任せてよいかが決まらず、広げる判断が止まる。",
  },
];

const orgDiagnosisFlow = [
  "経営課題・事業KPIヒアリング",
  "業務・意思決定プロセスの可視化",
  "AI活用テーマの設計",
  "優先順位・リスク・ガバナンス設計",
  "90日実装ロードマップ作成",
  "診断結果・実装提案のご報告",
];

const orgDiagnosisOutputs = [
  "AI活用成熟度マップ",
  "部門別AI活用候補リスト",
  "業務プロセス Before・After案",
  "AI Agent・Workflow構成案",
  "90日実装ロードマップ",
  "KPI測定シート・ガバナンス方針案",
];

const orgAreas = ["営業・CSワークフロー", "社内ナレッジAIアシスタント", "経営会議・意思決定支援", "開発プロセス"];

const orgTargets = ["営業部門", "CS部門", "バックオフィス", "開発部門"];

/* ---------- 共通: 五つの層 ---------- */

const layers = [
  {
    num: "01",
    name: "Strategy / KPI",
    body: "経営課題とAI活用テーマを接続する。",
  },
  {
    num: "02",
    name: "Workflow",
    body: "営業・CS・管理・開発の業務プロセスを再設計する。",
  },
  {
    num: "03",
    name: "Knowledge / Data",
    body: "社内ナレッジとデータをAIが使える形に整える。",
  },
  {
    num: "04",
    name: "Agent / Application",
    body: "AI Agent、RAG、業務アプリを実装する。",
  },
  {
    num: "05",
    name: "Governance / Enablement",
    body: "権限、ルール、教育、運用体制を設計する。",
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
        {/* 扉 — 何の章か、どこに属するか。主張はトップに置いてきた。ここは一文と二つの入口 */}
        <section className="wv-section wv-sp-hero" data-ground="paper" aria-labelledby="sp-heading">
          <div className="wv-inner">
            <div className="wv-page__opening">
              <div className="wv-page__hero" data-reveal>
                <p className="wv-label">AI活用支援</p>
                <h1 className="wv-h1" id="sp-heading">
                  <span className="wv-nowrap">AIを入れた会社と、</span>
                  <br />
                  <span className="wv-nowrap">AIで動く会社は、違う。</span>
                </h1>
              </div>
              <div className="wv-page__door" data-reveal="2">
                <aside className="wv-chapter" aria-label="この章の位置">
                  <p className="wv-chapter__num">02</p>
                  <p className="wv-chapter__role">SUPPORT</p>
                </aside>
                <p className="wv-lead">
                  ツールが増えても、仕事の進め方が人だけを前提にしたままなら、会社は速くなりません。CordMarkは、いまの進め方を診断し、人が決め、AIが運ぶ形へ組み替え、測り、標準として定着させます。入口は二つ。開発組織から入るか、会社全体から入るか。
                </p>
              </div>
            </div>

            {/* 二つの入口。名前、誰向けか、ページ内の行き先 */}
            <div className="wv-sp-doors" data-reveal="3">
              <div className="wv-split">
                <div>
                  <p className="wv-split__label">A — 開発組織から</p>
                  <h3>AI駆動開発支援</h3>
                  <p className="wv-sp-doors__for">
                    開発チームにAIツールは入ったが、開発が速くなっていない。1部署・1開発チームから、2週間の診断で始める。
                  </p>
                  <p className="wv-sp-doors__link">
                    <a className="wv-link" href="#dev">
                      開発組織から入る <Arrow />
                    </a>
                  </p>
                </div>
                <div>
                  <p className="wv-split__label">B — 会社全体から</p>
                  <h3>組織・業務改善支援</h3>
                  <p className="wv-sp-doors__for">
                    部署ごとの試行がPoCで止まり、全社に広がらない。1つの経営テーマと2〜3部門から、3〜4週間の診断で始める。
                  </p>
                  <p className="wv-sp-doors__link">
                    <a className="wv-link" href="#company">
                      会社全体から入る <Arrow />
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ===== A 開発組織から ===== */}

        {/* A-1 症状 */}
        <section className="wv-section" id="dev" data-ground="paper2" aria-labelledby="sp-dev-heading">
          <div className="wv-inner">
            <div className="wv-sp-track" data-reveal>
              <div>
                <p className="wv-sp-track__num">A</p>
                <span className="wv-sp-track__role">開発組織から</span>
              </div>
              <div>
                <p className="wv-label">AI駆動開発支援</p>
                <h2 className="wv-h2" id="sp-dev-heading">
                  <span className="wv-nowrap">ツールは入った。</span>
                  <br />
                  <span className="wv-nowrap">開発は、変わっていない。</span>
                </h2>
                <p className="wv-lead">
                  仕様を書く、レビューする、テストする、文書を残す。工程のつなぎ目が旧いままだと、実装だけが速くなり、前後が待ちになります。
                </p>
              </div>
            </div>
            <ul className="wv-list wv-list--two" data-reveal="2">
              {devSymptoms.map((item, i) => (
                <li key={item.title}>
                  <span className="wv-list__num">0{i + 1}</span>
                  <div>
                    <b>{item.title}</b>
                    <p>{item.body}</p>
                  </div>
                </li>
              ))}
            </ul>
            <p className="wv-sp-aside" data-reveal="3">
              一つでも当てはまるなら、工程のつなぎ目が旧いままです。
            </p>
          </div>
        </section>

        {/* A-2 組み替えるもの — 工程が一本の線でつながる */}
        <section className="wv-section" data-ground="paper" aria-labelledby="sp-dev-rework-heading">
          <div className="wv-inner">
            <div data-reveal>
              <p className="wv-label">A — Rework</p>
              <h2 className="wv-h2" id="sp-dev-rework-heading">
                <span className="wv-nowrap">工程を足すのではなく、</span>
                <br />
                <span className="wv-nowrap">つなぎ目を組み替える。</span>
              </h2>
            </div>
            <div className="wv-sp-flow" data-reveal="2">
              <svg
                className="wv-sp-flow__rail wv-sp-flow__rail--h"
                viewBox="0 0 1200 2"
                preserveAspectRatio="none"
                aria-hidden="true"
              >
                <path d="M0 1H1200" />
              </svg>
              <svg
                className="wv-sp-flow__rail wv-sp-flow__rail--v"
                viewBox="0 0 2 1200"
                preserveAspectRatio="none"
                aria-hidden="true"
              >
                <path d="M1 0V1200" />
              </svg>
              <ol className="wv-sp-flow__steps" aria-label="開発の工程">
                {stages.map((stage) => (
                  <li key={stage.name}>
                    <span className="wv-sp-flow__knot" aria-hidden="true" />
                    <b>{stage.name}</b>
                    <span className="wv-sp-flow__role">
                      <i>AI</i>
                      {stage.ai}
                    </span>
                    <span className="wv-sp-flow__role is-human">
                      <i>人</i>
                      {stage.human}
                    </span>
                  </li>
                ))}
              </ol>
            </div>
            <p className="wv-lead wv-sp-flow__lead" data-reveal="3">
              仕様からKPIまでの一連の流れをAI前提に設計し直し、開発環境・ツール・運用ルールと教育まで含めて組み替えます。
            </p>
          </div>
        </section>

        {/* A-3 進め方 — 索引の三行。数字の位置に期間。下に対象と合う状態 */}
        <section className="wv-section wv-sp-steps" data-ground="paper2" aria-labelledby="sp-dev-steps-heading">
          <div className="wv-inner">
            <div data-reveal>
              <p className="wv-label">A — Process</p>
              <h2 className="wv-h2" id="sp-dev-steps-heading">
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
                  <div className="wv-sp-notes">
                    <div>
                      <p className="wv-sp-notes__head">進み方</p>
                      <ul>
                        {devDiagnosisFlow.map((item) => (
                          <li key={item}>{item}</li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <p className="wv-sp-notes__head">手元に残るもの</p>
                      <ul>
                        {devDiagnosisOutputs.map((item) => (
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
                  <p>診断で選んだテーマを対象に、AIワークフロー、Agent、開発環境、運用ルールを実装する。</p>
                  <div className="wv-sp-notes wv-sp-notes--one">
                    <div>
                      <p className="wv-sp-notes__head">測る指標(例)</p>
                      <ul className="wv-sp-notes__inline">
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
            <p className="wv-sp-steps__link" data-reveal="3">
              <a className="wv-link" href="/contact?interest=aid">
                開発組織の診断を相談する <Arrow />
              </a>
            </p>
            <div className="wv-split wv-sp-fit" data-reveal="3">
              <div>
                <p className="wv-split__label">対象</p>
                <ul className="wv-list wv-list--plain">
                  {devTargets.map((item) => (
                    <li key={item}>
                      <b>{item}</b>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="wv-split__label">特に合う状態</p>
                <ul className="wv-list wv-list--plain">
                  {devFit.map((item) => (
                    <li key={item}>
                      <b>{item}</b>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* ===== B 会社全体から ===== */}

        {/* B-1 症状 */}
        <section className="wv-section" id="company" data-ground="paper" aria-labelledby="sp-org-heading">
          <div className="wv-inner">
            <div className="wv-sp-track" data-reveal>
              <div>
                <p className="wv-sp-track__num">B</p>
                <span className="wv-sp-track__role">会社全体から</span>
              </div>
              <div>
                <p className="wv-label">組織・業務改善支援</p>
                <h2 className="wv-h2" id="sp-org-heading">
                  <span className="wv-nowrap">試している。</span>
                  <br />
                  <span className="wv-nowrap">広がってはいない。</span>
                </h2>
                <p className="wv-lead">
                  意思決定・業務・ナレッジ・ガバナンスの流れを診断し、経営の指標から権限・教育までを一つの設計として組み替えます。
                </p>
              </div>
            </div>
            <ul className="wv-list wv-list--two" data-reveal="2">
              {orgSymptoms.map((item, i) => (
                <li key={item.title}>
                  <span className="wv-list__num">0{i + 1}</span>
                  <div>
                    <b>{item.title}</b>
                    <p>{item.body}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* B-2 進め方 — 索引の二行。下に対象部門 */}
        <section className="wv-section wv-sp-steps" data-ground="paper2" aria-labelledby="sp-org-steps-heading">
          <div className="wv-inner">
            <div data-reveal>
              <p className="wv-label">B — Process</p>
              <h2 className="wv-h2" id="sp-org-steps-heading">
                <span className="wv-nowrap">三〜四週間で決め、</span>
                <br className="wv-br-sm" />
                <span className="wv-nowrap">九十日で運用に乗せる。</span>
              </h2>
            </div>
            <ol className="wv-index" data-reveal="2">
              <li className="wv-index__row">
                <p className="wv-index__num">3〜4週間</p>
                <div className="wv-index__main">
                  <span className="wv-index__role">DIAGNOSIS</span>
                  <h3>組織・業務改善診断</h3>
                </div>
                <div className="wv-index__side">
                  <p>
                    1つの経営テーマと2〜3部門に絞り、業務と意思決定の実態の可視化から、AI活用テーマ、優先順位、ガバナンス、90日の実装計画までを設計する。初期モニター
                    200万円〜(税別)。
                  </p>
                  <div className="wv-sp-notes">
                    <div>
                      <p className="wv-sp-notes__head">進み方</p>
                      <ul>
                        {orgDiagnosisFlow.map((item) => (
                          <li key={item}>{item}</li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <p className="wv-sp-notes__head">手元に残るもの</p>
                      <ul>
                        {orgDiagnosisOutputs.map((item) => (
                          <li key={item}>{item}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </li>
              <li className="wv-index__row">
                <p className="wv-index__num">90日</p>
                <div className="wv-index__main">
                  <span className="wv-index__role">IMPLEMENTATION</span>
                  <h3>90日の実装</h3>
                </div>
                <div className="wv-index__side">
                  <p>
                    診断で決めたテーマから着手し、ワークフロー、ナレッジ、Agentを実装して日々の運用に乗せる。運用ルールと教育を含む。
                  </p>
                  <div className="wv-sp-notes wv-sp-notes--one">
                    <div>
                      <p className="wv-sp-notes__head">実装領域</p>
                      <ul className="wv-sp-notes__inline">
                        {orgAreas.map((item) => (
                          <li key={item}>{item}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </li>
            </ol>
            <p className="wv-sp-steps__link" data-reveal="3">
              <a className="wv-link" href="/contact?interest=anc">
                会社全体の診断を相談する <Arrow />
              </a>
            </p>
            <div className="wv-split wv-sp-fit" data-reveal="3">
              <div>
                <p className="wv-split__label">対象部門</p>
                <ul className="wv-list wv-list--plain">
                  {orgTargets.map((item) => (
                    <li key={item}>
                      <b>{item}</b>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="wv-split__label">範囲</p>
                <ul className="wv-list wv-list--plain">
                  <li>
                    <b>まず一つの経営テーマと、二〜三部門から</b>
                  </li>
                  <li>
                    <b>開発部門は、入口Aの進め方をそのまま含む</b>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* ===== 共通 ===== */}

        {/* 五つの層 — この章の唯一の闇。どちらの入口からでも、最後は同じ設計へ */}
        <section className="wv-section wv-sp-layers" data-ground="charcoal" aria-labelledby="sp-layers-heading">
          <div className="wv-inner">
            <div data-reveal>
              <p className="wv-label">Layers</p>
              <h2 className="wv-h2" id="sp-layers-heading">
                <span className="wv-nowrap">どちらから入っても、</span>
                <br className="wv-br-sm" />
                <span className="wv-nowrap">五つの層を上から組み替える。</span>
              </h2>
            </div>
            <ol className="wv-sp-strata" data-reveal aria-label="組み替える五つの層">
              {layers.map((layer) => (
                <li key={layer.num}>
                  <span className="wv-sp-strata__num">{layer.num}</span>
                  <span className="wv-sp-strata__name">{layer.name}</span>
                  <span className="wv-sp-strata__body">{layer.body}</span>
                </li>
              ))}
            </ol>
            <p className="wv-lead wv-sp-layers__lead" data-reveal="3">
              上の層を決めないまま下の層から手をつけると、道具だけが増えていきます。開発組織から入る場合も、経営の指標と権限の層を先に押さえてから、工程を組み替えます。決めるのは、人のままです。
            </p>
          </div>
        </section>

        {/* Company OS との関係 — 縦罫で二列。短く */}
        <section className="wv-section wv-sp-next" data-ground="paper2" aria-label="ほかの章との関係">
          <div className="wv-inner">
            <div className="wv-split" data-reveal>
              <div>
                <p className="wv-split__label">03 / PRODUCT</p>
                <h3>
                  <span className="wv-nowrap">組み替えた流れは、</span>
                  <span className="wv-nowrap">載せる場所を前提に設計する。</span>
                </h3>
                <p>
                  支援で組み替えた業務と判断の流れは、会社の意思と日々の仕事をつなぐCompany
                  OSに載せることを前提に設計します。
                </p>
                <p className="wv-sp-next__link">
                  <a className="wv-link" href="/company-os">
                    Company OS <Arrow />
                  </a>
                </p>
              </div>
              <div>
                <p className="wv-split__label">01 / DELIVERY</p>
                <h3>
                  <span className="wv-nowrap">自分たちの開発で、</span>
                  <span className="wv-nowrap">確かめたやり方を持ち込む。</span>
                </h3>
                <p>ここで組み替える進め方は、受託・共同開発の現場でCordMark自身が使っているものです。</p>
                <p className="wv-sp-next__link">
                  <a className="wv-link" href="/service/development">
                    受託・共同開発 <Arrow />
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
                <span className="wv-nowrap">いまの仕事の進め方から、</span>
                <br />
                <span className="wv-nowrap">一緒に見直しましょう。</span>
              </h2>
            </div>
            <div className="wv-contact__row" data-reveal="2">
              <p className="wv-lead">
                どちらの入口かは決まっていなくて構いません。開発組織と会社のいまの進め方を伺い、最初の一歩を一緒に整理します。
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
