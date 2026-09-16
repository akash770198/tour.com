import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageBanner from "@/components/PageBanner";
import AboutUsSection from "@/components/AboutUs";
import Stats from "@/components/Stats";
import WhyChooseUs from "@/components/WhyChooseUs";

export default function AboutUs() {
  return (
    <div className="flex flex-col min-h-screen font-sans bg-white">
      <Navbar />
      <PageBanner title="About Us" />
      <AboutUsSection />
      <Stats />
      <WhyChooseUs />
      <Footer />
    </div>
  );
}