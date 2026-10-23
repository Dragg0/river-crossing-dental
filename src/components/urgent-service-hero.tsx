import Link from "next/link";
import Image from "next/image";
import {
  AlertCircle,
  ArrowRight,
  HeartPulse,
  Phone,
  PlusCircle,
  Star,
} from "lucide-react";
import type { UrgentHero } from "@/content/services";
import { reviews } from "@/content/reviews";
import { PhoneLink, PhoneNumber } from "@/components/call-measurement";
import { siteConfig } from "@/lib/site-config";

const symptomIcons = {
  "alert-circle": AlertCircle,
  "heart-pulse": HeartPulse,
  "plus-circle": PlusCircle,
};

export function UrgentServiceHero({ hero }: { hero: UrgentHero }) {
  const testimonial = reviews.find((r) => r.author === hero.testimonialAuthor);
  return (
    <>
      <section className="relative overflow-hidden bg-brand-cream">
        <div className="relative aspect-[16/9] md:absolute md:inset-0 md:aspect-auto">
          <Image src="/images/meet-the-team/family-warmth.webp" alt="Parents and their daughter smiling together outdoors" fill priority sizes="100vw" className="object-cover object-[center_35%]" />
          <div className="absolute inset-0 hidden bg-linear-to-r from-brand-navy-dark/95 via-brand-navy-dark/80 to-brand-navy-dark/5 md:block" />
        </div>
        <div className="container relative mx-auto px-4 py-7 sm:px-6 md:py-14 lg:px-8 lg:py-16">
          <div className="max-w-xl">
            <p className="text-sm font-bold uppercase text-brand-navy md:text-white/85">{hero.eyebrow}</p>
            <div className="mt-4 flex items-center gap-4 sm:gap-6">
              <p className="shrink-0 text-6xl font-extrabold leading-none text-brand-navy sm:text-7xl md:text-white">{hero.offer?.price}</p>
              <h1 className="text-balance text-2xl font-bold leading-tight text-brand-navy sm:text-4xl md:text-white">{hero.headline}</h1>
            </div>
            <p className="mt-5 max-w-lg text-base leading-relaxed text-slate-700 md:text-lg md:text-white">{hero.intro}</p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <PhoneLink className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-brand-coral px-7 text-sm font-bold text-white hover:bg-brand-coral-dark focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-steel-light">
                <Phone className="h-4 w-4" aria-hidden="true" />Call <PhoneNumber />
              </PhoneLink>
              <a href={siteConfig.booking} target="_blank" rel="noopener noreferrer" className="inline-flex h-12 items-center justify-center rounded-full border-2 border-brand-navy px-7 text-sm font-semibold text-brand-navy hover:bg-brand-navy hover:text-white md:border-white/70 md:text-white md:hover:bg-white/10">Book Online</a>
            </div>
            {hero.offer && <div className="mt-5 max-w-lg text-sm leading-relaxed text-slate-600 md:text-white/90">
              <p>{hero.offer.finePrint}</p>
              <Link href={hero.offer.href} className="mt-2 inline-flex min-h-11 items-center gap-2 font-semibold underline underline-offset-4 hover:text-brand-coral md:hover:text-white">See offer details<ArrowRight className="h-4 w-4" /></Link>
            </div>}
          </div>
        </div>
      </section>
      <section className="bg-brand-cream">
        <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
          <div className="grid gap-3 md:grid-cols-3">
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
      {hero.treatments && (
        <section className="bg-brand-cream">
          <div className="container mx-auto px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
            <p className="text-sm font-bold uppercase text-brand-coral">
              How we can help
            </p>
            <h2 className="mt-2 text-2xl font-bold text-brand-navy sm:text-3xl">
              Care for the emergencies we see most.
            </h2>
            <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {hero.treatments.map((item) => (
                <li
                  key={item.label}
                  className="flex items-start gap-4 rounded-lg bg-white p-5 sm:flex-col sm:gap-0 sm:p-6"
                >
                  <Image
                    src={item.image}
                    alt=""
                    width={96}
                    height={96}
                    className="h-16 w-16 shrink-0 object-contain sm:h-20 sm:w-20"
                  />
                  <div>
                    <h3 className="text-lg font-bold text-brand-navy sm:mt-4">
                      {item.label}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-slate-600">
                      {item.description}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
            {hero.treatmentsNote && (
              <p className="mt-6 text-sm leading-relaxed text-slate-700">
                {hero.treatmentsNote}{" "}
                <Link
                  href="/financing-insurance"
                  className="font-semibold text-brand-navy underline underline-offset-4 hover:text-brand-coral"
                >
                  Financing &amp; insurance
                </Link>
              </p>
            )}
            {testimonial && (
              <figure className="mt-10 max-w-3xl">
                <div
                  className="flex gap-1 text-amber-400"
                  aria-label="5 out of 5 stars"
                >
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className="h-4 w-4 fill-current"
                      aria-hidden="true"
                    />
                  ))}
                </div>
                <blockquote className="mt-3 text-lg leading-relaxed text-brand-navy sm:text-xl">
                  &ldquo;{testimonial.quote}&rdquo;
                </blockquote>
                <figcaption className="mt-3 text-sm text-slate-600">
                  <span className="font-bold text-brand-navy">
                    {testimonial.author}
                  </span>{" "}
                  · {testimonial.source} review ·{" "}
                  <Link
                    href="/reviews"
                    className="font-semibold text-brand-navy underline underline-offset-4 hover:text-brand-coral"
                  >
                    More patient reviews
                  </Link>
                </figcaption>
              </figure>
            )}
          </div>
        </section>
      )}
    </>
  );
}
