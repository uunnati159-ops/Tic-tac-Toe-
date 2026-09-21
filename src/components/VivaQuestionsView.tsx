import React, { useState } from 'react';
import { VIVA_QUESTIONS } from '../data/projectData';
import { GraduationCap, Lightbulb, Search, CheckCircle } from 'lucide-react';

export const VivaQuestionsView: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeId, setActiveId] = useState<number | null>(null);

  const toggleItem = (id: number) => {
    setActiveId(activeId === id ? null : id);
  };

  const filteredQuestions = VIVA_QUESTIONS.filter(
    (item) =>
      item.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.answer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.bcaTip.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div id="viva-questions-view" className="w-full space-y-6">
      {/* Banner */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-semibold mb-2">
            <GraduationCap className="w-3.5 h-3.5" />
            Viva Voce Preparation Guide
          </div>
          <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
            15 Examiner Viva Questions & Answers
          </h2>
          <p className="text-sm text-slate-500 mt-1">
            Top questions frequently asked by external project examiners with high-scoring conceptual responses.
          </p>
        </div>

        {/* Search */}
        <div className="relative min-w-[240px]">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search questions..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white transition-all"
          />
        </div>
      </div>

      {/* Questions Accordion */}
      <div className="space-y-3">
        {filteredQuestions.map((item) => {
          const isOpen = activeId === item.id;
          return (
            <div
              key={item.id}
              id={`viva-q-${item.id}`}
              className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm transition-all"
            >
              <button
                onClick={() => toggleItem(item.id)}
                className="w-full px-5 py-4 text-left flex items-start justify-between gap-4 hover:bg-slate-50/70 transition-colors"
              >
                <div className="flex items-start gap-3">
                  <span className="flex items-center justify-center w-7 h-7 rounded-lg bg-emerald-100 text-emerald-800 font-bold text-xs flex-shrink-0 mt-0.5">
                    Q{item.id}
                  </span>
                  <span className="font-bold text-slate-800 text-base">
                    {item.question}
                  </span>
                </div>
                <span className="text-xs font-semibold text-emerald-600 flex-shrink-0 mt-1">
                  {isOpen ? 'Collapse' : 'Answer'}
                </span>
              </button>

              {isOpen && (
                <div className="px-5 pb-5 pt-2 border-t border-slate-100 bg-slate-50/50 space-y-3 animate-in fade-in duration-150">
                  <div className="text-slate-700 text-sm leading-relaxed">
                    <strong className="text-slate-900 block mb-1">Model Answer:</strong>
                    {item.answer}
                  </div>

                  <div className="bg-amber-50/80 border border-amber-200/70 rounded-lg p-3 flex items-start gap-2.5 text-xs text-amber-900">
                    <Lightbulb className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <strong className="font-bold block mb-0.5 text-amber-950">
                        Examiner Viva Tip:
                      </strong>
                      <span>{item.bcaTip}</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
