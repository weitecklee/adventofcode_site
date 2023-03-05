const gcd = (a : number, b : number) : number => {
  if (b === 0) {
    return a;
  }
  return gcd(b, a % b);
}

const dist = (a : number, b : number, c : number, d : number) : number => (Math.sqrt((a - c) ** 2 + (b - d) ** 2));

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

  let x : number
  let y : number

  for (const [a, b] of asteroids) {
    const lineOfSight : Set<string> = new Set();
    for (const [i, j] of asteroids) {
      if (a === i && b === j) {
        continue;
      }
      const g = gcd(Math.abs(i - a), Math.abs(j - b));
      lineOfSight.add(`${(i - a) / g},${(j - b) / g}`)
    }
    if (lineOfSight.size > part1) {
      x = a;
      y = b;
      part1 = lineOfSight.size;
    }
  }

  const map : Map<string,number[][]> = new Map();

  for (const [a, b] of asteroids) {
    let slope = '';
    if (a === x && b === y) {
      continue;
    }
    const g = gcd(Math.abs(x - a), Math.abs(y - b));
    slope = `${(a - x) / g},${(y - b) / g}`;
    if (!map.has(slope)) {
      map.set(slope, []);
    }
    map.get(slope).push([a, b]);
  }

  const asteroidLines : number[][][] = [];
  for (const [slope, arr] of map) {
    arr.sort((a, b) =>  dist(b[0], b[1], x, y) - dist(a[0], a[1], x, y));
    const [a, b] = slope.split(',').map(Number);
    if (a === 0) {
      if (b > 0) {
        arr.push([0]);
      } else {
        arr.push([Math.PI]);
      }
    } else if ( b === 0) {
      if (a > 0) {
        arr.push([Math.PI / 2]);
      } else {
        arr.push([3 * Math.PI / 2]);
      }

    } else {
      if (a > 0) {
        if (b > 0) {
          arr.push([Math.atan(a / b)]);
        } else {
          arr.push([Math.atan(-b / a) + Math. PI / 2]);
        }
      } else {
        if (b > 0) {
          arr.push([Math.atan(-b / a) + 3 * Math.PI / 2]);
        } else {
          arr.push([Math.atan(a / b) + Math. PI]);
        }
      }
    }
    asteroidLines.push(arr);
  }

  const vaporize = [];

  for (const arr of asteroidLines.values()) {
    vaporize.push(arr);
  }

  vaporize.sort((a, b) => a[a.length - 1][0] - b[b.length - 1][0]);
  vaporize.forEach((a) => a.pop());

  let i = 0;
  let k = 0;
  let lastVaporized : number[] = [];

  while (i < 200) {
    while (vaporize[k].length === 0) {
      k++;
      if (k >= vaporize.length) {
        k = 0;
      }
    }
    i++;
    lastVaporized = vaporize[k].pop();
    k++;
    if (k >= vaporize.length) {
      k = 0;
    }
  }

  part2 = lastVaporized[0] * 100 + lastVaporized[1];

  return [part1.toString(), part2.toString()];
}

