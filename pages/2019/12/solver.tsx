class Moon {
  x: number;
  y: number;
  z: number;
  vx: number;
  vy: number;
  vz: number;

  constructor(x: number, y: number, z: number) {
    this.x = x;
    this.y = y;
    this.z = z;
    this.vx = 0;
    this.vy = 0;
    this.vz = 0;
  }

  gravitate(moon: Moon) {
    this.vx += Math.sign(moon.x - this.x);
    this.vy += Math.sign(moon.y - this.y);
    this.vz += Math.sign(moon.z - this.z);
  }

  velocitate() {
    this.x += this.vx;
    this.y += this.vy;
    this.z += this.vz;
  }

  energy(): number {
    return (Math.abs(this.x) + Math.abs(this.y) + Math.abs(this.z)) * (Math.abs(this.vx) + Math.abs(this.vy) + Math.abs(this.vz));
  }

  report(): string {
    return `pos=<x=${this.x}, y=${this.y}, z=${this.z}>, vel=<x=${this.vx}, y=${this.vy}, z=${this.vz}>`;
  }
}

const gcd = (a : number, b : number) : number => {
  if (b === 0) {
    return a;
  }
  return gcd(b, a % b);
}

const lcm = (a : number, b : number) : number => a * b / gcd(a, b);

export default function Solver(inputAOC: string): string[] {
  const parsedInput = inputAOC.split('\n');

  let part1 = 0;
  let part2 = 0;

  const moons: Moon[] = [];
  const re = new RegExp('-?\\d+', 'g');

  for (const row of parsedInput) {
    const matches = row.match(re).map(Number);
    moons.push(new Moon(matches[0], matches[1], matches[2]));
  }

  const simulate = (arr: Moon[]) => {
    for (let j = 0; j < arr.length; j++) {
      for (let k = j + 1; k < arr.length; k++) {
        arr[j].gravitate(arr[k]);
        arr[k].gravitate(arr[j]);
      }
    }
    for (let j = 0; j < arr.length; j++) {
      arr[j].velocitate();
      // console.log(arr[j].report());
    }
  }

  for (let i = 0; i < 1000; i++) {
    // console.log(`Step ${i + 1}`)
    simulate(moons);
  }

  for (const moon of moons) {
    part1 += moon.energy();
  }

  const moons2: Moon[] = [];

  for (const row of parsedInput) {
    const matches = row.match(re).map(Number);
    moons2.push(new Moon(matches[0], matches[1], matches[2]));
  }

  const state = (arr: Moon[]): string[] => [arr.reduce((a, moon) => a + `${moon.x},${moon.vx};`, ''), arr.reduce((a, moon) => a + `${moon.y},${moon.vy};`, ''), arr.reduce((a, moon) => a + `${moon.z},${moon.vz};`, '')];

  const initState = state(moons2);

  const cycle = [0, 0, 0];
  let turn = 0;

  while (cycle.some((a) => a === 0)) {
    turn++;
    simulate(moons2);
    const currState = state(moons2);
    for (let i = 0; i < currState.length; i++) {
      if (cycle[i] === 0 && currState[i] === initState[i]) {
        cycle[i] = turn;
      }
    }
  }

  part2 = cycle.reduce((a, b) => lcm(a, b));

  return [part1.toString(), part2.toString()];
}

