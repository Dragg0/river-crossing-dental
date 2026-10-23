import type { Metadata } from "next";
import Image from "next/image";
import { ArrowDown, ArrowUpRight, Star } from "lucide-react";
import { reviews } from "@/content/reviews";
import { siteConfig } from "@/lib/site-config";
import { CtaBand } from "@/components/cta-band";

export const metadata: Metadata = {
  title: "Patient Reviews",
  description: `See what patients say about ${siteConfig.shortName}. 4.7 stars from 345+ Google reviews in Riverton, UT.`,
};

function GoogleRatingStars() {
  const rating = 4.7;
  return (
    <div
      className="flex justify-center gap-1 text-amber-400"
      aria-label="4.7 out of 5 stars"
    >
      {Array.from({ length: 5 }).map((_, i) => {
        const fill = Math.min(1, Math.max(0, rating - i));
        return (
          <span
            key={i}
            className="relative inline-block h-6 w-6"
            aria-hidden="true"
          >
            <Star className="h-6 w-6 text-amber-200" />
            <span
              className="absolute inset-y-0 left-0 overflow-hidden"
              style={{ width: `${fill * 100}%` }}
            >
              <Star className="h-6 w-6 fill-current" />
            </span>
          </span>
        );
      })}
    </div>
  );
}

const sourceColors: Record<string, string> = {
  Google: "bg-white text-slate-700",
  Yelp: "bg-red-500 text-white",
  Office: "bg-brand-cream text-brand-navy",
};

export default function ReviewsPage() {
  return (
    <>
      <section className="bg-brand-cream py-10 sm:py-14">
        <div className="container mx-auto grid max-w-6xl items-center gap-8 px-4 sm:px-6 lg:grid-cols-[1.4fr_1fr] lg:gap-16 lg:px-8">
          <div className="space-y-4">
            <h1 className="text-4xl sm:text-5xl font-bold text-brand-navy">
              Patient reviews.
            </h1>
            <p className="max-w-xl text-lg leading-relaxed text-slate-700">
              From the first visit to years of family care, hear what patients
              have shared about River Crossing.
            </p>
            <a
              href="#patient-stories"
              className="inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-brand-navy underline underline-offset-4 hover:text-brand-coral"
            >
              Read patient stories
              <ArrowDown className="h-4 w-4" aria-hidden="true" />
            </a>
          </div>
          <div className="border-t border-brand-steel-light pt-6 text-center lg:border-l lg:border-t-0 lg:pl-10 lg:pt-0">
            <p className="text-6xl font-extrabold leading-none text-brand-navy">
              4.7
              <span className="ml-1 text-xl font-medium text-slate-500">
                / 5
              </span>
            </p>
            <div className="mt-3">
              <GoogleRatingStars />
            </div>
            <p className="mt-3 text-sm text-slate-600">
              From 345+ Google reviews
            </p>
            <div className="mt-3 flex flex-col items-center gap-3">
              <a
                href={siteConfig.googleMapsDirections}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-11 items-center justify-center gap-2 text-sm font-semibold text-brand-navy underline underline-offset-4 hover:text-brand-coral"
              >
                Find us on Google
                <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
              </a>
            </div>
          </div>
        </div>
      </section>

      <section
        id="patient-stories"
        className="scroll-mt-24 bg-white py-10 sm:py-14"
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
          <div className="mb-7 flex flex-wrap items-end justify-between gap-3">
            <h2 className="text-2xl font-bold text-brand-navy">
              In our patients&apos; words.
            </h2>
            <p className="text-sm text-slate-600">
              Selected reviews from Google and Yelp
            </p>
          </div>
          <div className="columns-1 gap-5 md:columns-2 md:[column-fill:balance]">
            {reviews.map((r, i) => (
              <figure
                key={i}
                className="mb-5 inline-flex w-full break-inside-avoid flex-col gap-4 rounded-lg border border-slate-200 bg-brand-cream p-6 lg:p-7"
              >
                <div
                  className="flex gap-1 text-amber-400"
                  aria-label="5 out of 5 stars"
                >
                  {Array.from({ length: 5 }).map((_, idx) => (
                    <Star key={idx} className="h-4 w-4 fill-current" />
                  ))}
                </div>
                <blockquote className="text-base leading-7 text-slate-700">
                  &ldquo;{r.quote}&rdquo;
                </blockquote>
                <figcaption className="mt-auto flex items-center justify-between pt-2 text-sm">
                  <span className="font-bold text-brand-navy">
                    — {r.author}
                  </span>
                  <span
                    className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wider ${
                      sourceColors[r.source]
                    }`}
                  >
                    {r.source}
                  </span>
                </figcaption>
              </figure>
            ))}
          </div>

        </div>
      </section>

      <section className="bg-brand-cream">
        <div className="container mx-auto grid max-w-6xl items-center gap-8 px-4 py-12 sm:px-6 sm:py-16 md:grid-cols-2 lg:gap-14 lg:px-8">
          <div className="relative aspect-[3/2] overflow-hidden rounded-lg">
            <Image
              src="/images/reviews/family-park.webp"
              alt="A family laughing together on a blanket in a sunny park"
              fill
              sizes="(min-width: 768px) 50vw, 100vw"
              className="object-cover"
            />
          </div>
          <div className="flex flex-col items-center gap-3 text-center md:items-start md:text-left">
            <h2 className="text-2xl font-bold text-brand-navy sm:text-3xl">
              Been in to see us?
            </h2>
            <p className="mb-2 text-base text-slate-700">
              Your feedback helps other patients get to know our practice.
            </p>
            <a
              href={siteConfig.googleReviewUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-12 items-center justify-center rounded-full bg-brand-coral px-8 text-sm font-bold text-white shadow-md hover:bg-brand-coral-dark"
            >
              Leave us a Google review
            </a>
            <p className="text-sm text-slate-600">
              You can also leave a note on{" "}
              <a
                href={siteConfig.social.yelp}
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-brand-navy underline-offset-2 hover:text-brand-coral hover:underline"
              >
                Yelp
              </a>{" "}
              or{" "}
              <a
                href={siteConfig.social.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-brand-navy underline-offset-2 hover:text-brand-coral hover:underline"
              >
                Facebook
              </a>
              .
            </p>
          </div>
        </div>
      </section>

      <CtaBand
        heading="Become our next happy patient."
        body="Book online or call to schedule your first visit."
      />
    </>
  );
}
