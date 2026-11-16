/* Original GMAT-style practice questions written for this guide.
   They are warm-up material: for score-accurate practice use official questions.

   Question fields
     id, sec ('Q' | 'V' | 'DI'), type, topic (matches the error-log topics), level (1 easy – 3 hard)
     kind: 'mc'       options[], answer = index
           'ds'       Data Sufficiency: fixed options, answer = index 0–4 (A–E)
           'twopart'  cols[2], options[], answer = [index for column 1, index for column 2]
           'yesno'    labels[2], statements[], answer = [label index per statement]
           'dropdown' text with {0} {1} blanks, blanks[][], answer = [index per blank]
     passage / table / sources / chart: shared material shown above the question
     explain (HTML), takeaway (one line to remember) */
(function () {
  'use strict';
  var G = window.GMAT = window.GMAT || {};
  G.data = G.data || {};

  G.data.dsOptions = [
    'Statement (1) ALONE is sufficient, but statement (2) alone is not sufficient.',
    'Statement (2) ALONE is sufficient, but statement (1) alone is not sufficient.',
    'BOTH statements TOGETHER are sufficient, but NEITHER statement ALONE is sufficient.',
    'EACH statement ALONE is sufficient.',
    'Statements (1) and (2) TOGETHER are NOT sufficient.'
  ];

  G.data.passages = {
    openplan: {
      title: 'Passage: open-plan offices',
      html:
        '<p>When firms first adopted open-plan offices in large numbers, the principal justification was collaborative: removing walls, it was argued, would increase spontaneous conversation among employees and thereby the exchange of ideas. The claim was plausible, and for years it went largely untested. Recent studies that tracked employees\' interactions directly, using wearable sensors rather than self-reports, have complicated the picture. In two firms that moved from enclosed offices to open-plan layouts, face-to-face interaction did not rise; it fell by roughly 70 percent, while the volume of electronic messages increased.</p>' +
        '<p>Researchers have proposed that the result reflects a predictable response to being constantly observable. In an open space, an employee who wishes to concentrate, or to be seen concentrating, has few ways to signal unavailability other than by wearing headphones or avoiding eye contact, and colleagues who would once have knocked on a door instead send a message to avoid disturbing a whole room. On this account, open-plan design does not so much fail to encourage interaction as actively redirect it into less visible channels.</p>' +
        '<p>None of this shows that open offices are without merit. They cost less per employee, and the studies in question examined only two firms over a few months. But the findings do suggest that the architectural argument for collaboration rested on an untested assumption about human behaviour: that proximity alone produces conversation.</p>'
    },
    warning: {
      title: 'Passage: warning colours',
      html:
        '<p>For most of the twentieth century, biologists explained the brilliant colours of many poisonous animals with a simple idea: conspicuous colouring is a warning. A predator that eats a brightly coloured toxic frog and becomes ill learns to avoid that pattern, so the survivors of the frog\'s population benefit. The explanation, however, contained a puzzle that was long overlooked. The first conspicuous individuals in a population of camouflaged animals would have been easy to find, and predators would not yet have learned to avoid them. How, then, could warning colours ever have become common?</p>' +
        '<p>One proposal is that toxicity evolved first and bright colour later, in animals that already survived many attacks because predators released them after tasting them. A second, supported by experiments with birds, is that many predators are innately wary of unfamiliar, vividly coloured prey and need little or no experience to avoid it. If so, the earliest conspicuous individuals may have enjoyed some protection from the start.</p>' +
        '<p>These proposals are not mutually exclusive, and neither has been shown to apply to all warningly coloured species. What they share is a recognition that the traditional account explained why warning colours persist once they are widespread, but not how they became widespread.</p>'
    }
  };

  G.data.tables = {
    offices: {
      title: 'Regional sales offices',
      note: 'Click a column heading to sort.',
      columns: [
        { label: 'Office', type: 'text' },
        { label: 'Employees', type: 'num' },
        { label: 'Revenue (€ million)', type: 'num', dp: 1 },
        { label: 'Rating (out of 5)', type: 'num', dp: 1 },
        { label: 'Opened', type: 'num' }
      ],
      rows: [
        ['Aarhus', 42, 6.3, 4.4, 2012],
        ['Bergen', 28, 3.9, 4.6, 2016],
        ['Cork', 55, 7.7, 3.9, 2009],
        ['Dresden', 36, 6.1, 4.1, 2014],
        ['Espoo', 19, 3.8, 4.7, 2019],
        ['Ghent', 47, 5.2, 3.8, 2011],
        ['Porto', 31, 4.0, 4.3, 2017],
        ['Turku', 24, 4.8, 4.5, 2018]
      ]
    }
  };

  G.data.sourceSets = {
    norden: [
      { title: 'Policy', html:
        '<p><strong>Travel reimbursement policy, Norden Consulting</strong></p>' +
        '<p>Employees are reimbursed for rail travel in standard class. Air travel is reimbursed only for journeys where rail would take more than 4 hours one way.</p>' +
        '<p>Hotel costs are reimbursed up to €140 per night, or up to €180 per night in cities on the high-cost list. Meals are reimbursed up to €45 per day.</p>' +
        '<p>Any claim above these limits requires written approval from a director before the trip.</p>' },
      { title: 'Cities', html:
        '<div class="table-wrap"><table><thead><tr><th>City</th><th>Rail time from head office (one way)</th><th>On high-cost list?</th></tr></thead><tbody>' +
        '<tr><td>Hamburg</td><td>2 h 30 min</td><td>No</td></tr>' +
        '<tr><td>Munich</td><td>4 h 45 min</td><td>Yes</td></tr>' +
        '<tr><td>Cologne</td><td>3 h 50 min</td><td>No</td></tr>' +
        '<tr><td>Zurich</td><td>6 h 10 min</td><td>Yes</td></tr>' +
        '<tr><td>Leipzig</td><td>1 h 15 min</td><td>No</td></tr>' +
        '</tbody></table></div>' },
      { title: 'Email', html:
        '<p><strong>From:</strong> Ingrid, Finance<br><strong>To:</strong> All consultants</p>' +
        '<p>Two reminders about travel claims.</p>' +
        '<p>First, from 1 March, Cologne is added to the high-cost list because of the trade-fair season. This applies to stays up to and including 30 June.</p>' +
        '<p>Second, the meal limit does not apply on days when a client provides meals. On those days, no meal reimbursement can be claimed.</p>' }
    ]
  };

  G.data.charts = {
    museum: {
      type: 'bar', title: 'Monthly visitors to a city museum', yLabel: 'Visitors (thousands)',
      categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'], values: [24, 30, 36, 48, 54, 45],
      yMax: 60, yStep: 10, unit: ' thousand'
    },
    stores: {
      type: 'scatter', title: 'Advertising spend and units sold, ten stores', xLabel: 'Advertising spend (€ thousand)', yLabel: 'Units sold',
      points: [[10, 200], [15, 320], [20, 300], [25, 450], [30, 520], [35, 480], [42, 520], [45, 700], [50, 540], [55, 820]],
      xMax: 60, xStep: 10, yMax: 900, yStep: 100
    }
  };

  G.data.questions = [
    /* ------------------------------ QUANT ------------------------------ */
    { id: 'q01', sec: 'Q', type: 'Problem Solving', topic: 'Fractions, percents, ratios', level: 1, kind: 'mc',
      prompt: 'A shop buys a coat, marks it up by 40 percent over cost, and later sells it at a 25 percent discount from the marked price. The shop\'s profit on the coat is what percent of its cost?',
      options: ['5%', '10%', '15%', '20%', '25%'], answer: 0,
      explain: '<p>Let the cost be 100. Marked price = 140. A 25% discount takes off 35, so the sale price is 105. Profit = 5 on a cost of 100: <strong>5%</strong>.</p><p>With multipliers: 1.40 &times; 0.75 = 1.05.</p><p>The trap is 15% (40 &minus; 25): successive percent changes multiply, they do not subtract.</p>',
      takeaway: 'No amounts given in a percent question? Start from 100 and use multipliers.' },

    { id: 'q02', sec: 'Q', type: 'Problem Solving', topic: 'Fractions, percents, ratios', level: 2, kind: 'mc',
      prompt: 'In a class, the ratio of boys to girls is 4 to 5. After 6 girls leave the class, the ratio of boys to girls is 4 to 3. How many students were in the class originally?',
      options: ['18', '27', '36', '45', '54'], answer: 1,
      explain: '<p>Boys = 4x, girls = 5x. After 6 girls leave: 4x / (5x &minus; 6) = 4/3.</p><p>Cross-multiply: 12x = 20x &minus; 24, so x = 3. Originally 4(3) + 5(3) = <strong>27</strong> students.</p><p>Check: 12 boys and 15 girls; after 6 girls leave, 12 to 9 = 4 to 3.</p>',
      takeaway: 'Turn a ratio into real amounts with an unknown multiplier (4x and 5x).' },

    { id: 'q03', sec: 'Q', type: 'Problem Solving', topic: 'Exponents and roots', level: 2, kind: 'mc',
      prompt: 'If 4<sup>x+1</sup> &minus; 4<sup>x</sup> = 192, what is the value of x?',
      options: ['2', '3', '4', '5', '6'], answer: 1,
      explain: '<p>Factor out 4<sup>x</sup>: 4<sup>x</sup>(4 &minus; 1) = 192, so 4<sup>x</sup> = 64 = 4<sup>3</sup>. Therefore <strong>x = 3</strong>.</p><p>Backsolving also works: x = 3 gives 256 &minus; 64 = 192.</p>',
      takeaway: 'Exponents joined by plus or minus: factor out the smaller power.' },

    { id: 'q04', sec: 'Q', type: 'Problem Solving', topic: 'Algebra and equations', level: 1, kind: 'mc',
      prompt: 'A theatre sold 50 tickets for a total of $475. Adult tickets cost $12 each and child tickets cost $7 each. How many adult tickets were sold?',
      options: ['15', '20', '25', '30', '35'], answer: 2,
      explain: '<p>Let a be the number of adult tickets. 12a + 7(50 &minus; a) = 475, so 5a + 350 = 475 and <strong>a = 25</strong>.</p><p>Backsolving from the middle choice: 25 adults = $300, 25 children = $175, total $475. First try.</p>',
      takeaway: 'Plain-number choices and one unknown: try the middle choice first.' },

    { id: 'q05', sec: 'Q', type: 'Problem Solving', topic: 'Inequalities and absolute value', level: 3, kind: 'mc',
      prompt: 'If &minus;2 &lt; x &lt; 5 and 3 &lt; y &lt; 8, what is the greatest possible integer value of x &minus; y?',
      options: ['&minus;1', '0', '1', '2', '3'], answer: 2,
      explain: '<p>x &minus; y is largest when x is as large as possible and y as small as possible. x can approach 5 and y can approach 3, so x &minus; y can approach 2 but never reach it.</p><p>x and y need not be integers (for example x = 4.9, y = 3.1 gives 1.8), so x &minus; y can be any value below 2. The greatest <em>integer</em> value is <strong>1</strong>.</p><p>The trap is 2, which ignores that the inequalities are strict.</p>',
      takeaway: 'To maximise a difference, pair the largest of one with the smallest of the other, and respect strict inequalities.' },

    { id: 'q06', sec: 'Q', type: 'Problem Solving', topic: 'Rates and work', level: 2, kind: 'mc',
      prompt: 'Two trains start 300 kilometres apart and travel towards each other on parallel tracks, one at 70 kilometres per hour and the other at 80 kilometres per hour. After how many hours will the trains first be 75 kilometres apart?',
      options: ['1', '1.5', '2', '2.5', '3'], answer: 1,
      explain: '<p>Travelling towards each other, the gap closes at 70 + 80 = 150 km/h. The gap must shrink from 300 to 75, a reduction of 225 km.</p><p>225 &divide; 150 = <strong>1.5 hours</strong>.</p>',
      takeaway: 'Moving towards each other: add the speeds and work with the gap.' },

    { id: 'q07', sec: 'Q', type: 'Problem Solving', topic: 'Rates and work', level: 3, kind: 'mc',
      prompt: 'Pump A can fill an empty tank in 10 hours and pump B can fill it in 15 hours. Both pumps run together for 3 hours, and then pump A is switched off. How many more hours does pump B need to finish filling the tank?',
      options: ['5', '6', '7.5', '9', '10'], answer: 2,
      explain: '<p>Rates: A fills 1/10 of the tank per hour, B fills 1/15. Together: 1/10 + 1/15 = 1/6 per hour.</p><p>In 3 hours they fill 3 &times; 1/6 = 1/2. The remaining 1/2 at B\'s rate of 1/15 per hour takes (1/2) &divide; (1/15) = <strong>7.5 hours</strong>.</p>',
      takeaway: 'Work problems: convert times to rates, add rates, and track the fraction of the job done.' },

    { id: 'q08', sec: 'Q', type: 'Problem Solving', topic: 'Number properties', level: 2, kind: 'mc',
      prompt: 'When the positive integer n is divided by 6, the remainder is 4. What is the remainder when 3n is divided by 9?',
      options: ['0', '1', '3', '4', '6'], answer: 2,
      explain: '<p>Write n = 6k + 4. Then 3n = 18k + 12. Since 18k is a multiple of 9, the remainder is that of 12 divided by 9, which is <strong>3</strong>.</p><p>Or test numbers: n = 4 gives 3n = 12, remainder 3. n = 10 gives 30, remainder 3.</p>',
      takeaway: 'Remainder questions: write n = (divisor)k + remainder, or simply test two values.' },

    { id: 'q09', sec: 'Q', type: 'Problem Solving', topic: 'Number properties', level: 2, kind: 'mc',
      prompt: 'How many positive integers less than 100 are divisible by 3 but not by 2?',
      options: ['16', '17', '25', '33', '34'], answer: 1,
      explain: '<p>Multiples of 3 below 100: 3, 6, ..., 99. That is 33 numbers.</p><p>Those also divisible by 2 are the multiples of 6: 6, 12, ..., 96. That is 16 numbers.</p><p>33 &minus; 16 = <strong>17</strong>.</p>',
      takeaway: '"Divisible by A but not B": count the multiples of A, then remove the multiples of both.' },

    { id: 'q10', sec: 'Q', type: 'Problem Solving', topic: 'Statistics', level: 3, kind: 'mc',
      prompt: 'A list consists of 7 different positive integers. The average (arithmetic mean) of the list is 10 and the median is 9. What is the greatest possible value of the largest integer in the list?',
      options: ['28', '30', '32', '34', '36'], answer: 3,
      explain: '<p>The sum is 7 &times; 10 = 70. To make the largest number as big as possible, make the other six as small as possible.</p><p>The three numbers below the median: 1, 2, 3. The median: 9. The two numbers between the median and the largest must be different integers above 9: 10 and 11.</p><p>Those six add up to 36, so the largest is 70 &minus; 36 = <strong>34</strong>.</p>',
      takeaway: 'To maximise one value in a list with a fixed sum, minimise all the others within the rules.' },

    { id: 'q11', sec: 'Q', type: 'Problem Solving', topic: 'Statistics', level: 1, kind: 'mc',
      prompt: 'A student\'s average (arithmetic mean) score on 4 tests is 82. What score does the student need on a fifth test for the average of all 5 tests to be 85?',
      options: ['88', '91', '94', '97', '100'], answer: 3,
      explain: '<p>Required total for 5 tests: 5 &times; 85 = 425. Current total: 4 &times; 82 = 328.</p><p>Fifth score = 425 &minus; 328 = <strong>97</strong>.</p>',
      takeaway: 'Average questions: convert to sums (sum = mean × count).' },

    { id: 'q12', sec: 'Q', type: 'Problem Solving', topic: 'Counting and probability', level: 2, kind: 'mc',
      prompt: 'A box contains 4 red balls and 6 green balls. Two balls are drawn at random without replacement. What is the probability that the two balls are different colours?',
      options: ['4/15', '2/5', '7/15', '8/15', '3/5'], answer: 3,
      explain: '<p>Red then green: 4/10 &times; 6/9 = 24/90. Green then red: 6/10 &times; 4/9 = 24/90.</p><p>Total: 48/90 = <strong>8/15</strong>.</p><p>The trap is 4/15, which counts only one of the two orders.</p>',
      takeaway: 'When order is not specified, add up every order that gives the outcome.' },

    { id: 'q13', sec: 'Q', type: 'Problem Solving', topic: 'Counting and probability', level: 2, kind: 'mc',
      prompt: 'A project team of 2 analysts and 1 manager is to be chosen from 5 analysts and 3 managers. How many different teams are possible?',
      options: ['13', '15', '30', '45', '60'], answer: 2,
      explain: '<p>Choose 2 analysts from 5: (5 &times; 4) &divide; 2 = 10 ways. Choose 1 manager from 3: 3 ways.</p><p>10 &times; 3 = <strong>30</strong> teams.</p><p>60 would be right only if the order of the two analysts mattered. In a team it does not.</p>',
      takeaway: 'Ask first whether order matters. A team is a selection, not an arrangement.' },

    { id: 'q14', sec: 'Q', type: 'Problem Solving', topic: 'Sets and mixtures', level: 2, kind: 'mc',
      prompt: 'In a survey of 200 people, 120 said they like tea, 90 said they like coffee, and 30 said they like neither. How many of the people surveyed like tea but not coffee?',
      options: ['30', '40', '80', '90', '120'], answer: 2,
      explain: '<p>People who like at least one: 200 &minus; 30 = 170.</p><p>Both = 120 + 90 &minus; 170 = 40.</p><p>Tea but not coffee = 120 &minus; 40 = <strong>80</strong>.</p><p>40 is the trap: it answers "how many like both?"</p>',
      takeaway: 'Total = A + B − Both + Neither. Then re-read exactly which group was asked for.' },

    { id: 'q15', sec: 'Q', type: 'Problem Solving', topic: 'Fractions, percents, ratios', level: 2, kind: 'mc',
      prompt: 'If x is 20 percent less than y, and y is 25 percent greater than z, then x is what percent of z?',
      options: ['80%', '95%', '100%', '105%', '125%'], answer: 2,
      explain: '<p>Let z = 100. Then y = 125, and x is 20% less than 125, which is 100.</p><p>So x is <strong>100%</strong> of z. In multipliers: 0.8 &times; 1.25 = 1.</p>',
      takeaway: 'A 25% rise is undone by a 20% fall, because the second percent is taken of a bigger number.' },

    { id: 'q16', sec: 'Q', type: 'Problem Solving', topic: 'Algebra and equations', level: 2, kind: 'mc',
      prompt: 'If x&sup2; &minus; 6x + 8 = 0 and x&sup2; &minus; 3x &minus; 4 = 0, what is the value of x?',
      options: ['&minus;1', '1', '2', '4', '8'], answer: 3,
      explain: '<p>First equation: (x &minus; 2)(x &minus; 4) = 0, so x = 2 or 4.</p><p>Second equation: (x &minus; 4)(x + 1) = 0, so x = 4 or &minus;1.</p><p>The only value satisfying both is <strong>x = 4</strong>.</p>',
      takeaway: 'A quadratic gives two candidates; a second condition tells you which one survives.' },

    /* ------------------------------ VERBAL: CRITICAL REASONING ------------------------------ */
    { id: 'v01', sec: 'V', type: 'Critical Reasoning', topic: 'CR: weaken', level: 2, kind: 'mc',
      stim: '<p>A regional supermarket chain introduced self-checkout machines in half of its stores. Over the following six months, reported theft losses in those stores rose by 30 percent, while reported losses in the stores without the machines were unchanged. Management concluded that customers steal more at self-checkout machines, and it plans to remove them.</p>',
      prompt: 'Which of the following, if true, most seriously weakens management\'s conclusion?',
      options: [
        'Self-checkout machines cost less to operate than staffed checkouts.',
        'The stores that received the machines were those with the most customers.',
        'When the machines were installed, those stores also adopted a new inventory system that records losses from spoilage and damage as theft.',
        'Some customers say that they prefer staffed checkouts.',
        'Theft losses at the chain\'s main competitor also rose during the same period.'
      ], answer: 2,
      explain: '<p><strong>Conclusion:</strong> the machines caused more theft. <strong>Evidence:</strong> reported theft losses rose only in stores with machines. <strong>Gap:</strong> something else that changed in those stores could explain the rise in <em>reported</em> losses.</p><p><strong>(C)</strong> gives exactly that: a new recording system that relabels other losses as theft. The figures could rise with no change in actual theft.</p><p>(A) and (D) are about cost and preference, not theft. (B) describes the stores but does not explain a rise over time. (E) is about a different company, and the chain\'s own machine-free stores already serve as the comparison.</p>',
      takeaway: 'For a causal conclusion, look for another explanation for the same evidence.' },

    { id: 'v02', sec: 'V', type: 'Critical Reasoning', topic: 'CR: strengthen', level: 2, kind: 'mc',
      stim: '<p>An online retailer of running shoes found that customers who used its new "virtual fitting" tool returned 40 percent fewer shoes than customers who did not use it. The retailer concluded that the tool helps customers choose the right size, and it plans to promote the tool to all shoppers in order to reduce returns.</p>',
      prompt: 'Which of the following, if true, most strengthens the retailer\'s conclusion?',
      options: [
        'The tool was expensive to develop.',
        'Customers who used the tool were mostly repeat buyers who already knew their size in the retailer\'s shoes.',
        'In a trial, shoppers who were randomly assigned to use the tool returned far fewer shoes than shoppers randomly assigned not to use it.',
        'Returns are costly for online retailers in general.',
        'Some customers who used the tool bought more than one pair of shoes.'
      ], answer: 2,
      explain: '<p><strong>Gap:</strong> the customers who chose to use the tool may differ from those who did not. Perhaps careful shoppers both use tools and return less.</p><p><strong>(C)</strong> closes that gap. With random assignment, the two groups are alike except for the tool, so the lower return rate is much more likely to be caused by it.</p><p>(B) does the opposite: it offers another reason for the low returns, which weakens the argument. (A), (D) and (E) do not bear on whether the tool reduces returns.</p>',
      takeaway: 'When people select themselves into a group, the group may differ in other ways. Random assignment removes that worry.' },

    { id: 'v03', sec: 'V', type: 'Critical Reasoning', topic: 'CR: assumption', level: 1, kind: 'mc',
      stim: '<p>The council of Greenfield plans to reduce traffic congestion in the town centre by building a 500-space car park at the edge of town, with a free shuttle bus to the centre. Since drivers will no longer need to bring their cars into the centre, the council argues, congestion there will fall.</p>',
      prompt: 'The council\'s argument depends on which of the following assumptions?',
      options: [
        'The car park will cost less to build than widening the roads in the centre.',
        'A substantial number of drivers who now drive into the centre will choose to use the car park and shuttle instead.',
        'The shuttle bus will be powered by electricity.',
        'Congestion is the most serious problem facing the town.',
        'No town of similar size has built such a car park before.'
      ], answer: 1,
      explain: '<p>The plan gives drivers an <em>option</em>. The conclusion needs them to <em>take</em> it.</p><p>Negate <strong>(B)</strong>: "Few drivers will choose the car park and shuttle." Then congestion will not fall, and the argument collapses. That makes (B) a necessary assumption.</p><p>(A) and (D) concern whether the plan is the best use of money, not whether it will work. (C) and (E) are irrelevant to congestion.</p>',
      takeaway: 'Plans assume people will actually behave as the plan needs. Use the negation test to confirm an assumption.' },

    { id: 'v04', sec: 'V', type: 'Critical Reasoning', topic: 'CR: inference', level: 2, kind: 'mc',
      stim: '<p>At Halden Manufacturing, every employee who works in the paint shop has completed the chemical-safety course. No employee hired in the last year has completed that course. Some employees hired in the last year work in the warehouse.</p>',
      prompt: 'If the statements above are true, which of the following must also be true?',
      options: [
        'No employee hired in the last year works in the paint shop.',
        'All warehouse employees were hired in the last year.',
        'Every employee who has completed the chemical-safety course works in the paint shop.',
        'Some warehouse employees have completed the chemical-safety course.',
        'The paint shop has fewer employees than the warehouse.'
      ], answer: 0,
      explain: '<p>Everyone in the paint shop has completed the course. Nobody hired in the last year has. So nobody hired in the last year can be in the paint shop: <strong>(A)</strong> is proved.</p><p>(B) turns "some" into "all". (C) reverses the first statement: course completers could work anywhere. (D) and (E) are not supported by anything stated.</p>',
      takeaway: 'Inference answers must be proved by the text. Watch for reversed statements and "some" becoming "all".' },

    { id: 'v05', sec: 'V', type: 'Critical Reasoning', topic: 'CR: explain a discrepancy', level: 2, kind: 'mc',
      stim: '<p>To reduce sugar consumption, a country\'s government doubled its tax on sugary drinks. In the following year, sales of sugary drinks fell by 20 percent. Yet dietary surveys showed that average sugar consumption per person did not decline.</p>',
      prompt: 'Which of the following, if true, most helps to explain why sugar consumption did not decline?',
      options: [
        'The tax raised more revenue than the government had forecast.',
        'Many consumers who cut back on sugary drinks bought more sweets, pastries and other sugary foods that were not taxed.',
        'Sales of sugary drinks had already been falling slowly before the tax was increased.',
        'Some shops absorbed part of the tax instead of raising their prices.',
        'Sugar-free drinks became more widely available during the year.'
      ], answer: 1,
      explain: '<p>Two facts need to stand together: fewer sugary drinks were sold, <em>and</em> total sugar consumption did not fall.</p><p><strong>(B)</strong> reconciles them: the sugar simply came from other foods.</p><p>(C), (D) and (E) relate to why drink sales changed, but none explains where the missing reduction in sugar went. (A) is about revenue.</p>',
      takeaway: 'In a paradox question, the right answer must make both facts true at once.' },

    { id: 'v06', sec: 'V', type: 'Critical Reasoning', topic: 'CR: evaluate', level: 2, kind: 'mc',
      stim: '<p>A logistics firm replaced its diesel delivery vans with electric models. In the first year after the switch, the firm\'s total spending on energy for the fleet (fuel before, electricity after) fell by 35 percent. The firm\'s director claims that this shows the electric vans cost less per kilometre to power than the diesel vans did.</p>',
      prompt: 'Which of the following would be most useful to know in order to evaluate the director\'s claim?',
      options: [
        'Whether the drivers prefer the electric vans',
        'Whether the fleet covered a similar total distance in the year after the switch as in the year before',
        'Whether other logistics firms plan to switch to electric vans',
        'Whether the electric vans were made by the same manufacturer as the diesel vans',
        'Whether the firm changed the prices it charges for deliveries'
      ], answer: 1,
      explain: '<p>The evidence is about <em>total</em> spending; the claim is about cost <em>per kilometre</em>. The link between them is distance.</p><p><strong>(B):</strong> if distance was similar, the claim is supported. If the vans drove far fewer kilometres, total spending could fall with no saving per kilometre. The answer matters either way, which is the test for an evaluate question.</p><p>The other choices would not change our view of the cost per kilometre whichever way they were answered.</p>',
      takeaway: 'Evaluate questions: the right answer swings the argument one way if "yes" and the other way if "no".' },

    { id: 'v07', sec: 'V', type: 'Critical Reasoning', topic: 'CR: boldface or structure', level: 1, kind: 'mc',
      stim: '<p>A survey of members of the city\'s largest cycling club found that 85 percent favour converting one lane of the main avenue into a protected bicycle lane. The club\'s president argues that the city should go ahead with the conversion, since the survey shows that it has the support of most residents.</p>',
      prompt: 'The president\'s reasoning is most vulnerable to the criticism that it',
      options: [
        'treats the opinions of a group that is unlikely to be representative as though they were the opinions of the whole population',
        'assumes that what is true of a whole must be true of each of its parts',
        'attacks the motives of those who oppose the conversion',
        'mistakes an effect of the conversion for its cause',
        'uses a key term in two different senses'
      ], answer: 0,
      explain: '<p>The evidence is about cycling-club members. The conclusion is about residents in general. Cyclists are an obviously unrepresentative sample on a question about bicycle lanes: <strong>(A)</strong>.</p><p>The other choices describe real reasoning flaws, but not ones this argument commits.</p>',
      takeaway: 'Whenever a survey appears, ask: is the group surveyed typical of the group in the conclusion?' },

    { id: 'v08', sec: 'V', type: 'Critical Reasoning', topic: 'CR: weaken', level: 3, kind: 'mc',
      stim: '<p>In 2015, 8 percent of the new cars sold in Norvalia were electric. In 2025, the figure was 40 percent. An analyst concludes that Norvalians bought far more new electric cars in 2025 than in 2015.</p>',
      prompt: 'Which of the following, if true, most seriously weakens the analyst\'s conclusion?',
      options: [
        'Electric cars cost more than petrol cars in Norvalia in both years.',
        'The number of public charging stations in Norvalia grew tenfold between 2015 and 2025.',
        'The total number of new cars sold in Norvalia in 2025 was less than one-fifth of the number sold in 2015.',
        'In several neighbouring countries, the share of electric cars rose by less than it did in Norvalia.',
        'Some Norvalians who bought an electric car in 2015 bought another one in 2025.'
      ], answer: 2,
      explain: '<p>The evidence is a <em>percentage</em>; the conclusion is about a <em>number</em>. A share of 40% is five times a share of 8%, but only if the totals are comparable.</p><p><strong>(C):</strong> if 2025 sales were under one-fifth of 2015 sales, then 40% of that small total is less than 8% of the original total. Fewer electric cars were sold, not more.</p><p>(B) fits the analyst\'s story. (A), (D) and (E) leave the number of electric cars sold untouched.</p>',
      takeaway: 'A bigger percentage is not a bigger number unless you know the totals.' },

    /* ------------------------------ VERBAL: READING COMPREHENSION ------------------------------ */
    { id: 'v09', sec: 'V', type: 'Reading Comprehension', topic: 'RC: main idea', level: 2, kind: 'mc', passage: 'openplan',
      prompt: 'The primary purpose of the passage is to',
      options: [
        'argue that firms should abandon open-plan offices',
        'describe evidence that challenges a common justification for open-plan offices and consider an explanation for it',
        'compare the costs of open-plan and enclosed offices',
        'explain how wearable sensors have changed the study of workplaces',
        'defend open-plan offices against recent criticism'
      ], answer: 1,
      explain: '<p>Map: the collaborative justification &rarr; studies showing interaction fell &rarr; a proposed explanation &rarr; a caveat and what the findings suggest.</p><p><strong>(B)</strong> covers all of that. (A) goes too far: the last paragraph says the findings do not show open offices lack merit. (C) and (D) pick up details. (E) is the opposite of the passage\'s direction.</p>',
      takeaway: 'A primary-purpose answer must fit the whole passage and claim no more than the author does.' },

    { id: 'v10', sec: 'V', type: 'Reading Comprehension', topic: 'RC: detail', level: 1, kind: 'mc', passage: 'openplan',
      prompt: 'According to the passage, the recent studies were distinctive in that they',
      options: [
        'relied on employees\' own reports of their interactions',
        'measured employees\' interactions directly',
        'examined a large number of firms over several years',
        'were commissioned by firms that use enclosed offices',
        'focused on the cost of office space per employee'
      ], answer: 1,
      explain: '<p>The passage says the studies "tracked employees\' interactions directly, using wearable sensors rather than self-reports". That is <strong>(B)</strong>.</p><p>(A) is the reverse. (C) contradicts "only two firms over a few months". (D) is never mentioned. (E) confuses the studies with the author\'s later remark about cost.</p>',
      takeaway: 'Detail questions: find the line. The answer is a paraphrase of it.' },

    { id: 'v11', sec: 'V', type: 'Reading Comprehension', topic: 'RC: inference', level: 2, kind: 'mc', passage: 'openplan',
      prompt: 'The passage suggests that, after a move to an open-plan layout, an employee with a quick question for a colleague would most likely',
      options: [
        'walk over and ask in person, since the colleague is nearby',
        'wait until the next scheduled meeting',
        'send an electronic message in order not to disturb others',
        'ask a manager to pass the question on',
        'decide not to ask the question at all'
      ], answer: 2,
      explain: '<p>The second paragraph says that colleagues "who would once have knocked on a door instead send a message to avoid disturbing a whole room", and the first says electronic messages increased. <strong>(C)</strong> follows directly.</p><p>(A) is what the original justification predicted, and what the studies contradicted. The other choices have no support in the text.</p>',
      takeaway: 'RC inferences are small steps from stated lines, never leaps.' },

    { id: 'v12', sec: 'V', type: 'Reading Comprehension', topic: 'RC: function or tone', level: 2, kind: 'mc', passage: 'openplan',
      prompt: 'The author mentions that open offices "cost less per employee" primarily in order to',
      options: [
        'show that the studies\' findings are mistaken',
        'acknowledge that the findings do not settle whether open offices are worthwhile',
        'explain why face-to-face interaction fell',
        'suggest that firms care more about money than about collaboration',
        'introduce a new argument for collaboration'
      ], answer: 1,
      explain: '<p>The sentence follows "None of this shows that open offices are without merit." The cost point is a concession: there may be other good reasons for open offices, even if the collaboration argument is weak. That is <strong>(B)</strong>.</p><p>The author does not dispute the findings (A), is not explaining the fall (C), and makes no accusation about firms\' motives (D).</p>',
      takeaway: 'Function questions: read the sentence before and after to see what job the detail is doing.' },

    { id: 'v13', sec: 'V', type: 'Reading Comprehension', topic: 'RC: main idea', level: 2, kind: 'mc', passage: 'warning',
      prompt: 'Which of the following best states the main point of the passage?',
      options: [
        'Warning colours do not in fact protect poisonous animals from predators.',
        'The traditional explanation of warning colours left unexplained how such colours first spread, and researchers have proposed ways to fill that gap.',
        'Experiments with birds have proved that predators avoid bright colours by instinct.',
        'Toxicity must always evolve before bright colouring does.',
        'Twentieth-century biologists neglected the study of poisonous animals.'
      ], answer: 1,
      explain: '<p>Map: the traditional idea &rarr; the overlooked puzzle (how could it start?) &rarr; two proposals &rarr; what they have in common.</p><p><strong>(B)</strong> matches. (A) contradicts the passage, which accepts that warning colours work once common. (C) and (D) each overstate one proposal ("proved", "must always"). (E) is not claimed.</p>',
      takeaway: 'Reject main-point answers that are stronger than the passage: "proved", "always", "never".' },

    { id: 'v14', sec: 'V', type: 'Reading Comprehension', topic: 'RC: detail', level: 1, kind: 'mc', passage: 'warning',
      prompt: 'According to the passage, the "puzzle" in the traditional explanation is that',
      options: [
        'some brightly coloured animals are not poisonous',
        'predators that become ill do not always learn from the experience',
        'the first brightly coloured individuals would have been easy for predators to find before predators had learned to avoid them',
        'camouflage is a more effective defence than toxicity',
        'birds are not the main predators of poisonous frogs'
      ], answer: 2,
      explain: '<p>The passage states the puzzle directly: the first conspicuous individuals "would have been easy to find, and predators would not yet have learned to avoid them". That is <strong>(C)</strong>.</p><p>None of the other choices is mentioned.</p>',
      takeaway: 'When a question quotes a word from the passage, go to that word and read the sentences around it.' },

    { id: 'v15', sec: 'V', type: 'Reading Comprehension', topic: 'RC: inference', level: 3, kind: 'mc', passage: 'warning',
      prompt: 'It can be inferred that the author would most likely agree with which of the following statements about the two proposals described in the second paragraph?',
      options: [
        'Only one of them can be correct.',
        'Both have been confirmed for all warningly coloured species.',
        'Each could be correct for at least some species.',
        'Neither is compatible with the traditional explanation.',
        'The second has been disproved by experiments with birds.'
      ], answer: 2,
      explain: '<p>The last paragraph says the proposals "are not mutually exclusive, and neither has been shown to apply to all warningly coloured species". So both could hold, each for some species: <strong>(C)</strong>.</p><p>(A) contradicts "not mutually exclusive". (B) contradicts "neither has been shown to apply to all". (D) is wrong because both proposals supplement the traditional account. (E) reverses the passage: the bird experiments <em>support</em> the second proposal.</p>',
      takeaway: 'For "the author would agree" questions, find the author\'s own evaluative sentence and stay close to its wording.' },

    /* ------------------------------ DATA INSIGHTS: DATA SUFFICIENCY ------------------------------ */
    { id: 'd01', sec: 'DI', type: 'Data Sufficiency', topic: 'Data Sufficiency', level: 1, kind: 'ds',
      prompt: 'Yesterday a stationery shop sold only pens and notebooks. How many pens did it sell?<br><br>(1) It sold 40 items in total.<br>(2) It sold three times as many pens as notebooks.',
      answer: 2,
      explain: '<p>(1) alone: p + n = 40 has many solutions. Not sufficient.</p><p>(2) alone: p = 3n has many solutions. Not sufficient.</p><p>Together: 3n + n = 40, so n = 10 and p = 30. One value. <strong>C</strong>.</p>',
      takeaway: 'Two different linear facts about two unknowns pin them down; one fact alone does not.' },

    { id: 'd02', sec: 'DI', type: 'Data Sufficiency', topic: 'Data Sufficiency', level: 2, kind: 'ds',
      prompt: 'Is xy &gt; 0?<br><br>(1) x &gt; 0<br>(2) y&sup2; &gt; 0',
      answer: 4,
      explain: '<p>(1) alone: we know nothing about y. Not sufficient.</p><p>(2) alone: this only tells us y is not zero. Nothing about x. Not sufficient.</p><p>Together: x is positive and y is non-zero, but y could be positive (xy &gt; 0) or negative (xy &lt; 0). Still both answers possible. <strong>E</strong>.</p>',
      takeaway: 'A square being positive tells you only that the number is not zero; it says nothing about the sign.' },

    { id: 'd03', sec: 'DI', type: 'Data Sufficiency', topic: 'Data Sufficiency', level: 2, kind: 'ds',
      prompt: 'What percent of the employees at Company X are managers?<br><br>(1) The ratio of managers to non-managers at Company X is 1 to 4.<br>(2) Company X has 60 more non-managers than managers.',
      answer: 0,
      explain: '<p>(1) alone: 1 part managers to 4 parts non-managers means managers are 1/5 of all employees: 20%. Sufficient.</p><p>(2) alone: a difference of 60 fits many companies (10 and 70, or 100 and 160). Not sufficient.</p><p><strong>A</strong>. Note that the question asked for a percent, so a ratio was enough; no actual headcount was needed.</p>',
      takeaway: 'A ratio answers percent and fraction questions on its own. Actual counts are needed only for actual amounts.' },

    { id: 'd04', sec: 'DI', type: 'Data Sufficiency', topic: 'Data Sufficiency', level: 2, kind: 'ds',
      prompt: 'If x is a positive number, what is the value of x?<br><br>(1) x&sup2; = 25<br>(2) x&sup2; &minus; 5x = 0',
      answer: 3,
      explain: '<p>(1) alone: x = 5 or &minus;5. The question says x is positive, so x = 5. Sufficient.</p><p>(2) alone: x(x &minus; 5) = 0, so x = 0 or 5. Zero is not positive, so x = 5. Sufficient.</p><p><strong>D</strong>. The condition in the question stem did the work in both statements.</p>',
      takeaway: 'Conditions given in the question stem apply to both statements. Do not forget them.' },

    { id: 'd05', sec: 'DI', type: 'Data Sufficiency', topic: 'Data Sufficiency', level: 2, kind: 'ds',
      prompt: 'Is the average (arithmetic mean) of the five numbers in list L greater than 20?<br><br>(1) The median of the numbers in L is 25.<br>(2) The sum of the numbers in L is 110.',
      answer: 1,
      explain: '<p>(1) alone: the median fixes only the middle number. The list could be 25, 25, 25, 25, 25 (mean 25) or &minus;500, 0, 25, 26, 27 (mean far below 20). Not sufficient.</p><p>(2) alone: mean = 110 &divide; 5 = 22, which is greater than 20. Sufficient.</p><p><strong>B</strong>.</p>',
      takeaway: 'The median tells you about one position; the mean depends on the sum.' },

    { id: 'd06', sec: 'DI', type: 'Data Sufficiency', topic: 'Data Sufficiency', level: 1, kind: 'ds',
      prompt: 'A company awards a bonus to every sales representative who met both the revenue target and the customer-satisfaction target this year, and to no one else. Did Marco, a sales representative, receive a bonus?<br><br>(1) Marco exceeded the revenue target by 15 percent.<br>(2) Marco was one of three representatives who failed to meet the customer-satisfaction target.',
      answer: 1,
      explain: '<p>(1) alone: he met one of the two conditions; we do not know about the other. Not sufficient.</p><p>(2) alone: he failed one of the two required conditions, so he definitely did not receive a bonus. The answer is a definite "no", which is sufficient.</p><p><strong>B</strong>.</p>',
      takeaway: 'A definite "no" is just as sufficient as a definite "yes".' },

    /* ------------------------------ DATA INSIGHTS: TWO-PART ANALYSIS ------------------------------ */
    { id: 'd07', sec: 'DI', type: 'Two-Part Analysis', topic: 'Two-Part Analysis', level: 2, kind: 'twopart',
      stim: '<p>A subscription service charges a one-time sign-up fee of F dollars and a fee of M dollars for each month of membership. A customer who stays for 6 months pays $150 in total, and a customer who stays for 10 months pays $230 in total.</p>',
      prompt: 'Select the value of F and the value of M that are consistent with the information given. Make only one selection in each column.',
      cols: ['F (sign-up fee)', 'M (monthly fee)'], options: ['10', '15', '20', '25', '30', '40'], answer: [4, 2],
      explain: '<p>F + 6M = 150 and F + 10M = 230. Subtract: 4M = 80, so M = 20. Then F = 150 &minus; 120 = 30.</p><p>Check: 30 + 10 &times; 20 = 230. <strong>F = 30, M = 20.</strong></p>',
      takeaway: 'When two totals differ only in quantity, subtract them to isolate the per-unit amount.' },

    { id: 'd08', sec: 'DI', type: 'Two-Part Analysis', topic: 'Two-Part Analysis', level: 2, kind: 'twopart',
      stim: '<p>A café owner noticed that on days when she plays classical music, the average customer spends 12 percent more than on days when she plays pop music. She concludes that classical music causes customers to spend more, and she plans to play it every day.</p>',
      prompt: 'Select the statement that, if true, most strengthens the owner\'s conclusion, and the statement that, if true, most weakens it. Make only one selection in each column.',
      cols: ['Strengthens', 'Weakens'],
      options: [
        'She plays classical music mainly at weekends, when customers typically stay longer and order full meals.',
        'In a month-long trial in which each day\'s music was chosen by coin flip, spending was higher on the classical-music days.',
        'The café\'s coffee prices are similar to those of nearby cafés.',
        'The café opened three years ago.',
        'Licensing fees for classical recordings are lower than for pop recordings.'
      ], answer: [1, 0],
      explain: '<p><strong>Gap:</strong> classical-music days may differ from pop-music days in some other way that affects spending.</p><p><strong>Weakens:</strong> the first statement supplies exactly such a difference: weekends. The extra spending may be a weekend effect.</p><p><strong>Strengthens:</strong> the coin-flip trial removes that kind of difference, so the higher spending is more likely due to the music.</p><p>The other three statements have no bearing on what causes the spending.</p>',
      takeaway: 'Verbal Two-Part questions are Critical Reasoning: find the gap, then one answer opens it and the other closes it.' },

    /* ------------------------------ DATA INSIGHTS: GRAPHICS INTERPRETATION ------------------------------ */
    { id: 'd09', sec: 'DI', type: 'Graphics Interpretation', topic: 'Graphics Interpretation', level: 2, kind: 'dropdown', chart: 'museum',
      prompt: 'Use the chart to complete each statement.',
      text: 'From January to May, the number of monthly visitors increased by approximately {0} percent. The month with the greatest percent increase over the previous month was {1}.',
      blanks: [['56', '80', '125', '225'], ['February', 'March', 'April', 'May']], answer: [2, 2],
      explain: '<p><strong>First blank:</strong> January 24, May 54. Increase = 30 on a base of 24: 30/24 = 1.25, so <strong>125 percent</strong>. (225 is May as a percent <em>of</em> January, not the increase. 56 uses May as the base.)</p><p><strong>Second blank:</strong> February 6/24 = 25%; March 6/30 = 20%; April 12/36 = 33%; May 6/48 = 12.5%. The greatest is <strong>April</strong>.</p>',
      takeaway: 'Percent increase = change ÷ starting value. "Percent of" and "percent increase" differ by 100.' },

    { id: 'd10', sec: 'DI', type: 'Graphics Interpretation', topic: 'Graphics Interpretation', level: 2, kind: 'dropdown', chart: 'stores',
      prompt: 'Each point represents one store. Use the chart to complete each statement.',
      text: 'The relationship between advertising spend and units sold is best described as {0}. The number of stores that spent more than €40 thousand on advertising and sold fewer than 600 units is {1}.',
      blanks: [['positive', 'negative', 'non-existent'], ['0', '1', '2', '3']], answer: [0, 2],
      explain: '<p><strong>First blank:</strong> the points rise from lower left to upper right: stores that spend more tend to sell more. The relationship is <strong>positive</strong>.</p><p><strong>Second blank:</strong> four stores lie to the right of 40 on the horizontal axis. Of these, two lie below 600 on the vertical axis (at spends of 42 and 50). The answer is <strong>2</strong>.</p>',
      takeaway: 'For two conditions on a scatterplot, draw the two boundary lines in your mind and count the points in the right region.' },

    /* ------------------------------ DATA INSIGHTS: TABLE ANALYSIS ------------------------------ */
    { id: 'd11', sec: 'DI', type: 'Table Analysis', topic: 'Table Analysis', level: 2, kind: 'yesno', table: 'offices',
      prompt: 'For each statement, select <strong>Yes</strong> if it is supported by the information in the table. Otherwise select <strong>No</strong>.',
      labels: ['Yes', 'No'],
      statements: [
        'The office with the most employees also has the highest revenue.',
        'More than half of the offices have a rating of at least 4.3.',
        'The median revenue of the offices is greater than €5.0 million.'
      ], answer: [0, 0, 1],
      explain: '<p><strong>Statement 1: Yes.</strong> Sort by employees: Cork has the most (55). Cork also has the highest revenue (7.7).</p><p><strong>Statement 2: Yes.</strong> Sort by rating: Espoo 4.7, Bergen 4.6, Turku 4.5, Aarhus 4.4 and Porto 4.3 are at least 4.3. That is 5 of 8, more than half.</p><p><strong>Statement 3: No.</strong> Sort by revenue: 3.8, 3.9, 4.0, 4.8, 5.2, 6.1, 6.3, 7.7. With eight values the median is the average of the 4th and 5th: (4.8 + 5.2) &divide; 2 = 5.0. That is equal to 5.0, not greater.</p>',
      takeaway: 'Sort before you count, and read comparison words literally: "at least" includes the value, "greater than" does not.' },

    { id: 'd12', sec: 'DI', type: 'Table Analysis', topic: 'Table Analysis', level: 3, kind: 'yesno', table: 'offices',
      prompt: 'For each statement, select <strong>True</strong> if it is true based on the information in the table. Otherwise select <strong>False</strong>.',
      labels: ['True', 'False'],
      statements: [
        'Every office that opened after 2015 has fewer than 30 employees.',
        'Revenue per employee is higher in Turku than in Aarhus.',
        'The office with the lowest rating also has the lowest revenue per employee.'
      ], answer: [1, 0, 0],
      explain: '<p><strong>Statement 1: False.</strong> Offices opened after 2015: Bergen (28), Porto (31), Turku (24), Espoo (19). Porto has 31 employees.</p><p><strong>Statement 2: True.</strong> Turku: 4.8 &divide; 24 = 0.20 million per employee. Aarhus: 6.3 &divide; 42 = 0.15.</p><p><strong>Statement 3: True.</strong> The lowest rating is Ghent (3.8). Ghent\'s revenue per employee is 5.2 &divide; 47, about 0.11. The next lowest are Porto (about 0.13), Bergen and Cork (about 0.14). Ghent is the lowest.</p>',
      takeaway: 'One counter-example makes an "every" statement false. Use the calculator for ratios, and estimate before you compute them all.' },

    /* ------------------------------ DATA INSIGHTS: MULTI-SOURCE REASONING ------------------------------ */
    { id: 'd13', sec: 'DI', type: 'Multi-Source Reasoning', topic: 'Multi-Source Reasoning', level: 2, kind: 'mc', sources: 'norden',
      prompt: 'A consultant travels to Cologne for a two-night stay in April and pays €170 per night for the hotel. The consultant has no director\'s approval. What total amount will be reimbursed for the hotel?',
      options: ['€280', '€300', '€320', '€340', '€360'], answer: 3,
      explain: '<p>The Cities tab lists Cologne as not on the high-cost list, which would cap the claim at €140 per night (€280). But the Email tab adds Cologne to the high-cost list from 1 March to 30 June, and the stay is in April.</p><p>The limit is therefore €180 per night. €170 is within it, so the full 2 &times; €170 = <strong>€340</strong> is reimbursed.</p>',
      takeaway: 'Before you answer a Multi-Source question, check whether another tab changes the rule.' },

    { id: 'd14', sec: 'DI', type: 'Multi-Source Reasoning', topic: 'Multi-Source Reasoning', level: 2, kind: 'yesno', sources: 'norden',
      prompt: 'For each claim, select <strong>Yes</strong> if it would be reimbursed in full without a director\'s approval, based on the information provided. Otherwise select <strong>No</strong>.',
      labels: ['Yes', 'No'],
      statements: [
        'A flight from head office to Cologne in May',
        'A hotel in Munich at €175 per night',
        'A €40 meal claim for a day on which the client provided lunch and dinner'
      ], answer: [1, 0, 1],
      explain: '<p><strong>Flight to Cologne: No.</strong> Air travel is reimbursed only when rail takes more than 4 hours one way. Cologne is 3 h 50 min. (Being on the high-cost list affects hotels, not flights.)</p><p><strong>Munich hotel at €175: Yes.</strong> Munich is on the high-cost list, so the limit is €180.</p><p><strong>€40 meal claim: No.</strong> The email says no meal reimbursement can be claimed on days when a client provides meals.</p>',
      takeaway: 'Match each claim to the specific rule that governs it; a rule about hotels says nothing about flights.' },

    { id: 'd15', sec: 'DI', type: 'Multi-Source Reasoning', topic: 'Multi-Source Reasoning', level: 2, kind: 'mc', sources: 'norden',
      prompt: 'A consultant spends three nights in Hamburg in March, paying €150 per night for the hotel, and claims €45 for meals on each of three days. The client provided no meals. Without a director\'s approval, what is the maximum total reimbursement for hotel and meals?',
      options: ['€540', '€555', '€570', '€585', '€675'], answer: 1,
      explain: '<p>Hamburg is not on the high-cost list, and the email changes only Cologne. Hotel limit: €140 per night, so 3 &times; 140 = €420 (the extra €10 per night is not covered).</p><p>Meals: €45 per day is exactly the limit, so 3 &times; 45 = €135.</p><p>Total: 420 + 135 = <strong>€555</strong>.</p>',
      takeaway: 'Apply each limit separately, then add. Amounts above a limit are simply not reimbursed.' }
  ];
})();
