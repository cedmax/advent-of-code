const input = require("../../utils/getInput")(__dirname, { split: "\n" });

const calculateSizes = (ops) => {
  const { structure } = ops.reduce(
    ({ structure, path }, op) => {
      const folder = op.match(/cd ([a-zA-Z]+)/);
      if (folder) {
        path.push(folder[1]);
      }

      if (op.match(/cd \.\./)) {
        path.pop();
      }

      const file = op.match(/(\d+) (.+)/);
      if (file) {
        path.reduce((acc, pathStep) => {
          acc = acc + "__" + pathStep;
          structure[acc] = (structure[acc] || 0) + parseInt(file[1], 10);
          return acc;
        }, "");
      }

      return { structure, path };
    },
    { structure: {}, path: [] }
  );

  return Object.values(structure).sort((a, b) => a - b);
};

const folderSizes = calculateSizes(input);

console.log(
  Object.values(folderSizes)
    .filter((i) => i < 100000)
    .reduce((a, b) => a + b, 0)
);

const getTotal = (input) =>
  input
    .join("")
    .match(/(\d+)/g)
    .reduce((a, b) => parseInt(a, 10) + parseInt(b, 10), 0);

const findSizeToDelete = (folders, totalUsed) => {
  const total = 70000000;
  const needed = 30000000;

  let idxToDelete = 0;
  while (total - totalUsed + folders[idxToDelete] < needed) {
    ++idxToDelete;
  }
  return folders[idxToDelete];
};

console.log(findSizeToDelete(folderSizes, getTotal(input)));
