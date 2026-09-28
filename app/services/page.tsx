import PageBanner from "@/components/PageBanner";
import OurServices from "@/components/OurServices";

export default function ServicesPage() {
  return (
    <div className="flex flex-col flex-1 font-sans bg-[#f8fbff] overflow-x-clip">
      <PageBanner title="Services" />
      <OurServices />
    </div>
  );
}
