export interface YouTubeTutorial {
  id: string;
  title: string;
  channelName: string;
  videoId: string;
  thumbnail: string;
  description: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  duration: string;
  topic: string;
  language: string;
  isPlaylist?: boolean;
  playlistUrl?: string;
  youtubeUrl: string;
  embedUrl: string;
}

export interface RoadmapStage {
  stage: number;
  title: string;
  description: string;
  skills: string[];
  duration: string;
  defaultDone?: boolean;
}

export interface DomainCourseModule {
  id: string;
  title: string;
  provider: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  duration: string;
  freeStatus: 'Free' | 'Free Audit' | 'Official Open-Source' | 'Certificate Available';
  skillsLearned: string[];
  progress: number;
  courseUrl: string;
  description: string;
  topics: string[];
  prerequisites?: string[];
}

export interface DomainAssessmentQuestion {
  id: number;
  question: string;
  options: string[];
  answer: number;
  explanation: string;
  skillTag?: string;
}

export interface DomainMockQuestion {
  id: number;
  category: 'Technical' | 'Behavioral' | 'System Design' | 'HR';
  question: string;
  expectedKeywords: string[];
  tip: string;
}

export interface DomainProject {
  id: string;
  title: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  description: string;
  tech: string[];
  progress: number;
  objectives: string;
}

export interface DomainJob {
  id: string;
  title: string;
  company: string;
  logoText: string;
  location: string;
  type: string;
  salary: string;
  matchScore: number;
  description: string;
  skills: string[];
  applyUrl: string;
}

export interface DomainData {
  id: string;
  name: string;
  icon: string;
  badge: string;
  shortDescription: string;
  overview: string;
  roles: string[];
  primaryRole: string;
  avgSalary: string;
  hiringDemand: string;
  requiredSkills: string[];
  skillsMasteredDefault: string[];
  skillsToImproveDefault: string[];
  missingSkillsDefault: string[];
  readinessScoreDefault: number;
  roadmap: RoadmapStage[];
  youtubeVideos: YouTubeTutorial[];
  courses: DomainCourseModule[];
  assessments: DomainAssessmentQuestion[];
  mockQuestions: DomainMockQuestion[];
  projects: DomainProject[];
  jobs: DomainJob[];
}

export const DOMAINS_MASTER: Record<string, DomainData> = {
  // 1. Artificial Intelligence
  'ai': {
    id: 'ai',
    name: 'Artificial Intelligence (AI)',
    icon: '🤖',
    badge: 'HIGH DEMAND',
    shortDescription: 'Build intelligent systems, neural networks, natural language processing and generative AI agents.',
    overview: 'Artificial Intelligence combines mathematics, Python programming, neural networks, and modern transformer architectures to solve high-impact automated reasoning and pattern recognition tasks.',
    roles: ['AI Engineer', 'Machine Learning Engineer', 'NLP Engineer', 'Computer Vision Engineer', 'Generative AI Specialist'],
    primaryRole: 'AI Engineer',
    avgSalary: '₹8 - 22 LPA',
    hiringDemand: '97% Market Growth',
    requiredSkills: ['Python', 'Linear Algebra & Calculus', 'Neural Networks', 'PyTorch / TensorFlow', 'Transformers & LLMs', 'Model Deployment'],
    skillsMasteredDefault: ['Python Syntax', 'Basic Statistics', 'NumPy & Pandas'],
    skillsToImproveDefault: ['Deep Learning Fundamentals', 'PyTorch Architecture'],
    missingSkillsDefault: ['Transformer Models & Attention', 'LangChain & Agentic Workflows', 'Model Quantization & ONNX'],
    readinessScoreDefault: 64,
    roadmap: [
      { stage: 1, title: 'Python Programming & Scientific Computing', description: 'Master object-oriented Python, NumPy vectorization, Pandas data structures, and Matplotlib.', skills: ['Python', 'NumPy', 'Pandas'], duration: '4 Weeks', defaultDone: true },
      { stage: 2, title: 'Mathematics, Probability & Linear Algebra', description: 'Calculus gradients, matrix decompositions, eigenvalues, probability distributions, and Bayes Theorem.', skills: ['Linear Algebra', 'Multivariate Calculus', 'Probability'], duration: '3 Weeks', defaultDone: true },
      { stage: 3, title: 'Machine Learning Algorithms & Scikit-Learn', description: 'Supervised and unsupervised regression, classification, decision trees, random forests, and SVMs.', skills: ['Scikit-Learn', 'Feature Engineering', 'Cross-Validation'], duration: '5 Weeks', defaultDone: false },
      { stage: 4, title: 'Deep Learning & Neural Network Architectures', description: 'Perceptrons, backpropagation, activation functions, CNNs for vision, and RNN/LSTMs.', skills: ['PyTorch', 'TensorFlow', 'CNNs'], duration: '6 Weeks', defaultDone: false },
      { stage: 5, title: 'Natural Language Processing & Transformers', description: 'Tokenization, embeddings (Word2Vec), Attention Mechanism, BERT, and GPT architectures.', skills: ['Hugging Face', 'Transformers', 'NLP'], duration: '5 Weeks', defaultDone: false },
      { stage: 6, title: 'Generative AI, LLMs & Retrieval-Augmented Generation (RAG)', description: 'Prompt engineering, vector databases (Pinecone/Chroma), LangChain, and fine-tuning models.', skills: ['LangChain', 'Vector DBs', 'RAG', 'Llama / Mistral'], duration: '5 Weeks', defaultDone: false },
      { stage: 7, title: 'AI System Deployment & MLOps', description: 'FastAPI model inference servers, Docker containerization, ONNX runtime, and monitoring.', skills: ['FastAPI', 'Docker', 'MLflow', 'Triton'], duration: '4 Weeks', defaultDone: false },
      { stage: 8, title: 'Portfolio Projects, Code Auditing & AI Interviews', description: 'End-to-end multi-agent AI system portfolio, GitHub publication, and mock interviews.', skills: ['System Architecture', 'Ethical AI', 'Interview Prep'], duration: '3 Weeks', defaultDone: false },
    ],
    youtubeVideos: [
      {
        id: 'yt-ai-1',
        title: 'Deep Learning with PyTorch – Full Course',
        channelName: 'freeCodeCamp.org',
        videoId: 'GIsg-ZUy0MY',
        thumbnail: 'https://img.youtube.com/vi/GIsg-ZUy0MY/hqdefault.jpg',
        description: 'Comprehensive PyTorch masterclass covering tensors, autograd, linear regression, CNNs, and GPU training.',
        level: 'Beginner',
        duration: '10 Hours',
        topic: 'PyTorch & Neural Networks',
        language: 'English',
        youtubeUrl: 'https://www.youtube.com/watch?v=GIsg-ZUy0MY',
        embedUrl: 'https://www.youtube.com/embed/GIsg-ZUy0MY',
      },
      {
        id: 'yt-ai-2',
        title: 'Neural Networks: Zero to Hero',
        channelName: 'Andrej Karpathy',
        videoId: 'VMj-3S1tku0',
        thumbnail: 'https://img.youtube.com/vi/VMj-3S1tku0/hqdefault.jpg',
        description: 'Build micrograd, backpropagation and neural networks from absolute mathematical first principles with Andrej Karpathy.',
        level: 'Intermediate',
        duration: '2.5 Hours',
        topic: 'Neural Networks Math',
        language: 'English',
        youtubeUrl: 'https://www.youtube.com/watch?v=VMj-3S1tku0',
        embedUrl: 'https://www.youtube.com/embed/VMj-3S1tku0',
      },
      {
        id: 'yt-ai-3',
        title: 'Let’s build GPT: from scratch, in code, spelled out',
        channelName: 'Andrej Karpathy',
        videoId: 'kCc8FmEb1nY',
        thumbnail: 'https://img.youtube.com/vi/kCc8FmEb1nY/hqdefault.jpg',
        description: 'Complete breakdown of Attention Is All You Need and coding a Generatively Pretrained Transformer from scratch.',
        level: 'Advanced',
        duration: '2 Hours',
        topic: 'Transformers & LLMs',
        language: 'English',
        youtubeUrl: 'https://www.youtube.com/watch?v=kCc8FmEb1nY',
        embedUrl: 'https://www.youtube.com/embed/kCc8FmEb1nY',
      },
      {
        id: 'yt-ai-4',
        title: 'MIT 6.S191: Introduction to Deep Learning',
        channelName: 'MIT OpenCourseWare',
        videoId: 'QDX-1M5Nj7s',
        thumbnail: 'https://img.youtube.com/vi/QDX-1M5Nj7s/hqdefault.jpg',
        description: 'Official MIT flagship course on foundational deep learning, computer vision, audio, and generative models.',
        level: 'Beginner',
        duration: '1.5 Hours',
        topic: 'Deep Learning Foundations',
        language: 'English',
        youtubeUrl: 'https://www.youtube.com/watch?v=QDX-1M5Nj7s',
        embedUrl: 'https://www.youtube.com/embed/QDX-1M5Nj7s',
      },
      {
        id: 'yt-ai-5',
        title: 'LangChain & Vector Databases for Beginners',
        channelName: 'freeCodeCamp.org',
        videoId: 'aywZrzNaKjs',
        thumbnail: 'https://img.youtube.com/vi/aywZrzNaKjs/hqdefault.jpg',
        description: 'Learn how to build AI applications, chatbots and Retrieval Augmented Generation (RAG) using LangChain & Python.',
        level: 'Intermediate',
        duration: '3.5 Hours',
        topic: 'Generative AI & RAG',
        language: 'English',
        youtubeUrl: 'https://www.youtube.com/watch?v=aywZrzNaKjs',
        embedUrl: 'https://www.youtube.com/embed/aywZrzNaKjs',
      },
    ],
    courses: [
      {
        id: 'ai-c1',
        title: 'Deep Learning Specialization',
        provider: 'DeepLearning.AI / Coursera',
        level: 'Intermediate',
        duration: '3 Months (5 hrs/week)',
        freeStatus: 'Free Audit',
        skillsLearned: ['Neural Networks', 'Hyperparameter Tuning', 'CNNs', 'Sequence Models'],
        progress: 35,
        courseUrl: 'https://www.coursera.org/specializations/deep-learning',
        description: 'Foundational multi-course series taught by Andrew Ng covering deep learning mathematics and real-world architectures.',
        topics: ['Neural Networks and Deep Learning', 'Improving Deep Neural Networks', 'Structuring Machine Learning Projects', 'Convolutional Neural Networks', 'Sequence Models'],
      },
      {
        id: 'ai-c2',
        title: 'Hugging Face Deep RL & NLP Course',
        provider: 'Hugging Face Open Source',
        level: 'Advanced',
        duration: '40 Hours',
        freeStatus: 'Official Open-Source',
        skillsLearned: ['Transformers', 'BERT', 'Tokenizers', 'Fine-Tuning', 'Datasets'],
        progress: 10,
        courseUrl: 'https://huggingface.co/learn',
        description: 'Official community-driven interactive course for working with open-source foundation models and transfer learning.',
        topics: ['Transformer Models', 'Using Transformers Library', 'Fine-Tuning a Pretrained Model', 'Sharing Models and Tokenizers'],
      },
    ],
    assessments: [
      { id: 1, question: 'Which activation function is most commonly used in hidden layers of modern deep neural networks to avoid vanishing gradients?', options: ['Sigmoid', 'ReLU (Rectified Linear Unit)', 'Softmax', 'Step Function'], answer: 1, explanation: 'ReLU (max(0, x)) maintains constant non-zero gradient for positive activations, mitigating vanishing gradients.', skillTag: 'Deep Learning' },
      { id: 2, question: 'What is the purpose of the Self-Attention mechanism in the Transformer architecture?', options: ['Downsample image pixels', 'Calculate relevance scores between all tokens in a sequence regardless of distance', 'Compress weights to 8-bit integers', 'Format JSON responses'], answer: 1, explanation: 'Self-attention calculates pairwise attention weights across all tokens in parallel, capturing long-range dependencies.', skillTag: 'Transformers' },
      { id: 3, question: 'What does RAG stand for in modern Generative AI system architecture?', options: ['Randomized Attention Graph', 'Retrieval-Augmented Generation', 'Recursive Autoencoder Gradient', 'Rotational Alignment Grid'], answer: 1, explanation: 'Retrieval-Augmented Generation retrieves external factual documents before passing them to the LLM for grounded answers.', skillTag: 'Generative AI' },
    ],
    mockQuestions: [
      { id: 1, category: 'Technical', question: 'Explain how Backpropagation works mathematically and why gradients can vanish in deep networks.', expectedKeywords: ['chain rule', 'gradients', 'activation derivatives', 'loss function', 'vanishing gradients'], tip: 'Derive partial derivatives through the chain rule and explain how Sigmoid saturation squeezes gradients toward zero.' },
      { id: 2, category: 'System Design', question: 'How would you architect a production RAG system that answers questions over 100,000 PDF documents with sub-second latency?', expectedKeywords: ['chunking', 'embeddings', 'vector database', 'hybrid search', 'reranking', 'caching'], tip: 'Discuss chunk size trade-offs, HNSW indexing in vector databases, and cross-encoder re-ranking.' },
      { id: 3, category: 'Behavioral', question: 'Describe how you evaluate whether an AI model is safe, fair, and reliable before releasing it to production.', expectedKeywords: ['benchmarks', 'hallucination checks', 'bias evaluation', 'guardrails', 'red teaming'], tip: 'Emphasize automated evals, human feedback, and input/output safety guardrails.' },
    ],
    projects: [
      { id: 'ai-p1', title: 'Intelligent Enterprise Document Q&A Agent', level: 'Intermediate', description: 'Build a production Retrieval-Augmented Generation (RAG) assistant using LangChain, ChromaDB, and FastAPI.', tech: ['Python', 'LangChain', 'FastAPI', 'ChromaDB', 'OpenAI / Llama'], progress: 30, objectives: 'Implement semantic chunking, embeddings generation, vector similarity search, and source-attributed answers.' },
      { id: 'ai-p2', title: 'Real-Time Computer Vision Defect Detector', level: 'Advanced', description: 'Train a YOLOv8 object detection model on industrial defect datasets and deploy on an edge device.', tech: ['PyTorch', 'YOLOv8', 'OpenCV', 'Flask'], progress: 0, objectives: 'Collect dataset, annotate bounding boxes, fine-tune YOLO model, and achieve >85% mAP@0.5.' },
    ],
    jobs: [
      { id: 'ai-j1', title: 'Junior AI / ML Engineer', company: 'Persistent Systems', logoText: 'PER', location: 'Bengaluru', type: 'Full-time', salary: '₹8 - 14 LPA', matchScore: 88, description: 'Design, optimize, and deploy machine learning models and NLP pipelines for enterprise clients.', skills: ['Python', 'PyTorch', 'NLP', 'Docker'], applyUrl: 'https://www.persistent.com/careers/' },
      { id: 'ai-j2', title: 'Generative AI Research Intern', company: 'Fractal Analytics', logoText: 'FRC', location: 'Remote / Mumbai', type: 'Internship', salary: '₹40,000 / month', matchScore: 92, description: 'Experiment with open-source LLM fine-tuning, RAG frameworks, and multi-agent coordination.', skills: ['Python', 'LangChain', 'Hugging Face', 'Vector DBs'], applyUrl: 'https://fractal.ai/careers/' },
    ],
  },

  // 2. Data Science
  'data-science': {
    id: 'data-science',
    name: 'Data Science',
    icon: '📊',
    badge: 'TOP CAREER',
    shortDescription: 'Uncover statistical insights, build predictive models, and drive data-driven decision making.',
    overview: 'Data Science bridges statistics, computer science, and business intuition. You will transform messy raw data into predictive algorithms, feature pipelines, and executive insights.',
    roles: ['Data Scientist', 'Associate Data Scientist', 'Predictive Modeling Specialist', 'Applied Scientist'],
    primaryRole: 'Data Scientist',
    avgSalary: '₹7.5 - 18 LPA',
    hiringDemand: '95% Market Demand',
    requiredSkills: ['Python & SQL', 'Exploratory Data Analysis', 'Inferential Statistics', 'Scikit-Learn', 'Feature Engineering', 'Data Storytelling'],
    skillsMasteredDefault: ['SQL Queries', 'Python Basics', 'Pandas & Matplotlib'],
    skillsToImproveDefault: ['Hypothesis Testing', 'Ensemble ML Models (XGBoost)'],
    missingSkillsDefault: ['A/B Testing Frameworks', 'Production Model Deployment', 'Airflow Pipelines'],
    readinessScoreDefault: 70,
    roadmap: [
      { stage: 1, title: 'Python & SQL Foundations for Data Analysis', description: 'Data structures, complex SQL JOINs, window functions, and Pandas dataframes.', skills: ['Python', 'PostgreSQL', 'Pandas'], duration: '4 Weeks', defaultDone: true },
      { stage: 2, title: 'Statistics, Probability & Experimental Design', description: 'Hypothesis testing, p-values, t-tests, ANOVA, confidence intervals, and regression math.', skills: ['Inferential Stats', 'A/B Testing', 'Probability'], duration: '3 Weeks', defaultDone: true },
      { stage: 3, title: 'Data Wrangling, Cleaning & EDA', description: 'Handling missing values, outlier detection with IQR, Seaborn visualizations, and correlation heatmaps.', skills: ['Seaborn', 'Data Cleaning', 'EDA'], duration: '3 Weeks', defaultDone: false },
      { stage: 4, title: 'Feature Engineering & Preprocessing', description: 'One-hot encoding, scaling (StandardScaler/MinMax), PCA dimensionality reduction, and polynomial features.', skills: ['Feature Engineering', 'PCA', 'Data Pipelines'], duration: '4 Weeks', defaultDone: false },
      { stage: 5, title: 'Supervised & Unsupervised Machine Learning', description: 'Linear/Logistic regression, Decision Trees, Random Forests, XGBoost, and K-Means clustering.', skills: ['Scikit-Learn', 'XGBoost', 'Clustering'], duration: '5 Weeks', defaultDone: false },
      { stage: 6, title: 'Model Evaluation, Tuning & Cross-Validation', description: 'ROC-AUC, Precision-Recall trade-offs, GridSearchCV, Bayesian optimization, and bias-variance tradeoff.', skills: ['Model Evaluation', 'Hyperparameter Tuning'], duration: '3 Weeks', defaultDone: false },
      { stage: 7, title: 'Data Storytelling, Dashboards & Streamlit Apps', description: 'Packaging models into interactive web apps using Streamlit and communicating business ROI.', skills: ['Streamlit', 'Data Storytelling', 'Business Metrics'], duration: '3 Weeks', defaultDone: false },
      { stage: 8, title: 'Portfolio Projects, Kaggle & Data Science Interviews', description: 'Publish 3 end-to-end Kaggle/GitHub data science notebooks and master technical take-home tasks.', skills: ['Kaggle', 'Case Studies', 'Interview Prep'], duration: '3 Weeks', defaultDone: false },
    ],
    youtubeVideos: [
      {
        id: 'yt-ds-1',
        title: 'Python for Data Science - Full Course for Beginners',
        channelName: 'freeCodeCamp.org',
        videoId: 'LHBE6Q9XlzI',
        thumbnail: 'https://img.youtube.com/vi/LHBE6Q9XlzI/hqdefault.jpg',
        description: 'Complete 12-hour comprehensive crash course covering Python, NumPy, Pandas, Matplotlib, and Scikit-Learn.',
        level: 'Beginner',
        duration: '12 Hours',
        topic: 'Python & Pandas',
        language: 'English',
        youtubeUrl: 'https://www.youtube.com/watch?v=LHBE6Q9XlzI',
        embedUrl: 'https://www.youtube.com/embed/LHBE6Q9XlzI',
      },
      {
        id: 'yt-ds-2',
        title: 'StatQuest: Machine Learning Fundamentals',
        channelName: 'StatQuest with Josh Starmer',
        videoId: 'Gv9_4yMHFhI',
        thumbnail: 'https://img.youtube.com/vi/Gv9_4yMHFhI/hqdefault.jpg',
        description: 'Clear, intuitive step-by-step mathematical explanations of Bias & Variance, ROC curves, and Cross-Validation.',
        level: 'Beginner',
        duration: '45 Mins',
        topic: 'Statistics & ML Math',
        language: 'English',
        youtubeUrl: 'https://www.youtube.com/watch?v=Gv9_4yMHFhI',
        embedUrl: 'https://www.youtube.com/embed/Gv9_4yMHFhI',
      },
      {
        id: 'yt-ds-3',
        title: 'SQL for Data Science Masterclass',
        channelName: 'freeCodeCamp.org',
        videoId: 'HXV3zeRR3hU',
        thumbnail: 'https://img.youtube.com/vi/HXV3zeRR3hU/hqdefault.jpg',
        description: 'Learn database querying, window functions, CTEs, and aggregation pipelines for data science workflows.',
        level: 'Intermediate',
        duration: '4 Hours',
        topic: 'SQL for Data Science',
        language: 'English',
        youtubeUrl: 'https://www.youtube.com/watch?v=HXV3zeRR3hU',
        embedUrl: 'https://www.youtube.com/embed/HXV3zeRR3hU',
      },
      {
        id: 'yt-ds-4',
        title: 'Feature Engineering & Data Cleaning Guide',
        channelName: 'Ken Jee',
        videoId: 'pAmNNtJ50bU',
        thumbnail: 'https://img.youtube.com/vi/pAmNNtJ50bU/hqdefault.jpg',
        description: 'Practical walkthrough of cleaning real-world datasets, handling missing values, encoding and transforming features.',
        level: 'Intermediate',
        duration: '1 Hour',
        topic: 'Feature Engineering',
        language: 'English',
        youtubeUrl: 'https://www.youtube.com/watch?v=pAmNNtJ50bU',
        embedUrl: 'https://www.youtube.com/embed/pAmNNtJ50bU',
      },
    ],
    courses: [
      {
        id: 'ds-c1',
        title: 'IBM Data Science Professional Certificate',
        provider: 'IBM / Coursera',
        level: 'Beginner',
        duration: '5 Months (4 hrs/week)',
        freeStatus: 'Free Audit',
        skillsLearned: ['Python', 'SQL', 'Data Analysis', 'Data Visualization', 'Machine Learning'],
        progress: 45,
        courseUrl: 'https://www.coursera.org/professional-certificates/ibm-data-science',
        description: 'Industry-standard certificate covering open source tools, data science methodology, databases, and machine learning.',
        topics: ['Data Science Tools', 'Data Analysis with Python', 'Data Visualization with Python', 'Machine Learning with Python'],
      },
    ],
    assessments: [
      { id: 1, question: 'When training a model on an imbalanced classification dataset (e.g. 99% negative, 1% positive), why is Accuracy a misleading evaluation metric?', options: ['Accuracy calculates too slowly', 'A naive model predicting only the majority class achieves 99% accuracy while finding zero positives', 'Accuracy only works on linear models', 'It requires normalization'], answer: 1, explanation: 'In severe class imbalance, accuracy is dominated by the majority class. Precision, Recall, and PR-AUC must be used.', skillTag: 'Model Evaluation' },
      { id: 2, question: 'Which ensemble method builds decision trees sequentially, with each new tree correcting errors made by previous trees?', options: ['Bagging (Random Forest)', 'Boosting (XGBoost / Gradient Boosting)', 'K-Means', 'PCA'], answer: 1, explanation: 'Boosting fits sequential weak learners to the pseudo-residuals of earlier iterations.', skillTag: 'Ensemble Learning' },
    ],
    mockQuestions: [
      { id: 1, category: 'Technical', question: 'Explain the Bias-Variance Tradeoff and how regularization techniques (L1/L2) affect model complexity.', expectedKeywords: ['overfitting', 'underfitting', 'variance', 'bias', 'lasso', 'ridge', 'penalty'], tip: 'Explain how high variance correlates with overfitting, and how L1 (Lasso) promotes sparsity while L2 (Ridge) shrinks weights.' },
      { id: 2, category: 'Behavioral', question: 'How do you translate a complex machine learning prediction result into actionable business insights for non-technical stakeholders?', expectedKeywords: ['storytelling', 'business metrics', 'roi', 'visualization', 'actionable steps'], tip: 'Use concrete business revenue examples and avoid excessive technical jargon.' },
    ],
    projects: [
      { id: 'ds-p1', title: 'Customer Churn Prediction & Lifetime Value System', level: 'Intermediate', description: 'Analyze customer telemetry, build XGBoost prediction model, and explain features using SHAP values.', tech: ['Python', 'Pandas', 'XGBoost', 'SHAP', 'Streamlit'], progress: 65, objectives: 'Identify high-risk churn customers and output feature importance drivers with interactive dashboards.' },
    ],
    jobs: [
      { id: 'ds-j1', title: 'Data Scientist Associate', company: 'Mu Sigma', logoText: 'MS', location: 'Bengaluru', type: 'Full-time', salary: '₹7 - 11 LPA', matchScore: 90, description: 'Analyze retail datasets, build predictive regression models, and present insights to Fortune 500 clients.', skills: ['Python', 'SQL', 'Statistics', 'Tableau'], applyUrl: 'https://www.mu-sigma.com/careers' },
    ],
  },

  // 3. Machine Learning
  'machine-learning': {
    id: 'machine-learning',
    name: 'Machine Learning',
    icon: '🧠',
    badge: 'CORE AI',
    shortDescription: 'Master algorithms, mathematical modeling, deep learning architectures and MLOps pipelines.',
    overview: 'Machine Learning focuses on algorithmic precision, loss function optimization, feature representation, and deploying scalable model inference systems.',
    roles: ['Machine Learning Engineer', 'MLOps Engineer', 'Algorithm Developer', 'Computer Vision Specialist'],
    primaryRole: 'Machine Learning Engineer',
    avgSalary: '₹8.5 - 20 LPA',
    hiringDemand: '96% Market Demand',
    requiredSkills: ['Python', 'Mathematics & Optimization', 'Scikit-Learn', 'PyTorch / TensorFlow', 'MLOps & CI/CD', 'Docker'],
    skillsMasteredDefault: ['Python', 'Calculus', 'Scikit-Learn Models'],
    skillsToImproveDefault: ['PyTorch Model Training', 'Convolutional & Recurrent Networks'],
    missingSkillsDefault: ['MLflow Experiment Tracking', 'Model Quantization', 'Kubernetes Deployment'],
    readinessScoreDefault: 66,
    roadmap: [
      { stage: 1, title: 'Mathematical Optimization & Advanced Python', description: 'Matrix operations, vector spaces, gradient descent optimization, and numerical computing.', skills: ['Linear Algebra', 'Vector Calculus', 'Python OOP'], duration: '4 Weeks', defaultDone: true },
      { stage: 2, title: 'Classical Supervised & Unsupervised Learning', description: 'Formulations for Linear/Logistic regression, SVMs with kernel trick, Naive Bayes, and clustering.', skills: ['Optimization Math', 'Loss Functions', 'Scikit-Learn'], duration: '4 Weeks', defaultDone: true },
      { stage: 3, title: 'Feature Representation & Dimensionality Reduction', description: 'PCA, t-SNE, SVD, feature selection algorithms, and target encoding.', skills: ['PCA', 'Embeddings', 'Feature Selection'], duration: '3 Weeks', defaultDone: false },
      { stage: 4, title: 'Deep Neural Networks with PyTorch', description: 'Custom Dataset and DataLoader pipelines, GPU training loops, gradient clipping, and regularization.', skills: ['PyTorch', 'Backpropagation', 'CUDA'], duration: '5 Weeks', defaultDone: false },
      { stage: 5, title: 'Specialized Architectures: Vision & Time Series', description: 'ResNets, Vision Transformers (ViT), LSTMs, and temporal convolutional networks.', skills: ['Computer Vision', 'Time-Series', 'ResNet'], duration: '5 Weeks', defaultDone: false },
      { stage: 6, title: 'MLOps: Experiment Tracking & Model Registry', description: 'Tracking experiments with MLflow, dataset versioning with DVC, and reproducible pipelines.', skills: ['MLflow', 'DVC', 'Reproducibility'], duration: '4 Weeks', defaultDone: false },
      { stage: 7, title: 'High-Throughput Model Serving & Quantization', description: 'Triton inference server, ONNX export, 8-bit quantization, and low-latency API design.', skills: ['ONNX', 'Triton Server', 'FastAPI'], duration: '4 Weeks', defaultDone: false },
      { stage: 8, title: 'Portfolio Deployment & Machine Learning Interviews', description: 'Deploy live inference microservice on cloud and conquer algorithmic coding interviews.', skills: ['Production Deployment', 'Interview Mastery'], duration: '3 Weeks', defaultDone: false },
    ],
    youtubeVideos: [
      {
        id: 'yt-ml-1',
        title: 'Machine Learning Course for Beginners',
        channelName: 'freeCodeCamp.org',
        videoId: 'NWON88Kw48o',
        thumbnail: 'https://img.youtube.com/vi/NWON88Kw48o/hqdefault.jpg',
        description: 'Learn fundamental ML algorithms in Python using Scikit-Learn: Regression, KNN, SVM, Trees, and Neural Nets.',
        level: 'Beginner',
        duration: '10 Hours',
        topic: 'Machine Learning Algorithms',
        language: 'English',
        youtubeUrl: 'https://www.youtube.com/watch?v=NWON88Kw48o',
        embedUrl: 'https://www.youtube.com/embed/NWON88Kw48o',
      },
      {
        id: 'yt-ml-2',
        title: 'MIT 6.036: Introduction to Machine Learning',
        channelName: 'MIT OpenCourseWare',
        videoId: 'h0e2HAPTGF4',
        thumbnail: 'https://img.youtube.com/vi/h0e2HAPTGF4/hqdefault.jpg',
        description: 'Rigorous academic introduction to the mathematical formulation of machine learning algorithms from MIT.',
        level: 'Intermediate',
        duration: '1 Hour',
        topic: 'Mathematical Formulations',
        language: 'English',
        youtubeUrl: 'https://www.youtube.com/watch?v=h0e2HAPTGF4',
        embedUrl: 'https://www.youtube.com/embed/h0e2HAPTGF4',
      },
    ],
    courses: [
      {
        id: 'ml-c1',
        title: 'Machine Learning Specialization',
        provider: 'DeepLearning.AI / Stanford',
        level: 'Beginner',
        duration: '2 Months (6 hrs/week)',
        freeStatus: 'Free Audit',
        skillsLearned: ['Supervised Learning', 'Advanced Learning Algorithms', 'Unsupervised Learning', 'Recommender Systems'],
        progress: 60,
        courseUrl: 'https://www.coursera.org/specializations/machine-learning-introduction',
        description: 'The updated modern machine learning curriculum co-created by Andrew Ng and Stanford University.',
        topics: ['Supervised Machine Learning', 'Advanced Algorithms', 'Unsupervised Learning and Recommenders'],
      },
    ],
    assessments: [
      { id: 1, question: 'What is the primary difference between L1 (Lasso) and L2 (Ridge) regularization?', options: ['L1 adds absolute penalty driving weights to zero; L2 adds squared penalty shrinking weights smoothly', 'L2 is only for neural networks', 'L1 requires GPU computation', 'There is no difference'], answer: 0, explanation: 'L1 regularization introduces geometric sharp corners at the axes, frequently driving sparse weights to absolute zero.', skillTag: 'Regularization' },
    ],
    mockQuestions: [
      { id: 1, category: 'Technical', question: 'How do you diagnose whether an ML model suffers from high bias vs high variance, and what are the respective remedies?', expectedKeywords: ['learning curves', 'training error', 'validation error', 'regularization', 'more data'], tip: 'Draw mental training vs validation curves. High training error indicates high bias (underfitting); large gap indicates high variance.' },
    ],
    projects: [
      { id: 'ml-p1', title: 'End-to-End Real Estate Price Forecaster with MLOps', level: 'Intermediate', description: 'Train ensemble gradient boosting regressors and track experiments using MLflow with automated testing.', tech: ['Python', 'XGBoost', 'MLflow', 'Docker', 'FastAPI'], progress: 40, objectives: 'Build a production CI/CD pipeline that re-trains model on new data and serves predictions via FastAPI.' },
    ],
    jobs: [
      { id: 'ml-j1', title: 'Machine Learning Engineer', company: 'Tredence Analytics', logoText: 'TRD', location: 'Bengaluru / Hybrid', type: 'Full-time', salary: '₹9 - 16 LPA', matchScore: 86, description: 'Engineer scalable ML inference pipelines, feature stores, and containerized prediction services.', skills: ['Python', 'PyTorch', 'MLflow', 'Docker'], applyUrl: 'https://www.tredence.com/careers' },
    ],
  },

  // 4. Full Stack Development
  'fullstack': {
    id: 'fullstack',
    name: 'Full Stack Development',
    icon: '💻',
    badge: 'EVERGREEN',
    shortDescription: 'Build modern responsive frontends, scalable REST/GraphQL APIs, databases and cloud deployments.',
    overview: 'Full Stack Web Developers craft complete software products end-to-end: reactive user interfaces, authenticated server business logic, relational/NoSQL databases, and cloud hosting.',
    roles: ['Full Stack Developer', 'Frontend Engineer', 'Backend Engineer', 'Software Engineer'],
    primaryRole: 'Full Stack Developer',
    avgSalary: '₹6.5 - 16 LPA',
    hiringDemand: '94% Market Demand',
    requiredSkills: ['HTML5 & Modern CSS', 'JavaScript (ES6+) & TypeScript', 'React.js', 'Node.js & Express.js', 'PostgreSQL / MongoDB', 'REST APIs & Git'],
    skillsMasteredDefault: ['HTML5 & CSS3', 'JavaScript ES6+', 'React.js Components'],
    skillsToImproveDefault: ['Node.js & Express REST APIs', 'MongoDB Document Modeling'],
    missingSkillsDefault: ['SQL & PostgreSQL Migrations', 'Docker & Cloud Deployment', 'Automated Integration Testing'],
    readinessScoreDefault: 68,
    roadmap: [
      { stage: 1, title: 'HTML5, Modern CSS & Responsive Layouts', description: 'Semantic HTML5, CSS Flexbox, Grid, CSS Variables, and mobile-first design principles.', skills: ['Semantic HTML', 'CSS Flexbox', 'CSS Grid'], duration: '3 Weeks', defaultDone: true },
      { stage: 2, title: 'Modern JavaScript (ES6+) Mastery', description: 'Closures, event delegation, Promises, async/await, Array methods, and Fetch API.', skills: ['JavaScript ES6+', 'Async Programming', 'DOM'], duration: '4 Weeks', defaultDone: true },
      { stage: 3, title: 'Frontend Engineering with React.js', description: 'Component state, hooks (useState, useEffect, useMemo), React Router, and Tailwind CSS.', skills: ['React.js', 'Hooks', 'Tailwind CSS', 'React Router'], duration: '5 Weeks', defaultDone: true },
      { stage: 4, title: 'Server-Side Engineering with Node.js & Express', description: 'HTTP server setup, RESTful routes, custom middleware pipeline, and error handling.', skills: ['Node.js', 'Express.js', 'Middleware'], duration: '4 Weeks', defaultDone: false },
      { stage: 5, title: 'Databases: MongoDB (NoSQL) & PostgreSQL (SQL)', description: 'Schema modeling, Mongoose ODM, relational tables, JOINs, indexing, and connection pooling.', skills: ['MongoDB', 'PostgreSQL', 'Mongoose', 'SQL'], duration: '5 Weeks', defaultDone: false },
      { stage: 6, title: 'Authentication, Security & REST API Architecture', description: 'JWT authentication, bcrypt password hashing, CORS security, rate limiting, and OpenAPI docs.', skills: ['JWT', 'Bcrypt', 'REST APIs', 'Security'], duration: '3 Weeks', defaultDone: false },
      { stage: 7, title: 'Full-Stack Integration & Cloud Deployment', description: 'Connecting frontend to backend, Docker containerization, Vercel/Cloud Run deployment, and CI/CD.', skills: ['Docker', 'Cloud Run', 'Vercel', 'CI/CD'], duration: '4 Weeks', defaultDone: false },
      { stage: 8, title: 'Portfolio Showcase, Code Reviews & Technical Interviews', description: 'Launch 2 live production web applications, pass system design and coding mock interviews.', skills: ['System Design', 'Portfolio', 'Technical Interviews'], duration: '3 Weeks', defaultDone: false },
    ],
    youtubeVideos: [
      {
        id: 'yt-fs-1',
        title: 'Full Stack Web Development Course for Beginners',
        channelName: 'freeCodeCamp.org',
        videoId: 'nu_pCVPKzTk',
        thumbnail: 'https://img.youtube.com/vi/nu_pCVPKzTk/hqdefault.jpg',
        description: 'Learn the complete full-stack web development cycle: HTML, CSS, JavaScript, React, Node.js, and MongoDB.',
        level: 'Beginner',
        duration: '8 Hours',
        topic: 'Full Stack Foundation',
        language: 'English',
        youtubeUrl: 'https://www.youtube.com/watch?v=nu_pCVPKzTk',
        embedUrl: 'https://www.youtube.com/embed/nu_pCVPKzTk',
      },
      {
        id: 'yt-fs-2',
        title: 'React 19 & Next.js Full Course 2025',
        channelName: 'JavaScript Mastery',
        videoId: 'bMknfKXIFA8',
        thumbnail: 'https://img.youtube.com/vi/bMknfKXIFA8/hqdefault.jpg',
        description: 'Build modern responsive full stack applications with React components, server actions, and modern styling.',
        level: 'Intermediate',
        duration: '6 Hours',
        topic: 'React & Frontend',
        language: 'English',
        youtubeUrl: 'https://www.youtube.com/watch?v=bMknfKXIFA8',
        embedUrl: 'https://www.youtube.com/embed/bMknfKXIFA8',
      },
      {
        id: 'yt-fs-3',
        title: 'Node.js and Express.js - Full Course',
        channelName: 'freeCodeCamp.org',
        videoId: 'Oe421EPjeBE',
        thumbnail: 'https://img.youtube.com/vi/Oe421EPjeBE/hqdefault.jpg',
        description: 'Learn backend web architecture: Node event loop, Express routing, middleware, controllers, and APIs.',
        level: 'Intermediate',
        duration: '8 Hours',
        topic: 'Node.js & Backend',
        language: 'English',
        youtubeUrl: 'https://www.youtube.com/watch?v=Oe421EPjeBE',
        embedUrl: 'https://www.youtube.com/embed/Oe421EPjeBE',
      },
    ],
    courses: [
      {
        id: 'fs-c1',
        title: 'Meta Front-End & Back-End Developer Certificate',
        provider: 'Meta / Coursera',
        level: 'Intermediate',
        duration: '6 Months (5 hrs/week)',
        freeStatus: 'Free Audit',
        skillsLearned: ['React', 'JavaScript', 'HTML/CSS', 'Python / Django', 'APIs'],
        progress: 68,
        courseUrl: 'https://www.coursera.org/professional-certificates/meta-front-end-developer',
        description: 'Complete curriculum developed by Meta engineers covering both client-side and server-side engineering.',
        topics: ['Introduction to Front-End', 'Programming with JavaScript', 'React Basics', 'Advanced React', 'Coding Interview Prep'],
      },
    ],
    assessments: [
      { id: 1, question: 'Why does React use keys when rendering dynamic arrays of elements?', options: ['To apply CSS styles', 'To identify which items have changed, been added, or removed during reconciliation', 'To connect to database', 'To compile TypeScript'], answer: 1, explanation: 'Keys give elements a stable identity so React can re-order and update items efficiently without re-rendering entire subtrees.', skillTag: 'React' },
      { id: 2, question: 'What does the HTTP 201 status code indicate?', options: ['OK', 'Created (Resource successfully created)', 'Accepted', 'No Content'], answer: 1, explanation: 'HTTP 201 Created signifies that the request succeeded and led to the creation of a new resource.', skillTag: 'REST APIs' },
    ],
    mockQuestions: [
      { id: 1, category: 'Technical', question: 'Can you explain how the JavaScript Event Loop handles the Call Stack, Microtasks (Promises), and Macrotasks (setTimeout)?', expectedKeywords: ['call stack', 'microtask', 'macrotask', 'event loop', 'promises'], tip: 'Microtasks are processed immediately when the call stack clears, before picking the next macrotask.' },
      { id: 2, category: 'System Design', question: 'How would you scale a web application handling 50,000 concurrent active users?', expectedKeywords: ['load balancer', 'stateless servers', 'redis caching', 'database read replicas', 'cdn'], tip: 'Discuss caching layers at CDN and Redis, stateless JWT sessions, and read replicas.' },
    ],
    projects: [
      { id: 'fs-p1', title: 'Production REST API Backend & Auth Microservice', level: 'Intermediate', description: 'Build an authenticated API with JWT, MongoDB Mongoose models, pagination and error handling.', tech: ['Node.js', 'Express', 'MongoDB', 'JWT', 'Postman'], progress: 60, objectives: 'Implement clean MVC architecture, input validation, bcrypt password hashing, and Supertest tests.' },
      { id: 'fs-p2', title: 'E-Commerce Marketplace with Cart & Checkout', level: 'Intermediate', description: 'Full-stack online storefront with product catalog, cart persistence, and simulated payment checkout.', tech: ['React', 'Node.js', 'Express', 'MongoDB', 'Tailwind'], progress: 80, objectives: 'Create responsive UI, shopping cart drawer, order management endpoints, and admin dashboard.' },
    ],
    jobs: [
      { id: 'fs-j1', title: 'Junior Full Stack Developer', company: 'Infosys Careers Portal', logoText: 'INF', location: 'Bengaluru', type: 'Full-time', salary: '₹6 - 9 LPA', matchScore: 92, description: 'Work on enterprise cloud web services using React, Node.js, Express and REST APIs.', skills: ['React', 'Node.js', 'REST APIs', 'Git', 'JavaScript'], applyUrl: 'https://www.infosys.com/careers.html' },
      { id: 'fs-j2', title: 'Frontend React Developer Intern', company: 'Zomato Engineering', logoText: 'ZOM', location: 'Remote', type: 'Internship', salary: '₹35,000 / month', matchScore: 95, description: 'Build fast, accessible customer-facing web interfaces using React and modern CSS frameworks.', skills: ['React', 'HTML', 'CSS', 'JavaScript'], applyUrl: 'https://www.zomato.com/careers' },
    ],
  },

  // 5. Data Analytics
  'data-analytics': {
    id: 'data-analytics',
    name: 'Data Analytics',
    icon: '📈',
    badge: 'HIGH HIRING',
    shortDescription: 'Transform operational business numbers into actionable visual dashboards using SQL, Excel, Power BI and Tableau.',
    overview: 'Data Analysts bridge business stakeholders and databases. You will clean datasets, write analytical SQL queries, compute business KPIs, and publish executive Power BI / Tableau dashboards.',
    roles: ['Data Analyst', 'Business Intelligence Analyst', 'Product Analyst', 'Reporting Analyst', 'Marketing Analyst'],
    primaryRole: 'Data Analyst',
    avgSalary: '₹5.5 - 13 LPA',
    hiringDemand: '93% Market Demand',
    requiredSkills: ['Advanced Excel & DAX', 'SQL (Window Functions, Aggregation)', 'Power BI / Tableau', 'Descriptive Statistics', 'Business KPIs', 'Data Cleaning'],
    skillsMasteredDefault: ['Excel Spreadsheets', 'Basic SQL SELECT & WHERE'],
    skillsToImproveDefault: ['Complex SQL Window Functions', 'Power BI Data Modeling'],
    missingSkillsDefault: ['DAX Measures & Time Intelligence', 'Tableau Advanced Calculations', 'Automated ETL Pipelines'],
    readinessScoreDefault: 72,
    roadmap: [
      { stage: 1, title: 'Advanced Microsoft Excel & Financial Modeling', description: 'VLOOKUP, XLOOKUP, INDEX-MATCH, Pivot Tables, Power Query, and conditional formulas.', skills: ['Excel', 'Pivot Tables', 'Power Query'], duration: '3 Weeks', defaultDone: true },
      { stage: 2, title: 'Relational Databases & SQL for Business Analytics', description: 'GROUP BY, HAVING, subqueries, CTEs, Window Functions (ROW_NUMBER, LEAD/LAG, RANK).', skills: ['SQL', 'Window Functions', 'CTEs'], duration: '4 Weeks', defaultDone: true },
      { stage: 3, title: 'Business Statistics & Metric Definitions', description: 'Mean, median, variance, standard deviation, churn rate, customer acquisition cost (CAC), LTV, ROI.', skills: ['Business KPIs', 'Statistics', 'ROI Analysis'], duration: '3 Weeks', defaultDone: true },
      { stage: 4, title: 'Business Intelligence with Microsoft Power BI', description: 'Data modeling (star schema), relationships, DAX formulas, interactive slicers, and KPI cards.', skills: ['Power BI', 'DAX', 'Star Schema'], duration: '4 Weeks', defaultDone: false },
      { stage: 5, title: 'Visual Analytics with Tableau', description: 'Calculated fields, parameters, dual-axis charts, dashboard actions, and Tableau Public portfolio.', skills: ['Tableau', 'Visualizations', 'Storyboards'], duration: '4 Weeks', defaultDone: false },
      { stage: 6, title: 'Exploratory Python for Analysts', description: 'Using Pandas for automated data cleaning, automated Excel report generation, and Matplotlib charts.', skills: ['Python', 'Pandas', 'Automated Reports'], duration: '3 Weeks', defaultDone: false },
      { stage: 7, title: 'Executive Presentation & Data Storytelling', description: 'Communicating findings, structuring business executive summaries, and stakeholder management.', skills: ['Storytelling', 'Executive Summaries', 'Slide Decks'], duration: '2 Weeks', defaultDone: false },
      { stage: 8, title: 'Portfolio Dashboards & Business Analyst Interviews', description: 'Publish 3 interactive public dashboards on Tableau Public / NovyPro and practice SQL case interviews.', skills: ['Tableau Public', 'SQL Case Studies', 'Interviews'], duration: '3 Weeks', defaultDone: false },
    ],
    youtubeVideos: [
      {
        id: 'yt-da-1',
        title: 'Data Analyst Bootcamp for Beginners (Full Course)',
        channelName: 'Alex The Analyst',
        videoId: 'PSNXoAs28hw',
        thumbnail: 'https://img.youtube.com/vi/PSNXoAs28hw/hqdefault.jpg',
        description: 'Complete full guide to becoming a Data Analyst: SQL, Excel, Tableau, Power BI, and Portfolio building.',
        level: 'Beginner',
        duration: '7 Hours',
        topic: 'Data Analytics Overview',
        language: 'English',
        youtubeUrl: 'https://www.youtube.com/watch?v=PSNXoAs28hw',
        embedUrl: 'https://www.youtube.com/embed/PSNXoAs28hw',
      },
      {
        id: 'yt-da-2',
        title: 'Power BI Full Course - Learn Power BI in 4 Hours',
        channelName: 'freeCodeCamp.org',
        videoId: '3u7MQz1EyPY',
        thumbnail: 'https://img.youtube.com/vi/3u7MQz1EyPY/hqdefault.jpg',
        description: 'Hands-on project-based Power BI training: data transformation, DAX calculations, and interactive report design.',
        level: 'Intermediate',
        duration: '4 Hours',
        topic: 'Power BI & DAX',
        language: 'English',
        youtubeUrl: 'https://www.youtube.com/watch?v=3u7MQz1EyPY',
        embedUrl: 'https://www.youtube.com/embed/3u7MQz1EyPY',
      },
    ],
    courses: [
      {
        id: 'da-c1',
        title: 'Google Data Analytics Professional Certificate',
        provider: 'Google / Coursera',
        level: 'Beginner',
        duration: '6 Months',
        freeStatus: 'Free Audit',
        skillsLearned: ['Spreadsheets', 'SQL', 'Tableau', 'R Programming', 'Data Ethics'],
        progress: 75,
        courseUrl: 'https://www.coursera.org/professional-certificates/google-data-analytics',
        description: 'Official Google entry-level certificate program preparing students for in-demand data analyst jobs.',
        topics: ['Ask Questions to Make Data-Driven Decisions', 'Prepare Data for Exploration', 'Process Data from Dirty to Clean', 'Analyze Data to Answer Questions', 'Share Data Through Visualization'],
      },
    ],
    assessments: [
      { id: 1, question: 'In SQL, what is the main purpose of the DENSE_RANK() window function compared to RANK()?', options: ['DENSE_RANK() assigns consecutive rankings without leaving gaps between ties', 'It ignores ties', 'It only ranks negative numbers', 'It works on text only'], answer: 0, explanation: 'Unlike RANK() which leaves gaps (1, 2, 2, 4), DENSE_RANK() generates continuous numbers (1, 2, 2, 3).', skillTag: 'SQL' },
    ],
    mockQuestions: [
      { id: 1, category: 'Technical', question: 'How do you structure a star schema for an e-commerce company, and what is the difference between fact and dimension tables?', expectedKeywords: ['fact table', 'dimension table', 'foreign keys', 'surrogate keys', 'star schema'], tip: 'Facts store measurable quantitative events (sales amounts, quantities); dimensions store context (customer, product, date).' },
    ],
    projects: [
      { id: 'da-p1', title: 'Executive Sales & Revenue KPI Dashboard', level: 'Intermediate', description: 'Design an interactive Power BI dashboard tracking monthly recurring revenue, customer churn, and regional sales.', tech: ['Power BI', 'SQL', 'DAX', 'Excel'], progress: 70, objectives: 'Build star schema data model, create DAX measures for Year-Over-Year growth, and publish interactive report.' },
    ],
    jobs: [
      { id: 'da-j1', title: 'Data Analyst Intern', company: 'Swiggy Careers', logoText: 'SWG', location: 'Bengaluru', type: 'Internship', salary: '₹30,000 / month', matchScore: 94, description: 'Analyze operational delivery metrics, write SQL data queries, and design business KPI dashboards.', skills: ['SQL', 'Excel', 'Power BI', 'Problem Solving'], applyUrl: 'https://careers.swiggy.com/' },
    ],
  },

  // 6. Cybersecurity
  'cybersecurity': {
    id: 'cybersecurity',
    name: 'Cybersecurity',
    icon: '🛡️',
    badge: 'CRITICAL SECURITY',
    shortDescription: 'Defend systems, analyze network traffic, perform vulnerability assessments, and safeguard digital infrastructure.',
    overview: 'Cybersecurity professionals protect organizations against unauthorized access, data breaches, ransomware, and vulnerabilities through proactive penetration testing and continuous defensive SOC operations.',
    roles: ['Security Analyst', 'SOC Analyst (Tier 1/2)', 'Penetration Tester / Ethical Hacker', 'Security Engineer', 'Information Security Officer'],
    primaryRole: 'Security Analyst',
    avgSalary: '₹6.0 - 17 LPA',
    hiringDemand: '96% Market Demand',
    requiredSkills: ['Networking (TCP/IP, DNS, OSI)', 'Linux Administration & Bash', 'Vulnerability Assessment (Nmap, Wireshark)', 'Security Information & Event Management (SIEM)', 'OWASP Top 10', 'Cryptography Basics'],
    skillsMasteredDefault: ['Networking Basics', 'Basic Linux Commands'],
    skillsToImproveDefault: ['Wireshark Packet Analysis', 'SIEM Log Triage (Splunk)'],
    missingSkillsDefault: ['Vulnerability Exploitation Labs', 'Active Directory Security', 'Incident Response Playbooks'],
    readinessScoreDefault: 62,
    roadmap: [
      { stage: 1, title: 'Computer Networking & Protocol Fundamentals', description: 'OSI 7-layer model, TCP/IP handshake, subnetting, CIDR, DNS, HTTP/S, and packet routing.', skills: ['Networking', 'TCP/IP', 'Subnetting', 'Wireshark'], duration: '4 Weeks', defaultDone: true },
      { stage: 2, title: 'Linux System Administration & Shell Scripting', description: 'File permissions, process management, systemd services, SSH hardening, and automated Bash scripts.', skills: ['Linux', 'Bash', 'SSH', 'File Permissions'], duration: '3 Weeks', defaultDone: true },
      { stage: 3, title: 'Network Security, Scanning & Packet Inspection', description: 'Port scanning with Nmap, packet dissection in Wireshark, firewalls (iptables/UFW), and IDS/IPS.', skills: ['Nmap', 'Wireshark', 'Firewalls', 'Suricata'], duration: '4 Weeks', defaultDone: false },
      { stage: 4, title: 'Web Application Security & OWASP Top 10', description: 'SQL Injection, XSS, CSRF, broken access control, server-side request forgery (SSRF), and Burp Suite.', skills: ['OWASP Top 10', 'Burp Suite', 'Web Security'], duration: '5 Weeks', defaultDone: false },
      { stage: 5, title: 'Defensive Security & SIEM Operations', description: 'Log ingestion, analyzing security event telemetry with Splunk, ELK stack, and malware detection.', skills: ['SIEM', 'Splunk', 'Log Analysis', 'SOC'], duration: '4 Weeks', defaultDone: false },
      { stage: 6, title: 'Cryptography & Public Key Infrastructure (PKI)', description: 'Symmetric (AES) vs Asymmetric (RSA/ECC) encryption, hashing (SHA-256), SSL/TLS, and digital signatures.', skills: ['Cryptography', 'PKI', 'TLS / SSL', 'Hashing'], duration: '3 Weeks', defaultDone: false },
      { stage: 7, title: 'Incident Response, Forensics & Active Directory', description: 'Memory forensics (Volatility), Kerberos attacks, privilege escalation, and containment playbooks.', skills: ['Incident Response', 'Active Directory', 'Forensics'], duration: '4 Weeks', defaultDone: false },
      { stage: 8, title: 'Hands-On Labs (TryHackMe), Certifications & Interviews', description: 'Complete TryHackMe / HackTheBox learning pathways and prepare for Security+ / CEH interviews.', skills: ['TryHackMe', 'HackTheBox', 'Interview Prep'], duration: '3 Weeks', defaultDone: false },
    ],
    youtubeVideos: [
      {
        id: 'yt-sec-1',
        title: 'Cybersecurity for Beginners | Full Course',
        channelName: 'freeCodeCamp.org',
        videoId: 'U_P23SqJaDc',
        thumbnail: 'https://img.youtube.com/vi/U_P23SqJaDc/hqdefault.jpg',
        description: 'Complete foundational cybersecurity overview: threats, network protocols, cryptography, and defense concepts.',
        level: 'Beginner',
        duration: '4 Hours',
        topic: 'Cybersecurity Fundamentals',
        language: 'English',
        youtubeUrl: 'https://www.youtube.com/watch?v=U_P23SqJaDc',
        embedUrl: 'https://www.youtube.com/embed/U_P23SqJaDc',
      },
      {
        id: 'yt-sec-2',
        title: 'NetworkChuck - Ethical Hacking & Wireshark',
        channelName: 'NetworkChuck',
        videoId: 'lb1Ukws5WvE',
        thumbnail: 'https://img.youtube.com/vi/lb1Ukws5WvE/hqdefault.jpg',
        description: 'Learn Wireshark packet capture analysis, TCP three-way handshakes, and spotting rogue network activity.',
        level: 'Intermediate',
        duration: '45 Mins',
        topic: 'Network Packet Analysis',
        language: 'English',
        youtubeUrl: 'https://www.youtube.com/watch?v=lb1Ukws5WvE',
        embedUrl: 'https://www.youtube.com/embed/lb1Ukws5WvE',
      },
    ],
    courses: [
      {
        id: 'sec-c1',
        title: 'Google Cybersecurity Professional Certificate',
        provider: 'Google / Coursera',
        level: 'Beginner',
        duration: '6 Months',
        freeStatus: 'Free Audit',
        skillsLearned: ['Linux', 'SQL', 'SIEM Tools (Splunk)', 'Python Automation', 'Incident Response'],
        progress: 30,
        courseUrl: 'https://www.coursera.org/professional-certificates/google-cybersecurity',
        description: 'Comprehensive program designed to prepare students for entry-level cybersecurity analyst positions.',
        topics: ['Play It Safe: Manage Security Risks', 'Connect and Protect: Networks and Network Security', 'Tools of the Trade: Linux and SQL'],
      },
    ],
    assessments: [
      { id: 1, question: 'Which type of cyber attack tricks a database into executing malicious query commands by injecting unescaped input characters?', options: ['Distributed Denial of Service (DDoS)', 'SQL Injection (SQLi)', 'Cross-Site Scripting (XSS)', 'Man-in-the-Middle (MitM)'], answer: 1, explanation: 'SQL Injection occurs when untrusted user input is directly concatenated into dynamic SQL queries.', skillTag: 'Web Security' },
    ],
    mockQuestions: [
      { id: 1, category: 'Technical', question: 'Walk me through the TCP 3-Way Handshake and explain what happens during a SYN Flood denial of service attack.', expectedKeywords: ['SYN', 'SYN-ACK', 'ACK', 'backlog queue', 'half-open connections', 'syn cookies'], tip: 'Explain how spoofed IPs fill the server connection backlog queue without ever sending the completing ACK.' },
    ],
    projects: [
      { id: 'sec-p1', title: 'Automated Network Vulnerability & Port Scanner', level: 'Intermediate', description: 'Write a Python network scanner that queries open ports, detects banner headers, and highlights common CVEs.', tech: ['Python', 'Sockets', 'Nmap', 'Linux'], progress: 25, objectives: 'Inspect network subnets, parse service banners, flag outdated software versions, and generate PDF security reports.' },
    ],
    jobs: [
      { id: 'sec-j1', title: 'Junior SOC Analyst', company: 'Wipro CyberDefense Center', logoText: 'WIP', location: 'Hyderabad', type: 'Full-time', salary: '₹5 - 8.5 LPA', matchScore: 84, description: 'Monitor enterprise SIEM alerts, triage phishing reports, and execute incident containment procedures.', skills: ['SIEM', 'Network Protocols', 'Wireshark', 'Splunk'], applyUrl: 'https://careers.wipro.com/' },
    ],
  },

  // 7. Cloud Computing
  'cloud-computing': {
    id: 'cloud-computing',
    name: 'Cloud Computing',
    icon: '☁️',
    badge: 'ENTERPRISE',
    shortDescription: 'Architect resilient cloud infrastructure on AWS, Azure and GCP with serverless and container services.',
    overview: 'Cloud Engineers build, deploy, and operate resilient multi-region infrastructure using cloud providers like Amazon Web Services (AWS), Google Cloud (GCP), and Microsoft Azure.',
    roles: ['Cloud Engineer', 'Cloud Support Associate', 'Cloud Solutions Architect', 'Cloud Security Specialist'],
    primaryRole: 'Cloud Engineer',
    avgSalary: '₹7 - 18 LPA',
    hiringDemand: '95% Market Demand',
    requiredSkills: ['AWS / Azure / GCP Core Services', 'Linux & Networking', 'IAM & Cloud Security', 'Storage (S3, EBS, Blob)', 'Serverless (Lambda, Cloud Run)', 'Infrastructure as Code (Terraform)'],
    skillsMasteredDefault: ['Linux Basics', 'Core Virtual Machine Concepts'],
    skillsToImproveDefault: ['AWS VPC Subnets & Routing', 'Identity and Access Management (IAM)'],
    missingSkillsDefault: ['Terraform Infrastructure as Code', 'Serverless Architecture', 'Cost Optimization'],
    readinessScoreDefault: 65,
    roadmap: [
      { stage: 1, title: 'Cloud Core Concepts & Global Infrastructure', description: 'Regions, Availability Zones, Edge locations, IaaS vs PaaS vs SaaS, and shared responsibility model.', skills: ['Cloud Fundamentals', 'High Availability'], duration: '3 Weeks', defaultDone: true },
      { stage: 2, title: 'Compute Services: EC2, Virtual Machines & Auto-Scaling', description: 'Launching instances, SSH access, security groups, launch templates, and horizontal auto-scalers.', skills: ['AWS EC2', 'Auto-Scaling', 'AMI'], duration: '4 Weeks', defaultDone: true },
      { stage: 3, title: 'Cloud Networking: VPC, Subnets & Gateways', description: 'Virtual Private Clouds, public/private subnets, Route Tables, NAT Gateways, and Network ACLs.', skills: ['VPC', 'Subnets', 'NAT Gateways', 'Route 53'], duration: '4 Weeks', defaultDone: false },
      { stage: 4, title: 'Cloud Storage & Databases', description: 'Object storage (S3/GCS), block storage (EBS), managed relational databases (RDS/Cloud SQL), and NoSQL (DynamoDB).', skills: ['Amazon S3', 'AWS RDS', 'DynamoDB'], duration: '4 Weeks', defaultDone: false },
      { stage: 5, title: 'Security, Identity & Governance (IAM)', description: 'Users, Groups, IAM Roles, least-privilege policies, multi-factor authentication, and CloudTrail auditing.', skills: ['IAM Roles', 'Policies', 'CloudTrail', 'KMS'], duration: '3 Weeks', defaultDone: false },
      { stage: 6, title: 'Serverless Compute & Container Services', description: 'AWS Lambda / GCP Cloud Functions, event triggers, ECS, and containerized Cloud Run deployments.', skills: ['AWS Lambda', 'Serverless', 'ECS / Cloud Run'], duration: '4 Weeks', defaultDone: false },
      { stage: 7, title: 'Infrastructure as Code (IaC) with Terraform', description: 'Declaring repeatable cloud infrastructure state, variables, modules, and terraform apply workflows.', skills: ['Terraform', 'IaC', 'HCL'], duration: '4 Weeks', defaultDone: false },
      { stage: 8, title: 'Cloud Certifications & Solutions Architecture Interviews', description: 'Prepare for AWS Certified Solutions Architect Associate / Cloud Practitioner exam and interviews.', skills: ['AWS Certification', 'System Design', 'Interview Prep'], duration: '3 Weeks', defaultDone: false },
    ],
    youtubeVideos: [
      {
        id: 'yt-cc-1',
        title: 'AWS Certified Cloud Practitioner - Full Course',
        channelName: 'freeCodeCamp.org',
        videoId: 'SOTamWNgDKc',
        thumbnail: 'https://img.youtube.com/vi/SOTamWNgDKc/hqdefault.jpg',
        description: 'Complete 14-hour comprehensive training course covering all foundational AWS services and architectural principles.',
        level: 'Beginner',
        duration: '14 Hours',
        topic: 'AWS Cloud Fundamentals',
        language: 'English',
        youtubeUrl: 'https://www.youtube.com/watch?v=SOTamWNgDKc',
        embedUrl: 'https://www.youtube.com/embed/SOTamWNgDKc',
      },
    ],
    courses: [
      {
        id: 'cc-c1',
        title: 'AWS Cloud Solutions Architect Path',
        provider: 'AWS Skill Builder',
        level: 'Intermediate',
        duration: '40 Hours',
        freeStatus: 'Official Open-Source',
        skillsLearned: ['Compute', 'VPC Networking', 'High Availability', 'Storage', 'Security'],
        progress: 50,
        courseUrl: 'https://explore.skillbuilder.aws/',
        description: 'Official free technical learning pathway directly from Amazon Web Services.',
        topics: ['Architecting on AWS', 'Networking and Content Delivery', 'Compute and Storage Services'],
      },
    ],
    assessments: [
      { id: 1, question: 'In a secure cloud VPC design, in which subnet should your production database cluster reside?', options: ['Public subnet with an assigned elastic IP', 'Private subnet with no direct inbound internet route', 'Edge location', 'Default VPC only'], answer: 1, explanation: 'Databases should always be placed in isolated private subnets, accessible only through application servers or bastion hosts.', skillTag: 'VPC Networking' },
    ],
    mockQuestions: [
      { id: 1, category: 'Technical', question: 'How does an Application Load Balancer differ from a Network Load Balancer in AWS?', expectedKeywords: ['Layer 7', 'Layer 4', 'HTTP/HTTPS', 'TCP/UDP', 'latency', 'path-based routing'], tip: 'ALB operates at Layer 7 enabling path and header routing; NLB operates at Layer 4 for ultra-high throughput and ultra-low latency.' },
    ],
    projects: [
      { id: 'cc-p1', title: 'High-Availability Multi-Tier Web Architecture on AWS', level: 'Intermediate', description: 'Deploy a resilient web application with Auto-Scaling EC2 instances, S3 media hosting, and RDS across 2 Availability Zones.', tech: ['AWS EC2', 'VPC', 'RDS', 'S3', 'ALB'], progress: 40, objectives: 'Configure multi-AZ redundancy, health checks, automated database backups, and SSL certificates.' },
    ],
    jobs: [
      { id: 'cc-j1', title: 'Cloud Support Associate', company: 'Amazon Web Services (AWS)', logoText: 'AWS', location: 'Bengaluru / Hyderabad', type: 'Full-time', salary: '₹9 - 15 LPA', matchScore: 88, description: 'Troubleshoot customer architectural questions across EC2, VPC, S3, IAM, and database configurations.', skills: ['AWS Core', 'Linux', 'Networking', 'Troubleshooting'], applyUrl: 'https://www.amazon.jobs/' },
    ],
  },

  // 8. DevOps Engineering
  'devops': {
    id: 'devops',
    name: 'DevOps Engineering',
    icon: '⚙️',
    badge: 'HIGH DEMAND',
    shortDescription: 'Automate build pipelines, manage Docker containers, orchestrate Kubernetes clusters, and achieve continuous delivery.',
    overview: 'DevOps engineers bridge software development and IT operations through automated CI/CD pipelines, container orchestration, GitOps, and observability monitoring.',
    roles: ['DevOps Engineer', 'Site Reliability Engineer (SRE)', 'Platform Engineer', 'Build & Release Engineer'],
    primaryRole: 'DevOps Engineer',
    avgSalary: '₹7.5 - 20 LPA',
    hiringDemand: '96% Market Demand',
    requiredSkills: ['Linux & Shell Scripting', 'Git & GitHub Actions', 'Docker Containerization', 'Kubernetes Orchestration', 'CI/CD Pipelines', 'Prometheus & Grafana'],
    skillsMasteredDefault: ['Git Commands', 'Basic Linux Shell'],
    skillsToImproveDefault: ['Docker Multi-Stage Builds', 'GitHub Actions Workflows'],
    missingSkillsDefault: ['Kubernetes Manifests & Services', 'Helm Package Management', 'Prometheus & Grafana Alerts'],
    readinessScoreDefault: 60,
    roadmap: [
      { stage: 1, title: 'Linux Administration & Advanced Shell Scripting', description: 'Bash automation, cron jobs, file systems, process management, networking troubleshooting tools (curl, netstat).', skills: ['Linux', 'Bash', 'Networking'], duration: '3 Weeks', defaultDone: true },
      { stage: 2, title: 'Version Control Mastery & Git Branching Workflows', description: 'Git hooks, interactive rebase, pull requests, semantic versioning, and trunk-based development.', skills: ['Git', 'Branching', 'Hooks'], duration: '2 Weeks', defaultDone: true },
      { stage: 3, title: 'Docker Containerization Fundamentals', description: 'Dockerfiles, container caching layers, multi-stage builds, minimal alpine images, and Docker Compose.', skills: ['Docker', 'Multi-stage Builds', 'Docker Compose'], duration: '4 Weeks', defaultDone: false },
      { stage: 4, title: 'Continuous Integration with GitHub Actions / Jenkins', description: 'Automated test runners, build pipelines, linting, secret management, and publishing Docker images.', skills: ['CI/CD', 'GitHub Actions', 'Jenkins'], duration: '4 Weeks', defaultDone: false },
      { stage: 5, title: 'Kubernetes (K8s) Cluster Orchestration', description: 'Pods, Deployments, ReplicaSets, Services (ClusterIP/NodePort/LoadBalancer), ConfigMaps, and Secrets.', skills: ['Kubernetes', 'K8s Deployments', 'Pods'], duration: '6 Weeks', defaultDone: false },
      { stage: 6, title: 'Helm Charts & GitOps with ArgoCD', description: 'Templating Kubernetes manifests with Helm charts, automated GitOps deployments with ArgoCD.', skills: ['Helm', 'ArgoCD', 'GitOps'], duration: '4 Weeks', defaultDone: false },
      { stage: 7, title: 'Observability: Prometheus, Grafana & ELK Stack', description: 'Collecting metrics, designing real-time Grafana dashboards, alerting rules, and centralized log indexing.', skills: ['Prometheus', 'Grafana', 'Log Aggregation'], duration: '4 Weeks', defaultDone: false },
      { stage: 8, title: 'SRE Practices, Chaos Engineering & DevOps Interviews', description: 'SLAs, SLOs, SLIs, error budgets, post-mortem incident documentation, and technical interviews.', skills: ['SRE', 'SLO / SLA', 'Interview Prep'], duration: '3 Weeks', defaultDone: false },
    ],
    youtubeVideos: [
      {
        id: 'yt-do-1',
        title: 'DevOps Bootcamp - 24 Hour Full Course',
        channelName: 'TechWorld with Nana',
        videoId: '9pZ2xmsSDdo',
        thumbnail: 'https://img.youtube.com/vi/9pZ2xmsSDdo/hqdefault.jpg',
        description: 'The premier industry introduction to Linux, Git, Docker, Kubernetes, CI/CD, and Terraform.',
        level: 'Beginner',
        duration: '24 Hours',
        topic: 'Complete DevOps Overview',
        language: 'English',
        youtubeUrl: 'https://www.youtube.com/watch?v=9pZ2xmsSDdo',
        embedUrl: 'https://www.youtube.com/embed/9pZ2xmsSDdo',
      },
      {
        id: 'yt-do-2',
        title: 'Kubernetes Course for Beginners',
        channelName: 'freeCodeCamp.org',
        videoId: 'X48VuDVv0do',
        thumbnail: 'https://img.youtube.com/vi/X48VuDVv0do/hqdefault.jpg',
        description: 'Learn Kubernetes concepts: Pods, Services, Deployments, Volume storage, and Ingress routing in 4 hours.',
        level: 'Intermediate',
        duration: '4 Hours',
        topic: 'Kubernetes Orchestration',
        language: 'English',
        youtubeUrl: 'https://www.youtube.com/watch?v=X48VuDVv0do',
        embedUrl: 'https://www.youtube.com/embed/X48VuDVv0do',
      },
    ],
    courses: [
      {
        id: 'do-c1',
        title: 'IBM DevOps and Software Engineering Certificate',
        provider: 'IBM / Coursera',
        level: 'Intermediate',
        duration: '6 Months',
        freeStatus: 'Free Audit',
        skillsLearned: ['DevOps Culture', 'Linux', 'Git', 'Python', 'Docker', 'Kubernetes'],
        progress: 25,
        courseUrl: 'https://www.coursera.org/professional-certificates/devops-and-software-engineering',
        description: 'Comprehensive program preparing engineers to automate, test, and release cloud-native microservices.',
        topics: ['Introduction to DevOps', 'Linux Commands & Shell Scripting', 'Git and GitHub', 'Containers & Kubernetes'],
      },
    ],
    assessments: [
      { id: 1, question: 'What is the main role of a Kubernetes Service of type "ClusterIP"?', options: ['Expose the pod directly to the public internet', 'Provide an internal stable IP address and DNS name accessible only within the cluster', 'Delete pods when memory spikes', 'Format Dockerfiles'], answer: 1, explanation: 'ClusterIP provides a stable internal virtual IP for communication between microservices inside the cluster.', skillTag: 'Kubernetes' },
    ],
    mockQuestions: [
      { id: 1, category: 'Technical', question: 'How do you achieve Zero-Downtime deployments using Rolling Updates and Blue-Green strategies in Kubernetes?', expectedKeywords: ['rolling update', 'readiness probe', 'liveness probe', 'blue green', 'traffic shifting'], tip: 'Explain how readiness probes ensure new pods are healthy before the previous revision pods are terminated.' },
    ],
    projects: [
      { id: 'do-p1', title: 'Automated CI/CD Pipeline & Kubernetes Deployment', level: 'Intermediate', description: 'Build a GitHub Actions workflow that runs unit tests, builds Docker image, scans vulnerabilities, and deploys to K8s.', tech: ['GitHub Actions', 'Docker', 'Kubernetes', 'Helm'], progress: 50, objectives: 'Automate build and deployment on push, configure rollback on failed test, and set up health probes.' },
    ],
    jobs: [
      { id: 'do-j1', title: 'Associate DevOps Engineer', company: 'Cognizant Cloud Infrastructure', logoText: 'COG', location: 'Pune / Remote', type: 'Full-time', salary: '₹6.5 - 11 LPA', matchScore: 85, description: 'Manage CI/CD build scripts, maintain Docker images, and support Kubernetes application clusters.', skills: ['Docker', 'Git', 'Linux', 'Jenkins'], applyUrl: 'https://careers.cognizant.com/' },
    ],
  },

  // 9. Python Development
  'python-dev': {
    id: 'python-dev',
    name: 'Python Development',
    icon: '🐍',
    badge: 'POPULAR',
    shortDescription: 'Build backend web services, automation scripts, web scrapers and API systems with modern Python.',
    overview: 'Python Developers build robust backend services with FastAPI/Django, automate complex data pipelines, build web scrapers, and develop scalable integrations.',
    roles: ['Python Developer', 'Backend Python Engineer', 'Automation Engineer', 'Software Developer'],
    primaryRole: 'Python Developer',
    avgSalary: '₹6 - 15 LPA',
    hiringDemand: '95% Market Demand',
    requiredSkills: ['Python 3 (OOP, Generators, Decorators)', 'FastAPI / Django', 'PostgreSQL & SQLAlchemy', 'Asynchronous Python (asyncio)', 'Unit Testing (pytest)', 'Docker'],
    skillsMasteredDefault: ['Basic Python Syntax', 'Loops & Functions'],
    skillsToImproveDefault: ['Object-Oriented Python & Dunder Methods', 'FastAPI REST APIs'],
    missingSkillsDefault: ['Asyncio & Concurrency', 'SQLAlchemy ORM', 'Pytest Test Suites'],
    readinessScoreDefault: 74,
    roadmap: [
      { stage: 1, title: 'Core Python 3 & Data Structures', description: 'Lists, dictionaries, sets, tuples, list comprehensions, slicing, and clean PEP8 styling.', skills: ['Python 3', 'Data Structures', 'PEP 8'], duration: '3 Weeks', defaultDone: true },
      { stage: 2, title: 'Object-Oriented Programming & Advanced Features', description: 'Classes, inheritance, magic methods (__init__, __repr__), decorators, generators, and context managers.', skills: ['OOP', 'Decorators', 'Generators'], duration: '3 Weeks', defaultDone: true },
      { stage: 3, title: 'Asynchronous Programming with asyncio', description: 'Event loop, async/await, coroutines, tasks, and concurrent network requests with aiohttp.', skills: ['asyncio', 'Concurrency', 'aiohttp'], duration: '3 Weeks', defaultDone: false },
      { stage: 4, title: 'FastAPI High-Performance REST APIs', description: 'Path parameters, Pydantic validation, dependency injection, authentication, and Swagger docs.', skills: ['FastAPI', 'Pydantic', 'REST APIs'], duration: '4 Weeks', defaultDone: false },
      { stage: 5, title: 'Database Integration with SQLAlchemy & Alembic', description: 'Relational modeling, async sessions, foreign keys, and database migrations with Alembic.', skills: ['SQLAlchemy', 'PostgreSQL', 'Alembic'], duration: '4 Weeks', defaultDone: false },
      { stage: 6, title: 'Web Scraping & Automation', description: 'BeautifulSoup, Playwright/Selenium for browser automation, and scheduling with Celery/Redis.', skills: ['BeautifulSoup', 'Playwright', 'Celery'], duration: '3 Weeks', defaultDone: false },
      { stage: 7, title: 'Testing, Packaging & Docker Deployment', description: 'Unit testing with pytest, fixtures, code coverage, poetry dependency management, and Docker containers.', skills: ['pytest', 'Docker', 'Poetry'], duration: '3 Weeks', defaultDone: false },
      { stage: 8, title: 'Full Python Architecture Projects & Interviews', description: 'Build and launch a full production Python backend API and pass Python algorithmic coding tests.', skills: ['Portfolio', 'Algorithms', 'Interviews'], duration: '3 Weeks', defaultDone: false },
    ],
    youtubeVideos: [
      {
        id: 'yt-py-1',
        title: 'Python for Beginners - Full Course [Programming Tutorial]',
        channelName: 'freeCodeCamp.org',
        videoId: 'rfscVS0vtbw',
        thumbnail: 'https://img.youtube.com/vi/rfscVS0vtbw/hqdefault.jpg',
        description: 'Comprehensive 4.5-hour beginner to intermediate guide to mastering Python programming fundamentals.',
        level: 'Beginner',
        duration: '4.5 Hours',
        topic: 'Python Fundamentals',
        language: 'English',
        youtubeUrl: 'https://www.youtube.com/watch?v=rfscVS0vtbw',
        embedUrl: 'https://www.youtube.com/embed/rfscVS0vtbw',
      },
      {
        id: 'yt-py-2',
        title: 'FastAPI - Full Course for Beginners',
        channelName: 'freeCodeCamp.org',
        videoId: '0sOvCWFmrtA',
        thumbnail: 'https://img.youtube.com/vi/0sOvCWFmrtA/hqdefault.jpg',
        description: 'Learn modern Python API development: routing, Pydantic validation, JWT tokens, and PostgreSQL.',
        level: 'Intermediate',
        duration: '19 Hours',
        topic: 'FastAPI Backend',
        language: 'English',
        youtubeUrl: 'https://www.youtube.com/watch?v=0sOvCWFmrtA',
        embedUrl: 'https://www.youtube.com/embed/0sOvCWFmrtA',
      },
    ],
    courses: [
      {
        id: 'py-c1',
        title: 'Python for Everybody Specialization',
        provider: 'University of Michigan / Coursera',
        level: 'Beginner',
        duration: '4 Months',
        freeStatus: 'Free Audit',
        skillsLearned: ['Python Syntax', 'Data Structures', 'Web Scraping', 'Databases', 'JSON APIs'],
        progress: 80,
        courseUrl: 'https://www.coursera.org/specializations/python',
        description: 'The world’s most popular introductory Python course series taught by Dr. Charles Severance.',
        topics: ['Programming for Everybody', 'Python Data Structures', 'Using Python to Access Web Data'],
      },
    ],
    assessments: [
      { id: 1, question: 'What is the purpose of the "yield" keyword in Python functions?', options: ['Terminates the program', 'Turns the function into a generator that produces values lazily without holding them all in memory', 'Imports a module', 'Deletes variables'], answer: 1, explanation: 'yield pauses function execution and returns an intermediate value, creating memory-efficient iterable generators.', skillTag: 'Python Advanced' },
    ],
    mockQuestions: [
      { id: 1, category: 'Technical', question: 'What is Python Global Interpreter Lock (GIL), and how do multiprocessing vs threading differ in Python?', expectedKeywords: ['GIL', 'concurrency', 'CPU-bound', 'I/O-bound', 'multiprocessing', 'threads'], tip: 'GIL permits only one thread to execute Python bytecode at once. Use multiprocessing for CPU-bound tasks, threading/asyncio for I/O.' },
    ],
    projects: [
      { id: 'py-p1', title: 'High-Concurrency Task Manager API with FastAPI', level: 'Intermediate', description: 'Build an asynchronous REST service with Pydantic validation, JWT auth, and PostgreSQL with Alembic.', tech: ['FastAPI', 'PostgreSQL', 'SQLAlchemy', 'Pydantic', 'Docker'], progress: 60, objectives: 'Implement async endpoints, password hashing, automated OpenAPI docs, and Docker containerization.' },
    ],
    jobs: [
      { id: 'py-j1', title: 'Junior Python Developer', company: 'Tata Consultancy Services', logoText: 'TCS', location: 'Bengaluru / Pune', type: 'Full-time', salary: '₹5.5 - 9 LPA', matchScore: 90, description: 'Develop Python backend APIs, database integration scripts, and automated unit testing suites.', skills: ['Python', 'SQL', 'FastAPI', 'Git'], applyUrl: 'https://www.tcs.com/careers' },
    ],
  },

  // 10. Java Development
  'java-dev': {
    id: 'java-dev',
    name: 'Java Development',
    icon: '☕',
    badge: 'ENTERPRISE',
    shortDescription: 'Enterprise software, Spring Boot microservices, high-throughput backend systems and JPA/Hibernate.',
    overview: 'Java powers global banking, enterprise ERP systems, and cloud-scale platforms. You will master Object-Oriented principles, JVM memory, Spring Boot microservices, and relational persistence.',
    roles: ['Java Developer', 'Backend Java Engineer', 'Spring Boot Specialist', 'Enterprise Software Engineer'],
    primaryRole: 'Java Developer',
    avgSalary: '₹6.5 - 17 LPA',
    hiringDemand: '95% Market Demand',
    requiredSkills: ['Core Java (OOP, Collections, Streams)', 'Spring Boot & Spring Data JPA', 'PostgreSQL / MySQL', 'RESTful Microservices', 'Maven / Gradle', 'JUnit & Mockito'],
    skillsMasteredDefault: ['Core Java Syntax', 'OOP Classes & Inheritance'],
    skillsToImproveDefault: ['Collections Framework & Generics', 'Spring Boot REST Controllers'],
    missingSkillsDefault: ['Spring Data JPA & Hibernate', 'Spring Security with JWT', 'Microservices Architecture'],
    readinessScoreDefault: 67,
    roadmap: [
      { stage: 1, title: 'Core Java & Object-Oriented Principles', description: 'Classes, encapsulation, polymorphism, abstraction, interfaces, and exception handling.', skills: ['Core Java', 'OOP', 'Exception Handling'], duration: '4 Weeks', defaultDone: true },
      { stage: 2, title: 'Java Collections Framework & Generics', description: 'ArrayList, LinkedList, HashMap, HashSet, Comparable/Comparator, and generic types.', skills: ['Collections', 'Generics', 'Data Structures'], duration: '3 Weeks', defaultDone: true },
      { stage: 3, title: 'Java 8+ Features: Streams & Lambdas', description: 'Functional interfaces, lambda expressions, Stream API (map, filter, collect), and Optional.', skills: ['Java Streams', 'Lambdas', 'Functional Java'], duration: '3 Weeks', defaultDone: false },
      { stage: 4, title: 'Spring Framework & Spring Boot Basics', description: 'Inversion of Control (IoC), Dependency Injection, Spring Boot starter, and REST controllers.', skills: ['Spring Boot', 'IoC', 'Dependency Injection'], duration: '4 Weeks', defaultDone: false },
      { stage: 5, title: 'Persistence with Spring Data JPA & Hibernate', description: 'Entity mappings, OneToMany/ManyToMany relationships, repositories, and custom JPQL queries.', skills: ['Spring Data JPA', 'Hibernate', 'PostgreSQL'], duration: '4 Weeks', defaultDone: false },
      { stage: 6, title: 'Spring Security & Microservices Communication', description: 'Securing endpoints with JWT, role-based authorization, Feign clients, and API Gateway.', skills: ['Spring Security', 'JWT', 'Microservices'], duration: '4 Weeks', defaultDone: false },
      { stage: 7, title: 'Automated Testing with JUnit 5 & Mockito', description: 'Unit testing services, mocking repositories, integration testing with @SpringBootTest.', skills: ['JUnit 5', 'Mockito', 'Test Coverage'], duration: '3 Weeks', defaultDone: false },
      { stage: 8, title: 'Production Packaging & Java Technical Interviews', description: 'Dockerizing Spring Boot jars, profiling JVM memory with VisualVM, and passing Java coding interviews.', skills: ['Docker', 'JVM Tuning', 'Java Interviews'], duration: '3 Weeks', defaultDone: false },
    ],
    youtubeVideos: [
      {
        id: 'yt-java-1',
        title: 'Java Full Course for Beginners',
        channelName: 'freeCodeCamp.org',
        videoId: 'A74TOX803D0',
        thumbnail: 'https://img.youtube.com/vi/A74TOX803D0/hqdefault.jpg',
        description: 'Complete 9.5-hour deep dive into Java programming fundamentals and Object-Oriented design.',
        level: 'Beginner',
        duration: '9.5 Hours',
        topic: 'Core Java Programming',
        language: 'English',
        youtubeUrl: 'https://www.youtube.com/watch?v=A74TOX803D0',
        embedUrl: 'https://www.youtube.com/embed/A74TOX803D0',
      },
      {
        id: 'yt-java-2',
        title: 'Spring Boot Tutorial for Beginners',
        channelName: 'Amigoscode',
        videoId: '9SGDpanrc8U',
        thumbnail: 'https://img.youtube.com/vi/9SGDpanrc8U/hqdefault.jpg',
        description: 'Build your first Spring Boot REST API: dependency injection, Spring Data JPA, and PostgreSQL database.',
        level: 'Intermediate',
        duration: '2.5 Hours',
        topic: 'Spring Boot & JPA',
        language: 'English',
        youtubeUrl: 'https://www.youtube.com/watch?v=9SGDpanrc8U',
        embedUrl: 'https://www.youtube.com/embed/9SGDpanrc8U',
      },
    ],
    courses: [
      {
        id: 'java-c1',
        title: 'Java Programming and Software Engineering Fundamentals',
        provider: 'Duke University / Coursera',
        level: 'Beginner',
        duration: '5 Months',
        freeStatus: 'Free Audit',
        skillsLearned: ['Java Syntax', 'OOP', 'Data Structures', 'Algorithms'],
        progress: 70,
        courseUrl: 'https://www.coursera.org/specializations/java-programming',
        description: 'Duke University’s foundational Java engineering certificate series.',
        topics: ['Solving Problems with Software', 'Arrays, Lists, and Structured Data', 'Object Oriented Programming in Java'],
      },
    ],
    assessments: [
      { id: 1, question: 'In Java, how does HashMap handle hash collisions internally?', options: ['Throws an Exception', 'Uses separate chaining (LinkedList converted to Balanced Tree when bucket size exceeds threshold)', 'Overwrites the previous value', 'Deletes the key'], answer: 1, explanation: 'Java HashMap uses linked nodes in bucket bins, and converts to a Red-Black tree (TreeNode) when bin count reaches 8.', skillTag: 'Java Collections' },
    ],
    mockQuestions: [
      { id: 1, category: 'Technical', question: 'Explain the difference between @Component, @Service, and @Repository in Spring Boot.', expectedKeywords: ['stereotypes', 'component scanning', 'exception translation', 'service layer', 'repository layer'], tip: 'All three are @Component stereotypes; @Repository additionally enables automatic persistence exception translation.' },
    ],
    projects: [
      { id: 'java-p1', title: 'Banking & Transaction Management Microservice', level: 'Intermediate', description: 'Build an enterprise banking REST API with Spring Boot, Spring Security JWT, and PostgreSQL.', tech: ['Java', 'Spring Boot', 'Spring Data JPA', 'PostgreSQL', 'JUnit'], progress: 50, objectives: 'Implement atomic bank transfers, account creation, statement generation, and integration test coverage.' },
    ],
    jobs: [
      { id: 'java-j1', title: 'Associate Java Engineer', company: 'HCL Technologies', logoText: 'HCL', location: 'Noida / Chennai', type: 'Full-time', salary: '₹6 - 10 LPA', matchScore: 89, description: 'Develop enterprise backend microservices with Spring Boot and relational database persistence.', skills: ['Java', 'Spring Boot', 'SQL', 'Git'], applyUrl: 'https://www.hcltech.com/careers' },
    ],
  },

  // 11. Mobile App Development
  'mobile-dev': {
    id: 'mobile-dev',
    name: 'Mobile App Development',
    icon: '📱',
    badge: 'CROSS-PLATFORM',
    shortDescription: 'Build native and cross-platform iOS and Android mobile apps using Flutter, React Native, and Swift/Kotlin.',
    overview: 'Mobile Developers engineer smooth touch-first user experiences, local SQLite caching, offline sync, push notifications, and device hardware integrations (GPS, Camera) on iOS and Android.',
    roles: ['Mobile Developer', 'Flutter Engineer', 'React Native Developer', 'Android Developer (Kotlin)'],
    primaryRole: 'Mobile App Developer',
    avgSalary: '₹6.5 - 16 LPA',
    hiringDemand: '93% Market Demand',
    requiredSkills: ['Dart & Flutter / React Native', 'Mobile UI State Management', 'REST API Integration', 'Offline Storage (SQLite/Hive)', 'App Store & Play Store Deployment'],
    skillsMasteredDefault: ['JavaScript / Dart Syntax', 'Mobile UI Component Basics'],
    skillsToImproveDefault: ['State Management (Bloc / Redux)', 'Native Device APIs (Camera, GPS)'],
    missingSkillsDefault: ['Offline Database Synchronization', 'Push Notifications (FCM)', 'App Store Release Packaging'],
    readinessScoreDefault: 65,
    roadmap: [
      { stage: 1, title: 'Dart / Modern Mobile Programming Basics', description: 'Language syntax, null-safety, async programming, streams, and object-oriented principles.', skills: ['Dart', 'OOP', 'Null Safety'], duration: '3 Weeks', defaultDone: true },
      { stage: 2, title: 'Flutter Widget Tree & Responsive Mobile UI', description: 'Stateless vs Stateful widgets, layout rows/columns, scrolling lists, and material design.', skills: ['Flutter', 'Widgets', 'Material UI'], duration: '4 Weeks', defaultDone: true },
      { stage: 3, title: 'State Management (Provider / Bloc / Riverpod)', description: 'Separating business logic from UI, handling global reactive state cleanly across screens.', skills: ['State Management', 'Bloc', 'Provider'], duration: '4 Weeks', defaultDone: false },
      { stage: 4, title: 'Networking, REST APIs & JSON Serialization', description: 'HTTP clients (Dio), parsing JSON models, error handling, and loading state management.', skills: ['REST APIs', 'Dio', 'JSON Serialization'], duration: '3 Weeks', defaultDone: false },
      { stage: 5, title: 'Local Persistence & Offline Caching', description: 'SQLite, Hive, Shared Preferences, and managing offline data sync when internet resumes.', skills: ['SQLite', 'Hive', 'Offline Sync'], duration: '3 Weeks', defaultDone: false },
      { stage: 6, title: 'Device Hardware: Camera, Location & Push Notifications', description: 'Accessing GPS coordinates, camera image picker, and Firebase Cloud Messaging (FCM).', skills: ['GPS', 'Camera', 'FCM Push Notifications'], duration: '4 Weeks', defaultDone: false },
      { stage: 7, title: 'Testing, Performance Profiling & App Optimization', description: 'Widget testing, reducing APK bundle size, and ensuring 60fps scrolling animations.', skills: ['Widget Testing', 'Performance Profiling'], duration: '3 Weeks', defaultDone: false },
      { stage: 8, title: 'App Store / Play Store Release & Portfolio', description: 'Signing release APK/AAB, configuring app icons, Play Console release, and technical interviews.', skills: ['Play Store Deployment', 'Portfolio', 'Interviews'], duration: '3 Weeks', defaultDone: false },
    ],
    youtubeVideos: [
      {
        id: 'yt-mob-1',
        title: 'Flutter Course for Beginners - 37 Hours',
        channelName: 'freeCodeCamp.org',
        videoId: 'VPvVD8t02U8',
        thumbnail: 'https://img.youtube.com/vi/VPvVD8t02U8/hqdefault.jpg',
        description: 'Massive complete masterclass on building cross-platform Android and iOS apps from scratch with Flutter.',
        level: 'Beginner',
        duration: '37 Hours',
        topic: 'Flutter & Dart Mastery',
        language: 'English',
        youtubeUrl: 'https://www.youtube.com/watch?v=VPvVD8t02U8',
        embedUrl: 'https://www.youtube.com/embed/VPvVD8t02U8',
      },
    ],
    courses: [
      {
        id: 'mob-c1',
        title: 'Meta React Native Specialization',
        provider: 'Meta / Coursera',
        level: 'Intermediate',
        duration: '5 Months',
        freeStatus: 'Free Audit',
        skillsLearned: ['React Native', 'Mobile UI', 'Navigation', 'Native Device Features'],
        progress: 40,
        courseUrl: 'https://www.coursera.org/professional-certificates/meta-react-native',
        description: 'Learn cross-platform mobile development using JavaScript and React Native directly from Meta.',
        topics: ['React Native Basics', 'Working with Data', 'Mobile Architecture'],
      },
    ],
    assessments: [
      { id: 1, question: 'In Flutter, what is the difference between a StatelessWidget and a StatefulWidget?', options: ['StatelessWidget has mutable state; StatefulWidget is static', 'StatelessWidget is immutable once built; StatefulWidget maintains mutable State over time', 'Stateless only runs on iOS', 'There is no difference'], answer: 1, explanation: 'StatelessWidget cannot change its properties dynamically during runtime; StatefulWidget creates a mutable State object.' },
    ],
    mockQuestions: [
      { id: 1, category: 'Technical', question: 'How do you handle asynchronous network calls and prevent memory leaks when a user navigates away from a screen in mobile apps?', expectedKeywords: ['cancellation tokens', 'mounted check', 'dispose', 'cleanup', 'memory leaks'], tip: 'Always cancel active subscriptions and check if (mounted) before calling setState().' },
    ],
    projects: [
      { id: 'mob-p1', title: 'Fitness Tracker & Diet Planner Mobile App', level: 'Intermediate', description: 'Build a cross-platform mobile app with daily step tracking, meal logging, and offline SQLite storage.', tech: ['Flutter', 'Dart', 'SQLite', 'Charts'], progress: 45, objectives: 'Implement clean widget tree, local database persistence, animated charts, and dark mode.' },
    ],
    jobs: [
      { id: 'mob-j1', title: 'Flutter Developer Trainee', company: 'Jio Platforms', logoText: 'JIO', location: 'Navi Mumbai / Remote', type: 'Full-time', salary: '₹6 - 9.5 LPA', matchScore: 88, description: 'Develop performant cross-platform mobile features for consumer applications reaching millions of users.', skills: ['Flutter', 'Dart', 'REST APIs', 'Git'], applyUrl: 'https://careers.jio.com/' },
    ],
  },

  // 12. UI/UX Design
  'ui-ux': {
    id: 'ui-ux',
    name: 'UI/UX Design',
    icon: '🎨',
    badge: 'CREATIVE TECH',
    shortDescription: 'Design intuitive digital products, wireframes, user journeys, design systems and interactive Figma prototypes.',
    overview: 'UI/UX Designers conduct user research, craft wireframes, establish scalable design systems, and build high-fidelity interactive prototypes tested with real humans.',
    roles: ['UI Designer', 'UX Designer', 'Product Designer', 'Interaction Designer'],
    primaryRole: 'Product Designer',
    avgSalary: '₹6 - 15 LPA',
    hiringDemand: '92% Market Demand',
    requiredSkills: ['Figma Mastery (Components, Auto-Layout)', 'User Research & Personas', 'Wireframing & Information Architecture', 'Design Systems & Tokens', 'Usability Testing & Accessibility (WCAG)'],
    skillsMasteredDefault: ['Design Fundamentals', 'Color Theory & Typography'],
    skillsToImproveDefault: ['Figma Auto-Layout & Variants', 'Information Architecture'],
    missingSkillsDefault: ['User Testing Protocols', 'Design Tokens for Developers', 'Interactive Micro-Animations'],
    readinessScoreDefault: 75,
    roadmap: [
      { stage: 1, title: 'Design Foundations & Cognitive Psychology', description: 'Visual hierarchy, Gestalt principles, typography scales, contrast ratios, and color psychology.', skills: ['Visual Hierarchy', 'Typography', 'Gestalt'], duration: '3 Weeks', defaultDone: true },
      { stage: 2, title: 'User Research & Empathy Mapping', description: 'User interviews, surveys, persona creation, empathy maps, and competitive benchmarking.', skills: ['User Research', 'Personas', 'Journey Maps'], duration: '3 Weeks', defaultDone: true },
      { stage: 3, title: 'Information Architecture & Wireframing', description: 'Sitemaps, user flows, low-fidelity wireframes in Figma, and card sorting exercises.', skills: ['Wireframing', 'User Flows', 'Information Architecture'], duration: '3 Weeks', defaultDone: true },
      { stage: 4, title: 'Figma Mastery: Auto-Layout & Component Variants', description: 'Mastering Auto-Layout, constraints, component sets, interactive hover states, and design tokens.', skills: ['Figma', 'Auto-Layout', 'Component Sets'], duration: '4 Weeks', defaultDone: false },
      { stage: 5, title: 'Design Systems & Responsive Web/Mobile Guidelines', description: 'Building scalable design systems, iOS Human Interface Guidelines, and Google Material Design 3.', skills: ['Design Systems', 'Material Design', 'iOS HIG'], duration: '4 Weeks', defaultDone: false },
      { stage: 6, title: 'Prototyping & Usability Testing', description: 'Interactive prototypes, smart animate, usability test scripts, and measuring task success rates.', skills: ['Prototyping', 'Usability Testing', 'Smart Animate'], duration: '3 Weeks', defaultDone: false },
      { stage: 7, title: 'Web Accessibility (a11y) & Developer Handoff', description: 'WCAG AA/AAA compliance, screen reader considerations, Figma dev mode, and inspect specs.', skills: ['Accessibility', 'WCAG', 'Developer Handoff'], duration: '3 Weeks', defaultDone: false },
      { stage: 8, title: 'Design Case Studies & Portfolio Review', description: 'Publish 2 comprehensive UX case studies on Behance/Framer and prepare for whiteboarding interviews.', skills: ['Case Studies', 'Portfolio', 'Interviews'], duration: '3 Weeks', defaultDone: false },
    ],
    youtubeVideos: [
      {
        id: 'yt-ux-1',
        title: 'Figma UI UX Design Essentials - Full Course',
        channelName: 'freeCodeCamp.org',
        videoId: 'c9Wg6Cb_YlU',
        thumbnail: 'https://img.youtube.com/vi/c9Wg6Cb_YlU/hqdefault.jpg',
        description: 'Complete hands-on beginner to pro guide covering Figma UI layout, components, and prototyping.',
        level: 'Beginner',
        duration: '11 Hours',
        topic: 'Figma Design',
        language: 'English',
        youtubeUrl: 'https://www.youtube.com/watch?v=c9Wg6Cb_YlU',
        embedUrl: 'https://www.youtube.com/embed/c9Wg6Cb_YlU',
      },
    ],
    courses: [
      {
        id: 'ux-c1',
        title: 'Google UX Design Professional Certificate',
        provider: 'Google / Coursera',
        level: 'Beginner',
        duration: '6 Months',
        freeStatus: 'Free Audit',
        skillsLearned: ['User Research', 'Wireframing', 'Figma', 'Prototyping', 'Usability Testing'],
        progress: 85,
        courseUrl: 'https://www.coursera.org/professional-certificates/google-ux-design',
        description: 'Google’s comprehensive UX design certification taking students through 3 real-world case studies.',
        topics: ['Foundations of User Experience (UX) Design', 'Start the UX Design Process', 'Build Wireframes and Low-Fidelity Prototypes'],
      },
    ],
    assessments: [
      { id: 1, question: 'What is the minimum recommended WCAG 2.1 AA contrast ratio for regular body text against its background?', options: ['2:1', '3:1', '4.5:1', '7:1'], answer: 2, explanation: 'WCAG 2.1 AA mandates a contrast ratio of at least 4.5:1 for normal text (under 18pt) to ensure accessibility for visual impairments.' },
    ],
    mockQuestions: [
      { id: 1, category: 'Technical', question: 'Walk me through your end-to-end design process when tasked with redesigning a complex onboarding flow that has high user drop-off.', expectedKeywords: ['analytics data', 'user research', 'identifying friction', 'wireframes', 'usability testing', 'iteration'], tip: 'Start with data metrics and root causes before jumping to visuals.' },
    ],
    projects: [
      { id: 'ux-p1', title: 'Financial Wellness & Budgeting App Case Study', level: 'Intermediate', description: 'Conduct user research, design wireframes, design system, and clickable prototype in Figma for a modern fintech app.', tech: ['Figma', 'User Research', 'Prototyping', 'Design Systems'], progress: 80, objectives: 'Map customer journey, test prototype on 5 users, iterate friction points, and document complete case study.' },
    ],
    jobs: [
      { id: 'ux-j1', title: 'UI/UX & Product Design Intern', company: 'CRED Design Studio', logoText: 'CRD', location: 'Bengaluru', type: 'Internship', salary: '₹40,000 / month', matchScore: 92, description: 'Collaborate with product managers and engineers to design premium mobile and web user interfaces in Figma.', skills: ['Figma', 'UI/UX Design', 'Wireframing', 'Prototyping'], applyUrl: 'https://cred.club/careers' },
    ],
  },

  // 13. Internet of Things (IoT)
  'iot': {
    id: 'iot',
    name: 'Internet of Things (IoT)',
    icon: '📡',
    badge: 'HARDWARE & CLOUD',
    shortDescription: 'Connect microcontrollers, sensor telemetry, edge computing, MQTT protocols and cloud analytics.',
    overview: 'IoT Engineers program embedded devices (ESP32, Raspberry Pi, Arduino), connect sensor networks, optimize low-power wireless protocols (MQTT, BLE, LoRaWAN), and stream telemetry to cloud dashboards.',
    roles: ['IoT Developer', 'Embedded Systems Engineer', 'IoT Solutions Architect', 'Hardware-Software Integration Specialist'],
    primaryRole: 'IoT Developer',
    avgSalary: '₹5.5 - 14 LPA',
    hiringDemand: '91% Market Demand',
    requiredSkills: ['C / C++ & MicroPython', 'ESP32 / Raspberry Pi Hardware', 'Protocols (MQTT, HTTP, I2C, SPI)', 'Sensor & Actuator Interfacing', 'Cloud IoT Telemetry (AWS IoT Core)'],
    skillsMasteredDefault: ['Basic C Programming', 'Electronics Fundamentals'],
    skillsToImproveDefault: ['ESP32 WiFi & MQTT Publishing', 'I2C / SPI Sensor Interfacing'],
    missingSkillsDefault: ['Cloud IoT Hub (AWS/Azure IoT)', 'Edge Computing & TinyML', 'OTA Firmware Updates'],
    readinessScoreDefault: 60,
    roadmap: [
      { stage: 1, title: 'Embedded C/C++ & Electronics Fundamentals', description: 'Ohm’s law, GPIO pins, digital/analog signals, pull-up/pull-down resistors, and microcontroller architecture.', skills: ['Embedded C', 'Electronics', 'GPIO'], duration: '4 Weeks', defaultDone: true },
      { stage: 2, title: 'Microcontroller Platforms: Arduino & ESP32', description: 'Programming ESP32 with FreeRTOS tasks, interrupts, timers, and serial communication (UART).', skills: ['ESP32', 'FreeRTOS', 'UART'], duration: '4 Weeks', defaultDone: true },
      { stage: 3, title: 'Hardware Bus Protocols (I2C, SPI, 1-Wire)', description: 'Connecting temperature, humidity, accelerometer sensors, and OLED display screens via I2C/SPI.', skills: ['I2C', 'SPI', 'Sensors'], duration: '3 Weeks', defaultDone: false },
      { stage: 4, title: 'IoT Networking Protocols: MQTT, CoAP & WebSockets', description: 'Publish/subscribe message queuing telemetry (MQTT), Mosquitto broker setup, and lightweight packets.', skills: ['MQTT', 'Mosquitto', 'Networking'], duration: '4 Weeks', defaultDone: false },
      { stage: 5, title: 'Cloud IoT Platforms (AWS IoT Core / ThingsBoard)', description: 'Device shadows, X.509 certificate provisioning, rule engines, and telemetry dashboards.', skills: ['AWS IoT Core', 'ThingsBoard', 'Cloud Telemetry'], duration: '4 Weeks', defaultDone: false },
      { stage: 6, title: 'Edge Computing & TinyML Basics', description: 'Running lightweight TensorFlow Lite models directly on microcontrollers for gesture/audio detection.', skills: ['TinyML', 'Edge AI', 'TensorFlow Lite Micro'], duration: '4 Weeks', defaultDone: false },
      { stage: 7, title: 'Over-The-Air (OTA) Updates & IoT Security', description: 'Secure firmware signing, TLS encryption for IoT data in transit, and remote wireless firmware updates.', skills: ['OTA Updates', 'IoT Security', 'TLS'], duration: '3 Weeks', defaultDone: false },
      { stage: 8, title: 'Hardware Prototype Project & Technical Interviews', description: 'Build and demonstrate a working smart environmental monitor connected to cloud telemetry.', skills: ['Prototype Build', 'Portfolio', 'Interviews'], duration: '3 Weeks', defaultDone: false },
    ],
    youtubeVideos: [
      {
        id: 'yt-iot-1',
        title: 'IoT Full Course - Learn Internet of Things in 5 Hours',
        channelName: 'Edureka',
        videoId: '6mBO2vqLv38',
        thumbnail: 'https://img.youtube.com/vi/6mBO2vqLv38/hqdefault.jpg',
        description: 'Complete introductory course to IoT architecture, hardware microcontrollers, protocols, and cloud platforms.',
        level: 'Beginner',
        duration: '5 Hours',
        topic: 'IoT Overview',
        language: 'English',
        youtubeUrl: 'https://www.youtube.com/watch?v=6mBO2vqLv38',
        embedUrl: 'https://www.youtube.com/embed/6mBO2vqLv38',
      },
    ],
    courses: [
      {
        id: 'iot-c1',
        title: 'Introduction to Internet of Things',
        provider: 'Curtin University / edX',
        level: 'Beginner',
        duration: '6 Weeks',
        freeStatus: 'Free Audit',
        skillsLearned: ['Sensors', 'Actuators', 'Networks', 'Cloud IoT'],
        progress: 35,
        courseUrl: 'https://www.edx.org/course/iot-sensors-and-devices',
        description: 'Foundations of IoT hardware, communication standards, and cloud integration.',
        topics: ['Sensors and Microcontrollers', 'Communication Protocols', 'Security and Big Data'],
      },
    ],
    assessments: [
      { id: 1, question: 'Why is MQTT the preferred communication protocol for low-power IoT devices over standard HTTP?', options: ['MQTT has lower packet overhead and uses an efficient publish-subscribe pattern over persistent TCP', 'HTTP cannot send text', 'MQTT has no encryption', 'HTTP is illegal on sensors'], answer: 0, explanation: 'MQTT headers are as small as 2 bytes, reducing battery drain and bandwidth significantly compared to verbose HTTP headers.' },
    ],
    mockQuestions: [
      { id: 1, category: 'Technical', question: 'How do you secure sensor data transmitted from a remote ESP32 device to an AWS IoT Core broker?', expectedKeywords: ['X.509 certificates', 'TLS 1.2', 'private key storage', 'secure boot', 'least privilege policies'], tip: 'Discuss hardware root of trust, device-specific certificates, and mutual TLS authentication.' },
    ],
    projects: [
      { id: 'iot-p1', title: 'Smart Agricultural Soil & Weather Monitoring Station', level: 'Intermediate', description: 'Program ESP32 with DHT22 & soil moisture sensors, stream telemetry via MQTT, and visualize on a cloud dashboard.', tech: ['ESP32', 'C++', 'MQTT', 'AWS IoT', 'ThingsBoard'], progress: 50, objectives: 'Connect physical sensors, publish readings every 10s via MQTT, and set up automated alert triggers on dryness.' },
    ],
    jobs: [
      { id: 'iot-j1', title: 'IoT Systems Engineer Trainee', company: 'Robert Bosch India', logoText: 'BOS', location: 'Bengaluru', type: 'Full-time', salary: '₹6 - 10 LPA', matchScore: 84, description: 'Interface sensors, maintain embedded firmware, and build communication pipelines for connected devices.', skills: ['C/C++', 'ESP32', 'MQTT', 'Microcontrollers'], applyUrl: 'https://www.bosch.in/careers/' },
    ],
  },

  // 14. Blockchain Development
  'blockchain': {
    id: 'blockchain',
    name: 'Blockchain Development',
    icon: '⛓️',
    badge: 'WEB3',
    shortDescription: 'Build decentralized applications (dApps), smart contracts, token standards, and Web3 integrations.',
    overview: 'Blockchain Developers write tamper-proof smart contracts using Solidity, build decentralized applications (dApps) connecting to Ethereum/EVM chains, and secure cryptographic transactions.',
    roles: ['Blockchain Developer', 'Smart Contract Engineer', 'Web3 Developer', 'DeFi Protocol Engineer'],
    primaryRole: 'Blockchain Developer',
    avgSalary: '₹8 - 22 LPA',
    hiringDemand: '90% Market Demand',
    requiredSkills: ['Solidity Programming', 'EVM Architecture', 'Hardhat / Foundry', 'Ethers.js / Web3.js', 'Smart Contract Security & Reentrancy', 'OpenZeppelin Standards (ERC-20, ERC-721)'],
    skillsMasteredDefault: ['JavaScript Basics', 'Cryptography (Hashes & Public Keys)'],
    skillsToImproveDefault: ['Solidity Syntax & Data Types', 'Web3 Wallet Connections'],
    missingSkillsDefault: ['Smart Contract Security Auditing', 'Foundry Testing Suites', 'DeFi Tokenomics'],
    readinessScoreDefault: 58,
    roadmap: [
      { stage: 1, title: 'Blockchain & Cryptography Foundations', description: 'SHA-256 hashing, asymmetric cryptography, Merkle Trees, distributed consensus (Proof of Work vs Stake).', skills: ['Cryptography', 'Consensus Mechanisms', 'EVM Basics'], duration: '3 Weeks', defaultDone: true },
      { stage: 2, title: 'Solidity Smart Contract Programming', description: 'Variables, mappings, structs, modifiers, events, gas optimization, and constructor setup.', skills: ['Solidity', 'Gas Optimization', 'Modifiers'], duration: '4 Weeks', defaultDone: true },
      { stage: 3, title: 'OpenZeppelin & Token Standards', description: 'ERC-20 fungible tokens, ERC-721 NFTs, ERC-1155 multi-tokens, and access control patterns.', skills: ['ERC-20', 'ERC-721', 'OpenZeppelin'], duration: '3 Weeks', defaultDone: false },
      { stage: 4, title: 'Smart Contract Development Frameworks (Hardhat & Foundry)', description: 'Compiling, local testing with simulated accounts, scripting automated deployments, and gas reporting.', skills: ['Hardhat', 'Foundry', 'Unit Testing'], duration: '4 Weeks', defaultDone: false },
      { stage: 5, title: 'Web3 Frontend Integration with React & Ethers.js', description: 'Connecting MetaMask, reading contract state, signing wallet transactions, and listening to on-chain events.', skills: ['Ethers.js', 'React', 'MetaMask', 'Wagmi'], duration: '4 Weeks', defaultDone: false },
      { stage: 6, title: 'Smart Contract Security & Vulnerability Auditing', description: 'Preventing reentrancy attacks (checks-effects-interactions), integer overflow, frontrunning, and flash loans.', skills: ['Security Auditing', 'Reentrancy', 'Slither'], duration: '4 Weeks', defaultDone: false },
      { stage: 7, title: 'Layer 2 Solutions & IPFS Decentralized Storage', description: 'Arbitrum, Optimism, zk-Rollups, and decentralized file hosting using IPFS and Pinata.', skills: ['Layer 2', 'Rollups', 'IPFS'], duration: '3 Weeks', defaultDone: false },
      { stage: 8, title: 'dApp Capstone Deployment & Web3 Interviews', description: 'Deploy verified smart contracts to testnet and launch a complete decentralized finance dApp.', skills: ['dApp Deployment', 'Portfolio', 'Interviews'], duration: '3 Weeks', defaultDone: false },
    ],
    youtubeVideos: [
      {
        id: 'yt-bc-1',
        title: 'Solidity, Blockchain, and Smart Contract Course',
        channelName: 'freeCodeCamp.org',
        videoId: 'gyMwXuJrbJQ',
        thumbnail: 'https://img.youtube.com/vi/gyMwXuJrbJQ/hqdefault.jpg',
        description: 'Patrick Collins legendary comprehensive 32-hour complete Web3 & smart contract engineering bootcamp.',
        level: 'Beginner',
        duration: '32 Hours',
        topic: 'Solidity & Smart Contracts',
        language: 'English',
        youtubeUrl: 'https://www.youtube.com/watch?v=gyMwXuJrbJQ',
        embedUrl: 'https://www.youtube.com/embed/gyMwXuJrbJQ',
      },
    ],
    courses: [
      {
        id: 'bc-c1',
        title: 'Blockchain Specialization',
        provider: 'University at Buffalo / Coursera',
        level: 'Beginner',
        duration: '4 Months',
        freeStatus: 'Free Audit',
        skillsLearned: ['Cryptography', 'Smart Contracts', 'dApps', 'Blockchain Platforms'],
        progress: 20,
        courseUrl: 'https://www.coursera.org/specializations/blockchain',
        description: 'Foundations of distributed ledgers, consensus algorithms, and smart contract execution.',
        topics: ['Blockchain Basics', 'Smart Contracts', 'Decentralized Applications'],
      },
    ],
    assessments: [
      { id: 1, question: 'What security coding pattern prevents Reentrancy attacks in Solidity smart contracts?', options: ['Checks-Effects-Interactions pattern', 'Try-Catch pattern', 'Infinite loop', 'Disabling gas'], answer: 0, explanation: 'The Checks-Effects-Interactions pattern ensures internal state variables are updated before any external ether transfers take place.' },
    ],
    mockQuestions: [
      { id: 1, category: 'Technical', question: 'Explain how gas works in the Ethereum Virtual Machine (EVM) and how you optimize a smart contract for gas efficiency.', expectedKeywords: ['opcode cost', 'storage packing', 'calldata vs memory', 'gas refund', 'sstore'], tip: 'Discuss packing variables into 32-byte slots and avoiding unnecessary storage writes.' },
    ],
    projects: [
      { id: 'bc-p1', title: 'Decentralized Crowdfunding Platform dApp', level: 'Intermediate', description: 'Develop and deploy an EVM smart contract where users contribute testnet ETH to verified campaign targets.', tech: ['Solidity', 'Hardhat', 'Ethers.js', 'React'], progress: 35, objectives: 'Write robust smart contract with refunds on unmet targets, connect MetaMask, and deploy on Sepolia testnet.' },
    ],
    jobs: [
      { id: 'bc-j1', title: 'Junior Web3 Developer', company: 'Polygon Labs', logoText: 'POL', location: 'Remote', type: 'Full-time', salary: '₹10 - 18 LPA', matchScore: 82, description: 'Write smart contracts, build developer integration kits, and support ecosystem dApps on Polygon.', skills: ['Solidity', 'Ethers.js', 'Hardhat', 'JavaScript'], applyUrl: 'https://polygon.technology/careers' },
    ],
  },

  // 15. Software Testing and QA
  'qa-testing': {
    id: 'qa-testing',
    name: 'Software Testing and QA',
    icon: '🧪',
    badge: 'QUALITY FIRST',
    shortDescription: 'Design test suites, automate end-to-end user flows with Selenium and Cypress, and ensure zero-bug releases.',
    overview: 'QA and Automation Engineers ensure software reliability through systematic manual test cases, automated E2E browser testing (Selenium, Cypress, Playwright), API validation, and performance benchmarks.',
    roles: ['QA Engineer', 'Automation Test Engineer', 'Software Test Analyst', 'Quality Assurance Specialist'],
    primaryRole: 'QA Engineer',
    avgSalary: '₹5 - 13 LPA',
    hiringDemand: '93% Market Demand',
    requiredSkills: ['Manual Testing & Bug Life Cycle', 'Selenium / Playwright / Cypress', 'API Testing (Postman, REST Assured)', 'TestNG / JUnit Frameworks', 'CI/CD Test Automation', 'Jira & TestRail'],
    skillsMasteredDefault: ['Manual Testing Basics', 'Writing Bug Reports'],
    skillsToImproveDefault: ['Selenium WebDriver with Java / Python', 'Postman Automated Tests'],
    missingSkillsDefault: ['Playwright E2E Automation', 'CI/CD Pipeline Integration', 'Performance Testing (JMeter)'],
    readinessScoreDefault: 72,
    roadmap: [
      { stage: 1, title: 'Software Testing Foundations & Methodologies', description: 'STLC, SDLC, functional vs non-functional testing, black-box vs white-box, and boundary value analysis.', skills: ['STLC', 'SDLC', 'Test Case Design'], duration: '3 Weeks', defaultDone: true },
      { stage: 2, title: 'Test Case Documentation & Defect Life Cycle', description: 'Writing detailed test cases, bug tracking in Jira, severity vs priority classification, and traceability matrix.', skills: ['Jira', 'Bug Reporting', 'TestRail'], duration: '3 Weeks', defaultDone: true },
      { stage: 3, title: 'API Testing with Postman & REST Assured', description: 'Testing HTTP endpoints, status code assertions, automated test scripts, and Newman CLI integration.', skills: ['Postman', 'API Testing', 'Newman'], duration: '4 Weeks', defaultDone: false },
      { stage: 4, title: 'Automated Browser Testing with Selenium / Playwright', description: 'Locating web elements (XPath, CSS selectors), page object model (POM), and wait conditions.', skills: ['Selenium', 'Playwright', 'POM'], duration: '5 Weeks', defaultDone: false },
      { stage: 5, title: 'Test Automation Frameworks (TestNG / Pytest)', description: 'Data-driven testing, parallel test execution, assertions, annotations, and automated HTML reporting.', skills: ['TestNG', 'Data-driven Testing', 'Reports'], duration: '4 Weeks', defaultDone: false },
      { stage: 6, title: 'Continuous Testing in CI/CD Pipelines', description: 'Running automated test suites in GitHub Actions or Jenkins on every pull request.', skills: ['CI/CD Testing', 'GitHub Actions', 'Docker'], duration: '3 Weeks', defaultDone: false },
      { stage: 7, title: 'Performance & Load Testing with Apache JMeter', description: 'Simulating concurrent users, measuring response times, throughput, and spotting system bottlenecks.', skills: ['JMeter', 'Load Testing', 'Performance'], duration: '3 Weeks', defaultDone: false },
      { stage: 8, title: 'Portfolio Test Framework & QA Technical Interviews', description: 'Publish a clean Page Object Model test automation framework on GitHub and pass interview challenges.', skills: ['Portfolio Framework', 'Interview Prep'], duration: '3 Weeks', defaultDone: false },
    ],
    youtubeVideos: [
      {
        id: 'yt-qa-1',
        title: 'Software Testing Course for Beginners (Full Course)',
        channelName: 'freeCodeCamp.org',
        videoId: 'sO8eGL6QWAw',
        thumbnail: 'https://img.youtube.com/vi/sO8eGL6QWAw/hqdefault.jpg',
        description: 'Complete introductory masterclass covering manual testing, test cases, Agile, and automation principles.',
        level: 'Beginner',
        duration: '4 Hours',
        topic: 'Manual & Automated Testing',
        language: 'English',
        youtubeUrl: 'https://www.youtube.com/watch?v=sO8eGL6QWAw',
        embedUrl: 'https://www.youtube.com/embed/sO8eGL6QWAw',
      },
      {
        id: 'yt-qa-2',
        title: 'Playwright Beginner to Advanced Tutorial',
        channelName: 'freeCodeCamp.org',
        videoId: '3b_Q_Z4qJ3I',
        thumbnail: 'https://img.youtube.com/vi/3b_Q_Z4qJ3I/hqdefault.jpg',
        description: 'Master fast, reliable end-to-end browser automation using modern Playwright and TypeScript.',
        level: 'Intermediate',
        duration: '3.5 Hours',
        topic: 'Playwright E2E Automation',
        language: 'English',
        youtubeUrl: 'https://www.youtube.com/watch?v=3b_Q_Z4qJ3I',
        embedUrl: 'https://www.youtube.com/embed/3b_Q_Z4qJ3I',
      },
    ],
    courses: [
      {
        id: 'qa-c1',
        title: 'Automated Testing with Selenium and Java',
        provider: 'freeCodeCamp / Open Source',
        level: 'Beginner',
        duration: '30 Hours',
        freeStatus: 'Official Open-Source',
        skillsLearned: ['Selenium WebDriver', 'Java', 'XPath', 'TestNG', 'Automation'],
        progress: 60,
        courseUrl: 'https://www.freecodecamp.org/news/automated-testing-selenium-java/',
        description: 'Practical guide to automating cross-browser test suites using Java and the Page Object Model.',
        topics: ['Locating Elements', 'Handling Dynamic Web Pages', 'Page Object Model Architecture'],
      },
    ],
    assessments: [
      { id: 1, question: 'What design pattern separates web element locators and actions from test execution scripts in automated UI testing?', options: ['Page Object Model (POM)', 'Singleton Pattern', 'MVC Pattern', 'Observer Pattern'], answer: 0, explanation: 'The Page Object Model creates an abstraction layer representing each page as a class, reducing code duplication when UI changes.' },
    ],
    mockQuestions: [
      { id: 1, category: 'Technical', question: 'How do you handle flaky tests in automated browser testing, and why should Thread.sleep() be avoided?', expectedKeywords: ['explicit waits', 'fluent wait', 'dynamic locators', 'flaky tests', 'race conditions'], tip: 'Explain that hardcoded sleeps slow down test suites and fail unpredictably; explicit waits poll until condition is met.' },
    ],
    projects: [
      { id: 'qa-p1', title: 'End-to-End E-Commerce Automated Test Suite', level: 'Intermediate', description: 'Build an automated test suite verifying search, cart additions, and checkout using Playwright and GitHub Actions.', tech: ['Playwright', 'TypeScript', 'GitHub Actions', 'Postman'], progress: 65, objectives: 'Implement Page Object Model, write 30+ assertions, configure headless CI execution, and generate HTML reports.' },
    ],
    jobs: [
      { id: 'qa-j1', title: 'Quality Assurance Engineer', company: 'Capgemini Technology', logoText: 'CAP', location: 'Bengaluru / Pune', type: 'Full-time', salary: '₹5 - 8.5 LPA', matchScore: 90, description: 'Design automated test scripts, execute regression suites, and collaborate with sprint developers on quality gates.', skills: ['Selenium', 'Java', 'Postman', 'Jira'], applyUrl: 'https://www.capgemini.com/careers/' },
    ],
  },
};

// Helper function to get current domain from localStorage or fallback
export function getActiveDomain(): DomainData {
  try {
    const savedId = localStorage.getItem('skilltwin_selected_domain');
    if (savedId && DOMAINS_MASTER[savedId]) {
      return DOMAINS_MASTER[savedId];
    }
  } catch (e) {
    // fallback
  }
  return DOMAINS_MASTER['fullstack'];
}

// Helper to save active domain
export function setActiveDomain(domainId: string): DomainData {
  const selected = DOMAINS_MASTER[domainId] || DOMAINS_MASTER['fullstack'];
  try {
    localStorage.setItem('skilltwin_selected_domain', selected.id);
    localStorage.setItem('recommended_skill', selected.requiredSkills[0] || 'Fundamentals');
  } catch (e) {
    console.error(e);
  }
  return selected;
}
