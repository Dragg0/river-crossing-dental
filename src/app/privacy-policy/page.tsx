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
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl space-y-6 text-slate-700 leading-relaxed">
          <div className="rounded-2xl bg-brand-cream border-l-4 border-brand-coral p-6">
            <p className="font-semibold text-brand-navy mb-1">This page is being updated.</p>
            <p className="text-sm">
              We&rsquo;re refreshing our privacy policy. If you have questions about how we handle
              your information in the meantime, please{" "}
              <Link href="/contact" className="font-semibold text-brand-navy hover:text-brand-coral">
                contact our office
              </Link>{" "}
              and we&rsquo;ll be happy to walk you through our current practices.
            </p>
          </div>

          <h2 className="text-2xl font-bold text-brand-navy mt-8">What we collect</h2>
          <p>
            When you book an appointment, contact us, or visit our office, we collect the
            information you provide directly (name, contact details, insurance information, and
            medical history necessary for your care) along with standard website analytics
            information (browser type, pages visited, etc.).
          </p>

          <h2 className="text-2xl font-bold text-brand-navy mt-8">How we use it</h2>
          <p>
            We use your information to provide dental care, communicate with you about
            appointments, process insurance claims and payments, and improve our services. Your
            health information is protected under HIPAA and is never sold or shared for marketing
            purposes.
          </p>

          <h2 className="text-2xl font-bold text-brand-navy mt-8">Third parties</h2>
          <p>
            We use Modento for online appointment scheduling. Visit{" "}
            <a
              href="https://modento.io/privacy"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-brand-navy hover:text-brand-coral"
            >
              modento.io/privacy
            </a>{" "}
            for their privacy practices. We use standard web analytics to understand how the site
            is used; no personally identifying information is shared with advertisers.
          </p>

          <h2 className="text-2xl font-bold text-brand-navy mt-8">Your rights</h2>
          <p>
            You have the right to access, correct, or request deletion of your personal
            information. To exercise these rights, contact our office at{" "}
            <a
              href={`tel:${siteConfig.phone.tel}`}
              className="font-semibold text-brand-navy hover:text-brand-coral"
            >
              {siteConfig.phone.display}
            </a>
            .
          </p>

          <p className="text-sm text-slate-500 pt-6 border-t border-slate-200">
            Last updated: a placeholder. The final policy will list the publication date here.
          </p>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
