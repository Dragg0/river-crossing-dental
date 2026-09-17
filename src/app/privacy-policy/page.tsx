import { PhoneLink, PhoneNumber } from "@/components/call-measurement";
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
          <p className="text-sm text-slate-600">Last updated: September 17, 2026</p>
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
            Our website host processes technical information needed to deliver this site,
            such as requests from your browser. We also store your ad measurement preference
            in your browser so you do not have to choose it on every visit.
          </p>
          <h2 className="text-2xl font-bold text-brand-navy mt-8">Optional ad and call measurement</h2>
          <p>
            If you choose <em>Allow measurement</em>, we load Google Ads measurement technology.
            Google may use cookies and advertising click identifiers to connect an ad visit
            with a subsequent call. A Google forwarding number may replace the phone number
            shown on this website and connect your call to our office. Call reporting may
            include caller number, call time, duration, and connection status where available.
            This helps us understand which advertising leads to calls.
          </p>
          <p>
            We configure this website measurement without personalized advertising or enhanced
            conversions. We do not send patient records, appointment details, or call transcripts
            through the website measurement code. Read more about{" "}
            <a href="https://policies.google.com/technologies/partner-sites" target="_blank"
              rel="noopener noreferrer" className="font-semibold text-brand-navy hover:text-brand-coral">
              how Google uses information from sites that use its services
            </a>.
          </p>
          <p>
            You can decline and still use the website, call, or book. To change your choice,
            use <em>Ad measurement preferences</em> at the bottom of any page. Declining stops
            the website from loading Google measurement on subsequent visits; it does not
            delete information already collected. Calls placed directly from a Google ad
            are measured separately by Google.
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
            privacy practices. When you tap a phone number, your call connects to our office,
            either directly or through the forwarding number described above.
          </p>

          <h2 className="text-2xl font-bold text-brand-navy mt-8">Questions</h2>
          <p>
            For anything about your records, your privacy, or our HIPAA Notice of Privacy Practices,
            the fastest path is to call us at{" "}
            <PhoneLink
              className="font-semibold text-brand-navy hover:text-brand-coral"
            >
              <PhoneNumber />
            </PhoneLink>{" "}
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
