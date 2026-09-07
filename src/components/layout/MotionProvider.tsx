"use client";

import { MotionConfig } from "framer-motion";
import type { ReactNode } from "react";

// reducedMotion="user" makes every animation in the app collapse to an
// opacity-only fade for visitors with prefers-reduced-motion enabled,
// without each component having to check for that itself.
export default function MotionProvider({ children }: { children: ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
