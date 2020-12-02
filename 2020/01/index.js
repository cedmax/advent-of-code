const input = require("../../utils/getInput")(__dirname, {
  split: "\n",
}).map((item) => parseInt(item, 10));

loop: for (const item of input) {
  loopInt: for (const following of input) {
    const result = item + following;
    if (result === 2020) {
      console.log(item * following);
      break loop;
    }
  }
}

loop: for (const item of input) {
  loopInt: for (const following of input) {
    loopIntr: for (const followingInt of input) {
      const result = item + following + followingInt;
      if (result === 2020) {
        console.log(item * following * followingInt);
        break loop;
      }
    }
  }
}
