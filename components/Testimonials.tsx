"use client";

import { useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { site, SectionProps, TourTestimonialData } from "@/data";

export default function Testimonials({ data, className }: SectionProps<TourTestimonialData> = {}) {
  const testimonialSection = data || site.testimonialSection;
  const { items } = testimonialSection;
  const [currentIndex, setCurrentIndex] = useState(2); // Start at 2 so there's enough history for prev items

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % items.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + items.length) % items.length);
  };

  const getVisibleIndices = () => {
    const visible = [];
    // We want 4 items: 2 before the active, the active (index 2), and 1 after the active.
    for (let i = -2; i <= 1; i++) {
      visible.push((currentIndex + i + items.length) % items.length);
    }
    return visible;
  };

  const QuoteIcon = () => (
    <svg width="60" height="50" viewBox="0 0 60 50" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M22.5 50H0L12.5 0H35L22.5 50ZM60 50H37.5L50 0H72.5L60 50Z" fill="#008cba" style={{ transform: "scale(0.7)" }} />
    </svg>
  );

  return (
    <section className={`py-16 bg-white w-full overflow-hidden ${className ?? ""}`}>
      <div className="container mx-auto px-4 max-w-[1340px]">
        
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row items-start md:items-end justify-between mb-12"
        >
          <div>
            <div className="flex items-center mb-2">
              <p className="font-cursive text-3xl md:text-4xl text-[#36b9b3] font-script mr-4">
                {testimonialSection.cursiveText}
              </p>
              <div className="w-16 h-[2px] bg-gray-200 mt-2"></div>
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#0d2a4c]">
              {testimonialSection.headingPart1} <span className="text-[#36b9b3]">{testimonialSection.headingPart2}</span>
            </h2>
          </div>
          
          {/* Arrow Navigation */}
          <div className="flex items-center space-x-4 mt-6 md:mt-0">
            <button 
              onClick={prevSlide}
              className="w-14 h-14 rounded-full border border-gray-200 hover:bg-[#008cba] hover:border-[#008cba] text-gray-500 hover:text-white flex items-center justify-center transition-all duration-300 shadow-sm"
              aria-label="Previous slide"
            >
              <ChevronLeft size={24} />
            </button>
            <button 
              onClick={nextSlide}
              className="w-14 h-14 rounded-full bg-[#006699] hover:bg-[#005580] text-white flex items-center justify-center transition-all duration-300 shadow-md"
              aria-label="Next slide"
            >
              <ChevronRight size={24} />
            </button>
          </div>
        </motion.div>

        {/* Carousel Grid */}
        <div className="relative w-full h-[500px] md:h-[400px] flex flex-col md:flex-row gap-4 lg:gap-6">
          <AnimatePresence mode="popLayout">
            {getVisibleIndices().map((idx, pos) => {
              const item = items[idx];
              const isActive = pos === 2; // The 3rd item is the active text card
              
              return (
                <motion.div
                  key={`${idx}-${pos}-${currentIndex}`} // Force re-render for animation
                  initial={{ opacity: 0, x: 50, scale: 0.95 }}
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  exit={{ opacity: 0, x: -50, scale: 0.95 }}
                  transition={{ duration: 0.5, type: "spring", bounce: 0.2 }}
                  className={`relative rounded-[30px] overflow-hidden ${
                    isActive 
                      ? 'flex-[2.5] bg-[#f4faff] border border-blue-100 shadow-lg p-6 lg:p-10 flex flex-col justify-between z-10' 
                      : 'flex-1 shadow-md opacity-90 hover:opacity-100 hidden md:block'
                  }`}
                >
                  {isActive ? (
                    // Active Text Card
                    <div className="flex flex-col h-full justify-between">
                      <div>
                        <div className="mb-4">
                          <QuoteIcon />
                        </div>
                        <p className="text-[#0d2a4c]/80 text-lg lg:text-xl font-medium leading-relaxed mb-6">
                          "{item.quote}"
                        </p>
                      </div>
                      
                      <div>
                        <div className="w-full h-px bg-gray-200 mb-6" />
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                          <div>
                            <h4 className="text-[#0d2a4c] font-bold text-xl">{item.name}</h4>
                            <p className="text-gray-500 text-sm">{item.title}</p>
                          </div>
                          <div className="flex text-[#ffc107]">
                            {[...Array(5)].map((_, i) => (
                              <Star 
                                key={i} 
                                size={20} 
                                fill={i < item.rating ? "currentColor" : "none"} 
                                className={i < item.rating ? "" : "text-gray-300"} 
                              />
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    // Inactive Image Card
                    <div className="w-full h-full relative">
                      {item.image ? (
                        <Image src={item.image} alt={item.name} fill className="object-cover" />
                      ) : (
                        <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-400 text-xs text-center p-4">
                          Image<br/>{item.name}
                        </div>
                      )}
                      {/* Optional overlay for inactive items */}
                      <div className="absolute inset-0 bg-black/10 transition-opacity hover:bg-transparent" />
                    </div>
                  )}
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
}
