import { parseInput as getInput } from "../common/parse";

const gears: Record<string, string[]> = {};
const addGear = (x: number, y: number, part: string) => {
  const key = `${x},${y}`;
  if (!gears[key]) {
    gears[key] = [];
  }

  gears[key].push(part);
};

const hasAdjacentSymbol = (
  input: string[][],
  y: number,
  x: number,
  num: string,
) => {
  const size = num.length;
  const rows = [y - 1, y, y + 1];
  // x - 1 -> x + size + 1
  const cols = Array.from({ length: size + 2 }, (_, i) => x - 1 + i);

  let isPart = false;
  for (const rowI of rows) {
    const row = input[rowI];
    if (!row) continue;

    for (const colI of cols) {
      const col = row[colI];
      if (!col) continue;

      if (col !== "." && !col.match(/[0-9]/)) {
        if (col === "*") {
          addGear(colI, rowI, num);
        }

        isPart = true;
      }
    }
  }

  return isPart;
};

const parse = (input: string) => {
  return input
    .split("\n")
    .filter((row) => row !== "")
    .map((line) => line.split(""));
};

const isNumber = (
  input: string[][],
  y: number,
  x: number,
): string | undefined => {
  const char = input[y][x];
  if (char === undefined) return undefined;

  if (char.match(/[0-9]/)) {
    const next = isNumber(input, y, x + 1) || "";
    return char + next;
  }

  return undefined;
};

const solve1 = (input: string) => {
  const lines = parse(input);

  const parts: string[] = [];

  for (let y = 0; y < lines.length; y++) {
    for (let x = 0; x < lines[y].length; x++) {
      const val = isNumber(lines, y, x);
      if (val && hasAdjacentSymbol(lines, y, x, val)) {
        parts.push(val);
        x += val.length;
      }
    }
  }

  return parts.map(Number).reduce((a, b) => a + b, 0);
};

const EXAMPLE_INPUT = `
467..114..
...*......
..35..633.
......#...
617*......
.....+.58.
..592.....
......755.
...$.*....
.664.598..`;

const input = await getInput("input");

// console.log(solve1(EXAMPLE_INPUT));
// console.log(solve1(input));

const solve2 = (input: string) => {
  const lines = parse(input);

  for (let y = 0; y < lines.length; y++) {
    for (let x = 0; x < lines[y].length; x++) {
      const val = isNumber(lines, y, x);
      if (val && hasAdjacentSymbol(lines, y, x, val)) {
        x += val.length;
      }
    }
  }

  return Object.entries(gears)
    .filter(([, parts]) => parts.length > 1)
    .map(([, parts]) => {
      const x = parts.map(Number).reduce((a, b) => a * b, 1);
      console.log(parts, x);
      return x;
    })
    .reduce((a, b) => a + b, 0);
};

// console.log(solve2(EXAMPLE_INPUT));
console.log(solve2(input));
