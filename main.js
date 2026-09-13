/* =========================================================================
   PORTFOLIO UI / RENDER LOGIC
   -------------------------------------------------------------------------
   This file reads `portfolioData` (js/data.js) and renders every section.
   You should not need to edit this file to update content — edit
   js/data.js instead.
   ========================================================================= */

(() => {
  "use strict";

  const D = portfolioData;

  /* ----------------------------- ICON LIBRARY ----------------------------- */
  const ICONS = {
    github: `<svg viewBox="0 0 24 24" fill="none" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M9 19c-4.3 1.4-4.3-2.5-6-3m12 5v-3.5c0-1 .1-1.4-.5-2 2.8-.3 5.5-1.4 5.5-6a4.6 4.6 0 0 0-1.3-3.2 4.2 4.2 0 0 0-.1-3.2s-1.1-.3-3.5 1.3a12.3 12.3 0 0 0-6.2 0C6.5 2.8 5.4 3.1 5.4 3.1a4.2 4.2 0 0 0-.1 3.2A4.6 4.6 0 0 0 4 9.5c0 4.6 2.7 5.7 5.5 6-.6.6-.6 1.2-.5 2V21"/></svg>`,
    linkedin: `<svg viewBox="0 0 24 24" fill="none" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4V8h4v1.5A6 6 0 0 1 16 8z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>`,
    mail: `<svg viewBox="0 0 24 24" fill="none" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 6-10 7L2 6"/></svg>`,
    phone: `<svg viewBox="0 0 24 24" fill="none" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6 19.8 19.8 0 0 1-3.1-8.7A2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .3 2 .6 2.9a2 2 0 0 1-.5 2.1L8 10a16 16 0 0 0 6 6l1.3-1.2a2 2 0 0 1 2.1-.5c.9.3 1.9.5 2.9.6a2 2 0 0 1 1.7 2z"/></svg>`,
    external: `<svg viewBox="0 0 24 24" fill="none" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><path d="M15 3h6v6"/><path d="M10 14 21 3"/></svg>`,
    download: `<svg viewBox="0 0 24 24" fill="none" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><path d="M7 10l5 5 5-5"/><path d="M12 15V3"/></svg>`,
    check: `<svg viewBox="0 0 24 24" fill="none" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg>`,
  };

  const iconBtn = (key, href, label) => {
    const safe = href || "#";
    const placeholder = !href;
    return `<a class="icon-btn${placeholder ? " is-placeholder" : ""}" href="${safe}" ${href ? 'target="_blank" rel="noopener"' : ''} aria-label="${label}" data-placeholder="${placeholder}">${ICONS[key]}</a>`;
  };

  /* ----------------------------- HELPERS ----------------------------- */
  const $ = (sel, ctx = document) => ctx.querySelector(sel);
  const $$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));
  const el = (html) => {
    const t = document.createElement("template");
    t.innerHTML = html.trim();
    return t.content.firstElementChild;
  };

  function attachPlaceholderGuard(container) {
    $$('[data-placeholder="true"]', container).forEach((a) => {
      a.addEventListener("click", (e) => {
        e.preventDefault();
        toast("Link not added yet — edit js/data.js to set this URL.");
      });
    });
  }

  let toastTimer = null;
  function toast(msg) {
    let t = $("#toastEl");
    if (!t) {
      t = el(`<div id="toastEl" style="position:fixed;bottom:90px;right:28px;z-index:200;background:#10182b;border:1px solid rgba(148,163,200,.3);color:#eef1f8;padding:12px 18px;border-radius:10px;font-size:0.85rem;max-width:280px;box-shadow:0 20px 40px -20px rgba(0,0,0,.6);opacity:0;transition:opacity .3s, transform .3s;transform:translateY(8px);"></div>`);
      document.body.appendChild(t);
    }
    t.textContent = msg;
    requestAnimationFrame(() => { t.style.opacity = 1; t.style.transform = "translateY(0)"; });
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => { t.style.opacity = 0; t.style.transform = "translateY(8px)"; }, 2600);
  }

  /* ============================================================
     NAVBAR — scroll state, active section, mobile menu
     ============================================================ */
  function initNavbar() {
    const navbar = $("#navbar");
    const onScroll = () => navbar.classList.toggle("is-scrolled", window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    const toggle = $("#navToggle");
    const mobileMenu = $("#mobileMenu");
    toggle.addEventListener("click", () => {
      const open = mobileMenu.classList.toggle("is-open");
      toggle.classList.toggle("is-open", open);
      toggle.setAttribute("aria-expanded", String(open));
    });
    $$(".mobile-link").forEach((a) =>
      a.addEventListener("click", () => {
        mobileMenu.classList.remove("is-open");
        toggle.classList.remove("is-open");
      })
    );

    const sections = $$("main .section, .hero");
    const navLinks = $$(".nav-link, .mobile-link");
    const spy = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.id;
            navLinks.forEach((l) => l.classList.toggle("is-active", l.dataset.section === id));
          }
        });
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 }
    );
    sections.forEach((s) => spy.observe(s));
  }

  /* ============================================================
     BACK TO TOP
     ============================================================ */
  function initBackToTop() {
    const btn = $("#backToTop");
    window.addEventListener(
      "scroll",
      () => btn.classList.toggle("is-visible", window.scrollY > 700),
      { passive: true }
    );
    btn.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));
  }

  /* ============================================================
     RESUME BUTTON
     ============================================================ */
  function initResumeButtons() {
    $$("#resumeBtnHero").forEach((btn) => {
      if (!D.personalInfo.resumeUrl) {
        btn.addEventListener("click", (e) => {
          e.preventDefault();
          toast("Resume not uploaded yet — set personalInfo.resumeUrl in js/data.js.");
        });
      } else {
        btn.href = D.personalInfo.resumeUrl;
        btn.setAttribute("download", "");
        btn.target = "_blank";
      }
    });
  }

  /* ============================================================
     HERO — typing animation + terminal + socials
     ============================================================ */
  function initHeroSocials() {
    const wrap = $("#heroSocials");
    wrap.innerHTML =
      iconBtn("github", D.socialLinks.github, "GitHub") +
      iconBtn("linkedin", D.socialLinks.linkedin, "LinkedIn") +
      `<a class="icon-btn" href="mailto:${D.socialLinks.email}" aria-label="Email">${ICONS.mail}</a>`;
    attachPlaceholderGuard(wrap);
  }

  function initTypingAnimation() {
    const target = $("#typingText");
    const roles = D.personalInfo.roles;
    let roleIdx = 0, charIdx = 0, deleting = false;

    function tick() {
      const current = roles[roleIdx];
      if (!deleting) {
        charIdx++;
        target.textContent = current.slice(0, charIdx);
        if (charIdx === current.length) {
          deleting = true;
          setTimeout(tick, 1400);
          return;
        }
      } else {
        charIdx--;
        target.textContent = current.slice(0, charIdx);
        if (charIdx === 0) {
          deleting = false;
          roleIdx = (roleIdx + 1) % roles.length;
        }
      }
      setTimeout(tick, deleting ? 35 : 65);
    }
    tick();
  }

  function initTerminal() {
    const body = $("#terminalBody");
    const lines = [
      { prompt: "whoami", out: D.personalInfo.name },
      { prompt: "skills", out: "Python | C++ | Java | SQL" },
      { prompt: "interests", out: "DSA | Data Science | Machine Learning" },
      { prompt: "status", out: "Building & Learning..." },
    ];
    let li = 0;

    function typeLine(promptText, outText, cb) {
      const lineEl = el(`<div><span class="prompt">&gt; </span><span class="cmd"></span></div>`);
      body.appendChild(lineEl);
      const cmdEl = $(".cmd", lineEl);
      let i = 0;
      (function typeChar() {
        if (i <= promptText.length) {
          cmdEl.textContent = promptText.slice(0, i);
          i++;
          setTimeout(typeChar, 45);
        } else {
          const outEl = el(`<div class="out"></div>`);
          body.appendChild(outEl);
          let j = 0;
          (function typeOut() {
            if (j <= outText.length) {
              outEl.textContent = outText.slice(0, j);
              j++;
              setTimeout(typeOut, 18);
            } else {
              body.appendChild(el(`<div>&nbsp;</div>`));
              cb();
            }
          })();
        }
      })();
    }

    function runAll() {
      if (li >= lines.length) return;
      typeLine(lines[li].prompt, lines[li].out, () => {
        li++;
        runAll();
      });
    }
    runAll();
  }

  /* ============================================================
     ABOUT — interests + animated stat counters
     ============================================================ */
  function renderAbout() {
    const list = $("#aboutInterests");
    list.innerHTML = D.personalInfo.interests.map((i) => `<li>${i}</li>`).join("");
    $(".about__copy p:first-child").textContent = D.personalInfo.aboutSummary;

    const statsWrap = $("#aboutStats");
    statsWrap.innerHTML = D.aboutStats
      .map(
        (s) => `
      <div class="stat-card">
        <div class="stat-card__value" data-value="${s.isNumber ? s.value : ""}" data-suffix="${s.suffix || ""}">
          ${s.isNumber ? "0" : s.value}
        </div>
        <div class="stat-card__label">${s.label}</div>
      </div>`
      )
      .join("");

    // animate numeric counters when visible
    const numericEls = $$(".stat-card__value[data-value]:not([data-value=''])", statsWrap);
    const counterObserver = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const node = entry.target;
          const target = parseFloat(node.dataset.value);
          const suffix = node.dataset.suffix || "";
          const isFloat = target % 1 !== 0;
          const duration = 1200;
          const start = performance.now();
          function frame(now) {
            const p = Math.min((now - start) / duration, 1);
            const eased = 1 - Math.pow(1 - p, 3);
            const val = target * eased;
            node.textContent = (isFloat ? val.toFixed(2) : Math.round(val)) + suffix;
            if (p < 1) requestAnimationFrame(frame);
          }
          requestAnimationFrame(frame);
          obs.unobserve(node);
        });
      },
      { threshold: 0.6 }
    );
    numericEls.forEach((n) => counterObserver.observe(n));
  }

  /* ============================================================
     SKILLS — bento grid + filters
     ============================================================ */
  function renderSkills() {
    const filterBar = $("#skillFilters");
    const categories = [{ key: "all", label: "All" }, ...D.skillCategories];
    filterBar.innerHTML = categories
      .map((c, i) => `<button class="filter-btn${i === 0 ? " is-active" : ""}" data-filter="${c.key}">${c.label}</button>`)
      .join("");

    const grid = $("#skillsGrid");
    grid.innerHTML = D.skills
      .map(
        (s) => `
      <div class="skill-card" data-category="${s.category}">
        <div class="skill-card__badge">${s.name.slice(0, 2).toUpperCase()}</div>
        <div class="skill-card__name">${s.name}</div>
        <div class="skill-card__desc">${s.desc}</div>
      </div>`
      )
      .join("");

    filterBar.addEventListener("click", (e) => {
      const btn = e.target.closest(".filter-btn");
      if (!btn) return;
      $$(".filter-btn", filterBar).forEach((b) => b.classList.remove("is-active"));
      btn.classList.add("is-active");
      const key = btn.dataset.filter;
      $$(".skill-card", grid).forEach((card) => {
        card.classList.toggle("is-hidden", key !== "all" && card.dataset.category !== key);
      });
    });
  }

  /* ============================================================
     PROJECTS — cards, filters, tilt, details toggle
     ============================================================ */
  function renderProjects() {
    const filterBar = $("#projectFilters");
    const filters = ["All", ...D.projectFilterOptions];
    filterBar.innerHTML = filters
      .map((f, i) => `<button class="filter-btn${i === 0 ? " is-active" : ""}" data-filter="${f}">${f}</button>`)
      .join("");

    const grid = $("#projectsGrid");
    grid.innerHTML = D.projects
      .map((p) => {
        const githubHref = p.links.github || "#";
        const demoHref = p.links.demo || "#";
        return `
      <article class="project-card" data-categories='${JSON.stringify(p.categories)}'>
        <div class="project-card__top">
          <div>
            <h3 class="project-card__title">${p.title}</h3>
            ${p.subtitle ? `<div class="project-card__subtitle">${p.subtitle}</div>` : ""}
          </div>
          <span class="project-card__date">${p.date}</span>
        </div>
        <p class="project-card__desc">${p.description}</p>

        <div class="project-card__cols">
          <div class="project-card__col">
            <h4>Key Features</h4>
            <ul class="feature-list">${p.features.map((f) => `<li>${f}</li>`).join("")}</ul>
          </div>
          <div class="project-card__col">
            <h4>Technologies</h4>
            <div class="tech-tags">${p.tech.map((t) => `<span class="tech-tag">${t}</span>`).join("")}</div>
          </div>
        </div>

        <div class="project-card__actions">
          <a class="btn btn--ghost btn--sm${!p.links.github ? " is-placeholder" : ""}" data-placeholder="${!p.links.github}" href="${githubHref}" ${p.links.github ? 'target="_blank" rel="noopener"' : ""}>GitHub</a>
          <a class="btn btn--ghost btn--sm${!p.links.demo ? " is-placeholder" : ""}" data-placeholder="${!p.links.demo}" href="${demoHref}" ${p.links.demo ? 'target="_blank" rel="noopener"' : ""}>Live Demo</a>
          <button class="btn btn--text btn--sm details-toggle">View Details →</button>
        </div>

        <div class="details-panel">
          ${p.details.map((d) => `<p>${d}</p>`).join("")}
        </div>
      </article>`;
      })
      .join("");

    attachPlaceholderGuard(grid);

    // details toggle
    $$(".project-card", grid).forEach((card) => {
      const toggleBtn = $(".details-toggle", card);
      const panel = $(".details-panel", card);
      toggleBtn.addEventListener("click", () => {
        const open = panel.classList.toggle("is-open");
        toggleBtn.textContent = open ? "Hide Details ↑" : "View Details →";
      });
    });

    // filtering
    filterBar.addEventListener("click", (e) => {
      const btn = e.target.closest(".filter-btn");
      if (!btn) return;
      $$(".filter-btn", filterBar).forEach((b) => b.classList.remove("is-active"));
      btn.classList.add("is-active");
      const key = btn.dataset.filter;
      $$(".project-card", grid).forEach((card) => {
        const cats = JSON.parse(card.dataset.categories);
        card.classList.toggle("is-hidden", key !== "All" && !cats.includes(key));
      });
    });

    // 3D tilt on hover (desktop only)
    if (window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
      $$(".project-card", grid).forEach((card) => {
        card.addEventListener("mousemove", (e) => {
          const rect = card.getBoundingClientRect();
          const x = (e.clientX - rect.left) / rect.width - 0.5;
          const y = (e.clientY - rect.top) / rect.height - 0.5;
          card.style.transform = `perspective(900px) rotateY(${x * 4}deg) rotateX(${-y * 4}deg) translateY(-4px)`;
        });
        card.addEventListener("mouseleave", () => {
          card.style.transform = "";
        });
      });
    }
  }

  /* ============================================================
     TRAINING
     ============================================================ */
  function renderTraining() {
    const wrap = $("#trainingContainer");
    wrap.innerHTML = D.training
      .map(
        (t) => `
      <div class="training-card glass">
        <div class="training-card__head">
          <div>
            <div class="training-card__title">${t.title}</div>
            <div class="training-card__org">${t.organization}</div>
          </div>
          <div class="training-card__duration">${t.duration}</div>
        </div>
        ${t.details.map((d) => `<p>${d}</p>`).join("")}
        <div class="chip-row">${t.chips.map((c) => `<span class="chip">${c}</span>`).join("")}</div>
      </div>`
      )
      .join("");
  }

  /* ============================================================
     CERTIFICATES
     ============================================================ */
  function renderCertificates() {
    const filterBar = $("#certFilters");
    const filters = ["All", ...D.certFilterOptions];
    filterBar.innerHTML = filters
      .map((f, i) => `<button class="filter-btn${i === 0 ? " is-active" : ""}" data-filter="${f}">${f}</button>`)
      .join("");

    const grid = $("#certGrid");
    grid.innerHTML = D.certificates
      .map((c) => {
        const href = c.link || "#";
        return `
      <div class="cert-card" data-categories='${JSON.stringify(c.categories)}'>
        <div class="cert-card__icon">${ICONS.check}</div>
        <div class="cert-card__title">${c.title}</div>
        <div class="cert-card__org">${c.organization}</div>
        <div class="cert-card__date">${c.date}</div>
        <div class="cert-card__actions">
          <a class="btn btn--ghost btn--sm${!c.link ? " is-placeholder" : ""}" data-placeholder="${!c.link}" href="${href}" ${c.link ? 'target="_blank" rel="noopener"' : ""}>View Certificate</a>
        </div>
      </div>`;
      })
      .join("");

    attachPlaceholderGuard(grid);

    filterBar.addEventListener("click", (e) => {
      const btn = e.target.closest(".filter-btn");
      if (!btn) return;
      $$(".filter-btn", filterBar).forEach((b) => b.classList.remove("is-active"));
      btn.classList.add("is-active");
      const key = btn.dataset.filter;
      $$(".cert-card", grid).forEach((card) => {
        const cats = JSON.parse(card.dataset.categories);
        card.classList.toggle("is-hidden", key !== "All" && !cats.includes(key));
      });
    });
  }

  /* ============================================================
     ACHIEVEMENTS
     ============================================================ */
  function renderAchievements() {
    const wrap = $("#achievementsContainer");
    wrap.innerHTML = `<div class="timeline">` +
      D.achievements
        .map(
          (a) => `
      <div class="timeline-item">
        <div class="timeline-item__card glass">
          <div class="timeline-item__title">${a.title}</div>
          <p>${a.description}</p>
          <div class="timeline-item__meta"><span>${a.date}</span></div>
        </div>
      </div>`
        )
        .join("") +
      `</div>`;
  }

  /* ============================================================
     EDUCATION
     ============================================================ */
  function renderEducation() {
    const wrap = $("#educationTimeline");
    wrap.innerHTML = D.education
      .map(
        (e) => `
      <div class="timeline-item">
        <div class="timeline-item__card glass">
          <div class="timeline-item__title">${e.institution}</div>
          <div class="training-card__org">${e.qualification}</div>
          <div class="timeline-item__meta">
            <span>${e.duration}</span>
            <span>${e.score}</span>
            <span>${e.location}</span>
          </div>
        </div>
      </div>`
      )
      .join("");
  }

  /* ============================================================
     DEVELOPER DASHBOARD
     ============================================================ */
  function renderDashboard() {
    const grid = $("#dashGrid");
    grid.innerHTML = D.dashboard.cards
      .map(
        (c) => `
      <div class="dash-card">
        <div class="dash-card__title">${c.title}</div>
        <div class="dash-card__desc">${c.desc}</div>
        ${c.key === "github" ? `<div class="dash-card__stat" id="ghStat">View live activity →</div>` : ""}
        ${c.cta ? `<a class="btn btn--ghost btn--sm" href="${D.socialLinks.github}" target="_blank" rel="noopener">${c.cta}</a>` : ""}
      </div>`
      )
      .join("");

    if (D.dashboard.liveStatsEnabled) loadGithubStats();
  }

  // Optional live GitHub public API call — only shows real, fetched numbers.
  async function loadGithubStats() {
    const statEl = $("#ghStat");
    if (!statEl) return;
    try {
      const res = await fetch(`https://api.github.com/users/${D.dashboard.githubUsername}`);
      if (!res.ok) return;
      const data = await res.json();
      if (typeof data.public_repos === "number") {
        statEl.textContent = `${data.public_repos} public repositories`;
      }
    } catch (err) {
      // Silently keep the default label if offline or rate-limited.
    }
  }

  /* ============================================================
     CONTACT
     ============================================================ */
  function renderContact() {
    const info = $("#contactInfo");
    info.innerHTML = `
      <div class="contact__row">
        <div class="contact__row-icon">${ICONS.phone}</div>
        <div><div class="contact__row-label">Phone</div><div class="contact__row-value">${D.personalInfo.phone}</div></div>
      </div>
      <div class="contact__row">
        <div class="contact__row-icon">${ICONS.mail}</div>
        <div><div class="contact__row-label">Email</div><div class="contact__row-value">${D.personalInfo.email}</div></div>
      </div>
      <div class="contact__row">
        <div class="contact__row-icon">${ICONS.linkedin}</div>
        <div><div class="contact__row-label">LinkedIn</div><div class="contact__row-value">${D.socialLinks.linkedin.replace("https://", "")}</div></div>
      </div>
      <div class="contact__row">
        <div class="contact__row-icon">${ICONS.github}</div>
        <div><div class="contact__row-label">GitHub</div><div class="contact__row-value">${D.socialLinks.github.replace("https://", "")}</div></div>
      </div>
      <a class="btn btn--primary btn--full" id="resumeBtnContact" href="#">Download Resume</a>
    `;
    const contactResumeBtn = $("#resumeBtnContact", info);
    if (!D.personalInfo.resumeUrl) {
      contactResumeBtn.addEventListener("click", (e) => {
        e.preventDefault();
        toast("Resume not uploaded yet — set personalInfo.resumeUrl in js/data.js.");
      });
    } else {
      contactResumeBtn.href = D.personalInfo.resumeUrl;
      contactResumeBtn.setAttribute("download", "");
    }
    $$(".contact__row-value", info).forEach((v) => {}); // no-op, values already set
  }

  function initContactForm() {
    const form = $("#contactForm");
    const status = $("#formStatus");

    const fields = {
      name: { input: $("#cf-name"), error: $("#err-name"), validate: (v) => v.trim().length >= 2, msg: "Please enter your name." },
      email: { input: $("#cf-email"), error: $("#err-email"), validate: (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v), msg: "Please enter a valid email address." },
      message: { input: $("#cf-message"), error: $("#err-message"), validate: (v) => v.trim().length >= 10, msg: "Message should be at least 10 characters." },
    };

    Object.values(fields).forEach((f) => {
      f.input.addEventListener("input", () => validateField(f));
    });

    function validateField(f) {
      const ok = f.validate(f.input.value);
      f.input.closest(".form-row").classList.toggle("has-error", !ok);
      f.error.textContent = ok ? "" : f.msg;
      return ok;
    }

    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const allValid = Object.values(fields).every(validateField);
      if (!allValid) {
        status.textContent = "Please fix the highlighted fields.";
        status.style.color = "#ff8b93";
        return;
      }
      // No backend is connected — this confirms the message locally.
      status.style.color = "";
      status.textContent = `Thanks, ${fields.name.input.value.trim()} — your message is ready. Connect a form backend (e.g. Formspree) to deliver it, or reach out directly via email.`;
      form.reset();
    });
  }

  /* ============================================================
     FOOTER
     ============================================================ */
  function renderFooter() {
    const wrap = $("#footerLinks");
    wrap.innerHTML =
      iconBtn("github", D.socialLinks.github, "GitHub") +
      iconBtn("linkedin", D.socialLinks.linkedin, "LinkedIn") +
      `<a class="icon-btn" href="mailto:${D.socialLinks.email}" aria-label="Email">${ICONS.mail}</a>`;
    attachPlaceholderGuard(wrap);
  }

  /* ============================================================
     SCROLL REVEAL
     ============================================================ */
  function initScrollReveal() {
    const targets = $$(
      ".stat-card, .skill-card, .project-card, .cert-card, .timeline-item, .dash-card, .training-card, .about__copy, .contact__info, .contact__form"
    );
    targets.forEach((t) => t.classList.add("reveal"));
    const io = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    targets.forEach((t) => io.observe(t));
  }

  /* ============================================================
     PARTICLE BACKGROUND
     ============================================================ */
  function initParticles() {
    const canvas = $("#particle-canvas");
    const ctx = canvas.getContext("2d");
    let particles = [];
    let w, h;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    function resize() {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight * 1.6;
    }
    function makeParticles() {
      const count = Math.min(60, Math.floor((w * h) / 34000));
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        r: Math.random() * 1.6 + 0.4,
        vx: (Math.random() - 0.5) * 0.15,
        vy: (Math.random() - 0.5) * 0.15,
        hue: Math.random() > 0.5 ? "79,140,255" : "51,230,204",
      }));
    }
    function draw() {
      ctx.clearRect(0, 0, w, h);
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > w) p.vx *= -1;
        if (p.y < 0 || p.y > h) p.vy *= -1;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${p.hue},0.5)`;
        ctx.fill();
      });
      if (!reduceMotion) requestAnimationFrame(draw);
    }

    resize();
    makeParticles();
    draw();
    window.addEventListener(
      "resize",
      () => {
        resize();
        makeParticles();
      },
      { passive: true }
    );
  }

  /* ============================================================
     INIT
     ============================================================ */
  document.addEventListener("DOMContentLoaded", () => {
    initNavbar();
    initBackToTop();
    initResumeButtons();
    initHeroSocials();
    initTypingAnimation();
    initTerminal();

    renderAbout();
    renderSkills();
    renderProjects();
    renderTraining();
    renderCertificates();
    renderAchievements();
    renderEducation();
    renderDashboard();
    renderContact();
    initContactForm();
    renderFooter();

    initScrollReveal();
    initParticles();
  });
})();
