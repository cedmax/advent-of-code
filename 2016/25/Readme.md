<h2>--- Day 25: Clock Signal ---</h2><p>You open the door and find yourself on the roof. The city sprawls away from you for miles and miles.</p>
<p>There&apos;s not much time now - it&apos;s already Christmas, but you&apos;re nowhere near the North Pole, much too far to deliver these stars to the sleigh in time.</p>
<p>However, maybe the <em>huge antenna</em> up here can offer a solution. After all, the sleigh doesn&apos;t need the stars, exactly; it needs the timing data they provide, and you happen to have a massive signal generator right here.</p>
<p>You connect the stars you have to your prototype computer, connect that to the antenna, and begin the transmission.</p>
<p><span title="Then again, if something ever works on the first try, you should be *very* suspicious.">Nothing happens.</span></p>
<p>You call the service number printed on the side of the antenna and quickly explain the situation. &quot;I&apos;m not sure what kind of equipment you have connected over there,&quot; he says, &quot;but you need a clock signal.&quot; You try to explain that this is a signal for a clock.</p>
<p>&quot;No, no, a <a href="https://en.wikipedia.org/wiki/Clock_signal">clock signal</a> - timing information so the antenna computer knows how to read the data you&apos;re sending it. An endless, alternating pattern of <code>0</code>, <code>1</code>, <code>0</code>, <code>1</code>, <code>0</code>, <code>1</code>, <code>0</code>, <code>1</code>, <code>0</code>, <code>1</code>....&quot; He trails off.</p>
<p>You ask if the antenna can handle a clock signal at the frequency you would need to use for the data from the stars. &quot;There&apos;s <em>no way</em> it can! The only antenna we&apos;ve installed capable of <em>that</em> is on top of a top-secret Easter Bunny installation, and you&apos;re <em>definitely</em> not-&quot; You hang up the phone.</p>
<p>You&apos;ve extracted the antenna&apos;s clock signal generation <a href="12">assembunny</a> code (your puzzle input); it looks mostly compatible with code you worked on <a href="23">just recently</a>.</p>
<p>This antenna code, being a signal generator, uses one extra instruction:</p>
<ul>
<li><code>out x</code> <em>transmits</em> <code>x</code> (either an integer or the <em>value</em> of a register) as the next value for the clock signal.</li>
</ul>
<p>The code takes a value (via register <code>a</code>) that describes the signal to generate, but you&apos;re not sure how it&apos;s used. You&apos;ll have to find the input to produce the right signal through experimentation.</p>
<p><em>What is the lowest positive integer</em> that can be used to initialize register <code>a</code> and cause the code to output a clock signal of <code>0</code>, <code>1</code>, <code>0</code>, <code>1</code>... repeating forever?</p>
