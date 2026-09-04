import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import { Header } from "./Header";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://cordmark-website.vercel.app"),
  title: "CordMark | 会社の速さは、いちばん遅い会話で決まる。",
  description:
    "AIがコードを書く時代、開発を止めているのは問いと判断の往復。CordMarkは、その会話の形を組み替え、速くなった分を人の時間へ戻す会社です。主要商品Company OSのほか、組織・業務改善、AI駆動開発支援、受託・共同開発を行います。",
  icons: {
    icon: "/assets/favicon.png",
  },
  openGraph: {
    type: "website",
    locale: "ja_JP",
    siteName: "CordMark",
    title: "CordMark | 会社の速さは、いちばん遅い会話で決まる。",
    description:
      "開発を止めているのは実装ではなく、問いと判断の往復。その会話の形を組み替え、速くなった分を人の時間へ戻す会社です。主要商品は、Company OS。",
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
    title: "CordMark | 会社の速さは、いちばん遅い会話で決まる。",
    description:
      "開発を止めているのは実装ではなく、問いと判断の往復。その会話の形を組み替え、速くなった分を人の時間へ戻す会社です。主要商品は、Company OS。",
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
