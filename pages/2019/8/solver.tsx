export default function Solver(inputAOC : string) : string[] {

  if (/\D/.test(inputAOC)) {
    return ['ERROR'];
  }

  let part1 = 0;

  const width = 25;
  const height = 6;

  const layers = [];
  let row = [];
  let layer = [];

  for (const c of inputAOC) {
    row.push(Number(c));
    if (row.length === width) {
      layer.push(row);
      row = [];
      if (layer.length === height) {
        layers.push(layer);
        layer = [];
      }
    }
  }

  let minCount0 = Infinity;
  for (const lyr of layers) {
    let count0 = 0;
    let count1 = 0;
    let count2 = 0;
    for (const rw of lyr) {
      for (const n of rw) {
        switch(n) {
          case 0:
            count0++;
            break;
          case 1:
            count1++;
            break;
          case 2:
            count2++;
            break;
          default:
        }
      }
    }
    if (count0 < minCount0) {
      minCount0 = count0;
      part1 = count1 * count2;
    }
  }

  const part2 = [];
  for (let i = 0; i < height; i++) {
    part2.push('');
    for (let j = 0; j < width; j++) {
      let k = 0;
      while (k < layers.length && layers[k][i][j] === 2) {
        k++;
      }
      part2[i] += layers[k][i][j] ?? 2;
    }
  }

  return [part1.toString(), ...part2];
}

