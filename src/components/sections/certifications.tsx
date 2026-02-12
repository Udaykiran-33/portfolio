"use client";

import { BlurFade } from "@/components/ui/blur-fade";

const certifications = [
  {
    title: "State‑Level Qualifier — OpenAI Buildathon",
    issuer: "OpenAI",
    period: "May 2025",
    note: "Qualified at the state level by building generative AI solutions for real‑world workflows.",
  },
  {
    title: "Generative AI Mega Workshop",
    issuer: "NxtWave",
    period: "Mar 2024",
    note: "Hands‑on sessions applying GenAI tools to automation, productivity, and learning.",
  },
  {
    title: "Build Your Own Static Website",
    issuer: "NxtWave",
    period: "NxtWave Program",
    note: "Designed and deployed a fully responsive static website from scratch.",
  },
  {
    title: "Data Analytics Mega Workshop",
    issuer: "NxtWave",
    period: "NxtWave Program",
    note: "Introduced to data‑driven decision making and practical analytics workflows.",
  },
];

const awards = [
  {
    title: "Hackathon Winner — Build for Telangana Hackathon",
    period: "Jun 2025",
    note: "Built KRISHI AI, an AI‑powered platform that supports farmers with crop guidance, disease detection, and fair‑trade market access.",
  },
  {
    title: "Sports Team Leader",
    period: "School Years",
    note: "Led volleyball and kho‑kho teams, building discipline, teamwork, and leadership on and off the field.",
  },
];

export function Certifications() {
  return (
    <section className="relative w-full py-24 sm:py-32 px-4 sm:px-6">
      <div className="mx-auto max-w-[960px] space-y-12 sm:space-y-16">
        {/* Certifications */}
        <div>
          <BlurFade delay={0} inView>
            <p className="mb-8 sm:mb-10 text-[13px] font-medium uppercase tracking-[0.15em] text-[var(--gray-7)]">
              Certifications
            </p>
          </BlurFade>

          <div className="flex flex-col gap-3 sm:gap-4">
            {certifications.map((item, index) => (
              <BlurFade key={item.title} delay={0.05 + index * 0.05} inView>
                <div className="rounded-xl bg-[var(--gray-2)] p-4 sm:p-5">
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <h3 className="text-[14px] sm:text-[15px] font-semibold tracking-[-0.01em] text-[var(--gray-12)]">
                      {item.title}
                    </h3>
                    <p className="text-[11px] sm:text-[12px] font-mono text-[var(--gray-6)]">
                      {item.period}
                    </p>
                  </div>
                  <p className="mt-1 text-[12px] sm:text-[13px] text-[var(--gray-7)]">
                    {item.issuer}
                  </p>
                  <p className="mt-2 text-[12px] sm:text-[13px] leading-[1.6] text-[var(--gray-8)]">
                    {item.note}
                  </p>
                </div>
              </BlurFade>
            ))}
          </div>
        </div>

        {/* Awards & Leadership */}
        <div>
          <BlurFade delay={0.1} inView>
            <p className="mb-8 sm:mb-10 text-[13px] font-medium uppercase tracking-[0.15em] text-[var(--gray-7)]">
              Awards & Leadership
            </p>
          </BlurFade>

          <div className="flex flex-col gap-3 sm:gap-4">
            {awards.map((item, index) => (
              <BlurFade key={item.title} delay={0.15 + index * 0.05} inView>
                <div className="rounded-xl bg-[var(--gray-2)] p-4 sm:p-5">
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <h3 className="text-[14px] sm:text-[15px] font-semibold tracking-[-0.01em] text-[var(--gray-12)]">
                      {item.title}
                    </h3>
                    <p className="text-[11px] sm:text-[12px] font-mono text-[var(--gray-6)]">
                      {item.period}
                    </p>
                  </div>
                  <p className="mt-2 text-[12px] sm:text-[13px] leading-[1.6] text-[var(--gray-8)]">
                    {item.note}
                  </p>
                </div>
              </BlurFade>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}




