<h2>--- Day 7: Internet Protocol Version 7 ---</h2><p>While snooping around the local network of EBHQ, you compile a list of <a href="https://en.wikipedia.org/wiki/IP_address">IP addresses</a> (they're IPv7, of course; <a href="https://en.wikipedia.org/wiki/IPv6">IPv6</a> is much too limited). You'd like to figure out which IPs support <em>TLS</em> (transport-layer snooping).</p>
<p>An IP supports TLS if it has an Autonomous Bridge Bypass Annotation, or <span title="Any similarity to the pattern it describes is purely coincidental."><em>ABBA</em></span>.  An ABBA is any four-character sequence which consists of a pair of two different characters followed by the reverse of that pair, such as <code>xyyx</code> or <code>abba</code>.  However, the IP also must not have an ABBA within any hypernet sequences, which are contained by <em>square brackets</em>.</p>
<p>For example:</p>
<ul>
<li><code>abba[mnop]qrst</code> supports TLS (<code>abba</code> outside square brackets).</li>
<li><code>abcd[bddb]xyyx</code> does <em>not</em> support TLS (<code>bddb</code> is within square brackets, even though <code>xyyx</code> is outside square brackets).</li>
<li><code>aaaa[qwer]tyui</code> does <em>not</em> support TLS (<code>aaaa</code> is invalid; the interior characters must be different).</li>
<li><code>ioxxoj[asdfgh]zxcvbn</code> supports TLS (<code>oxxo</code> is outside square brackets, even though it's within a larger string).</li>
</ul>
<p><em>How many IPs</em> in your puzzle input support TLS?</p>

<h2 id="part2">--- Part Two ---</h2><p>You would also like to know which IPs support <em>SSL</em> (super-secret listening).</p>
<p>An IP supports SSL if it has an Area-Broadcast Accessor, or <em>ABA</em>, anywhere in the supernet sequences (outside any square bracketed sections), and a corresponding Byte Allocation Block, or <em>BAB</em>, anywhere in the hypernet sequences. An ABA is any three-character sequence which consists of the same character twice with a different character between them, such as <code>xyx</code> or <code>aba</code>. A corresponding BAB is the same characters but in reversed positions: <code>yxy</code> and <code>bab</code>, respectively.</p>
<p>For example:</p>
<ul>
<li><code>aba[bab]xyz</code> supports SSL (<code>aba</code> outside square brackets with corresponding <code>bab</code> within square brackets).</li>
<li><code>xyx[xyx]xyx</code> does <em>not</em> support SSL (<code>xyx</code>, but no corresponding <code>yxy</code>).</li>
<li><code>aaa[kek]eke</code> supports SSL (<code>eke</code> in supernet with corresponding <code>kek</code> in hypernet; the <code>aaa</code> sequence is not related, because the interior character must be different).</li>
<li><code>zazbz[bzb]cdb</code> supports SSL (<code>zaz</code> has no corresponding <code>aza</code>, but <code>zbz</code> has a corresponding <code>bzb</code>, even though <code>zaz</code> and <code>zbz</code> overlap).</li>
</ul>
<p><em>How many IPs</em> in your puzzle input support SSL?</p>
