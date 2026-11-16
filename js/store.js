/* Everything personal lives in the browser's localStorage under one key.
   Nothing is sent anywhere. Export/import gives a JSON backup. */
(function () {
  'use strict';
  var G = window.GMAT;
  var KEY = 'gmatCoach.v1';

  function defaults() {
    return {
      version: 1,
      theme: 'auto',
      profile: {
        onboarded: false,
        name: '',
        startDate: null,      // 'YYYY-MM-DD' — day the plan starts
        testDate: null,       // 'YYYY-MM-DD'
        target: 675,          // total score aimed for (205–805)
        hours: 10,            // study hours per week
        baseline: null,       // diagnostic total, if known
        newbie: true,
        rustyMath: false,
        nonNative: false
      },
      done: {},     // plan task id -> true
      read: {},     // lesson id -> true
      checks: {},   // checklist item id -> true
      answers: {},  // question id -> { correct, seconds, at }
      errors: [],   // error-log entries
      mocks: []     // mock-exam results
    };
  }

  var mem = null;
  var storageOk = true;

  function read() {
    if (mem) return mem;
    var base = defaults();
    try {
      var raw = localStorage.getItem(KEY);
      if (raw) merge(base, JSON.parse(raw));
    } catch (e) { storageOk = false; }
    mem = base;
    return mem;
  }

  // Copy saved values over defaults, so new fields added later still get a default.
  function merge(base, saved) {
    if (!saved || typeof saved !== 'object') return;
    Object.keys(base).forEach(function (k) {
      if (!(k in saved) || saved[k] == null && k !== 'profile') return;
      if (k === 'profile') {
        Object.keys(base.profile).forEach(function (p) {
          if (saved.profile && p in saved.profile) base.profile[p] = saved.profile[p];
        });
      } else if (Array.isArray(base[k])) {
        if (Array.isArray(saved[k])) base[k] = saved[k];
      } else if (typeof base[k] === 'object') {
        if (typeof saved[k] === 'object') base[k] = saved[k];
      } else {
        base[k] = saved[k];
      }
    });
  }

  function save() {
    try { localStorage.setItem(KEY, JSON.stringify(mem)); }
    catch (e) { storageOk = false; }
  }

  G.store = {
    get: read,
    save: save,
    ok: function () { read(); return storageOk; },
    update: function (fn) { fn(read()); save(); },
    toggle: function (bucket, id, on) {
      var s = read();
      if (on) s[bucket][id] = true; else delete s[bucket][id];
      save();
    },
    exportJSON: function () { return JSON.stringify(read(), null, 2); },
    importJSON: function (text) {
      var obj = JSON.parse(text);
      if (!obj || typeof obj !== 'object' || !obj.profile) throw new Error('This file is not a GMAT Coach backup.');
      var base = defaults();
      merge(base, obj);
      mem = base;
      save();
    },
    reset: function () {
      mem = defaults();
      try { localStorage.removeItem(KEY); } catch (e) {}
    }
  };
})();
