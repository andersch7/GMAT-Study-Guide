/* Study-plan generator.
   Input: the profile (start date, test date, hours per week, target, baseline).
   Output: weeks of tasks plus an honest read on whether the hours add up.
   The plan is rebuilt from the profile every time, so only ticks are stored. */
(function () {
  'use strict';
  var G = window.GMAT, U = G.util;
  var MAX_WEEKS = 26;

  function round25(h) { return Math.max(0.5, Math.round(h * 4) / 4); }

  // Rule-of-thumb study hours. Sources disagree widely (see Sources page), so
  // this is deliberately a middle estimate and is always shown as approximate.
  function hoursNeeded(p) {
    if (p.baseline && p.baseline >= 205) {
      var gap = p.target - p.baseline;
      if (gap <= 0) return 30;
      return U.clamp(Math.round(gap * 1.5 / 10) * 10, 40, 300);
    }
    if (p.target >= 705) return 170;
    if (p.target >= 655) return 130;
    if (p.target >= 605) return 100;
    return 80;
  }

  function mockCount(n, totalHours) {
    var m = n <= 1 ? 1 : n === 2 ? 2 : n <= 4 ? 3 : n <= 7 ? 4 : n <= 11 ? 5 : 6;
    // A mock plus its review costs about 4.5 hours; keep that under half the plan.
    var cap = Math.max(n >= 2 ? 2 : 1, Math.floor(0.5 * totalHours / 4.5));
    return Math.min(m, cap);
  }

  function mockWeeks(n, learn, m) {
    var weeks = [1];
    var k = m - 1;
    if (k <= 0) return weeks;
    var first = Math.min(n, Math.max(2, learn + 1));
    for (var i = 0; i < k; i++) {
      var w = k === 1 ? n : Math.round(first + (n - first) * i / (k - 1));
      if (weeks.indexOf(w) === -1) weeks.push(w);
    }
    return weeks.sort(function (a, b) { return a - b; });
  }

  function mockTasks(idx, isDiagnostic) {
    var info = G.data.plans.mocks[Math.min(idx, G.data.plans.mocks.length - 1)];
    var take = {
      id: 'mock-' + (idx + 1), kind: 'mock', section: null, hours: 2.5, route: '#/mocks',
      title: 'Take ' + info.name + (isDiagnostic ? ' as your diagnostic' : ''),
      detail: (isDiagnostic
        ? 'Before you study anything. One sitting, timed, no pausing, one 10-minute break at most. The score is only a starting point: it tells us where your hours should go. '
        : 'Real conditions: one sitting, your planned section order, the same time of day as your test, no pausing. ') + info.note
    };
    var review = {
      id: 'mock-' + (idx + 1) + '-review', kind: 'review', section: null, hours: isDiagnostic ? 1.5 : 2, route: '#/mocks',
      title: 'Review ' + info.name + ' and log the result',
      detail: 'Go through every miss, every guess and every question that ran long. Add them to your error log, enter the scores in the mock tracker, and write down the two topics that cost you the most.'
    };
    return [take, review];
  }

  function build(profile, todayIso) {
    var P = G.data.plans;
    var today = todayIso || U.today();
    var start = profile.startDate || today;
    var test = profile.testDate;
    if (!test || U.daysBetween(start, test) < 1) return null;

    var days = U.daysBetween(start, test);
    // Weeks are counted back from test day, so the final week is always a full
    // week and the last practice exam lands about a week out. Any odd days at
    // the start are added to week 1.
    var rawWeeks = Math.max(1, Math.round(days / 7));
    var extraWeeks = 0;
    if (rawWeeks > MAX_WEEKS) {
      extraWeeks = rawWeeks - MAX_WEEKS;
      start = U.addDays(test, -MAX_WEEKS * 7);
      days = MAX_WEEKS * 7;
    }
    var n = Math.min(rawWeeks, MAX_WEEKS);
    var firstLen = days - 7 * (n - 1);
    var h = U.clamp(+profile.hours || 10, 2, 60);
    var totalHours = Math.round(h * days / 7);

    // Phase lengths
    var rest = n - 1;
    var learn, timed, mocksPhase;
    if (n >= 7) {
      learn = Math.round(rest * 0.55);
      timed = Math.round(rest * 0.25);
      mocksPhase = rest - learn - timed;
    } else {
      learn = rest === 0 ? 0 : Math.max(1, Math.round(rest * 0.6));
      timed = rest - learn;
      mocksPhase = 0;
    }

    var m = mockCount(n, totalHours);
    var mWeeks = mockWeeks(n, learn, m);

    // Build empty weeks
    var weeks = [];
    for (var i = 0; i < n; i++) {
      var no = i + 1;
      var ws = i === 0 ? start : U.addDays(start, firstLen + 7 * (i - 1));
      var we = no === n ? test : U.addDays(ws, (i === 0 ? firstLen : 7) - 1);
      var phase = no === n ? 'final' : no <= learn ? 'learn' : no <= learn + timed ? 'timed' : 'mocks';
      weeks.push({
        no: no, start: ws, end: we, phase: phase,
        // Week 1 may be longer or shorter than 7 days; the final week tapers.
        budget: n === 1 ? h * days / 7 : i === 0 ? h * firstLen / 7 : no === n ? h * 0.8 : h,
        tasks: []
      });
    }

    // Mock exams go at the start of their week
    var mockIdx = 0;
    weeks.forEach(function (w) {
      if (mWeeks.indexOf(w.no) !== -1) {
        w.tasks = w.tasks.concat(mockTasks(mockIdx, mockIdx === 0));
        mockIdx++;
      }
    });
    function used(w) { return w.tasks.reduce(function (s, t) { return s + t.hours; }, 0); }

    // Learning units
    var learnWeeks = weeks.filter(function (w) { return w.phase === 'learn'; });
    var compressedNote = false, droppedUnits = [], scale = 1, howTo = '';
    if (learnWeeks.length) {
      var budgets = learnWeeks.map(function (w) {
        var redo = w.no > 1 ? Math.min(1, h * 0.1) : 0;
        return Math.max(1, w.budget - used(w) - redo);
      });
      var totalBudget = budgets.reduce(function (a, b) { return a + b; }, 0);
      var units = P.units.slice();
      var base = units.reduce(function (s, u) { return s + u.hours; }, 0);
      scale = totalBudget / base;
      if (scale < 0.6) {
        droppedUnits = units.filter(function (u) { return !u.core; });
        units = units.filter(function (u) { return u.core; });
        base = units.reduce(function (s, u) { return s + u.hours; }, 0);
        scale = totalBudget / base;
        compressedNote = true;
      }
      var shown = Math.min(scale, 2);
      howTo = scale < 0.6 ? P.howTo.compressed : scale < 1.4 ? P.howTo.standard : P.howTo.extended;
      var wi = 0, filled = 0;
      units.forEach(function (u, ui) {
        var uh = u.hours * shown;
        // Move to the next week when this one is full (never past the last learning week).
        while (wi < learnWeeks.length - 1 && filled + uh / 2 > budgets[wi]) { wi++; filled = 0; }
        filled += uh;
        learnWeeks[wi].tasks.push({
          id: u.id, kind: 'unit', section: u.section, hours: round25(uh), route: u.route,
          title: u.title,
          detail: u.detail
        });
      });
      // Fit each week's lessons to that week's hours, so the totals shown are honest.
      learnWeeks.forEach(function (w, idx) {
        var unitTasks = w.tasks.filter(function (t) { return t.kind === 'unit'; });
        var sum = unitTasks.reduce(function (a, t) { return a + t.hours; }, 0);
        if (!sum) return;
        var f = U.clamp(budgets[idx] / sum, 0.6, 1.6);
        unitTasks.forEach(function (t) { t.hours = round25(t.hours * f); });
      });
      learnWeeks.forEach(function (w, idx) {
        if (w.no > 1) {
          w.tasks.push({
            id: 'w' + w.no + '-redo', kind: 'repair', section: null, hours: round25(Math.min(1, h * 0.1)), route: '#/errors',
            title: 'Redo your error-log questions',
            detail: 'Rework every logged question that is due, without looking at the answer first. If you miss it again, it stays in the log.'
          });
        }
        if (scale > 2) {
          var spare = budgets[idx] - w.tasks.filter(function (t) { return t.kind === 'unit'; }).reduce(function (s, t) { return s + t.hours; }, 0);
          if (spare >= 1) {
            w.tasks.push({
              id: 'w' + w.no + '-extra', kind: 'repair', section: null, hours: round25(spare), route: '#/resources',
              title: 'Extra official practice on this week\'s topics',
              detail: 'You have more time than the core plan needs. Spend it on official questions for the topics you studied this week, untimed first, then in timed sets of 10.'
            });
          }
        }
      });
    }

    // Timed-practice and mock-phase weeks
    weeks.forEach(function (w) {
      if (w.phase !== 'timed' && w.phase !== 'mocks') return;
      var free = Math.max(2, w.budget - used(w));
      var isMocks = w.phase === 'mocks' || mWeeks.indexOf(w.no) !== -1;
      var setShare = isMocks ? 0.17 : 0.22;
      var setHours = round25(free * setShare);
      var full = setHours >= 1.25;
      [['Q', 'Quant', 21, 10, 21], ['V', 'Verbal', 23, 12, 23], ['DI', 'Data Insights', 20, 10, 22]].forEach(function (s) {
        w.tasks.push({
          id: 'w' + w.no + '-set-' + s[0].toLowerCase(), kind: 'set', section: s[0], hours: setHours, route: '#/strategy',
          title: 'Timed ' + s[1] + ' set: ' + (full ? s[2] + ' questions in 45 minutes' : s[3] + ' questions in ' + s[4] + ' minutes'),
          detail: 'Mixed official questions on the clock. Practise the decision to guess and move on when a question passes about 3 minutes. Review every question afterwards, including the ones you got right slowly.'
        });
      });
      w.tasks.push({
        id: 'w' + w.no + '-repair', kind: 'repair', section: null, hours: round25(free * (isMocks ? 0.34 : 0.24)), route: '#/errors',
        title: 'Repair your two weakest topics',
        detail: 'Open the error log, find the two topics with the most misses, re-read those lessons and work 15–20 official questions on each, untimed.'
      });
      w.tasks.push({
        id: 'w' + w.no + '-redo', kind: 'repair', section: null, hours: round25(free * (isMocks ? 0.15 : 0.1)), route: '#/errors',
        title: 'Redo your error-log questions',
        detail: 'Rework every logged question that is due. Getting a question right the second time, for the right reason, is where the score moves.'
      });
    });

    // Final week
    var fw = weeks[n - 1];
    if (n === 1) {
      // One-week crash plan: methods only, straight after the diagnostic.
      var crash = Math.max(3, fw.budget - used(fw) - 1);
      [['Q', 'Quant essentials: arithmetic, algebra and word problems', '#/quant'],
       ['V', 'Verbal essentials: the Critical Reasoning and Reading Comprehension methods', '#/verbal'],
       ['DI', 'Data Insights essentials: Data Sufficiency first, then the other four types', '#/di']].forEach(function (s) {
        fw.tasks.push({
          id: 'crash-' + s[0].toLowerCase(), kind: 'unit', section: s[0], hours: round25(crash * 0.3), route: s[2],
          title: s[1],
          detail: 'Read the method lessons for the question types your diagnostic showed as weakest, do the drills, then a short timed set. With one week you are improving execution, not learning the whole syllabus.'
        });
      });
      fw.tasks.push({
        id: 'u-strategy', kind: 'unit', section: null, hours: 0.5, route: '#/strategy',
        title: 'Timing and test strategy',
        detail: 'Pacing checkpoints, when to guess and move on, and your section order. In a one-week plan this is where most of your gain comes from.'
      });
    } else {
      var freeF = Math.max(1.5, fw.budget - used(fw) - 1);
      fw.tasks.push({
        id: 'w' + fw.no + '-light', kind: 'set', section: null, hours: round25(freeF * 0.55), route: '#/strategy',
        title: 'Two short timed sets in your weaker sections',
        detail: 'About 10 questions each, with full review. The goal is to stay sharp and confirm your pacing, not to learn anything new.'
      });
      fw.tasks.push({
        id: 'w' + fw.no + '-notes', kind: 'repair', section: null, hours: round25(freeF * 0.45), route: '#/errors',
        title: 'Re-read your error-log takeaways',
        detail: 'Read the "what I will do differently" notes, redo the handful of questions that still worry you, and write your pacing plan on one card.'
      });
    }
    fw.tasks.push({
      id: 'final-logistics', kind: 'admin', section: null, hours: 0.5, route: '#/testday',
      title: 'Run the test-day checklist',
      detail: 'ID that matches your registration exactly, route or online setup check, what you will eat, and when you will stop studying.'
    });
    fw.tasks.push({
      id: 'final-rest', kind: 'admin', section: null, hours: 0, route: '#/testday',
      title: 'Day before: rest',
      detail: 'No practice exams and no new material. A short look at your notes at most, then an early night.'
    });

    // Reality check
    var needed = hoursNeeded(profile);
    var ratio = totalHours / needed;
    var verdict = {
      level: ratio >= 1 ? 'good' : ratio >= 0.65 ? 'tight' : 'stretch',
      available: totalHours,
      needed: needed,
      ratio: ratio,
      hoursPerWeekNeeded: Math.ceil(needed / (days / 7)),
      weeksAtCurrentPace: Math.ceil(needed / h),
      basedOnBaseline: !!(profile.baseline && profile.baseline >= 205)
    };

    return {
      start: start, test: test, days: days, weeks: weeks, hoursPerWeek: h,
      totalHours: totalHours, mockCount: mWeeks.length, extraWeeks: extraWeeks,
      compressed: compressedNote, dropped: droppedUnits, scale: scale, howTo: howTo, verdict: verdict
    };
  }

  // Index of the week that contains `today` (-1 before the plan starts, weeks.length after the test).
  function currentWeek(plan, todayIso) {
    var today = todayIso || U.today();
    if (U.daysBetween(plan.start, today) < 0) return -1;
    if (U.daysBetween(today, plan.test) < 0) return plan.weeks.length;
    for (var i = 0; i < plan.weeks.length; i++) {
      if (U.daysBetween(today, plan.weeks[i].end) >= 0) return i;
    }
    return plan.weeks.length - 1;
  }

  function progress(plan, done) {
    var total = 0, complete = 0, bySection = { Q: [0, 0], V: [0, 0], DI: [0, 0] };
    plan.weeks.forEach(function (w) {
      w.tasks.forEach(function (t) {
        total++;
        if (done[t.id]) complete++;
        if (t.section && bySection[t.section]) {
          bySection[t.section][1]++;
          if (done[t.id]) bySection[t.section][0]++;
        }
      });
    });
    return { total: total, complete: complete, bySection: bySection };
  }

  // The next thing to do: first unticked task in the current week, then later weeks, then earlier ones.
  function nextTask(plan, done, todayIso) {
    var cw = U.clamp(currentWeek(plan, todayIso), 0, plan.weeks.length - 1);
    var order = [];
    for (var i = cw; i < plan.weeks.length; i++) order.push(i);
    for (var j = 0; j < cw; j++) order.push(j);
    for (var k = 0; k < order.length; k++) {
      var w = plan.weeks[order[k]];
      for (var t = 0; t < w.tasks.length; t++) {
        if (!done[w.tasks[t].id]) return { task: w.tasks[t], week: w };
      }
    }
    return null;
  }

  G.plan = { build: build, currentWeek: currentWeek, progress: progress, nextTask: nextTask, hoursNeeded: hoursNeeded };
})();
