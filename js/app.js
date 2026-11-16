/* App shell: navigation, hash routing and theme. */
(function () {
  'use strict';
  var G = window.GMAT, U = G.util, V = G.views;

  function icon(d) {
    return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' + d + '</svg>';
  }
  var I = {
    today: icon('<path d="M3 11l9-7 9 7"/><path d="M5 10v10h14V10"/>'),
    plan: icon('<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 10h18M8 3v4M16 3v4"/>'),
    study: icon('<path d="M12 3a6 6 0 0 0-4 10.5V16h8v-2.5A6 6 0 0 0 12 3z"/><path d="M9 20h6"/>'),
    exam: icon('<path d="M6 3h9l4 4v14H6z"/><path d="M14 3v5h5M9 13h7M9 17h7"/>'),
    quant: icon('<path d="M17 5H7l6 7-6 7h10"/>'),
    verbal: icon('<path d="M4 6h16M4 11h16M4 16h10"/>'),
    di: icon('<path d="M4 20V4M4 20h16"/><path d="M8 16v-4M12 16V8M16 16v-6"/>'),
    strategy: icon('<circle cx="12" cy="13" r="8"/><path d="M12 9v4l3 2M9 2h6"/>'),
    practice: icon('<path d="M4 20l4-1L20 7l-3-3L5 16z"/><path d="M14 6l3 3"/>'),
    errors: icon('<path d="M9 6h11M9 12h11M9 18h11"/><path d="M4 6l1 1 2-2M4 12l1 1 2-2M4 18l1 1 2-2"/>'),
    mocks: icon('<path d="M3 17l6-6 4 4 8-8"/><path d="M15 7h6v6"/>'),
    testday: icon('<path d="M5 21V4"/><path d="M5 4h13l-3 4 3 4H5"/>'),
    resources: icon('<path d="M10 14a4 4 0 0 0 6 0l3-3a4 4 0 0 0-6-6l-1 1"/><path d="M14 10a4 4 0 0 0-6 0l-3 3a4 4 0 0 0 6 6l1-1"/>'),
    sources: icon('<circle cx="12" cy="12" r="9"/><path d="M12 11v6M12 7.5v.5"/>'),
    settings: icon('<circle cx="12" cy="12" r="3"/><path d="M12 2v3M12 19v3M2 12h3M19 12h3M5 5l2 2M17 17l2 2M19 5l-2 2M7 17l-2 2"/>'),
    menu: icon('<path d="M4 7h16M4 12h16M4 17h16"/>')
  };

  var NAV = [
    { label: 'Start', items: [['today', 'Today'], ['plan', 'My plan'], ['study', 'How to study']] },
    { label: 'Learn', items: [['exam', 'Know the exam'], ['quant', 'Quant'], ['verbal', 'Verbal'], ['di', 'Data Insights'], ['strategy', 'Timing and strategy']] },
    { label: 'Practice', items: [['practice', 'Practice questions'], ['errors', 'Error log'], ['mocks', 'Mock exams']] },
    { label: 'Test day', items: [['testday', 'Final week and test day']] },
    { label: 'Reference', items: [['resources', 'Resources'], ['sources', 'Sources'], ['settings', 'Settings']] }
  ];
  var TABS = [['today', 'Today'], ['plan', 'Plan'], ['practice', 'Practice'], ['errors', 'Error log']];

  var main = document.getElementById('main');
  var sidebar = document.getElementById('sidebar');
  var scrim = document.getElementById('scrim');
  var menuBtn = document.getElementById('menuBtn');
  var current = '';

  function applyTheme() {
    var t = G.store.get().theme;
    if (t === 'light' || t === 'dark') document.documentElement.setAttribute('data-theme', t);
    else document.documentElement.removeAttribute('data-theme');
  }

  function refreshNav() {
    var S = G.store.get(), due = G.tools.dueCount();
    var onboarded = S.profile.onboarded;
    document.getElementById('navList').innerHTML = NAV.map(function (g) {
      return '<div class="nav-group"><div class="nav-label">' + g.label + '</div>' + g.items.map(function (it) {
        return '<a class="nav-link" href="#/' + it[0] + '"' + (current === it[0] ? ' aria-current="page"' : '') + '>' + I[it[0]] + '<span>' + it[1] + '</span>' +
          (it[0] === 'errors' && due ? '<span class="nav-badge" title="Due for a redo">' + due + '</span>' : '') + '</a>';
      }).join('') + '</div>';
    }).join('');

    document.getElementById('tabbar').innerHTML = TABS.map(function (t) {
      return '<a class="tab" href="#/' + t[0] + '"' + (current === t[0] ? ' aria-current="page"' : '') + '>' + I[t[0]] + '<span>' + t[1] + '</span></a>';
    }).join('') + '<button class="tab" type="button" id="tabMenu">' + I.menu + '<span>More</span></button>';
    document.getElementById('tabMenu').addEventListener('click', openMenu);

    var days = '';
    if (onboarded && S.profile.testDate) {
      var d = U.daysBetween(U.today(), S.profile.testDate);
      days = d > 0 ? d + ' day' + (d === 1 ? '' : 's') + ' to test day' : d === 0 ? 'Test day' : '';
    }
    document.getElementById('topbarCount').textContent = days;
    document.getElementById('sidebarFoot').innerHTML = (days ? '<strong>' + days + '</strong><br>' : '') + 'Saved on this device only';
  }

  function openMenu() {
    sidebar.classList.add('open'); scrim.hidden = false; menuBtn.setAttribute('aria-expanded', 'true');
    var first = sidebar.querySelector('.nav-link'); if (first) first.focus();
  }
  function closeMenu() {
    sidebar.classList.remove('open'); scrim.hidden = true; menuBtn.setAttribute('aria-expanded', 'false');
  }

  var TITLES = {
    welcome: 'Welcome', today: 'Today', plan: 'My plan', study: 'How to study', exam: 'Know the exam', quant: 'Quant', verbal: 'Verbal',
    di: 'Data Insights', strategy: 'Timing and strategy', practice: 'Practice', errors: 'Error log', mocks: 'Mock exams',
    testday: 'Final week and test day', resources: 'Resources', sources: 'Sources', settings: 'Settings'
  };

  function route() {
    var parts = (location.hash || '').replace(/^#\/?/, '').split('/').filter(Boolean);
    var page = parts[0] || 'today', arg = parts[1];
    var S = G.store.get();

    // First visit: meet the coach before anything else. Reference pages stay reachable.
    var open = ['welcome', 'exam', 'resources', 'sources', 'study', 'quant', 'verbal', 'di', 'strategy', 'testday'];
    if (!S.profile.onboarded && open.indexOf(page) === -1) { page = 'welcome'; arg = null; }
    if (!TITLES[page]) page = 'today';

    G.quiz.stop();
    G.tools.stopTimer();
    closeMenu();
    current = page;
    document.body.classList.toggle('onboarding', page === 'welcome');

    if (page === 'welcome') V.welcome(main);
    else if (page === 'quant' || page === 'verbal' || page === 'di') V.lessons(main, page, arg);
    else if (page === 'practice') { if (arg === 'run') G.quiz.run(main); else G.quiz.home(main); }
    else if (page === 'errors') G.tools.errors(main);
    else if (page === 'mocks') G.tools.mocks(main);
    else V[page](main);

    document.title = TITLES[page] + ' · GMAT Coach';
    refreshNav();
    window.scrollTo(0, 0);
    main.focus({ preventScroll: true });
  }

  menuBtn.innerHTML = I.menu;
  menuBtn.addEventListener('click', function () { if (sidebar.classList.contains('open')) closeMenu(); else openMenu(); });
  scrim.addEventListener('click', closeMenu);
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') closeMenu(); });
  window.addEventListener('hashchange', route);

  G.app = { refreshNav: refreshNav, applyTheme: applyTheme };
  applyTheme();
  route();
})();
