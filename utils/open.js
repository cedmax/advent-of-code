const open = require("open");

const date = new Date();
const year = date.getFullYear();
const day = date.getMonth();

open(`https://adventofcode.com/${year}/day/${day}`);
