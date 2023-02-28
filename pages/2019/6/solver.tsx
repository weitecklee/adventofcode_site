export default function Solver(inputAOC : string) : string[] {
  const parsedInput = inputAOC.split('\n').map((a) => a.split(')'));

  let part1 = 0;
  let part2 = 0;

  const orbiters = new Map();

  for (const [orbiter1, orbiter2] of parsedInput) {
    if (!orbiters.has(orbiter1)) {
      orbiters.set(orbiter1, new Set());
    }
    if (!orbiters.has(orbiter2)) {
      orbiters.set(orbiter2, new Set());
    }
    orbiters.get(orbiter1).add(orbiter2);
  }

  const orbits = new Map();

  const countOrbits = (orb : string, parentOrbits : number) : void => {
    orbits.set(orb, parentOrbits);
    for (const childOrbiter of orbiters.get(orb)) {
      countOrbits(childOrbiter, parentOrbits + 1);
    }
  }

  countOrbits('COM', 0);

  for (const [orb, count] of orbits) {
    part1 += count;
  }

  return [part1.toString(), part2.toString()];
}

