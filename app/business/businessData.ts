export const businesses = [
  {
    slug: "ai-dx-support",
    title: "AI・DX支援事業",
    image: "/assets/service-ai.jpg",
    alt: "分析画面が表示されたノートPC",
    summary:
      "AI導入、業務自動化、DX設計、研修を通じて、組織と現場の負荷を下げる仕組みを一貫して実装します。",
    lead: "現場の業務構造を読み解き、AIとデジタル技術を無理なく組織へ定着させます。",
    links: ["AI導入支援", "DX推進"],
    details: ["業務棚卸しと改善設計", "AIツール導入・研修", "業務システム開発", "介護・地域現場のDX支援"],
  },
  {
    slug: "culture-co-creation",
    title: "文化共創事業",
    image: "/assets/service-community.jpg",
    alt: "木の内装の共同空間",
    summary:
      "学び、メディア、共同体づくりを通じて、AI時代に生まれる余白を文化と関係性へ変換する場をつくります。",
    lead: "余白を文化へ変えるための場、学び、制作、発信、関係性の仕組みを実装します。",
    links: ["メディア運営", "共同体づくり"],
    details: ["論文・技術トレンドの編集", "動画企画と教育コンテンツ制作", "学びと対話のプログラム", "共同生活・共同制作の場づくり"],
  },
];

export type Business = (typeof businesses)[number];

export function getBusiness(slug: string) {
  return businesses.find((business) => business.slug === slug);
}
