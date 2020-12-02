<h2>--- Day 19: Medicine for Rudolph ---</h2><p>Rudolph the Red-Nosed Reindeer is sick!  His nose isn&apos;t shining very brightly, and he needs medicine.</p>
<p>Red-Nosed Reindeer biology isn&apos;t similar to regular reindeer biology; Rudolph is going to need custom-made medicine.  Unfortunately, Red-Nosed Reindeer chemistry isn&apos;t similar to regular reindeer chemistry, either.</p>
<p>The North Pole is equipped with a Red-Nosed Reindeer nuclear fusion/fission plant, capable of constructing any Red-Nosed Reindeer molecule you need.  It works by starting with some input molecule and then doing a series of <em>replacements</em>, one per step, until it has the right molecule.</p>
<p>However, the machine has to be calibrated before it can be used.  Calibration involves determining the number of molecules that can be generated in one step from a given starting point.</p>
<p>For example, imagine a simpler machine that supports only the following replacements:</p>
<pre><code>H =&gt; HO
H =&gt; OH
O =&gt; HH
</code></pre>
<p>Given the replacements above and starting with <code>HOH</code>, the following molecules could be generated:</p>
<ul>
<li><code>HOOH</code> (via <code>H =&gt; HO</code> on the first <code>H</code>).</li>
<li><code>HOHO</code> (via <code>H =&gt; HO</code> on the second <code>H</code>).</li>
<li><code>OHOH</code> (via <code>H =&gt; OH</code> on the first <code>H</code>).</li>
<li><code>HOOH</code> (via <code>H =&gt; OH</code> on the second <code>H</code>).</li>
<li><code>HHHH</code> (via <code>O =&gt; HH</code>).</li>
</ul>
<p>So, in the example above, there are <code>4</code> <em>distinct</em> molecules (not five, because <code>HOOH</code> appears twice) after one replacement from <code>HOH</code>. Santa&apos;s favorite molecule, <code>HOHOHO</code>, can become <code>7</code> <em>distinct</em> molecules (over nine replacements: six from <code>H</code>, and three from <code>O</code>).</p>
<p>The machine replaces without regard for the surrounding characters.  For example, given the string <code>H2O</code>, the transition <code>H =&gt; OO</code> would result in <code>OO2O</code>.</p>
<p>Your puzzle input describes all of the possible replacements and, at the bottom, the medicine molecule for which you need to calibrate the machine.  <em>How many distinct molecules can be created</em> after all the different ways you can do one replacement on the medicine molecule?</p>
