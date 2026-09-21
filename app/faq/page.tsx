import PageBanner from "@/components/PageBanner";
import FaqPage from "@/components/FaqPage";

export const metadata = {
  title: "FAQS | Tour.com",
};

export default function Faq() {
  return (
    <div className="flex flex-col flex-1 font-sans bg-[#f7fbff] overflow-x-clip">
      <PageBanner title="FAQS" />
      <FaqPage />
    </div>
  );
}
