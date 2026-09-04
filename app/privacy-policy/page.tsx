import type { Metadata } from "next";
import { Noto_Sans_JP, Noto_Serif_JP } from "next/font/google";
import { Footer } from "../Footer";
import { RevealWatch } from "../home/RevealWatch";
import "../home/home.css";
import "../wv-page.css";
import "./privacy-page.css";

const serif = Noto_Serif_JP({ subsets: ["latin"], weight: ["300", "400"], variable: "--wv-serif", display: "swap" });
const sans = Noto_Sans_JP({ subsets: ["latin"], weight: ["400", "500", "700"], variable: "--wv-sans", display: "swap" });

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
      "当社は、当社ウェブサイトのお問い合わせフォームおよびサービス資料のご請求フォームを通じて、会社名、氏名、役職、メールアドレス、ご相談のテーマ、ご相談内容（以下「個人情報」）を取得します。このうち役職およびご相談内容は、任意のご入力です。",
      "当社は、上記のフォームおよび当社宛の電子メール以外の方法で、皆様から個人情報を取得することはありません。",
    ],
  },
  {
    number: "2.",
    title: "個人情報の利用目的",
    body: ["当社は、取得した個人情報を以下の目的で利用します。"],
    items: [
      "お問い合わせへの回答およびご連絡のため",
      "ご請求いただいたサービス資料のダウンロードURLの送付のため",
      "当社サービスに関するご案内のため",
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

export default function PrivacyPolicyPage() {
  return (
    <div className={`wv wv-page ${serif.variable} ${sans.variable}`}>
      <RevealWatch />
      <main id="top" className="site-main">
        {/* 扉 — 題と、扱いの構え */}
        <section className="wv-section wv-pp-hero" data-ground="paper" aria-labelledby="pp-heading">
          <div className="wv-inner">
            <div data-reveal>
              <p className="wv-label">Privacy Policy</p>
              <h1 className="wv-h1" id="pp-heading">
                プライバシーポリシー
              </h1>
              <p className="wv-lead">
                CordMark株式会社（以下「当社」）は、
                <br className="wv-pp-br" />
                お客様および当社のウェブサイトをご利用いただく皆様の
                <br className="wv-pp-br" />
                個人情報を適切に取り扱い、保護することを重要な責務と考えています。
              </p>
            </div>
          </div>
        </section>

        {/* 本文 — 番号と罫だけで組む */}
        <section className="wv-section wv-pp-body" data-ground="paper" aria-label="ポリシー本文">
          <div className="wv-inner">
            <ol className="wv-pp-list" data-reveal>
              {policySections.map((section) => (
                <li className="wv-pp-item" key={section.number}>
                  <p className="wv-pp-item__num">{section.number}</p>
                  <div className="wv-pp-item__body">
                    <h2>{section.title}</h2>
                    {section.body.map((paragraph) => (
                      <p key={paragraph}>{paragraph}</p>
                    ))}
                    {section.items && (
                      <ul className="wv-pp-points">
                        {section.items.map((item) => (
                          <li key={item}>{item}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                </li>
              ))}

              <li className="wv-pp-item">
                <p className="wv-pp-item__num">8.</p>
                <div className="wv-pp-item__body">
                  <h2>お問い合わせ窓口</h2>
                  <p>個人情報の取り扱いに関するお問い合わせは、下記までご連絡ください。</p>
                  <ul className="wv-pp-contact">
                    <li>
                      <strong>CordMark株式会社</strong>
                    </li>
                    <li>
                      <a href="mailto:info@cordmark.co.jp">info@cordmark.co.jp</a>
                    </li>
                    <li>神奈川県横浜市</li>
                    <li>
                      <strong>受付時間</strong>
                      <br />
                      平日 10:00 - 18:00
                      <br />
                      （土日祝日・年末年始を除く）
                    </li>
                  </ul>
                </div>
              </li>
            </ol>
          </div>
        </section>
      </main>

      <Footer mark />
    </div>
  );
}
