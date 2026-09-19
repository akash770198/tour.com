import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageBanner from "@/components/PageBanner";
import TeamDetail from "@/components/TeamDetail";
import { site } from "@/data";
import { notFound } from "next/navigation";

export function generateStaticParams() {
  return site.teamSection.items.map((item) => ({ slug: item.slug }));
}

export default async function TeamMemberPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const member = site.teamSection.items.find((item) => item.slug === slug);

  if (!member) {
    notFound();
  }

  return (
    <div className="flex flex-col min-h-screen font-sans bg-white overflow-x-clip">
      <Navbar />
      <PageBanner title="Team Detail" />
      <TeamDetail data={member.details} />
      <Footer />
    </div>
  );
}
