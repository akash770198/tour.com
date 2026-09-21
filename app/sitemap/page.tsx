import PageBanner from "@/components/PageBanner";
import SitemapPage from "@/components/SitemapPage";
import { site } from "@/data";

export const metadata = {
  title: "Sitemap | Tour.com",
};

export default function Sitemap() {
  return (
    <div className="flex flex-col flex-1 font-sans bg-white overflow-x-clip">
      <PageBanner title={site.sitemapPage.bannerTitle} breadcrumbLabel="Sitemap" />
      <SitemapPage />
    </div>
  );
}
