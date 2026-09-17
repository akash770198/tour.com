import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageBanner from "@/components/PageBanner";
import PackageDetail from "@/components/PackageDetail";
import siteData from "@/data/site.json";
import { notFound } from "next/navigation";

type PackageItem = (typeof siteData.tourPackagesPage.items)[number];

function getPackage(slug: string) {
  return siteData.tourPackagesPage.items.find((item) => item.slug === slug);
}

function getRelated(items: PackageItem[], slug: string) {
  const index = items.findIndex((item) => item.slug === slug);
  const others = [...items.slice(index + 1), ...items.slice(0, index)];
  return others.slice(0, 4);
}

export function generateStaticParams() {
  return siteData.tourPackagesPage.items.map((item) => ({ slug: item.slug }));
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

  const related = getRelated(siteData.tourPackagesPage.items, slug);

  return (
    <div className="flex flex-col min-h-screen font-sans bg-[#f8fbff] overflow-x-clip">
      <Navbar />
      <PageBanner title="Tour Package Detail" breadcrumbLabel="Tour Packages" />
      <PackageDetail pkg={pkg} related={related} page={siteData.tourPackagesPage} />
      <Footer />
    </div>
  );
}
