import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, Shield, Smile, PlusCircle, Sparkles, Ambulance, type LucideIcon } from "lucide-react";
import type { Metadata } from "next";
import { services } from "@/content/services";
import { siteConfig } from "@/lib/site-config";
import { CtaBand } from "@/components/cta-band";

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
      <section className="bg-brand-cream py-12 sm:py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-5 gap-10 lg:gap-14 items-center">
            <div className={service.heroImage ? "lg:col-span-3 space-y-5" : "lg:col-span-5 max-w-3xl space-y-5"}>
              <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-brand-navy shadow-sm">
                <Icon className="h-7 w-7" />
              </div>
              <h1 className="text-4xl sm:text-5xl font-bold text-brand-navy leading-tight">
                {service.title}
              </h1>
              <p className="text-lg text-slate-700 leading-relaxed">{service.intro}</p>
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
            {service.heroImage && (
              <div className="lg:col-span-2 relative aspect-[4/3] rounded-3xl overflow-hidden shadow-xl">
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

      {/* Treatment sections */}
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
                {section.body && (
                  <p className="text-base sm:text-lg text-slate-700 leading-relaxed mb-4">
                    {section.body}
                  </p>
                )}
                {section.list && (
                  <ItemList items={section.list} ordered={section.ordered} />
                )}
              </article>
            ))}
          </div>

          {service.closingHeading && (
            <div className="mt-16 rounded-3xl bg-brand-cream p-8 lg:p-12 text-center space-y-3">
              <h2 className="text-2xl sm:text-3xl font-bold text-brand-navy">
                {service.closingHeading}
              </h2>
              {service.closingBody && (
                <p className="text-lg text-slate-700 leading-relaxed max-w-2xl mx-auto">
                  {service.closingBody}
                </p>
              )}
            </div>
          )}
        </div>
      </section>

      {/* Related services nudge */}
      <section className="bg-brand-cream py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-brand-navy">Other services</h2>
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
                    <span className="text-sm font-semibold text-brand-navy">{s.title}</span>
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

function ItemList({ items, ordered }: { items: ListItem[]; ordered?: boolean }) {
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
            <li key={i} className={ordered ? "leading-relaxed" : "flex gap-2 leading-relaxed"}>
              {!ordered && <span className="text-brand-coral mt-1.5 flex-shrink-0">•</span>}
              <span>{item}</span>
            </li>
          );
        }
        return (
          <li
            key={i}
            className={ordered ? "leading-relaxed" : "flex gap-2 leading-relaxed"}
          >
            {!ordered && <span className="text-brand-coral mt-1.5 flex-shrink-0">•</span>}
            <span>
              <span className="font-bold text-brand-navy">{item.label}:</span>{" "}
              {item.description}
            </span>
          </li>
        );
      })}
    </ListTag>
  );
}

type ListItem = string | { label: string; description: string };
