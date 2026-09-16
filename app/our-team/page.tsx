import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageBanner from "@/components/PageBanner";
import OurTeam from "@/components/OurTeam";

export default function OurTeamPage() {
  return (
    <div className="flex flex-col min-h-screen font-sans bg-white">
      <Navbar />
      <PageBanner title="Our Team" />
      <OurTeam />
      <Footer />
    </div>
  );
}
