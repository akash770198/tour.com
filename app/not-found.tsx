import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import NotFoundPage from "@/components/NotFoundPage";

export default function NotFound() {
  return (
    <div className="flex flex-col min-h-screen font-sans bg-white overflow-x-clip">
      <Navbar />
      <NotFoundPage />
      <Footer />
    </div>
  );
}
