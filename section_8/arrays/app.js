// const numbers = [1, 2, 3];
// console.log(numbers);

// // const moreNumbers = Array(5, 2); // if we just pass one element, it will create empty array of length equal to that element
// // console.log(moreNumbers); // we can use or omit the use of "new" keyword

// // const yetMoreNumbers = Array.of(1, 2);
// // console.log(yetMoreNumbers);

// // Array.from() will convert an iterable or an array like objects to arrays

// const listItems = document.querySelectorAll("li"); // NodeList
// console.log(listItems);

// const arrayListItems = Array.from(listItems);
// console.log(arrayListItems);

// const hobbies = ["Cooking", "Sports"];
// hobbies.push("Cycling"); // this method will add the elements at the end of the array
// console.log(hobbies);

// Similarly we have pop(), shift() and unshift() methods - pop() will return the element while unshift() and push() will return the length
// push() and pop() are faster as compared to unshift() and shift()

const hobbies = ["Sports", "Cooking"];

hobbies.splice(1, 0, "Good Food"); // Splice will take two parameters, first one will determine where to start (inclusive) and second will tell about the deletion
console.log(hobbies);

const removedElements = hobbies.splice(-2, 1); // it works with -ve index as well. If given only one argument 0, it will delete allt he elements
console.log(hobbies);
