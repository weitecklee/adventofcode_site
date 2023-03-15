export default function Solver(inputAOC: string): string[] {
  const parsedInput = inputAOC.split('\n');

  let part1 = 0;
  let part2 = "";

  const fabric: Map<string, number> = new Map();

  for (const line of parsedInput) {
    const matches = line.match(/\d+/g);
    const x = Number(matches[1]);
    const y = Number(matches[2]);
    const w = Number(matches[3]);
    const h = Number(matches[4]);
    for (let i = 0; i < w; i++) {
      for (let j = 0; j < h; j++) {
        const loc = (x + i) + ',' + (y + j);
        if (!fabric.has(loc)) {
          fabric.set(loc, 0);
        }
        fabric.set(loc, fabric.get(loc) + 1);
        if (fabric.get(loc) === 2) {
          part1++;
        }
      }
    }
  }

  return [part1.toString(), part2];
}

