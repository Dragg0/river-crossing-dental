import { PhoneLink, PhoneNumber } from "@/components/call-measurement";
import { CtaBand } from "@/components/cta-band";
import {
  visitHours,
  type LocationPage,
  type RichPart,
} from "@/content/locations";
import { siteConfig } from "@/lib/site-config";
import { ArrowRight, ChevronDown, Clock, ExternalLink, MapPin, Phone } from "lucide-react";
import Link from "next/link";

const textLinkClass =
  "font-semibold text-brand-navy underline decoration-brand-steel-light underline-offset-2 hover:text-brand-coral hover:decoration-brand-coral focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-navy";

function RichText({ parts }: { parts: RichPart[] }) {
  return (
    <>
      {parts.map((part, index) => {
        if (typeof part === "string") {
          return <span key={index}>{part}</span>;
        }
        if (part.type === "phone") {
          return (
            <PhoneLink key={index} className={textLinkClass}>
              <PhoneNumber />
            </PhoneLink>
          );
        }
        const external = part.href.startsWith("http");
        if (external) {
          return (
            <a
              key={index}
              href={part.href}
              target="_blank"
              rel="noopener noreferrer"
              className={textLinkClass}
            >
              {part.label}
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
          );
        }
        return (
          <Link key={index} href={part.href} className={textLinkClass}>
            {part.label}
          </Link>
        );
      })}
    </>
  );
}

function locationJsonLd(location: LocationPage) {
  return {
    "@context": "https://schema.org",
    "@type": "Dentist",
    name: siteConfig.name,
    image: `${siteConfig.url}/images/brand/logo-square.png`,
    url: `${siteConfig.url}/locations/${location.slug}`,
    telephone: siteConfig.phone.display,
    priceRange: "$$",
    address: {
      "@type": "PostalAddress",
      streetAddress: siteConfig.address.street,
      addressLocality: siteConfig.address.city,
      addressRegion: siteConfig.address.state,
      postalCode: siteConfig.address.zip,
      addressCountry: "US",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: siteConfig.geo.latitude,
      longitude: siteConfig.geo.longitude,
    },
    areaServed: [
      { "@type": "City", name: location.town, addressRegion: "UT" },
      {
        "@type": "City",
        name: siteConfig.address.city,
        addressRegion: siteConfig.address.state,
      },
    ],
    openingHoursSpecification: visitHours.flatMap((day) =>
      day.shifts.map((shift) => ({
        "@type": "OpeningHoursSpecification",
        dayOfWeek: day.day,
        opens: shift.open,
        closes: shift.close,
      })),
    ),
    sameAs: [
      siteConfig.social.facebook,
      siteConfig.social.instagram,
      siteConfig.social.youtube,
      siteConfig.social.yelp,
    ],
  };
}

export function LocationLanding({ location }: { location: LocationPage }) {
  const [lead, ...rest] = location.paragraphs;
  const jsonLd = locationJsonLd(location);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />

      <section className="bg-brand-cream py-16 sm:py-20">
        <div className="container mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 space-y-6">
          <p className="text-sm font-bold tracking-widest uppercase text-brand-coral">
            {location.town}, UT
          </p>
          <h1 className="text-balance text-4xl font-bold leading-tight text-brand-navy sm:text-5xl">
            {location.h1}
          </h1>
          {lead ? (
            <p className="text-lg leading-relaxed text-slate-700">
              <RichText parts={lead} />
            </p>
          ) : null}
          <div className="flex flex-col gap-3 pt-1 sm:flex-row">
            <PhoneLink className="inline-flex h-12 items-center justify-center gap-2 rounded-full border-2 border-brand-navy px-8 text-sm font-semibold text-brand-navy hover:bg-brand-navy hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-navy">
              <Phone className="h-4 w-4" aria-hidden="true" />
              Call <PhoneNumber />
            </PhoneLink>
            <a
              href={siteConfig.booking}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-12 items-center justify-center rounded-full bg-brand-coral px-8 text-sm font-bold text-white shadow-md hover:bg-brand-coral-dark focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-navy"
            >
              Book Online
            </a>
          </div>
          <div className="flex flex-wrap gap-x-5 gap-y-2 text-sm">
            <Link href="/contact" className={textLinkClass}>
              Contact & map
            </Link>
            <Link href="/services/emergency-dentistry" className={textLinkClass}>
              Emergency dentistry
            </Link>
          </div>
        </div>
      </section>

      {rest.length > 0 ? (
        <section className="bg-white py-16 sm:py-20">
          <div className="container mx-auto max-w-3xl space-y-5 px-4 text-base leading-relaxed text-slate-700 sm:px-6 lg:px-8">
            {rest.map((paragraph, index) => (
              <p key={index}>
                <RichText parts={paragraph} />
              </p>
            ))}
          </div>
        </section>
      ) : null}

      <section className="bg-brand-cream py-16 sm:py-20">
        <div className="container mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <h2 className="mb-6 text-2xl font-bold text-brand-navy sm:text-3xl">
            Services we offer
          </h2>
          <ul className="divide-y divide-slate-200 border-y border-slate-200">
            {location.services.map((service) => (
              <li key={service.href}>
                <Link
                  href={service.href}
                  className="flex min-h-12 items-center justify-between gap-4 py-4 text-brand-navy hover:text-brand-coral focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-navy"
                >
                  <span>
                    <span className="block font-bold">{service.label}</span>
                    {service.detail ? (
                      <span className="mt-1 block text-sm leading-relaxed text-slate-600">
                        {service.detail}
                      </span>
                    ) : null}
                  </span>
                  <ArrowRight className="h-4 w-4 shrink-0" aria-hidden="true" />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="bg-white py-16 sm:py-20">
        <div className="container mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="mb-10 space-y-2 text-center">
            <p className="text-sm font-bold tracking-widest uppercase text-brand-coral">
              New patients
            </p>
            <h2 className="text-3xl font-bold text-brand-navy sm:text-4xl">
              New-patient offers
            </h2>
          </div>
          <ul className="grid grid-cols-1 gap-5 md:grid-cols-3">
            {location.offers.map((offer) => (
              <li key={offer.href} className="flex">
                <Link
                  href={offer.href}
                  className="flex flex-1 flex-col rounded-2xl bg-brand-cream p-6 text-brand-navy hover:text-brand-coral focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-navy"
                >
                  <h3 className="text-lg font-bold">{offer.title}</h3>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-slate-700">
                    {offer.detail}
                  </p>
                  <span className="mt-4 inline-flex min-h-11 items-center text-sm font-semibold">
                    See this special
                    <ArrowRight className="ml-1 h-4 w-4" aria-hidden="true" />
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="bg-brand-cream py-16 sm:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-2">
            <div className="space-y-6">
              <div>
                <div className="inline-flex items-center gap-2 text-brand-coral">
                  <Clock className="h-5 w-5" aria-hidden="true" />
                  <p className="text-sm font-bold tracking-widest uppercase">
                    Hours & visit info
                  </p>
                </div>
                <h2 className="mt-2 text-3xl font-bold text-brand-navy">
                  The Riverton office.
                </h2>
              </div>
              <ul className="divide-y divide-slate-100 rounded-2xl bg-white p-6">
                {visitHours.map((row) => (
                  <li
                    key={row.day}
                    className="flex flex-col gap-1 py-3 first:pt-0 last:pb-0 sm:flex-row sm:items-center sm:justify-between"
                  >
                    <span className="font-semibold text-brand-navy">{row.day}</span>
                    <span
                      className={
                        row.shifts.length > 0
                          ? "text-slate-700 sm:text-right"
                          : "text-slate-400 sm:text-right"
                      }
                    >
                      {row.display}
                    </span>
                  </li>
                ))}
              </ul>
              <div className="space-y-3 text-base text-slate-700">
                <p className="flex gap-2">
                  <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-brand-coral" aria-hidden="true" />
                  <a
                    href={siteConfig.googleMapsDirections}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={textLinkClass}
                  >
                    {siteConfig.address.street}
                    <br />
                    {siteConfig.address.city}, {siteConfig.address.state}{" "}
                    {siteConfig.address.zip}
                    <span className="sr-only"> (opens in a new tab)</span>
                  </a>
                </p>
                <p className="flex items-center gap-2">
                  <Phone className="h-5 w-5 shrink-0 text-brand-coral" aria-hidden="true" />
                  <PhoneLink className={textLinkClass}>
                    <PhoneNumber />
                  </PhoneLink>
                </p>
                <a
                  href={siteConfig.googleMapsDirections}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-sm font-semibold text-brand-coral hover:text-brand-coral-dark focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-navy"
                >
                  Get directions
                  <ExternalLink className="ml-1 h-3.5 w-3.5" aria-hidden="true" />
                  <span className="sr-only"> (opens in a new tab)</span>
                </a>
              </div>
              <p className="text-sm leading-relaxed text-slate-600">
                Calling after hours? Eve can help new patients schedule.
                Appointments take place Monday–Thursday.
              </p>
            </div>

            <div className="aspect-square overflow-hidden rounded-3xl border-4 border-white shadow-lg lg:aspect-auto">
              <iframe
                src={siteConfig.googleMapsEmbed}
                width="100%"
                height="100%"
                style={{ border: 0, minHeight: "400px" }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Map to River Crossing Family Dental in Riverton"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-16 sm:py-20">
        <div className="container mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <div className="mb-10 space-y-2 text-center">
            <p className="text-sm font-bold tracking-widest uppercase text-brand-coral">
              Common questions
            </p>
            <h2 className="text-3xl font-bold text-brand-navy sm:text-4xl">
              Visiting from {location.town}.
            </h2>
          </div>
          <div className="divide-y divide-slate-200 border-y border-slate-200">
            {location.faqs.map((item) => (
              <details key={item.question} className="group py-5">
                <summary className="flex min-h-11 cursor-pointer list-none items-center justify-between gap-4 text-lg font-bold text-brand-navy focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-navy [&::-webkit-details-marker]:hidden">
                  {item.question}
                  <ChevronDown
                    className="h-5 w-5 shrink-0 transition-transform group-open:rotate-180"
                    aria-hidden="true"
                  />
                </summary>
                <p className="max-w-prose pt-3 text-base leading-relaxed text-slate-700">
                  <RichText parts={item.answer} />
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <CtaBand
        bookLabel="Book Online"
        heading="Ready to schedule your visit?"
        body="Eve can help new patients schedule after hours. Appointments are Monday through Thursday."
      />
    </>
  );
}
