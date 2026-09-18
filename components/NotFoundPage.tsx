"use client";

import Link from "next/link";
import { Home } from "lucide-react";
import { motion } from "framer-motion";
import siteData from "../data/site.json";
import { easeOut, fadeUp } from "../lib/page-motion";

function SadFileIcon() {
  return (
    <svg width="72" height="84" viewBox="0 0 72 84" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
      <path
        d="M14 8C14 5.79086 15.7909 4 18 4H42L58 20V76C58 78.2091 56.2091 80 54 80H18C15.7909 80 14 78.2091 14 76V8Z"
        fill="white"
      />
      <path d="M42 4V16C42 18.2091 43.7909 20 46 20H58" fill="#E8F2FF" />
      <path d="M42 4L58 20H46C43.7909 20 42 18.2091 42 16V4Z" fill="#D6E8FF" />
      <circle cx="28" cy="42" r="3.2" fill="#2f5c97" />
      <circle cx="44" cy="42" r="3.2" fill="#2f5c97" />
      <path
        d="M29 56C31.2 52.8 34.2 51.2 36 51.2C37.8 51.2 40.8 52.8 43 56"
        stroke="#2f5c97"
        strokeWidth="3"
        strokeLinecap="round"
      />
    </svg>
  );
}

export default function NotFoundPage() {
  const page = siteData.notFoundPage;

  return (
    <section className="w-full flex-1 bg-white py-20 md:py-28">
      <div className="container mx-auto px-4 max-w-[1340px] flex flex-col items-center text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="relative mb-8 md:mb-10"
        >
          <div className="flex items-center justify-center gap-1 md:gap-2 select-none" aria-hidden>
            <span className="text-[120px] sm:text-[150px] md:text-[180px] font-bold leading-none text-[#0d2a4c]">
              4
            </span>
            <span className="relative w-[110px] h-[110px] sm:w-[140px] sm:h-[140px] md:w-[170px] md:h-[170px] rounded-full bg-[#2f8fff] flex items-center justify-center shadow-[0_18px_40px_rgba(47,143,255,0.35)]">
              <SadFileIcon />
            </span>
            <span className="text-[120px] sm:text-[150px] md:text-[180px] font-bold leading-none text-[#0d2a4c]">
              4
            </span>
          </div>
          <div className="absolute left-1/2 -translate-x-1/2 -bottom-3 w-[200px] sm:w-[240px] h-5 rounded-[100%] bg-[#2f8fff]/15 blur-[2px]" />
        </motion.div>

        <motion.h1
          initial={fadeUp.initial}
          animate={fadeUp.animate}
          transition={{ ...easeOut, delay: 0.15 }}
          className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#2f8fff] mb-4"
        >
          {page.title}
        </motion.h1>

        <motion.p
          initial={fadeUp.initial}
          animate={fadeUp.animate}
          transition={{ ...easeOut, delay: 0.25 }}
          className="text-gray-500 text-sm md:text-base leading-relaxed max-w-xl mb-8"
        >
          {page.description}
        </motion.p>

        <motion.div
          initial={fadeUp.initial}
          animate={fadeUp.animate}
          transition={{ ...easeOut, delay: 0.35 }}
        >
          <Link
            href={page.buttonHref}
            className="inline-flex items-center gap-2.5 h-12 md:h-14 px-7 md:px-8 rounded-[12px] bg-[#0d2a4c] hover:bg-[#163a63] text-white font-semibold transition-colors"
          >
            <Home size={18} />
            {page.buttonText}
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
