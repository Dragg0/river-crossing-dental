export type OfferTestimonial = {
  quote: string;
  author: string;
};

export type Offer = {
  slug: string;
  title: string;
  price: string;
  tagline: string;
  description: string;
  finePrint: string;
  image: string;
  imageAlt: string;
  intro: string;
  includes?: { label: string; description: string }[];
  features?: string[];
  testimonial?: OfferTestimonial;
};

export const offers: Offer[] = [
  {
    slug: "cleaning",
    title: "$89 Cleaning, Exam & X-Ray",
    price: "$89",
    tagline: "Cleaning, Exam & X-Ray",
    description:
      "A complete new-patient visit at a price that makes it simple to get started on your oral health journey.",
    finePrint: "New patients only.",
    image: "/images/specials/family-dinner.webp",
    imageAlt: "Family laughing together at dinner",
    intro:
      "At River Crossing Family Dental in Riverton, UT, we believe everyone deserves a beautiful, confident smile — and routine professional cleanings and exams are essential to oral wellness, even if you brush and floss regularly. Our team removes plaque, tartar, and food debris from hard-to-reach areas that can otherwise lead to gum disease and tooth decay.",
    includes: [
      {
        label: "Professional cleaning",
        description:
          "Plaque and tartar removed from every surface of your teeth, including the spots a toothbrush can't reach.",
      },
      {
        label: "Thorough exam",
        description:
          "We inspect each tooth and your gum tissue, looking for the earliest signs of decay or gum disease.",
      },
      {
        label: "Digital X-rays",
        description:
          "Low-radiation imaging of the jawbone, tooth roots, and developing cavities you can't see on the surface.",
      },
    ],
    features: [
      "True family practice — patients of all ages welcome.",
      "Advanced diagnostic technology for accurate, comfortable care.",
      "Patient involvement and education at every step.",
    ],
  },
  {
    slug: "exam",
    title: "$49 Emergency Exam & X-Ray",
    price: "$49",
    tagline: "Emergency Exam & X-Ray",
    description:
      "Dental emergencies are stressful enough without worrying about the cost. Get the urgent care you need right away.",
    finePrint: "New patients only.",
    image: "/images/specials/family-laundry.webp",
    imageAlt: "Parent and children spending time together at home",
    intro:
      "Are you experiencing a dental emergency? Our experienced team provides the care you need, when you need it. We reserve time in our daily schedule so we can see urgent patients the same day whenever possible.",
    includes: [
      {
        label: "Toothache relief",
        description: "We diagnose and often treat same-day to get you out of pain.",
      },
      {
        label: "Emergency tooth repair",
        description:
          "Filling or crown for a chipped or broken tooth to prevent further damage.",
      },
      {
        label: "Root canal therapy",
        description:
          "After getting you numb, we remove infected pulp and relieve pain.",
      },
      {
        label: "Dental extractions",
        description:
          "If a tooth is beyond repair, we'll create a treatment plan that's best for you.",
      },
    ],
    testimonial: {
      quote:
        "I was in so much pain, I didn't know what to do. I called and they were able to see me right away. Dr. Peterson was so kind and took the time to explain everything to me. I would definitely recommend your office to anyone who has a dental emergency!",
      author: "Rebecca S.",
    },
  },
  {
    slug: "ortho-consult",
    title: "Complimentary Orthodontic Consultation",
    price: "Free",
    tagline: "Orthodontic Consultation",
    description:
      "Curious about Invisalign or other orthodontic options? Come in for a no-cost consultation and find out what treatment could do for your smile.",
    finePrint: "New patients only.",
    image: "/images/service/orthodontics.webp",
    imageAlt: "Teen smiling with Invisalign-compatible smile",
    intro:
      "Searching for top-quality orthodontic care for your family in Riverton, UT? River Crossing Family Dental offers a variety of orthodontic options so patients can decide what's best for them. Our free consultation lets us learn about the patient's needs and determine the perfect treatment.",
    includes: [
      {
        label: "Traditional braces",
        description:
          "Modern metal brackets and wires — smaller, more comfortable, and more customizable than ever.",
      },
      {
        label: "Invisalign®",
        description:
          "Translucent, removable clear aligners — virtually invisible and convenient. Including Invisalign Teen and Invisalign First.",
      },
      {
        label: "HealthyStart®",
        description:
          "Gentle orthodontic program for children ages 6–12, often worn during sleep.",
      },
    ],
  },
];
