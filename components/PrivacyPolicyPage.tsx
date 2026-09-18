"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import siteData from "../data/site.json";
import { easeOut, fadeUp, staggerDelay } from "../lib/page-motion";

type PolicySection = {
  title: string;
  paragraphs: string[];
  bullets?: string[];
  contactLink?: boolean;
};

export default function PrivacyPolicyPage() {
  const page = siteData.privacyPolicyPage;
  const sections = page.sections as PolicySection[];

  return (
    <section className="w-full py-14 md:py-16 bg-white">
      <div className="container mx-auto px-4 max-w-[900px]">
        <div className="space-y-9 md:space-y-10">
          {sections.map((section, index) => (
            <motion.div
              key={section.title}
              initial={fadeUp.initial}
              animate={fadeUp.animate}
              transition={staggerDelay(index, 0.05)}
            >
              <h2 className="text-[22px] md:text-[24px] font-bold text-[#0d2a4c] mb-3">
                {section.title}
              </h2>

              {section.contactLink ? (
                <p className="text-[15px] md:text-[16px] text-gray-600 leading-relaxed">
                  If you have any questions about this Privacy Policy or how we handle your personal information, please visit our{" "}
                  <Link
                    href="/contact"
                    className="text-[#2f5c97] font-semibold hover:text-[#36b9b3] transition-colors"
                  >
                    Contact Us
                  </Link>{" "}
                  page or reach us at info@tour.com / +91 98765 43210.
                </p>
              ) : (
                section.paragraphs.map((paragraph) => (
                  <p
                    key={paragraph.slice(0, 48)}
                    className="text-[15px] md:text-[16px] text-gray-600 leading-relaxed mb-3 last:mb-0"
                  >
                    {paragraph}
                  </p>
                ))
              )}

              {section.bullets && section.bullets.length > 0 && (
                <ul className="mt-3 space-y-2.5">
                  {section.bullets.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-3 text-[15px] md:text-[16px] text-gray-600 leading-relaxed"
                    >
                      <span className="mt-2 w-1.5 h-1.5 rounded-full bg-[#2f5c97] shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              )}
            </motion.div>
          ))}
        </div>

        <motion.p
          initial={fadeUp.initial}
          animate={fadeUp.animate}
          transition={{ ...easeOut, delay: 0.45 }}
          className="mt-12 text-[14px] font-medium text-gray-500"
        >
          {page.lastUpdated}
        </motion.p>
      </div>
    </section>
  );
}
