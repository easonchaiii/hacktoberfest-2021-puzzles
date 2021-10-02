const fs = require("fs");
const core = require("@actions/core");

function validInput(parsed, p_puzzle) {
  if (parsed.length != 81) return false;
  if (parsed.replace(/([0-9])+/g, "")) return false;
  // Check the map match original map (so you cant just put your own map)
  for (var i = 0; i < p_puzzle.length; i++) {
    if (!isNaN(p_puzzle[i])) {
      if (parsed[i] !== p_puzzle[i]) {
        console.log("Solution does not match puzzle");
        return false;
      }
    }
  }
  return true;
}

function validAnswer(parsed) {
  // Check proper sudoku ans
  //check row
  for (var i = 0; i < 9; i++) {
    var arr = [...parsed.substring(i * 9, i * 9 + 9)];
    var check = arr.filter((item, index) => arr.indexOf(item) != index);
    if (check.length !== 0) {
      return false;
    }
  }

  //check column
  for (var i = 0; i < 9; i++) {
    var arr = [];
    for (var j = 0; j < 9; j++) {
      arr.push(parsed[j * 9 + i]);
    }
    var check = arr.filter((item, index) => arr.indexOf(item) != index);
    if (check.length !== 0) {
      return false;
    }
  }

  //check box
  [0, 3, 6, 27, 30, 33, 54, 57, 60].forEach((item) => {
    var arr = [];
    for (var i = item; i < item + 3; i++) {
      arr.push(parsed[i], parsed[i + 9], parsed[i + 18]);
    }
    var check = arr.filter((item, index) => arr.indexOf(item) != index);
    if (check.length !== 0) {
      return false;
    }
  });
  return true;
}

function checkAnswer(answer, puzzle) {
  const parsed = answer.replace(/([\|\-\+\s])+/g, "");
  const p_puzzle = puzzle.replace(/([\|\-\+\s])+/g, "");
  if (!validInput(parsed, p_puzzle)) {
    core.setFailed("Invalid Input");
  }
  if (validAnswer(parsed)) console.log("✅ Solution Passed!");
  else {
    core.error("❌ Solution Failed!");
    core.setFailed("Incorrect Solution");
  }
}

function readFile() {
  try {
    const answer = fs.readFileSync("./solution.txt", "utf8");
    let puzzle = fs.readFileSync("./README.md", "utf8");
    puzzle = puzzle.slice(puzzle.length - 256, puzzle.length - 5);
    checkAnswer(answer, puzzle);
  } catch (err) {
    core.error(err);
    core.setFailed();
  }
}

readFile();
