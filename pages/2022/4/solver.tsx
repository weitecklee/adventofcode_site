export default function Solver(inputAOC: string): string[] {
  const re = /\d+/g;
  const parsedInput = inputAOC.split('\n').map((a) => {
    const matches = a.match(re);
    const arr: number[] = [];
    for (const match of matches) {
      arr.push(Number(match));
    }
    return arr;
  });

  let part1 = 0;
  let part2 = 0;

  for (const [a, b, c, d] of parsedInput) {
    if ((a <= c && b >= d) || (c <= a && d >= b)) {
      part1++;
    }
    if ((a <= c && c <= b) || (a <= d && d <= b) || (c <= a && a <= d) || (c <= b && b <= d)) {
      part2++;
    }
  }

  return [part1.toString(), part2.toString()];
}

