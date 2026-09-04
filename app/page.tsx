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

/**
 * One spec change, through three roles, back into the day's work. Each beat
 * is a scene, not a stage of the mechanism: who asked, what came back, what
 * changed. `say` is what appears beside the person in the scene — one line
 * of question and a short tag of what returned. Never a chat UI.
 */
const companyOsSteps = [
  {
    tag: "01 / ANSWER",
    title: "まず、AIに聞ける。",
    body: "コードと過去の決定を知るAIが、根拠付きで答える。エンジニアの手は止まらない。",
  },
  {
    tag: "02 / ASK",
    title: "問いは、背景を連れて届く。",
    body: "答えるべき人へ、なぜ必要か、何が決まっていないか、選ぶと何が起きるかを添えて届く。説明を受け直さなくていい。",
  },
  {
    tag: "03 / DECIDE",
    title: "決めるのは、人。",
    body: "AIが営業の知る顧客の事情まで集め、PMが決める。誰が、何を根拠に決めたかが、決定と一緒に残り、経営には知らされる。",
    human: true,
  },
  {
    tag: "04 / ACT",
    title: "決定は、その日の仕事に戻る。",
    body: "決定と理由が仕様とタスクになり、止まっていた開発が動き出す。",
  },
  {
    tag: "05 / VISIBILITY",
    title: "重要な判断が、現場の状況ごと届く。",
    body: "整えられた報告を待たない。決定の経緯と現場の声が、そのまま経営に届く。「できています」の裏で育つ問題を、手遅れになる前に知る。",
  },
  {
    tag: "06 / AI-NATIVE",
    title: "会社が、AIネイティブに生まれ変わる。",
    body: "全員がAIを学ぶ必要はない。いつもの仕事の裏側でAIが動き、使うほど会社を知る。AIを導入した、その先へ。",
  },
];

const practices = [
  {
    index: "DELIVERY",
    title: "課題に合わせた受託・共同開発",
    body: "顧客の具体的な課題に応えるアプリ・システムを開発する。現場を理解し、信頼を築き、そこで得た知見を支援とProductへつなぐ。",
    href: "/contact",
    link: "開発の相談をする",
  },
  {
    index: "SUPPORT",
    title: "組織・業務改善、AI駆動開発の導入・教育・伴走",
    body: "開発組織を含む業務の進め方を診断し、ドキュメント、計画、レビュー、検証を含む開発プロセスをAI前提に組み替える。",
    href: "/service/ai-driven-development",
    link: "AI駆動開発支援",
    secondHref: "/service/ai-native-company",
    secondLink: "組織・業務改善支援",
  },
  {
    index: "PRODUCT",
    title: "Company OSの企画・開発・展開",
    body: "会社の意思と日々の仕事をつなぐProductをつくる。顧客の現場で得た知見を、契約と機密性を守った範囲でProductへ還元する。",
    href: "#company-os",
    link: "Company OSについて",
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
        <section className="wv-hero" data-ground="night" data-blend-down="none" aria-labelledby="wv-hero-heading">
          <div className="wv-hero__pin">
            <HeroCord />
            <div className="wv-hero__scrim" aria-hidden="true" />
            <div className="wv-hero__copy">
              <p className="wv-label">CordMark — Marking a more human future</p>
              <h1 id="wv-hero-heading">
                <span className="wv-nowrap">会社の速さは、</span>
                <br />
                <span className="wv-nowrap">いちばん遅い会話で</span>
                <span className="wv-nowrap">決まる。</span>
              </h1>
              <p className="wv-hero__lead">
                AIがコードを書く時代、開発を止めているのは実装ではなく、問いと判断の往復です。CordMarkは、その会話の形を組み替え、速くなった分を人の時間へ戻す会社です。自分たちの会社でまず動かし、ソフトウェア開発の現場へ。主要商品は、<span className="wv-nowrap">Company OS</span>。
              </p>
              <div className="wv-hero__actions">
                <a className="wv-button" href="#company-os">
                  Company OS <Arrow />
                </a>
                <a className="wv-button wv-button--ghost" href="#origin">
                  会社の考え方 <Arrow />
                </a>
              </div>
            </div>
            <p className="wv-hero__hint" aria-hidden="true">
              SCROLL
            </p>
          </div>
        </section>

        {/* 2. Company OS — 売っているProduct。全画面の3D Sceneが成り立ちを見せる(Scroll連動) */}
        <section className="wv-os wv-act" id="company-os" data-ground="night" data-blend-up="none" data-blend-down="paper2" aria-labelledby="wv-os-heading">
          <div className="wv-os__pin">
            <CompanyOsCanvas />
            <div className="wv-inner wv-os__grid">
              {/* Shown alone while the scene plays. No body text yet — the
                  picture gets a screen and a half to itself. */}
              <div className="wv-os__overview">
                <p className="wv-label">Company OS</p>
                <h2 className="wv-h2" id="wv-os-heading">
                  <span className="wv-nowrap">現場を止めない。</span>
                  <br />
                  <span className="wv-nowrap">重要な判断を、見失わない。</span>
                </h2>
                <p className="wv-os__overview-lead">
                  実装は、速くなった。次に詰まるのは、決めることと、伝えること。問いが答えを待ち、判断が上がってくるまでの時間を、開発の現場から取り戻す。
                </p>
              </div>

              {/* One caption per beat, at the bottom, under the scene. Without
                  a scene (reduced motion, no WebGL, narrow screens) they read
                  as a plain list. */}
              <div className="wv-os__copy">
                <p className="wv-os__copy-lead">
                  一つの仕様変更が、三つの立場を通って仕事に戻るまで。AIが決めるのではなく、人が判断できる状態を用意します。
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
              </div>

              {/* The last beat is not a caption. It comes back to the middle,
                  the way the section opened, while the scene behind it goes
                  out. Pinned screens only; the list above carries it elsewhere. */}
              <div className="wv-os__closing">
                <p className="wv-label" aria-hidden="true">
                  Company OS
                </p>
                <p className="wv-h2">
                  <span className="wv-nowrap">会社が、AIネイティブに</span>
                  <br />
                  <span className="wv-nowrap">生まれ変わる。</span>
                </p>
                <p className="wv-os__overview-lead">
                  全員がAIを学ぶ必要はない。いつもの仕事の裏側でAIが動き、使うほど会社を知る。AIを導入した、その先へ。
                </p>
              </div>

              {/* where we are in the six beats — pinned screens only */}
              <ol className="wv-os__index" aria-hidden="true">
                {companyOsSteps.map((step) => (
                  <li key={step.tag} className={step.human ? "is-human" : undefined}>
                    {step.tag.replace(" / ", " ")}
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </section>

        {/* 3. What we do — 三つの実践 */}
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
                  <div className="wv-practice__links">
                    <a className="wv-link" href={item.href}>
                      {item.link} <Arrow />
                    </a>
                    {"secondHref" in item && (
                      <a className="wv-link" href={item.secondHref}>
                        {item.secondLink} <Arrow />
                      </a>
                    )}
                  </div>
                </article>
              ))}
            </div>
            <p className="wv-practice__loop">
              受託・共同開発 → 現場の理解と信頼 → 組織・業務改善とAI駆動開発の支援 → Company OSの導入・展開 → 次の開発Projectへ
            </p>
          </div>
        </section>

        {/* 4. Origin + Purpose — 名前の由来が問いを立て、Purposeが答える */}
        <section className="wv-section wv-origin" id="origin" data-ground="charcoal" data-blend-up="paper2" aria-labelledby="wv-origin-heading">
          <div className="wv-inner wv-origin__grid">
            <div>
              <CordMark className="wv-origin__mark" title="CordMarkのマーク" />
              <p className="wv-label">Origin</p>
              <h2 className="wv-h2" id="wv-origin-heading">
                一万年前、人は余った時間で、
                <br />
                <span className="wv-nowrap">土器に縄目を刻んだ。</span>
              </h2>
              <p className="wv-lead">
                縄文時代は、自然資源に恵まれ、人々が自分たちの意思で暮らしをつくっていた時代として語られます。CordMarkという名前は、その土器に残る縄目(cord
                mark)に由来します。私たちがそこに見るのは、過去の理想化ではなく、豊かな資源を人間の豊かな暮らしへつなげた、豊かさの原型です。AIが生む余力で、私たちは何を刻むのか。
              </p>
            </div>
            <div className="wv-origin__purpose">
              <p className="wv-label">Purpose</p>
              <p className="wv-origin__statement">
                テクノロジーによる
                <br />
                物質的な充足を、
                <br />
                精神的な豊かさへ還元する。
              </p>
              <p>
                生産力が大きくなったとき、その力を仕事量の拡大だけに使えば、物質的な充足が増えても、精神的な豊かさにつながるとは限りません。技術が生む余力を、人が考え、決め、創造し、他者と関わる時間へ戻す。それが、CordMarkの存在理由です。
              </p>
            </div>
          </div>
        </section>

        {/* 5. Two phases — 何を刻むのか、への答え。Phase 2は/beyondへ */}
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

        {/* 6. Contact — 対話へ */}
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
