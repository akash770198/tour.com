"use client";

import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { motion } from "framer-motion";
import FlipUpTitle from "./FlipUpTitle";
import { easeOut, fadeUp } from "../lib/page-motion";

import { SectionProps } from "@/data";

export default function PageBanner({
  title,
  breadcrumbLabel,
  className,
}: SectionProps & { title: string; breadcrumbLabel?: string }) {
  return (
    <div
      className={`relative w-full h-[300px] md:h-[400px] flex items-center justify-center bg-cover bg-center bg-no-repeat ${className ?? ""}`}
      style={{ backgroundImage: "url('/pagebanner.jpg')" }}
    >
      <div className="absolute inset-0 bg-[#0d2a4c]/60" />

      <div className="relative z-10 flex flex-col items-center text-center text-white mt-16">
        <FlipUpTitle
          as="h1"
          text={title}
          className="text-4xl md:text-5xl font-bold mb-4"
          startDelay={0.1}
        />
        <motion.div
          initial={fadeUp.initial}
          animate={fadeUp.animate}
          transition={{ ...easeOut, delay: 0.35 }}
          className="flex items-center text-sm md:text-base font-medium space-x-2"
        >
          <Link href="/" className="hover:text-[#36b9b3] transition-colors">
            Home
          </Link>
          <ChevronRight size={16} className="text-[#36b9b3]" />
          <span className="text-[#36b9b3]">{breadcrumbLabel || title}</span>
        </motion.div>
      </div>
    </div>
  );
}
