"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
  ArrowRight,
  Calendar,
  ChevronLeft,
  ChevronRight,
  Heart,
  MapPin,
  Plane,
  Users,
} from "lucide-react";
import { site, SectionProps, TourPackagesPageData } from "@/data";
import { motion } from "framer-motion";
import { easeOut, fadeUp, staggerDelay } from "../lib/page-motion";

const badgeStyles: Record<string, string> = {
  "Best Seller": "bg-[#f59e0b]",
  Popular: "bg-[#ec4899]",
  Trending: "bg-[#14b8a6]",
  "Family Favourite": "bg-[#22c55e]",
  "Honeymoon Special": "bg-[#8b5cf6]",
  "New Arrival": "bg-[#3b82f6]",
};

function formatINR(value: number) {
  return `₹ ${value.toLocaleString("en-IN")}`;
}

export default function TourPackagesPage({ data, className }: SectionProps<TourPackagesPageData> = {}) {
  const page = data || site.tourPackagesPage;
  const items = page.items;
  const sortOptions = page.sortOptions;
  const perPage = page.perPage;
  const resultsRef = useRef<HTMLDivElement>(null);
  const searchParams = useSearchParams();
  const destinationQuery = searchParams.get("destination") || "";

  const [sortBy, setSortBy] = useState("popular");
  const [pageIndex, setPageIndex] = useState(1);
  const [favorites, setFavorites] = useState<string[]>([]);

  const destinations = useMemo(
    () => Array.from(new Set(items.map((item) => item.destination))),
    [items]
  );

  const activeDestination =
    destinationQuery && destinations.includes(destinationQuery) ? destinationQuery : "";

  useEffect(() => {
    setPageIndex(1);
  }, [destinationQuery]);

  const filtered = useMemo(() => {
    const next = activeDestination
      ? items.filter((item) => item.destination === activeDestination)
      : [...items];

    next.sort((a, b) => {
      if (sortBy === "price-asc") return a.price - b.price;
      if (sortBy === "price-desc") return b.price - a.price;
      if (sortBy === "duration") return a.durationDays - b.durationDays;
      return b.popularity - a.popularity;
    });

    return next;
  }, [activeDestination, items, sortBy]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / perPage));
  const currentPage = Math.min(pageIndex, totalPages);
  const start = (currentPage - 1) * perPage;
  const visible = filtered.slice(start, start + perPage);
  const pageNumbers = Array.from({ length: totalPages }, (_, index) => index + 1);

  const goToPage = (next: number) => {
    setPageIndex(Math.min(totalPages, Math.max(1, next)));
    resultsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const toggleFavorite = (slug: string) => {
    setFavorites((prev) => (prev.includes(slug) ? prev.filter((item) => item !== slug) : [...prev, slug]));
  };

  return (
    <section className={`py-12 md:py-16 w-full relative ${className ?? ""}`}>
      <div className="container mx-auto px-4 max-w-[1340px]">
        <div ref={resultsRef} className="w-full scroll-mt-36">
          <motion.div
            initial={fadeUp.initial}
            animate={fadeUp.animate}
            transition={{ ...easeOut, delay: 0.08 }}
            className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6"
          >
            <p className="text-sm text-gray-500">
              Showing <span className="font-semibold text-[#0d2a4c]">{visible.length}</span> of{" "}
              <span className="font-semibold text-[#0d2a4c]">{filtered.length}</span> Packages
              {activeDestination ? (
                <>
                  {" "}in <span className="font-semibold text-[#008cba]">{activeDestination}</span>
                </>
              ) : null}
            </p>
            <div className="flex items-center gap-3 text-sm text-gray-500">
              <span>Sort By:</span>
              <select
                value={sortBy}
                onChange={(event) => {
                  setSortBy(event.target.value);
                  setPageIndex(1);
                }}
                className="rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm text-[#0d2a4c] font-medium outline-none focus:border-[#36b9b3]"
              >
                {sortOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </motion.div>

          {visible.length === 0 ? (
            <motion.div
              initial={fadeUp.initial}
              animate={fadeUp.animate}
              transition={easeOut}
              className="bg-white rounded-[24px] border border-gray-100 p-12 text-center text-gray-500"
            >
              No packages found{activeDestination ? ` for ${activeDestination}` : ""}.
            </motion.div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-7">
              {visible.map((item, index) => {
                const isFavorite = favorites.includes(item.slug);

                return (
                  <motion.article
                    key={item.slug}
                    initial={fadeUp.initial}
                    animate={fadeUp.animate}
                    transition={staggerDelay(index)}
                    className="bg-white rounded-[24px] overflow-hidden border border-gray-100 shadow-[0_8px_30px_rgba(13,42,76,0.06)] hover:shadow-[0_16px_40px_rgba(13,42,76,0.1)] hover:-translate-y-1 transition-all duration-300 flex flex-col"
                  >
                    <div className="relative w-full aspect-[16/10]">
                      <Link href={`/packages/${item.slug}`} className="absolute inset-0" aria-label={`View ${item.title}`}>
                        <Image
                          src={item.image}
                          alt={item.title}
                          fill
                          className="object-cover"
                          sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 33vw"
                        />
                      </Link>
                      <span
                        className={`absolute top-4 left-4 text-white text-[11px] font-semibold px-3 py-1.5 rounded-full ${
                          badgeStyles[item.badge] || "bg-[#008cba]"
                        }`}
                      >
                        {item.badge}
                      </span>
                      <button
                        type="button"
                        onClick={() => toggleFavorite(item.slug)}
                        className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/95 flex items-center justify-center shadow-sm z-10"
                        aria-label={`Save ${item.title}`}
                      >
                        <Heart
                          size={16}
                          className={isFavorite ? "text-[#ec4899] fill-[#ec4899]" : "text-gray-400"}
                        />
                      </button>
                    </div>

                    <div className="p-5 flex flex-col flex-1">
                      <h3 className="text-[20px] font-bold text-[#0d2a4c] mb-1">
                        <Link href={`/packages/${item.slug}`} className="hover:text-[#36b9b3] transition-colors">
                          {item.title}
                        </Link>
                      </h3>
                      <div className="flex items-center text-sm text-gray-500 mb-3">
                        <MapPin size={14} className="mr-1 text-[#36b9b3]" />
                        {item.destination}
                      </div>
                      <p className="text-sm text-gray-500 leading-relaxed mb-4 line-clamp-2">{item.description}</p>

                      <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-gray-500 mb-5">
                        <span className="inline-flex items-center gap-1.5">
                          <Calendar size={14} className="text-[#36b9b3]" />
                          {item.durationLabel}
                        </span>
                        <span className="inline-flex items-center gap-1.5">
                          <Users size={14} className="text-[#36b9b3]" />
                          {item.people}
                        </span>
                        <span className="inline-flex items-center gap-1.5">
                          <Plane size={14} className="text-[#36b9b3]" />
                          {item.includes}
                        </span>
                      </div>

                      <div className="mt-auto flex items-end justify-between gap-3">
                        <div>
                          <p className="text-[22px] font-bold text-[#0d2a4c] leading-none">{formatINR(item.price)}</p>
                          <p className="text-xs text-gray-400 mt-1">per person</p>
                        </div>
                        <Link
                          href={`/packages/${item.slug}`}
                          className="inline-flex items-center gap-2 rounded-full border border-[#36b9b3] text-[#008cba] px-4 py-2 text-sm font-semibold hover:bg-[#36b9b3] hover:text-white transition-colors"
                        >
                          View Details
                          <ArrowRight size={15} />
                        </Link>
                      </div>
                    </div>
                  </motion.article>
                );
              })}
            </div>
          )}

          {filtered.length > 0 && totalPages > 1 && (
            <motion.div
              initial={fadeUp.initial}
              animate={fadeUp.animate}
              transition={{ ...easeOut, delay: 0.35 }}
              className="flex items-center justify-center gap-2 mt-10"
            >
              <button
                type="button"
                onClick={() => goToPage(currentPage - 1)}
                disabled={currentPage === 1}
                className="w-10 h-10 rounded-full border border-gray-200 bg-white text-gray-500 flex items-center justify-center disabled:opacity-40 hover:border-[#36b9b3] hover:text-[#36b9b3] transition-colors"
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
                      ? "bg-[#36b9b3] text-white"
                      : "border border-gray-200 bg-white text-gray-600 hover:border-[#36b9b3] hover:text-[#36b9b3]"
                  }`}
                >
                  {pageNumber}
                </button>
              ))}
              <button
                type="button"
                onClick={() => goToPage(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="w-10 h-10 rounded-full border border-gray-200 bg-white text-gray-500 flex items-center justify-center disabled:opacity-40 hover:border-[#36b9b3] hover:text-[#36b9b3] transition-colors"
                aria-label="Next page"
              >
                <ChevronRight size={18} />
              </button>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}
