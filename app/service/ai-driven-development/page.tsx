import { Header } from "../../Header";

const painPoints = [
  {
    icon: "person",
    title: "個人任せで",
    body: "組織的に活用できていない",
  },
  {
    icon: "flow",
    title: "どの工程にAIを",
    body: "入れるべきか分からない",
  },
  {
    icon: "bars",
    title: "効果が出ているか",
    body: "測定できていない",
  },
  {
    icon: "user-circle",
    title: "一部の強い人に",
    body: "属人化してしまう",
  },
  {
    icon: "shield",
    title: "セキュリティや品質への",
    body: "不安で踏み出せない",
  },
  {
    icon: "document",
    title: "経営層に投資対効果を",
    body: "説明できない",
  },
];

const programBullets = [
  "現行プロセスの課題とボトルネックを可視化",
  "AI活用テーマの洗い出しと優先順位付け",
  "導入前後で測るKPIの設計",
  "6週間の実装パイロット計画を提案",
];

const diagnosisSteps = [
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

const deliverables = [
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

const offerFacts = [
  {
    icon: "clock",
    label: "期間",
    value: "2週間",
  },
  {
    icon: "tag",
    label: "価格",
    value: "初期モニター 50万円〜",
  },
  {
    icon: "person",
    label: "対象",
    value: "1部署または1開発チーム",
  },
  {
    icon: "check",
    label: "形式",
    value: "オンライン中心（必要に応じて対面）",
  },
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

function AidIcon({ type }: { type: string }) {
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
      {type === "check" && (
        <>
          <circle cx="18" cy="18" r="14" />
          <path d="m12 18.4 4 4 8.2-9" />
        </>
      )}
    </svg>
  );
}

export default function AiDrivenDevelopmentPage() {
  return (
    <>
      <Header />
      <main id="top" className="aid-page site-main">
        <section className="aid-hero" aria-labelledby="aid-heading">
          <div className="aid-hero__copy">
            <p className="aid-kicker">AI-Driven Development</p>
            <h1 id="aid-heading">
              開発組織を、
              <br />
              AI前提のプロセスへ。
            </h1>
            <p className="aid-lead">
              AIコーディングツールは、個人単位の利用で止まりがちです。
              <br />
              CordMarkは、仕様・実装・レビュー・テスト・ドキュメント・
              <br />
              KPI測定まで、開発プロセス全体をAI前提に再設計します。
            </p>
            <p className="aid-hero-note">
              まずは2週間の「AI駆動開発プロセス診断」で、御社の開発組織のどこにAIを入れるべきか、
              何を測るべきか、次に何を実装すべきかを明確にします。
            </p>

            <div className="aid-actions">
              <a className="aid-primary" href="#contact">
                診断について相談する <span aria-hidden="true">→</span>
              </a>
              <a className="aid-secondary" href="#kpi-example">
                KPI測定の例を見る <span aria-hidden="true">→</span>
              </a>
            </div>
          </div>

          <div className="aid-hero__visual" aria-hidden="true">
            <img src="/assets/ai-driven-development-hero.png" alt="" />
          </div>
        </section>

        <section className="aid-problems" aria-labelledby="aid-problems-heading">
          <div className="aid-section-head aid-section-head--center">
            <p className="aid-kicker">よくある課題</p>
            <h2 id="aid-problems-heading">
              AIツールを入れても、
              <br />
              開発組織はまだAI Nativeになっていない。
            </h2>
          </div>
          <div className="aid-problem-grid">
            {painPoints.map((point) => (
              <article className="aid-problem" key={`${point.title}-${point.body}`}>
                <AidIcon type={point.icon} />
                <h3>{point.title}</h3>
                <p>{point.body}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="aid-diagnosis" aria-labelledby="aid-diagnosis-heading">
          <div className="aid-diagnosis__copy">
            <p className="aid-kicker">AI駆動開発プロセス診断とは</p>
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

        <section className="aid-deliverables" id="kpi-example" aria-labelledby="aid-deliverables-heading">
          <div className="aid-section-head aid-section-head--center">
            <p className="aid-kicker">診断で得られるもの</p>
            <h2 id="aid-deliverables-heading">AI導入の投資判断に必要な資料を納品します。</h2>
          </div>
          <div className="aid-deliverable-grid">
            {deliverables.map((item) => (
              <article className="aid-deliverable" key={item.title}>
                <AidIcon type={item.icon} />
                <h3>{item.title}</h3>
                <p>{item.body}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="aid-offer" aria-labelledby="aid-offer-heading">
          <div className="aid-section-head aid-section-head--center">
            <p className="aid-kicker">価格・対象</p>
            <h2 id="aid-offer-heading">まずは1部署・1開発チームから始めます。</h2>
          </div>
          <dl className="aid-offer-list">
            {offerFacts.map((fact) => (
              <div key={fact.label}>
                <AidIcon type={fact.icon} />
                <dt>{fact.label}</dt>
                <dd>{fact.value}</dd>
              </div>
            ))}
          </dl>
        </section>

        <section className="aid-contact-section" id="contact" aria-labelledby="aid-contact-heading">
          <div className="aid-contact-copy">
            <h2 id="aid-contact-heading">診断について相談する</h2>
            <p>
              AI駆動開発プロセス診断に関心がある方は、以下のフォームからお問い合わせください。
              現在のAI活用状況と開発組織の課題を伺った上で、診断対象になりそうな範囲を確認します。
            </p>
          </div>
          <form className="aid-form">
            <div className="aid-field">
              <label htmlFor="company">会社名</label>
              <input id="company" name="company" type="text" />
            </div>
            <div className="aid-field">
              <label htmlFor="name">氏名</label>
              <input id="name" name="name" type="text" />
            </div>
            <div className="aid-field">
              <label htmlFor="role">役職</label>
              <input id="role" name="role" type="text" />
            </div>
            <div className="aid-field aid-field--wide">
              <label htmlFor="email">メールアドレス</label>
              <input id="email" name="email" type="email" />
            </div>
            <div className="aid-field aid-field--wide">
              <label htmlFor="team-size">開発組織の人数</label>
              <input id="team-size" name="team-size" type="text" />
            </div>
            <fieldset className="aid-checks">
              <legend>現在使っているAIツール（複数選択可）</legend>
              {["ChatGPT", "Claude", "Cursor", "GitHub Copilot", "まだ使っていない", "その他"].map(
                (tool) => (
                  <label key={tool}>
                    <input name="tools" type="checkbox" value={tool} />
                    <span>{tool}</span>
                  </label>
                ))}
            </fieldset>
            <div className="aid-field">
              <label htmlFor="issue">困っている開発工程（複数選択可）</label>
              <select id="issue" name="issue" defaultValue="">
                <option value="" disabled>
                  選択してください
                </option>
                <option>要件定義・仕様策定</option>
                <option>実装・レビュー</option>
                <option>テスト・品質保証</option>
                <option>ドキュメント・ナレッジ共有</option>
              </select>
            </div>
            <div className="aid-field">
              <label htmlFor="consultation">相談したい内容</label>
              <select id="consultation" name="consultation" defaultValue="">
                <option value="" disabled>
                  選択してください
                </option>
                <option>診断について詳しく聞きたい</option>
                <option>自社に合うか相談したい</option>
                <option>実装支援まで相談したい</option>
              </select>
            </div>
            <div className="aid-field">
              <label htmlFor="budget">予算感</label>
              <select id="budget" name="budget" defaultValue="">
                <option value="" disabled>
                  選択してください
                </option>
                <option>50万円〜100万円</option>
                <option>100万円〜300万円</option>
                <option>300万円以上</option>
              </select>
            </div>
            <div className="aid-field">
              <label htmlFor="decision">決裁者との関係</label>
              <select id="decision" name="decision" defaultValue="">
                <option value="" disabled>
                  選択してください
                </option>
                <option>本人が決裁者</option>
                <option>決裁者に提案予定</option>
                <option>情報収集中</option>
              </select>
            </div>
            <div className="aid-field">
              <label htmlFor="date">希望面談日時（任意）</label>
              <input id="date" name="date" type="date" />
            </div>
            <button className="aid-submit" type="button">
              内容を確認する <span aria-hidden="true">→</span>
            </button>
          </form>
        </section>
      </main>
    </>
  );
}
