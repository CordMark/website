import { permanentRedirect } from "next/navigation";

/** 旧 /business/[slug]。いまの章へ送る */
const destinations: Record<string, string> = {
  "ai-dx-support": "/company-os",
  "culture-co-creation": "/about",
};

export default async function LegacyBusinessPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  permanentRedirect(destinations[slug] ?? "/");
}
