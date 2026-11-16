/* Building blocks for the study plan. js/plan.js arranges these into weeks
   based on the test date and weekly hours. Edit titles, hours or order here. */
(function () {
  'use strict';
  var G = window.GMAT = window.GMAT || {};
  G.data = G.data || {};

  G.data.plans = {
    // Learning units in the order they are studied. Sections are interleaved on
    // purpose: switching between Quant, Verbal and Data Insights keeps each one
    // fresh and mirrors the real test. `hours` is the standard pace (lesson +
    // untimed practice); the generator scales it to the time you have.
    // `core: false` units are dropped first when time is very short.
    units: [
      { id: 'u-exam', section: null, core: true, hours: 1, min: 0.5,
        title: 'Learn how the exam works',
        route: '#/exam',
        detail: 'Read "Know the exam": the three sections, the timing, how adaptive scoring works and the review-and-edit tool. You should never be surprised by the format.' },
      { id: 'u-q-arith', section: 'Q', core: true, hours: 5, min: 1,
        title: 'Quant: fractions, percents and ratios',
        route: '#/quant/arithmetic',
        detail: 'Arithmetic fluency underpins every Quant and Data Insights question.' },
      { id: 'u-v-cr1', section: 'V', core: true, hours: 5, min: 1,
        title: 'Critical Reasoning: argument structure and the assumption family',
        route: '#/verbal/cr-method',
        detail: 'Find the conclusion, find the gap, predict the answer. Covers assumption, strengthen and weaken questions.' },
      { id: 'u-q-alg', section: 'Q', core: true, hours: 5, min: 1,
        title: 'Quant: algebra, exponents and inequalities',
        route: '#/quant/algebra',
        detail: 'Equations, inequalities, exponents and quadratics, plus when to skip the algebra and test numbers.' },
      { id: 'u-v-rc', section: 'V', core: true, hours: 4, min: 1,
        title: 'Reading Comprehension: read for structure',
        route: '#/verbal/rc-method',
        detail: 'Passage mapping, main point, and how to prove detail and inference answers from the text.' },
      { id: 'u-di-ds', section: 'DI', core: true, hours: 4, min: 1,
        title: 'Data Insights: Data Sufficiency',
        route: '#/di/data-sufficiency',
        detail: 'The fixed answer choices, the AD/BCE decision grid, and judging sufficiency without solving.' },
      { id: 'u-q-word', section: 'Q', core: true, hours: 5, min: 1,
        title: 'Quant: word problems, rates and work',
        route: '#/quant/word-problems',
        detail: 'Translating English into equations: rates, work, mixtures, overlapping sets, interest.' },
      { id: 'u-v-cr2', section: 'V', core: true, hours: 3, min: 0.75,
        title: 'Critical Reasoning: inference, evaluate, paradox and boldface',
        route: '#/verbal/cr-types',
        detail: 'The remaining question types and how the task changes for each.' },
      { id: 'u-q-np', section: 'Q', core: true, hours: 4, min: 1,
        title: 'Quant: number properties',
        route: '#/quant/number-properties',
        detail: 'Divisibility, primes, remainders, odd/even and positive/negative rules.' },
      { id: 'u-di-tpa', section: 'DI', core: true, hours: 4, min: 1,
        title: 'Data Insights: Two-Part Analysis and Graphics Interpretation',
        route: '#/di/two-part',
        detail: 'Two linked answers from one grid, and reading charts accurately before you calculate.' },
      { id: 'u-q-stats', section: 'Q', core: false, hours: 4, min: 0.75,
        title: 'Quant: statistics, counting and probability',
        route: '#/quant/statistics',
        detail: 'Mean, median, range and standard deviation concepts; basic counting and probability.' },
      { id: 'u-di-msr', section: 'DI', core: true, hours: 3, min: 0.75,
        title: 'Data Insights: Table Analysis and Multi-Source Reasoning',
        route: '#/di/table-analysis',
        detail: 'Sorting tables, checking every statement precisely, and finding which source holds the answer.' },
      { id: 'u-strategy', section: null, core: true, hours: 1.5, min: 0.5,
        title: 'Timing and test strategy',
        route: '#/strategy',
        detail: 'Pacing checkpoints, when to guess and move on, section order, and how to use the three answer edits.' }
    ],

    // How each learning unit should be worked, depending on how compressed the plan is.
    howTo: {
      compressed: 'read the lesson, do its drill, then 8–10 official questions untimed. Skip sub-topics your diagnostic shows you already handle.',
      standard: 'read the lesson, then work 20–30 official questions untimed. Aim for about 80% correct before moving on, and log every miss and every lucky guess.',
      extended: 'read the lesson, work 30–40 official questions untimed, then a timed set of 10. Log every miss and redo logged questions a few days later.'
    },

    // The six official practice exams, in the order to use them.
    mocks: [
      { name: 'Official Practice Exam 1', note: 'Free with the Official Starter Kit on mba.com.' },
      { name: 'Official Practice Exam 2', note: 'Free with the Official Starter Kit on mba.com.' },
      { name: 'Official Practice Exam 3', note: 'Paid (Practice Exams 3–6 are sold on mba.com). If you prefer not to buy, use a free GMAT Club test instead.' },
      { name: 'Official Practice Exam 4', note: 'Paid.' },
      { name: 'Official Practice Exam 5', note: 'Paid.' },
      { name: 'Official Practice Exam 6', note: 'Paid.' }
    ],

    phases: {
      learn: { name: 'Learn the methods', blurb: 'Build accuracy first, untimed. Speed comes from knowing what to do, not from rushing.' },
      timed: { name: 'Timed mixed practice', blurb: 'Mix topics and add the clock. Train the decision to guess and move on.' },
      mocks: { name: 'Mock exams and repair', blurb: 'Full practice exams under test conditions, each followed by a deep review that decides what you study next.' },
      final: { name: 'Final week', blurb: 'One last mock early in the week, light review, logistics and rest. No cramming.' }
    }
  };
})();
