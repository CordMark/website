import { Suspense } from "react";
import { Header } from "../Header";
import { AboutTabs } from "./AboutTabs";

export default function AboutPage() {
  return (
    <>
      <Header />
      <main className="subpage">
        <section className="subpage-hero">
          <p className="section-kicker">About</p>
          <h1>私たちについて</h1>
          <p>
            ミッション、行動指針、会社概要をひとつのページで切り替えて確認できます。
          </p>
        </section>
        <Suspense fallback={<div className="tabs-shell" />}>
          <AboutTabs />
        </Suspense>
      </main>
    </>
  );
}
