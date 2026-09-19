"use client";

import { motion } from "framer-motion";
import { flipUpWord, flipUpWordTransition } from "../lib/page-motion";

type WordPart = {
  word: string;
  accent?: boolean;
};

type FlipUpTitleProps = {
  text?: string;
  part1?: string;
  part2?: string;
  as?: "h1" | "h2" | "h3";
  className?: string;
  accentClassName?: string;
  startDelay?: number;
};

function toWords(part1?: string, part2?: string, text?: string): WordPart[] {
  if (text) {
    return text
      .trim()
      .split(/\s+/)
      .filter(Boolean)
      .map((word) => ({ word }));
  }

  return [
    ...(part1 ?? "")
      .trim()
      .split(/\s+/)
      .filter(Boolean)
      .map((word) => ({ word, accent: false })),
    ...(part2 ?? "")
      .trim()
      .split(/\s+/)
      .filter(Boolean)
      .map((word) => ({ word, accent: true })),
  ];
}

export default function FlipUpTitle({
  text,
  part1,
  part2,
  as = "h2",
  className,
  accentClassName = "text-[#008cba]",
  startDelay = 0.15,
}: FlipUpTitleProps) {
  const Tag = as;
  const words = toWords(part1, part2, text);

  return (
    <Tag className={className} style={{ perspective: 800 }}>
      {words.map((item, index) => (
        <span
          key={`${item.word}-${index}`}
          className="inline-block overflow-hidden align-bottom mr-[0.28em] last:mr-0 pb-[0.22em] -mb-[0.12em] leading-[1.25]"
        >
          <motion.span
            className={`inline-block ${item.accent ? accentClassName : ""}`}
            initial={flipUpWord.initial}
            animate={flipUpWord.animate}
            transition={flipUpWordTransition(index, 0.12, startDelay)}
            style={{ transformStyle: "preserve-3d", backfaceVisibility: "hidden" }}
          >
            {item.word}
          </motion.span>
        </span>
      ))}
    </Tag>
  );
}
