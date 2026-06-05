import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { ArrowLeft, Sparkles, Activity, Clock4, Smile } from "lucide-react";
import { siteConfig } from "@/lib/site-config";
import { CtaBand } from "@/components/cta-band";

export const metadata: Metadata = {
  title: "Invisalign First",
  description:
    "Early orthodontic treatment for kids ages 6–10. Invisalign First gently guides developing smiles with clear aligners — designed specifically for growing mouths.",
};

const benefits = [
  {
    icon: Sparkles,
    title: "Designed for growing smiles",
    body: "Custom-built aligners that account for new permanent teeth coming in and baby teeth still falling out.",
  },
  {
    icon: Activity,
    title: "Treats more than crowding",
    body: "Effective for arch expansion, crowding, spacing, narrow palates, and bite issues — not just cosmetic alignment.",
  },
  {
    icon: Clock4,
    title: "Easier on parents",
    body: "Removable for brushing, no food restrictions, fewer emergency office visits than traditional appliances.",
  },
  {
    icon: Smile,
    title: "More confident kids",
    body: "Virtually invisible clear aligners — no metal mouth at picture day, no teasing from classmates.",
  },
];

export default function InvisalignFirstPage() {
  return (
    <>
      <section className="bg-brand-cream border-b border-slate-200">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link
            href="/services/orthodontics"
            className="inline-flex items-center text-sm font-medium text-brand-navy hover:text-brand-coral"
          >
            <ArrowLeft className="w-4 h-4 mr-2" /> Back to Orthodontics
          </Link>
        </div>
      </section>

      <section className="bg-brand-cream py-12 sm:py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-5 gap-10 items-center">
            <div className="lg:col-span-3 space-y-5">
              <div className="inline-flex items-center gap-3">
                <p className="text-sm font-bold tracking-widest uppercase text-brand-coral">
                  Invisalign® First
                </p>
              </div>
              <h1 className="text-4xl sm:text-5xl font-bold text-brand-navy leading-tight">
                Early orthodontics — without the metal mouth.
              </h1>
              <p className="text-lg text-slate-700 leading-relaxed">
                Invisalign® First is built for kids ages 6 through 10, while they still have a mix
                of baby teeth and permanent teeth. The clear, removable aligners gently guide your
                child&rsquo;s developing smile — addressing crowding, spacing, narrow arches, and
                bite issues early, before they become bigger problems later.
              </p>
              <p className="text-base text-slate-700 leading-relaxed">
                Starting treatment early can shorten or eliminate the need for braces in the teen
                years. Dr. Peterson&rsquo;s training in pediatric orthodontics makes River Crossing
                a great place to start your child&rsquo;s journey.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <a
                  href={siteConfig.booking}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-12 items-center justify-center rounded-full bg-brand-coral px-8 text-sm font-bold text-white shadow-md hover:bg-brand-coral-dark"
                >
                  Book a Free Consultation
                </a>
                <a
                  href={`tel:${siteConfig.phone.tel}`}
                  className="inline-flex h-12 items-center justify-center rounded-full border-2 border-brand-navy px-8 text-sm font-semibold text-brand-navy hover:bg-brand-navy hover:text-white"
                >
                  Call {siteConfig.phone.display}
                </a>
              </div>
            </div>
            <div className="lg:col-span-2 relative">
              <div className="relative aspect-[4/5] rounded-3xl overflow-hidden shadow-xl">
                <Image
                  src="/images/service/orthodontics/invisalign-first/hero.jpg"
                  alt="Young Invisalign First patient smiling"
                  fill
                  sizes="(min-width: 1024px) 40vw, 100vw"
                  className="object-cover"
                  priority
                />
              </div>
              <div className="hidden lg:block absolute -bottom-6 -left-6 w-32 h-40 rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src="/images/service/orthodontics/invisalign-first/badge.png"
                  alt="Proudly treating ages 7+"
                  width={636}
                  height={840}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-16 sm:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
          <div className="text-center mb-10 space-y-2">
            <p className="text-sm font-bold tracking-widest uppercase text-brand-coral">
              Why start early
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold text-brand-navy">
              The case for Phase 1 treatment.
            </h2>
            <p className="text-slate-600 max-w-2xl mx-auto">
              Catching issues while the jaw is still developing — typically between ages 6 and 10
              — is often easier, faster, and less invasive than waiting until all permanent teeth
              are in.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {benefits.map(({ icon: Icon, title, body }) => (
              <div
                key={title}
                className="rounded-2xl bg-brand-cream p-6 space-y-3"
              >
                <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-white text-brand-navy">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="font-bold text-brand-navy">{title}</h3>
                <p className="text-sm text-slate-700 leading-relaxed">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-brand-cream py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
          <div className="grid lg:grid-cols-2 gap-10 items-center">
            <div className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-xl">
              <Image
                src="/images/service/orthodontics/invisalign-first/smiles.jpg"
                alt="Children smiling after Invisalign First treatment"
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover"
              />
            </div>
            <div className="space-y-5">
              <h2 className="text-3xl font-bold text-brand-navy">
                Is your child a candidate?
              </h2>
              <p className="text-slate-700 leading-relaxed">
                The best way to know is a complimentary consultation. We&rsquo;ll do a gentle exam,
                take a digital scan, and walk through whether early treatment makes sense — or
                whether it&rsquo;s better to wait. No pressure either way.
              </p>
              <p className="text-slate-700 leading-relaxed">
                If your child has any of the following, early evaluation is especially worth it:
              </p>
              <ul className="space-y-2 text-slate-700">
                {[
                  "Crowded or crooked baby teeth.",
                  "A narrow palate (tongue presses against the roof of the mouth).",
                  "Difficulty chewing or biting.",
                  "Thumb sucking or prolonged pacifier use.",
                  "Mouth breathing or snoring at night.",
                  "A family history of orthodontic treatment.",
                ].map((item) => (
                  <li key={item} className="flex gap-2 leading-relaxed">
                    <span className="text-brand-coral mt-1.5 flex-shrink-0">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <CtaBand
        heading="Wondering if early treatment makes sense for your child?"
        body="Bring them in for a complimentary consultation. We&rsquo;ll give you honest guidance, not a sales pitch."
      />
    </>
  );
}
