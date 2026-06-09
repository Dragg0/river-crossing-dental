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
  detailsEyebrow: string;
  detailsHeading: string;
  detailsNote?: string;
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
    finePrint: "New patients only. Routine prophylaxis cleaning only.",
    image: "/images/specials/cleaning-family.webp",
    imageAlt: "Three generations of a family laughing outdoors",
    intro:
      "At River Crossing Family Dental in Riverton, UT, we believe everyone deserves a beautiful, confident smile — and routine professional cleanings and exams are essential to oral wellness, even if you brush and floss regularly. Our team removes plaque, tartar, and food debris from hard-to-reach areas that can otherwise lead to gum disease and tooth decay.",
    detailsEyebrow: "What the $89 covers",
    detailsHeading: "Your preventive new-patient visit.",
    detailsNote:
      "This special includes a routine prophylaxis cleaning. If your exam shows active gum disease and you need periodontal therapy or a deep cleaning, our team will explain the recommended care and cost before treatment.",
    includes: [
      {
        label: "Routine prophylaxis cleaning",
        description:
          "A preventive cleaning for patients without active periodontal disease.",
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
    image: "/images/specials/exam-xray.webp",
    imageAlt: "Dentist reviewing a dental X-ray on a monitor",
    intro:
      "Are you experiencing a dental emergency? Our experienced team provides the care you need, when you need it. We reserve time in our daily schedule so we can see urgent patients the same day whenever possible.",
    detailsEyebrow: "What the $49 covers",
    detailsHeading: "An emergency exam and necessary X-ray.",
    detailsNote:
      "Treatment recommended after the exam — including fillings, crowns, root canal therapy, or extraction — is not included in the $49 special. We will explain your options and costs before beginning treatment.",
    includes: [
      {
        label: "Problem-focused emergency exam",
        description:
          "The dentist evaluates the source of your pain, injury, swelling, or other urgent concern.",
      },
      {
        label: "Necessary digital X-ray",
        description:
          "Diagnostic imaging of the problem area helps us identify the cause and recommend next steps.",
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
    image: "/images/specials/ortho-consult-aligners.webp",
    imageAlt: "Two clear orthodontic aligners held to form a heart shape",
    intro:
      "Searching for top-quality orthodontic care for your family in Riverton, UT? River Crossing Family Dental offers a variety of orthodontic options so patients can decide what's best for them. Our free consultation lets us learn about the patient's needs and determine the perfect treatment.",
    detailsEyebrow: "What the consultation includes",
    detailsHeading: "A no-cost orthodontic evaluation.",
    detailsNote:
      "Orthodontic treatment and appliances are not included in the complimentary consultation. If treatment is recommended, we will review the plan and cost with you.",
    includes: [
      {
        label: "Smile and bite evaluation",
        description:
          "We evaluate alignment, spacing, bite concerns, and your goals for treatment.",
      },
      {
        label: "Treatment recommendations",
        description:
          "We discuss appropriate options, which may include braces, Invisalign®, or HealthyStart®.",
      },
      {
        label: "Questions and next steps",
        description:
          "You will have time to ask questions and understand what comes next if you choose treatment.",
      },
    ],
  },
];
