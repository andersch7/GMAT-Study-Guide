/* Page views. Each view is a function (root, arg) that fills `root` and wires
   up its own events. Content comes from the files in /data. */
(function () {
  'use strict';
  var G = window.GMAT, U = G.util, esc = U.esc;
  var V = G.views = {};

  function coach(html, label) { return '<div class="coach"><div class="coach-label">' + (label || 'Coach\'s note') + '</div>' + html + '</div>'; }
  function head(eyebrow, title, lede) {
    return '<div class="page-head"><div class="eyebrow">' + eyebrow + '</div><h1>' + title + '</h1>' + (lede ? '<p class="lede">' + lede + '</p>' : '') + '</div>';
  }
  function src(key) {
    var s = G.data.exam.sources[key];
    return s ? '<span class="src">Source: ' + U.ext(s.url, esc(s.org)) + '</span>' : '';
  }
  function plan() { return G.plan.build(G.store.get().profile); }

  function taskItem(t, done) {
    var internal = t.route && t.route.charAt(0) === '#';
    return '<li class="task' + (done ? ' done' : '') + '"><input type="checkbox" id="t-' + esc(t.id) + '" data-task="' + esc(t.id) + '"' + (done ? ' checked' : '') + '>' +
      '<div class="task-body"><label class="task-title" for="t-' + esc(t.id) + '">' + esc(t.title) + '</label>' +
      '<p class="task-detail">' + esc(t.detail) + '</p>' +
      '<div class="task-meta">' + (t.section ? U.tag(t.section) : '') + (t.hours ? '<span>' + U.hours(t.hours) + '</span>' : '') +
      (internal ? '<a href="' + esc(t.route) + '">Open</a>' : '') + '</div></div></li>';
  }
  function bindTasks(root, onChange) {
    Array.prototype.forEach.call(root.querySelectorAll('[data-task]'), function (cb) {
      cb.addEventListener('change', function () {
        G.store.toggle('done', cb.getAttribute('data-task'), cb.checked);
        cb.closest('.task').classList.toggle('done', cb.checked);
        if (onChange) onChange(cb);
      });
    });
  }

  /* ============================ Welcome / onboarding ============================ */
  var wiz = { step: 0, draft: null };

  V.welcome = function (root) {
    var S = G.store.get();
    if (!wiz.draft) {
      var p = S.profile;
      wiz.draft = {
        name: p.name || '', testDate: p.testDate || U.addDays(U.today(), 30), target: p.target || 675, hours: p.hours || 10,
        baseline: p.baseline || '', newbie: p.newbie, rustyMath: p.rustyMath, nonNative: p.nonNative
      };
      wiz.step = 0;
    }
    var d = wiz.draft, step = wiz.step, html = '<div class="page"><div class="wizard">';
    html += '<div class="wizard-steps" aria-hidden="true">' + [0, 1, 2, 3].map(function (i) { return '<i class="' + (i <= step ? 'on' : '') + '"></i>'; }).join('') + '</div>';

    if (step === 0) {
      html += '<div class="eyebrow">Welcome</div><h1>Let\'s get you ready for the GMAT.</h1>' +
        '<p class="lede">I\'m your coach for the next few weeks. This guide gives you what I would give a private student: a plan built around your test date, a method for every question type, and an honest read on where you stand.</p>' +
        '<div class="card"><p><strong>Here is how we will work:</strong></p><ol class="steps">' +
        '<li><strong>Measure.</strong> You take a free official practice exam, so we know your starting point.</li>' +
        '<li><strong>Learn.</strong> Short lessons teach the method for each question type, with drills.</li>' +
        '<li><strong>Practise and review.</strong> You work official questions and log every miss.</li>' +
        '<li><strong>Rehearse.</strong> Practice exams under test conditions, then a calm final week.</li></ol></div>' +
        '<p>First, three quick questions so I can build your plan. It takes about a minute, and you can change every answer later.</p>' +
        '<div class="field"><label for="wName">What should I call you? <span class="hint" style="display:inline">(optional)</span></label><input type="text" id="wName" value="' + esc(d.name) + '" autocomplete="given-name" maxlength="40"></div>' +
        '<div class="btn-row"><button class="btn btn-primary" id="wNext">Build my plan</button></div>';
    } else if (step === 1) {
      html += '<div class="eyebrow">Question 1 of 3</div><h1>When is your test?</h1>' +
        '<p class="lede">If you have not booked yet, enter your best estimate. A date gives the plan its shape.</p>' +
        '<div class="field"><label for="wDate">Test date</label><input type="date" id="wDate" value="' + esc(d.testDate) + '" min="' + U.addDays(U.today(), 1) + '"><div class="field-error" id="wErr" role="alert"></div></div>' +
        '<div class="btn-row" style="margin-bottom:18px">' + [[4, '4 weeks'], [8, '8 weeks'], [12, '12 weeks'], [16, '16 weeks']].map(function (w) {
          return '<button class="btn btn-sm" type="button" data-weeks="' + w[0] + '">' + w[1] + ' from today</button>';
        }).join('') + '</div>' +
        coach('<p>Most people need two to three months of steady work. A shorter runway can still work, but it needs more hours each week and sharper priorities. Whatever you enter, I will tell you plainly whether the hours add up.</p>') +
        '<div class="btn-row"><button class="btn" id="wBack">Back</button><button class="btn btn-primary" id="wNext">Next</button></div>';
    } else if (step === 2) {
      var opts = [[605, 'about 70th percentile'], [645, 'about 86th · the old 700'], [655, 'about 90th'], [675, 'about 94th'], [695, 'about 97th'], [705, 'about 98th']];
      html += '<div class="eyebrow">Question 2 of 3</div><h1>What score are you aiming for?</h1>' +
        '<p class="lede">Scores run from 205 to 805. Pick the closest; you can refine it once you have looked up your programmes.</p>' +
        '<div class="choice-grid" role="radiogroup" aria-label="Target score">' + opts.map(function (o) {
          return '<label class="choice"><input type="radio" name="wTarget" value="' + o[0] + '"' + (+d.target === o[0] ? ' checked' : '') + '><span>' + o[0] + (o[0] === 705 ? '+' : '') + '<small>' + o[1] + '</small></span></label>';
        }).join('') + '</div>' +
        '<div class="field" style="margin-top:16px"><label for="wCustom">Or enter an exact target</label><input type="number" id="wCustom" min="205" max="805" step="10" inputmode="numeric" placeholder="e.g. 665" value="' + (opts.some(function (o) { return o[0] === +d.target; }) ? '' : esc(d.target)) + '"><div class="field-error" id="wErr" role="alert"></div></div>' +
        coach('<p>The right target is not a round number. It is the median score at the programmes you want, plus a small margin. Look up each school\'s class profile, note the median and the middle-80% range, and aim at or above the median. The "Know the exam" page has examples.</p>') +
        '<div class="btn-row"><button class="btn" id="wBack">Back</button><button class="btn btn-primary" id="wNext">Next</button></div>';
    } else {
      html += '<div class="eyebrow">Question 3 of 3</div><h1>How much time can you give it?</h1>' +
        '<p class="lede">Be realistic. A plan you can keep beats an ambitious one you abandon in week two.</p>' +
        '<div class="form-grid"><div class="field"><label for="wHours">Study hours per week</label><input type="number" id="wHours" min="2" max="60" value="' + esc(d.hours) + '" inputmode="numeric"><div class="hint">Count only focused study time</div></div>' +
        '<div class="field"><label for="wBase">Practice-exam score, if you have one</label><input type="number" id="wBase" min="205" max="805" step="10" value="' + esc(d.baseline) + '" inputmode="numeric" placeholder="Leave empty if none"><div class="hint">Official practice exam total, 205–805</div></div></div>' +
        '<div class="field-error" id="wErr" role="alert" style="margin-bottom:10px"></div>' +
        '<p style="font-weight:600;margin-bottom:8px">Which of these apply to you?</p><ul class="checklist">' +
        [['newbie', 'I am new to the GMAT and have not taken a practice exam'], ['rustyMath', 'My maths is rusty'], ['nonNative', 'English is not my first language']].map(function (f) {
          return '<li><input type="checkbox" id="w-' + f[0] + '"' + (d[f[0]] ? ' checked' : '') + '><label for="w-' + f[0] + '">' + f[1] + '</label></li>';
        }).join('') + '</ul>' +
        '<div class="btn-row"><button class="btn" id="wBack">Back</button><button class="btn btn-primary" id="wNext">Create my plan</button></div>';
    }
    html += '</div></div>';
    root.innerHTML = html;

    function err(msg) { var e = root.querySelector('#wErr'); if (e) e.textContent = msg; }
    var back = root.querySelector('#wBack');
    if (back) back.addEventListener('click', function () { wiz.step--; V.welcome(root); window.scrollTo(0, 0); });
    Array.prototype.forEach.call(root.querySelectorAll('[data-weeks]'), function (b) {
      b.addEventListener('click', function () { root.querySelector('#wDate').value = U.addDays(U.today(), 7 * +b.getAttribute('data-weeks')); err(''); });
    });
    var custom = root.querySelector('#wCustom');
    if (custom) {
      custom.addEventListener('input', function () {
        if (custom.value) Array.prototype.forEach.call(root.querySelectorAll('[name="wTarget"]'), function (r) { r.checked = false; });
      });
      Array.prototype.forEach.call(root.querySelectorAll('[name="wTarget"]'), function (r) {
        r.addEventListener('change', function () { custom.value = ''; err(''); });
      });
    }

    root.querySelector('#wNext').addEventListener('click', function () {
      if (step === 0) {
        d.name = root.querySelector('#wName').value.trim();
      } else if (step === 1) {
        var v = root.querySelector('#wDate').value;
        if (!U.parse(v) || U.daysBetween(U.today(), v) < 1) { err('Choose a date after today.'); return; }
        d.testDate = v;
      } else if (step === 2) {
        var picked = root.querySelector('[name="wTarget"]:checked');
        var t = custom.value ? +custom.value : picked ? +picked.value : 0;
        if (custom.value && !U.validTotal(t)) { err('GMAT totals run from 205 to 805 and always end in 5, for example 665.'); return; }
        if (!t) { err('Pick a target, or enter one.'); return; }
        d.target = t;
      } else {
        var h = +root.querySelector('#wHours').value, b = root.querySelector('#wBase').value;
        if (!(h >= 2 && h <= 60)) { err('Enter between 2 and 60 hours per week.'); return; }
        if (b && !U.validTotal(+b)) { err('A practice-exam total is between 205 and 805 and ends in 5. Leave the box empty if you do not have one.'); return; }
        d.hours = h; d.baseline = b ? +b : null;
        ['newbie', 'rustyMath', 'nonNative'].forEach(function (f) { d[f] = root.querySelector('#w-' + f).checked; });
        G.store.update(function (s) {
          var p = s.profile;
          p.name = d.name; p.testDate = d.testDate; p.target = d.target; p.hours = d.hours; p.baseline = d.baseline;
          p.newbie = d.newbie; p.rustyMath = d.rustyMath; p.nonNative = d.nonNative;
          if (!p.startDate) p.startDate = U.today();
          p.onboarded = true;
        });
        wiz.draft = null; wiz.step = 0;
        G.app.refreshNav();
        location.hash = '#/plan';
        return;
      }
      wiz.step++; V.welcome(root); window.scrollTo(0, 0);
    });
    var first = root.querySelector('h1');
    if (first && step > 0) { first.setAttribute('tabindex', '-1'); first.focus({ preventScroll: true }); }
  };

  /* ============================ Today ============================ */
  function verdictHtml(pl, P) {
    var v = pl.verdict, weeks = Math.max(1, Math.round(pl.days / 7));
    var basis = v.basedOnBaseline
      ? 'Closing the gap from ' + P.baseline + ' to ' + P.target + ' typically takes somewhere around <strong>' + v.needed + ' hours</strong> of focused study.'
      : 'For a target of ' + P.target + ', most people starting from scratch need somewhere around <strong>' + v.needed + ' hours</strong> of focused study. I will sharpen this estimate once you record your diagnostic.';
    var have = 'You have about <strong>' + v.available + ' hours</strong> (' + pl.hoursPerWeek + ' a week for ' + weeks + ' week' + (weeks === 1 ? '' : 's') + ').';
    if (v.level === 'good') {
      return '<div class="callout good"><div class="coach-label">Coach\'s read: the hours add up</div><p>' + have + ' ' + basis + '</p><p>That is enough, as long as the hours are real and you spend at least as much time reviewing as practising. Follow the plan in order and do not skip the review tasks.</p></div>';
    }
    if (v.level === 'tight') {
      return '<div class="callout warn"><div class="coach-label">Coach\'s read: tight but workable</div><p>' + have + ' ' + basis + '</p><p>You can make this work if you are disciplined. Protect every session, follow the plan in order, and consider adding a couple of hours a week: about <strong>' + v.hoursPerWeekNeeded + ' hours a week</strong> would cover the full estimate.</p></div>';
    }
    return '<div class="callout warn"><div class="coach-label">Coach\'s read: an honest word about this timeline</div>' +
      '<p>' + have + ' ' + basis + '</p>' +
      '<p>I would rather tell you now than after test day: on these numbers, the plan is a stretch. That does not mean you cannot do it. People differ a great deal, and your diagnostic may show you are closer than you think. But you should choose with open eyes. You have three levers:</p>' +
      '<ol><li><strong>More hours.</strong> About <strong>' + v.hoursPerWeekNeeded + ' hours a week</strong> would cover the estimate by your current date.</li>' +
      '<li><strong>A later date.</strong> At ' + pl.hoursPerWeek + ' hours a week, the estimate takes about <strong>' + v.weeksAtCurrentPace + ' weeks</strong>. Rescheduling costs a fee, lowest when done more than 60 days ahead.</li>' +
      '<li><strong>Two attempts.</strong> Keep the date, treat it as a first sitting, and plan a second one. You must wait 16 days between attempts, and score reports now show a Superscore that combines your best sections.</li></ol>' +
      '<p>Whichever you choose, start with the diagnostic this week. It replaces my estimate with your real number. <a href="#/settings">Change your date or hours</a></p></div>';
  }

  V.today = function (root) {
    var S = G.store.get(), P = S.profile;
    var pl = plan();
    if (!pl) {
      root.innerHTML = '<div class="page">' + head('Today', 'Your test date has passed or is not set') +
        '<p>Set a new test date and I will rebuild your plan.</p><a class="btn btn-primary" href="#/settings">Update my plan</a></div>';
      return;
    }
    var today = U.today(), daysLeft = U.daysBetween(today, pl.test);
    var cw = G.plan.currentWeek(pl), prog = G.plan.progress(pl, S.done);
    var week = pl.weeks[U.clamp(cw, 0, pl.weeks.length - 1)];
    var next = G.plan.nextTask(pl, S.done);
    var mocks = S.mocks.slice().sort(function (a, b) { return a.date < b.date ? -1 : 1; });
    var latest = mocks[mocks.length - 1];
    var due = G.tools.dueCount();
    var hour = new Date().getHours();
    var hello = (hour < 12 ? 'Good morning' : hour < 18 ? 'Good afternoon' : 'Good evening') + (P.name ? ', ' + esc(P.name) : '');

    var html = '<div class="page">' + head(U.fmtDate(today, true), hello + '.',
      daysLeft < 0 ? 'Your test date has passed. How did it go?' :
      daysLeft === 0 ? 'Today is the day. You have done the work.' :
      'Week ' + week.no + ' of ' + pl.weeks.length + ' · ' + G.data.plans.phases[week.phase].name);

    html += '<div class="grid grid-3 stats" style="margin-bottom:22px">' +
      '<div class="stat"><div class="stat-label">Test day</div><div class="stat-value">' + (daysLeft >= 0 ? daysLeft : 0) + '<span class="muted" style="font-size:1rem"> day' + (daysLeft === 1 ? '' : 's') + '</span></div><div class="stat-sub">' + U.fmtDate(pl.test, true) + '</div></div>' +
      '<div class="stat"><div class="stat-label">Plan progress</div><div class="stat-value">' + U.pct(prog.complete, prog.total) + '%</div><div class="bar" style="margin-top:8px"><i style="width:' + U.pct(prog.complete, prog.total) + '%"></i></div><div class="stat-sub" style="margin-top:6px">' + prog.complete + ' of ' + prog.total + ' tasks</div></div>' +
      '<div class="stat"><div class="stat-label">' + (latest ? 'Latest practice exam' : 'Target score') + '</div><div class="stat-value">' + (latest ? latest.total : P.target) + '</div><div class="stat-sub">' +
      (latest ? (P.target - latest.total > 0 ? (P.target - latest.total) + ' points below your target of ' + P.target : 'At or above your target of ' + P.target) : 'No practice exam recorded yet') + '</div></div></div>';

    // Coach's message, chosen by what matters most right now
    var msg;
    if (daysLeft < 0) msg = '<p>Record your result in the <a href="#/mocks">mock tracker</a> if you like, and read <a href="#/testday">what to do after the test</a>. If you are retaking, set a new date in <a href="#/settings">Settings</a> and I will rebuild the plan.</p>';
    else if (daysLeft <= 1) msg = '<p>No more studying. Run the <a href="#/testday">test-day checklist</a>, eat properly, and sleep. Tomorrow, take it one question at a time, and enter an answer for every question.</p>';
    else if (!mocks.length) msg = '<p>Your first job is the diagnostic: <strong>Official Practice Exam 1</strong>, free on mba.com. Take it before you study anything, in one sitting. The score does not matter yet. What matters is finding out where your hours will count most.</p>';
    else if (due > 0) msg = '<p>You have <strong>' + due + ' error-log question' + (due === 1 ? '' : 's') + ' due</strong> for a redo. Start today\'s session there, before anything new: reworking a question you missed is the highest-value ten minutes you can spend.</p>';
    else if (week.phase === 'learn') msg = '<p>You are in the learning phase. Work untimed and aim for accuracy. If a topic is not clicking, slow down and re-read the method rather than doing more questions.</p>';
    else if (week.phase === 'final') msg = '<p>Final week. One last practice exam early on, then light review only. The goal now is to arrive rested. Nothing you could cram is worth more than a clear head.</p>';
    else msg = '<p>You are in timed practice now. Train the decision as much as the maths: when a question passes about two and a half minutes without progress, guess and move on.</p>';
    html += coach(msg, 'From your coach');

    if (next && daysLeft >= 0) {
      var t = next.task;
      html += '<div class="card" style="border-color:var(--accent)"><div class="eyebrow">Your next step</div><div class="card-title" style="font-size:1.25rem">' + esc(t.title) + '</div>' +
        '<p class="muted">' + esc(t.detail) + '</p><div class="btn-row">' +
        (t.route ? '<a class="btn btn-primary" href="' + esc(t.route) + '">Start</a>' : '') +
        '<button class="btn" id="doneNext" data-id="' + esc(t.id) + '">Mark as done</button>' +
        '<span class="muted small">' + (t.section ? U.sectionName[t.section] + ' · ' : '') + (t.hours ? U.hours(t.hours) : '') + (next.week.no !== week.no ? ' · from week ' + next.week.no : '') + '</span></div></div>';
    } else if (!next) {
      html += '<div class="callout good"><p><strong>Every task in your plan is ticked.</strong> Keep redoing error-log questions and stay rested.</p></div>';
    }

    var wkDone = week.tasks.filter(function (x) { return S.done[x.id]; }).length;
    html += '<div class="split"><h2 style="margin:18px 0 8px">This week</h2><span class="muted small">' + U.fmtShort(week.start) + ' – ' + U.fmtShort(week.end) + ' · ' + wkDone + ' of ' + week.tasks.length + ' done</span></div>' +
      '<div class="card"><ul class="tasks">' + week.tasks.map(function (x) { return taskItem(x, S.done[x.id]); }).join('') + '</ul></div>' +
      '<p><a href="#/plan">See the whole plan</a></p>';

    html += '<h2>Progress by section</h2><div class="card">' + ['Q', 'V', 'DI'].map(function (s) {
      var b = prog.bySection[s], les = G.data.lessons[{ Q: 'quant', V: 'verbal', DI: 'di' }[s]];
      var read = les.lessons.filter(function (l) { return S.read[les.key + '/' + l.id]; }).length;
      return '<div class="bar-row" style="grid-template-columns:minmax(110px,150px) 1fr minmax(90px,auto)"><span>' + U.tag(s) + '</span><div class="bar"><i style="width:' + U.pct(read, les.lessons.length) + '%"></i></div><span class="small muted">' + read + ' of ' + les.lessons.length + ' lessons</span></div>';
    }).join('') + '</div>';

    html += '<div class="grid grid-3">' +
      '<a class="link-card" href="#/practice"><strong>Practice questions</strong><span>Try a method straight after its lesson</span></a>' +
      '<a class="link-card" href="#/errors"><strong>Error log</strong><span>' + (due ? due + ' due for a redo' : 'Log misses and lucky guesses') + '</span></a>' +
      '<a class="link-card" href="#/strategy"><strong>Pacing timer</strong><span>For timed sets from any question bank</span></a></div></div>';

    root.innerHTML = html;
    bindTasks(root, function (cb) { var id = cb.id; V.today(root); var el = document.getElementById(id); if (el) el.focus(); G.app.refreshNav(); });
    var dn = root.querySelector('#doneNext');
    if (dn) dn.addEventListener('click', function () { G.store.toggle('done', dn.getAttribute('data-id'), true); U.toast('Done. On to the next one.'); V.today(root); G.app.refreshNav(); });
  };

  /* ============================ Plan ============================ */
  V.plan = function (root) {
    var S = G.store.get(), P = S.profile, pl = plan();
    if (!pl) {
      root.innerHTML = '<div class="page">' + head('Start', 'My plan') + '<p>Your test date has passed or is not set. Set a date and I will build the plan.</p><a class="btn btn-primary" href="#/settings">Set my test date</a></div>';
      return;
    }
    var cw = G.plan.currentWeek(pl), prog = G.plan.progress(pl, S.done);
    var html = '<div class="page">' + head('Start', 'My plan',
      pl.weeks.length + ' week' + (pl.weeks.length === 1 ? '' : 's') + ' to ' + U.fmtDate(pl.test, true) + ', at ' + pl.hoursPerWeek + ' hours a week, aiming for ' + P.target + '.');

    html += verdictHtml(pl, P);

    html += '<div class="card"><div class="split"><div><strong id="planProg">' + prog.complete + ' of ' + prog.total + ' tasks done</strong><div class="muted small">' + pl.totalHours + ' study hours in total · ' + pl.mockCount + ' practice exam' + (pl.mockCount === 1 ? '' : 's') + '</div></div>' +
      '<a class="btn btn-sm" href="#/settings">Change date, hours or target</a></div>' +
      '<div class="bar" style="margin-top:12px"><i id="planBar" style="width:' + U.pct(prog.complete, prog.total) + '%"></i></div></div>';

    if (pl.extraWeeks) html += '<div class="callout info"><p>Your test is more than 26 weeks away. The plan below covers the final 26 weeks, starting ' + U.fmtDate(pl.start) + '. Until then, read for 20 minutes a day, rebuild any rusty maths with Khan Academy, and take the diagnostic so you know your starting point.</p></div>';
    if (pl.compressed) html += '<div class="callout info"><p><strong>This is a compressed plan.</strong> There is not enough time to study every topic in depth, so each lesson gets a short slot and "' + pl.dropped.map(function (u) { return esc(u.title); }).join('", "') + '" is left out. After your diagnostic, shift time from the topics you already handle to the ones you do not.</p></div>';
    if (P.rustyMath) html += '<div class="callout info"><p><strong>Because your maths is rusty:</strong> give the first Quant topic (fractions, percents, ratios) extra time, and use Khan Academy for any basics that feel shaky. Everything later builds on it.</p></div>';
    if (P.nonNative) html += '<div class="callout info"><p><strong>Because English is not your first language:</strong> add 20 minutes of dense English reading every day on top of the plan. See "Building your Verbal skill" in the <a href="#/verbal/habits">Verbal lessons</a>.</p></div>';

    var lastPhase = null;
    pl.weeks.forEach(function (w, i) {
      if (w.phase !== lastPhase) {
        var ph = G.data.plans.phases[w.phase];
        html += '<div class="phase-head"><h2>' + ph.name + '</h2></div><p class="muted" style="margin-top:-4px">' + ph.blurb + '</p>';
        if (w.phase === 'learn' && pl.howTo) html += '<p class="muted" style="margin-top:-8px"><strong>For each lesson:</strong> ' + esc(pl.howTo.replace(/^Short on time: /, '')) + '</p>';
        lastPhase = w.phase;
      }
      var done = w.tasks.filter(function (t) { return S.done[t.id]; }).length;
      var hrs = w.tasks.reduce(function (s, t) { return s + t.hours; }, 0);
      html += '<details class="week' + (i === cw ? ' current' : '') + '"' + (i === cw || (cw < 0 && i === 0) ? ' open' : '') + ' data-week="' + i + '"><summary><span class="week-title">Week ' + w.no + '</span>' +
        '<span class="muted small">' + U.fmtShort(w.start) + ' – ' + U.fmtShort(w.end) + '</span>' + (i === cw ? '<span class="tag plain">This week</span>' : '') +
        '<span class="week-meta"><span data-count>' + done + '</span> / ' + w.tasks.length + ' · ' + U.hours(hrs) + '</span></summary>' +
        '<div class="week-body"><ul class="tasks">' + w.tasks.map(function (t) { return taskItem(t, S.done[t.id]); }).join('') + '</ul></div></details>';
    });

    html += '<h2>How to use this plan</h2><ul>' +
      '<li>Work through each week\'s tasks in order. Practice exams come first in their week on purpose.</li>' +
      '<li>If you fall behind, do not skip the review and error-log tasks to catch up. Skip new material instead.</li>' +
      '<li>After each practice exam, let the result steer you: spend the "weakest topics" time on what the exam exposed.</li>' +
      '<li>Take one full day off every week.</li></ul>' +
      '<p>Read <a href="#/study">How to study</a> before you start: it explains why the plan is built this way.</p></div>';

    root.innerHTML = html;
    bindTasks(root, function (cb) {
      var d = G.store.get().done, pr = G.plan.progress(pl, d);
      root.querySelector('#planProg').textContent = pr.complete + ' of ' + pr.total + ' tasks done';
      root.querySelector('#planBar').style.width = U.pct(pr.complete, pr.total) + '%';
      var det = cb.closest('details');
      var w = pl.weeks[+det.getAttribute('data-week')];
      det.querySelector('[data-count]').textContent = w.tasks.filter(function (t) { return d[t.id]; }).length;
    });
  };

  /* ============================ How to study ============================ */
  V.study = function (root) {
    root.innerHTML = '<div class="page">' + head('Start', 'How to study', 'The habits that separate people who improve from people who just put in hours.') +
      '<div class="prose">' + G.data.guides.study + '</div>' +
      '<div class="pager"><a class="btn" href="#/plan">My plan</a><a class="btn btn-primary" href="#/exam">Next: Know the exam</a></div></div>';
  };

  /* ============================ Know the exam ============================ */
  V.exam = function (root) {
    var E = G.data.exam;
    var html = '<div class="page">' + head('Learn', 'Know the exam', 'The GMAT measures how well you reason with numbers, words and data under time pressure. Here is exactly what you will face.');

    html += '<div class="grid grid-3" style="margin-bottom:22px">' +
      '<div class="stat"><div class="stat-label">Length</div><div class="stat-value">2 h 15 min</div><div class="stat-sub">Three 45-minute sections, plus one optional 10-minute break</div></div>' +
      '<div class="stat"><div class="stat-label">Questions</div><div class="stat-value">64</div><div class="stat-sub">21 Quant, 23 Verbal, 20 Data Insights</div></div>' +
      '<div class="stat"><div class="stat-label">Total score</div><div class="stat-value">205–805</div><div class="stat-sub">Each section is scored 60–90 and counts equally</div></div></div>';

    html += coach('<p>The exam was redesigned in late 2023 (it was briefly called the "GMAT Focus Edition"; since mid-2024 it is simply the GMAT). It is shorter than the old test and has no essay, no grammar questions and no geometry. Be careful with older books and videos: ' + esc(E.retired).replace('If a book', 'if a book') + '</p>');

    html += '<h2>The three sections</h2><div class="table-wrap"><table><thead><tr><th>Section</th><th class="num">Questions</th><th class="num">Minutes</th><th class="num">Average per question</th><th>Calculator</th></tr></thead><tbody>' +
      E.sections.map(function (s) {
        return '<tr><td>' + U.tag(s.key) + ' <a href="' + s.route + '">' + esc(s.name) + '</a></td><td class="num">' + s.questions + '</td><td class="num">' + s.minutes + '</td><td class="num">' + s.perQuestion + '</td><td>' + (s.calculator ? 'On-screen' : 'None') + '</td></tr>';
      }).join('') + '</tbody></table></div>';

    E.sections.forEach(function (s) {
      html += '<div class="card"><div class="split"><div class="card-title" style="margin:0">' + esc(s.name) + '</div>' + U.tag(s.key) + '</div>' +
        '<p style="margin-top:8px">' + esc(s.tests) + '</p><ul>' + s.types.map(function (t) { return '<li><strong>' + esc(t.name) + ':</strong> ' + esc(t.what) + '</li>'; }).join('') + '</ul>' +
        '<a href="' + s.route + '">Go to the ' + esc(s.short) + ' lessons</a></div>';
    });
    html += '<p>' + src('structure') + ' · ' + src('content') + '</p>';

    html += '<h2>How the test behaves</h2><div class="grid grid-2">' + E.features.map(function (f) {
      return '<div class="card"><div class="card-title">' + esc(f.title) + '</div><p class="muted" style="margin:0">' + esc(f.text) + '</p></div>';
    }).join('') + '</div><p style="margin-top:14px">' + src('structure') + ' · ' + src('adaptive') + ' · ' + src('scoresHub') + '</p>';

    html += '<h2>Scores and percentiles</h2>' +
      '<p>Your total score (205–805, always ending in 5) is built from the three section scores, which count equally. A percentile tells you the share of test-takers you outscored. Schools read both.</p>' +
      '<div class="table-wrap"><table><thead><tr><th class="num">Total score</th><th>Percentile</th><th>Roughly equal to, on the old 200–800 scale</th></tr></thead><tbody>' +
      E.percentiles.map(function (p) { return '<tr><td class="num"><strong>' + p.score + '</strong></td><td>' + esc(p.pct) + '</td><td>' + (p.old ? esc(p.old) : '') + '</td></tr>'; }).join('') +
      '</tbody></table></div>' +
      '<p class="small muted">Percentiles are rounded from GMAC\'s table published in August 2026 and are updated every year. Check the current figures: ' + U.ext(E.sources.scores.url, 'mba.com score guide') + ' · ' + U.ext(E.sources.concord.url, 'GMAC concordance table (PDF)') + '</p>' +
      coach('<p>Do not compare a score on the current scale with one on the old scale. A 645 today is about as rare as a 700 used to be. When a school, a friend or a forum post quotes a score, check which scale it is on. Section percentiles also differ: a given Quant score sits at a lower percentile than the same Verbal or Data Insights score, because so many test-takers are strong in Quant.</p>');

    html += '<h3>What do schools expect?</h3><p>Look up the class profile for each programme you are considering and note the median (or average) and the middle-80% range. Aim at or above the median. Some examples, as published by the schools:</p>' +
      '<div class="table-wrap"><table><thead><tr><th>Programme</th><th>Published GMAT figure</th><th>Note</th></tr></thead><tbody>' +
      E.schools.map(function (s) { return '<tr><td>' + U.ext(s.url, esc(s.name)) + '</td><td>' + esc(s.figure) + '</td><td class="muted">' + esc(s.note) + '</td></tr>'; }).join('') +
      '</tbody></table></div><p class="small muted">These change every year and some schools still quote old-scale scores. Always confirm on the school\'s own page.</p>';

    html += '<h2>Booking, fees and rules</h2><div class="card">' + E.logistics.map(function (l) {
      return '<div class="res"><div class="res-body"><strong>' + esc(l.title) + '</strong><p>' + esc(l.text) + ' ' + src(l.src) + '</p></div></div>';
    }).join('') + '</div>' +
      '<div class="callout info"><p>Fees and policies change. Before you book or rely on any figure here, confirm it on ' + U.ext(E.sources.register.url, 'the mba.com registration pages') + '.</p></div>';

    html += '<h2>Test centre or online?</h2><div class="table-wrap"><table><thead><tr><th></th><th>Test centre</th><th>Online at home</th></tr></thead><tbody>' +
      E.onlineVsCentre.map(function (r) { return '<tr><td><strong>' + esc(r.aspect) + '</strong></td><td>' + esc(r.centre) + '</td><td>' + esc(r.online) + '</td></tr>'; }).join('') +
      '</tbody></table></div><p>' + src('online') + '</p>' +
      coach('<p>If a test centre is within reasonable reach, I recommend it for a first attempt: fewer things can go wrong, and nothing at home can interrupt you. Whichever you choose, do your practice exams the same way, including the kind of scratch board you will use.</p>') +
      '<div class="pager"><a class="btn" href="#/study">How to study</a><a class="btn btn-primary" href="#/quant">Next: Quant</a></div></div>';
    root.innerHTML = html;
  };

  /* ============================ Lessons ============================ */
  var PRACTICE_HINT = {
    quant: 'Quant: Problem Solving', verbal: 'Critical Reasoning and Reading Comprehension', di: 'Data Sufficiency and the other Data Insights types'
  };
  var NEXT_SECTION = { quant: ['#/verbal', 'Verbal'], verbal: ['#/di', 'Data Insights'], di: ['#/strategy', 'Timing and strategy'] };

  V.lessons = function (root, key, lessonId) {
    var L = G.data.lessons[key], S = G.store.get();
    if (lessonId) {
      var idx = -1;
      L.lessons.forEach(function (l, i) { if (l.id === lessonId) idx = i; });
      if (idx < 0) { location.hash = '#/' + key; return; }
      var les = L.lessons[idx], rid = key + '/' + les.id;
      var prev = L.lessons[idx - 1], next = L.lessons[idx + 1];
      root.innerHTML = '<div class="page"><div class="crumbs"><a href="#/' + key + '">' + esc(L.title) + '</a> / Lesson ' + (idx + 1) + ' of ' + L.lessons.length + '</div>' +
        '<div class="page-head">' + U.tag(L.section) + '<h1 style="margin-top:10px">' + esc(les.title) + '</h1><p class="lede">' + esc(les.sub) + ' · about ' + les.minutes + ' minutes</p></div>' +
        '<div class="prose">' + les.html + '</div>' +
        '<div class="card" style="margin-top:28px"><ul class="checklist" style="margin:0"><li><input type="checkbox" id="readBox"' + (S.read[rid] ? ' checked' : '') + '><label for="readBox"><strong>I have studied this lesson</strong> and tried the examples myself</label></li></ul></div>' +
        '<div class="callout info"><p><strong>Now practise it.</strong> Try the <a href="#/practice">practice questions</a> for ' + PRACTICE_HINT[key] + ', then move to official questions on this topic and log every miss.</p></div>' +
        '<div class="pager">' + (prev ? '<a class="btn" href="#/' + key + '/' + prev.id + '">← ' + esc(prev.title) + '</a>' : '<a class="btn" href="#/' + key + '">← All ' + esc(L.title) + ' lessons</a>') +
        (next ? '<a class="btn btn-primary" href="#/' + key + '/' + next.id + '">Next: ' + esc(next.title) + ' →</a>' : '<a class="btn btn-primary" href="' + NEXT_SECTION[key][0] + '">Next: ' + NEXT_SECTION[key][1] + ' →</a>') + '</div></div>';
      root.querySelector('#readBox').addEventListener('change', function (e) {
        G.store.toggle('read', rid, e.target.checked);
        if (e.target.checked) U.toast('Lesson marked as studied');
      });
      return;
    }
    var read = L.lessons.filter(function (l) { return S.read[key + '/' + l.id]; }).length;
    var sec = G.data.exam.sections.filter(function (s) { return s.key === L.section; })[0];
    root.innerHTML = '<div class="page">' + head('Learn', esc(L.title), esc(L.lede)) + L.intro +
      '<div class="split"><h2 style="margin:10px 0">Lessons</h2><span class="muted small">' + read + ' of ' + L.lessons.length + ' studied</span></div>' +
      '<div class="lesson-list">' + L.lessons.map(function (l, i) {
        var done = S.read[key + '/' + l.id];
        return '<a class="lesson-item' + (done ? ' read' : '') + '" href="#/' + key + '/' + l.id + '"><span class="lesson-num">' + (done ? '✓' : i + 1) + '</span><span><strong>' + esc(l.title) + '</strong><span class="sub">' + esc(l.sub) + '</span></span><span class="mins">' + l.minutes + ' min</span></a>';
      }).join('') + '</div>' +
      '<h2>At a glance</h2><div class="card"><p>' + esc(sec.tests) + '</p><p class="muted" style="margin:0">' + sec.questions + ' questions in ' + sec.minutes + ' minutes: an average of ' + sec.perQuestion + ' each.</p></div>' +
      '<div class="btn-row"><a class="btn btn-primary" href="#/practice">Practise ' + esc(sec.short) + '</a><a class="btn" href="#/resources">Find official questions</a></div></div>';
  };

  /* ============================ Timing and strategy ============================ */
  V.strategy = function (root) {
    var Gd = G.data.guides;
    var html = '<div class="page">' + head('Learn', 'Timing and test strategy') + Gd.strategyTop +
      '<h2>Pacing checkpoints</h2><p>Do not watch the clock on every question. Check it only at these points. The figures leave about two minutes at the end for the review screen.</p>' +
      '<div class="table-wrap"><table><thead><tr><th>Section</th><th>Average pace</th><th colspan="4">Minutes left when you finish question…</th></tr></thead><tbody>' +
      Gd.pacing.map(function (p) {
        return '<tr><td>' + U.tag(p.key) + ' ' + p.questions + ' questions</td><td>' + p.perQ + '</td>' +
          p.points.map(function (pt) { return '<td class="nowrap"><span class="muted">Q' + pt[0] + ':</span> <strong>' + pt[1] + '</strong></td>'; }).join('') + '</tr>';
      }).join('') + '</tbody></table></div>' +
      coach('<p>If you reach a checkpoint more than two minutes behind, do not try to speed up on every question; that produces careless errors. Instead, make one fast educated guess on the next question that looks long, and you are back on pace.</p>') +
      '<div id="timerBox"></div>' +
      '<div class="prose">' + Gd.strategyBody + '</div>' +
      '<div class="pager"><a class="btn" href="#/di">Data Insights</a><a class="btn btn-primary" href="#/mocks">Next: Mock exams</a></div></div>';
    root.innerHTML = html;
    G.tools.timer(root.querySelector('#timerBox'));
  };

  /* ============================ Final week and test day ============================ */
  V.testday = function (root) {
    var Gd = G.data.guides, S = G.store.get();
    function list(key) {
      var c = Gd.checklists[key];
      return '<h3>' + c.title + '</h3><ul class="checklist">' + c.items.map(function (it) {
        return '<li><input type="checkbox" id="c-' + it[0] + '" data-check="' + it[0] + '"' + (S.checks[it[0]] ? ' checked' : '') + '><label for="c-' + it[0] + '">' + esc(it[1]) + '</label></li>';
      }).join('') + '</ul>';
    }
    root.innerHTML = '<div class="page">' + head('Test day', 'Final week and test day') + Gd.testdayTop +
      '<h2>The final week</h2>' + Gd.finalWeek +
      '<h2>Checklists</h2><p class="muted">Your ticks are saved on this device.</p><div class="card">' + list('week') + list('before') + list('day') + list('online') + '</div>' +
      '<div class="prose">' + Gd.anxiety + Gd.afterTest + '</div>' +
      '<p>' + src('online') + ' · ' + src('sending') + ' · ' + src('attempts') + ' · ' + src('superscore') + '</p></div>';
    Array.prototype.forEach.call(root.querySelectorAll('[data-check]'), function (cb) {
      cb.addEventListener('change', function () { G.store.toggle('checks', cb.getAttribute('data-check'), cb.checked); });
    });
  };

  /* ============================ Resources ============================ */
  V.resources = function (root) {
    var R = G.data.resources, label = { free: 'Free', paid: 'Paid', mixed: 'Free + paid' };
    root.innerHTML = '<div class="page">' + head('Reference', 'Resources', 'The material I would point a private student to, and what each is best for.') +
      coach('<p>You need surprisingly little: the free official Starter Kit, a source of official questions, and somewhere to look up explanations. Choose one main course or book series at most. Collecting resources feels like progress and is not.</p>') +
      R.groups.map(function (g) {
        return '<h2>' + esc(g.title) + '</h2><p class="muted">' + esc(g.intro) + '</p><div class="card">' + g.items.map(function (it) {
          return '<div class="res"><div class="res-body">' + U.ext(it.url, esc(it.name)) + '<p>' + esc(it.best) + '</p></div><span class="tag ' + (it.cost === 'free' ? 'free' : it.cost === 'paid' ? 'paid' : 'plain') + '">' + label[it.cost] + '</span></div>';
        }).join('') + '</div>';
      }).join('') +
      '<p class="small muted">Links open in a new tab. This guide is independent and has no connection with any of these organisations. Prices and offers change, so check each site.</p></div>';
  };

  /* ============================ Sources ============================ */
  V.sources = function (root) {
    var E = G.data.exam, R = G.data.resources;
    root.innerHTML = '<div class="page">' + head('Reference', 'Sources', 'Where the facts and advice in this guide come from.') +
      '<div class="callout info"><p><strong>Last checked: ' + U.fmtDate(E.lastChecked) + '.</strong> Exam facts follow GMAC, the organisation that runs the GMAT, through mba.com and gmac.com. Study advice follows what experienced GMAT instructors publish, and notes where they disagree.</p>' +
      '<p>Fees, percentiles and policies change. The figures here were gathered from published summaries of the official pages rather than read directly from every page, so treat exact numbers as a guide and confirm anything you will act on (fees, dates, ID rules, retake limits) on mba.com before you rely on it.</p></div>' +
      '<h2>Exam facts</h2><div class="card">' + Object.keys(E.sources).map(function (k) {
        var s = E.sources[k];
        return '<div class="res"><div class="res-body">' + U.ext(s.url, esc(s.title)) + '<p>' + esc(s.org) + '</p></div></div>';
      }).join('') + '</div>' +
      '<h2>Study advice</h2><div class="card">' + R.adviceSources.map(function (a) {
        return '<div class="res"><div class="res-body"><strong>' + esc(a.claim) + '</strong><p>' + esc(a.who) + ' · ' + U.ext(a.url, 'source') + '</p></div></div>';
      }).join('') + '</div>' +
      '<h2>Where experts disagree</h2><ul>' +
      '<li><strong>How many hours you need.</strong> Estimates run from about 80 to more than 300. This guide uses a middle figure, adjusted to your score gap.</li>' +
      '<li><strong>When to study Data Insights.</strong> Some teach it last because it builds on Quant and Verbal; others start it early because it is under-prepared. This guide introduces Data Sufficiency early and the other types once the basics are in place.</li>' +
      '<li><strong>Section order.</strong> Most coaches say strongest section first; some say avoid leaving Data Insights to the end. This guide asks you to test both in practice exams.</li>' +
      '<li><strong>How many practice exams.</strong> Recommendations range from every one to three weeks. This guide follows the "fewer, reviewed deeply" school.</li></ul>' +
      '<h2>About the practice questions</h2><p>The practice questions and passages in this guide were written for it. They are not official GMAT questions and are not copied from any book or course. GMAT is a registered trademark of the Graduate Management Admission Council (GMAC), which is not affiliated with this guide and does not endorse it.</p></div>';
  };

  /* ============================ Settings ============================ */
  V.settings = function (root) {
    var S = G.store.get(), P = S.profile;
    root.innerHTML = '<div class="page">' + head('Reference', 'Settings') +
      (G.store.ok() ? '' : '<div class="callout bad"><p>Your browser is blocking storage for this page (for example in private browsing), so your progress will be lost when you close the tab.</p></div>') +
      '<div class="card"><div class="card-title">Your plan</div><form id="setForm" novalidate>' +
      '<div class="form-grid"><div class="field"><label for="sName">Name</label><input type="text" id="sName" value="' + esc(P.name) + '" maxlength="40"></div>' +
      '<div class="field"><label for="sTest">Test date</label><input type="date" id="sTest" value="' + esc(P.testDate || '') + '"></div>' +
      '<div class="field"><label for="sStart">Plan start date</label><input type="date" id="sStart" value="' + esc(P.startDate || U.today()) + '"><div class="hint">Change this to restart the plan from a new date</div></div></div>' +
      '<div class="form-grid"><div class="field"><label for="sTarget">Target score</label><input type="number" id="sTarget" min="205" max="805" step="10" value="' + esc(P.target) + '"></div>' +
      '<div class="field"><label for="sHours">Hours per week</label><input type="number" id="sHours" min="2" max="60" value="' + esc(P.hours) + '"></div>' +
      '<div class="field"><label for="sBase">Diagnostic score</label><input type="number" id="sBase" min="205" max="805" step="10" value="' + esc(P.baseline || '') + '" placeholder="None yet"></div></div>' +
      '<ul class="checklist">' + [['rustyMath', 'My maths is rusty'], ['nonNative', 'English is not my first language']].map(function (f) {
        return '<li><input type="checkbox" id="s-' + f[0] + '"' + (P[f[0]] ? ' checked' : '') + '><label for="s-' + f[0] + '">' + f[1] + '</label></li>';
      }).join('') + '</ul>' +
      '<div class="field-error" id="sErr" role="alert" style="margin-bottom:10px"></div>' +
      '<button class="btn btn-primary" type="submit">Save and rebuild plan</button></form></div>' +

      '<div class="card"><div class="card-title">Appearance</div><div class="choice-grid" role="radiogroup" aria-label="Theme">' +
      [['auto', 'Match my device'], ['light', 'Light'], ['dark', 'Dark']].map(function (t) {
        return '<label class="choice"><input type="radio" name="theme" value="' + t[0] + '"' + (S.theme === t[0] ? ' checked' : '') + '><span>' + t[1] + '</span></label>';
      }).join('') + '</div></div>' +

      '<div class="card"><div class="card-title">Your data</div><p class="muted">Everything is stored only in this browser on this device. Nothing is sent anywhere. Download a backup now and then, and use it to move your progress to another device.</p>' +
      '<div class="btn-row"><button class="btn" id="expBtn" type="button">Download backup</button><label class="btn" for="impFile" style="margin:0">Restore from backup</label><input type="file" id="impFile" accept="application/json,.json" class="sr-only">' +
      '<button class="btn btn-danger" id="resetBtn" type="button">Erase everything</button></div></div></div>';

    root.querySelector('#setForm').addEventListener('submit', function (e) {
      e.preventDefault();
      var err = root.querySelector('#sErr');
      var test = root.querySelector('#sTest').value, start = root.querySelector('#sStart').value;
      var target = +root.querySelector('#sTarget').value, hours = +root.querySelector('#sHours').value, base = root.querySelector('#sBase').value;
      if (!U.parse(test) || !U.parse(start)) { err.textContent = 'Enter both a start date and a test date.'; return; }
      if (U.daysBetween(start, test) < 1) { err.textContent = 'The test date must be after the plan start date.'; return; }
      if (!U.validTotal(target)) { err.textContent = 'The target must be between 205 and 805 and end in 5, for example 675.'; return; }
      if (!(hours >= 2 && hours <= 60)) { err.textContent = 'Enter between 2 and 60 hours per week.'; return; }
      if (base && !U.validTotal(+base)) { err.textContent = 'The diagnostic score must be between 205 and 805 and end in 5. Leave it empty if you have none.'; return; }
      G.store.update(function (s) {
        var p = s.profile;
        p.name = root.querySelector('#sName').value.trim(); p.testDate = test; p.startDate = start; p.target = target; p.hours = hours;
        p.baseline = base ? +base : null; p.rustyMath = root.querySelector('#s-rustyMath').checked; p.nonNative = root.querySelector('#s-nonNative').checked;
        p.onboarded = true;
      });
      err.textContent = '';
      U.toast('Saved. Your plan has been rebuilt.');
      G.app.refreshNav();
      location.hash = '#/plan';
    });

    Array.prototype.forEach.call(root.querySelectorAll('[name="theme"]'), function (r) {
      r.addEventListener('change', function () { G.store.update(function (s) { s.theme = r.value; }); G.app.applyTheme(); });
    });

    root.querySelector('#expBtn').addEventListener('click', function () {
      var blob = new Blob([G.store.exportJSON()], { type: 'application/json' });
      var a = document.createElement('a');
      a.href = URL.createObjectURL(blob);
      a.download = 'gmat-coach-backup-' + U.today() + '.json';
      document.body.appendChild(a); a.click(); a.remove();
      setTimeout(function () { URL.revokeObjectURL(a.href); }, 1000);
      U.toast('Backup downloaded');
    });
    root.querySelector('#impFile').addEventListener('change', function (e) {
      var f = e.target.files[0];
      if (!f) return;
      if (!window.confirm('Replace everything on this device with the contents of this backup?')) { e.target.value = ''; return; }
      var reader = new FileReader();
      reader.onload = function () {
        try { G.store.importJSON(String(reader.result)); G.app.applyTheme(); G.app.refreshNav(); U.toast('Backup restored'); location.hash = '#/today'; }
        catch (ex) { U.toast('That file could not be read as a GMAT Coach backup.'); }
      };
      reader.readAsText(f);
    });
    root.querySelector('#resetBtn').addEventListener('click', function () {
      if (!window.confirm('Erase your plan, progress, error log and scores from this device? This cannot be undone.')) return;
      G.store.reset(); G.app.applyTheme(); G.app.refreshNav();
      location.hash = '#/welcome';
    });
  };
})();
