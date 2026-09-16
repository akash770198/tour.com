import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageBanner from "@/components/PageBanner";
import TeamDetail from "@/components/TeamDetail";
import siteData from "@/data/site.json";
import { notFound } from "next/navigation";

export default async function TeamMemberPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const { teamSection } = siteData as any;
  
  // Find the team member by slug
  const memberData = teamSection?.items?.find((item: any) => item.slug === slug);

  if (!memberData) {
    notFound();
  }

  // Pass the enriched details payload to the TeamDetail component
  return (
    <div className="flex flex-col min-h-screen font-sans bg-white overflow-x-hidden">
      <Navbar />
      <PageBanner title="Team Detail" />
      <TeamDetail member={memberData.details} />
      <Footer />
    </div>
  );
}
