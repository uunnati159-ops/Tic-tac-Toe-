import React from 'react';
import { GameStatus } from '../types';

interface StatusBannerProps {
  status: GameStatus;
  isGameOver: boolean;
}

export const StatusBanner: React.FC<StatusBannerProps> = ({ status, isGameOver }) => {
  // Determine color styling based on status
  let bgClass = 'bg-white border-slate-200 text-slate-800';
  let dotClass = 'bg-blue-500';

  if (status === 'AI is Thinking...') {
    bgClass = 'bg-amber-50 border-amber-200 text-amber-900';
    dotClass = 'bg-amber-500 animate-pulse';
  } else if (status === 'You Win!') {
    bgClass = 'bg-emerald-50 border-emerald-300 text-emerald-900';
    dotClass = 'bg-emerald-500';
  } else if (status === 'AI Wins!') {
    bgClass = 'bg-red-50 border-red-200 text-red-900';
    dotClass = 'bg-red-500';
  } else if (status === "It's a Draw!") {
    bgClass = 'bg-slate-100 border-slate-300 text-slate-700';
    dotClass = 'bg-slate-500';
  }

  return (
    <div
      id="status-banner"
      className={`w-full py-3 px-4 rounded-xl border flex items-center justify-center gap-2.5 shadow-sm transition-all duration-200 ${bgClass}`}
    >
      <span className={`w-2.5 h-2.5 rounded-full flex-shrink-0 ${dotClass}`} />
      <span className="font-bold text-base tracking-tight">{status}</span>
    </div>
  );
};
