export default function Solver(inputAOC: string): string[] {
  let parsedInput = inputAOC.split('').map(Number);

  let part1 = '';
  let part2 = 0;

  for (let phase = 0; phase < 100; phase++) {
    const newInput: number[] = [];
    for (let i = 0; i < parsedInput.length; i++) {
      const pattern: number[] = new Array(i + 1).fill(0);
      for (let j = 1; j >= -1; j--) {
        for (let k = 0; k <= i; k++) {
          pattern.push(j);
        }
      }
      let n = 0;
      for (let j = 0; j < parsedInput.length; j++) {
        n += parsedInput[j] * pattern[(j + 1) % ((i + 1) * 4)];
      }
      newInput.push(Math.abs(n % 10));
    }
    parsedInput = newInput;
  }

  part1 = parsedInput.join('').slice(0, 8);

  return [part1.toString(), part2.toString()];
}

