import { parseInput } from "../common/parse";

const MAX = {
  red: 12,
  green: 13,
  blue: 14,
};

interface Game {
  id: string;
  rounds: Record<string, number>[];
}

const parseGame = (gameString: string): Game => {
  const [game, rounds] = gameString.split(":");
  const gameId = game.trim().split(" ")[1];

  const parsedRounds = rounds.split(";").map((round) => {
    return round
      .trim()
      .split(",")
      .map((ballString) => ballString.trim())
      .map((ballString) => {
        const [count, color] = ballString.split(" ");
        return {
          [color]: parseInt(count),
        };
      })
      .reduce((acc, curr) => {
        return {
          ...acc,
          ...curr,
        };
      });
  });

  return {
    id: gameId,
    rounds: parsedRounds,
  };
};

interface GameStat {
  id: number;
  total: number;
  red: number;
  green: number;
  blue: number;
}

const calculateGame = (game: Game): GameStat => {
  return game.rounds.reduce(
    (acc, round) => {
      const total = Object.values(round).reduce((acc, curr) => acc + curr, 0);
      return {
        ...acc,
        total: Math.max(total, acc.total),
        red: Math.max(round.red ?? 0, acc.red),
        green: Math.max(round.green ?? 0, acc.green),
        blue: Math.max(round.blue ?? 0, acc.blue),
      };
    },
    {
      id: Number.parseInt(game.id),
      total: 0,
      red: 0,
      green: 0,
      blue: 0,
    } as GameStat,
  );
};

const isGameValid = ({ id, total, ...balls }: GameStat): number => {
  const maxBalls = Object.values(MAX).reduce((acc, curr) => acc + curr, 0);

  if (total > maxBalls) return 0;
  if (balls.red > MAX.red) return 0;
  if (balls.green > MAX.green) return 0;
  if (balls.blue > MAX.blue) return 0;
  if (balls.red + balls.green + balls.blue > maxBalls) return 0;

  return id;
};

const solve1 = (input: string) => {
  const games = input
    .split("\n")
    .filter((l) => l.length > 0)
    .map(parseGame);
  const validGames = games
    .map(calculateGame)
    .map(isGameValid)
    .filter((p) => p > 0);
  return validGames.reduce((acc, curr) => acc + curr, 0);
};

const solve2 = (input: string) => {
  const games = input
    .split("\n")
    .filter((l) => l.length > 0)
    .map(parseGame);

  const powers = games.map(calculateGame).map((stat) => {
    const power = stat.blue * stat.green * stat.red;
    return Math.max(power, 0);
  });

  return powers.reduce((acc, curr) => acc + curr, 0);
};

const INPUT_EXAMPLE = `Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green
Game 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue
Game 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red
Game 4: 1 green, 3 red, 6 blue; 3 green, 6 red; 3 green, 15 blue, 14 red
Game 5: 6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green`;

console.log("Example");
console.log(solve1(INPUT_EXAMPLE));
console.log(solve2(INPUT_EXAMPLE));

console.log("Input");
const input = await parseInput("input");
console.log(solve1(input));
console.log(solve2(input));
