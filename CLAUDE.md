@AGENTS.md

# WRKTD — Master Project Specification

## What WRKTD is

WRKTD is a **done-for-you operator layer** that sits on top of a print manufacturer (MWW) and handles everything the manufacturer doesn't: batch file preparation, mockup generation, store connection, and fulfillment monitoring. It is not a print provider, not a print network, and not a marketplace. It fills a gap no one else fills — even against the best specialist in the space (merchOne), which is still fully self-serve.

---

## Market context (research findings — inform all copy and positioning)

### Three layers most sellers confuse
- **Print providers** — actually manufacture (Printful, MWW, MerchOne)
- **Print networks** — route orders to third-party providers (Printify, Gelato, Gooten)
- **Marketplaces** — sell on their own storefront and take a cut (Redbubble, Society6, Etsy)

WRKTD is none of these. It is an **operator layer** that sits on top of a print provider and does the batch work no one else does.

### Closest competitor: MerchOne
MerchOne is a home-decor specialist (rugs, woven pillows, jacquard wall tapestries, blankets) with in-house production across Poland, Germany, Latvia, and Ohio, white-label shipping, and direct OrderDesk integration. They report 74% average margin on wall art across 311,000+ orders.

**The gap WRKTD fills even against MerchOne:** MerchOne is still self-serve. The client logs in, picks a product, uploads one design, builds one listing, and repeats manually for every SKU. No batch tool, no done-for-you service, no file checking before print. That is exactly what WRKTD does.

### Margin reality
- Apparel: 15–20% after fulfillment (saturated, commoditized)
- Home decor + specialty (trading cards, puzzles): 60–74% (far less price competition)
- This validates anchoring WRKTD entirely around home decor

### Shipping speed vs. price
Sellers who prioritized 2-day production with local fulfillment consistently outsold cheaper competitors with 8-day production. WRKTD's 5–7 day setup and 5–10 day per-order time should be framed honestly but positioned as fast for made-to-order woven goods (not expected to ship same-day like a t-shirt).

### The single biggest unsolved pain point in the entire industry
**Nobody checks the file before it prints.** This is universal across every provider — Printify, Printful, MWW, MerchOne, all of them put the burden on the seller to submit a correct file. Every guide, every review, every FAQ repeats this warning. WRKTD's "we check it before it prints" positioning is genuinely differentiated — not a marketing angle, a real unsolved industry problem.

---

## Brand identity

- **Name:** WRKTD (pronounced "worked")
- **Tagline:** "WRKTD. We handled it." (subtle, not plastered everywhere)
- **Logo:** Real files in `public/logo.png` (rectangular wordmark) and `public/favicon.png` (square W mark)
- **Tone:** Premium and serious. Not playful. Not hype. Confident understatement.
- **Colors:** Monochromatic black/white/gray base. Gold accent (`#B89A4E`) used sparingly — labels, key numbers, CTAs only.
- **Typography:** Syne (display, bold) + Inter (body)
- **Background:** Interactive WebGL shader — Gaussian liquid chrome blobs, lava lamp drift, mouse tracking, click ripples

### Language rules (non-negotiable)
- Never say "fully passive" or "zero manual work" — use "designed to run automatically, monitored by WRKTD"
- Never name competitors by name
- Never disclose the 30% manufacturing markup — show only the bundled "manufacturing cost" figure
- Never disclose MWW as the manufacturer by name in client-facing copy
- Never push to `main` branch — all work goes to `dev` only

---

## Tech stack

- **Framework:** Next.js 16.2.9, App Router, Turbopack — READ `node_modules/next/dist/docs/` before writing Next.js code
- **Styles:** Tailwind CSS v4 — CSS-based `@theme` in `globals.css`, no JS config
- **Language:** TypeScript
- **Fonts:** Syne (`--font-syne`), Inter (`--font-inter`) via `next/font/google`
- **Deployment:** `dev` branch → `dev.wrktd.com` (Vercel Preview), `main` → `wrktd.com` (Production — DO NOT PUSH)
- **Git user:** WRKTD / rugolution@gmail.com

### Key files
- `app/layout.tsx` — root layout, fonts, metadata, wraps `ClientLayout`
- `app/ClientLayout.tsx` — `"use client"` wrapper that mounts `ShaderBackground`
- `app/components/ShaderBackground.tsx` — WebGL Gaussian blob shader (fixed background)
- `app/globals.css` — `@theme` palette, `.glass` / `.glass-mid` / `.glass-light` panel classes
- `app/page.tsx` — homepage, imports all section components
- `app/components/` — all section components

### Color palette (`globals.css` `@theme`)
```
--color-black:   #060606
--color-dark:    #0E0E0E
--color-ash:     #1A1A1A
--color-gray:    #3A3A3A
--color-mid:     #6A6A6A
--color-light:   #A8A8A8
--color-white:   #F2F2F2
--color-gold:    #B89A4E
--color-gold-lt: #CCAF6A
```

### Glass panel classes
- `.glass` — `rgba(8,8,8,0.78)`, blur 28px
- `.glass-mid` — `rgba(14,14,14,0.72)`, blur 24px
- `.glass-light` — `rgba(22,22,22,0.65)`, blur 20px

---

## Build sequencing rule

**Confirm each module works before moving to the next. Do not attempt multiple unconfirmed modules in one pass.**

Priority order:
1. Modules 1–2 and 8 — homepage functional with core hook
2. Modules 3–7 and 9–12 — full homepage complete
3. Modules 14–19 — client portal (signup through funds-check gate)
4. Modules 20–22 — chat, billing polish, admin panel

---

## PART 1 — Public website (no login required)

### Module 1 — Homepage hero
- Opens with a question, not a statement: **"What would your design look like on a rug?"**
- One sentence below: drop a design, see it on real products in seconds, free, no signup
- Do not describe the business — let the visitor experience it first
- No background (shader shows through), Syne extrabold display type, white

### Module 2 — Instant design preview tool
**The single most important module on the entire site.**
- Drag-and-drop upload box directly below the hero
- Visitor drops any image file → system composites it onto pre-built blank mockup templates (rug, pillow, tapestry, blanket) and displays results within seconds
- No account, no email, no payment required
- Beneath each generated preview: a button reading "Make this real" → leads to signup
- Reuses same mockup-generation logic as paid client work, running against a temporary non-persisted upload
- Already partially built as `PreviewTool.tsx` and `FinalCTA.tsx` — needs copy update to match new hero question

### Module 3 — Credibility stat strip
A horizontal row of four numbers directly under the preview tool:
1. **Total revenue across active accounts** — "$1,000,000+ generated annually" (aggregate, never tied to one named account)
2. **Top individual account** — "$80,000–$90,000/year"
3. **Single-month proof** — "$20,000–$30,000 first month"
4. **Setup time** — "5–7 days to live"

**Ordering matters:** lead with aggregate first (scale + legitimacy), then narrow to the relatable specific story.

### Module 4 — Proof story card
One clean card, plain language:
> "A clothing brand with cool, unique designs had art sitting unused for home decor. We turned their existing designs into rugs and pillows and connected their store to ship automatically. $20,000–$30,000 in sales in their first month — from designs they already owned."

No brand name. No industry specifics beyond "clothing brand." Nothing identifying.

### Module 5 — One design, many products visual
Simple horizontal flow: icon for "your design" → icons for rug, pillow, tapestry, blanket connected with plus signs → "= more chances to sell."

Visually teaches the core mechanic without paragraphs of explanation.

Already partially built as `ProductLineSection.tsx` — update visual layout to match this flow.

### Module 6 — Catalog earnings estimator (interactive widget)
- Slider: "How many designs do you have?"
- As visitor drags: live-calculated estimate updates showing:
  - Potential product count (designs × average product types)
  - Qualitative note: "X weeks saved compared to doing this manually"
- Turns abstract value prop into a number the visitor generates themselves (more persuasive than being told a number)
- **Not yet built** — build as a new component `CatalogEstimator.tsx`

### Module 7 — Live activity indicator
A small card showing:
> "4,213 product images generated this week across active client catalogs" + small green "live" dot

Trust and momentum signal — makes the business feel active and real.

Build note: start as a manually-updated static number. Wire to real database count later when volume justifies it.
- **Not yet built** — build as `LiveActivity.tsx`

### Module 8 — How it works (3 steps)
Three steps, deliberately undersold:
1. Upload your designs
2. WRKTD builds your catalog (1–3 days)
3. Your store connects and orders ship automatically (5–10 days per order, monitored by WRKTD)

No jargon. No overpromising. Already built as `HowItWorksSection.tsx`.

### Module 9 — How WRKTD is different
Use this exact neutral phrasing:
> "Most POD platforms are still largely DIY. Even when bulk tools exist, the seller is responsible for product setup, artwork placement, listings, SKUs, and fulfillment configuration. WRKTD is done-for-you and batch-oriented."

No competitors named. No insults. Just factual contrast. Already built as `DifferentiatorSection.tsx`.

### Module 10 — Pricing overview
- Three visible tiers: Starter / Growth / Scale
- Show only: monthly hosting/management fee + rough product-count ceiling per tier
- Short note: batch fee applies based on design volume; manufacturing cost included per item sold
- **Never show any percentage or markup figure — not on this page, not anywhere public**
- Already built as `PricingSection.tsx`

### Module 11 — FAQ
Keep to 3–5 questions maximum. Must include:
- Do I need my own designs? (yes)
- What if I have a lot of designs? (processed as one batch, not one at a time)
- How long until I'm live? (5–7 days setup, then 5–10 days automatic per order)
- What payment is required? (card on file or prepaid balance — framed as "what keeps things running smoothly")

Already built as `FAQSection.tsx` — review against these required questions.

### Module 12 — Final call to action
Repeat of Module 2 upload tool. Same interaction, no new ask. Anyone scrolling this far is already curious — lowest-friction next step is what they already saw.

Already built as `FinalCTA.tsx`.

### Module 13 — Logo and brand identity
Real logo files already in place:
- `public/logo.png` — rectangular WRKTD wordmark (nav)
- `public/favicon.png` — square W mark (browser tab)
- Nav uses `next/image` to render the real logo

---

## PART 2 — Client portal (requires login)

### Module 14 — Sign up
- Plan selection (Starter / Growth / Scale)
- Account creation: name, email, password
- **Payment method on file via Stripe required before account is active** (see Module 19 — this is a hard requirement, not optional)

### Module 15 — Dashboard
Landing page after login. Must answer "where do things stand" in one glance:
- Current plan
- Active job status
- Account balance / payment status

No digging through menus to find basic status.

### Module 16 — Pick products and style
Browsing interface showing every manufacturable product type (rug, pillow, tapestry, blanket, etc.) with selectable blank presentation templates per product (aerial view, corner angle, lifestyle scene).

Client selects which products they want for each design **before uploading anything** — this locks in correct size and spec requirements ahead of time.

### Module 17 — Upload center
Drag-and-drop upload area. Enforces in this exact order:
1. **Virus/malware scan** — reject unscanned files; never store an unscanned file
2. **Format check** — JPG, PNG, PSD, SVG, AI only
3. **DPI check** — minimum 150 DPI target; below that, soft warning offering upscale attempt, not hard rejection

No limit on number of files per session.

**Auto-rename rule (critical):** Client never renames anything. Whatever filename they drop in gets automatically renamed and duplicated per selected product using the pattern:
```
storename-producttype-originalfilename
```
Example: `cat.png` for store "animals" selected for rug and pillow becomes:
- `animals-rug-cat.png`
- `animals-pillow-cat.png`

### Module 18 — Order and job status
Visual pipeline per batch:
`Uploaded → Processing → Mockups ready → Print file in OrderDesk → Delivered → Live`

Must include the funds-check gate (Module 19) before any order routes to manufacturer.

### Module 19 — Funds-check gate ⚠️ MOST IMPORTANT BACKEND RULE
**Before any customer order is forwarded to the manufacturer, the system must verify:**
- Client has a valid payment method on file, OR
- Client has sufficient prepaid balance to cover that order's manufacturing cost

**If check fails:**
- Order is HELD and flagged — never silently routed
- Client is notified immediately

This **must be implemented as an actual conditional check in order-routing logic** — not just a contract clause. This is the single biggest financial exposure in the business if skipped.

### Module 20 — Chat and support
Clean in-portal messaging module. Separate from upload center. Used for:
- Process questions
- Requirement clarifications ("for this product, send files in this size")
- Back-and-forth with attachments

**AI assistant restriction (hard, system-level — non-negotiable):**
The AI can answer process and requirements questions but **can never:**
- Reveal the manufacturer's base cost
- Reveal the 30% markup figure
- Acknowledge a markup exists
- Reveal any other client's information

### Module 21 — Billing
- Subscription management
- One-time batch charge history
- Payment method management
- Prepaid balance status (alternative to standing card)

### Module 22 — Admin panel (internal, WRKTD-only)
Operator control center:
- Every client and their current plan
- Every job and its pipeline stage
- Every uploaded file
- Full chat history per client
- Queue of orders held by the funds-check gate
- Management tools for the blank template library

---

## Cash flow protection rules (apply everywhere, always)

1. No order routes to manufacturing without cleared funds
2. Manufacturing cost to client = bundled figure only (never broken out, never shows markup)
3. The 30% WRKTD margin is never visible to clients anywhere in the product
4. If a payment fails, hold the order and notify — never absorb the cost silently

---

## What is already built (as of June 2026)

### Live on dev.wrktd.com
- Nav with real logo (`public/logo.png`), glass-on-scroll, favicon
- Hero section — needs copy update to match Module 1 (question-first headline)
- Design visualizer (pattern preview on product mockups)
- Preview tool / drag-and-drop upload (Module 2 — partially matches spec)
- Product line section (Module 5 — needs layout update to horizontal flow)
- How it works — 3 steps (Module 8 ✓)
- Differentiator section (Module 9 ✓ — verify exact copy)
- Profit calculator (not in spec — keep, useful widget)
- Pricing section (Module 10 ✓)
- Testimonials / proof (Module 4 — update to match proof story card spec)
- FAQ (Module 11 — verify against required questions)
- Final CTA with upload tool (Module 12 ✓)
- Footer

### Not yet built
- Module 3 — Credibility stat strip
- Module 6 — Catalog earnings estimator (interactive slider widget)
- Module 7 — Live activity indicator
- Modules 14–22 — entire client portal
