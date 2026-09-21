/**
 * SMARTPLAY – AI-BASED TIC-TAC-TOE GAME
 * Mini Project for Bachelor of Computer Applications (BCA) / Computer Science
 * Powered by pure Minimax Adversarial Search Algorithm
 */

import React, { useState, useEffect, useCallback } from 'react';
import { BoardState, GameStatus, ScoreBoard as ScoreBoardType, MinimaxStats } from './types';
import { checkWinner, isDraw, getBestMove } from './logic/minimax';
import { GameBoard } from './components/GameBoard';
import { ScoreBoard } from './components/ScoreBoard';
import { StatusBanner } from './components/StatusBanner';
import { ProjectDocsView } from './components/ProjectDocsView';
import { AiConceptsView } from './components/AiConceptsView';
import { VivaQuestionsView } from './components/VivaQuestionsView';
import { SourceCodeView } from './components/SourceCodeView';
import { 
  RotateCcw, 
  Trash2, 
  Gamepad2, 
  BookOpen, 
  Brain, 
  GraduationCap, 
  Code2, 
  Cpu, 
  User, 
  Activity, 
  ShieldAlert,
  Sparkles
} from 'lucide-react';

type Tab = 'game' | 'docs' | 'concepts' | 'viva' | 'code';

export default function App() {
  const [activeTab, setActiveTab] = useState<Tab>('game');

  // Game state
  const [board, setBoard] = useState<BoardState>(() => Array(9).fill(null));
  const [isGameOver, setIsGameOver] = useState<boolean>(false);
  const [isAITurn, setIsAITurn] = useState<boolean>(false);
  const [status, setStatus] = useState<GameStatus>('Your Turn');
  const [winningLine, setWinningLine] = useState<number[] | null>(null);

  // Scoreboard state
  const [scores, setScores] = useState<ScoreBoardType>(() => {
    const saved = localStorage.getItem('smartplay_scores');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        // Fallback
      }
    }
    return { playerWins: 0, aiWins: 0, draws: 0 };
  });

  // Telemetry for Minimax inspection
  const [telemetry, setTelemetry] = useState<MinimaxStats | null>(null);

  // Persist scores
  useEffect(() => {
    localStorage.setItem('smartplay_scores', JSON.stringify(scores));
  }, [scores]);

  /**
   * resetGame()
   * Clears the board, resets game flags, and sets status back to 'Your Turn'.
   */
  const resetGame = useCallback(() => {
    setBoard(Array(9).fill(null));
    setIsGameOver(false);
    setIsAITurn(false);
    setWinningLine(null);
    setStatus('Your Turn');
  }, []);

  /**
   * resetScores()
   * Resets scoreboard numbers.
   */
  const resetScores = useCallback(() => {
    setScores({ playerWins: 0, aiWins: 0, draws: 0 });
  }, []);

  /**
   * executeAIMove()
   * Evaluates best move using Minimax and updates the board.
   */
  const executeAIMove = useCallback((currentBoard: BoardState) => {
    setIsAITurn(true);
    setStatus('AI is Thinking...');

    // Natural 350ms delay for visual feedback
    setTimeout(() => {
      const startTime = performance.now();
      const decision = getBestMove(currentBoard);
      const duration = (performance.now() - startTime).toFixed(1);

      if (decision.bestMove !== -1) {
        const newBoard = [...currentBoard];
        newBoard[decision.bestMove] = 'O';
        setBoard(newBoard);

        setTelemetry({
          bestMove: decision.bestMove,
          score: decision.score,
          nodesEvaluated: decision.nodesEvaluated,
          depthReached: decision.depth,
          timestamp: `${duration}ms`,
        });

        // Check outcome after AI move
        const winCheck = checkWinner(newBoard);
        if (winCheck.winner === 'O') {
          setStatus('AI Wins!');
          setIsGameOver(true);
          setWinningLine(winCheck.line);
          setScores((prev) => ({ ...prev, aiWins: prev.aiWins + 1 }));
          setIsAITurn(false);
          return;
        }

        if (isDraw(newBoard)) {
          setStatus("It's a Draw!");
          setIsGameOver(true);
          setScores((prev) => ({ ...prev, draws: prev.draws + 1 }));
          setIsAITurn(false);
          return;
        }
      }

      // Hand turn back to human player
      setIsAITurn(false);
      setStatus('Your Turn');
    }, 350);
  }, []);

  /**
   * handleCellClick()
   * Human player move handler.
   */
  const handleCellClick = (index: number) => {
    if (board[index] !== null || isGameOver || isAITurn) {
      return;
    }

    const newBoard = [...board];
    newBoard[index] = 'X';
    setBoard(newBoard);

    // Check outcome after human move
    const winCheck = checkWinner(newBoard);
    if (winCheck.winner === 'X') {
      setStatus('You Win!');
      setIsGameOver(true);
      setWinningLine(winCheck.line);
      setScores((prev) => ({ ...prev, playerWins: prev.playerWins + 1 }));
      return;
    }

    if (isDraw(newBoard)) {
      setStatus("It's a Draw!");
      setIsGameOver(true);
      setScores((prev) => ({ ...prev, draws: prev.draws + 1 }));
      return;
    }

    // Trigger AI move
    executeAIMove(newBoard);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col items-center">
      {/* Top Navigation Bar */}
      <header className="w-full bg-white border-b border-slate-200 sticky top-0 z-30 shadow-xs">
        <div className="max-w-4xl mx-auto px-4 py-3 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-blue-600 text-white flex items-center justify-center font-black text-xl shadow-xs">
              S
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-extrabold text-lg text-slate-900 tracking-tight leading-none">
                  SMARTPLAY
                </h1>
                <span className="hidden sm:inline-block text-[10px] uppercase font-bold tracking-wider bg-blue-50 text-blue-700 border border-blue-200 px-2 py-0.5 rounded-md">
                  Minimax AI
                </span>
              </div>
              <p className="text-xs text-slate-500 font-medium">
                AI-Based Tic-Tac-Toe Game
              </p>
            </div>
          </div>

          {/* Navigation Tabs */}
          <nav className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl overflow-x-auto text-xs font-semibold">
            <button
              id="tab-game"
              onClick={() => setActiveTab('game')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all ${
                activeTab === 'game'
                  ? 'bg-white text-blue-700 shadow-xs font-bold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Gamepad2 className="w-3.5 h-3.5" />
              <span>Play Game</span>
            </button>

            <button
              id="tab-docs"
              onClick={() => setActiveTab('docs')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all ${
                activeTab === 'docs'
                  ? 'bg-white text-blue-700 shadow-xs font-bold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>Project Report</span>
            </button>

            <button
              id="tab-concepts"
              onClick={() => setActiveTab('concepts')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all ${
                activeTab === 'concepts'
                  ? 'bg-white text-blue-700 shadow-xs font-bold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Brain className="w-3.5 h-3.5" />
              <span>AI Concepts</span>
            </button>

            <button
              id="tab-viva"
              onClick={() => setActiveTab('viva')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all ${
                activeTab === 'viva'
                  ? 'bg-white text-blue-700 shadow-xs font-bold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <GraduationCap className="w-3.5 h-3.5" />
              <span>Viva Voce</span>
            </button>

            <button
              id="tab-code"
              onClick={() => setActiveTab('code')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all ${
                activeTab === 'code'
                  ? 'bg-white text-blue-700 shadow-xs font-bold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Code2 className="w-3.5 h-3.5" />
              <span>Source Files</span>
            </button>
          </nav>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="w-full max-w-4xl px-4 py-6 flex-1 flex flex-col items-center">
        {activeTab === 'game' && (
          <div className="w-full max-w-md flex flex-col items-center gap-4 animate-in fade-in duration-200">
            {/* Matchup Bar */}
            <div className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 flex items-center justify-between shadow-xs">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-600 font-extrabold flex items-center justify-center text-lg">
                  X
                </div>
                <div>
                  <span className="block text-xs font-bold text-slate-800 leading-tight">
                    Human Player
                  </span>
                  <span className="block text-[11px] text-slate-400">
                    Your Turn
                  </span>
                </div>
              </div>

              <div className="text-[11px] font-extrabold text-slate-400 bg-slate-100 px-2 py-0.5 rounded-md uppercase tracking-wider">
                VS
              </div>

              <div className="flex items-center gap-2.5">
                <div>
                  <span className="block text-xs font-bold text-slate-800 text-right leading-tight">
                    AI Opponent
                  </span>
                  <span className="block text-[11px] text-slate-400 text-right">
                    Minimax Bot
                  </span>
                </div>
                <div className="w-8 h-8 rounded-lg bg-red-100 text-red-600 font-extrabold flex items-center justify-center text-lg">
                  O
                </div>
              </div>
            </div>

            {/* Game Status */}
            <StatusBanner status={status} isGameOver={isGameOver} />

            {/* 3x3 Game Board */}
            <GameBoard
              board={board}
              winningLine={winningLine}
              isGameOver={isGameOver}
              isAITurn={isAITurn}
              onCellClick={handleCellClick}
            />

            {/* Action Buttons */}
            <div className="w-full flex items-center gap-2.5">
              <button
                id="new-game-button"
                onClick={resetGame}
                className="flex-1 inline-flex items-center justify-center gap-2 py-2.5 px-4 bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm rounded-xl transition-all shadow-xs hover:shadow-sm active:scale-[0.98] cursor-pointer"
              >
                <RotateCcw className="w-4 h-4" />
                <span>New Game</span>
              </button>

              <button
                id="reset-scores-button"
                onClick={resetScores}
                title="Reset Scoreboard"
                className="inline-flex items-center justify-center gap-1.5 py-2.5 px-3.5 bg-white hover:bg-slate-100 text-slate-600 font-semibold text-sm border border-slate-200 rounded-xl transition-all active:scale-[0.98] cursor-pointer"
              >
                <Trash2 className="w-4 h-4 text-slate-400" />
                <span className="hidden sm:inline">Reset Scoreboard</span>
              </button>
            </div>

            {/* Scoreboard */}
            <ScoreBoard scores={scores} />

            {/* AI Explanation & Live Telemetry Card */}
            <div className="w-full bg-white border border-slate-200 rounded-xl p-4 shadow-xs text-left">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-1.5">
                  <Cpu className="w-4 h-4 text-purple-600" />
                  <h2 className="text-sm font-bold text-slate-900">
                    How the AI Works
                  </h2>
                </div>
                <span className="text-[10px] font-bold uppercase tracking-wider bg-purple-50 text-purple-700 border border-purple-200 px-2 py-0.5 rounded-md">
                  Minimax Engine
                </span>
              </div>

              <p className="text-xs text-slate-600 leading-relaxed">
                The AI uses the <strong>Minimax algorithm</strong> to examine all possible future moves.
                It scores terminal states (+10 for AI win, -10 for Human win, 0 for Draw) and recursively
                selects the move that guarantees the best possible mathematical outcome.
              </p>

              {/* Live Search Telemetry */}
              <div className="mt-3 pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2 text-xs">
                <div className="flex items-center gap-1.5 text-slate-500">
                  <Activity className="w-3.5 h-3.5 text-blue-500" />
                  <span>Last Search:</span>
                  <span className="font-bold text-slate-800">
                    {telemetry ? `${telemetry.nodesEvaluated} states` : 'Ready'}
                  </span>
                </div>

                <div className="flex items-center gap-1.5 text-slate-500">
                  <span>Depth:</span>
                  <span className="font-bold text-slate-800">
                    {telemetry ? `${telemetry.depthReached} plies` : '0'}
                  </span>
                </div>

                <div className="flex items-center gap-1.5 text-slate-500">
                  <span>Calc Time:</span>
                  <span className="font-bold text-slate-800">
                    {telemetry ? telemetry.timestamp : '0ms'}
                  </span>
                </div>
              </div>

              {/* Quick Jump Links */}
              <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between text-xs font-semibold">
                <button
                  onClick={() => setActiveTab('docs')}
                  className="text-blue-600 hover:text-blue-800 flex items-center gap-1"
                >
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>Read 21-Section Report</span>
                </button>

                <button
                  onClick={() => setActiveTab('viva')}
                  className="text-emerald-600 hover:text-emerald-800 flex items-center gap-1"
                >
                  <GraduationCap className="w-3.5 h-3.5" />
                  <span>Practice 15 Viva Q&As</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'docs' && <ProjectDocsView />}
        {activeTab === 'concepts' && <AiConceptsView />}
        {activeTab === 'viva' && <VivaQuestionsView />}
        {activeTab === 'code' && <SourceCodeView />}
      </main>

      {/* Academic Footer */}
      <footer className="w-full bg-white border-t border-slate-200 py-4 px-4 text-center text-xs text-slate-500">
        <p className="font-medium">
          SMARTPLAY &bull; AI-Based Tic-Tac-Toe Game &bull; BCA College Mini Project
        </p>
        <p className="text-[11px] text-slate-400 mt-0.5">
          Standalone client-side JavaScript Minimax algorithm &bull; Zero external API dependencies
        </p>
      </footer>
    </div>
  );
}
