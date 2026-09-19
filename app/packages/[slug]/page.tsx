import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageBanner from "@/components/PageBanner";
import PackageDetail from "@/components/PackageDetail";
import { site } from "@/data";
import { notFound } from "next/navigation";

function getPackage(slug: string) {
  return site.tourPackagesPage.items.find((item) => item.slug === slug);
}

export function generateStaticParams() {
  return site.tourPackagesPage.items.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const pkg = getPackage(slug);
  return {
    title: pkg ? `${pkg.title} | Tour.com` : "Tour Package Detail",
  };
}

export default async function PackageDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const pkg = getPackage(slug);

  if (!pkg) {
    notFound();
  }

  return (
    <div className="flex flex-col min-h-screen font-sans bg-[#f8fbff] overflow-x-clip">
      <Navbar />
      <PageBanner title="Tour Package Detail" breadcrumbLabel="Tour Packages" />
      <PackageDetail data={pkg} />
      <Footer />
    </div>
  );
}
