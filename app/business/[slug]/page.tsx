import { notFound } from "next/navigation";
import { businesses, getBusiness } from "../businessData";

export function generateStaticParams() {
  return businesses.map((business) => ({ slug: business.slug }));
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
    <main className="subpage">
      <section className="business-detail">
        <img src={business.image} alt={business.alt} loading="eager" fetchPriority="high" decoding="async" />
        <div>
          <p className="section-kicker">Business</p>
          <h1>{business.title}</h1>
          <p>{business.summary}</p>
          <a className="pill-link" href="/#contact">
            お問い合わせ <span aria-hidden="true"></span>
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
  );
}
