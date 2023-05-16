export default function Solver(inputAOC: string): string[] {
  const parsedInput = inputAOC.split('\n').map((a) => a.split(' '));

  const scoresMap: Map<string, number> = new Map();

  scoresMap['win'] = 6;
  scoresMap['draw'] = 3;
  scoresMap['loss'] = 0;
  scoresMap['rock'] = 1;
  scoresMap['paper'] = 2;
  scoresMap['scissors'] = 3;

  const RPSMap: Map<string, string> = new Map();

  RPSMap['A'] = 'rock';
  RPSMap['B'] = 'paper';
  RPSMap['C'] = 'scissors';
  RPSMap['X'] = 'rock';
  RPSMap['Y'] = 'paper';
  RPSMap['Z'] = 'scissors';

  const outcomesMap: Map<string, string> = new Map();

  outcomesMap['X'] = 'loss';
  outcomesMap['Y'] = 'draw';
  outcomesMap['Z'] = 'win';

  const rockPaperScissors = (opponent: string, player: string) :string => {
    if (opponent === player) {
      return 'draw';
    }
    switch (player) {
      case 'rock':
        return opponent === 'scissors' ? 'win' : 'loss';
      case 'paper':
        return opponent === 'rock' ? 'win' : 'loss';
      case 'scissors':
        return opponent === 'paper' ? 'win' : 'loss';
      case 'win':
        return opponent === 'rock' ? 'paper' : opponent === 'paper' ? 'scissors' : 'rock';
      case 'draw':
        return opponent;
      case 'loss':
        return opponent === 'rock' ? 'scissors' : opponent === 'paper' ? 'rock' : 'paper';
    }
  }

  let part1 = 0;

  for (const [opponent, player] of parsedInput) {
    part1 += scoresMap[rockPaperScissors(RPSMap[opponent], RPSMap[player])] + scoresMap[RPSMap[player]]
  }

  let part2 = 0;

  for (const [opponent, outcome] of parsedInput) {
    part2 += scoresMap[outcomesMap[outcome]] + scoresMap[rockPaperScissors(RPSMap[opponent], outcomesMap[outcome])];
  }

  return [part1.toString(), part2.toString()];
}

