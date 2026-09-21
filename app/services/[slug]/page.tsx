import PageBanner from "@/components/PageBanner";
import ServiceDetail from "@/components/ServiceDetail";
import { site } from "@/data";
import { notFound } from "next/navigation";

export function generateStaticParams() {
  return site.servicesPageSection.items.map((item) => ({ slug: item.slug }));
}

export default async function ServiceDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = site.servicesPageSection.items.find((item) => item.slug === slug);

  if (!service) {
    notFound();
  }

  return (
    <div className="flex flex-col flex-1 font-sans bg-white overflow-x-clip">
      <PageBanner title="Services Detail" />
      <ServiceDetail data={service.details} />
    </div>
  );
}
