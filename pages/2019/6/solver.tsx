export default function Solver(inputAOC : string) : string[] {
  const parsedInput = inputAOC.split('\n').map((a) => a.split(')'));

  let part1 = 0;
  let part2 = 0;

  const orbiters = new Map<string, Set<string>>();
  const orbiters2 = new Map<string, Set<string>>();

  for (const [orbiter1, orbiter2] of parsedInput) {
    if (!orbiters.has(orbiter1)) {
      orbiters.set(orbiter1, new Set());
      orbiters2.set(orbiter1, new Set());
    }
    if (!orbiters.has(orbiter2)) {
      orbiters.set(orbiter2, new Set());
      orbiters2.set(orbiter2, new Set());
    }
    orbiters.get(orbiter1).add(orbiter2);
    orbiters2.get(orbiter1).add(orbiter2);
    orbiters2.get(orbiter2).add(orbiter1);
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

  const checked = new Set(['YOU']);
  const q = [];
  let foundSanta = false;

  for (const orbiter of orbiters2.get('YOU')) {
    checked.add(orbiter);
    q.push([orbiter, 0]);
  }

  for (let i = 0; i < q.length; i++) {
    const [orb, count] = q[i];
    for (const orbiter of orbiters2.get(orb)) {
      if (orbiter === 'SAN') {
        part2 = count;
        foundSanta = true;
        break;
      }
      if (!checked.has(orbiter)) {
        checked.add(orbiter);
        q.push([orbiter, count + 1]);
      }
    }
    if (foundSanta) {
      break;
    }
  }

  return [part1.toString(), part2.toString()];
}

