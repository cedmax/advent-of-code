const md5 = require("./md5");
const input = require("../../utils/getInput")(__dirname, { split: null });
// const input = "reyedfim";
let password = "";
let counter = 0;
while (password.length < 8) {
  let md5String = md5(input + counter++);
  if (md5String.substring(0, 5) === "00000") {
    password = password + md5String.substring(5, 6);
  }
}

console.log(password);

password = [];
counter = 0;
while (password.filter((i) => i).length < 8) {
  let md5String = md5(input + counter++);
  if (md5String.substring(0, 5) === "00000") {
    if (Number(md5String.substring(5, 6)) < 8 && !password[md5String.substring(5, 6)]) {
      password[md5String.substring(5, 6)] = md5String.substring(6, 7);
    }
  }
}

console.log(password.join(""));
