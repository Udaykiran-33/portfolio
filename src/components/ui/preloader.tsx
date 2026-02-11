"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

const stairEase = [0.455, 0.03, 0.515, 0.955] as const;

/**
 * Preloader always renders in dark regardless of theme.
 * This creates a consistent "emergence from darkness" effect —
 * like a film opening from black. Works in both light and dark mode.
 */
function PreloaderOverlay() {
  const text = "Notice everything.";
  const words = text.split(" ");

  return (
    <motion.div className="fixed inset-0 z-[200]">
      {/* Centered word-by-word text — always light on dark */}
      <div className="absolute z-10 flex h-full w-full items-center justify-center text-center">
        <motion.h1
          className="text-[clamp(1.5rem,4vw,2.5rem)] font-semibold tracking-[-0.03em]"
          style={{ color: "oklch(0.930 0 0)" }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, transition: { duration: 3.5 } }}
          exit={{ opacity: 0, transition: { duration: 0.4 } }}
        >
          {words.map((word, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.8, delay: 0.4 * i }}
              className="mr-2 inline-block"
            >
              {word}
            </motion.span>
          ))}
        </motion.h1>
      </div>

      {/* Top stair columns — always dark, collapse upward on exit */}
      <motion.div className="pointer-events-none fixed left-0 top-0 z-[2] flex h-[50vh]">
        {[...Array(10)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ height: "100%" }}
            animate={{ height: "100%" }}
            exit={{ height: 0 }}
            transition={{
              duration: 0.5,
              delay: 0.4 + 0.05 * i,
              ease: stairEase,
            }}
            className="h-full w-[10vw]"
            style={{ backgroundColor: "oklch(0.110 0 0)" }}
          />
        ))}
      </motion.div>

      {/* Bottom stair columns — always dark, collapse downward on exit */}
      <motion.div className="pointer-events-none fixed bottom-0 left-0 z-[2] flex h-[50vh] items-end">
        {[...Array(10)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ height: "100%" }}
            animate={{ height: "100%" }}
            exit={{ height: 0 }}
            transition={{
              duration: 0.5,
              delay: 0.4 + 0.05 * i,
              ease: stairEase,
            }}
            className="h-full w-[10vw]"
            style={{ backgroundColor: "oklch(0.110 0 0)" }}
          />
        ))}
      </motion.div>
    </motion.div>
  );
}

export function Preloader({ children }: { children: React.ReactNode }) {
  const [showPreloader, setShowPreloader] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShowPreloader(false), 2800);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <AnimatePresence mode="wait">
        {showPreloader && <PreloaderOverlay />}
      </AnimatePresence>
      {children}
    </>
  );
}
