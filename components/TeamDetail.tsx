"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { 
  Mail, 
  Phone, 
  MapPin, 
  CheckCircle2, 
  Globe, 
  Users, 
  GraduationCap, 
  ClipboardList 
} from "lucide-react";
import { SectionProps, TourTeamMemberDetails } from "@/data";

export default function TeamDetail({
  data,
  className,
}: SectionProps<TourTeamMemberDetails> & { data: TourTeamMemberDetails }) {
  const member = data;

  return (
    <section className={`py-20 bg-white ${className ?? ""}`}>
      <div className="container mx-auto px-4 max-w-[1200px]">
        
        {/* Top Profile Section */}
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 mb-20">
          
          {/* Left: Image & Quote */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex-1 relative w-full flex justify-center lg:justify-start"
          >
            {/* Background shape */}
            <div className="absolute top-10 -left-6 lg:-left-10 w-[90%] h-[90%] bg-[#e3ecf5] rounded-[40px] z-0 hidden md:block"></div>
            
            {/* Profile Image */}
            <div className="relative z-10 w-full max-w-[450px] aspect-[4/5] rounded-[30px] overflow-hidden shadow-lg">
              <Image 
                src={member.image} 
                alt={`${member.namePart1} ${member.namePart2}`} 
                fill 
                className="object-cover" 
              />
            </div>

            {/* Floating Quote Box */}
            <div className="absolute -bottom-8 -left-4 lg:-left-12 z-20 bg-white rounded-tr-3xl rounded-bl-3xl rounded-br-3xl shadow-xl p-6 max-w-[320px] flex gap-4 border-l-4 border-[#008cba]">
              <div className="text-[#008cba] font-serif text-5xl leading-none mt-2">
                &ldquo;
              </div>
              <p className="text-gray-600 text-sm md:text-base font-medium italic leading-relaxed">
                {member.quote}
              </p>
            </div>
          </motion.div>

          {/* Right: Bio & Info */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex-1 flex flex-col justify-center mt-12 lg:mt-0"
          >
            <div className="flex items-center gap-4 mb-4">
              <span className="text-[11px] font-bold tracking-[0.2em] text-gray-400 uppercase">
                {member.designation}
              </span>
              <span className="h-[2px] w-12 bg-gray-200"></span>
            </div>
            
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-[#0d2a4c]">
              {member.namePart1} <span className="text-[#008cba]">{member.namePart2}</span>
            </h2>
            
            <p className="text-gray-600 text-lg md:text-xl mb-6">
              {member.subtitle}
            </p>

            <div className="space-y-4 mb-8 text-gray-500 text-sm md:text-base leading-relaxed">
              {member.paragraphs.map((p, i) => (
                <p key={i}>
                  {i === 1 ? (
                    <>
                      Under her <strong className="text-[#0d2a4c]">leadership</strong>, TravelX has expanded its <strong className="text-[#0d2a4c]">global presence</strong>, built strong partnerships, and introduced innovative travel solutions that inspire people to explore the world with confidence.
                    </>
                  ) : (
                    p
                  )}
                </p>
              ))}
            </div>

            {/* Social Icons */}
            <div className="flex items-center gap-3 mb-10">
              <a href={member.social.linkedin} className="w-10 h-10 rounded-full bg-[#f0f7fc] hover:bg-[#0d2a4c] text-[#008cba] hover:text-white flex items-center justify-center transition-colors shadow-sm">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                  <rect x="2" y="9" width="4" height="12"></rect>
                  <circle cx="4" cy="4" r="2"></circle>
                </svg>
              </a>
              <a href={member.social.instagram} className="w-10 h-10 rounded-full bg-[#f0f7fc] hover:bg-[#0d2a4c] text-[#008cba] hover:text-white flex items-center justify-center transition-colors shadow-sm">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                </svg>
              </a>
              <a href={member.social.facebook} className="w-10 h-10 rounded-full bg-[#f0f7fc] hover:bg-[#0d2a4c] text-[#008cba] hover:text-white flex items-center justify-center transition-colors shadow-sm">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                </svg>
              </a>
            </div>

            {/* Divider */}
            <hr className="border-gray-200 mb-8" />

            {/* Contact Info Row */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Email */}
              <div className="flex items-start gap-4">
                <Mail className="text-[#008cba] mt-1" size={24} strokeWidth={1.5} />
                <div>
                  <p className="text-sm font-bold text-[#0d2a4c] mb-0.5">Email</p>
                  <p className="text-gray-500 text-sm">{member.contact.email}</p>
                </div>
              </div>
              {/* Phone */}
              <div className="flex items-start gap-4">
                <Phone className="text-[#008cba] mt-1" size={24} strokeWidth={1.5} />
                <div>
                  <p className="text-sm font-bold text-[#0d2a4c] mb-0.5">Phone</p>
                  <p className="text-gray-500 text-sm">{member.contact.phone}</p>
                </div>
              </div>
              {/* Location */}
              <div className="flex items-start gap-4">
                <MapPin className="text-[#008cba] mt-1" size={24} strokeWidth={1.5} />
                <div>
                  <p className="text-sm font-bold text-[#0d2a4c] mb-0.5">Location</p>
                  <p className="text-gray-500 text-sm">{member.contact.location}</p>
                </div>
              </div>
            </div>

          </motion.div>
        </div>


        {/* Bottom Details Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
          
          {/* Areas of Expertise */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-[#f8fbff] rounded-2xl p-8 border border-[#e3ecf5]"
          >
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-12 bg-[#e3ecf5] text-[#008cba] rounded-xl flex items-center justify-center">
                <ClipboardList size={24} />
              </div>
              <h3 className="text-lg font-bold text-[#0d2a4c]">{member.expertise.title}</h3>
            </div>
            
            <ul className="space-y-4">
              {member.expertise.skills.map((skill, idx) => (
                <li key={idx} className="flex items-center gap-3 text-gray-600 font-medium text-sm md:text-base">
                  <CheckCircle2 size={18} className="text-[#008cba]" />
                  {skill}
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Key Stats (Dark Blue Block) */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="bg-[#0d2a4c] rounded-2xl p-8 flex flex-col justify-center gap-8 shadow-xl"
          >
            {member.stats.map((stat, idx) => (
              <div key={idx} className="flex items-center gap-6">
                <div className="w-14 h-14 border border-white/20 rounded-full flex items-center justify-center text-white shrink-0">
                  {stat.icon === 'globe' && <Globe size={24} strokeWidth={1.5} />}
                  {stat.icon === 'users' && <Users size={24} strokeWidth={1.5} />}
                  {stat.icon === 'map-pin' && <MapPin size={24} strokeWidth={1.5} />}
                </div>
                <div>
                  <h4 className="text-3xl font-bold text-white mb-1">{stat.value}</h4>
                  <p className="text-white/70 text-sm font-medium">{stat.label}</p>
                </div>
              </div>
            ))}
          </motion.div>

          {/* Education & Certifications */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="flex flex-col gap-6"
          >
            {/* Education */}
            <div className="bg-white rounded-2xl p-8 border border-gray-100 shadow-[0_4px_20px_rgba(0,0,0,0.04)] flex-1">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-[#f0f7fc] text-[#008cba] rounded-xl flex items-center justify-center">
                  <GraduationCap size={24} />
                </div>
                <h3 className="text-lg font-bold text-[#0d2a4c]">{member.education.title}</h3>
              </div>
              <p className="font-bold text-[#0d2a4c] text-sm md:text-base mb-1">{member.education.degree}</p>
              <p className="text-gray-500 text-sm mb-1">{member.education.institution}</p>
              <p className="text-gray-400 text-sm">{member.education.years}</p>
            </div>

            {/* Certifications */}
            <div className="bg-white rounded-2xl p-8 border border-gray-100 shadow-[0_4px_20px_rgba(0,0,0,0.04)] flex-1">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-[#f0f7fc] text-[#008cba] rounded-xl flex items-center justify-center">
                  <ClipboardList size={24} />
                </div>
                <h3 className="text-lg font-bold text-[#0d2a4c]">{member.certifications.title}</h3>
              </div>
              <ul className="list-disc pl-5 space-y-2">
                {member.certifications.items.map((item, idx) => (
                  <li key={idx} className="text-[#0d2a4c] text-sm font-medium">
                    {item}
                  </li>
                ))}
              </ul>
            </div>

          </motion.div>
          
        </div>
        
      </div>
    </section>
  );
}
