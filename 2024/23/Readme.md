<h2>--- Day 23: LAN Party ---</h2><p>As The Historians wander around a secure area at Easter Bunny HQ, you come across posters for a <a href="https://en.wikipedia.org/wiki/LAN_party" target="_blank">LAN party</a> scheduled for today! Maybe you can find it; you connect to a nearby <a href="/2016/day/9">datalink port</a> and download a map of the local network (your puzzle input).</p>
<p>The network map provides a list of every <em>connection between two computers</em>. For example:</p>
<pre><code>kh-tc
qp-kh
de-cg
ka-co
yn-aq
qp-ub
cg-tb
vc-aq
tb-ka
wh-tc
yn-cg
kh-ub
ta-co
de-co
tc-td
tb-wq
wh-td
ta-ka
td-qp
aq-cg
wq-ub
ub-vc
de-ta
wq-aq
wq-vc
wh-yn
ka-de
kh-ta
co-tc
wh-qp
tb-vc
td-yn
</code></pre>
<p>Each line of text in the network map represents a single connection; the line <code>kh-tc</code> represents a connection between the computer named <code>kh</code> and the computer named <code>tc</code>. Connections aren't directional; <code>tc-kh</code> would mean exactly the same thing.</p>
<p>LAN parties typically involve multiplayer games, so maybe you can locate it by finding groups of connected computers. Start by looking for <em>sets of three computers</em> where each computer in the set is connected to the other two computers.</p>
<p>In this example, there are <code>12</code> such sets of three inter-connected computers:</p>
<pre><code>aq,cg,yn
aq,vc,wq
co,de,ka
co,de,ta
co,ka,ta
de,ka,ta
kh,qp,ub
qp,td,wh
tb,vc,wq
tc,td,wh
td,wh,yn
ub,vc,wq
</code></pre>
<p>If the Chief Historian is here, <em>and</em> he's at the LAN party, it would be best to know that right away. You're pretty sure his computer's name starts with <code>t</code>, so consider only sets of three computers where at least one computer's name starts with <code>t</code>. That narrows the list down to <code><em>7</em></code> sets of three inter-connected computers:</p>
<pre><code>co,de,<em>ta</em>
co,ka,<em>ta</em>
de,ka,<em>ta</em>
qp,<em>td</em>,wh
<em>tb</em>,vc,wq
<em>tc</em>,<em>td</em>,wh
<em>td</em>,wh,yn
</code></pre>
<p>Find all the sets of three inter-connected computers. <em>How many contain at least one computer with a name that starts with <code>t</code>?</em></p>
