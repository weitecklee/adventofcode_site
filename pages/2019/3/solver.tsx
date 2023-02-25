export default function Solver(inputAOC : string) : string[] {
  const parsedInput = inputAOC.split('\n').map((a) => a.split(','));
  let part1 = Infinity;
  let part2 = 0;

  const pos = [0, 0];
  const wirepath = new Set(['0.0']);
  const re = new RegExp(`^([UDLR])(\\d+)$`)

  for (const path of parsedInput[0]) {
    const matches = path.match(re);
    if (matches === null) {
      return ['ERROR'];
    }
    const dir = [0, 0];
    const dist = Number(matches[2]);
    if (matches[1] === 'U') {
      dir[1] = 1;
    } else if (matches[1] === 'D') {
      dir[1] = -1;
    } else if (matches[1] === 'L') {
      dir[0] = -1;
    } else {
      dir[0] = 1;
    }
    for (let i = 0; i < dist; i++) {
      pos[0] += dir[0];
      pos[1] += dir[1];
      wirepath.add(pos[0] + '.' + pos[1]);
    }
  }

  pos[0] = 0;
  pos[1] = 0;

  for (const path of parsedInput[1]) {
    const matches = path.match(re);
    if (matches === null) {
      return ['ERROR'];
    }
    const dir = [0, 0];
    const dist = Number(matches[2]);
    if (matches[1] === 'U') {
      dir[1] = 1;
    } else if (matches[1] === 'D') {
      dir[1] = -1;
    } else if (matches[1] === 'L') {
      dir[0] = -1;
    } else {
      dir[0] = 1;
    }
    for (let i = 0; i < dist; i++) {
      pos[0] += dir[0];
      pos[1] += dir[1];
      if (wirepath.has(pos[0] + '.' + pos[1])) {
        part1 = Math.min(part1, Math.abs(pos[0]) + Math.abs(pos[1]));
      }
    }
  }
  return [part1.toString(), part2.toString()];
}