import Link from "next/link";
import { ChevronRight } from "lucide-react";

interface PageBannerProps {
  title: string;
}

export default function PageBanner({ title }: PageBannerProps) {
  return (
    <div 
      className="relative w-full h-[300px] md:h-[400px] flex items-center justify-center bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: "url('/pagebanner.jpg')" }}
    >
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-[#0d2a4c]/60"></div>
      
      {/* Content */}
      <div className="relative z-10 flex flex-col items-center text-center text-white mt-16">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">{title}</h1>
        <div className="flex items-center text-sm md:text-base font-medium space-x-2">
          <Link href="/" className="hover:text-[#36b9b3] transition-colors">Home</Link>
          <ChevronRight size={16} className="text-[#36b9b3]" />
          <span className="text-[#36b9b3]">{title}</span>
        </div>
      </div>
    </div>
  );
}
