import PageBanner from "@/components/PageBanner";
import WhyChooseUs from "@/components/WhyChooseUs";
import Stats from "@/components/Stats";

export default function WhyChooseUsPage() {
  return (
    <div className="flex flex-col flex-1 font-sans bg-white">
      <PageBanner title="Why Choose Us" />
      <WhyChooseUs showMoreLink={false} />
      <Stats />
    </div>
  );
}
