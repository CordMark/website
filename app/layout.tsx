import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "CordMark | Beyond Efficiency, Toward Culture",
  description:
    "CordMarkは、ポストAI社会における人間の営みを形作るための生活基盤、学び、制作、共同体を実装する会社です。",
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
        <script
          dangerouslySetInnerHTML={{
            __html:
              "try{var n=performance.getEntriesByType('navigation')[0];if(n&&n.type==='reload'){document.documentElement.classList.add('is-reload');setTimeout(function(){document.documentElement.classList.remove('is-reload')},4300)}}catch(e){}",
          }}
        />
        {children}
      </body>
    </html>
  );
}
