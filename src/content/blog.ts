export type BlogBlock =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "h3"; text: string }
  | { type: "ul"; items: string[] }
  | { type: "ol"; items: string[] }
  | { type: "callout"; text: string }
  | { type: "image"; src: string; alt: string; caption?: string };

export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  publishedAt: string; // ISO date
  category: string;
  heroImage: string;
  heroImageAlt: string;
  author: {
    name: string;
    title: string;
    avatar: string;
  };
  body: BlogBlock[];
};

const drPeterson = {
  name: "Dr. John M. Peterson, DDS",
  title: "Dentist · River Crossing Family Dental",
  avatar: "/images/blog/dr-peterson-avatar.png",
};

export const posts: BlogPost[] = [
  {
    slug: "invisalign-not-just-esthetics",
    title: "The Most Common Reason for Invisalign? It's Not Esthetics.",
    excerpt:
      "When a patient says they've chipped a front tooth, the first thing to check is how their front teeth come together — because in most cases, it's a too-heavy bite causing the chipping. Here's how Invisalign helps.",
    publishedAt: "2026-04-12",
    category: "Invisalign",
    heroImage: "/images/blog/invisalign-decalcification.jpg",
    heroImageAlt: "Before-and-after dental example showing improved tooth appearance after Invisalign",
    author: drPeterson,
    body: [
      {
        type: "p",
        text: "Most people assume Invisalign is for cosmetic reasons — and yes, straight teeth look great. But in my chair, the most common reason I recommend Invisalign isn't esthetics at all. It's function.",
      },
      {
        type: "p",
        text: "When a patient tells me they've chipped a front tooth — especially if it's happened more than once — the first thing I check is how their front teeth come together. In the vast majority of cases, the chipping isn't from a single accident. It's from a bite that's too heavy in the front.",
      },
      {
        type: "h2",
        text: "Teeth have roles, just like a sports team.",
      },
      {
        type: "p",
        text: "Think of your mouth like a soccer team. Each player has a position — and so does each tooth. Front teeth are great at two things: cutting food and forming speech sounds. They're long, thin, and sharp on purpose. What they're NOT built for is taking the brunt of biting force. That's the molars' job.",
      },
      {
        type: "p",
        text: "When the front teeth are doing work the back teeth should be doing — like in an edge-to-edge bite, where the front teeth meet straight-on instead of overlapping slightly — they wear down or chip. It's not a question of if. It's when.",
      },
      {
        type: "h2",
        text: "Invisalign moves the load to the right teeth.",
      },
      {
        type: "p",
        text: "Invisalign is a great way to fix a bite that's too heavy in the front, or an edge-to-edge bite. The aligners gradually move teeth into the correct position, relieving pressure on the front teeth and preventing future chipping.",
      },
      {
        type: "p",
        text: "What I love about treating this kind of case with Invisalign — rather than just bonding the chip and sending the patient on their way — is that we treat the underlying cause. Bonding without fixing the bite just resets the clock. The chip comes back.",
      },
      {
        type: "callout",
        text: "We treat the bite while keeping an eye on the airway and optimizing for sleep — because the bite matters not just for appearance but for overall health.",
      },
      {
        type: "h2",
        text: "Bonus benefits along the way.",
      },
      {
        type: "ul",
        items: [
          "Comfortable and virtually invisible — most people won't notice you're wearing aligners.",
          "Removable, so you can eat and drink normally and brush and floss like always.",
          "Easy to care for: just rinse and brush gently.",
          "Great for adults and teens — not just kids.",
        ],
      },
      {
        type: "p",
        text: "If you've chipped a front tooth — once, twice, more — let's look at the bite together. It might be the key to keeping your smile intact long term, and a free orthodontic consultation is the easiest way to start.",
      },
    ],
  },
  {
    slug: "compliance-easier-with-braces",
    title: "Compliance Is Easier With Braces, Right?",
    excerpt:
      "The biggest reason parents choose braces over Invisalign is compliance. But is it really easier to be compliant with braces? In my experience, no — and the consequences of slipping up are usually worse.",
    publishedAt: "2026-05-08",
    category: "Orthodontics",
    heroImage: "/images/blog/edge-to-edge-bite.webp",
    heroImageAlt: "Illustration showing an edge-to-edge bite alongside a chipped tooth",
    author: drPeterson,
    body: [
      {
        type: "p",
        text: "The biggest reason I hear parents choose braces over Invisalign is compliance. They worry their child won't wear the aligner enough, and they feel reassured that brackets and wires are fastened to the teeth where the kid can't take them off.",
      },
      {
        type: "p",
        text: "But is it really easier to be compliant with braces?",
      },
      {
        type: "p",
        text: "In reality, both braces and Invisalign have compliance issues. With Invisalign, the treatment outcome is very much tied to how consistently the patient wears the trays. With braces, the brackets are fixed — but there are major compliance issues there too, and the consequences of being non-compliant with braces are usually much worse than with Invisalign.",
      },
      {
        type: "h2",
        text: "So what ARE the compliance issues with braces?",
      },
      {
        type: "ul",
        items: [
          "Brushing and flossing are much more difficult. The brackets and wires trap food and plaque on every surface of every tooth.",
          "To fully clean all that trapped debris, brushing and flossing should take 10+ minutes, twice daily. How many teens are actually going to do that?",
          "When the teeth don't get cleaned properly, the result is decay, white spots from demineralization, and puffy, diseased gums.",
          "Bands and other appliances have to be worn as directed — if they're not, the treatment doesn't work.",
          "Hard candy, popcorn, and certain other foods can pop off brackets, which means extra trips to the office and delays in treatment.",
        ],
      },
      {
        type: "h2",
        text: "What I see in my chair.",
      },
      {
        type: "p",
        text: "It's the rare tween or teen who takes care of their teeth as they should during braces. It's all too common to have puffy gums or white spots show up on the teeth after the braces come off. And there are times when a patient who never had cavities before getting braces ends up with cavities all over their mouth afterward — months of non-compliance can really weaken the teeth.",
      },
      {
        type: "callout",
        text: "I've never seen an Invisalign patient develop white spots on their teeth, puffy gums, or an uncharacteristic amount of new decay after treatment — the way I have with braces.",
      },
      {
        type: "p",
        text: "Problems can absolutely happen with Invisalign too — if trays are popped back in without rinsing or without brushing first, plaque gets trapped against the teeth all day. But the severity of these problems is much less than what I see after braces. The damage is reversible.",
      },
      {
        type: "h2",
        text: "So which would you choose?",
      },
      {
        type: "p",
        text: "There are great reasons to choose either braces or Invisalign — and we offer both. But the compliance argument for braces doesn't really hold up. If anything, the consequences of slipping up are more severe with braces. If you're trying to decide for your child, come in for a free orthodontic consultation — we can walk through both options and what each would look like for your family.",
      },
    ],
  },
  {
    slug: "chipped-front-teeth-bite-warning-sign",
    title: "Chipped a Front Tooth? It Might Be a Warning, Not an Accident.",
    excerpt:
      "Most patients think a chipped front tooth means they bit down on something wrong. Sometimes that's true. More often, the chip is a symptom of a bite problem the patient didn't know they had.",
    publishedAt: "2026-06-01",
    category: "Orthodontics",
    heroImage: "/images/blog/chipped-teeth/chipped-teeth.jpg",
    heroImageAlt: "Close-up of a chipped front tooth showing wear pattern",
    author: drPeterson,
    body: [
      {
        type: "p",
        text: "Patients walk into the office with a chipped front tooth all the time. Most of them have a story for it — biting into ice, an ill-timed fork hitting the tooth, a slip on the hiking trail. Sometimes that's exactly what happened. But often, when I take a closer look at how the teeth come together, I find a different culprit hiding in plain sight: the bite.",
      },
      {
        type: "h2",
        text: "What an edge-to-edge bite looks like.",
      },
      {
        type: "p",
        text: "In a healthy bite, the upper front teeth overlap the lower front teeth slightly when you close your mouth — about 1–2 millimeters. That overlap protects the edges of both rows from grinding into each other.",
      },
      {
        type: "p",
        text: "In an edge-to-edge bite, the front teeth meet straight on, edge against edge, with no overlap. Every time you chew, the front teeth take the force that the back teeth are supposed to absorb. Over months and years, the enamel on those front edges wears down — and eventually, a piece chips off.",
      },
      {
        type: "image",
        src: "/images/blog/chipped-teeth/edge-to-edge-bite-hires.jpg",
        alt: "Comparison of an edge-to-edge bite versus a typical overlapping bite",
        caption: "An edge-to-edge bite (left) puts the front teeth in the line of force every time you chew.",
      },
      {
        type: "h2",
        text: "Why bonding alone isn't the answer.",
      },
      {
        type: "p",
        text: "If you chip a front tooth and we just bond it back together — repair the visible damage and send you home — we haven't actually fixed anything. The bite that caused the chip is still there. The bonding material is softer than enamel, which means it'll chip too. Usually faster than the original tooth did.",
      },
      {
        type: "p",
        text: "A patient who comes in every couple of years to re-bond the same front tooth is a patient with a bite problem. The bonding is treating the symptom, not the disease.",
      },
      {
        type: "callout",
        text: "The chip isn't the problem. The chip is the warning sign.",
      },
      {
        type: "h2",
        text: "How we fix it.",
      },
      {
        type: "p",
        text: "Most edge-to-edge bites can be corrected with Invisalign. The aligners gradually shift the teeth so the upper row overlaps the lower row the way it's supposed to — which moves the chewing force off the front teeth and onto the molars, where it belongs.",
      },
      {
        type: "p",
        text: "Once the bite is corrected, we can restore any chipped or worn edges with cosmetic bonding or veneers. But this time, the restoration lasts — because we removed the force that was breaking the teeth in the first place.",
      },
      {
        type: "h2",
        text: "What to do if you've chipped a front tooth.",
      },
      {
        type: "ol",
        items: [
          "Save the piece if you can — sometimes we can bond it back. Put it in milk or saline if it's a clean break.",
          "Cover any sharp edges with dental wax (most pharmacies sell it) so you don't cut your lip or tongue.",
          "Call us. We keep room in the schedule for emergency visits.",
          "When you come in, ask us to evaluate your bite — not just the chipped tooth.",
        ],
      },
      {
        type: "p",
        text: "Repeated chipping is your mouth telling you something needs to change. We'd much rather correct the underlying bite once than re-bond the same tooth every two years for the next decade. If you've chipped a front tooth recently, schedule a free orthodontic consultation and let's look at the whole picture together.",
      },
    ],
  },
];
