import type { Metadata } from "next";
import { QueryFormStatus } from "../FormStatus";
import { Footer } from "../Footer";
import { LoadingSubmitButton } from "../LoadingSubmitButton";
import { ServiceGuideDownload } from "./ServiceGuideDownload";

export const metadata: Metadata = {
  title: "お問い合わせ | CordMark",
  description:
    "CordMarkへのお問い合わせページです。AI Native化、AI駆動開発、AI Agent / Workflowに関するご相談を受け付けています。",
};

const consultationOptions = [
  "AI-Driven Development",
  "AI Native Company Transformation",
  "まだ決まっていない・相談しながら整理したい",
];

function RequiredBadge() {
  return <span className="contact-required">必須</span>;
}

function ContactSelect({
  id,
  label,
  options,
  className = "",
  required = false,
}: {
  id: string;
  label: string;
  options: string[];
  className?: string;
  required?: boolean;
}) {
  return (
    <div className={`contact-field${className ? ` ${className}` : ""}`}>
      <label htmlFor={id}>
        {label} {required && <RequiredBadge />}
      </label>
      <select id={id} name={id} defaultValue="" required={required}>
        <option value="" disabled>
          選択してください
        </option>
        {options.map((option) => (
          <option key={option}>{option}</option>
        ))}
      </select>
    </div>
  );
}

export default function ContactPage() {
  return (
    <>
      <main id="top" className="contact-page contact-v2 site-main">
        <section className="contact-hero" aria-labelledby="contact-heading">
          <div className="contact-hero__content">
            <p className="contact-kicker">LET&apos;S TALK</p>
            <h1 id="contact-heading">
              <span>まずは、課題の</span>
              <span>整理から話しましょう。</span>
            </h1>
            <p>
              テーマが固まっていなくても大丈夫です。
              <br />
              現状を伺い、最初の一歩を一緒に整理します。
            </p>
          </div>
          <aside className="contact-v2__promise" aria-label="ご相談について">
            <p>FIRST CONVERSATION</p>
            <strong>無料相談</strong>
            <span>担当者より2営業日以内にご連絡します</span>
          </aside>
        </section>

        <section className="contact-form-section" id="contact" aria-labelledby="contact-form-heading">
          <div className="contact-section-head">
            <p className="contact-kicker">CONTACT FORM</p>
            <h2 id="contact-form-heading">5項目で送信できます。</h2>
            <p>
              まだ具体的な依頼内容や予算が決まっていなくても構いません。
              <br />
              分かる範囲でお聞かせください。
            </p>
          </div>

          <form className="contact-form" action="/api/contact" method="post">
            <input type="hidden" name="formType" value="general" />
            <input type="hidden" name="redirectTo" value="/contact#contact" />
            <QueryFormStatus
              successMessage="送信しました。担当者より2営業日以内を目安にご連絡いたします。"
              errorMessage="送信できませんでした。時間をおいて再度お試しください。"
            />
            <div className="contact-field">
              <label htmlFor="company">
                会社名 <RequiredBadge />
              </label>
              <input id="company" name="company" type="text" placeholder="例）CordMark株式会社" required />
            </div>

            <div className="contact-field">
              <label htmlFor="name">
                氏名 <RequiredBadge />
              </label>
              <input id="name" name="name" type="text" placeholder="例）山田 太郎" required />
            </div>

            <div className="contact-field contact-field--full">
              <label htmlFor="email">
                メールアドレス <RequiredBadge />
              </label>
              <input
                id="email"
                name="email"
                type="email"
                placeholder="例）taro.yamada@cordmark.co.jp"
                required
              />
            </div>

            <ContactSelect
              id="interest-area"
              label="相談テーマ"
              options={consultationOptions}
              className="contact-field--full"
              required
            />

            <div className="contact-field contact-field--full contact-field--textarea">
              <label htmlFor="message">相談したいこと・現在の状況</label>
              <textarea
                id="message"
                name="message"
                maxLength={500}
                placeholder="例）開発チームでAIツールを使い始めたが、個人利用に留まっている。進め方から相談したい。"
              />
              <span className="contact-counter">500文字まで</span>
            </div>

            <LoadingSubmitButton className="contact-submit">
              無料相談を申し込む <span aria-hidden="true">→</span>
            </LoadingSubmitButton>

            <p className="contact-policy">
              ご入力いただいた情報は、
              <a href="/privacy-policy">プライバシーポリシー</a>
              に基づき適切に管理いたします。
            </p>
          </form>
        </section>

        <section className="contact-next-step" id="service-guide" aria-label="資料請求">
          <div className="contact-next-step__icon">
            <img src="/assets/contact-consultation-chat.webp" alt="" aria-hidden="true" loading="lazy" decoding="async" />
          </div>
          <div className="contact-next-step__copy">
            <h2>まずは壁打ち・ご相談だけでも構いません</h2>
            <p>
              課題が明確でなくても大丈夫です。貴社の状況をヒアリングし、
              <br />
              最適な進め方をご提案します。
            </p>
          </div>
          <ServiceGuideDownload />
        </section>
      </main>

      <Footer />
    </>
  );
}
