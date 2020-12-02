<h2>--- Day 2: Bathroom Security ---</h2><p>You arrive at <em>Easter Bunny Headquarters</em> under cover of darkness. However, you left in such a rush that you forgot to use the bathroom! Fancy office buildings like this one usually have keypad locks on their bathrooms, so you search the front desk for the code.</p>
<p>&quot;In order to improve security,&quot; the document you find says, &quot;bathroom codes will no longer be written down.  Instead, please memorize and follow the procedure below to access the bathrooms.&quot;</p>
<p>The document goes on to explain that each button to be pressed can be found by starting on the previous button and moving to adjacent buttons on the keypad: <code>U</code> moves up, <code>D</code> moves down, <code>L</code> moves left, and <code>R</code> moves right. Each line of instructions corresponds to one button, starting at the previous button (or, for the first line, <em>the &quot;5&quot; button</em>); press whatever button you&apos;re on at the end of each line. If a move doesn&apos;t lead to a button, ignore it.</p>
<p>You can&apos;t hold it much longer, so you decide to figure out the code as you walk to the bathroom. You picture a keypad like this:</p>
<pre><code>1 2 3
4 5 6
7 8 9
</code></pre>
<p>Suppose your instructions are:</p>
<pre><code>ULL
RRDDD
LURDL
UUUUD
</code></pre>
<ul>
<li>You start at &quot;5&quot; and move up (to &quot;2&quot;), left (to &quot;1&quot;), and left (you can&apos;t, and stay on &quot;1&quot;), so the first button is <code>1</code>.</li>
<li>Starting from the previous button (&quot;1&quot;), you move right twice (to &quot;3&quot;) and then down three times (stopping at &quot;9&quot; after two moves and ignoring the third), ending up with <code>9</code>.</li>
<li>Continuing from &quot;9&quot;, you move left, up, right, down, and left, ending with <code>8</code>.</li>
<li>Finally, you move up four times (stopping at &quot;2&quot;), then down once, ending with <code>5</code>.</li>
</ul>
<p>So, in this example, the bathroom code is <code>1985</code>.</p>
<p>Your puzzle input is the instructions from the document you found at the front desk. What is the <em>bathroom code</em>?</p>
