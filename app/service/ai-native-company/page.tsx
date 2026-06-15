type AncIconType =
  | "agent"
  | "bars"
  | "before"
  | "check"
  | "clock"
  | "cube"
  | "database"
  | "document"
  | "flow"
  | "governance"
  | "grid"
  | "map"
  | "pause"
  | "people"
  | "person"
  | "shield"
  | "tag";

type IconCard = {
  icon: AncIconType;
  title: string;
  body?: string;
};

const painPoints: IconCard[] = [
  { icon: "people", title: "部署ごとにAI活用がバラバラ" },
  { icon: "pause", title: "PoCやツール導入で止まっている" },
  { icon: "person", title: "業務プロセス自体は人間前提のまま" },
  { icon: "database", title: "ナレッジが分散している" },
  { icon: "shield", title: "ガバナンスが曖昧で広げられない" },
  { icon: "bars", title: "投資対効果を説明できない" },
];

const companyShifts = [
  ["個人利用中心", "ワークフロー組み込み型"],
  ["情報検索", "組織記憶の活用"],
  ["会議依存の意思決定", "AI支援の意思決定"],
  ["部分最適", "全社OS再設計"],
];

const layers = [
  {
    number: "01",
    title: "Strategy / KPI",
    body: "経営課題とAI活用テーマを接続する。",
    image: "/assets/lp-data-mesh.png",
  },
  {
    number: "02",
    title: "Workflow",
    body: "営業・CS・管理・開発の業務プロセスを再設計する。",
    image: "/assets/lp-wave-field.png",
  },
  {
    number: "03",
    title: "Knowledge / Data",
    body: "社内ナレッジとデータをAIが使える形に整える。",
    image: "/assets/lp-layer-stack.png",
  },
  {
    number: "04",
    title: "Agent / Application",
    body: "AI Agent、RAG、業務アプリを実装する。",
    image: "/assets/implementation-agent.png",
  },
  {
    number: "05",
    title: "Governance / Enablement",
    body: "権限、ルール、教育、運用体制を設計する。",
    image: "/assets/how-we-work-measure-operate.png",
  },
];

const roadmapBullets = [
  "既存業務と意思決定フローの可視化",
  "AI活用テーマの洗い出しと優先順位付け",
  "KPI設計とガバナンス整理",
  "90日実装ロードマップの提案",
];

const roadmapSteps = [
  { icon: "flow", step: "STEP 1", title: "経営課題・事業KPIヒアリング" },
  { icon: "document", step: "STEP 2", title: "業務・意思決定プロセスの可視化" },
  { icon: "database", step: "STEP 3", title: "AI活用テーマの設計" },
  { icon: "grid", step: "STEP 4", title: "優先順位・リスク・ガバナンス設計" },
  { icon: "clock", step: "STEP 5", title: "90日実装ロードマップ作成" },
  { icon: "person", step: "STEP 6", title: "診断結果・実装提案のご報告" },
] satisfies Array<{ icon: AncIconType; step: string; title: string }>;

const deliverables: IconCard[] = [
  {
    icon: "map",
    title: "AI Native化構想マップ",
    body: "現在地と目指す姿を可視化",
  },
  {
    icon: "document",
    title: "部門別AI活用候補リスト",
    body: "部門ごとのユースケースを整理",
  },
  {
    icon: "before",
    title: "業務プロセス Before / After案",
    body: "AI導入前後のフローを比較",
  },
  {
    icon: "agent",
    title: "AI Agent / Workflow構成案",
    body: "必要なAgentと連携を設計",
  },
  {
    icon: "document",
    title: "90日実装ロードマップ",
    body: "優先順位とマイルストーンを明確化",
  },
  {
    icon: "document",
    title: "KPI測定シート / ガバナンス方針案",
    body: "効果測定と運用ルールを整備",
  },
];

const implementationAreas = [
  {
    title: "営業・CSワークフロー",
    body: "問い合わせ、提案、議事録、対応をAIで支援。",
    variant: "tasks",
  },
  {
    title: "社内ナレッジAIアシスタント",
    body: "FAQ、業務マニュアル、社内文書を横断検索。",
    variant: "search",
  },
  {
    title: "経営会議・意思決定支援AI",
    body: "論点整理、資料要約、過去判断に基づく提案。",
    variant: "metrics",
  },
  {
    title: "AI駆動開発プロセス",
    body: "仕様、実装、レビュー、テストをAI前提で再設計。",
    variant: "board",
  },
];

const offerFacts = [
  { icon: "clock", label: "期間", value: "3〜4週間" },
  { icon: "people", label: "対象", value: "経営層 / 事業責任者 / DX推進 / 情報システム" },
  { icon: "grid", label: "範囲", value: "1つの経営テーマ + 2〜3業務領域" },
  { icon: "check", label: "形式", value: "オンライン中心（必要に応じて対面）" },
  { icon: "tag", label: "価格", value: "初期モニター募集中 / 個別見積もり" },
] satisfies Array<{ icon: AncIconType; label: string; value: string }>;

const footerLinks = [
  { label: "About", href: "/#about" },
  { label: "Services", href: "/#services" },
  { label: "How We Work", href: "/#how-we-work" },
  { label: "Cases", href: "/#cases" },
  { label: "Privacy Policy", href: "#top" },
];

function AncIcon({ type }: { type: AncIconType }) {
  return (
    <svg viewBox="0 0 40 40" aria-hidden="true">
      {type === "people" && (
        <>
          <path d="M15 19a6 6 0 1 0 0-12 6 6 0 0 0 0 12Z" />
          <path d="M5.5 34v-4.2c0-4.6 3.7-8.3 8.3-8.3h2.4c4.6 0 8.3 3.7 8.3 8.3V34" />
          <path d="M27 18.2a4.8 4.8 0 1 0 0-9.6" />
          <path d="M28.2 21.4c3.7.4 6.3 3.5 6.3 7.5V34" />
        </>
      )}
      {type === "pause" && (
        <>
          <circle cx="20" cy="20" r="14" />
          <path d="M16.2 13.5v13" />
          <path d="M23.8 13.5v13" />
        </>
      )}
      {type === "person" && (
        <>
          <circle cx="20" cy="14" r="5.5" />
          <path d="M10.2 33.5c1.8-7 5.1-10.4 9.8-10.4s8 3.4 9.8 10.4" />
        </>
      )}
      {type === "database" && (
        <>
          <ellipse cx="20" cy="10" rx="10.5" ry="4.8" />
          <path d="M9.5 10v18c0 2.7 4.7 4.8 10.5 4.8S30.5 30.7 30.5 28V10" />
          <path d="M9.5 19c0 2.7 4.7 4.8 10.5 4.8S30.5 21.7 30.5 19" />
        </>
      )}
      {type === "shield" && (
        <>
          <path d="M20 5.2 32 9.8v9c0 7.4-4.9 13.2-12 15-7.1-1.8-12-7.6-12-15v-9L20 5.2Z" />
          <path d="m14.5 20 3.6 3.6 7.6-8.2" />
        </>
      )}
      {type === "bars" && (
        <>
          <path d="M8 33V22" />
          <path d="M16 33V14" />
          <path d="M24 33V18" />
          <path d="M32 33V8" />
          <path d="M6 33h28" />
        </>
      )}
      {type === "flow" && (
        <>
          <circle cx="9" cy="9" r="3" />
          <circle cx="31" cy="9" r="3" />
          <circle cx="20" cy="31" r="3" />
          <path d="M12 9h16" />
          <path d="m29.2 12.1-7.7 15.8" />
          <path d="m18.5 27.9-7.7-15.8" />
        </>
      )}
      {type === "document" && (
        <>
          <path d="M11 5.5h13.2L30 11.3v23.2H11z" />
          <path d="M24.2 5.5v5.8H30" />
          <path d="M15.5 17.5h9" />
          <path d="M15.5 23h9" />
          <path d="M15.5 28.5h6" />
        </>
      )}
      {type === "grid" && (
        <>
          <rect x="8" y="8" width="9" height="9" rx="1.5" />
          <rect x="23" y="8" width="9" height="9" rx="1.5" />
          <rect x="8" y="23" width="9" height="9" rx="1.5" />
          <rect x="23" y="23" width="9" height="9" rx="1.5" />
        </>
      )}
      {type === "clock" && (
        <>
          <circle cx="20" cy="20" r="15" />
          <path d="M20 10.5V20l7 4.7" />
        </>
      )}
      {type === "check" && (
        <>
          <circle cx="20" cy="20" r="15" />
          <path d="m13 20.5 4.5 4.5L27.4 14" />
        </>
      )}
      {type === "tag" && (
        <>
          <path d="M5.5 20.5 20.2 5.8h11v11L16.5 31.5a3.8 3.8 0 0 1-5.4 0l-5.6-5.6a3.8 3.8 0 0 1 0-5.4Z" />
          <circle cx="27" cy="10.5" r="2" />
        </>
      )}
      {type === "map" && (
        <>
          <path d="M7 11.5 16 7l8 4.5 9-4.5v25.5L24 37l-8-4.5L7 37z" />
          <path d="M16 7v25.5" />
          <path d="M24 11.5V37" />
        </>
      )}
      {type === "before" && (
        <>
          <path d="M7 12h10" />
          <path d="M7 20h10" />
          <path d="M7 28h10" />
          <path d="M23 12h10" />
          <path d="M23 20h10" />
          <path d="M23 28h10" />
          <path d="m17.8 20 4.4 0" />
          <path d="m20.2 17.6 2.4 2.4-2.4 2.4" />
        </>
      )}
      {type === "agent" && (
        <>
          <path d="M20 6.5v6" />
          <rect x="9" y="12.5" width="22" height="17" rx="4" />
          <circle cx="16" cy="21" r="1.8" />
          <circle cx="24" cy="21" r="1.8" />
          <path d="M15 27h10" />
          <path d="M7 18.5h-3" />
          <path d="M36 18.5h-3" />
        </>
      )}
      {type === "cube" && (
        <>
          <path d="m20 5.5 13 7.5v14L20 34.5 7 27V13z" />
          <path d="M20 20.5v14" />
          <path d="m7 13 13 7.5L33 13" />
          <path d="M20 5.5v15" />
        </>
      )}
      {type === "governance" && (
        <>
          <path d="M20 5.2 32 9.8v9c0 7.4-4.9 13.2-12 15-7.1-1.8-12-7.6-12-15v-9L20 5.2Z" />
          <path d="M14 19.2h12" />
          <path d="M20 13.2v12" />
        </>
      )}
    </svg>
  );
}

function MiniInterface({ variant }: { variant: string }) {
  if (variant === "search") {
    return (
      <div className="anc-mini anc-mini--search" aria-hidden="true">
        <div className="anc-mini-searchbar"></div>
        <span></span>
        <span></span>
        <span></span>
      </div>
    );
  }

  if (variant === "metrics") {
    return (
      <div className="anc-mini anc-mini--metrics" aria-hidden="true">
        <div>
          <b></b>
          <span></span>
        </div>
        <div>
          <b></b>
          <span></span>
        </div>
        <div>
          <b></b>
          <span></span>
        </div>
      </div>
    );
  }

  if (variant === "board") {
    return (
      <div className="anc-mini anc-mini--board" aria-hidden="true">
        <div>
          <strong>Backlog</strong>
          <span></span>
          <span></span>
        </div>
        <div>
          <strong>In Progress</strong>
          <span></span>
          <span></span>
        </div>
        <div>
          <strong>Review</strong>
          <span></span>
          <span></span>
        </div>
      </div>
    );
  }

  return (
    <div className="anc-mini anc-mini--tasks" aria-hidden="true">
      <span></span>
      <span></span>
      <span></span>
    </div>
  );
}

export default function AiNativeCompanyPage() {
  return (
    <>
      <main id="top" className="anc-page site-main">
        <section className="anc-hero" aria-labelledby="anc-heading">
          <div className="anc-hero__copy">
            <p className="anc-kicker">AI Native Company Transformation</p>
            <h1 id="anc-heading">
              会社を、
              <br />
              AI前提のOperating Systemへ。
            </h1>
            <p className="anc-lead">
              AIツールの導入ではなく、意思決定、業務プロセス、ナレッジ、データ、
              ガバナンスまでを再設計。人間とAIが効率的に考え、動き、学習する会社をつくります。
            </p>
            <div className="anc-actions">
              <a className="anc-primary" href="#contact">
                AI Native化について相談する <span aria-hidden="true">→</span>
              </a>
              <a className="anc-secondary" href="#roadmap">
                変革プログラムを見る <span aria-hidden="true">→</span>
              </a>
            </div>
          </div>
          <div className="anc-hero__visual" aria-hidden="true">
            <img src="/assets/ai-native-company-hero.png" alt="" />
          </div>
        </section>

        <section className="anc-section anc-problems" aria-labelledby="anc-problems-heading">
          <p className="anc-kicker">よくある課題</p>
          <h2 id="anc-problems-heading">
            AIを使い始めても、会社はまだAI Nativeになっていない。
          </h2>
          <div className="anc-problem-grid">
            {painPoints.map((point) => (
              <article className="anc-problem-card" key={point.title}>
                <AncIcon type={point.icon} />
                <h3>{point.title}</h3>
              </article>
            ))}
          </div>
        </section>

        <section className="anc-section anc-definition" aria-labelledby="anc-definition-heading">
          <div>
            <p className="anc-kicker">AI Native Companyとは</p>
            <h2 id="anc-definition-heading">
              AIを使う会社ではなく、
              <br />
              AIを前提に動く会社へ。
            </h2>
          </div>
          <dl className="anc-shift-list">
            {companyShifts.map(([before, after]) => (
              <div key={before}>
                <dt>{before}</dt>
                <dd>
                  <span aria-hidden="true">→</span>
                  {after}
                </dd>
              </div>
            ))}
          </dl>
        </section>

        <section className="anc-section anc-layers" aria-labelledby="anc-layers-heading">
          <p className="anc-kicker">Transformation Layers</p>
          <h2 id="anc-layers-heading">AI Native化は、5つのレイヤーで進める。</h2>
          <div className="anc-layer-grid">
            {layers.map((layer) => (
              <article className="anc-layer-card" key={layer.number}>
                <span>{layer.number}</span>
                <h3>{layer.title}</h3>
                <p>{layer.body}</p>
                <img src={layer.image} alt="" aria-hidden="true" />
              </article>
            ))}
          </div>
        </section>

        <section className="anc-section anc-roadmap" id="roadmap" aria-labelledby="anc-roadmap-heading">
          <div className="anc-roadmap__head">
            <div>
              <p className="anc-kicker">AI Native Company診断とは</p>
              <h2 id="anc-roadmap-heading">
                3〜4週間で、対象領域と
                <br />
                実装ロードマップを設計する。
              </h2>
              <p>
                1つの経営テーマと2〜3業務領域に絞り、業務実態・意思決定プロセスの可視化から、AI活用テーマ、優先順位、KPI、90日実装計画までを設計します。
              </p>
            </div>
            <ul>
              {roadmapBullets.map((bullet) => (
                <li key={bullet}>{bullet}</li>
              ))}
            </ul>
          </div>
          <ol className="anc-step-list">
            {roadmapSteps.map((item) => (
              <li key={item.step}>
                <AncIcon type={item.icon} />
                <span>{item.step}</span>
                <strong>{item.title}</strong>
              </li>
            ))}
          </ol>
        </section>

        <section className="anc-section anc-deliverables" aria-labelledby="anc-deliverables-heading">
          <p className="anc-kicker">診断で得られるもの</p>
          <h2 id="anc-deliverables-heading">AI導入の投資判断に必要な資料を納品します。</h2>
          <div className="anc-deliverable-grid">
            {deliverables.map((item) => (
              <article className="anc-deliverable-card" key={item.title}>
                <AncIcon type={item.icon} />
                <div>
                  <h3>{item.title}</h3>
                  <p>{item.body}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="anc-section anc-areas" aria-labelledby="anc-areas-heading">
          <p className="anc-kicker">Implementation Areas</p>
          <div className="anc-area-grid">
            {implementationAreas.map((area) => (
              <article className="anc-area-card" key={area.title}>
                <h3>{area.title}</h3>
                <p>{area.body}</p>
                <MiniInterface variant={area.variant} />
              </article>
            ))}
          </div>
        </section>

        <section className="anc-section anc-offer" aria-labelledby="anc-offer-heading">
          <p className="anc-kicker">価格・対象</p>
          <h2 id="anc-offer-heading">まずは1つの経営テーマと2〜3部門から始めます。</h2>
          <dl className="anc-offer-list">
            {offerFacts.map((fact) => (
              <div key={fact.label}>
                <AncIcon type={fact.icon} />
                <dt>{fact.label}</dt>
                <dd>{fact.value}</dd>
              </div>
            ))}
          </dl>
          <a className="anc-primary anc-offer__button" href="#contact">
            AI Native化について相談する <span aria-hidden="true">→</span>
          </a>
        </section>

        <section className="anc-section anc-contact" id="contact" aria-labelledby="anc-contact-heading">
          <p className="anc-kicker">お問い合わせフォーム</p>
          <h2 id="anc-contact-heading">AI Native化に関するご相談はこちらから。</h2>
          <form className="anc-form">
            <label>
              <span>会社名</span>
              <input name="company" type="text" placeholder="株式会社コードマーク" />
            </label>
            <label>
              <span>氏名</span>
              <input name="name" type="text" placeholder="山田 太郎" />
            </label>
            <label>
              <span>役職</span>
              <input name="role" type="text" placeholder="事業責任者" />
            </label>
            <label>
              <span>メールアドレス</span>
              <input name="email" type="email" placeholder="taro.yamada@cordmark.co.jp" />
            </label>
            <label>
              <span>従業員規模</span>
              <select name="company-size" defaultValue="">
                <option value="" disabled>
                  選択してください
                </option>
                <option>〜99名</option>
                <option>100〜499名</option>
                <option>500名〜</option>
              </select>
            </label>
            <label>
              <span>対象にしたい部門</span>
              <select name="department" defaultValue="">
                <option value="" disabled>
                  選択してください
                </option>
                <option>営業・CS</option>
                <option>管理部門</option>
                <option>開発・プロダクト</option>
                <option>全社横断</option>
              </select>
            </label>
            <label>
              <span>現在のAI活用状況</span>
              <select name="ai-status" defaultValue="">
                <option value="" disabled>
                  選択してください
                </option>
                <option>一部社員が個人利用している</option>
                <option>PoCを進めている</option>
                <option>部門導入済み</option>
                <option>未導入</option>
              </select>
            </label>
            <label>
              <span>相談したい内容</span>
              <select name="consultation" defaultValue="">
                <option value="" disabled>
                  選択してください
                </option>
                <option>診断について詳しく聞きたい</option>
                <option>自社に合うか相談したい</option>
                <option>実装支援まで相談したい</option>
              </select>
            </label>
            <label>
              <span>予算感</span>
              <select name="budget" defaultValue="">
                <option value="" disabled>
                  選択してください
                </option>
                <option>300〜500万円</option>
                <option>500〜1000万円</option>
                <option>1000万円以上</option>
              </select>
            </label>
            <label>
              <span>希望面談日時</span>
              <input name="date" type="date" />
            </label>
            <button type="button">
              内容を確認する <span aria-hidden="true">→</span>
            </button>
          </form>
        </section>

        <section className="anc-final-cta">
          <div>
            <h2>Let&apos;s build your AI Native company.</h2>
            <p>AIを試す段階から、AIで事業を動かす段階へ。</p>
          </div>
          <a className="button" href="#contact">
            Contact Us <span aria-hidden="true">→</span>
          </a>
        </section>
      </main>

      <footer className="site-footer">
        <div className="site-footer__brand">
          <a className="brand brand--footer" href="#top" aria-label="CordMark home">
            CordMark
          </a>
          <small>© 2026 CORDMARK Inc. All rights reserved.</small>
        </div>
        <nav aria-label="Footer navigation">
          {footerLinks.map((link) => (
            <a key={link.label} href={link.href}>
              {link.label}
            </a>
          ))}
        </nav>
        <a className="to-top" href="#top" aria-label="ページ上部へ戻る">
          ↑
        </a>
      </footer>
    </>
  );
}
