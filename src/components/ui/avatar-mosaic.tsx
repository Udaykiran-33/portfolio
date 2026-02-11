"use client";

import { useRef, useState, useCallback, useMemo, useEffect } from "react";
import { useInView } from "framer-motion";

/**
 * "Scattered Assembly" — a portrait silhouette made of rectangular fragments.
 * Fragments start scattered across space with random rotations and fly together
 * on scroll into view, forming a head+shoulders mosaic.
 * On hover, cells shift with parallax based on cursor position.
 */

// 7×10 grid: 1 = filled cell forming portrait silhouette
const PORTRAIT = [
  [0, 0, 1, 1, 1, 0, 0],
  [0, 1, 1, 1, 1, 1, 0],
  [0, 1, 1, 1, 1, 1, 0],
  [0, 1, 1, 1, 1, 1, 0],
  [0, 0, 1, 1, 1, 0, 0],
  [0, 0, 0, 1, 0, 0, 0],
  [0, 1, 1, 1, 1, 1, 0],
  [1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 0, 1, 1, 1],
];

// Shade map: lighter at face center, darker at edges/hair/shoulders
const SHADE_MAP: Record<string, number> = {};
function getShade(row: number, col: number): number {
  const key = `${row},${col}`;
  if (SHADE_MAP[key]) return SHADE_MAP[key];
  const centerCol = 3;
  const centerRow = 2.5;
  const dist = Math.sqrt(
    Math.pow((col - centerCol) * 1.2, 2) +
      Math.pow((row - centerRow) * 0.8, 2),
  );
  // Map distance to gray level: closer to center = lighter (higher number)
  const shade = Math.round(Math.max(4, Math.min(10, 10 - dist * 1.5)));
  SHADE_MAP[key] = shade;
  return shade;
}

// Seeded pseudo-random for consistent scatter
function seededRandom(seed: number): number {
  const x = Math.sin(seed * 127.1 + seed * 311.7) * 43758.5453;
  return x - Math.floor(x);
}

const CELL_SIZE = 28;
const GAP = 4;
const PITCH = CELL_SIZE + GAP;
const COLS = 7;
const ROWS = 10;

interface Cell {
  row: number;
  col: number;
  gridX: number;
  gridY: number;
  scatterX: number;
  scatterY: number;
  scatterRotate: number;
  shade: number;
  staggerDelay: number;
}

function buildCells(): Cell[] {
  const cells: Cell[] = [];
  const centerX = (COLS * PITCH - GAP) / 2;
  const centerY = (ROWS * PITCH - GAP) / 2;

  for (let row = 0; row < ROWS; row++) {
    for (let col = 0; col < COLS; col++) {
      if (!PORTRAIT[row][col]) continue;

      const gridX = col * PITCH;
      const gridY = row * PITCH;
      const seed = row * 7 + col;

      // Scatter outward from center with randomness
      const angle = Math.atan2(gridY - centerY, gridX - centerX);
      const baseDistance = 250 + seededRandom(seed) * 200;
      const scatterX =
        Math.cos(angle + (seededRandom(seed + 1) - 0.5) * 1.5) * baseDistance;
      const scatterY =
        Math.sin(angle + (seededRandom(seed + 2) - 0.5) * 1.5) * baseDistance;
      const scatterRotate = (seededRandom(seed + 3) - 0.5) * 90;

      // Stagger delay: cells closer to center assemble first
      const distFromCenter = Math.sqrt(
        Math.pow(gridX - centerX, 2) + Math.pow(gridY - centerY, 2),
      );
      const maxDist = Math.sqrt(centerX * centerX + centerY * centerY);
      const staggerDelay = 100 + (distFromCenter / maxDist) * 400;

      cells.push({
        row,
        col,
        gridX,
        gridY,
        scatterX,
        scatterY,
        scatterRotate,
        shade: getShade(row, col),
        staggerDelay,
      });
    }
  }

  return cells;
}

export function AvatarMosaic({ className }: { className?: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { margin: "-80px" });
  const [mounted, setMounted] = useState(false);
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => setMounted(true), []);

  const cells = useMemo(() => buildCells(), []);

  const totalWidth = COLS * PITCH - GAP;
  const totalHeight = ROWS * PITCH - GAP;

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      setMouse({
        x: (e.clientX - rect.left) / rect.width - 0.5,
        y: (e.clientY - rect.top) / rect.height - 0.5,
      });
    },
    [],
  );

  return (
    <div ref={ref} className={className}>
      <div
        ref={containerRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => {
          setIsHovering(false);
          setMouse({ x: 0, y: 0 });
        }}
        className="relative mx-auto cursor-default"
        style={{ width: totalWidth, height: totalHeight }}
      >
        {cells.map((cell, i) => {
          // Hover parallax: cells shift based on their distance from center
          const parallaxX = isHovering
            ? mouse.x * (cell.col - 3) * 3
            : 0;
          const parallaxY = isHovering
            ? mouse.y * (cell.row - 4.5) * 2.5
            : 0;

          // Before mount: render at grid position (avoids hydration mismatch
          // since Math.sin scatter values differ between server and client).
          // After mount: scatter out, then assemble on scroll into view.
          const assembled = !mounted || isInView;

          return (
            <div
              key={i}
              className="absolute rounded-[3px]"
              style={{
                width: `${CELL_SIZE}px`,
                height: `${CELL_SIZE}px`,
                left: `${cell.gridX}px`,
                top: `${cell.gridY}px`,
                backgroundColor: `var(--gray-${cell.shade})`,
                transform: assembled
                  ? `translate(${parallaxX}px, ${parallaxY}px) rotate(0deg) scale(1)`
                  : `translate(${cell.scatterX.toFixed(2)}px, ${cell.scatterY.toFixed(2)}px) rotate(${cell.scatterRotate.toFixed(2)}deg) scale(0.5)`,
                opacity: assembled ? "1" : "0",
                transitionProperty: "transform, opacity",
                transitionDuration: "800ms",
                transitionTimingFunction: "cubic-bezier(0.2, 0.8, 0.2, 1)",
                transitionDelay: assembled ? `${cell.staggerDelay}ms` : "0ms",
              }}
            />
          );
        })}
      </div>
    </div>
  );
}
