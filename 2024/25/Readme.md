<h2>--- Day 25: Code Chronicle ---</h2><p>Out of ideas and time, The Historians agree that they should go back to check the <em>Chief Historian's office</em> one last time, just in case he went back there without you noticing.</p>
<p>When you get there, you are surprised to discover that the door to his office is <em>locked</em>! You can hear someone inside, but knocking <span title="function knock() {
  yield no_response;
}">yields</span> no response. The locks on this floor are all fancy, expensive, virtual versions of <a href="https://en.wikipedia.org/wiki/Pin_tumbler_lock" target="_blank">five-pin tumbler locks</a>, so you contact North Pole security to see if they can help open the door.</p>
<p>Unfortunately, they've lost track of which locks are installed and which keys go with them, so the best they can do is send over <em>schematics of every lock and every key</em> for the floor you're on (your puzzle input).</p>
<p>The schematics are in a cryptic file format, but they do contain manufacturer information, so you look up their support number.</p>
<p>"Our Virtual Five-Pin Tumbler product? That's our most expensive model! <em>Way</em> more secure than--" You explain that you need to open a door and don't have a lot of time.</p>
<p>"Well, you can't know whether a key opens a lock without actually trying the key in the lock (due to quantum hidden variables), but you <em>can</em> rule out some of the key/lock combinations."</p>
<p>"The virtual system is complicated, but part of it really is a crude simulation of a five-pin tumbler lock, mostly for marketing reasons. If you look at the schematics, you can figure out whether a key could possibly fit in a lock."</p>
<p>He transmits you some example schematics:</p>
<pre><code>#####
.####
.####
.####
.#.#.
.#...
.....

#####
##.##
.#.##
...##
...#.
...#.
.....

.....
#....
#....
#...#
#.#.#
#.###
#####

.....
.....
#.#..
###..
###.#
###.#
#####

.....
.....
.....
#....
#.#..
#.#.#
#####
</code></pre>
<p>"The locks are schematics that have the top row filled (<code>#</code>) and the bottom row empty (<code>.</code>); the keys have the top row empty and the bottom row filled. If you look closely, you'll see that each schematic is actually a set of columns of various heights, either extending downward from the top (for locks) or upward from the bottom (for keys)."</p>
<p>"For locks, those are the pins themselves; you can convert the pins in schematics to a list of heights, one per column. For keys, the columns make up the shape of the key where it aligns with pins; those can also be converted to a list of heights."</p>
<p>"So, you could say the first lock has pin heights <code>0,5,3,4,3</code>:"</p>
<pre><code>#####
.####
.####
.####
.#.#.
.#...
.....
</code></pre>
<p>"Or, that the first key has heights <code>5,0,2,1,3</code>:"</p>
<pre><code>.....
#....
#....
#...#
#.#.#
#.###
#####
</code></pre>
<p>"These seem like they should fit together; in the first four columns, the pins and key don't overlap. However, this key <em>cannot</em> be for this lock: in the rightmost column, the lock's pin overlaps with the key, which you know because in that column the sum of the lock height and key height is more than the available space."</p>
<p>"So anyway, you can narrow down the keys you'd need to try by just testing each key with each lock, which means you would have to check... wait, you have <em>how</em> many locks? But the only installation <em>that</em> size is at the North--" You disconnect the call.</p>
<p>In this example, converting both locks to pin heights produces:</p>
<pre><code>0,5,3,4,3
1,2,0,5,3
</code></pre>
<p>Converting all three keys to heights produces:</p>
<pre><code>5,0,2,1,3
4,3,4,0,2
3,0,2,0,1
</code></pre>
<p>Then, you can try every key with every lock:</p>
<ul>
<li>Lock <code>0,5,3,4,3</code> and key <code>5,0,2,1,3</code>: <em>overlap</em> in the last column.</li>
<li>Lock <code>0,5,3,4,3</code> and key <code>4,3,4,0,2</code>: <em>overlap</em> in the second column.</li>
<li>Lock <code>0,5,3,4,3</code> and key <code>3,0,2,0,1</code>: all columns <em>fit</em>!</li>
<li>Lock <code>1,2,0,5,3</code> and key <code>5,0,2,1,3</code>: <em>overlap</em> in the first column.</li>
<li>Lock <code>1,2,0,5,3</code> and key <code>4,3,4,0,2</code>: all columns <em>fit</em>!</li>
<li>Lock <code>1,2,0,5,3</code> and key <code>3,0,2,0,1</code>: all columns <em>fit</em>!</li>
</ul>
<p>So, in this example, the number of unique lock/key pairs that fit together without overlapping in any column is <code><em>3</em></code>.</p>
<p>Analyze your lock and key schematics. <em>How many unique lock/key pairs fit together without overlapping in any column?</em></p>
