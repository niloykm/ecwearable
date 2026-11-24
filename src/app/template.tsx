"use client";

import React from "react";
import { motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { MOTION_EASE } from "@/components/motion/MotionPrimitives";

export default function Template({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <motion.div
      key={pathname}
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.34, ease: MOTION_EASE }}
      className="flex-1 flex flex-col"
    >
      {children}
    </motion.div>
  );
}
