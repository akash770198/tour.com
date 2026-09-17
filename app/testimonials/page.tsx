import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageBanner from "@/components/PageBanner";
import TestimonialsPage from "@/components/TestimonialsPage";

export const metadata = {
  title: "Testimonials | Tour.com",
};

export default function Testimonials() {
  return (
    <div className="flex flex-col min-h-screen font-sans bg-[#f7fbff] overflow-x-clip">
      <Navbar />
      <PageBanner title="Testimonials" />
      <TestimonialsPage />
      <Footer />
    </div>
  );
}
