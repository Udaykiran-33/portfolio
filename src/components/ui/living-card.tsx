"use client";

import { useRef, useState, useCallback } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { cn } from "@/lib/utils";

interface LivingCardProps {
  /** The image layer (PlaceholderImage etc.) */
  image: React.ReactNode;
  /** Optional content overlay at bottom of card */
  overlay?: React.ReactNode;
  className?: string;
  /** Blob shape variant (0, 1, 2) — each has a unique breathing pattern */
  variant?: 0 | 1 | 2;
}

/**
 * Living Card — organic blob-shaped container that breathes, tilts in 3D,
 * and has parallax depth between image and content layers.
 * Replaces static rectangular cards with living, interactive organisms.
 */
export function LivingCard({
  image,
  overlay,
  className,
  variant = 0,
}: LivingCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  // 3D tilt springs
  const rotateX = useSpring(0, { stiffness: 200, damping: 25 });
  const rotateY = useSpring(0, { stiffness: 200, damping: 25 });

  // Parallax springs for depth layers
  const mouseX = useSpring(0, { stiffness: 150, damping: 20 });
  const mouseY = useSpring(0, { stiffness: 150, damping: 20 });

  // Image: slight counter-movement (pushes away from cursor)
  const imgX = useTransform(mouseX, (v) => v * -12);
  const imgY = useTransform(mouseY, (v) => v * -12);

  // Content overlay: forward-movement (pulls toward cursor)
  const contentX = useTransform(mouseX, (v) => v * 6);
  const contentY = useTransform(mouseY, (v) => v * 6);

  // Scroll-linked entry: scale up + fade in
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "0.6 center"],
  });
  const scale = useTransform(scrollYProgress, [0, 1], [0.88, 1]);
  const opacity = useTransform(scrollYProgress, [0, 0.4], [0, 1]);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (!cardRef.current) return;
      const rect = cardRef.current.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      rotateX.set(y * -6);
      rotateY.set(x * 6);
      mouseX.set(x);
      mouseY.set(y);
    },
    [rotateX, rotateY, mouseX, mouseY],
  );

  const handleMouseLeave = useCallback(() => {
    rotateX.set(0);
    rotateY.set(0);
    mouseX.set(0);
    mouseY.set(0);
    setIsHovered(false);
  }, [rotateX, rotateY, mouseX, mouseY]);

  return (
    <motion.div
      ref={cardRef}
      style={{ scale, opacity, perspective: 1200 }}
      className={cn("relative", className)}
    >
      <motion.div
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={handleMouseLeave}
        style={{ rotateX, rotateY }}
        className={cn(
          "living-card relative overflow-hidden bg-[var(--gray-2)]",
          `living-card-${variant}`,
        )}
      >
        {/* Rotating gradient border — visible on hover */}
        <div
          className={cn(
            "pointer-events-none absolute -inset-px z-30 transition-opacity duration-500",
            isHovered ? "opacity-100 glow-border-spin" : "opacity-0",
          )}
          style={{
            background:
              "conic-gradient(from var(--border-angle, 0deg), var(--gray-4), var(--gray-6), var(--gray-8), var(--gray-6), var(--gray-4))",
            mask: "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)",
            maskComposite: "exclude",
            WebkitMaskComposite: "xor",
            padding: "1.5px",
            borderRadius: "inherit",
          }}
        />

        {/* Image layer — counter-parallax, slightly oversized to fill blob */}
        <motion.div
          style={{ x: imgX, y: imgY }}
          className="relative scale-[1.12]"
        >
          {image}
        </motion.div>

        {/* Content overlay — forward-parallax, glass effect */}
        {overlay && (
          <motion.div
            style={{ x: contentX, y: contentY }}
            className="absolute inset-x-0 bottom-0 z-20 bg-gradient-to-t from-[var(--gray-1)]/85 via-[var(--gray-1)]/50 to-transparent px-10 pb-14 pt-28 backdrop-blur-sm"
          >
            {overlay}
          </motion.div>
        )}

        {/* Hover ambient glow */}
        <div
          className={cn(
            "pointer-events-none absolute inset-0 z-10 transition-opacity duration-500",
            isHovered ? "opacity-100" : "opacity-0",
          )}
          style={{
            background:
              "radial-gradient(ellipse at 50% 80%, var(--spotlight-fill), transparent 70%)",
          }}
        />
      </motion.div>
    </motion.div>
  );
}
