export const siteConfig = {
  name: "River Crossing Family Dental & Orthodontics",
  shortName: "River Crossing Family Dental",
  tagline: "Comfortable, family-friendly dental care for every age and every smile",
  description:
    "Quality modern dentistry for the entire family in Riverton, UT. General dentistry, cosmetic, orthodontics, dental implants, and emergency dental care.",
  url: "https://www.rivercrossingdental.com",

  address: {
    street: "4121 13400 S Unit A",
    city: "Riverton",
    state: "UT",
    zip: "84096",
    full: "4121 13400 S Unit A, Riverton, UT 84096",
  },

  geo: {
    latitude: 40.5071860,
    longitude: -111.9911797,
  },

  phone: {
    display: "801-254-8812",
    tel: "+18012548812",
  },

  booking: "https://book.modento.io/river-crossing-dental",

  hours: [
    { day: "Monday", open: "8:00", close: "17:00", display: "8:00 AM – 5:00 PM" },
    { day: "Tuesday", open: "8:00", close: "16:00", display: "8:00 AM – 4:00 PM" },
    { day: "Wednesday", open: "8:00", close: "17:00", display: "8:00 AM – 5:00 PM" },
    { day: "Thursday", open: "8:00", close: "16:00", display: "8:00 AM – 4:00 PM" },
    { day: "Friday", open: null, close: null, display: "Closed" },
    { day: "Saturday", open: null, close: null, display: "Closed" },
    { day: "Sunday", open: null, close: null, display: "Closed" },
  ],

  social: {
    facebook: "https://www.facebook.com/rivercrossingdental/",
    instagram: "https://www.instagram.com/rivercrossingfamilydental/",
    youtube: "https://www.youtube.com/channel/UCnoW2OfytUXHuyw2lRPOtwA",
    yelp: "https://www.yelp.com/biz/river-crossing-family-dental-riverton",
  },

  googleMapsEmbed:
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3033.5566454199684!2d-111.99117968460132!3d40.507185979354674!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x875285b28bbe5f9b%3A0x41f4ade821c0c5ad!2sRiver%20Crossing%20Dental!5e0!3m2!1sen!2sus!4v1635275938400!5m2!1sen!2sus",

  googleMapsDirections:
    "https://www.google.com/maps/dir//River+Crossing+Family+Dental+%26+Orthodontics+4121+13400+S+Unit+A,+Riverton,+UT+84096",
} as const;

export type NavItem = {
  label: string;
  href: string;
  children?: { label: string; href: string }[];
};

export const nav: NavItem[] = [
  {
    label: "About",
    href: "/meet-the-team",
    children: [
      { label: "Meet The Team", href: "/meet-the-team" },
      { label: "Financing & Insurance", href: "/financing-insurance" },
      { label: "Advanced Technology", href: "/advanced-technology" },
    ],
  },
  {
    label: "Services",
    href: "/services/general-dentistry",
    children: [
      { label: "General Dentistry", href: "/services/general-dentistry" },
      { label: "Cosmetic Dentistry", href: "/services/cosmetic-dentistry" },
      { label: "Icon White Spot Treatment", href: "/services/cosmetic-dentistry/icon" },
      { label: "Dental Implants", href: "/services/dental-implants" },
      { label: "Orthodontics", href: "/services/orthodontics" },
      { label: "Invisalign Teen", href: "/services/orthodontics/invisalign-teen" },
      { label: "Invisalign First", href: "/services/orthodontics/invisalign-first" },
      { label: "Emergency Dentistry", href: "/services/emergency-dentistry" },
    ],
  },
  {
    label: "Specials",
    href: "/specials/cleaning",
    children: [
      { label: "$89 Cleaning, Exam & X-Ray", href: "/specials/cleaning" },
      { label: "$49 Emergency Exam & X-Ray", href: "/specials/exam" },
      { label: "Complimentary Ortho Consult", href: "/specials/ortho-consult" },
    ],
  },
  { label: "Reviews", href: "/reviews" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
];
