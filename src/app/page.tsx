"use client";

import { Preloader } from "@/components/ui/preloader";
import { Navbar } from "@/components/sections/navbar";
import { Hero } from "@/components/sections/hero";
import { Experience } from "@/components/sections/experience";
import { About } from "@/components/sections/about";
import { Education } from "@/components/sections/education";
import { Certifications } from "@/components/sections/certifications";
import { Work } from "@/components/sections/work";
import { Skills } from "@/components/sections/skills";
import { Testimonials } from "@/components/sections/testimonials";
import { Contact } from "@/components/sections/contact";

export default function Home() {
  return (
    <Preloader>
      <main className="min-h-screen bg-background text-foreground">
        <Navbar />

        {/* Summary */}
        <Hero />
        <About />

        {/* Structured resume sections */}
        <Experience />
        <Education />
        <Certifications />

        {/* Projects, skills, and contact */}
        <Work />
        <Skills />
        <Testimonials />
        <Contact />
      </main>
    </Preloader>
  );
}
