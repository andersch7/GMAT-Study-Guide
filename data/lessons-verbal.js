/* Verbal coaching lessons: Critical Reasoning and Reading Comprehension. */
(function () {
  'use strict';
  var G = window.GMAT = window.GMAT || {};
  var H = G.data.lessonHelpers, note = H.note, ex = H.ex, drill = H.drill;

  G.data.lessons.verbal = {
    key: 'verbal', section: 'V', title: 'Verbal Reasoning',
    lede: '23 questions in 45 minutes: Critical Reasoning and Reading Comprehension. No grammar, no vocabulary lists.',
    intro: note('<p>Verbal rewards one skill above all: <strong>reading precisely and knowing exactly what was and was not said</strong>. There are no formulas to memorise, which is why people under-prepare it. Verbal scores move slowly but they do move, and because each section counts equally, a few points here are worth as much as a few points in Quant. Work untimed until your accuracy is high, and only then add the clock.</p>'),
    lessons: [
      {
        id: 'cr-method', title: 'Critical Reasoning: the method', sub: 'Argument structure and the assumption family', minutes: 25,
        html:
          '<p>A Critical Reasoning question gives you a short argument, a question about it and five choices. Roughly half of Verbal is Critical Reasoning, and most of those questions ask you to do something to an argument: weaken it, strengthen it, or find what it assumes.</p>' +
          '<h2>The anatomy of an argument</h2><ul>' +
          '<li><strong>Conclusion:</strong> the claim the author wants you to accept. Often flagged by <em>therefore, thus, so, clearly, should</em>.</li>' +
          '<li><strong>Premises:</strong> the evidence offered. Often flagged by <em>because, since, given that, after all</em>.</li>' +
          '<li><strong>Assumption:</strong> something unstated that must be true for the premises to support the conclusion. This is the gap, and it is where the question lives.</li>' +
          '<li><strong>Background and counterpoints:</strong> context, or a view the author goes on to reject. Do not mistake these for the conclusion.</li></ul>' +
          '<h2>The method</h2><ol class="steps">' +
          '<li><strong>Read the question stem first.</strong> Know your task before you read the argument.</li>' +
          '<li><strong>Find the conclusion,</strong> then ask "why does the author believe that?" The answer is the premises.</li>' +
          '<li><strong>Find the gap.</strong> Ask: "Even if the evidence is true, why might the conclusion still be false?" Put it in your own words.</li>' +
          '<li><strong>Predict the answer</strong> before you look at the choices. A rough prediction is enough.</li>' +
          '<li><strong>Eliminate four wrong answers.</strong> Compare each choice with your prediction and with the conclusion. Do not fall for a choice just because it mentions the same topic.</li>' +
          '</ol>' +
          '<h2>The assumption family</h2>' +
          '<div class="table-wrap"><table><thead><tr><th>Question</th><th>The right answer</th><th>Check</th></tr></thead><tbody>' +
          '<tr><td><strong>Assumption</strong><br>"The argument depends on which assumption?"</td><td>Something the argument <em>needs</em> to be true</td><td>Negate the choice. If the argument falls apart, that is the answer</td></tr>' +
          '<tr><td><strong>Strengthen</strong></td><td>Makes the conclusion more likely. It does not have to prove it</td><td>Does it close the gap, even a little?</td></tr>' +
          '<tr><td><strong>Weaken</strong></td><td>Makes the conclusion less likely. It does not have to destroy it</td><td>Does it open the gap wider?</td></tr>' +
          '</tbody></table></div>' +
          '<h2>Gaps that keep coming back</h2><ul>' +
          '<li><strong>Cause and effect:</strong> two things happened together, so one caused the other. Look for another cause, reversed cause, or coincidence.</li>' +
          '<li><strong>Plans and predictions:</strong> "do X to achieve Y". Will it actually work? Any side effect that defeats the goal?</li>' +
          '<li><strong>Samples and surveys:</strong> is the group studied typical of the group in the conclusion?</li>' +
          '<li><strong>Comparisons:</strong> are the two things really alike in the way that matters?</li>' +
          '<li><strong>Numbers versus percentages:</strong> a higher percentage does not mean a higher number, and the reverse.</li></ul>' +
          ex('Worked example',
            '<p><em>Last year the city installed speed cameras on its five busiest roads. This year, accidents on those roads fell by 15 percent. City officials conclude that the cameras have made the roads safer.</em></p>' +
            '<p><strong>Which of the following, if true, most seriously weakens the officials\' conclusion?</strong></p>' +
            '<p><strong>Conclusion:</strong> the cameras caused the fall in accidents. <strong>Evidence:</strong> accidents fell after the cameras arrived. <strong>Gap:</strong> something else may have caused the fall.</p>' +
            '<p><strong>Prediction:</strong> an answer giving another explanation, or showing accidents fell just as much without cameras.</p>' +
            '<p>So "Accidents fell by a similar percentage on comparable city roads that have no cameras" weakens the argument. "Speed cameras are expensive to maintain" is on topic but says nothing about safety. "Most drivers say they support the cameras" is about opinion, not accidents.</p>') +
          note('<p>Do not look for tricks. The people who do best at Critical Reasoning read slowly enough to restate the argument in one plain sentence: "They think the cameras worked because accidents fell." If you cannot do that, re-read before you touch the choices. Speed comes later, and it comes from clarity.</p>') +
          '<h2>How wrong answers are built</h2><ul>' +
          '<li><strong>Out of scope:</strong> about the topic, but not about the conclusion.</li>' +
          '<li><strong>Opposite:</strong> strengthens when you were asked to weaken.</li>' +
          '<li><strong>Too extreme:</strong> "all", "never", "only" when the argument was moderate.</li>' +
          '<li><strong>Irrelevant comparison:</strong> compares things the argument never compared.</li>' +
          '<li><strong>Restates a premise:</strong> true, but adds nothing.</li></ul>' +
          drill([
            ['<em>"Sales of the new model rose sharply after the advertising campaign began, so the campaign was a success."</em> What is the assumption?', 'That the campaign caused the rise, and nothing else did (for example a price cut, a competitor leaving the market, or seasonal demand).'],
            ['<em>"Employees who use the company gym take fewer sick days. So to cut sick days, the company should require everyone to use the gym."</em> Give one way to weaken this.', 'Reverse the cause: healthier employees may be the ones who choose to use the gym. Forcing others to go would then not reduce sick days.']
          ])
      },
      {
        id: 'cr-types', title: 'Critical Reasoning: the other question types', sub: 'Inference, evaluate, explain and boldface', minutes: 20,
        html:
          '<p>The method stays the same: stem first, understand the text, predict, eliminate. What changes is the task.</p>' +
          '<div class="table-wrap"><table><thead><tr><th>Type</th><th>Typical wording</th><th>Your task</th><th>Classic trap</th></tr></thead><tbody>' +
          '<tr><td><strong>Inference</strong></td><td>"Which of the following can be properly inferred?" "must be true"</td><td>Find the choice that is <em>proved</em> by the statements. There may be no argument at all, just facts</td><td>Choices that are likely or reasonable but not guaranteed</td></tr>' +
          '<tr><td><strong>Evaluate</strong></td><td>"Which would be most useful to know in order to evaluate the argument?"</td><td>Find the question whose answer would strengthen the argument one way and weaken it the other</td><td>Questions whose answer makes no difference either way</td></tr>' +
          '<tr><td><strong>Explain a discrepancy</strong></td><td>"Which most helps to explain the apparent paradox?"</td><td>Two facts seem to conflict. Find the choice that lets both be true</td><td>Choices that explain only one of the facts</td></tr>' +
          '<tr><td><strong>Boldface</strong></td><td>"The two portions in boldface play which of the following roles?"</td><td>Find the main conclusion first, then label each bold part: conclusion, evidence for it, or a view the author opposes</td><td>Choices that get one role right and the other wrong</td></tr>' +
          '<tr><td><strong>Flaw</strong></td><td>"The reasoning is most vulnerable to the criticism that it..."</td><td>Describe the gap in general terms</td><td>Real flaws that this argument does not commit</td></tr>' +
          '<tr><td><strong>Complete the passage</strong></td><td>The passage ends with a blank</td><td>Usually an inference or the missing assumption. Read the words just before the blank ("because", "therefore") to see which</td><td>Choices that go beyond the passage</td></tr>' +
          '</tbody></table></div>' +
          '<h2>Inference needs a different mindset</h2><p>In the assumption family you add something to the argument. In an inference question you add <strong>nothing</strong>. The correct answer is usually modest, sometimes almost boring, because modest statements are easy to prove. Be suspicious of strong words such as <em>most, always, never, only</em>, unless the text itself uses them.</p>' +
          ex('Worked example: inference',
            '<p><em>All of the bakery\'s sourdough loaves are made with organic flour. Some of the bakery\'s organic-flour products are sold at the weekend market.</em></p>' +
            '<p>Which must be true?</p><ul>' +
            '<li>"Some sourdough loaves are sold at the weekend market." Not proved. The organic products sold there might all be something else.</li>' +
            '<li>"The bakery makes at least one product with organic flour." <strong>Proved</strong>, and suitably modest.</li></ul>') +
          ex('Worked example: explain a discrepancy',
            '<p><em>A town raised its parking fees to discourage driving into the centre. A year later, the number of cars entering the centre each day had not fallen.</em></p>' +
            '<p>A good explanation lets both facts stand: for example, most drivers who park in the centre have their fees paid by employers, so the increase never reached them. A choice saying "the town spent the extra revenue on road repairs" explains neither fact.</p>') +
          note('<p>When two choices both look right, go back to the exact wording of the conclusion or the question. One of them will match it precisely and the other will be slightly about something else. The difference is nearly always one or two words.</p>') +
          drill([
            ['<em>"Every member of the chess club is also in the maths club. Dana is not in the maths club."</em> What can be inferred?', 'Dana is not a member of the chess club.'],
            ['<em>"A study found that people who eat breakfast weigh less on average, so eating breakfast helps people lose weight."</em> What would be most useful to know?', 'Whether people who eat breakfast differ in other ways that affect weight, such as how much they exercise or how much they eat during the rest of the day.']
          ])
      },
      {
        id: 'rc-method', title: 'Reading Comprehension: read for structure', sub: 'What to notice on the first read, and what to ignore', minutes: 20,
        html:
          '<p>Expect three or four passages, each followed by three or four questions. Topics come from business, social science and natural science. You need no outside knowledge: every answer is in the text.</p>' +
          '<h2>What to get from the first read</h2><p>Do not try to remember the details. Read to answer four questions:</p><ol>' +
          '<li><strong>What is the main point?</strong> One sentence.</li>' +
          '<li><strong>Why did the author write this?</strong> To explain, to argue, to compare, to challenge a view?</li>' +
          '<li><strong>What is each paragraph doing?</strong> Introducing a theory, giving evidence, raising an objection?</li>' +
          '<li><strong>What is the author\'s attitude?</strong> Neutral, sceptical, supportive, cautiously in favour?</li></ol>' +
          '<p>This is your <strong>passage map</strong>. Jot a few words per paragraph while you are learning; later you can hold it in your head. Spend about two to three minutes on a first read.</p>' +
          '<h2>Words that show the structure</h2>' +
          '<div class="table-wrap"><table><thead><tr><th>Signal</th><th>What it tells you</th></tr></thead><tbody>' +
          '<tr><td>however, but, yet, although, despite</td><td>A turn. What follows usually matters more than what came before</td></tr>' +
          '<tr><td>some researchers argue, traditionally, it was long believed</td><td>A view the author is about to question</td></tr>' +
          '<tr><td>for example, for instance</td><td>Support. Note what it supports, then move on</td></tr>' +
          '<tr><td>moreover, in addition, similarly</td><td>More of the same</td></tr>' +
          '<tr><td>therefore, thus, this suggests</td><td>A conclusion. Slow down</td></tr>' +
          '</tbody></table></div>' +
          ex('Worked example: a passage map',
            '<p><em>For decades, economists assumed that raising the minimum wage reduces employment among low-paid workers, since employers facing higher costs would hire fewer people. A series of studies beginning in the 1990s challenged this view: comparing neighbouring regions with different minimum wages, researchers found little or no difference in employment. Some economists explain the result by noting that higher wages reduce staff turnover, lowering the cost of hiring and training. Critics respond that the studies covered only modest increases and that larger ones might still cost jobs.</em></p>' +
            '<p><strong>Map:</strong> old view (higher minimum wage costs jobs) &rarr; newer studies disagree &rarr; a possible reason (less turnover) &rarr; critics\' limit (only small increases studied).</p>' +
            '<p><strong>Main point:</strong> evidence has challenged the traditional view, though the debate is not settled. <strong>Author\'s attitude:</strong> neutral; the author reports both sides.</p>') +
          note('<p>The biggest Reading Comprehension mistake is reading the passage passively and then hunting through it five times. Read once, actively. After each paragraph, stop for two seconds and say what it was for. If your mind wandered, re-read that paragraph straight away, because it is cheaper now than later.</p>') +
          '<h2>If the topic is unfamiliar</h2><p>Dense science passages are written to intimidate. The questions rarely test the technical detail. Replace long terms with a letter in your head, keep following the structure, and trust that you can come back for any detail a question asks about.</p>'
      },
      {
        id: 'rc-questions', title: 'Reading Comprehension: the question types', sub: 'Prove every answer from the text', minutes: 15,
        html:
          '<div class="table-wrap"><table><thead><tr><th>Type</th><th>Typical wording</th><th>How to answer</th></tr></thead><tbody>' +
          '<tr><td><strong>Main idea / primary purpose</strong></td><td>"The primary purpose of the passage is to..."</td><td>Use your map. The answer must cover the whole passage: not one paragraph, and not more than the passage claims</td></tr>' +
          '<tr><td><strong>Detail</strong></td><td>"According to the passage..."</td><td>Go back and find the lines. The answer is a paraphrase of something stated</td></tr>' +
          '<tr><td><strong>Inference</strong></td><td>"The passage suggests..." "It can be inferred..."</td><td>The answer must be true given the text, usually one small step from a stated fact</td></tr>' +
          '<tr><td><strong>Function</strong></td><td>"The author mentions X in order to..."</td><td>Ask what job the sentence does for the paragraph around it</td></tr>' +
          '<tr><td><strong>Attitude</strong></td><td>"The author\'s attitude towards X can best be described as..."</td><td>Look for the author\'s adjectives and adverbs. Extremes are rare</td></tr>' +
          '<tr><td><strong>Application</strong></td><td>"Which of the following situations is most similar to..."</td><td>State the principle in general terms, then match it</td></tr>' +
          '</tbody></table></div>' +
          '<h2>The proof rule</h2><p>For every answer except a main-idea answer, you should be able to put your finger on the line that proves it. If you cannot, you are relying on memory or on what sounds plausible, and that is exactly what the wrong answers are designed to exploit.</p>' +
          '<h2>How wrong answers are built</h2><ul>' +
          '<li><strong>Too extreme:</strong> the passage said "some" or "may"; the choice says "all" or "will".</li>' +
          '<li><strong>True but not asked:</strong> it is in the passage, but it answers a different question.</li>' +
          '<li><strong>Distorted:</strong> uses the passage\'s words but changes the relationship between them.</li>' +
          '<li><strong>Out of scope:</strong> reasonable in real life, never mentioned in the text.</li>' +
          '<li><strong>Wrong view:</strong> states what the critics think when the question asked about the author.</li></ul>' +
          note('<p>Budget about six to eight minutes for a passage and its questions together. If one question is eating time, eliminate what you can, choose, and move on. The next question on the same passage is often easier.</p>') +
          drill([
            ['Using the minimum-wage passage in the previous lesson: according to the passage, why might higher wages not reduce employment?', 'Because higher wages reduce staff turnover, which lowers hiring and training costs. This is a detail question: the answer is stated directly.'],
            ['Same passage: which is a better statement of the primary purpose? (1) "To argue that minimum wages should be raised." (2) "To describe a challenge to a traditional economic view and the response to it."', '(2). The author never recommends a policy, so (1) goes beyond the passage.']
          ])
      },
      {
        id: 'habits', title: 'Building your Verbal skill', sub: 'Daily habits, review, and advice if English is not your first language', minutes: 10,
        html:
          '<h2>How to practise Verbal</h2><ul>' +
          '<li><strong>Use official questions.</strong> Verbal questions are hard to write well, and imitation questions often have debatable answers. Stick to official GMAT questions, and use official LSAT questions if you run out.</li>' +
          '<li><strong>Untimed first.</strong> Work slowly until you are getting around 80% right, then introduce the clock.</li>' +
          '<li><strong>Review in writing.</strong> For each miss, write one sentence on why the right answer is right and one on why your answer is wrong. "I see it now" is not a review.</li>' +
          '<li><strong>Review the ones you got right by guessing</strong> exactly as you review misses.</li></ul>' +
          '<h2>Read every day</h2><p>Twenty to thirty minutes of demanding English prose each day does more for Verbal than any trick. Good sources are <em>The Economist</em>, <em>Scientific American</em>, <em>Harvard Business Review</em> and long-form essays. After each paragraph, pause and summarise it in a few words, as you will on the test.</p>' +
          '<h2>If English is not your first language</h2><ul>' +
          '<li>Your goal is reading that is both fast and exact. Daily reading is the training; start now and keep it up to test day.</li>' +
          '<li>Do not translate in your head. Practise summarising paragraphs in English.</li>' +
          '<li>You do not need vocabulary lists. When you meet an unknown word, work out its role from the sentence around it. The questions almost never depend on one rare word.</li>' +
          '<li>Pay special attention to small logical words: <em>unless, only if, although, whereas, few, a few</em>. These change meaning far more than long words do.</li>' +
          '<li>Many non-native speakers score very well in Verbal, because the section rewards careful logic more than native fluency.</li></ul>' +
          note('<p>If your Verbal accuracy has stalled, the cause is almost never a missing technique. It is usually speed: reading faster than you can understand. Slow down for a week, get your accuracy back, then rebuild pace gradually.</p>')
      }
    ]
  };
})();
