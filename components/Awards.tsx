"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { site, SectionProps, TourAwardsData } from "@/data";

export default function Awards({ data, className }: SectionProps<TourAwardsData> = {}) {
  const awardsSection = data || site.awardsSection;

  return (
    <section className={`py-20 bg-gray-50/50 ${className ?? ""}`}>
      <div className="container mx-auto px-4 max-w-[1340px]">
        
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col items-center text-center mb-16"
        >
          <div className="flex items-center gap-4 mb-4">
            <span className="h-[2px] w-8 bg-[#36b9b3]/50"></span>
            <span className="text-[12px] font-bold tracking-[0.2em] text-[#36b9b3] uppercase">
              {awardsSection.preTitle}
            </span>
            <span className="h-[2px] w-8 bg-[#36b9b3]/50"></span>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-[#0d2a4c]">
            {awardsSection.titlePart1} <span className="text-[#008cba]">{awardsSection.titlePart2}</span>
          </h2>
          
          <p className="text-gray-500 max-w-2xl text-sm md:text-base leading-relaxed">
            {awardsSection.description}
          </p>
        </motion.div>

        {/* Awards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          {awardsSection.items.map((award, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.05)] overflow-hidden flex flex-col group hover:-translate-y-2 transition-transform duration-300"
            >
              {/* Image Area */}
              <div className="relative w-full aspect-square">
                {award.image ? (
                  <Image
                    src={award.image}
                    alt={award.title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className="object-cover"
                  />
                ) : (
                  <div className="w-full h-full border-2 border-dashed border-gray-200 rounded-lg flex items-center justify-center text-gray-400 text-sm">
                    Award Image
                  </div>
                )}

                {/* Year Badge */}
                <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 bg-[#008cba] text-white text-xs font-bold px-6 py-1.5 rounded-full shadow-sm z-20">
                  {award.year}
                </div>
              </div>

              {/* Content Area */}
              <div className="pt-10 pb-8 px-6 text-center flex-1 flex flex-col">
                <h3 className="text-lg font-bold text-[#0d2a4c] mb-3 leading-tight">
                  {award.title}
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed mt-auto">
                  {award.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom Text Divider */}
        <div className="flex items-center justify-center gap-6 w-full max-w-4xl mx-auto">
          <span className="h-px bg-gray-300 flex-1"></span>
          <span className="text-[10px] font-bold tracking-[0.3em] text-[#008cba] uppercase whitespace-nowrap">
            {awardsSection.bottomText}
          </span>
          <span className="h-px bg-gray-300 flex-1"></span>
        </div>

      </div>
    </section>
  );
}
