const getInput = require("./get-input.js");
const fizzy = require("./main.js");

// Everything typed on the command line arrives as text, so convert it to a number.
const userInput = getInput();
const num = Number(userInput);

if (userInput === undefined || Number.isNaN(num)) {
  console.log("Please type a number after the file name, like: node fizzy.js 15");
} else {
  console.log(fizzy(num));
}
