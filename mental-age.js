const getInput = require("./get-input.js");

// Everything typed on the command line arrives as text, so convert it to a number.
const userAge = Number(getInput());

if (getInput() === undefined || Number.isNaN(userAge)) {
  console.log("Please type your age as a number after the file name, like: node mental-age.js 40");
} else {
  const mentalAge = userAge / 2 + 3;
  console.log("Hello, your mental age is " + mentalAge);
}
