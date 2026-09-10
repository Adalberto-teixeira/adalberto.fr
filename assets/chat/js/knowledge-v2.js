/* Central knowledge refresh for Adalberto's CV assistant. */
(function () {
  "use strict";

  const pageDepth = window.location.pathname.replace(/\/+$/, "").split("/").filter(Boolean).length;
  const assetBase = pageDepth === 0 ? "assets" : "../assets";

  const appendTriggers = (flow, triggers) => {
    if (!flow) return;
    const current = flow.getAttribute("data-triggers") || "";
    flow.setAttribute("data-triggers", [current, ...triggers].filter(Boolean).join(", "));
  };

  const skills = document.querySelector('[data-flow-id="skills"]');
  appendTriggers(skills, [
    "react", "next.js", "nextjs", "typescript", "tailwind", "supabase",
    "pwa", "vercel", "cloudflare", "stack technique", "frameworks"
  ]);
  if (skills) {
    const webList = skills.querySelector(".list-skills");
    if (webList && !webList.querySelector("[data-knowledge-v2]")) {
      webList.insertAdjacentHTML("beforeend", `
        <li data-knowledge-v2>React &amp; JSX — pratique sur des projets fonctionnels</li>
        <li data-knowledge-v2>Next.js &amp; TypeScript — apprentissage actif en projet</li>
        <li data-knowledge-v2>Tailwind CSS, Supabase et next-intl</li>
        <li data-knowledge-v2>Applications web progressives (PWA)</li>
        <li data-knowledge-v2>Déploiement avec Vercel et Cloudflare</li>
      `);
    }
  }

  const projects = document.querySelector('[data-flow-id="projets"]');
  appendTriggers(projects, [
    "gio tools", "giotools", "erica glow", "erica", "pwa", "reservation en ligne",
    "quels projets utilisent react", "projets recents", "projets clients"
  ]);
  if (projects && !projects.querySelector("[data-project-v2]")) {
    const giotechParagraph = [...projects.querySelectorAll("p")].find((paragraph) =>
      paragraph.querySelector("strong")?.textContent.trim().startsWith("GioTech Digital")
    );
    if (giotechParagraph) {
      giotechParagraph.innerHTML = "<strong>GioTech Digital (2026 — en ligne)</strong><br>Plateforme bilingue de templates, démonstrations, projets clients et outils numériques, déployée avec Cloudflare.";
    }
    const options = projects.querySelector(".options");
    const details = document.createElement("div");
    details.setAttribute("data-project-v2", "");
    details.innerHTML = `
      <div class="chat-project-thumb"><img src="${assetBase}/img/projet-gio-tools.jpg" alt="PWA Gio Tools" loading="lazy"></div>
      <p><strong>Gio Tools (2026 — PWA en ligne)</strong><br>Boîte à outils installable avec création de CV, lettres de motivation, signatures, QR Codes, devis et factures.</p>
      <div class="chat-project-thumb"><img src="${assetBase}/img/projet-erica-glow.jpg" alt="PWA Érica Glow" loading="lazy"></div>
      <p><strong>Érica Glow (2026 — projet client en ligne)</strong><br>PWA mobile-first de beauté avec catalogue de prestations, installation sur téléphone et réservation sans compte.</p>
    `;
    projects.insertBefore(details, options || null);
  }

  const contact = document.querySelector('[data-flow-id="contact"]');
  appendTriggers(contact, [
    "est il disponible", "disponibilite", "alternance", "stage", "mission",
    "offre emploi", "recrutement", "ou habite adalberto"
  ]);

  const introTitle = document.querySelector("#intro-screen .intro-text h1");
  const introQuote = document.querySelector("#intro-screen .quote p");
  const introSignature = document.querySelector("#intro-screen .quote span");
  const chatInput = document.getElementById("chat-input");
  const footerText = document.getElementById("chat-footer-text");
  if (introTitle) introTitle.innerHTML = "Je suis <span>l’assistant hybride</span>";
  if (introQuote) introQuote.textContent = "Posez une question libre sur son parcours, ses compétences ou ses projets : je réponds naturellement et sans inventer.";
  if (introSignature) introSignature.textContent = "IA du CV · réponses vérifiées";
  if (chatInput) chatInput.placeholder = "Posez votre question sur Adalberto…";
  if (footerText) footerText.innerHTML = '<i class="fa-solid fa-sparkles"></i> IA pour les questions libres · réponses rapides disponibles hors ligne';
})();
