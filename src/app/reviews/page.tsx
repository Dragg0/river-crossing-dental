import type { Metadata } from "next";
import Image from "next/image";
import { Star } from "lucide-react";
import { reviews } from "@/content/reviews";
import { siteConfig } from "@/lib/site-config";
import { CtaBand } from "@/components/cta-band";

export const metadata: Metadata = {
  title: "Patient Reviews",
  description: `See what patients say about ${siteConfig.shortName}. 5/5 average rating from real Riverton, UT patients.`,
};

const sourceColors: Record<string, string> = {
  Google: "bg-white text-slate-700",
  Yelp: "bg-red-500 text-white",
  Office: "bg-brand-cream text-brand-navy",
};

export default function ReviewsPage() {
  return (
    <>
      <section className="bg-brand-cream py-16 sm:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl text-center space-y-5">
          <p className="text-sm font-bold tracking-widest uppercase text-brand-coral">
            Patient Reviews
          </p>
          <h1 className="text-4xl sm:text-5xl font-bold text-brand-navy">
            5/5 average rating from our patients.
          </h1>
          <div
            className="flex justify-center gap-1 text-amber-400"
            aria-label="5 out of 5 stars"
          >
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} className="h-6 w-6 fill-current" />
            ))}
          </div>
          <p className="text-lg text-slate-700 max-w-2xl mx-auto leading-relaxed">
            These reviews come from real patients on Google and Yelp. We&rsquo;re grateful to
            every family who has trusted us with their care.
          </p>
        </div>
      </section>

      <section className="bg-brand-cream pb-16 sm:pb-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
          <div className="relative aspect-[5/2] rounded-3xl overflow-hidden shadow-xl">
            <Image
              src="/images/reviews/family-park.webp"
              alt="A family laughing together outdoors on a sunny day"
              fill
              sizes="(min-width: 1280px) 1152px, 100vw"
              className="object-cover"
              priority
            />
          </div>
        </div>
      </section>

      <section className="bg-white py-16 sm:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {reviews.map((r, i) => (
              <figure
                key={i}
                className="flex flex-col gap-4 rounded-2xl bg-brand-cream p-6 lg:p-8 shadow-sm"
              >
                <div
                  className="flex gap-1 text-amber-400"
                  aria-label="5 out of 5 stars"
                >
                  {Array.from({ length: 5 }).map((_, idx) => (
                    <Star key={idx} className="h-4 w-4 fill-current" />
                  ))}
                </div>
                <blockquote className="text-slate-700 leading-relaxed italic flex-1">
                  &ldquo;{r.quote}&rdquo;
                </blockquote>
                <figcaption className="mt-auto flex items-center justify-between pt-2 text-sm">
                  <span className="font-bold text-brand-navy">— {r.author}</span>
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

          <div className="mt-12 text-center text-sm text-slate-600">
            <p>
              Have a great experience to share? Leave us a review on{" "}
              <a
                href={siteConfig.social.yelp}
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-brand-navy hover:text-brand-coral"
              >
                Yelp
              </a>{" "}
              or{" "}
              <a
                href={siteConfig.social.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-brand-navy hover:text-brand-coral"
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
