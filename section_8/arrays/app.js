const numbers = [1, 2, 3];
console.log(numbers);

// const moreNumbers = Array(5, 2); // if we just pass one element, it will create empty array of length equal to that element
// console.log(moreNumbers); // we can use or omit the use of "new" keyword

// const yetMoreNumbers = Array.of(1, 2);
// console.log(yetMoreNumbers);

// Array.from() will convert an iterable or an array like objects to arrays

const listItems = document.querySelectorAll("li"); // NodeList
console.log(listItems);

const arrayListItems = Array.from(listItems);
console.log(arrayListItems);
