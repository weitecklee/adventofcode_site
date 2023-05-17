export default function Solver(inputAOC: string): string[] {
  const parsedInput = inputAOC.split('\n');

  const priority = '_abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const priorityMap: Map<string,number> = new Map();
  for (let i = 0; i < priority.length; i++) {
    priorityMap[priority[i]] = i;
  }

  let part1 = 0;

  for (const row of parsedInput) {
    const half = row.length / 2;
    const set1 = new Set(row.slice(0, half).split(''));
    const set2 = new Set(row.slice(half).split(''));
    for (const c of set1) {
      if (set2.has(c)) {
        part1 += priorityMap[c];
        break;
      }
    }
  }

  let part2 = 0;

  for (let i = 0; i < parsedInput.length; i += 3) {
    const set1 = new Set(parsedInput[i].split(''));
    const set2 = new Set(parsedInput[i + 1].split(''));
    const set3 = new Set(parsedInput[i + 2].split(''));
    for (const c of set1) {
      if (set2.has(c) && set3.has(c)) {
        part2 += priorityMap[c];
        break;
      }
    }
  }

  return [part1.toString(), part2.toString()];
}

