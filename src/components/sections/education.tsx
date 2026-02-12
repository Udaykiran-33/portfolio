"use client";

import { BlurFade } from "@/components/ui/blur-fade";

const education = [
  {
    period: "2024 — Present",
    program: "B‑Tech",
    institute: "NxtWave Institute of Advanced Technologies",
    location: "Hyderabad, Telangana",
    note: "Focusing on MERN stack, Generative AI, and real‑world projects.",
  },
  {
    period: "Completed",
    program: "Intermediate (Junior College)",
    institute: "Sri Chaitanya Junior College",
    location: "Hyderabad, Telangana",
    note: "GPA: 9. Built a strong foundation in mathematics and problem‑solving.",
  },
];

export function Education() {
  return (
    <section className="relative w-full py-24 sm:py-32 px-4 sm:px-6">
      <div className="mx-auto max-w-[960px]">
        <BlurFade delay={0} inView>
          <p className="mb-8 sm:mb-10 text-[13px] font-medium uppercase tracking-[0.15em] text-[var(--gray-7)]">
            Education
          </p>
        </BlurFade>

        <div className="flex flex-col gap-3 sm:gap-4">
          {education.map((item, index) => (
            <BlurFade key={item.institute} delay={0.05 + index * 0.05} inView>
              <div className="flex flex-col gap-2 sm:gap-1 rounded-xl bg-[var(--gray-2)] p-4 sm:p-5 md:flex-row md:items-baseline md:justify-between">
                <div>
                  <p className="text-[11px] sm:text-[12px] font-mono text-[var(--gray-6)]">
                    {item.period}
                  </p>
                  <h3 className="mt-1 text-[14px] sm:text-[15px] font-semibold tracking-[-0.01em] text-[var(--gray-12)]">
                    {item.program}
                  </h3>
                  <p className="text-[13px] sm:text-[14px] text-[var(--gray-9)]">
                    {item.institute}
                  </p>
                  <p className="mt-1 text-[12px] sm:text-[13px] text-[var(--gray-7)]">
                    {item.location}
                  </p>
                </div>
                <p className="mt-2 sm:mt-3 text-[12px] sm:text-[13px] leading-[1.6] text-[var(--gray-8)] md:mt-0 md:max-w-[360px]">
                  {item.note}
                </p>
              </div>
            </BlurFade>
          ))}
        </div>
      </div>
    </section>
  );
}




