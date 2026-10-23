import { PhoneLink, PhoneNumber } from "@/components/call-measurement";
import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import {
  ArrowLeft,
  ArrowRight,
  ChevronDown,
  Clock,
  Eye,
  Smile,
} from "lucide-react";
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

const journey = [
  {
    title: "Meet & plan",
    body: "Start with a free consultation. We assess your smile and bite, discuss your goals, and explain the next steps for scans and planning.",
  },
  {
    title: "Your custom aligners",
    body: "A series of aligners guides your teeth. Wear them as directed, removing them for meals and cleaning.",
  },
  {
    title: "Check in with us",
    body: "We follow your progress and discuss any adjustments as you move through treatment.",
  },
  {
    title: "Keep your smile",
    body: "After treatment, retainers help maintain your new alignment. We explain your ongoing care.",
  },
];

const audiences = [
  {
    title: "Adults",
    body: "Clear aligners that fit around work, meals, and everyday life.",
    href: "#consultation",
    label: "Explore your options",
  },
  {
    title: "Teens",
    body: "Invisalign Teen, with care that fits a busy school-year schedule.",
    href: "/services/orthodontics/invisalign-teen",
    label: "About Invisalign Teen",
  },
  {
    title: "Kids ages 6–10",
    body: "Invisalign First for developing smiles. A consultation helps determine the right timing.",
    href: "/services/orthodontics/invisalign-first",
    label: "About Invisalign First",
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

      <section className="bg-brand-cream py-8 sm:py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
            <div className="space-y-5">
              <p className="text-sm font-bold tracking-widest uppercase text-brand-coral">
                Invisalign® in Riverton, UT
              </p>
              <h1 className="text-balance text-4xl font-bold leading-tight text-brand-navy sm:text-5xl">
                Invisalign®
              </h1>
              <p className="text-lg text-slate-700 leading-relaxed">
                A clearer path to a smile that feels like you. Explore
                removable, custom-made aligners for your smile and bite with our
                Riverton team.
              </p>
              <div className="flex items-center gap-4 border-y border-brand-steel-light py-4">
                <p className="text-4xl font-extrabold text-brand-navy">Free</p>
                <div>
                  <p className="font-bold text-brand-navy">
                    Orthodontic consultation
                  </p>
                  <p className="mt-1 text-sm text-slate-600">
                    New patients · Treatment and appliances separate
                  </p>
                </div>
              </div>
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
            <div className="relative aspect-[4/3] overflow-hidden rounded-lg">
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
              Clear aligners. Everyday flexibility.
            </h2>
            <p className="text-lg text-slate-700 leading-relaxed max-w-3xl mx-auto">
              You wear one set of aligners, then move to the next. Each set
              gradually shifts your teeth toward the alignment in your treatment
              plan.
            </p>
          </div>
          <div className="grid sm:grid-cols-3 gap-6">
            {benefits.map(({ icon: Icon, title, body }) => (
              <div
                key={title}
                className="border-t border-brand-steel-light py-5 space-y-3"
              >
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-lg bg-brand-cream text-brand-navy">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="font-bold text-brand-navy">{title}</h3>
                <p className="text-sm text-slate-700 leading-relaxed">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-brand-cream py-12 sm:py-16">
        <div className="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <p className="text-sm font-bold uppercase text-brand-coral">
            How Invisalign works
          </p>
          <h2 className="mt-3 text-3xl font-bold text-brand-navy sm:text-4xl">
            A plan for your smile, at every stage.
          </h2>
          <ol className="mt-9 grid gap-7 sm:grid-cols-2 lg:grid-cols-4">
            {journey.map((step, i) => (
              <li
                key={step.title}
                className="border-t border-brand-steel-light pt-4"
              >
                <p className="text-sm font-bold text-brand-coral">
                  Step {i + 1}
                </p>
                <h3 className="mt-3 text-xl font-bold text-brand-navy">
                  {step.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-slate-700">
                  {step.body}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="bg-white py-12 sm:py-16">
        <div className="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <p className="text-sm font-bold uppercase text-brand-coral">
            Who it is for
          </p>
          <h2 className="mt-3 text-3xl font-bold text-brand-navy sm:text-4xl">
            Different ages. Individual care.
          </h2>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {audiences.map((item) => (
              <Link
                key={item.title}
                href={item.href}
                className="group flex flex-col rounded-lg border border-slate-200 p-6 transition-colors hover:border-brand-coral"
              >
                <h3 className="text-xl font-bold text-brand-navy">
                  {item.title}
                </h3>
                <p className="mb-5 mt-3 flex-1 text-sm leading-relaxed text-slate-600">
                  {item.body}
                </p>
                <span className="inline-flex items-center gap-2 text-sm font-semibold text-brand-navy">
                  {item.label}
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </span>
              </Link>
            ))}
          </div>
          <div className="mt-12 grid gap-6 border-t border-slate-200 pt-8 lg:grid-cols-[1fr_1.3fr]">
            <div>
              <h2 className="text-2xl font-bold text-brand-navy">
                Invisalign or braces?
              </h2>
              <p className="mt-3 max-w-sm text-sm leading-relaxed text-slate-600">
                The best choice depends on your bite and goals. We will discuss
                both at your consultation.
              </p>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <caption className="sr-only">
                  Compare clear aligners and traditional braces
                </caption>
                <thead>
                  <tr className="border-b border-slate-200 text-brand-navy">
                    <th className="py-3 pr-3" scope="col">
                      Daily life
                    </th>
                    <th className="py-3 pr-3" scope="col">
                      Invisalign
                    </th>
                    <th className="py-3" scope="col">
                      Braces
                    </th>
                  </tr>
                </thead>
                <tbody className="text-slate-700">
                  {[
                    ["Appearance", "Clear aligners", "Visible brackets"],
                    ["Meals", "Remove to eat", "Food restrictions"],
                    [
                      "Cleaning",
                      "Remove to brush & floss",
                      "Clean around brackets",
                    ],
                    ["Wear", "Daily wear as directed", "Fixed in place"],
                  ].map((row) => (
                    <tr key={row[0]} className="border-b border-slate-200">
                      <th scope="row" className="py-4 pr-3 font-medium">
                        {row[0]}
                      </th>
                      <td className="py-4 pr-3">{row[1]}</td>
                      <td className="py-4">{row[2]}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      <section
        id="consultation"
        className="scroll-mt-24 bg-brand-cream py-12 sm:py-16"
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl text-center space-y-4">
          <p className="text-sm font-bold tracking-widest uppercase text-brand-coral">
            Cost & financing
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-brand-navy">
            Start with answers. Then decide.
          </h2>
          <p className="text-lg text-slate-700 leading-relaxed">
            New patients can come in for a complimentary orthodontic
            consultation. We look at your smile and bite, talk about your goals,
            and discuss options, which may include braces, Invisalign, or
            HealthyStart. Treatment and appliances are not included. If
            treatment is recommended, we review the plan and the cost with you.
          </p>
          <p className="text-base leading-relaxed text-slate-700">
            Your treatment cost depends on your individual plan. Ask about
            insurance benefits and available financing at your consultation.
          </p>
          <div className="flex flex-col justify-center gap-3 pt-2 sm:flex-row">
            <a
              href={siteConfig.booking}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-12 items-center justify-center rounded-full bg-brand-coral px-7 text-sm font-bold text-white hover:bg-brand-coral-dark"
            >
              Book a Free Consultation
            </a>
            <PhoneLink className="inline-flex h-12 items-center justify-center rounded-full border-2 border-brand-navy px-7 text-sm font-semibold text-brand-navy hover:bg-brand-navy hover:text-white">
              Call <PhoneNumber />
            </PhoneLink>
          </div>
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
              <details key={item.question} className="group py-5">
                <summary className="flex min-h-11 cursor-pointer list-none items-center justify-between gap-4 text-lg font-bold text-brand-navy [&::-webkit-details-marker]:hidden">
                  {item.question}
                  <ChevronDown
                    className="h-5 w-5 shrink-0 transition-transform group-open:rotate-180"
                    aria-hidden="true"
                  />
                </summary>
                <p className="max-w-prose pt-3 text-base leading-relaxed text-slate-700">
                  {item.answer}
                </p>
              </details>
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
          <h2 className="mb-2 text-2xl font-bold text-brand-navy">
            Related care
          </h2>
          <ul className="divide-y divide-slate-200">
            {related.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="flex min-h-12 items-center justify-between gap-4 py-4 text-brand-navy hover:text-brand-coral"
                >
                  <span>
                    <span className="block font-bold">{item.label}</span>
                    <span className="mt-1 block text-sm leading-relaxed text-slate-600">
                      {item.body}
                    </span>
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
