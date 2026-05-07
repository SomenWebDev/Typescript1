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
console.log(checkType("Hello")); // Output: "String"
console.log(checkType(42)); // Output: "Number"
//# sourceMappingURL=solutions.js.map