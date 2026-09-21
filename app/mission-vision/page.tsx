import PageBanner from "@/components/PageBanner";
import MissionVision from "@/components/MissionVision";

export default function MissionVisionPage() {
  return (
    <div className="flex flex-col flex-1 font-sans bg-white">
      <PageBanner title="Mission & Vision" />
      <MissionVision />
    </div>
  );
}
