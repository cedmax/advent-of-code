<h2>--- Day 18: Lavaduct Lagoon ---</h2><p>Thanks to your efforts, the machine parts factory is one of the first factories up and running since the lavafall came back. However, to catch up with the large backlog of parts requests, the factory will also need a <em>large supply of lava</em> for a while; the Elves have already started creating a large lagoon nearby for this purpose.</p>
<p>However, they aren't sure the lagoon will be big enough; they've asked you to take a look at the <em>dig plan</em> (your puzzle input). For example:</p>
<pre><code>R 6 (#70c710)
D 5 (#0dc571)
L 2 (#5713f0)
D 2 (#d2c081)
R 2 (#59c680)
D 2 (#411b91)
L 5 (#8ceee2)
U 2 (#caa173)
L 1 (#1b58a2)
U 2 (#caa171)
R 2 (#7807d2)
U 3 (#a77fa3)
L 2 (#015232)
U 2 (#7a21e3)
</code></pre>
<p>The digger starts in a 1 meter cube hole in the ground. They then dig the specified number of meters <em>up</em> (<code>U</code>), <em>down</em> (<code>D</code>), <em>left</em> (<code>L</code>), or <em>right</em> (<code>R</code>), clearing full 1 meter cubes as they go. The directions are given as seen from above, so if "up" were north, then "right" would be east, and so on. Each trench is also listed with <em>the color that the edge of the trench should be painted</em> as an <a href="https://en.wikipedia.org/wiki/RGB_color_model#Numeric_representations" target="_blank">RGB hexadecimal color code</a>.</p>
<p>When viewed from above, the above example dig plan would result in the following loop of <em>trench</em> (<code>#</code>) having been dug out from otherwise <em>ground-level terrain</em> (<code>.</code>):</p>
<pre><code>#######
#.....#
###...#
..#...#
..#...#
###.###
#...#..
##..###
.#....#
.######
</code></pre>
<p>At this point, the trench could contain 38 cubic meters of lava. However, this is just the edge of the lagoon; the next step is to <em>dig out the interior</em> so that it is one meter deep as well:</p>
<pre><code>#######
#######
#######
..#####
..#####
#######
#####..
#######
.######
.######
</code></pre>
<p>Now, the lagoon can contain a much more respectable <code><em>62</em></code> cubic meters of lava. While the interior is dug out, the edges are also painted according to the color codes in the dig plan.</p>
<p>The Elves are concerned the lagoon won't be large enough; if they follow their dig plan, <em>how many cubic meters of lava could it hold?</em></p>

<h2 id="part2">--- Part Two ---</h2><p>The Elves were right to be concerned; the planned lagoon would be <em>much too small</em>.</p>
<p>After a few minutes, someone realizes what happened; someone <em><span title="Futuristic sprintf()?">swapped</span> the color and instruction parameters</em> when producing the dig plan. They don't have time to fix the bug; one of them asks if you can <em>extract the correct instructions</em> from the hexadecimal codes.</p>
<p>Each hexadecimal code is <em>six hexadecimal digits</em> long. The first five hexadecimal digits encode the <em>distance in meters</em> as a five-digit hexadecimal number. The last hexadecimal digit encodes the <em>direction to dig</em>: <code>0</code> means <code>R</code>, <code>1</code> means <code>D</code>, <code>2</code> means <code>L</code>, and <code>3</code> means <code>U</code>.</p>
<p>So, in the above example, the hexadecimal codes can be converted into the true instructions:</p>
<ul>
<li><code>#70c710</code> = <code>R 461937</code></li>
<li><code>#0dc571</code> = <code>D 56407</code></li>
<li><code>#5713f0</code> = <code>R 356671</code></li>
<li><code>#d2c081</code> = <code>D 863240</code></li>
<li><code>#59c680</code> = <code>R 367720</code></li>
<li><code>#411b91</code> = <code>D 266681</code></li>
<li><code>#8ceee2</code> = <code>L 577262</code></li>
<li><code>#caa173</code> = <code>U 829975</code></li>
<li><code>#1b58a2</code> = <code>L 112010</code></li>
<li><code>#caa171</code> = <code>D 829975</code></li>
<li><code>#7807d2</code> = <code>L 491645</code></li>
<li><code>#a77fa3</code> = <code>U 686074</code></li>
<li><code>#015232</code> = <code>L 5411</code></li>
<li><code>#7a21e3</code> = <code>U 500254</code></li>
</ul>
<p>Digging out this loop and its interior produces a lagoon that can hold an impressive <code><em>952408144115</em></code> cubic meters of lava.</p>
<p>Convert the hexadecimal color codes into the correct instructions; if the Elves follow this new dig plan, <em>how many cubic meters of lava could the lagoon hold?</em></p>
