import React, { useState } from 'react';
import { PROJECT_DOC_SECTIONS } from '../data/projectData';
import { BookOpen, Search, Copy, Check, ChevronDown, ChevronUp } from 'lucide-react';

export const ProjectDocsView: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [collapsedSections, setCollapsedSections] = useState<Record<string, boolean>>({});

  const toggleSection = (id: string) => {
    setCollapsedSections((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handleCopySection = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const filteredSections = PROJECT_DOC_SECTIONS.filter(
    (sec) =>
      sec.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      sec.content.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div id="project-docs-view" className="w-full space-y-6">
      {/* Header Banner */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-semibold mb-2">
              <BookOpen className="w-3.5 h-3.5" />
              Academic Mini Project Report
            </div>
            <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
              College Project Documentation
            </h2>
            <p className="text-sm text-slate-500 mt-1">
              Comprehensive 21-section project report structured for BCA, B.Sc (IT), and B.Tech CSE curricula.
            </p>
          </div>

          {/* Search Bar */}
          <div className="relative min-w-[240px]">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search sections..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"
            />
          </div>
        </div>
      </div>

      {/* Sections List */}
      <div className="space-y-4">
        {filteredSections.map((sec) => {
          const isCollapsed = collapsedSections[sec.id];
          return (
            <div
              key={sec.id}
              id={`doc-section-${sec.number}`}
              className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm transition-all duration-150"
            >
              <div
                onClick={() => toggleSection(sec.id)}
                className="w-full flex items-center justify-between px-5 py-4 cursor-pointer hover:bg-slate-50/70 border-b border-transparent transition-colors"
              >
                <div className="flex items-center gap-3">
                  <span className="flex items-center justify-center w-7 h-7 rounded-lg bg-blue-100 text-blue-700 font-bold text-xs">
                    {sec.number}
                  </span>
                  <h3 className="font-bold text-slate-800 text-base">
                    {sec.title}
                  </h3>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleCopySection(sec.id, `${sec.number}. ${sec.title}\n\n${sec.content}`);
                    }}
                    title="Copy section text"
                    className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100"
                  >
                    {copiedId === sec.id ? (
                      <Check className="w-4 h-4 text-emerald-600" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </button>
                  <button className="p-1 text-slate-400">
                    {isCollapsed ? (
                      <ChevronDown className="w-4 h-4" />
                    ) : (
                      <ChevronUp className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>

              {!isCollapsed && (
                <div className="px-5 pb-5 pt-2 text-slate-600 text-sm leading-relaxed whitespace-pre-line border-t border-slate-100 bg-slate-50/30">
                  {sec.content}
                </div>
              )}
            </div>
          );
        })}

        {filteredSections.length === 0 && (
          <div className="text-center py-12 bg-white rounded-xl border border-slate-200 text-slate-400">
            No documentation sections match "{searchTerm}".
          </div>
        )}
      </div>
    </div>
  );
};
