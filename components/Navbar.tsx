"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { MapPin, Clock, Phone, Mail, ChevronDown, ArrowRight, Menu, X } from "lucide-react";
import { FaFacebookF, FaInstagram, FaTwitter, FaLinkedinIn } from "react-icons/fa";
import { site, SectionProps, TourHeaderData, TourNavLink } from "@/data";

function pathMatches(pathname: string, href: string) {
  if (!href || href === "#") return false;
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

function isLinkActive(pathname: string, link: TourNavLink) {
  if (pathMatches(pathname, link.href)) return true;
  if (link.children?.length) {
    return link.children.some((item) => pathMatches(pathname, item.href));
  }
  return false;
}

export default function Navbar({ data, className }: SectionProps<TourHeaderData> = {}) {
  const navbar = data || site.navbar;
  const { topbar } = site;
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<number | null>(null);

  useEffect(() => {
    setMobileOpen(false);
    setOpenDropdown(null);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

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
            <Link href="/" aria-label="Go to home page">
              <Image src={navbar.logo} alt="Logo" width={180} height={60} className="h-12 w-auto object-contain" />
            </Link>
          </div>

          <div className="hidden md:flex space-x-8 items-center font-medium">
            {navbar.links.map((link: TourNavLink, idx: number) => {
              const active = isLinkActive(pathname, link);
              return (
                <div key={idx} className="relative group py-2">
                  <Link
                    href={link.href}
                    className={`flex items-center hover:text-[#36b9b3] transition-colors relative ${active ? "text-[#36b9b3]" : ""}`}
                  >
                    {link.name}
                    {link.hasDropdown && <ChevronDown size={16} className="ml-1 text-gray-500 transition-transform group-hover:rotate-180" />}
                    {active && (
                      <span className="absolute -bottom-2 left-0 w-full h-[2px] bg-[#36b9b3]" />
                    )}
                  </Link>
                  {link.hasDropdown && link.children && (
                    <div className="absolute top-full left-0 pt-3 w-56 hidden group-hover:block z-50">
                      <div className="bg-white shadow-[0_10px_30px_rgba(0,0,0,0.1)] rounded-lg overflow-hidden flex flex-col border-t-[3px] border-[#36b9b3]">
                        {link.children.map((dropLink, dropIdx: number) => {
                          const dropActive = pathMatches(pathname, dropLink.href);
                          return (
                            <Link
                              key={dropIdx}
                              href={dropLink.href}
                              className={`block px-5 py-3 text-[15px] border-b border-gray-100 last:border-0 transition-colors ${
                                dropActive
                                  ? "bg-[#f0f7fc] text-[#36b9b3]"
                                  : "text-gray-700 hover:bg-[#f0f7fc] hover:text-[#36b9b3]"
                              }`}
                            >
                              {dropLink.name}
                            </Link>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/contact"
              className="hidden sm:inline-flex bg-[#36b9b3] hover:bg-[#2c9893] text-white px-5 md:px-6 py-2.5 rounded-full font-medium transition-colors items-center gap-2"
            >
              {navbar.button} <ArrowRight size={18} />
            </Link>
            <button
              type="button"
              className="md:hidden inline-flex items-center justify-center w-11 h-11 rounded-full border border-gray-200 text-[#0d2a4c] hover:border-[#36b9b3] hover:text-[#36b9b3] transition-colors"
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileOpen}
              onClick={() => setMobileOpen((open) => !open)}
            >
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        <div
          className={`md:hidden overflow-hidden transition-[max-height,opacity] duration-300 ease-out ${
            mobileOpen ? "max-h-[min(80vh,720px)] opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="border-t border-gray-100 bg-white px-4 pb-5 pt-2 shadow-inner">
            <div className="flex flex-col">
              {navbar.links.map((link: TourNavLink, idx: number) => {
                const active = isLinkActive(pathname, link);
                const hasDropdown = Boolean(link.hasDropdown && link.children?.length);
                const dropdownOpen = openDropdown === idx;

                return (
                  <div key={idx} className="border-b border-gray-100 last:border-0">
                    {hasDropdown ? (
                      <>
                        <button
                          type="button"
                          className={`w-full flex items-center justify-between py-3.5 font-medium transition-colors ${
                            active ? "text-[#36b9b3]" : "text-gray-800"
                          }`}
                          onClick={() => setOpenDropdown(dropdownOpen ? null : idx)}
                          aria-expanded={dropdownOpen}
                        >
                          <span>{link.name}</span>
                          <ChevronDown
                            size={18}
                            className={`text-gray-500 transition-transform ${dropdownOpen ? "rotate-180" : ""}`}
                          />
                        </button>
                        <div
                          className={`overflow-hidden transition-[max-height] duration-300 ${
                            dropdownOpen ? "max-h-80" : "max-h-0"
                          }`}
                        >
                          <div className="pb-3 pl-3 flex flex-col gap-1">
                            {link.children?.map((dropLink, dropIdx) => {
                              const dropActive = pathMatches(pathname, dropLink.href);
                              return (
                                <Link
                                  key={dropIdx}
                                  href={dropLink.href}
                                  className={`rounded-lg px-3 py-2.5 text-[15px] transition-colors ${
                                    dropActive
                                      ? "bg-[#f0f7fc] text-[#36b9b3]"
                                      : "text-gray-600 hover:bg-[#f0f7fc] hover:text-[#36b9b3]"
                                  }`}
                                >
                                  {dropLink.name}
                                </Link>
                              );
                            })}
                          </div>
                        </div>
                      </>
                    ) : (
                      <Link
                        href={link.href}
                        className={`block py-3.5 font-medium transition-colors ${
                          active ? "text-[#36b9b3]" : "text-gray-800 hover:text-[#36b9b3]"
                        }`}
                      >
                        {link.name}
                      </Link>
                    )}
                  </div>
                );
              })}
            </div>

            <Link
              href="/contact"
              className="mt-4 sm:hidden inline-flex w-full justify-center bg-[#36b9b3] hover:bg-[#2c9893] text-white px-6 py-3 rounded-full font-medium transition-colors items-center gap-2"
            >
              {navbar.button} <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </nav>
    </>
  );
}
