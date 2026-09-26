// Single source of truth for site content.
// Edit this file to update copy, links, skills, projects, and experience.

export const profile = {
  name: 'Meet Kadiya',
  roles: ['Software Developer', 'Full-Stack Engineer', 'Problem Solver', 'Open Source Contributor'],
  tagline: 'I build clean, reliable software — from idea to production.',
  phone: '+91 8200518250',
  email: 'meetkadiya121@gmail.com',
  github: 'https://github.com/MeetKadiya/',
  githubUsername: 'MeetKadiya',
  linkedin: 'https://www.linkedin.com/in/meetkadiya/',
  resumeUrl: '/resume.pdf',
  location: 'India',
};

export const about = {
  summary: [
    "I'm a software developer who enjoys turning ambiguous problems into working, maintainable systems. I care about readable code, sensible architecture, and shipping things that hold up in production — not just in a demo.",
    "My day-to-day spans the full stack: designing APIs, building responsive interfaces, and setting up the pipelines that get code from a laptop to a live server without drama.",
  ],
  highlights: [
    { label: 'Focus', value: 'Full-stack web development' },
    { label: 'Approach', value: 'Clean architecture, tested code' },
    { label: 'Currently', value: 'Open to new opportunities' },
    { label: 'Based in', value: 'India' },
  ],
};

export const skills = [
  {
    category: 'Languages',
    items: ['JavaScript', 'Python', 'Bash', 'HTML', 'CSS'],
  },
  {
    category: 'Frontend',
    items: ['React', 'Vite', 'Tailwind CSS', 'HTML5', 'CSS3'],
  },
  {
    category: 'Backend',
    items: ['Flask', 'REST APIs', 'SQLite', 'Node.js'],
  },
  {
    category: 'Security & Tools',
    items: ['Bash Scripting', 'DNS & SSL', 'Git', 'Docker', 'Linux'],
  },
];

export const projects = [
  {
    title: 'ArchInsights',
    description:
      'Automated codebase architectural debt visualizer and refactoring copilot. Parses multi-language ASTs (Python, JS, TS) using Tree-sitter, computes cyclomatic complexity and Halstead metrics, constructs dependency graphs, and detects critical architectural code smells with plain-English AI refactoring blueprints.',
    stack: ['Python', 'TypeScript', 'Tree-sitter', 'FastAPI', 'React'],
    githubUrl: 'https://github.com/MeetKadiya/ArchInsights',
    liveUrl: '',
    featured: true,
  },
  {
    title: 'Bug Bounty Copilot',
    description:
      'An AI-powered reconnaissance assistant for authorized security researchers. Automates tedious recon workflows — subdomain enumeration, live-host probing, endpoint/secret discovery, and technology fingerprinting — with an AI analysis layer that summarizes attack surfaces and suggests high-value investigation paths.',
    stack: ['Python', 'FastAPI', 'React', 'Security', 'AI/LLM'],
    githubUrl: 'https://github.com/MeetKadiya/bugbounty-copilot',
    liveUrl: 'https://bugbounty-copilot.vercel.app',
    featured: true,
  },
  {
    title: 'One-Click Shield',
    description:
      'Next-generation unified web security configuration auditor, multi-browser threat engine, and instant auto-remediation synthesizer. Engineered for Kalpvruksh 2.0 Mini Hackathon to audit hidden SSL/TLS vulnerabilities, missing HTTP security headers, and browser configuration weaknesses.',
    stack: ['Python', 'FastAPI', 'React', 'Docker', 'Vite'],
    githubUrl: 'https://github.com/MeetKadiya/one-click-shield',
    liveUrl: '',
    featured: true,
  },
  {
    title: 'Student HelpDesk AI',
    description:
      'Cloud-based, multi-agent AI Student Help Desk built with Next.js, FastAPI, PostgreSQL, LangGraph/LangChain, and RAG. Engineered docker-first for local development and AWS-ready for production, orchestrating specialized AI agents to deliver instant, contextual academic assistance.',
    stack: ['TypeScript', 'Next.js', 'FastAPI', 'LangGraph', 'RAG', 'PostgreSQL'],
    githubUrl: 'https://github.com/MeetKadiya/StudentHelpdesk',
    liveUrl: 'https://frontend-nine-jade-74.vercel.app',
    featured: true,
  },
  {
    title: 'Dashify',
    description:
      'Full-stack CSV analytics dashboard: automatically detects column schemas, generates interactive charts, calculates summary statistics and correlation matrices, cleans datasets, and features an integrated AI Data Analyst answering questions about uploaded data in natural language.',
    stack: ['Python', 'FastAPI', 'React', 'Pandas', 'TypeScript'],
    githubUrl: 'https://github.com/MeetKadiya/Dashify',
    liveUrl: '',
    featured: true,
  },
  {
    title: 'Password Strength Analyzer',
    description:
      'A local-first password security analyzer, generator, and breach detection tool. Evaluates password entropy in-memory without persistent logging, featuring opt-in k-Anonymity breach verification via HaveIBeenPwned API with zero plaintext exposure.',
    stack: ['Python', 'FastAPI', 'React', 'TypeScript', 'Tailwind CSS'],
    githubUrl: 'https://github.com/MeetKadiya/password-strength-analyzer',
    liveUrl: '',
    featured: true,
  },
  {
    title: 'MonarchDomain',
    description:
      'A dual-purpose Bash recon tool for bug bounty and security workflows: enumerates subdomains via crt.sh and DNS brute force, then runs vulnerability checks (security headers, SSL, open ports). Supports resume, diffing between runs, stealth/rate-limit-aware requests, and optional httpx integration.',
    stack: ['Shell', 'Bash', 'curl', 'DNS', 'SSL'],
    githubUrl: 'https://github.com/MeetKadiya/MONARCHDOMAIN',
    liveUrl: '',
    featured: false,
  },
  {
    title: 'Solo Leveling System',
    description:
      'An interactive "System" UI inspired by Solo Leveling, built with React. Tracks player stats (Strength, Agility, Intelligence, Vitality), simulates daily quests for EXP, and automatically calculates level-up milestones with a Shadow Monarch-themed interface.',
    stack: ['React', 'JavaScript', 'Vite', 'Tailwind CSS'],
    githubUrl: 'https://github.com/MeetKadiya/solo-leveling-system',
    liveUrl: '',
    featured: false,
  },
  {
    title: 'Database Integration',
    description:
      'A Flask web app demonstrating end-to-end database integration — a Python backend serving HTML templates backed by a SQLite database.',
    stack: ['Python', 'Flask', 'SQLite'],
    githubUrl: 'https://github.com/MeetKadiya/Database-Integration',
    liveUrl: '',
    featured: false,
  },
  {
    title: 'Log Analysis',
    description:
      'A Python script that parses raw server log files and produces structured analysis output, useful for spotting patterns like error spikes or repeated access attempts.',
    stack: ['Python'],
    githubUrl: 'https://github.com/MeetKadiya/Log-Analysis',
    liveUrl: '',
    featured: false,
  },
  {
    title: 'Coffee',
    description:
      'A responsive coffee-shop landing page built from scratch with semantic HTML and hand-written CSS, including a dedicated stylesheet for media queries across breakpoints.',
    stack: ['HTML', 'CSS'],
    githubUrl: 'https://github.com/MeetKadiya/Coffee',
    liveUrl: '',
    featured: false,
  },
];

export const experience = [
  {
    role: 'Android Development Intern',
    org: 'Acmegrade',
    period: 'Mar 2024 — May 2024',
    points: [
      'Built a fully responsive medical app in Android Studio using Java and XML.',
      'Designed the login/register flow, swipe intro screens, and 5 core fragments (Home, Favorites, Chat, Notifications, Profile) with logout.',
      'Implemented user authentication with Firebase.',
    ],
  },
  {
    role: 'Certified Software Programmer',
    org: 'IANT, Ahmedabad',
    period: 'Nov 2023 — Nov 2024',
    points: [
      'Completed a certification covering HTML, CSS, JavaScript, Bootstrap, Python (Django, Flask, NumPy), PHP, and Laravel.',
      'Built web pages with HTML5, CSS3, JavaScript, PHP, and MySQL.',
      'Designed and managed relational databases using Python and MySQL.',
    ],
  },
  
];
