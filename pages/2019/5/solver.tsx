export default function Solver(inputAOC : string) : string[] {
  const parsedInput = inputAOC.split(',').map(Number);
  if (parsedInput.some((a) => Number.isNaN(a))) {
    return ['ERROR'];
  }
  const parsedInput2 = parsedInput.slice();

  let part1 = 0;
  const singleInput = 1;

  let i = 0;

  while (i < parsedInput.length) {
    let instruc = parsedInput[i];
    const opcode = instruc % 100;
    instruc = Math.floor(instruc / 100);
    const param1 = instruc % 10;
    instruc = Math.floor(instruc / 10);
    const param2 = instruc % 10;
    instruc = Math.floor(instruc / 10);
    const param3 = instruc % 10;

    if (opcode === 99) {
      break;
    }
    if (opcode === 3) {
      parsedInput[parsedInput[i + 1]] = singleInput;
      i++;
    } else if (opcode === 4) {
      part1 = parsedInput[parsedInput[i + 1]];
      i++;
    } else {
      let value1 = 0;
      if (param1 === 0) {
        value1 = parsedInput[parsedInput[i + 1]];
      } else if (param1 === 1) {
        value1 = parsedInput[i + 1];
      }

      let value2 = 0;
      if (param2 === 0) {
        value2 = parsedInput[parsedInput[i + 2]];
      } else if (param2 === 1) {
        value2 = parsedInput[i + 2];
      }

      let value3 = 0;
      if (opcode === 1) {
        value3 = value1 + value2;
      } else if (opcode === 2) {
        value3 = value1 * value2;
      }

      if (param3 === 0) {
        parsedInput[parsedInput[i + 3]] = value3;
      } else if (param3 === 1) {
        console.log('Writing in immediate mode?');
        break;
      }
      i += 3;
    }

    i++;

  }

  let part2 = 0;
  const singleInput2 = 5;

  i = 0;

  while (i < parsedInput2.length) {
    let instruc = parsedInput2[i];
    const opcode = instruc % 100;
    instruc = Math.floor(instruc / 100);
    const param1 = instruc % 10;
    instruc = Math.floor(instruc / 10);
    const param2 = instruc % 10;
    instruc = Math.floor(instruc / 10);
    const param3 = instruc % 10;

    if (opcode === 99) {
      break;
    }
    if (opcode === 3) {
      if (param1 === 0) {
        parsedInput2[parsedInput2[i + 1]] = singleInput2;
      } else if (param1 === 1) {
        parsedInput2[i + 1] = singleInput2;
      }
      i++;
    } else if (opcode === 4) {
      if (param1 === 0) {
        part2 = parsedInput2[parsedInput2[i + 1]];
      } else if (param1 === 1) {
        part2 = parsedInput2[i + 1];
      }
      i++;
    } else {
      let value1 = 0;
      if (param1 === 0) {
        value1 = parsedInput2[parsedInput2[i + 1]];
      } else if (param1 === 1) {
        value1 = parsedInput2[i + 1];
      }

      let value2 = 0;
      if (param2 === 0) {
        value2 = parsedInput2[parsedInput2[i + 2]];
      } else if (param2 === 1) {
        value2 = parsedInput2[i + 2];
      }

      let value3 = 0;
      if (opcode === 1) {
        value3 = value1 + value2;
      } else if (opcode === 2) {
        value3 = value1 * value2;
      } else{
        if (opcode === 5) {
          if (value1 !== 0) {
            i = value2;
          } else {
            i += 3;
          }
        } else if (opcode === 6) {
          if (value1 === 0) {
            i = value2;
          } else {
            i += 3;
          }
        } else if (opcode === 7) {
          parsedInput2[parsedInput2[i + 3]] = value1 < value2 ? 1 : 0;
          i += 4;
        } else if (opcode === 8) {
          parsedInput2[parsedInput2[i + 3]] = value1 === value2 ? 1 : 0;
          i += 4;
        }
        continue;
      }

      if (param3 === 0) {
        parsedInput2[parsedInput2[i + 3]] = value3;
      } else if (param3 === 1) {
        console.log('Writing in immediate mode?');
        break;
      }
      i += 3;
    }

    i++;

  }

  return [part1.toString(), part2.toString()];
}

