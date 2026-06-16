const trustItems = [
  "Enterprise AI",
  "AI Native Studio",
  "Strategy",
  "Workflow",
  "Agent",
  "Product",
  "Governance",
  "Implementation",
];

const services = [
  {
    number: "01",
    title: "AI-DRIVEN DEVELOPMENT",
    lead: "開発組織をAI前提のプロセスへ再設計する。",
    body:
      "仕様策定、実装、レビュー、テスト、ドキュメント作成、開発マネジメントにAIを組み込み、開発リードタイム、レビュー待ち時間、手戻り率、AI利用率の改善まで支援します。",
    image: "/assets/lp-wave-field.png",
    href: "/service/ai-driven-development",
  },
  {
    number: "02",
    title: "AI NATIVE COMPANY TRANSFORMATION",
    lead: "会社全体をAI前提の業務構造へ再設計する。",
    body:
      "営業、CS、採用、管理部門、開発、マーケティングにAI Agentやワークフローを組み込み、意思決定・業務実行・ナレッジ活用が回る状態をつくります。",
    image: "/assets/lp-cube-system.png",
    href: "/service/ai-native-company",
  },
];

const stats = [
  ["50+", "AI Use Cases Designed"],
  ["20+", "Workflows Implemented"],
  ["10+", "AI Agents Built"],
  ["0", "POC For POC's Sake"],
];

const howWorkItems = [
  {
    number: "01",
    title: "Diagnose",
    lead: "現行の業務・開発プロセスを可視化し、AIを入れるべき箇所を特定する。",
    image: "/assets/how-we-work-diagnose.png",
  },
  {
    number: "02",
    title: "Redesign",
    lead: "人間とAIの役割分担から、プロセスを再設計する。",
    image: "/assets/how-we-work-redesign.png",
  },
  {
    number: "03",
    title: "Build",
    lead: "プロンプト、RAG、AI Agent、業務アプリ、開発環境を実装する。",
    image: "/assets/how-we-work-build.png",
  },
  {
    number: "04",
    title: "Measure & Operate",
    lead: "Before/AfterのKPIを測定し、現場で使われ続ける運用に落とし込む。",
    image: "/assets/how-we-work-measure-operate.png",
  },
];

const workVisualImages = {
  development: "/assets/implementation-development.png",
  workflow: "/assets/implementation-workflow.png",
  agent: "/assets/implementation-agent.png",
  product: "/assets/implementation-product.png",
} as const;

type WorkVisualVariant = keyof typeof workVisualImages;

const works: Array<{
  visual: WorkVisualVariant;
  category: string;
  title: string;
  description: string;
  kpi: string;
}> = [
  {
    visual: "development",
    category: "AI-DRIVEN DEVELOPMENT",
    title: "開発プロセスのAI化",
    description:
      "仕様策定、実装、レビュー、テスト、ドキュメント作成にAIを組み込み、開発チームの生産性を測定可能な形で改善。",
    kpi: "開発リードタイム / PR作成時間 / レビュー待ち時間",
  },
  {
    visual: "workflow",
    category: "AI NATIVE WORKFLOW",
    title: "営業・CS・管理業務のAI化",
    description:
      "提案書作成、問い合わせ対応、議事録、ナレッジ検索などをAI Agentやワークフローとして実装。",
    kpi: "作業時間 / 一次回答時間 / 修正率",
  },
  {
    visual: "agent",
    category: "Enterprise AI Agent",
    title: "社内ナレッジAIアシスタント",
    description:
      "社内ドキュメント、FAQ、業務マニュアルを横断検索し、部門ごとの実務回答を生成。",
    kpi: "検索時間 / 回答精度 / 利用回数",
  },
  {
    visual: "product",
    category: "AI Product Implementation",
    title: "既存SaaSへのAI機能実装",
    description:
      "分析、提案、生成、自動実行などのAI機能を既存プロダクトへ組み込み、顧客価値を再設計。",
    kpi: "機能利用率 / 継続率 / 作業完了率",
  },
];

const philosophyPrinciples = [
  {
    icon: "human",
    title: "Human-first",
    body: "すべての意思決定の中心に、人の価値と創造性を置く。",
  },
  {
    icon: "structure",
    title: "Structure over tools",
    body: "一時的なツール導入ではなく、持続可能な構造設計を行う。",
  },
  {
    icon: "implementation",
    title: "Implementation, not slogans",
    body: "言葉ではなく、成果を生む実装にこだわる。",
  },
] as const;

const rotatingWorks = [...works, ...works.slice(0, 3)];

const footerLinks = [
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "How We Work", href: "#how-we-work" },
  { label: "Cases", href: "#cases" },
  { label: "Privacy Policy", href: "#top" },
];

type PhilosophyIconType = (typeof philosophyPrinciples)[number]["icon"];

function PhilosophyIcon({ type }: { type: PhilosophyIconType }) {
  if (type === "human") {
    return (
      <svg viewBox="0 0 32 32" aria-hidden="true">
        <path d="M16 15.2a4.9 4.9 0 1 0 0-9.8 4.9 4.9 0 0 0 0 9.8Z" />
        <path d="M7.2 27.2v-2.4c0-4.3 3.5-7.8 7.8-7.8h2c4.3 0 7.8 3.5 7.8 7.8v2.4" />
        <path d="M11.5 27.2h9" />
      </svg>
    );
  }

  if (type === "structure") {
    return (
      <svg viewBox="0 0 32 32" aria-hidden="true">
        <path d="m16 4.2 10.1 5.9v11.8L16 27.8 5.9 21.9V10.1L16 4.2Z" />
        <path d="M16 16v11.8" />
        <path d="m5.9 10.1 10.1 5.9 10.1-5.9" />
        <path d="M16 4.2V16" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 32 32" aria-hidden="true">
      <path d="M6.2 25.8h20" />
      <path d="M8.4 22.8v-5.1" />
      <path d="M14 22.8V12.9" />
      <path d="M19.6 22.8V9.2" />
      <path d="M25.2 22.8V5.8" />
      <path d="m6.2 15.6 7.8-6.4 5.6 3.6 6.2-7" />
      <path d="M25.8 5.8v6.3h-6.2" />
    </svg>
  );
}

function WorkVisual({ variant }: { variant: WorkVisualVariant }) {
  return (
    <div className="work-visual" aria-hidden="true">
      <img className="work-visual__image" src={workVisualImages[variant]} alt="" />
    </div>
  );
}

export default function Home() {
  return (
    <>
      <main id="top" className="site-main">
        <section className="hero-section" aria-labelledby="hero-heading">
          <div className="hero-section__copy">
            <h1 id="hero-heading">
              Transform work.
              <br />
              With AI Native
              <br />
              systems.
            </h1>
            <p className="hero-section__lead">
              <span>企業の意思決定、業務プロセス、プロダクト開発を、AI前提の構造へ再設計する。</span>
              <br />
              <span>私たちは、構想だけで終わらせず、現場で動くAI Nativeな仕組みまで実装します。</span>
            </p>
            <a className="button button--dark" href="#services">
              AI Native Strategy <span aria-hidden="true">→</span>
            </a>
          </div>
          <div className="hero-section__visual" aria-hidden="true">
            <img src="/assets/lp-ribbon-system.png" alt="" />
          </div>
        </section>

        <section className="trust-strip" aria-label="AI Native capabilities">
          {trustItems.map((item) => (
            <span key={item}>{item}</span>
          ))}
        </section>

        <section className="split-section who-section" id="about">
          <div className="split-section__copy">
            <p className="section-label">Who We Are</p>
            <h2>
              AIを導入するのではなく、
              <br />
              会社の動き方そのものをAI前提に変える。
            </h2>
            <p>
              私たちは、企業のAI Native化を構想から実装まで担うパートナーです。
              生成AI、AI Agent、業務自動化、データ基盤、プロダクト開発を横断し、
              経営戦略と現場業務のあいだにある断絶を埋めます。
            </p>
            <p>
              単発のPoCやツール導入ではなく、日々の業務・意思決定・顧客体験に
              AIが組み込まれた状態をつくります。
            </p>
            <a className="text-link" href="#philosophy">
              More About Us <span aria-hidden="true">→</span>
            </a>
          </div>
          <div className="who-section__image" aria-hidden="true">
            <img src="/assets/lp-who-we-are-layer-stack.png" alt="" />
          </div>
        </section>

        <section className="services-section" id="services">
          <div className="section-head">
            <p className="section-label">What We Do</p>
            <a className="text-link text-link--top" href="#contact">
              View All Services <span aria-hidden="true">→</span>
            </a>
          </div>
          <div className="service-grid">
            {services.map((service) => (
              <a className="service-tile" href={service.href} key={service.href}>
                <div className="service-tile__copy">
                  <span className="service-tile__number">{service.number}</span>
                  <h3>{service.title}</h3>
                  <p className="service-tile__lead">{service.lead}</p>
                  <p>{service.body}</p>
                  <span className="service-tile__button">
                    詳細を見る <span aria-hidden="true">→</span>
                  </span>
                </div>
                <img src={service.image} alt="" aria-hidden="true" />
              </a>
            ))}
          </div>
        </section>

        <section className="stats-band" aria-label="AI Native principles">
          <img
            className="stats-band__image"
            src="/assets/lp-data-mesh.png"
            alt=""
            aria-hidden="true"
          />
          <div className="stats-band__items">
            {stats.map(([value, label]) => (
              <div className="stat" key={label}>
                <strong>{value}</strong>
                <span>{label}</span>
              </div>
            ))}
          </div>
          <p>
            AI Native化は、AIを試すことではありません。
            <br />
            事業の中で使われ続け、成果を生む構造へ落とし込むことです。
          </p>
        </section>

        <section className="how-work-section" id="how-we-work">
          <div className="how-work-section__head">
            <p className="section-label">How We Work</p>
            <span className="how-work-section__marker">
              Workflow <span aria-hidden="true">→</span>
            </span>
          </div>
          <div className="how-work-grid">
            {howWorkItems.map((item) => (
              <article className="how-work-item" key={item.number}>
                <span className="how-work-item__number">{item.number}</span>
                <h3>{item.title}</h3>
                <p>{item.lead}</p>
                <div className="how-work-item__visual" aria-hidden="true">
                  <img src={item.image} alt="" />
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="works-section" id="cases">
          <div className="section-head">
            <p className="section-label">Implementation Areas</p>
            <a className="text-link text-link--top" href="#contact">
              View All Use Cases <span aria-hidden="true">→</span>
            </a>
          </div>
          <div className="works-carousel" aria-label="Implementation area use cases">
            <div className="works-track">
              {rotatingWorks.map((work, index) => (
                <article
                  className="work-card"
                  key={`${work.category}-${index}`}
                  aria-hidden={index >= works.length ? "true" : undefined}
                >
                  <WorkVisual variant={work.visual} />
                  <div className="work-card__body">
                    <p className="work-card__category">{work.category}</p>
                    <h3>{work.title}</h3>
                    <p className="work-card__description">{work.description}</p>
                    <p className="work-card__kpi">
                      <strong>KPI:</strong> {work.kpi}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="philosophy-section" id="philosophy">
          <img
            className="philosophy-section__bg"
            src="/assets/lp-philosophy-stairs-bg.png"
            alt=""
            aria-hidden="true"
          />
          <div className="philosophy-section__copy">
            <p className="section-label">Philosophy</p>
            <h2>
              AI Native化とは、
              <br />
              人を減らすことではなく、
              <br />
              人間が担うべき仕事を再定義することだ。
            </h2>
            <p>
              AIは単なる効率化のための道具ではありません。企業にとってのAIは、情報を読み取り、
              判断を助け、実行を支え、学習を積み重ねていく、業務の新しい基盤です。
            </p>
            <p>
              だから私たちは、AIを「便利な道具」としてではなく、組織の構造を変える力として扱います。
              人間がすべてを抱え込む会社から、人間とAIが分散的に考え、動き、学習する会社へ。
              その移行を、構想ではなく実装として支援します。
            </p>
            <a className="text-link" href="#contact">
              More About Us <span aria-hidden="true">→</span>
            </a>
          </div>
          <div className="philosophy-principles" aria-label="AI Native philosophy principles">
            {philosophyPrinciples.map((item) => (
              <article className="philosophy-principle" key={item.title}>
                <div className="philosophy-principle__head">
                  <PhilosophyIcon type={item.icon} />
                  <h3>{item.title}</h3>
                </div>
                <p>{item.body}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="final-cta" id="contact">
          <div className="final-cta__copy">
            <p className="section-label">Next Step</p>
            <h2>Let&apos;s build your AI Native company.</h2>
            <p>AIを試す段階から、AIで事業を動かす段階へ。</p>
          </div>
          <a className="button button--dark final-cta__button" href="mailto:hello@cordmark.example">
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
