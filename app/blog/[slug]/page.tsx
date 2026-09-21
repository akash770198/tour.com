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
    <div className="flex flex-col flex-1 font-sans bg-white overflow-x-clip">
      <PageBanner
        title={post.title}
        parentLabel="Blogs"
        parentHref="/blog"
        breadcrumbLabel={post.title}
      />
      <BlogDetail data={post} />
    </div>
  );
}
