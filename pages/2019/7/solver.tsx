export default function Solver(inputAOC : string) : string[] {
  const parsedInput = inputAOC.split(',').map(Number);
  if (parsedInput.some((a) => Number.isNaN(a))) {
    return ['ERROR'];
  }

  const usedArray = new Array(5).fill(0);
  const phaseSettings = [];

  const buildPhaseArray = (phaseArray : number[]) : void => {
    if (phaseArray.length === 5) {
      phaseSettings.push(phaseArray.slice());
    } else {
      for (let i = 0; i < 5; i++) {
        if (!usedArray[i]) {
          phaseArray.push(i);
          usedArray[i] = 1;
          buildPhaseArray(phaseArray);
          usedArray[i] = 0;
          phaseArray.pop();
        }
      }
    }
  }

  buildPhaseArray([]);

  let part1 = 0;

  let part2 = 0;

  const intcodeComputer = (inputArr : number[], phase : number, inputSignal : number) : number => {
    let i = 0;
    let outputSignal = 0;
    let firstInputInstruc = true;

    while (i < inputArr.length) {
      let instruc = inputArr[i];
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
          inputArr[inputArr[i + 1]] = firstInputInstruc ? phase : inputSignal;
          firstInputInstruc = false;
        } else if (param1 === 1) {
          inputArr[i + 1] = firstInputInstruc ? phase : inputSignal;
          firstInputInstruc = false;
        }
        i++;
      } else if (opcode === 4) {
        if (param1 === 0) {
          outputSignal = inputArr[inputArr[i + 1]];
        } else if (param1 === 1) {
          outputSignal = inputArr[i + 1];
        }
        i++;
      } else {
        let value1 = 0;
        if (param1 === 0) {
          value1 = inputArr[inputArr[i + 1]];
        } else if (param1 === 1) {
          value1 = inputArr[i + 1];
        }

        let value2 = 0;
        if (param2 === 0) {
          value2 = inputArr[inputArr[i + 2]];
        } else if (param2 === 1) {
          value2 = inputArr[i + 2];
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
            inputArr[inputArr[i + 3]] = value1 < value2 ? 1 : 0;
            i += 4;
          } else if (opcode === 8) {
            inputArr[inputArr[i + 3]] = value1 === value2 ? 1 : 0;
            i += 4;
          }
          continue;
        }

        if (param3 === 0) {
          inputArr[inputArr[i + 3]] = value3;
        } else if (param3 === 1) {
          console.log('Writing in immediate mode?');
          break;
        }
        i += 3;
      }

      i++;

    }
    return outputSignal;
  }

  for (const phaseSetting of phaseSettings) {
    let inputSignal = 0;
    for (const phase of phaseSetting) {
      inputSignal = intcodeComputer(parsedInput.slice(), phase, inputSignal)
    }
    part1 = Math.max(part1, inputSignal);
  }

  return [part1.toString(), part2.toString()];
}

