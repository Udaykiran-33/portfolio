"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useState } from "react";

export function CursorGlow() {
  const [hasMouse, setHasMouse] = useState(false);
  const mouseX = useMotionValue(-200);
  const mouseY = useMotionValue(-200);

  const springConfig = { stiffness: 120, damping: 25, mass: 0.5 };
  const x = useSpring(mouseX, springConfig);
  const y = useSpring(mouseY, springConfig);

  useEffect(() => {
    const mq = window.matchMedia("(hover: hover)");
    setHasMouse(mq.matches);

    const handleMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    if (mq.matches) {
      window.addEventListener("mousemove", handleMove);
    }
    return () => window.removeEventListener("mousemove", handleMove);
  }, [mouseX, mouseY]);

  if (!hasMouse) return null;

  return (
    <>
      {/* Soft outer glow */}
      <motion.div
        className="pointer-events-none fixed top-0 left-0 z-[90] h-[420px] w-[420px] rounded-full mix-blend-soft-light"
        style={{
          x,
          y,
          translateX: "-50%",
          translateY: "-50%",
          background:
            "radial-gradient(circle, var(--cursor-glow-color) 0%, transparent 60%)",
        }}
      />

      {/* Subtle inner cursor ring */}
      <motion.div
        className="pointer-events-none fixed top-0 left-0 z-[100] h-7 w-7 rounded-full border border-[var(--gray-5)] bg-[color-mix(in_oklab,var(--background) 70%,transparent)] shadow-[0_0_24px_oklch(0.85_0_0_/0.18)] backdrop-blur-[2px]"
        style={{
          x,
          y,
          translateX: "-50%",
          translateY: "-50%",
        }}
        transition={{ type: "spring", stiffness: 200, damping: 24 }}
      />
    </>
  );
}
