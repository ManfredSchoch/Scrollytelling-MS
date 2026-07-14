/* Manfred Schoch — research portfolio. Vanilla JS, no dependencies. */
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

  /* ---------- Opening scrollytelling: crowd -> agent network ---------- */
  var scrolly = document.querySelector(".scrolly");
  var canvas = document.getElementById("crowd-canvas");
  var blurbs = document.querySelectorAll(".scrolly__blurb");

  if (canvas) {
    // Deterministic pseudo-random (so the layout is stable).
    var seed = 42;
    function rand() { seed = (seed * 16807) % 2147483647; return (seed - 1) / 2147483646; }

    var W = 800, H = 600, CX = W / 2, CY = H / 2;
    var hubs = [];
    var HUB_N = 6, R = 190;
    for (var h = 0; h < HUB_N; h++) {
      var a = (Math.PI * 2 * h) / HUB_N - Math.PI / 2;
      hubs.push({ x: CX + R * Math.cos(a), y: CY + R * Math.sin(a) });
    }
    hubs.push({ x: CX, y: CY }); // orchestrator in the middle

    var DOTS = 42, dots = [];
    for (var i = 0; i < DOTS; i++) {
      var hub = hubs[i % hubs.length];
      var ang = rand() * Math.PI * 2, dist = 14 + rand() * 34;
      dots.push({
        sx: 60 + rand() * (W - 120), sy: 60 + rand() * (H - 120),
        tx: hub.x + dist * Math.cos(ang), ty: hub.y + dist * Math.sin(ang),
        r: 3 + rand() * 2.5, phase: rand() * Math.PI * 2
      });
    }

    // Build SVG: links first (below), then dots.
    var links = [];
    for (var l = 0; l < HUB_N; l++) {
      links.push([hubs[l], hubs[(l + 1) % HUB_N]]); // ring
      links.push([hubs[l], hubs[HUB_N]]);           // spokes to orchestrator
    }
    var linkEls = links.map(function (pair) {
      var line = document.createElementNS(SVGNS, "line");
      line.setAttribute("x1", pair[0].x); line.setAttribute("y1", pair[0].y);
      line.setAttribute("x2", pair[1].x); line.setAttribute("y2", pair[1].y);
      line.setAttribute("stroke", "#3d5bd8"); line.setAttribute("stroke-width", "1.4");
      line.setAttribute("opacity", "0");
      canvas.appendChild(line);
      return line;
    });
    var hubEls = hubs.map(function (hb, idx) {
      var c = document.createElementNS(SVGNS, "circle");
      c.setAttribute("cx", hb.x); c.setAttribute("cy", hb.y);
      c.setAttribute("r", idx === HUB_N ? 13 : 9);
      c.setAttribute("fill", idx === HUB_N ? "#d97e00" : "#5570e0");
      c.setAttribute("opacity", "0");
      canvas.appendChild(c);
      return c;
    });
    var dotEls = dots.map(function (d) {
      var c = document.createElementNS(SVGNS, "circle");
      c.setAttribute("cx", d.sx); c.setAttribute("cy", d.sy);
      c.setAttribute("r", d.r);
      c.setAttribute("fill", "#c9c9dc");
      c.setAttribute("opacity", "0.85");
      canvas.appendChild(c);
      return c;
    });

    var ease = function (t) { return t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2; };
    var lastStep = -1, ticking = false;

    function renderScrolly() {
      ticking = false;
      var rect = scrolly.getBoundingClientRect();
      var total = rect.height - window.innerHeight;
      var p = Math.min(Math.max(-rect.top / total, 0), 1);

      // Blurb steps
      var step = p < 0.3 ? 0 : p < 0.62 ? 1 : 2;
      if (step !== lastStep) {
        blurbs.forEach(function (b, idx) { b.classList.toggle("is-active", idx === step); });
        lastStep = step;
      }

      // Morph: crowd (p<0.35) -> network (p>0.78)
      var m = ease(Math.min(Math.max((p - 0.35) / 0.43, 0), 1));
      var t = performance.now() / 1000;
      dots.forEach(function (d, idx) {
        var jx = Math.sin(t * 0.7 + d.phase) * 6 * (1 - m);
        var jy = Math.cos(t * 0.6 + d.phase) * 6 * (1 - m);
        dotEls[idx].setAttribute("cx", d.sx + (d.tx - d.sx) * m + jx);
        dotEls[idx].setAttribute("cy", d.sy + (d.ty - d.sy) * m + jy);
      });
      var net = Math.min(Math.max((p - 0.66) / 0.24, 0), 1);
      linkEls.forEach(function (el) { el.setAttribute("opacity", (net * 0.7).toFixed(3)); });
      hubEls.forEach(function (el) { el.setAttribute("opacity", net.toFixed(3)); });

      // Keep gentle idle motion while the crowd phase is visible.
      if (rect.bottom > 0 && rect.top < window.innerHeight && m < 1 && !prefersReduced) {
        requestScrolly();
      }
    }
    function requestScrolly() {
      if (!ticking) { ticking = true; requestAnimationFrame(renderScrolly); }
    }

    if (prefersReduced) {
      // Static final state: network shown, all blurbs visible via CSS.
      dots.forEach(function (d, idx) {
        dotEls[idx].setAttribute("cx", d.tx); dotEls[idx].setAttribute("cy", d.ty);
      });
      linkEls.forEach(function (el) { el.setAttribute("opacity", "0.7"); });
      hubEls.forEach(function (el) { el.setAttribute("opacity", "1"); });
      blurbs.forEach(function (b) { b.classList.add("is-active"); });
    } else {
      window.addEventListener("scroll", requestScrolly, { passive: true });
      window.addEventListener("resize", requestScrolly);
      requestScrolly();
    }
  }

  /* ---------- Density chart (schematic, Act 3) ---------- */
  var chart = document.getElementById("density-chart");
  if (chart) {
    var CW = 560, CH = 320, PAD = 44, BASE = CH - 56;
    function gauss(x, mu, sig) { return Math.exp(-Math.pow(x - mu, 2) / (2 * sig * sig)); }
    function densityPath(mu, sig, amp, open) {
      var pts = [];
      for (var x = 0; x <= 100; x += 2) {
        var px = PAD + (x / 100) * (CW - 2 * PAD);
        var py = BASE - gauss(x, mu, sig) * amp;
        pts.push((x === 0 ? "M" : "L") + px.toFixed(1) + " " + py.toFixed(1));
      }
      var d = pts.join(" ");
      return open ? d : d + " L" + (CW - PAD) + " " + BASE + " L" + PAD + " " + BASE + " Z";
    }
    function add(el, attrs, parent) {
      var n = document.createElementNS(SVGNS, el);
      for (var k in attrs) n.setAttribute(k, attrs[k]);
      (parent || chart).appendChild(n);
      return n;
    }
    // Axis
    add("line", { x1: PAD, y1: BASE, x2: CW - PAD, y2: BASE, stroke: "#dcd9d0", "stroke-width": 1.5 });
    add("text", { x: PAD, y: BASE + 26, fill: "#4a4a58", "font-size": 13 }).textContent = "lower rating";
    var tr = add("text", { x: CW - PAD, y: BASE + 26, fill: "#4a4a58", "font-size": 13, "text-anchor": "end" });
    tr.textContent = "higher rating";
    // Curves: human (grey), single LLM (shifted right), MAS (aligned with human)
    var curves = [
      { mu: 42, sig: 15, amp: 165, fill: "rgba(21,21,29,0.14)", stroke: "#15151d", label: "Human experts", lx: 0.20 },
      { mu: 72, sig: 12, amp: 185, fill: "rgba(217,126,0,0.16)", stroke: "#d97e00", label: "Single LLM", lx: 0.80 },
      { mu: 46, sig: 14, amp: 172, fill: "none", stroke: "#2547d0", dash: "8 5", label: "Collaborative multi-agent system", lx: 0.36 }
    ];
    var curveEls = curves.map(function (c, i) {
      var attrs = {
        d: densityPath(c.mu, c.sig, c.amp, c.fill === "none"), fill: c.fill, stroke: c.stroke,
        "stroke-width": 2.4, opacity: 0, style: "transition: opacity 0.8s ease " + (i * 0.45) + "s"
      };
      if (c.dash) attrs["stroke-dasharray"] = c.dash;
      return add("path", attrs);
    });
    // Legend
    curves.forEach(function (c, i) {
      var y = 26 + i * 22;
      add("rect", { x: PAD, y: y - 10, width: 14, height: 14, rx: 3, fill: c.stroke, opacity: 0.85 });
      var t = add("text", { x: PAD + 22, y: y + 2, fill: "#15151d", "font-size": 13.5 });
      t.textContent = c.label;
    });
    var chartObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          curveEls.forEach(function (el) { el.setAttribute("opacity", 1); });
          chartObserver.unobserve(e.target);
        }
      });
    }, { threshold: 0.4 });
    chartObserver.observe(chart);
    if (prefersReduced) curveEls.forEach(function (el) { el.setAttribute("opacity", 1); });
  }

  /* ---------- Simple-slopes chart (schematic, Act 2) ---------- */
  var slopes = document.getElementById("slopes-chart");
  if (slopes) {
    var sAdd = function (el, attrs, text) {
      var n = document.createElementNS(SVGNS, el);
      for (var k in attrs) n.setAttribute(k, attrs[k]);
      if (text) n.textContent = text;
      slopes.appendChild(n);
      return n;
    };
    var INK = "#15151d", SOFT = "#4a4a58", LINEC = "#dcd9d0";
    var series = [
      { key: "low", label: "Low individual creativity", stroke: "#2547d0" },
      { key: "med", label: "Medium", stroke: "#d97e00", dash: "8 5" },
      { key: "high", label: "High", stroke: "#15151d", dash: "2 5" }
    ];
    // Normalized end points (0 = plot bottom, 1 = plot top), read off the article's figure.
    var panels = [
      {
        x: 20, title: "Divergent thinking", sub: "generating ideas", result: "Differences flatten out",
        lines: { low: [0.06, 0.23], med: [0.22, 0.57], high: [0.39, 0.0] }
      },
      {
        x: 300, title: "Convergent thinking", sub: "selecting & refining", result: "AI literacy decides",
        lines: { low: [0.03, 0.92], med: [0.51, 0.65], high: [0.64, 0.53] }
      }
    ];
    // Legend (top, horizontal)
    var lx = 20;
    series.forEach(function (s) {
      var seg = sAdd("line", { x1: lx, y1: 14, x2: lx + 26, y2: 14, stroke: s.stroke, "stroke-width": 2.6 });
      if (s.dash) seg.setAttribute("stroke-dasharray", s.dash);
      var t = sAdd("text", { x: lx + 32, y: 18, fill: INK, "font-size": 12.5 }, s.label);
      lx += 32 + s.label.length * 6.4 + 22;
    });
    var PT = 46, PB = 296, PW = 240;
    panels.forEach(function (p) {
      var x0 = p.x + 8, x1 = p.x + PW - 8;
      sAdd("text", { x: p.x + 8, y: PT - 8, fill: INK, "font-size": 14.5, "font-weight": 700 }, p.title);
      sAdd("text", { x: p.x + 8, y: PT + 8, fill: SOFT, "font-size": 11.5 }, p.sub);
      // frame + gridlines
      sAdd("line", { x1: x0, y1: PB, x2: x1, y2: PB, stroke: LINEC, "stroke-width": 1.5 });
      sAdd("line", { x1: x0, y1: PT + 16, x2: x0, y2: PB, stroke: LINEC, "stroke-width": 1.5 });
      [0.25, 0.5, 0.75].forEach(function (g) {
        var gy = PB - g * (PB - PT - 24);
        sAdd("line", { x1: x0, y1: gy, x2: x1, y2: gy, stroke: LINEC, "stroke-width": 0.7, opacity: 0.7 });
      });
      // lines (in a group clipped for the draw-in animation)
      var group = sAdd("g", { class: "slopes-lines" });
      series.forEach(function (s) {
        var v = p.lines[s.key];
        var y0 = PB - v[0] * (PB - PT - 24), y1 = PB - v[1] * (PB - PT - 24);
        var ln = document.createElementNS(SVGNS, "line");
        ln.setAttribute("x1", x0 + 6); ln.setAttribute("y1", y0);
        ln.setAttribute("x2", x1 - 6); ln.setAttribute("y2", y1);
        ln.setAttribute("stroke", s.stroke); ln.setAttribute("stroke-width", 2.6);
        ln.setAttribute("stroke-linecap", "round");
        if (s.dash) ln.setAttribute("stroke-dasharray", s.dash);
        group.appendChild(ln);
      });
      // axis labels + result pill
      sAdd("text", { x: x0, y: PB + 18, fill: SOFT, "font-size": 11.5 }, "low AI literacy");
      sAdd("text", { x: x1, y: PB + 18, fill: SOFT, "font-size": 11.5, "text-anchor": "end" }, "high AI literacy");
      var pw = p.result.length * 6.6 + 22;
      sAdd("rect", { x: p.x + 8, y: PB + 30, width: pw, height: 24, rx: 12, fill: p.x < 100 ? "rgba(21,21,29,0.07)" : "rgba(37,71,208,0.12)" });
      sAdd("text", { x: p.x + 19, y: PB + 46, fill: p.x < 100 ? SOFT : "#2547d0", "font-size": 12.5, "font-weight": 600 }, p.result);
    });
    sAdd("text", { x: 12, y: 180, fill: SOFT, "font-size": 11.5, transform: "rotate(-90 12 180)", "text-anchor": "middle" }, "performance");
    var slopesObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { slopes.classList.add("in-view"); slopesObserver.unobserve(e.target); }
      });
    }, { threshold: 0.35 });
    slopesObserver.observe(slopes);
    if (prefersReduced) slopes.classList.add("in-view");
  }

  /* ---------- Contests chart (schematic, Act 1) ---------- */
  var contests = document.getElementById("contests-chart");
  if (contests) {
    var cAdd = function (el, attrs, text) {
      var n = document.createElementNS(SVGNS, el);
      for (var k in attrs) n.setAttribute(k, attrs[k]);
      if (text) n.textContent = text;
      contests.appendChild(n);
      return n;
    };
    var C_INK = "#15151d", C_SOFT = "#4a4a58", C_LINE = "#dcd9d0", C_ACC = "#2547d0", C_WARM = "#d97e00";
    // Balanced accuracy (%), contests G1..G4 in ascending specialization.
    var cPanels = [
      { x: 20, title: "Absolute ratings", result: "LLM stuck at chance level", pill: "rgba(21,21,29,0.07)", pillText: C_SOFT,
        crowd: [79, 56, 50, 50], llm: [50, 50, 50, 50], chance: true },
      { x: 300, title: "Computed rankings", result: "LLM keeps pace with the crowd", pill: "rgba(37,71,208,0.12)", pillText: C_ACC,
        crowd: [77, 66, 54, 69], llm: [80, 74, 69, 76] }
    ];
    // Legend
    [["Crowd", C_INK, 20], ["LLM", C_ACC, 110]].forEach(function (l) {
      cAdd("line", { x1: l[2], y1: 14, x2: l[2] + 26, y2: 14, stroke: l[1], "stroke-width": 2.6 });
      cAdd("circle", { cx: l[2] + 13, cy: 14, r: 3.6, fill: l[1] });
      cAdd("text", { x: l[2] + 32, y: 18, fill: C_INK, "font-size": 12.5 }, l[0]);
    });
    var cPT = 46, cPB = 276, cPW = 240;
    var yOf = function (v) { return cPB - ((v - 40) / 50) * (cPB - cPT - 14); };
    cPanels.forEach(function (p) {
      var x0 = p.x + 8, x1 = p.x + cPW - 8;
      var xOf = function (i) { return x0 + 20 + (i / 3) * (x1 - x0 - 40); };
      cAdd("text", { x: p.x + 8, y: cPT - 8, fill: C_INK, "font-size": 14.5, "font-weight": 700 }, p.title);
      cAdd("line", { x1: x0, y1: cPB, x2: x1, y2: cPB, stroke: C_LINE, "stroke-width": 1.5 });
      cAdd("line", { x1: x0, y1: cPT + 4, x2: x0, y2: cPB, stroke: C_LINE, "stroke-width": 1.5 });
      [50, 65, 80].forEach(function (g) {
        cAdd("line", { x1: x0, y1: yOf(g), x2: x1, y2: yOf(g), stroke: C_LINE, "stroke-width": 0.7, opacity: 0.7 });
        cAdd("text", { x: x0 - 4, y: yOf(g) + 3.5, fill: C_SOFT, "font-size": 10, "text-anchor": "end" }, g + "%");
      });
      if (p.chance) {
        cAdd("line", { x1: x0, y1: yOf(50), x2: x1, y2: yOf(50), stroke: C_WARM, "stroke-width": 1.4, "stroke-dasharray": "5 4" });
        cAdd("text", { x: x1, y: yOf(50) - 6, fill: C_WARM, "font-size": 11, "text-anchor": "end", "font-style": "italic" }, "chance");
      }
      var group = cAdd("g", { class: "slopes-lines" });
      [["crowd", C_INK], ["llm", C_ACC]].forEach(function (s) {
        var pts = p[s[0]].map(function (v, i) { return xOf(i) + "," + yOf(v); }).join(" ");
        var pl = document.createElementNS(SVGNS, "polyline");
        pl.setAttribute("points", pts);
        pl.setAttribute("fill", "none"); pl.setAttribute("stroke", s[1]);
        pl.setAttribute("stroke-width", 2.6); pl.setAttribute("stroke-linejoin", "round");
        group.appendChild(pl);
        p[s[0]].forEach(function (v, i) {
          var c = document.createElementNS(SVGNS, "circle");
          c.setAttribute("cx", xOf(i)); c.setAttribute("cy", yOf(v));
          c.setAttribute("r", 3.8); c.setAttribute("fill", s[1]);
          group.appendChild(c);
        });
      });
      for (var i = 0; i < 4; i++) {
        cAdd("text", { x: xOf(i), y: cPB + 16, fill: C_SOFT, "font-size": 10.5, "text-anchor": "middle" }, "C" + (i + 1));
      }
      cAdd("text", { x: x0 + 12, y: cPB + 32, fill: C_SOFT, "font-size": 10.5 }, "specialization →");
      var pw = p.result.length * 6.4 + 22;
      cAdd("rect", { x: p.x + 8, y: cPB + 42, width: pw, height: 24, rx: 12, fill: p.pill });
      cAdd("text", { x: p.x + 19, y: cPB + 58, fill: p.pillText, "font-size": 12.5, "font-weight": 600 }, p.result);
    });
    var contestsObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { contests.classList.add("in-view"); contestsObserver.unobserve(e.target); }
      });
    }, { threshold: 0.35 });
    contestsObserver.observe(contests);
    if (prefersReduced) contests.classList.add("in-view");
  }

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

  /* ---------- Footer year ---------- */
  var y = document.getElementById("year");
  if (y) y.textContent = new Date().getFullYear();
})();
