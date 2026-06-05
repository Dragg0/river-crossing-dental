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
            River Crossing Family Dental &amp; Orthodontics (&ldquo;we,&rdquo; &ldquo;our,&rdquo;
            or &ldquo;the practice&rdquo;) respects your privacy. This policy explains what we
            collect through{" "}
            <a
              href={siteConfig.url}
              className="font-semibold text-brand-navy hover:text-brand-coral"
            >
              rivercrossingdental.com
            </a>{" "}
            and how we use it. Information you share with us as a patient of the practice is
            governed separately by our HIPAA Notice of Privacy Practices, which you receive at your
            first visit and can request a copy of at any time.
          </p>

          <h2 className="text-2xl font-bold text-brand-navy mt-8">Information we collect</h2>
          <p>We collect two categories of information:</p>
          <ul className="space-y-2 ml-2">
            <li className="flex gap-2">
              <span className="text-brand-coral mt-1.5 flex-shrink-0">•</span>
              <span>
                <span className="font-semibold text-brand-navy">Information you give us</span> —
                name, phone number, email address, and any details you include when you contact us,
                request an appointment, or fill out a patient form. If you book through our online
                scheduler, you also provide the information that scheduler requires (date of birth,
                insurance, reason for visit).
              </span>
            </li>
            <li className="flex gap-2">
              <span className="text-brand-coral mt-1.5 flex-shrink-0">•</span>
              <span>
                <span className="font-semibold text-brand-navy">Information collected automatically</span>{" "}
                — basic technical details from your browser (IP address, device type, pages visited,
                referring site). We use this to understand which pages are useful and to keep the
                site running well. We do not use this information to identify you personally.
              </span>
            </li>
          </ul>

          <h2 className="text-2xl font-bold text-brand-navy mt-8">How we use information</h2>
          <p>
            We use the information you share with us to schedule appointments, provide dental care,
            respond to your questions, handle insurance and billing, and send appointment reminders
            and care follow-ups. We use website analytics to improve the site. We do not sell your
            information, and we do not share it with advertisers or data brokers.
          </p>

          <h2 className="text-2xl font-bold text-brand-navy mt-8">Text messages and email</h2>
          <p>
            When you book or confirm an appointment, you may receive text messages or emails from us
            (or from our scheduling and patient-communication tools acting on our behalf). These are
            related to your care — appointment confirmations, reminders, recall, and occasional
            practice updates. Standard message and data rates may apply. You can opt out of texts by
            replying STOP, and you can unsubscribe from email at any time using the link in the
            message; opting out of appointment-related messages may affect our ability to remind you
            of upcoming visits.
          </p>

          <h2 className="text-2xl font-bold text-brand-navy mt-8">Service providers we work with</h2>
          <p>
            A few trusted vendors help us run the practice and this website. They only receive the
            information they need to do their job, and they&rsquo;re contractually required to
            protect it:
          </p>
          <ul className="space-y-2 ml-2">
            <li className="flex gap-2">
              <span className="text-brand-coral mt-1.5 flex-shrink-0">•</span>
              <span>
                <span className="font-semibold text-brand-navy">Modento</span> — online appointment
                booking and patient communication.{" "}
                <a
                  href="https://modento.io/privacy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-brand-navy hover:text-brand-coral"
                >
                  modento.io/privacy
                </a>
              </span>
            </li>
            <li className="flex gap-2">
              <span className="text-brand-coral mt-1.5 flex-shrink-0">•</span>
              <span>
                <span className="font-semibold text-brand-navy">Website hosting and analytics</span>{" "}
                — our website is hosted by Vercel and uses standard, non-advertising analytics. No
                personally identifying information is shared with advertisers.
              </span>
            </li>
          </ul>

          <h2 className="text-2xl font-bold text-brand-navy mt-8">Cookies</h2>
          <p>
            This site uses a small number of cookies to keep the site working and to measure how
            it&rsquo;s used. You can disable cookies in your browser settings; the site will
            continue to work without them.
          </p>

          <h2 className="text-2xl font-bold text-brand-navy mt-8">Children&rsquo;s privacy</h2>
          <p>
            This website is not directed to children under 13. We treat children as patients of the
            practice and collect their information only through a parent or guardian, in the course
            of care. If you believe a child has submitted information to us through this site,
            please contact our office and we will delete it.
          </p>

          <h2 className="text-2xl font-bold text-brand-navy mt-8">Your rights</h2>
          <p>
            You can ask us what personal information we have about you, ask us to correct it, or ask
            us to delete it (except where we&rsquo;re required by law to keep it — for example,
            dental records). For health information specifically, the rights described in our HIPAA
            Notice of Privacy Practices apply. To exercise any of these rights, contact our office.
          </p>

          <h2 className="text-2xl font-bold text-brand-navy mt-8">Changes to this policy</h2>
          <p>
            If we make a meaningful change to this policy, we&rsquo;ll update the date at the top of
            the page. Continued use of the site after a change means you accept the updated policy.
          </p>

          <h2 className="text-2xl font-bold text-brand-navy mt-8">Contact us</h2>
          <p>
            Questions about privacy, or to request a copy of our HIPAA Notice of Privacy Practices:
          </p>
          <ul className="space-y-2 ml-2">
            <li className="flex gap-2">
              <span className="text-brand-coral mt-1.5 flex-shrink-0">•</span>
              <span>
                Call us:{" "}
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
            <li className="flex gap-2">
              <span className="text-brand-coral mt-1.5 flex-shrink-0">•</span>
              <span>
                Or stop by: {siteConfig.address.full}
              </span>
            </li>
          </ul>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
