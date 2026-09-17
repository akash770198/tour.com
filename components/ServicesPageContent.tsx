"use client";

import Image from "next/image";
import Link from "next/link";
import { Plane, Building, Bus, FileText, ShieldCheck, Compass, Headphones, ArrowRight, MapPin } from "lucide-react";
import { motion } from "framer-motion";
import siteData from "../data/site.json";
import FlipUpTitle from "./FlipUpTitle";
import { easeOut, fadeUp, staggerDelay } from "../lib/page-motion";

export default function ServicesPageContent() {
  const { servicesPageSection } = siteData;

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case "Plane": return <Plane size={24} strokeWidth={1.5} />;
      case "Building": return <Building size={24} strokeWidth={1.5} />;
      case "Map": return <MapPin size={24} strokeWidth={1.5} />;
      case "Bus": return <Bus size={24} strokeWidth={1.5} />;
      case "FileText": return <FileText size={24} strokeWidth={1.5} />;
      case "ShieldCheck": return <ShieldCheck size={24} strokeWidth={1.5} />;
      case "Compass": return <Compass size={24} strokeWidth={1.5} />;
      case "Headphones": return <Headphones size={24} strokeWidth={1.5} />;
      default: return <Plane size={24} strokeWidth={1.5} />;
    }
  };

  return (
    <section className="py-20 bg-white w-full relative overflow-hidden">
      {/* Decorative Flying Plane & Route */}
      <div className="absolute top-0 left-[-20px] lg:left-0 text-[#008cba]/20 hidden md:block w-64 h-48 opacity-60">
        <svg width="100%" height="100%" viewBox="0 0 200 150" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M 0 150 Q 80 100 140 65" stroke="currentColor" strokeWidth="2.5" strokeDasharray="6 6" fill="none" />
        </svg>
        <div className="absolute top-[44px] left-[168px]">
          <Plane size={48} className="text-[#008cba]/30 fill-[#008cba]/30" strokeWidth={1} />
        </div>
      </div>

      <div className="container mx-auto px-4 max-w-[1340px] relative z-10">
        <div className="flex flex-col items-center text-center mb-16">
          <motion.div
            initial={fadeUp.initial}
            animate={fadeUp.animate}
            transition={easeOut}
            className="flex items-center gap-4 mb-4"
          >
            <span className="h-[2px] w-12 bg-[#008cba]/30"></span>
            <span className="text-[13px] font-bold tracking-[0.2em] text-[#008cba] uppercase">
              {servicesPageSection.cursiveText}
            </span>
            <span className="h-[2px] w-12 bg-[#008cba]/30"></span>
          </motion.div>

          <FlipUpTitle
            part1={servicesPageSection.headingPart1}
            part2={servicesPageSection.headingPart2}
            className="text-4xl md:text-5xl font-bold mb-4 text-[#0d2a4c]"
            accentClassName="text-[#008cba]"
          />
          <motion.p
            initial={fadeUp.initial}
            animate={fadeUp.animate}
            transition={{ ...easeOut, delay: 0.4 }}
            className="text-gray-500 max-w-2xl text-sm md:text-base leading-relaxed"
          >
            {servicesPageSection.description}
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-2">
          {servicesPageSection.items.map((item, idx) => (
            <motion.div
              key={idx}
              initial={fadeUp.initial}
              animate={fadeUp.animate}
              transition={staggerDelay(idx)}
              className="bg-white rounded-[24px] overflow-hidden shadow-[0_4px_25px_rgba(0,0,0,0.06)] border border-gray-100 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 flex flex-col group"
            >
              <div className="relative w-full aspect-[16/9] bg-gray-200">
                {item.image ? (
                  <Image src={item.image} alt={item.title} fill className="object-cover" />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center text-gray-400 text-sm">Image Placeholder</div>
                )}
              </div>

              <div className="relative p-8 pt-10 flex flex-col flex-1">
                <div className="absolute -top-8 left-8 w-16 h-16 bg-[#008cba] rounded-full border-[5px] border-white flex items-center justify-center text-white z-10 shadow-sm">
                  {getIcon(item.icon)}
                </div>

                <h3 className="text-[22px] font-bold text-[#0d2a4c] mb-2">{item.title}</h3>
                <p className="text-gray-500 text-[15px] leading-relaxed mb-6 flex-1 pr-12">
                  {item.description}
                </p>

                <Link href={`/services/${item.slug}`} className="absolute bottom-8 right-8 w-11 h-11 rounded-full bg-[#f0f7fc] flex items-center justify-center text-[#008cba] group-hover:bg-[#008cba] group-hover:text-white transition-colors">
                  <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
