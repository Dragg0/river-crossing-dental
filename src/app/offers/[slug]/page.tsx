import offers from "../../../../content/offers.json";
import { notFound } from "next/navigation";
import { CalendarDays, ArrowLeft, Tag } from "lucide-react";
import Link from "next/link";

export function generateStaticParams() {
  return offers.map((offer) => ({
    slug: offer.slug,
  }));
}

export default async function OfferPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const offer = offers.find((o) => o.slug === slug);

  if (!offer) notFound();

  return (
    <div className="container mx-auto px-4 py-24 max-w-4xl">
      <Link href="/#offers" className="inline-flex items-center text-sm text-blue-600 hover:underline mb-8">
        <ArrowLeft className="w-4 h-4 mr-2" /> Back to offers
      </Link>
      <div className="bg-blue-600 rounded-3xl p-12 text-white shadow-xl shadow-blue-200 mb-12 relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="text-center md:text-left">
            <div className="inline-flex items-center justify-center p-3 rounded-2xl bg-white/20 backdrop-blur-md mb-6">
              <Tag className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-5xl font-extrabold mb-4">{offer.title}</h1>
            <p className="text-xl text-blue-100 mb-2">{offer.description}</p>
            <p className="text-sm font-bold tracking-widest uppercase text-blue-200">{offer.fine_print}</p>
          </div>
          <div className="flex flex-col items-center gap-4 bg-white p-8 rounded-3xl text-slate-900 shadow-2xl">
             <CalendarDays className="w-12 h-12 text-blue-600" />
             <p className="font-bold text-center">Claim this offer <br /> today!</p>
             <a 
              href="https://modento.io/river-crossing-dental" 
              className="inline-flex h-12 items-center justify-center rounded-full bg-blue-600 px-10 text-base font-bold text-white hover:bg-blue-700 transition-colors w-full"
            >
              Book Now
            </a>
          </div>
        </div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl -mr-48 -mt-48" />
      </div>
      <div className="prose prose-lg text-slate-600 leading-relaxed mx-auto">
        <h3 className="text-2xl font-bold text-slate-900 mb-4">Terms and Conditions</h3>
        <p>This special offer is available to new patients only. Includes a professional cleaning, comprehensive dental exam, and full set of X-rays to ensure your oral health is at its best.</p>
        <p>Limit one offer per patient. Cannot be combined with insurance or other discounts. Please mention this offer when booking your appointment via Modento or by calling our office directly.</p>
      </div>
    </div>
  );
}