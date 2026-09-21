import React from 'react';
import { BoardState } from '../types';

interface GameBoardProps {
  board: BoardState;
  winningLine: number[] | null;
  isGameOver: boolean;
  isAITurn: boolean;
  onCellClick: (index: number) => void;
}

export const GameBoard: React.FC<GameBoardProps> = ({
  board,
  winningLine,
  isGameOver,
  isAITurn,
  onCellClick,
}) => {
  return (
    <div className="w-full max-w-[360px] mx-auto aspect-square">
      <div
        id="game-board-grid"
        role="grid"
        aria-label="3x3 Tic-Tac-Toe Game Board"
        className="w-full h-full bg-slate-200 p-2.5 rounded-2xl grid grid-cols-3 gap-2.5 shadow-md"
      >
        {board.map((cell, index) => {
          const isWinningCell = winningLine?.includes(index);
          const isDisabled = cell !== null || isGameOver || isAITurn;

          let cellColorClass = 'text-slate-800';
          if (cell === 'X') cellColorClass = 'text-blue-600';
          if (cell === 'O') cellColorClass = 'text-red-600';

          return (
            <button
              key={index}
              id={`board-cell-${index}`}
              data-index={index}
              disabled={isDisabled}
              onClick={() => onCellClick(index)}
              aria-label={`Row ${Math.floor(index / 3) + 1} Column ${(index % 3) + 1}, ${cell ? `occupied by ${cell}` : 'empty'}`}
              className={`
                relative rounded-xl flex items-center justify-center font-extrabold text-5xl sm:text-6xl
                transition-all duration-150 select-none outline-none
                ${isWinningCell 
                  ? 'bg-emerald-100 text-emerald-700 ring-2 ring-emerald-500 scale-[1.02] shadow-sm' 
                  : 'bg-white hover:bg-slate-50'
                }
                ${!isDisabled ? 'hover:scale-[1.02] hover:shadow-sm cursor-pointer' : ''}
                ${isDisabled && !isWinningCell ? 'cursor-default' : ''}
                ${cellColorClass}
              `}
            >
              {cell && (
                <span className="animate-in fade-in zoom-in-75 duration-150">
                  {cell}
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};
