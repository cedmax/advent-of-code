const open = require("open");

let year, day;

const args = process.argv.slice(2)[0] || "";

if (args.includes("/")) {
  [year, day] = args.split("/");
} else {
  const date = new Date();
  year = date.getFullYear();
  day = args ? args : date.getDate();
}

open(`https://adventofcode.com/${year}/day/${day}`);
