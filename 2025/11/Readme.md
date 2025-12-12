<h2>--- Day 11: Reactor ---</h2><p>You hear some loud beeping coming from a hatch in the floor of the factory, so you decide to check it out. Inside, you find several large electrical conduits and a ladder.</p>
<p>Climbing down the ladder, you discover the source of the <span title="The beeping is unrelated to the issue with the server rack. The reactor is just hungry.">beeping</span>: a large, toroidal reactor which powers the factory above. Some Elves here are hurriedly running between the reactor and a nearby server rack, apparently trying to fix something.</p>
<p>One of the Elves notices you and rushes over. "It's a good thing you're here! We just installed a new <em>server rack</em>, but we aren't having any luck getting the reactor to communicate with it!" You glance around the room and see a tangle of cables and devices running from the server rack to the reactor. She rushes off, returning a moment later with a list of the devices and their outputs (your puzzle input).</p>
<p>For example:</p>
<pre><code>aaa: you hhh
you: bbb ccc
bbb: ddd eee
ccc: ddd eee fff
ddd: ggg
eee: out
fff: out
ggg: out
hhh: ccc fff iii
iii: out
</code></pre>
<p>Each line gives the name of a device followed by a list of the devices to which its outputs are attached. So, <code>bbb: ddd eee</code> means that device <code>bbb</code> has two outputs, one leading to device <code>ddd</code> and the other leading to device <code>eee</code>.</p>
<p>The Elves are pretty sure that the issue isn't due to any specific device, but rather that the issue is triggered by data following some specific <em>path</em> through the devices. Data only ever flows from a device through its outputs; it can't flow backwards.</p>
<p>After dividing up the work, the Elves would like you to focus on the devices starting with the one next to you (an Elf hastily attaches a label which just says <em><code>you</code></em>) and ending with the main output to the reactor (which is the device with the label <em><code>out</code></em>).</p>
<p>To help the Elves figure out which path is causing the issue, they need you to find <em>every</em> path from <code>you</code> to <code>out</code>.</p>
<p>In this example, these are all of the paths from <code>you</code> to <code>out</code>:</p>
<ul>
<li>Data could take the connection from <code>you</code> to <code>bbb</code>, then from <code>bbb</code> to <code>ddd</code>, then from <code>ddd</code> to <code>ggg</code>, then from <code>ggg</code> to <code>out</code>.</li>
<li>Data could take the connection to <code>bbb</code>, then to <code>eee</code>, then to <code>out</code>.</li>
<li>Data could go to <code>ccc</code>, then <code>ddd</code>, then <code>ggg</code>, then <code>out</code>.</li>
<li>Data could go to <code>ccc</code>, then <code>eee</code>, then <code>out</code>.</li>
<li>Data could go to <code>ccc</code>, then <code>fff</code>, then <code>out</code>.</li>
</ul>
<p>In total, there are <code><em>5</em></code> different paths leading from <code>you</code> to <code>out</code>.</p>
<p><em>How many different paths lead from <code>you</code> to <code>out</code>?</em></p>
