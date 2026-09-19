"use client";

import Image from "next/image";
import { Users, Award, Handshake, Globe, Plane, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { site, SectionProps, TourAboutData } from "@/data";

export default function AboutUs({ data, className }: SectionProps<TourAboutData> = {}) {
  const aboutUsSection = data || site.aboutUsSection;

  return (
    <section className={`py-16 bg-white w-full overflow-hidden ${className ?? ""}`}>
      <div className="container mx-auto px-4 max-w-[1340px]">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 items-center">
          
          {/* Left Content (Text & Cards) */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex flex-col"
          >
            <div className="flex items-center mb-4">
              <p className="font-cursive text-3xl md:text-4xl text-[#36b9b3] font-script">
                {aboutUsSection.cursiveText}
              </p>
              <div className="w-16 h-[2px] bg-gray-200 ml-4 mt-2"></div>
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-[#0d2a4c] leading-tight">
              {aboutUsSection.headingPart1} {aboutUsSection.headingPart2} <span className="text-[#36b9b3]">{aboutUsSection.headingPart3}</span>
            </h2>
            <p className="text-gray-600 text-base md:text-lg mb-10 leading-relaxed max-w-xl">
              {aboutUsSection.description}
            </p>

            {/* Features Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mb-10">
              {aboutUsSection.features.map((feature, idx) => (
                <div key={idx} className="flex items-start">
                  <div className="w-14 h-14 rounded-full bg-[#e3f4f8] flex items-center justify-center flex-shrink-0 mr-5">
                    {idx === 0 && <Users size={24} className="text-[#0d2a4c]" />}
                    {idx === 1 && <Award size={24} className="text-[#0d2a4c]" />}
                    {idx === 2 && <Handshake size={24} className="text-[#0d2a4c]" />}
                    {idx === 3 && <Globe size={24} className="text-[#0d2a4c]" />}
                  </div>
                  <div>
                    <h4 className="text-[#0d2a4c] font-bold text-lg mb-1">{feature.title}</h4>
                    <p className="text-gray-500 text-sm leading-relaxed">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>

            <div>
              <button className="bg-[#008cba] hover:bg-[#007ba3] text-white px-8 py-3.5 rounded-full font-medium transition-all duration-300 hover:shadow-lg hover:-translate-y-1 flex items-center gap-2 shadow-md group">
                {aboutUsSection.buttonText} <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </motion.div>

          {/* Right Column: Images */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative mt-12 lg:mt-0 group"
          >
            {/* Background Blob */}
            <div className="absolute top-0 right-0 w-[95%] md:w-[90%] h-full bg-[#e8f7fa] rounded-[40px] md:rounded-[80px] rounded-tl-[100px] rounded-br-[120px] -z-10 translate-x-2 -translate-y-4 md:translate-x-4 md:-translate-y-6"></div>
            
            {/* Main Large Image */}
            <div className="relative w-[90%] md:w-[85%] ml-auto aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl transition-transform duration-500 group-hover:-translate-y-3">
              {aboutUsSection.mainImage ? (
                <Image src={aboutUsSection.mainImage} alt="About Us" fill className="object-cover" />
              ) : (
                <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-400">Main Image Placeholder</div>
              )}
            </div>

            {/* Smaller Overlapping Image & Badge Wrapper */}
            <div className="absolute bottom-[-10%] left-0 w-[55%] md:w-[45%] aspect-[4/3] z-20 transition-transform duration-500 group-hover:translate-x-3 group-hover:-translate-y-2">
              {/* Image itself */}
              <div className="w-full h-full rounded-3xl overflow-hidden shadow-2xl border-[8px] border-white relative transition-transform duration-500 group-hover:scale-[1.02]">
                {aboutUsSection.smallImage ? (
                  <Image src={aboutUsSection.smallImage} alt="About Experience" fill className="object-cover" />
                ) : (
                  <div className="w-full h-full bg-gray-300 flex items-center justify-center text-gray-500 text-sm text-center">Small Image<br/>Placeholder</div>
                )}
              </div>

              {/* Circular Badge attached to intersection of large and small images */}
              <div className="absolute -top-8 left-1/3 md:-top-10 md:left-[35%] -translate-x-1/2 z-30 transition-transform duration-500 group-hover:rotate-[15deg] group-hover:scale-110">
                <div className="relative">
                  {/* Sun rays effect */}
                  <div className="absolute -inset-4 border-t-2 border-l-2 border-[#e8f7fa] rounded-full w-20 h-20 md:w-24 md:h-24 -left-4 -top-4 md:-left-5 md:-top-5 border-dashed" style={{ transform: "rotate(-15deg)" }}></div>
                  <div className="w-14 h-14 md:w-16 md:h-16 bg-[#0d2a4c] rounded-full flex items-center justify-center text-white shadow-xl border-4 border-white">
                    <Plane size={24} className="md:w-7 md:h-7" style={{ transform: "rotate(-15deg)" }} />
                  </div>
                </div>
              </div>
            </div>



          </motion.div>

        </div>
      </div>
    </section>
  );
}
