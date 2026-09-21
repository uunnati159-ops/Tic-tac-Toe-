/**
 * ============================================================================
 * PROJECT: SMARTPLAY – AI-BASED TIC-TAC-TOE GAME
 * Mini Project for Bachelor of Computer Applications (BCA) / Computer Science
 * Technology: Vanilla JavaScript, HTML5, CSS3
 * Algorithm: Minimax (Adversarial Search)
 * ============================================================================
 */

// ---------------------------------------------------------------------------
// 1. GAME STATE VARIABLES
// ---------------------------------------------------------------------------

// The board is represented as a 1D array of 9 elements (indices 0 to 8).
// null = empty cell, 'X' = Human Player, 'O' = AI Opponent
let board = Array(9).fill(null);

// Players
const HUMAN_PLAYER = 'X';
const AI_PLAYER = 'O';

// Game control flags
let isGameOver = false;
let isAITurn = false;

// Scoreboard counters
let scores = {
  playerWins: 0,
  aiWins: 0,
  draws: 0
};

// All 8 possible 3-in-a-row winning combinations on a 3x3 grid
const WINNING_COMBINATIONS = [
  [0, 1, 2], // Row 1
  [3, 4, 5], // Row 2
  [6, 7, 8], // Row 3
  [0, 3, 6], // Column 1
  [1, 4, 7], // Column 2
  [2, 5, 8], // Column 3
  [0, 4, 8], // Diagonal from top-left to bottom-right
  [2, 4, 6]  // Diagonal from top-right to bottom-left
];

// ---------------------------------------------------------------------------
// 2. DOM ELEMENT REFERENCES
// ---------------------------------------------------------------------------
const boardElement = document.getElementById('board');
const cells = document.querySelectorAll('.cell');
const statusCard = document.getElementById('statusCard');
const statusText = document.getElementById('statusText');
const playerScoreElem = document.getElementById('playerScore');
const aiScoreElem = document.getElementById('aiScore');
const drawScoreElem = document.getElementById('drawScore');
const newGameBtn = document.getElementById('newGameBtn');
const resetScoresBtn = document.getElementById('resetScoresBtn');
const tStatesElem = document.getElementById('tStates');
const tDepthElem = document.getElementById('tDepth');

// ---------------------------------------------------------------------------
// 3. CORE LOGIC FUNCTIONS
// ---------------------------------------------------------------------------

/**
 * checkWinner(currentBoard)
 * -------------------------
 * Checks whether either player has achieved three of their symbols in a row.
 * Returns an object: { winner: 'X' | 'O' | null, line: [a, b, c] | null }
 * 
 * BCA Student Note:
 * This function iterates through all 8 pre-defined winning line patterns.
 * If all 3 indices match and are not empty (null), that symbol is the winner.
 */
function checkWinner(currentBoard) {
  for (let i = 0; i < WINNING_COMBINATIONS.length; i++) {
    const [a, b, c] = WINNING_COMBINATIONS[i];
    if (
      currentBoard[a] !== null &&
      currentBoard[a] === currentBoard[b] &&
      currentBoard[a] === currentBoard[c]
    ) {
      return { winner: currentBoard[a], line: [a, b, c] };
    }
  }
  return { winner: null, line: null };
}

/**
 * isDraw(currentBoard)
 * --------------------
 * Checks if the board is completely filled and no player has won.
 * Returns true if it's a draw, otherwise false.
 */
function isDraw(currentBoard) {
  const { winner } = checkWinner(currentBoard);
  const isFull = currentBoard.every(cell => cell !== null);
  return isFull && winner === null;
}

/**
 * getAvailableMoves(currentBoard)
 * -------------------------------
 * Scans the board array and collects indices of all unoccupied (null) cells.
 * Returns an array of valid cell indices, e.g. [0, 2, 4, 7].
 */
function getAvailableMoves(currentBoard) {
  const moves = [];
  for (let i = 0; i < currentBoard.length; i++) {
    if (currentBoard[i] === null) {
      moves.push(i);
    }
  }
  return moves;
}

/**
 * minimax(currentBoard, depth, isMaximizing, telemetry)
 * ------------------------------------------------------
 * The Minimax algorithm evaluates all possible future moves recursively.
 * 
 * Concept for Viva & Exams:
 * - AI ('O') is the MAXIMIZING player: aims for the highest possible score (+10).
 * - Human ('X') is the MINIMIZING player: aims for the lowest possible score (-10).
 * 
 * Terminal State Evaluation:
 * - AI Wins:    score = +10 - depth (faster wins get higher positive score)
 * - Human Wins: score = depth - 10  (delaying defeat gives better score than immediate loss)
 * - Draw:       score = 0
 * 
 * @param {Array} currentBoard - The 9-cell board array being simulated
 * @param {number} depth - Recursion depth (number of plies down the game tree)
 * @param {boolean} isMaximizing - True if simulating AI's turn, false for Human's turn
 * @param {Object} telemetry - Counter object tracking node evaluations
 * @returns {number} The best score achievable from this state
 */
function minimax(currentBoard, depth, isMaximizing, telemetry) {
  if (telemetry) {
    telemetry.nodesEvaluated++;
    if (depth > telemetry.maxDepth) {
      telemetry.maxDepth = depth;
    }
  }

  // 1. BASE CASE: Check if this node is a terminal state (game over)
  const result = checkWinner(currentBoard);
  if (result.winner === AI_PLAYER) {
    return 10 - depth; // AI wins
  }
  if (result.winner === HUMAN_PLAYER) {
    return depth - 10; // Human wins
  }
  if (isDraw(currentBoard)) {
    return 0; // Tie game
  }

  // 2. RECURSIVE CASE: Generate all legal moves from current state
  const availableMoves = getAvailableMoves(currentBoard);

  if (isMaximizing) {
    // AI's turn: maximize the outcome
    let maxEval = -Infinity;
    for (let i = 0; i < availableMoves.length; i++) {
      const move = availableMoves[i];
      // Simulate move
      currentBoard[move] = AI_PLAYER;
      // Recursively evaluate next state where human moves next
      const evaluation = minimax(currentBoard, depth + 1, false, telemetry);
      // Undo move (backtrack)
      currentBoard[move] = null;
      maxEval = Math.max(maxEval, evaluation);
    }
    return maxEval;
  } else {
    // Human's turn: minimize the outcome (acting as an optimal adversary)
    let minEval = Infinity;
    for (let i = 0; i < availableMoves.length; i++) {
      const move = availableMoves[i];
      // Simulate move
      currentBoard[move] = HUMAN_PLAYER;
      // Recursively evaluate next state where AI moves next
      const evaluation = minimax(currentBoard, depth + 1, true, telemetry);
      // Undo move (backtrack)
      currentBoard[move] = null;
      minEval = Math.min(minEval, evaluation);
    }
    return minEval;
  }
}

/**
 * getBestMove(currentBoard)
 * -------------------------
 * Runs Minimax on all currently available legal moves from the current position
 * and returns the index of the move with the maximum Minimax score.
 */
function getBestMove(currentBoard) {
  const availableMoves = getAvailableMoves(currentBoard);
  if (availableMoves.length === 0) return null;

  // Opening Optimization: If board is entirely empty, pick center for efficiency
  if (availableMoves.length === 9) {
    return {
      bestMove: 4,
      nodesEvaluated: 1,
      maxDepth: 0
    };
  }

  let bestScore = -Infinity;
  let bestMove = availableMoves[0];
  const telemetry = { nodesEvaluated: 0, maxDepth: 0 };

  // Loop over every candidate move available right now
  for (let i = 0; i < availableMoves.length; i++) {
    const move = availableMoves[i];
    // Make move
    currentBoard[move] = AI_PLAYER;
    // Call minimax with isMaximizing = false (since next turn is Human's)
    const score = minimax(currentBoard, 0, false, telemetry);
    // Backtrack
    currentBoard[move] = null;

    if (score > bestScore) {
      bestScore = score;
      bestMove = move;
    }
  }

  return {
    bestMove: bestMove,
    nodesEvaluated: telemetry.nodesEvaluated,
    maxDepth: telemetry.maxDepth
  };
}

/**
 * makeAIMove()
 * ------------
 * Orchestrates the AI's turn:
 * 1. Shows "AI is Thinking..." status.
 * 2. Uses getBestMove() powered by Minimax.
 * 3. Applies the move to the board after a short natural delay.
 * 4. Checks the new board state for win or draw.
 * 5. Returns turn back to the Human player if game is not over.
 */
function makeAIMove() {
  if (isGameOver) return;

  isAITurn = true;
  updateStatus('AI is Thinking...', 'thinking');

  // Small timeout (350ms) creates a pleasant, natural interactive rhythm
  setTimeout(() => {
    if (isGameOver) return;

    const decision = getBestMove(board);
    if (decision && decision.bestMove !== null && decision.bestMove >= 0) {
      board[decision.bestMove] = AI_PLAYER;
      renderBoard();

      // Update telemetry display
      if (tStatesElem) tStatesElem.textContent = `${decision.nodesEvaluated} states evaluated`;
      if (tDepthElem) tDepthElem.textContent = `${decision.maxDepth} plies deep`;

      // Check result after AI move
      const winData = checkWinner(board);
      if (winData.winner === AI_PLAYER) {
        handleGameOver('AI Wins!', 'loss', winData.line);
        scores.aiWins++;
        updateScoreboard();
        return;
      }

      if (isDraw(board)) {
        handleGameOver("It's a Draw!", 'draw', null);
        scores.draws++;
        updateScoreboard();
        return;
      }
    }

    // Hand turn back to human player
    isAITurn = false;
    updateStatus('Your Turn', 'normal');
  }, 350);
}

/**
 * handleCellClick(index)
 * ----------------------
 * Handles when a human player clicks on a board cell.
 * Validates move legality, applies 'X', checks for game end,
 * and triggers AI move.
 */
function handleCellClick(index) {
  // Prevent move if:
  // 1. Cell is already occupied
  // 2. Game is over
  // 3. It is currently AI's turn
  if (board[index] !== null || isGameOver || isAITurn) {
    return;
  }

  // Apply human move
  board[index] = HUMAN_PLAYER;
  renderBoard();

  // Check result after human move
  const winData = checkWinner(board);
  if (winData.winner === HUMAN_PLAYER) {
    handleGameOver('You Win!', 'win', winData.line);
    scores.playerWins++;
    updateScoreboard();
    return;
  }

  if (isDraw(board)) {
    handleGameOver("It's a Draw!", 'draw', null);
    scores.draws++;
    updateScoreboard();
    return;
  }

  // Trigger AI turn
  makeAIMove();
}

/**
 * resetGame()
 * -----------
 * Resets the 3x3 board array and UI controls for a fresh round.
 */
function resetGame() {
  board = Array(9).fill(null);
  isGameOver = false;
  isAITurn = false;
  renderBoard();
  updateStatus('Your Turn', 'normal');

  // Reset winning cell highlight styles
  cells.forEach(cell => {
    cell.classList.remove('winning-cell');
    cell.disabled = false;
  });
}

/**
 * resetScores()
 * -------------
 * Resets the score tracker back to zero.
 */
function resetScores() {
  scores.playerWins = 0;
  scores.aiWins = 0;
  scores.draws = 0;
  updateScoreboard();
}

// ---------------------------------------------------------------------------
// 4. UI RENDER & HELPER FUNCTIONS
// ---------------------------------------------------------------------------

function renderBoard() {
  cells.forEach((cell, idx) => {
    const val = board[idx];
    cell.textContent = val || '';
    cell.classList.remove('x', 'o');
    if (val === HUMAN_PLAYER) {
      cell.classList.add('x');
    } else if (val === AI_PLAYER) {
      cell.classList.add('o');
    }
    cell.disabled = val !== null || isGameOver || isAITurn;
  });
}

function updateStatus(message, type) {
  statusText.textContent = message;
  statusCard.className = 'status-card';
  if (type && type !== 'normal') {
    statusCard.classList.add(type);
  }
}

function handleGameOver(message, type, winningLine) {
  isGameOver = true;
  isAITurn = false;
  updateStatus(message, type);

  // Highlight winning cells
  if (winningLine && Array.isArray(winningLine)) {
    winningLine.forEach(idx => {
      const cell = document.getElementById(`cell-${idx}`);
      if (cell) cell.classList.add('winning-cell');
    });
  }

  // Disable all cells
  cells.forEach(cell => {
    cell.disabled = true;
  });
}

function updateScoreboard() {
  playerScoreElem.textContent = scores.playerWins;
  aiScoreElem.textContent = scores.aiWins;
  drawScoreElem.textContent = scores.draws;
}

// ---------------------------------------------------------------------------
// 5. EVENT LISTENERS SETUP
// ---------------------------------------------------------------------------
cells.forEach(cell => {
  cell.addEventListener('click', (e) => {
    const idx = parseInt(e.target.getAttribute('data-index'), 10);
    handleCellClick(idx);
  });
});

newGameBtn.addEventListener('click', resetGame);
resetScoresBtn.addEventListener('click', resetScores);

// Initialize on page load
resetGame();
updateScoreboard();
