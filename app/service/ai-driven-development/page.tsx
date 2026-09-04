import { permanentRedirect } from "next/navigation";

/** 旧 /service/ai-driven-development。AI活用支援の入口Aへ送る */
export default function LegacyAiDrivenDevelopmentPage() {
  permanentRedirect("/service/support#dev");
}
