import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageBanner from "@/components/PageBanner";
import FaqPage from "@/components/FaqPage";

export const metadata = {
  title: "FAQS | Tour.com",
};

export default function Faq() {
  return (
    <div className="flex flex-col min-h-screen font-sans bg-[#f7fbff] overflow-x-clip">
      <Navbar />
      <PageBanner title="FAQS" />
      <FaqPage />
      <Footer />
    </div>
  );
}
