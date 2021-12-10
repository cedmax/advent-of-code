<h2>--- Day 2: Bathroom Security ---</h2><p>You arrive at <em>Easter Bunny Headquarters</em> under cover of darkness. However, you left in such a rush that you forgot to use the bathroom! Fancy office buildings like this one usually have keypad locks on their bathrooms, so you search the front desk for the code.</p>
<p>"In order to improve security," the document you find says, "bathroom codes will no longer be written down.  Instead, please memorize and follow the procedure below to access the bathrooms."</p>
<p>The document goes on to explain that each button to be pressed can be found by starting on the previous button and moving to adjacent buttons on the keypad: <code>U</code> moves up, <code>D</code> moves down, <code>L</code> moves left, and <code>R</code> moves right. Each line of instructions corresponds to one button, starting at the previous button (or, for the first line, <em>the "5" button</em>); press whatever button you're on at the end of each line. If a move doesn't lead to a button, ignore it.</p>
<p>You can't hold it much longer, so you decide to figure out the code as you walk to the bathroom. You picture a keypad like this:</p>
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
<li>You start at "5" and move up (to "2"), left (to "1"), and left (you can't, and stay on "1"), so the first button is <code>1</code>.</li>
<li>Starting from the previous button ("1"), you move right twice (to "3") and then down three times (stopping at "9" after two moves and ignoring the third), ending up with <code>9</code>.</li>
<li>Continuing from "9", you move left, up, right, down, and left, ending with <code>8</code>.</li>
<li>Finally, you move up four times (stopping at "2"), then down once, ending with <code>5</code>.</li>
</ul>
<p>So, in this example, the bathroom code is <code>1985</code>.</p>
<p>Your puzzle input is the instructions from the document you found at the front desk. What is the <em>bathroom code</em>?</p>
