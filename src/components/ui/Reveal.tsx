"use client";

import { motion, type Variants } from "framer-motion";
import type { ReactNode } from "react";

const VARIANTS: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0 },
};

/**
 * Fades + slides content in once it scrolls into view. `once: true` means
 * it never re-triggers on re-scroll, and MotionConfig (set at the app
 * root) makes this collapse to a plain opacity fade for users with
 * prefers-reduced-motion, so this needs no reduced-motion handling itself.
 */
export default function Reveal({
  children,
  delay = 0,
  y,
  className,
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      variants={y === undefined ? VARIANTS : { hidden: { opacity: 0, y }, visible: { opacity: 1, y: 0 } }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
