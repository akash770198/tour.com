export const fadeUp = {
  initial: { opacity: 0, y: 28 },
  animate: { opacity: 1, y: 0 },
};

export const fadeIn = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
};

export const scaleIn = {
  initial: { opacity: 0, scale: 0.96 },
  animate: { opacity: 1, scale: 1 },
};

export const staggerContainer = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
};

export const easeOut = { duration: 0.55, ease: [0.22, 1, 0.36, 1] as const };

export function staggerDelay(index: number, base = 0.06) {
  return { ...easeOut, delay: index * base };
}

export const flipUpWord = {
  initial: { opacity: 0, rotateX: 90, y: "40%", transformOrigin: "50% 100%" },
  animate: { opacity: 1, rotateX: 0, y: "0%" },
};

export function flipUpWordTransition(index: number, baseDelay = 0.12, start = 0.15) {
  return {
    duration: 0.55,
    ease: [0.22, 1, 0.36, 1] as const,
    delay: start + index * baseDelay,
  };
}
