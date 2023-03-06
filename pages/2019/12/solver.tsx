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

  report() {
    console.log(`pos=<x=${this.x}, y=${this.y}, z=${this.z}>, vel=<x=${this.vx}, y=${this.vy}, z=${this.vz}>`)
  }
}

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

  for (let i = 0; i < 1000; i++) {
    // console.log(`Step ${i + 1}`)
    for (let j = 0; j < moons.length; j++) {
      for (let k = j + 1; k < moons.length; k++) {
        moons[j].gravitate(moons[k]);
        moons[k].gravitate(moons[j]);
      }
    }
    for (let j = 0; j < moons.length; j++) {
      moons[j].velocitate();
      // moons[j].report();
    }
  }

  for (const moon of moons) {
    part1 += moon.energy();
  }

  return [part1.toString(), part2.toString()];
}

