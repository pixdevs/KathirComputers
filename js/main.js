(function () {
  "use strict";

  var header = document.querySelector(".site-header");
  var nav = document.getElementById("site-nav");
  var toggle = document.querySelector(".nav-toggle");
  var yearEl = document.getElementById("year");
  var navLinks = document.querySelectorAll('.site-nav a[href^="#"]');
  var sections = document.querySelectorAll("main section[id]");
  var hero = document.querySelector(".hero");
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  var finePointer = window.matchMedia("(hover: hover) and (pointer: fine)");

  if (yearEl) {
    yearEl.textContent = String(new Date().getFullYear());
  }

  /* Sticky header */
  function onScroll() {
    if (!header) return;
    header.classList.toggle("is-scrolled", window.scrollY > 12);
  }

  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* Mobile nav + body scroll lock */
  function closeNav() {
    if (!nav || !toggle) return;
    nav.classList.remove("is-open");
    toggle.setAttribute("aria-expanded", "false");
    toggle.setAttribute("aria-label", "Open menu");
    document.body.classList.remove("nav-open");
  }

  function openNav() {
    if (!nav || !toggle) return;
    nav.classList.add("is-open");
    toggle.setAttribute("aria-expanded", "true");
    toggle.setAttribute("aria-label", "Close menu");
    document.body.classList.add("nav-open");
  }

  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      if (nav.classList.contains("is-open")) {
        closeNav();
      } else {
        openNav();
      }
    });

    navLinks.forEach(function (link) {
      link.addEventListener("click", closeNav);
    });

    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") closeNav();
    });
  }

  /* Active section highlight */
  function setActiveNav() {
    var scrollPos = window.scrollY + 120;
    var current = "";

    sections.forEach(function (section) {
      if (section.offsetTop <= scrollPos) {
        current = section.id;
      }
    });

    navLinks.forEach(function (link) {
      var href = link.getAttribute("href");
      if (!href || href.charAt(0) !== "#") return;
      link.classList.toggle("is-active", href === "#" + current);
    });
  }

  window.addEventListener("scroll", setActiveNav, { passive: true });
  setActiveNav();

  /* Scroll reveal */
  var revealEls = document.querySelectorAll(".reveal");

  if ("IntersectionObserver" in window) {
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.12 }
    );

    revealEls.forEach(function (el) {
      observer.observe(el);
    });
  } else {
    revealEls.forEach(function (el) {
      el.classList.add("is-visible");
    });
  }

  /* Pointer parallax + ambient glow */
  (function initPointerMotion() {
    var root = document.documentElement;
    var targetX = 0;
    var targetY = 0;
    var curX = 0;
    var curY = 0;
    var rafId = 0;
    var active = false;

    function canRun() {
      return finePointer.matches && !reduceMotion.matches;
    }

    function setVars(x, y) {
      root.style.setProperty("--mx", x.toFixed(4));
      root.style.setProperty("--my", y.toFixed(4));
      root.style.setProperty("--px", ((x + 0.5) * 100).toFixed(2) + "%");
      root.style.setProperty("--py", ((y + 0.5) * 100).toFixed(2) + "%");
    }

    function tick() {
      curX += (targetX - curX) * 0.08;
      curY += (targetY - curY) * 0.08;
      setVars(curX, curY);
      if (
        Math.abs(targetX - curX) > 0.0005 ||
        Math.abs(targetY - curY) > 0.0005
      ) {
        rafId = requestAnimationFrame(tick);
      } else {
        rafId = 0;
      }
    }

    function onMove(e) {
      if (!active) return;
      targetX = e.clientX / window.innerWidth - 0.5;
      targetY = e.clientY / window.innerHeight - 0.5;
      if (!rafId) rafId = requestAnimationFrame(tick);
    }

    function enable() {
      if (active || !canRun()) return;
      active = true;
      document.body.classList.add("has-pointer-motion");
      window.addEventListener("pointermove", onMove, { passive: true });
    }

    function disable() {
      active = false;
      document.body.classList.remove("has-pointer-motion");
      window.removeEventListener("pointermove", onMove);
      if (rafId) {
        cancelAnimationFrame(rafId);
        rafId = 0;
      }
      targetX = targetY = curX = curY = 0;
      setVars(0, 0);
    }

    function sync() {
      if (canRun()) enable();
      else disable();
    }

    sync();
    if (finePointer.addEventListener) {
      finePointer.addEventListener("change", sync);
      reduceMotion.addEventListener("change", sync);
    } else {
      finePointer.addListener(sync);
      reduceMotion.addListener(sync);
    }

    if (hero) {
      /* no-op: CSS reads --mx/--my on .hero children */
    }
  })();

  /* Services accordion */
  var accordion = document.querySelector("[data-accordion]");
  if (accordion) {
    var items = Array.prototype.slice.call(
      accordion.querySelectorAll(".accordion-item")
    );
    var triggers = Array.prototype.slice.call(
      accordion.querySelectorAll(".accordion-trigger")
    );
    var activeIndex = 0;

    function openItem(index, focusTrigger) {
      if (index < 0 || index >= items.length) return;
      activeIndex = index;

      items.forEach(function (item, i) {
        var trigger = item.querySelector(".accordion-trigger");
        var panel = item.querySelector(".accordion-panel");
        var open = i === index;
        item.classList.toggle("is-open", open);
        if (trigger) {
          trigger.setAttribute("aria-expanded", open ? "true" : "false");
        }
        if (panel) {
          if (open) {
            panel.removeAttribute("hidden");
          } else {
            panel.setAttribute("hidden", "");
          }
        }
      });

      if (focusTrigger && triggers[index]) {
        triggers[index].focus();
      }
    }

    triggers.forEach(function (trigger, index) {
      trigger.addEventListener("click", function () {
        openItem(index, false);
      });
      trigger.addEventListener("pointerenter", function () {
        if (!finePointer.matches) return;
        openItem(index, false);
      });
    });

    accordion.addEventListener("keydown", function (e) {
      if (!triggers.length) return;
      var next = activeIndex;
      if (e.key === "ArrowDown" || e.key === "ArrowRight") {
        next = (activeIndex + 1) % triggers.length;
        e.preventDefault();
        openItem(next, true);
      } else if (e.key === "ArrowUp" || e.key === "ArrowLeft") {
        next = (activeIndex - 1 + triggers.length) % triggers.length;
        e.preventDefault();
        openItem(next, true);
      } else if (e.key === "Home") {
        e.preventDefault();
        openItem(0, true);
      } else if (e.key === "End") {
        e.preventDefault();
        openItem(triggers.length - 1, true);
      }
    });

    openItem(0, false);
  }
})();
