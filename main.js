const sudoku = require("sudoku");
const helpers = require("./utils/helpers");
const fs = require("fs");

try {
  const data = fs.readFileSync("./README_TEMPLATE.md", "utf8");
  //   console.log(data);
} catch (err) {
  console.error(err);
}

const puzzle = sudoku.makepuzzle();
helpers.prettify(puzzle);
