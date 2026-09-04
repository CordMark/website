import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Footer } from "../Footer";
import { LaplaceFeature } from "../LaplaceFeature";

export const metadata: Metadata = {
  title: "About | CordMark",
  description:
    "CordMarkは、テクノロジーによる物質的な充足を精神的な豊かさへ還元することを目指す会社です。主要商品Company OSのほか、組織・業務改善、AI駆動開発支援、受託・共同開発を行います。",
};

const principles = [
  {
    number: "01",
    title: "面白さを見失わない",
    body: "仕事も、その先の営みも、人が面白いと感じることから離れない。",
  },
  {
    number: "02",
    title: "遠くを見据えて今を決める",
    body: "AIの先にある人の生き方から逆算して、今日の判断を選ぶ。",
  },
  {
    number: "03",
    title: "摩擦を価値に変える",
    body: "異なる経験と文脈のずれを消さず、判断の材料として残す。",
  },
  {
    number: "04",
    title: "確かさを積み上げる",
    body: "自分たちの会社で先に動かし、顧客の現場で確かめたものだけを広げる。",
  },
];

const horizons = [
  {
    number: "01",
    period: "PHASE 1 · AI-NATIVE",
    title: "意思と実行を、つなぐ。",
    body: "会社の意思決定と日々の仕事をつなぎ、人が判断と創造に集中できる状態を、ソフトウェア開発の現場からつくる。Company OS、組織・業務改善の支援、受託・共同開発。",
  },
  {
    number: "02",
    period: "PHASE 2 · BEYOND",
    title: "人に残る営みを、形にする。",
    body: "技術が行き渡ったあとにも、人が自ら行う価値のある営みがある。仲間の心理を読み合う2v2の戦略ボードゲームLaplace、社会と人間の先を考えるメディアDotCraft。",
  },
];

const companyInfo: Array<[string, ReactNode]> = [
  ["会社名", "CordMark株式会社"],
  ["代表者", "橋本武士、山本圭亮"],
  ["設立", "2026年7月"],
  ["資本金", "80万円"],
  [
    "所在地",
    <>
      神奈川県横浜市
      <span className="about-info-note">
        ※詳細な所在地は、個人情報保護法その他法令に基づき必要な場合、本人確認のうえ遅滞なく開示します。
      </span>
    </>,
  ],
  [
    "事業内容",
    "Company OSの企画・開発・展開、組織・業務改善支援、AI駆動開発の導入・教育・伴走、受託・共同開発、ボードゲーム・メディア等のプロダクト開発・運営",
  ],
  ["お問い合わせ", "info@cordmark.co.jp"],
];

export default function AboutPage() {
  return (
    <>
      <main id="top" className="about-page site-main">
        <section className="about-hero" aria-labelledby="about-heading">
          <div className="about-hero__copy">
            <p className="about-kicker">About CordMark</p>
            <h1 id="about-heading">
              <span>余力を、人へ戻す。</span>
              <span>その先の営みまで、考える。</span>
            </h1>
            <p className="about-hero__lead">
              CordMarkは、テクノロジーによる物質的な充足を、
              <br />
              精神的な豊かさへ還元することを目指す会社です。
            </p>
            <p>
              AIで生産力が上がったとき、その力を仕事量の拡大だけに使うのではなく、
              <br />
              人が考え、決め、創造し、他者と関わる時間へ戻す。
              <br />
              会社の意思と日々の仕事をつなぐCompany OSを主要商品に、ソフトウェア開発の現場からそれを始めています。
            </p>
          </div>
          <div className="about-hero__visual" aria-hidden="true">
            <img src="/assets/about-hero.webp" alt="" loading="eager" fetchPriority="high" decoding="async" />
          </div>
        </section>

        <section id="philosophy" className="about-philosophy" aria-labelledby="about-philosophy-heading">
          <div className="about-philosophy__inner">
            <p className="about-kicker">Philosophy</p>
            <h2 id="about-philosophy-heading">
              <span>AIを足すのではなく、</span>
              <span>仕事の形を変える。</span>
              <span className="about-philosophy-desktop-line">
                決めるのは、人のまま。
              </span>
              <span className="about-philosophy-mobile-line">決めるのは、</span>
              <span className="about-philosophy-mobile-line">人のまま。</span>
            </h2>
            <div className="about-philosophy__body">
              <p>
                ツールを一つ増やしても、会社は速くなりません。
                <br />
                変わるべきなのは、問いが答えに届き、判断が実行に届くまでの、仕事の流れそのものです。
              </p>
              <p>
                AIは、人の意思を現実へ運ぶ力であり、判断に置き換わるものではありません。
                <br />
                誰が、何を根拠に決めたかが残り、次の判断の土台になる。
                <br />
                その仕組みを自分たちの会社でまず動かし、
                <br />
                顧客の現場に合わせて持ち込みます。
              </p>
            </div>

            <div className="about-principles" aria-label="CordMarkの行動指針">
              {principles.map((principle) => (
                <article className="about-principle" key={principle.number}>
                  <span>{principle.number}</span>
                  <h3>{principle.title}</h3>
                  <p>{principle.body}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="about-future" aria-labelledby="about-future-heading">
          <div className="about-future__intro">
            <p className="about-kicker">Two Horizons</p>
            <h2 id="about-future-heading">社会をAIネイティブに。その先の、人の営みを考える。</h2>
            <p>
              一万年前、人は余った時間で、土器に縄目を刻んだ。CordMarkという名は、その縄目(cord mark)に由来します。豊かな資源を人間の豊かな暮らしへつなげた、豊かさの原型。AIが生む余力で、私たちは何を刻むのか。その問いを、二つの段階で考えています。
            </p>
          </div>
          <div className="about-horizons">
            {horizons.map((horizon) => (
              <article key={horizon.number}>
                <div>
                  <span>{horizon.number}</span>
                  <p>{horizon.period}</p>
                </div>
                <h3>{horizon.title}</h3>
                <p>{horizon.body}</p>
              </article>
            ))}
          </div>
          <LaplaceFeature context="about" />
        </section>

        <section id="company" className="about-company" aria-labelledby="about-company-heading">
          <p className="about-kicker">Company</p>
          <h2 id="about-company-heading">Company Information</h2>
          <dl className="about-info-table">
            {companyInfo.map(([label, value]) => (
              <div key={label}>
                <dt>{label}</dt>
                <dd>
                  {label === "お問い合わせ" && typeof value === "string" ? (
                    <a href={`mailto:${value}`}>{value}</a>
                  ) : (
                    value
                  )}
                </dd>
              </div>
            ))}
          </dl>
          <div className="about-company__cta">
            <p>何をつくるかから、一緒に考えましょう。</p>
            <a className="button button--dark about-company__button" href="/contact">
              相談する <span aria-hidden="true">→</span>
            </a>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
