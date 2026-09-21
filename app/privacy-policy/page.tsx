import PageBanner from "@/components/PageBanner";
import PrivacyPolicyPage from "@/components/PrivacyPolicyPage";
import { site } from "@/data";

export const metadata = {
  title: "Privacy Policy | Tour.com",
};

export default function PrivacyPolicy() {
  return (
    <div className="flex flex-col flex-1 font-sans bg-white overflow-x-clip">
      <PageBanner
        title={site.privacyPolicyPage.bannerTitle}
        breadcrumbLabel="Privacy Policy"
      />
      <PrivacyPolicyPage />
    </div>
  );
}
