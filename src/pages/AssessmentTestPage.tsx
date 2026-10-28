import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Check, ArrowLeft, RotateCcw, ArrowRight } from 'lucide-react';
import { getCurrentSessionEmail } from '../utils/userStorage';
import { getActiveDomain } from '../data/multiDomainData';
import { saveAssessmentResultToDb } from '../utils/supabaseBackend';

const questionBanks: Record<string, { question: string; options: string[]; correct: number }[]> = {
  'JavaScript Fundamentals': [
    { question: 'Which keyword declares a block-scoped variable?', options: ['var', 'let', 'define', 'variable'], correct: 1 },
    { question: 'Which method converts JSON text into a JavaScript object?', options: ['JSON.parse()', 'JSON.stringify()', 'JSON.convert()', 'JSON.object()'], correct: 0 },
    { question: 'What does === compare?', options: ['Only value', 'Only type', 'Value and type', 'Variable name'], correct: 2 },
    { question: 'Which method adds an element to the end of an array?', options: ['push()', 'pop()', 'shift()', 'unshift()'], correct: 0 },
    { question: 'Which symbol starts a single-line JavaScript comment?', options: ['<!-- -->', '//', '##', '**'], correct: 1 },
    { question: 'What is typeof [] in JavaScript?', options: ['array', 'object', 'list', 'undefined'], correct: 1 },
    { question: 'Which function executes code after a delay?', options: ['setTimeout()', 'delay()', 'wait()', 'setDelay()'], correct: 0 },
    { question: 'Which option is not a primitive data type?', options: ['String', 'Number', 'Object', 'Boolean'], correct: 2 },
    { question: 'What does DOM stand for?', options: ['Document Object Model', 'Data Object Management', 'Document Order Method', 'Digital Object Model'], correct: 0 },
    { question: 'Which keyword declares a constant?', options: ['constant', 'const', 'fixed', 'static'], correct: 1 },
  ],
  'React Development': [
    { question: 'What is React primarily used for?', options: ['Database management', 'Building user interfaces', 'Operating systems', 'Network configuration'], correct: 1 },
    { question: 'What is the HTML-like syntax used in React called?', options: ['XML', 'JSX', 'SQL', 'JSON'], correct: 1 },
    { question: 'Which hook manages component state?', options: ['useState', 'useRoute', 'usePage', 'useData'], correct: 0 },
    { question: 'Which hook is commonly used for side effects?', options: ['useEffect', 'useStyle', 'useAction', 'useSide'], correct: 0 },
    { question: 'Props are used to:', options: ['Store database records', 'Pass data to components', 'Create CSS files', 'Start a server'], correct: 1 },
    { question: 'Which command creates a Vite project?', options: ['npm create vite@latest', 'npm create react-server', 'npm install react-app', 'react start vite'], correct: 0 },
    { question: 'What do React components describe?', options: ['SQL tables', 'User interfaces', 'CSS only', 'Database records'], correct: 1 },
    { question: 'What does a React key help identify?', options: ['Database', 'Elements in a list', 'CSS color', 'Browser'], correct: 1 },
    { question: 'Which file commonly contains the main component?', options: ['App.jsx', 'database.sql', 'server.exe', 'style.json'], correct: 0 },
    { question: 'React is maintained by:', options: ['Microsoft', 'Meta', 'Google', 'Amazon'], correct: 1 },
  ],
  'HTML & CSS': [
    { question: 'What does HTML stand for?', options: ['HyperText Markup Language', 'HighText Machine Language', 'Hyper Transfer Markup Language', 'Home Tool Markup Language'], correct: 0 },
    { question: 'Which HTML tag creates a hyperlink?', options: ['<link>', '<a>', '<href>', '<url>'], correct: 1 },
    { question: 'Which tag creates the largest standard heading?', options: ['<h6>', '<head>', '<h1>', '<heading>'], correct: 2 },
    { question: 'Which CSS property changes text color?', options: ['font-color', 'text-color', 'color', 'foreground'], correct: 2 },
    { question: 'Which CSS property controls inner spacing?', options: ['margin', 'padding', 'spacing', 'border-space'], correct: 1 },
    { question: 'Which CSS property controls outer spacing?', options: ['padding', 'margin', 'outside', 'space'], correct: 1 },
    { question: 'Which tag inserts an image?', options: ['<image>', '<img>', '<picture>', '<src>'], correct: 1 },
    { question: 'How do you create a flex container?', options: ['display:flex', 'position:flex', 'layout:flex', 'flex:display'], correct: 0 },
    { question: 'Which attribute provides alternative image text?', options: ['src', 'alt', 'title', 'href'], correct: 1 },
    { question: 'Which element creates a form?', options: ['<input>', '<form>', '<fieldset>', '<data>'], correct: 1 },
  ],
  'Node.js Fundamentals': [
    { question: 'Node.js is built on which JavaScript engine?', options: ['SpiderMonkey', 'V8', 'Chakra', 'JavaScriptCore'], correct: 1 },
    { question: 'Node.js is commonly used for:', options: ['Server-side development', 'Image editing', 'Spreadsheet formatting', 'Operating system installation'], correct: 0 },
    { question: 'Which command checks the Node.js version?', options: ['node -v', 'node version', 'npm node', 'node check'], correct: 0 },
    { question: 'Which tool manages Node.js packages?', options: ['npm', 'git', 'vite', 'html'], correct: 0 },
    { question: 'Which file lists project dependencies?', options: ['package.json', 'index.css', 'database.html', 'config.jpg'], correct: 0 },
    { question: 'Which command installs project dependencies?', options: ['npm install', 'npm start-install', 'node install', 'package install'], correct: 0 },
    { question: 'Node.js allows JavaScript to run:', options: ['Only inside HTML', 'Outside the browser', 'Only inside CSS', 'Only inside databases'], correct: 1 },
    { question: 'Which built-in module can create an HTTP server?', options: ['http', 'server', 'web', 'request'], correct: 0 },
    { question: 'Which is a common JavaScript file extension?', options: ['.js', '.css', '.sql', '.jpg'], correct: 0 },
    { question: 'Node.js is commonly used to build:', options: ['Backend services', 'Image files', 'CSS selectors', 'Slide decks only'], correct: 0 },
  ],
  'SQL & DBMS': [
    { question: 'What does SQL stand for?', options: ['Structured Query Language', 'Simple Query Language', 'System Query Logic', 'Structured Question Language'], correct: 0 },
    { question: 'Which command retrieves data?', options: ['SELECT', 'GET', 'FETCH', 'READ'], correct: 0 },
    { question: 'Which command adds a new record?', options: ['INSERT', 'ADD', 'CREATE ROW', 'APPEND'], correct: 0 },
    { question: 'Which command modifies existing records?', options: ['UPDATE', 'MODIFY', 'CHANGE', 'ALTER ROW'], correct: 0 },
    { question: 'Which command removes records?', options: ['DELETE', 'REMOVE', 'DROP ROW', 'CLEAR'], correct: 0 },
    { question: 'A primary key should be:', options: ['Unique', 'Always a string', 'Always negative', 'Optional in every table'], correct: 0 },
    { question: 'Which clause filters records?', options: ['WHERE', 'FILTER', 'WHEN', 'HAVING ONLY'], correct: 0 },
    { question: 'Which clause sorts results?', options: ['ORDER BY', 'SORT', 'SORT BY', 'ARRANGE'], correct: 0 },
    { question: 'Which command creates a table?', options: ['CREATE TABLE', 'NEW TABLE', 'ADD TABLE', 'MAKE TABLE'], correct: 0 },
    { question: 'What does DBMS stand for?', options: ['Database Management System', 'Data Backup Management Software', 'Database Machine System', 'Digital Base Management System'], correct: 0 },
  ],
  'Python Programming': [
    { question: 'Which keyword defines a function in Python?', options: ['function', 'def', 'func', 'define'], correct: 1 },
    { question: 'Which symbol starts a Python comment?', options: ['//', '#', '<!-- -->', '**'], correct: 1 },
    { question: 'Which data type stores key-value pairs?', options: ['List', 'Tuple', 'Dictionary', 'Set'], correct: 2 },
    { question: 'Which function displays output?', options: ['print()', 'display()', 'show()', 'output()'], correct: 0 },
    { question: 'Which function returns the length of an object?', options: ['length()', 'len()', 'size()', 'count()'], correct: 1 },
    { question: 'Which keyword starts a condition?', options: ['if', 'when', 'condition', 'check'], correct: 0 },
    { question: 'What is the usual Python file extension?', options: ['.py', '.python', '.pt', '.pyt'], correct: 0 },
    { question: 'Which structure is ordered and mutable?', options: ['Tuple', 'List', 'Set', 'FrozenSet'], correct: 1 },
    { question: 'Which keyword starts a loop over a sequence?', options: ['for', 'loop', 'iterate', 'repeat'], correct: 0 },
    { question: 'Python is generally described as:', options: ['A high-level programming language', 'A database', 'An operating system', 'A markup language'], correct: 0 },
  ],
  'MongoDB Basics': [
    { question: 'MongoDB is a:', options: ['Relational database', 'NoSQL database', 'Programming language', 'Frontend framework'], correct: 1 },
    { question: 'MongoDB stores data primarily as:', options: ['Documents', 'Rows only', 'Spreadsheets', 'HTML files'], correct: 0 },
    { question: 'MongoDB documents use a JSON-like structure.', options: ['True', 'False', 'Only in SQL mode', 'Only in HTML'], correct: 0 },
    { question: 'Which shell is used with modern MongoDB installations?', options: ['mongosh', 'mongo-start', 'mongodb-shell', 'dbshell'], correct: 0 },
    { question: 'A group of MongoDB documents is called a:', options: ['Collection', 'Table', 'Row', 'Sheet'], correct: 0 },
    { question: 'What is the default unique identifier field?', options: ['_id', 'id', 'primary_id', 'key'], correct: 0 },
    { question: 'Which method inserts one document?', options: ['insertOne()', 'addOne()', 'createOne()', 'pushOne()'], correct: 0 },
    { question: 'Which method retrieves documents?', options: ['find()', 'select()', 'getRows()', 'fetchDataOnly()'], correct: 0 },
    { question: 'MongoDB is commonly used with:', options: ['Node.js', 'Only C', 'Only HTML', 'Only CSS'], correct: 0 },
    { question: 'MongoDB Atlas is:', options: ['A cloud database service', 'A CSS framework', 'A JavaScript compiler', 'A Git client'], correct: 0 },
  ],
  'Artificial Intelligence (AI)': [
    { question: 'Which activation function is most widely used in deep neural networks to prevent vanishing gradients?', options: ['Sigmoid', 'ReLU (Rectified Linear Unit)', 'Softmax', 'Step Function'], correct: 1 },
    { question: 'What is the primary role of the Self-Attention mechanism in the Transformer architecture?', options: ['Downsample images', 'Compute relevance weights between all token pairs simultaneously', 'Quantize weights to FP8', 'Compile bytecode'], correct: 1 },
    { question: 'What does RAG stand for in modern AI system design?', options: ['Randomized Attention Graph', 'Retrieval-Augmented Generation', 'Recursive Autoencoder Gradient', 'Rotational Alignment Gate'], correct: 1 },
    { question: 'Which library is commonly used for deep learning model creation and training?', options: ['PyTorch', 'jQuery', 'Bootstrap', 'Express.js'], correct: 0 },
    { question: 'What does backpropagation compute during neural network training?', options: ['Execution time', 'Loss function gradients with respect to model weights', 'Network latency', 'Dataset size'], correct: 1 },
    { question: 'What is the role of Vector Databases (e.g., ChromaDB, Pinecone) in AI pipelines?', options: ['Storing relational tabular rows', 'Storing and querying high-dimensional embedding vectors', 'Compiling Python code', 'Hosting DNS records'], correct: 1 },
    { question: 'Which metric measures the performance of a classification model across varying threshold settings?', options: ['AUC-ROC', 'MSE', 'R-Squared', 'FLOPs'], correct: 0 },
    { question: 'What is transfer learning?', options: ['Transferring code between repositories', 'Fine-tuning a pre-trained model on a new target task', 'Migrating SQL tables to NoSQL', 'Converting CSS to Sass'], correct: 1 },
    { question: 'Which model architecture powers BERT and GPT models?', options: ['Convolutional Neural Networks', 'Transformer', 'Markov Decision Process', 'Decision Trees'], correct: 1 },
    { question: 'What is temperature in LLM sampling?', options: ['CPU hardware heat', 'Hyperparameter controlling randomness of token generation', 'Context window length', 'Training epoch count'], correct: 1 },
  ],
  'Data Science': [
    { question: 'Which Python library provides DataFrame structures for tabular manipulation?', options: ['Pandas', 'Flask', 'Celery', 'Django'], correct: 0 },
    { question: 'What does the Central Limit Theorem state?', options: ['Sample means approach a normal distribution as sample size grows', 'All data distributions are linear', 'Standard deviation is always 1', 'Mean always equals median'], correct: 0 },
    { question: 'Which technique is used to prevent model overfitting by adding penalty terms to the loss function?', options: ['Regularization (L1/L2)', 'Data duplication', 'Gradient explosion', 'Subsampling without replacement'], correct: 0 },
    { question: 'What is the difference between supervised and unsupervised learning?', options: ['Supervised uses labeled training data, unsupervised does not', 'Supervised requires GPU, unsupervised uses CPU', 'Supervised only uses text data', 'There is no difference'], correct: 0 },
    { question: 'Which visualization chart is ideal for observing distributions and identifying outliers?', options: ['Box plot', 'Pie chart', 'Line chart', 'Breadcrumb'], correct: 0 },
    { question: 'What is multicollinearity in regression analysis?', options: ['High correlation among independent predictor variables', 'Missing values in the target column', 'Negative variance', 'Non-invertible matrices'], correct: 0 },
    { question: 'Which imputation technique replaces missing values with the median of the feature?', options: ['Median Imputation', 'One-Hot Encoding', 'Principal Component Analysis', 'Min-Max Scaling'], correct: 0 },
    { question: 'What is the F1-Score?', options: ['Harmonic mean of precision and recall', 'Arithmetic mean of true positives and false negatives', 'Total accuracy divided by 2', 'Area under precision curve only'], correct: 0 },
    { question: 'Which method reduces the dimensionality of large feature spaces while preserving variance?', options: ['Principal Component Analysis (PCA)', 'K-Means clustering', 'GridSearchCV', 'Z-score normalization'], correct: 0 },
    { question: 'What does p-value measure in statistical hypothesis testing?', options: ['Probability of observing results as extreme as obtained, assuming null hypothesis is true', 'Percentage of missing values', 'Precision percentage of the model', 'Power of the dataset'], correct: 0 },
  ],
  'Machine Learning': [
    { question: 'Which algorithm finds an optimal hyperplane that maximizes the margin between classes?', options: ['Support Vector Machine (SVM)', 'K-Means', 'Apriori', 'Linear Regression'], correct: 0 },
    { question: 'What problem occurs when a model performs exceptionally well on training data but poorly on unseen test data?', options: ['Overfitting', 'Underfitting', 'Vanishing Gradient', 'Data Leakage'], correct: 0 },
    { question: 'Which ensemble method builds multiple decision trees sequentially, with each correcting predecessors?', options: ['Gradient Boosting (XGBoost / LightGBM)', 'Bagging', 'Random Forest', 'K-Nearest Neighbors'], correct: 0 },
    { question: 'In K-Means clustering, what is K?', options: ['Number of clusters to form', 'Number of iterations', 'Learning rate', 'Data dimensions'], correct: 0 },
    { question: 'What is the purpose of Cross-Validation (e.g., K-Fold)?', options: ['Evaluate generalization performance reliably across data partitions', 'Speed up inference time', 'Compress model weights', 'Encrypt training data'], correct: 0 },
    { question: 'Which loss function is standard for binary classification?', options: ['Binary Cross-Entropy (Log Loss)', 'Mean Squared Error', 'Huber Loss', 'Hinge Loss for clustering'], correct: 0 },
    { question: 'What does the learning rate hyperparameter control in gradient descent?', options: ['Step size taken toward minimum of loss function in each iteration', 'Total memory allocation', 'Dataset batch count', 'Dropout probability'], correct: 0 },
    { question: 'Which metric is most sensitive to class imbalance?', options: ['Raw Accuracy', 'PR-AUC', 'Balanced Accuracy', 'F1-Score'], correct: 0 },
    { question: 'What does feature scaling (StandardScaler) accomplish?', options: ['Normalizes features to zero mean and unit variance', 'Converts strings to integers', 'Deletes correlated features', 'Removes duplicate records'], correct: 0 },
    { question: 'What is precision in machine learning evaluation?', options: ['True Positives / (True Positives + False Positives)', 'True Positives / (True Positives + False Negatives)', 'True Negatives / Total', 'Accuracy * Recall'], correct: 0 },
  ],
  'Full Stack Development': [
    { question: 'What is the primary role of RESTful API endpoints?', options: ['Provide stateless client-server communication using standard HTTP methods', 'Compile client React components', 'Host DNS domain names', 'Style UI elements'], correct: 0 },
    { question: 'Which HTTP status code signifies that a resource was successfully created?', options: ['201 Created', '200 OK', '204 No Content', '301 Moved Permanently'], correct: 0 },
    { question: 'What does CORS stand for in web security?', options: ['Cross-Origin Resource Sharing', 'Cross-Origin Response Security', 'Central Operating Routing System', 'Client Object Request Standard'], correct: 0 },
    { question: 'Which mechanism is recommended for persisting user session tokens securely in modern web apps?', options: ['HttpOnly Secure Cookies', 'LocalStorage without sanitation', 'URL Query Parameters', 'SessionStorage in plain text'], correct: 0 },
    { question: 'In Node.js Express, what is middleware?', options: ['Functions that access req, res, and next in request-response cycle', 'CSS preprocessing tools', 'Database storage engines', 'Frontend layout templates'], correct: 0 },
    { question: 'What is the Virtual DOM in React?', options: ['Lightweight in-memory representation of the real DOM used for reconciliation', 'The browser rendering engine', 'Server side database cache', 'HTML5 canvas layer'], correct: 0 },
    { question: 'What does database indexing improve?', options: ['Query read speed', 'Storage compaction only', 'Write throughput', 'CSS styling speed'], correct: 0 },
    { question: 'Which command initiates a Git repository in a folder?', options: ['git init', 'git start', 'git create', 'git clone-new'], correct: 0 },
    { question: 'What is the difference between SQL and NoSQL databases?', options: ['SQL uses structured schemas and tables; NoSQL uses flexible document/key-value models', 'SQL cannot store strings', 'NoSQL requires C++', 'SQL cannot run in cloud'], correct: 0 },
    { question: 'What does CI/CD stand for in modern web development?', options: ['Continuous Integration and Continuous Deployment', 'Client Interface and Client Delivery', 'Code Inspection and Code Distribution', 'Central Index and Central Database'], correct: 0 },
  ],
  'Data Analytics': [
    { question: 'In SQL, which clause filters rows after aggregation with GROUP BY?', options: ['HAVING', 'WHERE', 'FILTER', 'LIMIT'], correct: 0 },
    { question: 'In Excel or Google Sheets, which function looks up values across columns vertically?', options: ['VLOOKUP / XLOOKUP', 'SUMIF', 'COUNTIF', 'CONCAT'], correct: 0 },
    { question: 'What is a Star Schema in Data Warehousing?', options: ['A fact table at center surrounded by dimension tables', 'A network of unindexed flat files', 'A cyclical relational schema', 'A binary tree database'], correct: 0 },
    { question: 'What does DAX stand for in Microsoft Power BI?', options: ['Data Analysis Expressions', 'Dynamic Analytics XML', 'Data Aggregation Extension', 'Digital Array Extraction'], correct: 0 },
    { question: 'Which type of chart is best suited for showing parts of a whole over time?', options: ['Stacked Area Chart', 'Scatter Plot', 'Radar Chart', 'Box Plot'], correct: 0 },
    { question: 'What is the difference between inner join and left outer join in SQL?', options: ['Inner join returns only matching rows; left join returns all rows from left table plus matching rows', 'Left join only returns NULL rows', 'Inner join is NoSQL only', 'They are identical'], correct: 0 },
    { question: 'What is an outlier in descriptive statistics?', options: ['A data point that differs significantly from remaining observations', 'The average value of a series', 'A duplicate record', 'A null date field'], correct: 0 },
    { question: 'Which measure of central tendency is least affected by extreme outliers?', options: ['Median', 'Mean', 'Variance', 'Standard Deviation'], correct: 0 },
    { question: 'In Tableau, what is the difference between Dimensions and Measures?', options: ['Dimensions contain qualitative values; Measures contain numeric aggregatable values', 'Dimensions are colors, Measures are fonts', 'Dimensions cannot be filtered', 'They are synonymous'], correct: 0 },
    { question: 'What is an ETL pipeline?', options: ['Extract, Transform, and Load data workflow', 'Encryption, Transmission, and Logging process', 'Entity Type Linking protocol', 'Execution Time Limiter'], correct: 0 },
  ],
  'Cybersecurity': [
    { question: 'What is the primary objective of the CIA Triad in information security?', options: ['Confidentiality, Integrity, and Availability', 'Control, Inspection, and Authorization', 'Cryptographic Internal Access', 'Certification, Identification, and Auditing'], correct: 0 },
    { question: 'Which attack injects malicious SQL statements into web form inputs?', options: ['SQL Injection (SQLi)', 'Cross-Site Scripting (XSS)', 'Denial of Service (DoS)', 'Man-in-the-Middle (MitM)'], correct: 0 },
    { question: 'What is Multi-Factor Authentication (MFA)?', options: ['Verifying identity using two or more distinct evidence factors (knowledge, possession, inherence)', 'Entering password twice', 'Using two different web browsers', 'Encrypting emails with RSA'], correct: 0 },
    { question: 'Which port is standard for encrypted HTTPS traffic?', options: ['443', '80', '22', '21'], correct: 0 },
    { question: 'What does a SOC Analyst primarily do?', options: ['Monitor security alerts, detect incidents, and investigate threats', 'Write frontend React components', 'Design marketing flyers', 'Deploy relational SQL servers'], correct: 0 },
    { question: 'Which hashing algorithm is widely used and collision-resistant for data verification?', options: ['SHA-256', 'MD5', 'ROT13', 'Base64'], correct: 0 },
    { question: 'What is Phishing?', options: ['Social engineering attack attempting to trick individuals into disclosing sensitive information', 'Scanning open network ports', 'Cracking Wi-Fi WPA keys', 'Compiling C programs'], correct: 0 },
    { question: 'What does a Firewall do in network infrastructure?', options: ['Monitors and filters incoming and outgoing traffic based on predetermined security rules', 'Increases internet bandwidth', 'Caches static web images', 'Encrypts DNS queries automatically'], correct: 0 },
    { question: 'What is the purpose of Penetration Testing?', options: ['Simulate cyberattacks to discover vulnerabilities before malicious actors exploit them', 'Benchmark CPU speed', 'Format hard drives', 'Audit payroll records'], correct: 0 },
    { question: 'What is Zero Trust Architecture?', options: ['A security model requiring continuous verification of every user and device regardless of location', 'Trusting all internal network IPs', 'Removing all firewall rules', 'Disabling password requirements'], correct: 0 },
  ],
  'Cloud Computing': [
    { question: 'What are the three core service models of cloud computing?', options: ['IaaS, PaaS, SaaS', 'HTML, CSS, JS', 'CPU, RAM, SSD', 'HTTP, FTP, SSH'], correct: 0 },
    { question: 'What is AWS IAM primarily used for?', options: ['Managing identities, users, roles, and granular access permissions', 'Hosting relational databases', 'Running machine learning models', 'Purchasing domain names'], correct: 0 },
    { question: 'What is Amazon S3 classified as?', options: ['Object storage service', 'Block storage for operating systems', 'Relational SQL database', 'Virtual server compute instance'], correct: 0 },
    { question: 'What is the key advantage of Cloud Auto-Scaling?', options: ['Dynamically adjusts compute capacity to meet fluctuating demand without downtime', 'Reduces code complexity', 'Eliminates need for passwords', 'Converts Python to C++'], correct: 0 },
    { question: 'What is a Virtual Private Cloud (VPC)?', options: ['An isolated private virtual network dedicated to your cloud resources', 'A public web server', 'A shared hard drive', 'A local Wi-Fi router'], correct: 0 },
    { question: 'Which Google Cloud service provides serverless container deployment?', options: ['Cloud Run', 'Compute Engine VM', 'Cloud DNS', 'Cloud Spanner'], correct: 0 },
    { question: 'What is the Shared Responsibility Model in cloud security?', options: ['Cloud provider secures infrastructure; customer secures data, OS, and applications', 'Customer manages physical datacenters', 'Provider guarantees 100% bug-free code', 'Third parties pay hosting bills'], correct: 0 },
    { question: 'What is Infrastructure as Code (IaC)?', options: ['Managing and provisioning cloud infrastructure using code files (e.g., Terraform, CloudFormation)', 'Writing bash scripts manually on production servers', 'Compiling Linux kernels', 'Installing desktop software'], correct: 0 },
    { question: 'What is serverless computing (e.g., AWS Lambda)?', options: ['Running code in response to events without provisioning or managing servers', 'Hosting apps without internet access', 'Running software exclusively on client laptops', 'Using static HTML files only'], correct: 0 },
    { question: 'What is a Content Delivery Network (CDN)?', options: ['Distributed network of edge servers that delivers web content with low latency', 'A central SQL database in Ohio', 'An email newsletter system', 'A code repository host'], correct: 0 },
  ],
  'DevOps Engineering': [
    { question: 'What is Docker containerization?', options: ['Packaging an application and all its dependencies into an isolated, reproducible container', 'A virtual machine hypervisor running full guest OS', 'A Git version control server', 'A database management tool'], correct: 0 },
    { question: 'What is Kubernetes primarily used for?', options: ['Container orchestration, automated scaling, and deployment management', 'Writing Python scripts', 'Video transcoding', 'Domain name registration'], correct: 0 },
    { question: 'In a CI/CD pipeline, what is the role of Continuous Integration?', options: ['Automatically building and running automated tests whenever code is committed', 'Deploying code straight to production without testing', 'Creating GitHub issues', 'Managing billing invoices'], correct: 0 },
    { question: 'What is the primary benefit of Git feature branching?', options: ['Isolates new development work without impacting the stable main branch', 'Compresses Git repository file size', 'Speeds up CPU computation', 'Generates unit tests automatically'], correct: 0 },
    { question: 'Which tool is widely used for Infrastructure as Code across multi-cloud environments?', options: ['Terraform', 'Photoshop', 'Postman', 'Webpack'], correct: 0 },
    { question: 'What does Prometheus do in a DevOps environment?', options: ['Collects time-series metrics and monitors infrastructure and application health', 'Builds Docker images', 'Manages DNS records', 'Hosts Git repositories'], correct: 0 },
    { question: 'What is a Helm chart in Kubernetes?', options: ['A package manager template containing all Kubernetes resource definitions', 'A network diagram', 'A load balancer configuration', 'A Dockerfile replacement'], correct: 0 },
    { question: 'What is blue-green deployment?', options: ['A deployment strategy running two identical production environments to achieve zero downtime', 'Deploying code on weekends only', 'Using two distinct CSS themes', 'A database replication mode'], correct: 0 },
    { question: 'What does SRE stand for in modern operations?', options: ['Site Reliability Engineering', 'Software Release Environment', 'Server Resource Evaluation', 'Security Routing Engine'], correct: 0 },
    { question: 'Which Linux command displays active processes and real-time CPU/memory consumption?', options: ['top / htop', 'ls -la', 'chmod 777', 'cat /etc/hosts'], correct: 0 },
  ],
  'Python Development': [
    { question: 'What does PEP 8 represent in Python programming?', options: ['The official Style Guide for Python Code', 'A Python package installer', 'A compiler optimization flag', 'A virtual environment tool'], correct: 0 },
    { question: 'Which keyword creates a generator function in Python that yields items lazily?', options: ['yield', 'return', 'emit', 'generate'], correct: 0 },
    { question: 'What is a Python decorator?', options: ['A function that takes another function and extends its behavior without modifying it', 'A GUI styling widget', 'A comment syntax', 'A class attribute'], correct: 0 },
    { question: 'What does the Global Interpreter Lock (GIL) in CPython do?', options: ['Allows only one native thread to execute Python bytecode at a time', 'Prevents memory leaks in garbage collection', 'Locks file reading permissions', 'Encrypts compiled .pyc files'], correct: 0 },
    { question: 'Which built-in module is used for asynchronous programming and coroutines in Python?', options: ['asyncio', 'multiprocessing', 'socket', 'threading'], correct: 0 },
    { question: 'What is the difference between a list and a tuple in Python?', options: ['Lists are mutable, tuples are immutable', 'Tuples can only hold numbers', 'Lists cannot be indexed', 'There is no difference'], correct: 0 },
    { question: 'Which tool is used to isolate project dependencies in modern Python development?', options: ['venv / virtualenv / poetry', 'npm', 'pip install --global', 'docker-compose only'], correct: 0 },
    { question: 'What is the output of bool([]) in Python?', options: ['False', 'True', 'None', 'TypeError'], correct: 0 },
    { question: 'Which framework is known for high-performance Python asynchronous APIs with automatic OpenAPI docs?', options: ['FastAPI', 'Pygame', 'Tkinter', 'Kivy'], correct: 0 },
    { question: 'What is the purpose of the __init__ method in a Python class?', options: ['Initializes a newly created instance of the class (constructor)', 'Deletes the class from memory', 'Imports other modules', 'Exports the class as a package'], correct: 0 },
  ],
  'Java Development': [
    { question: 'What is the principle of encapsulation in Object-Oriented Java?', options: ['Bundling data and methods into a single unit while restricting direct access using private modifiers', 'Inheriting fields from parent classes', 'Writing code in separate files', 'Compiling code to bytecode'], correct: 0 },
    { question: 'What does the JVM (Java Virtual Machine) do?', options: ['Executes compiled Java bytecode on any supported host operating system', 'Writes Java code automatically', 'Edits bytecode files', 'Designs graphical user interfaces'], correct: 0 },
    { question: 'Which interface in Java Collections does NOT allow duplicate elements?', options: ['Set', 'List', 'Queue', 'ArrayList'], correct: 0 },
    { question: 'What is Dependency Injection in Spring Boot?', options: ['A design pattern where objects receive their dependencies from an external assembler container', 'Injecting SQL queries into strings', 'Compiling Java classes at runtime', 'Downloading Maven packages'], correct: 0 },
    { question: 'What is the difference between == and .equals() in Java?', options: ['== compares object memory references; .equals() compares object contents/state', '== compares string length only', '.equals() is only for integers', 'They behave identically'], correct: 0 },
    { question: 'Which keyword prevents a class from being subclassed in Java?', options: ['final', 'static', 'sealed', 'abstract'], correct: 0 },
    { question: 'What is the Garbage Collector in Java responsible for?', options: ['Automatically reclaiming heap memory occupied by unreachable objects', 'Deleting unused source code files', 'Terminating runaway CPU threads', 'Cleaning up Maven cache'], correct: 0 },
    { question: 'Which annotation in Spring Boot designates a class as a REST controller producing JSON responses?', options: ['@RestController', '@Service', '@Repository', '@Entity'], correct: 0 },
    { question: 'What is JDBC used for in Java applications?', options: ['Connecting to and executing queries against relational SQL databases', 'Creating desktop windows', 'Sending HTTP requests', 'Managing thread pools'], correct: 0 },
    { question: 'Which collection implementation provides O(1) average time complexity for get and put operations?', options: ['HashMap', 'TreeMap', 'LinkedList', 'Vector'], correct: 0 },
  ],
  'Mobile App Development': [
    { question: 'What is the primary architectural advantage of Flutter for mobile development?', options: ['Single codebase compiled directly to native ARM code for both iOS and Android using Skia/Impeller', 'Uses web browser WebView for all screens', 'Requires no state management', 'Runs without compiling'], correct: 0 },
    { question: 'Which declarative UI framework is official for modern native Android development?', options: ['Jetpack Compose', 'XML Views only', 'React Native', 'Ionic'], correct: 0 },
    { question: 'In React Native, what bridges JavaScript code with native platform components?', options: ['The React Native Bridge / JSI (JavaScript Interface)', 'REST API over HTTP', 'SQLite database', 'HTML5 iframe'], correct: 0 },
    { question: 'Which programming language is official and recommended by Google for native Android apps?', options: ['Kotlin', 'PHP', 'Swift', 'Ruby'], correct: 0 },
    { question: 'Which programming language is official for native iOS app development in Xcode?', options: ['Swift', 'Kotlin', 'Dart', 'Rust'], correct: 0 },
    { question: 'What is an APK / AAB file in Android ecosystem?', options: ['The package format used to distribute and install Android applications', 'A database backup file', 'A UI mock design file', 'An audio format'], correct: 0 },
    { question: 'What is the purpose of mobile state management (e.g., Bloc, Riverpod, Redux)?', options: ['Managing and synchronizing application UI state across screens predictably', 'Compressing mobile images', 'Styling app icons', 'Encrypting local storage'], correct: 0 },
    { question: 'What lifecycle method or hook handles cleanup when a mobile screen is unmounted?', options: ['useEffect return function / onDestroy / dispose', 'onCreate', 'init()', 'render()'], correct: 0 },
    { question: 'What does responsive mobile UI design require?', options: ['Adapting layouts gracefully across various screen sizes, densities, and orientations', 'Fixed pixel coordinates', 'Disabling landscape mode', 'Using only one font size'], correct: 0 },
    { question: 'What is Push Notification infrastructure (e.g., Firebase Cloud Messaging)?', options: ['A service to deliver background messages and alerts to mobile devices', 'A database replication engine', 'An in-app browser', 'A billing processor'], correct: 0 },
  ],
  'UI/UX Design': [
    { question: 'What is the primary difference between UI and UX design?', options: ['UX focuses on user journey, usability, and workflow; UI focuses on visual styling, hierarchy, and components', 'UI is research, UX is typography', 'UX is only for mobile apps', 'There is no difference'], correct: 0 },
    { question: 'What is WCAG in digital accessibility?', options: ['Web Content Accessibility Guidelines for creating accessible experiences for people with disabilities', 'Web Coding Animation Guide', 'Workflow Central Access Group', 'Wireframe Calibration Architecture Guide'], correct: 0 },
    { question: 'What is the minimum recommended color contrast ratio for normal text under WCAG AA standards?', options: ['4.5:1', '2:1', '10:1', '1:1'], correct: 0 },
    { question: 'What is a Design System in digital product development?', options: ['A centralized collection of reusable components, guidelines, tokens, and standards for UI consistency', 'A single Figma sketch file', 'A CSS stylesheet with no documentation', 'A color wheel tool'], correct: 0 },
    { question: 'What is the primary objective of User Journey Mapping?', options: ['Visualizing the sequence of steps a user takes to achieve a goal within a product', 'Mapping network server topology', 'Calculating development costs', 'Organizing CSS classes'], correct: 0 },
    { question: 'What is Fitts’s Law in human-computer interaction?', options: ['The time required to rapidly move to a target area is a function of the ratio between distance and target width', 'Users read pages in an F-shaped pattern', 'Every UI must have three colors', 'Buttons must be square'], correct: 0 },
    { question: 'What is the purpose of low-fidelity wireframing before visual prototyping?', options: ['Focus on layout, structure, and user flow without distraction from colors and typography', 'Save disk storage', 'Avoid user testing', 'Produce final client presentation graphics'], correct: 0 },
    { question: 'What is A/B testing in UX optimization?', options: ['Comparing two versions of a webpage or screen to see which performs better on a target metric', 'Testing on two different monitors', 'Alpha and Beta release stages', 'Checking code in two browsers'], correct: 0 },
    { question: 'What is micro-interaction in product design?', options: ['Subtle visual animations and feedback responding to user triggers (e.g., toggle switches, heart likes)', 'Database transactions under 1ms', 'Miniature icon designs', 'Low-resolution images'], correct: 0 },
    { question: 'What is cognitive load in interface design?', options: ['The amount of mental processing power required to use an interface', 'The physical weight of a mobile device', 'CPU utilization of the browser', 'Network data consumption'], correct: 0 },
  ],
  'Internet of Things (IoT)': [
    { question: 'Which lightweight publish-subscribe messaging protocol is widely used for IoT device communication?', options: ['MQTT', 'HTTP/2', 'SMTP', 'BGP'], correct: 0 },
    { question: 'What is the purpose of an Edge Computing gateway in an IoT architecture?', options: ['Processes and filters sensor data locally before transmitting aggregated data to the cloud', 'Provides electricity to sensors', 'Hosts public websites', 'Replaces microcontrollers'], correct: 0 },
    { question: 'Which microcontroller board is commonly used for prototyping IoT and embedded projects?', options: ['ESP32 / Arduino', 'React Native', 'Docker Desktop', 'VirtualBox'], correct: 0 },
    { question: 'What is the difference between a sensor and an actuator in an IoT system?', options: ['Sensors capture physical input signals; actuators convert electrical signals into physical action', 'Sensors have Wi-Fi; actuators do not', 'Actuators measure temperature', 'They are synonymous'], correct: 0 },
    { question: 'Which wireless protocol is optimized for low-power, long-range IoT networks?', options: ['LoRaWAN', 'Gigabit Ethernet', 'HDMI', 'NFC'], correct: 0 },
    { question: 'What is an RTOS in embedded engineering?', options: ['Real-Time Operating System designed for deterministic task scheduling', 'Remote Terminal Online Service', 'Random Test Operating Standard', 'Relational Transaction OS'], correct: 0 },
    { question: 'Why is OTA (Over-The-Air) firmware update critical for deployed IoT devices?', options: ['Allows updating and patching device firmware remotely without physical hardware access', 'Speeds up battery charging', 'Eliminates sensor noise', 'Increases Wi-Fi signal strength'], correct: 0 },
    { question: 'Which bus communication protocol uses SDA and SCL lines for multi-device peripheral communication?', options: ['I2C (Inter-Integrated Circuit)', 'SPI', 'UART', 'RS-232'], correct: 0 },
    { question: 'What is the primary security challenge for low-cost IoT devices?', options: ['Constrained computational power and memory limiting robust encryption and regular patching', 'Screens are too small', 'Batteries do not store data', 'Cables get disconnected'], correct: 0 },
    { question: 'What is digital twinning in Industrial IoT (IIoT)?', options: ['A real-time virtual simulation representing the state and behavior of a physical asset', 'Cloning Git branches', 'Purchasing two identical sensors', 'Dual-monitor monitoring'], correct: 0 },
  ],
  'Blockchain Development': [
    { question: 'What is a Smart Contract on the Ethereum blockchain?', options: ['Self-executing code with terms of agreement written directly into blockchain state', 'A legal document scanned into PDF', 'A cryptographic mining rig', 'An encrypted email message'], correct: 0 },
    { question: 'Which programming language is predominantly used for writing Ethereum smart contracts?', options: ['Solidity', 'Python', 'Swift', 'TypeScript only'], correct: 0 },
    { question: 'What is gas in the Ethereum network?', options: ['Computational fee required to execute transactions and smart contracts', 'Server cooling liquid', 'Token inflation rate', 'Number of miners active'], correct: 0 },
    { question: 'What is the primary characteristic of an immutable ledger?', options: ['Data written and confirmed cannot be retroactively altered or deleted', 'Transactions can be edited by admins', 'Database is cleared every month', 'All data is public domain only'], correct: 0 },
    { question: 'Which consensus mechanism replaced Proof of Work (PoW) in Ethereum 2.0?', options: ['Proof of Stake (PoS)', 'Proof of Authority', 'Delegated Byzantine Fault Tolerance', 'Round Robin'], correct: 0 },
    { question: 'What is an ERC-20 token standard?', options: ['Technical standard for fungible tokens on the Ethereum blockchain', 'Non-fungible artwork standard', 'Database index format', 'Hardware wallet protocol'], correct: 0 },
    { question: 'What is the role of EVM (Ethereum Virtual Machine)?', options: ['Decentralized virtual environment that executes smart contract bytecode across all network nodes', 'Hardware wallet manufacturer', 'A cryptocurrency exchange', 'A web browser extension'], correct: 0 },
    { question: 'What is a Reentrancy Attack in smart contract vulnerability analysis?', options: ['A flaw where an external contract calls back into the vulnerable contract before state update completes', 'Cracking private keys with brute force', 'Flooding network with spam transactions', 'Mining empty blocks'], correct: 0 },
    { question: 'What is IPFS in Web3 decentralized storage?', options: ['InterPlanetary File System, a peer-to-peer hypermedia protocol for content-addressed storage', 'Internet Protocol Firewall System', 'Internal Payment Financial System', 'Integrated Provider File Service'], correct: 0 },
    { question: 'What is a DAO in decentralized governance?', options: ['Decentralized Autonomous Organization governed by smart contracts and token holders', 'Distributed Access Operator', 'Database Administration Office', 'Digital Asset Option'], correct: 0 },
  ],
  'Software Testing and QA': [
    { question: 'What is the Page Object Model (POM) in automated UI test development?', options: ['Design pattern separating page element locators and interactions from test logic for maintainability', 'A CSS styling framework', 'A backend microservice', 'A database normalization form'], correct: 0 },
    { question: 'What is the difference between Black Box Testing and White Box Testing?', options: ['Black Box tests functionality without internal code knowledge; White Box tests internal code structure and logic', 'Black Box tests are run at night', 'White Box is exclusively manual', 'Black Box is deprecated'], correct: 0 },
    { question: 'Which automated testing tool is widely used for end-to-end browser testing with modern JavaScript/TypeScript?', options: ['Playwright / Cypress', 'Wordpress', 'Photoshop', 'Notepad++'], correct: 0 },
    { question: 'What is Regression Testing?', options: ['Re-running existing tests to verify that new code changes have not broken existing functionality', 'Testing backward compatibility on Windows 95 only', 'Deleting old tests', 'Testing system memory leaks only'], correct: 0 },
    { question: 'What is the Testing Pyramid concept in software quality?', options: ['A large base of fast unit tests, fewer integration tests, and a small layer of end-to-end tests', 'Running tests in hierarchical team order', 'A certification exam scheme', 'Organizing tests by alphabetical name'], correct: 0 },
    { question: 'What is an assertion in a test script?', options: ['A boolean condition that must evaluate to true for the test step to pass', 'A comment explaining the test author', 'A variable declaration', 'A network socket timeout'], correct: 0 },
    { question: 'What tool is widely used for automated API testing, collection runs, and mock servers?', options: ['Postman / Newman', 'Vite', 'Webpack', 'Tailwind'], correct: 0 },
    { question: 'What is boundary value analysis in test case design?', options: ['Testing values at and immediately surrounding the extreme edges of input ranges', 'Testing only negative numbers', 'Testing system clock boundaries', 'Testing network cable length'], correct: 0 },
    { question: 'What is Code Coverage in automated testing?', options: ['Metric quantifying the percentage of source code executed while running automated test suites', 'Number of files in repository', 'Number of comments per line', 'GitHub star count'], correct: 0 },
    { question: 'Why should hardcoded Thread.sleep() delays be avoided in automated test scripts?', options: ['They cause flaky tests, unnecessarily slow down execution, and explicit/fluent waits should be used instead', 'They take up excessive disk space', 'Java does not support them', 'They cause compiler errors in CI'], correct: 0 },
  ],
};

const lookupQuestionBank = (key: string) => {
  if (questionBanks[key]) return questionBanks[key];
  for (const k of Object.keys(questionBanks)) {
    if (k.toLowerCase() === key.toLowerCase() || key.toLowerCase().includes(k.toLowerCase()) || k.toLowerCase().includes(key.toLowerCase())) {
      return questionBanks[k];
    }
  }
  return questionBanks['JavaScript Fundamentals'];
};

export const AssessmentTestPage: React.FC = () => {
  const navigate = useNavigate();
  const selectedAssessment = localStorage.getItem('selected_assessment') || 'JavaScript Fundamentals';
  const questions = lookupQuestionBank(selectedAssessment);

  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState<(number | null)[]>(Array(questions.length).fill(null));
  const [secondsLeft, setSecondsLeft] = useState(20 * 60);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const [finished, setFinished] = useState(false);

  // Timer
  useEffect(() => {
    if (finished) return;
    const interval = setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          handleSubmitTest();
          return 0;
        }
        return prev - 1;
      });
      setElapsedSeconds((prev) => prev + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [finished]);

  const handleSelectAnswer = (optionIdx: number) => {
    if (finished) return;
    setAnswers((prev) => {
      const next = [...prev];
      next[current] = optionIdx;
      return next;
    });
  };

  const handleNext = () => {
    if (current < questions.length - 1) {
      setCurrent(current + 1);
    } else {
      const unanswered = answers.filter((a) => a === null).length;
      if (unanswered > 0) {
        if (!window.confirm(`You have ${unanswered} unanswered question(s). Submit anyway?`)) {
          return;
        }
      }
      handleSubmitTest();
    }
  };

  const handlePrevious = () => {
    if (current > 0) {
      setCurrent(current - 1);
    }
  };

  const handleSubmitTest = () => {
    setFinished(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });

    try {
      const numCorrect = answers.filter((a, idx) => a === questions[idx]?.correct).length;
      const pct = Math.round((numCorrect / questions.length) * 100);
      const userEmail = getCurrentSessionEmail() || 'student@skilltwin.ai';
      const activeDomain = getActiveDomain();

      saveAssessmentResultToDb({
        email: userEmail,
        domainId: activeDomain.id,
        category: selectedAssessment,
        testType: 'technical_quiz',
        score: numCorrect,
        totalQuestions: questions.length,
        percentage: pct,
        answersData: answers.map((ans, idx) => ({
          question: questions[idx]?.question,
          selectedAnswer: ans !== null ? questions[idx]?.options[ans] : null,
          correctAnswer: questions[idx]?.options[questions[idx]?.correct],
          isCorrect: ans === questions[idx]?.correct,
        })),
        passed: pct >= 60,
      });
    } catch (err) {
      console.warn('Supabase assessment save error:', err);
    }
  };

  const handleRetake = () => {
    setAnswers(Array(questions.length).fill(null));
    setCurrent(0);
    setSecondsLeft(20 * 60);
    setElapsedSeconds(0);
    setFinished(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const minutes = Math.floor(secondsLeft / 60);
  const seconds = secondsLeft % 60;
  const timeDisplay = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

  const q = questions[current];
  const progressPercent = Math.round((current / questions.length) * 100);

  // Result stats
  const correct = answers.filter((a, idx) => a === questions[idx].correct).length;
  const unanswered = answers.filter((a) => a === null).length;
  const incorrect = questions.length - correct - unanswered;
  const score = Math.round((correct / questions.length) * 100);

  return (
    <div className="space-y-6 max-w-[1500px] mx-auto font-sans pb-16 text-[#334155]">
      {/* ================= PAGE HEADER ================= */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-[28px] font-extrabold text-[#0B1F3A] tracking-tight mb-1">
            Assessment Test
          </h1>
          <p className="text-xs sm:text-[13px] text-[#64748B]">
            Test your technical knowledge and identify areas for improvement.
          </p>
        </div>

        <button
          onClick={() => navigate('/assessments')}
          className="border border-[#E2E8F0] bg-white px-4 py-2 rounded-[9px] text-xs font-bold text-[#334155] hover:border-[#5B2EFF] hover:text-[#5B2EFF] transition-colors self-start sm:self-auto cursor-pointer shadow-xs"
        >
          ← Back to Assessments
        </button>
      </div>

      {/* ================= AI BANNER ================= */}
      <div className="bg-gradient-to-r from-[#0B1F3A] via-[#12284C] to-[#182F55] text-white rounded-2xl p-6 sm:p-7 relative overflow-hidden shadow-md">
        <div className="relative z-10 space-y-1.5">
          <div className="text-[10px] font-bold uppercase tracking-wider text-[#A5B4FC]">
            ✦ SKILLTWIN AI ASSESSMENT
          </div>
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-white">
            Test your skills and discover your gaps
          </h2>
          <p className="text-xs sm:text-[13px] text-[#CBD5E1] leading-relaxed">
            Your result helps you identify strengths and areas for improvement.
          </p>
        </div>
      </div>

      {/* ================= ACTIVE TEST VIEW ================= */}
      {!finished ? (
        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_280px] gap-5 items-start">
          {/* Left: Test Card */}
          <div className="bg-white border border-[#E2E8F0] rounded-[15px] overflow-hidden shadow-xs">
            {/* Test Header */}
            <div className="p-5 border-b border-[#E2E8F0] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-[11px] bg-[#EDE9FE] text-[#5B2EFF] flex items-center justify-center font-bold text-lg shrink-0">
                  ✓
                </div>
                <div>
                  <h2 className="text-[15px] font-bold text-[#0B1F3A]">{selectedAssessment}</h2>
                  <p className="text-[10px] text-[#64748B]">Knowledge Assessment</p>
                </div>
              </div>

              <div className="bg-[#FFF7ED] text-[#C2410C] border border-[#FED7AA] rounded-[9px] px-3 py-2 text-xs font-extrabold whitespace-nowrap self-start sm:self-auto">
                {timeDisplay}
              </div>
            </div>

            {/* Question Area */}
            <div className="p-6 sm:p-7 space-y-5">
              <div className="space-y-2">
                <div className="flex justify-between text-xs text-[#64748B]">
                  <span>Question {current + 1} of {questions.length}</span>
                  <span>{progressPercent}% Complete</span>
                </div>
                <div className="h-2 w-full bg-[#E2E8F0] rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#5B2EFF] rounded-full transition-all duration-300"
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>
              </div>

              <div>
                <span className="inline-block bg-[#E6F7F4] text-[#008A75] px-2.5 py-1 rounded-full text-[10px] font-extrabold uppercase mb-2">
                  Technical
                </span>
                <h3 className="text-lg sm:text-[19px] font-bold text-[#0B1F3A] leading-snug">
                  {q.question}
                </h3>
              </div>

              {/* Options */}
              <div className="space-y-2.5 pt-1">
                {q.options.map((option, idx) => {
                  const isSelected = answers[current] === idx;
                  return (
                    <button
                      key={idx}
                      onClick={() => handleSelectAnswer(idx)}
                      className={`w-full text-left p-3.5 rounded-[10px] border transition-all flex items-center gap-3 cursor-pointer ${
                        isSelected
                          ? 'border-[#5B2EFF] bg-[#F3EFFF] shadow-xs'
                          : 'border-[#E2E8F0] bg-white hover:border-[#5B2EFF] hover:bg-[#FAF9FF]'
                      }`}
                    >
                      <span
                        className={`w-7 h-7 rounded-[8px] flex items-center justify-center font-extrabold text-xs shrink-0 ${
                          isSelected
                            ? 'bg-[#5B2EFF] text-white'
                            : 'bg-[#F1F5F9] text-[#475569]'
                        }`}
                      >
                        {String.fromCharCode(65 + idx)}
                      </span>
                      <span className="text-xs text-[#334155] font-medium leading-relaxed">
                        {option}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Navigation buttons */}
              <div className="pt-4 border-t border-[#E2E8F0] flex items-center justify-between">
                <button
                  onClick={handlePrevious}
                  disabled={current === 0}
                  className="px-4 py-2.5 rounded-[9px] bg-[#F1F5F9] hover:bg-[#E2E8F0] disabled:opacity-40 text-xs font-bold text-[#334155] transition-colors cursor-pointer"
                >
                  ← Previous
                </button>

                <button
                  onClick={handleNext}
                  className="px-5 py-2.5 rounded-[9px] bg-[#5B2EFF] hover:bg-[#4820DC] text-white text-xs font-bold transition-all shadow-xs cursor-pointer"
                >
                  {current === questions.length - 1 ? 'Submit Test ✓' : 'Next →'}
                </button>
              </div>
            </div>
          </div>

          {/* Right: Test Overview Sidebar */}
          <aside className="bg-white border border-[#E2E8F0] rounded-[15px] p-5 shadow-xs space-y-4">
            <h3 className="text-[13px] font-bold text-[#0B1F3A]">Test Overview</h3>

            <div className="divide-y divide-[#F1F5F9] text-xs">
              <div className="py-2 flex justify-between">
                <span className="text-[#64748B]">Assessment</span>
                <span className="font-bold text-[#0B1F3A] truncate max-w-[140px] text-right">{selectedAssessment}</span>
              </div>
              <div className="py-2 flex justify-between">
                <span className="text-[#64748B]">Questions</span>
                <span className="font-bold text-[#0B1F3A]">{questions.length}</span>
              </div>
              <div className="py-2 flex justify-between">
                <span className="text-[#64748B]">Duration</span>
                <span className="font-bold text-[#0B1F3A]">20 min</span>
              </div>
              <div className="py-2 flex justify-between">
                <span className="text-[#64748B]">Difficulty</span>
                <span className="font-bold text-[#0B1F3A]">Beginner</span>
              </div>
              <div className="py-2 flex justify-between">
                <span className="text-[#64748B]">Negative Marking</span>
                <span className="font-bold text-[#0B1F3A]">No</span>
              </div>
            </div>

            <div className="pt-2 space-y-2.5">
              <h3 className="text-xs font-bold text-[#0B1F3A]">Question Map</h3>
              <div className="grid grid-cols-5 gap-1.5">
                {questions.map((_, idx) => {
                  const isCur = idx === current;
                  const isAnswered = answers[idx] !== null;

                  let style = 'bg-white text-[#334155] border-[#E2E8F0]';
                  if (isCur) {
                    style = 'bg-[#5B2EFF] text-white border-[#5B2EFF] font-bold';
                  } else if (isAnswered) {
                    style = 'bg-[#E6F7F4] text-[#008A75] border-[#9DDFD3] font-bold';
                  }

                  return (
                    <button
                      key={idx}
                      onClick={() => setCurrent(idx)}
                      className={`h-8 rounded-[7px] border text-xs flex items-center justify-center transition-colors cursor-pointer ${style}`}
                    >
                      {idx + 1}
                    </button>
                  );
                })}
              </div>

              <div className="grid gap-1.5 pt-2 text-[10px] text-[#64748B]">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-[3px] bg-[#5B2EFF]" />
                  <span>Current</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-[3px] bg-[#00A88F]" />
                  <span>Answered</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-[3px] bg-[#E2E8F0]" />
                  <span>Unanswered</span>
                </div>
              </div>
            </div>
          </aside>
        </div>
      ) : (
        /* ================= RESULT SCREEN ================= */
        <div className="bg-white border border-[#E2E8F0] rounded-[15px] p-6 sm:p-8 max-w-[950px] mx-auto text-center shadow-xs space-y-6 animate-in fade-in-50 duration-200">
          <div className="w-[70px] h-[70px] rounded-full bg-[#E6F7F4] text-[#00A88F] flex items-center justify-center text-3xl mx-auto">
            ✓
          </div>

          <div>
            <h2 className="text-2xl font-bold text-[#0B1F3A]">Assessment Completed!</h2>
            <p className="text-xs text-[#64748B] mt-1">
              You scored {score}% in {selectedAssessment}.
            </p>
          </div>

          {/* Score Circle */}
          <div className="w-[135px] h-[135px] border-[10px] border-[#E2E8F0] rounded-full mx-auto flex flex-col items-center justify-center">
            <strong className="text-3xl font-extrabold text-[#5B2EFF] leading-none">
              {score}%
            </strong>
            <span className="text-[10px] text-[#64748B] mt-1 font-semibold">Overall Score</span>
          </div>

          {/* Result Stats Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-xl mx-auto">
            <div className="p-3.5 bg-[#F8FAFC] rounded-[10px] border border-[#EEF2F7]">
              <strong className="block text-xl font-bold text-[#0B1F3A]">{correct}</strong>
              <span className="text-[10px] text-[#64748B]">Correct</span>
            </div>
            <div className="p-3.5 bg-[#F8FAFC] rounded-[10px] border border-[#EEF2F7]">
              <strong className="block text-xl font-bold text-[#0B1F3A]">{incorrect}</strong>
              <span className="text-[10px] text-[#64748B]">Incorrect</span>
            </div>
            <div className="p-3.5 bg-[#F8FAFC] rounded-[10px] border border-[#EEF2F7]">
              <strong className="block text-xl font-bold text-[#0B1F3A]">{unanswered}</strong>
              <span className="text-[10px] text-[#64748B]">Unanswered</span>
            </div>
            <div className="p-3.5 bg-[#F8FAFC] rounded-[10px] border border-[#EEF2F7]">
              <strong className="block text-xl font-bold text-[#0B1F3A]">
                {Math.floor(elapsedSeconds / 60)}:{String(elapsedSeconds % 60).padStart(2, '0')}
              </strong>
              <span className="text-[10px] text-[#64748B]">Time Taken</span>
            </div>
          </div>

          {/* AI Performance Analysis */}
          <div className="p-4.5 bg-[#F8FAFC] border border-[#EEF2F7] rounded-[11px] text-left text-xs leading-relaxed max-w-xl mx-auto space-y-1">
            <h3 className="font-bold text-[#0B1F3A]">✦ AI Performance Analysis</h3>
            <p className="text-[#64748B]">
              {score >= 80
                ? 'Excellent work! You demonstrated a strong understanding of this topic. Continue practising advanced concepts and real-world projects.'
                : score >= 60
                ? 'Good progress. Review the questions you missed, practise the relevant concepts, and retake the assessment to improve your score.'
                : 'Use this result as a learning guide. Review the fundamentals, practise with examples, and retake the assessment after studying.'}
            </p>
          </div>

          {/* Question Review List */}
          <div className="text-left max-w-xl mx-auto space-y-3 pt-2">
            <h3 className="text-base font-bold text-[#0B1F3A]">Question Review</h3>
            <div className="space-y-2">
              {questions.map((item, idx) => {
                const userAns = answers[idx];
                const isCorr = userAns === item.correct;

                return (
                  <div key={idx} className="border border-[#E2E8F0] rounded-[10px] p-3.5 text-xs space-y-1">
                    <div className="font-bold text-[#0B1F3A]">
                      {idx + 1}. {item.question}
                    </div>
                    <div className={`font-semibold ${userAns === null ? 'text-[#D97706]' : isCorr ? 'text-[#008A75]' : 'text-[#DC2626]'}`}>
                      Your answer: {userAns === null ? 'Not answered' : item.options[userAns]}
                    </div>
                    <div className="text-[#008A75] font-semibold">
                      Correct answer: {item.options[item.correct]}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="pt-4 flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={handleRetake}
              className="px-4 py-2.5 rounded-[9px] bg-white border border-[#E2E8F0] text-xs font-bold text-[#334155] hover:bg-slate-50 cursor-pointer"
            >
              Retake Assessment
            </button>
            <button
              onClick={() => navigate('/skill-gap')}
              className="px-5 py-2.5 rounded-[9px] bg-[#5B2EFF] hover:bg-[#4820DC] text-white text-xs font-bold transition-all shadow-xs cursor-pointer"
            >
              View Skill Gap →
            </button>
            <button
              onClick={() => navigate('/assessments')}
              className="px-4 py-2.5 rounded-[9px] bg-[#00A88F] hover:bg-[#008F7A] text-white text-xs font-bold transition-all shadow-xs cursor-pointer"
            >
              Back to Assessments
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
