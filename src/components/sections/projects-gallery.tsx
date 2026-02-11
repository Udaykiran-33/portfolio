"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { BlurFade } from "@/components/ui/blur-fade";
import { SpotlightCard } from "@/components/ui/spotlight-card";
import { Safari } from "@/components/ui/safari";
import { PlaceholderImage } from "@/components/ui/placeholder-image";

const projects = [
  {
    title: "KRISHI AI",
    description:
      "End‑to‑end platform that empowers smallholder farmers with personalized crop guidance, AI‑based disease detection from images, and Telugu voice support. Integrates soil and climate data to deliver hyperlocal, actionable recommendations.",
    role: "Full‑Stack Developer",
    url: "krishi-ai.example",
    year: "2025",
    tags: ["MERN", "AI", "Farmer Tech"],
  },
  {
    title: "Complete Fertility",
    description:
      "Web platform that helps farmers and gardening enthusiasts browse, compare, and purchase fertilizers with confidence. Focused on clear product information, comparisons, and a seamless buying flow.",
    role: "MERN Stack Developer",
    url: "complete-fertility.example",
    year: "2025",
    tags: ["MERN", "E‑commerce"],
  },
  {
    title: "Course Web",
    description:
      "An online course platform that delivers high‑demand tech skills at an affordable price. Built with a responsive layout, intuitive navigation, and SEO‑friendly pages to make quality education accessible.",
    role: "Web Developer",
    url: "courseweb.in",
    year: "2025",
    tags: ["WordPress", "UI/UX"],
  },
];

function ProjectCard({
  project,
  index,
}: {
  project: (typeof projects)[0];
  index: number;
}) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const mockupY = useTransform(scrollYProgress, [0, 1], [20, -20]);
  const isOdd = index % 2 === 1;

  return (
    <BlurFade delay={0.05 + index * 0.08} inView>
      <SpotlightCard>
        <div
          ref={ref}
          className="grid gap-6 p-6 md:grid-cols-[1fr,1.1fr] md:gap-10 md:p-8"
        >
          <div
            className={`flex flex-col justify-center gap-4 ${isOdd ? "md:order-2" : ""}`}
          >
            <div className="flex items-center gap-3">
              <span className="text-[11px] font-mono text-[var(--gray-6)]">
                0{index + 1}
              </span>
              <div className="h-px flex-1 bg-[var(--gray-3)]" />
              <span className="text-[11px] font-mono text-[var(--gray-6)]">
                {project.year}
              </span>
            </div>

            <h3 className="text-[clamp(1.25rem,3vw,1.75rem)] font-bold tracking-[-0.02em] text-[var(--gray-12)]">
              {project.title}
            </h3>

            <p className="text-[14px] leading-[1.65] text-[var(--gray-8)]">
              {project.description}
            </p>

            <p className="text-[12px] text-[var(--gray-6)]">{project.role}</p>

            <div className="mt-1 flex flex-wrap gap-1.5">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-md bg-[var(--gray-3)] px-2 py-0.5 text-[11px] font-medium text-[var(--gray-8)]"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <motion.div
            style={{ y: mockupY }}
            className={isOdd ? "md:order-1" : ""}
          >
            <Safari url={project.url} className="shadow-lg shadow-black/10">
              <PlaceholderImage
                width={560}
                height={340}
                label={project.title}
                className="rounded-none border-0"
              />
            </Safari>
          </motion.div>
        </div>
      </SpotlightCard>
    </BlurFade>
  );
}

export function ProjectsGallery() {
  return (
    <section id="work" className="relative w-full py-32 px-6">
      <div className="mx-auto max-w-[960px]">
        <BlurFade delay={0} inView>
          <p className="mb-16 text-[13px] font-medium uppercase tracking-[0.15em] text-[var(--gray-7)]">
            Selected Work
          </p>
        </BlurFade>

        <div className="flex flex-col gap-6">
          {projects.map((project, i) => (
            <ProjectCard key={project.title} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
