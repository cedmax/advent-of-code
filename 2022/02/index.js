const input = require("../../utils/getInput")(__dirname, { split: "\n" }).map((i) => i.split(" "));

const val = {
  //rock
  X: 1,
  //paper
  Y: 2,
  //scissors
  Z: 3
};

const resVal = {
  win: 6,
  draw: 3,
  lose: 0
};

const act = {
  A: (r) => (r === "X" && resVal.draw) || (r === "Y" && resVal.win) || resVal.lose,
  B: (r) => (r === "Y" && resVal.draw) || (r === "Z" && resVal.win) || resVal.lose,
  C: (r) => (r === "Z" && resVal.draw) || (r === "X" && resVal.win) || resVal.lose
};

const whoWins = (p1, p2) => val[p2] + act[p1](p2);

console.log(input.reduce((acc, i) => acc + whoWins(...i), 0));

const resultVal = {
  // lose
  X: "lose",
  //draw
  Y: "draw",
  //win
  Z: "win"
};

const use = {
  //rock
  A: {
    //to lose
    X: "Z", //scissors
    //to draw
    Y: "X", //rock
    //to win
    Z: "Y" //paper
  },
  //paper
  B: {
    //to lose
    X: "X", //rock
    //to draw
    Y: "Y", //paper
    //to win
    Z: "Z" //scissors
  },
  //scissor
  C: {
    //to lose
    X: "Y", //paper
    //to draw
    Y: "Z", //scissors
    //to win
    Z: "X" //rock
  }
};

const mapAction = (p1, p2) => resVal[resultVal[p2]] + val[use[p1][p2]];

console.log(input.reduce((acc, i) => acc + mapAction(...i), 0));
