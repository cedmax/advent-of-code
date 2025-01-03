<h2>--- Day 1: No Time for a Taxicab ---</h2><p>Santa's sleigh uses a <span title="An atomic clock is too inaccurate; he might end up in a wall!">very high-precision clock</span> to guide its movements, and the clock's oscillator is regulated by stars. Unfortunately, the stars have been stolen... by the Easter Bunny.  To save Christmas, Santa needs you to retrieve all <em class="star">fifty stars</em> by December 25th.</p>
<p>Collect stars by solving puzzles.  Two puzzles will be made available on each day in the Advent calendar; the second puzzle is unlocked when you complete the first.  Each puzzle grants <em class="star">one star</em>. Good luck!</p>
<p>You're airdropped near <em>Easter Bunny Headquarters</em> in a city somewhere.  "Near", unfortunately, is as close as you can get - the instructions on the Easter Bunny Recruiting Document the Elves intercepted start here, and nobody had time to work them out further.</p>
<p>The Document indicates that you should start at the given coordinates (where you just landed) and face North.  Then, follow the provided sequence: either turn left (<code>L</code>) or right (<code>R</code>) 90 degrees, then walk forward the given number of blocks, ending at a new intersection.</p>
<p>There's no time to follow such ridiculous instructions on foot, though, so you take a moment and work out the destination.  Given that you can only walk on the <a href="https://en.wikipedia.org/wiki/Taxicab_geometry">street grid of the city</a>, how far is the shortest path to the destination?</p>
<p>For example:</p>
<ul>
<li>Following <code>R2, L3</code> leaves you <code>2</code> blocks East and <code>3</code> blocks North, or <code>5</code> blocks away.</li>
<li><code>R2, R2, R2</code> leaves you <code>2</code> blocks due South of your starting position, which is <code>2</code> blocks away.</li>
<li><code>R5, L5, R5, R3</code> leaves you <code>12</code> blocks away.</li>
</ul>
<p><em>How many blocks away</em> is Easter Bunny HQ?</p>

<h2 id="part2">--- Part Two ---</h2><p>Then, you notice the instructions continue on the back of the Recruiting Document.  Easter Bunny HQ is actually at the first location you visit twice.</p>
<p>For example, if your instructions are <code>R8, R4, R4, R8</code>, the first location you visit twice is <code>4</code> blocks away, due East.</p>
<p>How many blocks away is the <em>first location you visit twice</em>?</p>
