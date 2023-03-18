export default function Solver(inputAOC: string): string[] {
  const parsedInput = inputAOC.split('\n');

  let part1 = "";
  let part2 = 0;

  const re = /[A-Z]/g;

  const prereqs: Map<string, Set<string>> = new Map();

  for (const line of parsedInput) {
    const matches = line.match(re);
    if (!prereqs.has(matches[1])) {
      prereqs.set(matches[1], new Set());
    }
    if (!prereqs.has(matches[2])) {
      prereqs.set(matches[2], new Set());
    }
    prereqs.get(matches[2]).add(matches[1]);
  }

  const stepsToBeDone: string[] = [];

  while (prereqs.size) {
    for (const [step, set] of prereqs) {
      if (set.size === 0) {
        stepsToBeDone.push(step);
        prereqs.delete(step);
      }
    }
    stepsToBeDone.sort((a, b) => a < b ? 1 : a > b ? -1 : 0);
    const stepDone = stepsToBeDone.pop();
    part1 += stepDone;
    prereqs.forEach((set) => set.delete(stepDone));
  }

  return [part1, part2.toString()];
}

