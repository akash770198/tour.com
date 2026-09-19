import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageBanner from "@/components/PageBanner";
import BlogDetail from "@/components/BlogDetail";
import { site } from "@/data";
import { notFound } from "next/navigation";

function getPost(slug: string) {
  return site.blogPage.items.find((item) => item.slug === slug);
}

export function generateStaticParams() {
  return site.blogPage.items.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPost(slug);
  return {
    title: post ? `${post.title} | Tour.com` : "Blog Detail | Tour.com",
  };
}

export default async function BlogDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPost(slug);

  if (!post) {
    notFound();
  }

  return (
    <div className="flex flex-col min-h-screen font-sans bg-white overflow-x-clip">
      <Navbar />
      <PageBanner
        title={site.blogPage.bannerDetailTitle}
        breadcrumbLabel="Blog Detail"
      />
      <BlogDetail data={post} />
      <Footer />
    </div>
  );
}
