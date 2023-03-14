export default function Solver(inputAOC: string): string[] {
  const parsedInput = inputAOC.split('\n');

  let part1 = 0;
  let part2 = 0;

  let twoCount = 0;
  let threeCount = 0;

  for (const line of parsedInput) {
    let twoLetters = 0;
    let threeLetters = 0;
    const chars: Map<string, number> = new Map();
    for (const c of line) {
      if (!chars.has(c)) {
        chars.set(c, 0);
      }
      chars.set(c, chars.get(c) + 1);
      const n = chars.get(c);
      if (n === 2) {
        twoLetters++;
      } else if (n === 3) {
        twoLetters--;
        threeLetters++;
      } else if (n > 3) {
        threeLetters--;
      }
    }
    if (twoLetters > 0) {
      twoCount++;
    }
    if (threeLetters > 0) {
      threeCount++;
    }
  }

  part1 = twoCount * threeCount;
  return [part1.toString(), part2.toString()];
}

