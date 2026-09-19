"use client";

import { useMemo, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ChevronLeft, ChevronRight, MapPin, Plane } from "lucide-react";
import { motion } from "framer-motion";
import { site, SectionProps, TourTopDestinationsListingData } from "@/data";

type DestinationCard = TourTopDestinationsListingData["items"][number];
import FlipUpTitle from "./FlipUpTitle";
import { easeOut, fadeUp, staggerDelay } from "../lib/page-motion";

export default function TopDestinationsPage({ data, className }: SectionProps<TourTopDestinationsListingData> = {}) {
  const page = data || site.topDestinationsPage;
  const items = page.items;
  const perPage = page.perPage;
  const [pageIndex, setPageIndex] = useState(1);
  const gridRef = useRef<HTMLDivElement>(null);

  const totalPages = Math.max(1, Math.ceil(items.length / perPage));
  const currentPage = Math.min(pageIndex, totalPages);
  const visible = useMemo(() => {
    const start = (currentPage - 1) * perPage;
    return items.slice(start, start + perPage);
  }, [items, currentPage, perPage]);

  const pageNumbers = Array.from({ length: totalPages }, (_, index) => index + 1);

  const goToPage = (next: number) => {
    setPageIndex(Math.min(totalPages, Math.max(1, next)));
    gridRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const hrefFor = (item: DestinationCard) =>
    item.filter ? `/packages?destination=${encodeURIComponent(item.filter)}` : "/packages";

  return (
    <section className={`relative w-full py-16 md:py-20 bg-[#f7fbff] overflow-hidden ${className ?? ""}`}>
      <div className="pointer-events-none absolute left-6 top-10 hidden lg:flex items-start text-[#36b9b3]/50">
        <svg width="90" height="40" viewBox="0 0 90 40" fill="none" className="mt-2">
          <path d="M2 30 Q 30 30 55 14 Q 70 5 88 8" stroke="currentColor" strokeWidth="1.5" strokeDasharray="4 4" fill="none" />
        </svg>
        <Plane size={28} strokeWidth={1} className="-ml-1 -mt-1 text-[#36b9b3]/50 fill-[#36b9b3]/50 rotate-12" />
      </div>
      <div className="pointer-events-none absolute right-10 top-6 hidden md:block w-40 h-40 rounded-full bg-[#e7f7f8]" />

      <div className="container mx-auto px-4 max-w-[1340px] relative">
        <div className="flex flex-col items-center text-center mb-12 md:mb-16">
          <motion.p
            initial={fadeUp.initial}
            animate={fadeUp.animate}
            transition={easeOut}
            className="font-cursive text-3xl md:text-4xl text-[#36b9b3] mb-2"
          >
            {page.cursiveText}
          </motion.p>
          <FlipUpTitle
            part1={page.headingPart1}
            part2={page.headingPart2}
            className="text-4xl md:text-5xl font-bold text-[#0d2a4c] mb-4"
            accentClassName="text-[#36b9b3]"
          />
          <motion.p
            initial={fadeUp.initial}
            animate={fadeUp.animate}
            transition={{ ...easeOut, delay: 0.4 }}
            className="text-gray-500 max-w-2xl text-sm md:text-base leading-relaxed"
          >
            {page.description}
          </motion.p>
        </div>

        <div ref={gridRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {visible.map((item, index) => (
            <motion.div
              key={`${item.slug}-${currentPage}`}
              initial={fadeUp.initial}
              animate={fadeUp.animate}
              transition={staggerDelay(index)}
            >
              <Link
                href={hrefFor(item)}
                className="group relative aspect-[4/3] rounded-[22px] overflow-hidden shadow-[0_12px_30px_rgba(13,42,76,0.12)] block"
              >
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0d2a4c]/85 via-[#0d2a4c]/25 to-transparent" />
                <span className="absolute top-4 left-4 inline-flex items-center gap-1.5 rounded-full bg-[#0d2a4c]/70 text-white text-[12px] font-medium px-3 py-1.5 backdrop-blur-[2px]">
                  <MapPin size={12} />
                  {item.badge}
                </span>
                <div className="absolute bottom-5 left-5 right-16">
                  <h3 className="text-white text-[22px] font-bold leading-tight">{item.title}</h3>
                  <p className="text-white/80 text-sm mt-1">{item.subtitle}</p>
                </div>
                <span className="absolute bottom-4 right-4 w-11 h-11 rounded-full bg-white text-[#36b9b3] flex items-center justify-center shadow-md transition-colors group-hover:bg-[#36b9b3] group-hover:text-white">
                  <ArrowRight size={18} />
                </span>
              </Link>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={fadeUp.initial}
          animate={fadeUp.animate}
          transition={{ ...easeOut, delay: 0.35 }}
          className="flex items-center justify-center gap-2 mt-12"
        >
          <button
            type="button"
            onClick={() => goToPage(currentPage - 1)}
            disabled={currentPage === 1}
            className="w-10 h-10 rounded-full border border-gray-200 bg-white text-gray-500 flex items-center justify-center disabled:opacity-40 hover:border-[#2f5c97] hover:text-[#2f5c97] transition-colors"
            aria-label="Previous page"
          >
            <ChevronLeft size={18} />
          </button>
          {pageNumbers.map((pageNumber) => (
            <button
              key={pageNumber}
              type="button"
              onClick={() => goToPage(pageNumber)}
              className={`w-10 h-10 rounded-full text-sm font-semibold transition-colors ${
                pageNumber === currentPage
                  ? "bg-[#2f5c97] text-white"
                  : "text-gray-500 hover:text-[#2f5c97]"
              }`}
            >
              {pageNumber}
            </button>
          ))}
          <button
            type="button"
            onClick={() => goToPage(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="w-10 h-10 rounded-full border border-gray-200 bg-white text-gray-500 flex items-center justify-center disabled:opacity-40 hover:border-[#2f5c97] hover:text-[#2f5c97] transition-colors"
            aria-label="Next page"
          >
            <ChevronRight size={18} />
          </button>
        </motion.div>
      </div>
    </section>
  );
}
