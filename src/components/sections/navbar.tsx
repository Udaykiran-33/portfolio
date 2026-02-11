"use client";

import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { useState } from "react";
import { AnimatedThemeToggler } from "@/components/ui/animated-theme-toggler";

const ease = [0.2, 0.8, 0.2, 1] as const;

export function Navbar() {
  const { scrollY } = useScroll();
  const [visible, setVisible] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    setVisible(latest > globalThis.innerHeight * 0.75);
  });

  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={visible ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
      transition={{ duration: 0.4, ease }}
      className="pointer-events-none fixed top-0 left-0 right-0 z-50"
    >
      <div className="pointer-events-auto mx-auto flex max-w-[960px] items-center justify-between px-6 py-5 lg:px-0">
        <a
          href="#"
          className="text-[14px] font-semibold tracking-tight text-[var(--gray-12)] transition-opacity duration-[var(--duration-fast)] hover:opacity-70"
        >
          UV
        </a>

        <div className="flex items-center gap-3">
          <AnimatedThemeToggler />

          <a
            href="mailto:peraboinaudaykiran@gmail.com"
            className="select-none rounded-full border border-[var(--gray-4)] px-4 py-1.5 text-[12px] text-[var(--gray-9)] transition-all duration-[var(--duration-fast)] hover:border-[var(--gray-6)] hover:text-[var(--gray-12)]"
          >
            Email me
          </a>
        </div>
      </div>
    </motion.nav>
  );
}
