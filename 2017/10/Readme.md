<h2>--- Day 10: Knot Hash ---</h2><p>You come across some programs that are trying to implement a software emulation of a hash based on knot-tying. The hash these programs are implementing isn't very strong, but you decide to help them anyway. You make a mental note to remind the Elves later not to <span title="NEW CRYPTOSYSTEM WHO DIS">invent their own cryptographic functions</span>.</p>
<p>This hash function simulates tying a knot in a circle of string with 256 marks on it. Based on the input to be hashed, the function repeatedly selects a span of string, brings the ends together, and gives the span a half-twist to reverse the order of the marks within it. After doing this many times, the order of the marks is used to build the resulting hash.</p>
<pre><code>  4--5   pinch   4  5           4   1
 /    \  5,0,1  / \/ \  twist  / \ / \
3      0  --&gt;  3      0  --&gt;  3   X   0
 \    /         \ /\ /         \ / \ /
  2--1           2  1           2   5
</code></pre>
<p>To achieve this, begin with a <em>list</em> of numbers from <code>0</code> to <code>255</code>, a <em>current position</em> which begins at <code>0</code> (the first element in the list), a <em>skip size</em> (which starts at <code>0</code>), and a sequence of <em>lengths</em> (your puzzle input).  Then, for each length:</p>
<ul>
<li><em>Reverse</em> the order of that <em>length</em> of elements in the <em>list</em>, starting with the element at the <em>current position</em>.</li>
<li><em>Move</em> the <em>current position</em> forward by that <em>length</em> plus the <em>skip size</em>.</li>
<li><em>Increase</em> the <em>skip size</em> by one.</li>
</ul>
<p>The <em>list</em> is circular; if the <em>current position</em> and the <em>length</em> try to reverse elements beyond the end of the list, the operation reverses using as many extra elements as it needs from the front of the list. If the <em>current position</em> moves past the end of the list, it wraps around to the front. <em>Lengths</em> larger than the size of the <em>list</em> are invalid.</p>
<p>Here's an example using a smaller list:</p>
<p>Suppose we instead only had a circular list containing five elements, <code>0, 1, 2, 3, 4</code>, and were given input lengths of <code>3, 4, 1, 5</code>.</p>
<ul>
<li>The list begins as <code>[0] 1 2 3 4</code> (where square brackets indicate the <em>current position</em>).</li>
<li>The first length, <code>3</code>, selects <code>([0] 1 2) 3 4</code> (where parentheses indicate the sublist to be reversed).</li>
<li>After reversing that section (<code>0 1 2</code> into <code>2 1 0</code>), we get <code>([2] 1 0) 3 4</code>.</li>
<li>Then, the <em>current position</em> moves forward by the <em>length</em>, <code>3</code>, plus the <em>skip size</em>, 0: <code>2 1 0 [3] 4</code>. Finally, the <em>skip size</em> increases to <code>1</code>.</li>
</ul>
<ul>
<li>The second length, <code>4</code>, selects a section which wraps: <code>2 1) 0 ([3] 4</code>.</li>
<li>The sublist <code>3 4 2 1</code> is reversed to form <code>1 2 4 3</code>: <code>4 3) 0 ([1] 2</code>.</li>
<li>The <em>current position</em> moves forward by the <em>length</em> plus the <em>skip size</em>, a total of <code>5</code>, causing it not to move because it wraps around: <code>4 3 0 [1] 2</code>. The <em>skip size</em> increases to <code>2</code>.</li>
</ul>
<ul>
<li>The third length, <code>1</code>, selects a sublist of a single element, and so reversing it has no effect.</li>
<li>The <em>current position</em> moves forward by the <em>length</em> (<code>1</code>) plus the <em>skip size</em> (<code>2</code>): <code>4 [3] 0 1 2</code>. The <em>skip size</em> increases to <code>3</code>.</li>
</ul>
<ul>
<li>The fourth length, <code>5</code>, selects every element starting with the second: <code>4) ([3] 0 1 2</code>. Reversing this sublist (<code>3 0 1 2 4</code> into <code>4 2 1 0 3</code>) produces: <code>3) ([4] 2 1 0</code>.</li>
<li>Finally, the <em>current position</em> moves forward by <code>8</code>: <code>3 4 2 1 [0]</code>. The <em>skip size</em> increases to <code>4</code>.</li>
</ul>
<p>In this example, the first two numbers in the list end up being <code>3</code> and <code>4</code>; to check the process, you can multiply them together to produce <code>12</code>.</p>
<p>However, you should instead use the standard list size of <code>256</code> (with values <code>0</code> to <code>255</code>) and the sequence of <em>lengths</em> in your puzzle input. Once this process is complete, <em>what is the result of multiplying the first two numbers in the list</em>?</p>
