import { QueryFormStatus } from "../../FormStatus";
import { LoadingSubmitButton } from "../../LoadingSubmitButton";

type AidIconType =
  | "bars"
  | "book"
  | "chart"
  | "check"
  | "code"
  | "clock"
  | "document"
  | "flag"
  | "flow"
  | "growth"
  | "grid"
  | "list"
  | "monitor"
  | "person"
  | "rocket"
  | "scissors"
  | "search"
  | "shield"
  | "tag"
  | "target"
  | "user-circle";

type AidCardItem = {
  icon: AidIconType;
  title: string;
  body: string;
};

type AidProblemVisual = "pipeline" | "team" | "fragmented" | "kpi" | "rules" | "knowledge";

type AidProblemItem = AidCardItem & {
  visual: AidProblemVisual;
};

type AidSupportItem = {
  icon: AidIconType;
  title: string;
  body: string;
};

type AidSupportGroup = {
  label: string;
  items: AidSupportItem[];
};

type AidPhaseItem = {
  phase: string;
  title: string;
  emphasis: string;
  body: string;
};

type AidProcessDetailStep = {
  day: string;
  number: string;
  image: string;
  title: string;
  body: string;
};

type AidPoint = [number, number];

type AidKpiExample = {
  title: string;
  before: string;
  after: string;
  delta?: string;
  trend: {
    before: AidPoint[];
    after: AidPoint[];
  };
};

const painPoints: AidProblemItem[] = [
  {
    icon: "scissors",
    title: "AIツールを入れても開発成果につながらない",
    body: "導入は進んでも、開発速度や品質改善に結びついていない。",
    visual: "pipeline",
  },
  {
    icon: "person",
    title: "個人活用に留まり、チーム標準になっていない",
    body: "一部メンバーの利用に留まり、再現可能な開発フローになっていない。",
    visual: "team",
  },
  {
    icon: "flow",
    title: "レビュー・テスト・ドキュメント生成が分断している",
    body: "工程ごとのAI利用がバラバラで、開発体験がつながっていない。",
    visual: "fragmented",
  },
  {
    icon: "bars",
    title: "KPIで効果検証できていない",
    body: "導入前後の変化を測る指標がなく、投資判断につなげられない。",
    visual: "kpi",
  },
  {
    icon: "shield",
    title: "現場に合う運用ルールがない",
    body: "品質・セキュリティ・権限管理を踏まえた利用ルールが設計されていない。",
    visual: "rules",
  },
  {
    icon: "user-circle",
    title: "ナレッジが属人化している",
    body: "知見や使い方が個人に閉じ、チームで共有・再利用できていない。",
    visual: "knowledge",
  },
];

const aidValueBullets = [
  "現状のプロセスとAI活用状況を客観的に診断",
  "AIを入れるべき工程・テーマと測定すべきKPIを特定",
  "具体的な改善計画を設計し、実装・定着まで支援",
];

const supportGroups: AidSupportGroup[] = [
  {
    label: "診断・分析",
    items: [
      {
        icon: "document",
        title: "仕様・要件整理",
        body: "要件の曖昧さを可視化し、AI活用に適した課題を特定します。",
      },
      {
        icon: "flow",
        title: "実装フロー設計",
        body: "AIを活用する最適な工程とワークフローを設計します。",
      },
    ],
  },
  {
    label: "実装支援",
    items: [
      {
        icon: "code",
        title: "コードレビュー支援",
        body: "AIを活用したレビュー体制を構築し、品質とスピードを向上します。",
      },
      {
        icon: "shield",
        title: "テスト自動化設計",
        body: "AIを活用したテスト設計・自動化で、品質を継続的に担保します。",
      },
    ],
  },
  {
    label: "基盤整備",
    items: [
      {
        icon: "book",
        title: "ドキュメント整備",
        body: "開発知見を体系化し、AI活用しやすいドキュメント基盤を整えます。",
      },
      {
        icon: "chart",
        title: "KPI設計・可視化",
        body: "効果を測定するKPIを設計し、ダッシュボードで可視化します。",
      },
    ],
  },
  {
    label: "定着支援",
    items: [
      {
        icon: "monitor",
        title: "開発環境／ツール活用設計",
        body: "AIツールや開発環境の選定・導入を支援し、活用しやすい基盤を構築します。",
      },
      {
        icon: "person",
        title: "チーム定着支援",
        body: "トレーニングや伴走支援を通じて、チームへの定着を実現します。",
      },
    ],
  },
];

const developmentPhases: AidPhaseItem[] = [
  {
    phase: "Phase 1",
    title: "AI駆動開発プロセス診断",
    emphasis: "2週間",
    body: "現行プロセスを分析し、AIを入れるべき工程、測定KPI、実装テーマを設計します。",
  },
  {
    phase: "Phase 2",
    title: "6週間実装パイロット",
    emphasis: "6週間",
    body: "診断で選定したテーマを対象に、AIワークフロー・Agent・開発環境・運用ルールを実装します。",
  },
  {
    phase: "Phase 3",
    title: "開発組織への定着・横展開",
    emphasis: "継続的に支援",
    body: "利用状況とKPIを見ながら、チーム標準の開発プロセスとして定着させ、横展開します。",
  },
];

const programBullets = [
  "現行プロセスの課題とボトルネックを可視化",
  "AI活用テーマの洗い出しと優先順位付け",
  "導入前後で測るKPIの設計",
  "6週間の実装パイロット計画を提案",
];

const diagnosisSteps: Array<{ step: string; title: string; icon: AidIconType }> = [
  {
    step: "STEP 1",
    title: "現状ヒアリング・プロセス整理",
    icon: "person",
  },
  {
    step: "STEP 2",
    title: "AI活用候補の設計",
    icon: "user-circle",
  },
  {
    step: "STEP 3",
    title: "KPI測定設計",
    icon: "chart",
  },
  {
    step: "STEP 4",
    title: "6週間の実装パイロット計画",
    icon: "flow",
  },
  {
    step: "STEP 5",
    title: "診断結果のご報告",
    icon: "check",
  },
];

const diagnosisProcessDetailSteps: AidProcessDetailStep[] = [
  {
    day: "Day 1",
    number: "01",
    image: "/assets/aid-process-kickoff.webp",
    title: "キックオフ",
    body: "目的・スコープ・体制をすり合わせ、計画を策定。",
  },
  {
    day: "Day 2–5",
    number: "02",
    image: "/assets/aid-process-hearing.webp",
    title: "ヒアリング・現行プロセス整理",
    body: "各ステークホルダーへヒアリングを行い、現行フローを整理。",
  },
  {
    day: "Day 6–8",
    number: "03",
    image: "/assets/aid-process-candidates.webp",
    title: "AI活用候補の設計",
    body: "AI活用の余地を特定し、候補を優先順位化。",
  },
  {
    day: "Day 9–10",
    number: "04",
    image: "/assets/aid-process-kpi.webp",
    title: "KPI設計",
    body: "KPIを設計し、測定方法と目標値を定義。",
  },
  {
    day: "Day 11–13",
    number: "05",
    image: "/assets/aid-process-pilot.webp",
    title: "実装パイロット計画",
    body: "パイロットのスコープ・体制・計画・期待効果を整理。",
  },
  {
    day: "Day 14",
    number: "06",
    image: "/assets/aid-process-report.webp",
    title: "報告会",
    body: "診断結果と推奨内容をご報告・ご合意。",
  },
];

const deliverables: AidCardItem[] = [
  {
    icon: "list",
    title: "AI活用候補リスト",
    body: "工程ごとにAIを活用できる業務を一覧化",
  },
  {
    icon: "flow",
    title: "開発プロセス Before/After案",
    body: "AI導入前後のフローを比較",
  },
  {
    icon: "grid",
    title: "優先順位マップ",
    body: "効果・難易度・リスクでテーマを分類",
  },
  {
    icon: "chart",
    title: "KPI測定シート",
    body: "測定項目・目標・方法を1枚に整理",
  },
  {
    icon: "document",
    title: "6週間実装パイロット提案書",
    body: "実装計画・体制・費用・KPIを提示",
  },
];

const diagnosisKpiExamples: AidKpiExample[] = [
  {
    title: "開発リードタイム",
    before: "18.5日",
    after: "12.3日",
    delta: "-33%",
    trend: {
      before: [
        [12, 52],
        [40, 49],
        [72, 40],
      ],
      after: [
        [112, 60],
        [148, 70],
      ],
    },
  },
  {
    title: "PR作成時間",
    before: "46分",
    after: "22分",
    delta: "-52%",
    trend: {
      before: [
        [12, 54],
        [42, 53],
        [72, 44],
      ],
      after: [
        [112, 61],
        [148, 72],
      ],
    },
  },
  {
    title: "レビュー待ち時間",
    before: "30.2時間",
    after: "14.1時間",
    delta: "-53%",
    trend: {
      before: [
        [12, 50],
        [42, 48],
        [72, 42],
      ],
      after: [
        [112, 62],
        [148, 72],
      ],
    },
  },
  {
    title: "テスト作成時間",
    before: "120分",
    after: "45分",
    delta: "-62%",
    trend: {
      before: [
        [12, 50],
        [42, 47],
        [72, 40],
      ],
      after: [
        [112, 62],
        [148, 72],
      ],
    },
  },
  {
    title: "AIツール利用率",
    before: "22%",
    after: "71%",
    trend: {
      before: [
        [12, 68],
        [42, 65],
        [72, 42],
      ],
      after: [
        [112, 33],
        [148, 26],
      ],
    },
  },
  {
    title: "利用者満足度",
    before: "3.1",
    after: "4.3",
    trend: {
      before: [
        [12, 68],
        [42, 68],
        [72, 55],
      ],
      after: [
        [112, 42],
        [148, 32],
      ],
    },
  },
];

const pricingTargets = [
  "SIer / SES / 受託開発企業",
  "SaaS事業会社",
  "事業会社の内製開発部門",
  "チーム規模：5名〜数百名程度",
];

const fitStates = [
  "AIツールを一部導入済みだが、成果が出ていない",
  "小さく検証し、効果を見極めたい",
  "効果測定の方法に課題がある",
  "セキュリティ・品質面の不安がある",
];

const teamSizeOptions = ["1〜4名", "5〜20名", "21〜50名", "50名以上"];

const issueOptions = [
  "要件定義・仕様策定",
  "実装",
  "レビュー",
  "テスト",
  "ドキュメント",
  "運用",
];

function PeopleIcon() {
  return (
    <svg viewBox="0 0 36 36" aria-hidden="true">
      <path d="M14 17.5a6 6 0 1 0 0-12 6 6 0 0 0 0 12Z" />
      <path d="M4.5 31v-4.5c0-4.2 3.4-7.6 7.6-7.6h3.8c4.2 0 7.6 3.4 7.6 7.6V31" />
      <path d="M24.5 16.5a4.8 4.8 0 1 0 0-9.6" />
      <path d="M25.8 19.3h.9c3.7 0 6.8 3 6.8 6.8V31" />
    </svg>
  );
}

function ClockIcon() {
  return (
    <svg viewBox="0 0 36 36" aria-hidden="true">
      <circle cx="18" cy="18" r="14" />
      <path d="M18 9.5V18l6.2 4.2" />
    </svg>
  );
}

function TagIcon() {
  return (
    <svg viewBox="0 0 36 36" aria-hidden="true">
      <path d="M4.5 18.5 18.2 4.8h10.5v10.5L15 29a3.2 3.2 0 0 1-4.5 0l-6-6a3.2 3.2 0 0 1 0-4.5Z" />
      <circle cx="24.8" cy="10.8" r="2.1" />
    </svg>
  );
}

function AidIcon({ type }: { type: AidIconType }) {
  if (type === "clock") return <ClockIcon />;
  if (type === "tag") return <TagIcon />;
  if (type === "person") return <PeopleIcon />;

  return (
    <svg viewBox="0 0 36 36" aria-hidden="true">
      {type === "flow" && (
        <>
          <path d="M7 7v22" />
          <path d="M18 7v22" />
          <path d="M29 7v22" />
          <path d="M7 10l11 7 11-7" />
          <path d="M7 26l11-7 11 7" />
          <circle cx="7" cy="7" r="2.8" />
          <circle cx="18" cy="18" r="2.8" />
          <circle cx="29" cy="29" r="2.8" />
        </>
      )}
      {type === "bars" && (
        <>
          <path d="M7 29V18" />
          <path d="M14 29V11" />
          <path d="M21 29V15" />
          <path d="M28 29V7" />
          <path d="M5 29h26" />
        </>
      )}
      {type === "user-circle" && (
        <>
          <circle cx="18" cy="18" r="14" />
          <circle cx="18" cy="15" r="4.2" />
          <path d="M10.5 27c1.9-4.1 4.4-6.2 7.5-6.2s5.6 2.1 7.5 6.2" />
        </>
      )}
      {type === "shield" && (
        <>
          <path d="M18 4.8 29 9v8.2c0 7-4.5 12.4-11 14-6.5-1.6-11-7-11-14V9l11-4.2Z" />
          <path d="m13.5 17.8 3.1 3.1 6.3-7" />
        </>
      )}
      {type === "document" && (
        <>
          <path d="M10 5.5h12.5L28 11v19.5H10z" />
          <path d="M22.5 5.5V11H28" />
          <path d="M14 17h10" />
          <path d="M14 22h10" />
          <path d="M14 27h7" />
        </>
      )}
      {type === "code" && (
        <>
          <rect x="7" y="8" width="22" height="20" rx="2.2" />
          <path d="m15 15-4 3 4 3" />
          <path d="m21 15 4 3-4 3" />
          <path d="m19.5 13.5-3 9" />
        </>
      )}
      {type === "book" && (
        <>
          <path d="M8 7.5h9.2c2.2 0 4 1.8 4 4V30H12c-2.2 0-4-1.8-4-4V7.5Z" />
          <path d="M28 7.5h-6.8V30H24c2.2 0 4-1.8 4-4V7.5Z" />
          <path d="M12 12h5" />
          <path d="M12 17h5" />
        </>
      )}
      {type === "monitor" && (
        <>
          <rect x="6.5" y="8" width="23" height="16" rx="2.2" />
          <path d="M18 24v5" />
          <path d="M12.5 29h11" />
        </>
      )}
      {type === "rocket" && (
        <>
          <path d="M20.8 5.8c5.2 1.2 8.2 4.2 9.4 9.4l-7.5 7.5-9.4-9.4 7.5-7.5Z" />
          <path d="M13.3 13.3 8.5 15 6 21l7.8-2.8" />
          <path d="m17.8 22.2-2.8 7.8 6-2.5 1.7-4.8" />
          <circle cx="22.2" cy="13.8" r="2.6" />
          <path d="M10 26 6.5 29.5" />
        </>
      )}
      {type === "search" && (
        <>
          <circle cx="15.5" cy="15.5" r="9.5" />
          <path d="m22.4 22.4 7.1 7.1" />
        </>
      )}
      {type === "flag" && (
        <>
          <path d="M8 31V7" />
          <path d="M8 8c4.6-2.5 8.7 2.6 13.3.1 2-.9 3.8-1.2 6.7.1v13c-2.9-1.3-4.7-1-6.7-.1C16.7 23.6 12.6 18.5 8 21" />
        </>
      )}
      {type === "target" && (
        <>
          <circle cx="18" cy="18" r="13" />
          <circle cx="18" cy="18" r="8" />
          <circle cx="18" cy="18" r="3" />
          <path d="m24 12 5-5" />
        </>
      )}
      {type === "list" && (
        <>
          <path d="M13 10h17" />
          <path d="M13 18h17" />
          <path d="M13 26h17" />
          <circle cx="7" cy="10" r="1.8" />
          <circle cx="7" cy="18" r="1.8" />
          <circle cx="7" cy="26" r="1.8" />
        </>
      )}
      {type === "grid" && (
        <>
          <rect x="7" y="7" width="8" height="8" rx="1.2" />
          <rect x="21" y="7" width="8" height="8" rx="1.2" />
          <rect x="7" y="21" width="8" height="8" rx="1.2" />
          <rect x="21" y="21" width="8" height="8" rx="1.2" />
        </>
      )}
      {type === "chart" && (
        <>
          <path d="M6 29V17" />
          <path d="M13 29V10" />
          <path d="M20 29V14" />
          <path d="M27 29V6" />
          <path d="m6 17 7-7 7 4 7-8" />
        </>
      )}
      {type === "growth" && (
        <>
          <path d="m7 18 7-7 6 5 9-10" />
          <path d="M24 6h5v5" />
          <circle cx="10" cy="25" r="2.4" />
          <circle cx="18" cy="23" r="2.4" />
          <circle cx="26" cy="25" r="2.4" />
          <path d="M5.8 31c1.1-2.9 2.5-4.4 4.2-4.4s3.1 1.5 4.2 4.4" />
          <path d="M13.8 31c1.1-2.9 2.5-4.4 4.2-4.4s3.1 1.5 4.2 4.4" />
          <path d="M21.8 31c1.1-2.9 2.5-4.4 4.2-4.4s3.1 1.5 4.2 4.4" />
        </>
      )}
      {type === "check" && (
        <>
          <circle cx="18" cy="18" r="14" />
          <path d="m12 18.4 4 4 8.2-9" />
        </>
      )}
      {type === "scissors" && (
        <>
          <circle cx="10.2" cy="25.8" r="3.6" />
          <circle cx="25.8" cy="25.8" r="3.6" />
          <path d="m13 23.1 15-15" />
          <path d="m23 23.1-15-15" />
          <path d="M15.2 20.8 20.8 26.4" />
          <path d="M20.8 20.8 15.2 26.4" />
        </>
      )}
    </svg>
  );
}

function AidInfoCard({
  className,
  item,
}: {
  className: "aid-problem" | "aid-deliverable";
  item: AidCardItem;
}) {
  return (
    <article className={className}>
      <AidIcon type={item.icon} />
      <h3>{item.title}</h3>
      <p>{item.body}</p>
    </article>
  );
}

const aidProblemImageSources: Record<AidProblemVisual, string> = {
  pipeline: "/assets/aid-challenge-pipeline.webp",
  team: "/assets/aid-challenge-team.webp",
  fragmented: "/assets/aid-challenge-fragmented.webp",
  kpi: "/assets/aid-challenge-kpi.webp",
  rules: "/assets/aid-challenge-rules.webp",
  knowledge: "/assets/aid-challenge-knowledge.webp",
};

function AidProblemVisual({ type }: { type: AidProblemVisual }) {
  return (
    <div className={`aid-problem-visual aid-problem-visual--${type}`} aria-hidden="true">
      <img src={aidProblemImageSources[type]} alt="" loading="lazy" decoding="async" />
    </div>
  );
}

function AidProblemCard({ item, index }: { item: AidProblemItem; index: number }) {
  return (
    <article className="aid-problem">
      <AidProblemVisual type={item.visual} />
      <div className="aid-problem__body">
        <span className="aid-problem__number">{index + 1}</span>
        <div>
          <h3>{item.title}</h3>
          <p>{item.body}</p>
        </div>
      </div>
    </article>
  );
}

function AidKpiSparkline({ trend }: { trend: AidKpiExample["trend"] }) {
  const beforePoints = trend.before.map(([x, y]) => `${x},${y}`).join(" ");
  const afterPoints = [trend.before[trend.before.length - 1], ...trend.after]
    .map(([x, y]) => `${x},${y}`)
    .join(" ");

  return (
    <svg className="aid-kpi-chart" viewBox="0 0 160 82" aria-hidden="true">
      <path className="aid-kpi-baseline" d="M10 68h140" />
      <polyline className="aid-kpi-before-line" points={beforePoints} />
      <polyline className="aid-kpi-after-line" points={afterPoints} />
      {trend.before.map(([x, y]) => (
        <circle className="aid-kpi-dot aid-kpi-dot--before" cx={x} cy={y} key={`before-${x}-${y}`} r="3.6" />
      ))}
      {trend.after.map(([x, y]) => (
        <circle className="aid-kpi-dot aid-kpi-dot--after" cx={x} cy={y} key={`after-${x}-${y}`} r="3.6" />
      ))}
    </svg>
  );
}

function ContactChartIllustration() {
  return (
    <div className="aid-contact-visual" aria-hidden="true">
      <img
        src="/assets/aid-contact-illustration.webp"
        alt=""
        width={1254}
        height={1254}
        loading="lazy"
        decoding="async"
      />
    </div>
  );
}

export default function AiDrivenDevelopmentPage() {
  return (
    <main id="top" className="aid-page site-main">
      <section className="aid-hero" aria-labelledby="aid-heading">
        <div className="aid-hero__copy">
          <p className="aid-kicker">AI-DRIVEN DEVELOPMENT</p>
          <h1 id="aid-heading">
            開発組織を、
            <br />
            AI前提の
            <br className="aid-mobile-only-break" />
            プロセスへ。
          </h1>
          <p className="aid-lead">
            CordMarkは、仕様・実装・レビュー・テスト・ドキュメント・KPI測定まで、
            <br />
            開発プロセス全体をAI前提に再設計します。
          </p>
          <p className="aid-hero-note">
            開発組織をAI駆動に変えます。その最初の入口が2週間診断です。
          </p>

          <div className="aid-actions">
            <a className="aid-primary" href="#contact">
              診断について相談する <span aria-hidden="true">→</span>
            </a>
            <a className="aid-secondary" href="#diagnosis-steps">
              提供ステップを見る <span aria-hidden="true">→</span>
            </a>
          </div>
        </div>

        <div className="aid-hero__visual" aria-hidden="true">
          <img src="/assets/ai-driven-development-hero.webp" alt="" loading="eager" fetchPriority="high" decoding="async" />
        </div>
      </section>

        <section className="aid-problems" aria-labelledby="aid-problems-heading">
          <div className="aid-section-head aid-section-head--challenges">
            <p className="aid-kicker">COMMON CHALLENGES</p>
            <h2 id="aid-problems-heading">よくある課題</h2>
            <p className="aid-problems-lead">AIツールを入れても、開発組織はまだAI Nativeになっていない。</p>
            <p className="aid-problems-note">
              多くの組織でAIツールの導入は進む一方、チーム全体の開発成果に結びつけられていません。
            </p>
          </div>
          <div className="aid-problem-grid">
            {painPoints.map((point, index) => (
              <AidProblemCard index={index} item={point} key={point.title} />
            ))}
          </div>
        </section>

        <section className="aid-outcomes" aria-labelledby="aid-outcomes-heading">
          <div className="aid-outcomes__head">
            <h2 id="aid-outcomes-heading">AI-Driven Developmentの価値と進め方</h2>
            <p>
              開発プロセスを診断し、最適な改善計画を立て、
              <br />
              実際にAIを組み込みながら定着まで伴走します。
            </p>
          </div>

          <div className="aid-value-panel">
            <div className="aid-value-copy">
              <h3>私たちが提供する価値</h3>
              <p className="aid-value-lead">
                自社の開発プロセスが、本当に最適化され、
                <br />
                AIのメリットを最大活用できているかを明らかにします。
              </p>
              <ul>
                {aidValueBullets.map((bullet) => (
                  <li key={bullet}>{bullet}</li>
                ))}
              </ul>
            </div>

            <div className="aid-support">
              <h3>主な支援内容</h3>
              <div className="aid-support-groups">
                {supportGroups.map((group) => (
                  <div className="aid-support-row" key={group.label}>
                    <span className="aid-support-label">{group.label}</span>
                    <div className="aid-support-items">
                      {group.items.map((item) => (
                        <article className="aid-support-item" key={item.title}>
                          <span className="aid-support-icon" aria-hidden="true">
                            <AidIcon type={item.icon} />
                          </span>
                          <div>
                            <h4>{item.title}</h4>
                            <p>{item.body}</p>
                          </div>
                        </article>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <h3 className="aid-phase-heading">進め方（全体の流れ）</h3>
          <div className="aid-phase-grid">
            {developmentPhases.map((item, index) => (
              <div className="aid-phase-wrap" key={item.phase}>
                <article className="aid-phase-card">
                  <span className="aid-phase-badge">{item.phase}</span>
                  <h4>{item.title}</h4>
                  <strong>{item.emphasis}</strong>
                  <p>{item.body}</p>
                </article>
                {index < developmentPhases.length - 1 && (
                  <span className="aid-phase-arrow" aria-hidden="true">
                    →
                  </span>
                )}
              </div>
            ))}
          </div>
        </section>

        <section className="aid-diagnosis" id="diagnosis-steps" aria-labelledby="aid-diagnosis-heading">
          <div className="aid-diagnosis__copy">
            <p className="aid-kicker">AI駆動開発プロセス診断</p>
            <h2 id="aid-diagnosis-heading">
              2週間で、AIを入れるべき開発プロセスと
              <br />
              測定KPIを設計する診断プログラムです。
            </h2>
            <p>
              1部署・1開発チームに絞り、現行プロセスの整理からAI活用余地、優先テーマ、測定KPI、6週間の実装パイロット計画までを設計します。
            </p>
            <ul>
              {programBullets.map((bullet) => (
                <li key={bullet}>{bullet}</li>
              ))}
            </ul>
          </div>
          <div className="aid-steps" aria-label="診断の進め方">
            <h3>診断の進め方（2週間）</h3>
            <ol>
              {diagnosisSteps.map(({ step, title, icon }) => (
                <li key={step}>
                  <span className="aid-step-marker">
                    <AidIcon type={icon} />
                  </span>
                  <div className="aid-step-copy">
                    <span>{step}</span>
                    <strong>{title}</strong>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className="aid-process-detail" id="kpi-example" aria-labelledby="aid-process-detail-heading">
          <div className="aid-process-panel aid-process-panel--overview">
            <p className="aid-detail-kicker">PROCESS</p>
            <h2 id="aid-process-detail-heading">短期間で、診断から実装計画まで作る。</h2>
            <p className="aid-detail-lead">
              現行プロセスの可視化から、AI活用テーマの設計、KPI設計、実装パイロット計画までを2週間で進めます。
            </p>
            <div className="aid-process-timeline">
              {diagnosisProcessDetailSteps.map((item) => (
                <article className="aid-process-step" key={item.number}>
                  <div className="aid-process-marker">
                    <span className="aid-process-day">{item.day}</span>
                    <span className="aid-process-number">{item.number}</span>
                  </div>
                  <div className="aid-process-card">
                    <div className="aid-process-visual" aria-hidden="true">
                      <img src={item.image} alt="" loading="lazy" decoding="async" />
                    </div>
                    <h3>{item.title}</h3>
                    <p>{item.body}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>

          <div className="aid-process-panel aid-process-panel--outputs">
            <p className="aid-detail-kicker">DELIVERABLES &amp; KPI</p>
            <h2>納品物と、導入後に測るKPIを整理する。</h2>
            <p className="aid-detail-lead">
              投資判断に必要な資料を納品し、AI導入をBefore / Afterで測れる状態にします。
            </p>
            <div className="aid-output-layout">
              <div className="aid-output-column aid-output-column--deliverables">
                <h3>納品物</h3>
                <div className="aid-output-list">
                  {deliverables.map((item) => (
                    <article className="aid-output-item" key={item.title}>
                      <span className="aid-output-icon" aria-hidden="true">
                        <AidIcon type={item.icon} />
                      </span>
                      <div>
                        <h4>{item.title}</h4>
                        <p>{item.body}。</p>
                      </div>
                    </article>
                  ))}
                </div>
              </div>

              <div className="aid-output-column aid-output-column--kpis">
                <div className="aid-kpi-head">
                  <h3>測定KPI例</h3>
                  <div className="aid-kpi-legend" aria-label="KPIグラフの凡例">
                    <span>
                      <i className="aid-kpi-legend-dot aid-kpi-legend-dot--before" />
                      Before
                    </span>
                    <span>
                      <i className="aid-kpi-legend-dot aid-kpi-legend-dot--after" />
                      After
                    </span>
                  </div>
                </div>
                <div className="aid-kpi-grid">
                  {diagnosisKpiExamples.map((item) => (
                    <article className="aid-kpi-metric" key={item.title}>
                      <h4>{item.title}</h4>
                      <div className="aid-kpi-change">
                        <span>{item.before}</span>
                        <b aria-hidden="true">→</b>
                        <strong>{item.after}</strong>
                        {item.delta && <em>{item.delta}</em>}
                      </div>
                      <AidKpiSparkline trend={item.trend} />
                    </article>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="aid-pricing-contact" id="contact" aria-label="価格とお問い合わせ">
          <div className="aid-pricing-block">
            <p className="aid-kicker">PRICING &amp; FIT</p>
            <div className="aid-pricing-grid">
              <article className="aid-pricing-card aid-pricing-card--price">
                <h2>AI駆動開発プロセス診断</h2>
                <p className="aid-period-badge">2週間</p>
                <p className="aid-price-label">初期モニター</p>
                <p className="aid-price-line">
                  <strong>50</strong>
                  <span>万円〜</span>
                  <small>（税別）</small>
                </p>
                <p className="aid-price-target">
                  <AidIcon type="person" />
                  <span>対象：1部署または1開発チーム</span>
                </p>
              </article>

              <article className="aid-pricing-card">
                <h3>対象となる企業</h3>
                <ul className="aid-fit-list">
                  {pricingTargets.map((target) => (
                    <li key={target}>
                      <span className="aid-fit-check" aria-hidden="true">
                        ✓
                      </span>
                      <span>{target}</span>
                    </li>
                  ))}
                </ul>
              </article>

              <article className="aid-pricing-card">
                <h3>特に合う状態</h3>
                <ul className="aid-fit-list">
                  {fitStates.map((state) => (
                    <li key={state}>
                      <span className="aid-fit-check" aria-hidden="true">
                        ✓
                      </span>
                      <span>{state}</span>
                    </li>
                  ))}
                </ul>
              </article>
            </div>
          </div>

          <div className="aid-contact-panel">
            <div className="aid-contact-copy">
              <p className="aid-kicker">CONTACT</p>
              <h2 id="aid-contact-heading">診断について相談する</h2>
              <p>下記フォームを入力いただくと、担当者よりご連絡します。</p>
              <ContactChartIllustration />
            </div>

            <form
              className="aid-form aid-form--consultation"
              action="/api/contact"
              method="post"
              aria-labelledby="aid-contact-heading"
            >
              <input type="hidden" name="formType" value="ai-driven-development" />
              <input type="hidden" name="redirectTo" value="/service/ai-driven-development#contact" />
              <QueryFormStatus
                className="aid-form-status"
                successMessage="送信しました。担当者より2営業日以内を目安にご連絡いたします。"
                errorMessage="送信できませんでした。時間をおいて再度お試しください。"
              />
              <div className="aid-field">
                <label htmlFor="company">
                  会社名 <span>必須</span>
                </label>
                <input id="company" name="company" type="text" placeholder="例）CordMark株式会社" required />
              </div>
              <div className="aid-field">
                <label htmlFor="name">
                  氏名 <span>必須</span>
                </label>
                <input id="name" name="name" type="text" placeholder="例）山田 太郎" required />
              </div>
              <div className="aid-field">
                <label htmlFor="role">役職</label>
                <input id="role" name="role" type="text" placeholder="例）CTO" />
              </div>
              <div className="aid-field">
                <label htmlFor="email">
                  メールアドレス <span>必須</span>
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="例）example@cordmark.co.jp"
                  required
                />
              </div>
              <div className="aid-field">
                <label htmlFor="team-size">
                  開発組織の人数 <span>必須</span>
                </label>
                <select id="team-size" name="team-size" defaultValue="" required>
                  <option value="" disabled>
                    選択してください
                  </option>
                  {teamSizeOptions.map((option) => (
                    <option key={option}>{option}</option>
                  ))}
                </select>
              </div>
              <div className="aid-field">
                <label htmlFor="tools">現在使っているAIツール</label>
                <input
                  id="tools"
                  name="tools"
                  type="text"
                  placeholder="例）GitHub Copilot, Cursor, Claude など"
                />
              </div>
              <fieldset className="aid-field aid-field--span-3 aid-checkbox-field">
                <legend>困っている開発工程（複数選択可）</legend>
                <div className="aid-checkbox-grid">
                  {issueOptions.map((option) => (
                    <label className="aid-checkbox-option" key={option}>
                      <span className="aid-checkbox-main">
                        <input name="issue" type="checkbox" value={option} />
                        <span>{option}</span>
                      </span>
                    </label>
                  ))}
                </div>
              </fieldset>
              <LoadingSubmitButton className="aid-submit">
                診断について相談する <span aria-hidden="true">→</span>
              </LoadingSubmitButton>
            </form>
          </div>
        </section>
    </main>
  );
}
