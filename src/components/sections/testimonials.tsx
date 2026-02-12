"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const testimonials = [
  {
    quote:
      "Uday is highly self‑motivated and always eager to learn. He quickly turns new concepts into working projects.",
    name: "Instructor feedback",
    role: "Course Web",
  },
  {
    quote:
      "His KRISHI AI project showed a strong understanding of both technology and farmer needs. The Telugu voice support was a standout feature.",
    name: "Hackathon jury",
    role: "Build for Telangana",
  },
  {
    quote:
      "He brings a builder mindset to every discussion, suggesting concrete ways to improve the user experience.",
    name: "Peer feedback",
    role: "Project teammate",
  },
];

function TestimonialSlide({
  testimonial,
  scrollProgress,
  index,
  total,
}: {
  testimonial: (typeof testimonials)[0];
  scrollProgress: ReturnType<typeof useScroll>["scrollYProgress"];
  index: number;
  total: number;
}) {
  const segment = 1 / total;
  const start = index * segment;
  const fadeIn = start + segment * 0.15;
  const fadeOut = start + segment * 0.85;
  const end = (index + 1) * segment;

  const opacity = useTransform(
    scrollProgress,
    [start, fadeIn, fadeOut, end],
    [0, 1, 1, 0],
  );
  const y = useTransform(
    scrollProgress,
    [start, fadeIn, fadeOut, end],
    [40, 0, 0, -40],
  );

  return (
    <motion.div
      style={{ opacity, y }}
      className="absolute inset-0 flex flex-col items-center justify-center px-6"
    >
      <p className="max-w-[680px] text-center text-[clamp(1.5rem,4vw,2.25rem)] font-normal leading-[1.4] tracking-[-0.02em] text-[var(--gray-11)]">
        &ldquo;{testimonial.quote}&rdquo;
      </p>
      <div className="mt-8 text-center">
        <p className="text-[14px] font-medium text-[var(--gray-10)]">
          {testimonial.name}
        </p>
        <p className="mt-1 text-[12px] text-[var(--gray-6)]">
          {testimonial.role}
        </p>
      </div>
    </motion.div>
  );
}

export function Testimonials() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  return (
    <section
      ref={ref}
      className="relative py-20 sm:py-24 px-4 sm:px-6"
    >
      <div className="mx-auto flex max-w-[960px] flex-col gap-8 sm:gap-10">
        {testimonials.map((t, i) => (
          <div key={t.name} className="border-l-2 border-[var(--gray-3)] pl-4 sm:pl-6">
            <p className="text-[clamp(1.125rem,4vw,1.5rem)] leading-[1.5] tracking-[-0.01em] text-[var(--gray-11)]">
              &ldquo;{t.quote}&rdquo;
            </p>
            <p className="mt-3 sm:mt-4 text-[13px] sm:text-[14px] font-medium text-[var(--gray-10)]">
              {t.name}
            </p>
            <p className="text-[11px] sm:text-[12px] text-[var(--gray-6)]">{t.role}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function ProgressDot({
  scrollProgress,
  midpoint,
  segment,
}: {
  scrollProgress: ReturnType<typeof useScroll>["scrollYProgress"];
  midpoint: number;
  segment: number;
}) {
  const opacity = useTransform(
    scrollProgress,
    [midpoint - segment * 0.5, midpoint, midpoint + segment * 0.5],
    [0.2, 1, 0.2],
  );
  const scale = useTransform(
    scrollProgress,
    [midpoint - segment * 0.5, midpoint, midpoint + segment * 0.5],
    [1, 1.5, 1],
  );

  return (
    <motion.div
      style={{ opacity, scale }}
      className="h-1.5 w-1.5 rounded-full bg-[var(--gray-8)]"
    />
  );
}
