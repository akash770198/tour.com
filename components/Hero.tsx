"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ArrowLeft } from "lucide-react";
import siteData from "../data/site.json";

export default function Hero() {
  const { hero } = siteData;
  const [currentBanner, setCurrentBanner] = useState(0);

  // Auto-slide every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBanner((prev) => (prev + 1) % hero.banners.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [hero.banners.length]);

  const handleNext = () => {
    setCurrentBanner((prev) => (prev + 1) % hero.banners.length);
  };

  const handlePrev = () => {
    setCurrentBanner((prev) => (prev - 1 + hero.banners.length) % hero.banners.length);
  };

  return (
    <section className="relative w-full h-[600px] md:h-[700px] flex items-center overflow-hidden">
      {/* Animated Background Banners */}
      <div className="absolute inset-0 w-full h-full bg-black">
        <AnimatePresence mode="popLayout">
          <motion.div
            key={currentBanner}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            className="absolute inset-0 w-full h-full"
          >
            <Image
              src={hero.banners[currentBanner]}
              alt={`Hero Banner ${currentBanner + 1}`}
              fill
              className="object-cover"
              priority
            />
          </motion.div>
        </AnimatePresence>
        {/* Subtle gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#2f5c97]/60 to-transparent z-[5]" />
      
        {/* Wavy bottom border */}
        <div className="absolute bottom-[-1px] left-0 w-full z-10 pointer-events-none">
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            viewBox="0 0 1440 100" 
            preserveAspectRatio="none"
            className="w-full h-[30px] md:h-[45px] drop-shadow-[0_-8px_8px_rgba(255,255,255,1)]"
          >
            <path 
              d="M0,50 Q180,0 360,50 T720,50 T1080,50 T1440,50 L1440,100 L0,100 Z" 
              fill="#ffffff" 
            />
          </svg>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 relative z-10 max-w-[1340px]">
        <div className="flex justify-between items-center w-full">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="flex-1 pr-4 md:pr-12 text-white"
          >
            <p className="font-cursive text-4xl md:text-5xl mb-4 font-script">
              {hero.cursiveText}
            </p>
            <h1 className="text-5xl md:text-7xl font-bold leading-tight mb-6">
              {hero.heading}
            </h1>
            <p className="text-lg md:text-xl opacity-90 w-full leading-relaxed">
              {hero.description}
            </p>
          </motion.div>
          <div className="hidden md:flex flex-col gap-4 z-20">
            <button 
              onClick={handlePrev}
              className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-gray-600 hover:text-[#36b9b3] hover:shadow-lg transition-all"
            >
              <ArrowLeft size={24} />
            </button>
            <button 
              onClick={handleNext}
              className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-gray-600 hover:text-[#36b9b3] hover:shadow-lg transition-all"
            >
              <ArrowRight size={24} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
