import PageBanner from "@/components/PageBanner";
import ContactPage from "@/components/ContactPage";
import { site } from "@/data";

export const metadata = {
  title: "Contact Us | Tour.com",
};

export default function Contact() {
  return (
    <div className="flex flex-col flex-1 font-sans bg-[#f7fbff] overflow-x-clip">
      <PageBanner title={site.contactPage.bannerTitle} breadcrumbLabel="Contact Us" />
      <ContactPage />
    </div>
  );
}
