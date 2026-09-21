import PageBanner from "@/components/PageBanner";
import TopDestinationsPage from "@/components/TopDestinationsPage";

export const metadata = {
  title: "Top Destinations | Tour.com",
};

export default function DestinationsPage() {
  return (
    <div className="flex flex-col flex-1 font-sans bg-[#f7fbff] overflow-x-clip">
      <PageBanner title="Top Destinations" />
      <TopDestinationsPage />
    </div>
  );
}
