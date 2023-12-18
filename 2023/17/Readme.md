<h2>--- Day 17: Clumsy Crucible ---</h2><p>The lava starts flowing rapidly once the Lava Production Facility is operational. As you <span title="see you soon?">leave</span>, the reindeer offers you a parachute, allowing you to quickly reach Gear Island.</p>
<p>As you descend, your bird's-eye view of Gear Island reveals why you had trouble finding anyone on your way up: half of Gear Island is empty, but the half below you is a giant factory city!</p>
<p>You land near the gradually-filling pool of lava at the base of your new <em>lavafall</em>. Lavaducts will eventually carry the lava throughout the city, but to make use of it immediately, Elves are loading it into large <a href="https://en.wikipedia.org/wiki/Crucible" target="_blank">crucibles</a> on wheels.</p>
<p>The crucibles are top-heavy and pushed by hand. Unfortunately, the crucibles become very difficult to steer at high speeds, and so it can be hard to go in a straight line for very long.</p>
<p>To get Desert Island the machine parts it needs as soon as possible, you'll need to find the best way to get the crucible <em>from the lava pool to the machine parts factory</em>. To do this, you need to minimize <em>heat loss</em> while choosing a route that doesn't require the crucible to go in a <em>straight line</em> for too long.</p>
<p>Fortunately, the Elves here have a map (your puzzle input) that uses traffic patterns, ambient temperature, and hundreds of other parameters to calculate exactly how much heat loss can be expected for a crucible entering any particular city block.</p>
<p>For example:</p>
<pre><code>2413432311323
3215453535623
3255245654254
3446585845452
4546657867536
1438598798454
4457876987766
3637877979653
4654967986887
4564679986453
1224686865563
2546548887735
4322674655533
</code></pre>
<p>Each city block is marked by a single digit that represents the <em>amount of heat loss if the crucible enters that block</em>. The starting point, the lava pool, is the top-left city block; the destination, the machine parts factory, is the bottom-right city block. (Because you already start in the top-left block, you don't incur that block's heat loss unless you leave that block and then return to it.)</p>
<p>Because it is difficult to keep the top-heavy crucible going in a straight line for very long, it can move <em>at most three blocks</em> in a single direction before it must turn 90 degrees left or right. The crucible also can't reverse direction; after entering each city block, it may only turn left, continue straight, or turn right.</p>
<p>One way to <em>minimize heat loss</em> is this path:</p>
<pre><code>2<em>&gt;</em><em>&gt;</em>34<em>^</em><em>&gt;</em><em>&gt;</em><em>&gt;</em>1323
32<em>v</em><em>&gt;</em><em>&gt;</em><em>&gt;</em>35<em>v</em>5623
32552456<em>v</em><em>&gt;</em><em>&gt;</em>54
3446585845<em>v</em>52
4546657867<em>v</em><em>&gt;</em>6
14385987984<em>v</em>4
44578769877<em>v</em>6
36378779796<em>v</em><em>&gt;</em>
465496798688<em>v</em>
456467998645<em>v</em>
12246868655<em>&lt;</em><em>v</em>
25465488877<em>v</em>5
43226746555<em>v</em><em>&gt;</em>
</code></pre>
<p>This path never moves more than three consecutive blocks in the same direction and incurs a heat loss of only <code><em>102</em></code>.</p>
<p>Directing the crucible from the lava pool to the machine parts factory, but not moving more than three consecutive blocks in the same direction, <em>what is the least heat loss it can incur?</em></p>
