

function fizzy(num){
  if (num % 3 === 0 && num % 5 === 0)
  return "FizzBuzz";
  else if(num % 3 === 0 && num % 5 != 0)
  return "Fizz";
  else if(num % 3 != 0 && num % 5 === 0)
  return "Buzz";
  else(num % 3 != 0 && num % 5 != 0)
  return num;
}








