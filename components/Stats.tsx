"use client";
import { useEffect, useRef } from "react";
import { motion, useInView, animate } from "framer-motion";
import Image from "next/image";
import siteData from "../data/site.json";

function Counter({ from, to, isDecimal }: { from: number; to: number; isDecimal?: boolean }) {
  const nodeRef = useRef<HTMLSpanElement>(null);
  const inView = useInView(nodeRef, { once: true, margin: "-50px" });

  useEffect(() => {
    if (inView) {
      const node = nodeRef.current;
      const controls = animate(from, to, {
        duration: 2,
        onUpdate(value) {
          if (node) {
            node.textContent = isDecimal ? value.toFixed(1) : Math.round(value).toString();
          }
        }
      });
      return () => controls.stop();
    }
  }, [from, to, inView, isDecimal]);

  return <span ref={nodeRef}>{from}</span>;
}

export default function Stats() {
  const { statsSection } = siteData;

  return (
    <section className="relative py-12 lg:py-16 text-white overflow-hidden">
      {/* Background with overlay */}
      <div className="absolute inset-0 z-0 bg-[#0d2a4c]">
        {statsSection.backgroundImage ? (
          <Image src={statsSection.backgroundImage} alt="Stats background" fill className="object-cover opacity-40 mix-blend-overlay" />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-r from-[#0d2a4c] to-[#008cba] opacity-80" />
        )}
      </div>

      <div className="container relative z-10 mx-auto px-4 max-w-[1340px]">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="flex flex-col items-center text-center mb-20"
        >
          <div className="flex items-center justify-center mb-2">
            <p className="font-cursive text-3xl md:text-4xl text-[#36b9b3] font-script mr-4">
              {statsSection.cursiveText}
            </p>
            <div className="w-16 h-[2px] bg-[#36b9b3]"></div>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-white leading-tight">
            {statsSection.headingPart1} <span className="text-[#36b9b3]">{statsSection.headingPart2}</span> {statsSection.headingPart3}
          </h2>
          <p className="text-gray-300 max-w-2xl text-base md:text-lg leading-relaxed">
            {statsSection.description}
          </p>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-0">
          {statsSection.stats.map((stat, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.15 }}
              className={`flex flex-col items-center text-center px-4 ${
                idx !== 0 ? 'lg:border-l border-white/20' : ''
              }`}
            >
              <h3 className="text-5xl md:text-7xl font-bold mb-3 text-white flex items-center justify-center">
                <Counter from={0} to={stat.number} isDecimal={stat.isDecimal} />
                <span>{stat.suffix}</span>
              </h3>
              <p className="text-gray-300 font-medium text-lg">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
