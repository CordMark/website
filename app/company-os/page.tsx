import type { Metadata } from "next";
import { Noto_Sans_JP, Noto_Serif_JP } from "next/font/google";
import { Footer } from "../Footer";
import { RevealWatch } from "../home/RevealWatch";
import "../home/home.css";
import "../wv-page.css";
import "./cos-page.css";

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

const pageTitle = "Company OS | CordMark";
const pageDescription =
  "現場を止めない。重要な判断を、見失わない。Company OSは、会社の意思と日々の仕事をつなぐCordMarkの主要商品です。営業も、エンジニアも、PMも、経営者も、いつもの言葉で聞ける。";

export const metadata: Metadata = {
  title: pageTitle,
  description: pageDescription,
  openGraph: {
    title: pageTitle,
    description: pageDescription,
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "Company OS | CordMark",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: pageTitle,
    description: pageDescription,
    images: ["/og.png"],
  },
};

/**
 * 四つの立場、四つの場面。いままでは何をしていたか、Company OSでは何が起きるか。
 * ヒアリングで刺さっている場面を、そのまま書く。仕組みの説明は書かない。
 */
const scenes = [
  {
    num: "01",
    who: "営業",
    title: "顧客の問いに、その場で答えられる。",
    before:
      "顧客から「このデータ、いまどうなっていますか」と聞かれる。エンジニアに頼み、スクリプトを書いて実行してもらい、結果を訳して返す。あるいは仕様書を読み解いて答える。返事は数日後になる。",
    after:
      "自然言語で聞く。AIがシステムの仕様とデータを確認し、根拠付きで答える。エンジニアの手は止まらず、顧客への返事は当日に戻る。聞けることと変えられることは、分けたまま。",
  },
  {
    num: "02",
    who: "エンジニア",
    title: "速くなった開発を、判断待ちで止めない。",
    before:
      "実装はAIで爆速になった。それでも、決める人の返事が遅くて開発が止まる。状態はExcelやタスク管理ツールに散らばり、開発の量が増えるほど、どこまで進んで次に何をするのかが追えなくなる。",
    after:
      "決めてほしいことは、AIが説明を付けて決める人へ届ける。答える側も楽になるから、返事が速く戻る。進み具合はAIの管理下にあり、状態の更新はしなくていい。いまの状況と次にやることが、すぐに分かる。",
  },
  {
    num: "03",
    who: "PM",
    title: "問いを運ぶ仕事が、なくなる。",
    before:
      "営業から届く顧客の質問をエンジニアに投げ、エンジニアから来る仕様の質問を顧客に近い営業に投げ、返ってこない答えを催促する。毎日の時間の多くが、問いを運ぶことに消える。プロジェクトの現在地は、聞いて回らないと分からない。",
    after:
      "問いは、答えられる人へ背景を連れて直接届き、返事がなければAIが催促する。PMは運ぶのをやめ、決めることに時間を使う。プロジェクトの現在地は常に追えて、いま開発を止めているものがどこにあるかが、すぐに分かる。",
    human: true,
  },
  {
    num: "04",
    who: "経営者",
    title: "整えられた報告を、待たなくていい。",
    before: "現場の状況は、報告になってから届く。「できています」の裏で育つ問題を、直前になって知る。",
    after:
      "重要な判断が、決定の経緯と現場の言葉のまま届く。決まらずに止まっている問いも見える。日々の決定はPMが行い、経営は知らされる側にいる。",
  },
];

/** 使い方が広がっても、動かないもの */
const boundaries = [
  {
    title: "決めるのは、人。",
    body: "AIは答えられることに答え、決めるべき人へ材料を揃えて渡す。判断そのものは委ねない。",
  },
  {
    title: "聞くことと、変えることは、分けられる。",
    body: "誰でも聞ける。システムとデータを変えられるのは、会社が許した役割だけ。実行がAIに移っていっても、誰に許すかを決めるのは会社のまま。",
  },
  {
    title: "答えるのは、権限と機密の範囲で。",
    body: "誰が何を見てよいかは会社が決め、AIはその中で答える。",
  },
];

/** AIを「使わせる」から、仕事の裏側で「働かせる」へ。左が配る側、右がCompany OS */
const shifts = [
  { from: "ツールを全員に配る", to: "仕事の裏側で、AIを働かせる" },
  {
    from: "費用が、人数分積み上がる",
    to: "使うほど、会社にコンテキストが溜まる",
  },
  {
    from: "使いこなしが、個人のスキルに依存する",
    to: "普段の仕事をするだけで、AIと一緒に進む",
  },
  {
    from: "コンテキストが、個人のチャットに散る",
    to: "溜まるほど会社を理解して、さらに使われる",
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

export default function CompanyOsPage() {
  return (
    <div className={`wv wv-page ${serif.variable} ${sans.variable}`}>
      <RevealWatch />
      <main id="top" className="site-main">
        {/* 扉 — 何の章か、どこに属するか、事実の帯 */}
        <section className="wv-section wv-cos-hero" data-ground="paper" aria-labelledby="cos-heading">
          <div className="wv-inner">
            <div className="wv-page__opening">
              <div className="wv-page__hero" data-reveal>
                <p className="wv-label">Company OS</p>
                <h1 className="wv-h1" id="cos-heading">
                  <span className="wv-nowrap">現場を止めない。</span>
                  <br />
                  <span className="wv-nowrap">重要な判断を、見失わない。</span>
                </h1>
              </div>
              <div className="wv-page__door" data-reveal="2">
                <aside className="wv-chapter" aria-label="この章の位置">
                  <p className="wv-chapter__num">03</p>
                  <p className="wv-chapter__role">PRODUCT</p>
                </aside>
                <p className="wv-lead">
                  Company
                  OSは、会社の意思と日々の仕事をつなぐCordMarkの主要商品です。営業も、エンジニアも、PMも、経営者も、いつもの言葉で聞ける。答えられることはAIが答え、決めるべきことは決める人へ届き、決まったことはその日の仕事に戻る。
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 節1 場面 — この章の唯一の闇。四つの立場が、いままでとこれからを一行ずつ */}
        <section className="wv-section wv-cos-scenes" data-ground="charcoal" aria-labelledby="cos-scenes-heading">
          <div className="wv-inner">
            <div data-reveal>
              <p className="wv-label">Scenes</p>
              <h2 className="wv-h2" id="cos-scenes-heading">
                <span className="wv-nowrap">四つの立場で、</span>
                <br />
                <span className="wv-nowrap">仕事はこう変わる。</span>
              </h2>
            </div>
            <ol className="wv-cos-scene">
              {scenes.map((scene) => (
                <li key={scene.num} className={scene.human ? "is-human" : undefined} data-reveal>
                  <span className="wv-cos-scene__knot" aria-hidden="true" />
                  <p className="wv-cos-scene__num">{scene.num}</p>
                  <div className="wv-cos-scene__main">
                    <span className="wv-cos-scene__who">{scene.who}</span>
                    <h3>{scene.title}</h3>
                  </div>
                  <div className="wv-cos-scene__side">
                    <p className="wv-cos-scene__before">
                      <i>いままで</i>
                      {scene.before}
                    </p>
                    <p className="wv-cos-scene__after">
                      <i>Company OSでは</i>
                      {scene.after}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* 節2 動かないもの — 三つ。使い方が広がっても変わらない線 */}
        <section className="wv-section wv-cos-bounds" data-ground="paper" aria-labelledby="cos-bounds-heading">
          <div className="wv-inner">
            <div data-reveal>
              <p className="wv-label">Boundaries</p>
              <h2 className="wv-h2" id="cos-bounds-heading">
                <span className="wv-nowrap">誰でも聞ける。</span>
                <br />
                <span className="wv-nowrap">それでも、動かない線がある。</span>
              </h2>
            </div>
            <ol className="wv-index" data-reveal="2">
              {boundaries.map((item, i) => (
                <li className="wv-index__row" key={item.title}>
                  <p className="wv-index__num">0{i + 1}</p>
                  <div className="wv-index__main">
                    <h3>{item.title}</h3>
                  </div>
                  <div className="wv-index__side">
                    <p>{item.body}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* 節3 AIネイティブ — 配るのではなく、裏側で働かせる。四行の対照。
            行ごとに、左の文 → 罫が右へ引かれ銅の矢印に → 右の文、の順で現れ、左は退く */}
        <section className="wv-section wv-cos-native" data-ground="paper2" aria-labelledby="cos-native-heading">
          <div className="wv-inner">
            <div className="wv-cos-native__head" data-reveal>
              <p className="wv-label">AI-native</p>
              <h2 className="wv-h2 wv-lines" id="cos-native-heading">
                <span className="wv-line">
                  <span>全員がAIを学ぶ必要はない。</span>
                </span>
                <span className="wv-line">
                  <span>
                    <span className="wv-nowrap">いつもの仕事の裏側で、</span>
                    <span className="wv-nowrap">AIが動く。</span>
                  </span>
                </span>
              </h2>
              <p className="wv-lead wv-cos-native__lead">
                質問、確認、判断。普段の仕事をするだけで、裏側のAIが文脈を整え、必要な支援を届ける。使う人のリテラシーに依存しません。
              </p>
            </div>

            <div className="wv-cos-shift">
              <p className="wv-cos-shift__row wv-cos-shift__labels" aria-hidden="true">
                <span className="wv-cos-shift__from">Visible tool</span>
                <span className="wv-cos-shift__to">Invisible AI</span>
              </p>
              <ol className="wv-cos-shift__rows">
                {shifts.map((item, i) => (
                  <li className="wv-cos-shift__row" key={item.from} data-reveal>
                    <span className="wv-cos-shift__num">0{i + 1}</span>
                    <span className="wv-cos-shift__from">{item.from}</span>
                    <span className="wv-cos-shift__tie" aria-hidden="true">
                      <Arrow />
                    </span>
                    <span className="wv-cos-shift__to">{item.to}</span>
                  </li>
                ))}
              </ol>
              <div className="wv-cos-shift__notes" data-reveal>
                <p className="wv-cos-native__note">
                  <i>Cost reference</i>
                  Claude Codeを全社員に配ると、約100ドル/人・月。700名で年1億円を超える。
                  <small>概算・1ドル150円換算</small>
                </p>
                <p className="wv-cos-native__note is-asset">
                  <i>Organizational asset</i>
                  溜まったコンテキストは、次に自動化できる会社の資産になる。
                </p>
              </div>
            </div>

            <div className="wv-cos-native__foot" data-reveal>
              <p className="wv-cos-native__close wv-lines">
                <span className="wv-line">
                  <span>AIを道具として持つ会社から、</span>
                </span>
                <span className="wv-line">
                  <span>AIを中枢に据えて動く会社へ。</span>
                </span>
                <span className="wv-line">
                  <span>
                    <span className="wv-nowrap">問いと判断と実行の流れが、</span>
                    <span className="wv-nowrap">根本から変わる。</span>
                  </span>
                </span>
                <span className="wv-line">
                  <span>それが、AIネイティブ化です。</span>
                </span>
              </p>
              <div className="wv-next wv-next--foot">
                <div>
                  <p className="wv-next__num">01</p>
                  <span className="wv-next__role">DELIVERY</span>
                </div>
                <div className="wv-next__body">
                  <p className="wv-next__label">Next</p>
                  <h2>
                    <span className="wv-nowrap">現場で得た知見は、</span>
                    <span className="wv-nowrap">次の開発へ戻る。</span>
                  </h2>
                  <p>
                    Company
                    OSの設計は、受託・共同開発の現場で見たものから育ちます。三つの実践は一つの輪で、ここから最初の章へ戻ります。
                  </p>
                  <p className="wv-next__link">
                    <a className="wv-link" href="/service/development">
                      受託・共同開発 <Arrow />
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Contact — 闇でページを閉じる。Footerがそのまま続く */}
        <section
          className="wv-section wv-page__contact"
          id="contact"
          data-ground="night"
          aria-labelledby="cos-contact-heading"
        >
          <div className="wv-inner">
            <div data-reveal>
              <p className="wv-label">Contact</p>
              <h2 className="wv-h2 wv-h2--xl" id="cos-contact-heading">
                <span className="wv-nowrap">いまの会社の会話から、</span>
                <br />
                <span className="wv-nowrap">一緒に見直しましょう。</span>
              </h2>
            </div>
            <div className="wv-contact__row" data-reveal="2">
              <p className="wv-lead">
                何から話すかが決まっていなくて構いません。どこで問いが止まり、何が経営まで届いていないかを伺い、最初の一歩を一緒に整理します。
              </p>
              <a className="wv-contact__cta" href="/contact?interest=os">
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

      <Footer mark />
    </div>
  );
}
