import Image from "next/image";
import type { Metadata } from "next";
import { siteConfig } from "@/lib/site-config";
import { CtaBand } from "@/components/cta-band";

export const metadata: Metadata = {
  title: "Meet The Team",
  description: `Meet Dr. John M. Peterson, DDS and the team at ${siteConfig.shortName} in Riverton, UT.`,
};

const team = [
  {
    name: "Aylla",
    role: "Office Manager",
    image: "/images/team/aylla.webp",
  },
  {
    name: "Julianna",
    role: "Registered Dental Hygienist",
    image: "/images/team/julianna.webp",
  },
  {
    name: "Marlayia",
    role: "Registered Dental Hygienist",
    image: "/images/team/marlayia.webp",
  },
];

export default function MeetTheTeamPage() {
  return (
    <>
      <section className="bg-brand-cream py-16 sm:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl text-center space-y-5">
          <p className="text-sm font-bold tracking-widest uppercase text-brand-coral">
            Meet Our Team
          </p>
          <h1 className="text-4xl sm:text-5xl font-bold text-brand-navy">
            Familiar faces, exceptional care.
          </h1>
          <p className="text-lg text-slate-700 max-w-2xl mx-auto leading-relaxed">
            Our small, dedicated team has been caring for Riverton families for years. We can&rsquo;t
            wait to meet yours.
          </p>
        </div>
      </section>

      {/* Dr. Peterson — full bio */}
      <section className="bg-white py-16 sm:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-5 gap-10 lg:gap-14 items-start">
            <div className="lg:col-span-2 sticky top-24">
              <div className="relative aspect-[3/4] rounded-3xl overflow-hidden shadow-xl">
                <Image
                  src="/images/team/dr-peterson.webp"
                  alt="Dr. John M. Peterson, DDS"
                  fill
                  sizes="(min-width: 1024px) 40vw, 100vw"
                  className="object-cover"
                  priority
                />
              </div>
              <div className="mt-4 text-center lg:text-left">
                <p className="text-sm font-bold tracking-widest uppercase text-brand-coral">
                  Dentist
                </p>
                <h2 className="text-2xl sm:text-3xl font-bold text-brand-navy mt-1">
                  Dr. John M. Peterson, DDS
                </h2>
              </div>
            </div>

            <div className="lg:col-span-3 space-y-5 text-slate-700 leading-relaxed text-base sm:text-lg">
              <p>
                Dr. Peterson received his Doctorate of Dental Surgery (DDS) degree in 2008 from
                Marquette University. Since his graduation, he has continued his education through
                acquiring several specialty certifications and credentials. He has extensive
                training in dental implant placement for single teeth as well as
                implant-supported dentures and bridges. Dr. Peterson has also acquired advanced
                training and practice in Endodontics (root canal therapy).
              </p>
              <p>
                In addition to his collegiate and post-graduation certificate training, Dr.
                Peterson has successfully completed the 2-Year Progressive Orthodontic Seminar,
                giving him advanced training in the most up-to-date treatment and technologies for
                orthodontics. He is also a certified Invisalign provider. This experience has left
                him with a love for changing and improving smiles.
              </p>
              <p>
                Dr. Peterson continues to pursue continuing education in many areas of dentistry
                with the optimal goal of keeping his education and practice at the cutting edge of
                dental care. He opened his practice, River Crossing Family Dental, in 2010.
                Nestled in Riverton, Utah, he enjoys serving the community by providing quality
                dental care to all of his patients.
              </p>
              <p>
                Dr. Peterson is married to his beautiful wife Mandie, and they have 4 children
                together. Originally from St. Louis, he moved to Utah after completing his
                education in Milwaukee and serving a religious mission in Arizona. Hiking,
                basketball, volleyball, and spending time with family are among his passions other
                than dentistry.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team grid */}
      <section className="bg-brand-cream py-16 sm:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
          <div className="text-center mb-10 space-y-3">
            <p className="text-sm font-bold tracking-widest uppercase text-brand-coral">
              Our Team
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold text-brand-navy">
              The people you&rsquo;ll see when you visit.
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {team.map((member) => (
              <div
                key={member.name}
                className="rounded-3xl bg-white overflow-hidden shadow-sm"
              >
                <div className="relative aspect-[3/4]">
                  <Image
                    src={member.image}
                    alt={`${member.name} — ${member.role}`}
                    fill
                    sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                    className="object-cover"
                  />
                </div>
                <div className="p-5 text-center space-y-1">
                  <h3 className="text-xl font-bold text-brand-navy">{member.name}</h3>
                  <p className="text-sm text-slate-600">{member.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
