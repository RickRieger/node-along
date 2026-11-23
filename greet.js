const getInput = require("./get-input.js");

const name = getInput();

if (name === undefined) {
  console.log("Please type your name after the file name, like: node greet.js Rick");
} else {
  console.log(name + ", how are ya?");
}
