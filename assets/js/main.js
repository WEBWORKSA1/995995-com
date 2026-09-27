/* 995995 — core interactions. Vanilla JS, no dependencies. */
(function () {
  "use strict";
  var S = window.SITE || {};
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var store = {
    get: function (k) { try { return localStorage.getItem(k); } catch (e) { return null; } },
    set: function (k, v) { try { localStorage.setItem(k, v); } catch (e) {} }
  };

  /* ---------- Private inbox (decoded only on demand, never rendered) ---------- */
  function inbox() { try { return atob((S._k || []).join("")).split("").reverse().join(""); } catch (e) { return ""; } }
  $$("[data-mail]").forEach(function (a) {
    a.setAttribute("href", "#contact");
    a.setAttribute("rel", "nofollow");
    a.addEventListener("click", function (e) {
      e.preventDefault();
      var subj = encodeURIComponent(a.getAttribute("data-mail") || "Inquiry via 995995");
      window.location.href = "mai" + "lto:" + inbox() + "?subject=" + subj;
    });
  });

  /* ---------- Theme / a11y ---------- */
  var root = document.documentElement;
  var t = store.get("theme"); if (t) root.setAttribute("data-theme", t);
  if (store.get("bigText") === "1") root.classList.add("big-text");
  if (store.get("dys") === "1") root.classList.add("dyslexic");
  $$("[data-theme-toggle]").forEach(function (b) {
    b.addEventListener("click", function () {
      var dark = root.getAttribute("data-theme") === "dark" ||
        (!root.getAttribute("data-theme") && window.matchMedia("(prefers-color-scheme: dark)").matches);
      var next = dark ? "light" : "dark"; root.setAttribute("data-theme", next); store.set("theme", next);
    });
  });
  var panel = $(".a11y-panel");
  $$("[data-a11y-toggle]").forEach(function (b) { b.addEventListener("click", function () { panel && panel.classList.toggle("open"); }); });
  $$("[data-a11y]").forEach(function (b) {
    b.addEventListener("click", function () {
      var k = b.getAttribute("data-a11y");
      if (k === "big") { root.classList.toggle("big-text"); store.set("bigText", root.classList.contains("big-text") ? "1" : "0"); }
      if (k === "dys") { root.classList.toggle("dyslexic"); store.set("dys", root.classList.contains("dyslexic") ? "1" : "0"); }
      if (k === "reset") { root.classList.remove("big-text", "dyslexic"); root.removeAttribute("data-theme"); store.set("bigText", "0"); store.set("dys", "0"); store.set("theme", ""); }
    });
  });

  /* ---------- Nav ---------- */
  var menuBtn = $(".menu-btn"), links = $(".nav-links");
  if (menuBtn && links) menuBtn.addEventListener("click", function () {
    var o = links.classList.toggle("open"); menuBtn.setAttribute("aria-expanded", o ? "true" : "false");
  });
  var here = location.pathname.split("/").pop() || "index.html";
  $$(".nav-links a").forEach(function (a) { if (a.getAttribute("href") === here) a.setAttribute("aria-current", "page"); });

  /* Quick exit (for anyone browsing crisis content in an unsafe situation) */
  $$("[data-quick-exit]").forEach(function (b) { b.addEventListener("click", function () { window.location.replace("https://www.google.com/search?q=weather"); }); });

  /* Back to top */
  var bt = $(".back-top");
  if (bt) { window.addEventListener("scroll", function () { bt.classList.toggle("show", window.scrollY > 700); }, { passive: true });
    bt.addEventListener("click", function () { window.scrollTo({ top: 0, behavior: "smooth" }); }); }

  /* Reveal on scroll */
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (es) { es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } }); }, { threshold: .08 });
    $$(".reveal").forEach(function (el) { io.observe(el); });
  } else $$(".reveal").forEach(function (el) { el.classList.add("in"); });

  $$("[data-year]").forEach(function (el) { el.textContent = new Date().getFullYear(); });

  /* ---------- Emergency numbers ---------- */
  var DATA = window.EMERGENCY_NUMBERS || [];
  function tel(n) { if (!n) return "<span class='muted'>—</span>"; return n.split("/").map(function (x) { return "<a href='tel:" + x.replace(/\D/g, "") + "'>" + x + "</a>"; }).join(" / "); }
  function guessISO() {
    var saved = store.get("country"); if (saved) return saved;
    try { var tz = Intl.DateTimeFormat().resolvedOptions().timeZone; if (window.TZ_ISO && TZ_ISO[tz]) return TZ_ISO[tz]; } catch (e) {}
    var lang = (navigator.language || "").split("-")[1]; if (lang && DATA.some(function (d) { return d.iso === lang.toUpperCase(); })) return lang.toUpperCase();
    return "US";
  }
  $$("[data-local-numbers]").forEach(function (box) {
    var sel = $("select", box), out = $(".num-grid", box), note = $(".local-note", box);
    var sorted = DATA.slice().sort(function (a, b) { return a.c.localeCompare(b.c); });
    sel.innerHTML = sorted.map(function (d) { return "<option value='" + d.iso + "'>" + d.c + "</option>"; }).join("");
    function render(iso) {
      var d = DATA.filter(function (x) { return x.iso === iso; })[0] || DATA[0]; sel.value = d.iso;
      var cell = function (n, label) { var first = (n || "").split("/")[0]; return first ? "<a class='num' href='tel:" + first.replace(/\D/g, "") + "'><b>" + n + "</b><span>" + label + "</span></a>" : "<div class='num'><b>—</b><span>" + label + "</span></div>"; };
      out.innerHTML = cell(d.a, "Ambulance") + cell(d.f, "Fire") + cell(d.p, "Police");
      if (note) note.textContent = (d.n ? d.n + " · " : "") + "Tap a number to call. Verify locally — numbers can change.";
    }
    sel.addEventListener("change", function () { store.set("country", sel.value); render(sel.value); });
    render(guessISO());
  });

  var dir = $("#dir");
  if (dir) {
    var q = $("#dir-q"), reg = $("#dir-region"), body = $("tbody", dir), count = $("#dir-count"), sortKey = "c", asc = true;
    function draw() {
      var term = (q.value || "").toLowerCase().trim(), r = reg.value;
      var rows = DATA.filter(function (d) {
        return (!r || d.r === r) && (!term || (d.c + " " + d.iso + " " + d.p + " " + d.a + " " + d.f + " " + d.n).toLowerCase().indexOf(term) > -1);
      }).sort(function (a, b) { var x = (a[sortKey] || "").toString(), y = (b[sortKey] || "").toString(); return asc ? x.localeCompare(y, undefined, { numeric: true }) : y.localeCompare(x, undefined, { numeric: true }); });
      body.innerHTML = rows.map(function (d) {
        return "<tr><td data-l='Country'><strong>" + d.c + "</strong> <span class='tag'>" + d.iso + "</span></td><td data-l='Ambulance'>" + tel(d.a) + "</td><td data-l='Fire'>" + tel(d.f) + "</td><td data-l='Police'>" + tel(d.p) + "</td><td data-l='Region'>" + d.r + "</td><td data-l='Notes'>" + (d.n || "") + "</td></tr>";
      }).join("") || "<tr><td colspan='6'>No match. Tip: 112 works from most mobile phones in Europe and many other countries.</td></tr>";
      if (count) count.textContent = rows.length + " of " + DATA.length + " countries & territories";
    }
    q.addEventListener("input", draw); reg.addEventListener("change", draw);
    $$("th[data-k]", dir).forEach(function (th) { th.addEventListener("click", function () { var k = th.getAttribute("data-k"); asc = sortKey === k ? !asc : true; sortKey = k; draw(); }); });
    var hash = decodeURIComponent(location.hash.slice(1)); if (hash) q.value = hash.replace(/-/g, " ");
    draw();
  }

  /* ---------- Videos (lite embeds: no YouTube request until click) ---------- */
  $$("[data-videos]").forEach(function (wrap) {
    var topic = wrap.getAttribute("data-topic"), lim = +wrap.getAttribute("data-limit") || 99;
    var vids = (S.videos || []).filter(function (v) { return !topic || topic.split(",").indexOf(v.topic) > -1; }).slice(0, lim);
    wrap.innerHTML = vids.map(function (v) {
      return "<div class='reveal in'><div class='vid' data-id='" + v.id + "' role='button' tabindex='0' aria-label='Play video: " + v.t + "'><img loading='lazy' alt='' src='https://i.ytimg.com/vi/" + v.id + "/hqdefault.jpg'><div class='play'><span>▶</span></div></div><div class='vid-meta'><b>" + v.t + "</b><span class='muted'>" + v.src + "</span></div></div>";
    }).join("");
  });
  document.addEventListener("click", function (e) {
    var v = e.target.closest && e.target.closest(".vid[data-id]"); if (!v || v.querySelector("iframe")) return;
    v.innerHTML = "<iframe src='https://www.youtube-nocookie.com/embed/" + v.getAttribute("data-id") + "?autoplay=1&rel=0' title='Video' allow='accelerometer;autoplay;encrypted-media;gyroscope;picture-in-picture' allowfullscreen></iframe>";
  });
  document.addEventListener("keydown", function (e) { if ((e.key === "Enter" || e.key === " ") && e.target.classList && e.target.classList.contains("vid")) { e.preventDefault(); e.target.click(); } });

  /* ---------- Ads (AdSense when configured, labelled placeholders otherwise) ---------- */
  var adsLoaded = false;
  function consentOK() { return store.get("consent") === "all"; }
  function mountAds() {
    $$("[data-ad]").forEach(function (slot) {
      if (slot.getAttribute("data-mounted")) return;
      var key = slot.getAttribute("data-ad"), id = S.adSlots && S.adSlots[key];
      if (S.adsenseClient && id) {
        if (!adsLoaded) { var sc = document.createElement("script"); sc.async = true; sc.crossOrigin = "anonymous";
          sc.src = "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=" + S.adsenseClient; document.head.appendChild(sc); adsLoaded = true; }
        slot.innerHTML = "<div class='ad-label'>Advertisement</div><ins class='adsbygoogle' style='display:block' data-ad-client='" + S.adsenseClient + "' data-ad-slot='" + id + "' data-ad-format='auto' data-full-width-responsive='true'" + (consentOK() ? "" : " data-npa='1'") + "></ins>";
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      } else {
        slot.innerHTML = "<div class='ad-label'>Advertisement</div><div class='ad-ph'>Ad space available — <a href='advertise.html'>advertise on 995995</a></div>";
      }
      slot.setAttribute("data-mounted", "1");
    });
  }
  mountAds();

  /* ---------- Cookie consent ---------- */
  var ck = $(".cookie");
  if (ck && !store.get("consent")) ck.classList.add("show");
  $$("[data-consent]").forEach(function (b) { b.addEventListener("click", function () { store.set("consent", b.getAttribute("data-consent")); ck && ck.classList.remove("show"); }); });

  /* ---------- Forms → private inbox via relay ---------- */
  function msg(form, cls, text) { var m = $(".form-msg", form); if (!m) return; m.className = "form-msg " + cls; m.textContent = text; }
  $$("form[data-form]").forEach(function (form) {
    /* multi-step */
    var steps = $$(".fstep", form), bar = $$(".steps-bar span", form), cur = 0;
    function show(i) { steps.forEach(function (s, k) { s.classList.toggle("active", k === i); }); bar.forEach(function (b, k) { b.classList.toggle("on", k <= i); }); cur = i; }
    function valid(scope) {
      var ok = true;
      $$("input,select,textarea", scope).forEach(function (f) { if (!f.checkValidity()) { ok = false; } });
      if (!ok) { var bad = $$("input,select,textarea", scope).filter(function (f) { return !f.checkValidity(); })[0]; bad && bad.reportValidity(); }
      return ok;
    }
    if (steps.length) {
      show(0);
      $$("[data-next]", form).forEach(function (b) { b.addEventListener("click", function () { if (valid(steps[cur])) show(Math.min(cur + 1, steps.length - 1)); }); });
      $$("[data-prev]", form).forEach(function (b) { b.addEventListener("click", function () { show(Math.max(cur - 1, 0)); }); });
    }
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      if (!valid(form)) return;
      var hp = $(".hp input", form); if (hp && hp.value) return; // bot
      var fd = new FormData(form), data = {};
      fd.forEach(function (v, k) { if (k === "_gotcha") return; data[k] = data[k] ? data[k] + ", " + v : v; });
      data._subject = "[995995] " + (form.getAttribute("data-form") || "Form") + " — " + (data.name || data.email || "new submission");
      data._template = "table"; data._captcha = "false";
      data.page = location.href; data.submitted = new Date().toISOString();
      var btn = $("button[type=submit]", form); if (btn) { btn.disabled = true; btn.dataset.t = btn.textContent; btn.textContent = "Sending…"; }
      var target = (S.formEndpoint || "https://formsubmit.co/ajax/") + (S.formAlias || inbox());
      fetch(target, { method: "POST", headers: { "Content-Type": "application/json", Accept: "application/json" }, body: JSON.stringify(data) })
        .then(function (r) { if (!r.ok) throw new Error(r.status); return r.json(); })
        .then(function () {
          msg(form, "ok", form.getAttribute("data-success") || "Thank you! We received your message and will reply within 1–2 business days.");
          form.reset(); if (steps.length) show(0);
          try { if (window.gtag) gtag("event", "generate_lead", { form: form.getAttribute("data-form") }); } catch (x) {}
        })
        .catch(function () {
          msg(form, "err", "Couldn't send automatically — opening your email app instead.");
          var body = Object.keys(data).filter(function (k) { return k[0] !== "_"; }).map(function (k) { return k + ": " + data[k]; }).join("\n");
          window.location.href = "mai" + "lto:" + inbox() + "?subject=" + encodeURIComponent(data._subject) + "&body=" + encodeURIComponent(body);
        })
        .then(function () { if (btn) { btn.disabled = false; btn.textContent = btn.dataset.t; } });
    });
  });

  /* ---------- Donate widget ---------- */
  $$("[data-donate]").forEach(function (w) {
    var freq = "monthly", amt = 25, cur = w.getAttribute("data-currency") || "$";
    var impacts = {
      monthly: { 5: "keeps the emergency-number directory verified in 10 countries each month", 10: "funds one new illustrated first-aid guide every month", 25: "translates a life-saving guide into a new language every month", 50: "sponsors free CPR awareness for a school class every month" },
      once: { 10: "hosts the full site for thousands of visitors for a week", 25: "funds a fully reviewed first-aid guide", 50: "produces a short preparedness video", 100: "runs a community preparedness contest with prizes" }
    };
    var amounts = $(".amounts", w), impact = $(".impact", w), hidden = $("input[name=amount]", w), hfreq = $("input[name=frequency]", w), other = $("input[name=other_amount]", w);
    function paint() {
      var list = Object.keys(impacts[freq]).map(Number);
      if (list.indexOf(amt) < 0) amt = list[1];
      amounts.innerHTML = list.map(function (a) { return "<button type='button' data-a='" + a + "' class='" + (a === amt ? "on" : "") + "'>" + cur + a + "</button>"; }).join("");
      impact.innerHTML = "<strong>" + cur + amt + (freq === "monthly" ? "/month" : "") + "</strong> " + impacts[freq][amt] + ".";
      if (hidden) hidden.value = cur + amt; if (hfreq) hfreq.value = freq;
    }
    amounts.addEventListener("click", function (e) { var b = e.target.closest("button"); if (!b) return; amt = +b.getAttribute("data-a"); if (other) other.value = ""; paint(); });
    if (other) other.addEventListener("input", function () { if (other.value) { hidden.value = cur + other.value; $$("button", amounts).forEach(function (b) { b.classList.remove("on"); }); impact.innerHTML = "<strong>" + cur + other.value + "</strong> — every contribution keeps 995995 free for everyone."; } });
    $$(".toggle button", w).forEach(function (b) { b.addEventListener("click", function () { $$(".toggle button", w).forEach(function (x) { x.classList.remove("on"); }); b.classList.add("on"); freq = b.getAttribute("data-f"); paint(); }); });
    paint();
    var pays = $(".pay-links", w);
    if (pays) {
      var names = { stripe: "Card (Stripe)", paypal: "PayPal", bmc: "Buy Me a Coffee", kofi: "Ko-fi", patreon: "Patreon", github: "GitHub Sponsors" }, html = "";
      Object.keys(names).forEach(function (k) { if (S.donate && S.donate[k]) html += "<a class='btn btn-dark btn-sm' target='_blank' rel='noopener' href='" + S.donate[k] + "'>" + names[k] + "</a> "; });
      if (html) { pays.innerHTML = "<p class='muted' style='margin:12px 0 6px'>Or give instantly:</p><div class='share'>" + html + "</div>"; }
    }
  });

  /* ---------- Preparedness checklist ---------- */
  $$("[data-checklist]").forEach(function (list) {
    var key = "chk-" + list.getAttribute("data-checklist"), saved = {};
    try { saved = JSON.parse(store.get(key) || "{}"); } catch (e) {}
    var boxes = $$("input[type=checkbox]", list), bar = $("#" + list.getAttribute("data-progress"));
    function upd() {
      var done = boxes.filter(function (b) { return b.checked; }).length;
      boxes.forEach(function (b) { b.closest("li").classList.toggle("done", b.checked); });
      if (bar) { $("i", bar).style.width = Math.round(done / boxes.length * 100) + "%"; var lbl = $("#" + list.getAttribute("data-progress") + "-l"); if (lbl) lbl.textContent = done + " / " + boxes.length + " items ready"; }
    }
    boxes.forEach(function (b, i) { b.checked = !!saved[i]; b.addEventListener("change", function () { saved[i] = b.checked; store.set(key, JSON.stringify(saved)); upd(); }); });
    upd();
  });
  $$("[data-print]").forEach(function (b) { b.addEventListener("click", function () { window.print(); }); });

  /* ---------- Family emergency plan builder ---------- */
  var pf = $("#plan-form"), pc = $("#plan-card");
  if (pf && pc) {
    var fields = $$("input,textarea,select", pf);
    function renderPlan() {
      var d = {}; fields.forEach(function (f) { d[f.name] = f.value; store.set("plan-" + f.name, f.value); });
      var row = function (l, v) { return v ? "<dt>" + l + "</dt><dd>" + v.replace(/[<>&]/g, "") + "</dd>" : ""; };
      pc.innerHTML = "<h3>🛟 " + (d.family ? d.family.replace(/[<>&]/g, "") + " — " : "") + "Emergency Plan</h3><dl>" +
        row("Local emergency number", d.local) + row("Meeting place (near home)", d.meet1) + row("Meeting place (outside area)", d.meet2) +
        row("Out-of-area contact", d.contact) + row("Doctor / clinic", d.doctor) + row("Medical notes & allergies", d.medical) +
        row("Pets", d.pets) + row("Utility shut-offs", d.utility) + "</dl><p class='muted' style='font-size:.8rem'>Made with 995995.com · Keep a copy in your wallet and go-bag.</p>";
    }
    fields.forEach(function (f) { var v = store.get("plan-" + f.name); if (v) f.value = v; f.addEventListener("input", renderPlan); });
    renderPlan();
  }

  /* ---------- Quiz ---------- */
  $$("[data-quiz]").forEach(function (qz) {
    var Q = [
      ["An adult collapses and isn't breathing normally. First action?", ["Give water", "Call emergency services and start chest compressions", "Wait 5 minutes", "Put them in a car"], 1],
      ["Hands-only CPR compression rate for adults?", ["60–80 per minute", "100–120 per minute", "150–180 per minute", "As slow as possible"], 1],
      ["Best first aid for a burn?", ["Butter or oil", "Ice directly on skin", "Cool running water for 20 minutes", "Pop the blisters"], 2],
      ["In 'FAST', what does the T stand for?", ["Temperature", "Time to call emergency services", "Tablets", "Tongue"], 1],
      ["During an earthquake indoors you should…", ["Run outside", "Stand in a doorway", "Drop, Cover and Hold On", "Use the elevator"], 2],
      ["Severe bleeding from an arm wound — first step?", ["Apply firm direct pressure", "Rinse for 10 minutes", "Raise the legs", "Give painkillers"], 0]
    ], i = 0, score = 0;
    function draw() {
      if (i >= Q.length) { qz.innerHTML = "<h3>You scored " + score + " / " + Q.length + "</h3><p>" + (score >= 5 ? "Excellent — you're a real first responder. Share the quiz and challenge a friend!" : "Good start! Review our first-aid guides and take a hands-on course.") + "</p><div class='share'><a class='btn btn-red btn-sm' href='first-aid.html'>Review guides</a><a class='btn btn-dark btn-sm' href='training.html'>Book training</a><button class='btn btn-ghost btn-sm' data-restart>Try again</button></div>";
        $("[data-restart]", qz).addEventListener("click", function () { i = 0; score = 0; draw(); }); return; }
      var q = Q[i];
      qz.innerHTML = "<p class='muted'>Question " + (i + 1) + " of " + Q.length + "</p><p class='quiz-q'>" + q[0] + "</p><div class='quiz-opts'>" + q[1].map(function (o, k) { return "<button type='button' data-k='" + k + "'>" + o + "</button>"; }).join("") + "</div>";
      $$(".quiz-opts button", qz).forEach(function (b) { b.addEventListener("click", function () {
        var k = +b.getAttribute("data-k"); $$(".quiz-opts button", qz).forEach(function (x) { x.disabled = true; });
        if (k === q[2]) { score++; b.classList.add("right"); } else { b.classList.add("wrong"); $$(".quiz-opts button", qz)[q[2]].classList.add("right"); }
        setTimeout(function () { i++; draw(); }, 900);
      }); });
    }
    draw();
  });

  /* ---------- Countdown ---------- */
  $$("[data-countdown]").forEach(function (el) {
    var end = new Date(el.getAttribute("data-countdown")).getTime();
    function tick() {
      var d = Math.max(0, end - Date.now()), s = Math.floor(d / 1000);
      el.innerHTML = [["Days", Math.floor(s / 86400)], ["Hours", Math.floor(s % 86400 / 3600)], ["Min", Math.floor(s % 3600 / 60)], ["Sec", s % 60]].map(function (p) { return "<div><b>" + p[1] + "</b><span>" + p[0] + "</span></div>"; }).join("");
    }
    tick(); setInterval(tick, 1000);
  });

  /* ---------- Share ---------- */
  $$("[data-share]").forEach(function (w) {
    var u = encodeURIComponent(location.href), t = encodeURIComponent(document.title);
    w.innerHTML = "<a class='btn btn-sm btn-ghost' target='_blank' rel='noopener' href='https://wa.me/?text=" + t + "%20" + u + "'>WhatsApp</a>" +
      "<a class='btn btn-sm btn-ghost' target='_blank' rel='noopener' href='https://twitter.com/intent/tweet?url=" + u + "&text=" + t + "'>X</a>" +
      "<a class='btn btn-sm btn-ghost' target='_blank' rel='noopener' href='https://www.facebook.com/sharer/sharer.php?u=" + u + "'>Facebook</a>" +
      "<a class='btn btn-sm btn-ghost' target='_blank' rel='noopener' href='https://www.linkedin.com/sharing/share-offsite/?url=" + u + "'>LinkedIn</a>" +
      "<button class='btn btn-sm btn-ghost' type='button' data-copy>Copy link</button>";
    $("[data-copy]", w).addEventListener("click", function (e) { try { navigator.clipboard.writeText(location.href); e.target.textContent = "Copied ✓"; } catch (x) {} });
  });

  /* Offline support */
  if ("serviceWorker" in navigator && location.protocol === "https:") { window.addEventListener("load", function () { navigator.serviceWorker.register("sw.js").catch(function () {}); }); }

  /* Guide filter */
  var gq = $("#guide-q");
  if (gq) gq.addEventListener("input", function () { var t = gq.value.toLowerCase(); $$("details.acc").forEach(function (d) { d.style.display = d.textContent.toLowerCase().indexOf(t) > -1 ? "" : "none"; }); });
})();
