import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageBanner from "@/components/PageBanner";
import MissionVision from "@/components/MissionVision";

export default function MissionVisionPage() {
  return (
    <div className="flex flex-col min-h-screen font-sans bg-white">
      <Navbar />
      <PageBanner title="Mission & Vision" />
      <MissionVision />
      <Footer />
    </div>
  );
}
