import React, { useState } from 'react';
import { AI_CONCEPTS } from '../data/projectData';
import { Brain, Sparkles, CheckCircle2, ChevronDown, ChevronUp } from 'lucide-react';

export const AiConceptsView: React.FC = () => {
  const [expandedId, setExpandedId] = useState<string | null>('c5'); // Minimax open by default

  const toggleConcept = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <div id="ai-concepts-view" className="w-full space-y-6">
      {/* Overview Banner */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-50 border border-purple-200 text-purple-700 text-xs font-semibold mb-2">
          <Brain className="w-3.5 h-3.5" />
          BCA Curriculum Core AI Concepts
        </div>
        <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
          AI Concepts Explained (Student Guide)
        </h2>
        <p className="text-sm text-slate-500 mt-1">
          Simple, exam-ready explanations for foundational game-playing AI and decision-making concepts.
        </p>
      </div>

      {/* Concept Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {AI_CONCEPTS.map((concept, index) => {
          const isExpanded = expandedId === concept.id;
          return (
            <div
              key={concept.id}
              id={`concept-card-${concept.id}`}
              className={`bg-white border rounded-xl p-5 shadow-sm transition-all duration-150 flex flex-col justify-between ${
                isExpanded ? 'border-purple-300 ring-1 ring-purple-100' : 'border-slate-200 hover:border-slate-300'
              }`}
            >
              <div>
                <div className="flex items-start justify-between gap-3 mb-2">
                  <div className="flex items-center gap-2">
                    <span className="flex items-center justify-center w-6 h-6 rounded-md bg-purple-100 text-purple-700 font-bold text-xs flex-shrink-0">
                      {index + 1}
                    </span>
                    <h3 className="font-bold text-slate-900 text-base">
                      {concept.question}
                    </h3>
                  </div>
                </div>

                <p className="text-sm text-slate-700 font-medium leading-relaxed mb-3">
                  {concept.shortAnswer}
                </p>

                {isExpanded && (
                  <div className="mt-3 pt-3 border-t border-slate-100 space-y-3 animate-in fade-in duration-200">
                    <div>
                      <span className="text-xs font-bold uppercase text-slate-400 tracking-wider">
                        In-Depth Explanation
                      </span>
                      <p className="text-sm text-slate-600 mt-1 leading-relaxed">
                        {concept.detailedAnswer}
                      </p>
                    </div>

                    <div className="bg-purple-50/70 border border-purple-100 rounded-lg p-3 flex items-start gap-2 text-purple-900 text-xs font-semibold">
                      <Sparkles className="w-4 h-4 text-purple-600 flex-shrink-0 mt-0.5" />
                      <span>{concept.keyTakeaway}</span>
                    </div>
                  </div>
                )}
              </div>

              <div className="mt-3 pt-2 flex items-center justify-end">
                <button
                  onClick={() => toggleConcept(concept.id)}
                  className="text-xs font-bold text-purple-600 hover:text-purple-800 flex items-center gap-1 transition-colors"
                >
                  <span>{isExpanded ? 'Show Less' : 'Learn More'}</span>
                  {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
