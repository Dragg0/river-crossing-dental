import services from "../../../../content/services.json";
import { notFound } from "next/navigation";
import { Shield, Smile, Sparkles, Ambulance, PlusCircle, ArrowLeft } from "lucide-react";
import Link from "next/link";

export function generateStaticParams() {
  return services.map((service) => ({
    slug: service.slug,
  }));
}

export default async function ServicePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = services.find((s) => s.slug === slug);

  if (!service) notFound();

  const icons: Record<string, any> = {
    shield: Shield,
    smile: Smile,
    dentures: PlusCircle,
    sparkles: Sparkles,
    ambulance: Ambulance,
  };
  const IconComponent = icons[service.icon] || PlusCircle;

  return (
    <div className="container mx-auto px-4 py-24 max-w-4xl">
      <Link href="/#services" className="inline-flex items-center text-sm text-blue-600 hover:underline mb-8">
        <ArrowLeft className="w-4 h-4 mr-2" /> Back to services
      </Link>
      <div className="flex items-center gap-4 mb-8">
        <div className="p-4 rounded-2xl bg-blue-50 text-blue-600">
          <IconComponent className="w-10 h-10" />
        </div>
        <h1 className="text-4xl font-bold text-slate-900">{service.title}</h1>
      </div>
      <div className="prose prose-lg text-slate-600 leading-relaxed mb-12">
        <p>{service.description}</p>
        <p className="mt-4">
          At River Crossing Family Dental, we prioritize your comfort and oral health. 
          Our {service.title.toLowerCase()} services are delivered with the latest technology 
          to ensure you receive the best care possible in Riverton.
        </p>
      </div>
      <div className="bg-slate-50 p-8 rounded-3xl border border-slate-100 flex flex-col md:flex-row items-center justify-between gap-8">
        <div>
          <h3 className="text-xl font-bold text-blue-900 mb-2">Ready to schedule?</h3>
          <p className="text-slate-500">Book your appointment for {service.title.toLowerCase()} today.</p>
        </div>
        <a 
          href="https://modento.io/river-crossing-dental" 
          className="inline-flex h-12 items-center justify-center rounded-full bg-blue-600 px-10 text-base font-semibold text-white hover:bg-blue-700 transition-colors"
        >
          Book Now via Modento
        </a>
      </div>
    </div>
  );
}