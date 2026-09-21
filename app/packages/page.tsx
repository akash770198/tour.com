import { Suspense } from "react";
import PageBanner from "@/components/PageBanner";
import TourPackagesPage from "@/components/TourPackagesPage";

export default function PackagesPage() {
  return (
    <div className="flex flex-col flex-1 font-sans bg-[#f8fbff] overflow-x-clip">
      <PageBanner title="Tour Packages" />
      <Suspense fallback={null}>
        <TourPackagesPage />
      </Suspense>
    </div>
  );
}
