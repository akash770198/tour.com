import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageBanner from "@/components/PageBanner";
import WhyChooseUs from "@/components/WhyChooseUs";
import Stats from "@/components/Stats";

export default function WhyChooseUsPage() {
  return (
    <div className="flex flex-col min-h-screen font-sans bg-white">
      <Navbar />
      <PageBanner title="Why Choose Us" />
      <WhyChooseUs />
      <Stats />
      <Footer />
    </div>
  );
}
