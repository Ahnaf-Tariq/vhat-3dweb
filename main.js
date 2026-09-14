(function () {
  "use strict";

  let lenis;
  function initLenis() {
    if (typeof Lenis === "undefined" || prefersReducedMotion) return;

    lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.5,
      infinite: false,
    });

    if (typeof gsap !== "undefined" && typeof ScrollTrigger !== "undefined") {
      gsap.registerPlugin(ScrollTrigger);
      lenis.on("scroll", ScrollTrigger.update);
      gsap.ticker.add((time) => {
        lenis.raf(time * 1000);
      });
      gsap.ticker.lagSmoothing(0);
    } else {
      function raf(time) {
        lenis.raf(time);
        requestAnimationFrame(raf);
      }
      requestAnimationFrame(raf);
    }
  }

  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;
  const isMobile = () => window.innerWidth < 768;
  const usesCompactModelLayout = () => window.innerWidth <= 900;

  const i18n = {
    da: {
      "nav.how": "Sådan virker det",
      "nav.audience": "Til dig",
      "nav.pricing": "Priser",
      "nav.about": "Om os",
      "nav.login": "Log ind",
      "nav.cta": "Start gratis prøve",
      "hero.badge": "Moms på autopilot",
      "hero.title1": "Få momsen rigtig",
      "hero.title2": "før du indberetter",
      "hero.sub":
        "VhAT scanner automatisk alle dine posteringer, finder fejl og glemte fradrag, og retter dem med ét klik i e-conomic. Ro i maven — uden manuel spot-check.",
      "hero.cta1": "Start 14 dages gratis prøve",
      "hero.cta2": "Se hvordan det virker",
      "stats.eyebrow": "Hvorfor VhAT findes",
      "stats.title": "Danmark har et momsproblem.",
      "stats.lede":
        "Skattestyrelsens egen landsdækkende gennemgang fandt fejl i de fleste momsindberetninger — både små og store, i begge retninger.",
      "stats.s1": "momsindberetninger indeholder en fejl",
      "stats.s2": "af Danmarks skatteindtægter er moms",
      "stats.s3": "af virksomhederne missede fristen",
      "stats.s4": "Danmarks momsgab — blandt Europas højeste",
      "aud.eyebrow": "Bygget til to typer arbejde",
      "aud.title": "Hvem tjekker momsen i dag?",
      "aud.b.tag": "Til virksomheder",
      "aud.b.title": "Tjek din egen moms før du indberetter",
      "aud.b.body":
        "Forbind dit regnskabssystem, kør et fuldt momscheck på få minutter, og ret det der er galt direkte — uden regneark og gætteri.",
      "aud.b.cta": "Se virksomhedspriser",
      "aud.a.tag": "Til revisorer & bogholdere",
      "aud.a.title": "Standardisér momskvalitet på tværs af alle kunder",
      "aud.a.body":
        "Gennemgå hele kundeporteføljer på én gang, skær ned på manuelle stikprøver, og lever konsistent, dokumenteret kvalitet — i skala.",
      "aud.a.cta": "Book en partner-demo",
      "how.eyebrow": "Sådan virker det",
      "how.title": "Tre trin til en ren momsindberetning.",
      "how.s1.title": "VhAT scanner alt",
      "how.s1.body":
        "Hver eneste købs- og salgstransaktion i dit regnskab bliver tjekket automatisk — ikke bare en stikprøve.",
      "how.s2.title": "Du ser hvad der er galt",
      "how.s2.body":
        "Et klart, forståeligt overblik over rettelser og eventuelle fradrag du har glemt — uden regnskabsjargon.",
      "how.s3.title": "Ret det med ét klik",
      "how.s3.body":
        "Skub rettelser direkte tilbage til e-conomic, eller dit regnskabssystem, med det samme.",
      "feat.eyebrow": "Alt inkluderet",
      "feat.title": "Ét værktøj, hele momsworkflowet.",
      "feat.1.title": "Automatisk gennemgang",
      "feat.1.body": "Hvert køb og salg tjekkes — ikke bare stikprøver.",
      "feat.2.title": "e-conomic integration",
      "feat.2.body": "Certificeret partner-integration, plus manuel upload.",
      "feat.3.title": "Revisionsspor",
      "feat.3.body": "Hver vurdering og rettelse dokumenteres automatisk.",
      "feat.4.title": "EU-momsnummer-tjek",
      "feat.4.body":
        "Indbygget VIES-validering for grænseoverskridende handel.",
      "feat.5.title": "Splitmoms-håndtering",
      "feat.5.body": "Delvise fradrag beregnes korrekt, automatisk.",
      "feat.6.title": "Team- & revisoradgang",
      "feat.6.body": "Inviter din revisor eller hele teamet, med rettigheder.",
      "trust.eyebrow": "Sikkerhed",
      "trust.title": "Vi passer godt på dine data.",
      "trust.1.title": "Beskyttet cloud",
      "trust.1.body":
        "Hostet på Microsoft Azure — en førende cloud-platform bygget til høj sikkerhed og stabil oppetid.",
      "trust.2.title": "GDPR-kompatibel",
      "trust.2.body":
        "Vi følger alle regler omkring personlige og følsomme data, uden undtagelse.",
      "trust.3.title": "MitID-verifikation",
      "trust.3.body":
        "Kun verificerede brugere får adgang — sikret af Danmarks nationale digitale ID.",
      "found.eyebrow": "Hvem byggede det",
      "found.title": "60+ års momserfaring, ét autopilot.",
      "found.t.role": "Direktør & Co-Founder",
      "found.t.body":
        "25+ års erfaring med moms. Tidligere Partner og Head of Indirect Tax hos Deloitte.",
      "found.c.role": "CEO & Co-Founder",
      "found.c.body":
        "20+ års erfaring med moms. Senest CEO hos KPMG Acor Tax.",
      "found.note":
        "Plus et fuldt team af udviklere og momsspecialister bag hvert tjek.",
      "price.eyebrow": "Priser",
      "price.title": "En plan til enhver momsbelastning.",
      "price.lede":
        "14 dages gratis prøve. Ingen kortbinding. Opsig når som helst.",
      "price.slider": "Posteringer pr. år",
      "price.basis.desc": "Tidsbesparelse via direkte genposteringer.",
      "price.plus.desc": "Ubegrænset fakturaadgang + revisoradgang.",
      "price.prem.desc": "Fuld kontrol, avanceret funktionalitet.",
      "price.popular": "Mest populær",
      "price.cta": "Start gratis prøve",
      "price.acc": "Håndterer du moms for flere kunder?",
      "price.acc.cta": "Få skræddersyet partnerpris",
      "final.title": "VhAT's not to like?",
      "final.sub":
        "Book en demo, eller start bare din gratis prøve — intet kort krævet.",
      "final.cta": "Prøv VhAT gratis i 14 dage",
      "foot.product": "Produkt",
      "foot.company": "Virksomhed",
      "foot.legal": "Juridisk",
    },
    en: {
      "nav.how": "How it works",
      "nav.audience": "For you",
      "nav.pricing": "Pricing",
      "nav.about": "About",
      "nav.login": "Log in",
      "nav.cta": "Start free trial",
      "hero.badge": "VAT on autopilot",
      "hero.title1": "Get your VAT right",
      "hero.title2": "before you file",
      "hero.sub":
        "VhAT automatically scans all your ledger entries, finds errors and missed deductions, and fixes them with one click in e-conomic. Peace of mind — without manual spot-checks.",
      "hero.cta1": "Start 14-day free trial",
      "hero.cta2": "See how it works",
      "stats.eyebrow": "Why VhAT exists",
      "stats.title": "Denmark has a VAT problem.",
      "stats.lede":
        "Skattestyrelsen's own nationwide review found errors hiding in most VAT filings — small mistakes and large ones, in both directions.",
      "stats.s1": "VAT filings contain an error",
      "stats.s2": "of Denmark's tax revenue is VAT",
      "stats.s3": "of businesses missed the deadline",
      "stats.s4": "Denmark's VAT gap — among Europe's highest",
      "aud.eyebrow": "Built for two kinds of work",
      "aud.title": "Who's checking the VAT today?",
      "aud.b.tag": "For businesses",
      "aud.b.title": "Check your own VAT before you file",
      "aud.b.body":
        "Connect your accounting software, run a full VAT check in minutes, and fix what's wrong directly — no spreadsheets, no guesswork.",
      "aud.b.cta": "See business pricing",
      "aud.a.tag": "For accountants & bookkeepers",
      "aud.a.title": "Standardize VAT quality across every client",
      "aud.a.body":
        "Review whole client portfolios at once, cut manual spot-checks, and deliver consistent, documented quality — at scale.",
      "aud.a.cta": "Book a partner demo",
      "how.eyebrow": "How it works",
      "how.title": "Three steps to a clean VAT return.",
      "how.s1.title": "VhAT scans everything",
      "how.s1.body":
        "Every purchase and sales transaction in your bookkeeping gets checked automatically — not just a sample.",
      "how.s2.title": "You see what's wrong",
      "how.s2.body":
        "A clear, understandable overview of corrections and any deductions you missed — no accounting jargon.",
      "how.s3.title": "Fix it with one click",
      "how.s3.body":
        "Push corrections straight back into e-conomic, or your accounting system of choice, instantly.",
      "feat.eyebrow": "Everything included",
      "feat.title": "One tool, the full VAT workflow.",
      "feat.1.title": "Automated transaction review",
      "feat.1.body": "Every purchase and sale checked — not spot-checked.",
      "feat.2.title": "e-conomic integration",
      "feat.2.body":
        "Certified partner integration, plus manual upload support.",
      "feat.3.title": "Audit trail",
      "feat.3.body":
        "Every assessment and correction documented automatically.",
      "feat.4.title": "EU VAT number check",
      "feat.4.body": "Built-in VIES validation for cross-border transactions.",
      "feat.5.title": "Split VAT handling",
      "feat.5.body": "Partial deductions calculated correctly, automatically.",
      "feat.6.title": "Team & accountant access",
      "feat.6.body":
        "Invite your accountant or your whole team, with permissions.",
      "trust.eyebrow": "Security",
      "trust.title": "We take good care of your data.",
      "trust.1.title": "Protected cloud",
      "trust.1.body":
        "Hosted on Microsoft Azure — a leading cloud platform built for high security and stable uptime.",
      "trust.2.title": "GDPR compliant",
      "trust.2.body":
        "We follow every rule around personal and sensitive data, without exception.",
      "trust.3.title": "MitID verification",
      "trust.3.body":
        "Only verified users get access — secured by Denmark's national digital ID.",
      "found.eyebrow": "Who built this",
      "found.title": "60+ years of VAT experience, one autopilot.",
      "found.t.role": "Director & Co-Founder",
      "found.t.body":
        "25+ years in VAT. Former Partner and Head of Indirect Tax at Deloitte.",
      "found.c.role": "CEO & Co-Founder",
      "found.c.body": "20+ years in VAT. Most recently CEO at KPMG Acor Tax.",
      "found.note":
        "Plus a full team of developers and VAT specialists behind every check.",
      "price.eyebrow": "Pricing",
      "price.title": "A plan for every VAT workload.",
      "price.lede": "14-day free trial. No card lock-in. Cancel anytime.",
      "price.slider": "Transactions per year",
      "price.basis.desc": "Time savings via direct re-postings.",
      "price.plus.desc": "Unlimited invoices + accountant access.",
      "price.prem.desc": "Full control, advanced functionality.",
      "price.popular": "Most popular",
      "price.cta": "Start free trial",
      "price.acc": "Managing VAT for multiple clients?",
      "price.acc.cta": "Get tailored partner pricing",
      "final.title": "VhAT's not to like?",
      "final.sub":
        "Book a demo, or just start your free trial — no card required.",
      "final.cta": "Try VhAT free for 14 days",
      "foot.product": "Product",
      "foot.company": "Company",
      "foot.legal": "Legal",
    },
  };

  let currentLang = "da";

  function setLanguage(lang) {
    currentLang = lang;
    document.documentElement.lang = lang;
    document.querySelectorAll("[data-i18n]").forEach((el) => {
      const key = el.getAttribute("data-i18n");
      if (i18n[lang] && i18n[lang][key] !== undefined)
        el.textContent = i18n[lang][key];
    });
    document.querySelectorAll(".lang-btn").forEach((btn) => {
      const active = btn.getAttribute("data-lang") === lang;
      btn.classList.toggle("is-active", active);
      btn.setAttribute("aria-pressed", String(active));
    });
    updatePricing(document.getElementById("volumeSlider")?.value || 0);
  }

  const header = document.getElementById("site-header");
  function onScroll() {
    if (window.scrollY > 20) header.classList.add("scrolled");
    else header.classList.remove("scrolled");
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  const toggle = document.getElementById("nav-toggle");
  const mobileMenu = document.getElementById("mobile-menu");
  if (toggle && mobileMenu) {
    toggle.addEventListener("click", () => {
      const open = mobileMenu.hidden;
      mobileMenu.hidden = !open;
      toggle.setAttribute("aria-expanded", String(open));
      document.body.style.overflow = open ? "hidden" : "";
    });
    mobileMenu.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        mobileMenu.hidden = true;
        toggle.setAttribute("aria-expanded", "false");
        document.body.style.overflow = "";
      });
    });
  }

  document.querySelectorAll(".lang-btn").forEach((btn) => {
    btn.addEventListener("click", () =>
      setLanguage(btn.getAttribute("data-lang")),
    );
  });

  const volumeTiers = [
    { label: "1,000", basis: 129, plus: 179, premium: 249 },
    { label: "2,000", basis: 179, plus: 249, premium: 349 },
    { label: "5,000", basis: 299, plus: 399, premium: 549 },
    { label: "10,000", basis: 499, plus: 649, premium: 849 },
    { label: "25,000", basis: 899, plus: 1099, premium: 1168 },
  ];

  function updatePricing(idx) {
    const i = Math.min(
      Math.max(parseInt(idx, 10) || 0, 0),
      volumeTiers.length - 1,
    );
    const t = volumeTiers[i];
    const label = document.getElementById("volumeLabel");
    const basis = document.getElementById("priceBasis");
    const plus = document.getElementById("pricePlus");
    const prem = document.getElementById("pricePremium");
    if (label)
      label.textContent =
        currentLang === "da" ? t.label + " posteringer" : t.label + " postings";
    if (basis) basis.textContent = t.basis;
    if (plus) plus.textContent = t.plus;
    if (prem) prem.textContent = t.premium;
  }

  const slider = document.getElementById("volumeSlider");
  if (slider) {
    slider.addEventListener("input", (e) => updatePricing(e.target.value));
    updatePricing(0);
  }

  function animateCount(el) {
    const target = parseFloat(el.getAttribute("data-count")) || 0;
    const suffix = el.getAttribute("data-suffix") || "";
    if (prefersReducedMotion) {
      el.textContent = target + suffix;
      return;
    }
    const duration = 1400;
    const start = performance.now();
    function frame(now) {
      const p = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      el.textContent = Math.round(target * eased) + suffix;
      if (p < 1) requestAnimationFrame(frame);
    }
    requestAnimationFrame(frame);
  }

  function initHowItWorks() {
    const pathSvg = document.querySelector(".how__line");
    const steps = document.querySelectorAll(".how__step");
    if (!pathSvg || !steps.length) return;
    if (prefersReducedMotion || isMobile()) {
      pathSvg.classList.add("path-drawn");
      steps.forEach((s) => s.classList.add("is-visible"));
      return;
    }
    if (typeof gsap === "undefined" || typeof ScrollTrigger === "undefined") {
      pathSvg.classList.add("path-drawn");
      steps.forEach((s) => s.classList.add("is-visible"));
      return;
    }
    gsap.registerPlugin(ScrollTrigger);
    ScrollTrigger.create({
      trigger: ".how__path",
      start: "top 70%",
      once: true,
      onEnter: () => {
        pathSvg.classList.add("path-drawn");
        steps.forEach((step, i) =>
          setTimeout(() => step.classList.add("is-visible"), 200 + i * 280),
        );
      },
    });
  }

  function initStats() {
    const cards = document.querySelectorAll(".stat-card__number");
    if (!cards.length) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animateCount(entry.target);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.4 },
    );
    cards.forEach((c) => observer.observe(c));
  }

  function iconInvoiceCheck() {
    const page = placeGeo(new THREE.BoxGeometry(1, 1.3, 0.05), {});
    const line1 = placeGeo(new THREE.BoxGeometry(0.6, 0.06, 0.03), {
      position: [-0.05, 0.42, 0.04],
    });
    const line2 = placeGeo(new THREE.BoxGeometry(0.6, 0.06, 0.03), {
      position: [-0.05, 0.26, 0.04],
    });
    const line3 = placeGeo(new THREE.BoxGeometry(0.4, 0.06, 0.03), {
      position: [-0.15, 0.1, 0.04],
    });
    const line4 = placeGeo(new THREE.BoxGeometry(0.5, 0.06, 0.03), {
      position: [-0.1, -0.06, 0.04],
    });
    const checkShort = placeGeo(new THREE.BoxGeometry(0.32, 0.11, 0.09), {
      position: [0.02, -0.35, 0.1],
      rotation: [0, 0, 0.75],
    });
    const checkLong = placeGeo(new THREE.BoxGeometry(0.6, 0.11, 0.09), {
      position: [0.3, -0.2, 0.1],
      rotation: [0, 0, -0.65],
    });
    return buildIcon([page, line1, line2, line3, line4, checkShort, checkLong]);
  }

  function iconPercent() {
    const s1 = placeGeo(new THREE.TorusGeometry(0.28, 0.11, 12, 24), {
      position: [-0.4, 0.45, 0],
    });
    const s2 = placeGeo(new THREE.TorusGeometry(0.28, 0.11, 12, 24), {
      position: [0.4, -0.45, 0],
    });
    const bar = placeGeo(new THREE.CylinderGeometry(0.09, 0.09, 1.5, 12), {
      rotation: [0, 0, -0.95],
    });
    return buildIcon([s1, s2, bar]);
  }

  function initFloatingModel() {
    const wrap = document.getElementById("floating-model");
    const canvas = document.getElementById("floating-model-canvas");
    if (!wrap || !canvas || typeof THREE === "undefined") return;
    if (prefersReducedMotion || isMobile()) {
      wrap.style.display = "none";
      return;
    }

    const size = 150;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(40, 1, 0.1, 20);
    camera.position.set(0, 0.3, 4.2);

    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true,
    });
    renderer.setSize(size, size);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);

    scene.add(new THREE.AmbientLight(0xffffff, 0.55));
    const key = new THREE.DirectionalLight(0xffffff, 0.9);
    key.position.set(2, 3, 3);
    scene.add(key);
    const rim = new THREE.PointLight(0xa78bfa, 1.5, 8);
    rim.position.set(-2, 1, 1.5);
    scene.add(rim);

    // Reuse the same low-poly laptop used in the "features" morph model
    const geo = iconInvoiceCheck();
    const solidMat = new THREE.MeshStandardMaterial({
      color: 0x15112a,
      roughness: 0.3,
      metalness: 0.6,
    });
    const wireMat = new THREE.MeshBasicMaterial({
      color: 0xa855f7,
      wireframe: true,
      transparent: true,
      opacity: 0.35,
    });
    const mesh = new THREE.Mesh(geo, solidMat);
    const wire = new THREE.Mesh(geo, wireMat);
    scene.add(mesh, wire);

    // Glowing "screen" accent
    const glow = new THREE.Mesh(
      new THREE.PlaneGeometry(0.85, 0.5),
      new THREE.MeshBasicMaterial({
        color: 0x8b5cf6,
        transparent: true,
        opacity: 0.55,
      }),
    );
    glow.position.set(0, 0.32, -0.05);
    glow.rotation.x = -0.35;
    scene.add(glow);

    (function render() {
      requestAnimationFrame(render);
      mesh.rotation.y += 0.006;
      mesh.rotation.x = Math.sin(mesh.rotation.y * 0.5) * 0.08;
      wire.rotation.copy(mesh.rotation);
      glow.rotation.set(
        mesh.rotation.x - 0.35,
        mesh.rotation.y,
        mesh.rotation.z,
      );
      renderer.render(scene, camera);
    })();

    // Scroll-linked left/right sweep across the whole page
    if (typeof gsap !== "undefined" && typeof ScrollTrigger !== "undefined") {
      gsap.registerPlugin(ScrollTrigger);
      const margin = size / 2 + 24;

      ScrollTrigger.create({
        trigger: document.documentElement,
        start: "top top",
        end: "bottom bottom",
        scrub: 0.6,
        onUpdate: (self) => {
          const p = self.progress;
          const minX = margin;
          const maxX = window.innerWidth - margin;
          const sweep = Math.sin(p * Math.PI * 6); // 6 left-right passes over the page
          const bob = Math.sin(p * Math.PI * 14) * 16;
          wrap.style.left = minX + (sweep * 0.5 + 0.5) * (maxX - minX) + "px";
          wrap.style.top = `calc(50% + ${bob}px)`;
        },
      });
    }

    window.addEventListener("resize", () => {
      if (isMobile()) {
        wrap.style.display = "none";
      }
    });
  }

  let scene,
    camera,
    renderer,
    orbs = [],
    animationId;

  function initHero3D() {
    const canvas = document.getElementById("hero-canvas");
    if (!canvas || prefersReducedMotion || isMobile()) {
      if (canvas) canvas.style.display = "none";
      return;
    }
    if (typeof THREE === "undefined") return;

    const frame = canvas.parentElement;
    const w = frame.clientWidth;
    const h = frame.clientHeight;

    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(45, w / h, 0.1, 100);
    camera.position.z = 6;

    renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(w, h);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);

    scene.add(new THREE.AmbientLight(0x8b5cf6, 0.35));
    const point = new THREE.PointLight(0xa78bfa, 1.2, 20);
    point.position.set(2, 2, 4);
    scene.add(point);

    [
      { r: 0.35, x: -2.2, y: 1.4, z: -1, color: 0x8b5cf6, speed: 0.4 },
      { r: 0.22, x: 2.4, y: -0.8, z: 0.5, color: 0xa78bfa, speed: 0.55 },
      { r: 0.18, x: 1.6, y: 1.6, z: -0.5, color: 0xc4b5fd, speed: 0.35 },
      { r: 0.12, x: -1.8, y: -1.2, z: 1, color: 0x7c3aed, speed: 0.7 },
      { r: 0.28, x: 0.4, y: 2.0, z: -1.5, color: 0x8b5cf6, speed: 0.3 },
    ].forEach((d) => {
      const geo = new THREE.SphereGeometry(d.r, 32, 32);
      const mat = new THREE.MeshStandardMaterial({
        color: d.color,
        transparent: true,
        opacity: 0.75,
        roughness: 0.25,
        metalness: 0.4,
        emissive: d.color,
        emissiveIntensity: 0.25,
      });
      const mesh = new THREE.Mesh(geo, mat);
      mesh.position.set(d.x, d.y, d.z);
      mesh.userData = {
        baseY: d.y,
        speed: d.speed,
        phase: Math.random() * Math.PI * 2,
      };
      scene.add(mesh);
      orbs.push(mesh);
    });

    const positions = new Float32Array(180);
    for (let i = 0; i < 180; i++) positions[i] = (Math.random() - 0.5) * 10;
    const pGeo = new THREE.BufferGeometry();
    pGeo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    const particles = new THREE.Points(
      pGeo,
      new THREE.PointsMaterial({
        color: 0xa78bfa,
        size: 0.04,
        transparent: true,
        opacity: 0.5,
        sizeAttenuation: true,
      }),
    );
    scene.add(particles);

    const clock = new THREE.Clock();
    function animate() {
      animationId = requestAnimationFrame(animate);
      const t = clock.getElapsedTime();
      orbs.forEach((orb) => {
        const { baseY, speed, phase } = orb.userData;
        orb.position.y = baseY + Math.sin(t * speed + phase) * 0.25;
        orb.rotation.y += 0.005;
      });
      particles.rotation.y = t * 0.03;
      renderer.render(scene, camera);
    }
    animate();

    window.addEventListener("resize", () => {
      if (isMobile()) {
        if (animationId) cancelAnimationFrame(animationId);
        if (canvas) canvas.style.display = "none";
        return;
      }
      const nw = frame.clientWidth,
        nh = frame.clientHeight;
      camera.aspect = nw / nh;
      camera.updateProjectionMatrix();
      renderer.setSize(nw, nh);
    });
  }

  function initVideoExpand() {
    const section = document.querySelector(".video-expand");
    const frame = document.querySelector(".video-expand__frame");
    const playBtn = document.getElementById("videoPlayBtn");
    const iframe = document.getElementById("vhat-video");
    if (!section || !frame) return;

    if (prefersReducedMotion || isMobile()) {
      if (playBtn && iframe) {
        playBtn.addEventListener("click", function () {
          playBtn.classList.add("is-hidden");
          var src = iframe.getAttribute("src") || "";
          if (src.indexOf("player[autoplay]=true") === -1) {
            iframe.src = src.replace(
              "player[autoplay]=false",
              "player[autoplay]=true",
            );
          }
        });
      }
      return;
    }

    if (typeof gsap === "undefined" || typeof ScrollTrigger === "undefined")
      return;
    gsap.registerPlugin(ScrollTrigger);

    gsap.set(frame, { scale: 0.68, borderRadius: "28px", force3D: true });

    gsap.to(frame, {
      scale: 1,
      borderRadius: "0px",
      ease: "none",
      force3D: true,
      scrollTrigger: {
        trigger: section,
        start: "top top",
        end: "bottom bottom",
        scrub: 0.45,
        invalidateOnRefresh: true,
      },
    });

    if (playBtn && iframe) {
      playBtn.addEventListener("click", function () {
        playBtn.classList.add("is-hidden");
        var src = iframe.getAttribute("src") || "";
        if (src.indexOf("player[autoplay]=true") === -1) {
          iframe.src = src.replace(
            "player[autoplay]=false",
            "player[autoplay]=true",
          );
        }
      });
    }
  }

  function createModelScene(canvasId, geometries) {
    const canvas = document.getElementById(canvasId);
    if (!canvas || typeof THREE === "undefined") return null;
    if (prefersReducedMotion || isMobile()) {
      canvas.style.display = "none";
      return null;
    }

    const parent = canvas.parentElement;
    let w = Math.max(parent.clientWidth, 320);
    let h = Math.max(parent.clientHeight, 320);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(42, w / h, 0.1, 100);
    camera.position.set(0, 0.1, 5.2);

    const renderer = new THREE.WebGLRenderer({
      canvas: canvas,
      alpha: true,
      antialias: true,
    });
    renderer.setSize(w, h);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);

    scene.add(new THREE.AmbientLight(0xffffff, 0.6));
    const d1 = new THREE.DirectionalLight(0xffffff, 0.9);
    d1.position.set(3, 5, 4);
    scene.add(d1);
    const d2 = new THREE.DirectionalLight(0xffffff, 0.3);
    d2.position.set(-3, -1, -2);
    scene.add(d2);

    const solidMat = new THREE.MeshStandardMaterial({
      color: 0x1a1a1a,
      roughness: 0.32,
      metalness: 0.65,
      transparent: true,
      opacity: 1,
    });
    const wireMat = new THREE.MeshBasicMaterial({
      color: 0xffffff,
      wireframe: true,
      transparent: true,
      opacity: 0.25,
    });

    const mesh = new THREE.Mesh(geometries[0], solidMat);
    const wire = new THREE.Mesh(geometries[0], wireMat);
    scene.add(mesh);
    scene.add(wire);

    const COUNT = 160;
    const pArr = new Float32Array(COUNT * 3);
    const pGeo = new THREE.BufferGeometry();
    pGeo.setAttribute("position", new THREE.BufferAttribute(pArr, 3));
    const pMat = new THREE.PointsMaterial({
      color: 0x1a1a1a,
      size: 0.055,
      transparent: true,
      opacity: 0,
      sizeAttenuation: true,
      depthWrite: false,
    });
    const points = new THREE.Points(pGeo, pMat);
    scene.add(points);

    let current = 0;
    let busy = false;
    let rot = 0;
    let pending = null;

    function fillFromGeometry(geo, target, scale) {
      const pos = geo.attributes.position;
      const n = pos.count;
      for (let i = 0; i < COUNT; i++) {
        const idx = Math.floor(Math.random() * n) * 3;
        target[i * 3] = pos.array[idx] * scale;
        target[i * 3 + 1] = pos.array[idx + 1] * scale;
        target[i * 3 + 2] = pos.array[idx + 2] * scale;
      }
    }

    function morphTo(index) {
      if (index < 0 || index >= geometries.length) return;
      if (index === current) return;
      if (busy) {
        pending = index;
        return;
      }
      busy = true;
      const fromGeo = geometries[current];
      const toGeo = geometries[index];

      const fromPts = new Float32Array(COUNT * 3);
      const midPts = new Float32Array(COUNT * 3);
      const toPts = new Float32Array(COUNT * 3);
      fillFromGeometry(fromGeo, fromPts, 1);
      fillFromGeometry(toGeo, toPts, 1);
      for (let i = 0; i < COUNT; i++) {
        const a = Math.random() * Math.PI * 2;
        const b = (Math.random() - 0.5) * Math.PI;
        const r = 2.4 + Math.random() * 1.4;
        midPts[i * 3] = Math.cos(a) * Math.cos(b) * r;
        midPts[i * 3 + 1] = Math.sin(b) * r * 0.85;
        midPts[i * 3 + 2] = Math.sin(a) * Math.cos(b) * r;
      }

      for (let i = 0; i < COUNT * 3; i++) pArr[i] = fromPts[i];
      points.geometry.attributes.position.needsUpdate = true;

      if (typeof gsap === "undefined") {
        mesh.geometry = toGeo;
        wire.geometry = toGeo;
        current = index;
        busy = false;
        if (pending !== null) {
          const p = pending;
          pending = null;
          morphTo(p);
        }
        return;
      }

      const tl = gsap.timeline({
        onComplete: function () {
          busy = false;
          if (pending !== null && pending !== current) {
            const p = pending;
            pending = null;
            morphTo(p);
          } else {
            pending = null;
          }
        },
      });

      tl.to(pMat, { opacity: 1, duration: 0.15 }, 0);
      tl.to(solidMat, { opacity: 0, duration: 0.28 }, 0);
      tl.to(wireMat, { opacity: 0, duration: 0.25 }, 0);
      tl.to(
        mesh.scale,
        { x: 0.01, y: 0.01, z: 0.01, duration: 0.4, ease: "power2.in" },
        0,
      );
      tl.to(
        wire.scale,
        { x: 0.01, y: 0.01, z: 0.01, duration: 0.4, ease: "power2.in" },
        0,
      );

      const spread = { t: 0 };
      tl.to(
        spread,
        {
          t: 1,
          duration: 0.5,
          ease: "power2.out",
          onUpdate: function () {
            const t = spread.t;
            for (let i = 0; i < COUNT * 3; i++) {
              pArr[i] = fromPts[i] + (midPts[i] - fromPts[i]) * t;
            }
            points.geometry.attributes.position.needsUpdate = true;
          },
        },
        0.05,
      );

      tl.add(function () {
        mesh.geometry = toGeo;
        wire.geometry = toGeo;
        mesh.scale.set(0.01, 0.01, 0.01);
        wire.scale.set(0.01, 0.01, 0.01);
        solidMat.opacity = 0;
        wireMat.opacity = 0;
        current = index;
      });

      const reform = { t: 0 };
      tl.to(reform, {
        t: 1,
        duration: 0.6,
        ease: "power3.inOut",
        onUpdate: function () {
          const t = reform.t;
          for (let i = 0; i < COUNT * 3; i++) {
            pArr[i] = midPts[i] + (toPts[i] - midPts[i]) * t;
          }
          points.geometry.attributes.position.needsUpdate = true;
        },
      });

      tl.to(
        mesh.scale,
        { x: 1, y: 1, z: 1, duration: 0.55, ease: "power3.out" },
        "-=0.55",
      );
      tl.to(
        wire.scale,
        { x: 1, y: 1, z: 1, duration: 0.55, ease: "power3.out" },
        "-=0.55",
      );
      tl.to(solidMat, { opacity: 1, duration: 0.35 }, "-=0.4");
      tl.to(wireMat, { opacity: 0.25, duration: 0.35 }, "-=0.35");
      tl.to(pMat, { opacity: 0, duration: 0.3 }, "-=0.15");
    }

    (function loop() {
      requestAnimationFrame(loop);
      rot += 0.007;
      mesh.rotation.y = rot;
      mesh.rotation.x = Math.sin(rot * 0.5) * 0.16;
      wire.rotation.copy(mesh.rotation);
      renderer.render(scene, camera);
    })();

    window.addEventListener("resize", function () {
      w = Math.max(parent.clientWidth, 320);
      h = Math.max(parent.clientHeight, 320);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    });

    return { morphTo: morphTo };
  }

  // ---------------------------------------------------------------------
  // Low-poly "product icon" geometry builders.
  // Each icon is assembled from primitive BufferGeometries (box, sphere,
  // cylinder, cone, torus), baked into world space, then merged into a
  // single non-indexed BufferGeometry so it works with the existing
  // particle-explosion morph in createModelScene() (which reads
  // geometry.attributes.position directly).
  // ---------------------------------------------------------------------

  function placeGeo(geometry, opts) {
    opts = opts || {};
    const g = geometry.clone();
    const obj = new THREE.Object3D();
    if (opts.scale) obj.scale.set(opts.scale[0], opts.scale[1], opts.scale[2]);
    if (opts.dir) {
      const dir = new THREE.Vector3(
        opts.dir[0],
        opts.dir[1],
        opts.dir[2],
      ).normalize();
      obj.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), dir);
    } else if (opts.rotation) {
      obj.rotation.set(opts.rotation[0], opts.rotation[1], opts.rotation[2]);
    }
    if (opts.position)
      obj.position.set(opts.position[0], opts.position[1], opts.position[2]);
    obj.updateMatrix();
    g.applyMatrix4(obj.matrix);
    return g.toNonIndexed();
  }

  function mergeBufferGeometries(geometries) {
    let totalVerts = 0;
    geometries.forEach((g) => {
      totalVerts += g.attributes.position.count;
    });
    const merged = new Float32Array(totalVerts * 3);
    let offset = 0;
    geometries.forEach((g) => {
      const pos = g.attributes.position.array;
      merged.set(pos, offset);
      offset += pos.length;
    });
    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(merged, 3));
    return geo;
  }

  function buildIcon(parts, scaleFactor) {
    const geo = mergeBufferGeometries(parts);
    geo.center();
    geo.scale(scaleFactor || 1.3, scaleFactor || 1.3, scaleFactor || 1.3);
    geo.computeVertexNormals();
    return geo;
  }

  function linkCylinder(a, b, radius) {
    const dir = new THREE.Vector3().subVectors(b, a);
    const len = dir.length();
    const cyl = new THREE.CylinderGeometry(radius, radius, len, 8);
    const mid = new THREE.Vector3().addVectors(a, b).multiplyScalar(0.5);
    return placeGeo(cyl, {
      dir: [dir.x, dir.y, dir.z],
      position: [mid.x, mid.y, mid.z],
    });
  }

  // 01 — Automated transaction review: an open laptop
  function iconLaptop() {
    const base = placeGeo(new THREE.BoxGeometry(1.5, 0.09, 0.95), {
      position: [0, -0.5, 0.2],
    });
    const screenH = 0.95;
    const screenGeo = new THREE.BoxGeometry(1.5, screenH, 0.05);
    screenGeo.translate(0, screenH / 2, 0);
    const screen = placeGeo(screenGeo, {
      rotation: [-0.35, 0, 0],
      position: [0, -0.5, -0.28],
    });
    return buildIcon([base, screen]);
  }

  // 02 — e-conomic integration: two interlocked rings
  function iconLink() {
    const ringA = placeGeo(new THREE.TorusGeometry(0.5, 0.14, 12, 28), {
      position: [-0.32, 0, 0],
    });
    const ringB = placeGeo(new THREE.TorusGeometry(0.5, 0.14, 12, 28), {
      rotation: [0, Math.PI / 2, 0],
      position: [0.32, 0, 0],
    });
    return buildIcon([ringA, ringB]);
  }

  // 03 — Audit trail: a document with text lines and a checkmark
  function iconDocument() {
    const page = placeGeo(new THREE.BoxGeometry(0.9, 1.15, 0.06), {
      rotation: [0, 0, -0.06],
    });
    const line1 = placeGeo(new THREE.BoxGeometry(0.55, 0.06, 0.03), {
      position: [-0.05, 0.35, 0.05],
      rotation: [0, 0, -0.06],
    });
    const line2 = placeGeo(new THREE.BoxGeometry(0.55, 0.06, 0.03), {
      position: [-0.07, 0.18, 0.05],
      rotation: [0, 0, -0.06],
    });
    const checkShort = placeGeo(new THREE.BoxGeometry(0.34, 0.1, 0.08), {
      position: [-0.12, -0.28, 0.08],
      rotation: [0, 0, 0.75],
    });
    const checkLong = placeGeo(new THREE.BoxGeometry(0.62, 0.1, 0.08), {
      position: [0.16, -0.14, 0.08],
      rotation: [0, 0, -0.65],
    });
    return buildIcon([page, line1, line2, checkShort, checkLong]);
  }

  // 04 — EU VAT number check: a globe with orbit rings and a location pin
  function iconGlobe() {
    const sphere = placeGeo(new THREE.SphereGeometry(0.78, 22, 16), {});
    const ring = placeGeo(new THREE.TorusGeometry(0.82, 0.025, 8, 40), {
      rotation: [1.15, 0.3, 0],
    });
    const ring2 = placeGeo(new THREE.TorusGeometry(0.82, 0.025, 8, 40), {
      rotation: [1.15, -1.2, 0],
    });
    const pinDir = new THREE.Vector3(0.55, 0.72, 0.4).normalize();
    const tip = pinDir.clone().multiplyScalar(0.78);
    const stemGeo = new THREE.ConeGeometry(0.15, 0.55, 12);
    stemGeo.rotateX(Math.PI);
    stemGeo.translate(0, 0.275, 0);
    const stem = placeGeo(stemGeo, {
      dir: [pinDir.x, pinDir.y, pinDir.z],
      position: [tip.x, tip.y, tip.z],
    });
    const ballPos = tip.clone().add(pinDir.clone().multiplyScalar(0.55));
    const ball = placeGeo(new THREE.SphereGeometry(0.17, 12, 12), {
      position: [ballPos.x, ballPos.y, ballPos.z],
    });
    return buildIcon([sphere, ring, ring2, stem, ball]);
  }

  // 05 — Split VAT handling: a pie disc split into two exploded wedges
  function iconSplit() {
    const gap = 0.14;

    const wedgeA = new THREE.CylinderGeometry(
      0.85,
      0.85,
      0.35,
      24,
      1,
      false,
      0,
      2.5,
    );
    const bisectorA = 1.25;
    wedgeA.translate(Math.cos(bisectorA) * gap, 0, -Math.sin(bisectorA) * gap);
    const wedgeAplaced = placeGeo(wedgeA, { rotation: [-Math.PI / 2, 0, 0] });

    const wedgeB = new THREE.CylinderGeometry(
      0.85,
      0.85,
      0.35,
      24,
      1,
      false,
      2.5,
      Math.PI * 2 - 2.5,
    );
    const bisectorB = 2.5 + (Math.PI * 2 - 2.5) / 2;
    wedgeB.translate(Math.cos(bisectorB) * gap, 0, -Math.sin(bisectorB) * gap);
    const wedgeBplaced = placeGeo(wedgeB, { rotation: [-Math.PI / 2, 0, 0] });

    return buildIcon([wedgeAplaced, wedgeBplaced]);
  }

  // 06 — Team & accountant access: three linked "people" nodes
  function iconTeam() {
    const p1 = new THREE.Vector3(0, 0.58, 0);
    const p2 = new THREE.Vector3(-0.52, -0.4, 0.1);
    const p3 = new THREE.Vector3(0.52, -0.4, -0.1);
    const s1 = placeGeo(new THREE.SphereGeometry(0.3, 14, 14), {
      position: [p1.x, p1.y, p1.z],
    });
    const s2 = placeGeo(new THREE.SphereGeometry(0.3, 14, 14), {
      position: [p2.x, p2.y, p2.z],
    });
    const s3 = placeGeo(new THREE.SphereGeometry(0.3, 14, 14), {
      position: [p3.x, p3.y, p3.z],
    });
    const l1 = linkCylinder(p1, p2, 0.045);
    const l2 = linkCylinder(p1, p3, 0.045);
    const l3 = linkCylinder(p2, p3, 0.045);
    return buildIcon([s1, s2, s3, l1, l2, l3]);
  }

  // Trust section icons -----------------------------------------------

  // Protected cloud
  function iconCloud() {
    const s = (r, x, y, z) =>
      placeGeo(new THREE.SphereGeometry(r, 14, 14), { position: [x, y, z] });
    const parts = [
      s(0.5, 0, -0.05, 0),
      s(0.35, -0.55, 0.05, 0),
      s(0.32, 0.55, 0.08, 0),
      s(0.4, -0.15, 0.3, 0),
      s(0.38, 0.25, 0.28, 0),
    ];
    return buildIcon(parts);
  }

  // GDPR shield with checkmark
  function iconShield() {
    const top = placeGeo(
      new THREE.CylinderGeometry(0.55, 0.55, 0.16, 16, 1, false, 0, Math.PI),
      { rotation: [0, 0, Math.PI], position: [0, 0.25, 0] },
    );
    const bottom = placeGeo(new THREE.ConeGeometry(0.55, 0.75, 16), {
      rotation: [Math.PI, 0, 0],
      position: [0, -0.3, 0],
    });
    const checkA = placeGeo(new THREE.BoxGeometry(0.22, 0.08, 0.1), {
      position: [-0.08, -0.02, 0.15],
      rotation: [0, 0, 0.7],
    });
    const checkB = placeGeo(new THREE.BoxGeometry(0.4, 0.08, 0.1), {
      position: [0.12, 0.08, 0.15],
      rotation: [0, 0, -0.65],
    });
    return buildIcon([top, bottom, checkA, checkB]);
  }

  // MitID verification: an ID card with photo, lines, and a badge
  function iconID() {
    const card = placeGeo(new THREE.BoxGeometry(1.3, 0.85, 0.06), {});
    const photo = placeGeo(new THREE.BoxGeometry(0.4, 0.5, 0.03), {
      position: [-0.38, 0.05, 0.05],
    });
    const line1 = placeGeo(new THREE.BoxGeometry(0.5, 0.07, 0.03), {
      position: [0.15, 0.2, 0.05],
    });
    const line2 = placeGeo(new THREE.BoxGeometry(0.4, 0.07, 0.03), {
      position: [0.1, 0.02, 0.05],
    });
    const badge = placeGeo(new THREE.TorusGeometry(0.16, 0.045, 10, 20), {
      position: [-0.38, -0.25, 0.08],
    });
    return buildIcon([card, photo, line1, line2, badge]);
  }

  function initModelSteps() {
    if (typeof THREE === "undefined") return;

    const featureGeos = [
      iconLaptop(),
      iconLink(),
      iconDocument(),
      iconGlobe(),
      iconSplit(),
      iconTeam(),
    ];

    const trustGeos = [iconCloud(), iconShield(), iconID()];

    const featScene = createModelScene("features-canvas", featureGeos);
    const trustScene = createModelScene("trust-canvas", trustGeos);

    function wireSteps(listId, sceneApi) {
      const list = document.getElementById(listId);
      if (!list) return;
      const steps = Array.prototype.slice.call(
        list.querySelectorAll(".model-step"),
      );
      if (!steps.length) return;

      if (
        prefersReducedMotion ||
        usesCompactModelLayout() ||
        typeof gsap === "undefined" ||
        typeof ScrollTrigger === "undefined"
      ) {
        steps.forEach(function (s) {
          s.classList.add("is-active");
        });
        return;
      }

      gsap.registerPlugin(ScrollTrigger);
      const section = list.closest(".model-steps");
      const sticky = section && section.querySelector(".model-steps__sticky");
      if (!section || !sticky) return;

      const total = steps.length;
      section.style.height = 120 + total * 55 + "vh";

      let lastIdx = 0;
      steps.forEach(function (s, i) {
        s.classList.toggle("is-active", i === 0);
      });

      ScrollTrigger.create({
        trigger: section,
        start: "top top",
        end: "bottom bottom",
        pin: sticky,
        pinSpacing: true,
        scrub: true,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        onUpdate: function (self) {
          const idx = Math.min(
            total - 1,
            Math.max(0, Math.floor(self.progress * total * 0.999)),
          );
          if (idx === lastIdx) return;
          lastIdx = idx;
          steps.forEach(function (s, i) {
            s.classList.toggle("is-active", i === idx);
          });
          if (sceneApi) sceneApi.morphTo(idx);
        },
      });
    }

    wireSteps("features-steps", featScene);
    wireSteps("trust-steps", trustScene);
  }

  function boot() {
    if (typeof THREE === "undefined") {
      setTimeout(boot, 40);
      return;
    }
    initLenis();
    initHero3D();
    initStats();
    initHowItWorks();
    initVideoExpand();
    initModelSteps();
    initFloatingModel();
    if (!prefersReducedMotion && typeof gsap !== "undefined") {
      gsap.from(".hero-content > *", {
        y: 28,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "power3.out",
        delay: 0.15,
      });
      gsap.from(".hero-device", {
        x: 40,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        delay: 0.35,
      });
    }
  }

  if (document.readyState === "loading")
    document.addEventListener("DOMContentLoaded", boot);
  else boot();
})();
