import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageBanner from "@/components/PageBanner";
import GalleryPage from "@/components/GalleryPage";

export const metadata = {
  title: "Gallery | Tour.com",
};

export default function Gallery() {
  return (
    <div className="flex flex-col min-h-screen font-sans bg-[#f7fbff] overflow-x-clip">
      <Navbar />
      <PageBanner title="Gallery" />
      <GalleryPage />
      <Footer />
    </div>
  );
}
