<h2>--- Day 25: Four-Dimensional Adventure ---</h2><p>The reindeer&apos;s symptoms are getting worse, and neither you nor the white-bearded man have a solution. At least the reindeer has a warm place to rest: a small bed near where you&apos;re sitting.</p>
<p>As you reach down, the reindeer looks up at you, <span title="It was not an accident.">accidentally</span> bumping a button on your wrist-mounted device with its nose in the process - a button labeled <em>&quot;help&quot;</em>.</p>
<p>&quot;Hello, and welcome to the Time Travel Support Hotline! If you are lost in time and space, press 1. If you are trapped in a time paradox, press 2. If you need help caring for a sick reindeer, press 3. If you--&quot;</p>
<p><em>Beep.</em></p>
<p>A few seconds later, you hear a new voice. &quot;Hello; please state the nature of your reindeer.&quot; You try to describe the situation.</p>
<p>&quot;Just a moment, I think I can remotely run a diagnostic scan.&quot; A beam of light projects from the device and sweeps over the reindeer a few times.</p>
<p>&quot;Okay, it looks like your reindeer is very low on magical energy; it should fully recover if we can fix that.  Let me check your timeline for a source.... Got one. There&apos;s actually a powerful source of magical energy about 1000 years forward from you, and at roughly your position, too!  It looks like... hot chocolate?  Anyway, you should be able to travel there to pick some up; just don&apos;t forget a mug!  Is there anything else I can help you with today?&quot;</p>
<p>You explain that your device isn&apos;t capable of going forward in time.  &quot;I... see. That&apos;s tricky. Well, according to this information, your device should have the necessary hardware to open a small portal and send some hot chocolate back to you. You&apos;ll need a list of <em>fixed points in spacetime</em>; I&apos;m transmitting it to you now.&quot;</p>
<p>&quot;You just need to align your device to the constellations of fixed points so that it can lock on to the destination and open the portal. Let me look up how much hot chocolate that breed of reindeer needs.&quot;</p>
<p>&quot;It says here that your particular reindeer is-- this can&apos;t be right, it says there&apos;s only one like that in the universe!  But THAT means that you&apos;re--&quot; You disconnect the call.</p>
<p>The list of fixed points in spacetime (your puzzle input) is a set of four-dimensional coordinates. To align your device, acquire the hot chocolate, and save the reindeer, you just need to find the <em>number of constellations</em> of points in the list.</p>
<p>Two points are in the same <em>constellation</em> if their manhattan distance apart is <em>no more than 3</em> or if they can form a chain of points, each a manhattan distance no more than 3 from the last, between the two of them. (That is, if a point is close enough to a constellation, it &quot;joins&quot; that constellation.) For example:</p>
<pre><code> 0,0,0,0
 3,0,0,0
 0,3,0,0
 0,0,3,0
 0,0,0,3
 0,0,0,6
 9,0,0,0
12,0,0,0
</code></pre>
<p>In the above list, the first six points form a single constellation: <code>0,0,0,0</code> is exactly distance <code>3</code> from the next four, and the point at <code>0,0,0,6</code> is connected to the others by being <code>3</code> away from <code>0,0,0,3</code>, which is already in the constellation. The bottom two points, <code>9,0,0,0</code> and <code>12,0,0,0</code> are in a separate constellation because no point is close enough to connect them to the first constellation.  So, in the above list, the number of constellations is <code><em>2</em></code>.  (If a point at <code>6,0,0,0</code> were present, it would connect <code>3,0,0,0</code> and <code>9,0,0,0</code>, merging all of the points into a single giant constellation instead.)</p>
<p>In this example, the number of constellations is <code>4</code>:</p>
<pre><code>-1,2,2,0
0,0,2,-2
0,0,0,-2
-1,2,0,0
-2,-2,-2,2
3,0,2,-1
-1,3,2,2
-1,0,-1,0
0,2,1,-2
3,0,0,0
</code></pre>
<p>In this one, it&apos;s <code>3</code>:</p>
<pre><code>1,-1,0,1
2,0,-1,0
3,2,-1,0
0,0,3,1
0,0,-1,-1
2,3,-2,0
-2,2,0,0
2,-2,0,-1
1,-1,0,-1
3,2,0,2
</code></pre>
<p>Finally, in this one, it&apos;s <code>8</code>:</p>
<pre><code>1,-1,-1,-2
-2,-2,0,1
0,2,1,3
-2,3,-2,1
0,2,3,-2
-1,-1,1,-2
0,-2,-1,0
-2,2,3,-1
1,2,2,0
-1,-2,0,-2
</code></pre>
<p>The portly man nervously strokes his white beard. It&apos;s time to get that hot chocolate.</p>
<p><em>How many constellations are formed by the fixed points in spacetime?</em></p>
