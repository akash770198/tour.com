"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import siteData from "../data/site.json";

export default function MissionVision() {
  const { missionVisionSection } = siteData;
  const { mission, vision } = missionVisionSection;

  return (
    <section className="py-20 bg-white overflow-hidden">
      <div className="container mx-auto px-4 max-w-[1340px]">
        
        {/* MISSION ROW */}
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-20 mb-32">
          
          {/* Mission Text Content */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex-1 max-w-xl"
          >
            <div className="flex items-center gap-4 mb-4">
              <span className="text-[12px] font-bold tracking-[0.2em] text-gray-500 uppercase">
                {mission.preTitle}
              </span>
              <span className="h-[2px] w-12 bg-gray-300"></span>
            </div>
            
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-[#0d2a4c] leading-tight">
              {mission.titlePart1} <br />
              <span className="text-[#008cba]">{mission.titlePart2}</span>
            </h2>
            
            <p className="text-gray-500 text-lg leading-relaxed">
              {mission.description}
            </p>
          </motion.div>

          {/* Mission Image Area */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex-1 relative w-full flex justify-center lg:justify-end"
          >
            {/* Background Shape */}
            <div className="absolute top-[-20px] lg:top-[-30px] right-4 lg:right-10 w-[80%] h-full bg-[#e3ecf5] rounded-[40px] z-0"></div>
            
            {/* Main Image Container */}
            <div className="relative z-10 w-full max-w-[500px] aspect-[4/3] rounded-[40px] overflow-hidden shadow-xl">
              {mission.image ? (
                <Image src={mission.image} alt="Mission" fill className="object-cover" />
              ) : (
                <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-400">
                  Mission Image
                </div>
              )}
            </div>

            {/* Vertical Small Text */}
            <div className="absolute right-[-20px] lg:right-[-40px] top-1/4 flex flex-col gap-1 text-[10px] font-bold text-[#0d2a4c] tracking-[0.3em] uppercase writing-vertical">
              <span className="block mb-1">{mission.smallText1}</span>
              <span className="block mb-1">{mission.smallText2}</span>
              <span className="block">{mission.smallText3}</span>
            </div>

            {/* Overlapping Cursive Text */}
            <div className="absolute -bottom-10 right-4 lg:right-10 z-20 text-7xl md:text-9xl font-cursive text-[#c0dae9] opacity-70 rotate-[-10deg] pointer-events-none select-none">
              {mission.cursiveText}
            </div>
          </motion.div>
        </div>


        {/* VISION ROW */}
        <div className="flex flex-col-reverse lg:flex-row items-center justify-between gap-12 lg:gap-20">
          
          {/* Vision Image Area */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex-1 relative w-full flex justify-center lg:justify-start mt-10 lg:mt-0"
          >
            {/* Background Shape */}
            <div className="absolute top-[-20px] lg:top-[-30px] left-4 lg:left-0 w-[90%] h-[110%] bg-[#0d2a4c] rounded-[40px] rounded-tl-none rounded-br-none rounded-bl-[80px] rounded-tr-[80px] z-0"></div>
            
            {/* Vertical Small Text (Left side) */}
            <div className="absolute left-4 lg:left-6 -top-2 flex flex-col gap-1 text-[10px] font-bold text-white tracking-[0.3em] uppercase z-30">
              <span className="block drop-shadow-md">{vision.smallText1}</span>
              <span className="block drop-shadow-md">{vision.smallText2}</span>
              <span className="block drop-shadow-md">{vision.smallText3}</span>
            </div>

            {/* Main Image Container */}
            <div className="relative z-10 w-full max-w-[500px] aspect-[4/3] rounded-[40px] overflow-hidden shadow-xl mt-12 lg:ml-20">
              {vision.image ? (
                <Image src={vision.image} alt="Vision" fill className="object-cover" />
              ) : (
                <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-400">
                  Vision Image
                </div>
              )}
            </div>

            {/* Overlapping Cursive Text */}
            <div className="absolute bottom-4 left-4 lg:left-10 z-30 text-7xl md:text-9xl font-cursive text-white opacity-50 rotate-[-10deg] pointer-events-none select-none drop-shadow-lg">
              {vision.cursiveText}
            </div>
          </motion.div>

          {/* Vision Text Content */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex-1 max-w-xl"
          >
            <div className="flex items-center gap-4 mb-4">
              <span className="text-[12px] font-bold tracking-[0.2em] text-gray-500 uppercase">
                {vision.preTitle}
              </span>
              <span className="h-[2px] w-12 bg-gray-300"></span>
            </div>
            
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-[#0d2a4c] leading-tight">
              {vision.titlePart1} <br />
              <span className="text-[#008cba]">{vision.titlePart2}</span>
            </h2>
            
            <p className="text-gray-500 text-lg leading-relaxed">
              {vision.description}
            </p>
          </motion.div>
          
        </div>
        
      </div>
    </section>
  );
}
