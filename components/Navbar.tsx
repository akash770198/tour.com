import Image from "next/image";
import Link from "next/link";
import { MapPin, Clock, Phone, Mail, ChevronDown, ArrowRight } from "lucide-react";
import { FaFacebookF, FaInstagram, FaTwitter, FaLinkedinIn } from "react-icons/fa";
import { site, SectionProps, TourHeaderData, TourNavLink } from "@/data";

export default function Navbar({ data, className }: SectionProps<TourHeaderData> = {}) {
  const navbar = data || site.navbar;
  const { topbar } = site;

  return (
    <>
      {/* TopBar */}
      <div className="hidden lg:flex w-full bg-[#2f5c97] text-white text-sm h-12">
        <div className="container mx-auto px-4 flex justify-between items-center h-full max-w-[1340px]">
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-2">
              <MapPin size={16} />
              <span>{topbar.location}</span>
            </div>
            <div className="w-px h-4 bg-white/30" />
            <div className="flex items-center space-x-2">
              <Clock size={16} />
              <span>{topbar.timing}</span>
            </div>
          </div>
          <div className="flex items-center h-full">
            <div className="flex items-center space-x-4 pr-6">
              <Link href="#" className="hover:text-gray-300"><FaFacebookF size={16} /></Link>
              <Link href="#" className="hover:text-gray-300"><FaInstagram size={16} /></Link>
              <Link href="#" className="hover:text-gray-300"><FaTwitter size={16} /></Link>
              <Link href="#" className="hover:text-gray-300"><FaLinkedinIn size={16} /></Link>
            </div>
            <div className="w-px h-4 bg-white/30 mr-6" />
            <div className="flex items-center space-x-2 pr-6">
              <Phone size={16} />
              <span>{topbar.phone}</span>
            </div>
            <div 
              className="h-full bg-[#36b9b3] flex items-center px-6 relative"
              style={{ clipPath: "polygon(10% 0, 100% 0, 100% 100%, 0% 100%)", marginLeft: "-10px", paddingLeft: "30px" }}
            >
              <Mail size={16} className="mr-2" />
              <span>{topbar.email}</span>
            </div>
          </div>
        </div>
      </div>

      {/* NavBar */}
      <nav className={`sticky top-0 z-50 w-full bg-white text-gray-800 py-4 shadow-sm ${className ?? ""}`}>
        <div className="container mx-auto px-4 flex justify-between items-center max-w-[1340px]">
          <div className="flex-shrink-0">
            <Image src={navbar.logo} alt="Logo" width={180} height={60} className="h-12 w-auto object-contain" />
          </div>
          <div className="hidden md:flex space-x-8 items-center font-medium">
            {navbar.links.map((link: TourNavLink, idx: number) => (
              <div key={idx} className="relative group py-2">
                <Link
                  href={link.href}
                  className={`flex items-center hover:text-[#36b9b3] transition-colors relative ${link.active ? 'text-[#36b9b3]' : ''}`}
                >
                  {link.name}
                  {link.hasDropdown && <ChevronDown size={16} className="ml-1 text-gray-500 transition-transform group-hover:rotate-180" />}
                  {link.active && (
                    <span className="absolute -bottom-2 left-0 w-full h-[2px] bg-[#36b9b3]" />
                  )}
                </Link>
                {link.hasDropdown && link.dropdown && (
                  <div className="absolute top-full left-0 pt-3 w-56 hidden group-hover:block z-50">
                    <div className="bg-white shadow-[0_10px_30px_rgba(0,0,0,0.1)] rounded-lg overflow-hidden flex flex-col border-t-[3px] border-[#36b9b3]">
                      {link.dropdown.map((dropLink, dropIdx: number) => (
                        <Link 
                          key={dropIdx} 
                          href={dropLink.href}
                          className="block px-5 py-3 text-[15px] text-gray-700 hover:bg-[#f0f7fc] hover:text-[#36b9b3] border-b border-gray-100 last:border-0 transition-colors"
                        >
                          {dropLink.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
          <div>
            <button className="bg-[#36b9b3] hover:bg-[#2c9893] text-white px-6 py-2.5 rounded-full font-medium transition-colors flex items-center gap-2">
              {navbar.button} <ArrowRight size={18} />
            </button>
          </div>
        </div>
      </nav>
    </>
  );
}
