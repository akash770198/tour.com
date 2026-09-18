"use client";

import { FormEvent, useState } from "react";
import {
  ArrowRight,
  Clock,
  Headphones,
  Mail,
  MapPin,
  Phone,
} from "lucide-react";
import { motion } from "framer-motion";
import siteData from "../data/site.json";
import FlipUpTitle from "./FlipUpTitle";
import { easeOut, fadeUp, staggerDelay } from "../lib/page-motion";

type InfoCard = {
  icon: string;
  title: string;
  line1: string;
  line2: string;
  href: string;
  tone: "blue" | "purple";
};

const iconMap = {
  Phone,
  Mail,
  MapPin,
  Headphones,
} as const;

export default function ContactPage() {
  const page = siteData.contactPage;
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="w-full bg-white pb-16 md:pb-20">
      <section className="pt-10 md:pt-12 pb-6">
        <div className="container mx-auto px-4 max-w-[1340px]">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6">
            {(page.infoCards as InfoCard[]).map((card, index) => {
              const Icon = iconMap[card.icon as keyof typeof iconMap] || Phone;
              const isBlue = card.tone === "blue";

              return (
                <motion.a
                  key={card.title}
                  href={card.href}
                  initial={fadeUp.initial}
                  animate={fadeUp.animate}
                  transition={staggerDelay(index, 0.07)}
                  className="bg-white rounded-[18px] border border-gray-100 shadow-[0_10px_28px_rgba(13,42,76,0.07)] px-6 py-7 text-center hover:-translate-y-1 hover:shadow-[0_16px_36px_rgba(13,42,76,0.12)] transition-all duration-300"
                >
                  <span
                    className={`mx-auto mb-4 w-14 h-14 rounded-full flex items-center justify-center text-white ${
                      isBlue ? "bg-[#2f5c97]" : "bg-[#6b5b95]"
                    }`}
                  >
                    <Icon size={22} strokeWidth={1.8} />
                  </span>
                  <h3 className="text-[17px] font-bold text-[#0d2a4c] mb-2">{card.title}</h3>
                  <p className="text-[14px] font-semibold text-[#0d2a4c] leading-snug">{card.line1}</p>
                  <p className="text-[13px] text-gray-500 mt-1 leading-snug">{card.line2}</p>
                </motion.a>
              );
            })}
          </div>
        </div>
      </section>

      <section className="pt-8 md:pt-12">
        <div className="container mx-auto px-4 max-w-[1340px]">
          <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] gap-10 lg:gap-12 items-start">
            <motion.div
              id="contact-form"
              initial={fadeUp.initial}
              animate={fadeUp.animate}
              transition={{ ...easeOut, delay: 0.15 }}
              className="scroll-mt-36"
            >
              <p className="text-[13px] font-semibold tracking-[0.16em] uppercase text-[#2f5c97] mb-3">
                {page.form.label}
              </p>
              <FlipUpTitle
                part1={page.form.headingPart1}
                part2={page.form.headingPart2}
                className="text-[32px] md:text-[40px] font-bold text-[#0d2a4c] leading-[1.15] mb-3 text-left"
                accentClassName="text-[#2f5c97]"
                startDelay={0.2}
              />
              <p className="text-[15px] text-gray-500 leading-relaxed mb-8 max-w-xl">
                {page.form.description}
              </p>

              {submitted ? (
                <div className="rounded-[18px] border border-[#d7eef5] bg-[#eef6fc] px-6 py-10">
                  <h3 className="text-[22px] font-bold text-[#0d2a4c] mb-2">{page.form.successTitle}</h3>
                  <p className="text-[15px] text-gray-600 leading-relaxed">{page.form.successMessage}</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label htmlFor="contact-name" className="block text-[14px] font-semibold text-[#0d2a4c] mb-2">
                        {page.form.fields.name} <span className="text-red-500">*</span>
                      </label>
                      <input
                        id="contact-name"
                        name="name"
                        required
                        placeholder={page.form.fields.name}
                        className="w-full h-12 rounded-xl border border-gray-200 bg-[#f8fbff] px-4 text-sm text-[#0d2a4c] outline-none focus:border-[#2f5c97]"
                      />
                    </div>
                    <div>
                      <label htmlFor="contact-email" className="block text-[14px] font-semibold text-[#0d2a4c] mb-2">
                        {page.form.fields.email} <span className="text-red-500">*</span>
                      </label>
                      <input
                        id="contact-email"
                        name="email"
                        type="email"
                        required
                        placeholder={page.form.fields.email}
                        className="w-full h-12 rounded-xl border border-gray-200 bg-[#f8fbff] px-4 text-sm text-[#0d2a4c] outline-none focus:border-[#2f5c97]"
                      />
                    </div>
                    <div>
                      <label htmlFor="contact-phone" className="block text-[14px] font-semibold text-[#0d2a4c] mb-2">
                        {page.form.fields.phone} <span className="text-red-500">*</span>
                      </label>
                      <input
                        id="contact-phone"
                        name="phone"
                        type="tel"
                        required
                        placeholder={page.form.fields.phone}
                        className="w-full h-12 rounded-xl border border-gray-200 bg-[#f8fbff] px-4 text-sm text-[#0d2a4c] outline-none focus:border-[#2f5c97]"
                      />
                    </div>
                    <div>
                      <label htmlFor="contact-subject" className="block text-[14px] font-semibold text-[#0d2a4c] mb-2">
                        {page.form.fields.subject} <span className="text-red-500">*</span>
                      </label>
                      <select
                        id="contact-subject"
                        name="subject"
                        required
                        defaultValue=""
                        className="w-full h-12 rounded-xl border border-gray-200 bg-[#f8fbff] px-4 text-sm text-[#0d2a4c] outline-none focus:border-[#2f5c97]"
                      >
                        <option value="" disabled>
                          {page.form.subjectPlaceholder}
                        </option>
                        {page.form.subjects.map((subject) => (
                          <option key={subject} value={subject}>
                            {subject}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label htmlFor="contact-message" className="block text-[14px] font-semibold text-[#0d2a4c] mb-2">
                      {page.form.fields.message} <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      id="contact-message"
                      name="message"
                      required
                      rows={6}
                      placeholder={page.form.fields.message}
                      className="w-full rounded-xl border border-gray-200 bg-[#f8fbff] px-4 py-3 text-sm text-[#0d2a4c] outline-none focus:border-[#2f5c97] resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="inline-flex items-center gap-2 h-12 px-8 rounded-full bg-[#2f5c97] hover:bg-[#244a7a] text-white font-semibold transition-colors"
                  >
                    {page.form.submit}
                    <ArrowRight size={16} />
                  </button>
                </form>
              )}
            </motion.div>

            <motion.div
              id="office"
              initial={fadeUp.initial}
              animate={fadeUp.animate}
              transition={{ ...easeOut, delay: 0.22 }}
              className="space-y-5 scroll-mt-36"
            >
              <div className="relative w-full aspect-[4/3] md:aspect-[16/11] rounded-[18px] overflow-hidden border border-gray-100 shadow-[0_10px_28px_rgba(13,42,76,0.08)] bg-gray-100">
                <iframe
                  title={page.map.title}
                  src={page.map.embedUrl}
                  className="absolute inset-0 w-full h-full border-0"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  allowFullScreen
                />
              </div>

              <div className="rounded-[18px] bg-[#eef6fc] px-6 py-7">
                <h3 className="text-[22px] font-bold text-[#0d2a4c] mb-2">{page.office.title}</h3>
                <p className="text-[14px] text-gray-500 mb-5">{page.office.description}</p>

                <div className="flex items-start gap-3 mb-4">
                  <span className="w-10 h-10 rounded-full bg-white text-[#2f5c97] flex items-center justify-center shrink-0 shadow-sm">
                    <MapPin size={18} />
                  </span>
                  <p className="text-[14px] text-[#0d2a4c] leading-relaxed pt-1.5">{page.office.address}</p>
                </div>

                <div className="flex items-start gap-3">
                  <span className="w-10 h-10 rounded-full bg-white text-[#2f5c97] flex items-center justify-center shrink-0 shadow-sm">
                    <Clock size={18} />
                  </span>
                  <div className="pt-1.5">
                    <p className="text-[14px] font-semibold text-[#0d2a4c]">{page.office.hoursWeekday}</p>
                    <p className="text-[13px] text-gray-500 mt-0.5">{page.office.hoursWeekend}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
