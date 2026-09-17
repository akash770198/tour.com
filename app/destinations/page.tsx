import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageBanner from "@/components/PageBanner";
import TopDestinationsPage from "@/components/TopDestinationsPage";

export const metadata = {
  title: "Top Destinations | Tour.com",
};

export default function DestinationsPage() {
  return (
    <div className="flex flex-col min-h-screen font-sans bg-[#f7fbff] overflow-x-clip">
      <Navbar />
      <PageBanner title="Top Destinations" />
      <TopDestinationsPage />
      <Footer />
    </div>
  );
}
