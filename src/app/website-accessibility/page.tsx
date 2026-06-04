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
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl space-y-6 text-slate-700 leading-relaxed">
          <div className="rounded-2xl bg-brand-cream border-l-4 border-brand-coral p-6">
            <p className="font-semibold text-brand-navy mb-1">Our commitment</p>
            <p className="text-sm">
              River Crossing Family Dental is committed to making our website and our office
              accessible to all patients, including those with disabilities. We work to follow the
              Web Content Accessibility Guidelines (WCAG) 2.1 Level AA standard.
            </p>
          </div>

          <h2 className="text-2xl font-bold text-brand-navy mt-8">Ongoing improvements</h2>
          <p>
            Accessibility is an ongoing effort. We test the site regularly, address issues we find,
            and welcome feedback from patients and visitors about ways we can improve.
          </p>

          <h2 className="text-2xl font-bold text-brand-navy mt-8">If something isn&rsquo;t working</h2>
          <p>
            If you encounter a barrier on this site — whether that&rsquo;s a page that&rsquo;s
            difficult to read, a form that&rsquo;s hard to complete, or anything else — please let
            us know so we can fix it. The easiest ways to reach us:
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

          <h2 className="text-2xl font-bold text-brand-navy mt-8">In-office accommodations</h2>
          <p>
            If you need accommodations for your visit — wheelchair access, hearing assistance,
            language support, sedation for anxiety, or anything else — let our front office know
            when you book, and we&rsquo;ll make sure you&rsquo;re comfortable.
          </p>

          <p className="text-sm text-slate-500 pt-6 border-t border-slate-200">
            This statement is a placeholder. The final accessibility statement will be reviewed
            and dated when published.
          </p>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
