<h2>--- Day 6: Custom Customs ---</h2><p>As your flight approaches the regional airport where you&apos;ll switch to a much larger plane, <a href="https://en.wikipedia.org/wiki/Customs_declaration" target="_blank">customs declaration forms</a> are distributed to the passengers.</p>
<p>The form asks a series of 26 yes-or-no questions marked <code>a</code> through <code>z</code>. All you need to do is identify the questions for which <em>anyone in your group</em> answers &quot;yes&quot;. Since your group is just you, this doesn&apos;t take very long.</p>
<p>However, the person sitting next to you seems to be experiencing a language barrier and asks if you can help. For each of the people in their group, you write down the questions for which they answer &quot;yes&quot;, one per line.  For example:</p>
<pre><code>abcx
abcy
abcz
</code></pre>
<p>In this group, there are <em><code>6</code></em> questions to which anyone answered &quot;yes&quot;: <code>a</code>, <code>b</code>, <code>c</code>, <code>x</code>, <code>y</code>, and <code>z</code>. (Duplicate answers to the same question don&apos;t count extra; each question counts at most once.)</p>
<p>Another group asks for your help, then another, and eventually you&apos;ve collected answers from every group on the plane (your puzzle input). Each group&apos;s answers are separated by a blank line, and within each group, each person&apos;s answers are on a single line. For example:</p>
<pre><code>abc

a
b
c

ab
ac

a
a
a
a

b
</code></pre>
<p>This list represents answers from five groups:</p>
<ul>
<li>The first group contains one person who answered &quot;yes&quot; to <em><code>3</code></em> questions: <code>a</code>, <code>b</code>, and <code>c</code>.</li>
<li>The second group contains three people; combined, they answered &quot;yes&quot; to <em><code>3</code></em> questions: <code>a</code>, <code>b</code>, and <code>c</code>.</li>
<li>The third group contains two people; combined, they answered &quot;yes&quot; to <em><code>3</code></em> questions: <code>a</code>, <code>b</code>, and <code>c</code>.</li>
<li>The fourth group contains four people; combined, they answered &quot;yes&quot; to only <em><code>1</code></em> question, <code>a</code>.</li>
<li>The last group contains one person who answered &quot;yes&quot; to only <em><code>1</code></em> question, <code>b</code>.</li>
</ul>
<p>In this example, the sum of these counts is <code>3 + 3 + 3 + 1 + 1</code> = <em><code>11</code></em>.</p>
<p>For each group, count the number of questions to which anyone answered &quot;yes&quot;. <em>What is the sum of those counts?</em></p>

<h2 id="part2">--- Part Two ---</h2><p>As you finish the last group&apos;s customs declaration, you notice that <span title="Don&apos;t worry, nobody ever misreads just one word in real life.">you misread one word</span> in the instructions:</p>
<p>You don&apos;t need to identify the questions to which <em>anyone</em> answered &quot;yes&quot;; you need to identify the questions to which <em>everyone</em> answered &quot;yes&quot;!</p>
<p>Using the same  example as above:</p>
<pre><code>abc

a
b
c

ab
ac

a
a
a
a

b
</code></pre>
<p>This list represents answers from five groups:</p>
<ul>
<li>In the first group, everyone (all 1 person) answered &quot;yes&quot; to <em><code>3</code></em> questions: <code>a</code>, <code>b</code>, and <code>c</code>.</li>
<li>In the second group, there is <em>no</em> question to which everyone answered &quot;yes&quot;.</li>
<li>In the third group, everyone answered yes to only <em><code>1</code></em> question, <code>a</code>. Since some people did not answer &quot;yes&quot; to <code>b</code> or <code>c</code>, they don&apos;t count.</li>
<li>In the fourth group, everyone answered yes to only <em><code>1</code></em> question, <code>a</code>.</li>
<li>In the fifth group, everyone (all 1 person) answered &quot;yes&quot; to <em><code>1</code></em> question, <code>b</code>.</li>
</ul>
<p>In this example, the sum of these counts is <code>3 + 0 + 1 + 1 + 1</code> = <em><code>6</code></em>.</p>
<p>For each group, count the number of questions to which <em>everyone</em> answered &quot;yes&quot;. <em>What is the sum of those counts?</em></p>
