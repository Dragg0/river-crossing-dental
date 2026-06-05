import Link from "next/link";
import Image from "next/image";
import { Phone, ChevronDown } from "lucide-react";
import { nav, siteConfig } from "@/lib/site-config";
import { MobileMenu } from "./mobile-menu";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/85">
      <div className="container mx-auto flex h-20 items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="flex items-center gap-3 flex-shrink-0"
          aria-label="River Crossing Family Dental — Home"
        >
          <Image
            src="/images/brand/logo-r-mark.png"
            alt=""
            width={1374}
            height={1246}
            priority
            className="h-12 w-auto md:h-14"
          />
          <span className="hidden sm:flex flex-col leading-tight">
            <span className="text-sm md:text-base font-bold tracking-wide text-brand-navy">
              River Crossing
            </span>
            <span className="text-xs md:text-sm font-medium tracking-wider text-slate-500 uppercase">
              Family Dental
            </span>
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-1 lg:gap-2" aria-label="Primary">
          {nav.map((item) => (
            <div key={item.label} className="relative group">
              <Link
                href={item.href}
                className="inline-flex items-center gap-1 rounded-md px-3 py-2 text-sm font-semibold text-slate-700 hover:text-brand-navy hover:bg-slate-50"
              >
                {item.label}
                {item.children && <ChevronDown className="h-3.5 w-3.5 opacity-60" />}
              </Link>
              {item.children && (
                <div className="invisible absolute left-0 top-full pt-2 opacity-0 transition-opacity group-hover:visible group-hover:opacity-100">
                  <div className="min-w-[240px] rounded-xl border border-slate-200 bg-white p-2 shadow-lg">
                    {item.children.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        className="block rounded-md px-3 py-2 text-sm text-slate-700 hover:bg-brand-cream hover:text-brand-navy"
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </nav>

        <div className="flex items-center gap-2 lg:gap-4">
          <a
            href={`tel:${siteConfig.phone.tel}`}
            className="hidden lg:inline-flex items-center gap-2 text-sm font-semibold text-brand-navy hover:text-brand-coral"
          >
            <Phone className="h-4 w-4" />
            {siteConfig.phone.display}
          </a>
          <a
            href={siteConfig.booking}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden md:inline-flex h-10 items-center justify-center rounded-full bg-brand-coral px-5 text-sm font-semibold text-white shadow-md transition-colors hover:bg-brand-coral-dark"
          >
            Book Appointment
          </a>
          <MobileMenu />
        </div>
      </div>
    </header>
  );
}
