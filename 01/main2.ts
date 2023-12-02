const exampleInput: string = `
two1nine
eightwothree
abcone2threexyz
xtwone3four
4nineeightseven2
zoneight234
7pqrstsixteen`;

const digits = {
  one: 1,
  two: 2,
  three: 3,
  four: 4,
  five: 5,
  six: 6,
  seven: 7,
  eight: 8,
  nine: 9,
};

const digitsEntries = Object.entries(digits);

const solution = (input: string): number => {
  return input
    .split("\n")
    .filter((line) => line.length > 0)
    .map((line) => {
      let newLine = "";
      for (let i = 0; i < line.length; i++) {
        const sstring = line.slice(i);
        let foundDigit = -1;
        for (const [key, digit] of digitsEntries) {
          if (sstring.startsWith(key)) {
            foundDigit = digit;
            break;
          }
        }

        if (foundDigit !== -1) {
          newLine += foundDigit.toString();
          i += foundDigit.toString().length - 1;
        } else {
          newLine += line.charAt(i);
        }
      }

      return newLine;
    })
    .map((line) => {
      const d = [...line].filter((char) => char.match(/[0-9]/i));
      // console.log(line, d);
      return d;
    })
    .map((lineNumbers) => {
      if (lineNumbers.length === 0) return "0";
      return lineNumbers[0] + lineNumbers[lineNumbers.length - 1];
    })
    .reduce((acc, cur) => acc + parseInt(cur), 0);
};

console.log(solution(exampleInput));

const file = Bun.file("./input");
const input = await file.text();
console.log(solution(input));
