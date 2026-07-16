/* Manfred Schoch — research portfolio. Vanilla JS, no dependencies. */
/* story-human.js — opening animation for "The Human Side of Digital Work".
   Scattered digital traces (log events) reorganize into a few distinct
   behavioural trajectories over a shared timeline: different people, different
   paths of technology use over time. Violet throughout; own motif, distinct
   from Story 1's ring and Story 2's delegation tree. */
(function () {
  "use strict";

  var prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var SVGNS = "http://www.w3.org/2000/svg";
  var V = "#8b6fc4", VS = "#b892e6", VD = "#6d4aa6"; // three violet shades, bright enough on the dark stage

  var scrolly = document.querySelector(".scrolly");
  var canvas = document.getElementById("trace-canvas");
  var blurbs = document.querySelectorAll(".scrolly__blurb");

  if (canvas) {
    // deterministic pseudo-random so the scatter is stable across reloads
    var seed = 7;
    function rand() { seed = (seed * 16807) % 2147483647; return (seed - 1) / 2147483646; }

    var W = 800, H = 600;
    var SAMP = 9, TR = 3;
    var x0 = 96, x1 = 704;
    var AXIS_Y = 540;
    var COLORS = [VS, V, VD];

    // three behavioural trajectories (y: lower on screen = more intensive use)
    function trajY(t, k) {
      if (k === 0) return 206 + Math.sin(t * Math.PI * 2) * 16;   // power user: high, stable, wavy
      if (k === 1) return 438 - t * 208;                          // late adopter: rises over time
      return 300 + Math.sin(t * Math.PI) * 86 - t * 26;           // fluctuates: dips at the shock, recovers
    }

    // build end points + start scatter
    var nodes = [];
    for (var k = 0; k < TR; k++) {
      for (var i = 0; i < SAMP; i++) {
        var t = i / (SAMP - 1);
        nodes.push({
          k: k,
          ex: x0 + (x1 - x0) * t, ey: trajY(t, k),
          sx: 70 + rand() * (W - 140), sy: 90 + rand() * (H - 260),
          r: 3.4 + (k === 0 ? 0.6 : 0), phase: rand() * Math.PI * 2
        });
      }
    }

    // time axis (static, faint)
    var axis = document.createElementNS(SVGNS, "line");
    axis.setAttribute("x1", x0 - 10); axis.setAttribute("y1", AXIS_Y);
    axis.setAttribute("x2", x1 + 18); axis.setAttribute("y2", AXIS_Y);
    axis.setAttribute("stroke", "#4a4a58"); axis.setAttribute("stroke-width", "1.4");
    canvas.appendChild(axis);
    var axisArrow = document.createElementNS(SVGNS, "path");
    axisArrow.setAttribute("d", "M" + (x1 + 18) + " " + AXIS_Y + " l-9 -4.5 v9 z");
    axisArrow.setAttribute("fill", "#4a4a58");
    canvas.appendChild(axisArrow);
    var axisLbl = document.createElementNS(SVGNS, "text");
    axisLbl.setAttribute("x", x1 + 6); axisLbl.setAttribute("y", AXIS_Y + 24);
    axisLbl.setAttribute("fill", "#8f8fa3"); axisLbl.setAttribute("font-size", "13");
    axisLbl.setAttribute("text-anchor", "end"); axisLbl.textContent = "time";
    canvas.appendChild(axisLbl);

    // trajectory polylines (fade in as the dots settle)
    var lineEls = [];
    for (var kk = 0; kk < TR; kk++) {
      var pts = "";
      for (var j = 0; j < SAMP; j++) {
        var tj = j / (SAMP - 1);
        pts += (x0 + (x1 - x0) * tj) + "," + trajY(tj, kk) + " ";
      }
      var pl = document.createElementNS(SVGNS, "polyline");
      pl.setAttribute("points", pts.trim());
      pl.setAttribute("fill", "none"); pl.setAttribute("stroke", COLORS[kk]);
      pl.setAttribute("stroke-width", "2.4"); pl.setAttribute("stroke-linejoin", "round");
      pl.setAttribute("opacity", "0");
      canvas.appendChild(pl);
      lineEls.push(pl);
    }

    // dots
    var dotEls = nodes.map(function (n) {
      var c = document.createElementNS(SVGNS, "circle");
      c.setAttribute("r", n.r);
      c.setAttribute("fill", COLORS[n.k]);
      c.setAttribute("cx", n.sx); c.setAttribute("cy", n.sy);
      c.setAttribute("opacity", "0.9");
      canvas.appendChild(c);
      return c;
    });

    var ease = function (t) { return t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2; };
    var lastStep = -1, ticking = false;

    function place(m, time) {
      nodes.forEach(function (n, idx) {
        var jx = Math.sin(time * 0.7 + n.phase) * 6 * (1 - m);
        var jy = Math.cos(time * 0.6 + n.phase) * 6 * (1 - m);
        dotEls[idx].setAttribute("cx", n.sx + (n.ex - n.sx) * m + jx);
        dotEls[idx].setAttribute("cy", n.sy + (n.ey - n.sy) * m + jy);
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
      var time = performance.now() / 1000;
      place(m, time);
      var net = Math.min(Math.max((p - 0.5) / 0.24, 0), 1);
      lineEls.forEach(function (el) { el.setAttribute("opacity", (net * 0.9).toFixed(3)); });
      var axOp = Math.min(Math.max((p - 0.4) / 0.2, 0), 1);
      axis.setAttribute("opacity", axOp.toFixed(3));
      axisArrow.setAttribute("opacity", axOp.toFixed(3));
      axisLbl.setAttribute("opacity", axOp.toFixed(3));

      if (rect.bottom > 0 && rect.top < window.innerHeight && m < 1 && !prefersReduced) {
        requestScrolly();
      }
    }
    function requestScrolly() {
      if (!ticking) { ticking = true; requestAnimationFrame(renderScrolly); }
    }

    if (prefersReduced) {
      place(1, 0);
      lineEls.forEach(function (el) { el.setAttribute("opacity", "0.9"); });
      [axis, axisArrow, axisLbl].forEach(function (el) { el.setAttribute("opacity", "1"); });
      blurbs.forEach(function (b) { b.classList.add("is-active"); });
    } else {
      axis.setAttribute("opacity", "0"); axisArrow.setAttribute("opacity", "0"); axisLbl.setAttribute("opacity", "0");
      window.addEventListener("scroll", requestScrolly, { passive: true });
      window.addEventListener("resize", requestScrolly);
      requestScrolly();
    }
  }
})();
