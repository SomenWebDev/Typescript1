"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function filterEvenNumbers(numbers) {
    return numbers.filter((num) => num % 2 === 0);
}
function reverseString(str) {
    return str.split("").reverse().join("");
}
function checkType(value) {
    if (typeof value === "string") {
        return "String";
    }
    else {
        return "Number";
    }
}
function getProperty(obj, key) {
    return obj[key];
}
// Usage
const user = { id: 1, name: "John Doe", age: 21 };
console.log(getProperty(user, "name")); // "John Doe"
console.log(getProperty(user, "id")); // 1
console.log(getProperty(user, "age"));
//# sourceMappingURL=solutions.js.map