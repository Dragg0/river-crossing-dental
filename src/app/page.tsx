import { Shield, Smile, Sparkles, Ambulance, PlusCircle, Star, Phone, MapPin, ExternalLink, CalendarDays } from "lucide-react";
import services from "../../content/services.json";
import offers from "../../content/offers.json";

export default function Home() {
  const icons: Record<string, any> = {
    shield: Shield,
    smile: Smile,
    dentures: PlusCircle,
    sparkles: Sparkles,
    ambulance: Ambulance,
  };

  return (
    <div className="flex flex-col items-center">
      {/* Hero Section */}
      <section className="relative w-full overflow-hidden bg-slate-900 min-h-[85vh] flex items-center">
        {/* Background Video */}
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover z-0 opacity-40"
        >
          <source src="/hero.mp4" type="video/mp4" />
        </video>
        {/* Dark overlay for readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900/60 via-slate-900/40 to-slate-900/80 z-10" />
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-20 text-center text-white py-24 sm:py-32">
          <div className="mx-auto max-w-4xl space-y-6 animate-in fade-in slide-in-from-bottom-8 duration-1000">
            <h1 className="text-4xl font-extrabold tracking-tight sm:text-6xl text-white drop-shadow-lg">
              Welcome to River Crossing <br />
              Family Dental & Orthodontics
            </h1>
            <p className="text-lg sm:text-xl text-slate-200 leading-relaxed max-w-2xl mx-auto drop-shadow">
              High-quality, modern dentistry for the entire family in Riverton, UT. Experience comfort, advanced technology, and genuine patient care.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <a 
                href="https://modento.io/river-crossing-dental" 
                className="w-full sm:w-auto inline-flex h-12 items-center justify-center rounded-full bg-blue-600 px-10 text-base font-semibold text-white shadow-xl shadow-blue-900/40 transition-all hover:bg-blue-700 active:scale-95"
              >
                Book An Appointment
              </a>
              <a 
                href="tel:8015099937" 
                className="w-full sm:w-auto inline-flex h-12 items-center justify-center rounded-full border-2 border-white/30 bg-white/10 px-10 text-base font-semibold text-white backdrop-blur-sm transition-all hover:bg-white/20"
              >
                Call Us: (801) 509-9937
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section id="services" className="w-full py-24 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">Expert Dental Care for Everyone</h2>
            <p className="text-lg text-slate-500">From routine checkups to specialized treatments, our team provides a wide variety of specialties to meet your local community's needs.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service) => {
              const IconComponent = icons[service.icon] || PlusCircle;
              return (
                <div key={service.slug} className="group relative flex flex-col items-start p-8 rounded-2xl border border-slate-100 bg-slate-50 transition-all hover:bg-white hover:shadow-xl hover:-translate-y-1">
                  <div className="p-3 rounded-lg bg-white shadow-sm mb-6 text-blue-600 transition-colors group-hover:bg-blue-600 group-hover:text-white">
                    <IconComponent className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-slate-900">{service.title}</h3>
                  <p className="text-slate-500 mb-6 leading-relaxed">{service.description}</p>
                  <a href={`/services/${service.slug}`} className="mt-auto inline-flex items-center text-sm font-semibold text-blue-600 hover:text-blue-700 underline-offset-4 hover:underline">
                    Learn more <ExternalLink className="ml-1 w-3 h-3" />
                  </a>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Special Offers Section */}
      <section id="offers" className="w-full py-24 bg-slate-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">Exclusive Offers for New Patients</h2>
            <p className="text-lg text-slate-500">Enjoy quality modern dentistry at a lower cost with our current specials.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {offers.map((offer) => (
              <div key={offer.slug} className="flex flex-col items-center text-center p-8 rounded-2xl bg-white shadow-lg shadow-slate-200 border border-slate-100 transition-transform hover:scale-[1.02]">
                <div className="inline-flex items-center justify-center h-12 w-12 rounded-full bg-blue-100 text-blue-600 mb-6">
                  <CalendarDays className="h-6 w-6" />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-blue-900">{offer.title}</h3>
                <p className="text-slate-600 mb-4">{offer.description}</p>
                <p className="text-xs font-semibold text-blue-600 tracking-wider uppercase mb-8">{offer.fine_print}</p>
                <a 
                  href="https://modento.io/river-crossing-dental" 
                  className="mt-auto inline-flex h-11 items-center justify-center rounded-full bg-blue-600 px-8 text-sm font-bold text-white transition-all hover:bg-blue-700 w-full"
                >
                  Claim Offer
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials (placeholder) */}
      <section className="w-full py-24 bg-white overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
           <div className="text-center mb-16">
              <h2 className="text-3xl font-bold tracking-tight text-slate-900">What People Are Saying</h2>
              <div className="flex justify-center gap-1 mt-4 text-amber-400">
                <Star className="fill-current" />
                <Star className="fill-current" />
                <Star className="fill-current" />
                <Star className="fill-current" />
                <Star className="fill-current" />
              </div>
              <p className="text-slate-500 mt-2">5/5 Average Rating</p>
           </div>
           <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              <div className="p-8 rounded-2xl bg-slate-50 italic text-slate-600 relative">
                 <span className="absolute -top-4 -left-2 text-6xl text-slate-200 pointer-events-none">“</span>
                 “Came in as a new patient and the doctor was very helpful. What really did it for me was after I had a temporary crown put in, my tooth was very sensitive. He got me the next day to fix it. Very satisfied with the amount of service.”
                 <footer className="mt-6 font-bold text-slate-900 not-italic">— Lanoy T.</footer>
              </div>
              <div className="p-8 rounded-2xl bg-slate-50 italic text-slate-600 relative">
                 <span className="absolute -top-4 -left-2 text-6xl text-slate-200 pointer-events-none">“</span>
                 “First of all, I have to say that I hate going to the dentist. So for me to give them a 5-star rating says a lot. I've been a regular patient for a few years now and I can honestly say that I enjoy the team.”
                 <footer className="mt-6 font-bold text-slate-900 not-italic">— Nycole R.</footer>
              </div>
           </div>
        </div>
      </section>

      {/* Location/Map Section */}
      <section id="location" className="w-full py-24 bg-slate-900 text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8 text-center lg:text-left">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-blue-100">Visit Us in Riverton</h2>
              <div className="space-y-4">
                <div className="flex flex-col lg:flex-row items-center lg:items-start gap-4">
                  <MapPin className="h-6 w-6 text-blue-400" />
                  <div>
                    <p className="text-lg font-semibold">4121 13400 S Unit A</p>
                    <p className="text-slate-400">Riverton, UT 84096</p>
                  </div>
                </div>
                <div className="flex flex-col lg:flex-row items-center lg:items-start gap-4">
                  <Phone className="h-6 w-6 text-blue-400" />
                  <div>
                    <p className="text-lg font-semibold">(801) 509-9937</p>
                    <p className="text-slate-400">Call for same-day emergency appointments</p>
                  </div>
                </div>
              </div>
              <div className="pt-4">
                <a 
                  href="https://www.google.com/maps/dir//River+Crossing+Family+Dental+%26+Orthodontics+4121+13400+S+Unit+A,+Riverton,+UT+84096/@40.5074254,-112.0287349,13z" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="inline-flex h-11 items-center justify-center rounded-full bg-white px-8 text-sm font-bold text-slate-900 transition-all hover:bg-slate-200"
                >
                  Get Directions
                </a>
              </div>
            </div>
            {/* Map Placeholder */}
            <div className="aspect-video lg:aspect-square w-full rounded-3xl bg-slate-800 border-2 border-slate-700 flex items-center justify-center text-slate-500 overflow-hidden relative">
              <img 
                src="https://images.unsplash.com/photo-1542362567-b07e54358753?q=80&w=2070&auto=format&fit=crop" 
                alt="Modern dental office waiting area"
                className="absolute inset-0 w-full h-full object-cover opacity-40 grayscale"
              />
              <div className="relative z-10 p-8 text-center bg-slate-900/80 backdrop-blur-md rounded-2xl border border-white/10 mx-8">
                 <p className="text-sm uppercase tracking-[0.2em] mb-2 font-bold text-blue-400">Modern Facility</p>
                 <p className="font-semibold text-slate-300">Equipped with the latest technology for a modern dental experience.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}