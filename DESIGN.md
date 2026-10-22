---
name: River Crossing Family Dental
description: Warm, plain family-practice site in navy, cream, and coral.
colors:
  navy: "#2c4a6b"
  navy-dark: "#1c3554"
  steel: "#7ba0bd"
  steel-light: "#b4c8d8"
  cream: "#f7f3ec"
  coral: "#e07856"
  coral-dark: "#c8633f"
  ink: "#0f1f33"
  white: "#ffffff"
  body: "#334155"
  muted: "#475569"
typography:
  display:
    fontFamily: "Geist, var(--font-geist-sans), sans-serif"
    fontSize: "clamp(2.25rem, 4vw, 3rem)"
    fontWeight: 700
    lineHeight: 1.1
    letterSpacing: "-0.025em"
  headline:
    fontFamily: "Geist, var(--font-geist-sans), sans-serif"
    fontSize: "clamp(1.875rem, 3vw, 2.25rem)"
    fontWeight: 700
    lineHeight: 1.15
  title:
    fontFamily: "Geist, var(--font-geist-sans), sans-serif"
    fontSize: "1.25rem"
    fontWeight: 700
    lineHeight: 1.3
  body:
    fontFamily: "Geist, var(--font-geist-sans), sans-serif"
    fontSize: "1.125rem"
    fontWeight: 400
    lineHeight: 1.65
  label:
    fontFamily: "Geist, var(--font-geist-sans), sans-serif"
    fontSize: "0.875rem"
    fontWeight: 700
    lineHeight: 1.2
    letterSpacing: "0.1em"
rounded:
  full: "9999px"
  card: "16px"
  panel: "24px"
  tile: "12px"
spacing:
  section: "80px"
  section-tight: "64px"
  stack: "20px"
  button-gap: "12px"
  card-gap: "24px"
components:
  button-primary:
    backgroundColor: "{colors.coral}"
    textColor: "{colors.white}"
    rounded: "{rounded.full}"
    padding: "0 32px"
    height: "48px"
  button-primary-hover:
    backgroundColor: "{colors.coral-dark}"
    textColor: "{colors.white}"
    rounded: "{rounded.full}"
    height: "48px"
  button-secondary:
    backgroundColor: "{colors.cream}"
    textColor: "{colors.navy}"
    rounded: "{rounded.full}"
    padding: "0 32px"
    height: "48px"
---

# Design System: River Crossing Family Dental

## Overview

**Creative North Star: "The family practice"**

The site already looks like a neighborhood dental office: cream paper, navy type, and coral only when someone can call or book. Pages alternate a cream band and a white band. Photography is real and rounded, never a collage. Copy is warm and short.

This record was extracted from `src/app/globals.css`, the homepage, the specials pages, and the Invisalign Teen page. It describes the system those pages already use. New work on this site should join that system.

**Key Characteristics:**

- Cream (`#f7f3ec`) and white take turns down the page.
- Coral is the one action color. Navy is the type and the outline button.
- Buttons are 48px pills. On a phone they go full width and stack.
- One idea per band. A row of three equal cards is for peers, not for the whole page.
- Photos sit in a 4:3 or wide frame with a soft shadow.

## Colors

The palette is the logo: navy, a steel blue, warm cream, and a coral accent.

### Primary

- **Practice Navy** (`#2c4a6b`): Headings, outline buttons, icon tiles, and the closing band.
- **Coral** (`#e07856`): The primary button and small uppercase labels. Darkens to `#c8633f` on hover.

### Secondary

- **Steel** (`#7ba0bd`) and **Steel Light** (`#b4c8d8`): Homepage hero accent text and the left rule on long service articles. Not a second button color.

### Neutral

- **Cream** (`#f7f3ec`): Alternating section background and quiet cards.
- **White** (`#ffffff`): The other section background, and the page itself.
- **Ink** (`#0f1f33`): Body default from the root token.
- **Slate body** (`#334155`): Paragraphs on cream and white (`text-slate-700`).
- **Slate muted** (`#475569`): Fine print (`text-slate-600`).

### Named Rules

**The One Action Rule.** Coral fills the button that should be tapped. A second action is a navy outline. Do not fill two neighboring buttons with coral.

## Typography

**Display Font:** Geist (with the system sans fallback)
**Body Font:** Geist
**Label/Mono Font:** Geist Mono, only for the small section index on long service articles.

**Character:** One family, set by size and weight. Headings are bold navy. Body is 18px with relaxed leading. Labels are small, bold, and widely tracked.

### Hierarchy

- **Display** (700, `text-4xl` to `text-5xl`, tight leading): Page title.
- **Headline** (700, `text-3xl` to `text-4xl`): Section title.
- **Title** (700, `text-xl`): Card title.
- **Body** (400, `text-lg`, relaxed, about 65 characters): The paragraph under a heading. Supporting notes drop to `text-sm` or `text-base`.
- **Label** (700, `text-sm`, `0.1em` tracking, uppercase): The short line above a heading, in coral on cream and white.

### Named Rules

**The Same Voice Rule.** A new page uses the same sizes as Meet the Team, the specials, and Invisalign Teen. Do not introduce a display serif or a second scale.

## Layout

Pages sit in `container mx-auto` with `px-4 sm:px-6 lg:px-8`. Long reading columns stop around `max-w-3xl` or `max-w-4xl`. Heroes are a single column on a phone and two columns from `lg` up.

Vertical rhythm is `py-16` (64px) and `py-20` (80px) on large screens. Inside a hero, related lines use `space-y-5` (20px). Button rows use `gap-3`. Peer cards use `gap-6`.

On a phone, primary and secondary buttons are full width and stacked. From `sm` up they sit in a row and size to their labels.

The header is sticky and 80px tall. Leave room for it. Do not let a hero collide with it.

## Elevation & Depth

Depth is light. Most surfaces are flat color. Shadows mark a photo, a resting card, or a primary button. They are soft and slightly offset, from Tailwind `shadow-sm`, `shadow-md`, and `shadow-xl`.

### Shadow Vocabulary

- **Card rest** (`shadow-sm`): White or cream cards on the opposite background.
- **Button** (`shadow-md`): The coral pill.
- **Photo** (`shadow-xl`): The rounded photograph in a hero.

### Named Rules

**The Flat Band Rule.** A cream or white section does not get a drop shadow. Shadow belongs to the thing inside it.

## Shapes

Buttons are fully round. Cards and icon tiles use 16px (`rounded-2xl`) or 12px (`rounded-xl`). Hero photos and large closing panels use 24px (`rounded-3xl`). Dividers are 1px `border-slate-200`.

## Components

### Buttons

- **Shape:** Pill, 48px tall, horizontal padding 32px, label 14px and bold.
- **Primary:** Coral fill, white label, `shadow-md`, hover `#c8633f`.
- **Secondary:** 2px navy outline, navy label, transparent or cream fill. Hover fills navy and turns the label white.
- **On a phone:** Both buttons are full width and stacked, primary first.
- **Focus:** A 2px navy outline, offset 4px.

### Cards / Containers

- **Corner style:** 16px for text cards, 24px for photos.
- **Background:** Cream cards on white, white cards on cream.
- **Shadow:** `shadow-sm` at rest. Photos use `shadow-xl`.
- **Border:** Optional 1px slate. Do not nest a card inside a card.
- **Internal padding:** 24px (`p-6`), 32px on larger feature cards (`p-8`).

### Navigation

Desktop links are 14px semibold slate, with a cream hover. Groups with children open a white menu on hover. Under 768px, a full-screen white sheet lists the same links. The coral "Book Appointment" pill stays in the header from `md` up.

### Offer price

On a specials page the price is the large navy number (`text-6xl` / `text-7xl`), with the offer name as the heading under it and the limit in small type. That is the pattern for a published price. Do not put the price in a second bordered box.

### Closing band

`CtaBand` is navy (or coral) full width, with a heading, one sentence, Book Appointment, and the phone number. Service pages end with it. Do not invent a second closing style.

## Do's and Don'ts

### Do

- **Do** alternate cream and white bands.
- **Do** use one coral button per action row.
- **Do** keep call and book at 48px, full width on a phone.
- **Do** show a published price the way `/specials/exam` does: large number, name, then the limit.
- **Do** reuse the existing photos and the Lucide icons already on the site.

### Don't

- **Don't** add a new typeface, a new accent color, or a gradient text treatment.
- **Don't** stack several grids of identical icon cards down one page.
- **Don't** crop a landscape photo into a tall portrait frame.
- **Don't** make the emergency or Invisalign pages look like a different practice from the homepage.
