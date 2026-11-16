/* Small shared helpers. Everything hangs off one global: window.GMAT */
(function () {
  'use strict';
  var G = window.GMAT = window.GMAT || {};
  G.data = G.data || {};
  var U = G.util = {};

  var ESC = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' };
  U.esc = function (s) {
    return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) { return ESC[c]; });
  };

  // Dates are stored as local 'YYYY-MM-DD' strings so they never shift with time zones.
  U.iso = function (d) {
    var m = d.getMonth() + 1, day = d.getDate();
    return d.getFullYear() + '-' + (m < 10 ? '0' : '') + m + '-' + (day < 10 ? '0' : '') + day;
  };
  U.parse = function (s) {
    if (!s || !/^\d{4}-\d{2}-\d{2}$/.test(s)) return null;
    var p = s.split('-');
    var d = new Date(+p[0], +p[1] - 1, +p[2]);
    return isNaN(d.getTime()) ? null : d;
  };
  U.today = function () { return U.iso(new Date()); };
  U.addDays = function (s, n) {
    var d = U.parse(s);
    d.setDate(d.getDate() + n);
    return U.iso(d);
  };
  U.daysBetween = function (a, b) {
    var da = U.parse(a), db = U.parse(b);
    if (!da || !db) return 0;
    return Math.round((db - da) / 86400000);
  };
  var MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  var DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  U.fmtDate = function (s, withDay) {
    var d = U.parse(s);
    if (!d) return '';
    return (withDay ? DAYS[d.getDay()] + ' ' : '') + d.getDate() + ' ' + MONTHS[d.getMonth()] + ' ' + d.getFullYear();
  };
  U.fmtShort = function (s) {
    var d = U.parse(s);
    return d ? d.getDate() + ' ' + MONTHS[d.getMonth()] : '';
  };

  U.hours = function (h) {
    if (h == null) return '';
    var r = Math.round(h * 2) / 2;
    if (r < 1) return Math.round(h * 60 / 5) * 5 + ' min';
    return (r % 1 === 0 ? r : r.toFixed(1)) + ' h';
  };
  U.clock = function (sec) {
    sec = Math.max(0, Math.round(sec));
    var m = Math.floor(sec / 60), s = sec % 60;
    return m + ':' + (s < 10 ? '0' : '') + s;
  };
  U.pct = function (a, b) { return b ? Math.round(100 * a / b) : 0; };
  U.clamp = function (v, lo, hi) { return Math.max(lo, Math.min(hi, v)); };
  U.uid = function () { return Date.now().toString(36) + Math.random().toString(36).slice(2, 7); };

  // GMAT totals always end in 5 (205–805).
  U.validTotal = function (n) { return n >= 205 && n <= 805 && n % 10 === 5; };
  U.snapTotal = function (n) { return U.clamp(Math.round((n - 5) / 10) * 10 + 5, 205, 805); };

  U.sectionName = { Q: 'Quant', V: 'Verbal', DI: 'Data Insights' };
  U.sectionClass = { Q: 'q', V: 'v', DI: 'di' };
  U.tag = function (sec) {
    if (!U.sectionName[sec]) return '';
    return '<span class="tag ' + U.sectionClass[sec] + '">' + U.sectionName[sec] + '</span>';
  };

  var toastTimer;
  U.toast = function (msg) {
    var t = document.getElementById('toast');
    if (!t) return;
    t.textContent = msg;
    t.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { t.classList.remove('show'); }, 2600);
  };

  U.ext = function (url, text) {
    return '<a class="ext" href="' + U.esc(url) + '" target="_blank" rel="noopener noreferrer">' + text + '</a>';
  };
})();
