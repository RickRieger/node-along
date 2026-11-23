# Node-Along — First Command-Line Scripts With Node.js

[![Tests](https://github.com/RickRieger/node-along/actions/workflows/tests.yml/badge.svg)](https://github.com/RickRieger/node-along/actions/workflows/tests.yml)

A code-along from the **Code Immersives** web development bootcamp in New York City (February 2021): my first time running JavaScript as **command-line programs with [Node.js](https://nodejs.org/)** instead of in a browser or a test runner. Each file is a tiny program you run in a terminal. Some read what you type after the file name, like `node greet.js Rick`. This repo is my fork of the code-along.

**Skills practiced:** running scripts with `node`, reading command-line input (`process.argv`), splitting code across files with `require` / `module.exports`, converting text to numbers, and reusing a function from an earlier exercise (FizzBuzz).

**Built with:** JavaScript (Node.js). The 2026 cleanup added Jest tests; the badge above shows whether they pass on GitHub.

---

## Contents

- [The scripts](#the-scripts)
- [How the pieces fit together](#how-the-pieces-fit-together)
- [Run it yourself](#run-it-yourself)
- [Run the tests](#run-the-tests)
- [Cleanup log (November 2026)](#cleanup-log-november-2026)
- [Original assignment (from the instructor)](#original-assignment-from-the-instructor)

---

## The scripts

Written on **2021-02-23 and 2021-02-24** (commits *"Node"*, *"Geeze I hope this code still work"* and *"fizzy complete"*). Shown as they are after the 2026 cleanup.

| File | Run it like | Prints |
|---|---|---|
| `say-hi.js` | `node say-hi.js` | `Hello man` |
| `greet.js` | `node greet.js Rick` | `Rick, how are ya?` |
| `mental-age.js` | `node mental-age.js 40` | `Hello, your mental age is 23` (half your age plus 3) |
| `fizzy.js` | `node fizzy.js 15` | `FizzBuzz` (or `Fizz`, `Buzz`, or the number) |

Leave off the input, or type something that isn't a number, and the script tells you what to type:

```
$ node fizzy.js abc
Please type a number after the file name, like: node fizzy.js 15
```

## How the pieces fit together

```
get-input.js   helper from the instructor: returns the first thing typed after `node <file>`
main.js        my fizzy() function (from the earlier "fizzy" exercise), exported
greet.js       ─┐
mental-age.js   ├─ require('./get-input.js') to read what you typed
fizzy.js       ─┘  fizzy.js also requires './main.js' to reuse fizzy()
say-hi.js      just prints; no input needed
```

**Reading input:** when you run `node greet.js Rick`, Node stores the command in an array called `process.argv`: `['…/node', '…/greet.js', 'Rick']`. The instructor's `get-input.js` returns item `[2]`, the first thing after the file name, so the scripts don't have to deal with arrays yet.

**Command-line input is always text.** `node mental-age.js 40` gives the script the *string* `'40'`, not the number 40. `mental-age.js` and `fizzy.js` convert it with `Number()`. If it can't be converted (`Number('abc')` is `NaN`, "Not a Number"), they print the help message instead.

**Sharing code between files:** `main.js` ends with `module.exports = fizzy;` and `fizzy.js` loads it with `const fizzy = require('./main.js');`. This is how Node programs split code into files.

## Run it yourself

You need [Node.js](https://nodejs.org/).

```bash
git clone https://github.com/RickRieger/node-along.git
cd node-along
node say-hi.js
node greet.js Rick
node mental-age.js 40
node fizzy.js 15
```

## Run the tests

```bash
npm ci
npm run test:ci   # runs all tests once and exits
npm test          # watch mode: re-runs on every save
```

Expected result: `Tests: 8 passed, 8 total`. [`scripts.test.js`](scripts.test.js) runs each script exactly as you would in a terminal and checks what it prints. [`.github/workflows/tests.yml`](.github/workflows/tests.yml) runs the tests on GitHub after every push, and the badge at the top shows the result.

---

## Cleanup log (November 2026)

All changes below were made on **2026-11-23** on the branch `cleanup-and-tests`, checked by running every script and the tests, and merged into `main`. Each is its own commit. The instructor's `get-input.js` helper is unchanged.

### 1. Fixed `fizzy`'s `else` with a condition (same issue as my fizzy repo)

**Why:** `main.js` reused my `fizzy` function from the [fizzy exercise](https://github.com/RickRieger/fizzy), including its last line:

```js
// Before
  else(num % 3 != 0 && num % 5 != 0)
  return num;
```

**`else` can't take a condition.** JavaScript treated the check as the whole `else` body (computed, then thrown away), and `return num;` became a separate line *after* the if-chain. It gave the right answer only because that line is reached when nothing above returned. I applied the same fix as in the fizzy repo:

```js
// After
function fizzy(num) {
  if (num % 3 === 0 && num % 5 === 0) {
    return 'FizzBuzz';
  } else if (num % 3 === 0) {
    return 'Fizz';
  } else if (num % 5 === 0) {
    return 'Buzz';
  } else {
    return num;
  }
}
```

**Checked:** the old and new functions give identical results on 609 inputs, including every whole number from -300 to 300, decimals, and numbers typed as text the way they arrive from the command line (`'15'`).

### 2. Made `greet.js` presentable

**Why:** this repo is linked from my portfolio. The original stored the name in a variable called `jackAss` and printed *"&lt;name&gt; how the hell are ya?"*. The variable is now `name` and the message is *"&lt;name&gt;, how are ya?"*, which also adds the missing comma.

```js
// Before
const jackAss = getInput();
console.log( jackAss + " how the hell are ya?")

// After
const name = getInput();
console.log(name + ", how are ya?");
```

### 3. Helpful messages when input is missing or isn't a number

**Why:** without input, the scripts printed confusing results:

| Command | Before | After |
|---|---|---|
| `node greet.js` | `undefined how the hell are ya?` | `Please type your name after the file name, like: node greet.js Rick` |
| `node mental-age.js` | `Hello, your mental age is NaN` | `Please type your age as a number…` |
| `node mental-age.js forty` | `Hello, your mental age is NaN` | `Please type your age as a number…` |
| `node fizzy.js` | `undefined` | `Please type a number after the file name, like: node fizzy.js 15` |
| `node fizzy.js abc` | `abc` | `Please type a number…` |

```js
// Before (fizzy.js)
const userInput = getInput();
const answer = fizzy(userInput);
console.log(answer);

// After
const userInput = getInput();
const num = Number(userInput);

if (userInput === undefined || Number.isNaN(num)) {
  console.log("Please type a number after the file name, like: node fizzy.js 15");
} else {
  console.log(fizzy(num));
}
```

`greet.js` and `mental-age.js` follow the same pattern. I also tidied `say-hi.js`'s spacing and removed a block of empty lines in `mental-age.js`.

### 4. Added tests and automatic test runs on GitHub

**Why:** the code-along had no tests. [`scripts.test.js`](scripts.test.js) runs each script as a real command (using Node's `child_process`), with and without input, and checks what it prints. It also tests the `fizzy` function directly. `package.json` adds Jest 29 with `npm test` (watch mode) and `npm run test:ci` (run once), and a GitHub Actions workflow runs the tests after every push.

### 5. Added this README section

The instructor's original task list is below, unchanged.

---

## Original assignment (from the instructor)

*The text below is the README as written by the Code Immersives instructor, unchanged.*

### Node-Along

A node-based code-along.

### Your Tasks:

- Make `say-hi.js` print out a hello message.
- Make `greet.js` say hello with the user's name.
- Make `mental-age.js` print out the user's mental age.
- Make `fizzy.js` print out the FizzBuzz answer for the user's number.
