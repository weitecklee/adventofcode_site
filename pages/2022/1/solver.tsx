export default function Solver(inputAOC: string): string[] {
  const parsedInput = inputAOC.split('\n');

  class Elf {
    food: number[];
    total: number;

    constructor(food: number[]) {
      this.food = food;
      this.total = food.reduce((a, b) => a + b);
    }
  }

  const elves: Elf[] = [];
  let food: number[] = [];

  for (const row of parsedInput) {
    if (row.length) {
      food.push(Number(row));
    } else {
      elves.push(new Elf(food));
      food = [];
    }
  }

  elves.push(new Elf(food));

  elves.sort((a,b) => b.total - a.total);

  const part1 = elves[0].total;
  const part2 = elves[0].total + elves[1].total + elves[2].total;

  return [part1.toString(), part2.toString()];
}

