import PageBanner from "@/components/PageBanner";
import AboutUsSection from "@/components/AboutUs";
import Stats from "@/components/Stats";
import WhyChooseUs from "@/components/WhyChooseUs";

export default function AboutUs() {
  return (
    <div className="flex flex-col flex-1 font-sans bg-white">
      <PageBanner title="About Us" />
      <AboutUsSection />
      <Stats />
      <WhyChooseUs />
    </div>
  );
}