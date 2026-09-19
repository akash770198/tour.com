import Image from "next/image";
import Link from "next/link";
import { Phone, Mail, MapPin, ChevronRight } from "lucide-react";
import { FaFacebookF, FaInstagram, FaTwitter, FaLinkedinIn, FaYoutube } from "react-icons/fa";
import { site, SectionProps, TourFooterData } from "@/data";

const socialIcons = {
  facebook: FaFacebookF,
  instagram: FaInstagram,
  twitter: FaTwitter,
  linkedin: FaLinkedinIn,
  youtube: FaYoutube,
} as const;

type SocialLink = { name: string; icon: keyof typeof socialIcons; href: string };

export default function Footer({ data, className }: SectionProps<TourFooterData> = {}) {
  const footer = data || site.footer;
  const { navbar } = site;
  const socialLinks = footer.social as SocialLink[];
  const telHref = `tel:${footer.contact.phone.replace(/[^\d+]/g, "")}`;

  return (
    <footer className={`w-full flex flex-col mt-12 ${className ?? ""}`}>
      {/* Main Footer Area with Background */}
      <div className="relative w-full bg-[#f4faff] pt-12 overflow-hidden flex flex-col">
        <div className="absolute inset-0 z-0">
          <Image
            src={footer.backgroundImage}
            alt="Footer Background"
            fill
            className="object-cover object-bottom opacity-100"
          />
        </div>
        
        <div className="container mx-auto px-4 relative z-10 max-w-[1340px] pb-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-12 text-[#3b4759]">
            
            {/* Column 1: Logo & Description */}
            <div className="lg:col-span-4 flex flex-col items-start pr-4 border-r-0 lg:border-r border-gray-200">
              <div className="flex-shrink-0 mb-6">
                <Image src={navbar.logo} alt="Logo" width={180} height={60} className="h-12 w-auto object-contain" />
              </div>
              <p className="text-sm leading-relaxed mb-6">
                {footer.description}
              </p>
              <div className="flex space-x-3 mb-6">
                {socialLinks.map((link) => {
                  const Icon = socialIcons[link.icon];
                  return (
                    <a
                      key={link.name}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={link.name}
                      className="w-8 h-8 rounded-full bg-[#2a68a5] text-white flex items-center justify-center hover:bg-[#36b9b3] transition-colors"
                    >
                      <Icon size={14} />
                    </a>
                  );
                })}
              </div>
              <p className="font-cursive text-2xl text-[#2a68a5] mt-2 font-script">
                {footer.cursiveText}
              </p>
            </div>

            {/* Column 2: Quick Links */}
            <div className="lg:col-span-2 flex flex-col border-r-0 lg:border-r border-gray-200 pl-0 lg:pl-6">
              <h3 className="text-lg font-bold text-[#0d2a4c] mb-6 relative pb-2">
                Quick Links
                <span className="absolute bottom-0 left-0 w-8 h-[2px] bg-[#36b9b3]"></span>
              </h3>
              <ul className="flex flex-col space-y-3">
                {footer.quickLinks.map((link, idx) => (
                  <li key={idx}>
                    <Link href={link.href} className="text-sm flex items-center hover:text-[#36b9b3] transition-colors">
                      <ChevronRight size={14} className="text-[#36b9b3] mr-2" />
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 3: Our Services */}
            <div className="lg:col-span-2 flex flex-col border-r-0 lg:border-r border-gray-200 pl-0 lg:pl-6">
              <h3 className="text-lg font-bold text-[#0d2a4c] mb-6 relative pb-2">
                Our Services
                <span className="absolute bottom-0 left-0 w-8 h-[2px] bg-[#36b9b3]"></span>
              </h3>
              <ul className="flex flex-col space-y-3">
                {footer.services.map((link, idx) => (
                  <li key={idx}>
                    <Link href={link.href} className="text-sm flex items-center hover:text-[#36b9b3] transition-colors">
                      <ChevronRight size={14} className="text-[#36b9b3] mr-2" />
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 4: Popular Destinations */}
            <div className="lg:col-span-2 flex flex-col border-r-0 lg:border-r border-gray-200 pl-0 lg:pl-6">
              <h3 className="text-lg font-bold text-[#0d2a4c] mb-6 relative pb-2">
                Popular Destinations
                <span className="absolute bottom-0 left-0 w-8 h-[2px] bg-[#36b9b3]"></span>
              </h3>
              <ul className="flex flex-col space-y-3">
                {footer.destinations.map((link, idx) => (
                  <li key={idx}>
                    <Link href={link.href} className="text-sm flex items-center hover:text-[#36b9b3] transition-colors">
                      <ChevronRight size={14} className="text-[#36b9b3] mr-2" />
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 5: Contact Us */}
            <div className="lg:col-span-2 flex flex-col pl-0 lg:pl-6">
              <h3 className="text-lg font-bold text-[#0d2a4c] mb-6 relative pb-2">
                Contact Us
                <span className="absolute bottom-0 left-0 w-8 h-[2px] bg-[#36b9b3]"></span>
              </h3>
              <div className="flex flex-col space-y-5">
                <div className="flex items-start">
                  <div className="w-10 h-10 rounded-full bg-[#e3f4f8] flex items-center justify-center flex-shrink-0 mr-4">
                    <Phone size={18} className="text-[#36b9b3]" />
                  </div>
                  <div className="flex flex-col pt-1">
                    <a href={telHref} className="font-semibold text-sm text-[#0d2a4c] hover:text-[#36b9b3] transition-colors">
                      {footer.contact.phone}
                    </a>
                    <span className="text-xs text-gray-500 mt-1">{footer.contact.timing}</span>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="w-10 h-10 rounded-full bg-[#e3f4f8] flex items-center justify-center flex-shrink-0 mr-4">
                    <Mail size={18} className="text-[#36b9b3]" />
                  </div>
                  <div className="flex flex-col pt-1">
                    <a
                      href={`mailto:${footer.contact.email}`}
                      className="font-semibold text-sm text-[#0d2a4c] hover:text-[#36b9b3] transition-colors"
                    >
                      {footer.contact.email}
                    </a>
                    <span className="text-xs text-gray-500 mt-1">{footer.contact.emailSub}</span>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="w-10 h-10 rounded-full bg-[#e3f4f8] flex items-center justify-center flex-shrink-0 mr-4">
                    <MapPin size={18} className="text-[#36b9b3]" />
                  </div>
                  <div className="flex flex-col pt-1">
                    <a
                      href={footer.contact.mapUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-gray-600 leading-snug hover:text-[#36b9b3] transition-colors"
                    >
                      {footer.contact.address}
                    </a>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Bottom Blue Bar */}
      <div className="w-full bg-[#396c9c] text-white py-4 z-10">
        <div className="container mx-auto px-4 max-w-[1340px] flex flex-col md:flex-row justify-between items-center text-xs md:text-sm">
          <div className="mb-4 md:mb-0">
            {footer.bottomBar.copyright}
          </div>
          
          <div className="flex flex-wrap justify-center space-x-2 md:space-x-4 mb-4 md:mb-0">
            {footer.bottomBar.links.map((link, idx) => (
              <div key={idx} className="flex items-center">
                <Link href={link.href} className="hover:text-gray-300 transition-colors">
                  {link.name}
                </Link>
                {idx < footer.bottomBar.links.length - 1 && (
                  <span className="mx-2 md:mx-4 opacity-50">|</span>
                )}
              </div>
            ))}
          </div>

          <div className="flex items-center space-x-4 opacity-90">
            <span className="opacity-50 mr-2 hidden md:inline">|</span>
            {socialLinks.map((link) => {
              const Icon = socialIcons[link.icon];
              return (
                <a
                  key={link.name}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={link.name}
                  className="hover:text-gray-300"
                >
                  <Icon size={14} />
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </footer>
  );
}
