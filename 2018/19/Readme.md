<h2>--- Day 19: Go With The Flow ---</h2><p>With the Elves well on their way constructing the North Pole base, you turn your attention back to understanding the inner workings of programming the device.</p>
<p>You can't help but notice that the <a href="16">device's opcodes</a> don't contain any <em>flow control</em> like jump instructions. The device's <a href="16">manual</a> goes on to explain:</p>
<p>"In programs where flow control is required, the <a href="https://en.wikipedia.org/wiki/Program_counter">instruction pointer</a> can be <em>bound to a register</em> so that it can be manipulated directly. This way, <code>setr</code>/<code>seti</code> can function as absolute jumps, <code>addr</code>/<code>addi</code> can function as relative jumps, and other opcodes can cause <span title="Good luck maintaining a program that uses a bitwise operation on its instruction pointer, though.">truly fascinating</span> effects."</p>
<p>This mechanism is achieved through a declaration like <code>#ip 1</code>, which would modify register <code>1</code> so that accesses to it let the program indirectly access the instruction pointer itself. To compensate for this kind of binding, there are now <em>six</em> registers (numbered <code>0</code> through <code>5</code>); the five not bound to the instruction pointer behave as normal. Otherwise, the same rules apply as <a href="16">the last time you worked with this device</a>.</p>
<p>When the <em>instruction pointer</em> is bound to a register, its value is written to that register just before each instruction is executed, and the value of that register is written back to the instruction pointer immediately after each instruction finishes execution. Afterward, move to the next instruction by adding one to the instruction pointer, even if the value in the instruction pointer was just updated by an instruction. (Because of this, instructions must effectively set the instruction pointer to the instruction <em>before</em> the one they want executed next.)</p>
<p>The instruction pointer is <code>0</code> during the first instruction, <code>1</code> during the second, and so on. If the instruction pointer ever causes the device to attempt to load an instruction outside the instructions defined in the program, the program instead immediately halts. The instruction pointer starts at <code>0</code>.</p>
<p>It turns out that this new information is already proving useful: the CPU in the device is not very powerful, and a background process is occupying most of its time.  You dump the background process' declarations and instructions to a file (your puzzle input), making sure to use the names of the opcodes rather than the numbers.</p>
<p>For example, suppose you have the following program:</p>
<pre><code>#ip 0
seti 5 0 1
seti 6 0 2
addi 0 1 0
addr 1 2 3
setr 1 0 0
seti 8 0 4
seti 9 0 5
</code></pre>
<p>When executed, the following instructions are executed. Each line contains the value of the instruction pointer at the time the instruction started, the values of the six registers before executing the instructions (in square brackets), the instruction itself, and the values of the six registers after executing the instruction (also in square brackets).</p>
<pre><code>ip=0 [0, 0, 0, 0, 0, 0] seti 5 0 1 [0, 5, 0, 0, 0, 0]
ip=1 [1, 5, 0, 0, 0, 0] seti 6 0 2 [1, 5, 6, 0, 0, 0]
ip=2 [2, 5, 6, 0, 0, 0] addi 0 1 0 [3, 5, 6, 0, 0, 0]
ip=4 [4, 5, 6, 0, 0, 0] setr 1 0 0 [5, 5, 6, 0, 0, 0]
ip=6 [6, 5, 6, 0, 0, 0] seti 9 0 5 [6, 5, 6, 0, 0, 9]
</code></pre>
<p>In detail, when running this program, the following events occur:</p>
<ul>
<li>The first line (<code>#ip 0</code>) indicates that the instruction pointer should be bound to register <code>0</code> in this program. This is not an instruction, and so the value of the instruction pointer does not change during the processing of this line.</li>
<li>The instruction pointer contains <code>0</code>, and so the first instruction is executed (<code>seti 5 0 1</code>).  It updates register <code>0</code> to the current instruction pointer value (<code>0</code>), sets register <code>1</code> to <code>5</code>, sets the instruction pointer to the value of register <code>0</code> (which has no effect, as the instruction did not modify register <code>0</code>), and then adds one to the instruction pointer.</li>
<li>The instruction pointer contains <code>1</code>, and so the second instruction, <code>seti 6 0 2</code>, is executed. This is very similar to the instruction before it: <code>6</code> is stored in register <code>2</code>, and the instruction pointer is left with the value <code>2</code>.</li>
<li>The instruction pointer is <code>2</code>, which points at the instruction <code>addi 0 1 0</code>.  This is like a <em>relative jump</em>: the value of the instruction pointer, <code>2</code>, is loaded into register <code>0</code>. Then, <code>addi</code> finds the result of adding the value in register <code>0</code> and the value <code>1</code>, storing the result, <code>3</code>, back in register <code>0</code>. Register <code>0</code> is then copied back to the instruction pointer, which will cause it to end up <code>1</code> larger than it would have otherwise and skip the next instruction (<code>addr 1 2 3</code>) entirely. Finally, <code>1</code> is added to the instruction pointer.</li>
<li>The instruction pointer is <code>4</code>, so the instruction <code>setr 1 0 0</code> is run. This is like an <em>absolute jump</em>: it copies the value contained in register <code>1</code>, <code>5</code>, into register <code>0</code>, which causes it to end up in the instruction pointer. The instruction pointer is then incremented, leaving it at <code>6</code>.</li>
<li>The instruction pointer is <code>6</code>, so the instruction <code>seti 9 0 5</code> stores <code>9</code> into register <code>5</code>. The instruction pointer is incremented, causing it to point outside the program, and so the program ends.</li>
</ul>
<p><em>What value is left in register <code>0</code></em> when the background process halts?</p>
