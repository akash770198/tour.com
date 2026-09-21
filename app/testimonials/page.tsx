import PageBanner from "@/components/PageBanner";
import TestimonialsPage from "@/components/TestimonialsPage";

export const metadata = {
  title: "Testimonials | Tour.com",
};

export default function Testimonials() {
  return (
    <div className="flex flex-col flex-1 font-sans bg-[#f7fbff] overflow-x-clip">
      <PageBanner title="Testimonials" />
      <TestimonialsPage />
    </div>
  );
}
