const input = require("../../utils/getInput")(__dirname);
const withoutSureGarbage = input.replace(/(<[^!>]+>)/g, "");

console.log(withoutSureGarbage);
// not finished
