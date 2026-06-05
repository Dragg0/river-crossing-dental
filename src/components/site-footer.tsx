import Link from "next/link";
import Image from "next/image";
import { Phone, MapPin, Facebook, Instagram, Youtube } from "lucide-react";
import { siteConfig } from "@/lib/site-config";

export function SiteFooter() {
  return (
    <footer className="bg-brand-navy text-slate-200">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          <div className="space-y-4">
            <Image
              src="/images/brand/logo-r-mark.png"
              alt="River Crossing Family Dental"
              width={1374}
              height={1246}
              className="h-20 w-auto bg-white rounded-xl p-3"
            />
            <p className="text-sm leading-relaxed text-slate-300 max-w-xs">
              {siteConfig.tagline}
            </p>
            <div className="flex items-center gap-3 pt-2">
              <a
                href={siteConfig.social.facebook}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="River Crossing Family Dental on Facebook"
                className="text-slate-300 hover:text-white"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a
                href={siteConfig.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="River Crossing Family Dental on Instagram"
                className="text-slate-300 hover:text-white"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href={siteConfig.social.youtube}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="River Crossing Family Dental on YouTube"
                className="text-slate-300 hover:text-white"
              >
                <Youtube className="h-5 w-5" />
              </a>
              <a
                href={siteConfig.social.yelp}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="River Crossing Family Dental on Yelp"
                className="inline-flex h-5 w-5 items-center justify-center rounded-sm bg-slate-300 text-brand-navy text-[10px] font-black hover:bg-white"
              >
                Y
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-white mb-4">Visit</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex gap-2">
                <MapPin className="h-4 w-4 mt-0.5 flex-shrink-0 text-brand-steel" />
                <a
                  href={siteConfig.googleMapsDirections}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-slate-300 hover:text-white"
                >
                  {siteConfig.address.street}
                  <br />
                  {siteConfig.address.city}, {siteConfig.address.state} {siteConfig.address.zip}
                </a>
              </li>
              <li className="flex gap-2">
                <Phone className="h-4 w-4 mt-0.5 flex-shrink-0 text-brand-steel" />
                <a
                  href={`tel:${siteConfig.phone.tel}`}
                  className="text-slate-300 hover:text-white"
                >
                  {siteConfig.phone.display}
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-white mb-4">Hours</h3>
            <ul className="space-y-1.5 text-sm">
              {siteConfig.hours.map((row) => (
                <li key={row.day} className="flex justify-between gap-3">
                  <span className="text-slate-300">{row.day}</span>
                  <span className={row.open ? "text-slate-100" : "text-slate-400"}>
                    {row.display}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-white mb-4">Explore</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/meet-the-team" className="text-slate-300 hover:text-white">Meet The Team</Link></li>
              <li><Link href="/financing-insurance" className="text-slate-300 hover:text-white">Financing & Insurance</Link></li>
              <li><Link href="/advanced-technology" className="text-slate-300 hover:text-white">Advanced Technology</Link></li>
              <li><Link href="/reviews" className="text-slate-300 hover:text-white">Reviews</Link></li>
              <li><Link href="/blog" className="text-slate-300 hover:text-white">Blog</Link></li>
              <li><Link href="/contact" className="text-slate-300 hover:text-white">Contact</Link></li>
            </ul>
            <a
              href={siteConfig.booking}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex h-10 items-center justify-center rounded-full bg-brand-coral px-5 text-sm font-semibold text-white hover:bg-brand-coral-dark"
            >
              Book Appointment
            </a>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-white/10 flex flex-col md:flex-row gap-3 items-center justify-between text-xs text-slate-400">
          <p>© {new Date().getFullYear()} {siteConfig.name}. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <Link href="/privacy-policy" className="hover:text-white">Privacy Policy</Link>
            <Link href="/website-accessibility" className="hover:text-white">Accessibility</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
