import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Check, Quote } from "lucide-react";
import type { Metadata } from "next";
import { offers } from "@/content/offers";
import { siteConfig } from "@/lib/site-config";
import { CtaBand } from "@/components/cta-band";

export function generateStaticParams() {
  return offers.map((offer) => ({ slug: offer.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const offer = offers.find((o) => o.slug === slug);
  if (!offer) return {};
  return {
    title: offer.title,
    description: offer.description,
  };
}

export default async function SpecialPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const offer = offers.find((o) => o.slug === slug);
  if (!offer) notFound();

  return (
    <>
      {/* Breadcrumb */}
      <section className="bg-brand-cream border-b border-slate-200">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link
            href="/#specials"
            className="inline-flex items-center text-sm font-medium text-brand-navy hover:text-brand-coral"
          >
            <ArrowLeft className="w-4 h-4 mr-2" /> All specials
          </Link>
        </div>
      </section>

      {/* Hero */}
      <section className="bg-brand-cream pb-16 lg:pb-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-xl order-2 lg:order-1">
              <Image
                src={offer.image}
                alt={offer.imageAlt}
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover"
                priority
              />
            </div>
            <div className="space-y-5 order-1 lg:order-2">
              <p className="text-sm font-bold tracking-widest uppercase text-brand-coral">
                New Patient Special
              </p>
              <div>
                <div className="text-6xl sm:text-7xl font-extrabold text-brand-navy leading-none">
                  {offer.price}
                </div>
                <h1 className="mt-2 text-3xl sm:text-4xl font-bold text-brand-navy">
                  {offer.tagline}
                </h1>
              </div>
              <p className="text-lg text-slate-700 leading-relaxed">{offer.intro}</p>
              <p className="text-xs font-bold tracking-widest uppercase text-slate-500">
                *{offer.finePrint}
              </p>
              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <a
                  href={siteConfig.booking}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-12 items-center justify-center rounded-full bg-brand-coral px-8 text-sm font-bold text-white shadow-md hover:bg-brand-coral-dark"
                >
                  Book Appointment
                </a>
                <a
                  href={`tel:${siteConfig.phone.tel}`}
                  className="inline-flex h-12 items-center justify-center rounded-full border-2 border-brand-navy px-8 text-sm font-semibold text-brand-navy hover:bg-brand-navy hover:text-white"
                >
                  Call {siteConfig.phone.display}
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What's included */}
      {offer.includes && (
        <section className="bg-white py-16 sm:py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
            <div className="text-center mb-10 space-y-2">
              <p className="text-sm font-bold tracking-widest uppercase text-brand-coral">
                What&rsquo;s included
              </p>
              <h2 className="text-3xl sm:text-4xl font-bold text-brand-navy">
                Everything you get with this special.
              </h2>
            </div>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {offer.includes.map((item) => (
                <li
                  key={item.label}
                  className="flex gap-4 rounded-2xl bg-brand-cream p-6"
                >
                  <div className="flex-shrink-0 inline-flex h-9 w-9 items-center justify-center rounded-full bg-brand-navy text-white">
                    <Check className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-brand-navy">{item.label}</h3>
                    <p className="text-sm text-slate-700 leading-relaxed mt-1">
                      {item.description}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {/* Features (cleaning special) */}
      {offer.features && offer.features.length > 0 && (
        <section className="bg-brand-cream py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {offer.features.map((feature) => (
                <div
                  key={feature}
                  className="rounded-2xl bg-white p-6 text-center text-sm font-medium text-brand-navy shadow-sm"
                >
                  {feature}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Testimonial */}
      {offer.testimonial && (
        <section className="bg-white py-16 sm:py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl">
            <figure className="relative rounded-3xl bg-brand-cream p-8 lg:p-12 text-center">
              <Quote
                className="absolute top-6 left-6 h-10 w-10 text-brand-steel-light"
                aria-hidden
              />
              <blockquote className="text-xl lg:text-2xl italic text-slate-700 leading-relaxed relative">
                &ldquo;{offer.testimonial.quote}&rdquo;
              </blockquote>
              <figcaption className="mt-6 text-sm font-bold text-brand-navy">
                — {offer.testimonial.author}
              </figcaption>
            </figure>
          </div>
        </section>
      )}

      {/* Terms */}
      <section className="bg-brand-cream py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl">
          <h2 className="text-2xl font-bold text-brand-navy mb-4">Terms &amp; Details</h2>
          <ul className="space-y-2 text-slate-700 leading-relaxed list-disc pl-5">
            <li>Available to new patients only — one offer per patient.</li>
            <li>Cannot be combined with insurance benefits or other discounts.</li>
            <li>Mention this offer when booking via Modento or by calling our office.</li>
            <li>Offer subject to change without notice.</li>
          </ul>
        </div>
      </section>

      <CtaBand
        heading="Ready to claim this offer?"
        body="Book online any time, or call our friendly front office to schedule."
      />
    </>
  );
}
