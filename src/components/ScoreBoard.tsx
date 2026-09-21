import React from 'react';
import { ScoreBoard as ScoreBoardType } from '../types';
import { User, Cpu, Equal } from 'lucide-react';

interface ScoreBoardProps {
  scores: ScoreBoardType;
}

export const ScoreBoard: React.FC<ScoreBoardProps> = ({ scores }) => {
  return (
    <div id="scoreboard-section" className="w-full grid grid-cols-3 gap-3">
      {/* Player Card */}
      <div
        id="score-card-player"
        className="bg-white border border-slate-200 rounded-xl p-3.5 flex flex-col items-center justify-center text-center shadow-sm"
      >
        <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">
          <User className="w-3.5 h-3.5 text-blue-600" />
          <span>Player (X)</span>
        </div>
        <span className="text-2xl sm:text-3xl font-extrabold text-blue-600">
          {scores.playerWins}
        </span>
        <span className="text-[11px] text-slate-400 font-medium">Wins</span>
      </div>

      {/* AI Card */}
      <div
        id="score-card-ai"
        className="bg-white border border-slate-200 rounded-xl p-3.5 flex flex-col items-center justify-center text-center shadow-sm"
      >
        <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">
          <Cpu className="w-3.5 h-3.5 text-red-600" />
          <span>AI (O)</span>
        </div>
        <span className="text-2xl sm:text-3xl font-extrabold text-red-600">
          {scores.aiWins}
        </span>
        <span className="text-[11px] text-slate-400 font-medium">Wins</span>
      </div>

      {/* Draw Card */}
      <div
        id="score-card-draw"
        className="bg-white border border-slate-200 rounded-xl p-3.5 flex flex-col items-center justify-center text-center shadow-sm"
      >
        <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">
          <Equal className="w-3.5 h-3.5 text-amber-600" />
          <span>Ties</span>
        </div>
        <span className="text-2xl sm:text-3xl font-extrabold text-amber-600">
          {scores.draws}
        </span>
        <span className="text-[11px] text-slate-400 font-medium">Draws</span>
      </div>
    </div>
  );
};
