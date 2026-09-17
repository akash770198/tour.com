"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import siteData from "../data/site.json";
import FlipUpTitle from "./FlipUpTitle";
import { easeOut, fadeUp, staggerDelay } from "../lib/page-motion";

type TestimonialItem = {
  image: string;
  name: string;
  title: string;
  quote: string;
  rating: number;
};

function initials(name: string) {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");
}

function QuoteIcon() {
  return (
    <svg width="42" height="34" viewBox="0 0 60 50" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
      <path
        d="M22.5 50H0L12.5 0H35L22.5 50ZM60 50H37.5L50 0H72.5L60 50Z"
        fill="#36b9b3"
        style={{ transform: "scale(0.7)" }}
      />
    </svg>
  );
}

export default function TestimonialsPage() {
  const section = siteData.testimonialSection;
  const items = section.items as TestimonialItem[];

  return (
    <section className="w-full py-16 md:py-20 bg-[#f7fbff]">
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
              {section.pageCursiveText}
            </p>
            <span className="hidden sm:block w-12 h-px bg-[#36b9b3]/50" />
          </motion.div>
          <FlipUpTitle
            part1={section.pageHeadingPart1}
            part2={section.pageHeadingPart2}
            className="text-4xl md:text-5xl font-bold text-[#0d2a4c] mb-4"
            accentClassName="text-[#36b9b3]"
          />
          <motion.p
            initial={fadeUp.initial}
            animate={fadeUp.animate}
            transition={{ ...easeOut, delay: 0.4 }}
            className="text-gray-500 max-w-2xl text-sm md:text-base leading-relaxed"
          >
            {section.pageDescription}
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-7">
          {items.map((item, index) => (
            <motion.article
              key={item.name}
              initial={fadeUp.initial}
              animate={fadeUp.animate}
              transition={staggerDelay(index, 0.08)}
              className="bg-white rounded-[22px] border border-gray-100 shadow-[0_10px_30px_rgba(13,42,76,0.08)] p-7 md:p-8 flex flex-col h-full"
            >
              <div className="mb-5">
                <QuoteIcon />
              </div>

              <p className="text-[15px] md:text-[16px] text-gray-600 leading-relaxed flex-1 mb-6">
                {item.quote}
              </p>

              <div className="w-full h-px bg-gray-100 mb-5" />

              <div className="flex items-center gap-3.5">
                <div className="relative w-12 h-12 rounded-full overflow-hidden bg-[#0d2a4c] text-white shrink-0 flex items-center justify-center font-semibold text-sm">
                  {item.image ? (
                    <Image src={item.image} alt={item.name} fill className="object-cover" sizes="48px" />
                  ) : (
                    <span>{initials(item.name)}</span>
                  )}
                </div>
                <div>
                  <h3 className="text-[16px] font-bold text-[#0d2a4c] leading-tight">{item.name}</h3>
                  <p className="text-[13px] text-gray-400 mt-0.5">{item.title}</p>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
