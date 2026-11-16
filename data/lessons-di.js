/* Data Insights coaching lessons. */
(function () {
  'use strict';
  var G = window.GMAT = window.GMAT || {};
  var H = G.data.lessonHelpers, note = H.note, ex = H.ex, drill = H.drill;

  G.data.lessons.di = {
    key: 'di', section: 'DI', title: 'Data Insights',
    lede: '20 questions in 45 minutes across five question types, with an on-screen calculator.',
    intro: note('<p>Most test-takers rate Data Insights as the hardest section, and most under-prepare it. The content is not new: it is your Quant and Verbal skills applied to tables, charts and multi-part questions. What is new is the <strong>format</strong> and the <strong>time pressure</strong>. That is good news, because familiarity with formats is quick to build. Learn each question type properly once, then practise under the clock.</p>'),
    lessons: [
      {
        id: 'approach', title: 'How Data Insights works', sub: 'The five types, the calculator and the clock', minutes: 12,
        html:
          '<h2>The five question types</h2>' +
          '<div class="table-wrap"><table><thead><tr><th>Type</th><th>What you see</th><th>Rough time</th></tr></thead><tbody>' +
          '<tr><td><strong>Data Sufficiency</strong></td><td>A question and two statements. Decide whether the statements are enough to answer</td><td>about 2 min</td></tr>' +
          '<tr><td><strong>Two-Part Analysis</strong></td><td>One scenario, two linked answers picked from the same list</td><td>2.5 to 3 min</td></tr>' +
          '<tr><td><strong>Graphics Interpretation</strong></td><td>A chart and two statements completed from drop-down menus</td><td>about 2 min</td></tr>' +
          '<tr><td><strong>Table Analysis</strong></td><td>A sortable table and three statements to judge</td><td>about 2.5 min</td></tr>' +
          '<tr><td><strong>Multi-Source Reasoning</strong></td><td>Two or three tabs of information and a set of questions</td><td>2 to 3 min to read, then about 1.5 min per question</td></tr>' +
          '</tbody></table></div>' +
          '<p>GMAC does not publish how many of each type you will get, and it varies. Prepare all five.</p>' +
          '<h2>Rules that apply to every type</h2><ul>' +
          '<li><strong>No partial credit.</strong> A two-part or three-statement question is right only if every part is right. Precision beats speed.</li>' +
          '<li><strong>Read the question before the data.</strong> Charts and tables hold far more than you need. Know what you are looking for first.</li>' +
          '<li><strong>Understand the display before you calculate:</strong> title, axis labels, units, legend, footnotes. Twenty seconds here prevents most errors.</li>' +
          '<li><strong>Estimate where you can.</strong> Answer options are usually far enough apart.</li></ul>' +
          '<h2>The calculator</h2><p>A basic on-screen calculator is available in this section only. Use it for awkward arithmetic such as 437 &divide; 1,290. Do not use it for anything you can do in your head or estimate: clicking is slow, and the questions are testing judgement, not computation.</p>' +
          note('<p>Timing sinks more Data Insights scores than difficulty does. Some questions are built to absorb five minutes. Decide in the first 30 seconds whether a question is workable. If it is a monster, make your best guess, move on, and spend the time on two questions you can get right. Running out of time with questions unanswered is the most expensive mistake on this test.</p>') +
          '<h2>The order to learn them</h2><p>Start with Data Sufficiency: it is pure reasoning and reuses your Quant. Then Two-Part Analysis and Graphics Interpretation, then Table Analysis and Multi-Source Reasoning. If your Data Insights timing stays poor after you know the formats, the cause is usually underlying Quant or reading speed, so fix it there.</p>'
      },
      {
        id: 'data-sufficiency', title: 'Data Sufficiency', sub: 'Decide whether you could answer; do not answer', minutes: 25,
        html:
          '<p>You get a question and two statements, labelled (1) and (2). You are not asked for the answer. You are asked <strong>whether the statements give enough information to find it</strong>.</p>' +
          '<h2>The answer choices never change. Memorise them.</h2>' +
          '<div class="table-wrap"><table><thead><tr><th></th><th>Meaning</th><th>Memory aid</th></tr></thead><tbody>' +
          '<tr><td><strong>A</strong></td><td>Statement (1) alone is sufficient; statement (2) alone is not</td><td>1 <strong>A</strong>lone</td></tr>' +
          '<tr><td><strong>B</strong></td><td>Statement (2) alone is sufficient; statement (1) alone is not</td><td>2 alone</td></tr>' +
          '<tr><td><strong>C</strong></td><td>Both together are sufficient; neither alone is</td><td><strong>C</strong>ombined</td></tr>' +
          '<tr><td><strong>D</strong></td><td>Each statement alone is sufficient</td><td>Either one (<strong>D</strong>ouble)</td></tr>' +
          '<tr><td><strong>E</strong></td><td>Even together, the statements are not sufficient</td><td><strong>E</strong>ven together, no</td></tr>' +
          '</tbody></table></div>' +
          '<h2>The AD / BCE method</h2><ol class="steps">' +
          '<li><strong>Understand the question</strong> and simplify it if you can. Is it asking for a value or for a yes/no?</li>' +
          '<li><strong>Take statement (1) alone.</strong> Sufficient? Then the answer is A or D. Not sufficient? Then it is B, C or E. Write "AD" or "BCE" on your board.</li>' +
          '<li><strong>Take statement (2) alone.</strong> Forget statement (1) completely. This is the step people get wrong.</li>' +
          '<li><strong>Only if neither works alone,</strong> combine them. Sufficient together is C; still not sufficient is E.</li></ol>' +
          '<h2>What "sufficient" means</h2><ul>' +
          '<li><strong>Value question</strong> ("What is x?"): sufficient means <em>exactly one</em> possible value. Two possible values is not sufficient.</li>' +
          '<li><strong>Yes/no question</strong> ("Is x positive?"): sufficient means the answer is <em>always yes</em> or <em>always no</em>. A definite "no" is sufficient. "Sometimes yes, sometimes no" is not.</li></ul>' +
          ex('Worked example: a value question',
            '<p>What is the value of x?<br>(1) x&sup2; = 16<br>(2) x &lt; 0</p>' +
            '<p>(1) alone: x is 4 or &minus;4. Two values, not sufficient. Cross off A and D.<br>(2) alone: any negative number. Not sufficient. Cross off B.<br>Together: x = &minus;4. One value. The answer is <strong>C</strong>.</p>') +
          ex('Worked example: the "obvious C" trap',
            '<p>What is the value of x + y?<br>(1) 3x + 3y = 21<br>(2) x &minus; y = 1</p>' +
            '<p>Two equations, two unknowns, so C looks obvious. But the question asks only for x + y. Statement (1) alone gives x + y = 7. Statement (2) alone gives nothing about the sum. The answer is <strong>A</strong>.</p>') +
          ex('Worked example: "no" is sufficient',
            '<p>Is the positive integer k a prime number?<br>(1) k &gt; 20<br>(2) k is even</p>' +
            '<p>(1) alone: 23 is prime, 24 is not. Not sufficient.<br>(2) alone: 2 is prime, 4 is not. Not sufficient.<br>Together: an even number above 20 is never prime. The answer is always "no", which is a definite answer. <strong>C</strong>.</p>') +
          note('<p>Stop as soon as you know you <em>could</em> solve it. If a statement gives you one linear equation in one unknown, it is sufficient; you do not need the number. Every calculation you finish in Data Sufficiency is time given away.</p>') +
          '<h2>Traps</h2><ul>' +
          '<li><strong>Carry-over:</strong> using what you learned in (1) while judging (2).</li>' +
          '<li><strong>The easy C:</strong> when the two statements together are obviously enough, check hard whether one of them is enough alone.</li>' +
          '<li><strong>Hidden assumptions:</strong> assuming a number is a positive integer when the question did not say so. Test zero, negatives and fractions.</li>' +
          '<li><strong>Yes/no questions:</strong> try to produce both a yes and a no. If you can, the statement is not sufficient.</li></ul>' +
          '<p>In Data Insights, some Data Sufficiency questions are about real-world situations with little or no maths. The logic and the method are identical.</p>' +
          drill([
            ['Is x &gt; 0?<br>(1) x&sup2; &gt; 0<br>(2) x&sup3; &gt; 0', '(1) is true for negative numbers too, so not sufficient. (2) forces x to be positive: sufficient. <strong>B</strong>.'],
            ['What is the average of a, b and c?<br>(1) a + b + c = 27<br>(2) a = 5', '(1) gives the sum, so the average is 9: sufficient. (2) alone is not. <strong>A</strong>.'],
            ['If n is an integer, is n even?<br>(1) n&sup2; is even<br>(2) 3n is even', 'An integer whose square is even must be even: sufficient. If 3n is even then n must be even: sufficient. <strong>D</strong>.']
          ])
      },
      {
        id: 'two-part', title: 'Two-Part Analysis', sub: 'Two linked answers from one list', minutes: 15,
        html:
          '<p>You read a short scenario and then choose one option in each of two columns. Both columns draw on the same list of options, and both must be right. The same option can be correct for both columns unless the scenario rules that out.</p>' +
          '<h2>Three flavours</h2><ul>' +
          '<li><strong>Quantitative:</strong> two unknowns that satisfy a condition, such as a price and a quantity.</li>' +
          '<li><strong>Verbal:</strong> an argument, with columns such as "strengthens" and "weakens", or "assumption" and "conclusion".</li>' +
          '<li><strong>Logic:</strong> rules for a schedule or selection, with columns such as "must be true" and "cannot be true".</li></ul>' +
          '<h2>Method</h2><ol class="steps">' +
          '<li><strong>Read the column headings first.</strong> They tell you what the two answers are.</li>' +
          '<li><strong>Work out how the two parts are related.</strong> If they are independent, answer them one at a time. If one depends on the other, write the relationship as an equation or a rule.</li>' +
          '<li><strong>Use the options.</strong> There are only five or six. Testing them is often quicker than solving in general.</li>' +
          '<li><strong>Check both answers together</strong> against the scenario before you confirm.</li></ol>' +
          ex('Worked example',
            '<p>A machine produces A units per hour for the first 3 hours of a shift and B units per hour for the next 2 hours, where B is 5 more than A. In those 5 hours it produces 110 units. Select a value for A and a value for B.</p>' +
            '<p>Options: 10, 15, 20, 25, 30</p>' +
            '<p>3A + 2B = 110 and B = A + 5. Substitute: 3A + 2A + 10 = 110, so A = 20 and B = 25. Check: 60 + 50 = 110. <strong>A = 20, B = 25.</strong></p>') +
          note('<p>For verbal Two-Part questions, use the Critical Reasoning method unchanged: find the conclusion and the gap first. The two columns are usually two sides of the same gap.</p>')
      },
      {
        id: 'graphics', title: 'Graphics Interpretation', sub: 'Read the chart before you read the question twice', minutes: 15,
        html:
          '<p>You see one chart, then one or two sentences with drop-down blanks. Choose the option that makes each sentence accurate. Charts include bar and line charts, scatterplots, bubble charts, pie charts and the occasional diagram.</p>' +
          '<h2>Method</h2><ol class="steps">' +
          '<li><strong>Orient yourself (20 to 30 seconds).</strong> Title, what each axis measures, the units, the scale, the legend, any footnote.</li>' +
          '<li><strong>Read the sentence and open the drop-down</strong> so you know how precise you need to be.</li>' +
          '<li><strong>Find the values and estimate.</strong> Options are normally spread out enough that a careful reading of the chart settles it.</li>' +
          '<li><strong>Re-read the completed sentence</strong> to check it says what you mean.</li></ol>' +
          '<h2>What to watch</h2><ul>' +
          '<li><strong>Scales:</strong> an axis that does not start at zero, units in thousands or millions, two different measures on one chart.</li>' +
          '<li><strong>Percent versus amount:</strong> a bigger bar is not a bigger percentage change.</li>' +
          '<li><strong>Percent change:</strong> change &divide; starting value, as in Quant.</li>' +
          '<li><strong>Scatterplots:</strong> points rising to the right show a positive relationship; falling to the right, a negative one. The more tightly they hug a line, the stronger the relationship.</li>' +
          '<li><strong>"Closest to":</strong> an invitation to estimate, not to compute exactly.</li></ul>' +
          ex('Worked example (described)',
            '<p>A bar chart shows a company\'s revenue in millions of euros: 2021: 40, 2022: 50, 2023: 45, 2024: 60.</p>' +
            '<p><em>"From 2023 to 2024, revenue increased by approximately [__] percent."</em> Change 15 on a base of 45 is one third, so about <strong>33</strong>.</p>' +
            '<p><em>"The year with the largest percent increase over the previous year was [__]."</em> 2022: 10/40 = 25%. 2024: 15/45 = 33%. So <strong>2024</strong>.</p>') +
          note('<p>Treat an unfamiliar chart type calmly. Every chart is just two or three measurements shown at once. Find what the horizontal position means, what the vertical position means, and what size or colour means, and you can read anything they show you.</p>')
      },
      {
        id: 'table-analysis', title: 'Table Analysis', sub: 'Sort, count and check every statement', minutes: 12,
        html:
          '<p>You get a table that you can sort by any column, and three statements. For each statement you choose one of two options, such as Yes/No or True/False. All three must be right to earn the point.</p>' +
          '<h2>Method</h2><ol class="steps">' +
          '<li><strong>Read the column headings and units,</strong> and any text above the table. Do not study the numbers yet.</li>' +
          '<li><strong>Take one statement at a time.</strong> Decide which column to sort by to make it easy to check.</li>' +
          '<li><strong>Sort, then count or compare.</strong> Sorting turns "how many are above 50?" into counting rows.</li>' +
          '<li><strong>Be literal.</strong> "At least 3" includes 3. "More than half" of 10 rows means 6 or more.</li></ol>' +
          '<h2>Useful moves</h2><ul>' +
          '<li><strong>Median:</strong> sort by the column and take the middle row (or the average of the two middle rows when the row count is even).</li>' +
          '<li><strong>Range:</strong> sort, then top minus bottom.</li>' +
          '<li><strong>Two conditions:</strong> sort by the first, then scan the second within the group that qualifies.</li>' +
          '<li><strong>Ratios and percents:</strong> this is what the calculator is for.</li></ul>' +
          note('<p>Because one wrong statement loses the whole question, Table Analysis rewards a careful, slightly slower pace. If you find yourself guessing on one of the three statements, you are effectively guessing on the question, so give that statement another 20 seconds before you settle.</p>')
      },
      {
        id: 'multi-source', title: 'Multi-Source Reasoning', sub: 'Know where things are before you need them', minutes: 12,
        html:
          '<p>Information is split across two or three tabs: perhaps an email, a price table and a set of rules. Several questions follow. Some are ordinary multiple choice; others give three statements to judge, like Table Analysis.</p>' +
          '<h2>Method</h2><ol class="steps">' +
          '<li><strong>Skim every tab first</strong> and note in a few words what each one contains: "Tab 1: policy rules. Tab 2: prices by region. Tab 3: manager\'s email with exceptions."</li>' +
          '<li><strong>Do not memorise details.</strong> You are building a map, exactly as in Reading Comprehension.</li>' +
          '<li><strong>For each question, decide which tabs you need,</strong> then go and get the facts.</li>' +
          '<li><strong>Hunt for conditions and exceptions</strong> in the text tabs: "applies only to orders over 500", "excluding weekends". These decide most questions.</li></ol>' +
          '<h2>Timing</h2><p>The reading is an investment that pays off across the whole set. Expect the first question to take longest and the others to be quicker. If the set is going badly, do not let it take more than its share: answer, move on, and protect the rest of the section.</p>' +
          note('<p>Most Multi-Source errors are not calculation errors. They come from answering with one tab when a second tab changes the answer. Before you confirm, ask yourself: "Is there anything in another tab that affects this?"</p>')
      }
    ]
  };
})();
