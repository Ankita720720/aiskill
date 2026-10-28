export interface DocItem {
  id: string;
  name: string;
  category: 'frontend' | 'backend' | 'database' | 'devops' | 'ai';
  categoryLabel: string;
  badge: string;
  url: string;
  description: string;
  keyTopics: string[];
  icon: string;
}

export interface CheatSheetItem {
  id: string;
  title: string;
  category: 'git' | 'sql' | 'css' | 'js' | 'http' | 'terminal';
  categoryLabel: string;
  description: string;
  snippets: {
    label: string;
    code: string;
    explanation: string;
  }[];
}

export interface RoadmapMilestone {
  title: string;
  duration: string;
  skills: string[];
  description: string;
}

export interface CareerRoadmapItem {
  id: string;
  role: string;
  badge: string;
  overview: string;
  estimatedMonths: string;
  milestones: RoadmapMilestone[];
}

export interface FreeBookItem {
  id: string;
  title: string;
  author: string;
  tag: string;
  type: 'Book' | 'Course Series' | 'Interactive Platform';
  description: string;
  url: string;
  highlights: string[];
}

export const officialDocsCatalog: DocItem[] = [
  {
    id: 'react',
    name: 'React 19 Official Documentation',
    category: 'frontend',
    categoryLabel: 'Frontend',
    badge: 'VITAL',
    url: 'https://react.dev',
    description: 'The official documentation for modern React. Covers hooks, components, state management, concurrent rendering, and server components.',
    keyTopics: ['Hooks (useState, useEffect, useMemo)', 'Component Architecture', 'Server Actions', 'Optimistic UI Updates'],
    icon: '⚛️',
  },
  {
    id: 'mdn',
    name: 'MDN Web Docs (Mozilla)',
    category: 'frontend',
    categoryLabel: 'Web Standards',
    badge: 'FOUNDATION',
    url: 'https://developer.mozilla.org',
    description: 'The definitive reference for HTML5, CSS3, JavaScript APIs, Web Standards, accessibility (ARIA), and browser compatibility tables.',
    keyTopics: ['HTML5 Semantic Elements', 'CSS Grid & Flexbox', 'JavaScript DOM APIs', 'Web Performance'],
    icon: '🌐',
  },
  {
    id: 'nextjs',
    name: 'Next.js App Router Documentation',
    category: 'frontend',
    categoryLabel: 'Full Stack Framework',
    badge: 'POPULAR',
    url: 'https://nextjs.org/docs',
    description: 'Comprehensive guide to building production full-stack web applications with React Server Components, nested routing, and edge deployment.',
    keyTopics: ['App Router Layouts', 'Server & Client Components', 'Route Handlers (API)', 'Static Generation & ISR'],
    icon: '▲',
  },
  {
    id: 'nodejs',
    name: 'Node.js Runtime Documentation',
    category: 'backend',
    categoryLabel: 'Backend Runtime',
    badge: 'CORE',
    url: 'https://nodejs.org/docs/latest/api/',
    description: 'Official API documentation detailing Node.js event-driven architecture, file systems, asynchronous streams, buffer handling, and clusters.',
    keyTopics: ['Event Loop & Microtasks', 'Async I/O & Streams', 'Express & HTTP Modules', 'Process Management'],
    icon: '🟢',
  },
  {
    id: 'python',
    name: 'Python 3 Standard Library Documentation',
    category: 'backend',
    categoryLabel: 'Programming',
    badge: 'VERSATILE',
    url: 'https://docs.python.org/3/',
    description: 'Official Python reference manual. Explains language syntax, standard library modules, object-oriented concepts, and concurrency with asyncio.',
    keyTopics: ['Data Structures & Typing', 'File I/O & Context Managers', 'Asyncio Concurrency', 'Itertools & Generators'],
    icon: '🐍',
  },
  {
    id: 'postgres',
    name: 'PostgreSQL Manual & SQL Reference',
    category: 'database',
    categoryLabel: 'Database',
    badge: 'ENTERPRISE',
    url: 'https://www.postgresql.org/docs/',
    description: 'Complete documentation for the world\'s most advanced open-source relational database. Covers indexing, transaction isolation, CTEs, and JSONB.',
    keyTopics: ['Complex Joins & Aggregations', 'B-Tree & GIN Indexes', 'Transactions & ACID Locks', 'Window Functions'],
    icon: '🐘',
  },
  {
    id: 'typescript',
    name: 'TypeScript Handbook',
    category: 'frontend',
    categoryLabel: 'Language',
    badge: 'INDUSTRY STANDARD',
    url: 'https://www.typescriptlang.org/docs/handbook/intro.html',
    description: 'In-depth guide for typed JavaScript. Covers generics, interfaces, type narrowing, conditional types, and utility types for robust apps.',
    keyTopics: ['Generics & Constraints', 'Union & Intersection Types', 'Type Guards & Assertions', 'Declaration Files (.d.ts)'],
    icon: '📘',
  },
  {
    id: 'docker',
    name: 'Docker Official Guides & Manual',
    category: 'devops',
    categoryLabel: 'Containerization',
    badge: 'DEVOPS',
    url: 'https://docs.docker.com/',
    description: 'Learn how to containerize web applications, write multi-stage Dockerfiles, orchestrate local environments with Docker Compose, and publish images.',
    keyTopics: ['Multi-Stage Dockerfiles', 'Docker Compose YAML', 'Volume Persistence', 'Container Networking'],
    icon: '🐳',
  },
  {
    id: 'tailwind',
    name: 'Tailwind CSS Documentation',
    category: 'frontend',
    categoryLabel: 'Styling',
    badge: 'STYLING',
    url: 'https://tailwindcss.com/docs',
    description: 'Utility-first CSS framework documentation for rapidly designing responsive, beautiful modern user interfaces without leaving your HTML.',
    keyTopics: ['Flexbox & Grid Utilities', 'Responsive Variants (sm, md, lg)', 'Theme Customization', 'Arbitrary Values'],
    icon: '🎨',
  },
  {
    id: 'pytorch',
    name: 'PyTorch & Machine Learning Guides',
    category: 'ai',
    categoryLabel: 'AI & ML',
    badge: 'AI / ML',
    url: 'https://pytorch.org/docs/stable/index.html',
    description: 'Documentation for tensor computation, dynamic neural network autograd, GPU acceleration, and deploying deep learning models.',
    keyTopics: ['Tensors & Mathematical Ops', 'nn.Module Architectures', 'Optimizers & Loss Functions', 'DataLoader Pipelines'],
    icon: '🔥',
  },
];

export const interactiveCheatSheets: CheatSheetItem[] = [
  {
    id: 'git',
    title: 'Git Version Control Essentials',
    category: 'git',
    categoryLabel: 'Version Control',
    description: 'Critical daily commands for branching, stashing, resetting, and collaborating on production software repositories.',
    snippets: [
      {
        label: 'Create & Switch Branch',
        code: 'git checkout -b feature/user-authentication',
        explanation: 'Creates a new branch named feature/user-authentication and switches your working directory to it immediately.',
      },
      {
        label: 'Stash Uncommitted Changes',
        code: 'git stash push -m "WIP: auth flow"\ngit stash pop',
        explanation: 'Temporarily saves modified tracked files to work on a hotfix, then restores those changes with pop.',
      },
      {
        label: 'Visual One-Line Git Log',
        code: 'git log --oneline --graph --decorate --all -n 10',
        explanation: 'Shows an intuitive ASCII branch tree graph with abbreviated commit hashes and tags.',
      },
      {
        label: 'Undo Last Commit (Keep Files)',
        code: 'git reset --soft HEAD~1',
        explanation: 'Rolls back the latest commit while keeping all changes staged in your working directory.',
      },
      {
        label: 'Interactive Rebase & Squash',
        code: 'git rebase -i HEAD~3',
        explanation: 'Allows squashing, editing, rewording, or dropping the last 3 commits before submitting a Pull Request.',
      },
    ],
  },
  {
    id: 'sql',
    title: 'SQL & Database Queries Quick Reference',
    category: 'sql',
    categoryLabel: 'Database',
    description: 'Essential relational database queries for aggregation, complex multi-table joins, ranking, and indexing.',
    snippets: [
      {
        label: 'Filtered Group Aggregation',
        code: `SELECT department_id, COUNT(*) AS employee_count, AVG(salary) AS avg_sal\nFROM employees\nWHERE status = 'ACTIVE'\nGROUP BY department_id\nHAVING COUNT(*) >= 3\nORDER BY avg_sal DESC;`,
        explanation: 'Filters active employees, groups by department, and keeps only departments with at least 3 members.',
      },
      {
        label: 'Inner vs Left Outer Join',
        code: `SELECT u.id, u.name, COALESCE(o.total_amount, 0) AS total\nFROM users u\nLEFT JOIN orders o ON u.id = o.user_id AND o.status = 'COMPLETED';`,
        explanation: 'Returns all users regardless of whether they made orders, replacing null order amounts with 0.',
      },
      {
        label: 'Common Table Expression (CTE) & Window Ranking',
        code: `WITH ranked_scores AS (\n  SELECT student_id, score,\n         DENSE_RANK() OVER (ORDER BY score DESC) as rank\n  FROM test_submissions\n)\nSELECT * FROM ranked_scores WHERE rank <= 3;`,
        explanation: 'Assigns ranks based on test scores and selects the top 3 highest scoring ranks across submissions.',
      },
      {
        label: 'High-Performance Composite Index',
        code: `CREATE INDEX idx_users_org_created \nON users (organization_id, created_at DESC);`,
        explanation: 'Optimizes queries filtering by organization and sorting results by creation timestamp.',
      },
    ],
  },
  {
    id: 'css',
    title: 'CSS Modern Layouts: Flexbox & Grid',
    category: 'css',
    categoryLabel: 'UI Layouts',
    description: 'The most useful modern CSS rules for responsive cards, centered elements, and dynamic layouts without media queries.',
    snippets: [
      {
        label: 'Auto-Responsive Grid (No Media Queries!)',
        code: `display: grid;\ngrid-template-columns: repeat(auto-fit, minmax(280px, 1fr));\ngap: 1.5rem;`,
        explanation: 'Automatically wraps cards onto new rows whenever viewport shrinks below 280px per card.',
      },
      {
        label: 'Perfect Center (1-Line CSS Grid)',
        code: `display: grid;\nplace-items: center;\nmin-height: 100vh;`,
        explanation: 'Centers any nested child element both horizontally and vertically across the viewport.',
      },
      {
        label: 'Flex Space Distribution',
        code: `display: flex;\njustify-content: space-between;\nalign-items: center;\ngap: 1rem;`,
        explanation: 'Pushes left item to far-left, right item to far-right, and centers both on the vertical cross-axis.',
      },
      {
        label: 'Clean Text Truncation with Ellipsis',
        code: `overflow: hidden;\ntext-overflow: ellipsis;\nwhite-space: nowrap;`,
        explanation: 'Truncates long titles with "..." when text overflows its parent container width.',
      },
    ],
  },
  {
    id: 'js',
    title: 'Modern JavaScript (ES6+) Array & Async Methods',
    category: 'js',
    categoryLabel: 'JavaScript Core',
    description: 'Functional array manipulation and asynchronous resolution techniques every web developer needs daily.',
    snippets: [
      {
        label: 'Array Transform, Filter & Accumulate',
        code: `// Calculate cart subtotal with tax for in-stock items\nconst total = items\n  .filter(item => item.inStock)\n  .map(item => item.price * item.quantity)\n  .reduce((accumulator, subtotal) => accumulator + subtotal, 0);`,
        explanation: 'Chains functional methods to compute aggregated values without mutating source arrays.',
      },
      {
        label: 'Optional Chaining & Nullish Coalescing',
        code: `const avatarUrl = user?.profile?.avatarUrl ?? '/default-avatar.png';\nconst jobTitle = user?.workExperience?.[0]?.title ?? 'Open to Work';`,
        explanation: 'Safely reads nested properties without throwing null reference exceptions and provides fallbacks.',
      },
      {
        label: 'Concurrent Asynchronous Fetching',
        code: `const [profileRes, metricsRes] = await Promise.allSettled([\n  fetch('/api/student/profile'),\n  fetch('/api/student/metrics'),\n]);`,
        explanation: 'Executes multiple HTTP API requests concurrently and captures individual resolutions safely.',
      },
      {
        label: 'Deep Object Clone with StructuredClone',
        code: `const clonedState = window.structuredClone(originalState);`,
        explanation: 'Modern browser native deep-cloning mechanism without JSON.parse(JSON.stringify()) limitations.',
      },
    ],
  },
  {
    id: 'http',
    title: 'REST APIs & HTTP Status Codes',
    category: 'http',
    categoryLabel: 'Web Standards',
    description: 'Standard HTTP status response codes that indicate outcome and guide client-side error handling.',
    snippets: [
      {
        label: 'Success Codes (2xx)',
        code: `200 OK           // Standard success with response body\n201 Created      // Resource successfully created (e.g. POST /users)\n204 No Content   // Success without body (e.g. DELETE /items/1)`,
        explanation: 'Returned when the request succeeded as intended without client or server faults.',
      },
      {
        label: 'Client Error Codes (4xx)',
        code: `400 Bad Request  // Invalid payload schema or validation failure\n401 Unauthorized // Authentication credentials missing or invalid\n403 Forbidden    // Authenticated user lacks permission for action\n404 Not Found    // Requested endpoint or document doesn't exist`,
        explanation: 'Indicates the client made an invalid or unauthorized request that requires correction.',
      },
      {
        label: 'Server Error Codes (5xx)',
        code: `500 Internal Server Error // Uncaught backend exception\n502 Bad Gateway           // Upstream microservice communication failed\n503 Service Unavailable   // Server overloaded or down for maintenance`,
        explanation: 'Indicates an unexpected internal fault or downtime on the backend service.',
      },
    ],
  },
];

export const careerRoadmapsCatalog: CareerRoadmapItem[] = [
  {
    id: 'frontend',
    role: 'Frontend Engineer Roadmap (2026)',
    badge: 'HIGH DEMAND',
    overview: 'Master client-side engineering from semantic web standards to modern reactive architectures, state synchronization, and performance optimization.',
    estimatedMonths: '4 - 6 Months',
    milestones: [
      {
        title: 'Step 1: Web Fundamentals & Semantic Layouts',
        duration: '4 Weeks',
        skills: ['HTML5 Semantic Elements', 'CSS3 Flexbox & Grid', 'Responsive Media Queries', 'Web Accessibility (WCAG / ARIA)'],
        description: 'Build responsive, accessible, pixel-perfect web interfaces that render flawlessly on phones, tablets, and desktop displays.',
      },
      {
        title: 'Step 2: Modern JavaScript & ESNext Mastery',
        duration: '5 Weeks',
        skills: ['Scope & Closures', 'DOM Manipulation', 'Async / Await & Promises', 'Modules & ES6 Features'],
        description: 'Deep understanding of execution context, event loop, asynchronous networking, and functional programming patterns.',
      },
      {
        title: 'Step 3: React.js & State Management',
        duration: '6 Weeks',
        skills: ['Component Lifecycle', 'Hooks (useState, useEffect, useMemo)', 'Zustand / Redux Toolkit', 'Tailwind CSS'],
        description: 'Engineer declarative web applications with component reusability, smooth state management, and optimized re-renders.',
      },
      {
        title: 'Step 4: Next.js Full Stack & Server Components',
        duration: '4 Weeks',
        skills: ['App Router', 'React Server Components', 'Server Actions', 'SSR & Static Generation'],
        description: 'Build enterprise-grade full-stack web applications with high search-engine visibility and blazing performance.',
      },
      {
        title: 'Step 5: Testing, Performance & Core Web Vitals',
        duration: '3 Weeks',
        skills: ['Vitest & Jest', 'React Testing Library', 'Lighthouse Optimization', 'Bundle Splitting'],
        description: 'Ensure code reliability through unit/integration testing and optimize Core Web Vitals (LCP, FID, CLS).',
      },
    ],
  },
  {
    id: 'backend',
    role: 'Backend & Systems Engineer Roadmap',
    badge: 'HIGH SALARY',
    overview: 'Learn server-authoritative computing, robust REST/GraphQL APIs, relational database tuning, authentication security, and containerized deployment.',
    estimatedMonths: '5 - 7 Months',
    milestones: [
      {
        title: 'Step 1: Backend Language & Runtime',
        duration: '4 Weeks',
        skills: ['Node.js Runtime or Python', 'File I/O & Streams', 'Process Management', 'Error Handling'],
        description: 'Build asynchronous background services and master runtime mechanisms, memory models, and error management.',
      },
      {
        title: 'Step 2: RESTful API Design & Express/FastAPI',
        duration: '5 Weeks',
        skills: ['REST Principles', 'Routing & Middleware', 'Input Validation (Zod)', 'Rate Limiting & CORS'],
        description: 'Develop structured HTTP endpoints with clean modular separation of controllers, services, and repositories.',
      },
      {
        title: 'Step 3: Relational & NoSQL Data Architecture',
        duration: '6 Weeks',
        skills: ['PostgreSQL / MySQL', 'Database Schema Modeling', 'Indexes & Query Optimization', 'MongoDB / Redis Caching'],
        description: 'Design normalized relational databases, execute complex analytical queries, and accelerate read throughput with Redis.',
      },
      {
        title: 'Step 4: Authentication, Authorization & Security',
        duration: '4 Weeks',
        skills: ['JWT & Refresh Tokens', 'Password Hashing (Argon2/bcrypt)', 'RBAC (Role Based Access)', 'OWASP Top 10 Security'],
        description: 'Safeguard user credentials, prevent SQL injection/XSS, and enforce strict role-based access controls.',
      },
      {
        title: 'Step 5: Docker, CI/CD & Cloud Deployment',
        duration: '4 Weeks',
        skills: ['Docker & Docker Compose', 'GitHub Actions CI/CD', 'Cloud Hosting (AWS/GCP)', 'Nginx Reverse Proxy'],
        description: 'Package microservices into portable containers, automate test pipelines, and configure production servers.',
      },
    ],
  },
  {
    id: 'data-ai',
    role: 'Data Analyst & AI Engineer Roadmap',
    badge: 'AI REVOLUTION',
    overview: 'From data wrangling with SQL and Python to predictive machine learning algorithms, deep neural networks, and modern LLM pipelines.',
    estimatedMonths: '6 - 8 Months',
    milestones: [
      {
        title: 'Step 1: SQL & Data Extraction',
        duration: '4 Weeks',
        skills: ['Complex SQL Joins', 'Window Functions', 'Data Cleansing', 'Aggregations & Grouping'],
        description: 'Extract business intelligence insights from massive transactional databases with pinpoint precision.',
      },
      {
        title: 'Step 2: Python Data Science Stack',
        duration: '6 Weeks',
        skills: ['NumPy Multidimensional Arrays', 'Pandas DataFrames', 'Matplotlib & Seaborn', 'Exploratory Data Analysis'],
        description: 'Perform statistical analysis, impute missing dataset entries, and generate publication-quality visual plots.',
      },
      {
        title: 'Step 3: Machine Learning Algorithms',
        duration: '6 Weeks',
        skills: ['Linear & Logistic Regression', 'Decision Trees & Random Forests', 'Scikit-Learn Pipelines', 'Model Validation & ROC-AUC'],
        description: 'Build and tune predictive models to forecast trends, classify user behaviors, and evaluate metrics.',
      },
      {
        title: 'Step 4: Deep Learning & Neural Networks',
        duration: '6 Weeks',
        skills: ['PyTorch Foundations', 'Convolutional Networks (CNN)', 'Recurrent Networks & Attention', 'Transfer Learning'],
        description: 'Train deep neural networks for computer vision, natural language understanding, and automated classification.',
      },
      {
        title: 'Step 5: Generative AI, LLMs & RAG Pipelines',
        duration: '4 Weeks',
        skills: ['Prompt Engineering', 'Vector Databases & Embeddings', 'RAG (Retrieval Augmented Generation)', 'API Grounding'],
        description: 'Harness state-of-the-art foundation models to build context-aware intelligent agents and enterprise assistants.',
      },
    ],
  },
];

export const curatedFreeBooks: FreeBookItem[] = [
  {
    id: 'eloquent-js',
    title: 'Eloquent JavaScript (4th Edition)',
    author: 'Marijn Haverbeke',
    tag: 'JAVASCRIPT CLASSIC',
    type: 'Book',
    description: 'A modern introduction to programming, JavaScript, and the digital wonders. Complete with interactive in-browser coding exercises.',
    url: 'https://eloquentjavascript.net',
    highlights: ['Language syntax & data structures', 'Functions & higher-order abstractions', 'Node.js & asynchronous programming', 'Document Object Model (DOM)'],
  },
  {
    id: 'ydkjs',
    title: 'You Don\'t Know JS Yet (2nd Edition)',
    author: 'Kyle Simpson',
    tag: 'DEEP DIVE',
    type: 'Book',
    description: 'The celebrated series that looks into the core mechanisms of the JavaScript language: scope, closures, objects, prototypes, and types.',
    url: 'https://github.com/getify/You-Dont-Know-JS',
    highlights: ['Get Started & Scope & Closures', 'Objects & Classes', 'Types & Grammar', 'ESNext Language Features'],
  },
  {
    id: 'automate-python',
    title: 'Automate the Boring Stuff with Python',
    author: 'Al Sweigart',
    tag: 'PRACTICAL PYTHON',
    type: 'Book',
    description: 'Practical programming for total beginners. Learn how to write simple programs that automate hours of manual computer tasks.',
    url: 'https://automatetheboringstuff.com',
    highlights: ['Web scraping with Beautiful Soup', 'Working with Excel & PDF documents', 'Pattern matching with Regular Expressions', 'Automated email sending'],
  },
  {
    id: 'cs50',
    title: 'CS50: Introduction to Computer Science',
    author: 'Harvard University / Prof. David J. Malan',
    tag: 'WORLD FAMOUS',
    type: 'Course Series',
    description: 'An entry-level introduction to the intellectual enterprises of computer science and the art of programming. Free access to all lectures and psets.',
    url: 'https://cs50.harvard.edu/x/',
    highlights: ['Algorithmic thinking & problem solving', 'C language & memory allocation', 'Data structures (linked lists, trees, hash tables)', 'SQL databases & Python web apps'],
  },
  {
    id: 'freecodecamp',
    title: 'freeCodeCamp Interactive Certifications',
    author: 'freeCodeCamp.org',
    tag: 'HANDS-ON',
    type: 'Interactive Platform',
    description: 'Over 3,000 hours of hands-on interactive coding challenges covering responsive web design, algorithms, frontend libraries, and backend APIs.',
    url: 'https://www.freecodecamp.org/learn',
    highlights: ['Responsive Web Design Certification', 'JavaScript Algorithms and Data Structures', 'Front End Development Libraries', 'Back End Development and APIs'],
  },
];
