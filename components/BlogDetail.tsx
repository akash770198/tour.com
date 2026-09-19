"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Plane } from "lucide-react";
import { motion } from "framer-motion";
import { site, SectionProps, TourBlogPost } from "@/data";
import { easeOut, fadeUp, staggerDelay } from "../lib/page-motion";

export default function BlogDetail({
  data,
  className,
}: SectionProps<TourBlogPost> & { data: TourBlogPost }) {
  const post = data;
  const sidebar = site.blogPage.sidebar;
  const recent = site.blogPage.items.filter((item) => item.slug !== post.slug).slice(0, 4);
  return (
    <section className={`w-full py-14 md:py-16 bg-white ${className ?? ""}`}>
      <div className="container mx-auto px-4 max-w-[1340px]">
        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_320px] xl:grid-cols-[minmax(0,1fr)_340px] gap-10 lg:gap-12 items-start">
          <motion.article
            initial={fadeUp.initial}
            animate={fadeUp.animate}
            transition={easeOut}
            className="min-w-0"
          >
            <div className="space-y-5 text-[15px] md:text-[16px] text-gray-600 leading-relaxed">
              {post.intro.map((paragraph) => (
                <p key={paragraph.slice(0, 48)}>{paragraph}</p>
              ))}
            </div>

            <h2 className="text-[26px] md:text-[30px] font-bold text-[#0d2a4c] mt-10 mb-4">
              {post.whyHeading}
            </h2>
            <p className="text-[15px] md:text-[16px] text-gray-600 leading-relaxed mb-8">
              {post.whyBody}
            </p>

            <div className="relative w-full aspect-[16/9] rounded-[18px] overflow-hidden mb-10 shadow-[0_12px_30px_rgba(13,42,76,0.1)]">
              <Image
                src={post.featuredImage || post.image}
                alt={post.title}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 70vw"
                priority
              />
            </div>

            <h2 className="text-[26px] md:text-[30px] font-bold text-[#0d2a4c] mb-4">
              {post.placesHeading}
            </h2>
            <p className="text-[15px] md:text-[16px] text-gray-600 leading-relaxed mb-8">
              {post.placesBody}
            </p>

            <h2 className="text-[26px] md:text-[30px] font-bold text-[#0d2a4c] mb-4">
              {post.timeHeading}
            </h2>
            <p className="text-[15px] md:text-[16px] text-gray-600 leading-relaxed mb-8">
              {post.timeBody}
            </p>

            <h2 className="text-[26px] md:text-[30px] font-bold text-[#0d2a4c] mb-4">
              {post.tipsHeading}
            </h2>
            <ul className="space-y-3 mb-10">
              {post.tips.map((tip) => (
                <li key={tip} className="flex items-start gap-3 text-[15px] text-gray-600 leading-relaxed">
                  <span className="mt-2 w-2 h-2 rounded-full bg-[#2f5c97] shrink-0" />
                  {tip}
                </li>
              ))}
            </ul>

            <blockquote className="rounded-[16px] bg-[#eef6fc] px-6 py-7 md:px-8 md:py-8 mb-8">
              <p className="text-[17px] md:text-[19px] font-medium text-[#0d2a4c] leading-relaxed italic mb-3">
                “{post.quote.text}”
              </p>
              <footer className="text-[14px] font-semibold text-[#2f5c97]">
                — {post.quote.attribution}
              </footer>
            </blockquote>

            <p className="text-[15px] md:text-[16px] text-gray-600 leading-relaxed">
              {post.closing}
            </p>
          </motion.article>

          <aside className="space-y-6 lg:sticky lg:top-32">
            <motion.div
              initial={fadeUp.initial}
              animate={fadeUp.animate}
              transition={{ ...easeOut, delay: 0.1 }}
              className="rounded-[18px] bg-[#eef6fc] px-5 py-6"
            >
              <h3 className="text-[18px] font-bold text-[#0d2a4c] mb-4">{sidebar.categoriesTitle}</h3>
              <ul className="space-y-1">
                {sidebar.categories.map((category) => (
                  <li key={category.name}>
                    <Link
                      href="/blog"
                      className="flex items-center justify-between gap-3 py-2.5 text-[14px] text-[#0d2a4c] hover:text-[#008cba] transition-colors border-b border-[#d7e8f5] last:border-0"
                    >
                      <span className="font-medium">{category.name}</span>
                      <span className="inline-flex items-center gap-2 text-[#2f5c97]">
                        <span className="tabular-nums">{category.count}</span>
                        <ArrowRight size={14} />
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              initial={fadeUp.initial}
              animate={fadeUp.animate}
              transition={{ ...easeOut, delay: 0.18 }}
              className="rounded-[18px] bg-white border border-gray-100 shadow-[0_8px_24px_rgba(13,42,76,0.06)] px-5 py-6"
            >
              <h3 className="text-[18px] font-bold text-[#0d2a4c] mb-5">{sidebar.recentTitle}</h3>
              <ul className="space-y-4">
                {recent.map((item) => (
                  <li key={item.slug}>
                    <Link href={`/blog/${item.slug}`} className="flex gap-3 group">
                      <span className="relative w-16 h-16 rounded-[10px] overflow-hidden shrink-0 bg-gray-100">
                        <Image
                          src={item.image}
                          alt={item.title}
                          fill
                          className="object-cover transition-transform duration-300 group-hover:scale-105"
                          sizes="64px"
                        />
                      </span>
                      <span className="min-w-0 pt-0.5">
                        <span className="block text-[14px] font-semibold text-[#0d2a4c] leading-snug line-clamp-2 group-hover:text-[#008cba] transition-colors">
                          {item.title}
                        </span>
                        <span className="block text-[12px] text-gray-400 mt-1">{item.date}</span>
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              initial={fadeUp.initial}
              animate={fadeUp.animate}
              transition={staggerDelay(3, 0.08)}
              className="rounded-[18px] bg-[#0d2a4c] px-6 py-8 text-white"
            >
              <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center mb-5">
                <Plane size={22} className="text-white" />
              </div>
              <h3 className="text-[22px] font-bold leading-snug mb-3">{sidebar.cta.title}</h3>
              <p className="text-[14px] text-white/75 leading-relaxed mb-6">{sidebar.cta.description}</p>
              <Link
                href={sidebar.cta.href}
                className="inline-flex items-center justify-center gap-2 w-full h-12 rounded-full bg-white text-[#0d2a4c] font-semibold hover:bg-[#36b9b3] hover:text-white transition-colors"
              >
                {sidebar.cta.buttonText}
                <ArrowRight size={16} />
              </Link>
            </motion.div>
          </aside>
        </div>
      </div>
    </section>
  );
}
