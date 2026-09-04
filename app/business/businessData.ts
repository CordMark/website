export const businesses = [
  {
    slug: "ai-dx-support",
    title: "Company OS・組織・業務改善支援",
    image: "/assets/service-ai.webp",
    alt: "分析画面が表示されたノートPC",
    summary:
      "顧客の現場に入り、業務の進め方を診断してAI前提に組み替えます。会社の意思と日々の仕事をつなぐProduct、Company OSの導入と展開も行います。",
    lead: "問いと判断が止まらない会社の形を、顧客の現場からつくります。",
    links: ["Company OS", "業務改善", "システム開発", "研修・伴走支援"],
    details: ["業務棚卸しと改善設計", "AIツール導入・研修", "業務システム開発", "介護・地域現場のDX支援"],
  },
  {
    slug: "culture-co-creation",
    title: "文化共創事業",
    image: "/assets/service-community.webp",
    alt: "木の内装の共同空間",
    summary:
      "AIと自動化によって生まれる余白を、文化的な営みへと接続するために、ボードゲーム、教育プログラム、メディア、コミュニティ運営支援などのサービスを展開します。",
    lead: "AIが生む余白を、人と人が競い、遊び、学び、つながる文化へ変えていきます。",
    links: ["YouTubeメディア DotCraft", "ボードゲーム Laplace", "学びプログラム"],
    details: ["論文・技術トレンドの編集", "動画企画と教育コンテンツ制作", "学びと対話のプログラム", "共同生活・共同制作の場づくり"],
  },
];

export type Business = (typeof businesses)[number];

export function getBusiness(slug: string) {
  return businesses.find((business) => business.slug === slug);
}
