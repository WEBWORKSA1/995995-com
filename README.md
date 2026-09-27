# 995995.com — Help, twice as fast

This is a free global hub with four parts:

- emergency numbers for 222 countries and territories
- first-aid guides (15 topics)
- preparedness tools: a kit checklist, a family plan builder, hazard guides and a quiz
- crisis helplines

It also carries lead generation, AdSense slots, donations, sponsorships, contests and careers pages.

The site is pure static HTML/CSS/JS with no dependencies, and runs on GitHub Pages' free plan.

## Structure
```
index.html, emergency-numbers.html, first-aid.html, prepare.html, helplines.html, videos.html,
training.html (lead gen), donate.html, advertise.html, contests.html, careers.html,
about.html, contact.html, privacy.html, terms.html, 404.html
assets/css/style.css      design system (light/dark, responsive)
assets/js/config.js       ← all settings: AdSense, donation links, videos, form relay
assets/js/main.js         interactions, forms, directory, checklist, plan builder, quiz
assets/js/numbers-data.js emergency-number dataset
tools/build.py            shared layout builder (python3 tools/build.py)
tools/pages/*.html        page bodies
sw.js, manifest.webmanifest, sitemap.xml, robots.txt, ads.txt
```

## Editing
1. Edit the files in `tools/pages/` or the layout in `tools/build.py`.
2. Run `python3 tools/build.py`.
3. Commit the generated HTML.

To change site settings, edit `assets/js/config.js`. That needs no rebuild.

## Go-live checklist
- **Forms:** submit any form once, then confirm the one-time FormSubmit activation message in the owner inbox.
- **AdSense:** once approved, set `adsenseClient` and `adSlots` in `config.js`, and add the publisher line to `ads.txt`.
- **Donations:** paste your payment links into `config.js → donate`.
- **Custom domain:** add a `CNAME` file containing `995995.com`. Point the DNS A records at 185.199.108.153, 185.199.109.153, 185.199.110.153 and 185.199.111.153, then enable "Enforce HTTPS" in the repo's Pages settings.

The site's contact email is never written in readable form anywhere in this repository.

See `BUILD-PROMPT.md` for the concept, the research and the phase-wise build prompt.

© 995995.com / Webworks Media. Not affiliated with any emergency service. See `terms.html#ip`.
