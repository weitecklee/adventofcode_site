export default function Solver(inputAOC: string): string[] {
  const parsedInput = inputAOC.split('\n');

  let part1 = 0;
  let part2 = 0;

  let xMin = Infinity;
  let xMax = -Infinity;
  let yMin = Infinity;
  let yMax = -Infinity;

  const points: number[][] = [];

  for (const line of parsedInput) {
    const nums = line.split(', ').map(Number);
    points.push(nums);
    if (nums[0] < xMin) {
      xMin = nums[0];
    }
    if (nums[0] > xMax) {
      xMax = nums[0];
    }
    if (nums[1] < yMin) {
      yMin = nums[1];
    }
    if (nums[1] > yMax) {
      yMax = nums[1];
    }
  }

  const grid: number[][][] = new Array(xMax - xMin + 1);
  for (let i = 0; i < grid.length; i++) {
    grid[i] = new Array(yMax - yMin + 1);
    for (let j = 0; j < grid[i].length; j++) {
      grid[i][j] = [yMax - yMin + xMax - xMin, -1];
    }
  }

  const queue: number[][] = [];

  for (let i = 0; i < points.length; i++) {
    const [x, y] = points[i];
    grid[x - xMin][y - yMin] = [0, i];
    queue.push([x - xMin, y - yMin, 0, i]);
  }

  for (const [x, y, dist, pid] of queue) {
    for (let i = -1; i <= 1; i++) {
      for (let j = -1; j <= 1; j++) {
        if (i === 0 && j === 0) {
          continue;
        }
        const x2 = x + i;
        const y2 = y + j;
        const dist2 = dist + Math.abs(i) + Math.abs(j);
        if (x2 >= 0 && x2 <= grid.length - 1 && y2 >= 0 && y2 <= grid[0].length - 1) {
          if (grid[x2][y2][0] > dist2) {
            grid[x2][y2] = [dist2, pid];
            queue.push([x2, y2, dist2, pid]);
          } else if (grid[x2][y2][0] === dist2 && grid[x2][y2][1] !== pid) {
            grid[x2][y2][1] = -1;
          }
        }
      }
    }
  }

  const pointMap: Map<number, number> = new Map();

  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[i].length; j++) {
      if (!pointMap.has(grid[i][j][1])) {
        pointMap.set(grid[i][j][1], 0);
      }
      pointMap.set(grid[i][j][1], pointMap.get(grid[i][j][1]) + 1);
    }
  }

  const edgePoints: Set<number> = new Set();

  for (let i = 0; i < grid.length; i++) {
    edgePoints.add(grid[i][0][1]);
    edgePoints.add(grid[i][grid[i].length - 1][1]);
  }
  for (let j = 0; j < grid[0].length; j++) {
    edgePoints.add(grid[0][j][1]);
    edgePoints.add(grid[grid.length - 1][j][1]);
  }

  for (const [pid, n] of pointMap) {
    if (!edgePoints.has(pid) && n > part1) {
      part1 = n;
    }
  }

  const range = 10000 - 1;
  for (let i = xMin - range; i <= xMin + range; i++) {
    for (let j = yMin - range; j <= yMin + range; j++) {
      let withinRange = true;
      let totalDist = 0;
      for (const [x, y] of points) {
        totalDist += Math.abs(x - i) + Math.abs(y - j);
        if (totalDist > range) {
          withinRange = false;
          break;
        }
      }
      if (withinRange) {
        part2++;
      }
    }
  }
  return [part1.toString(), part2.toString()];
}

