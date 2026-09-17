import { PhoneLink, PhoneNumber } from "@/components/call-measurement";
import { Phone } from "lucide-react";
import { EveVideo } from "@/components/eve-video";

export function MeetEve() {
  return (
    <section
      id="meet-eve"
      aria-labelledby="meet-eve-heading"
      className="scroll-mt-28 bg-white py-16 sm:py-20"
    >
      <div className="container mx-auto grid max-w-7xl items-center gap-10 px-4 sm:px-6 lg:grid-cols-[0.85fr_1.15fr] lg:gap-14 lg:px-8">
        <div className="space-y-5">
          <p className="text-sm font-bold uppercase tracking-widest text-brand-navy">
            Meet Eve, our AI receptionist
          </p>
          <h2 id="meet-eve-heading" className="text-3xl font-bold leading-tight text-brand-navy sm:text-4xl">
            Call anytime. Even nights and weekends.
          </h2>
          <p className="text-lg leading-relaxed text-slate-700">
            New patients can call anytime to schedule with Eve. We&rsquo;ve tested
            her appointment booking ourselves, and it&rsquo;s working well.
            Give her a call!
          </p>
          <PhoneLink
            className="inline-flex min-h-12 w-full flex-wrap items-center justify-center gap-x-2 gap-y-1 rounded-full bg-brand-navy px-6 py-3 text-base font-semibold text-white transition-colors hover:bg-brand-navy-dark focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-navy sm:w-auto"
          >
            <Phone className="h-5 w-5 shrink-0" aria-hidden="true" />
            <span>Call Eve</span>
            <span><PhoneNumber /></span>
          </PhoneLink>
          <p className="text-sm leading-relaxed text-slate-600">
            Appointments take place during our Monday&ndash;Thursday office hours,
            subject to availability.
          </p>
        </div>

        <div className="min-w-0">
          <figure>
            <EveVideo />
            <figcaption className="mt-3 text-sm text-slate-600">
              A 30-second introduction from Dr. John Peterson. Captions included.
            </figcaption>
          </figure>
          <details className="mt-4 text-sm text-slate-600">
            <summary className="w-fit cursor-pointer rounded font-semibold text-brand-navy focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-navy">
              Read the video transcript
            </summary>
            <div className="mt-3 space-y-3 leading-relaxed">
              <p>
                Hi, I&rsquo;m Dr. John Peterson at River Crossing Dental, and
                I&rsquo;m excited to share with you something new. Her name&rsquo;s
                Eve, and she&rsquo;s our new AI receptionist, which means that you
                can call anytime, even nights and weekends, to schedule your appointment.
              </p>
              <p>
                I&rsquo;ve tested her myself, and she works great at scheduling
                appointments and answering dental-related questions. So give her a
                try. Give her a call.
              </p>
              <p>
                Your appointment will be scheduled during our regular office
                hours, Monday through Thursday.
              </p>
            </div>
          </details>
        </div>
      </div>
    </section>
  );
}
