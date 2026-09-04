import { Noto_Sans_JP, Noto_Serif_JP } from "next/font/google";
import { Footer } from "./Footer";
import { CompanyOsCanvas } from "./home/CompanyOsCanvas";
import { CordMark } from "./home/CordMark";
import { GroundWatch } from "./home/GroundWatch";
import { HeroCord } from "./home/HeroCord";
import { CordImpression } from "./home/CordImpression";
import { RevealWatch } from "./home/RevealWatch";
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
    who: "営業",
    title: "顧客の問いに、その場で答えられる。",
    body: "「これ、できましたっけ」をエンジニアに聞かなくていい。仕様と実装を知るAIが根拠付きで答え、顧客への返事は当日に戻る。開発の手は止まらない。",
  },
  {
    tag: "02 / ASK",
    who: "エンジニア",
    title: "決めてほしいことが、背景ごと届く。",
    body: "なぜ必要か、何が決まっていないか、選ぶと何が起きるか。AIが添えて、決める人へ直接届ける。説明を受け直す往復がなくなる。",
  },
  {
    tag: "03 / DECIDE",
    who: "PM",
    title: "問いを運ばず、決めることに時間を使う。",
    body: "営業の知る顧客の事情まで揃った状態で、PMが決める。誰が何を根拠に決めたかが決定と一緒に残り、経営には知らされる。",
    human: true,
  },
  {
    tag: "04 / ACT",
    who: "エンジニア",
    title: "決定は、その日の仕事に戻る。",
    body: "決定と理由が仕様とタスクになり、止まっていた開発が動き出す。進み具合はAIが追うから、状態の更新はしなくていい。",
  },
  {
    tag: "05 / VISIBILITY",
    who: "経営",
    title: "整えられた報告を、待たなくていい。",
    body: "重要な判断が、決定の経緯と現場の言葉のまま届く。決まらずに止まっている問いも見える。「できています」の裏で育つ問題を、手遅れになる前に知る。",
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
    href: "/service/development",
    link: "開発の相談をする",
    hop: "→ 02  現場の理解と信頼",
  },
  {
    index: "SUPPORT",
    title: "組織・業務改善、AI駆動開発の導入・教育・伴走",
    body: "開発組織を含む業務の進め方を診断し、ドキュメント、計画、レビュー、検証を含む開発プロセスをAI前提に組み替える。",
    href: "/service/support#dev",
    link: "AI駆動開発支援",
    secondHref: "/service/support#company",
    secondLink: "組織・業務改善支援",
    hop: "→ 03  知見の還元",
  },
  {
    index: "PRODUCT",
    title: "Company OSの企画・開発・展開",
    body: "会社の意思と日々の仕事をつなぐProductをつくる。顧客の現場で得た知見を、契約と機密性を守った範囲でProductへ還元する。",
    href: "/company-os",
    link: "Company OSについて",
    hop: "↺ 01  知見は、次の開発Projectへ",
    back: true,
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
      <RevealWatch />
      <main id="top" className="site-main">
        {/* 1. Hero — 人の意思を主語にする。Scrollで糸が編まれる */}
        <section className="wv-hero" data-ground="night" aria-labelledby="wv-hero-heading">
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
        <section className="wv-os wv-act" id="company-os" data-ground="night" aria-labelledby="wv-os-heading">
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
                      <span className="wv-os__tag">
                        {step.tag}
                        {step.who && <i>{step.who}</i>}
                      </span>
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

        {/* 3. What we do — 三つの実践を三段の索引に。大きな数字と題、右に本文。
            循環は各行末の一行で、03 の行末で 01 へ戻って閉じる */}
        <section className="wv-section wv-services" id="services" data-ground="paper2" aria-labelledby="wv-services-heading">
          <div className="wv-inner">
            <div className="wv-services__head">
              <div data-reveal>
                <p className="wv-label">What We Do</p>
                <h2 className="wv-h2" id="wv-services-heading">
                  三つの実践が、
                  <br />
                  ひとつの循環をつくる。
                </h2>
              </div>
              <p className="wv-lead" data-reveal="2">
                受託・共同開発で顧客の現場を理解し、そこで得た知見を組織・業務改善の支援とCompany OSへ還元する。支援とProductで得た知見は、次の開発Projectへ戻る。三つは別々のサービスではなく、顧客の現実に根ざした新しい働き方をつくる一つの流れです。
              </p>
            </div>
            <div className="wv-practices">
              <ol className="wv-practices__list">
                {practices.map((item, i) => (
                  <li className="wv-practice" key={item.index}>
                    <span className="wv-practice__num">0{i + 1}</span>
                    <div className="wv-practice__main">
                      <span className="wv-practice__role">{item.index}</span>
                      <h3>{item.title}</h3>
                    </div>
                    <div className="wv-practice__side">
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
                      <span className={"back" in item ? "wv-practice__hop is-back" : "wv-practice__hop"}>{item.hop}</span>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </section>

        {/* 4. Origin + Purpose — 土器の縄目 → 問い → 答え、の一筋。文章は最小限、
            見出しと答えは一行ずつ現れ、罫は左から引かれる。説明は /about へ */}
        <section className="wv-section wv-origin" id="origin" data-ground="charcoal" aria-labelledby="wv-origin-heading">
          <CordImpression />
          <div className="wv-inner wv-origin__grid">
            <div className="wv-origin__head" data-reveal>
              <p className="wv-label">
                <CordMark className="wv-origin__mark" title="CordMarkのマーク" />
                Origin
              </p>
              <h2 className="wv-h2 wv-lines" id="wv-origin-heading">
                <span className="wv-line">
                  <span>
                    一万年前、
                    <br className="wv-br-sm" />
                    <span className="wv-nowrap">人は余った時間で、</span>
                  </span>
                </span>
                <span className="wv-line">
                  <span className="wv-nowrap">土器に縄目を刻んだ。</span>
                </span>
              </h2>
            </div>
            <p className="wv-lead wv-origin__body" data-reveal="2">
              縄文の土器に残る縄目、cord mark。豊かな資源を人の豊かな暮らしへつなげた、豊かさの原型です。CordMarkの名前は、そこから来ています。
            </p>
            <div className="wv-origin__purpose" data-reveal="3">
              <p className="wv-label">Purpose</p>
              <p className="wv-origin__question">AIが生む余力で、私たちは何を刻むのか。</p>
              <p className="wv-origin__statement wv-lines">
                <span className="wv-line">
                  <span>
                    テクノロジーによる
                    <br className="wv-br-sm" />
                    <span className="wv-nowrap">物質的な充足を、</span>
                  </span>
                </span>
                <span className="wv-line">
                  <span className="wv-nowrap">精神的な豊かさへ還元する。</span>
                </span>
              </p>
              <div className="wv-origin__aside">
                <p className="wv-origin__ground">技術が生む余力を、人が考え、決め、創造し、他者と関わる時間へ戻す。</p>
                <a className="wv-link" href="/about">
                  考え方を読む <Arrow />
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* 5. Two phases — 二枚の紙を継ぐ。左は紙、右はやや濃い紙、継ぎ目に一本の縦罫。
            見出しの一文が継ぎ目で二つに割れ、継ぎ目が地平線になる */}
        <section className="wv-section wv-horizons" id="horizons" data-ground="paper" aria-labelledby="wv-horizons-heading">
          <h2 className="sr-only" id="wv-horizons-heading">
            社会をAIネイティブに。その先の、人の営みを考える。
          </h2>
          <div className="wv-horizons__field">
            <article className="wv-horizon is-now" data-reveal>
              <p className="wv-label">
                <span>Two Phases</span>
                <span className="wv-horizon__where">NOW</span>
              </p>
              <p className="wv-h2 wv-horizon__title" aria-hidden="true">
                <span className="wv-nowrap">社会を</span>
                <span className="wv-nowrap">AIネイティブに。</span>
              </p>
              <div className="wv-horizon__body">
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
                  <a className="wv-link" href="/service/support#dev">
                    AI駆動開発支援 <Arrow />
                  </a>
                </div>
              </div>
            </article>
            <article className="wv-horizon is-beyond" data-reveal="2">
              <p className="wv-label">
                <span className="wv-horizon__where">BEYOND</span>
              </p>
              <p className="wv-h2 wv-horizon__title" aria-hidden="true">
                <span className="wv-nowrap">その先の、</span>
                <span className="wv-nowrap">人の営みを考える。</span>
              </p>
              <div className="wv-horizon__body">
                <div className="wv-horizon__meta">
                  <span>PHASE 2</span>
                  <span>LAPLACE / DOTCRAFT</span>
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
              </div>
            </article>
          </div>
        </section>

        {/* 6. Contact — Heroと同じ闇でページを閉じる。見出しを大きく、押すものは一つ、
            Mail と Office は下に一行。Footer がそのまま続く */}
        <section className="wv-section wv-contact" id="contact" data-ground="night" aria-labelledby="wv-contact-heading">
          <div className="wv-inner">
            <div data-reveal>
              <p className="wv-label">Contact</p>
              <h2 className="wv-h2 wv-h2--xl" id="wv-contact-heading">
                <span className="wv-nowrap">何をつくるかから、</span>
                <br />
                <span className="wv-nowrap">一緒に考えましょう。</span>
              </h2>
            </div>
            <div className="wv-contact__row" data-reveal="2">
              <p className="wv-lead">
                まだ言葉になっていない構想や問いからで構いません。開発のこと、組織のこと、AIとの働き方のこと。現状を伺い、最初の一歩を一緒に整理します。
              </p>
              <a className="wv-contact__cta" href="/contact">
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

      <Footer homeLinks />
    </div>
  );
}
