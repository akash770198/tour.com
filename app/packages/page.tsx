import { Suspense } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageBanner from "@/components/PageBanner";
import TourPackagesPage from "@/components/TourPackagesPage";

export default function PackagesPage() {
  return (
    <div className="flex flex-col min-h-screen font-sans bg-[#f8fbff] overflow-x-clip">
      <Navbar />
      <PageBanner title="Tour Packages" />
      <Suspense fallback={null}>
        <TourPackagesPage />
      </Suspense>
      <Footer />
    </div>
  );
}
