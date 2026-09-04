import type { Metadata } from "next";
import { Noto_Sans_JP, Noto_Serif_JP } from "next/font/google";
import { Footer } from "../Footer";
import { QueryFormStatus } from "../FormStatus";
import { LoadingSubmitButton } from "../LoadingSubmitButton";
import { RevealWatch } from "../home/RevealWatch";
import { ServiceGuideDownload } from "./ServiceGuideDownload";
import "../home/home.css";
import "../wv-page.css";
import "./contact-page.css";

const serif = Noto_Serif_JP({ subsets: ["latin"], weight: ["300", "400"], variable: "--wv-serif", display: "swap" });
const sans = Noto_Sans_JP({ subsets: ["latin"], weight: ["400", "500", "700"], variable: "--wv-sans", display: "swap" });

const pageTitle = "お問い合わせ | CordMark";
const pageDescription =
  "CordMarkへのお問い合わせページです。Company OS、AI駆動開発支援、組織・業務改善支援、受託・共同開発に関するご相談を受け付けています。";

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

/** 扉の帯。返す速さと、届く先 */
const facts = [
  { key: "返信", value: <span className="wv-nowrap">2営業日以内を目安</span> },
  {
    key: "Mail",
    value: (
      <a className="wv-ct-mail" href="mailto:info@cordmark.co.jp">
        info@cordmark.co.jp
      </a>
    ),
  },
  { key: "Office", value: <span className="wv-nowrap">神奈川県横浜市</span> },
];

/** 相談の入口。テーマから入る人のための三本 */
const entrances = [
  { label: "AI駆動開発支援", href: "/service/ai-driven-development" },
  { label: "組織・業務改善支援", href: "/service/ai-native-company" },
  { label: "Company OS", href: "/#company-os" },
];

const consultationOptions = [
  "Company OS",
  "AI駆動開発支援",
  "組織・業務改善支援",
  "受託・共同開発",
  "まだ決まっていない・相談しながら整理したい",
];

/** 他ページの「相談する」から届く ?interest=。相談テーマを先に埋めておく */
const interestToOption: Record<string, string> = {
  os: "Company OS",
  aid: "AI駆動開発支援",
  anc: "組織・業務改善支援",
  dev: "受託・共同開発",
};

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

  return (
    <div className={`wv wv-page ${serif.variable} ${sans.variable}`}>
      <RevealWatch />
      <main id="top" className="site-main">
        {/* 扉 — 何から話してよいか、と、テーマから入る道 */}
        <section className="wv-section wv-ct-hero" data-ground="paper" aria-labelledby="ct-heading">
          <div className="wv-inner">
            <div className="wv-page__hero">
              <div className="wv-page__hero-copy" data-reveal>
                <p className="wv-label">Contact</p>
                <h1 className="wv-h1" id="ct-heading">
                  <span className="wv-nowrap">何をつくるかから、</span>
                  <br />
                  <span className="wv-nowrap">一緒に考えましょう。</span>
                </h1>
                <p className="wv-lead">
                  まだ言葉になっていない構想や問いからで構いません。開発のこと、組織のこと、AIとの働き方のこと。現状を伺い、最初の一歩を一緒に整理します。
                </p>
              </div>
              <aside className="wv-chapter wv-ct-entry" data-reveal="2" aria-label="相談の入口">
                <p className="wv-chapter__role">ENTRY</p>
                <p className="wv-ct-entry__title">相談の入口</p>
                <p className="wv-chapter__note">テーマが決まっているなら、こちらから。</p>
                <nav className="wv-chapter__links" aria-label="相談の入口">
                  {entrances.map((entrance) => (
                    <a className="wv-link" key={entrance.href} href={entrance.href}>
                      {entrance.label} <Arrow />
                    </a>
                  ))}
                </nav>
              </aside>
            </div>
            <dl className="wv-facts wv-facts--three" data-reveal="3">
              {facts.map((fact) => (
                <div key={fact.key}>
                  <dt>{fact.key}</dt>
                  <dd>{fact.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        {/* 節1 フォーム — 紙の上の版。罫だけで組む */}
        <section
          className="wv-section wv-ct-form"
          id="contact"
          data-ground="paper2"
          aria-labelledby="ct-form-heading"
        >
          <div className="wv-inner">
            <div data-reveal>
              <p className="wv-label">Form</p>
              <h2 className="wv-h2" id="ct-form-heading">
                五つの項目で、届きます。
              </h2>
              <p className="wv-lead">
                <span className="wv-nowrap">依頼内容も予算も、</span>
                <span className="wv-nowrap">決まっている必要はありません。</span>
              </p>
            </div>
            <form
              className="wv-form wv-form--paper"
              action="/api/contact"
              method="post"
              aria-labelledby="ct-form-heading"
              data-reveal="2"
            >
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
              <div className="wv-field wv-field--half">
                <label htmlFor="interest-area">
                  相談テーマ <span className="wv-req">必須</span>
                </label>
                <select id="interest-area" name="interest-area" defaultValue={selectedConsultation} required>
                  <option value="" disabled>
                    選択してください
                  </option>
                  {consultationOptions.map((option) => (
                    <option key={option}>{option}</option>
                  ))}
                </select>
              </div>
              <div className="wv-field wv-field--wide">
                <label htmlFor="message">相談したいこと・現在の状況</label>
                <textarea
                  id="message"
                  name="message"
                  maxLength={500}
                  placeholder="例）開発チームでAIツールを使い始めたが、個人利用に留まっている。進め方から相談したい。"
                />
                <span className="wv-ct-counter">500文字まで</span>
              </div>
              <p className="wv-note">
                ご入力いただいた情報は、<a href="/privacy-policy">プライバシーポリシー</a>
                に基づき適切に管理いたします。
              </p>
              <LoadingSubmitButton className="wv-submit">
                送信する <Arrow />
              </LoadingSubmitButton>
            </form>
          </div>
        </section>

        {/* 節2 資料 — 短く。先に中身を見たい人へ */}
        <section
          className="wv-section wv-ct-guide"
          id="service-guide"
          data-ground="paper"
          aria-labelledby="ct-guide-heading"
        >
          <div className="wv-inner">
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

        {/* 闇の薄い帯。Footerがそのまま続く */}
        <section className="wv-section wv-ct-close" data-ground="night" aria-label="連絡先">
          <div className="wv-inner">
            <dl className="wv-contact__facts">
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
