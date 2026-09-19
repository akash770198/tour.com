"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

import { site, SectionProps, TourTeamData } from "@/data";

export default function OurTeam({ data, className }: SectionProps<TourTeamData> = {}) {
  const teamSection = data || site.teamSection;

  if (!teamSection) return null; // Safety fallback

  return (
    <section className={`py-20 bg-gray-50/30 ${className ?? ""}`}>
      <div className="container mx-auto px-4 max-w-[1340px]">
        
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col items-center text-center mb-16"
        >
          <div className="flex items-center gap-4 mb-2">
            <span className="h-[1px] w-12 bg-[#008cba]"></span>
            <span className="text-3xl font-cursive text-[#008cba]">
              {teamSection.preTitle}
            </span>
            <span className="h-[1px] w-12 bg-[#008cba]"></span>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-[#0d2a4c]">
            {teamSection.titlePart1} <span className="text-[#008cba]">{teamSection.titlePart2}</span>
          </h2>
          
          <p className="text-gray-500 max-w-2xl text-sm md:text-base leading-relaxed">
            {teamSection.description}
          </p>
        </motion.div>

        {/* Team Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">
          {teamSection.items.map((member, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.04)] overflow-hidden flex flex-col group hover:shadow-xl transition-shadow duration-300 border border-gray-100 h-full"
            >
              {/* Image Area */}
              <Link href={`/team/${member.slug}`} className="block relative w-full aspect-square bg-gray-100 overflow-hidden cursor-pointer">
                {member.image ? (
                  <Image 
                    src={member.image} 
                    alt={member.name} 
                    fill 
                    className="object-cover transition-transform duration-500 group-hover:scale-105" 
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-400">
                    No Image
                  </div>
                )}
              </Link>

              {/* Content Area */}
              <div className="pt-6 pb-8 px-6 text-center flex flex-col items-center">
                <Link href={`/team/${member.slug}`}>
                  <h3 className="text-xl font-bold text-[#0d2a4c] mb-1 hover:text-[#008cba] transition-colors cursor-pointer">
                    {member.name}
                  </h3>
                </Link>
                <p className="text-gray-500 text-sm mb-6">
                  {member.designation}
                </p>
                
                {/* Social Icons */}
                <div className="flex items-center gap-3">
                  <a href="#" className="w-8 h-8 rounded-full bg-[#f0f7fc] hover:bg-[#008cba] text-[#008cba] hover:text-white flex items-center justify-center transition-colors">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                      <rect x="2" y="9" width="4" height="12"></rect>
                      <circle cx="4" cy="4" r="2"></circle>
                    </svg>
                  </a>
                  <a href="#" className="w-8 h-8 rounded-full bg-[#f0f7fc] hover:bg-[#008cba] text-[#008cba] hover:text-white flex items-center justify-center transition-colors">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                    </svg>
                  </a>
                  <a href="#" className="w-8 h-8 rounded-full bg-[#f0f7fc] hover:bg-[#008cba] text-[#008cba] hover:text-white flex items-center justify-center transition-colors">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                    </svg>
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
