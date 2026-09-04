import { permanentRedirect } from "next/navigation";

/** 旧 /service/ai-driven-development。AI駆動開発支援へ送る */
export default function LegacyAiDrivenDevelopmentPage() {
  permanentRedirect("/service/support");
}
