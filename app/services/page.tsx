import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageBanner from "@/components/PageBanner";
import ServicesPageContent from "@/components/ServicesPageContent";

export default function ServicesPage() {
  return (
    <div className="flex flex-col min-h-screen font-sans bg-[#f8fbff] overflow-x-clip">
      <Navbar />
      <PageBanner title="Services" />
      <ServicesPageContent />
      <Footer />
    </div>
  );
}
