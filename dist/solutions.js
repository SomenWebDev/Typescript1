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
function toggleReadStatus(book) {
    return { ...book, isRead: true };
}
class Person {
    name;
    age;
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }
}
class Student extends Person {
    grade;
    constructor(name, age, grade) {
        super(name, age);
        this.grade = grade;
    }
    getDetails() {
        return `Name: ${this.name}, Age: ${this.age}, Grade: ${this.grade}`;
    }
}
function getIntersection(arr1, arr2) {
    return arr1.filter((num) => arr2.includes(num));
}
console.log(getIntersection([1, 2, 3, 4, 5], [3, 4, 5, 6, 7]));
//# sourceMappingURL=solutions.js.map