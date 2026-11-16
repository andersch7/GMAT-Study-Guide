/* Tracking tools: error log, mock-exam tracker and pacing timer. */
(function () {
  'use strict';
  var G = window.GMAT, U = G.util, esc = U.esc;

  function typeName(key) {
    var t = G.data.guides.errorTypes.filter(function (x) { return x.key === key; })[0];
    return t ? t.name : key;
  }
  function isDue(e) { return !e.resolved && e.redo && U.daysBetween(e.redo, U.today()) >= 0; }
  function dueCount() { return G.store.get().errors.filter(isDue).length; }

  /* ============================ Error log ============================ */
  var filt = { section: '', type: '', status: 'open' };

  function errors(root) {
    var S = G.store.get(), list = S.errors;
    var open = list.filter(function (e) { return !e.resolved; });
    var due = list.filter(isDue);

    // Tallies for the "where am I losing points" summary
    var byTopic = {}, byType = {};
    open.forEach(function (e) {
      var k = e.topic || 'Other';
      byTopic[k] = (byTopic[k] || 0) + 1;
      byType[e.errorType] = (byType[e.errorType] || 0) + 1;
    });
    function top(obj, n) {
      return Object.keys(obj).map(function (k) { return [k, obj[k]]; }).sort(function (a, b) { return b[1] - a[1]; }).slice(0, n);
    }
    var topTopics = top(byTopic, 5), topTypes = top(byType, 5);
    var maxT = topTopics.length ? topTopics[0][1] : 1;

    var html = '<div class="page"><div class="page-head"><div class="eyebrow">Practice</div><h1>Error log</h1>' +
      '<p class="lede">Every question you miss, guess or take too long on goes here, with the reason and what you will do differently.</p></div>';

    if (!list.length) {
      html += '<div class="coach"><div class="coach-label">Coach\'s note</div><p>This is the most valuable page in the guide, and it starts empty. After every practice session, log each miss <em>and</em> each lucky guess. The two fields that matter are "Why" and "Next time I will". Then come back when a question is due and redo it cold. Students who do this consistently are the ones whose scores move.</p></div>';
    }

    html += '<div class="grid grid-3 stats" style="margin-bottom:22px">' +
      '<div class="stat"><div class="stat-label">Open</div><div class="stat-value">' + open.length + '</div><div class="stat-sub">' + (list.length - open.length) + ' resolved</div></div>' +
      '<div class="stat"><div class="stat-label">Due for a redo</div><div class="stat-value">' + due.length + '</div><div class="stat-sub">' + (due.length ? 'Rework these before anything new' : 'Nothing due today') + '</div></div>' +
      '<div class="stat"><div class="stat-label">Most common cause</div><div class="stat-value" style="font-size:1.3rem;line-height:1.5">' + (topTypes.length ? esc(typeName(topTypes[0][0])) : '–') + '</div>' +
      '<div class="stat-sub">' + (topTypes.length ? topTypes[0][1] + ' of ' + open.length + ' open entries' : 'No entries yet') + '</div></div></div>';

    if (topTopics.length) {
      html += '<div class="card"><div class="card-title">Where you are losing points</div>' +
        topTopics.map(function (t) {
          return '<div class="bar-row" style="grid-template-columns:minmax(120px,220px) 1fr 30px"><span>' + esc(t[0]) + '</span><div class="bar"><i style="width:' + Math.round(100 * t[1] / maxT) + '%"></i></div><span class="num">' + t[1] + '</span></div>';
        }).join('') +
        '<p class="muted small" style="margin-top:10px">Open entries by topic. Your top two are what "Repair your two weakest topics" in the plan refers to.</p></div>';
    }

    // Add form
    html += '<details class="week" id="addBox"' + (list.length ? '' : ' open') + '><summary><span class="week-title">Add an entry</span></summary><div class="week-body" style="padding-top:16px">' +
      '<form id="errForm"><div class="form-grid">' +
      '<div class="field"><label for="eSource">Question or source</label><input type="text" id="eSource" placeholder="e.g. Official Guide #214, Practice Exam 1 Q7" required></div>' +
      '<div class="field"><label for="eSection">Section</label><select id="eSection"><option value="Q">Quant</option><option value="V">Verbal</option><option value="DI">Data Insights</option></select></div>' +
      '<div class="field"><label for="eTopic">Topic</label><select id="eTopic"></select></div>' +
      '<div class="field"><label for="eType">Why did it go wrong?</label><select id="eType">' +
      G.data.guides.errorTypes.map(function (t) { return '<option value="' + t.key + '">' + esc(t.name) + '</option>'; }).join('') + '</select><div class="hint" id="eTypeHint"></div></div>' +
      '</div>' +
      '<div class="field"><label for="eWhat">What happened?</label><textarea id="eWhat" placeholder="e.g. Found x but the question asked for x + y"></textarea></div>' +
      '<div class="field"><label for="eNext">Next time I will…</label><textarea id="eNext" placeholder="e.g. Write what is asked on my board before I start solving"></textarea></div>' +
      '<div class="form-grid"><div class="field"><label for="eRedo">Redo on</label><input type="date" id="eRedo" value="' + U.addDays(U.today(), 3) + '"></div></div>' +
      '<button class="btn btn-primary" type="submit">Save entry</button></form></div></details>';

    // Filters and list
    html += '<h2>Entries</h2><div class="filter-row">' +
      '<div class="field"><label for="fStatus">Show</label><select id="fStatus">' +
      [['open', 'Open'], ['due', 'Due for a redo'], ['resolved', 'Resolved'], ['all', 'All']].map(function (o) { return '<option value="' + o[0] + '"' + (filt.status === o[0] ? ' selected' : '') + '>' + o[1] + '</option>'; }).join('') + '</select></div>' +
      '<div class="field"><label for="fSection">Section</label><select id="fSection"><option value="">All sections</option>' +
      ['Q', 'V', 'DI'].map(function (s) { return '<option value="' + s + '"' + (filt.section === s ? ' selected' : '') + '>' + U.sectionName[s] + '</option>'; }).join('') + '</select></div>' +
      '<div class="field"><label for="fType">Cause</label><select id="fType"><option value="">All causes</option>' +
      G.data.guides.errorTypes.map(function (t) { return '<option value="' + t.key + '"' + (filt.type === t.key ? ' selected' : '') + '>' + esc(t.name) + '</option>'; }).join('') + '</select></div></div>';

    var shown = list.filter(function (e) {
      if (filt.section && e.section !== filt.section) return false;
      if (filt.type && e.errorType !== filt.type) return false;
      if (filt.status === 'open') return !e.resolved;
      if (filt.status === 'due') return isDue(e);
      if (filt.status === 'resolved') return e.resolved;
      return true;
    });

    if (!shown.length) {
      html += '<div class="empty">' + (list.length ? 'No entries match these filters.' : 'No entries yet. Add your first one above, or use "Add to error log" after a practice question.') + '</div>';
    } else {
      html += shown.map(function (e) {
        return '<div class="card" data-entry="' + esc(e.id) + '"><div class="split" style="margin-bottom:8px"><div class="btn-row" style="gap:6px">' +
          U.tag(e.section) + '<span class="tag plain">' + esc(e.topic || 'Other') + '</span><span class="tag plain">' + esc(typeName(e.errorType)) + '</span>' +
          (e.resolved ? '<span class="tag free">Resolved</span>' : isDue(e) ? '<span class="tag paid">Redo due</span>' : '') + '</div>' +
          '<span class="muted small">' + U.fmtDate(e.date) + '</span></div>' +
          '<strong>' + esc(e.source) + '</strong>' +
          (e.what ? '<p style="margin:6px 0 0"><span class="muted">What happened:</span> ' + esc(e.what) + '</p>' : '') +
          (e.next ? '<p style="margin:6px 0 0"><span class="muted">Next time I will:</span> ' + esc(e.next) + '</p>' : '') +
          '<div class="btn-row" style="margin-top:12px">' +
          (e.resolved
            ? '<button class="btn btn-sm" data-act="reopen">Reopen</button>'
            : '<span class="muted small">Redo ' + (e.redo ? U.fmtShort(e.redo) : 'not scheduled') + (e.tries ? ' · missed again ' + e.tries + '×' : '') + '</span>' +
              '<button class="btn btn-sm" data-act="ok">Redone correctly</button><button class="btn btn-sm" data-act="again">Missed again</button>') +
          '<button class="btn btn-sm btn-danger" data-act="del">Delete</button></div></div>';
      }).join('');
    }
    html += '</div>';
    root.innerHTML = html;

    // Topic options follow the section
    var secSel = root.querySelector('#eSection'), topSel = root.querySelector('#eTopic'), typeSel = root.querySelector('#eType');
    function fillTopics() {
      topSel.innerHTML = G.data.guides.topics[secSel.value].map(function (t) { return '<option>' + esc(t) + '</option>'; }).join('') + '<option>Other</option>';
    }
    function typeHint() {
      var t = G.data.guides.errorTypes.filter(function (x) { return x.key === typeSel.value; })[0];
      root.querySelector('#eTypeHint').textContent = t ? t.hint : '';
    }
    secSel.addEventListener('change', fillTopics); fillTopics();
    typeSel.addEventListener('change', typeHint); typeHint();

    root.querySelector('#errForm').addEventListener('submit', function (ev) {
      ev.preventDefault();
      var src = root.querySelector('#eSource').value.trim();
      if (!src) return;
      G.store.update(function (s) {
        s.errors.unshift({
          id: U.uid(), date: U.today(), source: src, section: secSel.value, topic: topSel.value, errorType: typeSel.value,
          what: root.querySelector('#eWhat').value.trim(), next: root.querySelector('#eNext').value.trim(),
          redo: root.querySelector('#eRedo').value || null, resolved: false
        });
      });
      U.toast('Entry saved');
      G.app.refreshNav();
      errors(root);
    });

    [['#fStatus', 'status'], ['#fSection', 'section'], ['#fType', 'type']].forEach(function (f) {
      root.querySelector(f[0]).addEventListener('change', function (ev) { filt[f[1]] = ev.target.value; errors(root); });
    });

    Array.prototype.forEach.call(root.querySelectorAll('[data-entry] [data-act]'), function (btn) {
      btn.addEventListener('click', function () {
        var id = btn.closest('[data-entry]').getAttribute('data-entry'), act = btn.getAttribute('data-act');
        if (act === 'del' && !window.confirm('Delete this entry?')) return;
        G.store.update(function (s) {
          var i = -1;
          s.errors.forEach(function (e, k) { if (e.id === id) i = k; });
          if (i < 0) return;
          var e = s.errors[i];
          if (act === 'del') s.errors.splice(i, 1);
          else if (act === 'ok') e.resolved = true;
          else if (act === 'reopen') { e.resolved = false; e.redo = U.addDays(U.today(), 3); }
          else if (act === 'again') { e.tries = (e.tries || 0) + 1; e.redo = U.addDays(U.today(), 3); }
        });
        U.toast(act === 'ok' ? 'Marked as resolved' : act === 'again' ? 'Rescheduled for 3 days from now' : act === 'del' ? 'Entry deleted' : 'Reopened');
        G.app.refreshNav();
        errors(root);
      });
    });
  }

  /* ============================ Mock exams ============================ */
  function mocks(root) {
    var S = G.store.get(), P = S.profile;
    var list = S.mocks.slice().sort(function (a, b) { return a.date < b.date ? -1 : a.date > b.date ? 1 : 0; });
    var latest = list[list.length - 1];

    var html = '<div class="page"><div class="page-head"><div class="eyebrow">Practice</div><h1>Mock exams</h1>' +
      '<p class="lede">Full practice exams tell you where you stand. What you do in the two days after each one decides whether the next score is higher.</p></div>';

    // Tracker first: it is what people come back for
    html += '<h2 style="margin-top:0">Your scores</h2>';
    if (list.length) {
      var gap = P.target - latest.total;
      var secs = [['Quant', latest.q], ['Verbal', latest.v], ['Data Insights', latest.di]].filter(function (s) { return s[1]; });
      var weakest = secs.length === 3 ? secs.slice().sort(function (a, b) { return a[1] - b[1]; })[0] : null;
      html += '<div class="grid grid-3 stats" style="margin-bottom:18px">' +
        '<div class="stat"><div class="stat-label">Latest total</div><div class="stat-value">' + latest.total + '</div><div class="stat-sub">' + esc(latest.name) + ', ' + U.fmtShort(latest.date) + '</div></div>' +
        '<div class="stat"><div class="stat-label">Target</div><div class="stat-value">' + P.target + '</div><div class="stat-sub">' + (gap > 0 ? gap + ' points to go' : 'Target reached on this exam') + '</div></div>' +
        '<div class="stat"><div class="stat-label">Change since first exam</div><div class="stat-value">' + (list.length > 1 ? (latest.total - list[0].total >= 0 ? '+' : '') + (latest.total - list[0].total) : '–') + '</div><div class="stat-sub">' + list.length + ' exam' + (list.length === 1 ? '' : 's') + ' recorded</div></div></div>';

      var totals = list.map(function (m) { return m.total; }).concat([P.target]);
      var lo = Math.max(200, Math.floor((Math.min.apply(null, totals) - 25) / 50) * 50);
      var hi = Math.min(850, Math.ceil((Math.max.apply(null, totals) + 25) / 50) * 50);
      html += '<div class="card"><div class="card-title">Total score against your target</div>' +
        G.charts.line({
          label: 'Total score on each practice exam, with the target shown as a dashed line',
          single: true, labels: list.map(function (m) { return U.fmtShort(m.date); }),
          tips: list.map(function (m) { return m.name + ', ' + U.fmtShort(m.date); }),
          series: [{ name: 'Total', color: 'var(--q)', values: list.map(function (m) { return m.total; }) }],
          yMin: lo, yMax: hi, yStep: (hi - lo) > 300 ? 100 : 50, target: P.target
        }) + '</div>';

      if (list.some(function (m) { return m.q || m.v || m.di; })) {
        html += '<div class="card"><div class="card-title">Section scores (60–90)</div>' +
          G.charts.line({
            label: 'Quant, Verbal and Data Insights scores on each practice exam',
            labels: list.map(function (m) { return U.fmtShort(m.date); }),
            tips: list.map(function (m) { return m.name; }),
            series: [
              { name: 'Quant', color: 'var(--q)', values: list.map(function (m) { return m.q || null; }) },
              { name: 'Verbal', color: 'var(--v)', values: list.map(function (m) { return m.v || null; }) },
              { name: 'DI', color: 'var(--di)', values: list.map(function (m) { return m.di || null; }) }
            ],
            yMin: 60, yMax: 90, yStep: 5
          }) +
          '<div class="legend"><span><i style="background:var(--q)"></i>Quant</span><span><i style="background:var(--v)"></i>Verbal</span><span><i style="background:var(--di)"></i>Data Insights</span></div></div>';
      }

      html += '<div class="coach"><div class="coach-label">Coach\'s read</div><p>' +
        (gap <= 0 ? 'Your latest exam is at or above your target. Keep doing what you are doing, protect your pacing, and do not add new material now.'
          : gap <= 30 ? 'You are within ' + gap + ' points of your target, which is inside the normal swing between two sittings. Tighten execution: review this exam\'s careless misses and timing.'
          : gap <= 80 ? 'You are ' + gap + ' points from your target. That is a realistic gap to close with focused work on your two weakest topics and better pacing.'
          : 'You are ' + gap + ' points from your target. A gap this size needs content work, not just more practice exams. Go back to the lessons for your weakest areas before the next one.') +
        (weakest ? ' Your lowest section on this exam was <strong>' + weakest[0] + ' (' + weakest[1] + ')</strong>. Because the three sections count equally, that is where an extra hour is worth most.' : '') +
        '</p></div>';

      html += '<div class="table-wrap"><table><thead><tr><th>Date</th><th>Exam</th><th class="num">Total</th><th class="num">Quant</th><th class="num">Verbal</th><th class="num">DI</th><th>Notes</th><th></th></tr></thead><tbody>' +
        list.map(function (m) {
          return '<tr><td class="nowrap">' + U.fmtShort(m.date) + '</td><td>' + esc(m.name) + '</td><td class="num"><strong>' + m.total + '</strong></td><td class="num">' + (m.q || '–') + '</td><td class="num">' + (m.v || '–') + '</td><td class="num">' + (m.di || '–') + '</td><td>' + esc(m.notes || '') + '</td>' +
            '<td><button class="btn btn-sm btn-danger" data-del="' + esc(m.id) + '" aria-label="Delete ' + esc(m.name) + '">Delete</button></td></tr>';
        }).join('') + '</tbody></table></div>';
    } else {
      html += '<div class="empty">No scores yet. Take Official Practice Exam 1 as your diagnostic and record it here.</div>';
    }

    html += '<details class="week"' + (list.length ? '' : ' open') + '><summary><span class="week-title">Record a practice exam</span></summary><div class="week-body" style="padding-top:16px">' +
      '<form id="mockForm" novalidate><div class="form-grid">' +
      '<div class="field"><label for="mDate">Date taken</label><input type="date" id="mDate" value="' + U.today() + '" max="' + U.today() + '"></div>' +
      '<div class="field"><label for="mName">Exam</label><select id="mName">' +
      G.data.plans.mocks.map(function (m, i) { return '<option' + (i === Math.min(list.length, 5) ? ' selected' : '') + '>' + esc(m.name) + '</option>'; }).join('') +
      '<option>GMAT Club test</option><option>Other practice test</option><option>Real GMAT</option></select></div>' +
      '<div class="field"><label for="mTotal">Total score</label><input type="number" id="mTotal" min="205" max="805" step="10" inputmode="numeric" placeholder="e.g. 615"><div class="hint">205–805, always ending in 5</div></div>' +
      '</div><div class="form-grid">' +
      '<div class="field"><label for="mQ">Quant</label><input type="number" id="mQ" min="60" max="90" inputmode="numeric" placeholder="60–90"></div>' +
      '<div class="field"><label for="mV">Verbal</label><input type="number" id="mV" min="60" max="90" inputmode="numeric" placeholder="60–90"></div>' +
      '<div class="field"><label for="mDI">Data Insights</label><input type="number" id="mDI" min="60" max="90" inputmode="numeric" placeholder="60–90"></div>' +
      '</div><div class="field"><label for="mNotes">Notes</label><input type="text" id="mNotes" placeholder="e.g. Ran out of time in DI; section order Q-V-DI"></div>' +
      '<div class="field-error" id="mErr" role="alert"></div>' +
      '<button class="btn btn-primary" type="submit">Save score</button></form></div></details>';

    html += '<div class="prose">' + G.data.guides.mocks + '</div>' +
      '<h2>The official practice exams</h2><div class="table-wrap"><table><thead><tr><th>Exam</th><th>Use it for</th></tr></thead><tbody>' +
      '<tr><td>Practice Exam 1 <span class="tag free">Free</span></td><td>Your diagnostic, before you study</td></tr>' +
      '<tr><td>Practice Exam 2 <span class="tag free">Free</span></td><td>Your first checkpoint, once you have learned the methods</td></tr>' +
      '<tr><td>Practice Exams 3–6 <span class="tag paid">Paid</span></td><td>The final weeks, about one a week, ending a week before test day</td></tr>' +
      '</tbody></table></div><p>' + U.ext('https://www.mba.com/exams/gmat-exam/prep-for-the-exam', 'Get the official practice exams on mba.com') + '</p></div>';

    root.innerHTML = html;
    G.charts.bind(root);

    root.querySelector('#mockForm').addEventListener('submit', function (ev) {
      ev.preventDefault();
      var err = root.querySelector('#mErr');
      var total = +root.querySelector('#mTotal').value;
      var q = +root.querySelector('#mQ').value || 0, v = +root.querySelector('#mV').value || 0, di = +root.querySelector('#mDI').value || 0;
      var date = root.querySelector('#mDate').value;
      if (!U.parse(date)) { err.textContent = 'Enter the date you took the exam.'; return; }
      if (!U.validTotal(total)) { err.textContent = 'The total score must be between 205 and 805 and end in 5 (for example 615).'; return; }
      if ([q, v, di].some(function (x) { return x && (x < 60 || x > 90 || x % 1); })) { err.textContent = 'Section scores are whole numbers from 60 to 90. Leave a box empty if you do not have the score.'; return; }
      G.store.update(function (s) {
        s.mocks.push({ id: U.uid(), date: date, name: root.querySelector('#mName').value, total: total, q: q, v: v, di: di, notes: root.querySelector('#mNotes').value.trim() });
        // The first recorded exam becomes the baseline for the plan's hours estimate.
        if (!s.profile.baseline) s.profile.baseline = total;
      });
      U.toast('Score saved');
      mocks(root);
      window.scrollTo(0, 0);
    });

    Array.prototype.forEach.call(root.querySelectorAll('[data-del]'), function (btn) {
      btn.addEventListener('click', function () {
        if (!window.confirm('Delete this score?')) return;
        var id = btn.getAttribute('data-del');
        G.store.update(function (s) { s.mocks = s.mocks.filter(function (m) { return m.id !== id; }); });
        mocks(root);
      });
    });
  }

  /* ============================ Pacing timer ============================ */
  var timerInt = null;
  function stopTimer() { if (timerInt) { clearInterval(timerInt); timerInt = null; } }

  function timer(box) {
    stopTimer();
    var presets = [
      { name: 'Quant section', q: 21, min: 45 }, { name: 'Verbal section', q: 23, min: 45 }, { name: 'Data Insights section', q: 20, min: 45 },
      { name: 'Short set: 10 questions', q: 10, min: 21 }
    ];
    var st = { total: 45 * 60, left: 45 * 60, q: 21, running: false, endAt: 0 };

    box.innerHTML = '<div class="card"><div class="card-title">Pacing timer</div>' +
      '<p class="muted">Use this for timed sets from the Official Guide or any question bank. It shows which question you should be on if you are pacing evenly.</p>' +
      '<div class="form-grid"><div class="field"><label for="tPreset">Set</label><select id="tPreset">' +
      presets.map(function (p, i) { return '<option value="' + i + '">' + p.name + ' (' + p.q + ' in ' + p.min + ' min)</option>'; }).join('') + '<option value="c">Custom</option></select></div>' +
      '<div class="field" id="tCustomQ" hidden><label for="tQ">Questions</label><input type="number" id="tQ" min="1" max="60" value="15"></div>' +
      '<div class="field" id="tCustomM" hidden><label for="tM">Minutes</label><input type="number" id="tM" min="1" max="120" value="30"></div></div>' +
      '<div class="clock" id="tClock" role="timer" aria-live="off">45:00</div>' +
      '<p id="tPace" class="muted" aria-live="polite">Press start when you begin the first question.</p>' +
      '<div class="btn-row"><button class="btn btn-primary" id="tStart" type="button">Start</button><button class="btn" id="tReset" type="button">Reset</button></div></div>';

    var clock = box.querySelector('#tClock'), pace = box.querySelector('#tPace'), startBtn = box.querySelector('#tStart');
    var preset = box.querySelector('#tPreset');

    function draw() {
      clock.textContent = U.clock(st.left);
      clock.classList.toggle('low', st.left <= 120 && st.left > 0 && st.running);
      if (st.left <= 0) { pace.textContent = 'Time. On the real test, any unanswered question now would cost you: always enter a guess before the clock runs out.'; return; }
      if (st.running || st.left < st.total) {
        var elapsed = st.total - st.left;
        var onQ = Math.min(st.q, Math.floor(elapsed / (st.total / st.q)) + 1);
        pace.textContent = 'Even pace: you should be on question ' + onQ + ' of ' + st.q + '.';
      }
    }
    function load() {
      stopTimer(); st.running = false; startBtn.textContent = 'Start';
      var custom = preset.value === 'c';
      box.querySelector('#tCustomQ').hidden = !custom; box.querySelector('#tCustomM').hidden = !custom;
      if (custom) {
        st.q = U.clamp(+box.querySelector('#tQ').value || 10, 1, 60);
        st.total = U.clamp(+box.querySelector('#tM').value || 20, 1, 120) * 60;
      } else {
        st.q = presets[+preset.value].q; st.total = presets[+preset.value].min * 60;
      }
      st.left = st.total;
      pace.textContent = 'Press start when you begin the first question.';
      draw();
    }
    preset.addEventListener('change', load);
    box.querySelector('#tQ').addEventListener('change', load);
    box.querySelector('#tM').addEventListener('change', load);
    box.querySelector('#tReset').addEventListener('click', load);
    startBtn.addEventListener('click', function () {
      if (st.running) {
        stopTimer(); st.running = false; startBtn.textContent = 'Resume'; draw(); return;
      }
      if (st.left <= 0) load();
      st.running = true; startBtn.textContent = 'Pause';
      st.endAt = Date.now() + st.left * 1000;
      timerInt = setInterval(function () {
        st.left = Math.max(0, Math.round((st.endAt - Date.now()) / 1000));
        if (st.left <= 0) { stopTimer(); st.running = false; startBtn.textContent = 'Start'; }
        draw();
      }, 250);
      draw();
    });
    load();
  }

  G.tools = { errors: errors, mocks: mocks, timer: timer, stopTimer: stopTimer, dueCount: dueCount };
})();
