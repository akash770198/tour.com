import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageBanner from "@/components/PageBanner";
import SitemapPage from "@/components/SitemapPage";
import { site } from "@/data";

export const metadata = {
  title: "Sitemap | Tour.com",
};

export default function Sitemap() {
  return (
    <div className="flex flex-col min-h-screen font-sans bg-white overflow-x-clip">
      <Navbar />
      <PageBanner title={site.sitemapPage.bannerTitle} breadcrumbLabel="Sitemap" />
      <SitemapPage />
      <Footer />
    </div>
  );
}
