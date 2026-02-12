"use client";

import { useState, useCallback, useRef } from "react";
import { BlurFade } from "@/components/ui/blur-fade";
import { cn } from "@/lib/utils";

const skills = [
  {
    name: "MERN Stack",
    note: "MongoDB, Express.js, React.js, and Node.js for full‑stack web apps.",
  },
  {
    name: "React.js",
    note: "Building responsive, component‑driven UIs with modern hooks and patterns.",
  },
  {
    name: "Next.js",
    note: "App Router, API routes, and SEO‑friendly pages for production‑ready apps.",
  },
  {
    name: "JavaScript",
    note: "Strong understanding of core JS, asynchronous patterns, and browser APIs.",
  },
  {
    name: "HTML & CSS",
    note: "Clean, semantic markup and modern layouts that work across devices.",
  },
  {
    name: "SQL & MongoDB",
    note: "Designing schemas and writing queries for both relational and NoSQL data.",
  },
  {
    name: "Python",
    note: "Using Python for scripts, data work, and experimenting with AI tools.",
  },
  {
    name: "AI & Generative AI",
    note: "Applying AI tools and APIs in real projects like KRISHI AI and workshops.",
  },
];

function SkillOrb({
  skill,
  index,
  hovered,
  onHover,
  onLeave,
}: {
  skill: (typeof skills)[0];
  index: number;
  hovered: number | null;
  onHover: (i: number) => void;
  onLeave: () => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      setPos({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
    },
    [],
  );

  const isDimmed = hovered !== null && hovered !== index;
  const isActive = hovered === index;

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => onHover(index)}
      onMouseLeave={onLeave}
      className={cn(
        `living-card living-card-${index % 3} relative overflow-hidden bg-[var(--gray-2)] transition-all duration-300`,
        isDimmed && "opacity-30 scale-[0.97]",
        isActive && "scale-[1.02]",
      )}
    >
      {/* Spotlight glow following cursor */}
      <div
        className="pointer-events-none absolute -inset-px transition-opacity duration-500"
        style={{
          opacity: isActive ? 1 : 0,
          background: `radial-gradient(280px circle at ${pos.x}px ${pos.y}px, var(--spotlight-fill), transparent 65%)`,
          borderRadius: "inherit",
        }}
      />

      <div className="relative z-10 flex flex-col gap-2 p-4 sm:p-5">
        <p className="text-[14px] sm:text-[15px] font-medium text-[var(--gray-12)]">
          {skill.name}
        </p>
        <p
          className={cn(
            "text-[11px] sm:text-[12px] leading-[1.5] text-[var(--gray-7)] transition-all duration-[var(--duration-normal)]",
            isActive
              ? "max-h-20 opacity-100"
              : "max-h-0 overflow-hidden opacity-0",
          )}
        >
          {skill.note}
        </p>
      </div>
    </div>
  );
}

export function Skills() {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <section className="relative w-full py-24 sm:py-32 px-4 sm:px-6">
      <div className="mx-auto max-w-[960px]">
        <BlurFade delay={0} inView>
          <p className="mb-10 sm:mb-12 text-[13px] font-medium uppercase tracking-[0.15em] text-[var(--gray-7)]">
            Skills & Stack
          </p>
        </BlurFade>

        <BlurFade delay={0.05} inView>
          <p className="mb-10 sm:mb-12 max-w-[520px] text-[clamp(1rem,3.5vw,1.375rem)] font-normal leading-[1.6] tracking-[-0.01em] text-[var(--gray-11)]">
            I focus on the MERN stack and modern JavaScript, while actively
            exploring AI and data tools through hackathons, workshops, and
            real projects.
          </p>
        </BlurFade>

        <div className="grid grid-cols-2 gap-2 sm:gap-3 md:grid-cols-4">
          {skills.map((skill, i) => (
            <BlurFade key={skill.name} delay={0.05 + i * 0.04} inView>
              <SkillOrb
                skill={skill}
                index={i}
                hovered={hovered}
                onHover={setHovered}
                onLeave={() => setHovered(null)}
              />
            </BlurFade>
          ))}
        </div>
      </div>
    </section>
  );
}
