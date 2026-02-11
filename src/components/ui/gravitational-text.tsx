"use client";

import { useRef, useState, useCallback } from "react";
import { motion, useSpring } from "framer-motion";
import { cn } from "@/lib/utils";

interface GravitationalTextProps {
  children: string;
  className?: string;
  intensity?: number;
  radius?: number;
}

/**
 * Signature interaction: Characters in the text react to cursor proximity
 * with spring physics. Characters near the cursor displace outward,
 * creating a liquid, breathing effect. When cursor leaves, they spring back.
 */
export function GravitationalText({
  children,
  className,
  intensity = 20,
  radius = 200,
}: GravitationalTextProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mouse, setMouse] = useState({ x: -1000, y: -1000 });
  const [isHovering, setIsHovering] = useState(false);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      setMouse({ x: e.clientX - rect.left, y: e.clientY - rect.top });
    },
    []
  );

  const chars = children.split("");

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => {
        setIsHovering(false);
        setMouse({ x: -1000, y: -1000 });
      }}
      className={cn("relative cursor-default select-none", className)}
    >
      <span className="flex flex-wrap">
        {chars.map((char, i) => (
          <GravitationalChar
            key={i}
            char={char}
            index={i}
            mouse={mouse}
            isHovering={isHovering}
            intensity={intensity}
            radius={radius}
            containerRef={containerRef}
          />
        ))}
      </span>
    </div>
  );
}

function GravitationalChar({
  char,
  index,
  mouse,
  isHovering,
  intensity,
  radius,
  containerRef,
}: {
  char: string;
  index: number;
  mouse: { x: number; y: number };
  isHovering: boolean;
  intensity: number;
  radius: number;
  containerRef: React.RefObject<HTMLDivElement | null>;
}) {
  const charRef = useRef<HTMLSpanElement>(null);

  const getDisplacement = () => {
    if (!isHovering || !charRef.current || !containerRef.current) {
      return { x: 0, y: 0 };
    }

    const charRect = charRef.current.getBoundingClientRect();
    const containerRect = containerRef.current.getBoundingClientRect();
    const charCenterX = charRect.left - containerRect.left + charRect.width / 2;
    const charCenterY = charRect.top - containerRect.top + charRect.height / 2;

    const dx = charCenterX - mouse.x;
    const dy = charCenterY - mouse.y;
    const distance = Math.sqrt(dx * dx + dy * dy);

    if (distance > radius || distance < 1) return { x: 0, y: 0 };

    const force = Math.pow(1 - distance / radius, 2) * intensity;
    const angle = Math.atan2(dy, dx);

    return {
      x: Math.cos(angle) * force,
      y: Math.sin(angle) * force,
    };
  };

  const displacement = getDisplacement();

  const springX = useSpring(displacement.x, {
    stiffness: 300,
    damping: 20,
    mass: 0.3,
  });
  const springY = useSpring(displacement.y, {
    stiffness: 300,
    damping: 20,
    mass: 0.3,
  });

  springX.set(displacement.x);
  springY.set(displacement.y);

  if (char === " ") {
    return <span className="inline-block w-[0.3em]">&nbsp;</span>;
  }

  return (
    <motion.span
      ref={charRef}
      style={{ x: springX, y: springY }}
      className="inline-block will-change-transform"
    >
      {char}
    </motion.span>
  );
}
