export default function Solver(inputAOC : string) : string[] {
  const parsedInput = inputAOC.split('-').map(Number);
  if (parsedInput.some((a) => Number.isNaN(a))) {
    return ['ERROR'];
  }

  let part1 = 0;
  let part2 = 0;

  for (let i = parsedInput[0]; i <= parsedInput[1]; i++) {
    let doubleDigits = false;
    let increasingDigits = true;
    const numStr = i.toString().split('').map(Number);

    for (let j = 1; j < numStr.length; j++) {
      if (numStr[j] < numStr[j - 1]) {
        increasingDigits = false;
        break;
      }
      if (numStr[j] === numStr[j - 1]) {
        doubleDigits = true;
      }
    }
    if (increasingDigits && doubleDigits) {
      part1++;
    }
  }

  return [part1.toString(), part2.toString()];
}