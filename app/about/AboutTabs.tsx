"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useMemo } from "react";

const tabs = [
  {
    id: "mission",
    label: "ミッション",
    title: "ポストAI社会の人間の営みを形づくる",
    body: "CordMarkは、AIと自動化によって、生活と組織の負荷を下げるだけでなく、その先に生まれる余白を人間の営みへと接続します。私たちは、「自律した生活基盤」と「創発する文化的共同体」を通じて、ポストAI社会の生活の器を実装します。",
  },
  {
    id: "principles",
    label: "行動指針",
    title: "効率を文化へ、余白を創造へ",
    body: "私たちは、技術を単なる効率化の道具として扱わず、人間がよりよく学び、つくり、関わるための基盤として実装します。現場から考え、長期の社会実装へつなげます。",
  },
  {
    id: "company",
    label: "会社概要",
    title: "CordMark Inc.",
    body: "CordMarkは、AI・DX支援事業と文化共創事業を横断し、ポストAI時代の生活基盤と文化的共同体を社会へ展開する会社です。",
  },
];

export function AboutTabs() {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const activeId = searchParams.get("tab") ?? "mission";
  const activeTab = useMemo(
    () => tabs.find((tab) => tab.id === activeId) ?? tabs[0],
    [activeId],
  );

  const activateTab = (tabId: string) => {
    const nextParams = new URLSearchParams(searchParams.toString());
    nextParams.set("tab", tabId);
    router.replace(`${pathname}?${nextParams.toString()}`, { scroll: false });
  };

  return (
    <div className="tabs-shell">
      <div className="tabs" role="tablist" aria-label="私たちについて">
        {tabs.map((tab) => (
          <button
            className={`tab-button${activeTab.id === tab.id ? " is-active" : ""}`}
            type="button"
            role="tab"
            aria-selected={activeTab.id === tab.id}
            key={tab.id}
            onClick={() => activateTab(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <section className="tab-panel" role="tabpanel">
        <p className="section-kicker">{activeTab.label}</p>
        <h2>{activeTab.title}</h2>
        <p>{activeTab.body}</p>
        {activeTab.id === "principles" ? (
          <div className="value-grid">
            <article>
              <h3>余白をつくる</h3>
              <p>効率化で終わらせず、人が考え、学び、関係を育てる時間へ変換します。</p>
            </article>
            <article>
              <h3>現場から実装する</h3>
              <p>抽象論ではなく、生活、施設、組織の具体的な運用から設計します。</p>
            </article>
            <article>
              <h3>文化として残す</h3>
              <p>一時的な改善ではなく、継続して受け継がれる営みをつくります。</p>
            </article>
          </div>
        ) : null}
        {activeTab.id === "company" ? (
          <dl className="info-table">
            <div>
              <dt>会社名</dt>
              <dd>CordMark Inc.</dd>
            </div>
            <div>
              <dt>創業</dt>
              <dd>2025.05.03</dd>
            </div>
            <div>
              <dt>事業</dt>
              <dd>AI・DX支援事業、文化共創事業</dd>
            </div>
            <div>
              <dt>所在地</dt>
              <dd>東京都渋谷区神宮前1-2-3 CordMark Studio</dd>
            </div>
          </dl>
        ) : null}
      </section>
    </div>
  );
}
