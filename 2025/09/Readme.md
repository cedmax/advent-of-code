<h2>--- Day 9: Movie Theater ---</h2><p>You <span title="wheeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee">slide down</span> the <a href="https://en.wikipedia.org/wiki/Fireman%27s_pole">firepole</a> in the corner of the playground and land in the North Pole base movie theater!</p>
<p>The movie theater has a big tile floor with an interesting pattern. Elves here are redecorating the theater by switching out some of the square tiles in the big grid they form. Some of the tiles are <em>red</em>; the Elves would like to find the largest rectangle that uses red tiles for two of its opposite corners. They even have a list of where the red tiles are located in the grid (your puzzle input).</p>
<p>For example:</p>
<pre><code>7,1
11,1
11,7
9,7
9,5
2,5
2,3
7,3
</code></pre>
<p>Showing red tiles as <code>#</code> and other tiles as <code>.</code>, the above arrangement of red tiles would look like this:</p>
<pre><code>..............
.......#...#..
..............
..#....#......
..............
..#......#....
..............
.........#.#..
..............
</code></pre>
<p>You can choose any two red tiles as the opposite corners of your rectangle; your goal is to find the largest rectangle possible.</p>
<p>For example, you could make a rectangle (shown as <code>O</code>) with an area of <code>24</code> between <code>2,5</code> and <code>9,7</code>:</p>
<pre><code>..............
.......#...#..
..............
..#....#......
..............
..<em>O</em>OOOOOOO....
..OOOOOOOO....
..OOOOOOO<em>O</em>.#..
..............
</code></pre>
<p>Or, you could make a rectangle with area <code>35</code> between <code>7,1</code> and <code>11,7</code>:</p>
<pre><code>..............
.......<em>O</em>OOOO..
.......OOOOO..
..#....OOOOO..
.......OOOOO..
..#....OOOOO..
.......OOOOO..
.......OOOO<em>O</em>..
..............
</code></pre>
<p>You could even make a thin rectangle with an area of only <code>6</code> between <code>7,3</code> and <code>2,3</code>:</p>
<pre><code>..............
.......#...#..
..............
..<em>O</em>OOOO<em>O</em>......
..............
..#......#....
..............
.........#.#..
..............
</code></pre>
<p>Ultimately, the largest rectangle you can make in this example has area <code><em>50</em></code>. One way to do this is between <code>2,5</code> and <code>11,1</code>:</p>
<pre><code>..............
..OOOOOOOOO<em>O</em>..
..OOOOOOOOOO..
..OOOOOOOOOO..
..OOOOOOOOOO..
..<em>O</em>OOOOOOOOO..
..............
.........#.#..
..............
</code></pre>
<p>Using two red tiles as opposite corners, <em>what is the largest area of any rectangle you can make?</em></p>

<h2 id="part2">--- Part Two ---</h2><p>The Elves just remembered: they can only switch out tiles that are <em>red</em> or <em>green</em>. So, your rectangle can only include red or green tiles.</p>
<p>In your list, every red tile is connected to the red tile before and after it by a straight line of <em>green tiles</em>. The list wraps, so the first red tile is also connected to the last red tile. Tiles that are adjacent in your list will always be on either the same row or the same column.</p>
<p>Using the same example as before, the tiles marked <code>X</code> would be green:</p>
<pre><code>..............
.......#XXX#..
.......X...X..
..#XXXX#...X..
..X........X..
..#XXXXXX#.X..
.........X.X..
.........#X#..
..............
</code></pre>
<p>In addition, all of the tiles <em>inside</em> this loop of red and green tiles are <em>also</em> green. So, in this example, these are the green tiles:</p>
<pre><code>..............
.......#XXX#..
.......XXXXX..
..#XXXX#XXXX..
..XXXXXXXXXX..
..#XXXXXX#XX..
.........XXX..
.........#X#..
..............
</code></pre>
<p>The remaining tiles are never red nor green.</p>
<p>The rectangle you choose still must have red tiles in opposite corners, but any other tiles it includes must now be red or green. This significantly limits your options.</p>
<p>For example, you could make a rectangle out of red and green tiles with an area of <code>15</code> between <code>7,3</code> and <code>11,1</code>:</p>
<pre><code>..............
.......OOOO<em>O</em>..
.......OOOOO..
..#XXXX<em>O</em>OOOO..
..XXXXXXXXXX..
..#XXXXXX#XX..
.........XXX..
.........#X#..
..............
</code></pre>
<p>Or, you could make a thin rectangle with an area of <code>3</code> between <code>9,7</code> and <code>9,5</code>:</p>
<pre><code>..............
.......#XXX#..
.......XXXXX..
..#XXXX#XXXX..
..XXXXXXXXXX..
..#XXXXXX<em>O</em>XX..
.........OXX..
.........<em>O</em>X#..
..............
</code></pre>
<p>The largest rectangle you can make in this example using only red and green tiles has area <code><em>24</em></code>. One way to do this is between <code>9,5</code> and <code>2,3</code>:</p>
<pre><code>..............
.......#XXX#..
.......XXXXX..
..<em>O</em>OOOOOOOXX..
..OOOOOOOOXX..
..OOOOOOO<em>O</em>XX..
.........XXX..
.........#X#..
..............
</code></pre>
<p>Using two red tiles as opposite corners, <em>what is the largest area of any rectangle you can make using only red and green tiles?</em></p>
