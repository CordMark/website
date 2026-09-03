import { Noto_Sans_JP, Noto_Serif_JP } from "next/font/google";
import { Footer } from "./Footer";
import { CompanyOsCanvas } from "./home/CompanyOsCanvas";
import { CordMark } from "./home/CordMark";
import { GroundWatch } from "./home/GroundWatch";
import { HeroCord } from "./home/HeroCord";
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
  "時間、自由、尊厳、他者との関わりへ戻る",
];

const companyOsSteps = [
  {
    tag: "01 検知 / SIGNAL",
    title: "埋もれた判断を見つける",
    body: "決めるべきことは、日常の質問、顧客の回答、仕様変更の中に埋まっている。まずそれを、判断すべきものとして取り出す。",
  },
  {
    tag: "02 整理 / CONTEXT",
    title: "背景・選択肢・影響を揃える",
    body: "なぜ必要か、何が決まっていないか、選ぶと何が起きるか。答える人が、説明を受け直さずに答えられる形にする。",
  },
  {
    tag: "03 振分 / ROUTING",
    title: "答えられる人へ、決められる人へ",
    body: "階層を一段ずつ上げるのではない。誰が答えを持ち、誰に権限があるかで、直接その人へ届ける。",
  },
  {
    tag: "04 判断 / HUMAN DECISION",
    title: "決めるのは、人間",
    body: "AIが届けるのは判断材料まで。確定と責任は人が持つ。誰が、何を根拠に決めたのかが、決定と一緒に残る。",
    human: true,
  },
  {
    tag: "05 反映 / ACTION",
    title: "仕様・タスク・履歴へ",
    body: "決定と理由が実行へつながり、次に参照できる履歴として残る。使われるほど、判断の文脈が会社に貯まる。",
  },
];

const practices = [
  {
    index: "PRODUCT",
    title: "Company OSの企画・開発・展開",
    body: "会社の意思と日々の仕事をつなぐProductをつくる。顧客の現場で得た知見を、契約と機密性を守った範囲でProductへ還元する。",
    href: "#company-os",
    link: "Company OSについて",
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
      <GroundWatch />
      <main id="top" className="site-main">
        {/* 1. Hero — 人の意思を主語にする。Scrollで糸が編まれる */}
        <section className="wv-hero" data-ground="night" aria-labelledby="wv-hero-heading">
          <div className="wv-hero__pin">
            <HeroCord />
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
                <a className="wv-button" href="#company-os">
                  Company OS <Arrow />
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

        {/* 3. Company OS — 売っているProduct。全画面の3D Sceneが成り立ちを見せる(Scroll連動) */}
        <section className="wv-os wv-act" id="company-os" data-ground="night" aria-labelledby="wv-os-heading">
          <div className="wv-os__pin">
            <CompanyOsCanvas />
            <div className="wv-inner wv-os__grid">
              {/* Shown alone while the scene plays. No body text yet — the
                  picture gets a screen and a half to itself. */}
              <div className="wv-os__overview">
                <p className="wv-label">Company OS</p>
                <h2 className="wv-h2" id="wv-os-heading">
                  中心にあるのはAI。
                  <br />
                  階層ではない。
                </h2>
                <p className="wv-os__overview-lead">
                  現場も、PMも、経営も、同じ中心へつながる。問いも、答えも、判断も、そこを通って必要な人へ届く。
                </p>
              </div>

              <div className="wv-os__copy">
                <p className="wv-label">Company OS</p>
                <p className="wv-lead">
                  現場を止めず、経営が重要判断を見失わない。埋もれた判断を見つけ、背景と選択肢を整理し、答えられる人と決められる人へ届ける。AIが決めるのではなく、人が判断できる状態を用意します。
                </p>
                <ol className="wv-os__steps" aria-label="Company OSの流れ">
                  {companyOsSteps.map((step) => (
                    <li key={step.tag} className={step.human ? "is-human" : undefined}>
                      <span className="wv-os__tag">{step.tag}</span>
                      <b>{step.title}</b>
                      <p>
                        <span>{step.body}</span>
                      </p>
                    </li>
                  ))}
                </ol>
                <p className="wv-os__status">STATUS · 構想と設計を整備中 / 実装は未着手</p>
              </div>
            </div>
          </div>
        </section>

        {/* Company OS — 三つの役割(固定区間の後に置く) */}
        <section className="wv-section wv-os-roles" data-ground="paper" aria-label="Company OSの三つの役割">
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

        {/* CordMark OS — 売り物ではない。自社運営で先に実践している社内OS */}
        <section
          className="wv-section wv-practice-os"
          id="cordmark-os"
          data-ground="paper"
          aria-labelledby="wv-practice-os-heading"
        >
          <div className="wv-inner wv-practice-os__grid">
            <div>
              <p className="wv-label">CordMark OS</p>
              <h2 className="wv-h2" id="wv-practice-os-heading">
                自分たちの会社で、
                <br />
                先に実践する。
              </h2>
            </div>
            <div>
              <p className="wv-lead">
                Company OSが目指す「会社全体のOS」を、CordMark自身の会社運営で先に実践しています。会社とProjectの現在の文脈をRepositoryに保ち、AIが観測と実行を進め、人は理解と意思決定に集中する。この社内OSをCordMark OSと呼んでいます。
              </p>
              <p className="wv-lead">
                CordMark
                OSは販売するProductではありません。どのような文脈があれば仕事を任せられるのか、どこで人の判断が必要になるのかを、自分たちの経営で確かめる場所です。ここで分かったことが、Company OSへ戻ります。
              </p>
              <p className="wv-os__status">STATUS · 設計中 / 実装は未着手</p>
            </div>
          </div>
        </section>

        {/* 4. What we do — 三つの実践 */}
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
                受託・共同開発で顧客の現場を理解し、そこで得た知見を組織・業務改善の支援とCompany OSへ還元する。支援とProductで得た知見は、次の開発Projectへ戻る。三つは別々のサービスではなく、顧客の現実に根ざした新しい働き方をつくる一つの流れです。
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
              受託・共同開発 → 現場の理解と信頼 → 組織・業務改善とAI駆動開発の支援 → Company OSの導入・展開 → 次の開発Projectへ
            </p>
          </div>
        </section>

        {/* 5. Principles — 判断の仕方 */}
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

        {/* 6. Origin — CordMarkと縄文。細い線がここで痕跡になる */}
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

        {/* 7. Two phases — 全体を見渡す締め。Phase 2は/beyondへ */}
        <section className="wv-section wv-horizons" id="horizons" data-ground="paper" aria-labelledby="wv-horizons-heading">
          <div className="wv-inner">
            <p className="wv-label">Two Phases</p>
            <h2 className="wv-h2" id="wv-horizons-heading">
              社会をAIネイティブに。
              <br />
              その先の、人の営みを考える。
            </h2>
            <div className="wv-horizons__grid">
              <article className="wv-horizon is-now">
                <div className="wv-horizon__meta">
                  <span>PHASE 1</span>
                  <span>AI-NATIVE</span>
                </div>
                <h3>意思と実行を、つなぐ。</h3>
                <p>
                  会社の意思決定と日々の仕事をつなぎ、人が判断と創造に集中できる状態を、顧客の現場からつくる。Company OS、組織・業務改善の支援、受託・共同開発。
                </p>
                <div className="wv-horizon__links">
                  <a className="wv-link" href="#company-os">
                    Company OS <Arrow />
                  </a>
                  <a className="wv-link" href="/service/ai-driven-development">
                    AI駆動開発支援 <Arrow />
                  </a>
                </div>
              </article>
              <article className="wv-horizon">
                <div className="wv-horizon__meta">
                  <span>PHASE 2</span>
                  <span>BEYOND</span>
                </div>
                <h3>人に残る営みを、形にする。</h3>
                <p>
                  技術が行き渡ったあとにも、人が自ら行う価値のある営みがある。仲間の心理を読み合う2v2の戦略ボードゲームLaplace、社会と人間の先を考えるメディアDotCraft。
                </p>
                <div className="wv-horizon__links">
                  <a className="wv-link" href="/beyond">
                    Phase 2を見る <Arrow />
                  </a>
                </div>
              </article>
            </div>
          </div>
        </section>

        {/* 8. Contact — 対話へ */}
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
