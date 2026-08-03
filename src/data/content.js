/**
 * Single source of truth for every piece of copy on the site.
 * Edit here — the sections render straight from this file.
 */

export const profile = {
  name: 'Swathi K N',
  firstName: 'Swathi',
  role: 'Software Engineer',
  tagline: 'Backend Engineer • Full-Stack Developer • AI Builder',
  location: 'Bengaluru, India',
  email: 'swathikn6142@gmail.com',
  resumeUrl: '/Swathi_K_N_Resume_Letter.pdf',
  resumeFileName: 'Swathi_K_N_Resume_Letter.pdf',
  // Kept to one line on purpose — the full version lives in the About section.
  summary:
    'Building scalable applications, intelligent systems, and software that solves real-world problems.',
  availability: 'Open to SDE & AI engineering roles',
}

export const socials = [
  { label: 'GitHub', href: 'https://github.com/swathikn61', icon: 'github' },
  { label: 'LinkedIn', href: 'https://linkedin.com/in/swathikn', icon: 'linkedin' },
  { label: 'Email', href: `mailto:${profile.email}`, icon: 'mail' },
]

export const contact = {
  heading: "Let's connect",
  description:
    "I'm open to SDE and AI/ML roles, internships and collaboration on interesting projects. Email is the fastest way to reach me.",
  channels: [
    {
      label: 'Email',
      value: profile.email,
      href: `mailto:${profile.email}`,
      icon: 'mail',
    },
    {
      label: 'LinkedIn',
      value: 'linkedin.com/in/swathikn',
      href: 'https://linkedin.com/in/swathikn',
      icon: 'linkedin',
    },
    {
      label: 'GitHub',
      value: 'github.com/swathikn61',
      href: 'https://github.com/swathikn61',
      icon: 'github',
    },
    { label: 'Location', value: profile.location, href: null, icon: 'location' },
  ],
}

export const navLinks = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
  { id: 'experience', label: 'Experience' },
  { id: 'education', label: 'Education' },
  { id: 'resume', label: 'Resume' },
  { id: 'contact', label: 'Contact' },
]

export const about = {
  paragraphs: [
    "I'm a Computer Science graduate from Global Academy of Technology, Bengaluru, with a passion for building software that's reliable, scalable, and solves real problems. I enjoy turning ideas into production-ready applications, whether it's a backend service, a full-stack web app, or an AI-powered tool.",
    "I've worked with Java, Spring Boot, React, Python, Node.js, PostgreSQL, Docker, and Redis to build REST APIs, authentication systems, caching layers, and modern web applications. Alongside software engineering, I've been exploring Generative AI, building applications with LangChain, RAG pipelines, vector databases, and local LLMs.",
    "What excites me most is the engineering behind great products like the architecture, performance, clean code, and the small implementation details that make software dependable and easy to maintain. I enjoy learning new technologies, taking on challenging projects, and continuously improving as an engineer.",
    "I'm currently looking for SDE-1, Backend, Full-Stack, or AI Engineering opportunities where I can contribute, learn from experienced teams, and build products that make an impact."
  ],
}

export const skills = [
  {
    category: 'Languages',
    items: ['C++', 'Java', 'Python', 'JavaScript', 'TypeScript', 'SQL'],
  },
  {
    category: 'Backend',
    items: [
      'Spring Boot',
      'Node.js',
      'Express.js',
      'FastAPI',
      'REST APIs',
      'Microservices',
      'Kafka',
      'JWT',
    ],
  },
  {
    category: 'Databases & Caching',
    items: ['PostgreSQL', 'Redis', 'FAISS', 'SQLite'],
  },
  {
    category: 'Cloud & DevOps',
    items: ['AWS EC2', 'AWS S3', 'AWS Lambda', 'Docker', 'GitHub Actions', 'CI/CD'],
  },
  {
    category: 'AI / ML',
    items: ['LangChain', 'LangGraph', 'RAG', 'Ollama', 'Embeddings', 'LLM-as-judge'],
  },
  {
    category: 'Tools & Practices',
    items: ['Git', 'Agile / Scrum', 'Unit Testing', 'OpenAPI / Swagger'],
  },
  {
    category: 'Core Concepts',
    items: [
      'Data Structures & Algorithms',
      'System Design',
      'OOP',
      'DBMS',
      'Operating Systems',
      'Computer Networks',
    ],
  },
]

export const projects = [
  {
    title: 'Multi-Model Evaluation Dashboard',
    description:
      'Compares three local LLMs (Llama 3, Mistral and Phi-3) on identical prompts, tracking latency, token usage and response quality. Each response is graded by an LLM-as-judge against a fixed 1 to 5 rubric, with every run stored in SQLite for side-by-side comparison over time.',
    stack: ['FastAPI', 'Ollama', 'Python', 'SQLite'],
    tag: 'AI / Evaluation',
    featured: true,
  },
  {
    title: 'URL Shortener Service',
    description:
      'A Bitly-style shortening service using 6-character Base62 codes (~56.8 billion combinations) with collision-safe retries, click analytics and link expiry. Built on a layered Spring Boot architecture with Redis caching and IP rate limiting via Bucket4j.',
    stack: ['Spring Boot', 'Java', 'PostgreSQL', 'Redis'],
    tag: 'Backend / System Design',
    featured: true,
  },
  {
    title: 'Personal Finance Tracker',
    description:
      'A TypeScript backend for tracking income and expenses across users, entries and daily summaries. Secured with JWT access/refresh token rotation and tiered rate limiting, with Redis-cached filtering and pagination, plus a cron job that recomputes per-user balances every 10 minutes.',
    stack: ['Node.js', 'Express', 'TypeScript', 'PostgreSQL', 'Redis'],
    tag: 'Backend',
    featured: true,
  },
  {
    title: 'Next-Gen Waste Management',
    description:
      'An IoT waste management system using Arduino sensors to monitor bin levels in real time. Sensor data flows through ThingSpeak into a React dashboard with role-based views for admins, drivers and users.',
    stack: ['IoT', 'Arduino', 'React', 'Tailwind CSS', 'Supabase'],
    tag: 'IoT / Full-stack',
    featured: false,
  },
]

export const experience = [
  {
    role: 'Student Trainee',
    company: 'Rakuten India',
    location: 'Bengaluru, India',
    period: 'Jan 2026 to Apr 2026',
    current: false,
    points: [
      'Built and delivered 3+ full-stack applications across frontend and backend, contributing 10+ features spanning API integration and core application functionality.',
      'Developed secure web solutions with JWT-based authentication, protected routes and role-based access control supporting 3+ user roles.',
      'Implemented backend systems in Node.js, Express.js, PostgreSQL and Spring Boot, building 20+ REST endpoints across 4+ relational entities (Users, Projects, Tasks, Comments).',
      'Deployed and automated workflows using 5 AWS services (EC2, S3, Lambda, CloudWatch, VPC/IAM), Docker and GitHub Actions, building a 3-stage CI/CD pipeline.',
      'Built 3 AI-driven applications (a trip planner agent, a Notion automation agent and a PDF-based RAG system) using LLMs, FAISS and embeddings, plus event-driven microservices with Kafka and Redis.',
    ],
    stack: ['Node.js', 'Spring Boot', 'PostgreSQL', 'AWS', 'Docker', 'Kafka', 'LangChain'],
  },
]

export const education = [
  {
    institution: 'Global Academy of Technology',
    credential: 'Bachelor of Engineering, Computer Science',
    location: 'Bengaluru, Karnataka',
    period: '2022 to June 2026',
    score: 'CGPA 8.75 / 10',
  },
]

export const certifications = [
  {
    name: 'Artificial Intelligence Fundamentals',
    issuer: 'IBM SkillsBuild',
    detail: null,
    certificateUrl: '/certificates/ai-fundamentals-ibm-skillsbuild.pdf',
  },
]

export const activities = [
  'Coordinator, IT Virtuoso Student Forum, Dept. of CSE, Global Academy of Technology.',
  'Organizing Committee Member, IET India Scholarship Award 2024, Regional Rounds (South 2).',
  'Progressed from Volunteer (Feb 2024) to Coordinator for Hack-a-League 3.0 (Feb 2025) and 4.0 (Feb 2026), both 24-hour offline hackathons.',
  'Volunteer, Youth For Seva, a week-long educational camp for government school children.',
]
