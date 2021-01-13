/* eslint-disable */

const defaultResult = 0;
let currentResult = defaultResult;
// let calculationDescription = "";

// this functon will help me in order to get the user input parsed into integer
function getUserNumberInput() {
  return parseInt(userInput.value);
}

// function declaration
// Onr thing to note that we can use variables, constants, or functions defined in the global scope within our function add
function add() {
  const enteredNumber = getUserNumberInput(); // calling getUserNumberInput() to get the number entered by the user and storing it in enterendNumber constant
  const calcDescription = `${currentResult} + ${enteredNumber}`;
  currentResult = currentResult + enteredNumber; // whatever we get from the user input would be a string, so here we are adding a string with a number with the  + operator that will basically do concatenation
  // we can use either parseInt or parseFloat or simply +. With +, it will automatically check and correspond whether it needs to convert the input to integer or float.
  outputResult(currentResult, calcDescription);

  //const result = num1 + num2; // result is defined inside the function add and has a block scope, we can't use it outside this scope
  // alert(`The result is ${result}`);
  // return result; // return statements are used to stop the function's execution and any code after that will not execute
}

addBtn.addEventListener("click", add); // here, we are telling the JavaScript engine that when the user clicks on the add button, then only execute the add function
// currentResult = add(5, 5); // calling or invoking the function

// currentResult = currentResult + 10;
// calculationDescription = `(${defaultResult} + 10)`; // template literal
