import React, { useState } from 'react';
import { Code, Copy, Check, Download, FileText, ExternalLink } from 'lucide-react';

export const SourceCodeView: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'html' | 'css' | 'js' | 'readme'>('js');
  const [copied, setCopied] = useState(false);

  const fileInfo = {
    html: {
      name: 'index.html',
      language: 'html',
      path: '/standalone/index.html',
    },
    css: {
      name: 'style.css',
      language: 'css',
      path: '/standalone/style.css',
    },
    js: {
      name: 'script.js',
      language: 'javascript',
      path: '/standalone/script.js',
    },
    readme: {
      name: 'README.md',
      language: 'markdown',
      path: '/README.md',
    },
  };

  const currentFile = fileInfo[activeTab];

  const handleCopyCode = async () => {
    try {
      const response = await fetch(currentFile.path);
      const text = await response.text();
      navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = currentFile.path;
    link.download = currentFile.name;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div id="source-code-view" className="w-full space-y-6">
      {/* Banner */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 border border-slate-200 text-slate-700 text-xs font-semibold mb-2">
            <Code className="w-3.5 h-3.5" />
            Standalone Vanilla Mini-Project Files
          </div>
          <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
            Student Submission Package
          </h2>
          <p className="text-sm text-slate-500 mt-1">
            Pure Vanilla JavaScript, HTML5, CSS3, and Academic README without any build dependencies.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <a
            href="/standalone/index.html"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold bg-blue-50 text-blue-700 hover:bg-blue-100 border border-blue-200 transition-colors"
          >
            <span>Open Standalone Game</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>

      {/* Code Container */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-md">
        {/* Tab Header */}
        <div className="flex flex-wrap items-center justify-between px-4 py-3 bg-slate-950/80 border-b border-slate-800 gap-3">
          <div className="flex items-center gap-1.5">
            {(['html', 'css', 'js', 'readme'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  activeTab === tab
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                }`}
              >
                {fileInfo[tab].name}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopyCode}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white transition-colors"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied File!' : 'Copy Code'}</span>
            </button>

            <button
              onClick={handleDownload}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white transition-colors"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download</span>
            </button>
          </div>
        </div>

        {/* Info Line */}
        <div className="px-5 py-2.5 bg-slate-950/40 border-b border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
          <span>File: <code className="text-blue-400 font-mono">{currentFile.name}</code></span>
          <span>Target: College Project Submission Package</span>
        </div>

        {/* Code Frame */}
        <div className="p-5 text-xs font-mono text-slate-300 leading-relaxed overflow-x-auto max-h-[500px]">
          {activeTab === 'js' && (
            <pre className="text-emerald-300">
{`/**
 * SMARTPLAY – AI-BASED TIC-TAC-TOE GAME
 * Core Functions for BCA Mini-Project
 */

// 1. checkWinner(board)
// Checks if either player has won; returns { winner, line }
function checkWinner(board) { ... }

// 2. isDraw(board)
// Checks if all 9 cells are filled and no winner exists
function isDraw(board) { ... }

// 3. getAvailableMoves(board)
// Collects indices of all empty (null) cells
function getAvailableMoves(board) { ... }

// 4. minimax(board, depth, isMaximizing, telemetry)
// Recursively evaluates game tree: AI=+10-depth, Human=depth-10, Draw=0
function minimax(board, depth, isMaximizing, telemetry) { ... }

// 5. getBestMove(board)
// Returns the move index with the highest Minimax evaluation score
function getBestMove(board) { ... }

// 6. makeAIMove()
// Executes AI turn after 350ms natural interactive pause
function makeAIMove() { ... }

// 7. resetGame()
// Clears board and restores fresh match state
function resetGame() { ... }`}
            </pre>
          )}

          {activeTab === 'html' && (
            <pre className="text-amber-300">
{`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>SMARTPLAY – AI-Based Tic-Tac-Toe Game</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <div class="app-container">
    <header class="header">
      <h1>SMARTPLAY</h1>
      <p>AI-Based Tic-Tac-Toe</p>
    </header>
    ...
    <div class="board" id="board">
      <!-- 9 Interactive Cells -->
    </div>
    ...
  </div>
  <script src="script.js"></script>
</body>
</html>`}
            </pre>
          )}

          {activeTab === 'css' && (
            <pre className="text-sky-300">
{`/* SMARTPLAY – Responsive College Project Styles */
:root {
  --primary: #2563eb;
  --color-x: #2563eb;
  --color-o: #dc2626;
}

.board {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
}

.cell {
  background: #ffffff;
  font-size: 54px;
  font-weight: 800;
  cursor: pointer;
}
...`}
            </pre>
          )}

          {activeTab === 'readme' && (
            <pre className="text-purple-300">
{`# SMARTPLAY – AI-BASED TIC-TAC-TOE GAME
Comprehensive 21-Section College Project Report

1. Project Title
2. Abstract
3. Introduction
4. Problem Statement
...
21. Conclusion`}
            </pre>
          )}
        </div>
      </div>
    </div>
  );
};
