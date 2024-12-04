<h2>--- Day 4: Ceres Search ---</h2><p>"Looks like the Chief's not here. Next!" One of The Historians pulls out a device and pushes the only button on it. After a brief flash, you recognize the interior of the <a href="/2019/day/10">Ceres monitoring station</a>!</p>
<p>As the search for the Chief continues, a small Elf who lives on the station tugs on your shirt; she'd like to know if you could help her with her <em>word search</em> (your puzzle input). She only has to find one word: <code>XMAS</code>.</p>
<p>This word search allows words to be horizontal, vertical, diagonal, written backwards, or even overlapping other words. It's a little unusual, though, as you don't merely need to find one instance of <code>XMAS</code> - you need to find <em>all of them</em>. Here are a few ways <code>XMAS</code> might appear, where irrelevant characters have been replaced with <code>.</code>:</p><p>
</p><pre><code>..X...
.SAMX.
.A..A.
XMAS.S
.X....
</code></pre>
<p>The actual word search will be full of letters instead. For example:</p>
<pre><code>MMMSXXMASM
MSAMXMSMSA
AMXSXMAAMM
MSAMASMSMX
XMASAMXAMM
XXAMMXXAMA
SMSMSASXSS
SAXAMASAAA
MAMMMXMMMM
MXMXAXMASX
</code></pre>
<p>In this word search, <code>XMAS</code> occurs a total of <code><em>18</em></code> times; here's the same word search again, but where letters not involved in any <code>XMAS</code> have been replaced with <code>.</code>:</p>
<pre><code>....XXMAS.
.SAMXMS...
...S..A...
..A.A.MS.X
XMASAMX.MM
X.....XA.A
S.S.S.S.SS
.A.A.A.A.A
..M.M.M.MM
.X.X.XMASX
</code></pre>
<p>Take a look at the little Elf's word search. <em>How many times does <code>XMAS</code> appear?</em></p>

<h2 id="part2">--- Part Two ---</h2><p>The Elf looks quizzically at you. Did you misunderstand the assignment?</p>
<p>Looking for the instructions, you flip over the word search to find that this isn't actually an <code><em>XMAS</em></code> puzzle; it's an <span title="This part originally involved searching for something else, but this joke was too dumb to pass up."><code><em>X-MAS</em></code></span> puzzle in which you're supposed to find two <code>MAS</code> in the shape of an <code>X</code>. One way to achieve that is like this:</p>
<pre><code>M.S
.A.
M.S
</code></pre>
<p>Irrelevant characters have again been replaced with <code>.</code> in the above diagram. Within the <code>X</code>, each <code>MAS</code> can be written forwards or backwards.</p>
<p>Here's the same example from before, but this time all of the <code>X-MAS</code>es have been kept instead:</p>
<pre><code>.M.S......
..A..MSMS.
.M.S.MAA..
..A.ASMSM.
.M.S.M....
..........
S.S.S.S.S.
.A.A.A.A..
M.M.M.M.M.
..........
</code></pre>
<p>In this example, an <code>X-MAS</code> appears <code><em>9</em></code> times.</p>
<p>Flip the word search from the instructions back over to the word search side and try again. <em>How many times does an <code>X-MAS</code> appear?</em></p>
