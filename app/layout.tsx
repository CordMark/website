import type { Metadata } from "next";
import { Header } from "./Header";
import "./globals.css";

export const metadata: Metadata = {
  title: "CordMark | AI Native Enterprise Transformation",
  description:
    "CordMarkは、企業の意思決定、業務プロセス、プロダクト開発をAI前提の構造へ再設計し、現場で動くAI Nativeな仕組みまで実装します。",
  icons: {
    icon: "/assets/favicon.png",
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
        <Header />
        {children}
      </body>
    </html>
  );
}
