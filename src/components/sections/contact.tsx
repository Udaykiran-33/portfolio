"use client";

import { BlurFade } from "@/components/ui/blur-fade";
import { Magnetic } from "@/components/ui/magnetic";
import { GravitationalText } from "@/components/ui/gravitational-text";
import { AvatarMosaic } from "@/components/ui/avatar-mosaic";

const socials = [
  { label: "LinkedIn", href: "https://linkedin.com/in/udaykiranperaboina" },
];

export function Contact() {
  return (
    <section className="relative w-full px-4 sm:px-6 py-32 sm:py-40">
      <div className="mx-auto flex max-w-[960px] flex-col items-center text-center">
        {/* Scattered Assembly Avatar — fragments fly together on scroll */}
        <AvatarMosaic className="mb-12 sm:mb-16" />

        {/* Name reveal */}
        <BlurFade delay={0} inView>
          <GravitationalText
            intensity={12}
            radius={160}
            className="text-[clamp(2rem,10vw,5rem)] font-bold leading-[0.95] tracking-[-0.04em] text-[var(--gray-12)]"
          >
            Uday Kiran
          </GravitationalText>
        </BlurFade>

        <BlurFade delay={0.1} inView>
          <p className="mt-5 sm:mt-6 text-[14px] sm:text-[15px] leading-[1.6] text-[var(--gray-8)] px-2">
            MERN stack developer exploring how AI can improve real‑world
            products.
            <br />
            Currently a trainee at Course Web and a B‑Tech student at NxtWave.
          </p>
        </BlurFade>

        <BlurFade delay={0.2} inView>
          <p className="mt-6 sm:mt-8 text-[13px] sm:text-[14px] text-[var(--gray-6)]">
            If you care about this stuff too &mdash;
          </p>
        </BlurFade>

        <BlurFade delay={0.3} inView>
          <div className="mt-4">
            <Magnetic strength={0.15}>
              <a
                href="mailto:peraboinaudaykiran@gmail.com"
                className="group inline-flex select-none items-center gap-2 rounded-full bg-[var(--gray-12)] px-5 py-3 sm:px-6 sm:py-3 text-[13px] sm:text-[14px] font-medium text-[var(--gray-1)] transition-transform duration-[var(--duration-fast)] active:scale-[0.96] min-h-[44px] break-all"
              >
                <span className="hidden sm:inline">peraboinaudaykiran@gmail.com</span>
                <span className="sm:hidden">Email me</span>
                <span className="inline-block transition-transform duration-[var(--duration-normal)] group-hover:translate-x-0.5">
                  &rarr;
                </span>
              </a>
            </Magnetic>
          </div>
        </BlurFade>

        {/* Social links */}
        <BlurFade delay={0.4} inView>
          <div className="mt-10 sm:mt-12 flex gap-6">
            {socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[11px] sm:text-[12px] text-[var(--gray-6)] transition-colors duration-[var(--duration-fast)] hover:text-[var(--gray-10)] min-h-[44px] flex items-center"
              >
                {s.label}
              </a>
            ))}
          </div>
        </BlurFade>

        {/* Copyright */}
        <div className="mt-16 sm:mt-20 flex items-center gap-3 text-[10px] sm:text-[11px] text-[var(--gray-5)]">
          <p>&copy; {new Date().getFullYear()} Uday Kiran Peraboina</p>
        </div>
      </div>
    </section>
  );
}
