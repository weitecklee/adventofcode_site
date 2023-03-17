export default function Solver(inputAOC: string): string[] {
  const parsedInput = inputAOC;

  let part1 = 0;
  let part2 = parsedInput.length;

  const collapsedLength = (polymer: string): number => {
    const res: string[] = [];
    for (const c of polymer) {
      if (res.length === 0) {
        res.push(c);
      } else if (Math.abs(c.charCodeAt(0) - res[res.length - 1].charCodeAt(0)) === 32) {
        res.pop();
      } else {
        res.push(c);
      }
    }
    return res.length;
  }

  part1 = collapsedLength(parsedInput);

  const letters = new Set(parsedInput.split(''));

  for (const letter of letters) {
    if (letter === letter.toLowerCase()) {
      continue;
    }
    const re = new RegExp(letter + '|' + letter.toLowerCase(), 'g');
    const remainingPolymer = parsedInput.replace(re, '');
    const remainingCollapsedLength = collapsedLength(remainingPolymer);
    if (remainingCollapsedLength < part2) {
      part2 = remainingCollapsedLength;
    }
  }

  return [part1.toString(), part2.toString()];
}

