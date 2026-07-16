/* Manfred Schoch — research portfolio. Vanilla JS, no dependencies. */
/* story-agentic.js — scroll animation and interactive modules for
   "Orchestrating the Agentic Enterprise". */
(function () {
  "use strict";

  var prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var SVGNS = "http://www.w3.org/2000/svg";
  var TEAL = "#0f766e", TEAL_SOFT = "#3aa99e";

  /* ---------- Opening scrollytelling: rigid pipeline -> delegation hierarchy ----------
     A strict, numbered process pipeline reorganizes into a top-down orchestration
     tree: one orchestrator delegates to specialized agents, each wielding its own
     set of tools. Deliberately distinct from Story 1's peer ring, and teal throughout. */
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
    // end layout: a delegation hierarchy.
    //  node 6 -> orchestrator (top center); nodes 0-2 -> agents (middle row);
    //  nodes 3-5 -> the central tool of each agent (bottom row).
    var ORCH = { x: CX, y: 118 };
    var AGENTS = [{ x: 175, y: 322 }, { x: 400, y: 322 }, { x: 625, y: 322 }];
    var ends = [
      { x: AGENTS[0].x, y: AGENTS[0].y, r: 15, role: "agent" },
      { x: AGENTS[1].x, y: AGENTS[1].y, r: 15, role: "agent" },
      { x: AGENTS[2].x, y: AGENTS[2].y, r: 15, role: "agent" },
      { x: AGENTS[0].x, y: 498, r: 7, role: "tool" },
      { x: AGENTS[1].x, y: 502, r: 7, role: "tool" },
      { x: AGENTS[2].x, y: 498, r: 7, role: "tool" },
      { x: ORCH.x, y: ORCH.y, r: 22, role: "orch" }
    ];
    // extra tool leaves flanking each agent's central tool (static, fade in late)
    var leaves = [];
    AGENTS.forEach(function (ag) {
      leaves.push({ x: ag.x - 56, y: 496, ax: ag.x, ay: ag.y });
      leaves.push({ x: ag.x + 56, y: 496, ax: ag.x, ay: ag.y });
    });

    // pipeline arrows (fade out with progress)
    var pipeEls = [];
    for (var p = 0; p < N - 1; p++) {
      var ln = document.createElementNS(SVGNS, "line");
      ln.setAttribute("stroke", "#8f8fa3"); ln.setAttribute("stroke-width", "2");
      canvas.appendChild(ln);
      pipeEls.push(ln);
    }
    // hierarchy links (fade in late): orchestrator -> agents, agents -> their tools
    var netLinks = [];
    AGENTS.forEach(function (ag, k) {
      netLinks.push([ORCH, ag]);                 // delegation edge
      netLinks.push([ag, ends[3 + k]]);          // agent -> central tool
    });
    leaves.forEach(function (lf) {
      netLinks.push([{ x: lf.ax, y: lf.ay }, lf]); // agent -> flanking tool
    });
    var netEls = netLinks.map(function (pair) {
      var line = document.createElementNS(SVGNS, "line");
      line.setAttribute("x1", pair[0].x); line.setAttribute("y1", pair[0].y);
      line.setAttribute("x2", pair[1].x); line.setAttribute("y2", pair[1].y);
      line.setAttribute("stroke", TEAL_SOFT); line.setAttribute("stroke-width", "1.5");
      line.setAttribute("opacity", "0");
      canvas.appendChild(line);
      return line;
    });
    // flanking tool leaves (small teal dots that fade in with the hierarchy)
    var leafEls = leaves.map(function (lf) {
      var c = document.createElementNS(SVGNS, "circle");
      c.setAttribute("cx", lf.x); c.setAttribute("cy", lf.y); c.setAttribute("r", "6");
      c.setAttribute("fill", TEAL_SOFT); c.setAttribute("opacity", "0");
      canvas.appendChild(c);
      return c;
    });
    // nodes: each is a group holding a rect (process step) and a circle (agent/tool/orchestrator)
    var nodeEls = starts.map(function (s, idx) {
      var e = ends[idx];
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
      // orchestrator gets an outer ring to read as the conductor
      var ring = null;
      if (e.role === "orch") {
        ring = document.createElementNS(SVGNS, "circle");
        ring.setAttribute("r", e.r + 7); ring.setAttribute("fill", "none");
        ring.setAttribute("stroke", TEAL_SOFT); ring.setAttribute("stroke-width", "1.5");
        ring.setAttribute("opacity", "0");
        g.appendChild(ring);
      }
      var c = document.createElementNS(SVGNS, "circle");
      c.setAttribute("r", e.r);
      c.setAttribute("fill", e.role === "tool" ? TEAL_SOFT : TEAL);
      c.setAttribute("opacity", "0");
      g.appendChild(c);
      g.setAttribute("transform", "translate(" + s.x + " " + s.y + ")");
      canvas.appendChild(g);
      return { g: g, rect: rect, num: num, circle: c, ring: ring };
    });

    var ease = function (t) { return t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2; };
    var lastStep = -1, ticking = false;

    function positions(m, t) {
      return starts.map(function (s, idx) {
        var e = ends[idx];
        var jy = Math.cos(t * 0.5 + idx * 1.3) * 4 * m;
        return { x: s.x + (e.x - s.x) * m, y: s.y + (e.y - s.y) * m + jy };
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
        if (n.ring) n.ring.setAttribute("opacity", (m * 0.8).toFixed(3));
      });
      pipeEls.forEach(function (el, idx) {
        var a = pos[idx], b = pos[idx + 1];
        el.setAttribute("x1", a.x + 28); el.setAttribute("y1", a.y);
        el.setAttribute("x2", b.x - 28); el.setAttribute("y2", b.y);
        el.setAttribute("opacity", (0.9 * (1 - m)).toFixed(3));
      });
      var net = Math.min(Math.max((p - 0.5) / 0.24, 0), 1);
      netEls.forEach(function (el) { el.setAttribute("opacity", (net * 0.65).toFixed(3)); });
      leafEls.forEach(function (el) { el.setAttribute("opacity", net.toFixed(3)); });

      if (rect.bottom > 0 && rect.top < window.innerHeight && m < 1 && !prefersReduced) {
        requestScrolly();
      }
    }
    function requestScrolly() {
      if (!ticking) { ticking = true; requestAnimationFrame(renderScrolly); }
    }

    if (prefersReduced) {
      var pos0 = positions(1, 0);
      pos0.forEach(function (q, idx) {
        var n = nodeEls[idx];
        n.g.setAttribute("transform", "translate(" + q.x + " " + q.y + ")");
        n.rect.setAttribute("opacity", "0");
        n.num.setAttribute("opacity", "0");
        n.circle.setAttribute("opacity", "1");
        if (n.ring) n.ring.setAttribute("opacity", "0.8");
      });
      pipeEls.forEach(function (el) { el.setAttribute("opacity", "0"); });
      netEls.forEach(function (el) { el.setAttribute("opacity", "0.65"); });
      leafEls.forEach(function (el) { el.setAttribute("opacity", "1"); });
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
})();
