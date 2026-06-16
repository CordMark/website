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
  | "organization"
  | "pause"
  | "people"
  | "person"
  | "search"
  | "shield"
  | "sparkle"
  | "tag"
  | "target";

type AncProblemVisualType =
  | "network"
  | "poc"
  | "workflow"
  | "knowledge"
  | "governance"
  | "measurement";

type RoadmapStepVisualType = "kpi" | "process" | "brain" | "priority" | "roadmap" | "report";
type DeliverableVisualType = "maturity" | "usecases" | "beforeAfter" | "agentFlow" | "roadmap" | "kpi";
type ImplementationAreaType = "sales" | "knowledge" | "executive" | "development";

type ProblemCard = {
  visual: AncProblemVisualType;
  image: string;
  title: string;
};

type DeliverableCard = {
  visual: DeliverableVisualType;
  image: string;
  title: string;
  body: string;
};

const painPoints: ProblemCard[] = [
  {
    visual: "network",
    image: "/assets/anc-problem-network.png",
    title: "部署ごとに試しており、全社で広がらない",
  },
  {
    visual: "poc",
    image: "/assets/anc-problem-poc.png",
    title: "PoCやツール導入で止まり、運用に乗らない",
  },
  {
    visual: "workflow",
    image: "/assets/anc-problem-workflow.png",
    title: "業務プロセス自体が人間前提のまま",
  },
  {
    visual: "knowledge",
    image: "/assets/anc-problem-knowledge.png",
    title: "ナレッジが分散し、AIが活用できない",
  },
  {
    visual: "governance",
    image: "/assets/anc-problem-governance.png",
    title: "ガバナンスが曖昧で、本格展開できない",
  },
  {
    visual: "measurement",
    image: "/assets/anc-problem-measurement.png",
    title: "効果測定がなく、投資対効果を説明できない",
  },
];

const companyShifts = [
  {
    beforeIcon: "person",
    before: "個人利用中心",
    afterIcon: "organization",
    after: "ワークフロー組み込み型",
  },
  {
    beforeIcon: "search",
    before: "情報探索",
    afterIcon: "database",
    after: "組織記憶の活用",
  },
  {
    beforeIcon: "people",
    before: "会議依存の意思決定",
    afterIcon: "sparkle",
    after: "AI支援の意思決定",
  },
  {
    beforeIcon: "grid",
    before: "部分最適",
    afterIcon: "target",
    after: "全社OS再設計",
  },
] satisfies Array<{ beforeIcon: AncIconType; before: string; afterIcon: AncIconType; after: string }>;

const layers = [
  {
    number: "01",
    title: "Strategy / KPI",
    body: "経営課題とAI活用テーマを接続する。",
    image: "/assets/anc-layer-strategy-kpi.png",
  },
  {
    number: "02",
    title: "Workflow",
    body: "営業・CS・管理・開発の業務プロセスを再設計する。",
    image: "/assets/anc-layer-workflow.png",
  },
  {
    number: "03",
    title: "Knowledge / Data",
    body: "社内ナレッジとデータをAIが使える形に整える。",
    image: "/assets/anc-layer-knowledge-data.png",
  },
  {
    number: "04",
    title: "Agent / Application",
    body: "AI Agent、RAG、業務アプリを実装する。",
    image: "/assets/anc-layer-agent-application.png",
  },
  {
    number: "05",
    title: "Governance / Enablement",
    body: "権限、ルール、教育、運用体制を設計する。",
    image: "/assets/anc-layer-governance-enablement.png",
  },
];

const roadmapBullets = [
  "既存業務と意思決定フローの可視化",
  "AI活用テーマの洗い出しと優先順位付け",
  "KPI設計とガバナンス整理",
  "90日実装ロードマップの提案",
];

const roadmapSteps = [
  { visual: "kpi", step: "STEP 1", title: "経営課題・事業KPIヒアリング", image: "/assets/anc-roadmap-step-kpi.png" },
  { visual: "process", step: "STEP 2", title: "業務・意思決定プロセスの可視化", image: "/assets/anc-roadmap-step-process.png" },
  { visual: "brain", step: "STEP 3", title: "AI活用テーマの設計", image: "/assets/anc-roadmap-step-brain.png" },
  { visual: "priority", step: "STEP 4", title: "優先順位・リスク・ガバナンス設計", image: "/assets/anc-roadmap-step-priority.png" },
  { visual: "roadmap", step: "STEP 5", title: "90日実装ロードマップ作成", image: "/assets/anc-roadmap-step-roadmap.png" },
  { visual: "report", step: "STEP 6", title: "診断結果・実装提案のご報告", image: "/assets/anc-roadmap-step-report.png" },
] satisfies Array<{ visual: RoadmapStepVisualType; step: string; title: string; image: string }>;

const deliverables: DeliverableCard[] = [
  {
    visual: "maturity",
    image: "/assets/anc-deliverable-maturity.png",
    title: "AI Native成熟度マップ",
    body: "現在地と目指す姿を可視化",
  },
  {
    visual: "usecases",
    image: "/assets/anc-deliverable-usecases.png",
    title: "部門別AI活用候補リスト",
    body: "部門ごとのユースケースを整理",
  },
  {
    visual: "beforeAfter",
    image: "/assets/anc-deliverable-before-after.png",
    title: "業務プロセス Before / After案",
    body: "AI導入前後のフローを比較",
  },
  {
    visual: "agentFlow",
    image: "/assets/anc-deliverable-agent-flow.png",
    title: "AI Agent / Workflow構成案",
    body: "必要なAgentと連携を設計",
  },
  {
    visual: "roadmap",
    image: "/assets/anc-deliverable-roadmap.png",
    title: "90日実装ロードマップ",
    body: "優先順位とマイルストーンを明確化",
  },
  {
    visual: "kpi",
    image: "/assets/anc-deliverable-kpi.png",
    title: "KPI測定シート / ガバナンス方針案",
    body: "効果測定と運用ルールを整備",
  },
];

const implementationAreas = [
  {
    title: "営業・CSワークフロー",
    body: "問い合わせ、提案、議事録、対応をAIで支援。",
    variant: "sales",
    image: "/assets/anc-area-sales.png",
  },
  {
    title: "社内ナレッジAIアシスタント",
    body: "FAQ、業務マニュアル、社内文書を横断検索。",
    variant: "knowledge",
    image: "/assets/anc-area-knowledge.png",
  },
  {
    title: "経営会議・意思決定支援AI",
    body: "論点抽出、指標要約、選択肢生成を支援。",
    variant: "executive",
    image: "/assets/anc-area-executive.png",
  },
  {
    title: "AI駆動開発プロセス",
    body: "仕様、実装、レビュー、テストをAI補助で再設計。",
    variant: "development",
  },
] satisfies Array<{ title: string; body: string; variant: ImplementationAreaType; image?: string }>;

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
      {type === "search" && (
        <>
          <circle cx="17" cy="17" r="10" />
          <path d="m24.2 24.2 7.2 7.2" />
        </>
      )}
      {type === "organization" && (
        <>
          <rect x="16" y="6" width="8" height="8" rx="1.5" />
          <rect x="7" y="26" width="8" height="8" rx="1.5" />
          <rect x="16" y="26" width="8" height="8" rx="1.5" />
          <rect x="25" y="26" width="8" height="8" rx="1.5" />
          <path d="M20 14v6" />
          <path d="M11 26v-6h18v6" />
        </>
      )}
      {type === "sparkle" && (
        <>
          <path d="M20 5.5 23.8 16 34.5 20l-10.7 4L20 34.5 16.2 24 5.5 20l10.7-4Z" />
          <path d="M31 5.5v7" />
          <path d="M34.5 9h-7" />
          <path d="M9 27.5v5.5" />
          <path d="M11.8 30.2H6.2" />
        </>
      )}
      {type === "target" && (
        <>
          <circle cx="20" cy="20" r="14" />
          <circle cx="20" cy="20" r="8.5" />
          <circle cx="20" cy="20" r="3" />
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

function AncProblemVisual({ type }: { type: AncProblemVisualType }) {
  const blue = `anc-problem-blue-${type}`;
  const pale = `anc-problem-pale-${type}`;
  const deep = `anc-problem-deep-${type}`;

  return (
    <svg className={`anc-problem-visual anc-problem-visual--${type}`} viewBox="0 0 220 124" aria-hidden="true">
      <defs>
        <linearGradient id={blue} x1="0" x2="1" y1="0" y2="1">
          <stop offset="0%" stopColor="#8db8ff" />
          <stop offset="54%" stopColor="#4f86f7" />
          <stop offset="100%" stopColor="#0b65ff" />
        </linearGradient>
        <linearGradient id={pale} x1="0" x2="1" y1="0" y2="1">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="100%" stopColor="#edf5ff" />
        </linearGradient>
        <linearGradient id={deep} x1="0" x2="1" y1="0" y2="1">
          <stop offset="0%" stopColor="#5f95ff" />
          <stop offset="100%" stopColor="#0c4fd1" />
        </linearGradient>
      </defs>

      {type === "network" && (
        <>
          <g fill={`url(#${pale})`} stroke="#dbe7f7" strokeWidth="1.4">
            <path d="M31 68 61 52l30 16-30 16Z" />
            <path d="M14 92 44 76l30 16-30 16Z" />
            <path d="M79 92 109 76l30 16-30 16Z" />
            <path d="M144 68 174 52l30 16-30 16Z" />
          </g>
          <g fill="none" stroke="#76a5ff" strokeDasharray="4 5" strokeWidth="1.8">
            <path d="M61 52c22 4 38 18 48 40" />
            <path d="M174 52c-25 4-48 18-65 40" />
            <path d="M44 76c25-8 44-3 65 16" />
          </g>
          <g fill={`url(#${blue})`} stroke="none">
            <circle cx="61" cy="46" r="5" />
            <path d="M50 60c2-7 6-10 11-10s9 3 11 10Z" />
            <circle cx="44" cy="70" r="5" />
            <path d="M33 84c2-7 6-10 11-10s9 3 11 10Z" />
            <circle cx="109" cy="70" r="5" />
            <path d="M98 84c2-7 6-10 11-10s9 3 11 10Z" />
            <circle cx="174" cy="46" r="5" />
            <path d="M163 60c2-7 6-10 11-10s9 3 11 10Z" />
          </g>
        </>
      )}

      {type === "poc" && (
        <>
          <ellipse cx="110" cy="91" rx="62" ry="18" fill={`url(#${deep})`} stroke="none" opacity="0.2" />
          <path d="M50 74c0 18 27 32 60 32s60-14 60-32v11c0 18-27 32-60 32S50 103 50 85Z" fill={`url(#${deep})`} stroke="none" opacity="0.85" />
          <ellipse cx="110" cy="73" rx="60" ry="32" fill={`url(#${pale})`} stroke="#bfd4f5" strokeWidth="1.5" />
          <ellipse cx="110" cy="70" rx="40" ry="14" fill="none" stroke="#8bb3ff" strokeWidth="2" opacity="0.65" />
          <path d="M110 36c23 0 42 9 51 22" fill="none" stroke="#397dff" strokeDasharray="4 5" strokeWidth="1.8" />
          <circle cx="151" cy="43" r="5" fill={`url(#${blue})`} stroke="none" />
          <g stroke="none">
            <path d="M90 70 110 60l20 10-20 10Z" fill="#a9c8ff" />
            <path d="M90 70v18l20 10V80Z" fill="#79a7ff" />
            <path d="M130 70v18l-20 10V80Z" fill="#2f72ea" />
          </g>
        </>
      )}

      {type === "workflow" && (
        <>
          <g fill={`url(#${pale})`} stroke="#d7e5f7" strokeWidth="1.3">
            <path d="M38 78 110 40l72 38-72 38Z" opacity="0.7" />
            <path d="M55 64 110 35l55 29-55 29Z" />
            <path d="M37 92 110 54l73 38-73 38Z" opacity="0.56" />
          </g>
          <g fill="none" stroke="#4f86f7" strokeWidth="2.2">
            <path d="M82 64h57v30H82Z" />
            <path d="M110 64v30" />
            <path d="M82 79h57" />
            <path d="M70 72 82 72" />
            <path d="M139 86h15" />
          </g>
          <g fill={`url(#${blue})`} stroke="none">
            <circle cx="82" cy="64" r="5" />
            <circle cx="110" cy="64" r="5" />
            <circle cx="139" cy="64" r="5" />
            <circle cx="82" cy="94" r="5" />
            <circle cx="110" cy="94" r="5" />
            <circle cx="139" cy="94" r="5" />
            <circle cx="70" cy="72" r="5" />
            <circle cx="154" cy="86" r="5" />
          </g>
        </>
      )}

      {type === "knowledge" && (
        <>
          <g fill="none" stroke="#86adf8" strokeDasharray="4 5" strokeWidth="1.7">
            <path d="M109 43 55 61" />
            <path d="M111 43 166 61" />
            <path d="M110 72 55 91" />
            <path d="M110 72 166 91" />
          </g>
          <g stroke="none">
            <path d="M84 55 110 42l26 13-26 14Z" fill="#a9c8ff" />
            <path d="M84 55v30l26 14V69Z" fill="#70a0ff" />
            <path d="M136 55v30l-26 14V69Z" fill="#2165df" />
            {[["45", "56"], ["155", "56"], ["45", "86"], ["155", "86"], ["100", "24"]].map(([x, y]) => (
              <g key={`${x}-${y}`}>
                <path d={`M${x} ${y}l11-6 11 6-11 6Z`} fill="#a8c8ff" />
                <path d={`M${x} ${y}v12l11 6V${Number(y) + 6}Z`} fill="#6e9fff" />
                <path d={`M${Number(x) + 22} ${y}v12l-11 6V${Number(y) + 6}Z`} fill="#3474e8" />
              </g>
            ))}
          </g>
        </>
      )}

      {type === "governance" && (
        <>
          <ellipse cx="111" cy="76" rx="74" ry="28" fill="none" stroke="#8bb3ff" strokeDasharray="5 7" strokeWidth="1.8" opacity="0.78" />
          <circle cx="56" cy="65" r="5" fill={`url(#${blue})`} stroke="none" />
          <circle cx="168" cy="65" r="5" fill={`url(#${blue})`} stroke="none" />
          <path d="M110 27 147 42v28c0 25-15 44-37 54-22-10-37-29-37-54V42Z" fill={`url(#${pale})`} stroke="#adc9f8" strokeWidth="1.6" />
          <path d="M110 35 137 46v22c0 20-11 35-27 43-16-8-27-23-27-43V46Z" fill={`url(#${blue})`} stroke="none" opacity="0.2" />
          <path d="m95 73 11 11 24-27" fill="none" stroke="#0b65ff" strokeWidth="4" />
        </>
      )}

      {type === "measurement" && (
        <>
          <rect x="39" y="24" width="102" height="72" rx="6" fill={`url(#${pale})`} stroke="#d2e1f4" strokeWidth="1.5" />
          <path d="M51 81h78M51 63h78M51 45h78" stroke="#d9e7f6" strokeWidth="1.2" />
          <path d="M52 75 71 59l18 14 21-26 20 10" fill="none" stroke="#3a7fff" strokeWidth="2.2" />
          <g fill={`url(#${blue})`} stroke="none" opacity="0.72">
            <rect x="62" y="72" width="9" height="24" rx="2" />
            <rect x="83" y="62" width="9" height="34" rx="2" />
            <rect x="104" y="50" width="9" height="46" rx="2" />
          </g>
          <circle cx="163" cy="78" r="30" fill="none" stroke="#dce8fb" strokeWidth="12" />
          <path d="M163 48a30 30 0 0 1 26 45" fill="none" stroke={`url(#${deep})`} strokeWidth="12" />
          <circle cx="163" cy="78" r="15" fill="#fff" stroke="none" />
        </>
      )}
    </svg>
  );
}

function RoadmapStepVisual({ image }: { image: string }) {
  return (
    <div className="anc-step-visual" aria-hidden="true">
      <img src={image} alt="" />
    </div>
  );
}

function DeliverableVisual({ image, type }: { image: string; type: DeliverableVisualType }) {
  return (
    <div className={`anc-deliverable-visual anc-deliverable-visual--${type}`} aria-hidden="true">
      <img src={image} alt="" />
    </div>
  );
}

function ImplementationPreview({ variant, image }: { variant: ImplementationAreaType; image?: string }) {
  if (image) {
    return (
      <div className="anc-area-preview anc-area-preview--image" aria-hidden="true">
        <img src={image} alt="" />
      </div>
    );
  }

  if (variant === "knowledge") {
    return (
      <div className="anc-area-preview anc-area-preview--knowledge" aria-hidden="true">
        <div className="anc-knowledge-title">
          <span></span>
          <div>
            <strong>AIアシスタント</strong>
            <small>これには「何をお探しですか？」</small>
          </div>
        </div>
        <div className="anc-knowledge-search">
          <span>例：経費精算のルール</span>
          <b>検索</b>
        </div>
        <div className="anc-answer-box">
          <strong>回答</strong>
          <p>
            経費精算の申請手順は以下の通りです。
            <br />
            1. 経費精算システムにログイン
            <br />
            2. 領収書を添付し、承認者を選択
            <br />
            3. 上長に申請して承認を待つ
          </p>
        </div>
        <div className="anc-doc-list">
          <strong>おすすめドキュメント</strong>
          {["経費精算ガイドライン v2.1", "出張旅費規程", "経費精算FAQ"].map((label) => (
            <span key={label}>
              <i></i>
              {label}
            </span>
          ))}
        </div>
      </div>
    );
  }

  if (variant === "executive") {
    return (
      <div className="anc-area-preview anc-area-preview--executive" aria-hidden="true">
        <div className="anc-metric-panel">
          <strong>経営サマリー（今月）</strong>
          {[
            ["売上高", "¥2.48億", "+12.6%"],
            ["営業利益", "¥3,420万", "+18.3%"],
            ["粗利率", "36.7%", "+2.1pt"],
            ["顧客満足度", "4.3 / 5.0", "-0.1pt"],
          ].map(([label, value, trend]) => (
            <span key={label}>
              <b>{label}</b>
              <i>{value}</i>
              <em className={trend.startsWith("+") ? "is-up" : "is-down"}>{trend}</em>
            </span>
          ))}
        </div>
        <div className="anc-insight-panel">
          <strong>主要トレンド</strong>
          <p>新規受注が前年同月比で12.6%増加</p>
          <p>広告CPAは改善（-8.7%）</p>
          <p>解約率はやや上昇（+0.3pt）</p>
        </div>
        <div className="anc-action-panel">
          <strong>次のアクション候補</strong>
          <p>価格戦略の見直しを検討</p>
          <p>ハイタッチ顧客の解約要因を深掘り</p>
          <p>プロダクト導入オンボーディングを強化</p>
        </div>
      </div>
    );
  }

  if (variant === "development") {
    return (
      <div className="anc-area-preview anc-area-preview--development" aria-hidden="true">
        <div className="anc-kanban">
          {[
            ["Backlog", "12", "ユーザー管理 API設計", "認証基盤のリファクタリング"],
            ["In Progress", "5", "データ集計バッチ実装", "テストケース リファクタリング"],
            ["Review", "3", "コードレビュー対応", "テストケース追加"],
            ["Done", "18", "統合テスト完了", "リリース準備"],
          ].map(([heading, count, first, second]) => (
            <div key={heading}>
              <strong>
                {heading}
                <small>{count}</small>
              </strong>
              <span>{first}</span>
              <span>{second}</span>
            </div>
          ))}
        </div>
        <div className="anc-dev-summary">
          <strong>AI支援サマリー</strong>
          <p>本日までに8件のPRレビューを支援しました。</p>
          <p>バグ検出率：27% 改善（先週比）</p>
          <b>詳細レポートを見る</b>
        </div>
      </div>
    );
  }

  return (
    <div className="anc-area-preview anc-area-preview--sales" aria-hidden="true">
      <div className="anc-sales-sidebar">
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
      </div>
      <div className="anc-sales-main">
        <div className="anc-sales-head">
          <strong>問い合わせ管理</strong>
          <b>+ 新規作成</b>
        </div>
        <div className="anc-sales-tabs">
          {["すべて", "未対応", "対応中", "完了"].map((label, index) => (
            <span className={index === 0 ? "is-active" : undefined} key={label}>
              {label}
            </span>
          ))}
        </div>
        {[
          ["問い合わせ受付", "株式会社A　山田様", "10:21", "承り待ち"],
          ["経費申請確認", "佐藤 拓也", "09:47", "対応中"],
          ["議事録サマリー", "定例ミーティング", "5/16", "完了"],
          ["提案書ドラフト作成", "株式会社B　鈴木様", "昨日", "対応中"],
        ].map(([title, meta, time, status]) => (
          <div className="anc-ticket" key={title}>
            <i></i>
            <span>
              <strong>{title}</strong>
              <small>{meta}</small>
            </span>
            <b>{time}</b>
            <em>{status}</em>
          </div>
        ))}
        <p>すべての問い合わせを表示</p>
      </div>
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
              AI前提の
              <br />
              Operating Systemへ。
            </h1>
            <p className="anc-lead">
              AIツールの導入ではなく、意思決定、業務プロセス、ナレッジ、データ、
              ガバナンスまでを再設計。
              <br />
              人間とAIが効率的に考え、動き、学習する会社をつくります。
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
          <div className="anc-problems__head">
            <p className="anc-kicker">よくある課題</p>
            <h2 id="anc-problems-heading">AIを導入しても、成果につながっていない。</h2>
            <p className="anc-problems__lead">
              ツール利用は始まったが、業務・意思決定・運用の設計が変わらないままでは、
              全社の成果に結びつきません。
            </p>
          </div>
          <div className="anc-problem-grid">
            {painPoints.map((point) => (
              <article className="anc-problem-card" key={point.title}>
                <img className={`anc-problem-visual anc-problem-visual--${point.visual}`} src={point.image} alt="" />
                <h3>{point.title}</h3>
              </article>
            ))}
          </div>

          <div className="anc-problems__divider" />

          <div className="anc-definition" aria-labelledby="anc-definition-heading">
            <div className="anc-definition__copy">
              <p className="anc-kicker">AI Native Companyとは</p>
              <h2 id="anc-definition-heading">
                目的は、AIを使うことではなく、
                <br />
                AIで成果が出る会社に変えること。
              </h2>
              <p>
                個人のツール活用から、会社全体の判断・業務・学習の仕組みへ。
                AIを組み込んだ運用に変えることで、継続的な成果をつくります。
              </p>
            </div>
            <dl className="anc-shift-list">
              {companyShifts.map((item) => (
                <div key={item.before}>
                  <dt>
                    <span className="anc-shift-icon" aria-hidden="true">
                      <AncIcon type={item.beforeIcon} />
                    </span>
                    <span>{item.before}</span>
                  </dt>
                  <dd>
                    <span className="anc-shift-arrow" aria-hidden="true">
                      →
                    </span>
                    <span className="anc-shift-icon" aria-hidden="true">
                      <AncIcon type={item.afterIcon} />
                    </span>
                    <span>{item.after}</span>
                  </dd>
                </div>
              ))}
            </dl>
          </div>
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
                <span className="anc-step-badge">{item.step}</span>
                <RoadmapStepVisual image={item.image} />
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
              <article className={`anc-deliverable-card anc-deliverable-card--${item.visual}`} key={item.title}>
                <DeliverableVisual image={item.image} type={item.visual} />
                <div className="anc-deliverable-copy">
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
                <ImplementationPreview image={area.image} variant={area.variant} />
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
              <input name="company" type="text" placeholder="CordMark株式会社" />
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
                <option>未導入</option>
                <option>一部社員個人利用</option>
                <option>部分導入済み</option>
                <option>PoC</option>
              </select>
            </label>
            <label>
              <span>相談したい内容</span>
              <select name="consultation" defaultValue="">
                <option value="" disabled>
                  選択してください
                </option>
                <option>自社に合うか相談</option>
                <option>診断について詳しく聞きたい</option>
                <option>実装支援</option>
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
