"use client";

import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { motion } from "framer-motion";
import siteData from "../data/site.json";
import { easeOut, fadeUp, staggerDelay } from "../lib/page-motion";

type SitemapLink = {
  name: string;
  href: string;
};

type SitemapGroup = {
  title: string;
  links: SitemapLink[];
};

type SitemapColumn = {
  title: string;
  links?: SitemapLink[];
  groups?: SitemapGroup[];
};

function SitemapLinkItem({ link }: { link: SitemapLink }) {
  return (
    <li>
      <Link
        href={link.href}
        className="inline-flex items-center gap-2 text-[15px] text-gray-600 hover:text-[#2f5c97] transition-colors py-1"
      >
        <ChevronRight size={14} className="text-[#2f5c97] shrink-0" />
        {link.name}
      </Link>
    </li>
  );
}

export default function SitemapPage() {
  const page = siteData.sitemapPage;
  const columns = page.columns as SitemapColumn[];

  return (
    <section className="w-full py-16 md:py-20 bg-white">
      <div className="container mx-auto px-4 max-w-[1340px]">
        <div className="flex flex-col items-center text-center mb-12 md:mb-14">
          <motion.h2
            initial={fadeUp.initial}
            animate={fadeUp.animate}
            transition={easeOut}
            className="text-4xl md:text-5xl font-bold text-[#0d2a4c] mb-4"
          >
            {page.brandTitle}
          </motion.h2>

          <motion.div
            initial={fadeUp.initial}
            animate={fadeUp.animate}
            transition={{ ...easeOut, delay: 0.1 }}
            className="flex items-center gap-4 mb-4"
          >
            <span className="hidden sm:block w-14 h-px bg-[#2f5c97]/40" />
            <p className="text-[13px] md:text-sm font-semibold tracking-[0.35em] uppercase text-[#2f5c97]">
              {page.label}
            </p>
            <span className="hidden sm:block w-14 h-px bg-[#2f5c97]/40" />
          </motion.div>

          <motion.p
            initial={fadeUp.initial}
            animate={fadeUp.animate}
            transition={{ ...easeOut, delay: 0.2 }}
            className="text-gray-500 max-w-xl text-sm md:text-base leading-relaxed"
          >
            {page.description}
          </motion.p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
          {columns.map((column, index) => (
            <motion.div
              key={column.title}
              initial={fadeUp.initial}
              animate={fadeUp.animate}
              transition={staggerDelay(index, 0.08)}
            >
              <h3 className="text-[18px] font-bold text-[#0d2a4c] mb-2">{column.title}</h3>
              <div className="w-10 h-[2px] bg-[#2f5c97] mb-5" />

              {column.links && (
                <ul className="space-y-1">
                  {column.links.map((link) => (
                    <SitemapLinkItem key={link.name} link={link} />
                  ))}
                </ul>
              )}

              {column.groups && (
                <div className="space-y-6">
                  {column.groups.map((group) => (
                    <div key={group.title}>
                      <h4 className="text-[15px] font-bold text-[#0d2a4c] mb-2">{group.title}</h4>
                      <ul className="space-y-1">
                        {group.links.map((link) => (
                          <SitemapLinkItem key={link.name} link={link} />
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
