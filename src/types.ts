export type Player = 'X' | 'O';
export type CellValue = Player | null;
export type BoardState = CellValue[];

export type GameStatus = 
  | 'Your Turn'
  | 'AI is Thinking...'
  | 'You Win!'
  | 'AI Wins!'
  | "It's a Draw!";

export interface ScoreBoard {
  playerWins: number;
  aiWins: number;
  draws: number;
}

export interface MinimaxStats {
  bestMove: number;
  score: number;
  nodesEvaluated: number;
  depthReached: number;
  timestamp: string;
}

export interface WinInfo {
  winner: Player | null;
  line: number[] | null;
}
