<h2>--- Day 22: Sporifica Virus ---</h2><p>Diagnostics indicate that the local <em>grid computing cluster</em> has been contaminated with the <em>Sporifica Virus</em>. The grid computing cluster is a seemingly-<span title="The infinite is possible at AdventOfCodeCom.">infinite</span> two-dimensional grid of compute nodes.  Each node is either <em>clean</em> or <em>infected</em> by the virus.</p><p>
</p><p>To <a href="https://en.wikipedia.org/wiki/Morris_worm#The_mistake">prevent overloading</a> the nodes (which would render them useless to the virus) or detection by system administrators, exactly one <em>virus carrier</em> moves through the network, infecting or cleaning nodes as it moves. The virus carrier is always located on a single node in the network (the <em>current node</em>) and keeps track of the <em>direction</em> it is facing.</p>
<p>To avoid detection, the virus carrier works in bursts; in each burst, it <em>wakes up</em>, does some <em>work</em>, and goes back to <em>sleep</em>. The following steps are all executed <em>in order</em> one time each burst:</p>
<ul>
<li>If the <em>current node</em> is <em>infected</em>, it turns to its <em>right</em>.  Otherwise, it turns to its <em>left</em>. (Turning is done in-place; the <em>current node</em> does not change.)</li>
<li>If the <em>current node</em> is <em>clean</em>, it becomes <em>infected</em>.  Otherwise, it becomes <em>cleaned</em>. (This is done <em>after</em> the node is considered for the purposes of changing direction.)</li>
<li>The virus carrier <a href="https://www.youtube.com/watch?v=2vj37yeQQHg">moves</a> <em>forward</em> one node in the direction it is facing.</li>
</ul>
<p>Diagnostics have also provided a <em>map of the node infection status</em> (your puzzle input).  <em>Clean</em> nodes are shown as <code>.</code>; <em>infected</em> nodes are shown as <code>#</code>.  This map only shows the center of the grid; there are many more nodes beyond those shown, but none of them are currently infected.</p>
<p>The virus carrier begins in the middle of the map facing <em>up</em>.</p>
<p>For example, suppose you are given a map like this:</p>
<pre><code>..#
#..
...
</code></pre>
<p>Then, the middle of the infinite grid looks like this, with the virus carrier's position marked with <code>[ ]</code>:</p>
<pre><code>. . . . . . . . .
. . . . . . . . .
. . . . . . . . .
. . . . . # . . .
. . . #[.]. . . .
. . . . . . . . .
. . . . . . . . .
. . . . . . . . .
</code></pre>
<p>The virus carrier is on a <em>clean</em> node, so it turns <em>left</em>, <em>infects</em> the node, and moves left:</p>
<pre><code>. . . . . . . . .
. . . . . . . . .
. . . . . . . . .
. . . . . # . . .
. . .[#]# . . . .
. . . . . . . . .
. . . . . . . . .
. . . . . . . . .
</code></pre>
<p>The virus carrier is on an <em>infected</em> node, so it turns <em>right</em>, <em>cleans</em> the node, and moves up:</p>
<pre><code>. . . . . . . . .
. . . . . . . . .
. . . . . . . . .
. . .[.]. # . . .
. . . . # . . . .
. . . . . . . . .
. . . . . . . . .
. . . . . . . . .
</code></pre>
<p>Four times in a row, the virus carrier finds a <em>clean</em>, <em>infects</em> it, turns <em>left</em>, and moves forward, ending in the same place and still facing up:</p>
<pre><code>. . . . . . . . .
. . . . . . . . .
. . . . . . . . .
. . #[#]. # . . .
. . # # # . . . .
. . . . . . . . .
. . . . . . . . .
. . . . . . . . .
</code></pre>
<p>Now on the same node as before, it sees an infection, which causes it to turn <em>right</em>, <em>clean</em> the node, and move forward:</p>
<pre><code>. . . . . . . . .
. . . . . . . . .
. . . . . . . . .
. . # .[.]# . . .
. . # # # . . . .
. . . . . . . . .
. . . . . . . . .
. . . . . . . . .
</code></pre>
<p>After the above actions, a total of <code>7</code> bursts of activity had taken place. Of them, <code>5</code> bursts of activity caused an infection.</p>
<p>After a total of <code>70</code>, the grid looks like this, with the virus carrier facing up:</p>
<pre><code>. . . . . # # . .
. . . . # . . # .
. . . # . . . . #
. . # . #[.]. . #
. . # . # . . # .
. . . . . # # . .
. . . . . . . . .
. . . . . . . . .
</code></pre>
<p>By this time, <code>41</code> bursts of activity caused an infection (though most of those nodes have since been cleaned).</p>
<p>After a total of <code>10000</code> bursts of activity, <code>5587</code> bursts will have caused an infection.</p>
<p>Given your actual map, after <code>10000</code> bursts of activity, <em>how many bursts cause a node to become infected</em>? (Do not count nodes that begin infected.)</p>
