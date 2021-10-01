function validInput(parsed) {
  if (parsed.length != 81) return false;
  if (parsed.replace(/([0-9])+/g, "")) return false;
  return true;
}
function basicCheck(answer) {
  const parsed = answer.replace(/([\|\-\+\ \n])+/g, "");
  if (!validInput(parsed)) {
    throw Error("Invalid Input");
  }
}

const lol = `
. . . |5 . 6 |1 . .
. . . |. . . |. 4 .
. . 3 |. . 1 |7 . 6
------+-------+------
. . . |8 5 . |. . .
8 5 6 |. . . |. . .
. . 1 |3 . . |. . .
------+-------+------
. 4 . |. . . |6 . .
. . . |. . . |. 1 .
. . 7 |1 8 . |3 . .
`;
basicCheck(lol);
