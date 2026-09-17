import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageBanner from "@/components/PageBanner";
import BlogPage from "@/components/BlogPage";
import siteData from "@/data/site.json";

export const metadata = {
  title: "Blogs | Tour.com",
};

export default function Blog() {
  return (
    <div className="flex flex-col min-h-screen font-sans bg-white overflow-x-clip">
      <Navbar />
      <PageBanner title={siteData.blogPage.bannerTitle} breadcrumbLabel="Blogs" />
      <BlogPage />
      <Footer />
    </div>
  );
}
