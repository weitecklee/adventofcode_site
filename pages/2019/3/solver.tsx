export default function Solver(inputAOC : string) : string[] {
  const parsedInput = inputAOC.split('\n').map((a) => a.split(','));
  let part1 = Infinity;
  let part2 = Infinity;

  const pos = [0, 0];
  const wirepath = new Map();
  const re = new RegExp(`^([UDLR])(\\d+)$`)
  let steps = 0;

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
      steps++;
      pos[0] += dir[0];
      pos[1] += dir[1];
      const posStr = pos[0] + '.' + pos[1];
      if (!wirepath.has(posStr)) {
        wirepath.set(posStr, steps);
      }
    }
  }

  pos[0] = 0;
  pos[1] = 0;
  steps = 0;

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
      steps++;
      pos[0] += dir[0];
      pos[1] += dir[1];
      const posStr = pos[0] + '.' + pos[1];
      if (wirepath.has(posStr)) {
        part1 = Math.min(part1, Math.abs(pos[0]) + Math.abs(pos[1]));
        part2 = Math.min(part2, wirepath.get(posStr) + steps);
      }
    }
  }

  return [part1.toString(), part2.toString()];
}