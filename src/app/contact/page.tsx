import type { Metadata } from "next";
import { MapPin, Phone, Clock, ExternalLink } from "lucide-react";
import { siteConfig } from "@/lib/site-config";
import { CtaBand } from "@/components/cta-band";

export const metadata: Metadata = {
  title: "Contact Us",
  description: `Visit River Crossing Family Dental at ${siteConfig.address.full}. Call ${siteConfig.phone.display} or book online any time.`,
};

export default function ContactPage() {
  return (
    <>
      <section className="bg-brand-cream py-16 sm:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl text-center space-y-4">
          <p className="text-sm font-bold tracking-widest uppercase text-brand-coral">Contact</p>
          <h1 className="text-4xl sm:text-5xl font-bold text-brand-navy">
            We&rsquo;d love to hear from you.
          </h1>
          <p className="text-lg text-slate-700 max-w-2xl mx-auto leading-relaxed">
            Book online, give us a call, or stop by the office in Riverton. Our front office is
            happy to help with scheduling, insurance questions, or anything else.
          </p>
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-6">
            <div className="rounded-2xl bg-brand-cream p-8 text-center space-y-4">
              <div className="mx-auto inline-flex h-12 w-12 items-center justify-center rounded-full bg-white text-brand-coral">
                <Phone className="h-6 w-6" />
              </div>
              <h2 className="text-xl font-bold text-brand-navy">Call</h2>
              <a
                href={`tel:${siteConfig.phone.tel}`}
                className="block text-2xl font-extrabold text-brand-navy hover:text-brand-coral"
              >
                {siteConfig.phone.display}
              </a>
              <p className="text-sm text-slate-600">Same-day emergency appointments available.</p>
            </div>

            <div className="rounded-2xl bg-brand-cream p-8 text-center space-y-4">
              <div className="mx-auto inline-flex h-12 w-12 items-center justify-center rounded-full bg-white text-brand-coral">
                <ExternalLink className="h-6 w-6" />
              </div>
              <h2 className="text-xl font-bold text-brand-navy">Book Online</h2>
              <p className="text-sm text-slate-600">
                Pick your slot through Modento, anytime — day or night.
              </p>
              <a
                href={siteConfig.booking}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-11 items-center justify-center rounded-full bg-brand-coral px-6 text-sm font-semibold text-white shadow-md hover:bg-brand-coral-dark"
              >
                Book Appointment
              </a>
            </div>

            <div className="rounded-2xl bg-brand-cream p-8 text-center space-y-4">
              <div className="mx-auto inline-flex h-12 w-12 items-center justify-center rounded-full bg-white text-brand-coral">
                <MapPin className="h-6 w-6" />
              </div>
              <h2 className="text-xl font-bold text-brand-navy">Visit</h2>
              <p className="text-base font-semibold text-brand-navy">
                {siteConfig.address.street}
                <br />
                {siteConfig.address.city}, {siteConfig.address.state} {siteConfig.address.zip}
              </p>
              <a
                href={siteConfig.googleMapsDirections}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center text-sm font-semibold text-brand-coral hover:text-brand-coral-dark"
              >
                Get directions
                <ExternalLink className="ml-1 h-3.5 w-3.5" />
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-brand-cream py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-10">
            <div className="space-y-6">
              <div>
                <div className="inline-flex items-center gap-2 text-brand-coral">
                  <Clock className="h-5 w-5" />
                  <p className="text-sm font-bold tracking-widest uppercase">Office Hours</p>
                </div>
                <h2 className="mt-2 text-3xl font-bold text-brand-navy">When we&rsquo;re open.</h2>
              </div>
              <ul className="rounded-2xl bg-white p-6 divide-y divide-slate-100">
                {siteConfig.hours.map((row) => (
                  <li
                    key={row.day}
                    className="flex items-center justify-between py-3 first:pt-0 last:pb-0"
                  >
                    <span className="font-semibold text-brand-navy">{row.day}</span>
                    <span className={row.open ? "text-slate-700" : "text-slate-400"}>
                      {row.display}
                    </span>
                  </li>
                ))}
              </ul>
              <p className="text-sm text-slate-600 leading-relaxed">
                Need to be seen for a dental emergency outside these hours? Call{" "}
                <a
                  href={`tel:${siteConfig.phone.tel}`}
                  className="font-semibold text-brand-navy hover:text-brand-coral"
                >
                  {siteConfig.phone.display}
                </a>{" "}
                — we keep room in the daily schedule for urgent visits.
              </p>
            </div>

            <div className="aspect-square lg:aspect-auto rounded-3xl overflow-hidden border-4 border-white shadow-lg">
              <iframe
                src={siteConfig.googleMapsEmbed}
                width="100%"
                height="100%"
                style={{ border: 0, minHeight: "400px" }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Map to River Crossing Family Dental"
              />
            </div>
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
