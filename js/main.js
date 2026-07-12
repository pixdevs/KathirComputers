(function () {
  "use strict";

  var header = document.querySelector(".site-header");
  var nav = document.getElementById("site-nav");
  var toggle = document.querySelector(".nav-toggle");
  var yearEl = document.getElementById("year");
  var navLinks = document.querySelectorAll('.site-nav a[href^="#"]');
  var sections = document.querySelectorAll("main section[id]");

  if (yearEl) {
    yearEl.textContent = String(new Date().getFullYear());
  }

  /* Sticky header state */
  function onScroll() {
    if (!header) return;
    header.classList.toggle("is-scrolled", window.scrollY > 12);
  }

  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* Mobile nav */
  function closeNav() {
    if (!nav || !toggle) return;
    nav.classList.remove("is-open");
    toggle.setAttribute("aria-expanded", "false");
    toggle.setAttribute("aria-label", "Open menu");
  }

  function openNav() {
    if (!nav || !toggle) return;
    nav.classList.add("is-open");
    toggle.setAttribute("aria-expanded", "true");
    toggle.setAttribute("aria-label", "Close menu");
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

  /* Lifecycle cycle */
  var cycle = document.querySelector("[data-cycle]");
  if (cycle) {
    var nodes = Array.prototype.slice.call(
      cycle.querySelectorAll(".cycle-node")
    );
    var panel = cycle.querySelector(".cycle-panel");
    var titleEl = cycle.querySelector("[data-cycle-title]");
    var detailEl = cycle.querySelector("[data-cycle-detail]");
    var numEl = cycle.querySelector("[data-cycle-num]");
    var titleM = cycle.querySelector("[data-cycle-title-m]");
    var detailM = cycle.querySelector("[data-cycle-detail-m]");
    var numM = cycle.querySelector("[data-cycle-num-m]");
    var activeIndex = 0;

    function padNum(i) {
      return i < 9 ? "0" + (i + 1) : String(i + 1);
    }

    function activate(index, focusNode) {
      if (index < 0 || index >= nodes.length) return;
      activeIndex = index;
      var node = nodes[index];

      nodes.forEach(function (n, i) {
        var selected = i === index;
        n.classList.toggle("is-active", selected);
        n.setAttribute("aria-selected", selected ? "true" : "false");
        n.tabIndex = selected ? 0 : -1;
      });

      cycle.setAttribute("data-active", String(index));

      var title = node.getAttribute("data-title") || "";
      var detail = node.getAttribute("data-detail") || "";
      var num = padNum(index);

      if (titleEl) titleEl.textContent = title;
      if (detailEl) detailEl.textContent = detail;
      if (numEl) numEl.textContent = num;
      if (titleM) titleM.textContent = title;
      if (detailM) detailM.textContent = detail;
      if (numM) numM.textContent = num;

      if (panel) {
        panel.setAttribute("aria-labelledby", node.id);
      }

      if (focusNode) node.focus();
    }

    nodes.forEach(function (node, index) {
      node.addEventListener("mouseenter", function () {
        activate(index, false);
      });
      node.addEventListener("focus", function () {
        activate(index, false);
      });
      node.addEventListener("click", function () {
        activate(index, false);
      });
    });

    cycle.addEventListener("keydown", function (e) {
      if (!nodes.length) return;
      var next = activeIndex;
      if (e.key === "ArrowRight" || e.key === "ArrowDown") {
        next = (activeIndex + 1) % nodes.length;
        e.preventDefault();
        activate(next, true);
      } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
        next = (activeIndex - 1 + nodes.length) % nodes.length;
        e.preventDefault();
        activate(next, true);
      } else if (e.key === "Home") {
        e.preventDefault();
        activate(0, true);
      } else if (e.key === "End") {
        e.preventDefault();
        activate(nodes.length - 1, true);
      }
    });

    activate(0, false);
  }
})();
