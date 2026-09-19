"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { site, SectionProps, TourPartnersData } from "@/data";
import FlipUpTitle from "./FlipUpTitle";
import { easeOut, fadeUp, staggerDelay } from "../lib/page-motion";

export default function PartnersPage({ data, className }: SectionProps<TourPartnersData> = {}) {
  const page = data || site.partnersPage;
  const items = page.items;

  return (
    <section className={`w-full py-16 md:py-20 bg-white ${className ?? ""}`}>
      <div className="container mx-auto px-4 max-w-[1340px]">
        <div className="flex flex-col items-center text-center mb-12 md:mb-14">
          <motion.div
            initial={fadeUp.initial}
            animate={fadeUp.animate}
            transition={easeOut}
            className="flex items-center gap-4 mb-3"
          >
            <span className="hidden sm:block w-12 h-px bg-[#2f5c97]/40" />
            <p className="text-[13px] md:text-sm font-semibold tracking-[0.18em] uppercase text-[#2f5c97]">
              {page.label}
            </p>
            <span className="hidden sm:block w-12 h-px bg-[#2f5c97]/40" />
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
            transition={{ ...easeOut, delay: 0.4 }}
            className="text-gray-500 max-w-2xl text-sm md:text-base leading-relaxed"
          >
            {page.description}
          </motion.p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {items.map((item, index) => (
            <motion.div
              key={item.name}
              initial={fadeUp.initial}
              animate={fadeUp.animate}
              transition={staggerDelay(index, 0.05)}
              className="group bg-white rounded-[14px] border border-gray-100 shadow-[0_6px_20px_rgba(13,42,76,0.04)] hover:shadow-[0_12px_28px_rgba(13,42,76,0.1)] hover:-translate-y-0.5 transition-all duration-300 aspect-[5/3] flex items-center justify-center p-6 md:p-8"
            >
              <div className="relative w-full h-full">
                <Image
                  src={item.logo}
                  alt={item.name}
                  fill
                  className="object-contain transition-transform duration-300 group-hover:scale-105"
                  sizes="(max-width: 768px) 45vw, (max-width: 1024px) 30vw, 22vw"
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
