import type { Metadata } from "next";
import Image from "next/image";
import { Radio, ScanFace, Crown, Sparkles, type LucideIcon } from "lucide-react";
import { CtaBand } from "@/components/cta-band";

export const metadata: Metadata = {
  title: "Advanced Technology",
  description:
    "Same-day 3D-printed crowns (SprintRay Midas), guided implant surgery, and low-radiation digital X-rays at River Crossing Family Dental.",
};

type Tech = {
  heading: string;
  body: string;
  icon: LucideIcon;
  bullets?: string[];
};

const technologies: Tech[] = [
  {
    heading: "Digital X-Ray",
    icon: Radio,
    body: "Our digital X-ray system gives us better images of your oral anatomy with a fraction of the radiation of older film-based systems. Images appear instantly on the screen so we can talk through findings together.",
    bullets: [
      "Up to 90% less radiation exposure",
      "Lightning-fast image processing",
      "Better image quality",
      "Easy to store and share visuals",
    ],
  },
  {
    heading: "Guided Implant Surgery",
    icon: ScanFace,
    body: "We use a 3D X-ray scanner to produce a life-like model of your oral anatomy, letting us study jawbone density and condition to determine ideal implant placement. Planning the placement before surgery lets us perform with high accuracy and maximizes the long-term success of your implants.",
  },
  {
    heading: "Same-Day 3D-Printed Crowns",
    icon: Crown,
    body: "When you need a crown, we can design, print, and place it in a single visit — no temporary crown, no waiting weeks for a lab, no second appointment to disrupt your schedule. We use the SprintRay Midas, the latest generation of chairside crown printing technology. After a quick digital scan of your tooth, the crown is custom-designed on screen, printed and cured in our office using a strong, biocompatible ceramic resin, then bonded into place — all before you leave.",
    bullets: [
      "One visit instead of two or three",
      "No uncomfortable temporary crown to babysit",
      "A permanent, biocompatible restoration that looks and feels like your own tooth",
      "Most cases finish in around 90 minutes of chair time",
    ],
  },
  {
    heading: "Certified Invisalign Provider",
    icon: Sparkles,
    body: "Dr. Peterson is a certified Invisalign provider with advanced orthodontic training. We treat overbites, underbites, crowding, gaps, and edge-to-edge bites with Invisalign, traditional braces, or HealthyStart — whichever option fits your goals best.",
  },
];

export default function AdvancedTechnologyPage() {
  return (
    <>
      <section className="bg-brand-cream py-16 sm:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl text-center space-y-5">
          <p className="text-sm font-bold tracking-widest uppercase text-brand-coral">
            Advanced Technology
          </p>
          <h1 className="text-4xl sm:text-5xl font-bold text-brand-navy">
            The latest equipment, the best care.
          </h1>
          <p className="text-lg text-slate-700 max-w-2xl mx-auto leading-relaxed">
            We invest in modern dental technology so our patients get the best care possible —
            faster diagnoses, more comfortable treatments, and better long-term outcomes.
          </p>
        </div>
      </section>

      <section className="bg-brand-cream pb-16 sm:pb-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
          <div className="relative aspect-[5/2] rounded-3xl overflow-hidden shadow-xl">
            <Image
              src="/images/advanced-technology/banner.webp"
              alt="Dental professional holding a modern curing-light handpiece at a treatment chair"
              fill
              sizes="(min-width: 1280px) 1152px, 100vw"
              className="object-cover"
              priority
            />
          </div>
        </div>
      </section>

      <section className="bg-white py-16 sm:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
          <div className="space-y-10">
            {technologies.map((tech, i) => {
              const Icon = tech.icon;
              return (
                <article
                  key={tech.heading}
                  className="grid sm:grid-cols-[80px_1fr] gap-6 sm:gap-8"
                >
                  <div>
                    <div className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-brand-cream text-brand-navy">
                      <Icon className="h-8 w-8" />
                    </div>
                  </div>
                  <div className="space-y-3">
                    <h2 className="text-2xl sm:text-3xl font-bold text-brand-navy">
                      <span className="text-brand-coral font-mono text-base align-top mr-2">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      {tech.heading}
                    </h2>
                    <p className="text-base sm:text-lg text-slate-700 leading-relaxed">
                      {tech.body}
                    </p>
                    {tech.bullets && (
                      <ul className="space-y-2 mt-3">
                        {tech.bullets.map((b) => (
                          <li
                            key={b}
                            className="flex gap-2 text-slate-700"
                          >
                            <span className="text-brand-coral mt-1.5 flex-shrink-0">•</span>
                            <span>{b}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <CtaBand
        heading="Experience the difference."
        body="Book a visit to see our technology in action — and learn why our patients keep coming back."
      />
    </>
  );
}
