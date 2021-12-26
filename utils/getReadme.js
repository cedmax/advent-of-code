require("dotenv").config();
const axios = require("axios");
const cheerio = require("cheerio");
const fse = require("fs-extra");

process.chdir(__dirname);
const startYear = 2015;

const indexTemplate = `const input = require('../../utils/getInput')(__dirname, { split: null });\n\nconsole.log(input)\nconsole.log('METHOD NOT IMPLEMENTED')`;

const defaultOptions = {
  method: "get",
  headers: {
    Cookie: "session=" + process.env.COOKIE
  }
};

const getFinal = async (year) => {
  console.log(year, "fetch final");

  const { data } = await axios.post(`https://adventofcode.com/${year}/day/25/answer`, "level=2&answer=0", {
    ...defaultOptions
  });

  const $ = cheerio.load(data);
  let html = $("article p").toArray();
  html.length = 3;

  html = html.map((i) => $(i).html()).join("\n\n");

  const readme = `../${year}/Readme.md`;
  await fse.outputFile(readme, html);
};

const getReadme = async (year, day, file) => {
  console.log(year, day, "fetch readme");

  const { data } = await axios({
    url: `https://adventofcode.com/${year}/day/${day}`,
    ...defaultOptions
  });

  const $ = cheerio.load(data);
  const html = $(".day-desc")
    .toArray()
    .map((i) => $(i).html())
    .join("\n");

  await fse.outputFile(file, html);
};

const getInput = async (year, day, file) => {
  console.log(year, day, "fetch input");

  const { data: input } = await axios({
    url: `https://adventofcode.com/${year}/day/${day}/input`,
    responseType: "arraybuffer",
    ...defaultOptions
  });

  await fse.outputFile(file, input.toString().replace(/\n*$/, ""));
};

const fetch = async (day, year) => {
  const readme = `../${year}/${day.toString().padStart(2, "0")}/Readme.md`;
  await getReadme(year, day, readme);

  const input = `../${year}/${day.toString().padStart(2, "0")}/input.txt`;
  if (!fse.pathExistsSync(input)) {
    await getInput(year, day, input);
  }

  const index = `../${year}/${day.toString().padStart(2, "0")}/index.js`;
  if (!fse.pathExistsSync(index)) {
    await fse.outputFile(index, indexTemplate);
  }
};

(async () => {
  const date = new Date();
  const currentYear = date.getFullYear();
  // for (let year = startYear; year < currentYear; year++) {
  //   for (let day = 1; day <= 25; day++) {
  //     await fetch(day, year);
  //   }
  // }

  const finalDate = date.getDate() > 25 ? 25 : date.getDate();
  if (date.getMonth() === 11) {
    for (let day = 1; day <= finalDate; day++) {
      await fetch(day, currentYear);
    }
  }
  if (finalDate === 25) {
    await getFinal(currentYear);
  }
})();
