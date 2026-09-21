import PageBanner from "@/components/PageBanner";
import BlogPage from "@/components/BlogPage";
import { site } from "@/data";

export const metadata = {
  title: "Blogs | Tour.com",
};

export default async function Blog({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  const { category } = await searchParams;

  return (
    <div className="flex flex-col flex-1 font-sans bg-white overflow-x-clip">
      <PageBanner title={site.blogPage.bannerTitle} breadcrumbLabel="Blogs" />
      <BlogPage category={category} />
    </div>
  );
}
