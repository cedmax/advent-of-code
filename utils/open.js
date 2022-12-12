const open = require("open");

const date = new Date();
const year = date.getFullYear();
const day = date.getDate();

open(`https://adventofcode.com/${year}/day/${day}`);
