import Link from "next/link";
import {
  AlertCircle,
  ArrowRight,
  HeartPulse,
  Phone,
  PlusCircle,
  Star,
} from "lucide-react";
import type { UrgentHero } from "@/content/services";
import { PhoneLink, PhoneNumber } from "@/components/call-measurement";
import { siteConfig } from "@/lib/site-config";

const symptomIcons = {
  "alert-circle": AlertCircle,
  "heart-pulse": HeartPulse,
  "plus-circle": PlusCircle,
};

export function UrgentServiceHero({ hero }: { hero: UrgentHero }) {
  return (
    <>
      <section className="bg-brand-cream">
        <div className="container mx-auto px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-[1.2fr_1fr] lg:gap-16">
            <div>
              <p className="mb-3 text-sm font-bold uppercase text-brand-coral">
                {hero.eyebrow}
              </p>
              <h1 className="max-w-2xl text-3xl font-bold leading-tight text-brand-navy sm:text-5xl">
                {hero.headline}
              </h1>
              <p className="mt-4 max-w-xl text-base leading-relaxed text-slate-700 sm:text-lg">
                {hero.intro}
              </p>
              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <PhoneLink className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-brand-coral px-7 text-sm font-bold text-white hover:bg-brand-coral-dark focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-navy">
                  <Phone className="h-4 w-4" aria-hidden="true" />
                  Call <PhoneNumber />
                </PhoneLink>
                <a
                  href={siteConfig.booking}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-12 items-center justify-center rounded-full border-2 border-brand-navy px-7 text-sm font-semibold text-brand-navy hover:bg-brand-navy hover:text-white"
                >
                  Book Online
                </a>
              </div>
            </div>
            {hero.offer && (
              <div className="border-t border-brand-steel-light pt-6 lg:border-l lg:border-t-0 lg:pl-10 lg:pt-0">
                <p className="text-sm font-bold uppercase text-brand-coral">
                  New patient special
                </p>
                <div className="mt-3 flex items-center gap-5">
                  <p className="shrink-0 text-6xl font-extrabold leading-none text-brand-navy sm:text-7xl">
                    {hero.offer.price}
                  </p>
                  <p className="max-w-48 text-xl font-bold leading-snug text-brand-navy">
                    {hero.offer.title}
                  </p>
                </div>
                <p className="mt-4 max-w-md text-sm leading-relaxed text-slate-700">
                  {hero.offer.finePrint}
                </p>
                <Link
                  href={hero.offer.href}
                  className="mt-3 inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-brand-navy underline underline-offset-4 hover:text-brand-coral"
                >
                  See offer details
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            )}
          </div>
          <div className="mt-8 grid gap-3 md:grid-cols-3">
            {hero.cards.map((card) => {
              const Icon =
                symptomIcons[card.iconKey as keyof typeof symptomIcons] ??
                AlertCircle;
              return (
                <PhoneLink
                  key={card.label}
                  className="group flex min-h-36 items-start gap-4 rounded-lg border border-slate-200 bg-white p-5 transition-colors hover:border-brand-coral focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-navy"
                >
                  <Icon
                    className="mt-1 h-8 w-8 shrink-0 text-brand-coral"
                    aria-hidden="true"
                  />
                  <span className="min-w-0 flex-1">
                    <span className="block text-base font-bold text-brand-navy">
                      {card.label}
                    </span>
                    <span className="mt-2 block text-sm leading-relaxed text-slate-600">
                      {card.description}
                    </span>
                    <span className="mt-3 inline-flex items-center gap-2 text-sm font-semibold text-brand-navy">
                      Call for help
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </span>
                  </span>
                </PhoneLink>
              );
            })}
          </div>
        </div>
      </section>
      <section className="border-y border-slate-200 bg-white">
        <div className="container mx-auto flex flex-col gap-4 px-4 py-5 sm:px-6 md:flex-row md:items-center md:justify-between lg:px-8">
          <Link
            href="/reviews"
            className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-brand-navy hover:underline"
          >
            <Star
              className="h-5 w-5 fill-amber-400 text-amber-400"
              aria-hidden="true"
            />
            <strong>4.7 / 5</strong>
            <span>345+ Google reviews</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
          <p className="max-w-xl text-sm leading-relaxed text-slate-600">
            {hero.afterHours}
          </p>
        </div>
      </section>
      <section className="bg-white">
        <div className="container mx-auto px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
          <p className="text-sm font-bold uppercase text-brand-coral">
            What happens next
          </p>
          <h2 className="mt-2 text-2xl font-bold text-brand-navy sm:text-3xl">
            From the first call to a plan you understand.
          </h2>
          <ol className="mt-8 grid gap-7 md:grid-cols-3">
            {hero.steps.map((step, i) => (
              <li
                key={step.label}
                className="border-t border-brand-steel-light pt-4"
              >
                <span className="text-sm font-bold text-brand-coral">
                  Step {i + 1}
                </span>
                <h3 className="mt-2 text-lg font-bold text-brand-navy">
                  {step.label}
                </h3>
                <p className="mt-2 max-w-sm text-sm leading-relaxed text-slate-600">
                  {step.description}
                </p>
              </li>
            ))}
          </ol>
          {hero.emergencyNote && (
            <p className="mt-8 border-l border-brand-coral pl-4 text-sm leading-relaxed text-slate-700">
              <strong>Go to the ER:</strong> {hero.emergencyNote}
            </p>
          )}
        </div>
      </section>
    </>
  );
}
