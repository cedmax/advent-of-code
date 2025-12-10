const input = require("../../utils/getInput")(__dirname, { split: "\n" });

// This is a problem I wouldn't have been able to sort out
// myself. I took the chance to try working with an
// agentic partner to understand better the problem space
// and because it would scratch my completionist's itch.
//
// Whilst I now kinda get the first part – albeit not
// my cup of tea – the second part is still very much
// a mistery for me.

const parseLine = (line) => {
  const targetState = [...line.match(/\[([.#]+)\]/)[1]].map((c) => (c === "#" ? 1 : 0));
  const buttons = [...line.matchAll(/\(([0-9,]+)\)/g)].map((m) => m[1].split(",").map(Number));
  const joltageTarget = line
    .match(/\{([0-9,]+)\}/)[1]
    .split(",")
    .map(Number);

  return { targetState, buttons, joltageTarget };
};

const popcount = (n) => n.toString(2).split("1").length - 1;

const part1 = ({ targetState, buttons }) => {
  let minPresses = Infinity;

  for (let mask = 0; mask < 1 << buttons.length; mask++) {
    const state = Array(targetState.length).fill(0);
    buttons.forEach((btn, i) => {
      if (mask & (1 << i)) btn.forEach((light) => (state[light] ^= 1));
    });

    if (state.every((val, idx) => val === targetState[idx])) {
      minPresses = Math.min(minPresses, popcount(mask));
    }
  }

  return minPresses;
};

console.log(input.reduce((sum, ln) => sum + part1(parseLine(ln)), 0));

const gaussianElimination = (matrix, numCounters, numButtons) => {
  let lead = 0;

  for (let r = 0; r < numCounters; r++) {
    if (lead >= numButtons) break;

    // Find pivot more efficiently
    let pivotRow = -1;
    for (let i = r; i < numCounters; i++) {
      if (matrix[i][lead] !== 0) {
        pivotRow = i;
        break;
      }
    }

    if (pivotRow === -1) {
      lead++;
      r--;
      if (lead >= numButtons) break;
      continue;
    }

    // Swap rows if needed
    if (pivotRow !== r) {
      [matrix[r], matrix[pivotRow]] = [matrix[pivotRow], matrix[r]];
    }

    const pivot = matrix[r][lead];
    for (let j = 0; j <= numButtons; j++) {
      matrix[r][j] /= pivot;
    }

    for (let i = 0; i < numCounters; i++) {
      if (i !== r && matrix[i][lead] !== 0) {
        const factor = matrix[i][lead];
        for (let j = 0; j <= numButtons; j++) {
          matrix[i][j] -= factor * matrix[r][j];
        }
      }
    }

    lead++;
  }
  return matrix;
};

const identifyColumns = (matrix, numButtons) => {
  const pivotCols = [];

  for (let r = 0; r < matrix.length; r++) {
    for (let c = 0; c < numButtons; c++) {
      if (Math.abs(matrix[r][c] - 1) < 0.0001) {
        pivotCols.push({ row: r, col: c });
        break;
      }
    }
  }

  const pivotColSet = new Set(pivotCols.map((p) => p.col));
  const freeCols = [];

  for (let c = 0; c < numButtons; c++) {
    if (!pivotColSet.has(c)) {
      freeCols.push(c);
    }
  }

  return { pivotCols, freeCols };
};

const buildMatrix = (joltageTarget, buttons) => {
  const buttonSets = buttons.map((btn) => new Set(btn));

  return joltageTarget.map((target, counterIdx) => {
    const row = Array(buttons.length + 1).fill(0);
    buttonSets.forEach((btnSet, btnIdx) => {
      row[btnIdx] = btnSet.has(counterIdx) ? 1 : 0;
    });
    row[buttons.length] = target;
    return row;
  });
};

const calculateBounds = (freeCols, buttons, joltageTarget) => freeCols.map((col) => Math.min(Math.max(...buttons[col].map((idx) => joltageTarget[idx])), 300));

const computeAndVerify = (freeVals, freeCols, pivotCols, matrix, buttons, joltageTarget) => {
  const numButtons = buttons.length;
  const solution = Array(numButtons).fill(0);

  freeCols.forEach((col, idx) => {
    solution[col] = freeVals[idx];
  });

  pivotCols.forEach(({ row, col }) => {
    let val = matrix[row][numButtons];
    for (let c = 0; c < numButtons; c++) {
      if (c !== col) val -= matrix[row][c] * solution[c];
    }
    solution[col] = val;
  });

  if (!solution.every((x) => x >= -0.001 && Math.abs(x - Math.round(x)) < 0.001)) return null;

  const rounded = solution.map((x) => Math.round(Math.max(0, x)));
  const verify = Array(joltageTarget.length).fill(0);

  rounded.forEach((count, btnIdx) => {
    buttons[btnIdx].forEach((counterIdx) => {
      verify[counterIdx] += count;
    });
  });

  return verify.every((val, idx) => val === joltageTarget[idx]) ? rounded.reduce((sum, x) => sum + x, 0) : null;
};

const searchFreeVariables = (freeCols, bounds, pivotCols, matrix, buttons, joltageTarget) => {
  let minPresses = Infinity;
  const current = Array(freeCols.length).fill(0); // Reusable array

  const search = (index) => {
    if (index === freeCols.length) {
      const result = computeAndVerify(current, freeCols, pivotCols, matrix, buttons, joltageTarget);
      if (result !== null) {
        minPresses = Math.min(minPresses, result);
      }
      return;
    }

    for (let val = 0; val <= bounds[index]; val++) {
      current[index] = val; // Mutate instead of spread
      search(index + 1);
    }
  };

  search(0);
  return minPresses;
};

const part2 = ({ joltageTarget, buttons }) => {
  const numButtons = buttons.length;
  const numCounters = joltageTarget.length;
  const matrix = gaussianElimination(buildMatrix(joltageTarget, buttons), numCounters, numButtons);
  const { pivotCols, freeCols } = identifyColumns(matrix, numButtons);

  if (freeCols.length === 0) {
    const solution = Array(numButtons).fill(0);
    pivotCols.forEach(({ row, col }) => {
      solution[col] = Math.round(matrix[row][numButtons]);
    });
    return solution.some((x) => x < 0) ? Infinity : solution.reduce((sum, x) => sum + x, 0);
  }

  return searchFreeVariables(freeCols, calculateBounds(freeCols, buttons, joltageTarget), pivotCols, matrix, buttons, joltageTarget);
};

console.log(input.reduce((sum, ln) => sum + part2(parseLine(ln)), 0));
