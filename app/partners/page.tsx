import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageBanner from "@/components/PageBanner";
import PartnersPage from "@/components/PartnersPage";
import { site } from "@/data";

export const metadata = {
  title: "Partners | Tour.com",
};

export default function Partners() {
  return (
    <div className="flex flex-col min-h-screen font-sans bg-white overflow-x-clip">
      <Navbar />
      <PageBanner title={site.partnersPage.bannerTitle} breadcrumbLabel="Partners" />
      <PartnersPage />
      <Footer />
    </div>
  );
}
