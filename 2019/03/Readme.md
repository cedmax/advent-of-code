<h2>--- Day 3: Crossed Wires ---</h2><p>The gravity assist was successful, and you're well on your way to the Venus refuelling station.  During the rush back on Earth, the fuel management system wasn't completely installed, so that's next on the priority list.</p>
<p>Opening the front panel reveals a jumble of wires. Specifically, <em>two wires</em> are connected to a central port and extend outward on a grid.  You trace the path each wire takes as it leaves the central port, one wire per line of text (your puzzle input).</p>
<p>The wires <span title="A jumble of twisty little wires, all alike.">twist and turn</span>, but the two wires occasionally cross paths. To fix the circuit, you need to <em>find the intersection point closest to the central port</em>. Because the wires are on a grid, use the <a href="https://en.wikipedia.org/wiki/Taxicab_geometry">Manhattan distance</a> for this measurement. While the wires do technically cross right at the central port where they both start, this point does not count, nor does a wire count as crossing with itself.</p>
<p>For example, if the first wire's path is <code>R8,U5,L5,D3</code>, then starting from the central port (<code>o</code>), it goes right <code>8</code>, up <code>5</code>, left <code>5</code>, and finally down <code>3</code>:</p>
<pre><code>...........
...........
...........
....+----+.
....|....|.
....|....|.
....|....|.
.........|.
.o-------+.
...........
</code></pre>
<p>Then, if the second wire's path is <code>U7,R6,D4,L4</code>, it goes up <code>7</code>, right <code>6</code>, down <code>4</code>, and left <code>4</code>:</p>
<pre><code>...........
.+-----+...
.|.....|...
.|..+--X-+.
.|..|..|.|.
.|.-<em>X</em>--+.|.
.|..|....|.
.|.......|.
.o-------+.
...........
</code></pre>
<p>These wires cross at two locations (marked <code>X</code>), but the lower-left one is closer to the central port: its distance is <code>3 + 3 = 6</code>.</p>
<p>Here are a few more examples:</p>
<ul>
<li><code>R75,D30,R83,U83,L12,D49,R71,U7,L72<br>U62,R66,U55,R34,D71,R55,D58,R83</code> = distance <code>159</code></li>
<li><code>R98,U47,R26,D63,R33,U87,L62,D20,R33,U53,R51<br>U98,R91,D20,R16,D67,R40,U7,R15,U6,R7</code> = distance <code>135</code></li>
</ul>
<p><em>What is the Manhattan distance</em> from the central port to the closest intersection?</p>

<h2 id="part2">--- Part Two ---</h2><p>It turns out that this circuit is very timing-sensitive; you actually need to <em>minimize the signal delay</em>.</p>
<p>To do this, calculate the <em>number of steps</em> each wire takes to reach each intersection; choose the intersection where the <em>sum of both wires' steps</em> is lowest. If a wire visits a position on the grid multiple times, use the steps value from the <em>first</em> time it visits that position when calculating the total value of a specific intersection.</p>
<p>The number of steps a wire takes is the total number of grid squares the wire has entered to get to that location, including the intersection being considered. Again consider the example from above:</p>
<pre><code>...........
.+-----+...
.|.....|...
.|..+--X-+.
.|..|..|.|.
.|.-X--+.|.
.|..|....|.
.|.......|.
.o-------+.
...........
</code></pre>
<p>In the above example, the intersection closest to the central port is reached after <code>8+5+5+2 = <em>20</em></code> steps by the first wire and <code>7+6+4+3 = <em>20</em></code> steps by the second wire for a total of <code>20+20 = <em>40</em></code> steps.</p>
<p>However, the top-right intersection is better: the first wire takes only <code>8+5+2 = <em>15</em></code> and the second wire takes only <code>7+6+2 = <em>15</em></code>, a total of <code>15+15 = <em>30</em></code> steps.</p>
<p>Here are the best steps for the extra examples from above:</p>
<ul>
<li><code>R75,D30,R83,U83,L12,D49,R71,U7,L72<br>U62,R66,U55,R34,D71,R55,D58,R83</code> = <code>610</code> steps</li>
<li><code>R98,U47,R26,D63,R33,U87,L62,D20,R33,U53,R51<br>U98,R91,D20,R16,D67,R40,U7,R15,U6,R7</code> = <code>410</code> steps</li>
</ul>
<p><em>What is the fewest combined steps the wires must take to reach an intersection?</em></p>
