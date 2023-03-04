const gcd = (a : number, b : number) : number => {
  if (b === 0) {
    return a;
  }
  return gcd(b, a % b);
}

export default function Solver(inputAOC : string) : string[] {
  const parsedInput = inputAOC.split('\n');

  let part1 = 0;
  let part2 = 0;

  const asteroids : Set<number[]> = new Set();

  for (let i = 0; i < parsedInput.length; i++) {
    for (let j = 0; j < parsedInput[i].length; j++) {
      if (parsedInput[i][j] === '#') {
        asteroids.add([j, i]);
      }
    }
  }

  for (const [a, b] of asteroids) {
    const lineOfSight : Set<string> = new Set();
    for (const [i, j] of asteroids) {
      if (a !== i) {
        const g = gcd(Math.abs(i - a), Math.abs(j - b));
        lineOfSight.add(`${(i - a) / g},${(j - b) / g}`)
      } else if (b !== j) {
        if (j > b) {
          lineOfSight.add('Inf');
        } else {
          lineOfSight.add('-Inf');
        }
      }
    }
    if (lineOfSight.size > part1) {
      // console.log(a, b, lineOfSight.size);
      part1 = lineOfSight.size;
    }
  }

  return [part1.toString(), part2.toString()];
}

