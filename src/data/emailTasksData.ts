import {
  RecurringEmailTask,
  CuratedJobRole,
  DailyInterviewTopicSet,
} from '../types';

export const initialRecurringTasks: RecurringEmailTask[] = [
  {
    id: 'task-daily-jobs-12pm',
    title: 'Daily Associate Software Engineer Jobs (India & Remote)',
    type: 'daily_jobs',
    cronTime: '12:00 PM IST',
    hour: 12,
    minute: 0,
    timeZone: 'Asia/Kolkata (IST)',
    isActive: true,
    recipientEmail: 'ankitachintakindi@gmail.com',
    targetJobTitle: 'Associate Software Engineer / Junior SDE',
    experienceRange: '0–2 years',
    locationPreference: 'India (Remote + On-site / Hybrid: Hyderabad, Bengaluru, Pune, Delhi NCR)',
    companyFocus: 'Product-based Companies & Top Tech Startups',
    includeLinkedInOutreach: true,
    lastSentDate: 'Today, 12:00 PM IST',
    nextScheduledRun: 'Tomorrow at 12:00 PM IST',
    totalEmailsDispatched: 14,
    recentDispatches: [
      {
        id: 'dispatch-job-001',
        sentAt: 'Today, 12:00 PM IST',
        recipientEmail: 'ankitachintakindi@gmail.com',
        subject: '🚀 [12:00 PM Digest] Fresh Associate Software Engineer Openings (0–2 Yrs) + LinkedIn Outreach Templates',
        jobItemsCount: 6,
        status: 'delivered',
        previewHtmlSnippet: '6 curated Associate Software Engineer openings at top product companies (Microsoft India, Swiggy, Razorpay, CRED, Meesho, Postman) with direct application links and personalized recruiter connection notes.',
      },
      {
        id: 'dispatch-job-002',
        sentAt: 'Yesterday, 12:00 PM IST',
        recipientEmail: 'ankitachintakindi@gmail.com',
        subject: '🚀 [12:00 PM Digest] Fresh Associate Software Engineer Openings (0–2 Yrs)',
        jobItemsCount: 5,
        status: 'delivered',
        previewHtmlSnippet: '5 openings at Flipkart, PhonePe, BrowserStack, Juspay, and Atlassian India.',
      }
    ]
  },
  {
    id: 'task-daily-interview-6pm',
    title: 'Daily Most Repeated SDE Interview Questions & Revision',
    type: 'daily_interview_questions',
    cronTime: '6:00 PM IST',
    hour: 18,
    minute: 0,
    timeZone: 'Asia/Kolkata (IST)',
    isActive: true,
    recipientEmail: 'ankitachintakindi@gmail.com',
    targetJobTitle: 'Associate Software Engineer Interview Master Pack',
    topicsCovered: [
      'HR & Behavioral (STAR Method)',
      'Data Structures & Algorithms (Arrays, HashMaps, Trees, Two Pointers)',
      'Core Java & Python',
      'Object Oriented Programming (OOPS)',
      'Database Management Systems (DBMS & SQL)',
      'Foundational System Design'
    ],
    lastSentDate: 'Today, 6:00 PM IST',
    nextScheduledRun: 'Tomorrow at 6:00 PM IST',
    totalEmailsDispatched: 14,
    recentDispatches: [
      {
        id: 'dispatch-int-001',
        sentAt: 'Today, 6:00 PM IST',
        recipientEmail: 'ankitachintakindi@gmail.com',
        subject: '📚 [6:00 PM Digest] Today’s Top 8 Most Repeated Associate SDE Interview Questions & Model Answers',
        questionItemsCount: 8,
        status: 'delivered',
        previewHtmlSnippet: 'High-frequency interview questions covering HR (Why should we hire you?), DSA (Two Sum O(N)), Java/Python Polymorphism, DBMS Indexing, and URL Shortener System Design with runnable code.',
      },
      {
        id: 'dispatch-int-002',
        sentAt: 'Yesterday, 6:00 PM IST',
        recipientEmail: 'ankitachintakindi@gmail.com',
        subject: '📚 [6:00 PM Digest] Daily SDE Interview Revision: OOPs Deep-Dive & SQL Window Functions',
        questionItemsCount: 7,
        status: 'delivered',
        previewHtmlSnippet: 'Covered SQL HAVING vs WHERE, Deadlocks in OS, and Binary Tree Level Order Traversal.',
      }
    ]
  }
];

export const sampleIndiaJobOpenings: CuratedJobRole[] = [
  {
    id: 'ase-job-01',
    roleTitle: 'Associate Software Engineer',
    companyName: 'Razorpay Software',
    companyLogo: 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=100&auto=format&fit=crop&q=80',
    location: 'Bengaluru, Karnataka (Hybrid / Remote Available)',
    workplaceType: 'Hybrid',
    experienceRange: '0–2 Years (Freshers & 2024/2025/2026 Batch Eligible)',
    techStack: ['Java', 'Spring Boot', 'Python', 'MySQL', 'Kafka', 'REST APIs', 'AWS'],
    salaryRange: '₹14,00,000 – ₹20,00,000 / year + ESOPs',
    applicationDeadline: 'Sep 15, 2026 (Rolling Hiring)',
    directApplyUrl: 'https://razorpay.com/careers/associate-software-engineer-2026',
    companyType: 'Top Fintech Unicorn / Product-Based',
    description: 'Work on India’s leading payments infrastructure handling 20,000+ requests/sec. Design resilient microservices, write clean testable Java/Python code, and ensure 99.99% transaction reliability.',
    linkedInOutreachTemplate: `Hi [Hiring Manager/Recruiter Name],

I noticed Razorpay is hiring for the Associate Software Engineer role in Bengaluru. With a strong background in Java/Python, Data Structures, and building scalable REST microservices, I admire Razorpay’s payments innovation and scale.

I have built end-to-end applications and would love to bring my problem-solving skills to the Core Platform team. Could we connect for a brief chat regarding my fit?

Resume & Portfolio: ankitachintakindi.dev
Best regards,
Ankita Chintakindi`,
    postedTimeAgo: 'Today at 10:45 AM IST',
  },
  {
    id: 'ase-job-02',
    roleTitle: 'Software Engineer - Associate / SDE 1',
    companyName: 'Swiggy (Bundl Technologies)',
    companyLogo: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=100&auto=format&fit=crop&q=80',
    location: 'Remote (India) / Bengaluru Headquarters',
    workplaceType: 'Remote',
    experienceRange: '0–1 Year (Entry Level / Campus Graduates)',
    techStack: ['Go / Java', 'Python', 'PostgreSQL', 'Redis', 'Docker', 'Distributed Systems'],
    salaryRange: '₹18,00,000 – ₹24,00,000 / year + Joining Bonus',
    applicationDeadline: 'Sep 20, 2026',
    directApplyUrl: 'https://careers.swiggy.com/engineering/sde1-associate-platform',
    companyType: 'Leading Quick-Commerce & Food-Tech Giant',
    description: 'Join the Logistics Routing & Cart Platform engineering teams. Optimize hyper-local delivery dispatch algorithms, maintain high-throughput Redis caching layers, and implement clean APIs.',
    linkedInOutreachTemplate: `Hello [Recruiter Name],

Hope you are having a wonderful week! I saw the opening for the Associate SDE role on Swiggy’s Logistics & Platform Engineering team. 

Having solved 300+ LeetCode problems across DSA, with hands-on proficiency in Python, Java, and Redis caching systems, I am eager to contribute to Swiggy’s real-time routing engines.

I would appreciate the opportunity to discuss how my technical foundational skills align with Swiggy’s engineering high-bar.

Thank you for your time,
Ankita Chintakindi`,
    postedTimeAgo: 'Today at 11:15 AM IST',
  },
  {
    id: 'ase-job-03',
    roleTitle: 'Associate Software Development Engineer (ASDE)',
    companyName: 'CRED (Dreamplug Technologies)',
    companyLogo: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=100&auto=format&fit=crop&q=80',
    location: 'Bengaluru, India (On-site / Relocation Support)',
    workplaceType: 'On-site',
    experienceRange: '0–2 Years',
    techStack: ['Java / Kotlin', 'Python', 'Microservices', 'PostgreSQL', 'Kafka', 'System Design'],
    salaryRange: '₹22,00,000 – ₹30,00,000 / year (Top-Tier Compensation)',
    applicationDeadline: 'Sep 30, 2026',
    directApplyUrl: 'https://cred.club/careers/engineering/associate-sde',
    companyType: 'High-Growth Fintech & Lifestyle Product',
    description: 'Collaborate with seasoned architects to build frictionless member reward engines, distributed ledger sync services, and ultra-responsive low latency backend services.',
    linkedInOutreachTemplate: `Hi [Recruiter / Talent Partner Name],

I have been following CRED’s high-craft engineering culture and architecture blogs. I am excited to apply for the Associate Software Development Engineer (ASDE) position.

My technical profile spans strong Object-Oriented design, DBMS query optimization, and building robust microservices. I am passionate about crafting reliable code at scale.

May I share my resume and GitHub project links for your consideration?

Warm regards,
Ankita Chintakindi`,
    postedTimeAgo: 'Today at 9:30 AM IST',
  },
  {
    id: 'ase-job-04',
    roleTitle: 'Associate Cloud & Software Engineer',
    companyName: 'Microsoft India Development Center (IDC)',
    companyLogo: 'https://images.unsplash.com/photo-1614680376593-902f749f7ffc?w=100&auto=format&fit=crop&q=80',
    location: 'Hyderabad / Bengaluru, India',
    workplaceType: 'Hybrid',
    experienceRange: '0–2 Years (B.Tech / M.Tech / MCA)',
    techStack: ['C# / Java', 'Python', 'Azure Cloud', 'Data Structures & Algorithms', 'SQL'],
    salaryRange: '₹16,00,000 – ₹22,00,000 / year + Relocation Benefits',
    applicationDeadline: 'Sep 25, 2026',
    directApplyUrl: 'https://careers.microsoft.com/us/en/job/associate-software-engineer-india',
    companyType: 'Tier 1 Global Product Big Tech (MAMAA)',
    description: 'Design and implement services in Azure Cloud, develop resilient enterprise tools, and collaborate across international product groups with modern engineering practices.',
    linkedInOutreachTemplate: `Dear [Hiring Team / Engineering Leader],

I am writing to express my enthusiastic interest in the Associate Software Engineer opportunity at Microsoft IDC Hyderabad/Bengaluru.

With proven strengths in Data Structures, Algorithms, Object-Oriented Design, and Cloud computing fundamentals, I am passionate about building software that impacts millions of global users.

I would love to connect and explore how my engineering mindset can contribute to Microsoft’s cloud platforms.

Sincerely,
Ankita Chintakindi`,
    postedTimeAgo: 'Today at 8:00 AM IST',
  },
  {
    id: 'ase-job-05',
    roleTitle: 'Associate Engineer - Backend Platform',
    companyName: 'Postman India',
    companyLogo: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=100&auto=format&fit=crop&q=80',
    location: 'Remote (India-wide)',
    workplaceType: 'Remote',
    experienceRange: '0–2 Years',
    techStack: ['Node.js / TypeScript', 'Python', 'REST/GraphQL', 'Docker', 'PostgreSQL', 'Redis'],
    salaryRange: '₹15,00,000 – ₹21,00,000 / year + Remote Work Stipend',
    applicationDeadline: 'Sep 18, 2026',
    directApplyUrl: 'https://www.postman.com/careers/associate-software-engineer-backend',
    companyType: 'Global Developer Tools Unicorn',
    description: 'Build API platform capabilities used by 30M+ developers worldwide. Work on collaborative workspace backends, WebSocket real-time synchronizations, and API mock servers.',
    linkedInOutreachTemplate: `Hi [Talent Acquisition Lead],

As a daily user of Postman for testing and architecting APIs, I was thrilled to see the Associate Backend Engineer opening!

I bring strong foundation in TypeScript/Node.js, REST API architecture, and database management, paired with a deep passion for developer tool ergonomics. 

I’d be grateful for a quick opportunity to share my GitHub portfolio and recent backend projects with the team.

Best regards,
Ankita Chintakindi`,
    postedTimeAgo: 'Today at 10:10 AM IST',
  },
  {
    id: 'ase-job-06',
    roleTitle: 'Junior Software Engineer (Full Stack / Backend)',
    companyName: 'Meesho',
    companyLogo: 'https://images.unsplash.com/photo-1512428559087-560fa5ceab42?w=100&auto=format&fit=crop&q=80',
    location: 'Bengaluru, Karnataka (Work From Anywhere / Remote OK)',
    workplaceType: 'Remote',
    experienceRange: '0–1 Year',
    techStack: ['Java', 'Python', 'React / TypeScript', 'MySQL', 'Kafka', 'Elasticsearch'],
    salaryRange: '₹14,00,000 – ₹18,50,000 / year + Performance Bonus',
    applicationDeadline: 'Oct 05, 2026',
    directApplyUrl: 'https://meesho.io/jobs/junior-software-engineer',
    companyType: 'Top E-Commerce Product Unicorn',
    description: 'Empower millions of Indian small businesses by scaling high-concurrency order processing, catalog search indexing with Elasticsearch, and secure checkout journeys.',
    linkedInOutreachTemplate: `Hello [Recruiter Name],

I saw Meesho’s opening for Junior Software Engineer and was inspired by your mission to democratize e-commerce across Tier-2 and Tier-3 India.

I have solid grounding in Core Java, Python, and SQL indexing, and I pride myself on writing clean, modular, and performant code.

I would love to be considered for this role. Thank you for your time and consideration!

Regards,
Ankita Chintakindi`,
    postedTimeAgo: 'Today at 11:40 AM IST',
  }
];

export const todayInterviewQuestionsPack: DailyInterviewTopicSet = {
  date: 'August 23, 2026',
  time: '6:00 PM IST Digest',
  targetRole: 'Associate Software Engineer (ASE / SDE-1)',
  focusAreas: [
    'Mainly HR & Behavioral (STAR)',
    'Data Structures & Algorithms',
    'Core Java & Python',
    'Object-Oriented Programming (OOPS)',
    'Database Management Systems (DBMS & SQL)',
    'Foundational System Design'
  ],
  questions: [
    {
      id: 'iq-hr-01',
      category: 'HR & Behavioral',
      frequency: '98% Repeated in Tier-1 & Startup Rounds',
      question: 'Why should we hire you as an Associate Software Engineer at our company, and how do you handle tight deadlines?',
      modelAnswer: `Structure your answer with Confidence, Skills, Culture Fit, and a concrete STAR example:
1. Core Value: "You should hire me because I offer a strong foundation in Computer Science fundamentals (DSA, OOPs, DBMS) combined with a proactive problem-solving mindset and quick learning agility."
2. Technical Alignment: "I write clean, documented, and unit-tested code in Python/Java and have built end-to-end projects demonstrating real-world API architecture and database indexing."
3. Handling Deadlines: "When facing tight deadlines, I first break the deliverable into prioritized milestones (MoSCoW method), eliminate scope creep, communicate early if blockers arise, and focus on delivering a working, robust Minimum Viable Product before secondary optimizations."`,
      keyTakeaways: [
        'Never say "Because I need a job" — emphasize mutual value creation.',
        'Showcase structured thinking: Prioritize -> Communicate -> Execute -> Deliver.',
        'Highlight your passion for their specific engineering domain.'
      ]
    },
    {
      id: 'iq-hr-02',
      category: 'HR & Behavioral',
      frequency: '95% Repeated',
      question: 'Tell me about a time you made a mistake or had a disagreement with a team member. How did you resolve it?',
      modelAnswer: `Use the STAR Framework (Situation, Task, Action, Result):
• Situation: "During a collaborative semester project building an e-commerce API, our team had conflicting opinions on whether to use MongoDB (NoSQL) or PostgreSQL (Relational)."
• Action: "Instead of debating subjectively, I suggested we list our exact data access patterns: ACID requirements, schema consistency for transactions, and complex JOIN queries. We created a quick matrix comparing latency and transactional safety."
• Result: "The team unanimously agreed PostgreSQL was the right choice. We delivered the project 3 days ahead of deadline with zero data corruption bugs. I learned that data-backed collaboration always resolves technical friction."`,
      keyTakeaways: [
        'Take ownership — do not blame teammates.',
        'Demonstrate emotional intelligence, active listening, and evidence-based decision making.'
      ]
    },
    {
      id: 'iq-dsa-01',
      category: 'Data Structures & Algorithms',
      frequency: '100% Top Repeated (LeetCode #1 / Blind 75)',
      question: 'Two Sum Problem: Given an array of integers `nums` and an integer `target`, return indices of the two numbers such that they add up to `target`. Solve in O(N) time.',
      modelAnswer: `Optimal Approach: Use a Hash Map (Dictionary) in a single pass.
As we iterate through the array at index i with number x, compute complement = target - x.
If complement exists in our map, return [map[complement], i].
Otherwise, store map[x] = i.
• Time Complexity: O(N) because hash map lookup and insert are O(1) on average.
• Space Complexity: O(N) to store up to N elements in the hash map.`,
      codeExample: {
        language: 'Python / Java',
        code: `# Python 3 Solution - O(N) Time, O(N) Space
def twoSum(nums: list[int], target: int) -> list[int]:
    lookup = {}
    for i, num in enumerate(nums):
        diff = target - num
        if diff in lookup:
            return [lookup[diff], i]
        lookup[num] = i
    return []

// Java Solution
public int[] twoSum(int[] nums, int target) {
    Map<Integer, Integer> map = new HashMap<>();
    for (int i = 0; i < nums.length; i++) {
        int diff = target - nums[i];
        if (map.containsKey(diff)) {
            return new int[] { map.get(diff), i };
        }
        map.put(nums[i], i);
    }
    return new int[]{};
}`
      },
      keyTakeaways: [
        'Mention brute force first: O(N^2) nested loops, then explain why Hash Map optimizes to O(N).',
        'State Time & Space complexity explicitly to the interviewer.'
      ]
    },
    {
      id: 'iq-oops-01',
      category: 'Object Oriented Programming (OOPS)',
      frequency: '96% Repeated across all Technical Rounds',
      question: 'What are the 4 Pillars of OOPs? Explain Polymorphism (Compile-time vs Runtime) with a real-world example.',
      modelAnswer: `The 4 Pillars of OOPs are:
1. Encapsulation: Bundling data (attributes) and methods that operate on that data inside a class while restricting direct access using private/protected access modifiers (e.g. getters/setters).
2. Abstraction: Hiding internal complexity and showing only relevant interfaces to the user (e.g., using Abstract Classes or Interfaces).
3. Inheritance: Mechanism where a child class acquires properties and behaviors of a parent class (promotes code reusability).
4. Polymorphism: Ability of an entity to take multiple forms.

Compile-time (Static) vs Runtime (Dynamic) Polymorphism:
• Method Overloading (Compile-time): Same method name with different parameter signatures in the same class (e.g., add(int, int) vs add(double, double)). Resolved during compilation.
• Method Overriding (Runtime): Subclass provides a specific implementation of a method already declared in its parent class (e.g., Payment.process() overridden by UPIPayment and CreditCardPayment). Resolved at runtime using Dynamic Method Dispatch.`,
      codeExample: {
        language: 'Java',
        code: `// Method Overriding (Runtime Polymorphism)
abstract class Payment {
    abstract void pay(double amount);
}

class UPIPayment extends Payment {
    @Override
    void pay(double amount) {
        System.out.println("Processing ₹" + amount + " via UPI QR/VPA");
    }
}

class CardPayment extends Payment {
    @Override
    void pay(double amount) {
        System.out.println("Processing ₹" + amount + " via Credit/Debit Gateway");
    }
}`
      },
      keyTakeaways: [
        'Always give a relatable domain example (Payment Gateway, Notification Service, Shape rendering).',
        'Distinguish clearly between Overloading (signature change) and Overriding (body change with same signature).'
      ]
    },
    {
      id: 'iq-dbms-01',
      category: 'DBMS & SQL',
      frequency: '95% Repeated',
      question: 'What are ACID properties in DBMS? What is the difference between Clustered and Non-Clustered Indexes?',
      modelAnswer: `ACID Properties guarantee reliable database transactions:
• Atomicity: "All or Nothing". If one step fails (e.g., debit succeeds but credit fails), the entire transaction rolls back.
• Consistency: Database moves from one valid state to another, satisfying all integrity constraints (Foreign Keys, NOT NULL).
• Isolation: Concurrent transactions execute without interfering with each other (achieved via isolation levels like Read Committed, Serializable).
• Durability: Once a transaction commits, its changes survive system crashes and power outages (saved to Write-Ahead Logs / Disk).

Clustered vs Non-Clustered Index:
• Clustered Index: Physically reorders the actual rows on disk based on the indexed key. A table can have ONLY ONE clustered index (usually the Primary Key). Lookups are fastest because data is stored right at the leaf level of the B+ Tree.
• Non-Clustered Index: Creates a separate lookup structure containing the indexed column and a pointer (RID / Clustered Key) to the actual data row. A table can have MULTIPLE non-clustered indexes.`,
      keyTakeaways: [
        'Use the Bank Account Transfer scenario to explain Atomicity and Isolation.',
        'Analogy for Indexes: Clustered Index is like page numbers in a dictionary; Non-Clustered Index is like the index topic list at the back of a textbook.'
      ]
    },
    {
      id: 'iq-sys-01',
      category: 'System Design (Foundational)',
      frequency: '90% Repeated for Freshers / Associate SDEs',
      question: 'How does a URL Shortener (like Bitly / TinyURL) work? Explain hashing, collision handling, and base-62 encoding.',
      modelAnswer: `High-Level Architecture for TinyURL:
1. Requirements:
   • Functional: Given a long URL, generate a unique 7-character short URL (e.g., bit.ly/3xZ9aQ). When accessed, redirect (HTTP 301 Permanent Redirect) to original URL.
   • Non-Functional: Highly available, low latency (<50ms redirection), scale to millions of links.

2. Unique Short Key Generation:
   • Base-62 Encoding: Characters [0-9, a-z, A-Z] give 62 total characters.
   • A 7-character string allows 62^7 ≈ 3.5 Trillion unique short URLs!
   • Approach A (Auto-increment ID + Base62): Convert a unique 64-bit integer ID (from a distributed generator like Snowflake or PostgreSQL Sequence) into a Base-62 string. Guaranteed collision-free and O(1) fast!
   • Approach B (MD5 Hash + Truncation): MD5(long_url) -> take first 7 chars. If collision exists in DB, append a counter or salt and re-hash.

3. Database Schema:
   • Table: \`urls (id BIGINT PK, short_key VARCHAR(7) UNIQUE, original_url TEXT, created_at TIMESTAMP)\`
   • Cache Layer: Redis caching the most popular 20% URLs (80/20 Pareto principle) for sub-millisecond redirect response.`,
      keyTakeaways: [
        'Mention HTTP 301 (Permanent Redirect - browser caches target) vs HTTP 302 (Temporary Redirect - hits server for analytics tracking).',
        'State why Redis caching makes reads blistering fast.'
      ]
    },
    {
      id: 'iq-core-01',
      category: 'Core Java / Python',
      frequency: '92% Repeated',
      question: 'What is the difference between `==` and `.equals()` in Java, or `==` vs `is` in Python? Explain memory allocation (Stack vs Heap).',
      modelAnswer: `Java:
• \`==\` compares memory references (addresses) of two objects on the Heap. Returns true only if both variables point to the exact same memory location.
• \`.equals()\` is a method intended to compare the logical content or value of objects (e.g., \`str1.equals(str2)\`).

Python:
• \`==\` checks for equality of values (e.g., \`[1,2] == [1,2]\` is True).
• \`is\` checks for identity (whether \`id(a) == id(b)\`, exact same memory address).

Stack vs Heap Memory:
• Stack Memory: Fast, stores primitive variables and method call execution frames. Allocated and deallocated automatically in LIFO order when functions return.
• Heap Memory: Stores all dynamically created objects and class instances. Managed by the Garbage Collector (GC). Objects survive beyond individual function scopes.`,
      codeExample: {
        language: 'Java & Python',
        code: `// Java Example
String s1 = new String("Hello");
String s2 = new String("Hello");
System.out.println(s1 == s2);      // false (different heap objects)
System.out.println(s1.equals(s2));  // true (same content)

# Python Example
list1 = [1, 2, 3]
list2 = [1, 2, 3]
print(list1 == list2) # True (same values)
print(list1 is list2) # False (distinct list objects in memory)`
      },
      keyTakeaways: [
        'Mention String Constant Pool (SCP) optimization in Java.',
        'Be ready to explain how Garbage Collection detects unreferenced objects on the Heap.'
      ]
    }
  ]
};
