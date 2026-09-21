import Hero from "@/components/Hero";
import AboutUs from "@/components/AboutUs";
import OurServices from "@/components/OurServices";
import WhyChooseUs from "@/components/WhyChooseUs";
import PopularTours from "@/components/PopularTours";
import TopDestinations from "@/components/TopDestinations";
import Testimonials from "@/components/Testimonials";
import Stats from "@/components/Stats";
import Blog from "@/components/Blog";

export default function Home() {
  return (
    <div className="flex flex-col flex-1 font-sans bg-white">
      <Hero />
      <TopDestinations />
      <AboutUs />
      <OurServices />
      <WhyChooseUs />
      <PopularTours />
      <Testimonials />
      <Stats />
      <Blog />
    </div>
  );
}
