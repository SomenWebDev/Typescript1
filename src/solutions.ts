function filterEvenNumbers(numbers: number[]): number[] {
  return numbers.filter((num) => num % 2 === 0);
}

function reverseString(str: string): string {
  return str.split("").reverse().join("");
}
