import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/lib/site-config";
import { CtaBand } from "@/components/cta-band";

export const metadata: Metadata = {
  title: "Website Accessibility",
  description: `Accessibility statement for ${siteConfig.shortName} — Riverton, UT.`,
};

export default function WebsiteAccessibilityPage() {
  return (
    <>
      <section className="bg-brand-cream py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl text-center space-y-3">
          <p className="text-sm font-bold tracking-widest uppercase text-brand-coral">Legal</p>
          <h1 className="text-4xl sm:text-5xl font-bold text-brand-navy">Website Accessibility</h1>
          <p className="text-sm text-slate-600">Last updated: June 5, 2026</p>
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl space-y-6 text-slate-700 leading-relaxed">
          <div className="rounded-2xl bg-brand-cream border-l-4 border-brand-coral p-6">
            <p className="font-semibold text-brand-navy mb-1">Our commitment</p>
            <p className="text-sm">
              River Crossing Family Dental &amp; Orthodontics is committed to making our website
              and our office accessible to all patients, including those with disabilities. We
              design and maintain this site to follow the Web Content Accessibility Guidelines
              (WCAG) 2.1 Level AA where reasonably possible.
            </p>
          </div>

          <h2 className="text-2xl font-bold text-brand-navy mt-8">What we do</h2>
          <p>
            We aim to make our content readable and usable across screen readers, keyboards, and a
            wide range of devices. That means descriptive alt text on meaningful images, sufficient
            color contrast, clear headings, labeled form fields, and links that make sense out of
            context. We test the site as we build it and review it periodically.
          </p>

          <h2 className="text-2xl font-bold text-brand-navy mt-8">Ongoing improvements</h2>
          <p>
            Accessibility is an ongoing effort, not a finish line. As we add pages and content, we
            keep checking the basics. Where third-party tools we use (for example, our online
            booking scheduler) fall short of our standard, we&rsquo;ll provide an alternate path to
            the same outcome — calling our front office is always an option.
          </p>

          <h2 className="text-2xl font-bold text-brand-navy mt-8">If something isn&rsquo;t working</h2>
          <p>
            If you run into a barrier on this site — a page that&rsquo;s difficult to read, a form
            that&rsquo;s hard to complete, a link or button that doesn&rsquo;t behave with your
            assistive technology, or anything else — please tell us so we can fix it. The easiest
            ways to reach us:
          </p>
          <ul className="space-y-2 ml-2">
            <li className="flex gap-2">
              <span className="text-brand-coral mt-1.5 flex-shrink-0">•</span>
              <span>
                Call our office:{" "}
                <a
                  href={`tel:${siteConfig.phone.tel}`}
                  className="font-semibold text-brand-navy hover:text-brand-coral"
                >
                  {siteConfig.phone.display}
                </a>
              </span>
            </li>
            <li className="flex gap-2">
              <span className="text-brand-coral mt-1.5 flex-shrink-0">•</span>
              <span>
                Visit our{" "}
                <Link
                  href="/contact"
                  className="font-semibold text-brand-navy hover:text-brand-coral"
                >
                  contact page
                </Link>
              </span>
            </li>
          </ul>
          <p>
            Please describe the page or feature, the device or assistive technology you were using,
            and what you were trying to do. We respond as quickly as we reasonably can.
          </p>

          <h2 className="text-2xl font-bold text-brand-navy mt-8">Alternate formats</h2>
          <p>
            If you&rsquo;d like information from this site in a different format — printed,
            large-print, or read aloud over the phone — call our office and we&rsquo;ll help.
          </p>

          <h2 className="text-2xl font-bold text-brand-navy mt-8">In-office accommodations</h2>
          <p>
            If you need accommodations for your visit — wheelchair access, hearing assistance,
            language support, sedation for anxiety, or anything else — let our front office know
            when you book, and we&rsquo;ll make sure you&rsquo;re comfortable.
          </p>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
