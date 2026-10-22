import { PhoneLink, PhoneNumber } from "@/components/call-measurement";
import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { ArrowLeft, ArrowRight, Clock, Eye, Smile } from "lucide-react";
import { siteConfig } from "@/lib/site-config";
import { CtaBand } from "@/components/cta-band";

export const metadata: Metadata = {
  title: "Invisalign Riverton UT",
  description:
    "Invisalign in Riverton, UT for adults and teens. Clear aligners from a certified Invisalign provider, plus a free orthodontic consultation for new patients.",
  alternates: {
    canonical: "/services/orthodontics/invisalign",
  },
};

const benefits = [
  {
    icon: Eye,
    title: "Easy to overlook",
    body: "The aligners are translucent, so they sit close to your teeth instead of showing metal brackets.",
  },
  {
    icon: Smile,
    title: "Smooth and comfortable",
    body: "They are smooth and durable, with no wires. You take them out to eat and to clean your teeth.",
  },
  {
    icon: Clock,
    title: "Worn most of the day",
    body: "Aligners are worn up to 22 hours a day. Each one gradually shifts your teeth toward alignment.",
  },
];

const faqs = [
  {
    question: "What does Invisalign cost, and does insurance help?",
    answer:
      "The orthodontic consultation is complimentary for new patients. Treatment and the aligners themselves are not included in that visit. If treatment is a good fit, we review the plan and the cost with you before you decide. Our office is in-network with most major insurance providers. We do not accept Cigna HMO or Aetna HMO plans. Coverage for aligners depends on your plan, and we will help you understand what it covers before treatment begins.",
  },
  {
    question: "How long does treatment take?",
    answer:
      "Treatment can be as short as six months. Your timeline depends on your bite and on wearing the aligners as directed. We will talk through a personal timeline at your consultation.",
  },
  {
    question: "How do I wear and care for the aligners?",
    answer:
      "Wear them up to 22 hours a day, and take them out only for eating and cleaning. Brush and floss before you put them back in so food is not trapped against your teeth.",
  },
];

const related = [
  {
    href: "/services/orthodontics",
    label: "All orthodontic options",
    body: "Braces, Invisalign, and HealthyStart, side by side.",
  },
  {
    href: "/services/orthodontics/invisalign-teen",
    label: "Invisalign Teen",
    body: "Clear aligners designed around a teenager’s day.",
  },
  {
    href: "/services/orthodontics/invisalign-first",
    label: "Invisalign First",
    body: "Early treatment for children ages 6 through 10.",
  },
];

export default function InvisalignPage() {
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

      <section className="bg-brand-cream py-16 sm:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
            <div className="order-2 space-y-5 lg:order-1">
              <p className="text-sm font-bold tracking-widest uppercase text-brand-coral">
                Invisalign® in Riverton, UT
              </p>
              <h1 className="text-balance text-4xl font-bold leading-tight text-brand-navy sm:text-5xl">
                Clear aligners for adults and teens.
              </h1>
              <p className="text-lg text-slate-700 leading-relaxed">
                Invisalign uses a series of clear aligners to straighten teeth and improve the
                bite. It is a fit for many adults and teens with an underbite, overbite, gaps, or
                crowding. Younger children, ages 6 through 10, are usually better served by{" "}
                <Link
                  href="/services/orthodontics/invisalign-first"
                  className="font-semibold text-brand-navy underline-offset-2 hover:text-brand-coral hover:underline"
                >
                  Invisalign First
                </Link>
                .
              </p>
              <p className="text-base text-slate-700 leading-relaxed">
                Dr. Peterson is a certified Invisalign provider, including Invisalign Teen and
                Invisalign First. Each aligner is worn up to 22 hours a day and gradually shifts
                your teeth. Treatment can be as short as six months.
              </p>
              <div className="flex flex-col gap-3 pt-2 sm:flex-row">
                <a
                  href={siteConfig.booking}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-12 w-full items-center justify-center rounded-full bg-brand-coral px-8 text-sm font-bold text-white shadow-md hover:bg-brand-coral-dark focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-navy sm:w-auto"
                >
                  Book a Free Consultation
                </a>
                <PhoneLink className="inline-flex h-12 w-full items-center justify-center rounded-full border-2 border-brand-navy px-8 text-sm font-semibold text-brand-navy hover:bg-brand-navy hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-navy sm:w-auto">
                  Call <PhoneNumber />
                </PhoneLink>
              </div>
            </div>
            <div className="relative order-1 aspect-[4/3] overflow-hidden rounded-3xl shadow-xl lg:order-2">
              <Image
                src="/images/service/orthodontics.webp"
                alt="Adult patient holding a clear aligner near her mouth and smiling"
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-16 sm:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
          <div className="text-center mb-10 space-y-3">
            <p className="text-sm font-bold tracking-widest uppercase text-brand-coral">
              How it works
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold text-brand-navy">
              A new aligner, a small shift.
            </h2>
            <p className="text-lg text-slate-700 leading-relaxed max-w-3xl mx-auto">
              You wear one set of translucent aligners, then move to the next. They are smooth
              and durable, and you remove them only for eating and cleaning. Over time, the
              series moves your teeth toward a healthier, more even alignment.
            </p>
          </div>
          <div className="grid sm:grid-cols-3 gap-6">
            {benefits.map(({ icon: Icon, title, body }) => (
              <div key={title} className="rounded-2xl bg-brand-cream p-6 text-center space-y-3">
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
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl text-center space-y-4">
          <p className="text-sm font-bold tracking-widest uppercase text-brand-coral">
            Free consultation
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-brand-navy">
            Start with a complimentary visit.
          </h2>
          <p className="text-lg text-slate-700 leading-relaxed">
            New patients can come in for a complimentary orthodontic consultation. We look at
            your smile and bite, talk about your goals, and discuss options, which may include
            braces, Invisalign, or HealthyStart. Treatment and appliances are not included. If
            treatment is recommended, we review the plan and the cost with you.
          </p>
          <Link
            href="/specials/ortho-consult"
            className="inline-flex min-h-11 items-center text-sm font-semibold text-brand-navy hover:text-brand-coral"
          >
            See what the free consult includes
            <ArrowRight className="ml-1 h-4 w-4" />
          </Link>
        </div>
      </section>

      <section className="bg-white py-16 sm:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl">
          <div className="text-center mb-10 space-y-2">
            <p className="text-sm font-bold tracking-widest uppercase text-brand-coral">
              Common questions
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold text-brand-navy">
              Cost, timing, and daily wear.
            </h2>
          </div>
          <div className="divide-y divide-slate-200 border-y border-slate-200">
            {faqs.map((item) => (
              <div key={item.question} className="space-y-2 py-6">
                <h3 className="text-xl font-bold text-brand-navy">{item.question}</h3>
                <p className="max-w-prose text-base leading-relaxed text-slate-700 sm:text-lg">{item.answer}</p>
              </div>
            ))}
          </div>
          <p className="mt-6 text-sm text-slate-600 leading-relaxed">
            Questions about a specific plan? See{" "}
            <Link
              href="/financing-insurance"
              className="font-semibold text-brand-navy underline-offset-2 hover:text-brand-coral hover:underline"
            >
              financing and insurance
            </Link>{" "}
            or call the office and we will help you check.
          </p>
        </div>
      </section>

      <section className="bg-brand-cream py-16 sm:py-20">
        <div className="container mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <h2 className="mb-2 text-2xl font-bold text-brand-navy">Related care</h2>
          <ul className="divide-y divide-slate-200">
            {related.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="flex min-h-12 items-center justify-between gap-4 py-4 text-brand-navy hover:text-brand-coral"
                >
                  <span>
                    <span className="block font-bold">{item.label}</span>
                    <span className="mt-1 block text-sm leading-relaxed text-slate-600">{item.body}</span>
                  </span>
                  <ArrowRight className="h-4 w-4 shrink-0" />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <CtaBand
        heading="Ready to talk about clear aligners?"
        body="Book a complimentary orthodontic consultation, or call and we will find a time that works."
      />
    </>
  );
}
