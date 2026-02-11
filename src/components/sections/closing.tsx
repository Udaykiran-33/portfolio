"use client";

import { BlurFade } from "@/components/ui/blur-fade";
import { Magnetic } from "@/components/ui/magnetic";
import { GravitationalText } from "@/components/ui/gravitational-text";

export function Closing() {
  return (
    <section className="relative w-full px-6 py-40">
      <div className="mx-auto flex max-w-[960px] flex-col items-center text-center">
        {/* Name reveal — the payoff */}
        <BlurFade delay={0} inView>
          <GravitationalText
            intensity={12}
            radius={160}
            className="text-[clamp(2.5rem,8vw,5rem)] font-bold leading-[0.9] tracking-[-0.04em] text-[var(--gray-12)]"
          >
            Uday Kiran
          </GravitationalText>
        </BlurFade>

        <BlurFade delay={0.1} inView>
          <p className="mt-6 text-[15px] leading-[1.6] text-[var(--gray-8)]">
            MERN stack developer & AI enthusiast.
            <br />
            Building products for farmers, students, and curious learners.
          </p>
        </BlurFade>

        <BlurFade delay={0.2} inView>
          <p className="mt-8 text-[14px] text-[var(--gray-6)]">
            If you care about this stuff too &mdash;
          </p>
        </BlurFade>

        <BlurFade delay={0.3} inView>
          <div className="mt-4">
            <Magnetic strength={0.15}>
              <a
                href="mailto:peraboinaudaykiran@gmail.com"
                className="group inline-flex select-none items-center gap-2 rounded-full bg-[var(--gray-12)] px-6 py-3 text-[14px] font-medium text-[var(--gray-1)] transition-transform duration-[var(--duration-fast)] active:scale-[0.96]"
              >
                peraboinaudaykiran@gmail.com
                <span className="inline-block transition-transform duration-[var(--duration-normal)] group-hover:translate-x-0.5">
                  &rarr;
                </span>
              </a>
            </Magnetic>
          </div>
        </BlurFade>

        {/* Social links — text only, minimal */}
        <BlurFade delay={0.4} inView>
          <div className="mt-12 flex gap-6">
            {["LinkedIn"].map((s) => (
              <a
                key={s}
                href="https://linkedin.com/in/udaykiranperaboina"
                className="text-[12px] text-[var(--gray-6)] transition-colors duration-[var(--duration-fast)] hover:text-[var(--gray-10)]"
              >
                {s}
              </a>
            ))}
          </div>
        </BlurFade>

        {/* Copyright — barely there */}
        <BlurFade delay={0.45} inView>
          <p className="mt-16 text-[11px] text-[var(--gray-5)]">
            &copy; {new Date().getFullYear()}
          </p>
        </BlurFade>
      </div>
    </section>
  );
}
