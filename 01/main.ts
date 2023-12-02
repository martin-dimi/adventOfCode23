const exampleInput: string = `
1abc2
pqr3stu8vwx
a1b2c3d4e5f
treb7uchet
`;

const solution = (input: string): number => {
  return input
    .split("\n")
    .filter((line) => line.length > 0)
    .map((line) => [...line].filter((char) => char.match(/[0-9]/i)))
    .map((lineNumbers) => {
      if (lineNumbers.length === 0) return "0";
      return lineNumbers[0] + lineNumbers[lineNumbers.length - 1];
    })
    .reduce((acc, cur) => acc + parseInt(cur), 0);
};

const file = Bun.file("./input");
const input = await file.text();

console.log(solution(exampleInput));
console.log(solution(input));
