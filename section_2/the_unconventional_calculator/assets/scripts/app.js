/* eslint-disable */

const defaultResult = 0;
let currentResult = defaultResult;
let logEntries = []; // this is how we create an array
// let calculationDescription = "";

// this functon will help me in order to get the user input parsed into integer
function getUserNumberInput() {
  return parseInt(userInput.value);
}

function createAndWriteLog(operator, resultBeforeCalc, calcNumber) {
  const calcDescription = `${resultBeforeCalc} ${operator} ${calcNumber}`;
  outputResult(currentResult, calcDescription);
}

// function declaration
// Onr thing to note that we can use variables, constants, or functions defined in the global scope within our function add
function add() {
  const enteredNumber = getUserNumberInput(); // calling getUserNumberInput() to get the number entered by the user and storing it in enterendNumber constant
  const initialResult = currentResult;
  currentResult += enteredNumber; // whatever we get from the user input would be a string, so here we are adding a string with a number with the  + operator that will basically do concatenation
  // we can use either parseInt or parseFloat or simply +. With +, it will automatically check and correspond whether it needs to convert the input to integer or float.
  createAndWriteLog("+", initialResult, enteredNumber);

  //const result = num1 + num2; // result is defined inside the function add and has a block scope, we can't use it outside this scope
  // alert(`The result is ${result}`);
  // return result; // return statements are used to stop the function's execution and any code after that will not execute
  const logEntry = {
    operation: "ADD",
    prevResult: initialResult,
    number: enteredNumber,
    result: currentResult,
  }; // this is an object in javascript

  logEntries.push(logEntry);
  console.log(logEntries);
}

function subtract() {
  const enteredNumber = getUserNumberInput();
  const initialResult = currentResult;
  currentResult -= enteredNumber;
  createAndWriteLog("-", initialResult, enteredNumber);
}

function multiply() {
  const enteredNumber = getUserNumberInput();
  const initialResult = currentResult;
  currentResult *= enteredNumber;
  createAndWriteLog("*", initialResult, enteredNumber);
}

function divide() {
  const enteredNumber = getUserNumberInput();
  const initialResult = currentResult;
  currentResult /= enteredNumber;
  createAndWriteLog("/", initialResult, enteredNumber);
}

addBtn.addEventListener("click", add); // here, we are telling the JavaScript engine that when the user clicks on the add button, then only execute the add function
subtractBtn.addEventListener("click", subtract);
multiplyBtn.addEventListener("click", multiply);
divideBtn.addEventListener("click", divide);
// currentResult = add(5, 5); // calling or invoking the function

// currentResult = currentResult + 10;
// calculationDescription = `(${defaultResult} + 10)`; // template literal

// we have two special operators ,++ and -- which we can use when we are incrementing or decrementing by 1
// For instance, x = x + 1 can be written as x++
// Also, adding ++ in front will return the value after modifying the variable, if we add after the variable, it will first return the previous value and then add 1 to it
