import { Noto_Sans_JP, Noto_Serif_JP } from "next/font/google";
import { Footer } from "./Footer";
import { CordMark } from "./home/CordMark";
import { ThreadCanvas } from "./home/ThreadCanvas";
import "./home/home.css";

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

const chain = [
  "生産力が上がる",
  "実行の負担が減る",
  "人に余力が生まれる",
  "人が考え、決め、創造できる",
  "時間、自由、尊厳、他者との関わりへ還元される",
];

const osSteps = [
  { tag: "01 SIGNAL", title: "実装者が止まる", body: "人の回答や判断がないと進めないことに気づく。Questionが中心へ流れる。" },
  { tag: "02 CONTEXT", title: "中心が背景を結ぶ", body: "過去のDecision、仕様、会話をつなぎ、答えるべき人を整理する。" },
  { tag: "03 HUMAN DECISION", title: "人が決める", body: "権限を持つ人のところで朱の印が押される。AIは決めない。", human: true },
  { tag: "04 SPECIFICATION", title: "開発可能な形へ", body: "Decisionは背景と一緒に実装者へ戻り、仕様として手渡される。" },
  { tag: "05 ACTION · TRACE", title: "再開し、痕跡が残る", body: "開発が再開する。Decisionは中心に残り、経営者は後から追える。" },
];

const practices = [
  {
    index: "PRODUCT",
    title: "CordMark OSの企画・開発・展開",
    body: "会社の意思と日々の仕事をつなぐProductをつくる。顧客の現場で得た知見を、契約と機密性を守った範囲でProductへ還元する。",
    href: "#cordmark-os",
    link: "CordMark OSについて",
  },
  {
    index: "SUPPORT",
    title: "組織・業務改善、AI駆動開発の導入・教育・伴走",
    body: "開発組織を含む業務の進め方を診断し、ドキュメント、計画、レビュー、検証を含む開発プロセスをAI前提に組み替える。",
    href: "/service/ai-driven-development",
    link: "AI駆動開発支援",
  },
  {
    index: "DELIVERY",
    title: "課題に合わせた受託・共同開発",
    body: "顧客の具体的な課題に応えるアプリ・システムを開発する。現場を理解し、信頼を築き、そこで得た知見を支援とProductへつなぐ。",
    href: "/contact",
    link: "開発の相談をする",
  },
];

const principles = [
  {
    number: "01",
    title: "面白さを見失わない。",
    body: "目標だけを見つめて、いま取り組んでいることの面白さや発見を見失わない。苦悩や困難を美化せず、それらも含めた現在の営みに自分たちなりの面白さを見つけ、つくる。",
  },
  {
    number: "02",
    title: "遠くを見据えて今を決める。",
    body: "目先の損得ではなく、技術と社会がどこへ向かうかを見据えて選ぶ。繰り返す仕事はAIと仕組みで再現可能にし、すぐに利益にならない探索や学習にも取り組む。",
  },
  {
    number: "03",
    title: "摩擦を価値に変える。",
    body: "意見の違いを前進を妨げるものではなく、一人では考えられなかった答えへのヒントと捉える。相手を信じ、なぜずれているのかを本気で考え、第三の答えをつくる。",
  },
  {
    number: "04",
    title: "確かさを積み上げる。",
    body: "推測を事実だと思い込まない。小さく試し、結果を確かめ、必要なら仮説を変える。Productの価値も自己評価ではなく、客観的な反応で確かめる。",
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

function External() {
  return (
    <svg viewBox="0 0 16 16" aria-hidden="true">
      <path d="M3.5 12.5 12 4" />
      <path d="M6.5 3.5h6v6" />
    </svg>
  );
}

export default function Home() {
  return (
    <div className={`wv ${serif.variable} ${sans.variable}`}>
      <ThreadCanvas />
      <main id="top" className="site-main">
        {/* 1. Hero — 人の意思を主語にする。Scrollで糸が編まれる */}
        <section className="wv-hero" data-ground="night" aria-labelledby="wv-hero-heading">
          <div className="wv-hero__pin">
            <div className="wv-hero__scrim" aria-hidden="true" />
            <div className="wv-hero__copy">
              <p className="wv-label">CordMark — Marking a more human future</p>
              <h1 id="wv-hero-heading">
                <span className="wv-nowrap">ばらばらの線が、</span>
                <br />
                <span className="wv-nowrap">ひとつの意思に</span>
                <span className="wv-nowrap">結ばれる。</span>
              </h1>
              <p className="wv-hero__lead">
                異なる経験と文脈が、摩擦を経て一本の意思になる。AIはその意思を現実へ運ぶ力であり、人の判断に置き換わるものではありません。
              </p>
              <div className="wv-hero__actions">
                <a className="wv-button" href="#cordmark-os">
                  CordMark OS <Arrow />
                </a>
                <a className="wv-button wv-button--ghost" href="#purpose">
                  会社の考え方 <Arrow />
                </a>
              </div>
            </div>
            <p className="wv-hero__hint" aria-hidden="true">
              SCROLL
            </p>
          </div>
        </section>

        {/* 2. Purpose — 会社が存在する理由。糸が因果の結び目を通る */}
        <section className="wv-section wv-purpose wv-act" id="purpose" data-ground="paper" aria-labelledby="wv-purpose-heading">
          <div className="wv-inner wv-act__col">
            <div>
              <p className="wv-label">Purpose</p>
              <h2 className="wv-purpose__statement" id="wv-purpose-heading">
                テクノロジーによる
                <br />
                物質的な充足を、
                <br />
                精神的な豊かさへ還元する。
              </h2>
              <p className="wv-lead">
                AIによって生産力や実行能力が大きくなったとき、その力を仕事量や競争力の拡大だけに使えば、物質的な充足が増えても、精神的な豊かさにつながるとは限りません。私たちは、技術が生む余力を、人が考え、決め、創造し、他者と関わるための時間と自由へ戻します。
              </p>
            </div>
            <div className="wv-purpose__chain">
              <p className="wv-label wv-purpose__chain-label">余力は、人へ戻る</p>
              <ol className="wv-chain" aria-label="Purposeの因果">
                {chain.map((text, i) => (
                  <li key={text}>
                    <span>{String(i + 1).padStart(2, "0")}</span>
                    {text}
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </section>

        {/* 3. Current focus — いまは「働く」から */}
        <section className="wv-section wv-focus wv-act" id="focus" data-ground="paper" aria-labelledby="wv-focus-heading">
          <div className="wv-inner wv-act__col">
            <div>
              <p className="wv-label">Current Focus</p>
              <h2 className="wv-h2" id="wv-focus-heading">
                いまは、働くことから。
              </h2>
              <p className="wv-lead">
                CordMarkの視野は、AI時代の人の生き方全体にあります。その最初の領域として、いまは人の働き方、とくにソフトウェア開発における新しい働き方に取り組んでいます。組織の意思決定と日々の仕事をつなぎ、人が判断と創造に集中できる状態をつくることが、現在の主領域です。
              </p>
            </div>
            <ol className="wv-tree" aria-label="事業の全体像">
              <li>
                <div className="wv-tree__meta">
                  <span>CORDMARK</span>
                  <span>PURPOSE</span>
                </div>
                <h3>AI時代の人の生き方</h3>
                <p>テクノロジーの進化によって、人がより豊かに生きられる状態をつくる。</p>
              </li>
              <li className="is-now">
                <div className="wv-tree__meta">
                  <span>WORK</span>
                  <span>NOW</span>
                </div>
                <h3>人の働き方</h3>
                <p>会社の意思と実行をつなぐ。中心Productは CordMark OS。</p>
              </li>
              <li>
                <div className="wv-tree__meta">
                  <span>LIFE</span>
                  <span>NEXT</span>
                </div>
                <h3>仕事以外の人の活動</h3>
                <p>遊び、学び、競技、創作、交流。AI時代にも人が自ら行う価値のある活動へ。</p>
              </li>
            </ol>
          </div>
        </section>

        {/* 4. CordMark OS — 糸が中心の輪になり、Questionが会社を一周する(Scroll連動) */}
        <section className="wv-os wv-act" id="cordmark-os" data-ground="paper" aria-labelledby="wv-os-heading">
          <div className="wv-os__pin">
            <div className="wv-inner wv-os__grid">
              <div className="wv-os__copy">
                <p className="wv-label">CordMark OS</p>
                <h2 className="wv-h2" id="wv-os-heading">
                  会社の文脈を、
                  <br />
                  ひとつに結ぶ。
                </h2>
                <p className="wv-lead">
                  散らばった目的、背景、Question、Decisionを、会社を知るAIが持ち続けられるContextへ結び、必要な人へ問いと判断材料を届ける。決めるのは、人です。
                </p>
                <ol className="wv-os__steps" aria-label="CordMark OSの流れ">
                  {osSteps.map((step) => (
                    <li key={step.tag} className={step.human ? "is-human" : undefined}>
                      <span className="wv-os__tag">{step.tag}</span>
                      <b>{step.title}</b>
                      <p>{step.body}</p>
                    </li>
                  ))}
                </ol>
                <p className="wv-os__status">STATUS · 開発・検証中 / 最終的なDecisionと責任は人が持つ</p>
              </div>
              <div className="wv-os__stage" aria-hidden="true">
                <div className="wv-os__legend">
                  <span>
                    <i style={{ background: "#a8683c" }} />
                    CONTEXT
                  </span>
                  <span>
                    <i style={{ background: "#26231f" }} />
                    QUESTION
                  </span>
                  <span>
                    <i style={{ background: "#b5482e" }} />
                    HUMAN DECISION
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CordMark OS — 三つの役割(固定区間の後に置く) */}
        <section className="wv-section wv-os-roles" data-ground="paper" aria-label="CordMark OSの三つの役割">
          <div className="wv-inner">
            <ul className="wv-roles">
              <li>
                <b>一人ひとりには</b>
                <span>仕事を覚え、整理し、思い出させる秘書</span>
              </li>
              <li>
                <b>Projectには</b>
                <span>背景と過去のDecisionをつなぐ、共有の秘書</span>
              </li>
              <li>
                <b>組織には</b>
                <span>決めるべき問いと選択肢を整理する参謀</span>
              </li>
            </ul>
          </div>
        </section>

        {/* 5. What we do — 三つの実践 */}
        <section className="wv-section wv-services" id="services" data-ground="paper2" aria-labelledby="wv-services-heading">
          <div className="wv-inner">
            <div className="wv-services__head">
              <div>
                <p className="wv-label">What We Do</p>
                <h2 className="wv-h2" id="wv-services-heading">
                  三つの実践が、ひとつの循環をつくる。
                </h2>
              </div>
              <p className="wv-lead">
                受託・共同開発で顧客の現場を理解し、そこで得た知見を組織・業務改善の支援とCordMark OSへ還元する。支援とProductで得た知見は、次の開発Projectへ戻る。三つは別々のサービスではなく、顧客の現実に根ざした新しい働き方をつくる一つの流れです。
              </p>
            </div>
            <div className="wv-practices">
              {practices.map((item) => (
                <article className="wv-practice" key={item.index}>
                  <div className="wv-practice__meta">
                    <span>{item.index}</span>
                  </div>
                  <h3>{item.title}</h3>
                  <p>{item.body}</p>
                  <a className="wv-link" href={item.href}>
                    {item.link} <Arrow />
                  </a>
                </article>
              ))}
            </div>
            <p className="wv-practice__loop">
              受託・共同開発 → 現場の理解と信頼 → 組織・業務改善とAI駆動開発の支援 → CordMark OSの導入・展開 → 次の開発Projectへ
            </p>
          </div>
        </section>

        {/* 6. Principles — 判断の仕方 */}
        <section className="wv-section wv-principles" id="principles" data-ground="paper" aria-labelledby="wv-principles-heading">
          <div className="wv-inner">
            <p className="wv-label">Principles</p>
            <h2 className="wv-h2" id="wv-principles-heading">
              私たちが、どう考え、どう選ぶか。
            </h2>
            <ol className="wv-principles__list">
              {principles.map((item) => (
                <li className="wv-principle" key={item.number}>
                  <span>{item.number}</span>
                  <h3>{item.title}</h3>
                  <p>{item.body}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* 7. Origin — CordMarkと縄文。細い線がここで痕跡になる */}
        <section className="wv-section wv-origin" id="origin" data-ground="charcoal" aria-labelledby="wv-origin-heading">
          <div className="wv-inner wv-origin__grid">
            <div>
              <CordMark className="wv-origin__mark" title="CordMarkのマーク" />
              <p className="wv-label">Origin</p>
              <h2 className="wv-h2" id="wv-origin-heading">
                CordMarkという名前は、
                <br />
                縄文の縄目に由来します。
              </h2>
              <p className="wv-lead">
                縄文時代は、文字による記録こそ少ないものの、自然資源に恵まれ、人々が自分たちの意思で暮らしをつくっていた時代として語られます。CordMarkがそこに見るのは、過去の理想化ではなく、豊かな資源を人間の豊かな暮らしへつなげるという、人間の豊かさの原型です。AIが生む余力を、人の時間、自由、尊厳へ還元する。それは、この問いをAI時代に更新する試みです。
              </p>
            </div>
            <div className="wv-origin__note">
              <b>縄目は、残る。</b>
              土器に押しつけられた縄の跡は、線が去ったあとも形として残りました。組織の中で交わされた問いと判断も、同じように痕跡として残り、次の判断の土台になる。私たちが「結ぶ」という言葉に込めているのは、この蓄積です。
            </div>
          </div>
        </section>

        {/* 8. Two horizons — WorkからLifeへ */}
        <section className="wv-section wv-horizons" id="horizons" data-ground="paper" aria-labelledby="wv-horizons-heading">
          <div className="wv-inner">
            <p className="wv-label">Two Horizons</p>
            <h2 className="wv-h2" id="wv-horizons-heading">
              AIネイティブな社会の、その先へ。
            </h2>
            <div className="wv-horizons__grid">
              <article className="wv-horizon is-now">
                <div className="wv-horizon__meta">
                  <span>NOW</span>
                  <span>WORK</span>
                </div>
                <h3>組織の意思と実行をつなぐ。</h3>
                <p>
                  人が判断と創造に集中できる働き方をつくる。CordMark OS、組織・業務改善、受託・共同開発を通じて、顧客の現場で確かめながら進めています。
                </p>
                <div className="wv-horizon__links">
                  <a className="wv-link" href="#cordmark-os">
                    CordMark OS <Arrow />
                  </a>
                  <a className="wv-link" href="/service/ai-driven-development">
                    AI駆動開発支援 <Arrow />
                  </a>
                </div>
              </article>
              <article className="wv-horizon">
                <div className="wv-horizon__meta">
                  <span>NEXT</span>
                  <span>LIFE</span>
                </div>
                <h3>生まれた余白に、人の営みをつくる。</h3>
                <p>
                  遊び、学び、競技、創作、交流。AI時代にも人が自ら行う価値のある活動へ広げていく構想です。考えることと対人競技の面白さを形にした戦略ボードゲームLaplaceや、AIの先の社会と人間を考えるメディアDotCraftは、その探索です。
                </p>
                <div className="wv-horizon__links">
                  <a className="wv-link" href="https://www.laplace.zone/" target="_blank" rel="noreferrer">
                    Laplace <External />
                  </a>
                  <a className="wv-link" href="https://dotcraft.cordmark.co.jp" target="_blank" rel="noreferrer">
                    DotCraft <External />
                  </a>
                </div>
              </article>
            </div>
          </div>
        </section>

        {/* 9. Contact — 対話へ */}
        <section className="wv-section wv-contact" id="contact" data-ground="paper2" aria-labelledby="wv-contact-heading">
          <div className="wv-inner wv-contact__grid">
            <div>
              <p className="wv-label">Contact</p>
              <h2 className="wv-h2" id="wv-contact-heading">
                何をつくるかから、一緒に考えましょう。
              </h2>
              <p className="wv-lead">
                まだ言葉になっていない構想や問いからで構いません。開発のこと、組織のこと、AIとの働き方のこと。現状を伺い、最初の一歩を一緒に整理します。
              </p>
            </div>
            <a className="wv-button wv-button--ink" href="/contact">
              相談する <Arrow />
            </a>
          </div>
        </section>
      </main>

      <Footer homeLinks />
    </div>
  );
}
