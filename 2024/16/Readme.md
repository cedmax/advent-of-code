<h2>--- Day 16: Reindeer Maze ---</h2><p>It's time again for the <a href="/2015/day/14">Reindeer Olympics</a>! This year, the big event is the <em>Reindeer Maze</em>, where the Reindeer compete for the <em><span title="I would say it's like Reindeer Golf, but knowing Reindeer, it's almost certainly nothing like Reindeer Golf.">lowest score</span></em>.</p>
<p>You and The Historians arrive to search for the Chief right as the event is about to start. It wouldn't hurt to watch a little, right?</p>
<p>The Reindeer start on the Start Tile (marked <code>S</code>) facing <em>East</em> and need to reach the End Tile (marked <code>E</code>). They can move forward one tile at a time (increasing their score by <code>1</code> point), but never into a wall (<code>#</code>). They can also rotate clockwise or counterclockwise 90 degrees at a time (increasing their score by <code>1000</code> points).</p>
<p>To figure out the best place to sit, you start by grabbing a map (your puzzle input) from a nearby kiosk. For example:</p>
<pre><code>###############
#.......#....E#
#.#.###.#.###.#
#.....#.#...#.#
#.###.#####.#.#
#.#.#.......#.#
#.#.#####.###.#
#...........#.#
###.#.#####.#.#
#...#.....#.#.#
#.#.#.###.#.#.#
#.....#...#.#.#
#.###.#.#.#.#.#
#S..#.....#...#
###############
</code></pre>
<p>There are many paths through this maze, but taking any of the best paths would incur a score of only <code><em>7036</em></code>. This can be achieved by taking a total of <code>36</code> steps forward and turning 90 degrees a total of <code>7</code> times:</p>
<pre><code>
###############
#.......#....<em>E</em>#
#.#.###.#.###<em>^</em>#
#.....#.#...#<em>^</em>#
#.###.#####.#<em>^</em>#
#.#.#.......#<em>^</em>#
#.#.#####.###<em>^</em>#
#..<em>&gt;</em><em>&gt;</em><em>&gt;</em><em>&gt;</em><em>&gt;</em><em>&gt;</em><em>&gt;</em><em>&gt;</em><em>v</em>#<em>^</em>#
###<em>^</em>#.#####<em>v</em>#<em>^</em>#
#<em>&gt;</em><em>&gt;</em><em>^</em>#.....#<em>v</em>#<em>^</em>#
#<em>^</em>#.#.###.#<em>v</em>#<em>^</em>#
#<em>^</em>....#...#<em>v</em>#<em>^</em>#
#<em>^</em>###.#.#.#<em>v</em>#<em>^</em>#
#S..#.....#<em>&gt;</em><em>&gt;</em><em>^</em>#
###############
</code></pre>
<p>Here's a second example:</p>
<pre><code>#################
#...#...#...#..E#
#.#.#.#.#.#.#.#.#
#.#.#.#...#...#.#
#.#.#.#.###.#.#.#
#...#.#.#.....#.#
#.#.#.#.#.#####.#
#.#...#.#.#.....#
#.#.#####.#.###.#
#.#.#.......#...#
#.#.###.#####.###
#.#.#...#.....#.#
#.#.#.#####.###.#
#.#.#.........#.#
#.#.#.#########.#
#S#.............#
#################
</code></pre>
<p>In this maze, the best paths cost <code><em>11048</em></code> points; following one such path would look like this:</p>
<pre><code>#################
#...#...#...#..<em>E</em>#
#.#.#.#.#.#.#.#<em>^</em>#
#.#.#.#...#...#<em>^</em>#
#.#.#.#.###.#.#<em>^</em>#
#<em>&gt;</em><em>&gt;</em><em>v</em>#.#.#.....#<em>^</em>#
#<em>^</em>#<em>v</em>#.#.#.#####<em>^</em>#
#<em>^</em>#<em>v</em>..#.#.#<em>&gt;</em><em>&gt;</em><em>&gt;</em><em>&gt;</em><em>^</em>#
#<em>^</em>#<em>v</em>#####.#<em>^</em>###.#
#<em>^</em>#<em>v</em>#..<em>&gt;</em><em>&gt;</em><em>&gt;</em><em>&gt;</em><em>^</em>#...#
#<em>^</em>#<em>v</em>###<em>^</em>#####.###
#<em>^</em>#<em>v</em>#<em>&gt;</em><em>&gt;</em><em>^</em>#.....#.#
#<em>^</em>#<em>v</em>#<em>^</em>#####.###.#
#<em>^</em>#<em>v</em>#<em>^</em>........#.#
#<em>^</em>#<em>v</em>#<em>^</em>#########.#
#S#<em>&gt;</em><em>&gt;</em><em>^</em>..........#
#################
</code></pre>
<p>Note that the path shown above includes one 90 degree turn as the very first move, rotating the Reindeer from facing East to facing North.</p>
<p>Analyze your map carefully. <em>What is the lowest score a Reindeer could possibly get?</em></p>
