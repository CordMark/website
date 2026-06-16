import type { Metadata } from "next";
import { Footer } from "../Footer";

export const metadata: Metadata = {
  title: "プライバシーポリシー | CordMark",
  description: "CordMark株式会社のプライバシーポリシーです。",
};

type PolicySection = {
  number: string;
  title: string;
  body: string[];
  items?: string[];
};

const policySections: PolicySection[] = [
  {
    number: "1.",
    title: "個人情報の取得について",
    body: [
      "当社は、当社のサービスに関するお問い合わせ、資料請求、セミナー参加お申し込み等の際に、氏名、会社名、メールアドレス、電話番号、その他必要な情報（以下「個人情報」）を取得することがあります。",
    ],
  },
  {
    number: "2.",
    title: "個人情報の利用目的",
    body: ["当社は、取得した個人情報を以下の目的で利用します。"],
    items: [
      "お問い合わせへの対応およびご連絡のため",
      "サービスの提供および運営のため",
      "サービスに関するご案内やセミナー・イベント情報のご提供のため",
      "サービスの改善や新サービスの企画・開発のため",
      "その他、上記利用目的に付随する目的のため",
    ],
  },
  {
    number: "3.",
    title: "個人情報の第三者提供について",
    body: [
      "当社は、法令に基づく場合を除き、あらかじめご本人の同意を得ることなく、個人情報を第三者に提供することはありません。",
    ],
  },
  {
    number: "4.",
    title: "個人情報の管理について",
    body: [
      "当社は、個人情報の漏えい、滅失またはき損の防止およびその他の安全管理のために、必要かつ適切な措置を講じ、個人情報を適切に管理します。",
    ],
  },
  {
    number: "5.",
    title: "個人情報の開示・訂正・削除について",
    body: [
      "ご本人からの個人情報の開示、訂正、追加、削除、利用停止等のご請求があった場合は、ご本人確認のうえ、法令に基づき適切に対応いたします。",
    ],
  },
  {
    number: "6.",
    title: "クッキー（Cookie）の使用について",
    body: [
      "当社のウェブサイトでは、利便性の向上やアクセス解析のためにCookieを使用することがあります。",
      "Cookieの使用を希望されない場合は、ブラウザの設定により拒否することができます。",
    ],
  },
  {
    number: "7.",
    title: "法令の遵守および見直し",
    body: [
      "当社は、個人情報の保護に関する法令およびその他の規範を遵守するとともに、本ポリシーの内容を適宜見直し、その改善に努めます。",
    ],
  },
];

function ContactIcon({ type }: { type: "building" | "mail" | "pin" }) {
  return (
    <svg viewBox="0 0 20 20" aria-hidden="true">
      {type === "building" && (
        <>
          <path d="M5 17V4.7A1.7 1.7 0 0 1 6.7 3h6.6A1.7 1.7 0 0 1 15 4.7V17" />
          <path d="M3.5 17h13" />
          <path d="M8 7h.1M12 7h.1M8 10h.1M12 10h.1M8 13h.1M12 13h.1" />
        </>
      )}
      {type === "mail" && (
        <>
          <path d="M3.5 5.5h13v9h-13z" />
          <path d="m4 6 6 5 6-5" />
        </>
      )}
      {type === "pin" && (
        <>
          <path d="M10 17s5-4.7 5-8.4A5 5 0 0 0 5 8.6C5 12.3 10 17 10 17Z" />
          <path d="M10 10.4a1.8 1.8 0 1 0 0-3.6 1.8 1.8 0 0 0 0 3.6Z" />
        </>
      )}
    </svg>
  );
}

export default function PrivacyPolicyPage() {
  return (
    <>
      <main id="top" className="privacy-page site-main">
        <section className="privacy-hero" aria-labelledby="privacy-heading">
          <div className="privacy-hero__copy">
            <p className="privacy-kicker">Privacy Policy</p>
            <h1 id="privacy-heading">プライバシーポリシー</h1>
            <p>
              CordMark株式会社（以下「当社」）は、
              <br />
              お客様および当社のウェブサイトをご利用いただく皆様の
              <br />
              個人情報を適切に取り扱い、保護することを重要な責務と考えています。
            </p>
          </div>
          <div className="privacy-hero__visual" aria-hidden="true">
            <img src="/assets/privacy-policy-hero.png" alt="" />
          </div>
        </section>

        <div className="privacy-content">
          {policySections.map((section) => (
            <section className="privacy-section" key={section.number}>
              <p className="privacy-section__number">{section.number}</p>
              <div className="privacy-section__body">
                <h2>{section.title}</h2>
                {section.body.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
                {section.items && (
                  <ul>
                    {section.items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                )}
              </div>
            </section>
          ))}

          <section className="privacy-section privacy-section--contact">
            <p className="privacy-section__number">8.</p>
            <div className="privacy-section__body">
              <h2>お問い合わせ窓口</h2>
              <p>個人情報の取り扱いに関するお問い合わせは、下記までご連絡ください。</p>
              <div className="privacy-contact-card">
                <div className="privacy-contact-card__company">
                  <p>
                    <ContactIcon type="building" />
                    <strong>CordMark株式会社</strong>
                  </p>
                  <p>
                    <ContactIcon type="mail" />
                    <a href="mailto:info@cordmark.jp">info@cordmark.jp</a>
                  </p>
                  <p>
                    <ContactIcon type="pin" />
                    <span>
                      神奈川県横浜市
                      <br />
                      <small className="privacy-location-note">
                        ※詳細な所在地は、個人情報保護法その他法令に基づき必要な場合、
                        本人確認のうえ遅滞なく開示します。
                      </small>
                    </span>
                  </p>
                </div>
                <div className="privacy-contact-card__hours">
                  <strong>受付時間</strong>
                  <p>
                    平日 10:00 - 18:00
                    <br />
                    （土日祝日・年末年始を除く）
                  </p>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
