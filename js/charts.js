/* Small SVG charts, no library. Colours come from CSS variables so the charts
   follow the light and dark themes. */
(function () {
  'use strict';
  var G = window.GMAT, U = G.util;
  var W = 640, H = 320, M = { l: 54, r: 20, t: 18, b: 46 };

  function scale(d0, d1, r0, r1) {
    return function (v) { return r0 + (v - d0) * (r1 - r0) / (d1 - d0 || 1); };
  }
  function ticks(min, max, step) {
    var out = [];
    for (var v = min; v <= max + 1e-9; v += step) out.push(Math.round(v * 100) / 100);
    return out;
  }
  function yGrid(yT, y, x0, x1) {
    return yT.map(function (v) {
      return '<line class="gridline" x1="' + x0 + '" x2="' + x1 + '" y1="' + y(v) + '" y2="' + y(v) + '"/>' +
        '<text class="axis-text" x="' + (x0 - 8) + '" y="' + (y(v) + 4) + '" text-anchor="end">' + v + '</text>';
    }).join('');
  }
  function yTitle(label) {
    return label ? '<text class="axis-text" transform="translate(14 ' + ((M.t + H - M.b) / 2) + ') rotate(-90)" text-anchor="middle">' + U.esc(label) + '</text>' : '';
  }
  function wrap(svg, label, h) {
    return '<div class="viz"><svg viewBox="0 0 ' + W + ' ' + (h || H) + '" role="img" aria-label="' + U.esc(label) + '">' + svg + '</svg></div>';
  }

  // Bar chart for Graphics Interpretation questions. Values are deliberately
  // not printed on the bars: reading them off the scale is the skill being practised.
  function bar(spec) {
    var x0 = M.l, x1 = W - M.r, y0 = H - M.b, yTop = M.t;
    var y = scale(0, spec.yMax, y0, yTop);
    var band = (x1 - x0) / spec.categories.length;
    var bw = Math.min(46, band * 0.58);
    var s = yGrid(ticks(0, spec.yMax, spec.yStep), y, x0, x1) + yTitle(spec.yLabel);
    spec.categories.forEach(function (c, i) {
      var cx = x0 + band * (i + 0.5), top = y(spec.values[i]), r = 4;
      var left = cx - bw / 2, right = cx + bw / 2;
      s += '<path d="M' + left + ' ' + y0 + ' V' + (top + r) + ' Q' + left + ' ' + top + ' ' + (left + r) + ' ' + top +
        ' H' + (right - r) + ' Q' + right + ' ' + top + ' ' + right + ' ' + (top + r) + ' V' + y0 + ' Z" fill="var(--q)"/>';
      s += '<text class="axis-text" x="' + cx + '" y="' + (y0 + 20) + '" text-anchor="middle">' + U.esc(c) + '</text>';
    });
    s += '<line x1="' + x0 + '" x2="' + x1 + '" y1="' + y0 + '" y2="' + y0 + '" stroke="var(--muted)" stroke-width="1"/>';
    return wrap(s, spec.title + '. Bar chart; read the values from the scale.');
  }

  function scatter(spec) {
    var x0 = M.l, x1 = W - M.r, y0 = H - M.b, yTop = M.t;
    var x = scale(0, spec.xMax, x0, x1), y = scale(0, spec.yMax, y0, yTop);
    var s = yGrid(ticks(0, spec.yMax, spec.yStep), y, x0, x1) + yTitle(spec.yLabel);
    ticks(0, spec.xMax, spec.xStep).forEach(function (v) {
      s += '<line class="gridline" x1="' + x(v) + '" x2="' + x(v) + '" y1="' + y0 + '" y2="' + yTop + '"/>' +
        '<text class="axis-text" x="' + x(v) + '" y="' + (y0 + 18) + '" text-anchor="middle">' + v + '</text>';
    });
    s += '<text class="axis-text" x="' + ((x0 + x1) / 2) + '" y="' + (H - 6) + '" text-anchor="middle">' + U.esc(spec.xLabel) + '</text>';
    spec.points.forEach(function (p) {
      s += '<circle cx="' + x(p[0]) + '" cy="' + y(p[1]) + '" r="6" fill="var(--q)" stroke="var(--surface)" stroke-width="2"/>';
    });
    return wrap(s, spec.title + '. Scatterplot; read the values from the axes.');
  }

  // Line chart for the mock-exam tracker.
  // opts: { series: [{ name, color, values: [number|null] }], labels: [], tips: [], yMin, yMax, yStep, target, single }
  function line(opts) {
    var n = opts.labels.length;
    var rightPad = 64;
    var x0 = M.l, x1 = W - M.r - rightPad, y0 = H - M.b, yTop = M.t;
    var x = function (i) { return n === 1 ? (x0 + x1) / 2 : x0 + (x1 - x0) * i / (n - 1); };
    var y = scale(opts.yMin, opts.yMax, y0, yTop);
    var s = yGrid(ticks(opts.yMin, opts.yMax, opts.yStep), y, x0, x1 + 10);
    opts.labels.forEach(function (l, i) {
      // Thin out date labels when there are many points.
      if (n > 8 && i % 2 === 1 && i !== n - 1) return;
      s += '<text class="axis-text" x="' + x(i) + '" y="' + (y0 + 20) + '" text-anchor="middle">' + U.esc(l) + '</text>';
    });
    if (opts.target != null && opts.target >= opts.yMin && opts.target <= opts.yMax) {
      s += '<line class="target-line" x1="' + x0 + '" x2="' + (x1 + 10) + '" y1="' + y(opts.target) + '" y2="' + y(opts.target) + '"/>' +
        '<text class="axis-text" x="' + (x1 + 14) + '" y="' + (y(opts.target) + 4) + '">Target ' + opts.target + '</text>';
    }
    // End-of-line labels, nudged apart so they do not collide.
    var ends = [];
    opts.series.forEach(function (se) {
      var pts = [];
      se.values.forEach(function (v, i) { if (v != null) pts.push([x(i), y(v), v, i]); });
      if (!pts.length) return;
      if (pts.length > 1) {
        s += '<polyline fill="none" stroke="' + se.color + '" stroke-width="2" stroke-linejoin="round" stroke-linecap="round" points="' +
          pts.map(function (p) { return p[0] + ',' + p[1]; }).join(' ') + '"/>';
      }
      pts.forEach(function (p) {
        var tip = (opts.tips[p[3]] || '') + (opts.single ? '' : ' · ' + se.name) + ': ' + p[2];
        s += '<circle cx="' + p[0] + '" cy="' + p[1] + '" r="5" fill="' + se.color + '" stroke="var(--surface)" stroke-width="2"/>' +
          '<circle class="hit" cx="' + p[0] + '" cy="' + p[1] + '" r="15" fill="transparent" tabindex="0" data-tip="' + U.esc(tip) + '"/>';
      });
      var last = pts[pts.length - 1];
      ends.push({ y: last[1], x: last[0], text: (opts.single ? '' : se.name + ' ') + last[2], color: se.color });
    });
    ends.sort(function (a, b) { return a.y - b.y; });
    for (var i = 1; i < ends.length; i++) if (ends[i].y - ends[i - 1].y < 15) ends[i].y = ends[i - 1].y + 15;
    ends.forEach(function (e) {
      // Keep clear of the target label.
      var ty = e.y;
      if (opts.target != null && Math.abs(ty - y(opts.target)) < 13 && e.x > x1 - 30) ty = y(opts.target) + (ty >= y(opts.target) ? 16 : -14);
      s += '<text class="label-text" x="' + (e.x + 10) + '" y="' + (ty + 4) + '">' + U.esc(e.text) + '</text>';
    });
    return wrap(s, opts.label || 'Line chart');
  }

  // Tooltips for anything with a data-tip attribute inside a .viz container.
  function bind(root) {
    var vizzes = root.querySelectorAll('.viz');
    Array.prototype.forEach.call(vizzes, function (viz) {
      var tip = document.createElement('div');
      tip.className = 'viz-tip';
      tip.hidden = true;
      viz.appendChild(tip);
      function show(el) {
        var vb = viz.getBoundingClientRect(), eb = el.getBoundingClientRect();
        tip.textContent = el.getAttribute('data-tip');
        tip.hidden = false;
        var left = eb.left + eb.width / 2 - vb.left;
        left = Math.max(70, Math.min(vb.width - 70, left));
        tip.style.left = left + 'px';
        tip.style.top = (eb.top + eb.height / 2 - vb.top - 8) + 'px';
      }
      function hide() { tip.hidden = true; }
      Array.prototype.forEach.call(viz.querySelectorAll('[data-tip]'), function (el) {
        el.addEventListener('mouseenter', function () { show(el); });
        el.addEventListener('mouseleave', hide);
        el.addEventListener('focus', function () { show(el); });
        el.addEventListener('blur', hide);
        el.addEventListener('click', function () { show(el); });
      });
    });
  }

  G.charts = { bar: bar, scatter: scatter, line: line, bind: bind };
})();
