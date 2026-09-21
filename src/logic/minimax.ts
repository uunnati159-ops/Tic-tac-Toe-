import { BoardState, CellValue, Player, WinInfo } from '../types';

/**
 * SMARTPLAY – AI-BASED TIC-TAC-TOE GAME
 * Core Minimax Game Engine
 * 
 * Game Representation:
 * The 3x3 board is represented as a 1D array of 9 cells:
 * [0, 1, 2]
 * [3, 4, 5]
 * [6, 7, 8]
 * 
 * Player Roles:
 * - Human: 'X' (Minimizing Player, aiming to minimize AI's score)
 * - AI:    'O' (Maximizing Player, aiming to maximize score to +10)
 */

// All 8 possible winning line indices (3 rows, 3 columns, 2 diagonals)
export const WINNING_COMBINATIONS: number[][] = [
  [0, 1, 2], // Row 1
  [3, 4, 5], // Row 2
  [6, 7, 8], // Row 3
  [0, 3, 6], // Column 1
  [1, 4, 7], // Column 2
  [2, 5, 8], // Column 3
  [0, 4, 8], // Diagonal 1 (top-left to bottom-right)
  [2, 4, 6], // Diagonal 2 (top-right to bottom-left)
];

/**
 * checkWinner(board)
 * -------------------
 * Checks whether any player has 3 in a row.
 * Returns the winning player ('X' or 'O') and the winning line indices,
 * or null if no winner exists yet.
 */
export function checkWinner(board: BoardState): WinInfo {
  for (let i = 0; i < WINNING_COMBINATIONS.length; i++) {
    const [a, b, c] = WINNING_COMBINATIONS[i];
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return { winner: board[a] as Player, line: [a, b, c] };
    }
  }
  return { winner: null, line: null };
}

/**
 * isDraw(board)
 * -------------
 * Returns true if all 9 cells are occupied and neither player has won.
 */
export function isDraw(board: BoardState): boolean {
  const { winner } = checkWinner(board);
  const isFull = board.every((cell) => cell !== null);
  return isFull && winner === null;
}

/**
 * getAvailableMoves(board)
 * ------------------------
 * Returns an array of indices (0 to 8) representing empty board cells.
 */
export function getAvailableMoves(board: BoardState): number[] {
  const moves: number[] = [];
  for (let i = 0; i < board.length; i++) {
    if (board[i] === null) {
      moves.push(i);
    }
  }
  return moves;
}

/**
 * minimax(board, depth, isMaximizing, counter)
 * --------------------------------------------
 * The core recursive decision-making algorithm:
 * 1. Base Case: If the state is terminal (AI wins, Human wins, or Draw),
 *    return the static evaluation score.
 * 2. Recursive Case:
 *    - If isMaximizing (AI's turn): Try all possible moves, calculate their score
 *      via recursive calls, and pick the MAXIMUM value.
 *    - If !isMaximizing (Human's turn): Try all possible moves, calculate their score
 *      via recursive calls, and pick the MINIMUM value (assuming optimal human play).
 * 
 * Scoring Formula:
 * - AI ('O') wins:   +10 - depth  (higher score for winning faster)
 * - Human ('X') wins: depth - 10  (less negative score for delaying defeat)
 * - Draw:             0
 */
export function minimax(
  board: BoardState,
  depth: number,
  isMaximizing: boolean,
  counter?: { nodes: number; maxDepth: number }
): number {
  if (counter) {
    counter.nodes++;
    if (depth > counter.maxDepth) {
      counter.maxDepth = depth;
    }
  }

  // Step 1: Check for terminal states (Win, Loss, or Draw)
  const { winner } = checkWinner(board);
  if (winner === 'O') {
    // AI Won: Reward faster wins by subtracting depth
    return 10 - depth;
  }
  if (winner === 'X') {
    // Human Won: Penalize human wins; delaying defeat is relatively better
    return depth - 10;
  }
  if (isDraw(board)) {
    // Draw: Neutral score
    return 0;
  }

  const availableMoves = getAvailableMoves(board);

  if (isMaximizing) {
    // AI's turn to MAXIMIZE score
    let maxScore = -Infinity;
    for (const move of availableMoves) {
      // Simulate move
      board[move] = 'O';
      // Recursively evaluate resulting board state
      const score = minimax(board, depth + 1, false, counter);
      // Undo move (backtrack)
      board[move] = null;
      maxScore = Math.max(maxScore, score);
    }
    return maxScore;
  } else {
    // Human's turn to MINIMIZE score (acting as adversary)
    let minScore = Infinity;
    for (const move of availableMoves) {
      // Simulate move
      board[move] = 'X';
      // Recursively evaluate resulting board state
      const score = minimax(board, depth + 1, true, counter);
      // Undo move (backtrack)
      board[move] = null;
      minScore = Math.min(minScore, score);
    }
    return minScore;
  }
}

/**
 * getBestMove(board)
 * ------------------
 * Evaluates all available legal moves for AI ('O') and selects the move
 * with the highest Minimax score.
 * Returns the best move index and metrics (nodes evaluated, depth reached).
 */
export function getBestMove(board: BoardState): {
  bestMove: number;
  score: number;
  nodesEvaluated: number;
  depth: number;
} {
  const availableMoves = getAvailableMoves(board);
  if (availableMoves.length === 0) {
    return { bestMove: -1, score: 0, nodesEvaluated: 0, depth: 0 };
  }

  const counter = { nodes: 0, maxDepth: 0 };
  let bestScore = -Infinity;
  let bestMove = availableMoves[0];

  // If opening board is empty (AI moves first), taking the center cell is optimal
  if (availableMoves.length === 9) {
    return { bestMove: 4, score: 0, nodesEvaluated: 1, depth: 0 };
  }

  // Evaluate each candidate move at root depth 0
  for (const move of availableMoves) {
    board[move] = 'O';
    // Next turn belongs to human (minimizing player)
    const score = minimax(board, 0, false, counter);
    board[move] = null; // Backtrack

    if (score > bestScore) {
      bestScore = score;
      bestMove = move;
    }
  }

  return {
    bestMove,
    score: bestScore,
    nodesEvaluated: counter.nodes,
    depth: counter.maxDepth,
  };
}
