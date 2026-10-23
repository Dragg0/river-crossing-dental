import { PhoneLink, PhoneNumber } from "@/components/call-measurement";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  ChevronDown,
  Shield,
  Smile,
  PlusCircle,
  Sparkles,
  Ambulance,
  type LucideIcon,
} from "lucide-react";
import type { ServiceSection } from "@/content/services";
import type { Metadata } from "next";
import { services } from "@/content/services";
import { siteConfig } from "@/lib/site-config";
import { CtaBand } from "@/components/cta-band";
import { UrgentServiceHero } from "@/components/urgent-service-hero";

const ICONS: Record<string, LucideIcon> = {
  shield: Shield,
  smile: Smile,
  dentures: PlusCircle,
  sparkles: Sparkles,
  ambulance: Ambulance,
};

export function generateStaticParams() {
  return services.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = services.find((s) => s.slug === slug);
  if (!service) return {};
  return {
    title: service.title,
    description: service.description,
  };
}

export default async function ServicePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = services.find((s) => s.slug === slug);
  if (!service) notFound();

  const Icon = ICONS[service.icon] ?? PlusCircle;
  const urgent = service.urgentHero;

  return (
    <>
      {/* Breadcrumb */}
      <section className="bg-brand-cream border-b border-slate-200">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link
            href="/#services"
            className="inline-flex items-center text-sm font-medium text-brand-navy hover:text-brand-coral"
          >
            <ArrowLeft className="w-4 h-4 mr-2" /> All services
          </Link>
        </div>
      </section>

      {/* Hero */}
      {urgent ? (
        <UrgentServiceHero hero={urgent} />
      ) : (
        <section className="bg-brand-cream py-12 sm:py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid items-center gap-10 lg:grid-cols-5 lg:gap-14">
              <div
                className={
                  service.heroImage
                    ? "space-y-5 lg:col-span-3"
                    : "max-w-3xl space-y-5 lg:col-span-5"
                }
              >
                <div className="inline-flex h-16 w-16 items-center justify-center overflow-hidden rounded-2xl bg-white text-brand-navy shadow-sm">
                  {service.iconImage ? (
                    <Image
                      src={service.iconImage}
                      alt={service.iconImageAlt ?? ""}
                      width={64}
                      height={64}
                      className="h-12 w-12 object-contain"
                    />
                  ) : (
                    <Icon className="h-7 w-7" />
                  )}
                </div>
                <h1 className="text-balance text-4xl font-bold leading-tight text-brand-navy sm:text-5xl">
                  {service.title}
                </h1>
                <p className="max-w-prose text-lg leading-relaxed text-slate-700">
                  {service.intro}
                </p>
                <div className="flex flex-col gap-3 pt-1 sm:flex-row">
                  <PhoneLink className="inline-flex h-12 items-center justify-center rounded-full border-2 border-brand-navy px-8 text-sm font-semibold text-brand-navy hover:bg-brand-navy hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-navy">
                    Call <PhoneNumber />
                  </PhoneLink>
                  <a
                    href={siteConfig.booking}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex h-12 items-center justify-center rounded-full bg-brand-coral px-8 text-sm font-bold text-white shadow-md hover:bg-brand-coral-dark focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-navy"
                  >
                    Book Appointment
                  </a>
                </div>
              </div>
              {service.heroImage && (
                <div className="relative aspect-[4/3] overflow-hidden rounded-3xl shadow-xl lg:col-span-2">
                  <Image
                    src={service.heroImage}
                    alt={service.heroImageAlt ?? service.title}
                    fill
                    sizes="(min-width: 1024px) 40vw, 100vw"
                    className="object-cover"
                    priority
                  />
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {urgent ? (
        <EmergencyReference
          sections={service.sections}
          closingHeading={service.closingHeading}
          closingBody={service.closingBody}
        />
      ) : (
        <section className="bg-white py-16 sm:py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
            <div className="space-y-12">
              {service.sections.map((section, i) => (
                <article
                  key={section.heading}
                  className="border-l-4 border-brand-steel-light pl-6 lg:pl-8"
                >
                  <h2 className="text-2xl sm:text-3xl font-bold text-brand-navy mb-4">
                    {!service.unnumbered && (
                      <span className="text-brand-coral font-mono text-base align-top mr-2">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                    )}
                    {section.heading}
                  </h2>
                  <SectionBody section={section} />
                </article>
              ))}
            </div>

            {service.closingHeading && (
              <ClosingNote
                heading={service.closingHeading}
                body={service.closingBody}
              />
            )}
          </div>
        </section>
      )}

      {/* Related services nudge */}
      <section className="bg-brand-cream py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-brand-navy">
              Other services
            </h2>
            <Link
              href="/#services"
              className="hidden sm:inline-flex items-center text-sm font-semibold text-brand-navy hover:text-brand-coral"
            >
              See all
              <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {services
              .filter((s) => s.slug !== service.slug)
              .map((s) => {
                const OtherIcon = ICONS[s.icon] ?? PlusCircle;
                return (
                  <Link
                    key={s.slug}
                    href={`/services/${s.slug}`}
                    className="group flex items-center gap-3 rounded-xl bg-white p-4 shadow-sm hover:shadow-md transition-shadow"
                  >
                    <div className="inline-flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-brand-cream text-brand-navy group-hover:bg-brand-navy group-hover:text-white transition-colors">
                      <OtherIcon className="h-5 w-5" />
                    </div>
                    <span className="text-sm font-semibold text-brand-navy">
                      {s.title}
                    </span>
                  </Link>
                );
              })}
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}

function EmergencyReference({
  sections,
  closingHeading,
  closingBody,
}: {
  sections: ServiceSection[];
  closingHeading?: string;
  closingBody?: string;
}) {
  const tips = sections.find((section) => section.heading.includes("Quick Tips"));
  const rest = sections.filter((section) => section !== tips);

  return (
    <section className="bg-white py-12 sm:py-16">
      <div className="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {tips && (
          <div>
            <h2 className="text-2xl font-bold text-brand-navy sm:text-3xl">
              {tips.heading}
            </h2>
            {tips.list && (
              <ul className="mt-6 grid gap-x-10 gap-y-5 sm:grid-cols-2">
                {tips.list.map((item) => {
                  if (typeof item === "string") {
                    return (
                      <li key={item} className="flex gap-3 text-slate-700">
                        <ListMark />
                        <span className="leading-relaxed">{item}</span>
                      </li>
                    );
                  }
                  return (
                    <li key={item.label} className="flex gap-3">
                      <ListMark />
                      <p className="leading-relaxed text-slate-700">
                        <span className="font-bold text-brand-navy">{item.label}</span>{" "}
                        {item.description}
                      </p>
                    </li>
                  );
                })}
              </ul>
            )}
          </div>
        )}

        {rest.length > 0 && (
          <div className={tips ? "mt-14" : ""}>
            <h2 className="text-2xl font-bold text-brand-navy sm:text-3xl">
              More about emergency visits
            </h2>
            <div className="mt-4 divide-y divide-slate-200 border-y border-slate-200">
              {rest.map((section) => (
                <details key={section.heading} className="group py-4">
                  <summary className="flex min-h-11 cursor-pointer list-none items-center justify-between gap-4 text-lg font-bold text-brand-navy [&::-webkit-details-marker]:hidden">
                    {section.heading}
                    <ChevronDown
                      className="h-5 w-5 shrink-0 transition-transform group-open:rotate-180"
                      aria-hidden="true"
                    />
                  </summary>
                  <div className="max-w-3xl pb-2 pt-3">
                    <SectionBody section={section} />
                  </div>
                </details>
              ))}
            </div>
          </div>
        )}

        {closingHeading && (
          <ClosingNote heading={closingHeading} body={closingBody} />
        )}
      </div>
    </section>
  );
}

function SectionBody({ section }: { section: ServiceSection }) {
  return (
    <>
      {section.body && (
        <p className="mb-4 text-base leading-relaxed text-slate-700 sm:text-lg">
          {section.body}
        </p>
      )}
      {section.list && <ItemList items={section.list} ordered={section.ordered} />}
      {section.cta && (
        <Link
          href={section.cta.href}
          className="mt-4 inline-flex items-center text-sm font-semibold text-brand-coral hover:text-brand-coral-dark"
        >
          {section.cta.label}
          <ArrowRight className="ml-1 h-4 w-4" />
        </Link>
      )}
    </>
  );
}

function ClosingNote({ heading, body }: { heading: string; body?: string }) {
  return (
    <div className="mt-14 space-y-3 rounded-3xl bg-brand-cream p-8 text-center lg:p-12">
      <h2 className="text-2xl font-bold text-brand-navy sm:text-3xl">{heading}</h2>
      {body && (
        <p className="mx-auto max-w-2xl text-lg leading-relaxed text-slate-700">{body}</p>
      )}
    </div>
  );
}

function ListMark() {
  return (
    <span
      className="mt-[0.55em] h-2 w-2 shrink-0 rounded-full bg-brand-coral"
      aria-hidden="true"
    />
  );
}

function withSeparator(label: string) {
  return /[?!.:]$/.test(label) ? label : `${label}:`;
}

function ItemList({
  items,
  ordered,
}: {
  items: ListItem[];
  ordered?: boolean;
}) {
  const ListTag = ordered ? "ol" : "ul";
  return (
    <ListTag
      className={
        ordered
          ? "list-decimal pl-5 space-y-3 marker:text-brand-coral marker:font-bold text-slate-700"
          : "space-y-3 text-slate-700"
      }
    >
      {items.map((item, i) => {
        if (typeof item === "string") {
          return (
            <li
              key={i}
              className={
                ordered ? "leading-relaxed" : "flex gap-2 leading-relaxed"
              }
            >
            {!ordered && <ListMark />}
            <span>{item}</span>
            </li>
          );
        }
        return (
          <li
            key={i}
            className={
              ordered ? "leading-relaxed" : "flex gap-2 leading-relaxed"
            }
          >
            {!ordered && <ListMark />}
            <span>
              <span className="font-bold text-brand-navy">{withSeparator(item.label)}</span>{" "}
              {item.description}
            </span>
          </li>
        );
      })}
    </ListTag>
  );
}

type ListItem = string | { label: string; description: string };
