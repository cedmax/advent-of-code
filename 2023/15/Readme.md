<h2>--- Day 15: Lens Library ---</h2><p>The newly-focused parabolic reflector dish is sending all of the collected light to a point on the side of yet another mountain - the largest mountain on Lava Island. As you approach the mountain, you find that the light is being collected by the wall of a large facility embedded in the mountainside.</p>
<p>You find a door under a large sign that says "Lava Production Facility" and next to a smaller sign that says "Danger - Personal Protective Equipment required beyond this point".</p>
<p>As you step inside, you are immediately greeted by a somewhat panicked <span title="do you like my hard hat">reindeer</span> wearing goggles and a loose-fitting <a href="https://en.wikipedia.org/wiki/Hard_hat" target="_blank">hard hat</a>. The reindeer leads you to a shelf of goggles and hard hats (you quickly find some that fit) and then further into the facility. At one point, you pass a button with a faint snout mark and the label "PUSH FOR HELP". No wonder you were loaded into that <a href="1">trebuchet</a> so quickly!</p>
<p>You pass through a final set of doors surrounded with even more warning signs and into what must be the room that collects all of the light from outside. As you admire the large assortment of lenses available to further focus the light, the reindeer brings you a book titled "Initialization Manual".</p>
<p>"Hello!", the book cheerfully begins, apparently unaware of the concerned reindeer reading over your shoulder. "This procedure will let you bring the Lava Production Facility online - all without burning or melting anything unintended!"</p>
<p>"Before you begin, please be prepared to use the Holiday ASCII String Helper algorithm (appendix 1A)." You turn to appendix 1A. The reindeer leans closer with interest.</p>
<p>The HASH algorithm is a way to turn any <a href="https://en.wikipedia.org/wiki/String_(computer_science)" target="_blank">string</a> of characters into a single <em>number</em> in the range 0 to 255. To run the HASH algorithm on a string, start with a <em>current value</em> of <code>0</code>. Then, for each character in the string starting from the beginning:</p>
<ul>
<li>Determine the <a href="https://en.wikipedia.org/wiki/ASCII#Printable_characters" target="_blank">ASCII code</a> for the current character of the string.</li>
<li>Increase the <em>current value</em> by the ASCII code you just determined.</li>
<li>Set the <em>current value</em> to itself multiplied by <code>17</code>.</li>
<li>Set the <em>current value</em> to the <a href="https://en.wikipedia.org/wiki/Modulo" target="_blank">remainder</a> of dividing itself by <code>256</code>.</li>
</ul>
<p>After following these steps for each character in the string in order, the <em>current value</em> is the output of the HASH algorithm.</p>
<p>So, to find the result of running the HASH algorithm on the string <code>HASH</code>:</p>
<ul>
<li>The <em>current value</em> starts at <code>0</code>.</li>
<li>The first character is <code>H</code>; its ASCII code is <code>72</code>.</li>
<li>The <em>current value</em> increases to <code>72</code>.</li>
<li>The <em>current value</em> is multiplied by <code>17</code> to become <code>1224</code>.</li>
<li>The <em>current value</em> becomes <code><em>200</em></code> (the remainder of <code>1224</code> divided by <code>256</code>).</li>
<li>The next character is <code>A</code>; its ASCII code is <code>65</code>.</li>
<li>The <em>current value</em> increases to <code>265</code>.</li>
<li>The <em>current value</em> is multiplied by <code>17</code> to become <code>4505</code>.</li>
<li>The <em>current value</em> becomes <code><em>153</em></code> (the remainder of <code>4505</code> divided by <code>256</code>).</li>
<li>The next character is <code>S</code>; its ASCII code is <code>83</code>.</li>
<li>The <em>current value</em> increases to <code>236</code>.</li>
<li>The <em>current value</em> is multiplied by <code>17</code> to become <code>4012</code>.</li>
<li>The <em>current value</em> becomes <code><em>172</em></code> (the remainder of <code>4012</code> divided by <code>256</code>).</li>
<li>The next character is <code>H</code>; its ASCII code is <code>72</code>.</li>
<li>The <em>current value</em> increases to <code>244</code>.</li>
<li>The <em>current value</em> is multiplied by <code>17</code> to become <code>4148</code>.</li>
<li>The <em>current value</em> becomes <code><em>52</em></code> (the remainder of <code>4148</code> divided by <code>256</code>).</li>
</ul>
<p>So, the result of running the HASH algorithm on the string <code>HASH</code> is <code><em>52</em></code>.</p>
<p>The <em>initialization sequence</em> (your puzzle input) is a comma-separated list of steps to start the Lava Production Facility. <em>Ignore newline characters</em> when parsing the initialization sequence. To verify that your HASH algorithm is working, the book offers the sum of the result of running the HASH algorithm on each step in the initialization sequence.</p>
<p>For example:</p>
<pre><code>rn=1,cm-,qp=3,cm=2,qp-,pc=4,ot=9,ab=5,pc-,pc=6,ot=7</code></pre>
<p>This initialization sequence specifies 11 individual steps; the result of running the HASH algorithm on each of the steps is as follows:</p>
<ul>
<li><code>rn=1</code> becomes <code><em>30</em></code>.</li>
<li><code>cm-</code> becomes <code><em>253</em></code>.</li>
<li><code>qp=3</code> becomes <code><em>97</em></code>.</li>
<li><code>cm=2</code> becomes <code><em>47</em></code>.</li>
<li><code>qp-</code> becomes <code><em>14</em></code>.</li>
<li><code>pc=4</code> becomes <code><em>180</em></code>.</li>
<li><code>ot=9</code> becomes <code><em>9</em></code>.</li>
<li><code>ab=5</code> becomes <code><em>197</em></code>.</li>
<li><code>pc-</code> becomes <code><em>48</em></code>.</li>
<li><code>pc=6</code> becomes <code><em>214</em></code>.</li>
<li><code>ot=7</code> becomes <code><em>231</em></code>.</li>
</ul>
<p>In this example, the sum of these results is <code><em>1320</em></code>. Unfortunately, the reindeer has stolen the page containing the expected verification number and is currently running around the facility with it excitedly.</p>
<p>Run the HASH algorithm on each step in the initialization sequence. <em>What is the sum of the results?</em> (The initialization sequence is one long line; be careful when copy-pasting it.)</p>
