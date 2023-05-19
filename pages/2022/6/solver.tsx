export default function Solver(inputAOC: string): string[] {

  const findStartMarker = (signal: string, n: number) : number => {
    let start = 0;
    const charMap: Map<string, number> = new Map();
    for (let i = 0; i < signal.length; i++) {
      if (charMap.has(signal[i]) && charMap.get(signal[i]) >= start) {
        start = charMap.get(signal[i]) + 1;
      }
      charMap.set(signal[i], i);
      if (i - start === n) {
        return i;
      }
    }
    return -1
  }

  const part1 = findStartMarker(inputAOC, 4);
  const part2 = findStartMarker(inputAOC, 14);

  return [part1.toString(), part2.toString()];
}

