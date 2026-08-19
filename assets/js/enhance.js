/* ============================================================
   ENHANCE.JS — micro-interactions
   ============================================================ */
(function () {
  "use strict";

  /* ---------- Scroll progress bar ---------- */
  const progress = document.createElement("div");
  progress.id = "scroll-progress";
  document.body.appendChild(progress);
  function updateProgress() {
    const scrollable = document.documentElement.scrollHeight - window.innerHeight;
    const pct = scrollable > 0 ? (window.scrollY / scrollable) * 100 : 0;
    progress.style.width = pct + "%";
  }
  window.addEventListener("scroll", updateProgress, { passive: true });
  updateProgress();

  /* ---------- Animated counters ---------- */
  function animateCount(el) {
    const target = parseFloat(el.getAttribute("data-count"));
    const suffix = el.getAttribute("data-suffix") || "";
    const duration = 1400;
    const start = performance.now();
    function tick(now) {
      const t = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - t, 3);
      const value = target * eased;
      el.textContent = (Number.isInteger(target) ? Math.round(value) : value.toFixed(1)) + suffix;
      if (t < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }

  /* ---------- Skill bar fill ---------- */
  function fillSkillBar(el) {
    const pct = el.getAttribute("data-fill") || "0";
    requestAnimationFrame(() => { el.style.width = pct + "%"; });
  }

  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const el = entry.target;
        if (el.hasAttribute("data-count")) animateCount(el);
        if (el.classList.contains("skillbar-fill")) fillSkillBar(el);
        revealObserver.unobserve(el);
      });
    },
    { threshold: 0.4 }
  );

  document.querySelectorAll("[data-count], .skillbar-fill").forEach((el) => revealObserver.observe(el));

  /* ---------- Magnetic buttons ---------- */
  document.querySelectorAll(".btn-magnetic").forEach((btn) => {
    let bounds;
    btn.addEventListener("mouseenter", () => { bounds = btn.getBoundingClientRect(); });
    btn.addEventListener("mousemove", (e) => {
      if (!bounds) bounds = btn.getBoundingClientRect();
      const relX = e.clientX - bounds.left - bounds.width / 2;
      const relY = e.clientY - bounds.top - bounds.height / 2;
      btn.style.transform = `translate(${relX * 0.25}px, ${relY * 0.35}px)`;
    });
    btn.addEventListener("mouseleave", () => {
      btn.style.transform = "translate(0, 0)";
    });
  });

  /* ---------- Subtle avatar / card tilt (desktop only) ---------- */
  if (window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
    document.querySelectorAll(".id-avatar, .works-feed-item").forEach((card) => {
      card.addEventListener("mousemove", (e) => {
        const rect = card.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        card.style.transform = `rotateY(${x * 8}deg) rotateX(${-y * 8}deg)`;
      });
      card.addEventListener("mouseleave", () => {
        card.style.transform = "rotateY(0deg) rotateX(0deg)";
      });
    });
  }

  /* ---------- Contact form: live field feedback ---------- */
  document.querySelectorAll(".form-control").forEach((field) => {
    field.addEventListener("input", () => {
      if (field.checkValidity() && field.value.trim() !== "") {
        field.classList.add("field-valid");
      } else {
        field.classList.remove("field-valid");
      }
    });
  });

  const contactForm = document.getElementById("contact-form");
  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const data = new FormData(contactForm);
      const name = (data.get("name") || "").toString().trim();
      const email = (data.get("email") || "").toString().trim();
      const subject = (data.get("subject") || "").toString().trim() || "Contact depuis le site";
      const message = (data.get("message") || "").toString().trim();
      const body = `Nom : ${name}\nEmail : ${email}\n\n${message}`;
      const mailtoUrl = `mailto:adalbertosfurtado@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      window.location.href = mailtoUrl;

      const status = document.getElementById("form-status");
      if (status) {
        status.classList.add("visible");
        status.scrollIntoView({ behavior: "smooth", block: "nearest" });
      }
    });
  }
})();
