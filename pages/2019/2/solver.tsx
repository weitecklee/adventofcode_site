export default function Solver(inputAOC : string) : string[] {
  const parsedInput = inputAOC.split(',').map(Number);
  if (parsedInput.some((a) => Number.isNaN(a))) {
    return ['ERROR'];
  }
  parsedInput[1] = 12;
  parsedInput[2] = 2;

  const runProgram = (input : number[]) => {
    for (let i = 0; i < input.length; i += 4) {
      if (input[i] === 99) {
        break;
      }
      if (input[i] === 1) {
        input[input[i + 3]] = input[input[i + 1]] + input[input[i + 2]];
      } else if (input[i] === 2) {
        input[input[i + 3]] = input[input[i + 1]] * input[input[i + 2]];
      }
    }
    return input[0];
  }

  const part1 = runProgram(parsedInput.slice());
  let part2 = 0;

  for (let noun = 0; noun <= 99; noun++) {
    for (let verb = 0; verb <= 99; verb++) {
      const parsedInput2 = parsedInput.slice();
      parsedInput2[1] = noun;
      parsedInput2[2] = verb;
      if (runProgram(parsedInput2) === 19690720) {
        part2 = 100 * noun + verb;
        break;
      }
    }
  }

  return [part1.toString(), part2.toString()];
}

