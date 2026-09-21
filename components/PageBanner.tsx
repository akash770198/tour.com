"use client";

import Image from "next/image";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import FlipUpTitle from "./FlipUpTitle";
import { SectionProps } from "@/data";

export default function PageBanner({
  title,
  breadcrumbLabel,
  parentLabel,
  parentHref,
  className,
}: SectionProps & {
  title: string;
  breadcrumbLabel?: string;
  parentLabel?: string;
  parentHref?: string;
}) {
  const currentLabel = breadcrumbLabel || title;

  return (
    <div
      className={`relative w-full h-[300px] md:h-[400px] flex items-center justify-center overflow-hidden bg-[#0d2a4c] ${className ?? ""}`}
    >
      <Image
        src="/pagebanner.jpg"
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover object-center"
      />
      <div className="absolute inset-0 bg-[#0d2a4c]/60" />

      <div className="relative z-10 flex flex-col items-center text-center text-white mt-16 px-4">
        <FlipUpTitle
          as="h1"
          text={title}
          className="text-4xl md:text-5xl font-bold mb-4 max-w-4xl"
          startDelay={0.05}
        />
        <div className="flex items-center flex-wrap justify-center text-sm md:text-base font-medium gap-y-1">
          <Link href="/" className="hover:text-[#36b9b3] transition-colors">
            Home
          </Link>
          {parentLabel && (
            <>
              <ChevronRight size={16} className="text-[#36b9b3] mx-2 shrink-0" />
              {parentHref ? (
                <Link href={parentHref} className="hover:text-[#36b9b3] transition-colors">
                  {parentLabel}
                </Link>
              ) : (
                <span>{parentLabel}</span>
              )}
            </>
          )}
          <ChevronRight size={16} className="text-[#36b9b3] mx-2 shrink-0" />
          <span className="text-[#36b9b3] max-w-[min(100%,28rem)] line-clamp-1">{currentLabel}</span>
        </div>
      </div>
    </div>
  );
}
