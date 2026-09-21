import PageBanner from "@/components/PageBanner";
import GalleryPage from "@/components/GalleryPage";

export const metadata = {
  title: "Gallery | Tour.com",
};

export default function Gallery() {
  return (
    <div className="flex flex-col flex-1 font-sans bg-[#f7fbff] overflow-x-clip">
      <PageBanner title="Gallery" />
      <GalleryPage />
    </div>
  );
}
