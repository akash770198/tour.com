import PageBanner from "@/components/PageBanner";
import Awards from "@/components/Awards";

export default function AwardsPage() {
  return (
    <div className="flex flex-col flex-1 font-sans bg-white">
      <PageBanner title="Awards Recognition" />
      <Awards />
    </div>
  );
}
