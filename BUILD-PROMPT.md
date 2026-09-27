# 995995.com — Idea & Phase-Wise Build Prompt

## 1. The idea (and why it wins)

**995995 = "Help, twice as fast."** A free, global **emergency-numbers + first-aid + preparedness hub**.

Why this concept, based on how the name reads:
- **995** is a real emergency short-code in several places (fire & ambulance in Singapore, Brunei fire, and others). Three-digit numbers like 112/911/999/995 are what people type when they need help, so "995995" reads as an emergency number repeated.
- The biggest evergreen search demand in this niche is **"emergency number + [country]"** and **"how to do [first-aid skill]"**. Both are very high-volume, never go out of date, and are global, which suits a numeric domain with no language attached.
- Buyer intent next to it pays well: CPR/first-aid training, medical-alert devices, home-security and alarms, travel/health insurance, and emergency kits. These are high-CPC ad categories and support pay-per-lead partnerships.

**Revenue stack:**
1. Google AdSense (directory and guide pages)
2. Lead generation (training, medical alerts, kits, home-safety audits), charged per lead or as rev-share
3. Direct sponsorships (a country page, a guide, the newsletter, contest prizes)
4. YouTube: embedded official videos now, an original channel later
5. Donations (monthly or one-time)
6. Affiliate kit/AED links (phase 5)

**Trademark position:** the numerals are used only as a descriptive domain name. The site states that it has no affiliation with any emergency service, and third-party names are used only to identify their resources. The full disclosure is on `terms.html#ip`.

## 2. Research basis

45 leading sites were audited, including the Red Cross (US/UK/CA/AU), IFRC, WHO, CDC, Ready.gov, FEMA, St John (UK/AU/NZ/CA), AHA, BHF, Resus UK, Mayo Clinic, Cleveland Clinic, healthdirect, SCDF, VicEmergency, GetReady NZ, 988 Lifeline, Samaritans, findahelpline, poison.org, stroke.org, NFPA, IRC, Direct Relief, MSF, The Prepared, weather.gov, UNICEF, Adducation and others. The patterns adopted from them:
- a local number shown in the hero
- tap-to-call
- an A–Z first-aid hub written as numbered steps
- a "reviewed" date with cited sources
- a course-finder style lead form
- a monthly/one-time donate toggle with an impact line for each amount
- a "where your money goes" split
- colour-coded warning levels
- a quick-exit button
- accessibility toggles
- tables that turn into cards on mobile
- FAQ schema markup
- WhatsApp share

## 3. Phase-wise build prompt (copy into any AI builder)

### PHASE 1 — Foundation & brand
> Build a static, dependency-free website for **995995.com** ("Help, twice as fast"), hostable on GitHub Pages' free plan. Use semantic HTML5, one shared CSS design system and vanilla JS.
> - **Colours:** emergency red #E11D2E, ink #0B1426, amber #F59E0B, teal #0E9F8E. Set them as CSS tokens, with automatic and toggleable dark mode.
> - **Fonts:** Space Grotesk for headings, Inter for body text.
> - **Top of every page:** a banner linking to https://web.works/contact that reads "Contact, if you are interested in this website/domain name/Sponsorship/Advertisement/Partnership".
> - **Under it:** a red SOS strip that says "not an emergency service", with a Quick-exit button.
> - **Header:** sticky, with a mobile off-canvas menu.
> - **Accessibility panel:** larger text, readable font, and theme options.
> - **Footer:** 5 columns, plus a medical disclaimer and a trademark/copyright disclosure.
> - **Owner contact email:** must never appear in HTML, JS strings or the repo in readable form. Store it obfuscated (reversed + base64, split into chunks), decode it only on click or submit, and send every form to it through a static form relay.

### PHASE 2 — Core traffic engines
> 1. **Emergency-numbers directory:** 220+ countries with police, ambulance, fire, region and notes. Add live search, a region filter, sortable columns, tap-to-call links, a table that becomes cards on mobile, and a Dataset schema.
> 2. **Hero lookup:** auto-detects the visitor's country from their time zone, with no geolocation prompt.
> 3. **First-aid A–Z:** 15 accordion guides (CPR, choking, bleeding, burns, stroke FAST, heart attack, recovery position, seizure, anaphylaxis, fractures, heat stroke, hypothermia, poisoning, head injury, asthma). Each guide has numbered steps, "call now" callouts and matching videos, plus a filter box, an A–Z chip index and FAQPage schema.
> 4. **Crisis helplines page:** no ads, with the quick exit prominent.

### PHASE 3 — Engagement tools
> - **Preparedness hub:** the 3-step model; a 24-item interactive go-bag checklist with a progress bar that saves to localStorage and prints; a family-plan builder that renders a live printable wallet card; 10 hazard guides (before/during/after); and a colour-coded warning-level legend.
> - **6-question quiz** with scoring and share buttons.
> - **Video library:** lite YouTube embeds from official channels, using youtube-nocookie and loading only on click.
> - **PWA:** manifest plus a service worker so the core pages and numbers work offline.

### PHASE 4 — Monetisation & conversion
> - **Lead generation (training.html):** a 3-step form.
>   - Step 1: service chips and who it's for.
>   - Step 2: group size, format, timeline, budget and location.
>   - Step 3: contact details and consent.
>
>   Add a benefits list, trust badges, an FAQ, and a short version of the form on the home page.
> - **AdSense:** configurable slots (top, in-article, footer), with labelled placeholders until the site is approved. Load the AdSense script only when a publisher ID is set, request non-personalised ads until consent is given, and provide an ads.txt stub.
> - **Donate page:** monthly/one-time toggle, preset amounts with an impact line for each, a custom amount, a designation dropdown (operations, promotion/marketing, hiring, contests, translations), a planned-allocation bar, optional instant-pay buttons (Stripe, PayPal, BMC, Ko-fi, Patreon, GitHub Sponsors) switched on from config, and a statement that the site is not a charity.
> - **Advertise page:** six packages (display, country sponsorship, sponsored guide, newsletter, prize partner, lead-gen partner), a brand-safety promise and a media-kit request form.
> - **Contests page:** #Ready995 Challenge with a countdown, prize tiers, categories, an entry form and a summary of the official rules.
> - **Careers page:** medical reviewer, writer, translator, video creator, ad sales and country ambassador roles, with an application form.

### PHASE 5 — Trust, SEO, launch & scale
> - **Every page:** canonical tag, Open Graph/Twitter card, JSON-LD (Organization, WebSite SearchAction, Dataset, FAQPage), sitemap.xml and robots.txt.
> - **Legal pages:** a privacy policy with the AdSense/YouTube disclosures, and terms covering the medical disclaimer, number-accuracy disclaimer, trademark/IP disclosure and contest rules. Add a cookie consent banner.
> - **Launch:** deploy on GitHub Pages, then point 995995.com at it (a CNAME file plus DNS A/AAAA records), enforce HTTPS, submit to Search Console, and apply for AdSense.
> - **Scale:**
>   - one page per country (e.g. `/emergency-number/japan`), for 200+ long-tail pages
>   - translations (ES, FR, HI, AR, PT, ZH)
>   - an original YouTube Shorts series
>   - AED locator partnerships
>   - a newsletter automation
>   - a CRM for routing leads to paying partners

## 4. Owner checklist after deploy
1. Submit any form once and click the FormSubmit activation email in the owner inbox. Optionally paste the alias it gives you into `assets/js/config.js → formAlias`.
2. Once AdSense is approved, add the publisher ID and slot IDs in `config.js`, and the publisher line in `ads.txt`.
3. Add donation payment links in `config.js → donate`.
4. Connect the domain: add a `CNAME` file containing `995995.com`, then set DNS to GitHub Pages.
