"use client";

import { motion, type Variants } from "framer-motion";
import type { ReactNode } from "react";

const CONTAINER: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const ITEM: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
};

/**
 * Wraps a grid/list of cards: the group fades in once, then children reveal
 * one after another (staggered) instead of all at once. Use RevealItem for
 * each direct child that should participate in the stagger.
 */
export function RevealGroup({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      variants={CONTAINER}
    >
      {children}
    </motion.div>
  );
}

export function RevealItem({
  children,
  className,
  id,
}: {
  children: ReactNode;
  className?: string;
  id?: string;
}) {
  return (
    <motion.div id={id} className={className} variants={ITEM}>
      {children}
    </motion.div>
  );
}
