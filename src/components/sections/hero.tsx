"use client";

import dynamic from "next/dynamic";
import { Suspense } from "react";
import { motion } from "framer-motion";
import { GravitationalText } from "@/components/ui/gravitational-text";
import { MorphingText } from "@/components/ui/morphing-text";
import { Magnetic } from "@/components/ui/magnetic";

const HeroScene = dynamic(
  () => import("@/components/3d/hero-noise").then((m) => m.HeroScene),
  { ssr: false },
);

const roles = [
  "MERN Stack Developer",
  "AI Enthusiast",
  "Full‑Stack Web Developer",
];

const ease = [0.2, 0.8, 0.2, 1] as const;

export function Hero() {
  return (
    <section className="relative flex min-h-[100dvh] w-full items-center px-6 overflow-hidden">
      {/* Living noise background */}
      <Suspense fallback={null}>
        <HeroScene />
      </Suspense>

      <div className="relative z-10 mx-auto w-full max-w-[960px]">
        <div className="flex flex-col gap-6">
          {/* Status */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1, ease }}
          >
            <span className="inline-flex items-center gap-2 text-[13px] text-[var(--gray-8)]">
              <span className="inline-block h-[6px] w-[6px] rounded-full bg-emerald-500/80" />
              Available for new projects
            </span>
          </motion.div>

          {/* Signature moment: gravitational name */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease }}
          >
            <GravitationalText
              intensity={14}
              radius={180}
              className="text-[clamp(3rem,9vw,6.5rem)] font-bold leading-[0.9] tracking-[-0.04em] text-[var(--gray-12)]"
            >
              Uday Kiran
            </GravitationalText>
          </motion.div>

          {/* Role */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4, ease }}
          >
            <MorphingText
              texts={roles}
              className="text-[clamp(1.125rem,2.5vw,1.5rem)] font-medium text-[var(--gray-7)]"
            />
          </motion.div>

          {/* Bio */}
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.55, ease }}
            className="max-w-[520px] text-[15px] leading-[1.7] text-[var(--gray-8)]"
          >
            MERN stack developer passionate about blending clean interfaces with
            practical AI. I build full‑stack web apps end‑to‑end, from idea to
            deployment, with a focus on accessibility, real‑world impact, and
            farmer‑first solutions.
          </motion.p>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.7, ease }}
            className="mt-2 flex items-center gap-4"
          >
            <Magnetic strength={0.15}>
              <a
                href="#work"
                className="group inline-flex select-none items-center gap-2 rounded-full bg-[var(--gray-12)] px-5 py-2.5 text-[13px] font-medium text-[var(--gray-1)] transition-transform duration-[var(--duration-fast)] active:scale-[0.96]"
              >
                View work
                <span className="inline-block transition-transform duration-[var(--duration-normal)] group-hover:translate-x-0.5">
                  &rarr;
                </span>
              </a>
            </Magnetic>
            <a
              href="#contact"
              className="text-[13px] text-[var(--gray-8)] transition-colors duration-[var(--duration-fast)] hover:text-[var(--gray-11)]"
            >
              Get in touch
            </a>
          </motion.div>
        </div>
      </div>

      {/* Soft bottom gradient */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-40 bg-gradient-to-t from-[var(--background)] to-transparent" />
    </section>
  );
}
