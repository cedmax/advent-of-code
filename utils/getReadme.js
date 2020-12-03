require("dotenv").config();
const axios = require("axios");
const cheerio = require("cheerio");
const fse = require("fs-extra");

process.chdir(__dirname);
const startYear = 2015;

const indexTemplate = `const input = require("../../utils/getInput")(__dirname, { split: null });\n\nconsole.log(input)\nconsole.log('METHOD NOT IMPLEMENTED')`;

const defaultOptions = {
  method: "get",
  headers: {
    Cookie: "session=" + process.env.COOKIE,
  },
};

const getReadme = async (year, day, file) => {
  console.log(year, day, "fetch readme");

  const { data } = await axios({
    url: `https://adventofcode.com/${year}/day/${day}`,
    ...defaultOptions,
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
    ...defaultOptions,
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
  for (let year = startYear; year < currentYear; year++) {
    for (let day = 1; day <= 25; day++) {
      await fetch(day, year);
    }
  }

  if (date.getMonth() === 11) {
    for (let day = 1; day <= date.getDate(); day++) {
      await fetch(day, currentYear);
    }
  }
})();
