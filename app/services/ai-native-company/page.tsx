import { permanentRedirect } from "next/navigation";

export default function LegacyAiNativeCompanyPage() {
  permanentRedirect("/service/support#company");
}
