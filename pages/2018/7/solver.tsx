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

  class Worker {
    finishTime: number;
    finishStep: string;

    constructor(time: number, step: string) {
      this.finishTime = time;
      this.finishStep = step;
    }
  }
  const workers: Worker[] = [];

  for (const [step, set] of prereqs) {
    if (set.size === 0) {
      stepsToBeDone.push(step);
      prereqs.delete(step);
    }
  }
  stepsToBeDone.sort((a, b) => a < b ? 1 : a > b ? -1 : 0);

  while (prereqs.size || stepsToBeDone.length || workers.length) {
    if (stepsToBeDone.length === 0 || workers.length === 5) {
      const finishedWorker = workers.shift();
      part2 = finishedWorker.finishTime;
      prereqs.forEach((set) => set.delete(finishedWorker.finishStep));
      for (const [step, set] of prereqs) {
        if (set.size === 0) {
          stepsToBeDone.push(step);
          prereqs.delete(step);
        }
      }
      stepsToBeDone.sort((a, b) => a < b ? 1 : a > b ? -1 : 0);
    } else {
      const stepDone = stepsToBeDone.pop();
      workers.push(new Worker(part2 + stepDone.charCodeAt(0) - 4, stepDone))
    }
  }

  return [part1, part2.toString()];
}

