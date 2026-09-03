import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Footer } from "../../Footer";
import { businesses, getBusiness } from "../businessData";

export function generateStaticParams() {
  return businesses.map((business) => ({ slug: business.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const business = getBusiness(slug);

  if (!business) return {};

  return {
    title: `${business.title} | CordMark`,
    description: business.summary,
    openGraph: {
      title: `${business.title} | CordMark`,
      description: business.summary,
      images: [{ url: business.image, alt: business.alt }],
    },
    twitter: {
      card: "summary_large_image",
      title: `${business.title} | CordMark`,
      description: business.summary,
      images: [business.image],
    },
  };
}

export default async function BusinessPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const business = getBusiness(slug);

  if (!business) notFound();

  return (
    <>
      <main id="top" className="subpage">
        <section className="business-detail">
          <img src={business.image} alt={business.alt} loading="eager" fetchPriority="high" decoding="async" />
          <div>
            <p className="section-kicker">Business</p>
            <h1>{business.title}</h1>
            <p>{business.summary}</p>
            <a className="pill-link" href="/contact">
              無料で相談する <span aria-hidden="true"></span>
            </a>
          </div>
        </section>
        <section className="business-body">
          <div>
            <p className="section-kicker">Scope</p>
            <h2>{business.lead}</h2>
          </div>
          <ul>
            {business.details.map((detail) => (
              <li key={detail}>{detail}</li>
            ))}
          </ul>
        </section>
      </main>
      <Footer />
    </>
  );
}
