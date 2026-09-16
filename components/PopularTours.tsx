"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Star, Calendar } from "lucide-react";
import { motion } from "framer-motion";
import siteData from "../data/site.json";

const GAP = "1.5rem"; // must match gap-6

function useVisibleCount() {
  const [visible, setVisible] = useState(4);

  useEffect(() => {
    const update = () => {
      const w = window.innerWidth;
      if (w < 768) setVisible(1);
      else if (w < 1024) setVisible(2);
      else setVisible(4);
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  return visible;
}

export default function PopularTours() {
  const { popularToursSection } = siteData;
  const items = popularToursSection.items;
  
  const [offset, setOffset] = useState(0);
  const visible = useVisibleCount();
  const canSlide = items.length > visible;

  // Duplicate so sliding past the end stays seamless
  const trackItems = useMemo(() => {
    if (!items.length) return [];
    if (!canSlide) return items;
    return [...items, ...items];
  }, [items, canSlide]);

  useEffect(() => {
    setOffset(0);
  }, [visible]);

  useEffect(() => {
    if (!canSlide) return;
    const timer = window.setInterval(() => {
      setOffset((prev) => {
        const next = prev + 1;
        return next >= items.length ? 0 : next;
      });
    }, 4000);
    return () => window.clearInterval(timer);
  }, [canSlide, items.length]);

  const moveLeft = () => {
    if (!canSlide) return;
    setOffset((prev) => (prev - 1 + items.length) % items.length);
  };

  const moveRight = () => {
    if (!canSlide) return;
    setOffset((prev) => (prev + 1) % items.length);
  };

  const cardWidth = `calc((100% - ${(visible - 1)} * ${GAP}) / ${visible})`;
  const slideX = `calc(-${offset} * (100% + ${GAP}) / ${visible})`;

  return (
    <section className="py-16 bg-white w-full overflow-hidden relative">
      <div className="container mx-auto px-4 max-w-[1340px] relative">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col items-center text-center mb-16"
        >
          <div className="flex items-center justify-center mb-2">
            <p className="font-cursive text-3xl md:text-4xl text-[#36b9b3] font-script">
              {popularToursSection.cursiveText}
            </p>
            <div className="ml-3 mt-2">
              <svg width="60" height="30" viewBox="0 0 60 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M0 25 Q 25 25 45 10" stroke="#36b9b3" strokeWidth="1.5" strokeDasharray="3 3" fill="none" />
                <path d="M45 10 L49 2 L53 10 Z" fill="#2f5c97" transform="translate(1, -1.5) rotate(55 45 10)" />
              </svg>
            </div>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-[#0d2a4c]">
            {popularToursSection.headingPart1} <span className="text-[#36b9b3]">{popularToursSection.headingPart2}</span>
          </h2>
          <p className="text-gray-500 max-w-2xl text-sm md:text-base leading-relaxed">
            {popularToursSection.description}
          </p>
        </motion.div>

        {/* Carousel Container */}
        <div className="mt-6 md:mt-8 relative w-full flex flex-col items-center justify-center">
          <div className="w-full overflow-hidden mb-10 pb-4 pt-2">
            <motion.div
              className="flex gap-6"
              animate={{ x: canSlide ? slideX : 0 }}
              transition={{ duration: 0.7, ease: "easeInOut" }}
            >
              {trackItems.map((item, index) => (
                <div
                  key={`${item.title}-${index}`}
                  className="box-border shrink-0"
                  style={{ width: cardWidth }}
                >
                  <div className="relative h-full aspect-[4/5] rounded-3xl overflow-hidden group shadow-lg cursor-pointer transition-all duration-300">
                    {/* Background Image */}
                    <Image src={item.image} alt={item.title} fill className="object-cover transition-transform duration-500 group-hover:scale-110" />
                    
                    {/* Dark Gradient Overlay for text readability */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0d2a4c]/90 via-[#0d2a4c]/40 to-transparent" />

                    {/* Discount Badge */}
                    <div className="absolute top-4 left-4 bg-[#008cba] text-white text-xs font-bold px-3 py-1.5 rounded-full z-10">
                      {item.discount}
                    </div>

                    {/* Content at bottom */}
                    <div className="absolute bottom-0 left-0 w-full p-6 text-white z-10 flex flex-col">
                      <h3 className="text-2xl font-bold mb-1">{item.title}</h3>
                      
                      <div className="flex items-center mb-4 space-x-2">
                        <span className="font-semibold text-sm">From {item.price}</span>
                        <span className="text-xs text-gray-300 line-through">{item.originalPrice}</span>
                      </div>

                      {/* Divider line */}
                      <div className="w-full h-px bg-white/20 mb-4" />

                      <div className="flex items-center justify-between text-xs">
                        <div className="flex items-center text-[#ffc107]">
                          <Star size={14} fill="currentColor" className="mr-1" />
                          <span className="text-white font-medium">{item.rating}</span>
                        </div>
                        
                        <div className="w-px h-3 bg-white/30 mx-2" />
                        
                        <div className="flex items-center">
                          <Calendar size={14} className="mr-1 opacity-80" />
                          <span className="opacity-90">{item.duration}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Arrow Navigation */}
          {canSlide && (
            <div className="flex items-center justify-center space-x-4 mt-2">
              <button 
                onClick={moveLeft}
                className="w-12 h-12 rounded-full bg-[#e3f4f8] hover:bg-[#36b9b3] hover:text-white text-[#0d2a4c] flex items-center justify-center shadow-md transition-colors"
                aria-label="Previous slide"
              >
                <ChevronLeft size={24} />
              </button>
              <button 
                onClick={moveRight}
                className="w-12 h-12 rounded-full bg-[#008cba] hover:bg-[#007ba3] text-white flex items-center justify-center shadow-md transition-colors"
                aria-label="Next slide"
              >
                <ChevronRight size={24} />
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
