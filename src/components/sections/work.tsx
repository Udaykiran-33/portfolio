"use client";

import { BlurFade } from "@/components/ui/blur-fade";
import { NumberTicker } from "@/components/ui/number-ticker";

/* ─── Data ─── */

const projects = [
  {
    number: "01",
    year: "2025",
    title: "KRISHI AI",
    lede: "An end‑to‑end platform for smallholder farmers that combines personalized crop guidance, AI‑based disease detection from images, and Telugu voice support to bridge the digital divide in rural areas.",
    role: "Full‑Stack Developer",
    url: "krishi-ai.example",
    tags: ["MERN", "AI", "Farmer Tech"],
  },
  {
    number: "02",
    year: "2025",
    title: "Complete Fertility",
    lede: "A focused web platform that simplifies discovering, comparing, and purchasing fertilizers for farmers and gardening enthusiasts, so they can choose the right inputs without confusion.",
    detail: "Farm & garden friendly UX",
    role: "MERN Stack Developer",
    url: "complete-fertility.example",
    tags: ["MERN", "E‑commerce", "Product UX"],
  },
  {
    number: "03",
    year: "2025",
    title: "Course Web",
    lede: "An online course platform designed to provide high‑demand skills at an affordable price, with a responsive layout, clean course catalog, and smooth registration experience.",
    role: "Web Developer",
    url: "courseweb.in",
    tags: ["WordPress", "Education", "SEO"],
  },
];

const quotes = [
  {
    text: "Uday is extremely self‑driven and always looking to learn the next technology. He takes full ownership of his work.",
    name: "Mentor feedback",
    title: "Course Web",
  },
  {
    text: "He thinks deeply about impact, especially when building for farmers and students, and it clearly shows in his projects.",
    name: "Peer feedback",
    title: "Hackathon teammate",
  },
];

const stats = [
  { number: 5, suffix: "+", label: "Projects & prototypes" },
  { number: 2, suffix: "", label: "Hackathons won / qualified" },
  { number: 3, suffix: "+", label: "AI & data workshops" },
  { number: 9, suffix: "", label: "Intermediate GPA (Junior College)" },
];

/* ─── Helpers ─── */

function Meta({ number, year }: { number: string; year: string }) {
  return (
    <div className="mb-4 flex items-center gap-3">
      <span className="font-mono text-[12px] text-[var(--gray-6)]">
        {number}
      </span>
      <div className="h-px flex-1 bg-[var(--gray-4)]" />
      <span className="font-mono text-[12px] text-[var(--gray-6)]">
        {year}
      </span>
    </div>
  );
}

function Tags({ tags }: { tags: string[] }) {
  return (
    <div className="mt-4 flex flex-wrap gap-1.5">
      {tags.map((t) => (
        <span
          key={t}
          className="rounded-md bg-[var(--gray-3)]/80 px-2 py-0.5 text-[11px] font-medium text-[var(--gray-8)]"
        >
          {t}
        </span>
      ))}
    </div>
  );
}

function Quote({ quote }: { quote: (typeof quotes)[0] }) {
  return (
    <BlurFade delay={0.1} inView>
      <blockquote className="border-l-2 border-[var(--gray-4)] pl-4 sm:pl-6 md:pl-8">
        <p className="max-w-[480px] text-[15px] sm:text-[17px] italic leading-[1.65] text-[var(--gray-9)]">
          &ldquo;{quote.text}&rdquo;
        </p>
        <cite className="mt-3 sm:mt-4 block text-[11px] sm:text-[12px] not-italic text-[var(--gray-6)]">
          {quote.name} &mdash; {quote.title}
        </cite>
      </blockquote>
    </BlurFade>
  );
}

/* ─── Main ─── */

export function Work() {
  const p1 = projects[0];
  const p2 = projects[1];
  const p3 = projects[2];

  return (
    <section id="work" className="relative w-full py-24 sm:py-32 px-4 sm:px-6">
      <div className="mx-auto max-w-[960px]">
        <BlurFade delay={0} inView>
          <p className="mb-8 sm:mb-10 text-[13px] font-medium uppercase tracking-[0.15em] text-[var(--gray-7)]">
            Projects
          </p>
        </BlurFade>

        {/* Project 1 */}
        <div className="flex flex-col gap-3 sm:gap-4 border-b border-[var(--gray-3)] pb-10 sm:pb-12">
          <BlurFade delay={0.05} inView>
            <Meta number={p1.number} year={p1.year} />
          </BlurFade>
          <BlurFade delay={0.1} inView>
            <h2 className="text-[clamp(1.5rem,5vw,2.5rem)] font-bold tracking-[-0.03em] text-[var(--gray-12)]">
              {p1.title}
            </h2>
          </BlurFade>
          <BlurFade delay={0.15} inView>
            <p className="text-[14px] sm:text-[15px] leading-[1.7] text-[var(--gray-9)]">
              {p1.lede}
            </p>
            <p className="mt-2 text-[11px] sm:text-[12px] text-[var(--gray-7)]">{p1.role}</p>
          </BlurFade>
          <BlurFade delay={0.2} inView>
            <Tags tags={p1.tags} />
          </BlurFade>
        </div>

        {/* Woven quote */}
        <div className="mt-8 sm:mt-10">
          <Quote quote={quotes[0]} />
        </div>

        {/* Project 2 */}
        <div className="mt-12 sm:mt-16 flex flex-col gap-3 sm:gap-4 border-b border-[var(--gray-3)] pb-10 sm:pb-12">
          <BlurFade delay={0.05} inView>
            <Meta number={p2.number} year={p2.year} />
          </BlurFade>
          <BlurFade delay={0.1} inView>
            <h2 className="text-[clamp(1.5rem,5vw,2.5rem)] font-bold tracking-[-0.03em] text-[var(--gray-12)]">
              {p2.title}
            </h2>
          </BlurFade>
          <BlurFade delay={0.15} inView>
            <p className="text-[14px] sm:text-[15px] leading-[1.7] text-[var(--gray-8)]">
              {p2.lede}
            </p>
            {p2.detail && (
              <p className="mt-1 font-mono text-[12px] sm:text-[13px] text-[var(--gray-6)]">
                {p2.detail}
              </p>
            )}
            <p className="mt-2 text-[11px] sm:text-[12px] text-[var(--gray-6)]">{p2.role}</p>
          </BlurFade>
          <BlurFade delay={0.2} inView>
            <Tags tags={p2.tags} />
          </BlurFade>
        </div>

        {/* Project 3 */}
        <div className="mt-12 sm:mt-16 flex flex-col gap-3 sm:gap-4">
          <BlurFade delay={0.05} inView>
            <Meta number={p3.number} year={p3.year} />
          </BlurFade>
          <BlurFade delay={0.1} inView>
            <h2 className="text-[clamp(1.5rem,5vw,2.5rem)] font-bold tracking-[-0.03em] text-[var(--gray-12)]">
              {p3.title}
            </h2>
          </BlurFade>
          <BlurFade delay={0.15} inView>
            <p className="text-[14px] sm:text-[15px] leading-[1.7] text-[var(--gray-8)]">
              {p3.lede}
            </p>
            <p className="mt-2 text-[11px] sm:text-[12px] text-[var(--gray-6)]">{p3.role}</p>
          </BlurFade>
          <BlurFade delay={0.2} inView>
            <Tags tags={p3.tags} />
          </BlurFade>
        </div>

        {/* Stats row */}
        <div className="mt-16 sm:mt-20 grid grid-cols-2 gap-6 sm:gap-8 md:grid-cols-4">
          {stats.map((stat, i) => (
            <BlurFade key={stat.label} delay={i * 0.06} inView>
              <div className="flex flex-col gap-1">
                <p className="text-[clamp(1.75rem,7vw,3rem)] font-bold tracking-[-0.03em] text-[var(--gray-12)]">
                  <NumberTicker value={stat.number} delay={0.2 + i * 0.1} />
                  {stat.suffix}
                </p>
                <p className="text-[12px] sm:text-[13px] text-[var(--gray-7)]">{stat.label}</p>
              </div>
            </BlurFade>
          ))}
        </div>

        {/* Philosophy */}
        <div className="mt-12 sm:mt-16">
          <BlurFade delay={0} inView>
            <p className="text-center text-[clamp(1.125rem,4vw,1.75rem)] font-normal leading-[1.5] tracking-[-0.01em] text-[var(--gray-10)]">
              I care about putting technology in the hands of the people who
              need it the most &mdash; farmers, students, and first‑time
              learners. Clean UX and clear language matter as much as any line
              of code.
            </p>
          </BlurFade>
        </div>
      </div>
    </section>
  );
}
