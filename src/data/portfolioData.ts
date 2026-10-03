/**
 * =========================================================================
 * PORTFOLIO CONFIGURATION FILE
 * =========================================================================
 * You can easily customize your entire portfolio by editing this single file!
 * To toggle between your details and the demo details, simply edit the values below.
 */

import somaiyaLogo from "../assets/somaiya.png";
import mumbaiLogo from "../assets/mumbai.png";
import alphawareLogo from "../assets/alphaware.webp";

export interface Project {
  id: string;
  title: string;
  description: string;
  tags: string[];
  github?: string;
  live?: string;
  featured?: boolean;
  stars?: number;
  image?: string;
  category?: string;
  categoryColor?: string;
  emoji?: string;
}

export interface EducationItem {
  icon?: string;
  logo?: string;
  logoBg?: string;
  school: string;
  university?: string;
  period: string;
  degree: string;
  minors?: string;
  grade?: string;
}

export interface Experience {
  company: string;
  role: string;
  period: string;
  location: string;
  description: string;
  highlights: string[];
  skills: string[];
  badgeColor?: string;
  logo?: string;
}

export interface SkillCategory {
  category: string;
  items: { name: string; level?: string; icon?: string }[];
}

export interface SocialLink {
  name: string;
  url: string;
  iconName: 'github' | 'linkedin' | 'medium' | 'tableau' | 'leetcode' | 'instagram' | 'mail' | 'youtube' | 'twitter';
  color: string;
}

export const portfolioData = {
  // Personal & Brand Info
  personal: {
    // Name options: "Suyash Potdar" or "Aahana Bobade"
    firstName: "Suyash",
    lastName: "Potdar",
    username: "suyash-potdar",
    repoName: "portfolio",
    welcomeComment: "// hello world !! Welcome to my portfolio",
    
    // Role Badges shown directly under the name
    roleBadges: [
      { label: "Software Developer", dotColor: "#4ec9b0" },
      { label: "Mobile App Developer", dotColor: "#c586c0" },
      { label: "AI Developer", dotColor: "#4fc1ff" }
    ],
    companyBadge: "@ AlphawareNext Technologies",

    // Phrases that type out dynamically in the typewriter section
    typewriterPhrases: [
      "Building scalable software 🚀",
      "Building React Native applications 📱",
      "Engineering backend systems ⚙️",
      "Exploring AI & intelligent agents 🤖",
      "Building fintech products 💳",
      "Turning ideas into real products ✨",
      "Always learning, always shipping 🚀",
    ],

    // Bio paragraph with styled highlight tokens
    bio: {
      lead: "I build at the intersection of",
      highlight1: "software engineering",
      comma: ",",
      highlight2: "mobile development",
      and: ", and",
      highlight3: "AI",
      closing: ". I create products that are",
      highlight4: "scalable, intelligent, and user-focused",
      period: ".",
    },

    // Extended description for about.html view
    longBio: [
      "Hi! I'm Suyash Potdar, a Software Developer focused on building modern, scalable and user-centric software products.",

      "My experience spans mobile application development, backend engineering, API integration, database management and AI-powered applications.",

      "I work extensively with React Native, TypeScript, Node.js, Express, MongoDB and modern AI technologies.",

      "I've worked on products across fintech, CRM, OTT, customer support and AI, taking ideas from requirements and architecture through development, testing and deployment.",

      "I also have a background in Business Analysis, which helps me understand product requirements, business workflows and translate real-world problems into practical technical solutions.",

      "When I'm not building applications, I enjoy experimenting with AI agents, local LLMs, RAG systems, developer tools and new technologies.",
    ],

    location: "India 🇮🇳",
    email: "suyashpotdar03@gmail.com",

    // Current Focus bullet points for about.html & README.md
    currentFocus: [
      {
        icon: "🔭",
        text: "Building scalable software products & mobile applications at AlphawareNext",
      },
      {
        icon: "🤖",
        text: "Deep interest in AI agents, LLMs & intelligent developer tools",
      },
      {
        icon: "🌱",
        text: "Currently exploring RAG, local models (Ollama, Qwen) & LangGraph",
      },
      {
        icon: "💬",
        text: "Talk to me about React Native, TypeScript, Node.js & System Architecture",
      },
      {
        icon: "⚡",
        text: "Architecting fintech & CRM systems from requirements to deployment",
      },
      {
        icon: "✨",
        text: "Always learning, always shipping",
      },
    ],

    // Education for about.html view
    education: [
      {
        icon: "🎓",
        logo: somaiyaLogo,
        logoBg: "bg-white",
        school: "S. K. Somaiya College",
        university: "Somaiya Vidyavihar University",
        degree: "Masters of Science - Information Technology",
        minors: "Focus: Artificial Intelligence & Machine Learning",
        period: "2023 — 2025",
        grade: "8.3 CGPA",
      },
      {
        icon: "🏫",
        logo: mumbaiLogo,
        logoBg: "bg-[#18181c]",
        school: "VPM's B. N. Bandodkar College of Science",
        university: "University of Mumbai",
        degree: "Bachelors of Science - Information Technology",
        minors: "Software Development, Database Design, Deployment",
        period: "2020 — 2023",
        grade: "9.0 CGPA",
      },
    ] as EducationItem[],
  },

  // Numerical Highlights / Metrics Cards
  stats: [
    { value: "1+", label: "Years" },
    { value: "10+", label: "Projects" },
    { value: "∞", label: "Curiosity" },
    { value: "↑", label: "Always Learning" }
  ],

  // Social Links Strip
  socials: [
    { name: "GitHub", url: "https://github.com/Codder-lab", iconName: "github", color: "#e6edf3" },
    { name: "LinkedIn", url: "https://www.linkedin.com/in/suyash-potdar-030b86281/", iconName: "linkedin", color: "#0a66c2" },
    { name: "Instagram", url: "https://instagram.com/suyash_potdar", iconName: "instagram", color: "#e1306c" },
  ] as SocialLink[],

  // Projects View (`projects.js`)
  projects: [
    {
      id: "ott",
      title: "OTT Streaming Application",
      emoji: "🎬",
      category: "OTT · STREAMING · PAYMENT",
      categoryColor: "#c586c0",
      description: "A modern OTT streaming mobile application built to deliver on-demand entertainment content through an intuitive, high-performance mobile experience. The application provides users with a seamless way to discover, browse, and consume video content across different categories.",
      tags: ["React Native", "MMKVStorage", "Cloudfront", "Payment Gateway", "Analytics", "Multi-Authentication"],
      github: "https://github.com/Codder-lab",
      live: "https://github.com/Codder-lab",
      featured: true,
      stars: 92
    },
    {
      id: "fintech-loan-crm",
      title: "Fintech Loan Origination & CRM Platform",
      emoji: "💳",
      category: "FINTECH · CRM · MOBILE",
      categoryColor: "#4ec9b0",
      description: "End-to-end digital loan origination and customer onboarding mobile application. Features real-time KYC, telecaller CRM workflows, multi-stage approval pipelines, and document validation.",
      tags: ["React Native", "TypeScript", "Node.js", "Express.js", "MongoDB", "REST APIs"],
      github: "https://github.com/Codder-lab",
      live: "https://github.com/Codder-lab",
      featured: true,
      stars: 104
    },
    {
      id: "sports",
      title: "Live Scoring Cricket Application",
      emoji: "🏏",
      category: "LIVE · SCORING · MOBILE",
      categoryColor: "#4fc1ff",
      description: "A feature-rich cricket mobile application developed for the Bhojpuri Industry Premier League, designed to provide users with an interactive platform for accessing tournament, match, team, and player information.",
      tags: ["React Native", "TypeScript", "REST APIs", "React", "Zustand", "NodeJS", "Socket", "MongoDB", "Redis"],
      github: "https://github.com/Codder-lab",
      live: "https://github.com/Codder-lab",
      featured: true,
      stars: 124
    },
    {
      id: "support",
      title: "Customer Support Platform",
      emoji: "💬",
      category: "SUPPORT · SDK · AGENT",
      categoryColor: "#e5c07b",
      description: "A multi-tenant customer support platform designed to help businesses manage customer conversations, support tickets, knowledge bases, and agent workflows from a centralized dashboard. The platform also provides an embeddable support SDK that allows businesses to integrate customer support functionality directly into their applications.",
      tags: ["TypeScript", "React", "Tailwind CSS", "React SDK", "Docker", "Vite"],
      github: "https://github.com/Codder-lab",
      live: "https://github.com/Codder-lab",
      featured: false,
      stars: 67
    },
    {
      id: "agentic-ai",
      title: "Agentic AI Application",
      emoji: "🤖",
      category: "WORKFLOWS · AI · Agent",
      categoryColor: "#4fc1ff",
      description: "A full-stack agentic AI platform designed to automate complex tasks through intelligent AI agents, tool execution, contextual reasoning, and multi-step workflows. The application enables users to create and interact with specialized AI agents capable of understanding objectives, planning tasks, using available tools, and executing workflows with minimal user intervention.",
      tags: ["Ollama", "WebSockets", "RAG", "Voice Control", "Social App Integration", "Agent Workflow"],
      github: "https://github.com/Codder-lab",
      live: "https://github.com/Codder-lab",
      featured: false,
      stars: 45
    }
  ] as Project[],

  // Experience View (`experience.ts`)
  experience: [
    {
      company: "AlphawareNext Technologies Pvt. Ltd.",
      logo: alphawareLogo,

      role: "Software Developer",

      period: "January 2025 - Present",

      location: "India",

      description:
        "Building software products across mobile applications, backend systems and fintech solutions. Working across the complete product lifecycle from requirements and architecture to development, testing and deployment.",

      highlights: [
        "Developed production mobile applications using React Native and TypeScript.",

        "Built and integrated REST APIs and backend services using Node.js, Express and MongoDB.",

        "Worked on fintech applications involving digital loan workflows, onboarding and customer journeys.",

        "Built CRM functionality for telecaller operations and customer management.",

        "Contributed to OTT and sports-focused mobile applications.",

        "Worked with authentication, API integration, database management and application state management.",

        "Developed reusable UI components and focused on responsive, user-centric mobile experiences.",

        "Worked with Docker, AWS services, Firebase, Vercel and Render for application deployment and infrastructure.",

        "Explored and developed AI-powered applications involving LLMs, RAG, AI agents and local models.",

        "Collaborated with cross-functional teams to translate business requirements into practical technical solutions.",
      ],

      skills: [
        "React Native",
        "TypeScript",
        "JavaScript",
        "Node.js",
        "Express.js",
        "MongoDB",
        "REST APIs",
        "Docker",
        "AWS",
        "Git",
        "AI",
        "LLMs",
      ],

      badgeColor: "#4ec9b0",
    },
  ] as Experience[],

  // Skills View (`skills.json`)
  skills: [
    {
      category: "Programming Languages",

      items: [
        {
          name: "TypeScript",
          level: "90%",
        },
        {
          name: "JavaScript",
          level: "90%",
        },
        {
          name: "Python",
          level: "75%",
        },
      ],
    },

    {
      category: "Mobile Development",

      items: [
        {
          name: "React Native",
          level: "90%",
        },
        {
          name: "Expo",
          level: "85%",
        },
        {
          name: "React Navigation",
          level: "85%",
        },
        {
          name: "Zustand",
          level: "80%",
        },
        {
          name: "TanStack Query",
          level: "80%",
        },
        {
          name: "MMKV",
          level: "80%",
        },
        {
          name: "React Native Reanimated",
          level: "80%",
        },
      ],
    },

    {
      category: "Frontend",

      items: [
        {
          name: "React",
          level: "85%",
        },
        {
          name: "Vite",
          level: "85%",
        },
        {
          name: "Tailwind CSS",
          level: "80%",
        },
        {
          name: "HTML",
          level: "90%",
        },
        {
          name: "CSS",
          level: "85%",
        },
      ],
    },

    {
      category: "Backend & APIs",

      items: [
        {
          name: "Node.js",
          level: "90%",
        },
        {
          name: "Express.js",
          level: "90%",
        },
        {
          name: "REST APIs",
          level: "90%",
        },
        {
          name: "Socket.IO",
          level: "75%",
        },
        {
          name: "Swagger",
          level: "75%",
        },
        {
          name: "Zod",
          level: "75%",
        },
      ],
    },

    {
      category: "Databases",

      items: [
        {
          name: "MongoDB",
          level: "90%",
        },
        {
          name: "Mongoose",
          level: "90%",
        },
        {
          name: "Redis",
          level: "70%",
        },
        {
          name: "Qdrant",
          level: "70%",
        },
      ],
    },

    {
      category: "Artificial Intelligence",

      items: [
        {
          name: "LLMs",
          level: "80%",
        },
        {
          name: "AI Agents",
          level: "80%",
        },
        {
          name: "RAG",
          level: "80%",
        },
        {
          name: "LangGraph",
          level: "70%",
        },
        {
          name: "Vector Databases",
          level: "75%",
        },
        {
          name: "Ollama",
          level: "75%",
        },
        {
          name: "Qwen",
          level: "75%",
        },
        {
          name: "Prompt Engineering",
          level: "85%",
        },
      ],
    },

    {
      category: "Cloud & DevOps",

      items: [
        {
          name: "Docker",
          level: "80%",
        },
        {
          name: "AWS",
          level: "70%",
        },
        {
          name: "AWS S3",
          level: "75%",
        },
        {
          name: "CloudFront",
          level: "65%",
        },
        {
          name: "Firebase",
          level: "70%",
        },
        {
          name: "Vercel",
          level: "80%",
        },
        {
          name: "Render",
          level: "75%",
        },
      ],
    },

    {
      category: "Tools & Development",

      items: [
        {
          name: "Git",
          level: "90%",
        },
        {
          name: "GitHub",
          level: "90%",
        },
        {
          name: "Bun",
          level: "85%",
        },
        {
          name: "VS Code",
          level: "95%",
        },
        {
          name: "Postman",
          level: "90%",
        },
      ],
    },
  ] as SkillCategory[],

  // Contact Info (`contact.css`)
  contact: {
    heading: "Let's connect and build something extraordinary",
    subheading: "Open to backend engineering roles, AI/ML projects, and open-source collaborations.",
  }
};
