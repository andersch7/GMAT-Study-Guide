/* Exam facts. Every figure here was checked against GMAC (mba.com / gmac.com)
   material or, where noted, reputable prep-company summaries of it.
   Figures marked `approx` or listed under `checkOfficial` change over time:
   the site always links to the official page next to them.
   To update a fact, change it here; the pages read from this file. */
(function () {
  'use strict';
  var G = window.GMAT = window.GMAT || {};
  G.data = G.data || {};

  G.data.exam = {
    lastChecked: '2026-11-16',

    sources: {
      structure:  { org: 'mba.com', title: 'GMAT exam structure', url: 'https://www.mba.com/exams/gmat-exam/about/exam-structure' },
      content:    { org: 'mba.com', title: 'GMAT exam content', url: 'https://www.mba.com/exams/gmat-exam/about/exam-content' },
      scores:     { org: 'mba.com', title: 'Understanding your score', url: 'https://www.mba.com/exams/gmat-exam/scores/understanding-your-score' },
      scoresHub:  { org: 'mba.com', title: 'GMAT scores', url: 'https://www.mba.com/exams/gmat-exam/scores' },
      concord:    { org: 'GMAC', title: 'Total score concordance and percentile table (August 2026)', url: 'https://go.gmac.com/hubfs/07.Assessments/GMAT%20Exam/GMAT_Total_Concordance_Aug2026.pdf' },
      policies:   { org: 'mba.com', title: 'Exam policies', url: 'https://www.mba.com/exams/gmat-exam/register/exam-policies' },
      attempts:   { org: 'mba.com Help Center', title: 'How many times can I take the exam?', url: 'https://support.mba.com/hc/en-us/articles/10118337626139-GMAT-How-Many-Times-Can-I-Take-the-Exam' },
      register:   { org: 'mba.com', title: 'Register for the GMAT', url: 'https://www.mba.com/exams/gmat-exam/register' },
      payment:    { org: 'mba.com', title: 'Exam fees and payment', url: 'https://www.mba.com/exams/gmat-exam/register/exam-payment' },
      online:     { org: 'mba.com', title: 'Taking the exam online', url: 'https://www.mba.com/exams/gmat-exam/plan-for-exam-day/taking-the-exam-online' },
      reports:    { org: 'mba.com', title: 'Official Score Reports', url: 'https://www.mba.com/exams/gmat-exam/scores/official-score-reports' },
      sending:    { org: 'mba.com', title: 'Sending your score', url: 'https://www.mba.com/exams/gmat-exam/scores/sending-your-score' },
      validity:   { org: 'mba.com Help Center', title: 'How long are my scores valid?', url: 'https://support.mba.com/hc/en-us/articles/13894860085531-GMAT-How-Long-Are-My-Scores-Valid' },
      adaptive:   { org: 'mba.com Help Center', title: 'What is a computer-adaptive exam?', url: 'https://support.mba.com/hc/en-us/articles/7261613974043-GMAT-What-Is-a-Computer-Adaptive-Exam' },
      superscore: { org: 'GMAC', title: 'GMAC introduces GMAT Superscore (press release, June 2026)', url: 'https://www.gmac.com/why-gmac/gmac-news/gmac-press-releases/gmac-introduces-gmat-superscore' },
      nameChange: { org: 'GMAC', title: 'GMAT name change FAQ (2024)', url: 'https://www.gmac.com/-/media/files/gmac/gmat/2024-gmat-name-change-faq.pdf' },
      scRemoved:  { org: 'mba.com Help Center', title: 'Why was Sentence Correction removed?', url: 'https://support.mba.com/hc/en-us/articles/13962177183771-GMAT-Why-Did-GMAC-Remove-Sentence-Correction-From-the-GMAT' },
      accommodations: { org: 'mba.com', title: 'Testing accommodations', url: 'https://www.mba.com/exams/gmat-exam/register/testing-accommodations' },
      prep:       { org: 'mba.com', title: 'Prepare for the exam (official prep)', url: 'https://www.mba.com/exams/gmat-exam/prep-for-the-exam' },
      cancel:     { org: 'mba.com', title: 'Cancel or reinstate a score', url: 'https://www.mba.com/exams-and-exam-prep/gmat-exam/gmat-cancel-reinstate' }
    },

    totals: { minutes: 135, questions: 64, scoreMin: 205, scoreMax: 805, sectionMin: 60, sectionMax: 90 },

    sections: [
      {
        key: 'Q', name: 'Quantitative Reasoning', short: 'Quant', questions: 21, minutes: 45, perQuestion: '2:09',
        calculator: false,
        types: [{ name: 'Problem Solving', what: 'Standard five-choice maths questions.' }],
        tests: 'Arithmetic and elementary algebra, applied to reasoning problems: number properties, percents, ratios, rates, equations, inequalities, exponents, statistics, counting and probability. No geometry, and no calculator.',
        route: '#/quant'
      },
      {
        key: 'V', name: 'Verbal Reasoning', short: 'Verbal', questions: 23, minutes: 45, perQuestion: '1:57',
        calculator: false,
        types: [
          { name: 'Critical Reasoning', what: 'A short argument, then a question about strengthening, weakening, assuming, inferring or evaluating it.' },
          { name: 'Reading Comprehension', what: 'A passage of roughly 200–350 words followed by several questions on its main point, details, inferences and structure.' }
        ],
        tests: 'Reading precisely and reasoning about arguments. There is no grammar: Sentence Correction was removed from the exam.',
        route: '#/verbal'
      },
      {
        key: 'DI', name: 'Data Insights', short: 'Data Insights', questions: 20, minutes: 45, perQuestion: '2:15',
        calculator: true,
        types: [
          { name: 'Data Sufficiency', what: 'A question and two statements: decide whether the statements give enough information to answer, without having to solve.' },
          { name: 'Multi-Source Reasoning', what: 'Two or three tabs of text, tables or charts, with several questions that need information from more than one tab.' },
          { name: 'Table Analysis', what: 'A sortable table and three statements to judge (for example Yes/No or True/False).' },
          { name: 'Graphics Interpretation', what: 'A chart with two fill-in-the-blank statements completed from drop-down menus.' },
          { name: 'Two-Part Analysis', what: 'One scenario, two linked answers chosen from the same list of options.' }
        ],
        tests: 'Reading and combining data from text, tables and charts, mixing maths and verbal reasoning. An on-screen calculator is provided in this section only. Multi-part questions give no partial credit.',
        route: '#/di'
      }
    ],

    features: [
      { title: 'Choose your section order', text: 'You pick any of the six possible orders at the start. There is no "right" order: choose what you practised.' },
      { title: 'One optional 10-minute break', text: 'Taken after your first or second section.' },
      { title: 'Bookmark and review', text: 'You can bookmark any number of questions and, if time remains at the end of the section, go back and review them.' },
      { title: 'Change up to 3 answers per section', text: 'On the review screen you can edit at most three answers. If the clock runs out first, you never reach the review screen.' },
      { title: 'Question-adaptive', text: 'Each answer helps decide how hard the next question is. You must answer every question in order and cannot skip.' },
      { title: 'Unanswered questions are penalised', text: 'GMAC says your score drops significantly with each question left unanswered, so always enter an answer for every question, even a guess.' }
    ],

    // Approximate total-score percentiles (GMAC table published August 2026, rounded;
    // third-party summaries of that table differ by a point or so, so treat as "about").
    // `old` is the roughly equivalent score on the retired 200–800 scale.
    percentiles: [
      { score: 805, pct: '100th', old: '800' },
      { score: 735, pct: 'above 99th', old: '' },
      { score: 705, pct: 'about 98th', old: '750' },
      { score: 695, pct: 'about 97th', old: '' },
      { score: 675, pct: 'about 94th', old: 'about 730' },
      { score: 655, pct: 'about 90th', old: '710' },
      { score: 645, pct: 'about 86th', old: '700' },
      { score: 615, pct: 'about 76th', old: '' },
      { score: 605, pct: 'about 70th', old: '650' },
      { score: 555, pct: 'about 47th', old: '' }
    ],

    // Examples only, as published by the schools at the time of checking.
    schools: [
      { name: 'Harvard Business School', figure: 'Median 685 (middle 80%: 645–735)', note: 'Class of 2027, current scale', url: 'https://www.hbs.edu/mba/admissions/class-profile' },
      { name: 'Wharton', figure: 'Average 676', note: 'Current scale, as shown on the programme site', url: 'https://mba.wharton.upenn.edu/' },
      { name: 'London Business School', figure: 'Average about 645', note: 'Typical range 555–805', url: 'https://www.london.edu/masters-degrees/mba/apply' },
      { name: 'HEC Paris', figure: 'Average 635', note: 'The school equates this to 690 on the old scale', url: 'https://www.hec.edu/en/mba-executive-mba/mba/admissions/requirements' }
    ],

    logistics: [
      { title: 'Where', text: 'At a test centre or online at home. The content, timing and score scale are the same for both.', src: 'online' },
      { title: 'Fee', text: 'In the United States the exam costs US$275 at a test centre and US$300 online. Fees differ by country, so check the price shown when you register.', src: 'payment' },
      { title: 'Rescheduling and cancelling', text: 'Both cost a fee that rises the closer you are to the appointment (cheapest more than 60 days out). No changes are allowed in the last 24 hours, and a no-show loses the whole fee.', src: 'policies' },
      { title: 'ID', text: 'A valid, original, government-issued ID whose name matches your registration exactly. If it does not match, you cannot test and you lose the fee.', src: 'policies' },
      { title: 'Retakes', text: 'At least 16 days between attempts and at most 5 attempts in any rolling 12 months, counting test-centre and online attempts together. GMAC\'s current FAQs list no lifetime limit (an older policy capped it at 8).', src: 'attempts' },
      { title: 'Score validity', text: 'Scores are valid for 5 years.', src: 'validity' },
      { title: 'Sending scores', text: 'You see your unofficial score on screen when you finish. Once the official score is posted you can send it to up to 5 programmes free within 48 hours; later or additional reports cost a fee. You decide which scores schools see, but a sent report cannot be withdrawn.', src: 'sending' },
      { title: 'Superscore (new in 2026)', text: 'Since August 2026, Official Score Reports also show a Superscore: your best Quant, Verbal and Data Insights scores across valid attempts, combined on the same 205–805 scale. It is automatic and free. Each school decides how much weight to give it.', src: 'superscore' },
      { title: 'Accommodations', text: 'Extra time and other accommodations are available for documented needs. Apply before you book: approval takes time.', src: 'accommodations' }
    ],

    onlineVsCentre: [
      { aspect: 'Scratch work', centre: 'Laminated note board and marker supplied', online: 'Built-in digital whiteboard, plus one physical erasable whiteboard (up to 30 × 50 cm) of your own with dry-erase markers' },
      { aspect: 'Environment', centre: 'Quiet, controlled room; nothing to set up', online: 'Your own room, cleared and shown to the proctor; your computer and connection must pass the system check' },
      { aspect: 'Risk', centre: 'Travel and scheduling', online: 'Technical problems and interruptions are your responsibility' },
      { aspect: 'Best for', centre: 'Most people, if a centre is within reach', online: 'No centre nearby, or you test best at home and have a reliable setup' }
    ],

    retired: 'If a book, video or forum post mentions Sentence Correction, the AWA essay, Integrated Reasoning as a separate section, geometry, or scores on a 200–800 scale, it was written for the old exam (retired January 2024). Its Critical Reasoning, Reading Comprehension and most Quant advice still applies; ignore the rest.'
  };
})();
