import PageBanner from "@/components/PageBanner";
import PartnersPage from "@/components/PartnersPage";
import { site } from "@/data";

export const metadata = {
  title: "Partners | Tour.com",
};

export default function Partners() {
  return (
    <div className="flex flex-col flex-1 font-sans bg-white overflow-x-clip">
      <PageBanner title={site.partnersPage.bannerTitle} breadcrumbLabel="Partners" />
      <PartnersPage />
    </div>
  );
}
