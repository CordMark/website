import { permanentRedirect } from "next/navigation";

/** 旧 /service/ai-native-company。AI活用支援の入口Bへ送る */
export default function LegacyAiNativeCompanyPage() {
  permanentRedirect("/service/support#company");
}
