/* ==========================================================
   995995 — Site configuration (edit here, no build step needed)
   ========================================================== */
window.SITE = {
  name: "995995",
  tagline: "Help, twice as fast.",
  url: "https://995995.com",
  contactBannerUrl: "https://web.works/contact",

  /* Private inbox token — never printed on the page. Decoded only at the moment a visitor
     clicks a contact link or submits a form. Do not replace with a plain address. */
  _k: ["bW9jLmxp", "YW1nQDFh", "c2tyb3di", "ZXc="],

  /* Form relay (static-host friendly). After the very first submission FormSubmit sends a one-time
     activation mail to the inbox; once activated you may replace `formAlias` with the random alias
     string FormSubmit gives you — then even the relay URL no longer references the inbox. */
  formEndpoint: "https://formsubmit.co/ajax/",
  formAlias: "",

  /* Google AdSense — set your publisher id (ca-pub-XXXXXXXXXXXXXXXX) and slot ids to go live.
     While empty, clearly-labelled placeholder boxes are shown instead of ads. */
  adsenseClient: "",
  adSlots: { top: "", inArticle: "", sidebar: "", footer: "" },

  /* Donation / payment links (Stripe Payment Links, PayPal.me, Buy Me a Coffee, Ko-fi, Patreon …).
     Leave blank to use the pledge form (we email the donor a secure link). */
  donate: { stripe: "", paypal: "", bmc: "", kofi: "", patreon: "", github: "" },

  /* Verified official-channel safety videos (YouTube IDs). Add more anytime. */
  videos: [
    { id: "O92KL1mw77c", t: "Hands-Only CPR", src: "British Heart Foundation", topic: "cpr" },
    { id: "UFvL7wTFzl0", t: "How to use a defibrillator (AED)", src: "St John Ambulance", topic: "aed" },
    { id: "HGBBu4zr8sM", t: "First aid for choking", src: "St John Ambulance", topic: "choking" },
    { id: "L6jjyikFwmA", t: "First aid for heavy bleeding", src: "British Red Cross", topic: "bleeding" },
    { id: "dQozahCH8IE", t: "First aid for a burn or scald", src: "British Red Cross", topic: "burns" },
    { id: "2p0rUIKkX50", t: "Stroke: Act FAST", src: "NHS", topic: "stroke" },
    { id: "BlcGzTRZvuA", t: "Stroke survivors: Act FAST", src: "NHS", topic: "stroke" },
    { id: "GmqXqwSV3bo", t: "The recovery position", src: "St John Ambulance", topic: "recovery" },
    { id: "iU5dlRRjpjo", t: "Build a go-kit", src: "FEMA", topic: "kit" },
    { id: "B3mzFRNTZVc", t: "Drop, Cover and Hold On", src: "FEMA", topic: "earthquake" }
  ],
  /* Your own YouTube channel (for the subscribe CTA). */
  youtubeChannel: "https://www.youtube.com/results?search_query=first+aid+basics"
};
