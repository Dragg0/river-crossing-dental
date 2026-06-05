import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { ArrowLeft, Check, Smartphone, Clock, ShieldCheck } from "lucide-react";
import { siteConfig } from "@/lib/site-config";
import { CtaBand } from "@/components/cta-band";

export const metadata: Metadata = {
  title: "Invisalign Teen",
  description:
    "A better alternative to braces for teenagers — clear, removable aligners that handle their unique orthodontic needs. Dr. Peterson is a certified Invisalign Teen provider.",
};

const benefits = [
  {
    icon: Smartphone,
    title: "At-home monitoring app",
    body: "Fewer office visits, with progress tracked from the app between appointments.",
  },
  {
    icon: Clock,
    title: "22 hours a day",
    body: "Aligners are worn most of the day, removed only for eating, drinking anything but water, brushing, and flossing.",
  },
  {
    icon: ShieldCheck,
    title: "Lost-aligner protection",
    body: "Replacements are included in the cost of treatment — because teenagers happen.",
  },
];

const compareRows = [
  {
    feature: "Visibility",
    invisalign: "Virtually invisible clear plastic",
    braces: "Metal brackets visible on every tooth",
  },
  {
    feature: "Comfort",
    invisalign: "Smooth aligners, no wires to poke",
    braces: "Brackets and wires can irritate cheeks and lips",
  },
  {
    feature: "Brushing & flossing",
    invisalign: "Remove and brush normally",
    braces: "10+ minutes per session, threading floss around brackets",
  },
  {
    feature: "Food restrictions",
    invisalign: "None — eat anything you want",
    braces: "No popcorn, hard candy, gum, sticky foods",
  },
  {
    feature: "Sports",
    invisalign: "Pop aligners out, wear a standard mouthguard",
    braces: "Risk of bracket-related injury without a special mouthguard",
  },
];

export default function InvisalignTeenPage() {
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
                  Invisalign® Teen
                </p>
              </div>
              <h1 className="text-4xl sm:text-5xl font-bold text-brand-navy leading-tight">
                Don&rsquo;t want braces? We have a better option.
              </h1>
              <p className="text-lg text-slate-700 leading-relaxed">
                Invisalign® Teen is designed specifically for teenagers&rsquo; unique orthodontic
                needs. The clear, removable aligners are comfortable, convenient, and practically
                invisible — so your teen can keep smiling, eating what they love, and playing
                sports without missing a beat.
              </p>
              <p className="text-base text-slate-700 leading-relaxed">
                Dr. Peterson is a certified Invisalign® Teen provider with the training and
                experience to design a treatment plan that gets the smile your teen wants —
                quickly and gently.
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
                  src="/images/service/orthodontics/invisalign-teen/hero.jpg"
                  alt="Teenage Invisalign Teen patient smiling"
                  fill
                  sizes="(min-width: 1024px) 40vw, 100vw"
                  className="object-cover"
                  priority
                />
              </div>
              <div className="hidden lg:block absolute -bottom-6 -left-6 w-32 h-40 rounded-2xl overflow-hidden shadow-2xl bg-white p-3">
                <Image
                  src="/images/service/orthodontics/invisalign-teen/badge.png"
                  alt="Certified Invisalign Teen Provider"
                  width={245}
                  height={300}
                  className="w-full h-full object-contain"
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
              Built for teens
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold text-brand-navy">
              Why teens (and parents) love it.
            </h2>
          </div>
          <div className="grid sm:grid-cols-3 gap-6">
            {benefits.map(({ icon: Icon, title, body }) => (
              <div
                key={title}
                className="rounded-2xl bg-brand-cream p-6 text-center space-y-3"
              >
                <div className="mx-auto inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-brand-navy">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="font-bold text-brand-navy">{title}</h3>
                <p className="text-sm text-slate-700 leading-relaxed">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-brand-cream py-16 sm:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
          <div className="text-center mb-10 space-y-2">
            <p className="text-sm font-bold tracking-widest uppercase text-brand-coral">
              Side by side
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold text-brand-navy">
              Invisalign Teen vs. traditional braces.
            </h2>
          </div>
          <div className="rounded-3xl bg-white overflow-hidden shadow-sm">
            <table className="w-full">
              <thead>
                <tr className="border-b-2 border-brand-cream">
                  <th className="text-left p-4 lg:p-6 text-sm font-bold uppercase tracking-wider text-slate-500">
                    Feature
                  </th>
                  <th className="text-left p-4 lg:p-6 text-sm font-bold uppercase tracking-wider text-brand-coral">
                    Invisalign Teen
                  </th>
                  <th className="text-left p-4 lg:p-6 text-sm font-bold uppercase tracking-wider text-slate-500">
                    Braces
                  </th>
                </tr>
              </thead>
              <tbody>
                {compareRows.map((row, i) => (
                  <tr
                    key={row.feature}
                    className={i % 2 === 0 ? "bg-brand-cream/40" : ""}
                  >
                    <td className="p-4 lg:p-6 font-bold text-brand-navy align-top">
                      {row.feature}
                    </td>
                    <td className="p-4 lg:p-6 text-sm text-slate-700 align-top">
                      <span className="flex gap-2">
                        <Check className="h-4 w-4 mt-0.5 text-brand-coral flex-shrink-0" />
                        {row.invisalign}
                      </span>
                    </td>
                    <td className="p-4 lg:p-6 text-sm text-slate-500 align-top">{row.braces}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <CtaBand
        heading="Curious if Invisalign Teen is right for your child?"
        body="A complimentary consultation is the easiest way to find out. No pressure, no obligation."
      />
    </>
  );
}
