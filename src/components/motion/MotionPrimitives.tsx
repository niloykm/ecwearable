"use client";

import React, { useRef, useState, useEffect } from "react";
import { MotionConfig, motion, useScroll, useSpring, useInView } from "framer-motion";

export const MOTION_EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

export const SPRING_INDICATOR = {
  type: "spring" as const,
  stiffness: 360,
  damping: 32,
};

export const PANEL_TRANSITION = {
  duration: 0.24,
  ease: MOTION_EASE,
};

export const DRAWER_TRANSITION = {
  duration: 0.28,
  ease: MOTION_EASE,
};

export const BACKDROP_TRANSITION = {
  duration: 0.2,
  ease: MOTION_EASE,
};

export function MotionProvider({ children }: { children: React.ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}

export function ScrollProgressBar() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 220,
    damping: 34,
    restDelta: 0.001,
  });

  return (
    <motion.div
      aria-hidden="true"
      className="fixed top-0 left-0 right-0 h-[2px] bg-zinc-950 dark:bg-white origin-left z-50 pointer-events-none"
      style={{ scaleX }}
    />
  );
}

interface ScrollRevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

export function ScrollReveal({ children, className, delay = 0 }: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: "some" });
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    if (inView) {
      setRevealed(true);
      return;
    }

    const checkPosition = () => {
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight + 96) {
        setRevealed(true);
      }
    };

    checkPosition();
    const rafId = window.requestAnimationFrame(checkPosition);
    window.addEventListener("scroll", checkPosition, { passive: true });
    window.addEventListener("resize", checkPosition, { passive: true });
    return () => {
      window.cancelAnimationFrame(rafId);
      window.removeEventListener("scroll", checkPosition);
      window.removeEventListener("resize", checkPosition);
    };
  }, [inView]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 18 }}
      animate={revealed ? { opacity: 1, y: 0 } : undefined}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: "some" }}
      transition={{ duration: 0.4, delay, ease: MOTION_EASE }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
