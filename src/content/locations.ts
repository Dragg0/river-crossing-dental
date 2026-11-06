import { siteConfig } from "@/lib/site-config";

export type RichPart =
  | string
  | { type: "phone" }
  | { type: "link"; href: string; label: string };

export type VisitShift = { open: string; close: string };

export type VisitDay = {
  day: string;
  shifts: VisitShift[];
  display: string;
};

export type LocationServiceLink = {
  href: string;
  label: string;
  detail?: string;
};

export type LocationOffer = {
  href: string;
  title: string;
  detail: string;
};

export type LocationFaq = {
  question: string;
  answer: RichPart[];
};

export type LocationPage = {
  slug: string;
  town: string;
  /** Page title before the site title template adds the practice name. */
  title: string;
  description: string;
  h1: string;
  paragraphs: RichPart[][];
  services: LocationServiceLink[];
  offers: LocationOffer[];
  faqs: LocationFaq[];
};

/**
 * Monday and Wednesday include the 12–1 lunch break Dr. Peterson confirmed.
 * Office hours in site-config still show one continuous range for those days,
 * so these pages keep the split schedule in the same display style and
 * openingHoursSpecification shape the rest of the site already uses.
 */
export const visitHours: VisitDay[] = [
  {
    day: "Monday",
    shifts: [
      { open: "8:00", close: "12:00" },
      { open: "13:00", close: "17:00" },
    ],
    display: "8:00 AM – 12:00 PM, 1:00 PM – 5:00 PM",
  },
  {
    day: "Tuesday",
    shifts: [{ open: "8:00", close: "16:00" }],
    display: "8:00 AM – 4:00 PM",
  },
  {
    day: "Wednesday",
    shifts: [
      { open: "8:00", close: "12:00" },
      { open: "13:00", close: "17:00" },
    ],
    display: "8:00 AM – 12:00 PM, 1:00 PM – 5:00 PM",
  },
  {
    day: "Thursday",
    shifts: [{ open: "8:00", close: "16:00" }],
    display: "8:00 AM – 4:00 PM",
  },
  { day: "Friday", shifts: [], display: "Closed" },
  { day: "Saturday", shifts: [], display: "Closed" },
  { day: "Sunday", shifts: [], display: "Closed" },
];

const phone: RichPart = { type: "phone" };

function link(href: string, label: string): RichPart {
  return { type: "link", href, label };
}

const booking = siteConfig.booking;
const directions = siteConfig.googleMapsDirections;
const address = siteConfig.address.full;
const street = siteConfig.address.street;

const general = "/services/general-dentistry";
const emergency = "/services/emergency-dentistry";
const invisalign = "/services/orthodontics/invisalign";
const ortho = "/services/orthodontics";
const cosmetic = "/services/cosmetic-dentistry";
const implants = "/services/dental-implants";
const cleaning = "/specials/cleaning";
const exam = "/specials/exam";
const consult = "/specials/ortho-consult";

const cleaningOffer: LocationOffer = {
  href: cleaning,
  title: "$89 Cleaning, Exam & X-Ray",
  detail: "New patients only. Routine prophylaxis cleaning only.",
};

const examOfferDetailed: LocationOffer = {
  href: exam,
  title: "$49 Emergency Exam & X-Ray",
  detail: "New patients only. Treatment (fillings, crowns, etc.) priced separately.",
};

const examOffer: LocationOffer = {
  href: exam,
  title: "$49 Emergency Exam & X-Ray",
  detail: "New patients only. Treatment priced separately.",
};

const consultOfferDetailed: LocationOffer = {
  href: consult,
  title: "Free Orthodontic / Invisalign Consult",
  detail:
    "New patients only. Treatment and appliances priced separately. Some Invisalign cases can finish in as little as six months; results vary.",
};

const consultOffer: LocationOffer = {
  href: consult,
  title: "Free Orthodontic / Invisalign Consult",
  detail:
    "New patients only. Treatment priced separately. As short as six months for some cases; results vary.",
};

const coreServices: LocationServiceLink[] = [
  { href: general, label: "General Dentistry" },
  { href: emergency, label: "Emergency Dentistry" },
  { href: invisalign, label: "Invisalign" },
  { href: ortho, label: "Orthodontics" },
  { href: cosmetic, label: "Cosmetic Dentistry" },
  { href: implants, label: "Dental Implants" },
];

export const locations: LocationPage[] = [
  {
    slug: "south-jordan",
    town: "South Jordan",
    title: "Dentist in South Jordan, UT",
    description: `Dentist near South Jordan? Dr. John Peterson welcomes Daybreak families in Riverton. Cleanings, Invisalign, emergencies. Call ${siteConfig.phone.display}.`,
    h1: "Dentist near South Jordan — a short drive to Riverton",
    paragraphs: [
      [
        "If you live in South Jordan — whether you are near Daybreak, along South Jordan Parkway, or closer to Redwood Road — you do not have to drive into the middle of the valley for family dental care. River Crossing Family Dental is just south of you in Riverton, a short drive down Redwood Road (SR-68) or via Bangerter Highway to 13400 South.",
      ],
      [
        "Dr. John Peterson and our team see patients of every age under one roof: cleanings and checkups, fillings, crowns, Invisalign clear aligners, dental implants, and same-day emergency visits when something hurts. We keep the tone calm and plainspoken. You will know what we recommend and why before any treatment starts.",
      ],
      [
        `South Jordan has grown quickly around Daybreak’s trails and lakes, the shops near South Jordan Gateway, and the neighborhoods west of the Jordan River. Families here often want three things from a dentist: a location that fits into a school-morning schedule, room for a toothache that will not wait, and clear talk about cost. That is the kind of practice we run. Our office is at ${address} — easy to find from Mountain View Corridor as well as from Redwood and Bangerter.`,
      ],
      [
        "For a first visit, many new patients choose our $89 cleaning, exam, and X-ray special (routine prophylaxis cleaning only). If you are in pain, ask about the $49 emergency exam and X-ray. Treatment such as fillings, crowns, or root canals is always explained and priced separately. Thinking about a straighter smile? Dr. Peterson is a certified Invisalign provider. New patients can schedule a free orthodontic consultation; aligners and treatment are priced on their own. Some Invisalign cases can finish in as little as six months, and results vary based on your bite and how consistently you wear the trays.",
      ],
      [
        "You can ",
        link(booking, "book online"),
        " any time through Modento, or call ",
        phone,
        ". After hours and on weekends, Eve, our AI receptionist, can help new patients schedule. Appointments themselves are during our Monday–Thursday office hours. We also keep space in the daily schedule for urgent visits whenever possible.",
      ],
      [
        "Whether you are coming from a home off 10400 South, a Daybreak evening walk, or a commute along South Jordan Parkway, we would be glad to be your family’s dental home in the southwest valley. Bring the kids, bring your questions, and we will take it one step at a time.",
      ],
      [
        "Parking is straightforward at the Riverton office, and our front desk can help with insurance questions when you arrive. If you are comparing dentists in South Jordan and the surrounding cities, visit our ",
        link("/reviews", "reviews"),
        " page, meet ",
        link("/meet-the-team", "Dr. John Peterson"),
        ", or jump straight to ",
        link(booking, "Book Online"),
        ". We are ready when you are.",
      ],
    ],
    services: [
      {
        href: general,
        label: "General Dentistry",
        detail: "Cleanings, exams, fillings, gum care, root canals",
      },
      {
        href: emergency,
        label: "Emergency Dentistry",
        detail: "Toothaches, broken teeth, lost crowns; same-day when possible",
      },
      {
        href: invisalign,
        label: "Invisalign",
        detail:
          "Clear aligners for teens and adults; Dr. John Peterson is a certified Invisalign provider",
      },
      {
        href: ortho,
        label: "Orthodontics",
        detail: "Braces, Invisalign Teen, Invisalign First, HealthyStart",
      },
      {
        href: cosmetic,
        label: "Cosmetic Dentistry",
        detail: "Whitening, veneers, bonding, white-spot treatment",
      },
      {
        href: implants,
        label: "Dental Implants",
        detail: "Single implants and implant-supported bridges",
      },
    ],
    offers: [cleaningOffer, examOfferDetailed, consultOfferDetailed],
    faqs: [
      {
        question: "How far are you from South Jordan?",
        answer: [
          "Our Riverton office is a short drive south of South Jordan — typically via Redwood Road or Bangerter Highway to 13400 South. Exact time depends on where you start in South Jordan and on traffic.",
        ],
      },
      {
        question: "Do you see kids and adults from Daybreak?",
        answer: [
          "Yes. We are a true family practice. Children, teens, and adults are welcome for cleanings, orthodontics (including Invisalign Teen and Invisalign First), and urgent visits.",
        ],
      },
      {
        question: "What if I have a toothache tonight?",
        answer: [
          "Call ",
          phone,
          ". Eve can help new patients schedule after hours. We keep room in the Monday–Thursday schedule for same-day emergency visits whenever possible. For trouble breathing or swallowing, or swelling around the eye or neck, go to the ER or call 911.",
        ],
      },
      {
        question: "Can I use insurance or book without calling?",
        answer: [
          "Ask us about your benefits when you schedule. You can also ",
          link(booking, "book online"),
          " through Modento any time.",
        ],
      },
    ],
  },
  {
    slug: "herriman",
    town: "Herriman",
    title: "Dentist in Herriman, UT",
    description: `Family dentist near Herriman. Dr. John Peterson offers cleanings, Invisalign, and emergency exams in Riverton. Call ${siteConfig.phone.display}.`,
    h1: "Family dentist near Herriman",
    paragraphs: [
      [
        "Herriman sits against the Oquirrh foothills, with Mountain View Corridor (SR-85) as the north–south spine and neighborhoods spreading toward Butterfield Canyon and Yellow Fork. When you need a dentist, you should not have to cross the whole Salt Lake Valley. River Crossing Family Dental is a short drive east in Riverton — close enough for a before-school cleaning and for an urgent visit when a tooth breaks.",
      ],
      [
        "Dr. John Peterson leads a family practice that cares for kids, teens, and adults in one place. That matters in a growing city like Herriman, where one household might need a hygienist visit for a child, a free Invisalign consult for a teenager, and a calm emergency visit for a parent — without three different offices on three different calendars.",
      ],
      [
        `From most of Herriman you can reach us via 13400 South, Rosecrest connections toward Mountain View Corridor, or surface streets that lead to Redwood Road. Our Riverton office is at ${street}. The drive is part of daily life for many west-side families who already shop or work along those same corridors.`,
      ],
      [
        "We are a certified Invisalign provider. At a free orthodontic consultation for new patients, we look at your smile and bite, talk about goals, and discuss whether clear aligners, braces, or another option fits best. Treatment and appliances are priced separately. Some Invisalign cases can be finished in as little as six months; results vary, and we will be honest about a realistic timeline before you decide.",
      ],
      [
        "Everyday care starts simply. New patients can use our $89 cleaning, exam, and X-ray visit (routine prophylaxis cleaning only). If something hurts today — a cracked tooth, a lost crown, swelling, or a toothache that keeps you up — call about the $49 emergency exam and X-ray. We keep room in the Monday–Thursday schedule for same-day emergencies whenever we can. Eve, our AI receptionist, answers after hours so new patients can still schedule nights and weekends.",
      ],
      [
        "Herriman families deserve dental care that feels neighborly, not rushed. Come see us in Riverton. Ask about financing and insurance at your visit, bring your questions, and we will map out next steps together.",
      ],
      [
        "Many Herriman patients also appreciate that general dentistry, orthodontics, and emergency care live on the same team. Explore ",
        link(general, "general dentistry"),
        ", ",
        link(invisalign, "Invisalign"),
        ", or ",
        link(emergency, "emergency dentistry"),
        " for details, then book a time that fits your week. We look forward to meeting you.",
      ],
    ],
    services: [
      { href: general, label: "General Dentistry" },
      { href: emergency, label: "Emergency Dentistry" },
      {
        href: invisalign,
        label: "Invisalign",
        detail: "Certified provider; Teen and First options available",
      },
      { href: ortho, label: "Orthodontics" },
      { href: cosmetic, label: "Cosmetic Dentistry" },
      { href: implants, label: "Dental Implants" },
    ],
    offers: [cleaningOffer, examOffer, consultOffer],
    faqs: [
      {
        question: "Is River Crossing Dental convenient from Herriman?",
        answer: [
          "Yes. We are in Riverton, a short drive east of Herriman via 13400 South and nearby connectors to Mountain View Corridor. Many Herriman patients make the trip for cleanings, Invisalign, and emergency care.",
        ],
      },
      {
        question: "Do you treat dental emergencies for Herriman patients?",
        answer: [
          "We welcome urgent visits for toothaches, broken teeth, lost crowns, and similar problems, and we try to see you the same day when we can. Call ",
          phone,
          ". New patients can start with the ",
          link(exam, "$49 emergency exam and X-ray"),
          ".",
        ],
      },
      {
        question: "Can my teenager get Invisalign?",
        answer: [
          "Dr. John Peterson is a certified Invisalign provider. We offer Invisalign for adults, Invisalign Teen, and Invisalign First for younger children. Start with a ",
          link(consult, "free orthodontic consultation"),
          ".",
        ],
      },
      {
        question: "How do I book if I work during the day?",
        answer: [
          link(booking, "Book online"),
          " any time, or call and leave the scheduling to Eve after hours. Visits are Monday–Thursday.",
        ],
      },
    ],
  },
  {
    slug: "bluffdale",
    town: "Bluffdale",
    title: "Dentist in Bluffdale, UT",
    description: `Bluffdale families: see Dr. John Peterson next door in Riverton for cleanings, Invisalign, and emergencies. Call ${siteConfig.phone.display}.`,
    h1: "Dentist for Bluffdale families — right next door in Riverton",
    paragraphs: [
      [
        `Bluffdale and Riverton share a border, the Jordan River corridor, and many of the same roads. If you live near Porter Rockwell Boulevard, along Bangerter Highway, or closer to Redwood Road and the Jordan Narrows, River Crossing Family Dental is practically a neighbor. Our office is at ${street} in Riverton — a short hop north of most Bluffdale addresses.`,
      ],
      [
        "Dr. John Peterson built the practice for whole families: a child’s first cleaning, a teen’s Invisalign consult, an adult’s implant conversation, and the sudden toothache that shows up on a school night. You get one trusted team instead of bouncing between specialists across the south valley.",
      ],
      [
        "Bluffdale’s setting — open space, views of the Wasatch and Oquirrh ranges, and quick links to I-15, Mountain View Corridor, and Bangerter — makes a nearby Riverton dentist an easy choice for busy households. Parents often tell us they want someone close enough that a same-day emergency visit is realistic, and clear enough about cost that there are no surprises in the chair. We work that way every day.",
      ],
      [
        "New patients can start with an $89 cleaning, exam, and X-ray for routine care (prophylaxis cleaning only), or a $49 emergency exam and X-ray when something is wrong. Fillings, crowns, root canals, and extractions are priced separately after we explain the plan. Curious about straighteners? Dr. Peterson is a certified Invisalign provider, and the orthodontic consultation is free for new patients. Treatment is separate; some Invisalign cases finish in as little as six months, and results vary.",
      ],
      [
        "Call ",
        phone,
        " any time. Eve, our AI receptionist, helps new patients schedule after hours and on weekends. Appointments are Monday through Thursday, and we reserve time for urgent visits whenever the schedule allows. From Porter Rockwell Boulevard to the neighborhoods near the river, we would love to welcome your Bluffdale household.",
      ],
      [
        "Living in Bluffdale means you are already minutes from Riverton’s west side. That proximity is why so many nearby households choose a Riverton dental home instead of driving north through heavier traffic. Read more about our ",
        link(emergency, "emergency"),
        " and ",
        link(invisalign, "Invisalign"),
        " care, check current ",
        link(cleaning, "specials"),
        ", or call us today. Your neighbors at River Crossing are ready to help.",
      ],
      [
        "We also welcome second opinions and patients who simply want a calmer dental experience. Headphones, massaging chairs, and other comfort options are part of how we help nervous visitors settle in — ask the team what is available for your visit. Your comfort matters as much as the clinical plan.",
      ],
    ],
    services: [
      { href: general, label: "General Dentistry" },
      {
        href: emergency,
        label: "Emergency Dentistry",
        detail: "Same-day when possible",
      },
      { href: invisalign, label: "Invisalign" },
      { href: ortho, label: "Orthodontics" },
      { href: cosmetic, label: "Cosmetic Dentistry" },
      { href: implants, label: "Dental Implants" },
    ],
    offers: [cleaningOffer, examOffer, consultOffer],
    faqs: [
      {
        question: "Are you actually close to Bluffdale?",
        answer: [
          "Yes. Riverton borders Bluffdale. Most patients reach us in a short drive via 13400 South, Bangerter Highway, Redwood Road, or Porter Rockwell Boulevard connections.",
        ],
      },
      {
        question: "What should I do for a knocked-out or broken tooth?",
        answer: [
          "Call us right away at ",
          phone,
          ". For a knocked-out tooth, gently rinse it, try to place it back if you can, or store it in milk, and come in as soon as possible. See our ",
          link(emergency, "emergency dentistry"),
          " page for more first-aid tips. Life-threatening swelling or breathing trouble belongs in the ER.",
        ],
      },
      {
        question: "Do you take new Bluffdale patients without a referral?",
        answer: [
          "Yes. ",
          link(booking, "Book online"),
          " or call. Mention the new-patient special you want when you schedule.",
        ],
      },
      {
        question: "Can I schedule after 5 PM?",
        answer: [
          "Eve can take new-patient scheduling calls nights and weekends. The visit itself will be during Monday–Thursday hours.",
        ],
      },
    ],
  },
  {
    slug: "west-jordan",
    town: "West Jordan",
    title: "Dentist near West Jordan, UT",
    description: `Dentist near West Jordan: Dr. John Peterson in Riverton for family care, Invisalign, and emergencies. Call ${siteConfig.phone.display}.`,
    h1: "Dentist near West Jordan — family care in Riverton",
    paragraphs: [
      [
        `West Jordan stretches from the Jordan River to the Oquirrh foothills, with Bangerter Highway, Redwood Road, and Mountain View Corridor carrying most daily traffic. When you search for a dentist near West Jordan, you want someone a reasonable drive south — not a cross-town trek. River Crossing Family Dental sits in Riverton at ${street}, a straightforward trip down Bangerter or Redwood for many West Jordan neighborhoods.`,
      ],
      [
        "Dr. John Peterson and our team offer full-family dentistry: preventive cleanings, restorative work, cosmetic options, dental implants, orthodontics, and emergency care. That mix helps busy households near Jordan Landing, Gardner Village, or the west-side foothills keep care in one place. We explain options in plain language and share costs before treatment begins.",
      ],
      [
        "Getting here is usually simple. From central West Jordan, Bangerter Highway (SR-154) runs south toward 13400 South. Redwood Road (SR-68) is another direct path. From farther west, Mountain View Corridor connects toward the south valley. Exact drive time depends on where you start and on traffic; use our ",
        link(directions, "Google directions"),
        " link when you are ready to visit.",
      ],
      [
        "New patients often begin with our $89 cleaning, exam, and X-ray visit, or the $49 emergency exam and X-ray when something hurts. If you are thinking about clear aligners, Dr. Peterson is a certified Invisalign provider. The orthodontic consultation is free for new patients; treatment is separate. Some Invisalign cases can finish in as little as six months, and results vary by smile and how consistently aligners are worn.",
      ],
      [
        link(booking, "Book online"),
        " through Modento whenever it is convenient, or call ",
        phone,
        ". Eve, our AI receptionist, helps new patients schedule nights and weekends. Appointments run Monday through Thursday. We keep space for urgent visits whenever the day allows.",
      ],
      [
        "If West Jordan is home and you want a warm, modern dental office a short drive south, we would be glad to meet you — kids, teens, adults, and the questions that come with each stage.",
      ],
      [
        "West Jordan is one of Utah’s larger cities, and dental options are everywhere — but convenience still matters. A short drive south to Riverton often beats a longer trip into denser parts of the valley, especially for families coordinating school drop-offs and work schedules. When you are ready, ",
        link(booking, "book online"),
        ", call ",
        phone,
        ", or browse our ",
        link(cleaning, "specials"),
        " and ",
        link(general, "service pages"),
        ". We would love to earn your trust.",
      ],
      [
        "Whether you are coming from near South Valley Regional Airport, the shops around Jordan Landing, or a foothill neighborhood along SR-111, the path to 13400 South is familiar for south-valley drivers. Tell us how you heard about us when you arrive — it helps us know which local search and neighbor referrals are working.",
      ],
    ],
    services: coreServices,
    offers: [cleaningOffer, examOffer, consultOffer],
    faqs: [
      {
        question: "How do I get to you from West Jordan?",
        answer: [
          "Most patients come south on Bangerter Highway (SR-154) or Redwood Road (SR-68) to 13400 South in Riverton. Mountain View Corridor also connects western West Jordan toward the south valley. Use ",
          link(directions, "Google directions"),
          " for turn-by-turn from your address.",
        ],
      },
      {
        question: "Do you handle dental emergencies?",
        answer: [
          "Yes. Call ",
          phone,
          ". We aim for same-day visits when we can. New patients can use the ",
          link(exam, "$49 emergency exam and X-ray"),
          ". Details and first-aid tips: ",
          link(emergency, "Emergency Dentistry"),
          ".",
        ],
      },
      {
        question: "Is Invisalign available for adults who work in West Jordan?",
        answer: [
          "Yes. Adults and teens are welcome. Start with a ",
          link(consult, "free consult"),
          ". Wear time and case complexity shape the timeline; some finishes are as short as six months, and results vary.",
        ],
      },
      {
        question: "Will you see my whole family?",
        answer: [
          "That is our model — kids through adults, cleanings through implants and orthodontics, in one Riverton office.",
        ],
      },
    ],
  },
];

export function getLocation(slug: string) {
  return locations.find((location) => location.slug === slug);
}
