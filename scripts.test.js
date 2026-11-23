// Tests added during the 2026 cleanup (the code-along had no tests).
// Each test runs a script exactly the way you would in a terminal,
// e.g. `node greet.js Rick`, and checks what it prints.
const { execFileSync } = require('child_process');
const path = require('path');

const run = (file, ...args) =>
  execFileSync(process.execPath, [path.join(__dirname, file), ...args], { encoding: 'utf8' }).trim();

describe('say-hi.js', () => {
  it('prints a hello message', () => {
    expect(run('say-hi.js')).toBe('Hello man');
  });
});

describe('greet.js', () => {
  it('greets the name typed after the file name', () => {
    expect(run('greet.js', 'Rick')).toBe('Rick, how are ya?');
  });

  it('explains what to type when no name is given', () => {
    expect(run('greet.js')).toMatch(/Please type your name/);
  });
});

describe('mental-age.js', () => {
  it('prints half the age plus 3', () => {
    expect(run('mental-age.js', '40')).toBe('Hello, your mental age is 23');
  });

  it('explains what to type when the age is missing or not a number', () => {
    expect(run('mental-age.js')).toMatch(/Please type your age as a number/);
    expect(run('mental-age.js', 'forty')).toMatch(/Please type your age as a number/);
  });
});

describe('fizzy.js', () => {
  it('prints the FizzBuzz answer for the typed number', () => {
    expect(run('fizzy.js', '15')).toBe('FizzBuzz');
    expect(run('fizzy.js', '9')).toBe('Fizz');
    expect(run('fizzy.js', '10')).toBe('Buzz');
    expect(run('fizzy.js', '7')).toBe('7');
  });

  it('explains what to type when the input is missing or not a number', () => {
    expect(run('fizzy.js')).toMatch(/Please type a number/);
    expect(run('fizzy.js', 'abc')).toMatch(/Please type a number/);
  });
});

describe('main.js (fizzy function)', () => {
  const fizzy = require('./main.js');

  it('returns Fizz, Buzz, FizzBuzz or the number', () => {
    expect(fizzy(3)).toBe('Fizz');
    expect(fizzy(5)).toBe('Buzz');
    expect(fizzy(15)).toBe('FizzBuzz');
    expect(fizzy(31)).toBe(31);
  });
});
