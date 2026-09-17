"use client";

import { useMemo, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";
import siteData from "../data/site.json";
import FlipUpTitle from "./FlipUpTitle";
import { easeOut, fadeUp, staggerDelay } from "../lib/page-motion";

type BlogPost = {
  slug: string;
  image: string;
  date: string;
  category: string;
  title: string;
  description: string;
};

export default function BlogPage() {
  const page = siteData.blogPage;
  const items = page.items as BlogPost[];
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

  return (
    <section className="w-full py-16 md:py-20 bg-white">
      <div className="container mx-auto px-4 max-w-[1340px]">
        <div className="flex flex-col items-center text-center mb-12 md:mb-14">
          <motion.div
            initial={fadeUp.initial}
            animate={fadeUp.animate}
            transition={easeOut}
            className="flex items-center gap-4 mb-3"
          >
            <span className="hidden sm:block w-12 h-px bg-[#36b9b3]/50" />
            <p className="text-[13px] md:text-sm font-semibold tracking-[0.18em] uppercase text-[#36b9b3]">
              {page.label}
            </p>
            <span className="hidden sm:block w-12 h-px bg-[#36b9b3]/50" />
          </motion.div>
          <FlipUpTitle
            part1={page.headingPart1}
            part2={page.headingPart2}
            className="text-4xl md:text-5xl font-bold text-[#0d2a4c] mb-4"
            accentClassName="text-[#008cba]"
          />
          <motion.p
            initial={fadeUp.initial}
            animate={fadeUp.animate}
            transition={{ ...easeOut, delay: 0.45 }}
            className="text-gray-500 max-w-2xl text-sm md:text-base leading-relaxed"
          >
            {page.description}
          </motion.p>
        </div>

        <div
          ref={gridRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-7 scroll-mt-36"
        >
          {visible.map((item, index) => (
            <motion.article
              key={`${item.slug}-${currentPage}`}
              initial={fadeUp.initial}
              animate={fadeUp.animate}
              transition={staggerDelay(index)}
              className="bg-white rounded-[18px] overflow-hidden border border-gray-100 shadow-[0_10px_28px_rgba(13,42,76,0.07)] hover:shadow-[0_16px_36px_rgba(13,42,76,0.12)] hover:-translate-y-1 transition-all duration-300 flex flex-col group"
            >
              <Link href={`/blog/${item.slug}`} className="relative block aspect-[16/11] overflow-hidden bg-gray-100">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                />
                <span className="absolute top-3 left-3 z-10 rounded-md bg-[#36b9b3] text-white text-[11px] font-semibold px-2.5 py-1">
                  {item.category}
                </span>
                <span className="absolute top-3 right-3 z-10 text-white text-[12px] font-medium drop-shadow-md">
                  {item.date}
                </span>
                <div className="absolute inset-0 bg-gradient-to-t from-[#0d2a4c]/35 via-transparent to-[#0d2a4c]/20" />
              </Link>

              <div className="p-5 flex flex-col flex-1">
                <h3 className="text-[17px] font-bold text-[#0d2a4c] leading-snug mb-2 line-clamp-2 group-hover:text-[#008cba] transition-colors">
                  <Link href={`/blog/${item.slug}`}>{item.title}</Link>
                </h3>
                <p className="text-[13px] text-gray-500 leading-relaxed mb-4 line-clamp-2 flex-1">
                  {item.description}
                </p>
                <Link
                  href={`/blog/${item.slug}`}
                  className="inline-flex items-center gap-1.5 text-[14px] font-semibold text-[#008cba] hover:text-[#0d2a4c] transition-colors"
                >
                  {page.readMore}
                  <ArrowRight size={14} className="transition-transform group-hover:translate-x-0.5" />
                </Link>
              </div>
            </motion.article>
          ))}
        </div>

        {totalPages > 1 && (
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
                    : "text-[#2f5c97]/70 hover:text-[#2f5c97]"
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
        )}
      </div>
    </section>
  );
}
