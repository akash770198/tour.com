"use client";

import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import siteData from "../data/site.json";

export default function WhyChooseUs() {
  const { whyChooseUsSection } = siteData;

  return (
    <section className="py-16 bg-white w-full overflow-hidden">
      <div className="container mx-auto px-4 max-w-[1340px]">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 items-center">
          
          {/* Left Column: Content */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex flex-col"
          >
            <div className="flex items-center mb-4">
              <p className="font-cursive text-3xl md:text-4xl text-[#36b9b3] font-script">
                {whyChooseUsSection.cursiveText}
              </p>
              <div className="w-16 h-[2px] bg-gray-200 ml-4 mt-2"></div>
            </div>
            
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-[#0d2a4c] leading-tight">
              {whyChooseUsSection.headingPart1} <span className="text-[#36b9b3]">{whyChooseUsSection.headingPart2}</span>
            </h2>
            
            <p className="text-gray-600 text-base md:text-lg mb-10 leading-relaxed max-w-xl">
              {whyChooseUsSection.description}
            </p>

            {/* Features Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-10">
              {whyChooseUsSection.features.map((feature, idx) => (
                <motion.div 
                  key={idx} 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="bg-[#f4faff] rounded-2xl p-6 border-l-4 border-[#008cba] hover:-translate-y-1 hover:shadow-lg transition-all duration-300"
                >
                  <h4 className="text-[#0d2a4c] font-bold text-lg mb-2">{feature.title}</h4>
                  <p className="text-gray-500 text-sm leading-relaxed">{feature.description}</p>
                </motion.div>
              ))}
            </div>

            <div>
              <button className="bg-[#006699] hover:bg-[#005580] text-white px-8 py-3.5 rounded-full font-medium transition-all duration-300 hover:shadow-lg hover:-translate-y-1 flex items-center gap-2 shadow-md group">
                {whyChooseUsSection.buttonText} <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </motion.div>

          {/* Right Column: Images Collage */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative mt-12 lg:mt-0 h-[600px] w-full flex items-center justify-center group"
          >
            
            {/* Main Back Image */}
            <div className="absolute left-0 top-4 w-[60%] h-[75%] rounded-[30px] overflow-hidden shadow-xl border-[6px] border-white z-10 transition-transform duration-500 group-hover:-translate-y-4">
              {whyChooseUsSection.image1 ? (
                <Image src={whyChooseUsSection.image1} alt="Choose Us 1" fill className="object-cover" />
              ) : (
                <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-400">Image 1 Placeholder</div>
              )}
            </div>

            {/* Right Overlapping Image (Tilted) */}
            <div className="absolute right-0 top-[15%] w-[55%] h-[65%] rounded-[30px] overflow-hidden shadow-2xl border-[6px] border-white z-20 transition-transform duration-500 group-hover:rotate-6 group-hover:scale-105" style={{ transform: "rotate(4deg)" }}>
              {whyChooseUsSection.image2 ? (
                <Image src={whyChooseUsSection.image2} alt="Choose Us 2" fill className="object-cover" />
              ) : (
                <div className="w-full h-full bg-gray-300 flex items-center justify-center text-gray-500">Image 2 Placeholder</div>
              )}
              
              {/* Text Overlay on Tilted Image */}
              <div className="absolute top-6 right-6 flex flex-col items-end text-[#0d2a4c] font-cursive text-3xl font-script leading-none" style={{ transform: "rotate(-4deg)" }}>
                <span>{whyChooseUsSection.image2Text1}</span>
                <span>{whyChooseUsSection.image2Text2}</span>
                <span>{whyChooseUsSection.image2Text3}</span>
                <span>{whyChooseUsSection.image2Text4}</span>
              </div>
            </div>

            {/* Bottom Overlapping Small Image */}
            <div className="absolute left-[15%] bottom-0 w-[45%] h-[40%] rounded-[20px] overflow-hidden shadow-2xl border-[6px] border-white z-30 transition-transform duration-500 group-hover:translate-y-2 group-hover:-translate-x-2">
              {whyChooseUsSection.image3 ? (
                <Image src={whyChooseUsSection.image3} alt="Choose Us 3" fill className="object-cover" />
              ) : (
                <div className="w-full h-full bg-gray-400 flex items-center justify-center text-gray-600 text-sm">Image 3 Placeholder</div>
              )}
            </div>

          </motion.div>

        </div>
      </div>
    </section>
  );
}
