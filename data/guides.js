/* Coaching guides that are not tied to one section: how to study, timing and
   strategy, mock exams, final week and test day. Plain HTML, easy to edit. */
(function () {
  'use strict';
  var G = window.GMAT = window.GMAT || {};
  var note = G.data.lessonHelpers.note;

  G.data.guides = {

    /* ---------------- How to study ---------------- */
    study:
      '<h2>The eight rules I give every student</h2>' +
      '<ol class="steps">' +
      '<li><strong>Diagnose before you study.</strong> Take Official Practice Exam 1 first, cold. It feels uncomfortable and it is the most useful two hours of your prep, because it tells you where your hours will pay off.</li>' +
      '<li><strong>Learn the method, then practise.</strong> Official questions are limited. Do not burn through them before you know how each question type works. Lesson first, questions second.</li>' +
      '<li><strong>Accuracy before speed.</strong> Work untimed until you are getting about 80% of a topic right. Then add the clock. Speed is a by-product of knowing what to do.</li>' +
      '<li><strong>Review more than you practise.</strong> Thirty questions reviewed properly beat a hundred done and forgotten. Plan as much time for review as for the questions themselves.</li>' +
      '<li><strong>Keep an error log, and make it about behaviour.</strong> For each miss, write why it happened and what you will do differently next time. A list of question numbers changes nothing.</li>' +
      '<li><strong>Redo your misses.</strong> A few days later, rework each logged question without looking at the answer. If you miss it again, it stays in the log.</li>' +
      '<li><strong>Use mock exams as measurements, not as practice.</strong> One every week or two near the end is enough. Each one deserves a review as long as the exam.</li>' +
      '<li><strong>Protect your energy.</strong> Short, regular sessions beat weekend marathons. Take one full day off each week. You cannot study your way out of exhaustion.</li>' +
      '</ol>' +
      note('<p>If you remember one thing: your score improves during <em>review</em>, not during practice. Practice shows you what you get wrong. Review is where you change it.</p>') +
      '<h2>A good study session</h2>' +
      '<div class="table-wrap"><table><thead><tr><th>Time</th><th>What</th><th>Why</th></tr></thead><tbody>' +
      '<tr><td>10 min</td><td>Redo two or three questions from your error log</td><td>Warm up and reinforce</td></tr>' +
      '<tr><td>25 min</td><td>One lesson, or re-read the method for a weak type</td><td>Learn before you practise</td></tr>' +
      '<tr><td>30 min</td><td>10 to 15 official questions on that topic</td><td>Apply it straight away</td></tr>' +
      '<tr><td>20 min</td><td>Review every question, including the ones you got right slowly or by guessing</td><td>This is where the learning happens</td></tr>' +
      '<tr><td>5 min</td><td>Update the error log and tick off the task</td><td>So the next session knows where to start</td></tr>' +
      '</tbody></table></div>' +
      '<p>That is 90 minutes. If you only have 45, halve everything but keep all five steps.</p>' +
      '<h2>How to review a question</h2><ol>' +
      '<li>Before reading any explanation, try the question again, untimed.</li>' +
      '<li>Name the reason you missed it: a concept you did not know, a method you chose badly, a slip in execution, or time.</li>' +
      '<li>Work out the fastest correct route. Would testing numbers or working from the answers have been quicker?</li>' +
      '<li>Ask what in the question should have told you to use that route. That clue is what you are training yourself to spot.</li>' +
      '<li>Write one sentence starting "Next time I will..." and put it in the log.</li></ol>' +
      '<h2>The mistakes that cost the most</h2><ul>' +
      '<li><strong>Volume without review.</strong> Hundreds of questions, the same errors.</li>' +
      '<li><strong>Too many mock exams.</strong> A mock measures; it does not teach. Taking one every few days leaves no time to fix what it shows.</li>' +
      '<li><strong>Using up official questions too early,</strong> before learning the methods.</li>' +
      '<li><strong>Ignoring Data Insights</strong> until the last week. It is a third of your score.</li>' +
      '<li><strong>Refusing to let go of a question,</strong> then rushing or leaving blanks at the end of the section.</li>' +
      '<li><strong>Studying only what you enjoy.</strong> Your score rises fastest in the areas you avoid.</li>' +
      '<li><strong>Old materials.</strong> Anything teaching Sentence Correction, geometry or the essay was written for the retired exam.</li></ul>' +
      '<h2>How many hours will it take?</h2>' +
      '<p>Honest answer: it depends on the gap between where you start and where you want to be, and the experts do not agree on a number. GMAC\'s own surveys of test-takers have put the typical figure around 80 hours; many prep companies suggest 100 to 170; one major course recommends 180 hours or more for a gain of 50 to 80 points. This guide uses a middle estimate and adjusts it once you have a diagnostic score. Treat it as a planning aid, not a promise.</p>',

    /* ---------------- Timing and test strategy ---------------- */
    pacing: [
      { key: 'Q', name: 'Quant', questions: 21, perQ: 'about 2 min', points: [[5, 35], [10, 24], [15, 14], [21, 2]] },
      { key: 'V', name: 'Verbal', questions: 23, perQ: 'just under 2 min', points: [[6, 34], [12, 23], [18, 11], [23, 2]] },
      { key: 'DI', name: 'Data Insights', questions: 20, perQ: 'about 2 min 15 s', points: [[5, 34], [10, 23], [15, 13], [20, 2]] }
    ],

    strategyTop:
      '<p class="lede">The GMAT is a timed, adaptive test. Knowing the content gets you most of the way; managing the clock and your decisions gets you the rest.</p>' +
      note('<p>Here is the mindset I want you to take into the room: <strong>you are not trying to get every question right.</strong> The test adapts, so everyone meets questions they cannot do. Your job is to collect the points you are capable of, give the impossible ones a fast, intelligent guess, and finish every section.</p>'),

    strategyBody:
      '<h2>When to let a question go</h2><ul>' +
      '<li><strong>At about 1 minute:</strong> if you have no plan, change approach (test numbers, work from the answers, re-read the question).</li>' +
      '<li><strong>At about 2 and a half minutes:</strong> if you are not close to an answer, eliminate what you can and guess.</li>' +
      '<li><strong>3 minutes is the ceiling</strong> for a single question. Reading Comprehension passages and Multi-Source sets get more for the reading, less per question.</li>' +
      '<li>Expect to let go of two or three questions per section. Plan for it, so that it feels like strategy and not failure.</li></ul>' +
      '<h2>Never leave a question unanswered</h2>' +
      '<p>GMAC states that your score falls significantly with each unanswered question. A wrong answer costs less than a blank. If you reach the last two minutes with questions left, stop solving and enter an answer for every one of them.</p>' +
      '<h2>How the adaptive test should change your behaviour</h2><ul>' +
      '<li><strong>Do not try to judge how you are doing</strong> from how hard the questions feel. You cannot tell, and worrying about it costs points.</li>' +
      '<li><strong>Every question counts.</strong> The old advice to spend extra time on the first few questions is a myth that leaves people short at the end.</li>' +
      '<li><strong>Avoid runs of misses.</strong> Coaches broadly agree that several wrong answers in a row, typically from rushing the last few questions, hurt more than the same number spread out. Even pacing protects you.</li>' +
      '<li><strong>Careless misses on easier questions are the expensive ones.</strong> Take the extra ten seconds to check what was asked.</li></ul>' +
      '<h2>Bookmarks and the three answer edits</h2><ul>' +
      '<li>At the end of each section, if time remains, you see a review screen and can change <strong>up to three</strong> answers.</li>' +
      '<li>Bookmark sparingly: only questions where another 30 seconds would probably settle it, or where you suspect a slip.</li>' +
      '<li>Always enter an answer before moving on. You may never get back.</li>' +
      '<li>Do not plan on review time. Treat it as a bonus if you finish a minute or two early.</li>' +
      '<li>Change an answer only for a concrete reason, such as spotting a misread. A vague feeling is not a reason.</li></ul>' +
      '<h2>Choosing your section order</h2>' +
      '<p>You pick the order at the start. Experienced coaches differ: most suggest opening with your <strong>strongest</strong> section to settle your nerves and bank a good score while you are fresh; some suggest not leaving Data Insights to the end because it is the most tiring. Either can work.</p>' +
      '<p>My advice: decide by experiment. Try two orders in your practice exams, pick the one that felt and scored better, and then <strong>never change it again</strong>. Test day is not the time for a new plan.</p>' +
      '<h2>Use the break</h2>' +
      '<p>You get one optional 10-minute break, after your first or second section. Take it. Leave the screen, drink water, eat something small, stretch, and do not think about the section you just finished.</p>' +
      '<h2>Organise your scratch work</h2><ul>' +
      '<li>Write the question number and what is being asked before you start working.</li>' +
      '<li>For Data Sufficiency, write "AD / BCE" and cross off as you go.</li>' +
      '<li>For Verbal, write A B C D E and cross off eliminated choices, so you never re-read them.</li>' +
      '<li>Write neatly and in a consistent layout. It sounds trivial; it prevents a surprising number of errors.</li></ul>' +
      '<h2>When a question rattles you</h2>' +
      '<p>Have a reset routine: answer, breathe out slowly once, say to yourself "that one is gone", and read the next question as if it were the first. The worst outcome of a hard question is not losing that point. It is losing the next two because you are still thinking about it.</p>',

    /* ---------------- Mock exams ---------------- */
    mocks:
      '<h2>How to take a practice exam</h2><ul>' +
      '<li><strong>Use the official exams</strong> on mba.com. They use the real scoring algorithm and retired real questions. Exams 1 and 2 are free; 3 to 6 are paid.</li>' +
      '<li><strong>Copy test conditions:</strong> one sitting, your planned section order, one 10-minute break at most, no pausing, phone out of the room, the same time of day as your real appointment.</li>' +
      '<li><strong>Use the same tools</strong> you will have on the day: a note board or whiteboard and pen, and the on-screen calculator in Data Insights only.</li>' +
      '<li><strong>Space them out.</strong> About one a week in the last month is plenty. Take the last one roughly a week before the test and none in the final five days.</li></ul>' +
      note('<p>A practice exam is a measurement. Students who take one every two or three days are measuring the same weaknesses again and again without fixing them. Take fewer, and review each one properly.</p>') +
      '<h2>How to review one (allow as long as the exam took)</h2><ol class="steps">' +
      '<li><strong>Timing first.</strong> Which questions took more than 3 minutes? Did you rush the end of any section? Did you leave anything unanswered?</li>' +
      '<li><strong>Sort every miss and every guess</strong> into one of four causes: a concept you did not know, a method you chose badly, an execution slip, or time pressure.</li>' +
      '<li><strong>Redo each one untimed</strong> before you read the explanation.</li>' +
      '<li><strong>Log them</strong> in the error log with a "Next time I will..." note.</li>' +
      '<li><strong>Choose two priorities</strong> for the coming week from what you found. Not five. Two.</li></ol>' +
      '<h2>Reading your scores</h2><ul>' +
      '<li>Official practice exams are the best predictor available, but any single test can be off by 20 to 30 points either way. Look at the trend across exams.</li>' +
      '<li>You are ready when your recent official practice scores sit at or near your target.</li>' +
      '<li>If your last two exams are well below target a week out, consider moving the date. Rescheduling costs a fee that rises as the appointment gets closer; check the current amount on mba.com.</li>' +
      '<li>If you repeat an official exam you may see some questions again, which inflates the score. Treat repeat scores with caution.</li></ul>',

    /* ---------------- Final week and test day ---------------- */
    testdayTop:
      '<p class="lede">By the final week, the work is done. What remains is to arrive rested, organised and with a plan you have already rehearsed.</p>',

    finalWeek:
      '<div class="table-wrap"><table><thead><tr><th>When</th><th>What to do</th></tr></thead><tbody>' +
      '<tr><td>7 days out</td><td>Last full practice exam, under real conditions, at your test time of day</td></tr>' +
      '<tr><td>6 days out</td><td>Review that exam thoroughly. Pick the two or three things you will fix this week</td></tr>' +
      '<tr><td>5 to 3 days out</td><td>Short timed sets in your weaker areas, with full review. Redo error-log questions. No more full exams</td></tr>' +
      '<tr><td>2 days out</td><td>Light review of your notes and error-log takeaways. Write your pacing plan on one card. Check logistics</td></tr>' +
      '<tr><td>Day before</td><td>Rest. At most an hour looking over notes. No new material. Go to bed early</td></tr>' +
      '</tbody></table></div>' +
      note('<p>Cramming in the last two days does not raise scores. It raises anxiety and costs sleep. Nothing you could learn tomorrow is worth as much as being fresh for two and a quarter hours of concentration.</p>'),

    checklists: {
      week: {
        title: 'In the week before',
        items: [
          ['wk-id', 'My ID is valid, original, and the name matches my GMAT registration exactly'],
          ['wk-confirm', 'I have re-read the appointment confirmation: date, time, place or online link'],
          ['wk-route', 'Test centre: I know the route and how long it takes at that time of day'],
          ['wk-system', 'Online exam: I have run the system check on the computer and connection I will use'],
          ['wk-order', 'I have chosen my section order and used it in my last practice exam'],
          ['wk-schools', 'I know which programmes I want to send my score to (up to 5 are free within 48 hours of the official score)'],
          ['wk-sleep', 'I am waking up at test-day time, so the morning will not be a shock']
        ]
      },
      before: {
        title: 'The day before',
        items: [
          ['db-pack', 'ID, confirmation, water and a snack are packed'],
          ['db-clothes', 'Comfortable layered clothes are ready (test rooms can be cold)'],
          ['db-stop', 'I have stopped studying by early evening'],
          ['db-food', 'I know what I will eat tomorrow: familiar food, nothing heavy'],
          ['db-alarm', 'Two alarms are set'],
          ['db-bed', 'I am in bed early']
        ]
      },
      day: {
        title: 'On the day',
        items: [
          ['td-eat', 'Eat a normal meal; go easy on extra caffeine'],
          ['td-warm', 'Warm up with three or four easy questions, just to get your brain moving'],
          ['td-arrive', 'Arrive (or log in) about 30 minutes early'],
          ['td-order', 'Select the section order you practised'],
          ['td-clock', 'Check the clock only at your checkpoints'],
          ['td-break', 'Take the 10-minute break: water, snack, stretch'],
          ['td-blank', 'Enter an answer for every question, in every section']
        ]
      },
      online: {
        title: 'Extra steps for the online exam',
        items: [
          ['on-room', 'A quiet room with a clear desk, door closed, no one else present'],
          ['on-board', 'One erasable whiteboard (no larger than 30 × 50 cm), dry-erase markers and an eraser, if I want a physical board'],
          ['on-power', 'Laptop plugged in; other applications and notifications closed'],
          ['on-net', 'The most reliable internet connection I have (wired if possible)'],
          ['on-house', 'People I live with know not to interrupt']
        ]
      }
    },

    afterTest:
      '<h2>After the test</h2><ul>' +
      '<li>You see your <strong>unofficial score</strong> on screen as soon as you finish. The official score follows on mba.com, usually within a few business days.</li>' +
      '<li>Once the official score is posted you have 48 hours to send it free to up to five programmes. You decide which scores schools receive.</li>' +
      '<li>Your Official Score Report includes a breakdown by section, question type and timing. Read it before deciding what to do next.</li></ul>' +
      '<h2>Should you retake?</h2><ul>' +
      '<li>You must wait at least 16 days, and you may sit the exam up to five times in any 12 months.</li>' +
      '<li>Retake if your score was clearly below your recent practice exams, or if the score report shows a specific, fixable problem such as running out of time in one section.</li>' +
      '<li>Since August 2026 your score report also shows a <strong>Superscore</strong> that combines your best section scores across attempts. That reduces the risk of a retake, though each school decides how it uses the Superscore, so check with your programmes.</li>' +
      '<li>Do not retake without changing something. The same preparation usually produces the same score.</li></ul>' +
      note('<p>Many strong applicants take the GMAT twice. Schools generally consider your best score. If the first attempt does not go to plan, you have lost a fee and gained an exact picture of what to fix.</p>'),

    anxiety:
      '<h2>Managing nerves</h2><ul>' +
      '<li><strong>Rehearse the whole day.</strong> Familiarity is what calms nerves: same wake-up time, same breakfast, same section order, same break routine as in your practice exams.</li>' +
      '<li><strong>Expect it to feel hard.</strong> The test adapts to you, so it feels difficult for everyone, including people scoring 700 and above.</li>' +
      '<li><strong>Breathe out slowly</strong> between questions when you feel your pulse rise. One slow breath takes five seconds and resets your attention.</li>' +
      '<li><strong>Keep your attention on the current question.</strong> The last one is finished and the score is not yet decided.</li></ul>',

    /* ---------------- Error log ---------------- */
    errorTypes: [
      { key: 'concept', name: 'Concept gap', hint: 'I did not know the rule, formula or question type' },
      { key: 'method', name: 'Wrong method', hint: 'I knew the content but chose a slow or wrong approach' },
      { key: 'slip', name: 'Execution slip', hint: 'Misread the question, arithmetic error, answered the wrong thing' },
      { key: 'time', name: 'Time pressure', hint: 'Rushed, or spent too long and had to guess' },
      { key: 'guess', name: 'Lucky guess', hint: 'I got it right but could not explain why' }
    ],

    topics: {
      Q: ['Fractions, percents, ratios', 'Algebra and equations', 'Exponents and roots', 'Inequalities and absolute value', 'Word problems', 'Rates and work', 'Sets and mixtures', 'Number properties', 'Statistics', 'Counting and probability'],
      V: ['CR: assumption', 'CR: strengthen', 'CR: weaken', 'CR: inference', 'CR: evaluate', 'CR: explain a discrepancy', 'CR: boldface or structure', 'RC: main idea', 'RC: detail', 'RC: inference', 'RC: function or tone'],
      DI: ['Data Sufficiency', 'Two-Part Analysis', 'Graphics Interpretation', 'Table Analysis', 'Multi-Source Reasoning']
    }
  };
})();
