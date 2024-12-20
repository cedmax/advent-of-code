<h2>--- Day 20: Race Condition ---</h2><p>The Historians are quite pixelated again. This time, a massive, black building looms over you - you're <a href="/2017/day/24">right outside</a> the CPU!</p>
<p>While The Historians get to work, a nearby program sees that you're idle and challenges you to a <em>race</em>. Apparently, you've arrived just in time for the frequently-held <em>race condition</em> festival!</p>
<p>The race takes place on a particularly long and twisting code path; programs compete to see who can finish in the <em>fewest picoseconds</em>. The <span title="If we give away enough mutexes, maybe someone will use one of them to fix the race condition!">winner</span> even gets their very own <a href="https://en.wikipedia.org/wiki/Lock_(computer_science)" target="_blank">mutex</a>!</p>
<p>They hand you a <em>map of the racetrack</em> (your puzzle input). For example:</p>
<pre><code>###############
#...#...#.....#
#.#.#.#.#.###.#
#<em>S</em>#...#.#.#...#
#######.#.#.###
#######.#.#...#
#######.#.###.#
###..<em>E</em>#...#...#
###.#######.###
#...###...#...#
#.#####.#.###.#
#.#...#.#.#...#
#.#.#.#.#.#.###
#...#...#...###
###############
</code></pre>
<p>The map consists of track (<code>.</code>) - including the <em>start</em> (<code>S</code>) and <em>end</em> (<code>E</code>) positions (both of which also count as track) - and <em>walls</em> (<code>#</code>).</p>
<p>When a program runs through the racetrack, it starts at the start position. Then, it is allowed to move up, down, left, or right; each such move takes <em>1 picosecond</em>. The goal is to reach the end position as quickly as possible. In this example racetrack, the fastest time is <code>84</code> picoseconds.</p>
<p>Because there is only a single path from the start to the end and the programs all go the same speed, the races used to be pretty boring. To make things more interesting, they introduced a new rule to the races: programs are allowed to <em>cheat</em>.</p>
<p>The rules for cheating are very strict. <em>Exactly once</em> during a race, a program may <em>disable collision</em> for up to <em>2 picoseconds</em>. This allows the program to <em>pass through walls</em> as if they were regular track. At the end of the cheat, the program must be back on normal track again; otherwise, it will receive a <a href="https://en.wikipedia.org/wiki/Segmentation_fault" target="_blank">segmentation fault</a> and get disqualified.</p>
<p>So, a program could complete the course in 72 picoseconds (saving <em>12 picoseconds</em>) by cheating for the two moves marked <code>1</code> and <code>2</code>:</p>
<pre><code>###############
#...#...12....#
#.#.#.#.#.###.#
#S#...#.#.#...#
#######.#.#.###
#######.#.#...#
#######.#.###.#
###..E#...#...#
###.#######.###
#...###...#...#
#.#####.#.###.#
#.#...#.#.#...#
#.#.#.#.#.#.###
#...#...#...###
###############
</code></pre>
<p>Or, a program could complete the course in 64 picoseconds (saving <em>20 picoseconds</em>) by cheating for the two moves marked <code>1</code> and <code>2</code>:</p>
<pre><code>###############
#...#...#.....#
#.#.#.#.#.###.#
#S#...#.#.#...#
#######.#.#.###
#######.#.#...#
#######.#.###.#
###..E#...12..#
###.#######.###
#...###...#...#
#.#####.#.###.#
#.#...#.#.#...#
#.#.#.#.#.#.###
#...#...#...###
###############
</code></pre>
<p>This cheat saves <em>38 picoseconds</em>:</p>
<pre><code>###############
#...#...#.....#
#.#.#.#.#.###.#
#S#...#.#.#...#
#######.#.#.###
#######.#.#...#
#######.#.###.#
###..E#...#...#
###.####1##.###
#...###.2.#...#
#.#####.#.###.#
#.#...#.#.#...#
#.#.#.#.#.#.###
#...#...#...###
###############
</code></pre>
<p>This cheat saves <em>64 picoseconds</em> and takes the program directly to the end:</p>
<pre><code>###############
#...#...#.....#
#.#.#.#.#.###.#
#S#...#.#.#...#
#######.#.#.###
#######.#.#...#
#######.#.###.#
###..21...#...#
###.#######.###
#...###...#...#
#.#####.#.###.#
#.#...#.#.#...#
#.#.#.#.#.#.###
#...#...#...###
###############
</code></pre>
<p>Each cheat has a distinct <em>start position</em> (the position where the cheat is activated, just before the first move that is allowed to go through walls) and <em>end position</em>; cheats are uniquely identified by their start position and end position.</p>
<p>In this example, the total number of cheats (grouped by the amount of time they save) are as follows:</p>
<ul>
<li>There are 14 cheats that save 2 picoseconds.</li>
<li>There are 14 cheats that save 4 picoseconds.</li>
<li>There are 2 cheats that save 6 picoseconds.</li>
<li>There are 4 cheats that save 8 picoseconds.</li>
<li>There are 2 cheats that save 10 picoseconds.</li>
<li>There are 3 cheats that save 12 picoseconds.</li>
<li>There is one cheat that saves 20 picoseconds.</li>
<li>There is one cheat that saves 36 picoseconds.</li>
<li>There is one cheat that saves 38 picoseconds.</li>
<li>There is one cheat that saves 40 picoseconds.</li>
<li>There is one cheat that saves 64 picoseconds.</li>
</ul>
<p>You aren't sure what the conditions of the racetrack will be like, so to give yourself as many options as possible, you'll need a list of the best cheats. <em>How many cheats would save you at least 100 picoseconds?</em></p>
