"use client";

import { BlurFade } from "@/components/ui/blur-fade";

const details = [
  { label: "Role", value: "MERN Stack Developer" },
  { label: "Currently", value: "Intern, Trustable Solutions" },
  { label: "Education", value: "B‑Tech, NxtWave Institute" },
  { label: "Based in", value: "Hyderabad / Warangal, Telangana" },
];

export function About() {
  return (
    <section className="relative w-full py-24 sm:py-32 px-4 sm:px-6">
      <div className="mx-auto max-w-[640px]">
        <BlurFade delay={0} inView>
          <p className="text-[clamp(1rem,3.5vw,1.375rem)] font-normal leading-[1.6] tracking-[-0.01em] text-[var(--gray-11)]">
            I&apos;m Uday Kiran, a MERN stack developer who loves turning ideas
            into clean, responsive products that anyone can use &mdash; from
            students learning new skills to farmers managing their fields.
          </p>
        </BlurFade>

        <BlurFade delay={0.1} inView>
          <p className="mt-6 sm:mt-8 text-[14px] sm:text-[15px] leading-[1.7] text-[var(--gray-8)]">
            I enjoy building full‑stack web applications with MongoDB,
            Express.js, React.js, and Node.js, and I&apos;m especially excited
            about integrating AI to solve real‑world problems. I take ownership
            from ideation to deployment, experiment fast, and keep pushing
            myself to learn the next thing.
          </p>
        </BlurFade>

        <BlurFade delay={0.2} inView>
          <div className="mt-8 sm:mt-10 flex flex-col gap-2 sm:gap-3 border-t border-[var(--gray-3)] pt-5 sm:pt-6">
            {details.map((d) => (
              <div
                key={d.label}
                className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 sm:gap-2"
              >
                <span className="text-[12px] sm:text-[13px] text-[var(--gray-7)]">
                  {d.label}
                </span>
                <span className="text-[12px] sm:text-[13px] text-[var(--gray-10)]">
                  {d.value}
                </span>
              </div>
            ))}
          </div>
        </BlurFade>
      </div>
    </section>
  );
}
