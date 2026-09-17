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
  Headphones,
  MapPin,
  Plane,
  RotateCcw,
  Users,
  X,
} from "lucide-react";
import siteData from "../data/site.json";
import { motion } from "framer-motion";
import { easeOut, fadeUp, staggerDelay } from "../lib/page-motion";

type DurationFilter = { label: string; min: number; max: number };
type SortOption = { value: string; label: string };
type TourPackage = {
  slug: string;
  title: string;
  destination: string;
  description: string;
  image: string;
  badge: string;
  durationDays: number;
  durationLabel: string;
  people: string;
  includes: string;
  price: number;
  types: string[];
  travelMonths: string[];
  popularity: number;
};

type FilterState = {
  destination: string;
  types: string[];
  minPrice: number;
  maxPrice: number;
  durations: string[];
  month: string;
};

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

function matchesFilters(item: TourPackage, filters: FilterState, durations: DurationFilter[]) {
  const durationRanges = durations.filter((range) => filters.durations.includes(range.label));

  const destinationMatch =
    filters.destination === "All Destinations" || item.destination === filters.destination;
  const typeMatch =
    filters.types.length === 0 || item.types.some((type) => filters.types.includes(type));
  const priceMatch = item.price >= filters.minPrice && item.price <= filters.maxPrice;
  const durationMatch =
    durationRanges.length === 0 ||
    durationRanges.some((range) => item.durationDays >= range.min && item.durationDays <= range.max);
  const monthMatch = !filters.month || item.travelMonths.includes(filters.month);

  return destinationMatch && typeMatch && priceMatch && durationMatch && monthMatch;
}

export default function TourPackagesPage() {
  const page = siteData.tourPackagesPage;
  const items = page.items as TourPackage[];
  const durations = page.durations as DurationFilter[];
  const sortOptions = page.sortOptions as SortOption[];
  const priceMin = page.priceMin;
  const priceMax = page.priceMax;
  const priceStep = page.priceStep;
  const perPage = page.perPage;
  const resultsRef = useRef<HTMLDivElement>(null);
  const searchParams = useSearchParams();
  const destinationQuery = searchParams.get("destination") || "";

  const destinations = useMemo(
    () => ["All Destinations", ...Array.from(new Set(items.map((item) => item.destination)))],
    [items]
  );

  const initialDestination =
    destinationQuery && destinations.includes(destinationQuery) ? destinationQuery : "All Destinations";

  const defaultFilters: FilterState = {
    destination: initialDestination,
    types: [],
    minPrice: priceMin,
    maxPrice: priceMax,
    durations: [],
    month: "",
  };

  const [filters, setFilters] = useState<FilterState>(defaultFilters);
  const [sortBy, setSortBy] = useState("popular");
  const [pageIndex, setPageIndex] = useState(1);
  const [favorites, setFavorites] = useState<string[]>([]);

  useEffect(() => {
    if (destinationQuery && destinations.includes(destinationQuery)) {
      setFilters((prev) => ({ ...prev, destination: destinationQuery }));
      setPageIndex(1);
    }
  }, [destinationQuery, destinations]);

  const updateFilters = (next: Partial<FilterState> | ((prev: FilterState) => FilterState)) => {
    setFilters((prev) => (typeof next === "function" ? next(prev) : { ...prev, ...next }));
    setPageIndex(1);
  };

  const filtered = useMemo(() => {
    const next = items.filter((item) => matchesFilters(item, filters, durations));

    next.sort((a, b) => {
      if (sortBy === "price-asc") return a.price - b.price;
      if (sortBy === "price-desc") return b.price - a.price;
      if (sortBy === "duration") return a.durationDays - b.durationDays;
      return b.popularity - a.popularity;
    });

    return next;
  }, [durations, filters, items, sortBy]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / perPage));
  const currentPage = Math.min(pageIndex, totalPages);
  const start = (currentPage - 1) * perPage;
  const visible = filtered.slice(start, start + perPage);

  const minPercent = ((filters.minPrice - priceMin) / (priceMax - priceMin)) * 100;
  const maxPercent = ((filters.maxPrice - priceMin) / (priceMax - priceMin)) * 100;
  const hasActiveFilters =
    filters.destination !== "All Destinations" ||
    filters.types.length > 0 ||
    filters.durations.length > 0 ||
    Boolean(filters.month) ||
    filters.minPrice !== priceMin ||
    filters.maxPrice !== priceMax;

  const toggleType = (type: string) => {
    updateFilters((prev) => ({
      ...prev,
      types: prev.types.includes(type) ? prev.types.filter((item) => item !== type) : [...prev.types, type],
    }));
  };

  const toggleDuration = (label: string) => {
    updateFilters((prev) => ({
      ...prev,
      durations: prev.durations.includes(label)
        ? prev.durations.filter((item) => item !== label)
        : [...prev.durations, label],
    }));
  };

  const applyFilters = () => {
    setPageIndex(1);
    resultsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const resetFilters = () => {
    setFilters(defaultFilters);
    setPageIndex(1);
  };

  const toggleFavorite = (slug: string) => {
    setFavorites((prev) => (prev.includes(slug) ? prev.filter((item) => item !== slug) : [...prev, slug]));
  };

  const pageNumbers = Array.from({ length: totalPages }, (_, index) => index + 1);

  return (
    <section className="py-12 md:py-16 w-full relative">
      <div className="container mx-auto px-4 max-w-[1340px]">
        <div className="flex flex-col lg:flex-row gap-8 items-start">
          <motion.aside
            initial={fadeUp.initial}
            animate={fadeUp.animate}
            transition={easeOut}
            className="w-full lg:w-[300px] xl:w-[320px] shrink-0 space-y-6 lg:sticky lg:top-32"
          >
            <form
              className="bg-white rounded-[24px] border border-gray-100 shadow-[0_8px_30px_rgba(13,42,76,0.06)] p-6"
              onSubmit={(event) => {
                event.preventDefault();
                applyFilters();
              }}
            >
              <h2 className="text-[22px] font-bold text-[#0d2a4c] mb-6">Filter Your Journey</h2>

              <div className="mb-6">
                <label htmlFor="package-destination" className="block text-sm font-semibold text-[#0d2a4c] mb-3">
                  Destination
                </label>
                <div className="relative">
                  <select
                    id="package-destination"
                    value={filters.destination}
                    onChange={(event) => updateFilters({ destination: event.target.value })}
                    className="w-full appearance-none rounded-xl border border-gray-200 bg-[#f8fbff] px-4 py-3 text-sm text-gray-600 outline-none focus:border-[#36b9b3]"
                  >
                    {destinations.map((destination) => (
                      <option key={destination} value={destination}>
                        {destination}
                      </option>
                    ))}
                  </select>
                  <ChevronRight className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 rotate-90 text-gray-400" size={16} />
                </div>
              </div>

              <fieldset className="mb-6 border-0 p-0">
                <legend className="text-sm font-semibold text-[#0d2a4c] mb-3">Package Type</legend>
                <div className="flex flex-col gap-2.5">
                  {page.packageTypes.map((type) => (
                    <label key={type} className="flex items-center gap-3 text-sm text-gray-600 cursor-pointer">
                      <input
                        type="checkbox"
                        name="package-type"
                        value={type}
                        checked={filters.types.includes(type)}
                        onChange={() => toggleType(type)}
                        className="h-4 w-4 rounded border-gray-300 text-[#36b9b3] accent-[#36b9b3] cursor-pointer"
                      />
                      {type}
                    </label>
                  ))}
                </div>
              </fieldset>

              <div className="mb-6">
                <p className="text-sm font-semibold text-[#0d2a4c] mb-4">Price Range</p>
                <div className="relative h-8 mb-3">
                  <div className="absolute left-0 right-0 top-1/2 h-1.5 -translate-y-1/2 rounded-full bg-gray-200" />
                  <div
                    className="absolute top-1/2 h-1.5 -translate-y-1/2 rounded-full bg-[#36b9b3]"
                    style={{ left: `${minPercent}%`, right: `${100 - maxPercent}%` }}
                  />
                  <input
                    type="range"
                    aria-label="Minimum price"
                    min={priceMin}
                    max={priceMax}
                    step={priceStep}
                    value={filters.minPrice}
                    onChange={(event) =>
                      updateFilters((prev) => ({
                        ...prev,
                        minPrice: Math.min(Number(event.target.value), prev.maxPrice - priceStep),
                      }))
                    }
                    className="package-range"
                    style={{ zIndex: filters.minPrice > priceMax * 0.45 ? 4 : 3 }}
                  />
                  <input
                    type="range"
                    aria-label="Maximum price"
                    min={priceMin}
                    max={priceMax}
                    step={priceStep}
                    value={filters.maxPrice}
                    onChange={(event) =>
                      updateFilters((prev) => ({
                        ...prev,
                        maxPrice: Math.max(Number(event.target.value), prev.minPrice + priceStep),
                      }))
                    }
                    className="package-range"
                    style={{ zIndex: 2 }}
                  />
                </div>
                <div className="flex items-center justify-between text-xs font-semibold text-[#0d2a4c]">
                  <span>{formatINR(filters.minPrice)}</span>
                  <span>
                    {formatINR(filters.maxPrice)}
                    {filters.maxPrice >= priceMax ? "+" : ""}
                  </span>
                </div>
              </div>

              <fieldset className="mb-6 border-0 p-0">
                <legend className="text-sm font-semibold text-[#0d2a4c] mb-3">Duration</legend>
                <div className="flex flex-col gap-2.5">
                  {durations.map((duration) => (
                    <label key={duration.label} className="flex items-center gap-3 text-sm text-gray-600 cursor-pointer">
                      <input
                        type="checkbox"
                        name="package-duration"
                        value={duration.label}
                        checked={filters.durations.includes(duration.label)}
                        onChange={() => toggleDuration(duration.label)}
                        className="h-4 w-4 rounded border-gray-300 accent-[#36b9b3] cursor-pointer"
                      />
                      {duration.label}
                    </label>
                  ))}
                </div>
              </fieldset>

              <div className="mb-6">
                <label htmlFor="package-month" className="block text-sm font-semibold text-[#0d2a4c] mb-3">
                  Travel Month
                </label>
                <div className="relative">
                  <select
                    id="package-month"
                    value={filters.month}
                    onChange={(event) => updateFilters({ month: event.target.value })}
                    className="w-full appearance-none rounded-xl border border-gray-200 bg-[#f8fbff] px-4 py-3 text-sm text-gray-600 outline-none focus:border-[#36b9b3]"
                  >
                    <option value="">Select Month</option>
                    {page.months.map((month) => (
                      <option key={month} value={month}>
                        {month}
                      </option>
                    ))}
                  </select>
                  <ChevronRight className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 rotate-90 text-gray-400" size={16} />
                </div>
              </div>

              <div className="flex flex-col gap-3">
                <button
                  type="button"
                  onClick={resetFilters}
                  disabled={!hasActiveFilters}
                  className="w-full rounded-full border border-[#36b9b3] text-[#0d2a4c] py-3 text-sm font-semibold flex items-center justify-center gap-2 hover:bg-[#e8f8f7] transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  <RotateCcw size={15} />
                  Reset Filters
                </button>
                <button
                  type="submit"
                  className="w-full rounded-full bg-[#36b9b3] text-white py-3 text-sm font-semibold hover:bg-[#2c9893] transition-colors"
                >
                  Apply Filters
                </button>
              </div>
            </form>

            <div className="bg-[#eaf7fb] rounded-[24px] p-6 border border-[#d7eef5]">
              <div className="w-12 h-12 rounded-full bg-white text-[#36b9b3] flex items-center justify-center mb-4 shadow-sm">
                <Headphones size={22} />
              </div>
              <h3 className="text-lg font-bold text-[#0d2a4c] mb-2">{page.help.title}</h3>
              <p className="text-sm text-gray-500 leading-relaxed mb-5">{page.help.description}</p>
              <Link
                href={page.help.href}
                className="inline-flex items-center gap-2 text-sm font-semibold text-[#008cba] hover:text-[#007199]"
              >
                {page.help.buttonText}
                <ArrowRight size={16} />
              </Link>
            </div>
          </motion.aside>

          <div ref={resultsRef} className="flex-1 w-full min-w-0 scroll-mt-36">
            <motion.div
              initial={fadeUp.initial}
              animate={fadeUp.animate}
              transition={{ ...easeOut, delay: 0.08 }}
              className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4"
            >
              <p className="text-sm text-gray-500">
                Showing <span className="font-semibold text-[#0d2a4c]">{visible.length}</span> of{" "}
                <span className="font-semibold text-[#0d2a4c]">{filtered.length}</span> Packages
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

            {hasActiveFilters && (
              <div className="flex flex-wrap gap-2 mb-6">
                {filters.destination !== "All Destinations" && (
                  <button
                    type="button"
                    onClick={() => updateFilters({ destination: "All Destinations" })}
                    className="inline-flex items-center gap-1.5 rounded-full bg-[#e8f8f7] text-[#0d2a4c] px-3 py-1.5 text-xs font-semibold"
                  >
                    {filters.destination}
                    <X size={12} />
                  </button>
                )}
                {filters.types.map((type) => (
                  <button
                    key={type}
                    type="button"
                    onClick={() => toggleType(type)}
                    className="inline-flex items-center gap-1.5 rounded-full bg-[#e8f8f7] text-[#0d2a4c] px-3 py-1.5 text-xs font-semibold"
                  >
                    {type}
                    <X size={12} />
                  </button>
                ))}
                {(filters.minPrice !== priceMin || filters.maxPrice !== priceMax) && (
                  <button
                    type="button"
                    onClick={() => updateFilters({ minPrice: priceMin, maxPrice: priceMax })}
                    className="inline-flex items-center gap-1.5 rounded-full bg-[#e8f8f7] text-[#0d2a4c] px-3 py-1.5 text-xs font-semibold"
                  >
                    {formatINR(filters.minPrice)} - {formatINR(filters.maxPrice)}
                    {filters.maxPrice >= priceMax ? "+" : ""}
                    <X size={12} />
                  </button>
                )}
                {filters.durations.map((duration) => (
                  <button
                    key={duration}
                    type="button"
                    onClick={() => toggleDuration(duration)}
                    className="inline-flex items-center gap-1.5 rounded-full bg-[#e8f8f7] text-[#0d2a4c] px-3 py-1.5 text-xs font-semibold"
                  >
                    {duration}
                    <X size={12} />
                  </button>
                ))}
                {filters.month && (
                  <button
                    type="button"
                    onClick={() => updateFilters({ month: "" })}
                    className="inline-flex items-center gap-1.5 rounded-full bg-[#e8f8f7] text-[#0d2a4c] px-3 py-1.5 text-xs font-semibold"
                  >
                    {filters.month}
                    <X size={12} />
                  </button>
                )}
              </div>
            )}

            {visible.length === 0 ? (
              <motion.div
                initial={fadeUp.initial}
                animate={fadeUp.animate}
                transition={easeOut}
                className="bg-white rounded-[24px] border border-gray-100 p-12 text-center text-gray-500"
              >
                No packages match your filters. Try resetting them to see all journeys.
              </motion.div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                          <Image src={item.image} alt={item.title} fill className="object-cover" sizes="(max-width: 768px) 100vw, 40vw" />
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

            {filtered.length > 0 && (
              <motion.div
                initial={fadeUp.initial}
                animate={fadeUp.animate}
                transition={{ ...easeOut, delay: 0.35 }}
                className="flex items-center justify-center gap-2 mt-10"
              >
                <button
                  type="button"
                  onClick={() => setPageIndex((prev) => Math.max(1, prev - 1))}
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
                    onClick={() => setPageIndex(pageNumber)}
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
                  onClick={() => setPageIndex((prev) => Math.min(totalPages, prev + 1))}
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
      </div>
    </section>
  );
}
