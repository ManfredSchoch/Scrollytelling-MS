/* Manfred Schoch — research portfolio. Vanilla JS, no dependencies. */
/* story-agentic.js — scroll animation and interactive modules for
   "Orchestrating the Agentic Enterprise". */
(function () {
  "use strict";

  var prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var SVGNS = "http://www.w3.org/2000/svg";
  var TEAL = "#0f766e", TEAL_SOFT = "#3aa99e";

  /* ---------- Opening scrollytelling: rigid pipeline -> agent network ---------- */
  var scrolly = document.querySelector(".scrolly");
  var canvas = document.getElementById("pipeline-canvas");
  var blurbs = document.querySelectorAll(".scrolly__blurb");

  if (canvas) {
    var W = 800, H = 600, CX = W / 2, CY = H / 2;
    var N = 7;
    // start: a strict pipeline, evenly spaced along a horizontal line
    var starts = [];
    for (var i = 0; i < N; i++) {
      starts.push({ x: 90 + (i / (N - 1)) * (W - 180), y: CY });
    }
    // end: an agent network (ring of 6 + orchestrator in the middle)
    var ends = [];
    for (var h = 0; h < 6; h++) {
      var a = (Math.PI * 2 * h) / 6 - Math.PI / 2;
      ends.push({ x: CX + 185 * Math.cos(a), y: CY + 185 * Math.sin(a) });
    }
    ends.push({ x: CX, y: CY }); // node 7 becomes the orchestrator

    // pipeline arrows (fade out with progress)
    var pipeEls = [];
    for (var p = 0; p < N - 1; p++) {
      var ln = document.createElementNS(SVGNS, "line");
      ln.setAttribute("stroke", "#8f8fa3"); ln.setAttribute("stroke-width", "2");
      ln.setAttribute("marker-end", "");
      canvas.appendChild(ln);
      pipeEls.push(ln);
    }
    // network links (fade in late): ring + spokes
    var netLinks = [];
    for (var l = 0; l < 6; l++) {
      netLinks.push([ends[l], ends[(l + 1) % 6]]);
      netLinks.push([ends[l], ends[6]]);
    }
    var netEls = netLinks.map(function (pair) {
      var line = document.createElementNS(SVGNS, "line");
      line.setAttribute("x1", pair[0].x); line.setAttribute("y1", pair[0].y);
      line.setAttribute("x2", pair[1].x); line.setAttribute("y2", pair[1].y);
      line.setAttribute("stroke", TEAL_SOFT); line.setAttribute("stroke-width", "1.5");
      line.setAttribute("opacity", "0");
      canvas.appendChild(line);
      return line;
    });
    // nodes: each is a group holding a rect (process step) and a circle (agent)
    var nodeEls = starts.map(function (s, idx) {
      var g = document.createElementNS(SVGNS, "g");
      var rect = document.createElementNS(SVGNS, "rect");
      rect.setAttribute("x", "-24"); rect.setAttribute("y", "-17");
      rect.setAttribute("width", "48"); rect.setAttribute("height", "34");
      rect.setAttribute("rx", "7");
      rect.setAttribute("fill", "none"); rect.setAttribute("stroke", "#c9c9dc");
      rect.setAttribute("stroke-width", "2");
      g.appendChild(rect);
      var num = document.createElementNS(SVGNS, "text");
      num.setAttribute("fill", "#c9c9dc"); num.setAttribute("font-size", "15");
      num.setAttribute("text-anchor", "middle"); num.setAttribute("y", "5");
      num.textContent = idx + 1;
      g.appendChild(num);
      var c = document.createElementNS(SVGNS, "circle");
      c.setAttribute("r", idx === N - 1 ? 15 : 11);
      c.setAttribute("fill", idx === N - 1 ? "#d97e00" : TEAL_SOFT);
      c.setAttribute("opacity", "0");
      g.appendChild(c);
      g.setAttribute("transform", "translate(" + s.x + " " + s.y + ")");
      canvas.appendChild(g);
      return { g: g, rect: rect, num: num, circle: c };
    });

    var ease = function (t) { return t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2; };
    var lastStep = -1, ticking = false;

    function positions(m, t) {
      return starts.map(function (s, idx) {
        var e = ends[idx];
        var jx = Math.sin(t * 0.6 + idx * 1.7) * 5 * m;
        var jy = Math.cos(t * 0.5 + idx * 1.3) * 5 * m;
        return { x: s.x + (e.x - s.x) * m + jx * 0, y: s.y + (e.y - s.y) * m, jx: jx, jy: jy };
      });
    }

    function renderScrolly() {
      ticking = false;
      var rect = scrolly.getBoundingClientRect();
      var total = rect.height - window.innerHeight;
      var p = Math.min(Math.max(-rect.top / total, 0), 1);

      var step = p < 0.26 ? 0 : p < 0.56 ? 1 : 2;
      if (step !== lastStep) {
        blurbs.forEach(function (b, idx) { b.classList.toggle("is-active", idx === step); });
        lastStep = step;
      }

      var m = ease(Math.min(Math.max((p - 0.15) / 0.45, 0), 1));
      var t = performance.now() / 1000;
      var pos = positions(m, t);
      pos.forEach(function (q, idx) {
        var n = nodeEls[idx];
        n.g.setAttribute("transform", "translate(" + q.x + " " + q.y + ")");
        n.rect.setAttribute("opacity", (1 - m).toFixed(3));
        n.num.setAttribute("opacity", (1 - m).toFixed(3));
        n.circle.setAttribute("opacity", m.toFixed(3));
      });
      pipeEls.forEach(function (el, idx) {
        var a = pos[idx], b = pos[idx + 1];
        el.setAttribute("x1", a.x + 28); el.setAttribute("y1", a.y);
        el.setAttribute("x2", b.x - 28); el.setAttribute("y2", b.y);
        el.setAttribute("opacity", (0.9 * (1 - m)).toFixed(3));
      });
      var net = Math.min(Math.max((p - 0.5) / 0.24, 0), 1);
      netEls.forEach(function (el) { el.setAttribute("opacity", (net * 0.7).toFixed(3)); });

      if (rect.bottom > 0 && rect.top < window.innerHeight && m < 1 && !prefersReduced) {
        requestScrolly();
      }
    }
    function requestScrolly() {
      if (!ticking) { ticking = true; requestAnimationFrame(renderScrolly); }
    }

    if (prefersReduced) {
      var pos = positions(1, 0);
      pos.forEach(function (q, idx) {
        var n = nodeEls[idx];
        n.g.setAttribute("transform", "translate(" + q.x + " " + q.y + ")");
        n.rect.setAttribute("opacity", "0");
        n.num.setAttribute("opacity", "0");
        n.circle.setAttribute("opacity", "1");
      });
      pipeEls.forEach(function (el) { el.setAttribute("opacity", "0"); });
      netEls.forEach(function (el) { el.setAttribute("opacity", "0.7"); });
      blurbs.forEach(function (b) { b.classList.add("is-active"); });
    } else {
      window.addEventListener("scroll", requestScrolly, { passive: true });
      window.addEventListener("resize", requestScrolly);
      requestScrolly();
    }
  }

  /* ---------- Control <-> Autonomy spectrum ---------- */
  var slider = document.getElementById("spectrum-slider");
  var rowsEl = document.getElementById("spectrum-rows");
  var summaryEl = document.getElementById("spectrum-summary");
  if (slider && rowsEl) {
    var DIMS = [
      { group: "Task representation", label: "Process specification",
        opts: ["Imperative process model", "Declarative process model", "Reference process", "None"] },
      { group: "Agent architectures", label: "Tools per agent",
        opts: ["Dedicated", "Predefined pool", "Marketplace at runtime", "Generated at runtime"] },
      { group: "Delegation mechanisms", label: "Interaction structure",
        opts: ["Deterministic", "Centralized", "Emergent"] }
    ];
    var BANDS = [
      "Everything is scripted: the process is modelled step by step, every agent gets exactly its tools, and who talks to whom is fixed. Predictable and auditable — but the system can only handle what you foresaw.",
      "You describe rules and goals instead of steps. Agents work from curated tool pools, and their interaction follows a fixed structure. A sweet spot for many regulated processes.",
      "Reference processes replace prescriptions, agents discover tools in a marketplace, and a coordinator moderates their interaction. The system starts to surprise you — in both directions.",
      "No process specification, tools generated on the fly, emergent interaction. The system finds its own way — and control shifts from design time to run time: observation, guardrails, and tracing."
    ];
    var chipRefs = [];
    DIMS.forEach(function (d) {
      var group = document.createElement("p");
      group.className = "spectrum__group";
      group.textContent = d.group + " · " + d.label;
      rowsEl.appendChild(group);
      var row = document.createElement("div");
      row.className = "spectrum__chips";
      var chips = d.opts.map(function (o) {
        var chip = document.createElement("span");
        chip.className = "chip";
        chip.textContent = o;
        row.appendChild(chip);
        return chip;
      });
      chipRefs.push(chips);
      rowsEl.appendChild(row);
    });
    function updateSpectrum() {
      var t = slider.value / 100;
      chipRefs.forEach(function (chips) {
        var idx = Math.min(chips.length - 1, Math.floor(t * chips.length));
        chips.forEach(function (c, i) { c.classList.toggle("is-active", i === idx); });
      });
      if (summaryEl) {
        summaryEl.textContent = BANDS[Math.min(3, Math.floor(t * 4))];
      }
    }
    slider.addEventListener("input", updateSpectrum);
    updateSpectrum();
  }

  /* ---------- Funnel bars (practice) ---------- */
  var funnel = document.querySelector(".funnel");
  if (funnel) {
    var funnelObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { funnel.classList.add("in-view"); funnelObserver.unobserve(e.target); }
      });
    }, { threshold: 0.4 });
    funnelObserver.observe(funnel);
    if (prefersReduced) funnel.classList.add("in-view");
  }
})();
