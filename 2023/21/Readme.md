<h2>--- Day 21: Step Counter ---</h2><p>You manage to catch the <a href="7">airship</a> right as it's dropping someone else off on their all-expenses-paid trip to Desert Island! It even helpfully drops you off near the <a href="5">gardener</a> and his massive farm.</p>
<p>"You got the sand flowing again! Great work! Now we just need to wait until we have enough sand to filter the water for Snow Island and we'll have snow again in no time."</p>
<p>While you wait, one of the Elves that works with the gardener heard how good you are at solving problems and would like your help. He needs to get his <a href="https://en.wikipedia.org/wiki/Pedometer" target="_blank">steps</a> in for the day, and so he'd like to know <em>which garden plots he can reach with exactly his remaining <code>64</code> steps</em>.</p>
<p>He gives you an up-to-date map (your puzzle input) of his starting position (<code>S</code>), garden plots (<code>.</code>), and rocks (<code>#</code>). For example:</p>
<pre><code>...........
.....###.#.
.###.##..#.
..#.#...#..
....#.#....
.##..S####.
.##..#...#.
.......##..
.##.#.####.
.##..##.##.
...........
</code></pre>
<p>The Elf starts at the starting position (<code>S</code>) which also counts as a garden plot. Then, he can take one step north, south, east, or west, but only onto tiles that are garden plots. This would allow him to reach any of the tiles marked <code>O</code>:</p>
<pre><code>...........
.....###.#.
.###.##..#.
..#.#...#..
....#O#....
.##.OS####.
.##..#...#.
.......##..
.##.#.####.
.##..##.##.
...........
</code></pre>
<p>Then, he takes a second step. Since at this point he could be at <em>either</em> tile marked <code>O</code>, his second step would allow him to reach any garden plot that is one step north, south, east, or west of <em>any</em> tile that he could have reached after the first step:</p>
<pre><code>...........
.....###.#.
.###.##..#.
..#.#O..#..
....#.#....
.##O.O####.
.##.O#...#.
.......##..
.##.#.####.
.##..##.##.
...........
</code></pre>
<p>After two steps, he could be at any of the tiles marked <code>O</code> above, including the starting position (either by going north-then-south or by going west-then-east).</p>
<p>A single third step leads to even more possibilities:</p>
<pre><code>...........
.....###.#.
.###.##..#.
..#.#.O.#..
...O#O#....
.##.OS####.
.##O.#...#.
....O..##..
.##.#.####.
.##..##.##.
...........
</code></pre>
<p>He will continue like this until his steps for the day have been exhausted. After a total of <code>6</code> steps, he could reach any of the garden plots marked <code>O</code>:</p>
<pre><code>...........
.....###.#.
.###.##.O#.
.O#O#O.O#..
O.O.#.#.O..
.##O.O####.
.##.O#O..#.
.O.O.O.##..
.##.#.####.
.##O.##.##.
...........
</code></pre>
<p>In this example, if the Elf's goal was to get exactly <code>6</code> more steps today, he could use them to reach any of <code><em>16</em></code> garden plots.</p>
<p>However, the Elf <em>actually needs to get <code>64</code> steps today</em>, and the map he's handed you is much larger than the example map.</p>
<p>Starting from the garden plot marked <code>S</code> on your map, <em>how many garden plots could the Elf reach in exactly <code>64</code> steps?</em></p>
