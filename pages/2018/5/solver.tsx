export default function Solver(inputAOC: string): string[] {
  const parsedInput = inputAOC;

  const part1: string[] = [];
  let part2 = 0;

  for (const c of parsedInput) {
    if (part1.length === 0) {
      part1.push(c);
    } else if (Math.abs(c.charCodeAt(0) - part1[part1.length - 1].charCodeAt(0)) === 32) {
      part1.pop();
    } else {
      part1.push(c);
    }
  }

  return [part1.length.toString(), part2.toString()];
}

