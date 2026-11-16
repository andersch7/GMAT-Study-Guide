/* Quant coaching lessons. Each lesson is plain HTML so it is easy to edit. */
(function () {
  'use strict';
  var G = window.GMAT = window.GMAT || {};
  G.data = G.data || {};
  G.data.lessons = G.data.lessons || {};

  var note = function (html) { return '<div class="coach"><div class="coach-label">Coach\'s note</div>' + html + '</div>'; };
  var ex = function (label, html) { return '<div class="example"><div class="example-label">' + label + '</div>' + html + '</div>'; };
  var drill = function (items) {
    return '<h2>Quick drill</h2><p>Work these on paper before opening the answers.</p><ol class="drill">' + items.map(function (it) {
      return '<li>' + it[0] + '<details><summary>Answer</summary><p>' + it[1] + '</p></details></li>';
    }).join('') + '</ol>';
  };

  G.data.lessons.quant = {
    key: 'quant', section: 'Q', title: 'Quantitative Reasoning',
    lede: '21 questions in 45 minutes, no calculator. The maths is school-level; the difficulty is in the reasoning.',
    intro: note('<p>Most people prepare for Quant by collecting formulas. That is not where points are lost. Points are lost by misreading what is asked, by grinding through algebra when a faster route exists, and by spending five minutes on one question. So we train three things in this order: <strong>fluency</strong> with the basics, a <strong>toolkit</strong> of ways to attack a question, and the <strong>discipline</strong> to let a question go.</p>'),
    lessons: [
      {
        id: 'approach', title: 'How to attack any Quant question', sub: 'The four tools and the routine to use on every question', minutes: 15,
        html:
          '<p>Every Quant question is Problem Solving: a question and five answer choices. You get a note board but no calculator, which tells you something important: <strong>no question needs heavy arithmetic</strong>. If you are doing long division, you have missed a shortcut.</p>' +
          '<h2>The routine</h2>' +
          '<ol class="steps">' +
          '<li><strong>Read the last line first.</strong> Know exactly what is being asked before you read the story. Write it down: "want: x + y", "want: % increase".</li>' +
          '<li><strong>Glance at the answer choices.</strong> Are they numbers or expressions? Close together or far apart? This tells you which tool to use.</li>' +
          '<li><strong>Pick a tool before you calculate.</strong> Ten seconds of planning saves a minute of wandering.</li>' +
          '<li><strong>Work neatly on paper.</strong> Most "silly mistakes" are mental arithmetic and messy handwriting.</li>' +
          '<li><strong>Check against the question you wrote in step 1.</strong> The trap answer is usually the right value of the wrong thing.</li>' +
          '</ol>' +
          '<h2>The four tools</h2>' +
          '<div class="table-wrap"><table><thead><tr><th>Tool</th><th>Use it when</th><th>How</th></tr></thead><tbody>' +
          '<tr><td><strong>Algebra</strong></td><td>The set-up is clean and you can see the equation</td><td>Translate, solve, check</td></tr>' +
          '<tr><td><strong>Test smart numbers</strong></td><td>Variables in the answer choices, or percents and fractions of an unknown total</td><td>Pick easy numbers (100 for percents, a common multiple for fractions), work it out, then see which choice matches</td></tr>' +
          '<tr><td><strong>Backsolve</strong></td><td>The choices are plain numbers and the question asks for one unknown</td><td>Choices are in size order. Try the middle one. If it is too big, go smaller. You rarely need more than two tries</td></tr>' +
          '<tr><td><strong>Estimate</strong></td><td>The choices are far apart or the numbers are ugly</td><td>Round, compute roughly, eliminate</td></tr>' +
          '</tbody></table></div>' +
          ex('Worked example: backsolving',
            '<p>Notebooks cost $4 each and pens cost $1.50 each. Mia bought 14 items for exactly $36. How many notebooks did she buy?</p><p>(A) 4 &nbsp; (B) 5 &nbsp; (C) 6 &nbsp; (D) 7 &nbsp; (E) 8</p>' +
            '<p>Try the middle choice, 6 notebooks: 6 &times; $4 = $24. That leaves 8 pens: 8 &times; $1.50 = $12. Total $36. It works first time, so the answer is <strong>(C)</strong>. Had the total come out too high, you would have tried fewer notebooks.</p>') +
          ex('Worked example: smart numbers',
            '<p>A jacket\'s price is raised by 25%, and the new price is then cut by 20%. The final price is what percent of the original price?</p>' +
            '<p>Call the original price 100. Up 25% gives 125. Down 20% of 125 is 25 off, giving 100. The final price is <strong>100%</strong> of the original. No algebra needed.</p>') +
          note('<p>Strong test-takers do not always know more maths than you. They are quicker to drop a method that is not working. If your first approach has not produced progress in about a minute, switch tools or make your best guess and move on. One question is worth exactly as much as any other.</p>') +
          '<h2>Traps to expect on every question</h2><ul>' +
          '<li><strong>Answering the wrong thing:</strong> you find x, the question wanted 2x or x &minus; y.</li>' +
          '<li><strong>Percent of what?</strong> A percent change is always measured against the original value.</li>' +
          '<li><strong>Assuming too much:</strong> unless told otherwise, a number could be negative, zero or a fraction.</li>' +
          '<li><strong>Units:</strong> minutes versus hours, cents versus dollars.</li></ul>' +
          '<h2>Mental fluency to build</h2><p>Know these cold: multiplication tables to 12 &times; 12, squares up to 15&sup2; = 225, powers of 2 up to 2<sup>10</sup> = 1,024, and the common fraction, decimal and percent equivalents in the next lesson. Five minutes a day is enough.</p>'
      },
      {
        id: 'arithmetic', title: 'Fractions, percents and ratios', sub: 'The fluency that every other topic depends on', minutes: 25,
        html:
          '<p>This is the highest-value Quant topic, and it carries straight into Data Insights. If your arithmetic is rusty, start here and do not rush it.</p>' +
          '<h2>Know these equivalents by heart</h2>' +
          '<div class="table-wrap"><table><thead><tr><th>Fraction</th><th>Percent</th><th>Fraction</th><th>Percent</th></tr></thead><tbody>' +
          '<tr><td>1/2</td><td>50%</td><td>1/6</td><td>about 16.7%</td></tr>' +
          '<tr><td>1/3</td><td>about 33.3%</td><td>1/8</td><td>12.5%</td></tr>' +
          '<tr><td>2/3</td><td>about 66.7%</td><td>3/8</td><td>37.5%</td></tr>' +
          '<tr><td>1/4</td><td>25%</td><td>5/8</td><td>62.5%</td></tr>' +
          '<tr><td>3/4</td><td>75%</td><td>7/8</td><td>87.5%</td></tr>' +
          '<tr><td>1/5</td><td>20%</td><td>1/9</td><td>about 11.1%</td></tr>' +
          '</tbody></table></div>' +
          '<h2>Percents</h2><ul>' +
          '<li><strong>Percent change = change &divide; original.</strong> From 80 to 100 is 20/80 = 25% up. From 100 to 80 is 20/100 = 20% down.</li>' +
          '<li><strong>Use multipliers.</strong> Up 20% means &times; 1.2. Down 20% means &times; 0.8.</li>' +
          '<li><strong>Successive changes multiply; they never add.</strong> Up 20% then down 25% is 1.2 &times; 0.75 = 0.9, a 10% fall overall.</li>' +
          '<li><strong>"Percent of" is not "percent greater than".</strong> 150% of 40 is 60. 150% greater than 40 is 100.</li>' +
          '<li><strong>x% of y equals y% of x.</strong> 16% of 25 is the same as 25% of 16, which is 4.</li></ul>' +
          '<h2>Ratios</h2><ul>' +
          '<li>A ratio compares parts. 3 : 5 means 3 parts to 5 parts, so the first part is 3/8 of the whole.</li>' +
          '<li>Write the real amounts as 3x and 5x. The <strong>unknown multiplier x</strong> turns a ratio into an equation.</li>' +
          '<li>A ratio alone never tells you actual amounts. You need one real number to find x.</li></ul>' +
          ex('Worked example: ratio with a change',
            '<p>The ratio of managers to staff at a company is 2 : 7. After 6 more managers are hired, the ratio becomes 1 : 3. How many staff are there?</p>' +
            '<p>Managers 2x, staff 7x. After hiring: (2x + 6) / 7x = 1/3. Cross-multiply: 6x + 18 = 7x, so x = 18. Staff = 7 &times; 18 = <strong>126</strong>.</p>' +
            '<p>Check: managers 36 + 6 = 42, and 42 : 126 = 1 : 3.</p>') +
          note('<p>When a percent question gives no actual amounts, make the starting value 100. When a fraction question gives no total, pick a total that all the denominators divide into. You are allowed to make the question easy.</p>') +
          drill([
            ['What is 37.5% of 240?', '37.5% is 3/8, and 3/8 of 240 is <strong>90</strong>.'],
            ['A salary rises from 4,000 to 4,600. What is the percent increase?', '600 / 4,000 = <strong>15%</strong>.'],
            ['A bag holds only red and blue marbles in the ratio 3 : 5. There are 40 marbles. How many are blue?', '8 parts make 40, so one part is 5. Blue = 5 &times; 5 = <strong>25</strong>.'],
            ['A number is increased by 50% and the result is decreased by 50%. The final number is what percent of the original?', '1.5 &times; 0.5 = 0.75, so <strong>75%</strong>.']
          ])
      },
      {
        id: 'algebra', title: 'Algebra, exponents and inequalities', sub: 'Equations, quadratics and the rules people misremember', minutes: 25,
        html:
          '<h2>Linear equations</h2><ul>' +
          '<li>To find n unknowns you normally need n different equations.</li>' +
          '<li>But read what is asked: sometimes you can find a <em>combination</em> such as x + y directly, without finding x and y separately. Add or subtract the equations and see what falls out.</li></ul>' +
          '<h2>Inequalities</h2><ul>' +
          '<li>Treat them like equations, with one rule: <strong>multiplying or dividing by a negative flips the sign.</strong></li>' +
          '<li>Never multiply or divide by a variable unless you know its sign.</li></ul>' +
          '<h2>Exponents and roots</h2>' +
          '<div class="table-wrap"><table><thead><tr><th>Rule</th><th>Example</th></tr></thead><tbody>' +
          '<tr><td>a<sup>m</sup> &times; a<sup>n</sup> = a<sup>m+n</sup></td><td>2<sup>3</sup> &times; 2<sup>4</sup> = 2<sup>7</sup></td></tr>' +
          '<tr><td>a<sup>m</sup> &divide; a<sup>n</sup> = a<sup>m&minus;n</sup></td><td>5<sup>6</sup> &divide; 5<sup>2</sup> = 5<sup>4</sup></td></tr>' +
          '<tr><td>(a<sup>m</sup>)<sup>n</sup> = a<sup>mn</sup></td><td>(3<sup>2</sup>)<sup>3</sup> = 3<sup>6</sup></td></tr>' +
          '<tr><td>a<sup>&minus;n</sup> = 1 / a<sup>n</sup></td><td>2<sup>&minus;3</sup> = 1/8</td></tr>' +
          '<tr><td>a<sup>0</sup> = 1 (a not zero)</td><td>7<sup>0</sup> = 1</td></tr>' +
          '<tr><td>You cannot add exponents across a plus sign. Factor instead.</td><td>2<sup>10</sup> + 2<sup>10</sup> = 2 &times; 2<sup>10</sup> = 2<sup>11</sup></td></tr>' +
          '<tr><td>&radic;(ab) = &radic;a &times; &radic;b, but &radic;(a + b) is <em>not</em> &radic;a + &radic;b</td><td>&radic;(9 + 16) = 5, not 7</td></tr>' +
          '</tbody></table></div>' +
          '<p>To solve an equation with exponents, rewrite both sides with the <strong>same base</strong>, then set the exponents equal.</p>' +
          '<h2>Quadratics</h2><ul>' +
          '<li>Get everything on one side, factor, and set each factor to zero. Expect two solutions and check which ones the question allows.</li>' +
          '<li>Recognise the three special products on sight:<br>(a + b)&sup2; = a&sup2; + 2ab + b&sup2;<br>(a &minus; b)&sup2; = a&sup2; &minus; 2ab + b&sup2;<br>(a + b)(a &minus; b) = a&sup2; &minus; b&sup2;</li></ul>' +
          '<h2>Absolute value</h2><p>|x &minus; a| is the distance between x and a on the number line. |x &minus; 3| = 5 means x is 5 away from 3, so x is 8 or &minus;2.</p>' +
          ex('Worked example: factor, do not expand',
            '<p>If 3<sup>x+1</sup> + 3<sup>x</sup> = 108, what is x?</p>' +
            '<p>Factor out 3<sup>x</sup>: 3<sup>x</sup>(3 + 1) = 108, so 3<sup>x</sup> = 27 and <strong>x = 3</strong>.</p>') +
          ex('Worked example: a combination, not the parts',
            '<p>If x + y = 10 and x &minus; y = 4, what is x&sup2; &minus; y&sup2;?</p>' +
            '<p>x&sup2; &minus; y&sup2; = (x + y)(x &minus; y) = 10 &times; 4 = <strong>40</strong>. There was no need to find x or y.</p>') +
          note('<p>If the answer choices contain variables, you can almost always test numbers instead of doing algebra: choose simple values, compute the target, and plug the same values into each choice. Avoid 0 and 1, and avoid numbers that already appear in the question, because they make several choices match by accident.</p>') +
          drill([
            ['If 2<sup>x</sup> = 8<sup>x&minus;2</sup>, what is x?', '8 = 2<sup>3</sup>, so 2<sup>x</sup> = 2<sup>3x&minus;6</sup>. Then x = 3x &minus; 6, so <strong>x = 3</strong>.'],
            ['Solve &minus;3x + 4 &gt; 16.', '&minus;3x &gt; 12. Dividing by &minus;3 flips the sign: <strong>x &lt; &minus;4</strong>.'],
            ['If |x &minus; 3| = 5, what is the sum of all possible values of x?', 'x = 8 or x = &minus;2, so the sum is <strong>6</strong>.'],
            ['If a/b = 2/3, what is (a + b)/b?', '(a + b)/b = a/b + 1 = 2/3 + 1 = <strong>5/3</strong>.']
          ])
      },
      {
        id: 'word-problems', title: 'Word problems, rates and work', sub: 'Turning English into equations', minutes: 25,
        html:
          '<p>Word problems are the most common Quant question, and they are reading tests as much as maths tests. Translate one phrase at a time.</p>' +
          '<h2>Translation</h2>' +
          '<div class="table-wrap"><table><thead><tr><th>English</th><th>Maths</th></tr></thead><tbody>' +
          '<tr><td>is, was, will be</td><td>=</td></tr>' +
          '<tr><td>of (with a fraction or percent)</td><td>&times;</td></tr>' +
          '<tr><td>per, for each</td><td>&divide;</td></tr>' +
          '<tr><td>5 less than x</td><td>x &minus; 5 (not 5 &minus; x)</td></tr>' +
          '<tr><td>x is 20% greater than y</td><td>x = 1.2y</td></tr>' +
          '<tr><td>twice as many A as B</td><td>A = 2B</td></tr>' +
          '</tbody></table></div>' +
          '<p>Name your variables after what they stand for (use <em>n</em> for notebooks, not <em>x</em>) and write the units next to every number.</p>' +
          '<h2>Rates and speed</h2><ul>' +
          '<li><strong>Distance = rate &times; time.</strong> Set up a small table with one row per trip or traveller.</li>' +
          '<li><strong>Average speed = total distance &divide; total time.</strong> It is never the simple average of the speeds.</li>' +
          '<li>Moving towards each other: add the speeds. Chasing in the same direction: subtract them.</li></ul>' +
          '<h2>Work</h2><p>Convert times into rates and add the rates. A job done in 6 hours is 1/6 of the job per hour.</p>' +
          '<h2>Mixtures and weighted averages</h2><p>A combined average always lies between the two group averages, and closer to the larger group. Compute it as total amount &divide; total quantity.</p>' +
          '<h2>Overlapping sets</h2><p><strong>Total = Group A + Group B &minus; Both + Neither.</strong> For anything more complicated, draw a 2 &times; 2 table and fill in what you know.</p>' +
          ex('Worked example: work',
            '<p>Machine A completes an order in 6 hours; machine B completes the same order in 3 hours. Working together, how long do they take?</p>' +
            '<p>Rates: 1/6 + 1/3 = 1/2 of the order per hour. Time = <strong>2 hours</strong>.</p>') +
          ex('Worked example: average speed',
            '<p>A driver covers 120 km at 60 km/h and returns along the same road at 40 km/h. What is the average speed for the round trip?</p>' +
            '<p>Time out = 2 h; time back = 3 h. Average speed = 240 km &divide; 5 h = <strong>48 km/h</strong>. The tempting answer, 50, is the trap.</p>') +
          ex('Worked example: overlapping sets',
            '<p>Of 80 students, 50 study French, 40 study Spanish and 10 study neither. How many study both?</p>' +
            '<p>80 = 50 + 40 &minus; Both + 10, so Both = <strong>20</strong>.</p>') +
          note('<p>Before you calculate, ask what a sensible answer looks like. Two machines together must be faster than the faster machine alone, so the answer above had to be under 3 hours. That ten-second sanity check catches a large share of word-problem errors.</p>') +
          drill([
            ['A train travels 150 km in 2.5 hours. At the same speed, how long does it take to travel 240 km?', 'Speed = 60 km/h, so 240 km takes <strong>4 hours</strong>.'],
            ['Ana can paint a room in 4 hours and Ben in 12 hours. How long do they take together?', '1/4 + 1/12 = 1/3 of the room per hour, so <strong>3 hours</strong>.'],
            ['20 litres of a 30% solution are mixed with 30 litres of a 50% solution. What is the concentration of the mixture?', '(6 + 15) &divide; 50 = <strong>42%</strong>. Closer to 50% because there is more of that solution.'],
            ['Of 120 employees, 70 have a laptop, 60 have a phone and 25 have both. How many have neither?', '70 + 60 &minus; 25 = 105 have at least one, so <strong>15</strong> have neither.']
          ])
      },
      {
        id: 'number-properties', title: 'Number properties', sub: 'Divisibility, primes, remainders, odd and even', minutes: 20,
        html:
          '<p>These questions look abstract but run on a short list of facts. Learn the facts, then practise testing cases.</p>' +
          '<h2>Facts people get wrong</h2><ul>' +
          '<li>Zero is an integer, it is even, and it is neither positive nor negative.</li>' +
          '<li>1 is not prime. 2 is the smallest prime and the only even one.</li>' +
          '<li>"Integer" does not mean "positive". "Number" does not mean "integer".</li></ul>' +
          '<h2>Divisibility</h2>' +
          '<div class="table-wrap"><table><thead><tr><th>Divisible by</th><th>If</th></tr></thead><tbody>' +
          '<tr><td>2</td><td>the last digit is even</td></tr>' +
          '<tr><td>3</td><td>the digits add up to a multiple of 3</td></tr>' +
          '<tr><td>4</td><td>the last two digits form a multiple of 4</td></tr>' +
          '<tr><td>5</td><td>the last digit is 0 or 5</td></tr>' +
          '<tr><td>6</td><td>it is divisible by both 2 and 3</td></tr>' +
          '<tr><td>9</td><td>the digits add up to a multiple of 9</td></tr>' +
          '</tbody></table></div>' +
          '<h2>Prime factorisation</h2><ul>' +
          '<li>Break numbers into primes whenever a question mentions factors, multiples or divisibility. 72 = 2<sup>3</sup> &times; 3<sup>2</sup>.</li>' +
          '<li><strong>Counting factors:</strong> add 1 to each exponent and multiply. 72 has (3 + 1)(2 + 1) = 12 positive factors.</li>' +
          '<li><strong>Greatest common factor:</strong> the shared primes at their lowest powers. <strong>Least common multiple:</strong> every prime at its highest power.</li></ul>' +
          '<h2>Odd and even, positive and negative</h2><ul>' +
          '<li>Even &plusmn; even = even; odd &plusmn; odd = even; even &plusmn; odd = odd.</li>' +
          '<li>A product is even if <em>any</em> factor is even. It is odd only if every factor is odd.</li>' +
          '<li>A product is negative when it has an odd number of negative factors.</li></ul>' +
          '<h2>Remainders and units digits</h2><ul>' +
          '<li>A remainder is always smaller than the divisor. If n leaves remainder 3 when divided by 5, then n could be 3, 8, 13, 18 and so on. List a few and look for the pattern.</li>' +
          '<li>Units digits of powers repeat in cycles. For 7: 7, 9, 3, 1, then again. For 2: 2, 4, 8, 6. For 3: 3, 9, 7, 1.</li></ul>' +
          ex('Worked example: units digit',
            '<p>What is the units digit of 7<sup>45</sup>?</p>' +
            '<p>The cycle for 7 has length 4. 45 divided by 4 leaves remainder 1, so 7<sup>45</sup> ends like 7<sup>1</sup>: the units digit is <strong>7</strong>.</p>') +
          ex('Worked example: what must be true',
            '<p>If n is a positive integer and n&sup2; is divisible by 12, what is the largest number that <em>must</em> divide n?</p>' +
            '<p>12 = 2&sup2; &times; 3. For n&sup2; to contain a 3, n must contain a 3. For n&sup2; to contain 2&sup2;, n must contain at least one 2. So n must be divisible by 2 &times; 3 = <strong>6</strong>. (Test: n = 6 gives 36, which is divisible by 12.)</p>') +
          note('<p>On "must be true" and "could be true" questions, test cases deliberately. Try a small positive number, then zero, then a negative, then a fraction if the question does not say "integer". One counter-example is enough to kill an answer choice.</p>') +
          drill([
            ['What is the remainder when 100 is divided by 7?', '7 &times; 14 = 98, so the remainder is <strong>2</strong>.'],
            ['What is the least common multiple of 12 and 18?', '12 = 2&sup2; &times; 3 and 18 = 2 &times; 3&sup2;, so the LCM is 2&sup2; &times; 3&sup2; = <strong>36</strong>.'],
            ['If x is odd and y is even, is xy + x odd or even?', 'xy is even and x is odd, so the sum is <strong>odd</strong>.'],
            ['How many positive factors does 60 have?', '60 = 2&sup2; &times; 3 &times; 5, so (2 + 1)(1 + 1)(1 + 1) = <strong>12</strong>.']
          ])
      },
      {
        id: 'statistics', title: 'Statistics, counting and probability', sub: 'Averages, arrangements and chance', minutes: 20,
        html:
          '<h2>Statistics</h2><ul>' +
          '<li><strong>Sum = mean &times; count.</strong> This rearrangement solves most average questions.</li>' +
          '<li><strong>Median:</strong> the middle value once the numbers are in order (the mean of the two middle values if the count is even).</li>' +
          '<li>For evenly spaced numbers (consecutive integers, multiples of 5 and so on) the mean equals the median, and both equal the average of the first and last.</li>' +
          '<li><strong>Range:</strong> largest minus smallest.</li>' +
          '<li><strong>Standard deviation</strong> measures spread around the mean. You will not have to compute it. Know that adding the same number to every value leaves it unchanged, and multiplying every value by k multiplies it by |k|.</li></ul>' +
          '<h2>Counting</h2><ul>' +
          '<li><strong>Multiplication principle:</strong> if one choice can be made in m ways and the next in n ways, there are m &times; n ways in total.</li>' +
          '<li><strong>Arrangements (order matters):</strong> n different items can be ordered in n! ways.</li>' +
          '<li><strong>Selections (order does not matter):</strong> choosing k from n gives n! &divide; (k! &times; (n &minus; k)!). Choosing 3 from 7 is (7 &times; 6 &times; 5) &divide; (3 &times; 2 &times; 1) = 35.</li>' +
          '<li>Always ask first: <em>does order matter?</em> A committee is a selection; a president and deputy is an arrangement.</li></ul>' +
          '<h2>Probability</h2><ul>' +
          '<li>Probability = favourable outcomes &divide; total outcomes.</li>' +
          '<li><strong>"And"</strong> for independent events: multiply. <strong>"Or"</strong>: add, then subtract the overlap.</li>' +
          '<li><strong>"At least one"</strong> = 1 &minus; the probability of none. This is nearly always the fastest route.</li>' +
          '<li>Without replacement, the totals shrink after each draw.</li></ul>' +
          ex('Worked example: averages',
            '<p>The average of 5 numbers is 12. When a sixth number is added, the average becomes 13. What is the sixth number?</p>' +
            '<p>Old sum = 5 &times; 12 = 60. New sum = 6 &times; 13 = 78. The sixth number is 78 &minus; 60 = <strong>18</strong>.</p>') +
          ex('Worked example: at least one',
            '<p>A fair coin is flipped three times. What is the probability of at least one head?</p>' +
            '<p>P(no heads) = 1/2 &times; 1/2 &times; 1/2 = 1/8. So P(at least one head) = 1 &minus; 1/8 = <strong>7/8</strong>.</p>') +
          note('<p>Hard counting and probability questions are rare and slow. If your time is short, learn the basics above, practise the standard cases, and be ready to make a quick educated guess on the exotic ones. That is a good trade.</p>') +
          drill([
            ['What is the median of 3, 9, 4, 12 and 7?', 'In order: 3, 4, 7, 9, 12. The median is <strong>7</strong>.'],
            ['In how many ways can 4 different books be arranged on a shelf?', '4! = <strong>24</strong>.'],
            ['A bag holds 3 red and 2 blue balls. Two are drawn without replacement. What is the probability that both are red?', '3/5 &times; 2/4 = <strong>3/10</strong>.'],
            ['Every number in the set {2, 4, 6, 8, 10} is increased by 5. What happens to the mean and to the standard deviation?', 'The mean rises by 5 (from 6 to 11). The standard deviation is <strong>unchanged</strong>, because the spread is the same.']
          ])
      }
    ]
  };

  // Shared with the other lesson files.
  G.data.lessonHelpers = { note: note, ex: ex, drill: drill };
})();
