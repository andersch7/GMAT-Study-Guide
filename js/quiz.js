/* Practice engine: builds sets from data/questions.js, runs them with a
   per-question timer, checks answers and shows the explanation. */
(function () {
  'use strict';
  var G = window.GMAT, U = G.util, esc = U.esc;
  var LETTERS = ['A', 'B', 'C', 'D', 'E', 'F'];
  var TARGET = { Q: 129, V: 117, DI: 135 }; // average seconds per question on the real test

  var session = null;   // { title, ids, idx, results: [{ id, correct, seconds }] }
  var tick = null, startedAt = 0, checked = false;

  function all() { return G.data.questions; }
  function byId(id) { return all().filter(function (q) { return q.id === id; })[0]; }
  function stop() { if (tick) { clearInterval(tick); tick = null; } }

  // Unseen questions first, then ones answered wrongly, then the rest.
  function prioritise(list) {
    var ans = G.store.get().answers;
    function rank(q) { var a = ans[q.id]; return !a ? 0 : a.correct ? 2 : 1; }
    return list.slice().sort(function (a, b) { return rank(a) - rank(b); });
  }

  function sets() {
    var qs = all();
    function f(fn) { return qs.filter(fn); }
    return [
      { key: 'mixed', title: 'Mixed warm-up', sub: '10 questions across all three sections, new ones first', sec: null,
        pick: function () {
          var q = prioritise(f(function (x) { return x.sec === 'Q'; })).slice(0, 4);
          var v = prioritise(f(function (x) { return x.sec === 'V' && !x.passage; })).slice(0, 3);
          var d = prioritise(f(function (x) { return x.sec === 'DI' && !x.sources; })).slice(0, 3);
          return q.concat(v, d);
        } },
      { key: 'quant', title: 'Quant: Problem Solving', sec: 'Q', pick: function () { return f(function (x) { return x.sec === 'Q'; }); } },
      { key: 'cr', title: 'Verbal: Critical Reasoning', sec: 'V', pick: function () { return f(function (x) { return x.type === 'Critical Reasoning'; }); } },
      { key: 'rc', title: 'Verbal: Reading Comprehension', sub: 'Two passages', sec: 'V', pick: function () { return f(function (x) { return x.type === 'Reading Comprehension'; }); } },
      { key: 'ds', title: 'Data Insights: Data Sufficiency', sec: 'DI', pick: function () { return f(function (x) { return x.type === 'Data Sufficiency'; }); } },
      { key: 'di', title: 'Data Insights: tables, charts and multi-part', sub: 'Two-Part, Graphics, Table Analysis and Multi-Source', sec: 'DI',
        pick: function () { return f(function (x) { return x.sec === 'DI' && x.type !== 'Data Sufficiency'; }); } },
      { key: 'missed', title: 'Redo the ones I missed', sub: 'Questions whose latest attempt was wrong', sec: null,
        pick: function () { var a = G.store.get().answers; return f(function (x) { return a[x.id] && !a[x.id].correct; }); } }
    ];
  }

  function stats() {
    var ans = G.store.get().answers, out = { total: all().length, done: 0, right: 0, bySec: { Q: [0, 0, 0], V: [0, 0, 0], DI: [0, 0, 0] } };
    all().forEach(function (q) {
      out.bySec[q.sec][2]++;
      var a = ans[q.id];
      if (!a) return;
      out.done++; out.bySec[q.sec][1]++;
      if (a.correct) { out.right++; out.bySec[q.sec][0]++; }
    });
    return out;
  }

  /* ---------------- Practice home ---------------- */
  function home(root) {
    stop();
    var st = stats(), ans = G.store.get().answers;
    var html = '<div class="page">' +
      '<div class="page-head"><div class="eyebrow">Practice</div><h1>Practice questions</h1>' +
      '<p class="lede">' + st.total + ' original GMAT-style questions with full explanations. Use them to try each method straight after its lesson.</p></div>' +
      '<div class="coach"><div class="coach-label">Coach\'s note</div><p>These questions were written for this guide to help you practise the methods. They are not real GMAT questions and will not predict your score. For that, use the <a href="#/resources">official questions and practice exams</a>. Treat every miss here the same way you would on the real thing: work out why, then log it.</p></div>';

    html += '<div class="grid grid-3 stats" style="margin-bottom:22px">' +
      '<div class="stat"><div class="stat-label">Answered</div><div class="stat-value">' + st.done + '<span class="muted" style="font-size:1rem"> / ' + st.total + '</span></div></div>' +
      '<div class="stat"><div class="stat-label">Correct</div><div class="stat-value">' + (st.done ? U.pct(st.right, st.done) + '%' : '–') + '</div><div class="stat-sub">' + (st.done ? st.right + ' of ' + st.done : 'Nothing answered yet') + '</div></div>' +
      '<div class="stat"><div class="stat-label">By section</div><div class="stat-sub" style="margin-top:6px">' +
      ['Q', 'V', 'DI'].map(function (s) { var b = st.bySec[s]; return U.tag(s) + ' ' + (b[1] ? b[0] + '/' + b[1] : '–'); }).join('<br>') + '</div></div></div>';

    html += '<h2 style="margin-top:0">Choose a set</h2><div class="set-grid">';
    sets().forEach(function (s) {
      var list = s.pick();
      var dots = s.key === 'mixed' || s.key === 'missed' ? '' : '<div class="dots" aria-hidden="true">' + list.map(function (q) {
        var a = ans[q.id]; return '<i class="' + (a ? (a.correct ? 'ok' : 'no') : '') + '"></i>';
      }).join('') + '</div>';
      html += '<button class="set-card" data-set="' + s.key + '"' + (list.length ? '' : ' disabled') + '>' +
        (s.sec ? U.tag(s.sec) : '<span class="tag plain">Mixed</span>') +
        '<strong>' + esc(s.title) + '</strong>' +
        '<span class="sub">' + (list.length ? list.length + ' question' + (list.length === 1 ? '' : 's') : 'Nothing here yet') + (s.sub ? ' · ' + esc(s.sub) : '') + '</span>' + dots + '</button>';
    });
    html += '</div>' +
      '<h2>Where to practise next</h2><p>Once you have used these, move to official material: the free Starter Kit questions and the Official Guide question bank on mba.com, and the free question threads on GMAT Club. Links are on the <a href="#/resources">Resources</a> page.</p></div>';
    root.innerHTML = html;

    Array.prototype.forEach.call(root.querySelectorAll('[data-set]'), function (b) {
      b.addEventListener('click', function () {
        var s = sets().filter(function (x) { return x.key === b.getAttribute('data-set'); })[0];
        var list = s.pick();
        if (!list.length) return;
        session = { title: s.title, ids: list.map(function (q) { return q.id; }), idx: 0, results: [] };
        location.hash = '#/practice/run';
      });
    });
  }

  /* ---------------- Shared material renderers ---------------- */
  function sortableTable(def) {
    var h = '<div class="q-stim"><strong>' + esc(def.title) + '</strong> <span class="muted small">' + esc(def.note || '') + '</span>' +
      '<div class="table-wrap" style="margin:10px 0 0"><table class="sortable"><thead><tr>' +
      def.columns.map(function (c, i) { return '<th' + (c.type === 'num' ? ' class="num"' : '') + ' aria-sort="none"><button type="button" data-col="' + i + '">' + esc(c.label) + '</button></th>'; }).join('') +
      '</tr></thead><tbody></tbody></table></div></div>';
    return h;
  }
  function bindSortable(root, def) {
    var table = root.querySelector('table.sortable');
    if (!table) return;
    var body = table.querySelector('tbody'), state = { col: -1, dir: 1 };
    function draw() {
      var rows = def.rows.slice();
      if (state.col >= 0) {
        rows.sort(function (a, b) {
          var x = a[state.col], y = b[state.col];
          return (typeof x === 'number' ? x - y : String(x).localeCompare(String(y))) * state.dir;
        });
      }
      body.innerHTML = rows.map(function (r) {
        return '<tr>' + r.map(function (v, i) {
          var c = def.columns[i];
          return '<td' + (c.type === 'num' ? ' class="num"' : '') + '>' + esc(c.dp != null ? v.toFixed(c.dp) : v) + '</td>';
        }).join('') + '</tr>';
      }).join('');
      Array.prototype.forEach.call(table.querySelectorAll('th'), function (th, i) {
        th.setAttribute('aria-sort', i === state.col ? (state.dir === 1 ? 'ascending' : 'descending') : 'none');
      });
    }
    Array.prototype.forEach.call(table.querySelectorAll('th button'), function (btn) {
      btn.addEventListener('click', function () {
        var c = +btn.getAttribute('data-col');
        if (state.col === c) state.dir = -state.dir; else { state.col = c; state.dir = 1; }
        draw();
      });
    });
    draw();
  }
  function sourceTabs(set) {
    return '<div class="q-stim"><div class="tabs" role="tablist">' +
      set.map(function (s, i) { return '<button type="button" role="tab" aria-selected="' + (i === 0) + '" data-tab="' + i + '">' + esc(s.title) + '</button>'; }).join('') +
      '</div>' + set.map(function (s, i) { return '<div role="tabpanel" data-panel="' + i + '"' + (i ? ' hidden' : '') + '>' + s.html + '</div>'; }).join('') + '</div>';
  }
  function bindTabs(root) {
    var tabs = root.querySelectorAll('[data-tab]');
    Array.prototype.forEach.call(tabs, function (t) {
      t.addEventListener('click', function () {
        Array.prototype.forEach.call(tabs, function (o) { o.setAttribute('aria-selected', String(o === t)); });
        Array.prototype.forEach.call(root.querySelectorAll('[data-panel]'), function (p) {
          p.hidden = p.getAttribute('data-panel') !== t.getAttribute('data-tab');
        });
      });
    });
  }

  /* ---------------- Answer areas ---------------- */
  function answerArea(q) {
    if (q.kind === 'mc' || q.kind === 'ds') {
      var opts = q.kind === 'ds' ? G.data.dsOptions : q.options;
      return '<ul class="opts">' + opts.map(function (o, i) {
        return '<li class="opt" data-i="' + i + '"><input type="radio" name="ans" id="o' + i + '" value="' + i + '"><label class="opt-face" for="o' + i + '"><span class="opt-letter">' + LETTERS[i] + '</span><span>' + o + '</span></label></li>';
      }).join('') + '</ul>';
    }
    if (q.kind === 'twopart') {
      return '<div class="table-wrap"><table class="grid-q"><thead><tr><th>' + esc(q.cols[0]) + '</th><th>' + esc(q.cols[1]) + '</th><th>Option</th></tr></thead><tbody>' +
        q.options.map(function (o, i) {
          return '<tr data-i="' + i + '"><td><input type="radio" name="col0" value="' + i + '" aria-label="' + esc(q.cols[0]) + ': ' + esc(o) + '"></td>' +
            '<td><input type="radio" name="col1" value="' + i + '" aria-label="' + esc(q.cols[1]) + ': ' + esc(o) + '"></td><td>' + o + '</td></tr>';
        }).join('') + '</tbody></table></div>';
    }
    if (q.kind === 'yesno') {
      return '<div class="table-wrap"><table class="grid-q"><thead><tr><th>' + esc(q.labels[0]) + '</th><th>' + esc(q.labels[1]) + '</th><th>Statement</th></tr></thead><tbody>' +
        q.statements.map(function (s, i) {
          return '<tr data-i="' + i + '"><td><input type="radio" name="s' + i + '" value="0" aria-label="' + esc(q.labels[0]) + ': ' + esc(s) + '"></td>' +
            '<td><input type="radio" name="s' + i + '" value="1" aria-label="' + esc(q.labels[1]) + ': ' + esc(s) + '"></td><td>' + s + '</td></tr>';
        }).join('') + '</tbody></table></div>';
    }
    if (q.kind === 'dropdown') {
      var text = esc(q.text).replace(/\{(\d)\}/g, function (m, n) {
        return '<select class="blank-select" data-blank="' + n + '" aria-label="Blank ' + (+n + 1) + '"><option value="">Select…</option>' +
          q.blanks[+n].map(function (o, i) { return '<option value="' + i + '">' + esc(o) + '</option>'; }).join('') + '</select>';
      });
      return '<p class="q-prompt" style="line-height:2.3">' + text + '</p>';
    }
    return '';
  }

  function readAnswer(root, q) {
    function val(name) { var el = root.querySelector('input[name="' + name + '"]:checked'); return el ? +el.value : null; }
    if (q.kind === 'mc' || q.kind === 'ds') return val('ans');
    if (q.kind === 'twopart') { var a = [val('col0'), val('col1')]; return a[0] == null || a[1] == null ? null : a; }
    if (q.kind === 'yesno') { var r = q.statements.map(function (s, i) { return val('s' + i); }); return r.indexOf(null) !== -1 ? null : r; }
    if (q.kind === 'dropdown') {
      var d = q.blanks.map(function (b, i) { var s = root.querySelector('[data-blank="' + i + '"]'); return s.value === '' ? null : +s.value; });
      return d.indexOf(null) !== -1 ? null : d;
    }
    return null;
  }
  function isCorrect(q, a) {
    if (Array.isArray(q.answer)) return q.answer.every(function (v, i) { return a[i] === v; });
    return a === q.answer;
  }

  function markUp(root, q, a) {
    Array.prototype.forEach.call(root.querySelectorAll('.q-answer input, .q-answer select'), function (el) { el.disabled = true; });
    if (q.kind === 'mc' || q.kind === 'ds') {
      Array.prototype.forEach.call(root.querySelectorAll('.opt'), function (li) {
        var i = +li.getAttribute('data-i'), face = li.querySelector('.opt-face');
        if (i === q.answer) { li.classList.add('correct'); face.insertAdjacentHTML('beforeend', '<span class="mark">✓ Correct answer</span>'); }
        else if (i === a) { li.classList.add('wrong'); face.insertAdjacentHTML('beforeend', '<span class="mark">✗ Your answer</span>'); }
      });
    } else if (q.kind === 'yesno') {
      Array.prototype.forEach.call(root.querySelectorAll('.grid-q tbody tr'), function (tr) {
        var i = +tr.getAttribute('data-i'), ok = a[i] === q.answer[i];
        tr.classList.add(ok ? 'row-correct' : 'row-wrong');
        tr.lastChild.insertAdjacentHTML('beforeend', ' <strong>' + (ok ? '✓' : '✗ Correct: ' + esc(q.labels[q.answer[i]])) + '</strong>');
      });
    } else if (q.kind === 'twopart') {
      Array.prototype.forEach.call(root.querySelectorAll('.grid-q tbody tr'), function (tr) {
        var i = +tr.getAttribute('data-i'), notes = [];
        if (q.answer[0] === i) notes.push('✓ ' + esc(q.cols[0]));
        if (q.answer[1] === i) notes.push('✓ ' + esc(q.cols[1]));
        if (notes.length) { tr.classList.add('row-correct'); tr.lastChild.insertAdjacentHTML('beforeend', ' <strong>' + notes.join(', ') + '</strong>'); }
        else if (a[0] === i || a[1] === i) tr.classList.add('row-wrong');
      });
    } else if (q.kind === 'dropdown') {
      q.blanks.forEach(function (b, i) {
        var s = root.querySelector('[data-blank="' + i + '"]'), ok = a[i] === q.answer[i];
        s.classList.add(ok ? 'correct' : 'wrong');
        if (!ok) s.insertAdjacentHTML('afterend', ' <strong class="small">(correct: ' + esc(b[q.answer[i]]) + ')</strong> ');
      });
    }
  }

  /* ---------------- Running a set ---------------- */
  function run(root) {
    stop();
    if (!session) { location.hash = '#/practice'; return; }
    if (session.idx >= session.ids.length) return summary(root);
    var q = byId(session.ids[session.idx]);
    checked = false;

    var material = '';
    if (q.passage) material += '<div class="q-stim"><strong>' + esc(G.data.passages[q.passage].title) + '</strong>' + G.data.passages[q.passage].html + '</div>';
    if (q.sources) material += sourceTabs(G.data.sourceSets[q.sources]);
    if (q.table) material += sortableTable(G.data.tables[q.table]);
    if (q.chart) {
      var c = G.data.charts[q.chart];
      material += '<div class="q-stim"><strong>' + esc(c.title) + '</strong>' + (c.type === 'bar' ? G.charts.bar(c) : G.charts.scatter(c)) + '</div>';
    }
    if (q.stim) material += '<div class="q-stim">' + q.stim + '</div>';

    root.innerHTML = '<div class="page">' +
      '<div class="crumbs"><a href="#/practice">Practice</a> / ' + esc(session.title) + '</div>' +
      '<div class="q-head"><strong>Question ' + (session.idx + 1) + ' of ' + session.ids.length + '</strong>' + U.tag(q.sec) +
      '<span class="tag plain">' + esc(q.type) + '</span>' +
      '<span class="q-timer" id="qTimer" aria-label="Time on this question">0:00</span></div>' +
      material +
      (q.kind === 'dropdown' ? '<p class="muted">' + q.prompt + '</p>' : '<div class="q-prompt">' + q.prompt + '</div>') +
      '<form id="qForm" data-qid="' + q.id + '"><div class="q-answer">' + answerArea(q) + '</div>' +
      '<div class="btn-row"><button class="btn btn-primary" type="submit" id="checkBtn">Check answer</button>' +
      '<button class="btn" type="button" id="skipBtn">Skip</button>' +
      '<span class="muted small">Target pace: about ' + U.clock(TARGET[q.sec]) + ' per question</span></div></form>' +
      '<div id="after" tabindex="-1"></div></div>';

    if (q.table) bindSortable(root, G.data.tables[q.table]);
    if (q.sources) bindTabs(root);

    startedAt = Date.now();
    var timerEl = root.querySelector('#qTimer');
    tick = setInterval(function () {
      var sec = (Date.now() - startedAt) / 1000;
      timerEl.textContent = U.clock(sec);
      timerEl.classList.toggle('over', sec > TARGET[q.sec]);
    }, 500);

    root.querySelector('#skipBtn').addEventListener('click', function () {
      session.results.push({ id: q.id, correct: null, seconds: 0 });
      session.idx++; run(root); window.scrollTo(0, 0);
    });

    root.querySelector('#qForm').addEventListener('submit', function (e) {
      e.preventDefault();
      if (checked) return;
      var a = readAnswer(root, q);
      if (a == null) { U.toast(q.kind === 'mc' || q.kind === 'ds' ? 'Choose an answer first.' : 'Complete every part first.'); return; }
      checked = true;
      stop();
      var seconds = Math.round((Date.now() - startedAt) / 1000);
      var ok = isCorrect(q, a);
      session.results.push({ id: q.id, correct: ok, seconds: seconds });
      G.store.update(function (s) { s.answers[q.id] = { correct: ok, seconds: seconds, at: U.today() }; });
      markUp(root, q, a);
      root.querySelector('#checkBtn').hidden = true;
      root.querySelector('#skipBtn').hidden = true;

      var last = session.idx === session.ids.length - 1;
      var slow = seconds > TARGET[q.sec] * 1.5;
      var after = root.querySelector('#after');
      after.innerHTML = '<div class="explain"><div class="verdict ' + (ok ? 'ok' : 'no') + '">' + (ok ? '✓ Correct' : '✗ Not quite') +
        ' <span class="muted" style="font-weight:400">· ' + U.clock(seconds) + (slow ? ' (well over target pace)' : '') + '</span></div>' +
        q.explain + '<p><strong>Remember:</strong> ' + esc(q.takeaway) + '</p></div>' +
        '<div class="card" id="logCard"><div class="card-title">' + (ok ? 'Right, but unsure or slow? Log it anyway.' : 'Log this miss') + '</div>' +
        '<div class="form-grid"><div class="field"><label for="logWhy">Why did it go wrong?</label><select id="logWhy">' +
        G.data.guides.errorTypes.map(function (t) { return '<option value="' + t.key + '"' + ((ok && t.key === 'guess') || (!ok && t.key === 'method') ? ' selected' : '') + '>' + esc(t.name) + ': ' + esc(t.hint) + '</option>'; }).join('') +
        '</select></div></div><button class="btn btn-sm" type="button" id="logBtn">Add to error log</button></div>' +
        '<div class="btn-row"><button class="btn btn-primary" type="button" id="nextBtn">' + (last ? 'Finish set' : 'Next question') + '</button></div>';
      after.focus({ preventScroll: true });
      after.querySelector('.explain').scrollIntoView({ block: 'nearest', behavior: 'smooth' });

      after.querySelector('#logBtn').addEventListener('click', function () {
        var why = after.querySelector('#logWhy').value;
        G.store.update(function (s) {
          s.errors.unshift({
            id: U.uid(), date: U.today(), source: 'GMAT Coach practice (' + q.id + ')', section: q.sec, topic: q.topic,
            errorType: why, what: '', next: q.takeaway, redo: U.addDays(U.today(), 3), resolved: false
          });
        });
        after.querySelector('#logCard').innerHTML = '<p class="muted" style="margin:0">Added to your <a href="#/errors">error log</a>, due for a redo in 3 days.</p>';
        U.toast('Added to your error log');
        G.app && G.app.refreshNav();
      });
      after.querySelector('#nextBtn').addEventListener('click', function () {
        session.idx++; run(root); window.scrollTo(0, 0);
      });
    });
  }

  function summary(root) {
    var res = session.results, answered = res.filter(function (r) { return r.correct !== null; });
    var right = answered.filter(function (r) { return r.correct; }).length;
    var avg = answered.length ? answered.reduce(function (s, r) { return s + r.seconds; }, 0) / answered.length : 0;
    var missed = answered.filter(function (r) { return !r.correct; });
    var html = '<div class="page"><div class="crumbs"><a href="#/practice">Practice</a> / ' + esc(session.title) + '</div>' +
      '<h1>Set complete</h1>' +
      '<div class="grid grid-3 stats" style="margin-bottom:22px">' +
      '<div class="stat"><div class="stat-label">Score</div><div class="stat-value">' + right + '<span class="muted" style="font-size:1rem"> / ' + answered.length + '</span></div>' +
      (res.length > answered.length ? '<div class="stat-sub">' + (res.length - answered.length) + ' skipped</div>' : '') + '</div>' +
      '<div class="stat"><div class="stat-label">Accuracy</div><div class="stat-value">' + (answered.length ? U.pct(right, answered.length) + '%' : '–') + '</div></div>' +
      '<div class="stat"><div class="stat-label">Average time</div><div class="stat-value">' + (answered.length ? U.clock(avg) : '–') + '</div><div class="stat-sub">Real test: about 2 min per question</div></div></div>';

    if (missed.length) {
      html += '<div class="coach"><div class="coach-label">Coach\'s note</div><p>You missed ' + missed.length + '. Do not move on yet. For each one, say out loud why the right answer is right, then add it to your error log if you have not already. Redo them in a few days from the "Redo the ones I missed" set.</p></div>' +
        '<h2 style="margin-top:0">What to remember from the ones you missed</h2><ul>' +
        missed.map(function (r) { var q = byId(r.id); return '<li>' + U.tag(q.sec) + ' ' + esc(q.takeaway) + '</li>'; }).join('') + '</ul>';
    } else if (answered.length) {
      html += '<div class="callout good"><p><strong>All correct.</strong> Check your timing: anything well over two minutes is worth a second look even when you got it right.</p></div>';
    }
    html += '<div class="table-wrap"><table><thead><tr><th>#</th><th>Type</th><th>Result</th><th class="num">Time</th></tr></thead><tbody>' +
      res.map(function (r, i) {
        var q = byId(r.id);
        return '<tr><td>' + (i + 1) + '</td><td>' + U.tag(q.sec) + ' ' + esc(q.type) + '</td><td>' +
          (r.correct === null ? 'Skipped' : r.correct ? '✓ Correct' : '✗ Missed') + '</td><td class="num">' + (r.correct === null ? '–' : U.clock(r.seconds)) + '</td></tr>';
      }).join('') + '</tbody></table></div>' +
      '<div class="btn-row"><a class="btn btn-primary" href="#/practice">Choose another set</a><a class="btn" href="#/errors">Open error log</a></div></div>';
    root.innerHTML = html;
    session = null;
  }

  G.quiz = { home: home, run: run, stop: stop, stats: stats };
})();
