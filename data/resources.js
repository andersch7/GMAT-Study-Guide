/* Curated external resources. `cost` is 'free', 'paid' or 'mixed'.
   Prices change often, so the site describes them loosely and links to the vendor. */
(function () {
  'use strict';
  var G = window.GMAT = window.GMAT || {};
  G.data = G.data || {};

  G.data.resources = {
    groups: [
      {
        title: 'Official material from GMAC',
        intro: 'Start here. Official questions are retired real questions, and the official practice exams use the real scoring algorithm. Nothing else predicts your score as well.',
        items: [
          { name: 'GMAT Official Starter Kit with Practice Exams 1 and 2', url: 'https://www.mba.com/exams/gmat-exam/prep-for-the-exam', cost: 'free', best: 'Your diagnostic and your first checkpoint. Two full adaptive exams plus sample questions, free with an mba.com account.' },
          { name: 'Official Practice Exams 3–6', url: 'https://www.mba.com/exam-prep/gmat-official-practice-exams-3-6', cost: 'paid', best: 'Four more full adaptive exams for the last weeks of your plan.' },
          { name: 'GMAT Official Guide (latest edition) and the Quant, Verbal and Data Insights Review books', url: 'https://www.mba.com/gmat-exam-prep', cost: 'paid', best: 'The main bank of real questions, with an online question bank where you can build timed sets by topic and difficulty. Buy the current edition, not one written for the old exam.' },
          { name: 'Exam structure and content', url: 'https://www.mba.com/exams/gmat-exam/about/exam-structure', cost: 'free', best: 'The authoritative description of sections, timing and question types.' },
          { name: 'Register, fees and policies', url: 'https://www.mba.com/exams/gmat-exam/register', cost: 'free', best: 'Booking, current fees in your country, ID rules, rescheduling and retake rules.' },
          { name: 'Scores and percentiles', url: 'https://www.mba.com/exams/gmat-exam/scores/understanding-your-score', cost: 'free', best: 'The current percentile tables and how to read your score report.' },
          { name: 'Taking the exam online', url: 'https://www.mba.com/exams/gmat-exam/plan-for-exam-day/taking-the-exam-online', cost: 'free', best: 'System requirements, whiteboard rules and check-in steps for the at-home exam.' },
          { name: 'GMAC 6-week study planner (PDF)', url: 'https://www.mba.com/-/media/MBASite/gmat-focus-edition/assets-or-collateral/gmat-focus-6-week-study-planner-6-june-2023', cost: 'free', best: 'GMAC\'s own outline: explore, practise, assess, grow, reassess, refine.' }
        ]
      },
      {
        title: 'Free practice and community',
        intro: 'Good for extra questions, explanations and seeing how high scorers prepared.',
        items: [
          { name: 'GMAT Club forum', url: 'https://gmatclub.com/forum/', cost: 'mixed', best: 'The largest GMAT community. Every official question has an expert explanation thread; search the first words of any question you get stuck on. Timer and automatic error log built in.' },
          { name: 'GMAT Club study plan', url: 'https://gmatclub.com/forum/gmat-focus-study-plan-421308.html', cost: 'free', best: 'A detailed 12-week plan to compare against yours.' },
          { name: 'GMAT Ninja video lessons (YouTube)', url: 'https://www.youtube.com/@GMATNinjaTutoring', cost: 'free', best: 'Long, careful walk-throughs of Critical Reasoning, Reading Comprehension, Quant and Data Insights by a veteran tutor. Excellent for Verbal.' },
          { name: 'GMAT Ninja: Critical Reasoning guide for beginners', url: 'https://gmatclub.com/forum/p2058289', cost: 'free', best: 'A plain-spoken introduction to reading arguments without tricks.' },
          { name: 'Khan Academy maths', url: 'https://www.khanacademy.org/math', cost: 'free', best: 'Rebuilding rusty foundations: fractions, percents, exponents, linear equations and inequalities. Use it for basics only, not for GMAT strategy.' },
          { name: 'LSAT practice tests on LSAC LawHub', url: 'https://www.lsac.org/lawhub', cost: 'mixed', best: 'Extra Critical Reasoning and Reading Comprehension practice once you run out of official GMAT questions. LSAT Logical Reasoning is slightly harder, which is useful if you are aiming high in Verbal.' },
          { name: 'r/GMAT on Reddit', url: 'https://www.reddit.com/r/GMAT/', cost: 'free', best: 'Score debriefs and quick answers. Good for morale; check advice against the official pages.' },
          { name: 'Inside the GMAT podcast (GMAC)', url: 'https://www.mba.com/exams-and-exam-prep/gmat-exam/inside-gmat-podcast-exam-prep-101', cost: 'free', best: 'Official prep advice to listen to on the go.' }
        ]
      },
      {
        title: 'Courses and question banks',
        intro: 'You do not need a paid course to score well, but a structured course saves planning time. Most offer a free trial: try before you pay.',
        items: [
          { name: 'Target Test Prep', url: 'https://gmat.targettestprep.com', cost: 'paid', best: 'The most thorough Quant and Data Insights curriculum, topic by topic with large practice sets. Monthly subscription; free trial.' },
          { name: 'Manhattan Prep', url: 'https://www.manhattanprep.com/gmat/', cost: 'paid', best: 'Strategy-focused books, on-demand course and live classes. Strong on how to think about the test, not just content.' },
          { name: 'e-GMAT', url: 'https://e-gmat.com', cost: 'paid', best: 'Popular with non-native English speakers for its structured Verbal method.' },
          { name: 'Magoosh', url: 'https://magoosh.com/gmat/', cost: 'paid', best: 'The budget option: video lessons and a question bank at a lower price.' },
          { name: 'GMAT Club tests', url: 'https://gmatclub.com/gmat-focus-tests/', cost: 'mixed', best: 'Hard practice tests for extra mock exams. Scores run a little tough, so trust official exams for prediction.' }
        ]
      },
      {
        title: 'Articles worth your time',
        intro: 'Short reads from experienced instructors that back up the advice in this guide.',
        items: [
          { name: 'Manhattan Prep: How Data Sufficiency works', url: 'https://www.manhattanprep.com/gmat/blog/how-data-sufficiency-works/', cost: 'free', best: 'The AD/BCE method explained by the people who popularised it.' },
          { name: 'Manhattan Prep: Why you should be redoing GMAT problems', url: 'https://manhattanprep.com/gmat/blog/why-you-should-be-redoing-gmat-problems', cost: 'free', best: 'Why review beats volume.' },
          { name: 'Manhattan Prep: Stop taking so many practice tests', url: 'https://www.manhattanprep.com/gmat/blog/stop-taking-so-many-cats/', cost: 'free', best: 'How to use mock exams as a diagnostic tool rather than as practice.' },
          { name: 'mba.com: Mastering GMAT timing', url: 'https://www.mba.com/exams-and-exam-prep/gmat-exam-prep/mastering-gmat-timing', cost: 'free', best: 'Benchmarks and a skipping plan for each section.' },
          { name: 'mba.com: Verbal tips for non-native English speakers', url: 'https://www.mba.com/exams-and-exam-prep/gmat-exam-prep/gmat-verbal-tips-for-non-native-english-speakers', cost: 'free', best: 'Building reading speed and precision in English.' },
          { name: 'Target Test Prep: Data Insights timing strategy', url: 'https://blog.targettestprep.com/data-insights-timing-strategy/', cost: 'free', best: 'How to budget time across the five Data Insights question types.' },
          { name: 'Magoosh study schedules (1, 2, 3 and 6 months)', url: 'https://magoosh.com/gmat/gmat-study-schedule', cost: 'free', best: 'Day-by-day schedules to compare with your plan here.' },
          { name: 'Manhattan Prep: Overcoming GMAT burnout', url: 'https://manhattanprep.com/gmat/blog/overcoming-gmat-burnout', cost: 'free', best: 'What to do when studying stops working.' }
        ]
      }
    ],

    // Where the study advice in this guide comes from (shown on the Sources page).
    adviceSources: [
      { claim: 'Take an official practice exam as a diagnostic before studying', who: 'GMAC, Magoosh, Manhattan Prep', url: 'https://www.mba.com/exams/gmat-exam/prep-for-the-exam' },
      { claim: 'Review more than you practise; redo missed questions', who: 'Manhattan Prep', url: 'https://manhattanprep.com/gmat/blog/why-you-should-be-redoing-gmat-problems' },
      { claim: 'Use mock exams sparingly and review each one deeply', who: 'Manhattan Prep (Stacey Koprince)', url: 'https://www.manhattanprep.com/gmat/blog/stop-taking-so-many-cats/' },
      { claim: 'Last full mock about a week before the test; light review only after that', who: 'GMAC', url: 'https://www.mba.com/exams-and-exam-prep/gmat-exam/how-to-improve-your-gmat-score-in-a-week' },
      { claim: 'Data Sufficiency: the AD/BCE grid; decide sufficiency, do not solve', who: 'Manhattan Prep', url: 'https://www.manhattanprep.com/gmat/blog/how-data-sufficiency-works/' },
      { claim: 'Internalise pacing benchmarks and a skipping plan', who: 'mba.com guest article', url: 'https://www.mba.com/exams-and-exam-prep/gmat-exam-prep/mastering-gmat-timing' },
      { claim: 'Start with your stronger section', who: 'e-GMAT, Target Test Prep (Princeton Review instead suggests leaving Data Insights later)', url: 'https://blog.targettestprep.com/best-gmat-section-order/' },
      { claim: 'An error log must record why you missed and what you will change', who: 'GMAT Club experts', url: 'https://gmatclub.com/forum/why-your-error-log-is-useless-if-it-s-just-a-list-of-missed-questions-459272.html' },
      { claim: 'LSAT questions are good extra Critical Reasoning and Reading Comprehension practice', who: 'GMAT Ninja', url: 'https://gmatclub.com/forum/post2731781.html' },
      { claim: 'Backsolving and testing numbers in Quant', who: 'GMAT Club, Manhattan Prep', url: 'https://gmatclub.com/blog/land-your-score-backsolving-in-quantitative-reasoning/' },
      { claim: 'Study hours: estimates range from about 80 hours (GMAC survey median) to 300+ (Target Test Prep); this guide uses a middle figure scaled to your score gap', who: 'GMAC, PrepScholar, Target Test Prep', url: 'https://blog.targettestprep.com/how-many-hours-to-study-for-gmat/' },
      { claim: 'Rest is part of the plan; you cannot study through burnout', who: 'Manhattan Prep', url: 'https://manhattanprep.com/gmat/blog/overcoming-gmat-burnout' }
    ]
  };
})();
