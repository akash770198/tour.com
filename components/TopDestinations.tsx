"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, MapPin, Clock, Plane } from "lucide-react";
import { motion } from "framer-motion";
import { site, SectionProps, TourTopDestinationsData } from "@/data";

export default function TopDestinations({ data, className }: SectionProps<TourTopDestinationsData> = {}) {
  const destinationsSection = data || site.destinationsSection;

  return (
    <section className={`py-16 bg-white w-full ${className ?? ""}`}>
      <div className="container mx-auto px-4 max-w-[1340px]">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col items-center text-center mb-16"
        >
          <div className="flex items-center justify-center mb-2">
            <p className="font-cursive text-3xl md:text-4xl text-[#36b9b3] font-script">
              {destinationsSection.cursiveText}
            </p>
            <div className="ml-3 mt-2 flex items-start">
              <svg width="44" height="30" viewBox="0 0 44 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M0 25 Q 22 25 42 10" stroke="#36b9b3" strokeWidth="1.5" strokeDasharray="3 3" fill="none" />
              </svg>
              <Plane size={32} strokeWidth={1} className="-ml-1 -mt-4 text-[#5a8fc4] fill-[#5a8fc4]" />
            </div>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-[#0d2a4c]">
            {destinationsSection.headingPart1} <span className="text-[#36b9b3]">{destinationsSection.headingPart2}</span>
          </h2>
          <p className="text-gray-500 max-w-2xl text-sm md:text-base leading-relaxed">
            {destinationsSection.description}
          </p>
        </motion.div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {destinationsSection.items.map((item, idx) => (
            <motion.div 
              key={idx} 
              initial={{ opacity: 0, y: 30, rotate: item.rotation }}
              whileInView={{ opacity: 1, y: 0, rotate: item.rotation }}
              whileHover={{ y: -10, rotate: item.rotation, scale: 1.02 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.4 }}
              className="group relative w-full aspect-[3/4] rounded-[2rem] overflow-hidden cursor-pointer"
            >
              <div className="w-full aspect-[4/3] rounded-3xl bg-gray-100 overflow-hidden mb-5 shadow-lg relative group-hover:shadow-xl transition-shadow duration-300">
                {item.image ? (
                  <Image src={item.image} alt={item.name} fill className="object-cover transition-transform duration-500 group-hover:scale-110" />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center text-gray-400 text-sm">Image Placeholder</div>
                )}
              </div>
              <h3 className="text-xl font-bold text-[#0d2a4c] mb-1">{item.name}</h3>
              <Link href="#" className="text-sm text-[#36b9b3] hover:text-[#2c9893] transition-colors">{item.linkText}</Link>
              <div className="w-8 h-[3px] bg-[#36b9b3] mt-2 rounded-full"></div>
            </motion.div>
          ))}
        </div>

        {/* Button */}
        <div className="flex justify-center">
          <Link
            href="/destinations"
            className="bg-[#36b9b3] hover:bg-[#2c9893] text-white px-8 py-3.5 rounded-full font-medium transition-colors flex items-center gap-2 shadow-md"
          >
            {destinationsSection.buttonText} <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    </section>
  );
}
