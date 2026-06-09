import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { Check, FileText, CreditCard, Shield, Sparkles, ArrowRight, ExternalLink } from "lucide-react";
import { siteConfig } from "@/lib/site-config";
import { CtaBand } from "@/components/cta-band";

export const metadata: Metadata = {
  title: "Financing & Insurance",
  description:
    "Affordable dental care in Riverton — in-house membership plan, CareCredit financing, and most major insurance accepted.",
};

const specials = [
  { slug: "cleaning", title: "$89 Cleaning, Exam & X-Rays" },
  { slug: "exam", title: "$49 Emergency Exam & X-Rays" },
  { slug: "ortho-consult", title: "Free Orthodontic Consultation" },
];

const membershipTiers = [
  { label: "Adult", price: "$249", note: "Per adult, per year" },
  { label: "Child", price: "$216", note: "Age 14 and under, per year" },
  {
    label: "Households of 3+",
    price: "Discount",
    note: "Ask our team about multi-member pricing",
  },
];

const acceptedPayment = [
  "Cash",
  "Personal checks",
  "Visa",
  "Mastercard",
  "Discover",
  "American Express",
  "Debit cards",
];

export default function FinancingInsurancePage() {
  return (
    <>
      <section className="bg-brand-cream py-16 sm:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl text-center space-y-5">
          <p className="text-sm font-bold tracking-widest uppercase text-brand-coral">
            Financing &amp; Insurance
          </p>
          <h1 className="text-4xl sm:text-5xl font-bold text-brand-navy">
            Making quality dental care affordable.
          </h1>
          <p className="text-lg text-slate-700 max-w-2xl mx-auto leading-relaxed">
            Cost should never stand between you and the care you need. Whether you have insurance,
            are exploring financing options, or are looking for a great deal on your first visit,
            we have solutions designed to fit your budget and your life.
          </p>
        </div>
      </section>

      <section className="bg-brand-cream pb-16 sm:pb-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
          <div className="relative aspect-[5/2] rounded-3xl overflow-hidden shadow-xl">
            <Image
              src="/images/financing-insurance/family.webp"
              alt="Family of four smiling together at home"
              fill
              sizes="(min-width: 1280px) 1152px, 100vw"
              className="object-cover"
              priority
            />
          </div>
        </div>
      </section>

      {/* New patient specials */}
      <section className="bg-white py-16 sm:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
          <div className="text-center mb-10 space-y-3">
            <div className="inline-flex items-center gap-2 text-brand-coral">
              <Sparkles className="h-5 w-5" />
              <p className="text-sm font-bold tracking-widest uppercase">New Patient Specials</p>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-brand-navy">
              Welcoming you to our dental family.
            </h2>
            <p className="text-slate-600 max-w-2xl mx-auto">
              These specials are our way of removing barriers to care from day one.
            </p>
          </div>
          <div className="grid sm:grid-cols-3 gap-4">
            {specials.map((s) => (
              <Link
                key={s.slug}
                href={`/specials/${s.slug}`}
                className="group flex flex-col rounded-2xl border-2 border-brand-cream p-6 text-center transition-all hover:border-brand-coral hover:bg-brand-cream"
              >
                <p className="text-base font-bold text-brand-navy mb-3">{s.title}</p>
                <span className="mt-auto inline-flex items-center justify-center text-sm font-semibold text-brand-coral group-hover:text-brand-coral-dark">
                  Learn more
                  <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Membership Plan */}
      <section id="membership" className="bg-brand-navy py-16 sm:py-20 text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
          <div className="text-center mb-10 space-y-3">
            <p className="text-sm font-bold tracking-widest uppercase text-brand-coral">
              No Insurance? No Problem.
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold text-white">
              Our in-house membership plan.
            </h2>
            <p className="text-lg text-slate-200 max-w-2xl mx-auto leading-relaxed">
              A simple alternative to traditional insurance — preventive care plus discounts on
              other services, for a predictable annual fee. No waiting periods, no deductibles, no
              claim forms.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-4 mb-10">
            {membershipTiers.map((tier) => (
              <div
                key={tier.label}
                className="rounded-2xl bg-white text-slate-900 p-6 text-center"
              >
                <p className="text-sm font-bold tracking-widest uppercase text-brand-coral mb-2">
                  {tier.label}
                </p>
                <p className="text-4xl font-extrabold text-brand-navy">{tier.price}</p>
                <p className="text-sm text-slate-500 mt-1">{tier.note}</p>
              </div>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href="/membership-brochure.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-white px-8 text-sm font-bold text-brand-navy hover:bg-brand-cream"
            >
              <FileText className="h-4 w-4" />
              Download brochure (PDF)
            </a>
            <a
              href={`tel:${siteConfig.phone.tel}`}
              className="inline-flex h-12 items-center justify-center rounded-full border-2 border-white/40 px-8 text-sm font-semibold text-white hover:bg-white/10"
            >
              Call to enroll
            </a>
          </div>
        </div>
      </section>

      {/* Financing options */}
      <section className="bg-white py-16 sm:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
          <div className="grid lg:grid-cols-2 gap-10">
            <div className="space-y-5">
              <div className="inline-flex items-center gap-2 text-brand-coral">
                <CreditCard className="h-5 w-5" />
                <p className="text-sm font-bold tracking-widest uppercase">Financing Options</p>
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold text-brand-navy">
                Flexible ways to pay.
              </h2>
              <p className="text-slate-700 leading-relaxed">
                We accept payment at the time of service or in accordance with an established
                payment plan. For patients who need help spreading out the cost of treatment, we
                offer financing through CareCredit — interest-free options available for qualified
                applicants.
              </p>
              <p className="text-slate-700 leading-relaxed">
                We also offer in-house financing for qualifying patients. Ask our team about this
                option if you&rsquo;re looking for a straightforward payment arrangement without
                going through a third party.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <a
                  href="https://www.carecredit.com/go/963GZQ/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-11 items-center justify-center gap-2 rounded-full bg-brand-coral px-6 text-sm font-bold text-white hover:bg-brand-coral-dark"
                >
                  Apply with CareCredit
                  <ExternalLink className="h-3.5 w-3.5" />
                </a>
                <a
                  href={`tel:${siteConfig.phone.tel}`}
                  className="inline-flex h-11 items-center justify-center rounded-full border-2 border-brand-navy px-6 text-sm font-semibold text-brand-navy hover:bg-brand-navy hover:text-white"
                >
                  Ask about in-house financing
                </a>
              </div>
            </div>

            <div className="bg-brand-cream rounded-3xl p-8 space-y-4">
              <h3 className="font-bold text-brand-navy">Payment methods accepted</h3>
              <ul className="grid grid-cols-2 gap-2 text-sm">
                {acceptedPayment.map((method) => (
                  <li key={method} className="flex items-center gap-2 text-slate-700">
                    <Check className="h-4 w-4 text-brand-coral flex-shrink-0" />
                    {method}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Dental insurance */}
      <section className="bg-brand-cream py-16 sm:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
          <div className="text-center mb-10 space-y-3">
            <div className="inline-flex items-center gap-2 text-brand-coral">
              <Shield className="h-5 w-5" />
              <p className="text-sm font-bold tracking-widest uppercase">Dental Insurance</p>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-brand-navy">
              In-network with most major providers.
            </h2>
          </div>
          <div className="rounded-3xl bg-white p-8 space-y-4 text-slate-700 leading-relaxed">
            <p>
              Our office is in-network with most major insurance providers and works hard to
              maximize your benefits so you get the most out of your plan. We handle the billing
              process and will help you understand exactly what your insurance covers before
              treatment begins — so there are no surprises.
            </p>
            <p className="rounded-xl bg-brand-cream p-4 border-l-4 border-brand-coral">
              <strong className="text-brand-navy">Please note:</strong> we do not accept Cigna HMO
              or Aetna HMO plans. If you&rsquo;re unsure whether we&rsquo;re in-network with your
              provider, call our office and a team member will verify your coverage.
            </p>
            <p>
              We recommend scheduling your preventive visits before your benefits reset at year
              end. Most plans cover two cleanings and exams annually at little or no cost to you —
              and unused benefits do not roll over.
            </p>
          </div>
        </div>
      </section>

      <CtaBand
        heading="Questions about coverage or cost?"
        body="Our front office is happy to walk you through your options. Call us — we&rsquo;ll find a solution that makes sense for you."
      />
    </>
  );
}
