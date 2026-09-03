import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import { Header } from "./Header";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://cordmark-website.vercel.app"),
  title: "CordMark | ばらばらの線が、ひとつの意思に結ばれる。",
  description:
    "CordMarkは、テクノロジーによる物質的な充足を精神的な豊かさへ還元することを目指す会社です。会社の意思と日々の仕事をつなぐCompany OSを中心に、組織・業務改善、AI駆動開発支援、受託・共同開発を行います。",
  icons: {
    icon: "/assets/favicon.png",
  },
  openGraph: {
    type: "website",
    locale: "ja_JP",
    siteName: "CordMark",
    title: "CordMark | ばらばらの線が、ひとつの意思に結ばれる。",
    description:
      "人の意思を現実へ運ぶ力としてAIを扱い、会社の意思と日々の仕事をつなぐCompany OSをつくる会社です。",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "CordMark — Marking a more human future",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "CordMark | ばらばらの線が、ひとつの意思に結ばれる。",
    description:
      "人の意思を現実へ運ぶ力としてAIを扱い、会社の意思と日々の仕事をつなぐCompany OSをつくる会社です。",
    images: ["/og.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja" suppressHydrationWarning>
      <body>
        <a className="skip-link" href="#top">
          本文へ移動
        </a>
        <Header />
        {children}
        <Analytics />
      </body>
    </html>
  );
}
