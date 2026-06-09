import Image from "next/image";
import Link from "next/link";
import {
  Shield,
  Sparkles,
  HeartHandshake,
  Star,
  ArrowRight,
  MapPin,
  Phone,
  Clock,
  Smile,
  PlusCircle,
  Ambulance,
  LucideIcon,
} from "lucide-react";
import { services } from "@/content/services";
import { offers } from "@/content/offers";
import { siteConfig } from "@/lib/site-config";
import { CtaBand } from "@/components/cta-band";

const SERVICE_ICONS: Record<string, LucideIcon> = {
  shield: Shield,
  smile: Smile,
  dentures: PlusCircle,
  sparkles: Sparkles,
  ambulance: Ambulance,
};

const testimonials = [
  {
    quote:
      "Came in as a new patient and the doctor was very helpful. What really did it for me was after I had a temporary crown put in, my tooth was very sensitive. I didn't call as I was waiting for my appointment, but the doctor reached out and asked if everything was ok. He got me the next day to fix my temporary crown. Very satisfied with the amount of service the whole office provides.",
    author: "Lanoy T.",
    source: "Google",
  },
  {
    quote:
      "Super nice office, excellent dentist, amazing team, and overall a wonderful experience. Definitely 5-star worthy.",
    author: "Griffin G.",
    source: "Yelp",
  },
  {
    quote:
      "First of all, I have to say that I hate going to the dentist. So for me to give them a 5-star rating says a lot. I've been a regular patient for a few years now and I can honestly say that I enjoy the team and they put me at ease when I go in.",
    author: "Nycole R.",
    source: "Yelp",
  },
  {
    quote:
      "I had my first appointment today and the hygienist and dentist were very knowledgeable, patient, and absolutely nice! I highly recommend this office, and also the team up front are great! Thanks so much!",
    author: "Brittany G.",
    source: "Google",
  },
];

export default function Home() {
  return (
    <>
      {/* HERO */}
      <section className="relative w-full overflow-hidden bg-brand-navy-dark min-h-[85vh] flex items-center">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover z-0 opacity-50"
        >
          <source src="/hero.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-brand-navy-dark/70 via-brand-navy-dark/50 to-brand-navy-dark/85 z-10" />

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-20 text-center text-white py-24 sm:py-32">
          <div className="mx-auto max-w-4xl space-y-6 animate-in fade-in slide-in-from-bottom-8">
            <p className="text-sm sm:text-base font-bold tracking-widest uppercase text-brand-steel-light">
              Riverton, Utah
            </p>
            <h1 className="text-4xl font-extrabold tracking-tight sm:text-6xl text-white drop-shadow-lg">
              Welcome to River Crossing
              <span className="block text-brand-steel-light">Family Dental &amp; Orthodontics</span>
            </h1>
            <p className="text-lg sm:text-xl text-slate-100 leading-relaxed max-w-2xl mx-auto drop-shadow">
              {siteConfig.tagline}.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4">
              <a
                href={siteConfig.booking}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex h-12 items-center justify-center rounded-full bg-brand-coral px-10 text-base font-bold text-white shadow-xl shadow-black/30 transition-transform hover:scale-[1.02]"
              >
                Book Appointment
              </a>
              <a
                href={`tel:${siteConfig.phone.tel}`}
                className="w-full sm:w-auto inline-flex h-12 items-center justify-center gap-2 rounded-full border-2 border-white/40 bg-white/10 px-10 text-base font-semibold text-white backdrop-blur-sm transition-colors hover:bg-white/20"
              >
                <Phone className="h-4 w-4" />
                {siteConfig.phone.display}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* WELCOME INTRO */}
      <section className="bg-brand-cream py-16 sm:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl text-center space-y-5">
          <h2 className="text-3xl sm:text-4xl font-bold text-brand-navy">
            Your Riverton dentist — for every age, every smile.
          </h2>
          <p className="text-lg text-slate-700 leading-relaxed">
            River Crossing Family Dental is dedicated to both excellent dental care and patient
            satisfaction. Our team is highly skilled across a wide range of specialties, allowing
            us to meet the needs of every member of your family — adults and children alike — so
            Riverton smiles stay healthy for a lifetime.
          </p>
        </div>
      </section>

      {/* WHY US — 3 CARD ROW */}
      <section className="bg-white py-16 sm:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-10">
            {[
              {
                icon: HeartHandshake,
                title: "True Family Practice",
                body: "We serve patients of all ages, providing every smile with the care and maintenance it needs to stay healthy and strong.",
              },
              {
                icon: Sparkles,
                title: "Advanced Technology",
                body: "Our practice is equipped with the latest dental technology, making your experience comfortable and your care precise.",
              },
              {
                icon: Smile,
                title: "Patient Involvement",
                body: "We involve patients in every service and treatment, building understanding and confidence about your oral wellness.",
              },
            ].map(({ icon: Icon, title, body }) => (
              <div
                key={title}
                className="rounded-2xl border border-slate-100 bg-white p-8 text-center shadow-sm transition-shadow hover:shadow-lg"
              >
                <div className="mx-auto mb-5 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-cream text-brand-navy">
                  <Icon className="h-7 w-7" />
                </div>
                <h3 className="text-xl font-bold text-brand-navy mb-2">{title}</h3>
                <p className="text-slate-600 leading-relaxed">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SERVICE HIGHLIGHTS */}
      <section id="services" className="bg-brand-cream py-16 sm:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
            <p className="text-sm font-bold tracking-widest uppercase text-brand-coral">
              What we do
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold text-brand-navy">
              Comprehensive dental care under one roof.
            </h2>
            <p className="text-lg text-slate-600">
              From routine cleanings to orthodontics and dental implants, our team offers a wide
              range of services so your whole family can be cared for in one place.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service) => {
              const Icon = SERVICE_ICONS[service.icon] ?? PlusCircle;
              return (
                <Link
                  key={service.slug}
                  href={`/services/${service.slug}`}
                  className="group relative flex flex-col rounded-2xl bg-white p-8 shadow-sm transition-all hover:shadow-xl hover:-translate-y-1"
                >
                  <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-brand-cream text-brand-navy transition-colors group-hover:bg-brand-navy group-hover:text-white">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="text-xl font-bold text-brand-navy mb-3">{service.title}</h3>
                  <p className="text-slate-600 leading-relaxed mb-6">{service.description}</p>
                  <span className="mt-auto inline-flex items-center text-sm font-semibold text-brand-coral group-hover:text-brand-coral-dark">
                    Learn more
                    <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* SPECIALS */}
      <section id="specials" className="bg-white py-16 sm:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
            <p className="text-sm font-bold tracking-widest uppercase text-brand-coral">
              New patient specials
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold text-brand-navy">
              Quality dental care, accessible price.
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {offers.map((offer) => (
              <Link
                key={offer.slug}
                href={`/specials/${offer.slug}`}
                className="group flex flex-col overflow-hidden rounded-2xl bg-brand-cream shadow-sm transition-all hover:shadow-xl hover:-translate-y-1"
              >
                <div className="relative aspect-[5/3] overflow-hidden bg-brand-steel-light">
                  <Image
                    src={offer.image}
                    alt={offer.imageAlt}
                    fill
                    sizes="(min-width: 768px) 33vw, 100vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="flex flex-col flex-1 p-6 space-y-3">
                  <div className="text-4xl font-extrabold text-brand-navy leading-none">
                    {offer.price}
                  </div>
                  <h3 className="text-lg font-bold text-brand-navy">{offer.tagline}</h3>
                  <p className="text-sm text-slate-600 leading-relaxed">{offer.description}</p>
                  <p className="text-xs font-bold tracking-widest uppercase text-slate-500">
                    *{offer.finePrint}
                  </p>
                  <span className="mt-auto inline-flex items-center pt-2 text-sm font-semibold text-brand-coral group-hover:text-brand-coral-dark">
                    Learn more
                    <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="bg-brand-cream py-16 sm:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between mb-10 gap-4">
            <div>
              <p className="text-sm font-bold tracking-widest uppercase text-brand-coral">
                Testimonials
              </p>
              <h2 className="text-3xl sm:text-4xl font-bold text-brand-navy mt-2">
                What our patients are saying.
              </h2>
            </div>
            <Link
              href="/reviews"
              className="inline-flex items-center text-sm font-semibold text-brand-navy hover:text-brand-coral"
            >
              Read all reviews
              <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {testimonials.map((t) => (
              <figure
                key={t.author}
                className="flex flex-col gap-4 rounded-2xl bg-white p-8 shadow-sm"
              >
                <div className="flex gap-1 text-amber-400" aria-label="5 out of 5 stars">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-current" />
                  ))}
                </div>
                <blockquote className="text-slate-700 leading-relaxed italic">
                  &ldquo;{t.quote}&rdquo;
                </blockquote>
                <figcaption className="mt-auto flex items-center justify-between pt-2 text-sm">
                  <span className="font-bold text-brand-navy">— {t.author}</span>
                  <span className="text-xs uppercase tracking-wider text-slate-500">{t.source}</span>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* LOCATION / MAP */}
      <section id="location" className="bg-white py-16 sm:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-10 items-stretch">
            <div className="flex flex-col justify-center space-y-6">
              <p className="text-sm font-bold tracking-widest uppercase text-brand-coral">
                Visit us
              </p>
              <h2 className="text-3xl sm:text-4xl font-bold text-brand-navy">
                We&rsquo;re right here in Riverton.
              </h2>
              <ul className="space-y-4">
                <li className="flex gap-3">
                  <MapPin className="h-5 w-5 mt-1 flex-shrink-0 text-brand-coral" />
                  <div>
                    <p className="font-semibold text-brand-navy">{siteConfig.address.street}</p>
                    <p className="text-slate-600">
                      {siteConfig.address.city}, {siteConfig.address.state}{" "}
                      {siteConfig.address.zip}
                    </p>
                  </div>
                </li>
                <li className="flex gap-3">
                  <Phone className="h-5 w-5 mt-1 flex-shrink-0 text-brand-coral" />
                  <div>
                    <a
                      href={`tel:${siteConfig.phone.tel}`}
                      className="font-semibold text-brand-navy hover:text-brand-coral"
                    >
                      {siteConfig.phone.display}
                    </a>
                    <p className="text-sm text-slate-500">
                      Call for same-day emergency appointments.
                    </p>
                  </div>
                </li>
                <li className="flex gap-3">
                  <Clock className="h-5 w-5 mt-1 flex-shrink-0 text-brand-coral" />
                  <div className="text-sm text-slate-600 space-y-1">
                    <p>
                      <span className="font-semibold text-brand-navy">Mon</span>{" "}
                      8:00 AM – 5:00 PM ·{" "}
                      <span className="font-semibold text-brand-navy">Tue</span> 8–4
                    </p>
                    <p>
                      <span className="font-semibold text-brand-navy">Wed</span> 7–5 ·{" "}
                      <span className="font-semibold text-brand-navy">Thu</span> 8–4
                    </p>
                    <p>
                      <span className="font-semibold text-brand-navy">Fri/Sat/Sun</span> Closed
                    </p>
                  </div>
                </li>
              </ul>
              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <a
                  href={siteConfig.googleMapsDirections}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-12 items-center justify-center rounded-full bg-brand-navy px-6 text-sm font-semibold text-white hover:bg-brand-navy-dark"
                >
                  Get Directions
                </a>
                <Link
                  href="/contact"
                  className="inline-flex h-12 items-center justify-center rounded-full border-2 border-brand-navy px-6 text-sm font-semibold text-brand-navy hover:bg-brand-navy hover:text-white"
                >
                  More contact info
                </Link>
              </div>
            </div>
            <div className="aspect-square lg:aspect-auto rounded-3xl overflow-hidden border-4 border-brand-cream shadow-lg">
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

      <CtaBand
        heading="Ready for a better dental experience?"
        body="Book online any time, or call our friendly front office to schedule your visit."
      />
    </>
  );
}
