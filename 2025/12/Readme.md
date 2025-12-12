<h2>--- Day 12: Christmas Tree Farm ---</h2><p>You're almost out of time, but there can't be much left to decorate. Although there are no stairs, elevators, escalators, tunnels, chutes, teleporters, firepoles, or conduits here that would take you deeper into the North Pole base, there <em>is</em> a ventilation duct. You jump in.</p>
<p>After bumping around for a few minutes, you emerge into a large, well-lit cavern full of Christmas trees!</p>
<p>There are a few Elves here frantically decorating before the deadline. They think they'll be able to finish most of the work, but the one thing they're worried about is the <em>presents</em> for all the young Elves that live here at the North Pole. It's an ancient tradition to put the presents under the trees, but the Elves are worried they won't <em>fit</em>.</p>
<p>The presents come in a few standard but very weird shapes. The shapes and the regions into which they need to fit are all measured in standard <em>units</em>. To be aesthetically pleasing, the presents need to be placed into the regions in a way that follows a standardized two-dimensional unit grid; you also can't stack presents.</p>
<p>As always, the Elves have a summary of the situation (your puzzle input) for you. First, it contains a list of the presents' shapes. Second, it contains the size of the region under each tree and a list of the number of presents of each shape that need to fit into that region. For example:</p>
<pre><code>0:
###
##.
##.

1:
###
##.
.##

2:
.##
###
##.

3:
##.
###
##.

4:
###
#..
###

5:
###
.#.
###

4x4: 0 0 0 0 2 0
12x5: 1 0 1 0 2 2
12x5: 1 0 1 0 3 2
</code></pre>
<p>The first section lists the standard present <em>shapes</em>. For convenience, each shape starts with its <em>index</em> and a colon; then, the shape is displayed visually, where <code>#</code> is part of the shape and <code>.</code> is not.</p>
<p>The second section lists the <em>regions</em> under the trees. Each line starts with the width and length of the region; <code>12x5</code> means the region is <code>12</code> units wide and <code>5</code> units long. The rest of the line describes the presents that need to fit into that region by listing the <em>quantity of each shape</em> of present; <code>1 0 1 0 3 2</code> means you need to fit one present with shape index 0, no presents with shape index 1, one present with shape index 2, no presents with shape index 3, three presents with shape index 4, and two presents with shape index 5.</p>
<p>Presents can be <em>rotated and flipped</em> as necessary to make them fit in the available space, but they have to always be placed perfectly on the grid. Shapes can't overlap (that is, the <code>#</code> part from two different presents can't go in the same place on the grid), but they <em>can</em> fit together (that is, the <code>.</code> part in a present's shape's diagram does not block another present from occupying that space on the grid).</p>
<p>The Elves need to know <em>how many of the regions</em> can fit the presents listed. In the above example, there are six unique present shapes and three regions that need checking.</p>
<p>The first region is 4x4:</p>
<pre><code>....
....
....
....
</code></pre>
<p>In it, you need to determine whether you could fit two presents that have shape index <code>4</code>:</p>
<pre><code>###
#..
###
</code></pre>
<p>After some experimentation, it turns out that you <em>can</em> fit both presents in this region. Here is one way to do it, using <code>A</code> to represent one present and <code>B</code> to represent the other:</p>
<pre><code>AAA.
ABAB
ABAB
.BBB
</code></pre>
<p>The second region, <code>12x5: 1 0 1 0 2 2</code>, is <code>12</code> units wide and <code>5</code> units long. In that region, you need to try to fit one present with shape index <code>0</code>, one present with shape index <code>2</code>, two presents with shape index <code>4</code>, and two presents with shape index <code>5</code>.</p>
<p>It turns out that these presents <em>can</em> all fit in this region. Here is one way to do it, again using different capital letters to represent all the required presents:</p>
<pre><code>....AAAFFE.E
.BBBAAFFFEEE
DDDBAAFFCECE
DBBB....CCC.
DDD.....C.C.
</code></pre>
<p>The third region, <code>12x5: 1 0 1 0 3 2</code>, is the same size as the previous region; the only difference is that this region needs to fit one additional present with shape index <code>4</code>. Unfortunately, no matter how hard you try, there is <em>no way to fit all of the presents</em> into this region.</p>
<p>So, in this example, <code><em>2</em></code> regions can fit all of their listed presents.</p>
<p>Consider the regions beneath each tree and the presents the Elves would like to fit into each of them. <em>How many of the regions can fit all of the presents listed?</em></p>
