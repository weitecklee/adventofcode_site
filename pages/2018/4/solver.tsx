export default function Solver(inputAOC: string): string[] {
  const parsedInput = inputAOC.split('\n');

  let part1 = 0;
  let part2 = "";

  parsedInput.sort();

  let sleepTime = 0;
  const re = /\d+/g;

  class Guard {
    sleepTotal: number;
    sleepMinutes: Map<number, number>;

    constructor() {
      this.sleepTotal = 0;
      this.sleepMinutes = new Map();
    }

    addSleep(sleepTime: number, wakeTime: number) {
      this.sleepTotal += wakeTime - sleepTime;
      for (let i = sleepTime; i < wakeTime; i++) {
        if (!this.sleepMinutes.has(i)) {
          this.sleepMinutes.set(i, 0);
        }
        this.sleepMinutes.set(i, this.sleepMinutes.get(i) + 1);
      }
    }

    report(): number[] {
      let maxSleep = 0;
      let sleepyMinute = 0;
      for (const [minute, duration] of this.sleepMinutes) {
        if (duration > maxSleep) {
          maxSleep = duration;
          sleepyMinute = minute;
        }
      }
      return [this.sleepTotal, sleepyMinute];
    }
  }

  let currGuard: Guard = undefined;
  const guards: Map<string, Guard> = new Map();

  for (const line of parsedInput) {
    const nums = line.match(re);
    if (line.includes('Guard')) {
      if (!guards.has(nums[5])) {
        guards.set(nums[5], new Guard());
      }
      currGuard = guards.get(nums[5]);
    } else if (line.includes('sleep')) {
      sleepTime = Number(nums[4]);
    } else if (line.includes('wakes')) {
      const wakeTime = Number(nums[4]);
      currGuard.addSleep(sleepTime, wakeTime);
    }
  }

  let maxSleep = 0;
  for (const [guardId, guard] of guards) {
    const [sleepTotal, maxMinute] = guard.report();
    if (sleepTotal > maxSleep) {
      maxSleep = sleepTotal;
      part1 = Number(guardId) * maxMinute;
    }
  }

  return [part1.toString(), part2];
}

