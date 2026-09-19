"use client";

import Image from "next/image";
import Link from "next/link";
import { Plane, Building, Map, Bus, FileText, ShieldCheck, Compass, Headphones, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { site, SectionProps, TourServicesData } from "@/data";

export default function OurServices({ data, className }: SectionProps<TourServicesData> = {}) {
  const ourServicesSection = data || site.ourServicesSection;

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case "Plane": return <Plane size={24} />;
      case "Building": return <Building size={24} />;
      case "Map": return <Map size={24} />;
      case "Bus": return <Bus size={24} />;
      case "FileText": return <FileText size={24} />;
      case "ShieldCheck": return <ShieldCheck size={24} />;
      case "Compass": return <Compass size={24} />;
      case "Headphones": return <Headphones size={24} />;
      default: return <Plane size={24} />;
    }
  };

  return (
    <section className={`py-16 bg-gradient-to-b from-[#eaf4fa] to-[#f4faff] w-full ${className ?? ""}`}>
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
              {ourServicesSection.cursiveText}
            </p>
            <div className="ml-3 mt-2 flex items-center">
              <div className="w-12 h-[1px] bg-[#36b9b3] mr-2"></div>
              <Plane size={16} className="text-[#36b9b3]" style={{ transform: "rotate(45deg)" }} />
            </div>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-[#0d2a4c]">
            {ourServicesSection.headingPart1} <span className="text-[#36b9b3]">{ourServicesSection.headingPart2}</span>
          </h2>
          <p className="text-gray-500 max-w-2xl text-sm md:text-base leading-relaxed">
            {ourServicesSection.description}
          </p>
        </motion.div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 px-2">
          {ourServicesSection.items.map((item, idx) => (
            <motion.div 
              key={idx} 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="bg-white rounded-3xl overflow-hidden shadow-md hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 flex flex-col relative group"
            >
              {/* Image Half */}
              <div className="relative w-full h-48 bg-gray-200">
                {item.image ? (
                  <Image src={item.image} alt={item.title} fill className="object-cover" />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center text-gray-400 text-sm">Image Placeholder</div>
                )}
              </div>

              {/* Floating Icon */}
              <div className="absolute top-[165px] left-6 w-14 h-14 bg-[#008cba] rounded-full border-4 border-white flex items-center justify-center text-white z-10 shadow-sm">
                {getIcon(item.icon)}
              </div>

              {/* Content Half */}
              <div className="p-6 pt-10 flex flex-col flex-1">
                <h3 className="text-xl font-bold text-[#0d2a4c] mb-2">{item.title}</h3>
                <p className="text-gray-500 text-sm mb-6 flex-1">{item.description}</p>
                
                <Link href={"href" in item && item.href ? item.href : "#"} className="flex items-center justify-between group">
                  <span className="text-sm font-semibold text-[#008cba] group-hover:text-[#007ba3] transition-colors">{item.linkText}</span>
                  <div className="w-8 h-8 rounded-full bg-[#e3f4f8] flex items-center justify-center text-[#008cba] group-hover:bg-[#008cba] group-hover:text-white transition-colors">
                    <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
