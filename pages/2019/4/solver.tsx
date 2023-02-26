export default function Solver(inputAOC : string) : string[] {
  const parsedInput = inputAOC.split('-').map(Number);
  if (parsedInput.some((a) => Number.isNaN(a))) {
    return ['ERROR'];
  }

  let part1 = 0;
  let part2 = 0;

  const re = new RegExp(`(.)\\1+`, 'g')

  for (let i = parsedInput[0]; i <= parsedInput[1]; i++) {
    let increasingDigits = true;
    const numStr = i.toString();
    const numArr = numStr.split('').map(Number);

    for (let j = 1; j < numArr.length; j++) {
      if (numArr[j] < numArr[j - 1]) {
        increasingDigits = false;
        break;
      }
    }

    if (!increasingDigits) {
      continue;
    }

    const matches = numStr.match(re);
    if (matches !== null) {
      part1++;
      if (matches.some((a) => a.length === 2)) {
        part2++;
      }
    }
  }

  return [part1.toString(), part2.toString()];
}