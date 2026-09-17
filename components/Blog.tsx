"use client";

import Image from "next/image";
import Link from "next/link";
import { Calendar, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import siteData from "../data/site.json";

export default function Blog() {
  const { blogSection } = siteData;

  return (
    <section className="py-16 bg-white w-full overflow-hidden">
      <div className="container mx-auto px-4 max-w-[1340px]">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col items-center text-center mb-16"
        >
          <div className="flex items-center justify-center mb-2">
            <div className="w-16 h-[2px] bg-gray-200 mt-2 mr-4 hidden md:block"></div>
            <p className="font-cursive text-3xl md:text-4xl text-[#36b9b3] font-script">
              {blogSection.cursiveText}
            </p>
            <div className="w-16 h-[2px] bg-gray-200 mt-2 ml-4 hidden md:block"></div>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-[#0d2a4c]">
            {blogSection.headingPart1} <span className="text-[#008cba]">{blogSection.headingPart2}</span>
          </h2>
          <p className="text-gray-500 max-w-2xl text-sm md:text-base leading-relaxed">
            {blogSection.description}
          </p>
        </motion.div>

        {/* Blog Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogSection.items.map((item, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-md hover:shadow-xl hover:-translate-y-2 transition-all duration-300 flex flex-col group cursor-pointer"
            >
              {/* Image Container */}
              <div className="relative w-full aspect-[4/3] overflow-hidden bg-gray-100">
                {item.image ? (
                  <Image 
                    src={item.image} 
                    alt={item.title} 
                    fill 
                    className="object-cover transition-transform duration-500 group-hover:scale-110" 
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-400">
                    Blog Image Placeholder
                  </div>
                )}
              </div>

              {/* Content Container */}
              <div className="p-6 md:p-8 flex flex-col flex-grow">
                {/* Meta row */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center text-gray-500 text-sm font-medium">
                    <Calendar size={16} className="mr-2 text-[#008cba]" />
                    {item.date}
                  </div>
                  <span className="bg-[#eaf4fa] text-[#008cba] text-xs font-bold px-3 py-1 rounded-full">
                    {item.category}
                  </span>
                </div>

                {/* Title & Description */}
                <h3 className="text-xl md:text-2xl font-bold text-[#0d2a4c] mb-3 group-hover:text-[#008cba] transition-colors line-clamp-2">
                  <Link href={`/blog/${item.slug}`}>{item.title}</Link>
                </h3>
                <p className="text-gray-500 text-sm md:text-base leading-relaxed mb-6 line-clamp-3 flex-grow">
                  {item.description}
                </p>

                {/* Footer link */}
                <div className="mt-auto">
                  <Link href={`/blog/${item.slug}`} className="inline-flex items-center font-bold text-[#008cba] hover:text-[#005580] transition-colors group/link">
                    Read More 
                    <ArrowRight size={16} className="ml-2 group-hover/link:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
