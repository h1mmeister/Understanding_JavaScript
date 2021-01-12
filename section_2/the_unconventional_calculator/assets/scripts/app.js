/* eslint-disable */

const defaultResult = 0;
let currentResult = defaultResult;
let calculationDescription = "";

// function declaration
function add(num1, num2) {
  const result = num1 + num2;
  // alert(`The result is ${result}`);
  return result;
}

currentResult = add(5, 5); // calling or invoking the function

// currentResult = currentResult + 10;
// calculationDescription = `(${defaultResult} + 10)`; // template literal

outputResult(currentResult, "");
