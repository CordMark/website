"use client";

import { useState } from "react";
import { BorderTrace } from "./BorderTrace";

const newsItems = [
  {
    date: "2025.05.03",
    title: "創業",
    image: "/assets/news-landscape.jpg",
    alt: "山並みに立つ一本の木",
  },
  {
    date: "2025.04.15",
    title: "コーポレートサイトを公開しました",
    image: "/assets/hero-mountains.jpg",
    alt: "山並みの風景",
  },
  {
    date: "2025.03.28",
    title: "YouTubeチャンネルを開設しました",
    image: "/assets/service-media.jpg",
    alt: "メディア制作の様子",
  },
  {
    date: "2025.03.10",
    title: "AI・DX支援事業の提供を開始しました",
    image: "/assets/service-ai.jpg",
    alt: "分析画面が表示されたノートPC",
  },
  {
    date: "2025.02.20",
    title: "文化共創事業の構想について",
    image: "/assets/service-community.jpg",
    alt: "木の内装の共同空間",
  },
];

export function NewsSection() {
  const [highlightedIndex, setHighlightedIndex] = useState<number | null>(null);
  const featuredNews = newsItems[highlightedIndex ?? 0];

  return (
    <section className="section news-section" id="news">
      <div className="feature-news">
        <article className="feature">
          <div className="feature__media">
            {newsItems.map((item, index) => (
              <img
                className={index === highlightedIndex || (highlightedIndex === null && index === 0) ? "is-visible" : ""}
                src={item.image}
                alt={index === highlightedIndex || (highlightedIndex === null && index === 0) ? item.alt : ""}
                aria-hidden={index === highlightedIndex || (highlightedIndex === null && index === 0) ? undefined : true}
                key={item.image}
              />
            ))}
          </div>
          <div className="feature__copy" key={`${featuredNews.date}-${featuredNews.title}`}>
            <p className="section-kicker">{featuredNews.title}</p>
            <h2>{featuredNews.date}</h2>
          </div>
        </article>

        <div className="news">
          <div className="news__head">
            <p className="section-title">NEWS</p>
            <a className="pill-link pill-link--compact border-spin" href="#contact">
              All News <span aria-hidden="true"></span>
              <BorderTrace />
            </a>
          </div>
          <div
            className="news__list"
            aria-label="ニュース一覧"
            onMouseLeave={() => setHighlightedIndex(null)}
          >
            {newsItems.map((item, index) => (
              <a
                className={`news-row${highlightedIndex === index ? " is-highlighted" : ""}`}
                href="#contact"
                key={`${item.date}-${item.title}`}
                onBlur={() => setHighlightedIndex(null)}
                onFocus={() => setHighlightedIndex(index)}
                onMouseEnter={() => setHighlightedIndex(index)}
              >
                <time>{item.date}</time>
                <span>{item.title}</span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
