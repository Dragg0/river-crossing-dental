import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { ArrowLeft, Check, Clock, Droplets, Smile, Sparkles } from "lucide-react";
import { siteConfig } from "@/lib/site-config";
import { CtaBand } from "@/components/cta-band";

export const metadata: Metadata = {
  title: "Icon White Spot Treatment",
  description:
    "Erase white spots on your teeth without drilling, numbing, or veneers. Icon resin infiltration treats decalcification from braces, fluorosis, or early decay in a single visit.",
};

const causes = [
  {
    label: "Decalcification after braces",
    description:
      "By far the most common reason patients come in for Icon — white squares left behind where brackets used to sit, when oral hygiene during ortho wasn't perfect.",
  },
  {
    label: "Fluorosis",
    description:
      "White streaks or spots that develop in childhood when teeth get more fluoride than they need while still forming under the gum.",
  },
  {
    label: "Early demineralization",
    description:
      "The first stage of a cavity — chalky white spots where enamel has started to soften. Treating with Icon can halt the process before drilling is needed.",
  },
  {
    label: "Trauma or enamel thinning",
    description:
      "Less commonly, white marks can result from a minor injury during tooth development or from worn-down enamel.",
  },
];

const benefits = [
  {
    icon: Droplets,
    title: "No drilling",
    body: "Icon resin penetrates the enamel through micro-pores — no shots, no needles, no tooth structure removed.",
  },
  {
    icon: Clock,
    title: "One visit",
    body: "Most cases finish in about an hour. You walk in with the spots, walk out without them.",
  },
  {
    icon: Smile,
    title: "Permanent result",
    body: "Once the resin infiltrates the enamel, it's there for good. No bleaching trays, no nightly maintenance.",
  },
  {
    icon: Sparkles,
    title: "Conservative",
    body: "Saves your healthy enamel for the future. If you ever want bonding or veneers later, Icon doesn't get in the way.",
  },
];

const compareRows = [
  {
    feature: "Treats spots specifically",
    icon: "Yes — designed exactly for this",
    whitening: "No — bleaches all teeth equally",
    bonding: "Yes, but covers, doesn't dissolve",
    veneers: "Yes, but covers the whole tooth",
  },
  {
    feature: "Drilling required",
    icon: "None",
    whitening: "None",
    bonding: "Minimal",
    veneers: "Minor — enamel must be prepped",
  },
  {
    feature: "Visit time",
    icon: "~1 hour, single visit",
    whitening: "45 min in-office or 2 weeks at home",
    bonding: "30 min to 1 hour per tooth",
    veneers: "2 visits, 2–3 weeks apart",
  },
  {
    feature: "Maintenance",
    icon: "None",
    whitening: "Touch-ups every 6–12 months",
    bonding: "Replace every 5–7 years",
    veneers: "Replace every 10–15 years",
  },
  {
    feature: "Best for",
    icon: "Post-braces decalc, fluorosis, early decay",
    whitening: "Overall yellowing or dullness",
    bonding: "Small chips + spots together",
    veneers: "Multiple cosmetic concerns at once",
  },
];

export default function IconWhiteSpotTreatmentPage() {
  return (
    <>
      <section className="bg-brand-cream border-b border-slate-200">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link
            href="/services/cosmetic-dentistry"
            className="inline-flex items-center text-sm font-medium text-brand-navy hover:text-brand-coral"
          >
            <ArrowLeft className="w-4 h-4 mr-2" /> Back to Cosmetic Dentistry
          </Link>
        </div>
      </section>

      <section className="bg-brand-cream py-12 sm:py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-5 gap-10 lg:gap-14 items-center">
            <div className="lg:col-span-3 space-y-5">
              <p className="text-sm font-bold tracking-widest uppercase text-brand-coral">
                Cosmetic Dentistry · Icon®
              </p>
              <h1 className="text-4xl sm:text-5xl font-bold text-brand-navy leading-tight">
                Erase white spots — no drilling, no numbing, in a single visit.
              </h1>
              <p className="text-lg text-slate-700 leading-relaxed">
                If you finished braces with chalky white squares where the brackets used to sit,
                you&rsquo;re not stuck with them. Icon® is a resin-infiltration treatment that
                fills the damaged pores in your enamel from the inside, blending the discoloration
                back into your natural tooth color. No shots. No drill. No tooth structure lost.
              </p>
              <p className="text-base text-slate-700 leading-relaxed">
                Dr. Peterson treats Icon cases regularly at River Crossing Family Dental — most
                often for patients who&rsquo;ve recently finished orthodontic treatment, or who
                have fluorosis they&rsquo;ve been self-conscious about for years.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <a
                  href={siteConfig.booking}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-12 items-center justify-center rounded-full bg-brand-coral px-8 text-sm font-bold text-white shadow-md hover:bg-brand-coral-dark"
                >
                  Book a Consultation
                </a>
                <a
                  href={`tel:${siteConfig.phone.tel}`}
                  className="inline-flex h-12 items-center justify-center rounded-full border-2 border-brand-navy px-8 text-sm font-semibold text-brand-navy hover:bg-brand-navy hover:text-white"
                >
                  Call {siteConfig.phone.display}
                </a>
              </div>
            </div>
            <div className="lg:col-span-2 relative aspect-[4/3] rounded-3xl overflow-hidden shadow-xl">
              <Image
                src="/images/blog/invisalign-decalcification.jpg"
                alt="Before-and-after example showing decalcified white spots on teeth, the kind Icon treats"
                fill
                sizes="(min-width: 1024px) 40vw, 100vw"
                className="object-cover"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-16 sm:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
          <div className="text-center mb-10 space-y-2">
            <p className="text-sm font-bold tracking-widest uppercase text-brand-coral">
              Why patients come in
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold text-brand-navy">
              Where white spots come from.
            </h2>
            <p className="text-slate-600 max-w-2xl mx-auto">
              Not every white spot has the same cause — and Icon is designed for specific ones.
              Here&rsquo;s what we see most often in the office.
            </p>
          </div>
          <ul className="grid sm:grid-cols-2 gap-5">
            {causes.map((cause) => (
              <li
                key={cause.label}
                className="flex gap-4 rounded-2xl bg-brand-cream p-6"
              >
                <div className="flex-shrink-0 inline-flex h-9 w-9 items-center justify-center rounded-full bg-brand-navy text-white">
                  <Check className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-bold text-brand-navy">{cause.label}</h3>
                  <p className="text-sm text-slate-700 leading-relaxed mt-1">
                    {cause.description}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="bg-brand-cream py-16 sm:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
          <div className="text-center mb-10 space-y-2">
            <p className="text-sm font-bold tracking-widest uppercase text-brand-coral">
              How it works
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold text-brand-navy">
              Why patients love it.
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {benefits.map(({ icon: Icon, title, body }) => (
              <div key={title} className="rounded-2xl bg-white p-6 space-y-3 shadow-sm">
                <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-brand-cream text-brand-navy">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="font-bold text-brand-navy">{title}</h3>
                <p className="text-sm text-slate-700 leading-relaxed">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-16 sm:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
          <div className="space-y-6">
            <div>
              <p className="text-sm font-bold tracking-widest uppercase text-brand-coral">
                The appointment
              </p>
              <h2 className="text-3xl sm:text-4xl font-bold text-brand-navy mt-2">
                What to expect in the chair.
              </h2>
            </div>
            <ol className="space-y-4 list-decimal pl-5 marker:text-brand-coral marker:font-bold text-slate-700">
              <li className="leading-relaxed pl-1">
                <strong className="text-brand-navy">Surface prep.</strong> We isolate the teeth,
                apply a mild etching gel for a couple of minutes, then rinse and dry. This opens
                the micro-pores in the enamel where the white spot has formed.
              </li>
              <li className="leading-relaxed pl-1">
                <strong className="text-brand-navy">Icon resin infiltration.</strong> We paint on
                the Icon resin and let it soak in. The resin fills the damaged pores from the
                inside — and because its refractive index matches healthy enamel, the spot
                visually disappears.
              </li>
              <li className="leading-relaxed pl-1">
                <strong className="text-brand-navy">Cure and polish.</strong> A blue curing light
                sets the resin in seconds. We polish the tooth surface smooth and you&rsquo;re
                done.
              </li>
            </ol>
            <p className="text-slate-700 leading-relaxed">
              Total chair time: about an hour for most cases, sometimes less for a single tooth.
              No numbing, no recovery, no aftercare beyond your normal brushing and flossing.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-brand-cream py-16 sm:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
          <div className="text-center mb-10 space-y-2">
            <p className="text-sm font-bold tracking-widest uppercase text-brand-coral">
              Side by side
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold text-brand-navy">
              Icon vs. other white-spot options.
            </h2>
            <p className="text-slate-600 max-w-2xl mx-auto">
              The right cosmetic treatment depends on what your teeth need. Here&rsquo;s how Icon
              compares to the alternatives.
            </p>
          </div>
          <div className="rounded-3xl bg-white overflow-hidden shadow-sm overflow-x-auto">
            <table className="w-full min-w-[680px]">
              <thead>
                <tr className="border-b-2 border-brand-cream">
                  <th className="text-left p-4 lg:p-5 text-xs font-bold uppercase tracking-wider text-slate-500">
                    Feature
                  </th>
                  <th className="text-left p-4 lg:p-5 text-xs font-bold uppercase tracking-wider text-brand-coral">
                    Icon®
                  </th>
                  <th className="text-left p-4 lg:p-5 text-xs font-bold uppercase tracking-wider text-slate-500">
                    Whitening
                  </th>
                  <th className="text-left p-4 lg:p-5 text-xs font-bold uppercase tracking-wider text-slate-500">
                    Bonding
                  </th>
                  <th className="text-left p-4 lg:p-5 text-xs font-bold uppercase tracking-wider text-slate-500">
                    Veneers
                  </th>
                </tr>
              </thead>
              <tbody>
                {compareRows.map((row, i) => (
                  <tr
                    key={row.feature}
                    className={i % 2 === 0 ? "bg-brand-cream/40" : ""}
                  >
                    <td className="p-4 lg:p-5 font-bold text-brand-navy align-top text-sm">
                      {row.feature}
                    </td>
                    <td className="p-4 lg:p-5 text-sm text-slate-700 align-top">
                      <span className="flex gap-2">
                        <Check className="h-4 w-4 mt-0.5 text-brand-coral flex-shrink-0" />
                        {row.icon}
                      </span>
                    </td>
                    <td className="p-4 lg:p-5 text-sm text-slate-500 align-top">
                      {row.whitening}
                    </td>
                    <td className="p-4 lg:p-5 text-sm text-slate-500 align-top">
                      {row.bonding}
                    </td>
                    <td className="p-4 lg:p-5 text-sm text-slate-500 align-top">
                      {row.veneers}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <CtaBand
        heading="Curious if Icon is right for your smile?"
        body="A quick consultation tells us whether your white spots are a candidate. No pressure, no obligation."
      />
    </>
  );
}
