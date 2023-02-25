export default function Solver(inputAOC : string) : string[] {
  const parsedInput = inputAOC.split('\n');
  let part1 = 0;
  let part2 = 0;
  for (const line of parsedInput) {
    let num = Number(line);
    if (Number.isNaN(num)) {
      return ["ERROR"];
    }
    num = Math.floor(num / 3) - 2;
    part1 += num;
    while (num > 0) {
      part2 += num;
      num = Math.floor(num / 3) - 2;
    }
  }

  return [part1.toString(), part2.toString()];
}