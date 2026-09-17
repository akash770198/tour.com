import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageBanner from "@/components/PageBanner";
import ServiceDetail from "@/components/ServiceDetail";
import siteData from "@/data/site.json";
import { notFound } from "next/navigation";

export default async function ServiceDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const { servicesPageSection } = siteData as any;
  
  // Find the service by slug
  const serviceData = servicesPageSection?.items?.find((item: any) => item.slug === slug);

  if (!serviceData) {
    notFound();
  }

  return (
    <div className="flex flex-col min-h-screen font-sans bg-white overflow-x-clip">
      <Navbar />
      <PageBanner title="Services Detail" />
      <ServiceDetail details={serviceData.details} />
      <Footer />
    </div>
  );
}
