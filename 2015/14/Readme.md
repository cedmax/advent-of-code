<h2>--- Day 14: Reindeer Olympics ---</h2><p>This year is the Reindeer Olympics!  Reindeer can fly at high speeds, but must rest occasionally to recover their energy.  Santa would like to know which of his reindeer is fastest, and so he has them race.</p>
<p>Reindeer can only either be <em>flying</em> (always at their top speed) or <em>resting</em> (not moving at all), and always spend whole seconds in either state.</p>
<p>For example, suppose you have the following Reindeer:</p>
<ul>
<li>Comet can fly <em>14 km/s for 10 seconds</em>, but then must rest for <em>127 seconds</em>.</li>
<li>Dancer can fly <em>16 km/s for 11 seconds</em>, but then must rest for <em>162 seconds</em>.</li>
</ul>
<p>After one second, Comet has gone 14 km, while Dancer has gone 16 km.  After ten seconds, Comet has gone 140 km, while Dancer has gone 160 km.  On the eleventh second, Comet begins resting (staying at 140 km), and Dancer continues on for a total distance of 176 km.  On the 12th second, both reindeer are resting.  They continue to rest until the 138th second, when Comet flies for another ten seconds.  On the 174th second, Dancer flies for another 11 seconds.</p>
<p>In this example, after the 1000th second, both reindeer are resting, and Comet is in the lead at <em><code>1120</code></em> km (poor Dancer has only gotten <code>1056</code> km by that point).  So, in this situation, Comet would win (if the race ended at 1000 seconds).</p>
<p>Given the descriptions of each reindeer (in your puzzle input), after exactly <code>2503</code> seconds, <em>what distance has the winning reindeer traveled</em>?</p>
