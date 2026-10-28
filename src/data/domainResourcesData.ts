export interface LessonItem {
  id: number;
  title: string;
  duration: string;
  videoUrl: string; // Embeddable URL
  embedId: string;
  completed?: boolean;
  summary: string;
}

export interface DomainCourse {
  id: string;
  title: string;
  domainId: 'fullstack' | 'data-analyst' | 'data-science' | 'ai-ml' | 'frontend' | 'backend';
  domainLabel: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  duration: string;
  modulesCount: number;
  description: string;
  instructor: string;
  rating: number;
  studentsCount: string;
  isRecommended?: boolean;
  thumbnailUrl: string;
  primaryVideoEmbed: string;
  lessons: LessonItem[];
}

export interface DomainQuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  relatedSkill: string;
}

export interface DomainInfo {
  id: 'fullstack' | 'data-analyst' | 'data-science' | 'ai-ml' | 'frontend' | 'backend';
  label: string;
  shortTag: string;
  iconName: string;
  description: string;
  avgSalary: string;
  hiringDemand: string;
  skillsCovered: string[];
  diagnosticQuestions: DomainQuizQuestion[];
}

export const domainDefinitions: DomainInfo[] = [
  {
    id: 'fullstack',
    label: 'Full Stack Development',
    shortTag: 'Full Stack',
    iconName: 'Layers',
    description: 'Master client-side React architectures, Node.js & Express RESTful services, MongoDB schemas, and cloud deployment.',
    avgSalary: '₹6.5 - 12.0 LPA',
    hiringDemand: '94% Market Demand',
    skillsCovered: ['React.js', 'Node.js', 'Express.js', 'MongoDB', 'REST APIs', 'TypeScript'],
    diagnosticQuestions: [
      {
        id: 'fs-1',
        question: 'What is the primary role of middleware in an Express.js web server?',
        options: [
          'To directly manipulate the client-side DOM in the browser',
          'To intercept and process request and response objects before reaching route handlers',
          'To compile JavaScript into machine code',
          'To automatically write SQL queries for MongoDB',
        ],
        correctIndex: 1,
        explanation: 'Express middleware functions have access to the request (req), response (res), and next middleware function in the application cycle, commonly used for logging, auth, and error handling.',
        relatedSkill: 'Express.js & Middleware',
      },
      {
        id: 'fs-2',
        question: 'In React, why is directly mutating state (e.g., this.state.data = x) considered an anti-pattern?',
        options: [
          'Because JavaScript does not allow object mutations',
          'Because it bypasses React reconciliation and will not trigger a component re-render',
          'Because it deletes all CSS styling in the component',
          'Because state mutations are only permitted in backend servers',
        ],
        correctIndex: 1,
        explanation: 'React relies on immutable state updates (via setState or useState setter) to detect state changes, diff the Virtual DOM, and schedule an efficient re-render.',
        relatedSkill: 'React State Management',
      },
      {
        id: 'fs-3',
        question: 'Which HTTP status code is the standard response when a POST request successfully creates a new resource?',
        options: [
          '200 OK',
          '201 Created',
          '204 No Content',
          '304 Not Modified',
        ],
        correctIndex: 1,
        explanation: 'HTTP 201 Created indicates that the request has succeeded and led to the creation of a new resource on the server.',
        relatedSkill: 'REST API Design',
      },
      {
        id: 'fs-4',
        question: 'What is the primary architectural advantage of JSON Web Tokens (JWT) for user authentication?',
        options: [
          'They encrypt the entire database on disk',
          'They enable stateless authentication without requiring the server to look up user sessions in memory or database on every request',
          'They prevent the browser from saving cookies',
          'They automatically generate React components for login forms',
        ],
        correctIndex: 1,
        explanation: 'JWTs are cryptographically signed tokens containing user payload data, allowing the server to verify authenticity without consulting a central session store.',
        relatedSkill: 'Auth & Security',
      },
      {
        id: 'fs-5',
        question: 'In MongoDB, which aggregation pipeline operator is used to perform an equality join with another collection (similar to a SQL LEFT OUTER JOIN)?',
        options: [
          '$match',
          '$group',
          '$lookup',
          '$project',
        ],
        correctIndex: 2,
        explanation: '$lookup performs a left outer join to an unsharded collection in the same database to filter in documents from the "joined" collection for processing.',
        relatedSkill: 'MongoDB Aggregations',
      },
    ],
  },
  {
    id: 'data-analyst',
    label: 'Data Analyst',
    shortTag: 'Data Analyst',
    iconName: 'BarChart3',
    description: 'Transform raw data into business intelligence using SQL querying, Power BI & Tableau dashboards, Excel modeling, and exploratory data analysis.',
    avgSalary: '₹5.5 - 10.5 LPA',
    hiringDemand: '91% Market Demand',
    skillsCovered: ['SQL', 'Power BI', 'Advanced Excel', 'Tableau', 'Data Cleaning', 'Business Metrics'],
    diagnosticQuestions: [
      {
        id: 'da-1',
        question: 'Which SQL clause is strictly used to filter groups created by the GROUP BY clause rather than individual rows?',
        options: [
          'WHERE',
          'HAVING',
          'ORDER BY',
          'FILTER BY',
        ],
        correctIndex: 1,
        explanation: 'The WHERE clause filters rows before aggregation; the HAVING clause filters the aggregated result sets produced by GROUP BY.',
        relatedSkill: 'SQL Aggregations',
      },
      {
        id: 'da-2',
        question: 'When analyzing customer transaction values that include extreme billionaire outliers, which measure of central tendency provides the most representative picture?',
        options: [
          'Mean (Arithmetic Average)',
          'Median (50th Percentile)',
          'Standard Deviation',
          'Variance',
        ],
        correctIndex: 1,
        explanation: 'The median is robust against extreme positive or negative outliers, making it far superior to the mean for heavily skewed income or spend distributions.',
        relatedSkill: 'Descriptive Statistics',
      },
      {
        id: 'da-3',
        question: 'In Power BI, what is the primary difference between a Calculated Column and a DAX Measure?',
        options: [
          'Calculated columns are evaluated row-by-row during data refresh and consume RAM/disk, while Measures are calculated on-the-fly based on visual filter context',
          'Measures can only be created using Python code',
          'Calculated columns cannot use numbers',
          'Measures are saved into Excel sheets',
        ],
        correctIndex: 0,
        explanation: 'Calculated columns are computed row by row during table load, occupying storage. DAX Measures compute dynamically at visual query time based on user slicers and filters.',
        relatedSkill: 'Power BI & DAX',
      },
      {
        id: 'da-4',
        question: 'Which SQL JOIN type returns all records from Table A, and matched records from Table B, placing NULL values where Table B has no match?',
        options: [
          'INNER JOIN',
          'LEFT JOIN (LEFT OUTER JOIN)',
          'CROSS JOIN',
          'RIGHT EXCLUSIVE JOIN',
        ],
        correctIndex: 1,
        explanation: 'LEFT JOIN returns all rows from the left table and matched rows from the right table, substituting NULLs when no relation is found.',
        relatedSkill: 'SQL Relational Queries',
      },
      {
        id: 'da-5',
        question: 'In customer retention analysis, what metric measures the percentage of subscribers or customers who discontinue their service over a given period?',
        options: [
          'Customer Acquisition Cost (CAC)',
          'Net Promoter Score (NPS)',
          'Churn Rate',
          'Return on Ad Spend (ROAS)',
        ],
        correctIndex: 2,
        explanation: 'Churn rate (or attrition rate) measures the proportion of contractual or recurring customers lost during a specific window.',
        relatedSkill: 'Business Analytics & KPIs',
      },
    ],
  },
  {
    id: 'data-science',
    label: 'Data Science',
    shortTag: 'Data Science',
    iconName: 'LineChart',
    description: 'Build predictive statistical models, run hypothesis experiments, process data with Pandas & NumPy, and master end-to-end data science pipelines.',
    avgSalary: '₹7.5 - 15.0 LPA',
    hiringDemand: '93% Market Demand',
    skillsCovered: ['Python', 'Pandas & NumPy', 'Scikit-Learn', 'Statistical Inference', 'Feature Engineering', 'EDA'],
    diagnosticQuestions: [
      {
        id: 'ds-1',
        question: 'In Pandas, which method is best used to fill missing NaN values with the mean of a specific column?',
        options: [
          'df["col"].drop_nan()',
          'df["col"].fillna(df["col"].mean())',
          'df["col"].replace_empty()',
          'df["col"].impute_null()',
        ],
        correctIndex: 1,
        explanation: 'df["col"].fillna(df["col"].mean()) calculates column mean and replaces NaN entries efficiently.',
        relatedSkill: 'Data Cleaning with Pandas',
      },
      {
        id: 'ds-2',
        question: 'In hypothesis testing, a p-value of 0.02 under a significance threshold (alpha) of 0.05 indicates what?',
        options: [
          'The experiment failed and must be repeated',
          'Statistically significant evidence to reject the null hypothesis in favor of the alternative hypothesis',
          'The null hypothesis is 98% guaranteed to be true',
          'The sample size was too small',
        ],
        correctIndex: 1,
        explanation: 'When p-value < alpha, the observed effect is unlikely under the null hypothesis alone, so we reject H0 at the 5% significance level.',
        relatedSkill: 'Hypothesis Testing & Stats',
      },
      {
        id: 'ds-3',
        question: 'Why is it critical to split dataset into train, validation, and test splits BEFORE applying feature scaling (like StandardScaler)?',
        options: [
          'To speed up CPU processing time',
          'To prevent Data Leakage from test distribution into training feature parameters',
          'Because scaling algorithms cannot handle more than 100 rows',
          'To ensure all columns are converted to integers',
        ],
        correctIndex: 1,
        explanation: 'Fitting scalers on test data causes information leakage from the unseen test set into the model pipeline. You must fit on train and transform on test.',
        relatedSkill: 'Feature Pipeline & Leakage',
      },
      {
        id: 'ds-4',
        question: 'For a credit card fraud detection dataset where 99.8% of transactions are legitimate and 0.2% are fraud, why is Accuracy a misleading metric?',
        options: [
          'Because accuracy is only for regression problems',
          'Because a naive model predicting "not fraud" 100% of the time gets 99.8% accuracy while failing to detect any fraudulent transactions',
          'Because accuracy requires GPU compute',
          'Because fraud cannot be classified',
        ],
        correctIndex: 1,
        explanation: 'In highly imbalanced classification, accuracy is swayed by the majority class. Precision, Recall, PR-AUC, and F1-score must be used.',
        relatedSkill: 'Model Evaluation Metrics',
      },
      {
        id: 'ds-5',
        question: 'What is the primary purpose of Principal Component Analysis (PCA) in data science?',
        options: [
          'To train a decision tree classifier',
          'Unsupervised dimensionality reduction that projects high-dimensional correlated features onto orthogonal variance axes',
          'To remove duplicate rows from CSV files',
          'To perform sentiment analysis on text',
        ],
        correctIndex: 1,
        explanation: 'PCA identifies the directions (eigenvectors) of maximum variance in the data to compress features into a smaller dimensional subspace.',
        relatedSkill: 'Dimensionality Reduction',
      },
    ],
  },
  {
    id: 'ai-ml',
    label: 'AI & Machine Learning (AI / ML)',
    shortTag: 'AI & ML',
    iconName: 'Cpu',
    description: 'Architect deep neural networks, fine-tune Transformer LLMs, implement RAG systems, and deploy production ML systems with PyTorch.',
    avgSalary: '₹8.5 - 18.0 LPA',
    hiringDemand: '97% Market Demand',
    skillsCovered: ['PyTorch', 'Transformers', 'Generative AI', 'Deep Learning', 'RAG Architecture', 'Prompt Engineering'],
    diagnosticQuestions: [
      {
        id: 'ai-1',
        question: 'What core mathematical mechanism allows modern Transformer architectures (like GPT, Claude, Gemini) to process all input tokens in parallel rather than sequentially like RNNs?',
        options: [
          'Recurrent hidden states',
          'Scaled Dot-Product Multi-Head Self-Attention',
          'K-Means clustering',
          'Stochastic Gradient Descent without backprop',
        ],
        correctIndex: 1,
        explanation: 'Self-attention calculates pairwise query-key-value relevance matrix between all tokens simultaneously, allowing complete parallelization across GPU tensor cores.',
        relatedSkill: 'Transformer Architecture',
      },
      {
        id: 'ai-2',
        question: 'In deep neural networks, how does the Dropout regularization technique prevent overfitting during training?',
        options: [
          'By terminating the training process early',
          'By randomly deactivating a fraction of neurons with probability p on each training forward/backward pass',
          'By increasing the learning rate exponentially',
          'By dropping negative input data points',
        ],
        correctIndex: 1,
        explanation: 'Dropout forces the network to learn redundant and robust distributed representations because no individual neuron can rely on the presence of another.',
        relatedSkill: 'Neural Network Regularization',
      },
      {
        id: 'ai-3',
        question: 'What is the primary benefit of Retrieval-Augmented Generation (RAG) when deploying Large Language Models in enterprise applications?',
        options: [
          'It retrains the model from scratch every minute',
          'It retrieves external, verified domain documents at inference time to ground LLM generations and drastically reduce factual hallucinations',
          'It converts English prompts into C++ code',
          'It eliminates the need for any embedding vector database',
        ],
        correctIndex: 1,
        explanation: 'RAG provides the LLM with relevant context retrieved from private databases or documents inside the prompt context, grounding its answer in factual evidence.',
        relatedSkill: 'RAG & Vector Search',
      },
      {
        id: 'ai-4',
        question: 'What common failure mode occurs when gradients become exponentially small as they propagate backward through many layers using Sigmoid activation functions?',
        options: [
          'Exploding Gradient Problem',
          'Vanishing Gradient Problem',
          'Dead ReLU phenomenon',
          'Under-fitting due to high learning rate',
        ],
        correctIndex: 1,
        explanation: 'The derivative of the standard Sigmoid function peaks at 0.25; chaining multiple derivatives through deep layers causes gradients to vanish near zero, stalling weights updates in early layers.',
        relatedSkill: 'Backpropagation & Gradients',
      },
      {
        id: 'ai-5',
        question: 'What is Temperature parameter in Large Language Model text generation sampling?',
        options: [
          'The physical thermal temperature of the GPU hardware',
          'A hyperparameter that scales logits before softmax: lower values (<0.3) make output deterministic and focused, higher values (>0.7) increase creative diversity',
          'The speed of token generation per second',
          'The number of layers in the model',
        ],
        correctIndex: 1,
        explanation: 'Dividing logits by temperature prior to softmax flattens or sharpens the output token probability distribution, controlling predictability versus creativity.',
        relatedSkill: 'LLM Generation Hyperparameters',
      },
    ],
  },
  {
    id: 'frontend',
    label: 'Frontend Development',
    shortTag: 'Frontend',
    iconName: 'Layout',
    description: 'Design accessible, high-performance web applications using modern React, Tailwind CSS, TypeScript, and state management.',
    avgSalary: '₹5.5 - 10.0 LPA',
    hiringDemand: '89% Market Demand',
    skillsCovered: ['HTML5 & CSS3', 'JavaScript ES6+', 'React.js', 'Tailwind CSS', 'Redux / Zustand', 'Web Vitals'],
    diagnosticQuestions: [
      {
        id: 'fe-1',
        question: 'What is the difference between "debounce" and "throttle" when handling high-frequency browser events like scroll or input search?',
        options: [
          'They are identical aliases in Lodash',
          'Debounce delays function invocation until a quiet period of inactivity occurs; throttle guarantees invocation at most once every specified time interval',
          'Throttle only works on mobile touch devices',
          'Debounce deletes events from the history stack',
        ],
        correctIndex: 1,
        explanation: 'Debouncing bunches rapid events into one single call after typing stops. Throttling limits continuous execution to a predictable tick rate.',
        relatedSkill: 'JavaScript Performance',
      },
      {
        id: 'fe-2',
        question: 'In React 18, what does the useEffect dependency array [count] specify?',
        options: [
          'That count will be permanently deleted when the component unmounts',
          'That the effect callback will only re-run if the value of count changes between renders',
          'That the component can only be rendered once',
          'That count cannot be updated by any child component',
        ],
        correctIndex: 1,
        explanation: 'React compares the values in the dependency array on each render; if every value is referentially equal to the previous render, the effect is skipped.',
        relatedSkill: 'React Hooks Lifecycle',
      },
      {
        id: 'fe-3',
        question: 'What does Largest Contentful Paint (LCP) measure in Google Core Web Vitals?',
        options: [
          'The time taken for all server database queries to finish',
          'The time it takes for the largest visual text block or image to render inside the viewport',
          'The total bytes of CSS loaded on the page',
          'The number of JavaScript console errors',
        ],
        correctIndex: 1,
        explanation: 'LCP is an important user-centric metric for measuring perceived load speed; good LCP is 2.5 seconds or less.',
        relatedSkill: 'Core Web Vitals & Optimization',
      },
      {
        id: 'fe-4',
        question: 'Why should developers provide a unique "key" prop when rendering dynamic lists in React?',
        options: [
          'To assign CSS class names to each list item',
          'To help React identify which items have changed, been added, or been removed during Virtual DOM reconciliation',
          'Because the browser will throw an HTML syntax error without it',
          'To automatically sort the array alphabetically',
        ],
        correctIndex: 1,
        explanation: 'Keys give elements a stable identity across renders, allowing React to reuse DOM nodes efficiently without unnecessary re-creation.',
        relatedSkill: 'Virtual DOM & Lists',
      },
      {
        id: 'fe-5',
        question: 'In Tailwind CSS, which utility class ensures an element maintains an exact 16:9 widescreen proportion regardless of screen width?',
        options: [
          'aspect-video',
          'aspect-square',
          'ratio-widescreen',
          'w-16 h-9',
        ],
        correctIndex: 0,
        explanation: 'Tailwind provides aspect-video (16 / 9) and aspect-square (1 / 1) utilities utilizing the modern CSS aspect-ratio property.',
        relatedSkill: 'Tailwind CSS Layouts',
      },
    ],
  },
  {
    id: 'backend',
    label: 'Backend & Cloud Systems',
    shortTag: 'Backend',
    iconName: 'Server',
    description: 'Engineer high-throughput microservices, design scalable PostgreSQL databases, and orchestrate containers with Docker & AWS.',
    avgSalary: '₹7.0 - 14.5 LPA',
    hiringDemand: '92% Market Demand',
    skillsCovered: ['Node.js & Express', 'PostgreSQL', 'Docker', 'Redis Caching', 'AWS Core', 'Microservices'],
    diagnosticQuestions: [
      {
        id: 'be-1',
        question: 'What is the main benefit of implementing database connection pooling in backend web servers?',
        options: [
          'It eliminates the need for SQL queries entirely',
          'It keeps a pool of reusable open TCP connections to avoid the heavy latency of handshakes and authentication on every client request',
          'It compresses the database into a zip file',
          'It automatically migrates data to MongoDB',
        ],
        correctIndex: 1,
        explanation: 'Creating database connections is computationally expensive. A connection pool keeps active connections ready for reuse across concurrent API requests.',
        relatedSkill: 'Database Connection Pooling',
      },
      {
        id: 'be-2',
        question: 'What does the "A" in ACID transaction guarantees for relational databases stand for?',
        options: [
          'Asynchronous',
          'Atomicity — all operations in a transaction succeed completely or all are rolled back as if nothing happened',
          'Authentication',
          'Availability',
        ],
        correctIndex: 1,
        explanation: 'Atomicity ensures that all database modifications within a transaction unit are treated as a single indivisible operation.',
        relatedSkill: 'Database ACID Transactions',
      },
      {
        id: 'be-3',
        question: 'In Docker, why should frequently changing steps (such as COPY . . and npm run build) be placed near the BOTTOM of a Dockerfile?',
        options: [
          'To satisfy the Docker compiler syntax requirement',
          'To maximize Docker layer caching: unchanged earlier layers (like package installation) won\'t be invalidated on code edits',
          'Because the bottom layer runs with root permissions',
          'To decrease container CPU usage',
        ],
        correctIndex: 1,
        explanation: 'Docker caches each instruction layer. Placing static dependencies (package.json + npm install) before source code copying saves minutes on repeated builds.',
        relatedSkill: 'Docker Layer Caching',
      },
      {
        id: 'be-4',
        question: 'In an in-memory cache like Redis, what eviction strategy removes the keys that have not been read or written for the longest duration?',
        options: [
          'FIFO (First In First Out)',
          'LRU (Least Recently Used)',
          'LIFO (Last In First Out)',
          'Random Key Drop',
        ],
        correctIndex: 1,
        explanation: 'LRU (Least Recently Used) identifies and purges the data keys that were accessed longest ago when memory limits are reached.',
        relatedSkill: 'Redis Caching Strategies',
      },
      {
        id: 'be-5',
        question: 'What distributed system theorem proves that a networked data store cannot simultaneously guarantee Consistency, Availability, and Partition Tolerance?',
        options: [
          'Moore\'s Law',
          'CAP Theorem (Brewer\'s Theorem)',
          'Amdahl\'s Law',
          'Little\'s Law',
        ],
        correctIndex: 1,
        explanation: 'The CAP theorem states that in the event of a network partition (P), a distributed database must choose between Consistency (C) and Availability (A).',
        relatedSkill: 'Distributed Systems & CAP',
      },
    ],
  },
];

export const allDomainCourses: DomainCourse[] = [
  // --- FULL STACK ---
  {
    id: 'course-fs-mern',
    title: 'Full Stack MERN Architecture & REST APIs',
    domainId: 'fullstack',
    domainLabel: 'Full Stack Development',
    level: 'Intermediate',
    duration: '18 Hours',
    modulesCount: 6,
    instructor: 'SkillTwin Lead Architect',
    rating: 4.9,
    studentsCount: '4,280',
    isRecommended: true,
    thumbnailUrl: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&auto=format&fit=crop&q=60',
    primaryVideoEmbed: 'https://www.youtube-nocookie.com/embed/nu_pCVPKzTk',
    description: 'End-to-end full stack web architecture: React components, state lifecycles, Express middleware, JWT tokens, MongoDB aggregation, and full cloud hosting.',
    lessons: [
      {
        id: 1,
        title: 'Full Stack Architecture & Monorepo Setup',
        duration: '14 min',
        embedId: 'nu_pCVPKzTk',
        videoUrl: 'https://www.youtube-nocookie.com/embed/nu_pCVPKzTk',
        completed: true,
        summary: 'Understand the end-to-end client-server boundary, request flow, and Vite + Node workspace configuration.',
      },
      {
        id: 2,
        title: 'Express REST Endpoints, Routing & JSON Validation',
        duration: '22 min',
        embedId: 'Oe421EPjeBE',
        videoUrl: 'https://www.youtube-nocookie.com/embed/Oe421EPjeBE',
        completed: true,
        summary: 'Building GET, POST, PUT, DELETE routes with clean status codes and request validation middleware.',
      },
      {
        id: 3,
        title: 'MongoDB Mongoose Schema & Aggregation Pipeline',
        duration: '28 min',
        embedId: 'ofme2o29ngU',
        videoUrl: 'https://www.youtube-nocookie.com/embed/ofme2o29ngU',
        completed: false,
        summary: 'Schema models, validation constraints, population, and multi-stage aggregation queries.',
      },
      {
        id: 4,
        title: 'JWT Authentication, Refresh Tokens & Protected Routes',
        duration: '26 min',
        embedId: 'mbsmsi7l3r4',
        videoUrl: 'https://www.youtube-nocookie.com/embed/mbsmsi7l3r4',
        completed: false,
        summary: 'Stateless JWT auth with HTTP-only cookies, password hashing with bcrypt, and role guards.',
      },
      {
        id: 5,
        title: 'React Client Integration & Custom Query Hooks',
        duration: '32 min',
        embedId: 'bMknfKXIFA8',
        videoUrl: 'https://www.youtube-nocookie.com/embed/bMknfKXIFA8',
        completed: false,
        summary: 'Connecting React client to Express backend using axios/fetch, caching, and optimistic UI updates.',
      },
    ],
  },
  {
    id: 'course-fs-react',
    title: 'Modern React 18: Hooks, State & Performance',
    domainId: 'fullstack',
    domainLabel: 'Full Stack Development',
    level: 'Beginner',
    duration: '14 Hours',
    modulesCount: 5,
    instructor: 'SkillTwin Academy',
    rating: 4.8,
    studentsCount: '3,890',
    thumbnailUrl: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&auto=format&fit=crop&q=60',
    primaryVideoEmbed: 'https://www.youtube-nocookie.com/embed/bMknfKXIFA8',
    description: 'Master functional components, custom hooks, Context API, suspense boundaries, and rendering optimization in React 18.',
    lessons: [
      {
        id: 1,
        title: 'React 18 Core Concepts & JSX Anatomy',
        duration: '18 min',
        embedId: 'bMknfKXIFA8',
        videoUrl: 'https://www.youtube-nocookie.com/embed/bMknfKXIFA8',
        completed: true,
        summary: 'Component breakdown, Virtual DOM, JSX syntax, and props destructuring.',
      },
      {
        id: 2,
        title: 'Hooks Masterclass: useState, useEffect, useRef',
        duration: '25 min',
        embedId: '0ZJgIjIuY7U',
        videoUrl: 'https://www.youtube-nocookie.com/embed/0ZJgIjIuY7U',
        completed: false,
        summary: 'Deep dive into hooks rules, dependency array caveats, and DOM refs.',
      },
    ],
  },

  // --- DATA ANALYST ---
  {
    id: 'course-da-mastery',
    title: 'Data Analyst Bootcamp: SQL, Excel & Power BI',
    domainId: 'data-analyst',
    domainLabel: 'Data Analyst',
    level: 'Beginner',
    duration: '20 Hours',
    modulesCount: 6,
    instructor: 'Senior Business Intelligence Lead',
    rating: 4.9,
    studentsCount: '5,140',
    isRecommended: true,
    thumbnailUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format&fit=crop&q=60',
    primaryVideoEmbed: 'https://www.youtube-nocookie.com/embed/r-uOLxNrNk8',
    description: 'Turn business questions into dynamic insights: write advanced SQL joins, aggregate customer KPIs, build Power BI reports, and clean data with Python.',
    lessons: [
      {
        id: 1,
        title: 'The Data Analyst Workflow & Business Metrics',
        duration: '16 min',
        embedId: 'r-uOLxNrNk8',
        videoUrl: 'https://www.youtube-nocookie.com/embed/r-uOLxNrNk8',
        completed: true,
        summary: 'Understanding churn, MRR, customer lifetime value (LTV), and conversion funnels.',
      },
      {
        id: 2,
        title: 'SQL for Analytics: GROUP BY, HAVING & Window Functions',
        duration: '30 min',
        embedId: '7S_tz1z_5bA',
        videoUrl: 'https://www.youtube-nocookie.com/embed/7S_tz1z_5bA',
        completed: false,
        summary: 'Writing ROW_NUMBER(), RANK(), DENSE_RANK(), and partition window queries.',
      },
      {
        id: 3,
        title: 'Power BI: Data Modeling & Star Schemas',
        duration: '24 min',
        embedId: 'AGrl-H87pRU',
        videoUrl: 'https://www.youtube-nocookie.com/embed/AGrl-H87pRU',
        completed: false,
        summary: 'Building relationships between Fact and Dimension tables and writing DAX measures.',
      },
      {
        id: 4,
        title: 'Data Cleaning & Exploratory Analysis with Excel/Python',
        duration: '28 min',
        embedId: 'PSNXoAs28UL',
        videoUrl: 'https://www.youtube-nocookie.com/embed/PSNXoAs28UL',
        completed: false,
        summary: 'Handling nulls, duplicate keys, date parsing, and visual outlier detection.',
      },
    ],
  },
  {
    id: 'course-da-sql',
    title: 'Advanced SQL Querying & Optimization',
    domainId: 'data-analyst',
    domainLabel: 'Data Analyst',
    level: 'Intermediate',
    duration: '12 Hours',
    modulesCount: 4,
    instructor: 'SkillTwin Database Faculty',
    rating: 4.8,
    studentsCount: '3,450',
    thumbnailUrl: 'https://images.unsplash.com/photo-1544383835-bda2bc66a55d?w=800&auto=format&fit=crop&q=60',
    primaryVideoEmbed: 'https://www.youtube-nocookie.com/embed/HXV3zeRR3h4',
    description: 'Master Common Table Expressions (CTEs), recursive queries, indexing strategies, and query plan execution analysis.',
    lessons: [
      {
        id: 1,
        title: 'CTEs and Subquery Optimization in PostgreSQL',
        duration: '22 min',
        embedId: 'HXV3zeRR3h4',
        videoUrl: 'https://www.youtube-nocookie.com/embed/HXV3zeRR3h4',
        completed: true,
        summary: 'Writing readable WITH CTE blocks and eliminating unnecessary nested subqueries.',
      },
    ],
  },

  // --- DATA SCIENCE ---
  {
    id: 'course-ds-python',
    title: 'Python for Data Science & Statistical Analysis',
    domainId: 'data-science',
    domainLabel: 'Data Science',
    level: 'Intermediate',
    duration: '24 Hours',
    modulesCount: 7,
    instructor: 'Chief Data Scientist',
    rating: 4.9,
    studentsCount: '4,670',
    isRecommended: true,
    thumbnailUrl: 'https://images.unsplash.com/photo-1509228468518-180dd4864904?w=800&auto=format&fit=crop&q=60',
    primaryVideoEmbed: 'https://www.youtube-nocookie.com/embed/ua-CiDNNj30',
    description: 'Comprehensive data science pipeline: NumPy array vectorization, Pandas dataframes, hypothesis testing, exploratory visualization, and Scikit-Learn modeling.',
    lessons: [
      {
        id: 1,
        title: 'NumPy Vectorization & Scientific Matrix Computations',
        duration: '19 min',
        embedId: 'ua-CiDNNj30',
        videoUrl: 'https://www.youtube-nocookie.com/embed/ua-CiDNNj30',
        completed: true,
        summary: 'Broadcasting, indexing, multidimensional arrays, and memory-efficient matrix math.',
      },
      {
        id: 2,
        title: 'Pandas Data Wrangling & Feature Engineering',
        duration: '32 min',
        embedId: 'vmEHCJofslg',
        videoUrl: 'https://www.youtube-nocookie.com/embed/vmEHCJofslg',
        completed: false,
        summary: 'Grouping, merging, pivot tables, string operations, and time-series resamplings.',
      },
      {
        id: 3,
        title: 'Statistical Hypothesis Testing & A/B Experimentation',
        duration: '28 min',
        embedId: '0oc49DyA3hU',
        videoUrl: 'https://www.youtube-nocookie.com/embed/0oc49DyA3hU',
        completed: false,
        summary: 'T-tests, Chi-Square, ANOVA, p-value calculations, and sample size power analysis.',
      },
      {
        id: 4,
        title: 'Supervised Machine Learning with Scikit-Learn',
        duration: '35 min',
        embedId: '0B5eIE_1vpU',
        videoUrl: 'https://www.youtube-nocookie.com/embed/0B5eIE_1vpU',
        completed: false,
        summary: 'Linear regression, Random Forest, Cross-Validation, and hyperparameter tuning with GridSearchCV.',
      },
    ],
  },

  // --- AI & MACHINE LEARNING ---
  {
    id: 'course-ai-deeplearning',
    title: 'AI & Machine Learning: Neural Networks to LLMs',
    domainId: 'ai-ml',
    domainLabel: 'AI & Machine Learning (AI / ML)',
    level: 'Advanced',
    duration: '26 Hours',
    modulesCount: 8,
    instructor: 'AI Research Staff Engineer',
    rating: 5.0,
    studentsCount: '6,210',
    isRecommended: true,
    thumbnailUrl: 'https://images.unsplash.com/photo-1677442136019-21780efad99a?w=800&auto=format&fit=crop&q=60',
    primaryVideoEmbed: 'https://www.youtube-nocookie.com/embed/i_LwzRVP7bg',
    description: 'Learn modern AI from ground principles: backpropagation calculus, PyTorch tensor workflows, CNNs, Transformers, and Retrieval-Augmented Generation (RAG).',
    lessons: [
      {
        id: 1,
        title: 'Machine Learning Foundations & Gradient Descent',
        duration: '20 min',
        embedId: 'i_LwzRVP7bg',
        videoUrl: 'https://www.youtube-nocookie.com/embed/i_LwzRVP7bg',
        completed: true,
        summary: 'Loss functions, cost minimization, learning rates, and gradient vector mathematics.',
      },
      {
        id: 2,
        title: 'Deep Learning & Neural Networks in PyTorch',
        duration: '35 min',
        embedId: 'V_xro1bcAuA',
        videoUrl: 'https://www.youtube-nocookie.com/embed/V_xro1bcAuA',
        completed: false,
        summary: 'Building custom nn.Module classes, autograd forward/backward passes, and Adam optimizer.',
      },
      {
        id: 3,
        title: 'The Transformer Architecture & Attention Mechanism',
        duration: '40 min',
        embedId: 'kCc8FmEb1nY',
        videoUrl: 'https://www.youtube-nocookie.com/embed/kCc8FmEb1nY',
        completed: false,
        summary: 'Scaled dot-product attention, multi-head projections, positional encoding, and token embeddings.',
      },
      {
        id: 4,
        title: 'Building Enterprise RAG Systems with Vector Databases',
        duration: '32 min',
        embedId: 'tcqEjkD-epA',
        videoUrl: 'https://www.youtube-nocookie.com/embed/tcqEjkD-epA',
        completed: false,
        summary: 'Chunking strategies, embedding generation, cosine similarity search, and prompt synthesis.',
      },
    ],
  },

  // --- FRONTEND ---
  {
    id: 'course-fe-deepdive',
    title: 'Frontend Engineering: JavaScript to Next.js',
    domainId: 'frontend',
    domainLabel: 'Frontend Development',
    level: 'Intermediate',
    duration: '16 Hours',
    modulesCount: 5,
    instructor: 'Frontend Tech Lead',
    rating: 4.8,
    studentsCount: '3,120',
    thumbnailUrl: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=800&auto=format&fit=crop&q=60',
    primaryVideoEmbed: 'https://www.youtube-nocookie.com/embed/bMknfKXIFA8',
    description: 'Master the browser runtime: asynchronous JavaScript, event loops, DOM performance, Tailwind CSS layouts, and modern Next.js rendering.',
    lessons: [
      {
        id: 1,
        title: 'JavaScript Event Loop & Microtask Queue',
        duration: '18 min',
        embedId: '8aGhZQkoFbQ',
        videoUrl: 'https://www.youtube-nocookie.com/embed/8aGhZQkoFbQ',
        completed: true,
        summary: 'Call stack, Web APIs, Task Queue, Microtask Queue (Promises), and requestAnimationFrame.',
      },
      {
        id: 2,
        title: 'Modern CSS Layouts: Grid, Flexbox & Container Queries',
        duration: '22 min',
        embedId: 'jV8B24rSN5o',
        videoUrl: 'https://www.youtube-nocookie.com/embed/jV8B24rSN5o',
        completed: false,
        summary: 'Building fully fluid and responsive user interfaces with Tailwind and modern CSS3.',
      },
    ],
  },

  // --- BACKEND & CLOUD ---
  {
    id: 'course-be-cloud',
    title: 'Backend Systems, Docker & Cloud Architecture',
    domainId: 'backend',
    domainLabel: 'Backend & Cloud Systems',
    level: 'Intermediate',
    duration: '22 Hours',
    modulesCount: 6,
    instructor: 'Cloud Solutions Architect',
    rating: 4.9,
    studentsCount: '3,800',
    thumbnailUrl: 'https://images.unsplash.com/photo-1607799279861-4dd421887fb3?w=800&auto=format&fit=crop&q=60',
    primaryVideoEmbed: 'https://www.youtube-nocookie.com/embed/Oe421EPjeBE',
    description: 'Build enterprise microservices with Node.js, execute database migrations with PostgreSQL, containerize with Docker, and deploy to AWS.',
    lessons: [
      {
        id: 1,
        title: 'Designing Resilient Node.js Microservices',
        duration: '24 min',
        embedId: 'Oe421EPjeBE',
        videoUrl: 'https://www.youtube-nocookie.com/embed/Oe421EPjeBE',
        completed: true,
        summary: 'Service decomposition, API gateways, message queues, and health check endpoints.',
      },
      {
        id: 2,
        title: 'Docker for Developers: Multi-Stage Builds & Compose',
        duration: '28 min',
        embedId: '3c-iBn73dDE',
        videoUrl: 'https://www.youtube-nocookie.com/embed/3c-iBn73dDE',
        completed: false,
        summary: 'Optimizing container image sizes, volume mounts, networks, and multi-service orchestration.',
      },
    ],
  },
];
