export default function Solver(inputAOC : string) : string[] {
  const parsedInput = inputAOC.split('\n');

  let part1 = 0;
  let part2 = 0;

  for (const line of parsedInput) {
    part1 += Number(line)
  }

  return [part1.toString(), part2.toString()];
}

