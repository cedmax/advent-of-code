<h2>--- Day 25: Combo Breaker ---</h2><p>You finally reach the check-in desk. Unfortunately, their registration systems are currently offline, and they cannot check you in. Noticing the look on your face, they quickly add that tech support is already on the way! They even created all the room keys this morning; you can take yours now and give them your room deposit once the registration system comes back online.</p>
<p>The room key is a small <a href="https://en.wikipedia.org/wiki/Radio-frequency_identification" target="_blank">RFID</a> card. Your room is on the 25th floor and the elevators are also temporarily out of service, so it takes what little energy you have left to even climb the stairs and navigate the halls. You finally reach the door to your room, swipe your card, and - <em>beep</em> - the light turns red.</p>
<p>Examining the card more closely, you discover a phone number for tech support.</p>
<p>&quot;Hello! How can we help you today?&quot; You explain the situation.</p>
<p>&quot;Well, it sounds like the card isn&apos;t sending the right command to unlock the door. If you go back to the check-in desk, surely someone there can reset it for you.&quot; Still catching your breath, you describe the status of the elevator and the exact number of stairs you just had to climb.</p>
<p>&quot;I see! Well, your only other option would be to reverse-engineer the cryptographic handshake the card does with the door and then inject your own commands into the data stream, but that&apos;s definitely impossible.&quot; You thank them for their time.</p>
<p>Unfortunately for the door, you know a thing or two about cryptographic handshakes.</p>
<p>The handshake used by the card and the door involves an operation that <em>transforms</em> a <em>subject number</em>. To transform a subject number, start with the value <code>1</code>. Then, a number of times called the <em>loop size</em>, perform the following steps:</p>
<ul>
<li>Set the value to itself multiplied by the <em>subject number</em>.</li>
<li>Set the value to the remainder after dividing the value by <em><code>20201227</code></em>.</li>
</ul>
<p>The card always uses a specific, secret <em>loop size</em> when it transforms a subject number. The door always uses a different, secret loop size.</p>
<p>The cryptographic handshake works like this:</p>
<ul>
<li>The <em>card</em> transforms the subject number of <em><code>7</code></em> according to the <em>card&apos;s</em> secret loop size. The result is called the <em>card&apos;s public key</em>.</li>
<li>The <em>door</em> transforms the subject number of <em><code>7</code></em> according to the <em>door&apos;s</em> secret loop size. The result is called the <em>door&apos;s public key</em>.</li>
<li>The card and door use the wireless RFID signal to transmit the two public keys (your puzzle input) to the other device. Now, the <em>card</em> has the <em>door&apos;s</em> public key, and the <em>door</em> has the <em>card&apos;s</em> public key. Because you can eavesdrop on the signal, you have both public keys, but neither device&apos;s loop size.</li>
<li>The <em>card</em> transforms the subject number of <em>the door&apos;s public key</em> according to the <em>card&apos;s</em> loop size. The result is the <em>encryption key</em>.</li>
<li>The <em>door</em> transforms the subject number of <em>the card&apos;s public key</em> according to the <em>door&apos;s</em> loop size. The result is the same <em>encryption key</em> as the <em>card</em> calculated.</li>
</ul>
<p>If you can use the two public keys to determine each device&apos;s loop size, you will have enough information to calculate the secret <em>encryption key</em> that the card and door use to communicate; this would let you send the <code>unlock</code> command directly to the door!</p>
<p>For example, suppose you know that the card&apos;s public key is <code>5764801</code>. With a little trial and error, you can work out that the card&apos;s loop size must be <em><code>8</code></em>, because transforming the initial subject number of <code>7</code> with a loop size of <code>8</code> produces <code>5764801</code>.</p>
<p>Then, suppose you know that the door&apos;s public key is <code>17807724</code>. By the same process, you can determine that the door&apos;s loop size is <em><code>11</code></em>, because transforming the initial subject number of <code>7</code> with a loop size of <code>11</code> produces <code>17807724</code>.</p>
<p>At this point, you can use either device&apos;s loop size with the other device&apos;s public key to calculate the <em>encryption key</em>. Transforming the subject number of <code>17807724</code> (the door&apos;s public key) with a loop size of <code>8</code> (the card&apos;s loop size) produces the encryption key, <em><code>14897079</code></em>. (Transforming the subject number of <code>5764801</code> (the card&apos;s public key) with a loop size of <code>11</code> (the door&apos;s loop size) produces the same encryption key: <em><code>14897079</code></em>.)</p>
<p><em>What encryption key is the handshake trying to establish?</em></p>
