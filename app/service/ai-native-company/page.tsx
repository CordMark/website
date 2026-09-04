import { permanentRedirect } from "next/navigation";

/** 旧 /service/ai-native-company。会社全体のAI化はCompany OSの領域。そちらへ送る */
export default function LegacyAiNativeCompanyPage() {
  permanentRedirect("/company-os");
}
