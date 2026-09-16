import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageBanner from "@/components/PageBanner";
import Awards from "@/components/Awards";

export default function AwardsPage() {
  return (
    <div className="flex flex-col min-h-screen font-sans bg-white">
      <Navbar />
      <PageBanner title="Awards Recognition" />
      <Awards />
      <Footer />
    </div>
  );
}
