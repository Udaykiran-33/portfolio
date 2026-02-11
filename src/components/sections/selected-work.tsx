"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { BlurFade } from "@/components/ui/blur-fade";
import { Safari } from "@/components/ui/safari";
import { PlaceholderImage } from "@/components/ui/placeholder-image";

const featured = [
  {
    title: "Meridian",
    description:
      "A comprehensive design system built for a leading fintech platform. Unified 40+ components across web and mobile, reducing design-to-dev handoff time by 60%.",
    role: "Lead Designer & Developer",
    url: "meridian.design",
    year: "2024",
  },
  {
    title: "Wavelength",
    description:
      "Real-time audio visualization engine that transforms sound into generative art. Powers live visuals for electronic music events with sub-16ms latency.",
    role: "Creative Developer",
    url: "wavelength.audio",
    year: "2024",
  },
  {
    title: "Cataract",
    description:
      "Enterprise data pipeline orchestration tool handling 2M+ events per second. Built a visual DAG editor for non-technical users to design complex data flows.",
    role: "Full-Stack Engineer",
    url: "cataract.io",
    year: "2023",
  },
];

function FeaturedProject({
  project,
  index,
}: {
  project: (typeof featured)[0];
  index: number;
}) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [40, -40]);

  const isOdd = index % 2 === 1;

  return (
    <motion.div
      ref={ref}
      className="grid gap-10 md:grid-cols-2 md:items-center md:gap-16"
    >
      <div className={`flex flex-col gap-4 ${isOdd ? "md:order-2" : ""}`}>
        <BlurFade delay={0.1} inView>
          <div className="flex items-center gap-3">
            <span className="text-[12px] font-mono text-[var(--gray-6)]">
              0{index + 1}
            </span>
            <div className="h-px flex-1 bg-[var(--gray-3)]" />
            <span className="text-[12px] font-mono text-[var(--gray-6)]">
              {project.year}
            </span>
          </div>
        </BlurFade>

        <BlurFade delay={0.15} inView>
          <h3 className="text-[clamp(1.5rem,4vw,2rem)] font-bold tracking-[-0.03em] text-[var(--gray-12)]">
            {project.title}
          </h3>
        </BlurFade>

        <BlurFade delay={0.2} inView>
          <p className="text-[15px] leading-[1.7] text-[var(--gray-8)]">
            {project.description}
          </p>
        </BlurFade>

        <BlurFade delay={0.25} inView>
          <p className="text-[13px] text-[var(--gray-6)]">{project.role}</p>
        </BlurFade>
      </div>

      <motion.div
        style={{ y }}
        className={isOdd ? "md:order-1" : ""}
      >
        <BlurFade delay={0.1} inView>
          <Safari url={project.url} className="shadow-lg shadow-black/10">
            <PlaceholderImage
              width={640}
              height={400}
              label={project.title}
              className="rounded-none border-0"
            />
          </Safari>
        </BlurFade>
      </motion.div>
    </motion.div>
  );
}

export function SelectedWork() {
  return (
    <section className="relative w-full py-32 px-6">
      <div className="mx-auto max-w-[960px]">
        <BlurFade delay={0} inView>
          <p className="mb-20 text-[13px] font-medium uppercase tracking-[0.15em] text-[var(--gray-7)]">
            Featured Projects
          </p>
        </BlurFade>

        <div className="flex flex-col gap-32">
          {featured.map((project, i) => (
            <FeaturedProject key={project.title} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
