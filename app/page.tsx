import { Footer } from "./Footer";
import { LaplaceFeature } from "./LaplaceFeature";

const challengeCards = [
  {
    number: "01",
    label: "FOR ENGINEERING",
    title: "開発チームのAI活用を、個人技から標準プロセスへ。",
    body: "仕様策定・実装・レビュー・テストをつなぎ、スピードと品質を同時に測れる開発体験を設計します。",
    href: "/service/ai-driven-development",
    link: "AI駆動開発を見る",
  },
  {
    number: "02",
    label: "FOR BUSINESS",
    title: "部門ごとのAI活用を、会社全体のCompanyOSへ。",
    body: "経営・営業・CS・管理の業務とナレッジを横断し、会社そのものをAI前提に再設計します。",
    href: "/service/ai-native-company",
    link: "AI Native Companyを見る",
  },
  {
    number: "03",
    label: "FOR LEADERS",
    title: "PoCの次に進めない状態から、投資判断できるロードマップへ。",
    body: "テーマの優先順位、Before / AfterのKPI、実装範囲を明らかにし、次の一手を具体化します。",
    href: "/contact",
    link: "課題を相談する",
  },
];

const services = [
  {
    index: "01",
    overline: "AI-DRIVEN DEVELOPMENT",
    title: "開発組織を、AI前提のプロセスへ。",
    body: "ツール導入に留まらず、要件からリリースまでの流れを再設計。チーム標準として使われ、改善し続ける状態をつくります。",
    facts: ["2週間のプロセス診断", "6週間の実装パイロット", "KPI設計・定着支援"],
    image: "/assets/ai-driven-development-hero.webp",
    href: "/service/ai-driven-development",
  },
  {
    index: "02",
    overline: "AI NATIVE COMPANY / COMPANY OS",
    title: "開発が速くなった次は、組織の速度を上げる。",
    body: "AIで開発が速くなるほど、次のボトルネックは営業とエンジニアなど、部門をまたぐコミュニケーションに移ります。会話や判断の背景が社内に蓄積・共有されるCompany OSを実装し、組織全体の速度へつなげます。",
    facts: ["営業と開発のコンテキストを接続", "会話・判断の背景を組織知に", "部門横断のCompany OSを実装"],
    image: "/assets/ai-native-company-hero.webp",
    href: "/service/ai-native-company",
  },
];

const companyOsLayers = [
  { number: "01", title: "経営・意思決定", detail: "判断材料と選択肢を、常に更新される状態へ" },
  { number: "02", title: "業務・ワークフロー", detail: "部門をまたぐ仕事を、人とAIが協働する流れへ" },
  { number: "03", title: "ナレッジ・データ", detail: "散在する知識を、実務で使える共通基盤へ" },
  { number: "04", title: "プロダクト・顧客体験", detail: "AIを機能ではなく、体験そのものに組み込む" },
  { number: "05", title: "ガバナンス・学習", detail: "安全に使い、効果を測り、更新し続ける仕組みへ" },
];

const process = [
  {
    step: "01",
    title: "診る",
    english: "Diagnose",
    body: "業務、開発、データ、意思決定の流れを可視化し、本当のボトルネックを特定します。",
  },
  {
    step: "02",
    title: "組み替える",
    english: "Redesign",
    body: "人とAIの役割を定め、成果から逆算してプロセスとKPIを組み替えます。",
  },
  {
    step: "03",
    title: "つくる",
    english: "Build",
    body: "AI Agent、Workflow、業務アプリ、開発環境を、現場で使える形まで実装します。",
  },
  {
    step: "04",
    title: "根づかせる",
    english: "Operate",
    body: "利用状況と効果を測り、チーム標準として改善が続く運用へ落とし込みます。",
  },
];

const implementationAreas = [
  {
    tag: "DEVELOPMENT",
    title: "AI駆動の開発フロー",
    body: "仕様策定、実装、レビュー、テスト、ドキュメントを一続きの体験へ。",
    image: "/assets/implementation-development.webp",
  },
  {
    tag: "WORKFLOW",
    title: "部門業務のAIワークフロー",
    body: "問い合わせ、提案、議事録、レポート作成を、判断を残しながら効率化。",
    image: "/assets/implementation-workflow.webp",
  },
  {
    tag: "KNOWLEDGE",
    title: "社内ナレッジAI",
    body: "散在する文書や知見をつなぎ、部門ごとの実務に答えられる仕組みへ。",
    image: "/assets/implementation-agent.webp",
  },
  {
    tag: "PRODUCT",
    title: "既存プロダクトのAI機能",
    body: "分析、提案、生成、自動実行を組み込み、顧客体験そのものを再設計。",
    image: "/assets/implementation-product.webp",
  },
];

const horizons = [
  {
    number: "01",
    overline: "THE NEXT DECADE",
    title: "会社と働き方を、AIで構造から変える。",
    body: "企業、教育、介護をはじめとする領域で、AIを中核に据えた新しい仕組みをつくる。これが、いま私たちが集中する第一段階です。",
  },
  {
    number: "02",
    overline: "AFTER AI TRANSFORMATION",
    title: "生まれた余白に、人間の営みをつくる。",
    body: "人と人が競い、遊び、つながり、文化を刻む。Laplaceをはじめ、AIの先に残るエンターテインメントやコミュニティも構想しています。",
  },
];

function ArrowIcon() {
  return (
    <svg viewBox="0 0 20 20" aria-hidden="true">
      <path d="M4 10h11" />
      <path d="m11 5 5 5-5 5" />
    </svg>
  );
}

export default function HomeLegacy() {
  return (
    <>
      <main id="top" className="site-main home-v2">
        <section className="cm-hero" aria-labelledby="cm-hero-heading">
          <div className="cm-hero__copy">
            <p className="cm-eyebrow">
              <span /> COMPANY OS / AI NATIVE IMPLEMENTATION
            </p>
            <h1 id="cm-hero-heading">
              <span>AIを、会社の</span>
              <span className="cm-hero__accent">「使える仕組み」に。</span>
            </h1>
            <p className="cm-hero__lead">
              AIチャットボットを足すだけでは、会社は変わらない。CordMarkは、経営・意思決定・業務・ナレッジ・プロダクトの中核にAIを据え、会社をひとつのOSとして再設計します。
            </p>
            <div className="cm-hero__actions">
              <a className="cm-button cm-button--primary" href="/contact">
                無料で相談する <ArrowIcon />
              </a>
              <a className="cm-button cm-button--ghost" href="#services">
                支援内容を見る <ArrowIcon />
              </a>
            </div>
            <dl className="cm-hero__facts" aria-label="CordMarkの支援範囲">
              <div>
                <dt>01</dt>
                <dd>会社の中核にAIを据える</dd>
              </div>
              <div>
                <dt>02</dt>
                <dd>開発組織と事業部門に対応</dd>
              </div>
              <div>
                <dt>03</dt>
                <dd>KPIで効果を可視化</dd>
              </div>
            </dl>
          </div>

          <div className="cm-hero__visual" aria-hidden="true">
            <div className="cm-hero__visual-frame">
              <img
                src="/assets/website-ribbon-system.webp"
                alt=""
                loading="eager"
                fetchPriority="high"
                decoding="async"
              />
              <span className="cm-hero__visual-label cm-hero__visual-label--strategy">STRATEGY</span>
              <span className="cm-hero__visual-label cm-hero__visual-label--workflow">WORKFLOW</span>
              <span className="cm-hero__visual-label cm-hero__visual-label--agent">AGENT</span>
              <span className="cm-hero__visual-label cm-hero__visual-label--measure">MEASURE</span>
              <span className="cm-hero__visual-status">SYSTEM / ONLINE</span>
            </div>
          </div>
        </section>

        <div className="cm-signal" aria-label="CordMarkの提供価値">
          <p>FROM AI TOOLS TO COMPANY OS</p>
          <span>構想</span><i />
          <span>業務設計</span><i />
          <span>実装</span><i />
          <span>運用</span>
        </div>

        <section className="cm-challenges" aria-labelledby="cm-challenges-heading">
          <div className="cm-section-heading">
            <p className="cm-kicker">START WITH YOUR CHALLENGE</p>
            <h2 id="cm-challenges-heading">いまの課題から、入口を選べます。</h2>
            <p>テーマが固まっていなくても構いません。近い状態から、最小の一歩を設計します。</p>
          </div>
          <div className="cm-challenge-grid">
            {challengeCards.map((item) => (
              <a className="cm-challenge-card" href={item.href} key={item.number}>
                <div className="cm-challenge-card__meta">
                  <span>{item.number}</span>
                  <span>{item.label}</span>
                </div>
                <h3>{item.title}</h3>
                <p>{item.body}</p>
                <span className="cm-text-link">
                  {item.link} <ArrowIcon />
                </span>
              </a>
            ))}
          </div>
        </section>

        <section className="cm-services" id="services" aria-labelledby="cm-services-heading">
          <div className="cm-section-heading cm-section-heading--light">
            <p className="cm-kicker">SERVICES</p>
            <h2 id="cm-services-heading">変える単位に合わせた、2つの支援。</h2>
            <p>共通するのは、診断で終わらず、実装と運用までつなげることです。</p>
          </div>

          <div className="cm-service-list">
            {services.map((service) => (
              <article className="cm-service-card" key={service.index}>
                <div className="cm-service-card__visual">
                  <img src={service.image} alt="" loading="lazy" decoding="async" />
                  <span>{service.index}</span>
                </div>
                <div className="cm-service-card__copy">
                  <p className="cm-service-card__overline">{service.overline}</p>
                  <h3>{service.title}</h3>
                  <p>{service.body}</p>
                  <ul>
                    {service.facts.map((fact) => (
                      <li key={fact}>{fact}</li>
                    ))}
                  </ul>
                  <a className="cm-button cm-button--light" href={service.href}>
                    詳しく見る <ArrowIcon />
                  </a>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="cm-company-os" aria-labelledby="cm-company-os-heading">
          <div className="cm-company-os__intro">
            <div className="cm-section-heading">
              <p className="cm-kicker">COMPANY OS</p>
              <h2 id="cm-company-os-heading">AIを追加するのではなく、会社の中核に据える。</h2>
            </div>
            <p>
              チャットボットや単発の自動化は、変革の入口にすぎません。経営の判断から現場の仕事、顧客に届く体験までをつなぎ、AIが組織全体を動かす基盤として機能する状態をつくります。
            </p>
          </div>
          <div className="cm-company-os__system" aria-label="CompanyOSを構成する5つのレイヤー">
            <p className="cm-company-os__core">AI CORE</p>
            <ol>
              {companyOsLayers.map((layer) => (
                <li key={layer.number}>
                  <span>{layer.number}</span>
                  <div>
                    <h3>{layer.title}</h3>
                    <p>{layer.detail}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className="cm-process" id="how-we-work" aria-labelledby="cm-process-heading">
          <div className="cm-process__intro">
            <div className="cm-section-heading">
              <p className="cm-kicker">HOW WE WORK</p>
              <h2 id="cm-process-heading">AIを入れる前に、仕事の流れを変える。</h2>
            </div>
            <p>
              成果が出ない原因は、AIの性能ではなく、使う構造にあることが少なくありません。だから私たちは、現場を診るところから始めます。
            </p>
          </div>
          <ol className="cm-process-list">
            {process.map((item) => (
              <li key={item.step}>
                <div className="cm-process-list__number">{item.step}</div>
                <div>
                  <p>{item.english}</p>
                  <h3>{item.title}</h3>
                </div>
                <p>{item.body}</p>
              </li>
            ))}
          </ol>
        </section>

        <section className="cm-implementation" id="cases" aria-labelledby="cm-implementation-heading">
          <div className="cm-section-heading">
            <p className="cm-kicker">WHAT WE BUILD</p>
            <h2 id="cm-implementation-heading">“使える”を、具体的な形にする。</h2>
            <p>検討資料だけではなく、現場の仕事に組み込まれる仕組みをつくります。</p>
          </div>
          <div className="cm-implementation-grid">
            {implementationAreas.map((item) => (
              <article className="cm-implementation-card" key={item.tag}>
                <div className="cm-implementation-card__image">
                  <img src={item.image} alt="" loading="lazy" decoding="async" />
                </div>
                <p>{item.tag}</p>
                <h3>{item.title}</h3>
                <span>{item.body}</span>
              </article>
            ))}
          </div>
        </section>

        <section className="cm-identity" id="philosophy" aria-labelledby="cm-identity-heading">
          <div className="cm-identity__statement">
            <p className="cm-kicker">OUR POINT OF VIEW</p>
            <h2 id="cm-identity-heading">
              AIの先で、人間は
              <br />
              何をするのか。
            </h2>
            <p>
              CordMarkは「縄文」に由来する名前です。人に余白が生まれたとき、土器に縄目を刻んだように、私たちは何を競い、何をつくり、誰とつながるのか。AIによる構造変革の、その先までを見据えています。
            </p>
            <a className="cm-text-link cm-text-link--light" href="/about">
              CordMarkについて <ArrowIcon />
            </a>
          </div>
          <div className="cm-horizons">
            {horizons.map((horizon) => (
              <article key={horizon.number}>
                <div className="cm-horizons__meta">
                  <span>{horizon.number}</span>
                  <p>{horizon.overline}</p>
                </div>
                <h3>{horizon.title}</h3>
                <p>{horizon.body}</p>
              </article>
            ))}
          </div>
        </section>

        <LaplaceFeature />

        <section className="cm-media" aria-labelledby="cm-media-heading">
          <div className="cm-media__copy">
            <p className="cm-kicker">MEDIA / FIELD NOTES</p>
            <h2 id="cm-media-heading">思考の種を生む。</h2>
            <p>
              「最終的に、人間には何が残るのか」。AIを現場でどう使うかだけでなく、その先の社会と人間の営みまで考えるYouTubeメディア、DotCraftを運営しています。
            </p>
            <ul className="cm-media__topics" aria-label="DotCraftで扱うテーマ">
              <li>LOOP ENGINEERING</li>
              <li>AI AGENTS</li>
              <li>AI &amp; SOCIETY</li>
            </ul>
            <a
              className="cm-button cm-button--media"
              href="https://dotcraft.cordmark.co.jp"
              target="_blank"
              rel="noreferrer"
            >
              DotCraftを見る <ArrowIcon />
            </a>
          </div>
          <div className="cm-media__visual">
            <img src="/assets/dotcraft-transparent.webp" alt="DotCraft" loading="lazy" decoding="async" />
          </div>
        </section>

        <section className="cm-final" id="contact" aria-labelledby="cm-final-heading">
          <p className="cm-kicker">NEXT STEP</p>
          <div>
            <h2 id="cm-final-heading">まだ曖昧な課題から、話しましょう。</h2>
            <p>AIを入れる場所が決まっていなくても大丈夫です。現状を伺い、最初の一歩を一緒に整理します。</p>
          </div>
          <a className="cm-button cm-button--primary" href="/contact">
            無料で相談する <ArrowIcon />
          </a>
        </section>
      </main>

      <Footer homeLinks />
    </>
  );
}
