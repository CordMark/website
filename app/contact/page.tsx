import type { Metadata } from "next";
import { Footer } from "../Footer";

export const metadata: Metadata = {
  title: "お問い合わせ | CordMark",
  description:
    "CordMarkへのお問い合わせページです。AI Native化、AI駆動開発、AI Agent / Workflowに関するご相談を受け付けています。",
};

const companySizeOptions = ["〜99名", "100〜499名", "500〜999名", "1,000名以上"];

const departmentOptions = [
  "経営企画・DX推進",
  "開発・プロダクト",
  "営業・CS",
  "管理部門",
  "全社横断",
];

const aiStatusOptions = [
  "未導入",
  "一部社員が個人利用している",
  "一部業務で導入済み",
  "PoC・検証中",
  "全社展開を検討中",
];

const budgetOptions = [
  "未定",
  "〜300万円",
  "300〜500万円",
  "500〜1,000万円",
  "1,000万円以上",
];

const interestAreas = [
  "AI-Driven Development",
  "AI Native Company Transformation",
  "まだ決まってない",
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

function ConsultationIcon() {
  return (
    <svg viewBox="0 0 72 54" aria-hidden="true">
      <path d="M6 7.5h39a6 6 0 0 1 6 6v21a6 6 0 0 1-6 6H24L12 49v-8.5H6a6 6 0 0 1-6-6v-21a6 6 0 0 1 6-6Z" />
      <path d="M31 17.5h35a6 6 0 0 1 6 6v18a6 6 0 0 1-6 6h-5v6.5l-10-6.5H31a6 6 0 0 1-6-6v-18a6 6 0 0 1 6-6Z" />
      <path d="M40 32.5h.1M49 32.5h.1M58 32.5h.1" />
    </svg>
  );
}

export default function ContactPage() {
  return (
    <>
      <main id="top" className="contact-page site-main">
        <section className="contact-hero" aria-labelledby="contact-heading">
          <div className="contact-hero__content">
            <p className="contact-kicker">Contact Us</p>
            <h1 id="contact-heading">
              <span>AI Native化</span>
              <span>について相談する</span>
            </h1>
            <p>
              AI活用の構想段階から、
              <br className="contact-mobile-break" />
              診断・設計・実装・定着まで、
              <br />
              貴社の状況に合わせて
              <br className="contact-mobile-break" />
              最適なご支援をご提案します。
            </p>
          </div>
        </section>

        <section className="contact-form-section" aria-labelledby="contact-form-heading">
          <div className="contact-section-head">
            <h2 id="contact-form-heading">お問い合わせフォーム</h2>
            <p>
              下記フォームをご入力いただくと、
              <br className="contact-mobile-break" />
              担当者より2営業日以内にご連絡いたします。
              <br />
              まずは情報交換や、
              <br className="contact-mobile-break" />
              壁打ちだけでもお気軽にご相談ください。
            </p>
          </div>

          <form className="contact-form">
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

            <div className="contact-field">
              <label htmlFor="role">役職</label>
              <input id="role" name="role" type="text" placeholder="例）事業責任者" />
            </div>

            <div className="contact-field">
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

            <ContactSelect id="company-size" label="従業員規模" options={companySizeOptions} />
            <ContactSelect id="department" label="対象にしたい部門" options={departmentOptions} />

            <ContactSelect
              id="ai-status"
              label="現在のAI活用状況"
              options={aiStatusOptions}
              className="contact-field--full"
            />

            <div className="contact-field contact-field--full contact-field--textarea">
              <label htmlFor="message">相談したい内容</label>
              <textarea
                id="message"
                name="message"
                maxLength={500}
                placeholder="例）AI活用の進め方や、業務への適用可否を相談したい など"
              />
              <span className="contact-counter">0 / 500</span>
            </div>

            <ContactSelect id="budget" label="予算感" options={budgetOptions} />

            <div className="contact-field">
              <label htmlFor="meeting-date">希望面談日時</label>
              <input id="meeting-date" name="meeting-date" type="date" />
            </div>

            <fieldset className="contact-checks">
              <legend>相談したい領域（複数選択可）</legend>
              <div className="contact-checks__grid">
                {interestAreas.map((area) => (
                  <label key={area}>
                    <input name="interest-area" type="checkbox" value={area} />
                    <span>{area}</span>
                  </label>
                ))}
              </div>
            </fieldset>

            <button className="contact-submit" type="button">
              内容を確認する <span aria-hidden="true">→</span>
            </button>

            <p className="contact-policy">
              ご入力いただいた情報は、
              <a href="/privacy-policy">プライバシーポリシー</a>
              に基づき適切に管理いたします。
            </p>
          </form>
        </section>

        <section className="contact-next-step" aria-label="資料請求">
          <div className="contact-next-step__icon">
            <ConsultationIcon />
          </div>
          <div className="contact-next-step__copy">
            <h2>まずは壁打ち・ご相談だけでも構いません</h2>
            <p>
              課題が明確でなくても大丈夫です。貴社の状況をヒアリングし、
              <br />
              最適な進め方をご提案します。
            </p>
          </div>
          <a className="contact-download" href="/#services">
            サービス資料をダウンロードする <span aria-hidden="true">→</span>
          </a>
        </section>
      </main>

      <Footer />
    </>
  );
}
