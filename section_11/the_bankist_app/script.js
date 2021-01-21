"use strict";

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// BANKIST APP

// Data
const account1 = {
  owner: "Jonas Schmedtmann",
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: "Jessica Davis",
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: "Steven Thomas Williams",
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: "Sarah Smith",
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const account5 = {
  owner: "Himanshu Yadav",
  movements: [5000, -3400, -1500, 7900, -3210, 10000, 8500, -300],
  interestRate: 2.1,
  pin: 9890,
};

const accounts = [account1, account2, account3, account4, account5];

// Elements
const labelWelcome = document.querySelector(".welcome");
const labelDate = document.querySelector(".date");
const labelBalance = document.querySelector(".balance__value");
const labelSumIn = document.querySelector(".summary__value--in");
const labelSumOut = document.querySelector(".summary__value--out");
const labelSumInterest = document.querySelector(".summary__value--interest");
const labelTimer = document.querySelector(".timer");

const containerApp = document.querySelector(".app");
const containerMovements = document.querySelector(".movements");

const btnLogin = document.querySelector(".login__btn");
const btnTransfer = document.querySelector(".form__btn--transfer");
const btnLoan = document.querySelector(".form__btn--loan");
const btnClose = document.querySelector(".form__btn--close");
const btnSort = document.querySelector(".btn--sort");

const inputLoginUsername = document.querySelector(".login__input--user");
const inputLoginPin = document.querySelector(".login__input--pin");
const inputTransferTo = document.querySelector(".form__input--to");
const inputTransferAmount = document.querySelector(".form__input--amount");
const inputLoanAmount = document.querySelector(".form__input--loan-amount");
const inputCloseUsername = document.querySelector(".form__input--user");
const inputClosePin = document.querySelector(".form__input--pin");

///////////////////////////////////////////////////////////////////////////////////////////////////////////////

const displayMovements = function (movements) {
  containerMovements.innerHTML = ""; // this will set the container empty
  movements.forEach(function (mov, i) {
    const type = mov > 0 ? "deposit" : "withdrawal";
    const html = `
      <div class="movements__row">
        <div class="movements__type movements__type--${type}">
        ${i + 1} ${type}</div>
        <div class="movements__value">${mov} INR </div>
      </div>
    `;
    containerMovements.insertAdjacentHTML("afterbegin", html);
  });
};

const calcDisplayBalance = function (acc) {
  acc.balance = acc.movements.reduce(function (acc, mov) {
    return acc + mov;
  }, 0);
  labelBalance.textContent = `${acc.balance} INR`;
};

const calcDisplaySummary = function (acc) {
  const incomes = acc.movements
    .filter(function (mov) {
      return mov > 0;
    })
    .reduce(function (acc, mov) {
      return acc + mov;
    }, 0);
  labelSumIn.textContent = `${incomes} INR`;

  const outcomes = acc.movements
    .filter(mov => mov < 0)
    .reduce((acc, mov) => acc + mov, 0);

  labelSumOut.textContent = `${Math.abs(outcomes)} INR`;

  const interest = acc.movements
    .filter(function (mov) {
      return mov > 0;
    })
    .map(function (mov) {
      return (mov * acc.interestRate) / 100;
    })
    .filter(function (mov) {
      return mov > 1;
    })
    .reduce(function (acc, mov) {
      return acc + mov;
    }, 0);

  labelSumInterest.textContent = `${interest} INR`;
};

const createUserName = function (accs) {
  accs.forEach(function (acc) {
    acc.username = acc.owner
      .toLowerCase()
      .split(" ")
      .map(usr => usr[0])
      .join("");
  });
};

createUserName(accounts);
// console.log(accounts);

// Event Handlers

let currentAccount;

const updateUI = function (acc) {
  displayMovements(acc.movements);
  calcDisplayBalance(acc);
  calcDisplaySummary(acc);
};

btnLogin.addEventListener("click", function (e) {
  e.preventDefault(); // prevent form from submitting

  currentAccount = accounts.find(function (acc) {
    return acc.username === inputLoginUsername.value;
  });
  if (currentAccount?.pin === Number(inputLoginPin.value)) {
    labelWelcome.textContent = `Welcome back, ${
      currentAccount.owner.split(" ")[0]
    }!`;
    containerApp.style.opacity = 100;
    inputLoginUsername.value = inputLoginPin.value = "";
    inputLoginPin.blur();
    updateUI(currentAccount);
  }
});

btnTransfer.addEventListener("click", function (e) {
  e.preventDefault();
  const amount = Number(inputTransferAmount.value);
  const receiverAcc = accounts.find(function (acc) {
    return acc.username === inputTransferTo.value;
  });
  inputTransferAmount.value = inputTransferTo.value = "";
  inputTransferAmount.blur();
  if (
    amount > 0 &&
    receiverAcc &&
    amount <= currentAccount.balance &&
    receiverAcc?.username !== currentAccount.username
  ) {
    currentAccount.movements.push(-amount);
    receiverAcc.movements.push(amount);
    updateUI(currentAccount);
  }
});

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// LECTURES

// const currencies = new Map([
//   ["USD", "United States dollar"],
//   ["EUR", "Euro"],
//   ["GBP", "Pound sterling"],
// ]);

// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// //SLICE
// let arr = ["a", "b", "c", "d", "e"];
// console.log(arr.slice(2)); //slice method will return a new array, it does not mutate the original array arr
// console.log(arr.slice(2, 4)); // the second parameter is excluded in the result
// console.log(arr.slice(-2)); // this will return the last two elements
// console.log(arr.slice(-1)); // this will return the last element
// console.log(arr.slice(1, -2)); // start from index 1 from start and stop at -2 from the last

// // We can use slice method to create a shallow copy of the original array. We can use the spread operator too
// console.log(arr.slice()); // creates a shallow copy and is used when we have to chain a lot of methods together
// console.log([...arr]); // creates a shallow copy

// //SPLICE (same as slice but it mutates the array and deletes the elements)
// // console.log(arr.splice(2)); // same as slice ["c", "d", "e"]
// // console.log(arr); // but it mutated the original array and deleted the elements above, now it outputs ["a", "b"]

// // Splice is generally used to delete the last element of the array - easy method
// arr.splice(-1); // this will delete the last element of the array
// console.log(arr);
// arr.splice(1, 2); // this will start deleting the element from index 1 and then deletes 2 elements - kinda behaves different as compared to slice. It is the delete count parameter.
// console.log(arr);

// //REVERSE
// arr = ["a", "b", "c", "d", "e"];
// const arr2 = ["j", "i", "h", "g", "f"];
// console.log(arr2.reverse()); // It will reverse the array and also mutates it
// console.log(arr2); // this time it would be ["f", "g", "h", "i", "j"]

// //CONCAT
// const letters = arr.concat(arr2); // it will concat those two arrays passed and it will not mutate the original array
// console.log(letters); // ["a", "b", "c" .... "j"]

// // we can do the same concatenation process with spred operator and it also does not mutate the original array
// console.log([...arr, ...arr2]);

// //JOIN
// console.log(letters.join("-")); // this will output a string with the mentioned separator, a-b-c-d-e-f-g-h-i-j

// // We have push, pop, shift, unshift, includes, indexOf methods

// //FOR OF Loop
// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

// //for (const movement of movements) {
// for (const [i, movement] of movements.entries()) {
//   if (movement > 0) {
//     console.log(`Movement ${i + 1} : You deposited ${movement}`);
//   } else {
//     console.log(`Movement ${i + 1} : You withdrew ${Math.abs(movement)}`);
//   }
// }

// console.log("---------------------------------------");

// // FOR EACH method
// movements.forEach(function (movement, i) {
//   if (movement > 0) {
//     console.log(`Movement ${i + 1} : You deposited ${movement}`);
//   } else {
//     console.log(`Movement ${i + 1} : You withdrew ${Math.abs(movement)}`);
//   }
// }); //forEach method is a higher order function that accepts a callback function. It works by passing the value of the elements in each iteration to the callback function to process untill exhausted
// // Also, in order to get the current element's index, we can pass on the arguements in this order - current element, index, array
// // Continue and break statements are NOT used with forEach - very important

// // Map
// const currencies = new Map([
//   ["USD", "United States dollar"],
//   ["EUR", "Euro"],
//   ["GBP", "Pound sterling"],
// ]);

// currencies.forEach(function (element, key, array) {
//   console.log(`${key} : ${element}`);
// });

// // Set
// const currenciesUnique = new Set(["USD", "USD", "GBP", "EUR"]);
// currenciesUnique.forEach(function (element, key, array) {
//   console.log(`${key} : ${element}`);
// }); // Although we do not have index system in Sets that's why when we are logging the result, we are seeing the same value for the key and the element. Ideallly, we should not have the key in the definition but to not create confusion with forEach implementation, it's the same as for Maps and Arrays.

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// //MAP method
// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];
// const euroConversion = 1.1;

// const movementUSD = movements.map(mov => {
//   return mov * euroConversion;
// }); // It is same as forEach in the sense that we are using function as a parameter to the map method which we know is a higher order function. So, it will take each value in the movements array and apply a function on top of it and will create a new array.

// console.log(movements);
// console.log(movementUSD);

// const movementUSDfor = [];
// for (const mov of movements) {
//   movementUSDfor.push(euroConversion * mov);
// }
// console.log(movementUSDfor);

// const movementsDecription = movements.map((mov, i) => {
//   return `Movement ${i + 1} : You ${
//     mov > 0 ? "deposited" : "withdrew"
//   } ${Math.abs(mov)}`;
// });

// console.log(movementsDecription);

// // FILTER method
// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];
// const deposit = movements.filter(function (mov) { // will return boolean value and  push only values that accepts the condition mentioned
//   return mov > 0;
// });

// console.log(movements);
// console.log(deposit); // Similarly we can use the for of loop to do the same task

// // REDUCE method
// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];
// const balance = movements.reduce(function (acc, mov) {
//   // the second argrument is the initial value of the accumulator
//   return acc + mov;
// }, 0);
// console.log(balance);

// let balance2 = 0;
// for (const mov of movements) {
//   balance2 += mov;
// }
// console.log(balance2);

// // FIND method
// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];
// const firstWithdrawal = movements.find(function (mov) {
//   return mov < 0;
// });

// console.log(movements);
// console.log(firstWithdrawal); // find method is similar as filter but it does not return a new array instead return the first element that holds the condition, i.e, -400
// // We can use the find method on the objects as well
