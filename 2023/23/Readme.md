<h2>--- Day 23: A Long Walk ---</h2><p>The Elves resume water filtering operations! Clean water starts flowing over the edge of Island Island.</p>
<p>They offer to help <em>you</em> go over the edge of Island Island, too! Just <span title="It'll be fiiiiiiiine.">hold on tight</span> to one end of this impossibly long rope and they'll lower you down a safe distance from the massive waterfall you just created.</p>
<p>As you finally reach Snow Island, you see that the water isn't really reaching the ground: it's being <em>absorbed by the air</em> itself. It looks like you'll finally have a little downtime while the moisture builds up to snow-producing levels. Snow Island is pretty scenic, even without any snow; why not take a walk?</p>
<p>There's a map of nearby hiking trails (your puzzle input) that indicates <em>paths</em> (<code>.</code>), <em>forest</em> (<code>#</code>), and steep <em>slopes</em> (<code>^</code>, <code>&gt;</code>, <code>v</code>, and <code>&lt;</code>).</p>
<p>For example:</p>
<pre><code>#.#####################
#.......#########...###
#######.#########.#.###
###.....#.&gt;.&gt;.###.#.###
###v#####.#v#.###.#.###
###.&gt;...#.#.#.....#...#
###v###.#.#.#########.#
###...#.#.#.......#...#
#####.#.#.#######.#.###
#.....#.#.#.......#...#
#.#####.#.#.#########v#
#.#...#...#...###...&gt;.#
#.#.#v#######v###.###v#
#...#.&gt;.#...&gt;.&gt;.#.###.#
#####v#.#.###v#.#.###.#
#.....#...#...#.#.#...#
#.#########.###.#.#.###
#...###...#...#...#.###
###.###.#.###v#####v###
#...#...#.#.&gt;.&gt;.#.&gt;.###
#.###.###.#.###.#.#v###
#.....###...###...#...#
#####################.#
</code></pre>
<p>You're currently on the single path tile in the top row; your goal is to reach the single path tile in the bottom row. Because of all the mist from the waterfall, the slopes are probably quite <em>icy</em>; if you step onto a slope tile, your next step must be <em>downhill</em> (in the direction the arrow is pointing). To make sure you have the most scenic hike possible, <em>never step onto the same tile twice</em>. What is the longest hike you can take?</p>
<p>In the example above, the longest hike you can take is marked with <code>O</code>, and your starting position is marked <code>S</code>:</p>
<pre><code>#S#####################
#OOOOOOO#########...###
#######O#########.#.###
###OOOOO#OOO&gt;.###.#.###
###O#####O#O#.###.#.###
###OOOOO#O#O#.....#...#
###v###O#O#O#########.#
###...#O#O#OOOOOOO#...#
#####.#O#O#######O#.###
#.....#O#O#OOOOOOO#...#
#.#####O#O#O#########v#
#.#...#OOO#OOO###OOOOO#
#.#.#v#######O###O###O#
#...#.&gt;.#...&gt;OOO#O###O#
#####v#.#.###v#O#O###O#
#.....#...#...#O#O#OOO#
#.#########.###O#O#O###
#...###...#...#OOO#O###
###.###.#.###v#####O###
#...#...#.#.&gt;.&gt;.#.&gt;O###
#.###.###.#.###.#.#O###
#.....###...###...#OOO#
#####################O#
</code></pre>
<p>This hike contains <code><em>94</em></code> steps. (The other possible hikes you could have taken were <code>90</code>, <code>86</code>, <code>82</code>, <code>82</code>, and <code>74</code> steps long.)</p>
<p>Find the longest hike you can take through the hiking trails listed on your map. <em>How many steps long is the longest hike?</em></p>
