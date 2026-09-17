"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, Headphones, Minus, Plus } from "lucide-react";
import { motion } from "framer-motion";
import siteData from "../data/site.json";
import FlipUpTitle from "./FlipUpTitle";
import { easeOut, fadeUp, staggerDelay } from "../lib/page-motion";

type FaqItem = {
  question: string;
  answer: string;
};

export default function FaqPage() {
  const page = siteData.faqPage;
  const items = page.items as FaqItem[];
  const [openIndex, setOpenIndex] = useState(0);

  const toggle = (index: number) => {
    setOpenIndex((current) => (current === index ? -1 : index));
  };

  return (
    <section className="w-full py-16 md:py-20 bg-white">
      <div className="container mx-auto px-4 max-w-[1340px]">
        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.35fr)] gap-10 lg:gap-14 items-start">
          <div className="lg:sticky lg:top-28">
            <motion.div
              initial={fadeUp.initial}
              animate={fadeUp.animate}
              transition={easeOut}
              className="flex items-center gap-3 mb-4"
            >
              <span className="w-8 h-px bg-[#36b9b3]" />
              <p className="text-[13px] font-semibold tracking-[0.16em] uppercase text-[#2f5c97]">
                {page.cursiveText}
              </p>
              <span className="w-8 h-px bg-[#36b9b3]" />
            </motion.div>

            <FlipUpTitle
              part1={page.headingPart1}
              part2={page.headingPart2}
              className="text-[34px] md:text-[44px] font-bold text-[#0d2a4c] leading-[1.15] mb-5 text-left"
              accentClassName="text-[#2f5c97]"
            />

            <motion.div
              initial={fadeUp.initial}
              animate={fadeUp.animate}
              transition={{ ...easeOut, delay: 0.35 }}
            >
            <p className="text-[15px] text-gray-500 leading-relaxed mb-8 max-w-md">
              {page.description}
            </p>

            <div className="rounded-[22px] bg-[#eef6fc] px-6 py-7">
              <div className="w-14 h-14 rounded-full bg-[#0d2a4c] text-white flex items-center justify-center mb-5">
                <Headphones size={24} strokeWidth={1.8} />
              </div>
              <p className="text-[12px] font-semibold tracking-[0.12em] uppercase text-[#2f5c97] mb-2">
                {page.helpEyebrow}
              </p>
              <h3 className="text-[24px] font-bold text-[#0d2a4c] mb-2">{page.helpTitle}</h3>
              <p className="text-[14px] text-gray-500 leading-relaxed mb-6">{page.helpDescription}</p>
              <Link
                href={page.ctaHref}
                className="inline-flex items-center gap-2 bg-[#0d2a4c] hover:bg-[#163a63] text-white font-semibold px-6 py-3 rounded-lg transition-colors"
              >
                {page.ctaButton}
                <ArrowRight size={16} />
              </Link>
            </div>
            </motion.div>
          </div>

          <div className="space-y-3">
            {items.map((item, index) => {
              const isOpen = openIndex === index;
              const number = index + 1;

              return (
                <motion.div
                  key={item.question}
                  initial={fadeUp.initial}
                  animate={fadeUp.animate}
                  transition={staggerDelay(index, 0.05)}
                  className={`overflow-hidden rounded-[14px] border transition-colors ${
                    isOpen ? "border-[#0d2a4c]" : "border-[#dce8f5] bg-white"
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => toggle(index)}
                    className={`w-full flex items-center gap-4 text-left px-5 py-4 transition-colors ${
                      isOpen ? "bg-[#0d2a4c] text-white" : "bg-white text-[#0d2a4c]"
                    }`}
                    aria-expanded={isOpen}
                  >
                    <span className={`flex-1 text-[15px] md:text-[16px] font-semibold leading-snug ${isOpen ? "text-white" : "text-[#0d2a4c]"}`}>
                      {number}. {item.question}
                    </span>
                    <span
                      className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                        isOpen
                          ? "bg-white text-[#0d2a4c]"
                          : "bg-[#e8f3fb] text-[#2f5c97]"
                      }`}
                    >
                      {isOpen ? <Minus size={16} strokeWidth={2.5} /> : <Plus size={16} strokeWidth={2.5} />}
                    </span>
                  </button>

                  <div
                    className={`grid transition-[grid-template-rows] duration-300 ease-out ${
                      isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                    }`}
                  >
                    <div className="overflow-hidden">
                      <div className="bg-[#f3f7fb] px-5 py-4">
                        <p className="text-[14px] md:text-[15px] text-gray-600 leading-relaxed">
                          {item.answer}
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
