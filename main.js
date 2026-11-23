// FizzBuzz for one number (same logic as my "fizzy" exercise, fixed the same way).
function fizzy(num) {
  // Check "both" first: once that case has returned, the next checks don't
  // need to rule it out again.
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

module.exports = fizzy;
