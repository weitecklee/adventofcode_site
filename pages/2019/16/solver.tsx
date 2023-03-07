export default function Solver(inputAOC: string): string[] {
  let parsedInput = inputAOC.split('').map(Number);
  const parsedInput2 = parsedInput.slice();
  const offset = Number(inputAOC.slice(0, 7));

  let part1 = '';
  let part2 = '';

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

  /*
  For part 2, the trick is that for any index i of signal of length n,
  if i >= n / 2, then signal_updated[i] = sum(signal[i:]) % 10.
  Simply iterate from the end to the offset. The offset seems to always be
  greater than n / 2 so that this property can be taken advantage of.
  */

  for (let i = 0; i < 10000 - 1; i++) {
    for (let j = 0; j < parsedInput.length; j++) {
      parsedInput2.push(parsedInput2[j]);
    }
  }

  for (let phase = 0; phase < 100; phase++) {
    for (let i = parsedInput2.length - 1; i >= offset; i--) {
      parsedInput2[i] = (parsedInput2[i] + (parsedInput2[i + 1] ?? 0)) % 10;
    }
  }

  part2 = parsedInput2.join('').slice(offset, offset + 8);

  return [part1, part2];
}

