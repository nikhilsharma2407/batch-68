// // // // // // var name;
// // // // // // // // // var in js

// // // // // // // // // var, let const ES6
// // // // // // var name = "Global var Variable";
// // // // // // let someVar = 123; // also a global variable
// // // // // // scope -
// // // // // // var name = "Global var Variable";
// // // // // // var - function scope, hoisted
// // // // // // let - block scope, not hoisted
// // // // // // const - block scope, not hoisted, constant value

// // // // // // redeclaration
// // // // // // var - allowed even in same scope
// // // // // // let - not allowed in same scope
// // // // // // const - not allowed

// // // // // // function fn() {
// // // // // //   // var name;  //variable hoisting for var decalred varibale value = undefined ;
// // // // // //   console.log("🚀 ~ fn ~ name:", name); // undefined
// // // // // //   //   TDZ - Temporal Dead Zone
// // // // // //   // let name = "Function scope var variable";
// // // // // //   if (true) {
// // // // // //     let name = "if block variable";
// // // // // //     console.log("🚀 ~ fn ~ name:", name);
// // // // // //   }
// // // // // //   console.log("🚀 ~ fn ~ name:", name); // Function scope var variable
// // // // // // }
// // // // // // fn();

// // // // // // console.log("🚀 ~ name:", name);

// // // // // // IEE754

// // // // // // // // Datatypes in js
// // // // // // // // primitive - number, string, boolean, NaN, null, undefined,
// // // // // // // // non-primitive - object, array, function

// // // // // // let intNum = 123;
// // // // // // let num = "123.529abcd999";

// // // // // // let balance = '100';
// // // // // // console.log(balance+100);

// // // // // // console.log("🚀 ~ +num:", +num);
// // // // // // console.log("🚀 ~ num.toFixed(2):", intNum.toFixed(2));
// // // // // // console.log("🚀 ~ parseInt(num):", parseInt(num));
// // // // // // console.log("🚀 ~ parseFloat(num):", parseFloat(num));

// // // // // // console.log("🚀 ~ Math.round(num):", Math.round(num));
// // // // // // const amount = 10_000_000;

// // // // // // console.log("🚀 ~ amount:", amount.toLocaleString("en-in"));

// // // // // // let str = "Hello World!";
// // // // // // str[0] = "h"; // string are immutable in js

// // // // // // console.log("🚀 ~ str:", str);
// // // // // // const strArray = str.split("");
// // // // // // console.log("🚀 ~ strArray:", strArray);
// // // // // // strArray[0] = "h";
// // // // // // strArray[6] = "w";
// // // // // // const newStr = strArray.join("");
// // // // // // console.log("🚀 ~ newStr:", newStr);

// // // // // // str = "abcd";
// // // // // // // str;
// // // // // // let str1 = "Hello World!";

// // // // // // // str.indexOf("World"); // 4
// // // // // // console.log(`🚀 ~ str.indexOf("World"):`, str.indexOf("World"))
// // // // // // str.lastIndexOf("o"); // 7

// // // // // // const name  = 'nikhil sharma';

// // // // // // console.log("🚀 ~ name.split(' '):", name.split(' '));
// // // // // // const email = "nikhil123@gmail.com";
// // // // // // const username = email.split("@")[0];
// // // // // // console.log("🚀 ~ username:", username)
// // // // // // const domain = email.split("@")[1];
// // // // // // console.log("🚀 ~ domain:", domain);

// // // // // // const authToken =
// // // // // //   "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiYWRtaW4iOnRydWUsImlhdCI6MTUxNjIzOTAyMn0.KMUFsIDTnFmyG3nMiGM6H9FNFUROf3wh7SmqJp-QV30";
// // // // // // const token = authToken.split(" ")[1];
// // // // // // console.log("🚀 ~ token:", token);
// // // // // // // const newUsername = username.toUpperCase();
// // // // // // // console.log("🚀 ~ newUsername:", newUsername);
// // // // // // // console.log("🚀 ~ username:", username);

// // // // // // // // template strings;
// // // // // const username = 'test';
// // // // // const visitorNumber = 100;

// // // // // // const message =
// // // // // //   "Congrats!!! " + username + " you are Visitor number " + visitorNumber;
// // // // // const message =  `Congrats!!!, ${username} you are Visitor number - ${visitorNumber}`;
// // // // // console.log("🚀 ~ message:", message)

// // // // // const emailMessage = `Hello,
// // // // // Welcome to our platform.
// // // // // Thank you for registration.
// // // // // Thank you!`;
// // // // // console.log("🚀 ~ emailMessage:", emailMessage);

// // // // // // const normalEmailMessage  = "Hello,\nWelcome to our platform.\nThank you for registration.\nThank you!"
// // // // // // // console.log("🚀 ~ emailMessage:", emailMessage);

// // // // // // boolean  true, false

// // // // // // falsy values - 0, "", NaN , null, undefined,
// // // // // // truthy
// // // // // // const loggedInUser = username || "Guest User";

// // // // if (0) {
// // // //   console.log(0 + " is Truthy");
// // // // } else {
// // // //   console.log(0 + " is Falsy");
// // // // }
// // // // if ("") {
// // // //   console.log("" + " is Truthy");
// // // // } else {
// // // //   console.log("" + " is Falsy");
// // // // }
// // // // if (null) {
// // // //   console.log(null + " is Truthy");
// // // // } else {
// // // //   console.log(null + " is Falsy");
// // // // }
// // // // if (undefined) {
// // // //   console.log(undefined + " is Truthy");
// // // // } else {
// // // //   console.log(undefined + " is Falsy");
// // // // }
// // // // if (NaN) {
// // // //   console.log(NaN + " is Truthy");
// // // // } else {
// // // //   console.log(NaN + " is Falsy");
// // // // }
// // // // if ([]) {
// // // //   console.log("[] is Truthy");
// // // // } else {
// // // //   console.log([] + " is Falsy");
// // // // }
// // // // if ({}) {
// // // //   console.log({} + " is Truthy");
// // // // } else {
// // // //   console.log("{} is Falsy");
// // // // }

// // // // // // 123*
// // // // // NaN; // not a number;
// // // // // "a"*10;
// // // // // // console.log("🚀 ~ typeof NaN:", typeof NaN)
// // // // // // console.log("🚀 ~ NaN == NaN:", NaN == NaN);
// // // // // // console.log("🚀 ~ isNaN(NaN):", isNaN(NaN));
// // // // // // isNaN(NaN)

// // // // // let someVarAbcd;

// // // // const str = "hello";
// // // // console.log("🚀 ~ str[100]:", str[100]);

// // // function greet(name) {
// // //   console.log("Hello, " + name);
// // // }

// // // const message = greet("Nikhil");
// // // console.log("🚀 ~ message:", message);

// // // // // console.log("🚀 ~ typeof undefined:", typeof undefined);

// // // // // null vs undefined
// // // let loggedInUser = {
// // //   username: "john_doe",
// // //   email: "john_doe@example.com",
// // // };

// // // loggedInUser = null;
// // // // // console.log("🚀 ~ typeof null:", typeof null);

// // // // operators in js
// // // arithmetic +, -, *, /, % - modulo operator, ++, --
// // // // assignment =, +=, -=, *=, /=
// // // // comparison  ==, ===, !=, !==, >, <, >=, <=
// // // logical  &&, ||, !
// // // // bitwise & , | , ~ , ^ , << , >>

// // let num = 14;
// // console.log("🚀 ~ num++:", num++);
// // console.log("🚀 ~ num:", num);

// // num /= 10; // num = num/14
// // num *= 10; //num = num * 10

// // // == vs ===

// // // // == comparison operator, only compare the value after type coercion
// // // // "" == false,
// // // // "1" == 1
// // // // "0" == false  // true
// // // // 0 == false // true
// // // // null == undefined // true

// // if (++num % 3 === 0 && num % 5 === 0) {
// //   console.log("divisible by 3 and 5");
// // }

// // // if (role === "admin"){
// // //   return "Full access";
// // // } else if (role === "editor"){
// // // return  "abcd";
// // // }

// // // const getPermissions = (role) => {
// // let role = "admin";
// // switch (role) {
// //   case "admin":
// //     console.log("Full access");
// //     break;
// //   case "editor":
// //     console.log("Edit & Read access");
// //     break;
// //   case "viewer":
// //     console.log("Read-only access");
// //     break;
// //   default:
// //     console.log("No access");
// //     break;
// // }

// // // // ternary operator

// // const age = 18;
// // // const message =
// // //   age >= 18 ? "You are eligible to vote" : "You are not eligible to vote";
// // const message = num % 2 ? "Num is odd" : "Num is even";

// // // // console.log("🚀 ~ message:", message);

// // console.log("🚀 ~ addNumFn(5, 10):", addNumFn(5, 10));
// // console.log("🚀 ~ addNum(5, 10):", addNum(5, 10));

// // const addNum = (num1, num2) => {
// //   return num1 + num2;
// // };

// // // addNum(1, 2, 3, 4, 56, 6);
// // // console.log("🚀 120 ~ addNum(1, 2, 3, 4):", addNum(1, 2, 3, 4));

// function addNumFn(num1, num2) {
//   // this execution context
//   // fn declarations are  hoisted
//   return num1 + num2;
// }

// const addNum = (num1, num2) => {
//   return num1 + num2;
// };
// function greet(name) {
//   console.log("Welcome to course!!!", name);
// }
// const greetArrowFn = (name) => console.log("Welcome to course!!!", name);

// const sum = (num1, num2) => num1 + num2;
// const add10 = (num1) => num1 + 10;

// // `this` keyword to be discussed with ES6 classes and OOP concepts.

// const array = [1, 2, 3, 4, 5];

// for (let i = 0; i < array.length; i++) {
//   console.log(array[i]);
//   if (array[i] % 2 === 0) break;
// }

// array.forEach((value, index, array) => {
//   console.log(`Index: ${index}, Value: ${value}`);
//   if (value % 2 === 0) {
//     console.log("even number found, adding null to the array");
//     return;
//   }
//   if (index === 0) {
//     console.log("1st element");
//   } else if (index === array.length - 1) {
//     console.log("last element");
//   }
// });

// const doubleNums = array.map((val) => val * 2);
// console.log("🚀 ~ array:", array);
// console.log("🚀 ~ doubleNums:", doubleNums);

// // filter
// const evenNums = array.filter((val) => !(val % 2));
// const oddNums = array.filter((val) => val % 2);
// console.log("🚀 ~ evenNums:", evenNums);
// console.log("🚀 ~ oddNums:", oddNums);

// const oddNumSquared2 = array.filter((val) => val % 2).map((val) => val ** 2);
// console.log("🚀 ~ oddNumSquared2:", oddNumSquared2)

// // reduce
const arr = [1, 2, 3, 4, 5];

// prev is calculated  as follows -
// 1st iteration - initialValue
// next iteration - return value from previous iterations
const sum = arr.reduce((prev, curr, index) => {
  console.log("🚀 ~ index:", index);
  console.log("🚀 ~ prev:", prev);
  console.log("🚀 ~ curr:", curr);
  console.log("🚀 ~ returning prev + curr:", prev + curr);
  return prev + curr;
});

// 1 as initial value
// [2,3,4,5]
// const sum = arr.reduce((prev, curr) => prev + curr);
// console.log("🚀 ~ sum:", sum)
// const products = arr.reduce((prev, curr) => prev * curr);
// console.log("🚀 ~ products:", products)










// const nestedArray = [[1], [[2]], [3, [4]]]; //

// // depth = 1 [1, [2], 3, [4]]
// // depth = 2 [1, 2, 3, 4]
// // const flatten = (array) => {

// // };
// const flattenWithDepth = (array, depth) => {};

// // rest operator, spread operator

// // destructring assignment
// const nums = [1, 2, 3, 4, 5];
// // const [, , , , , elem] = nums;
// // console.log("🚀 ~ elem:", elem);
// // console.log("🚀 ~ num1, num2:", num1, num2);

// const [num1, num2, ...rest] = nums;

// // console.log("🚀 ~ rest:", rest);

// const addNums = (num1, num2, ...nums) => {
//   // return nums.reduce((acc, curr) => acc + curr);
// };

// const fn = (num1, num2 = 0) => {
//   // console.log("🚀 ~ fn ~ num2:", num2);
//   // console.log("🚀 ~ fn ~ num1:", num1);
// };
// fn(4);

// // spread operator
// const numsRef = nums;
// const copyArray = [...nums]; // [ 1,2,3,4,5 ]

// numsRef[0] = 999;
// console.log("🚀 ~ nums:", nums); // [999,2,3,4,5]
// console.log("🚀 ~ copyArray:", copyArray);

// nums.push(6); // nums = [999,2,3,4,5,6]
// nums.pop(); // nums = [999,2,3,4,5]

// nums.unshift(0); // nums = [0,999,2,3,4,5]  // insert at beginning
// nums.shift(); // nums = [999,2,3,4,5] // remove from beginning

// const newArray = nums.slice(0, 3); // index 0 to index 2 last is not included / original array is not modified
// // const deletedItems = nums.splice(2);

// // insert 1000 after 3,
// nums.splice(3, 0, 1000);
// console.log("🚀 ~ nums:", nums);

// // console.log("🚀 ~ nums:", nums);
// // console.log("🚀 ~ deletedItems:", deletedItems);
// // Math.max(...nums)
// // console.log("🚀 ~ Math.max(...nums):", Math.max(...nums))

// // const makeRequest = (url, method = "GET") => {};

// // makeRequest("http://someurl");
// // makeRequest("http://someurl", "POST");
// // makeRequest("http://someurl", "DELETE");
// // makeRequest("http://someurl", "PUT");

// const employee = {
//   empId: " E101",
//   address: {
//     street: "123 Main St",
//     city: "Metropolis",
//     zip: "12345",
//   },
//   name: "emp1",
//   dept: {
//     deptName: "Engineering",
//     deptId: "D101",
//   },
// };

// Object.keys(employee);
// console.log("🚀 ~ Object.keys(employee):", Object.keys(employee));
// Object.values(employee);
// console.log("🚀 ~ Object.values(employee):", Object.values(employee));
// Object.entries(employee);
// console.log("🚀 ~ Object.entries(employee):", Object.entries(employee));

// for (let key in employee) {
//   console.log("🚀 ~ key:", key);
// }

// Object.entries(employee).forEach(([key, val]) => {
//   console.log("🚀 ~ key:", key);
//   console.log("🚀 ~ val:", val);
// });

// // const name = employee.name;
// // const empId = employee.empId;
// const { name } = employee;

// // const empName = employee.name;
// const { name: empName } = employee; //rename a variable while destructing assignment

// // const { dept } = employee;
// // const { deptName } = dept;

// // const { dept: { deptName } = {} } = employee || {};
// // console.log("🚀 ~ deptName:", deptName)

// const { deptName } = null?.dept || {};

// const emp2 = { ...employee };

// // deepClone = ()=>{};
// // optional chaining
