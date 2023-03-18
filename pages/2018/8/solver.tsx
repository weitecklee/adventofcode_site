export default function Solver(inputAOC: string): string[] {
  const parsedInput = inputAOC.split(' ').map(Number);

  let part1 = 0;
  let part2 = 0;

  class Node {
    children: Node[];
    metadata: number[];
    value: number;

    constructor() {
      this.children = [];
      this.metadata = [];
      this.value = 0;
    }
  }

  const makeNode = (j: number) :[Node, number] => {
    const node = new Node();
    const nChildren = parsedInput[j];
    const nMetadata = parsedInput[++j];
    for (let k = 0; k < nChildren; k++) {
      const [child, t] = makeNode(j + 1);
      node.children.push(child);
      j = t;
    }
    for (let k = 0; k < nMetadata; k++) {
      const metadata = parsedInput[++j];
      node.metadata.push(metadata);
      part1 += metadata;
    }
    if (nChildren) {
      node.value = node.metadata.reduce((a, b) =>  a + (b <= node.children.length ? node.children[b - 1].value : 0), 0);
    } else {
      node.value = node.metadata.reduce((a, b) => a + b);
    }
    return [node, j];
  }

  const [rootNode] = makeNode(0);

  part2 = rootNode.value;

  return [part1.toString(), part2.toString()];
}

