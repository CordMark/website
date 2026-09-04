import type { Metadata } from "next";
import { Noto_Sans_JP, Noto_Serif_JP } from "next/font/google";
import { Footer } from "../../Footer";
import { RevealWatch } from "../../home/RevealWatch";
import "../../home/home.css";
import "../../wv-page.css";
import "./anc-page.css";

const serif = Noto_Serif_JP({ subsets: ["latin"], weight: ["300", "400"], variable: "--wv-serif", display: "swap" });
const sans = Noto_Sans_JP({ subsets: ["latin"], weight: ["400", "500", "700"], variable: "--wv-sans", display: "swap" });

const pageTitle = "組織・業務改善支援 | CordMark";
const pageDescription =
  "ツールが増えても、問いと判断の流れが変わらなければ、会社は速くなりません。CordMarkの組織・業務改善支援は、意思決定・業務・ナレッジ・ガバナンスの流れを診断し、人が決め、AIが運ぶ仕事の形へ組み替える支援です。";

export const metadata: Metadata = {
  title: pageTitle,
  description: pageDescription,
  openGraph: {
    title: pageTitle,
    description: pageDescription,
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "組織・業務改善支援 | CordMark" }],
  },
  twitter: {
    card: "summary_large_image",
    title: pageTitle,
    description: pageDescription,
    images: ["/og.png"],
  },
};

/** 扉の帯。期間・範囲・対象・価格を、事実のまま四つ */
const facts = [
  { key: "期間", value: <span className="wv-nowrap">3〜4週間</span> },
  {
    key: "範囲",
    value: (
      <>
        <span className="wv-nowrap">1つの経営テーマ</span> + <span className="wv-nowrap">2〜3部門</span>
      </>
    ),
  },
  {
    key: "対象部門",
    value: (
      <>
        <span className="wv-nowrap">営業・CS・</span>
        <span className="wv-nowrap">バックオフィスなど</span>
      </>
    ),
  },
  {
    key: "価格",
    value: (
      <>
        <span className="wv-nowrap">初期モニター</span> <span className="wv-nowrap">200万円〜(税別)</span>
      </>
    ),
  },
];

const symptoms = [
  { title: "部署ごとに試しており、全社で広がらない", body: "うまくいったやり方が、隣の部署へ渡っていない。" },
  { title: "PoCやツール導入で止まり、運用に乗らない", body: "試すところまでは進み、日々の仕事には入っていない。" },
  { title: "業務プロセス自体が人間前提のまま", body: "人が集まって決める形は変わらず、手順だけが増える。" },
  { title: "ナレッジが分散し、AIが活用できない", body: "必要な文書が置き場ごとに散り、探す時間が残っている。" },
  { title: "ガバナンスが曖昧で、本格展開できない", body: "どこまで任せてよいかが決まらず、広げる判断が止まる。" },
  { title: "効果測定がなく、投資対効果を説明できない", body: "何がどれだけ変わったかを、次の投資の判断に使えない。" },
];

/** 四行の対照表。左が今、右がこれから */
const shifts = [
  { from: "個人利用中心", to: "ワークフロー組み込み型" },
  { from: "情報探索", to: "組織記憶の活用" },
  { from: "会議依存の意思決定", to: "AI支援の意思決定" },
  { from: "部分最適", to: "全社の再設計" },
];

/** 地層。上の層から順に組み替える */
const layers = [
  { num: "01", name: "Strategy / KPI", body: "経営課題とAI活用テーマを接続する。" },
  { num: "02", name: "Workflow", body: "営業・CS・管理・開発の業務プロセスを再設計する。" },
  { num: "03", name: "Knowledge / Data", body: "社内ナレッジとデータをAIが使える形に整える。" },
  { num: "04", name: "Agent / Application", body: "AI Agent、RAG、業務アプリを実装する。" },
  { num: "05", name: "Governance / Enablement", body: "権限、ルール、教育、運用体制を設計する。" },
];

const diagnosisFlow = [
  "経営課題・事業KPIヒアリング",
  "業務・意思決定プロセスの可視化",
  "AI活用テーマの設計",
  "優先順位・リスク・ガバナンス設計",
  "90日実装ロードマップ作成",
  "診断結果・実装提案のご報告",
];

const diagnosisOutputs = [
  "AI活用成熟度マップ",
  "部門別AI活用候補リスト",
  "業務プロセス Before・After案",
  "AI Agent・Workflow構成案",
  "90日実装ロードマップ",
  "KPI測定シート・ガバナンス方針案",
];

const targetDepartments = ["営業部門", "CS部門", "バックオフィス", "開発部門"];

function Arrow() {
  return (
    <svg viewBox="0 0 16 16" aria-hidden="true">
      <path d="M2.5 8h10" />
      <path d="m8.5 4 4 4-4 4" />
    </svg>
  );
}

export default function AiNativeCompanyPage() {
  return (
    <div className={`wv wv-page ${serif.variable} ${sans.variable}`}>
      <RevealWatch />
      <main id="top" className="site-main">
        {/* 扉 — 何の章か、どこに属するか、事実の帯 */}
        <section className="wv-section wv-anc-hero" data-ground="paper" aria-labelledby="anc-heading">
          <div className="wv-inner">
            <div className="wv-page__hero">
              <div className="wv-page__hero-copy" data-reveal>
                <p className="wv-label">組織・業務改善支援 — 02 / SUPPORT</p>
                <h1 className="wv-h1" id="anc-heading">
                  <span className="wv-nowrap">AIを入れた会社と、</span>
                  <br />
                  <span className="wv-nowrap">AIで動く会社は、違う。</span>
                </h1>
                <p className="wv-lead">
                  部署ごとの試行、PoC止まり、人間前提のままの業務。ツールが増えても、問いと判断の流れが変わらなければ、会社は速くなりません。CordMarkの組織・業務改善支援は、意思決定・業務・ナレッジ・ガバナンスの流れを診断し、人が決め、AIが運ぶ仕事の形へ組み替える支援です。
                </p>
                <p className="wv-anc-hero__link">
                  <a className="wv-link" href="#contact">
                    相談する <Arrow />
                  </a>
                </p>
              </div>
              <aside className="wv-chapter" data-reveal="2" aria-label="この章の位置">
                <p className="wv-chapter__num">02</p>
                <p className="wv-chapter__role">SUPPORT</p>
                <p className="wv-chapter__note">三つの実践の、二つ目。開発の進め方と、会社の動き方。</p>
                <nav className="wv-chapter__links" aria-label="関連するページ">
                  <a className="wv-link" href="/service/ai-driven-development">
                    AI駆動開発支援 <Arrow />
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
            </dl>
          </div>
        </section>

        {/* 節1 症状 — 二列の一覧と、四行の対照表 */}
        <section className="wv-section wv-anc-symptoms" data-ground="paper2" aria-labelledby="anc-symptoms-heading">
          <div className="wv-inner">
            <div data-reveal>
              <p className="wv-label">Symptoms</p>
              <h2 className="wv-h2" id="anc-symptoms-heading">
                <span className="wv-nowrap">試している。</span>
                <br />
                <span className="wv-nowrap">広がってはいない。</span>
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
            <div className="wv-anc-shift" data-reveal="3">
              <p className="wv-label wv-anc-shift__label">Shift</p>
              <p className="wv-anc-shift__row wv-anc-shift__labels">
                <span>いま</span>
                <span>これから</span>
              </p>
              <ul>
                {shifts.map((item) => (
                  <li className="wv-anc-shift__row" key={item.from}>
                    <span className="wv-anc-shift__from">{item.from}</span>
                    <span className="wv-anc-shift__arrow" aria-hidden="true">
                      <Arrow />
                    </span>
                    <span className="wv-anc-shift__to">{item.to}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* 節2 五つの層 — この章の唯一の闇。地層が上から順に現れる */}
        <section className="wv-section wv-anc-layers" data-ground="charcoal" aria-labelledby="anc-layers-heading">
          <div className="wv-inner">
            <div data-reveal>
              <p className="wv-label">Layers</p>
              <h2 className="wv-h2" id="anc-layers-heading">
                <span className="wv-nowrap">五つの層を、</span>
                <br className="wv-br-sm" />
                <span className="wv-nowrap">上から順に組み替える。</span>
              </h2>
            </div>
            <ol className="wv-anc-strata" data-reveal aria-label="組み替える五つの層">
              {layers.map((layer) => (
                <li key={layer.num}>
                  <span className="wv-anc-strata__num">{layer.num}</span>
                  <span className="wv-anc-strata__name">{layer.name}</span>
                  <span className="wv-anc-strata__body">{layer.body}</span>
                </li>
              ))}
            </ol>
            <p className="wv-lead wv-anc-layers__lead" data-reveal="3">
              上の層を決めないまま下の層から手をつけると、道具だけが増えていきます。CordMarkは、経営の指標から権限・教育までを一つの設計として扱い、上の層から順に組み替えます。決めるのは、人のままです。
            </p>
          </div>
        </section>

        {/* 節3 診断 — 索引の二行。数字の位置に期間 */}
        <section className="wv-section wv-anc-steps" data-ground="paper" aria-labelledby="anc-steps-heading">
          <div className="wv-inner">
            <div data-reveal>
              <p className="wv-label">Process</p>
              <h2 className="wv-h2" id="anc-steps-heading">
                <span className="wv-nowrap">三〜四週間で、</span>
                <br className="wv-br-sm" />
                <span className="wv-nowrap">対象と道筋を決める。</span>
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
                    1つの経営テーマと2〜3部門に絞り、業務と意思決定の実態の可視化から、AI活用テーマ、優先順位、ガバナンス、90日の実装計画までを設計する。
                  </p>
                  <div className="wv-anc-notes">
                    <div>
                      <p className="wv-anc-notes__head">進み方</p>
                      <ul>
                        {diagnosisFlow.map((item) => (
                          <li key={item}>{item}</li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <p className="wv-anc-notes__head">手元に残るもの</p>
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
                <p className="wv-index__num">90日</p>
                <div className="wv-index__main">
                  <span className="wv-index__role">IMPLEMENTATION</span>
                  <h3>90日の実装</h3>
                </div>
                <div className="wv-index__side">
                  <p>
                    診断で決めたテーマから着手し、ワークフロー、ナレッジ、Agentを実装して日々の運用に乗せる。運用ルールと教育を含む。
                  </p>
                  <div className="wv-anc-notes wv-anc-notes--one">
                    <div>
                      <p className="wv-anc-notes__head">実装領域</p>
                      <ul className="wv-anc-notes__inline">
                        <li>営業・CSワークフロー</li>
                        <li>社内ナレッジAIアシスタント</li>
                        <li>経営会議・意思決定支援</li>
                        <li>
                          <a href="/service/ai-driven-development">AI駆動開発プロセス</a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </li>
            </ol>
            <p className="wv-anc-steps__link" data-reveal="3">
              <a className="wv-link" href="#contact">
                まず、診断の相談をする <Arrow />
              </a>
            </p>
          </div>
        </section>

        {/* 節4 Company OS との関係 — 縦罫で二列。短く */}
        <section className="wv-section wv-anc-next" data-ground="paper2" aria-label="Company OSとの関係">
          <div className="wv-inner">
            <div className="wv-split" data-reveal>
              <div>
                <p className="wv-split__label">Company OS</p>
                <h3>
                  <span className="wv-nowrap">組み替えた流れは、</span>
                  <span className="wv-nowrap">載せる場所を前提に設計する。</span>
                </h3>
                <p>
                  支援で組み替えた業務と判断の流れは、会社の意思と日々の仕事をつなぐCompany OSに載せることを前提に設計します。Company OSは開発・検証中です。
                </p>
                <p className="wv-anc-next__link">
                  <a className="wv-link" href="/#company-os">
                    Company OS <Arrow />
                  </a>
                </p>
              </div>
              <div>
                <p className="wv-split__label">対象</p>
                <h3>
                  <span className="wv-nowrap">まず一つの経営テーマと、</span>
                  <span className="wv-nowrap">二〜三部門から。</span>
                </h3>
                <ul className="wv-list wv-list--plain">
                  {targetDepartments.map((item) => (
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
        <section className="wv-section wv-page__contact" id="contact" data-ground="night" aria-labelledby="anc-contact-heading">
          <div className="wv-inner">
            <div data-reveal>
              <p className="wv-label">Contact</p>
              <h2 className="wv-h2 wv-h2--xl" id="anc-contact-heading">
                <span className="wv-nowrap">いまの仕事の流れから、</span>
                <br />
                <span className="wv-nowrap">一緒に見直しましょう。</span>
              </h2>
            </div>
            <div className="wv-contact__row" data-reveal="2">
              <p className="wv-lead">
                会社名・氏名・メールアドレスだけで構いません。まだ構想段階でも、現状を伺い最初の一歩を整理します。
              </p>
              <a className="wv-contact__cta" href="/contact?interest=anc">
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
