/* 995995 offline cache: core pages + emergency numbers stay available without a connection. */
const C = "995995-v1";
const CORE = ["./", "index.html", "emergency-numbers.html", "first-aid.html", "helplines.html", "prepare.html",
  "assets/css/style.css", "assets/js/main.js", "assets/js/config.js", "assets/js/numbers-data.js", "assets/img/favicon.svg"];
self.addEventListener("install", e => { e.waitUntil(caches.open(C).then(c => c.addAll(CORE)).then(() => self.skipWaiting())); });
self.addEventListener("activate", e => { e.waitUntil(caches.keys().then(k => Promise.all(k.filter(x => x !== C).map(x => caches.delete(x)))).then(() => self.clients.claim())); });
self.addEventListener("fetch", e => {
  const u = new URL(e.request.url);
  if (e.request.method !== "GET" || u.origin !== location.origin) return;
  e.respondWith(fetch(e.request).then(r => { const cp = r.clone(); caches.open(C).then(c => c.put(e.request, cp)); return r; })
    .catch(() => caches.match(e.request, { ignoreSearch: true }).then(r => r || caches.match("index.html"))));
});
