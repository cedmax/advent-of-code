const input = require("../../utils/getInput")(__dirname);
const ids = input.split("\n");

const removeLetter = (str, i) => str.slice(0, i) + str.slice(i + 1, str.length);

const inCommon = ids
  .map((id) => {
    const { length } = id;
    const result = ids
      .map((iId) => {
        if (id === iId) {
          return false;
        }

        let i = 0;
        while (i < length) {
          if (removeLetter(id, i) === removeLetter(iId, i)) {
            return removeLetter(id, i);
          }
          i++;
        }
      })
      .filter((a) => a);

    if (result.length) {
      return result[0];
    }
  })
  .filter((a) => a);

console.log([...new Set(inCommon)][0]);
