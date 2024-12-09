const input = require("../../utils/getInput")(__dirname, { split: "\n" });

// const input = `aaaaa-bbb-z-y-x-123[abxyz]
// a-b-c-d-e-f-g-h-987[abcde]
// not-a-real-room-404[oarel]
// totally-real-room-200[decoy]`.split("\n");

const rooms = input.map((line) => {
  const [codes, id, checksum] = line.split(/(\d+)\[([^\]]+)\]$/);
  return [codes, Number(id), checksum];
});

const isValid = (code, checksum) => {
  const letterCount = code
    .replace(/-/g, "")
    .split("")
    .reduce((obj, letter) => {
      obj[letter] = (obj[letter] ? obj[letter] : 0) + 1;
      return obj;
    }, {});

  const string = Object.entries(letterCount)
    .reduce((obj, [letter, total]) => {
      obj[total] = obj[total] || [];
      obj[total].push(letter);
      obj[total].sort();
      return obj;
    }, [])
    .filter((a) => a)
    .reverse()
    .flat()
    .join("")
    .slice(0, 5);

  return string === checksum;
};

const total = rooms.reduce((tot, [code, id, checksum]) => (isValid(code, checksum) ? tot + id : tot), 0);
console.log(total);

const decrypt = (string, cycles) => {
  const arr = string.split("");

  return arr
    .map((letter) => {
      if (letter === "-") return " ";
      const letterCode = letter.charCodeAt();
      const newCode = ((letterCode - 97 + cycles) % 26) + 97;
      return String.fromCharCode(newCode);
    })
    .join("")
    .trim();
};

rooms.forEach(([code, id, checksum]) => {
  if (isValid(code, checksum)) {
    if (decrypt(code, id) == "northpole object storage") {
      console.log(id);
    }
  }
});
