export default function Solver(inputAOC: string): string[] {
  const parsedInput = inputAOC.split('\n');

  let part1 = 0;
  let part2 = 0;

  for (const line of parsedInput) {
    part1 += Number(line)
  }

  const freqSet: Set<number> = new Set();
  let row = 0;
  while (!freqSet.has(part2)) {
    freqSet.add(part2);
    part2 += Number(parsedInput[row]);
    row++;
    if (row > parsedInput.length - 1) {
      row = 0;
    }
  }

  return [part1.toString(), part2.toString()];
}

