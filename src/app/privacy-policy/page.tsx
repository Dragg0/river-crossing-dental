import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/lib/site-config";
import { CtaBand } from "@/components/cta-band";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: `Privacy policy for ${siteConfig.shortName} — Riverton, UT.`,
};

export default function PrivacyPolicyPage() {
  return (
    <>
      <section className="bg-brand-cream py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl text-center space-y-3">
          <p className="text-sm font-bold tracking-widest uppercase text-brand-coral">Legal</p>
          <h1 className="text-4xl sm:text-5xl font-bold text-brand-navy">Privacy Policy</h1>
          <p className="text-sm text-slate-600">Last updated: June 5, 2026</p>
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl space-y-6 text-slate-700 leading-relaxed">
          <p>
            This policy covers this website. The way we handle your health information as a patient
            of the practice is covered separately by our HIPAA Notice of Privacy Practices, which
            you receive at your first visit. You can request a copy any time by calling our office.
          </p>

          <h2 className="text-2xl font-bold text-brand-navy mt-8">What this website collects</h2>
          <p>
            Browsing this site, we collect only standard, non-identifying analytics — things like
            which pages get visited and what kind of device you&rsquo;re on. We use it to keep the
            site working well. We don&rsquo;t use advertising trackers, and we don&rsquo;t sell or
            share visitor information.
          </p>
          <p>
            When you click <em>Book Appointment</em>, you leave our site and continue on{" "}
            <a
              href="https://modento.io/privacy"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-brand-navy hover:text-brand-coral"
            >
              Modento
            </a>
            , our scheduling provider — anything you enter there is governed by Modento&rsquo;s
            privacy practices. When you tap a phone number, you&rsquo;re calling our office
            directly.
          </p>

          <h2 className="text-2xl font-bold text-brand-navy mt-8">Questions</h2>
          <p>
            For anything about your records, your privacy, or our HIPAA Notice of Privacy Practices,
            the fastest path is to call us at{" "}
            <a
              href={`tel:${siteConfig.phone.tel}`}
              className="font-semibold text-brand-navy hover:text-brand-coral"
            >
              {siteConfig.phone.display}
            </a>{" "}
            or visit our{" "}
            <Link href="/contact" className="font-semibold text-brand-navy hover:text-brand-coral">
              contact page
            </Link>
            .
          </p>

          <p className="text-sm text-slate-500 pt-6 border-t border-slate-200">
            If we make a meaningful change to this policy, we&rsquo;ll update the date at the top.
          </p>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
