import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageBanner from "@/components/PageBanner";
import PrivacyPolicyPage from "@/components/PrivacyPolicyPage";
import siteData from "@/data/site.json";

export const metadata = {
  title: "Privacy Policy | Tour.com",
};

export default function PrivacyPolicy() {
  return (
    <div className="flex flex-col min-h-screen font-sans bg-white overflow-x-clip">
      <Navbar />
      <PageBanner
        title={siteData.privacyPolicyPage.bannerTitle}
        breadcrumbLabel="Privacy Policy"
      />
      <PrivacyPolicyPage />
      <Footer />
    </div>
  );
}
