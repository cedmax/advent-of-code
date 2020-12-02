<h2>--- Day 18: Like a GIF For Your Yard ---</h2><p>After the <a href="6">million lights incident</a>, the fire code has gotten stricter: now, at most <span title="This is an outrage!  We&apos;re going to the next town hall meeting.">ten thousand lights</span> are allowed.  You arrange them in a 100x100 grid.</p>
<p>Never one to let you down, Santa again mails you instructions on the ideal lighting configuration.  With so few lights, he says, you&apos;ll have to resort to <em>animation</em>.</p>
<p>Start by setting your lights to the included initial configuration (your puzzle input).  A <code>#</code> means &quot;on&quot;, and a <code>.</code> means &quot;off&quot;.</p>
<p>Then, animate your grid in steps, where each step decides the next configuration based on the current one.  Each light&apos;s next state (either on or off) depends on its current state and the current states of the eight lights adjacent to it (including diagonals).  Lights on the edge of the grid might have fewer than eight neighbors; the missing ones always count as &quot;off&quot;.</p>
<p>For example, in a simplified 6x6 grid, the light marked <code>A</code> has the neighbors numbered <code>1</code> through <code>8</code>, and the light marked <code>B</code>, which is on an edge, only has the neighbors marked <code>1</code> through <code>5</code>:</p>
<pre><code>1B5...
234...
......
..123.
..8A4.
..765.
</code></pre>
<p>The state a light should have next is based on its current state (on or off) plus the <em>number of neighbors that are on</em>:</p>
<ul>
<li>A light which is <em>on</em> stays on when <code>2</code> or <code>3</code> neighbors are on, and turns off otherwise.</li>
<li>A light which is <em>off</em> turns on if exactly <code>3</code> neighbors are on, and stays off otherwise.</li>
</ul>
<p>All of the lights update simultaneously; they all consider the same current state before moving to the next.</p>
<p>Here&apos;s a few steps from an example configuration of another 6x6 grid:</p>
<pre><code>Initial state:
.#.#.#
...##.
#....#
..#...
#.#..#
####..

After 1 step:
..##..
..##.#
...##.
......
#.....
#.##..

After 2 steps:
..###.
......
..###.
......
.#....
.#....

After 3 steps:
...#..
......
...#..
..##..
......
......

After 4 steps:
......
......
..##..
..##..
......
......
</code></pre>
<p>After <code>4</code> steps, this example has four lights on.</p>
<p>In your grid of 100x100 lights, given your initial configuration, <em>how many lights are on after 100 steps</em>?</p>
