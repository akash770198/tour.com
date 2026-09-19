"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import {
  ChevronLeft,
  ChevronRight,
  MapPin,
  Play,
  X,
} from "lucide-react";
import { motion } from "framer-motion";
import { site, SectionProps, TourGalleryData } from "@/data";
import { easeOut, fadeUp, staggerDelay } from "../lib/page-motion";
import FlipUpTitle from "./FlipUpTitle";

type GalleryVideo = TourGalleryData["videos"]["items"][number];

function isYouTube(src: string) {
  return /youtube\.com|youtu\.be/.test(src);
}

function youtubeEmbed(src: string) {
  const short = src.match(/youtu\.be\/([\w-]+)/);
  if (short) return `https://www.youtube.com/embed/${short[1]}`;
  const watch = src.match(/[?&]v=([\w-]+)/);
  if (watch) return `https://www.youtube.com/embed/${watch[1]}`;
  return src;
}

export default function GalleryPage({ data, className }: SectionProps<TourGalleryData> = {}) {
  const page = data || site.galleryPage;
  const images = page.images.items;
  const videos = page.videos.items;

  const [showAllImages, setShowAllImages] = useState(false);
  const [showAllVideos, setShowAllVideos] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [activeVideo, setActiveVideo] = useState<GalleryVideo | null>(null);

  const visibleImages = useMemo(
    () => (showAllImages ? images : images.slice(0, page.images.initialCount)),
    [images, page.images.initialCount, showAllImages]
  );
  const visibleVideos = useMemo(
    () => (showAllVideos ? videos : videos.slice(0, page.videos.initialCount)),
    [videos, page.videos.initialCount, showAllVideos]
  );

  const canExpandImages = images.length > page.images.initialCount;
  const canExpandVideos = videos.length > page.videos.initialCount;

  const closeLightbox = () => setLightboxIndex(null);
  const showPrev = () => {
    setLightboxIndex((current) => {
      if (current === null) return current;
      return (current - 1 + visibleImages.length) % visibleImages.length;
    });
  };
  const showNext = () => {
    setLightboxIndex((current) => {
      if (current === null) return current;
      return (current + 1) % visibleImages.length;
    });
  };

  useEffect(() => {
    if (lightboxIndex === null && !activeVideo) return;

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeLightbox();
        setActiveVideo(null);
      }
      if (lightboxIndex !== null && event.key === "ArrowLeft") showPrev();
      if (lightboxIndex !== null && event.key === "ArrowRight") showNext();
    };

    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [lightboxIndex, activeVideo, visibleImages.length]);

  return (
    <div className={`w-full pb-20 ${className ?? ""}`}>
      <section className="pt-16 md:pt-20 pb-10">
        <div className="container mx-auto px-4 max-w-[1340px]">
          <div className="flex flex-col items-center text-center mb-12">
            <motion.p
              initial={fadeUp.initial}
              animate={fadeUp.animate}
              transition={easeOut}
              className="font-cursive text-3xl md:text-4xl text-[#36b9b3] mb-2"
            >
              {page.images.cursiveText}
            </motion.p>
            <FlipUpTitle
              part1={page.images.headingPart1}
              part2={page.images.headingPart2}
              className="text-4xl md:text-5xl font-bold text-[#0d2a4c] mb-4"
              accentClassName="text-[#36b9b3]"
            />
            <motion.p
              initial={fadeUp.initial}
              animate={fadeUp.animate}
              transition={{ ...easeOut, delay: 0.4 }}
              className="text-gray-500 max-w-2xl text-sm md:text-base leading-relaxed"
            >
              {page.images.description}
            </motion.p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {visibleImages.map((item, index) => (
              <motion.button
                key={item.id}
                type="button"
                initial={fadeUp.initial}
                animate={fadeUp.animate}
                transition={staggerDelay(index)}
                onClick={() => setLightboxIndex(index)}
                className="group relative aspect-[4/3] rounded-[22px] overflow-hidden text-left shadow-[0_12px_30px_rgba(13,42,76,0.1)]"
              >
                <Image
                  src={item.image}
                  alt={item.label}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0d2a4c]/80 via-transparent to-transparent" />
                <span className="absolute bottom-4 left-4 inline-flex items-center gap-1.5 text-white text-sm font-semibold">
                  <MapPin size={14} className="text-[#36b9b3]" />
                  {item.label}
                </span>
              </motion.button>
            ))}
          </div>

          {canExpandImages && (
            <motion.div
              initial={fadeUp.initial}
              animate={fadeUp.animate}
              transition={{ ...easeOut, delay: 0.35 }}
              className="flex justify-center mt-10"
            >
              <button
                type="button"
                onClick={() => setShowAllImages((open) => !open)}
                className="inline-flex items-center justify-center min-w-[160px] h-12 rounded-full bg-[#36b9b3] hover:bg-[#2c9893] text-white font-semibold px-8 transition-colors"
              >
                {showAllImages ? page.images.viewLess : page.images.viewMore}
              </button>
            </motion.div>
          )}
        </div>
      </section>

      <section className="pt-8 md:pt-12">
        <div className="container mx-auto px-4 max-w-[1340px]">
          <div className="flex flex-col items-center text-center mb-12">
            <motion.p
              initial={fadeUp.initial}
              animate={fadeUp.animate}
              transition={{ ...easeOut, delay: 0.15 }}
              className="font-cursive text-3xl md:text-4xl text-[#36b9b3] mb-2"
            >
              {page.videos.cursiveText}
            </motion.p>
            <FlipUpTitle
              part1={page.videos.headingPart1}
              part2={page.videos.headingPart2}
              className="text-4xl md:text-5xl font-bold text-[#0d2a4c] mb-4"
              accentClassName="text-[#36b9b3]"
              startDelay={0.25}
            />
            <motion.p
              initial={fadeUp.initial}
              animate={fadeUp.animate}
              transition={{ ...easeOut, delay: 0.5 }}
              className="text-gray-500 max-w-2xl text-sm md:text-base leading-relaxed"
            >
              {page.videos.description}
            </motion.p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {visibleVideos.map((item, index) => (
              <motion.button
                key={item.id}
                type="button"
                initial={fadeUp.initial}
                animate={fadeUp.animate}
                transition={staggerDelay(index, 0.07)}
                onClick={() => setActiveVideo(item)}
                className="group relative aspect-[4/3] rounded-[22px] overflow-hidden text-left shadow-[0_12px_30px_rgba(13,42,76,0.1)]"
              >
                <Image
                  src={item.poster}
                  alt={item.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                />
                <div className="absolute inset-0 bg-[#0d2a4c]/25 group-hover:bg-[#0d2a4c]/35 transition-colors" />
                <span className="absolute top-4 right-4 bg-[#0d2a4c]/70 text-white text-[11px] font-semibold px-2.5 py-1 rounded-md">
                  {item.duration}
                </span>
                <span className="absolute inset-0 flex items-center justify-center">
                  <span className="w-14 h-14 rounded-full bg-white/90 text-[#36b9b3] flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                    <Play size={22} fill="currentColor" className="ml-0.5" />
                  </span>
                </span>
                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="text-white text-[17px] font-bold leading-tight">{item.title}</h3>
                  <p className="text-white/80 text-sm mt-0.5">{item.subtitle}</p>
                </div>
              </motion.button>
            ))}
          </div>

          {canExpandVideos && (
            <motion.div
              initial={fadeUp.initial}
              animate={fadeUp.animate}
              transition={{ ...easeOut, delay: 0.4 }}
              className="flex justify-center mt-10"
            >
              <button
                type="button"
                onClick={() => setShowAllVideos((open) => !open)}
                className="inline-flex items-center justify-center min-w-[160px] h-12 rounded-full bg-[#36b9b3] hover:bg-[#2c9893] text-white font-semibold px-8 transition-colors"
              >
                {showAllVideos ? page.videos.viewLess : page.videos.viewMore}
              </button>
            </motion.div>
          )}
        </div>
      </section>

      {lightboxIndex !== null && visibleImages[lightboxIndex] && (
        <div className="fixed inset-0 z-[80] bg-black/85 flex items-center justify-center p-4" onClick={closeLightbox}>
          <button
            type="button"
            onClick={closeLightbox}
            className="absolute top-5 right-5 w-10 h-10 rounded-full bg-white/10 text-white flex items-center justify-center"
            aria-label="Close image"
          >
            <X size={20} />
          </button>
          {visibleImages.length > 1 && (
            <>
              <button
                type="button"
                onClick={(event) => {
                  event.stopPropagation();
                  showPrev();
                }}
                className="absolute left-4 md:left-8 w-11 h-11 rounded-full bg-white/15 text-white flex items-center justify-center"
                aria-label="Previous image"
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
                aria-label="Next image"
              >
                <ChevronRight size={24} />
              </button>
            </>
          )}
          <div className="relative w-full max-w-5xl h-[70vh]" onClick={(event) => event.stopPropagation()}>
            <Image
              src={visibleImages[lightboxIndex].image}
              alt={visibleImages[lightboxIndex].label}
              fill
              className="object-contain"
              sizes="90vw"
            />
          </div>
          <p className="absolute bottom-6 text-white/80 text-sm">
            {visibleImages[lightboxIndex].label} · {lightboxIndex + 1} / {visibleImages.length}
          </p>
        </div>
      )}

      {activeVideo && (
        <div className="fixed inset-0 z-[80] bg-black/85 flex items-center justify-center p-4" onClick={() => setActiveVideo(null)}>
          <button
            type="button"
            onClick={() => setActiveVideo(null)}
            className="absolute top-5 right-5 w-10 h-10 rounded-full bg-white/10 text-white flex items-center justify-center"
            aria-label="Close video"
          >
            <X size={20} />
          </button>
          <div
            className="relative w-full max-w-4xl aspect-video rounded-2xl overflow-hidden bg-black"
            onClick={(event) => event.stopPropagation()}
          >
            {activeVideo.src && isYouTube(activeVideo.src) ? (
              <iframe
                src={`${youtubeEmbed(activeVideo.src)}?autoplay=1`}
                title={activeVideo.title}
                className="absolute inset-0 w-full h-full"
                allow="autoplay; encrypted-media"
                allowFullScreen
              />
            ) : activeVideo.src ? (
              <video src={activeVideo.src} poster={activeVideo.poster} controls autoPlay className="absolute inset-0 w-full h-full object-contain" />
            ) : (
              <div className="absolute inset-0">
                <Image src={activeVideo.poster} alt={activeVideo.title} fill className="object-cover opacity-40" />
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
                  <span className="w-16 h-16 rounded-full bg-white/90 text-[#36b9b3] flex items-center justify-center mb-4">
                    <Play size={26} fill="currentColor" className="ml-0.5" />
                  </span>
                  <h3 className="text-white text-2xl font-bold mb-2">{activeVideo.title}</h3>
                  <p className="text-white/80 max-w-md text-sm">{page.videos.comingSoon}</p>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
