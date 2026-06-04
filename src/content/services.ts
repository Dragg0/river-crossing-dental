export type ListItem = string | { label: string; description: string };

export type ServiceSection = {
  heading: string;
  body?: string;
  list?: ListItem[];
  ordered?: boolean;
};

export type Service = {
  slug: string;
  title: string;
  description: string;
  icon: string;
  heroImage?: string;
  heroImageAlt?: string;
  intro: string;
  sections: ServiceSection[];
  closingHeading?: string;
  closingBody?: string;
};

export const services: Service[] = [
  {
    slug: "general-dentistry",
    title: "General Dentistry",
    description:
      "Family-friendly care for patients of all ages — cleanings, exams, gum therapy, root canals, and more.",
    icon: "shield",
    intro:
      "We believe the key to great dental health is outstanding oral care, and that's exactly what you'll find at River Crossing Family Dental. Our general dentistry services help you advance the health of your teeth and gums, and learn new ways to improve your hygiene routine at home. When you choose our team, we put the oral health and wellbeing of your family first.",
    sections: [
      {
        heading: "Cleanings & Exams",
        body: "A routine professional cleaning and exam every six months is the foundation of a healthy, sparkling smile. We remove plaque and tartar from every surface of your teeth, including the difficult-to-reach places. An exam lets us identify issues in their earliest stages — we observe the teeth and gum tissue and take X-rays so we can monitor changes over time and catch small cavities before they become big ones.",
      },
      {
        heading: "Gum Disease Therapy",
        body: "Gum disease affects nearly 65 million adults in the U.S. and is the leading cause of tooth loss. We take it seriously and offer the tools and resources you need to fight it. The three stages:",
        ordered: true,
        list: [
          {
            label: "Gingivitis",
            description:
              "First stage — bleeding, tender, swollen gums; plaque and tartar at the gum line cause gums to pull away from the tooth.",
          },
          {
            label: "Periodontitis",
            description:
              "Gums recede further, bacteria reaches the bone below the gum line. Irreversible but manageable; symptoms include swelling, bone loss, and tooth mobility.",
          },
          {
            label: "Advanced Periodontitis",
            description:
              "Most advanced stage — many patients begin losing teeth as bone structure wears away. Severe inflammation, pus, and significant gum recession.",
          },
        ],
      },
      {
        heading: "Root Canal Therapy",
        body: "If you have a severely decayed or damaged tooth, a root canal may relieve pain and restore your smile. The area is completely numbed for comfort. We remove the decay, create a tiny access hole to reach the pulp, remove the inflamed pulp, clean the interior, and fill with biocompatible gutta-percha — then seal and cover with a crown. With our SprintRay Midas chairside 3D printer, we can print and place a permanent same-day crown — treating and restoring your smile in a single visit.",
      },
      {
        heading: "Sleep Apnea Treatment",
        body: "Sleep apnea interferes with breathing during sleep, most commonly due to an obstruction of oral tissues. We create custom-built oral devices — similar to a retainer — worn while resting, which reposition the lower jaw forward to open the airway for a full night of rest.",
      },
      {
        heading: "Pediatric Dentistry",
        body: "Our practice makes dentistry fun and educational for your little ones. We have the knowledge, tools, and resources to keep your child's oral health on the right track now and into the future.",
      },
      {
        heading: "Emergency Dentistry",
        body: "Emergencies can happen at any time. Our office handles emergency situations with care and attentiveness, and we make every effort to soothe patients who are scared or stressed. If you or a family member needs an emergency dentist, call our office today.",
      },
    ],
    closingHeading: "An office designed for you and your family.",
    closingBody:
      "We welcome all patients — young, older, full families, and individuals. When you choose our practice, you choose dental excellence for the entire family.",
  },
  {
    slug: "cosmetic-dentistry",
    title: "Cosmetic Dentistry",
    description:
      "Brighten and enhance your smile — whitening, veneers, bonding, crowns, and white spot treatment.",
    icon: "sparkles",
    heroImage: "/images/service/cosmetic.jpeg",
    heroImageAlt: "A confident person smiling — cosmetic dentistry results",
    intro:
      "Your smile should be the first thing people notice when you walk into a room — it radiates confidence and warmth, and it's just a beautiful feature. If there's something standing in the way of your smile goals, we want to hear about it. Our practice has multiple cosmetic dentistry treatment options to design the perfect smile, just for you.",
    sections: [
      {
        heading: "Tooth Bonding",
        body: "Cosmetic bonding uses composite resin — the same material used in fillings — applied to problem areas and customized to fit the shape and color of your tooth. We match the pigment with a color guide, apply and smooth the resin, cure it under LED light, and shape it for a seamless blend.",
      },
      {
        heading: "Teeth Whitening",
        body: "We offer professional whitening through two systems so you can pick what fits your needs and budget:",
        list: [
          {
            label: "ZOOM",
            description:
              "Lifts the color of teeth up to eight shades in a single 45-minute session. Gel is painted on and cured under LED light — safe even for sensitive smiles.",
          },
          {
            label: "Sinsational Smile",
            description:
              "More affordable than ZOOM with results in less time. Gel is cured under LED light for 20 minutes.",
          },
        ],
      },
      {
        heading: "Veneers",
        body: "Veneers are thin shells (composite or porcelain) attached to the surface of your teeth to transform color, size, shape, and overall appearance — applied in just two visits. A thin layer of outer enamel is prepared so veneers bond seamlessly. Porcelain veneers may last up to fifteen years; composite veneers five to seven. Care is simple: brush twice daily and floss once daily.",
      },
      {
        heading: "Cosmetic Crowns",
        body: "Crowns can save damaged teeth, preserve severe decay, and conceal cosmetic imperfections. The natural tooth is numbed and shaped so the crown fits over it. Our chairside 3D-printing technology (SprintRay Midas) lets us design, print, and place a permanent crown in a single visit — no temporary crowns, no second appointments, no weeks of waiting on a lab.",
      },
      {
        heading: "ICON White Spot Treatment",
        body: "White spots can form from excessive fluoride, orthodontic treatment, enamel thinning, or poor hygiene — and sometimes indicate a developing cavity. ICON resin painlessly penetrates the outer tooth layer, fills damaged pores to block cavity-causing bacteria, and blends discoloration with the natural tooth color — without invasive removal.",
      },
    ],
    closingHeading: "Your new smile, your way.",
    closingBody:
      "With our team by your side, we'll help you create the perfect smile. We listen to your goals and partner with you throughout the process.",
  },
  {
    slug: "dental-implants",
    title: "Dental Implants",
    description:
      "A durable, natural-looking solution for missing teeth — single implants, implant-supported bridges, and free consultations.",
    icon: "dentures",
    heroImage: "/images/service/implants.jpeg",
    heroImageAlt: "Illustration of a dental implant placed among healthy teeth",
    intro:
      "At River Crossing Family Dental in Riverton, UT, we offer dental implants as a powerful restorative treatment option for patients with missing teeth. Whether you have lost a single tooth or several, dental implants provide a durable, natural-looking solution that can transform both your smile and your quality of life. Call today to schedule your free consultation.",
    sections: [
      {
        heading: "What Are Dental Implants?",
        body: "Dental implants are small titanium posts surgically placed into the jawbone to replace the root of a missing tooth. Once the implant fuses with the bone (osseointegration), it creates a sturdy foundation for a custom restoration — crown, bridge, or denture. Unlike other options, implants restore the entire structure of the tooth from root to crown. With proper care, implants can last a lifetime.",
      },
      {
        heading: "Single Dental Implants",
        body: "A single implant has three components, with a 3D digital scan guiding precise placement. The post is designed to last a lifetime; the crown may need replacing every 10–15 years due to normal wear.",
        list: [
          {
            label: "Implant Post",
            description:
              "Titanium post surgically placed and left to heal for about 3 months to fuse with the bone.",
          },
          {
            label: "Abutment",
            description:
              "Attached after integration; connects the implant to the final restoration.",
          },
          {
            label: "Dental Crown",
            description:
              "A custom crown bonded to the abutment, restoring full function and appearance.",
          },
        ],
      },
      {
        heading: "Implant-Supported Bridges",
        body: "For several consecutive missing teeth, an implant-supported bridge anchors directly to implants rather than relying on adjacent healthy teeth. Implants are placed and healed, then a custom bridge is bonded to them. The advantages: it preserves neighboring teeth and provides a more stable, longer-lasting solution.",
      },
      {
        heading: "Advantages of Dental Implants",
        list: [
          {
            label: "Bone Preservation",
            description: "Implants stimulate the jawbone like natural roots, preventing bone loss.",
          },
          {
            label: "Natural Appearance and Feel",
            description:
              "Integrated into the bone, implants feel and function like real teeth.",
          },
          {
            label: "No Slipping or Shifting",
            description: "Fixed securely in place — unlike dentures.",
          },
          {
            label: "Longevity",
            description: "Can last a lifetime with good hygiene and care.",
          },
          {
            label: "Improved Oral Health",
            description: "No need to alter adjacent healthy teeth.",
          },
        ],
      },
      {
        heading: "Why Choose River Crossing Family Dental?",
        body: "Our team uses advanced technology, including 3D imaging and guided implant placement, for precision and patient comfort — compassionate, expert care from consultation to final restoration.",
      },
      {
        heading: "Are You a Candidate?",
        body: "Good candidates typically have one or more missing teeth, healthy gums and sufficient jawbone density, good overall health, and a commitment to good oral hygiene. Even with some bone loss, procedures like bone grafting can prepare your mouth for successful placement.",
      },
    ],
    closingHeading: "Schedule your free consultation today.",
    closingBody:
      "Contact our Riverton, UT office to schedule your free dental implant consultation — and find out whether implants are the right path forward for your smile.",
  },
  {
    slug: "orthodontics",
    title: "Orthodontics",
    description:
      "Straighter, healthier smiles for children and adults — Invisalign (including Teen and First), traditional braces, and HealthyStart for kids.",
    icon: "smile",
    heroImage: "/images/service/orthodontics.webp",
    heroImageAlt: "A teen with a confident smile, suitable for Invisalign treatment",
    intro:
      "Orthodontics doesn't just enhance the appearance of teeth — it can also enhance their health. Straighter teeth offer adequate spacing for flossing and brushing, so they're easier to keep clean, making you less likely to develop decay and gum disease. If you're looking for a Riverton orthodontist, our team wants to support you and your family. Call today to schedule your free orthodontic consultation.",
    sections: [
      {
        heading: "Invisalign®",
        body: "Translucent, smooth, durable aligners that handle underbite, overbite, gaps, and crowding. Treatment can be as short as six months; aligners are worn up to 22 hours a day, removed only for eating and cleaning. Each aligner gradually shifts your teeth toward alignment. Dr. Peterson is a certified Invisalign provider, including for Invisalign Teen and Invisalign First.",
      },
      {
        heading: "Traditional Braces",
        body: "Metal brackets and wires guide teeth into alignment within roughly 18–24 months. Brackets are attached and connected by a wire, tightened every four to six weeks. Modern advancements have made today's braces smaller, more comfortable, and more customizable than ever — with options for bracket colors and improved performance.",
      },
      {
        heading: "HealthyStart®",
        body: "A program designed to begin correcting a child's smile between ages six and twelve, using a series of appliances that gently shift primary teeth into alignment. Worn a few hours each day — often during sleep — it reshapes the dental arch, opens the airway, and may reduce habits like thumb sucking or teeth grinding.",
      },
    ],
    closingHeading: "Bringing you the latest and greatest.",
    closingBody:
      "We take pride in providing the best dental care possible, including for families in need of a Riverton orthodontist. Call today to schedule a free consultation.",
  },
  {
    slug: "emergency-dentistry",
    title: "Emergency Dentistry",
    description:
      "Same-day appointments for sudden toothaches, dental injuries, and urgent oral health needs.",
    icon: "ambulance",
    intro:
      "Dental emergencies are never planned, but when they happen, you need fast, reliable care from a team you can trust. At River Crossing Family Dental in Riverton, UT, we offer compassionate and efficient emergency dentistry services to help relieve your pain, protect your oral health, and restore your smile as quickly as possible. Whether you're experiencing a sudden toothache, have suffered a dental injury, or need same-day treatment, our experienced team is here to help.",
    sections: [
      {
        heading: "What Is Emergency Dentistry?",
        body: "Emergency dentistry refers to prompt dental treatment provided in response to urgent situations — often involving pain, trauma, or infection — that require immediate attention. We reserve time in our daily schedule to accommodate same-day or next-day emergency appointments, with the goal of quickly diagnosing the problem, relieving discomfort, and beginning treatment.",
      },
      {
        heading: "Common Dental Emergencies We Treat",
        list: [
          {
            label: "Severe Toothaches",
            description: "Could signal deep decay, infection, or trauma.",
          },
          {
            label: "Knocked-Out Teeth",
            description: "Time is critical — we may be able to reinsert the tooth if you act quickly.",
          },
          {
            label: "Cracked or Broken Teeth",
            description: "Trauma or biting something hard can expose sensitive inner layers.",
          },
          {
            label: "Lost Fillings or Crowns",
            description: "Emergency repairs protect the tooth until a permanent fix.",
          },
          {
            label: "Abscessed Teeth or Gum Infections",
            description: "Serious infections that can spread quickly.",
          },
          {
            label: "Swelling or Bleeding",
            description: "Uncontrolled bleeding or facial swelling should be evaluated ASAP.",
          },
        ],
      },
      {
        heading: "What to Expect at Your Emergency Visit",
        body: "We make you comfortable and assess quickly — thorough exam, X-rays as needed — then explain your treatment options and begin care right away whenever possible (filling, crown, root canal, extraction, or other treatment).",
      },
      {
        heading: "The Importance of Timely Care",
        body: "Delaying treatment can turn a mild toothache into a costly infection, or reduce the chance of saving a broken or knocked-out tooth. Prompt care helps alleviate pain, prevent complications, preserve natural teeth, and minimize more invasive treatment later.",
      },
      {
        heading: "Why Choose River Crossing Family Dental",
        list: [
          {
            label: "Same-Day Appointments",
            description: "We keep room in the schedule for urgent visits.",
          },
          {
            label: "Advanced Technology",
            description: "Modern diagnostics and imaging.",
          },
          {
            label: "Experienced Providers",
            description: "Trained to handle a wide variety of emergencies.",
          },
          {
            label: "Comfort-Focused Care",
            description: "Calm, supportive environment with sedation options when appropriate.",
          },
        ],
      },
      {
        heading: "Be Prepared: Quick Tips",
        list: [
          {
            label: "Tooth knocked out?",
            description:
              "Gently rinse with water, try to place it back in the socket, or store in milk. Call immediately.",
          },
          {
            label: "Toothache?",
            description:
              "Rinse with warm salt water and use a cold compress. Don't put aspirin directly on the gum.",
          },
          {
            label: "Broken tooth?",
            description: "Rinse and save the pieces. Cover sharp edges with dental wax.",
          },
          {
            label: "Lost crown or filling?",
            description: "Keep the piece and bring it; avoid chewing on that side.",
          },
        ],
      },
    ],
    closingHeading: "Don't wait — call us now.",
    closingBody:
      "If you or a loved one is having a dental emergency, please call our office immediately. Our team will work to see you the same day whenever possible.",
  },
];
