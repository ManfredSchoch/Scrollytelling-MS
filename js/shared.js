/* Manfred Schoch — research portfolio. Vanilla JS, no dependencies. */
/* shared.js — used by every page (landing + stories). */
(function () {
  "use strict";

  var prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var SVGNS = "http://www.w3.org/2000/svg";

/* ---------- Reveal on scroll ---------- */
  // threshold 0 + bottom rootMargin: fires once the element crosses ~8% above
  // the viewport bottom. A ratio threshold would never fire for elements taller
  // than the viewport (e.g. the publication list on phones).
  var revealObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting) {
        e.target.classList.add("in-view");
        revealObserver.unobserve(e.target);
      }
    });
  }, { threshold: 0, rootMargin: "0px 0px -8% 0px" });
  document.querySelectorAll(".reveal").forEach(function (el) { revealObserver.observe(el); });

/* ---------- Chapter hero: oval draw ---------- */
  document.querySelectorAll(".oval").forEach(function (span) {
    var svg = document.createElementNS(SVGNS, "svg");
    svg.setAttribute("class", "oval-ring");
    svg.setAttribute("viewBox", "0 0 100 60");
    svg.setAttribute("preserveAspectRatio", "none");
    var el = document.createElementNS(SVGNS, "ellipse");
    el.setAttribute("cx", "50"); el.setAttribute("cy", "30");
    el.setAttribute("rx", "48"); el.setAttribute("ry", "27");
    el.setAttribute("vector-effect", "non-scaling-stroke");
    svg.appendChild(el);
    span.appendChild(svg);
  });
  var heroObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting) { e.target.classList.add("in-view"); heroObserver.unobserve(e.target); }
    });
  }, { threshold: 0.5 });
  document.querySelectorAll(".chapter__hero").forEach(function (el) { heroObserver.observe(el); });

  /* ---------- Stat counters ---------- */
  function animateCount(el) {
    var target = parseInt(el.getAttribute("data-count"), 10);
    var t0 = null;
    function tick(t) {
      if (!t0) t0 = t;
      var p = Math.min((t - t0) / 1400, 1);
      el.textContent = Math.round(target * (1 - Math.pow(1 - p, 3)));
      if (p < 1) requestAnimationFrame(tick);
    }
    if (prefersReduced) { el.textContent = target; return; }
    requestAnimationFrame(tick);
  }
  var statObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting) { animateCount(e.target); statObserver.unobserve(e.target); }
    });
  }, { threshold: 0.6 });
  document.querySelectorAll(".stat__num").forEach(function (el) { statObserver.observe(el); });

  /* ---------- Publication filter ---------- */
  var filterBtns = document.querySelectorAll(".pubs__filter");
  var pubItems = document.querySelectorAll(".pubs__list li");
  filterBtns.forEach(function (btn) {
    btn.addEventListener("click", function () {
      filterBtns.forEach(function (b) { b.classList.toggle("is-active", b === btn); });
      var f = btn.getAttribute("data-filter");
      pubItems.forEach(function (li) {
        li.classList.toggle("is-hidden", f !== "all" && li.getAttribute("data-type") !== f);
      });
    });
  });

  /* ---------- Funnel bars (grows bars into view) ---------- */
  var funnelObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting) { e.target.classList.add("in-view"); funnelObserver.unobserve(e.target); }
    });
  }, { threshold: 0.4 });
  document.querySelectorAll(".funnel").forEach(function (el) {
    if (prefersReduced) { el.classList.add("in-view"); return; }
    funnelObserver.observe(el);
  });

  /* ---------- Footer year ---------- */
  var y = document.getElementById("year");
  if (y) y.textContent = new Date().getFullYear();
})();
