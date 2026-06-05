import { siteConfig } from "@/lib/site-config";
import { Phone } from "lucide-react";

type Props = {
  heading?: string;
  body?: string;
  variant?: "default" | "coral";
};

export function CtaBand({
  heading = "Ready to schedule your visit?",
  body = "Booking online takes a minute. Or call our friendly front office.",
  variant = "default",
}: Props) {
  const isColor = variant === "coral";
  return (
    <section className={isColor ? "bg-brand-coral text-white" : "bg-brand-navy text-white"}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-14 lg:py-20">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8 text-center lg:text-left">
          <div className="space-y-3 max-w-2xl mx-auto lg:mx-0">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">{heading}</h2>
            <p className="text-base sm:text-lg text-white/85 leading-relaxed">{body}</p>
          </div>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 lg:flex-shrink-0">
            <a
              href={siteConfig.booking}
              target="_blank"
              rel="noopener noreferrer"
              className={
                isColor
                  ? "inline-flex h-12 items-center justify-center rounded-full bg-white px-8 text-sm font-bold text-brand-coral shadow-md transition-transform hover:scale-[1.02]"
                  : "inline-flex h-12 items-center justify-center rounded-full bg-brand-coral px-8 text-sm font-bold text-white shadow-md transition-colors hover:bg-brand-coral-dark"
              }
            >
              Book Appointment
            </a>
            <a
              href={`tel:${siteConfig.phone.tel}`}
              className="inline-flex h-12 items-center justify-center gap-2 rounded-full border-2 border-white/40 px-6 text-sm font-semibold text-white hover:bg-white/10"
            >
              <Phone className="h-4 w-4" />
              {siteConfig.phone.display}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
