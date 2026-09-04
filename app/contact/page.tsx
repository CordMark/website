import type { Metadata } from "next";
import { Noto_Sans_JP, Noto_Serif_JP } from "next/font/google";
import { Footer } from "../Footer";
import { QueryFormStatus } from "../FormStatus";
import { LoadingSubmitButton } from "../LoadingSubmitButton";
import { GroundWatch } from "../home/GroundWatch";
import { RevealWatch } from "../home/RevealWatch";
import { ServiceGuideDownload } from "./ServiceGuideDownload";
import "../home/home.css";
import "../wv-page.css";
import "./contact-page.css";

const serif = Noto_Serif_JP({ subsets: ["latin"], weight: ["300", "400"], variable: "--wv-serif", display: "swap" });
const sans = Noto_Sans_JP({ subsets: ["latin"], weight: ["400", "500", "700"], variable: "--wv-sans", display: "swap" });

const pageTitle = "お問い合わせ | CordMark";
const pageDescription =
  "CordMarkへのお問い合わせページです。Company OS、AI駆動開発支援、講演・研修、受託・共同開発に関するご相談を受け付けています。";

export const metadata: Metadata = {
  title: pageTitle,
  description: pageDescription,
  openGraph: {
    title: pageTitle,
    description: pageDescription,
    images: [{ url: "/og.png", width: 1200, height: 630, alt: pageTitle }],
  },
  twitter: {
    card: "summary_large_image",
    title: pageTitle,
    description: pageDescription,
    images: ["/og.png"],
  },
};

const consultationOptions = [
  "Company OS",
  "AI駆動開発支援",
  "講演・研修",
  "受託・共同開発",
  "まだ決まっていない・相談しながら整理したい",
];

/** 他ページの「相談する」から届く ?interest=。相談テーマを先に埋めておく */
const interestToOption: Record<string, string> = {
  os: "Company OS",
  aid: "AI駆動開発支援",
  talk: "講演・研修",
  anc: "Company OS",
  dev: "受託・共同開発",
};

/** 本文の例文。選ばれたテーマに合わせる。テーマ未選択なら支援の例 */
const messageExamples: Record<string, string> = {
  "Company OS": "例）開発は速くなったが、判断待ちで止まることが増えた。まず一つの部門で試せるか相談したい。",
  "AI駆動開発支援": "例）開発チームでAIツールを使い始めたが、個人利用に留まっている。進め方から相談したい。",
  "講演・研修": "例）経営層と開発チームに向けて、AIで何ができるかを話してほしい。人数と時期は未定。",
  "受託・共同開発": "例）つくりたいものの構想はあるが、仕様はまだ固まっていない。要件定義から相談したい。",
};
const defaultMessageExample = messageExamples["AI駆動開発支援"];

function Arrow() {
  return (
    <svg viewBox="0 0 16 16" aria-hidden="true">
      <path d="M2.5 8h10" />
      <path d="m8.5 4 4 4-4 4" />
    </svg>
  );
}

type ContactPageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export default async function ContactPage({ searchParams }: ContactPageProps) {
  const params = await searchParams;
  const rawInterest = params.interest;
  const interest = Array.isArray(rawInterest) ? rawInterest[0] : rawInterest;
  const selectedConsultation = (interest && interestToOption[interest]) ?? "";
  const messageExample = messageExamples[selectedConsultation] ?? defaultMessageExample;

  return (
    <div className={`wv wv-page wv-ct ${serif.variable} ${sans.variable}`}>
      <GroundWatch />
      <RevealWatch />
      <main id="top" className="site-main">
        {/* 扉 = フォーム。開いた画面に、書く場所がある */}
        <section className="wv-section wv-ct-hero" id="contact" data-ground="night" aria-labelledby="ct-heading">
          <div className="wv-inner wv-ct-grid">
            <div className="wv-ct-copy" data-reveal>
              <p className="wv-label">Contact</p>
              <h1 className="wv-h1" id="ct-heading">
                <span className="wv-nowrap">まだ言葉にならない、</span>
                <br />
                <span className="wv-nowrap">その手前から。</span>
              </h1>
              <p className="wv-lead">
                開発のこと、組織のこと、AIとの働き方のこと。講演や研修のご依頼も、ここから。テーマが決まっていなくて構いません。現状を伺い、最初の一歩を一緒に整理します。
              </p>
              <p className="wv-ct-mail">
                フォームを使わない場合は、
                <a href="mailto:info@cordmark.co.jp">info@cordmark.co.jp</a>
                へ直接お送りください。
              </p>

            </div>

            <div className="wv-ct-panel" data-reveal="2">
              <p className="wv-ct-panel__label">
                <span>Form</span>
                <span>五つの項目で届きます</span>
              </p>
              <form className="wv-form wv-ct-form" action="/api/contact" method="post" aria-labelledby="ct-heading">
                <input type="hidden" name="formType" value="general" />
                <input type="hidden" name="redirectTo" value="/contact#contact" />
                <QueryFormStatus
                  successMessage="送信しました。担当者より2営業日以内を目安にご連絡いたします。"
                  errorMessage="送信できませんでした。時間をおいて再度お試しください。"
                />
                <div className="wv-field">
                  <label htmlFor="company">
                    会社名 <span className="wv-req">必須</span>
                  </label>
                  <input id="company" name="company" type="text" placeholder="例）CordMark株式会社" required />
                </div>
                <div className="wv-field">
                  <label htmlFor="name">
                    氏名 <span className="wv-req">必須</span>
                  </label>
                  <input id="name" name="name" type="text" placeholder="例）山田 太郎" required />
                </div>
                <div className="wv-field">
                  <label htmlFor="email">
                    メールアドレス <span className="wv-req">必須</span>
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="例）taro.yamada@cordmark.co.jp"
                    required
                  />
                </div>
                <fieldset className="wv-check wv-ct-theme">
                  <legend>
                    相談テーマ <span className="wv-req">必須</span>
                  </legend>
                  <div className="wv-check__options">
                    {consultationOptions.map((option) => (
                      <label key={option}>
                        <input
                          type="radio"
                          name="interest-area"
                          value={option}
                          defaultChecked={option === selectedConsultation}
                          required
                        />
                        {option}
                      </label>
                    ))}
                  </div>
                </fieldset>
                <div className="wv-field wv-field--wide">
                  <label htmlFor="message">相談したいこと・現在の状況</label>
                  <textarea
                    id="message"
                    name="message"
                    maxLength={500}
                    placeholder={messageExample}
                  />
                  <span className="wv-ct-counter">500文字まで</span>
                </div>
                <div className="wv-ct-actions">
                  <LoadingSubmitButton className="wv-submit">
                    送信する <Arrow />
                  </LoadingSubmitButton>
                  <p className="wv-note">
                    依頼内容も予算も、決まっている必要はありません。2営業日以内を目安にご返信します。
                    <br />
                    ご入力いただいた情報は、<a href="/privacy-policy">プライバシーポリシー</a>
                    に基づき管理します。
                  </p>
                </div>
              </form>
            </div>

          </div>
        </section>

        {/* 資料 — 紙の帯、一画面に収める */}
        <section
          className="wv-section wv-ct-guide"
          id="service-guide"
          data-ground="paper"
          aria-labelledby="ct-guide-heading"
        >
          <div className="wv-inner wv-ct-grid wv-ct-grid--guide">
            <div data-reveal>
              <p className="wv-label">Service Guide</p>
              <h2 className="wv-h2" id="ct-guide-heading">
                先に、資料で。
              </h2>
              <p className="wv-lead">
                <span className="wv-nowrap">サービス資料のダウンロードURLを、</span>
                <span className="wv-nowrap">メールでお送りします。</span>
              </p>
            </div>
            <ServiceGuideDownload />
          </div>
        </section>
      </main>

      <Footer mark />
    </div>
  );
}
