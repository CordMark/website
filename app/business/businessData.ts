export const businesses = [
  {
    slug: "ai-dx-support",
    title: "AI・DX支援事業",
    image: "/assets/service-ai.jpg",
    alt: "分析画面が表示されたノートPC",
    summary:
      "企業や施設の現場に入り、業務整理、AI導入、自動化、システム設計、研修を行います。日々の作業負荷を下げ、継続的に運用できるDXの仕組みを構築します。",
    lead: "現場の業務構造を読み解き、AIとデジタル技術を無理なく組織へ定着させます。",
    links: ["AI活用診断", "業務自動化", "システム開発", "研修・伴走支援"],
    details: ["業務棚卸しと改善設計", "AIツール導入・研修", "業務システム開発", "介護・地域現場のDX支援"],
  },
  {
    slug: "culture-co-creation",
    title: "文化共創事業",
    image: "/assets/service-community.jpg",
    alt: "木の内装の共同空間",
    summary:
      "AIと自動化によって生まれる余白を、文化的な営みへと接続するために、ボードゲーム、教育プログラム、メディア、コミュニティ運営支援などのサービスを展開します。",
    lead: "余白を文化へ変えるための場、学び、制作、発信、関係性の仕組みを実装します。",
    links: ["YouTubeメディア DotCraft", "ボードゲーム Laplace", "学びプログラム"],
    details: ["論文・技術トレンドの編集", "動画企画と教育コンテンツ制作", "学びと対話のプログラム", "共同生活・共同制作の場づくり"],
  },
];

export type Business = (typeof businesses)[number];

export function getBusiness(slug: string) {
  return businesses.find((business) => business.slug === slug);
}
