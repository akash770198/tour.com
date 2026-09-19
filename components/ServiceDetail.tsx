"use client";

import Image from "next/image";
import { 
  Building, Wallet, ShieldCheck, Headphones, User,
  CheckCircle2, Phone, Mail, MessageSquare, ArrowRight, Building2, Tag, Shield
} from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";
import { SectionProps, TourServiceDetails } from "@/data";
import FlipUpTitle from "./FlipUpTitle";
import { easeOut, fadeUp, scaleIn, staggerDelay } from "../lib/page-motion";

export default function ServiceDetail({
  data,
  className,
}: SectionProps<TourServiceDetails> & { data: TourServiceDetails }) {
  const details = data;

  const { hero, sidebar, benefits, contentBlock, cta } = details;

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case "Building": return <Building size={20} strokeWidth={1.5} />;
      case "Wallet": return <Wallet size={20} strokeWidth={1.5} />;
      case "ShieldCheck": return <ShieldCheck size={20} strokeWidth={1.5} />;
      case "Headphones": return <Headphones size={20} strokeWidth={1.5} />;
      case "Phone": return <Phone size={18} strokeWidth={2} />;
      case "Mail": return <Mail size={18} strokeWidth={2} />;
      case "MessageSquare": return <MessageSquare size={18} strokeWidth={2} />;
      case "Building2": return <Building2 size={28} strokeWidth={1.5} />;
      case "Tag": return <Tag size={28} strokeWidth={1.5} />;
      case "Shield": return <Shield size={28} strokeWidth={1.5} />;
      case "User": return <User size={20} strokeWidth={1.5} />;
      default: return <Building size={20} strokeWidth={1.5} />;
    }
  };

  return (
    <div className={`w-full bg-white pb-20 ${className ?? ""}`}>
      
      {/* SECTION 1: HERO & SIDEBAR (OVERLAPPING) */}
      <section className="pt-20 pb-10">
        <div className="container mx-auto px-4 max-w-[1340px]">
          <div className="flex flex-col lg:flex-row gap-16 relative">
            
            {/* Left Content */}
            <div className="w-full lg:w-[55%]">
              <motion.div
                initial={fadeUp.initial}
                animate={fadeUp.animate}
                transition={easeOut}
                className="inline-flex items-center gap-2 bg-[#f0f7fc] rounded-full px-4 py-2 mb-6 border border-[#e0f0fa]"
              >
                <div className="w-6 h-6 rounded-full bg-[#008cba] flex items-center justify-center text-white">
                  <Building size={12} fill="white" />
                </div>
                <span className="text-[13px] font-bold text-[#008cba]">{hero.badgeText}</span>
              </motion.div>

              <FlipUpTitle
                as="h1"
                text={hero.title}
                className="text-4xl md:text-[56px] font-bold text-[#0d2a4c] leading-[1.1] mb-6 text-left"
                startDelay={0.2}
              />

              <motion.div
                initial={fadeUp.initial}
                animate={fadeUp.animate}
                transition={{ ...easeOut, delay: 0.35 }}
              >
                <div className="w-12 h-[3px] bg-[#008cba] mb-6"></div>
                
                <h3 className="text-[20px] font-bold text-[#0d2a4c] mb-4">
                  {hero.subtitle}
                </h3>
                
                <p className="text-[15px] text-gray-500 leading-relaxed mb-10">
                  {hero.description}
                </p>

                {/* Features Grid 2x2 */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mb-10">
                  {hero.features.map((feat, idx) => (
                    <div key={idx} className="flex gap-4 group">
                      <div className="w-12 h-12 shrink-0 rounded-full bg-[#f0f7fc] flex items-center justify-center text-[#008cba] group-hover:bg-[#008cba] group-hover:text-white transition-colors duration-300">
                        {getIcon(feat.icon)}
                      </div>
                      <div>
                        <h4 className="text-[15px] font-bold text-[#0d2a4c] mb-1">{feat.title}</h4>
                        <p className="text-[13px] text-gray-500 leading-snug">{feat.description}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <Link href="#" className="inline-flex items-center gap-3 bg-[#008cba] text-white px-8 py-3.5 rounded-md font-medium hover:bg-[#0d2a4c] transition-colors group">
                  {hero.buttonText}
                  <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
                </Link>
              </motion.div>
            </div>

            {/* Right Image */}
            <div className="w-full lg:w-[45%] mt-10 lg:mt-0">
              <motion.div 
                initial={scaleIn.initial}
                animate={scaleIn.animate}
                transition={{ ...easeOut, delay: 0.08 }}
                className="relative w-full aspect-[4/3] rounded-[24px] overflow-hidden shadow-xl lg:h-[500px]"
              >
                {hero.image ? (
                  <Image src={hero.image} alt={hero.title} fill className="object-cover" />
                ) : (
                  <div className="absolute inset-0 bg-gray-200 flex items-center justify-center text-gray-400">Hero Image</div>
                )}
              </motion.div>
            </div>

          </div>

          {/* Sidebar Card — full container width, proper spacing */}
          <motion.div
            initial={fadeUp.initial}
            animate={fadeUp.animate}
            transition={{ ...easeOut, delay: 0.2 }}
            className="mt-8 bg-white rounded-[16px] shadow-[0_8px_30px_rgba(0,0,0,0.10)] px-6 py-7 border border-gray-100"
          >
            <div className="flex flex-col sm:flex-row gap-8">
              {/* Service Highlights */}
              <div className="flex-1">
                <h3 className="text-[18px] font-bold text-[#0d2a4c] mb-5">{sidebar.title}</h3>
                <ul className="space-y-3">
                  {sidebar.highlights.map((highlight: string, idx: number) => (
                    <li key={idx} className="flex items-start gap-3">
                      <CheckCircle2 size={18} className="text-[#36b9b3] mt-[2px] shrink-0" />
                      <span className="text-[15px] text-gray-600 font-medium">{highlight}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Divider */}
              <div className="hidden sm:block w-[1px] bg-gray-100 self-stretch"></div>

              {/* Need Help */}
              <div className="flex-1">
                <h3 className="text-[18px] font-bold text-[#0d2a4c] mb-5">{sidebar.helpTitle}</h3>
                <div className="space-y-4">
                  {sidebar.helpItems.map((item, idx) => (
                    <div key={idx} className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-[#f0f7fc] flex items-center justify-center text-[#008cba] shrink-0">
                        {getIcon(item.icon)}
                      </div>
                      <span className="text-[15px] font-semibold text-[#0d2a4c]">{item.text}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

        </div>
      </section>

      {/* SECTION 2: WHY CHOOSE US (BENEFITS GRID) */}
      <section className="py-16">
        <div className="container mx-auto px-4 max-w-[1340px]">
          <motion.div 
            initial={fadeUp.initial}
            animate={fadeUp.animate}
            transition={easeOut}
            className="mb-12"
          >
            <h2 className="text-[26px] md:text-[32px] font-bold text-[#0d2a4c] mb-4">
              {benefits.title}
            </h2>
            <div className="w-12 h-[3px] bg-[#008cba] mb-4"></div>
            <p className="text-[15px] text-gray-500">
              {benefits.description}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.items.map((opt, idx) => (
              <motion.div 
                key={idx}
                initial={fadeUp.initial}
                animate={fadeUp.animate}
                transition={staggerDelay(idx)}
                className="bg-white rounded-[16px] border border-gray-100 p-8 flex flex-col items-center text-center hover:shadow-[0_10px_30px_rgba(0,0,0,0.06)] hover:-translate-y-1 transition-all duration-300 group"
              >
                <div className="w-16 h-16 bg-[#f0f7fc] text-[#008cba] group-hover:bg-[#008cba] group-hover:text-white transition-colors duration-300 rounded-[12px] flex items-center justify-center mb-6">
                  {getIcon(opt.icon)}
                </div>
                <h3 className="text-[17px] font-bold text-[#0d2a4c] mb-3">{opt.title}</h3>
                <p className="text-[13px] text-gray-500 leading-relaxed">{opt.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 3: CONTENT BLOCK */}
      <section className="py-10">
        <div className="container mx-auto px-4 max-w-[1340px]">
          <div className="flex flex-col lg:flex-row gap-16 items-center">
            
            {/* Left Image */}
            <div className="w-full lg:w-1/2">
              <motion.div 
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={easeOut}
                className="relative w-full aspect-[16/9] rounded-[24px] overflow-hidden shadow-lg"
              >
                {contentBlock.image ? (
                  <Image src={contentBlock.image} alt={contentBlock.title} fill className="object-cover" />
                ) : (
                  <div className="absolute inset-0 bg-gray-200 flex items-center justify-center text-gray-400">Content Image</div>
                )}
              </motion.div>
            </div>

            {/* Right Text */}
            <div className="w-full lg:w-1/2">
              <motion.div 
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ ...easeOut, delay: 0.1 }}
              >
                <h2 className="text-[28px] font-bold text-[#0d2a4c] mb-4">
                  {contentBlock.title}
                </h2>
                
                <div className="w-12 h-[3px] bg-[#008cba] mb-6"></div>
                
                <p className="text-[15px] text-gray-500 leading-relaxed mb-8">
                  {contentBlock.description}
                </p>

                <ul className="space-y-4">
                  {contentBlock.checks.map((item: string, idx: number) => (
                    <li key={idx} className="flex items-start gap-3">
                      <CheckCircle2 size={20} className="text-[#008cba] mt-[2px] shrink-0" />
                      <span className="text-[15px] font-semibold text-[#0d2a4c]">{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            </div>

          </div>
        </div>
      </section>

      {/* SECTION 4: BOTTOM CTA BANNER */}
      <section className="py-16">
        <div className="container mx-auto px-4 max-w-[1340px]">
          <motion.div 
            initial={fadeUp.initial}
            animate={fadeUp.animate}
            transition={{ ...easeOut, delay: 0.15 }}
            className="relative w-full rounded-[24px] overflow-hidden"
          >
            {/* Background Image & Overlay */}
            <div className="absolute inset-0 z-0">
              {cta.image ? (
                <Image src={cta.image} alt="CTA Background" fill className="object-cover" />
              ) : (
                <div className="absolute inset-0 bg-[#0d2a4c]"></div>
              )}
              {/* Dark overlay if image is present */}
              {cta.image && <div className="absolute inset-0 bg-[#0d2a4c]/80"></div>}
            </div>

            <div className="relative z-10 px-8 py-16 md:px-16 flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="max-w-2xl">
                <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 mb-6">
                  <div className="w-6 h-6 rounded-full bg-[#008cba] flex items-center justify-center text-white">
                    <Building size={12} fill="white" />
                  </div>
                  <span className="text-[13px] font-bold text-white">{cta.badgeText}</span>
                </div>
                
                <h2 className="text-4xl md:text-[54px] font-bold text-white leading-[1.1]">
                  {cta.title} <span className="font-cursive text-[#008cba] italic font-normal ml-2">{cta.cursive}</span>
                </h2>
              </div>

              <Link href="/contact" className="shrink-0 bg-[#008cba] text-white px-8 py-4 rounded-full font-bold hover:bg-white hover:text-[#008cba] transition-colors duration-300 flex items-center gap-3">
                {cta.buttonText}
                <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center text-[#008cba]">
                  <ArrowRight size={14} />
                </div>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

    </div>
  );
}
