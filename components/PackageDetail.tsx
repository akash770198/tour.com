"use client";

import { FormEvent, useEffect, useMemo, useRef, useState, type ComponentType } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  BadgeCheck,
  BookOpen,
  Building2,
  Calendar,
  Camera,
  Check,
  ChevronLeft,
  ChevronRight,
  Coffee,
  Compass,
  Headphones,
  Heart,
  Landmark,
  Lock,
  Map,
  MapPin,
  Moon,
  Mountain,
  Plane,
  ShieldCheck,
  Ship,
  ShoppingBag,
  Sparkles,
  Sun,
  TrainFront,
  Users,
  Utensils,
  Waves,
  X,
} from "lucide-react";
import { motion } from "framer-motion";
import { site, SectionProps, TourPackage } from "@/data";
import { easeOut, fadeUp, scaleIn, staggerDelay } from "../lib/page-motion";

const highlightIcons: Record<string, ComponentType<{ size?: number; strokeWidth?: number; className?: string }>> = {
  Building2,
  Ship,
  Waves,
  Coffee,
  Mountain,
  TrainFront,
  Utensils,
  Map,
  Landmark,
  ShoppingBag,
  Moon,
  Sparkles,
  Users,
  Heart,
  Sun,
  Camera,
  Compass,
  BookOpen,
  Plane,
  BadgeCheck,
  Headphones,
  ShieldCheck,
};

function formatINR(value: number) {
  const digits = Math.round(value).toString();
  const lastThree = digits.slice(-3);
  const other = digits.slice(0, -3);
  const grouped = other.replace(/\B(?=(\d{2})+(?!\d))/g, ",");
  return `₹ ${other ? `${grouped},${lastThree}` : lastThree}`;
}

function IconByName({ name, size = 22 }: { name: string; size?: number }) {
  const Icon = highlightIcons[name] || Compass;
  return <Icon size={size} strokeWidth={1.6} />;
}

export default function PackageDetail({
  data,
  className,
}: SectionProps<TourPackage> & { data: TourPackage }) {
  const pkg = data;
  const page = site.tourPackagesPage;
  const items = site.tourPackagesPage.items;
  const index = items.findIndex((item) => item.slug === pkg.slug);
  const related = [...items.slice(index + 1), ...items.slice(0, index)].slice(0, 4);
  const gallery = pkg.gallery?.length ? pkg.gallery : [pkg.image];
  const visibleGallery = gallery.slice(0, 4);
  const extraCount = Math.max(0, gallery.length - 4);
  const formRef = useRef<HTMLDivElement>(null);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const quickInfo = useMemo(
    () => [
      { icon: MapPin, label: "Destination", value: pkg.destination },
      { icon: Calendar, label: "Duration", value: pkg.durationLabel },
      { icon: Users, label: "Group Size", value: pkg.groupSize },
      { icon: Plane, label: "Travel Type", value: pkg.travelType },
    ],
    [pkg.destination, pkg.durationLabel, pkg.groupSize, pkg.travelType]
  );

  const openGallery = (index: number) => setLightboxIndex(index);

  const closeLightbox = () => setLightboxIndex(null);

  const showPrev = () => {
    setLightboxIndex((current) => {
      if (current === null) return current;
      return (current - 1 + gallery.length) % gallery.length;
    });
  };

  const showNext = () => {
    setLightboxIndex((current) => {
      if (current === null) return current;
      return (current + 1) % gallery.length;
    });
  };

  useEffect(() => {
    if (lightboxIndex === null) return;

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeLightbox();
      if (event.key === "ArrowLeft") showPrev();
      if (event.key === "ArrowRight") showNext();
    };

    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [lightboxIndex, gallery.length]);

  const handleEnquiry = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitted(true);
  };

  const scrollToForm = () => {
    formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className={`w-full pb-20 ${className ?? ""}`}>
      <section className="pt-10 pb-6">
        <div className="container mx-auto px-4 max-w-[1340px]">
          <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_360px] xl:grid-cols-[minmax(0,1fr)_380px] gap-8 items-start">
            <div>
              <motion.div
                initial={fadeUp.initial}
                animate={fadeUp.animate}
                transition={easeOut}
                className="grid grid-cols-3 grid-rows-3 gap-3 h-[320px] sm:h-[420px] md:h-[480px] mb-10"
              >
                {visibleGallery.map((src, index) => {
                  const isHero = index === 0;
                  const isLastThumb = index === visibleGallery.length - 1 && extraCount > 0;
                  const overlayLabel = extraCount === 1 ? "+1 Photo" : `+${extraCount} Photos`;

                  return (
                    <button
                      key={`${src}-${index}`}
                      type="button"
                      onClick={() => openGallery(index)}
                      className={`relative overflow-hidden rounded-[18px] group ${
                        isHero ? "col-span-2 row-span-3" : "col-span-1 row-span-1"
                      }`}
                      aria-label={isLastThumb ? `View ${extraCount} more photos` : `View photo ${index + 1}`}
                    >
                      <Image
                        src={src}
                        alt={`${pkg.title} photo ${index + 1}`}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        sizes={isHero ? "(max-width: 1024px) 70vw, 50vw" : "(max-width: 1024px) 30vw, 18vw"}
                        priority={index === 0}
                      />
                      {isLastThumb && (
                        <span className="absolute inset-0 bg-[#0d2a4c]/55 flex items-center justify-center">
                          <span className="text-white text-lg sm:text-2xl font-bold tracking-wide">{overlayLabel}</span>
                        </span>
                      )}
                    </button>
                  );
                })}
              </motion.div>

              <motion.div
                initial={fadeUp.initial}
                animate={fadeUp.animate}
                transition={{ ...easeOut, delay: 0.12 }}
              >
              <h2 className="text-[28px] md:text-[32px] font-bold text-[#0d2a4c] mb-4">About This Package</h2>
              <p className="text-[15px] text-gray-500 leading-relaxed mb-8 max-w-3xl">{pkg.about}</p>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-10">
                {pkg.highlights.map((item, index) => (
                  <motion.div
                    key={item.title}
                    initial={fadeUp.initial}
                    animate={fadeUp.animate}
                    transition={staggerDelay(index, 0.05)}
                    className="flex flex-col items-center text-center"
                  >
                    <div className="w-14 h-14 rounded-full border border-[#d7eef5] bg-[#f4fbfd] text-[#36b9b3] flex items-center justify-center mb-3">
                      <IconByName name={item.icon} />
                    </div>
                    <p className="text-[15px] font-semibold text-[#0d2a4c]">{item.title}</p>
                    <p className="text-[12px] text-gray-400 mt-0.5">{item.subtitle}</p>
                  </motion.div>
                ))}
              </div>

              <div className="bg-[#f3f8fc] rounded-[20px] px-5 py-6 mb-10">
                <h3 className="text-[18px] font-bold text-[#0d2a4c] mb-5">Quick Information</h3>
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
                  {quickInfo.map((item) => (
                    <div key={item.label} className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-full bg-white text-[#36b9b3] flex items-center justify-center shrink-0 shadow-sm">
                        <item.icon size={18} strokeWidth={1.8} />
                      </div>
                      <div>
                        <p className="text-[12px] text-gray-400">{item.label}</p>
                        <p className="text-[14px] font-semibold text-[#0d2a4c]">{item.value}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <h3 className="text-[22px] font-bold text-[#0d2a4c] mb-6">Detailed Itinerary</h3>
              <div className="relative pl-2">
                {pkg.itinerary.map((day, index) => (
                  <motion.div
                    key={day.day}
                    initial={fadeUp.initial}
                    animate={fadeUp.animate}
                    transition={staggerDelay(index, 0.05)}
                    className="relative flex gap-4 pb-6 last:pb-0"
                  >
                    {index < pkg.itinerary.length - 1 && (
                      <span className="absolute left-[15px] top-8 bottom-0 w-px bg-[#d8eef3]" />
                    )}
                    <div className="relative z-10 w-8 h-8 rounded-full bg-[#36b9b3] text-white text-[11px] font-bold flex items-center justify-center shrink-0">
                      {String(index + 1).padStart(2, "0")}
                    </div>
                    <div className="pt-0.5">
                      <p className="text-[12px] font-semibold text-[#36b9b3] mb-1">{day.day}</p>
                      <h4 className="text-[16px] font-bold text-[#0d2a4c] mb-1">{day.title}</h4>
                      <p className="text-[14px] text-gray-500 leading-relaxed">{day.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
              </motion.div>
            </div>

            <motion.aside
              initial={fadeUp.initial}
              animate={fadeUp.animate}
              transition={{ ...easeOut, delay: 0.1 }}
              className="space-y-5"
            >
              <div className="bg-white rounded-[22px] border border-gray-100 shadow-[0_10px_30px_rgba(13,42,76,0.08)] px-6 py-6">
                <p className="text-[32px] font-bold text-[#0d2a4c] leading-none">{formatINR(pkg.price)}</p>
                <p className="text-sm text-gray-400 mt-2">per person</p>
              </div>

              <div ref={formRef} className="bg-[#0d2a4c] rounded-[22px] px-6 py-7 text-white">
                <h3 className="text-[20px] font-bold mb-5">{page.form.title}</h3>
                {submitted ? (
                  <div className="bg-white/10 rounded-xl px-4 py-6">
                    <p className="font-semibold mb-1">{page.form.successTitle}</p>
                    <p className="text-sm text-white/80">{page.form.successMessage}</p>
                  </div>
                ) : (
                  <form onSubmit={handleEnquiry} className="space-y-3">
                    <input
                      required
                      name="name"
                      placeholder={page.form.namePlaceholder}
                      className="w-full h-11 rounded-lg bg-white text-[#0d2a4c] text-sm px-4 outline-none"
                    />
                    <input
                      required
                      type="email"
                      name="email"
                      placeholder={page.form.emailPlaceholder}
                      className="w-full h-11 rounded-lg bg-white text-[#0d2a4c] text-sm px-4 outline-none"
                    />
                    <input
                      required
                      type="tel"
                      name="phone"
                      placeholder={page.form.phonePlaceholder}
                      className="w-full h-11 rounded-lg bg-white text-[#0d2a4c] text-sm px-4 outline-none"
                    />
                    <input
                      type="date"
                      name="travelDate"
                      aria-label={page.form.datePlaceholder}
                      className="w-full h-11 rounded-lg bg-white text-[#0d2a4c] text-sm px-4 outline-none"
                    />
                    <select
                      name="people"
                      defaultValue=""
                      className="w-full h-11 rounded-lg bg-white text-[#0d2a4c] text-sm px-4 outline-none"
                    >
                      <option value="" disabled>
                        {page.form.peoplePlaceholder}
                      </option>
                      {page.form.peopleOptions.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                    <div>
                      <label className="block text-[12px] text-white/70 mb-1.5">{page.form.messageLabel}</label>
                      <textarea
                        name="message"
                        rows={4}
                        placeholder={page.form.messagePlaceholder}
                        className="w-full rounded-lg bg-white text-[#0d2a4c] text-sm px-4 py-3 outline-none resize-none"
                      />
                    </div>
                    <button
                      type="submit"
                      className="w-full h-12 rounded-lg bg-[#36b9b3] hover:bg-[#2ea8a2] text-white font-semibold inline-flex items-center justify-center gap-2 transition-colors"
                    >
                      {page.form.submit}
                      <ArrowRight size={16} />
                    </button>
                    <p className="flex items-center justify-center gap-1.5 text-[11px] text-white/60 pt-1">
                      <Lock size={12} />
                      {page.form.privacy}
                    </p>
                  </form>
                )}
              </div>

              <div className="bg-white rounded-[22px] border border-gray-100 shadow-[0_8px_24px_rgba(13,42,76,0.06)] px-5 py-5 space-y-3">
                {page.guarantees.map((item) => (
                  <div key={item.title} className="flex items-center gap-3 text-sm text-[#0d2a4c]">
                    <span className="text-[#36b9b3]">
                      <IconByName name={item.icon} size={18} />
                    </span>
                    <span className="font-medium">{item.title}</span>
                  </div>
                ))}
              </div>

              <div className="bg-white rounded-[22px] border border-gray-100 shadow-[0_8px_24px_rgba(13,42,76,0.06)] px-6 py-6">
                <h3 className="text-[18px] font-bold text-[#0d2a4c] mb-4">Package Inclusions</h3>
                <ul className="space-y-3">
                  {pkg.inclusions.map((item) => (
                    <li key={item} className="flex items-start gap-3 text-[14px] text-gray-600">
                      <span className="mt-0.5 w-5 h-5 rounded-full bg-[#e7f8f3] text-[#16a34a] flex items-center justify-center shrink-0">
                        <Check size={12} strokeWidth={3} />
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-white rounded-[22px] border border-gray-100 shadow-[0_8px_24px_rgba(13,42,76,0.06)] px-6 py-6">
                <h3 className="text-[18px] font-bold text-[#0d2a4c] mb-4">Package Exclusions</h3>
                <ul className="space-y-3">
                  {pkg.exclusions.map((item) => (
                    <li key={item} className="flex items-start gap-3 text-[14px] text-gray-600">
                      <span className="mt-0.5 w-5 h-5 rounded-full bg-[#fdecec] text-[#ef4444] flex items-center justify-center shrink-0">
                        <X size={12} strokeWidth={3} />
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.aside>
          </div>
        </div>
      </section>

      <section className="py-8">
        <div className="container mx-auto px-4 max-w-[1340px]">
          <motion.div
            initial={scaleIn.initial}
            animate={scaleIn.animate}
            transition={{ ...easeOut, delay: 0.2 }}
            className="relative overflow-hidden rounded-[28px] bg-[#0d2a4c] min-h-[220px] flex flex-col md:flex-row items-center"
          >
            <div className="relative z-10 px-8 md:px-12 py-10 md:w-[55%]">
              <h3 className="text-2xl md:text-[32px] font-bold text-white mb-3">{pkg.ctaTitle}</h3>
              <p className="text-white/80 text-sm md:text-base mb-6 max-w-md">{page.ctaSubtitle}</p>
              <button
                type="button"
                onClick={scrollToForm}
                className="inline-flex items-center gap-2 bg-[#36b9b3] hover:bg-[#2ea8a2] text-white px-6 py-3 rounded-full font-semibold transition-colors"
              >
                {page.ctaButton}
                <ArrowRight size={16} />
              </button>
            </div>
            <div className="relative w-full md:w-[45%] h-[200px] md:h-[240px]">
              <Image src={gallery[1] || pkg.image} alt={pkg.title} fill className="object-cover" sizes="45vw" />
              <div className="absolute inset-0 bg-gradient-to-r from-[#0d2a4c] via-[#0d2a4c]/30 to-transparent" />
            </div>
          </motion.div>
        </div>
      </section>

      <section className="pt-6">
        <div className="container mx-auto px-4 max-w-[1340px]">
          <motion.div
            initial={fadeUp.initial}
            animate={fadeUp.animate}
            transition={{ ...easeOut, delay: 0.25 }}
            className="text-center mb-10"
          >
            <h3 className="text-[28px] md:text-[32px] font-bold text-[#0d2a4c]">{page.relatedTitle}</h3>
            <p className="text-gray-400 text-sm mt-1">{page.relatedSubtitle}</p>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {related.map((item, index) => (
              <motion.article
                key={item.slug}
                initial={fadeUp.initial}
                animate={fadeUp.animate}
                transition={staggerDelay(index, 0.07)}
                className="bg-white rounded-[22px] overflow-hidden border border-gray-100 shadow-[0_8px_24px_rgba(13,42,76,0.06)] hover:-translate-y-1 hover:shadow-[0_14px_32px_rgba(13,42,76,0.1)] transition-all"
              >
                <Link href={`/packages/${item.slug}`} className="relative block aspect-[16/11]">
                  <Image src={item.image} alt={item.title} fill className="object-cover" sizes="(max-width: 1024px) 50vw, 25vw" />
                </Link>
                <div className="p-4">
                  <h4 className="text-[16px] font-bold text-[#0d2a4c] mb-1">
                    <Link href={`/packages/${item.slug}`} className="hover:text-[#36b9b3] transition-colors">
                      {item.title}
                    </Link>
                  </h4>
                  <p className="text-xs text-gray-400 mb-3">{item.durationLabel}</p>
                  <div className="flex items-center justify-between">
                    <p className="text-[18px] font-bold text-[#0d2a4c]">{formatINR(item.price)}</p>
                    <Link
                      href={`/packages/${item.slug}`}
                      className="text-[13px] font-semibold text-[#36b9b3] inline-flex items-center gap-1 hover:text-[#0d2a4c]"
                    >
                      View Details
                      <ArrowRight size={14} />
                    </Link>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {lightboxIndex !== null && (
        <div className="fixed inset-0 z-[80] bg-black/85 flex items-center justify-center p-4" onClick={closeLightbox}>
          <button
            type="button"
            onClick={closeLightbox}
            className="absolute top-5 right-5 w-10 h-10 rounded-full bg-white/10 text-white flex items-center justify-center"
            aria-label="Close gallery"
          >
            <X size={20} />
          </button>
          {gallery.length > 1 && (
            <>
              <button
                type="button"
                onClick={(event) => {
                  event.stopPropagation();
                  showPrev();
                }}
                className="absolute left-4 md:left-8 w-11 h-11 rounded-full bg-white/15 text-white flex items-center justify-center"
                aria-label="Previous photo"
              >
                <ChevronLeft size={24} />
              </button>
              <button
                type="button"
                onClick={(event) => {
                  event.stopPropagation();
                  showNext();
                }}
                className="absolute right-4 md:right-8 w-11 h-11 rounded-full bg-white/15 text-white flex items-center justify-center"
                aria-label="Next photo"
              >
                <ChevronRight size={24} />
              </button>
            </>
          )}
          <div className="relative w-full max-w-5xl h-[70vh]" onClick={(event) => event.stopPropagation()}>
            <Image
              src={gallery[lightboxIndex]}
              alt={`${pkg.title} photo ${lightboxIndex + 1}`}
              fill
              className="object-contain"
              sizes="90vw"
            />
          </div>
          <p className="absolute bottom-6 text-white/80 text-sm">
            {lightboxIndex + 1} / {gallery.length}
          </p>
        </div>
      )}
    </div>
  );
}
