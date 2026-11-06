import { LocationLanding } from "@/components/location-landing";
import { getLocation, locations } from "@/content/locations";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

type Props = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return locations.map((location) => ({ slug: location.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const location = getLocation(slug);
  if (!location) return {};
  const path = `/locations/${location.slug}`;
  return {
    title: location.title,
    description: location.description,
    alternates: { canonical: path },
    openGraph: {
      description: location.description,
      url: path,
    },
  };
}

export default async function LocationRoute({ params }: Props) {
  const { slug } = await params;
  const location = getLocation(slug);
  if (!location) notFound();
  return <LocationLanding location={location} />;
}
