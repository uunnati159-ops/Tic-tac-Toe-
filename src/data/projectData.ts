export interface DocSection {
  id: string;
  number: number;
  title: string;
  content: string;
  subsections?: { title: string; text: string }[];
}

export interface ConceptItem {
  id: string;
  question: string;
  shortAnswer: string;
  detailedAnswer: string;
  keyTakeaway: string;
}

export interface VivaItem {
  id: number;
  question: string;
  answer: string;
  bcaTip: string;
}

export const PROJECT_DOC_SECTIONS: DocSection[] = [
  {
    id: 'project-title',
    number: 1,
    title: 'Project Title',
    content: 'SMARTPLAY – AI-BASED TIC-TAC-TOE GAME: An Autonomous Adversarial Search Web Application Powered by the Minimax Algorithm for College-Level Academic Curriculum.'
  },
  {
    id: 'abstract',
    number: 2,
    title: 'Abstract',
    content: 'The SMARTPLAY mini-project demonstrates the practical application of Classical Artificial Intelligence and Game Theory principles without reliance on external cloud APIs or machine learning weights. Developed as a responsive, client-side web application using pure HTML, CSS, and modern JavaScript, SMARTPLAY pits a human player (playing as \'X\') against an autonomous AI agent (playing as \'O\'). The AI leverages the deterministic Minimax search algorithm to explore the game tree down to terminal states (win, loss, draw) and select strictly optimal moves. Through comprehensive state evaluation, dynamic DOM manipulation, and real-time decision telemetry, SMARTPLAY offers an accessible, educational demonstration of adversarial search, depth-bounded evaluation, and zero-sum game mechanics suitable for Bachelor of Computer Applications (BCA) and B.Tech/B.Sc. Computer Science syllabi.'
  },
  {
    id: 'introduction',
    number: 3,
    title: 'Introduction',
    content: 'Artificial Intelligence (AI) can be categorized into symbolic/heuristic-based systems and modern statistical/deep learning models. In classic AI coursework, game playing represents one of the earliest and most robust domains for studying autonomous decision-making. Games like Tic-Tac-Toe are two-player, zero-sum games with perfect information—meaning all players have complete knowledge of the current board state and no hidden elements exist. SMARTPLAY translates textbook game theory into an interactive software tool, allowing students and evaluators to test, visualize, and analyze how an algorithmic agent systematically prevents defeats and capitalizes on opponent errors.'
  },
  {
    id: 'problem-statement',
    number: 4,
    title: 'Problem Statement',
    content: 'Traditional beginner implementations of digital board games rely on randomized computer moves or rigid hardcoded if-else conditionals. Such simplistic models fail to emulate strategic intelligence, leading to predictable blunders and lacking educational value. Conversely, modern generative AI and LLM APIs introduce network latency, API costs, non-deterministic outputs, and external dependencies inappropriate for fundamental computer science fundamentals. The challenge is to construct an offline, self-contained, and deterministic AI engine that computes optimal counter-moves in real time while maintaining high code readability for academic demonstration.'
  },
  {
    id: 'aim',
    number: 5,
    title: 'Aim',
    content: 'To design, develop, and evaluate a standalone web-based Tic-Tac-Toe application featuring an unbeatable AI opponent driven by the recursive Minimax decision algorithm, accompanied by a clean user interface and comprehensive academic documentation.'
  },
  {
    id: 'objectives',
    number: 6,
    title: 'Objectives',
    content: 'The primary objectives of the SMARTPLAY project include:\n\n1. Build an interactive, responsive 3x3 game board supporting seamless touch and mouse interactions across mobile and desktop devices.\n2. Implement a complete Minimax search algorithm in JavaScript to recursively evaluate future game states without external libraries.\n3. Enforce strict game rules: prevention of duplicate cell selection, automatic turn alternate, and locking input upon terminal states.\n4. Design a dynamic status notification system communicating active player turns, AI computing status, wins, and draws.\n5. Maintain session-based score metrics tracking human victories, AI victories, and ties.\n6. Provide transparent telemetry metrics displaying the number of nodes/states inspected by Minimax on each turn.'
  },
  {
    id: 'existing-system',
    number: 7,
    title: 'Existing System',
    content: 'In standard college lab exercises, computer opponents in board games are often implemented using:\n- Math.random() selectors that randomly choose any vacant cell without situational awareness.\n- Hardcoded rules (e.g., "if center is free take center, else take corner"), which easily break when facing non-standard opening patterns.\n- External AI service calls that require internet connectivity and billing credentials.\n\nDisadvantages of Existing Systems:\n- Zero foresight: The computer cannot anticipate the human player’s next turn.\n- Poor academic rigor: Does not demonstrate tree traversal, recursion, or adversarial heuristics.\n- Vulnerability to simple player traps.'
  },
  {
    id: 'proposed-system',
    number: 8,
    title: 'Proposed System',
    content: 'SMARTPLAY introduces an autonomous, client-executed game solver based on the Minimax decision rule. The proposed system features:\n- Exhaustive game-tree exploration: The AI explores all legal moves, projecting subsequent human responses until terminal leaves are reached.\n- Backtracking score propagation: Scores are backpropagated through min/max layers to identify the move with the highest guaranteed outcome.\n- Zero dependencies: Runs directly in the browser via standard DOM APIs, ensuring 100% offline functionality and zero hosting complexity.\n- Modular JavaScript architecture: Cleanly separated functions (checkWinner, isDraw, getAvailableMoves, minimax, getBestMove, makeAIMove, resetGame) with descriptive comments for student viva preparation.'
  },
  {
    id: 'scope',
    number: 9,
    title: 'Scope',
    content: 'The scope of SMARTPLAY covers 2-player perfect-information zero-sum games. It serves as:\n- An academic prototype for BCA, B.Sc (IT), and B.Tech Computer Science mini-projects.\n- A visual demonstration tool for college classrooms teaching Graph Search, State Space Trees, and Game Playing in AI.\n- A foundational architecture extensible to Connect Four, Checkers, and Alpha-Beta pruning extensions.'
  },
  {
    id: 'technologies-used',
    number: 10,
    title: 'Technologies Used',
    content: 'Frontend Presentation: HTML5 (Semantic elements, Grid layout, accessible ARIA attributes)\nStyling & Responsiveness: CSS3 (CSS Grid, Flexbox, CSS Variables, smooth transition keyframes)\nCore AI Engine & Logic: Vanilla JavaScript (ES6+, recursive data traversal, closures, DOM manipulation)\nBuild & Development Server: Vite & Node.js for high-speed local serving and modern packaging\nNo external AI APIs, databases, or third-party web services are required.'
  },
  {
    id: 'ai-concepts-used',
    number: 11,
    title: 'AI Concepts Used',
    content: '1. State Space Representation: The 3x3 board is modeled as a 9-element discrete vector representing spatial configurations.\n2. Adversarial Search: Decision-making in an environment where an opponent actively works against the agent\'s goal.\n3. Zero-Sum Game Theory: An outcome where the agent’s gain equals the opponent’s loss (Win = +10, Loss = -10, Draw = 0).\n4. Game Tree Traversal: Depth-first recursive expansion of candidate moves from the root node to terminal leaf nodes.\n5. Backtracking: Restoring simulated board cells to empty states after sub-tree evaluation to preserve memory.'
  },
  {
    id: 'minimax-algorithm',
    number: 12,
    title: 'Minimax Algorithm',
    content: 'The Minimax algorithm is a decision-making formula used in two-player games. The AI acts as the Maximizer (seeking to maximize the heuristic payoff), while the human acts as the Minimizer (seeking to minimize the AI’s payoff).\n\nMathematical Formulation:\n- If state is terminal, return Value(state)\n- If Player = Maximizer: max_{m in Moves} Minimax(Result(state, m), depth + 1, Minimizer)\n- If Player = Minimizer: min_{m in Moves} Minimax(Result(state, m), depth + 1, Maximizer)\n\nIn SMARTPLAY, terminal states are rewarded or penalized with a depth discount (e.g., Score = +10 - depth for AI win), ensuring the AI favors quicker victories over protracted stalemates.'
  },
  {
    id: 'system-requirements',
    number: 13,
    title: 'System Requirements',
    content: 'Hardware Requirements:\n- Processor: Intel Core i3 / AMD Ryzen 3 or higher\n- RAM: 2 GB minimum (4 GB recommended)\n- Storage: Less than 10 MB disk space\n- Display: 720p or higher resolution (responsive on mobile screens from 320px)\n\nSoftware Requirements:\n- Operating System: Windows 10/11, macOS, Linux, Android, or iOS\n- Web Browser: Google Chrome 90+, Mozilla Firefox, Safari, or Microsoft Edge\n- Runtime: Standard browser JavaScript engine (V8, SpiderMonkey, JavaScriptCore)'
  },
  {
    id: 'modules',
    number: 14,
    title: 'Modules',
    content: 'The SMARTPLAY architecture is organized into four cohesive functional modules:\n\n1. Board State Module: Maintains the 9-cell array, manages symbol assignments (\'X\', \'O\', null), and handles board initialization.\n2. Referee & Victory Detection Module: Contains checkWinner() and isDraw(), evaluating the 8 winning combinations (3 rows, 3 columns, 2 diagonals).\n3. Minimax AI Search Module: Implements getAvailableMoves(), minimax(), and getBestMove(), performing recursive state evaluations.\n4. Presentation & Interaction Module: Handles DOM events, updates the scoreboard, animates winning triplets, and provides real-time telemetry.'
  },
  {
    id: 'system-architecture',
    number: 15,
    title: 'System Architecture',
    content: 'The system follows an Event-Driven Model-View-Controller (MVC) architectural pattern:\n\n[User Interaction (Click)] \n       │\n       ▼\n[Event Controller (handleCellClick)] \n       │\n       ├──► [Board State Model] (Updates Cell X) \n       │          │\n       │          ▼\n       ├──► [Referee Engine] (checkWinner / isDraw)\n       │          │\n       │     [If Not Over]\n       │          ▼\n       ├──► [Minimax Engine] (Recursive Tree Search)\n       │          │\n       │          ▼\n       │    [Selects Best Move O]\n       │          │\n       └──► [DOM View Renderer] (Updates Board, Status Banner, Scoreboard, Telemetry)'
  },
  {
    id: 'working-methodology',
    number: 16,
    title: 'Working Methodology',
    content: '1. Initialization: The board initializes as an empty 9-cell array. Scoreboard is readied, and status indicates "Your Turn".\n2. Human Move: The player clicks an unoccupied cell. The system assigns \'X\', re-renders the cell, and disables further clicks on that tile.\n3. Win Check: If \'X\' completes 3 in a row, the game declares "You Win!", increments the player score, highlights winning cells, and stops.\n4. AI Hand-off: If the game continues, status switches to "AI is Thinking...". The system invokes getBestMove(board).\n5. Tree Evaluation: Minimax generates all available moves, recursively explores every counter-move down to terminal depth, and identifies the move maximizing AI payoff.\n6. Execution: The AI places \'O\' on the chosen cell after a natural 350ms delay for visual feedback.\n7. Repeat or Terminal: If \'O\' wins or a draw occurs, the respective score counter increments and board input freezes.'
  },
  {
    id: 'algorithm',
    number: 17,
    title: 'Algorithm',
    content: 'Step 1: Start game and initialize board[0..8] = null.\nStep 2: Await player click on cell index k.\nStep 3: If board[k] != null or game is over, ignore click.\nStep 4: Set board[k] = \'X\'. Update DOM.\nStep 5: Call checkWinner(board). If winner == \'X\', display "You Win!", highlight line, update score, and goto Step 14.\nStep 6: Call isDraw(board). If true, display "It\'s a Draw!", update score, and goto Step 14.\nStep 7: Display status "AI is Thinking...".\nStep 8: Call getBestMove(board).\nStep 9: Inside getBestMove, for each available move m in board:\n        a. Set board[m] = \'O\'.\n        b. Compute score = minimax(board, depth=0, isMaximizing=false).\n        c. Reset board[m] = null.\n        d. Retain move with maximum score.\nStep 10: Set board[bestMove] = \'O\'. Update DOM.\nStep 11: Call checkWinner(board). If winner == \'O\', display "AI Wins!", highlight line, update score, and goto Step 14.\nStep 12: Call isDraw(board). If true, display "It\'s a Draw!", update score, and goto Step 14.\nStep 13: Display status "Your Turn" and return to Step 2.\nStep 14: Await user clicking "New Game" button to reset.'
  },
  {
    id: 'advantages',
    number: 18,
    title: 'Advantages',
    content: '1. Mathematically Unbeatable: Because Tic-Tac-Toe has only 255,168 possible game states, Minimax explores the entire state space and never makes a strategic error.\n2. Completely Autonomous & Zero Cost: Operates entirely client-side without cloud APIs, monthly bills, or rate limits.\n3. High Performance: State evaluations complete in single-digit milliseconds on any modern mobile or desktop processor.\n4. Academic Transparency: Clean, descriptive function names and direct metrics display allow students and professors to observe AI decisions in real time.\n5. Zero Installation: Runs in any standard web browser without compiling or configuring complex runtime environments.'
  },
  {
    id: 'limitations',
    number: 19,
    title: 'Limitations',
    content: '1. Exponential Search Complexity: While feasible for Tic-Tac-Toe (9 cells), unpruned Minimax suffers from combinatorial explosion in complex games like Chess (branching factor ~35) or Go (branching factor ~250).\n2. Deterministic Predictability: An optimal Minimax AI always chooses the identical response to identical player moves, leading to predictable draws against an experienced human player.\n3. Zero Learning: The AI does not learn from previous games; every move is recomputed dynamically from the current state tree without memory caching.'
  },
  {
    id: 'future-enhancements',
    number: 20,
    title: 'Future Enhancements',
    content: '1. Alpha-Beta Pruning: Implementing alpha-beta cutoff bounds to eliminate branches that cannot influence the final decision, reducing node evaluations by up to 70%.\n2. Difficulty Selector: Adding "Easy" (Random), "Medium" (Depth-bounded Minimax with deliberate blunder chance), and "Impossible" (Full Minimax) modes.\n3. Reinforcement Learning (Q-Learning): Implementing a Q-table or neural network that learns optimal policies through self-play over thousands of simulated rounds.\n4. Scaled Grids: Expanding the engine to 4x4 or 5x5 boards with Connect-K victory rules using heuristic evaluation functions.'
  },
  {
    id: 'conclusion',
    number: 21,
    title: 'Conclusion',
    content: 'The SMARTPLAY mini-project successfully demonstrates that foundational Artificial Intelligence algorithms can deliver flawless game-playing agency without reliance on heavy neural networks or proprietary APIs. By implementing the Minimax adversarial search algorithm in clean, modular JavaScript with a responsive HTML5/CSS3 user interface, the project satisfies all pedagogical requirements for college-level computer application coursework. Evaluators can directly observe tree exploration, terminal state evaluation, and optimal decision making in an engaging, interactive format.'
  }
];

export const AI_CONCEPTS: ConceptItem[] = [
  {
    id: 'c1',
    question: 'What is Artificial Intelligence?',
    shortAnswer: 'The simulation of human intelligence processes by computer algorithms, enabling systems to perceive, reason, and make optimal decisions.',
    detailedAnswer: 'Artificial Intelligence (AI) is a subfield of Computer Science dedicated to creating machines capable of performing tasks that typically require human cognitive faculties—such as visual perception, decision-making, problem-solving, and game playing. In SMARTPLAY, we employ Classical Symbolic AI (search algorithms and logic) rather than machine learning, allowing the computer to logically deduce the optimal move through systematic reasoning.',
    keyTakeaway: 'AI is not limited to neural networks; deterministic algorithms like Minimax represent foundational rule-based AI.'
  },
  {
    id: 'c2',
    question: 'What is a game-playing AI?',
    shortAnswer: 'An autonomous software agent designed to play formal games by evaluating rules, board states, and future opponent moves.',
    detailedAnswer: 'A game-playing AI is an autonomous agent programmed to participate in formal games (like Chess, Checkers, or Tic-Tac-Toe). It perceives the current game board, generates legal candidate moves, simulates anticipated human reactions, and selects the move that optimizes its chances of winning while avoiding defeat.',
    keyTakeaway: 'Games provide a structured, rule-governed laboratory for testing intelligent search algorithms.'
  },
  {
    id: 'c3',
    question: 'What is a game state?',
    shortAnswer: 'A snapshot of the complete configuration of the game at a specific moment in time.',
    detailedAnswer: 'In Tic-Tac-Toe, a game state is the exact spatial arrangement of \'X\', \'O\', and empty cells across the 9 grid positions. The state also encompasses meta-information, such as whose turn it is to move and whether a winning condition has been fulfilled.',
    keyTakeaway: 'In SMARTPLAY, the game state is stored simply and cleanly as an array of 9 values: [null, "X", null, "O", ...].'
  },
  {
    id: 'c4',
    question: 'What is a search algorithm?',
    shortAnswer: 'A computational procedure that systematically navigates through a graph or tree of possible states to reach a desired goal state.',
    detailedAnswer: 'A search algorithm explores a problem\'s "state space"—the collection of all states that can be reached by legal actions. In game playing, a search algorithm expands branches representing future moves, examining potential futures until it reaches game-ending conditions (goals). Minimax is an adversarial search algorithm designed specifically for two-player competitions.',
    keyTakeaway: 'Search algorithms allow the computer to look ahead into the future before making a physical move.'
  },
  {
    id: 'c5',
    question: 'What is Minimax?',
    shortAnswer: 'A recursive decision rule used in two-player zero-sum games to minimize the maximum possible loss (minimize the maximum payoff of the opponent).',
    detailedAnswer: 'Minimax is an adversarial search technique formulated by John von Neumann. It assumes both players will play rationally and make their best possible moves. The algorithm traverses the game tree recursively: at AI nodes, it selects the child with the highest score (Maximizing), and at human nodes, it assumes the human will choose the child with the lowest score for the AI (Minimizing).',
    keyTakeaway: 'Minimax guarantees that against an optimal opponent, the AI will never lose in Tic-Tac-Toe.'
  },
  {
    id: 'c6',
    question: 'What is a maximizing player?',
    shortAnswer: 'The player whose objective is to achieve the highest possible evaluation score (in our game, the AI playing as \'O\').',
    detailedAnswer: 'In Minimax formulation, the Maximizing Player seeks states with the largest mathematical score. For SMARTPLAY, the AI (\'O\') is the maximizer. An AI victory is rewarded with a high positive score (+10). Whenever the algorithm simulates the AI’s turn, it computes Math.max() across all branch options.',
    keyTakeaway: 'Maximizing = Picking the best outcome for the AI.'
  },
  {
    id: 'c7',
    question: 'What is a minimizing player?',
    shortAnswer: 'The player whose objective is to minimize the AI’s evaluation score (in our game, the Human playing as \'X\').',
    detailedAnswer: 'The Minimizing Player is the adversary. The algorithm must prudently assume that the human player is clever and will make moves that damage the AI’s position. A human win is assigned a negative score (-10). When simulating the human’s turn, the algorithm computes Math.min() across all possible options.',
    keyTakeaway: 'Minimizing = Assuming the opponent will make the best possible counter-attack.'
  },
  {
    id: 'c8',
    question: 'How does the AI choose a move?',
    shortAnswer: 'By simulating every currently legal move, recursively running Minimax on the results, and selecting the move with the highest final score.',
    detailedAnswer: 'When it is the AI\'s turn, the function getBestMove() identifies all empty cells. For each empty cell, it temporarily places \'O\', triggers minimax() to compute the resulting score, and then backtracks (cleans up the board). The cell index yielding the highest score is chosen and committed to the live game board.',
    keyTakeaway: 'The AI never guesses; it calculates the exact mathematical consequence of each move.'
  },
  {
    id: 'c9',
    question: 'Why does the AI need to consider the opponent\'s moves?',
    shortAnswer: 'Because game playing is adversarial: an apparently great move can lead to instant defeat if the opponent has an unstoppable counter-strike.',
    detailedAnswer: 'If an algorithm only looked at its own goals (greedy search), it might place a symbol to set up an attack while failing to notice that the human can win on the very next turn. By simulating alternating turns (AI -> Human -> AI -> Human), Minimax inherently discovers opponent threats and prioritizes blocking them.',
    keyTakeaway: 'Considering the opponent’s perspective is what distinguishes intelligent AI from naive automated scripts.'
  },
  {
    id: 'c10',
    question: 'What are terminal states?',
    shortAnswer: 'End-of-game board configurations where no further moves are possible because a player won or all cells are filled (draw).',
    detailedAnswer: 'In recursive algorithms, every recursive function requires base cases (stopping conditions) to avoid infinite loops. In Minimax, terminal states are board states where checkWinner() detects 3 in a row or isDraw() detects a full board. When a terminal state is hit, recursion stops and a numeric score is returned directly.',
    keyTakeaway: 'Terminal states act as the base cases in the Minimax recursive call tree.'
  },
  {
    id: 'c11',
    question: 'How is a win, loss, and draw evaluated?',
    shortAnswer: 'AI Win = +10 (adjusted for depth), Human Win = -10 (adjusted for depth), Draw = 0.',
    detailedAnswer: 'Terminal evaluation applies numeric values:\n- AI Win (\'O\'): +10 - depth. Subtracting depth rewards the AI for winning in fewer turns.\n- Human Win (\'X\'): depth - 10. Adding depth penalizes the AI less if it can successfully prolong the game and delay defeat.\n- Draw: 0. A neutral score indicating neither player succeeded in achieving 3-in-a-row.',
    keyTakeaway: 'Depth discounting (+10 - depth) motivates the AI to pick immediate wins rather than delayed ones.'
  }
];

export const VIVA_QUESTIONS: VivaItem[] = [
  {
    id: 1,
    question: 'What is the main objective of this project?',
    answer: 'The main objective is to design and develop a fully functional, browser-based Tic-Tac-Toe game where a human player competes against an unbeatable AI opponent powered by the classical Minimax algorithm, without requiring external APIs or databases.',
    bcaTip: 'Highlight that this project proves fundamental AI principles using client-side JavaScript.'
  },
  {
    id: 2,
    question: 'What is Tic-Tac-Toe from an AI classification standpoint?',
    answer: 'In AI terms, Tic-Tac-Toe is a two-player, zero-sum, deterministic game of perfect information with a finite, discrete state space consisting of 3x3 = 9 cells.',
    bcaTip: 'Key terminology: "Zero-sum", "Deterministic", "Perfect information".'
  },
  {
    id: 3,
    question: 'What is Artificial Intelligence in the context of this project?',
    answer: 'In this project, Artificial Intelligence refers to symbolic/algorithmic search where the machine makes autonomous, rational decisions by simulating future states, evaluating risks, and choosing the optimal action based on mathematical logic.',
    bcaTip: 'Distinguish between symbolic search-based AI (like Minimax) and statistical learning AI (like Machine Learning).'
  },
  {
    id: 4,
    question: 'What is the Minimax algorithm?',
    answer: 'Minimax is a recursive backtracking search algorithm used in decision theory and game theory. It determines the optimal move for a player assuming that the opponent is also playing optimally.',
    bcaTip: 'Mention that it alternates between maximizing the AI’s advantage and minimizing the opponent’s advantage.'
  },
  {
    id: 5,
    question: 'Why is Minimax chosen for Tic-Tac-Toe instead of other algorithms?',
    answer: 'Because Tic-Tac-Toe has a small state space (maximum 9! = 362,880 permutations, and only 255,168 reachable game states), Minimax can explore the full game tree in milliseconds. It provides a mathematically proven, optimal strategy with zero training data required.',
    bcaTip: 'Emphasize that the game tree is small enough to search completely without running out of memory.'
  },
  {
    id: 6,
    question: 'How does the AI select its move during gameplay?',
    answer: 'The function getBestMove() iterates through every empty cell, places a temporary \'O\', calls minimax() recursively to compute the final score of that branch, undoes the move (backtracks), and then selects the cell index that yielded the maximum score.',
    bcaTip: 'Explain the concept of "simulating and backtracking" so the evaluator sees you understand the code.'
  },
  {
    id: 7,
    question: 'What is a game state and how is it represented in code?',
    answer: 'A game state represents the current configuration of the 9 cells. In our code, it is represented as a 1-dimensional array of 9 elements containing \'X\', \'O\', or null. Indices 0-2 represent row 1, 3-5 represent row 2, and 6-8 represent row 3.',
    bcaTip: 'Draw or explain the 1D to 2D mapping: row = Math.floor(index / 3), col = index % 3.'
  },
  {
    id: 8,
    question: 'What is a terminal state in the game tree?',
    answer: 'A terminal state is a leaf node in the search tree where the game concludes. There are three terminal possibilities: Player X wins (3-in-a-row), AI O wins (3-in-a-row), or a full board draw occurs.',
    bcaTip: 'Point out that terminal states serve as the base cases to stop recursive execution.'
  },
  {
    id: 9,
    question: 'What happens when the board is full and no one has won?',
    answer: 'The isDraw() function evaluates that all 9 cells are not null and checkWinner() returns null. The game terminates with a Draw state, returns an evaluation score of 0, updates the draw scoreboard, and halts user clicks.',
    bcaTip: 'Explain that neither player reached +10 or -10, so the game outcome is neutral.'
  },
  {
    id: 10,
    question: 'What is the role of recursion in the Minimax implementation?',
    answer: 'Recursion allows the algorithm to drill down depth-first through successive layers of turns (plies). At each level, the function calls itself with toggled turns (isMaximizing = !isMaximizing) and incremented depth until a terminal leaf is reached.',
    bcaTip: 'Mention call stack and how values are returned back up from leaves to the root.'
  },
  {
    id: 11,
    question: 'What is the difference between human moves and AI moves in the code?',
    answer: 'Human moves are event-driven: triggered by user click events after input validation. AI moves are algorithmic: triggered programmatically after the human turn by calling getBestMove() which runs Minimax and updates the DOM.',
    bcaTip: 'Point out the validation guards (preventing clicks on occupied cells or after game over).'
  },
  {
    id: 12,
    question: 'What are the technical limitations of this project?',
    answer: 'The primary limitation is scalability: pure Minimax has a time complexity of O(b^d), where b is branching factor and d is depth. While 3x3 Tic-Tac-Toe has a maximum depth of 9, games like Chess or 5x5 boards would freeze the browser without Alpha-Beta pruning or depth limits.',
    bcaTip: 'Explaining time complexity O(b^d) shows strong computer science fundamentals.'
  },
  {
    id: 13,
    question: 'Can this project be extended to other two-player games?',
    answer: 'Yes. The Minimax core is generic. By replacing the 3x3 board representation and winning logic, the exact same architecture can power Connect Four, Gomoku, Checkers, or Othello (Reversi).',
    bcaTip: 'Highlight that the decision rule is modular and decoupled from the board rendering.'
  },
  {
    id: 14,
    question: 'Why does this project not require an external API or cloud database?',
    answer: 'Because Tic-Tac-Toe logic and Minimax search are computationally lightweight enough to run entirely in the client\'s web browser engine within milliseconds. Running offline guarantees instant responsiveness, privacy, and zero server hosting expenses.',
    bcaTip: 'Evaluators love offline self-contained architectures for mini-projects.'
  },
  {
    id: 15,
    question: 'How can Machine Learning or modern AI be added in future versions?',
    answer: 'Future enhancements can replace exhaustive search with Reinforcement Learning (Q-Learning), where an agent learns through reward feedback over 50,000 simulated self-play games, storing optimal policy weights in a local JSON Q-table.',
    bcaTip: 'Mention Reinforcement Learning, Q-tables, and neural policy value networks (like AlphaZero).'
  }
];
