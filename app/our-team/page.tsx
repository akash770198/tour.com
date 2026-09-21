import PageBanner from "@/components/PageBanner";
import OurTeam from "@/components/OurTeam";

export default function OurTeamPage() {
  return (
    <div className="flex flex-col flex-1 font-sans bg-white">
      <PageBanner title="Our Team" />
      <OurTeam />
    </div>
  );
}
