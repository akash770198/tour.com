import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageBanner from "@/components/PageBanner";
import BlogDetail from "@/components/BlogDetail";
import siteData from "@/data/site.json";
import { notFound } from "next/navigation";

type BlogPost = (typeof siteData.blogPage.items)[number];

function getPost(slug: string) {
  return siteData.blogPage.items.find((item) => item.slug === slug);
}

function getRecent(items: BlogPost[], slug: string) {
  return items.filter((item) => item.slug !== slug).slice(0, 4);
}

export function generateStaticParams() {
  return siteData.blogPage.items.map((item) => ({ slug: item.slug }));
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

  const recent = getRecent(siteData.blogPage.items, slug);

  return (
    <div className="flex flex-col min-h-screen font-sans bg-white overflow-x-clip">
      <Navbar />
      <PageBanner
        title={siteData.blogPage.bannerDetailTitle}
        breadcrumbLabel="Blog Detail"
      />
      <BlogDetail post={post} recent={recent} sidebar={siteData.blogPage.sidebar} />
      <Footer />
    </div>
  );
}
