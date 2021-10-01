const fs = require("fs");
const core = require("@actions/core");

function validInput(parsed) {
  if (parsed.length != 81) return false;
  if (parsed.replace(/([0-9])+/g, "")) return false;
  return true;
}

function validAnswer(parsed) {
  // Check proper sudoku ans
  // Check the map match original map (so you cant just put your own map)
}

function checkAnswer(answer) {
  const parsed = answer.replace(/([\|\-\+\s])+/g, "");
  console.log(parsed);
  if (!validInput(parsed)) throw Error("Invalid Input");
  if (validAnswer(parsed)) console.log("✅ Solution Passed!");
  else core.error("❌ Solution Failed!");
}

function readFile() {
  try {
    const answer = fs.readFileSync("./solution.txt", "utf8");
    checkAnswer(answer);
  } catch (err) {
    core.error(err);
  }
}

readFile();
