/**
 * Single source of truth for all portfolio content.
 * Editing copy / links / metrics should only ever happen here —
 * components consume these typed constants and stay presentational.
 *
 * TODO(rohan): replace the `#` placeholders (resume, repo + social URLs).
 */

import type { LucideIcon } from "lucide-react";
import {
  Activity,
  BarChart3,
  Brain,
  Briefcase,
  Building2,
  Database,
  Github,
  Linkedin,
  Mail,
  Rocket,
  Target,
  Lightbulb,
  LineChart,
  Megaphone,
  Cpu,
  Code2,
  ScrollText,
  Award,
  Plane,
} from "lucide-react";

/* ------------------------------------------------------------------ */
/*  Identity                                                           */
/* ------------------------------------------------------------------ */

export const profile = {
  name: "Rohan Thakur",
  taglineRoles: [
    "Founder's Office Executive",
    "AI Engineer",
    "Business Analyst",
    "Builder",
  ],
  headline: ["Turning Data Into Decisions.", "Building Growth Through Execution."],
  subheading:
    "Founder's Office Executive with expertise in Strategy, Analytics, AI, Product Development and Business Operations.",
  resumeUrl:
    "https://drive.google.com/file/d/1NL-ceUZ2wyYWQd1f8JnNOuLIJE4TgVSj/view?usp=sharing",
  email: "rohanxthakur@gmail.com",
  // Interactive 3D hero avatar (Spline .splinecode).
  // Generic robot placeholder for now — swap with your own bitmoji/avatar scene.
  // See README "Your own 3D avatar" for how to generate one.
  avatarScene: "https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode",
} as const;

export const socials: { label: string; href: string; icon: LucideIcon }[] = [
  { label: "LinkedIn", href: "https://www.linkedin.com/in/rohanthakur05/", icon: Linkedin },
  { label: "GitHub", href: "https://github.com/rohanxthakur", icon: Github },
  {
    label: "Email",
    href: "https://mail.google.com/mail/?view=cm&fs=1&to=rohanxthakur@gmail.com",
    icon: Mail,
  },
];

/* ------------------------------------------------------------------ */
/*  Hero KPI counters                                                  */
/* ------------------------------------------------------------------ */

export const kpis: { value: number; suffix: string; label: string }[] = [
  { value: 1, suffix: "+", label: "Years Experience" },
  { value: 3, suffix: "+", label: "Projects" },
  { value: 5, suffix: "+", label: "Certifications" },
  { value: 0, suffix: "IEEE", label: "Published Researcher" },
];

/* ------------------------------------------------------------------ */
/*  About                                                              */
/* ------------------------------------------------------------------ */

export const about = {
  title: "Who is Rohan?",
  paragraphs: [
    "I am a Founder's Office Executive at Next2Door Living (Ezstays), where I work across growth strategy, analytics, investor communication, product execution, digital marketing, and IPO readiness initiatives.",
    "My strength lies in combining analytical thinking, business strategy, and technology to solve complex business problems.",
  ],
  intersections: ["Data", "Business", "Product", "AI"],
} as const;

/* ------------------------------------------------------------------ */
/*  Gallery — intro + education                                        */
/* ------------------------------------------------------------------ */

// Short personal introduction shown on Canvas I / used in the gallery.
export const intro =
  "I work where data meets decisions — turning numbers into strategy, strategy into product, and product into measurable growth. From Power BI dashboards to DRHP readiness, I help founders see clearly and execute faster.";

export interface Education {
  degree: string;
  org: string;
  duration: string;
  note?: string;
}

// TODO(rohan): replace the degree/university placeholders with your real details.
export const education: Education[] = [
  {
    degree: "B.Tech — Electronics & Communication Engineering",
    org: "Delhi Technological University (formerly Delhi College of Engineering)",
    duration: "2021 — 2025",
    note: "CGPA 7.29",
  },
  {
    degree: "IEEE Published Research",
    org: "IEEE STCR 2025",
    duration: "2025",
    note: "UAV-Based Deep Learning for Wheat Disease Management",
  },
];

export const certifications: string[] = [
  "Oracle Certified Generative AI Professional",
  "McKinsey.org Forward Program",
  "Deloitte Australia — Data Analytics Program",
  "HackerRank — 5-Star SQL (Gold)",
];

/* ------------------------------------------------------------------ */
/*  Experience                                                         */
/* ------------------------------------------------------------------ */

export interface ExperienceGroup {
  heading: string;
  points: string[];
}

export interface Experience {
  company: string;
  role: string;
  duration: string;
  icon: LucideIcon;
  accent: "blue" | "purple";
  groups: ExperienceGroup[];
}

export const experiences: Experience[] = [
  {
    company: "Next2Door Living (Ezstays)",
    role: "Founder's Office Executive",
    duration: "2025 — Present",
    icon: Building2,
    accent: "blue",
    groups: [
      {
        heading: "Growth & Strategy",
        points: [
          "Built business growth strategies",
          "Forecasted business performance",
          "Derived actionable insights from data",
        ],
      },
      {
        heading: "IPO Readiness",
        points: [
          "Assisted DRHP preparation",
          "Worked with legal and finance teams",
          "Supported compliance activities",
        ],
      },
      {
        heading: "Business Analytics",
        points: [
          "Built Power BI dashboards",
          "Created real-time revenue tracking systems",
          "Monitored occupancy and seat utilization",
        ],
      },
      {
        heading: "Marketing",
        points: ["SEO", "GEO", "Meta Business Suite", "Google Analytics"],
      },
      {
        heading: "Product & Technology",
        points: [
          "Assisted app development",
          "Assisted website development",
          "Improved digital experience",
        ],
      },
      {
        heading: "Stakeholder Management",
        points: [
          "Investor communication",
          "Pitch deck creation",
          "Cross-functional collaboration",
        ],
      },
    ],
  },
  {
    company: "BSES Yamuna Power Limited (BYPL)",
    role: "Data Analytics Intern",
    duration: "Internship",
    icon: Activity,
    accent: "purple",
    groups: [
      {
        heading: "Achievements",
        points: [
          "Leveraged SQL, Python and Excel to analyze datasets exceeding 50,000 records",
          "Improved reporting efficiency by 30%",
          "Enhanced business decision making",
          "Designed interactive dashboards",
          "Automated reporting processes",
          "Reduced manual reporting effort by 40%",
          "Enabled real-time KPI monitoring",
        ],
      },
    ],
  },
];

/* ------------------------------------------------------------------ */
/*  Skills                                                             */
/* ------------------------------------------------------------------ */

export interface SkillCategory {
  name: string;
  icon: LucideIcon;
  accent: "blue" | "purple" | "gold";
  skills: string[];
}

export const skillCategories: SkillCategory[] = [
  {
    name: "Data & Analytics",
    icon: BarChart3,
    accent: "blue",
    skills: [
      "SQL",
      "Python",
      "Excel",
      "Power BI",
      "Tableau",
      "Data Visualization",
      "Dashboard Creation",
      "Statistical Modeling",
    ],
  },
  {
    name: "Business & Strategy",
    icon: Briefcase,
    accent: "gold",
    skills: [
      "Financial Modeling",
      "Business Intelligence",
      "Decision Making",
      "Growth Strategy",
      "Market Analysis",
      "Investor Communication",
    ],
  },
  {
    name: "AI & Automation",
    icon: Brain,
    accent: "purple",
    skills: [
      "Machine Learning",
      "GenAI",
      "Claude Architecture",
      "Claude Code",
      "AI Workflows",
      "Prompt Engineering",
    ],
  },
  {
    name: "Development",
    icon: Code2,
    accent: "blue",
    skills: [
      "Web Development",
      "Next.js",
      "GitHub",
      "Google Apps Script",
      "Vibe Coding",
    ],
  },
  {
    name: "Marketing",
    icon: Megaphone,
    accent: "gold",
    skills: ["GA4", "SEO", "GEO", "Meta Business Suite"],
  },
];

/* ------------------------------------------------------------------ */
/*  Founder's Office Playbook (Data → Insights → … → Growth)          */
/* ------------------------------------------------------------------ */

export interface PlaybookStage {
  title: string;
  icon: LucideIcon;
  description: string;
  activities: string[];
  tools?: string[];
  visual: string;
}

export const playbook: PlaybookStage[] = [
  {
    title: "Analyze",
    icon: BarChart3,
    description: "I begin by understanding business performance through data.",
    activities: [
      "Revenue analysis",
      "Occupancy tracking",
      "Customer behavior analysis",
      "Market research",
      "Performance monitoring",
    ],
    tools: ["Power BI", "Excel", "SQL", "GA4"],
    visual: "Animated dashboards and floating charts.",
  },
  {
    title: "Generate Insights",
    icon: Lightbulb,
    description: "Convert raw data into actionable business intelligence.",
    activities: [
      "Trend identification",
      "Forecasting",
      "Opportunity discovery",
      "Risk assessment",
      "Business recommendations",
    ],
    visual: "AI-style neural network animation.",
  },
  {
    title: "Build Strategy",
    icon: Target,
    description: "Transform insights into executable business plans.",
    activities: [
      "Growth initiatives",
      "Revenue optimization",
      "Market expansion planning",
      "Marketing strategy",
      "Operational improvements",
    ],
    visual: "Interactive strategy map.",
  },
  {
    title: "Execute",
    icon: Rocket,
    description: "Work across teams to turn plans into reality.",
    activities: [
      "Product execution",
      "Website improvements",
      "App enhancements",
      "Marketing campaigns",
      "Business operations",
    ],
    tools: ["Product", "Marketing", "Operations", "Finance", "Legal"],
    visual: "Connected team network animation.",
  },
  {
    title: "Measure & Scale",
    icon: LineChart,
    description: "Track outcomes and continuously improve performance.",
    activities: [
      "KPI tracking",
      "Revenue monitoring",
      "Investor reporting",
      "Pitch deck creation",
      "IPO readiness support",
      "DRHP assistance",
    ],
    visual: "Animated growth chart rising upward.",
  },
];

export const impactFramework = {
  headline: "Business Impact Framework",
  flow: ["Data", "Insights", "Strategy", "Execution", "Growth"],
  supporting:
    "This framework enables me to bridge business, technology, and operations while helping organizations make better decisions and execute faster.",
} as const;

/* ------------------------------------------------------------------ */
/*  Projects                                                           */
/* ------------------------------------------------------------------ */

export interface Project {
  title: string;
  category: string;
  description: string;
  icon: LucideIcon;
  tech: string[];
  href: string;
}

export const projects: Project[] = [
  {
    title:
      "Advancing Smart Farming with UAV-Based Deep Learning for Proactive Wheat Disease Management",
    category: "AI / ML Research",
    description:
      "Deep learning-powered wheat disease detection using UAV imagery for precision agriculture.",
    icon: Plane,
    tech: ["Python", "TensorFlow", "CNN", "Computer Vision"],
    href: "#", // TODO: GitHub repo
  },
  {
    title: "LAYOFFMETRICS",
    category: "SQL Data Analytics",
    description:
      "Data cleaning and exploratory data analysis project focused on layoff trends and workforce analytics.",
    icon: Database,
    tech: ["SQL", "Excel", "Data Visualization"],
    href: "#", // TODO: GitHub repo
  },
  {
    title: "Revenue & Occupancy Dashboard",
    category: "Business Intelligence",
    description:
      "Real-time business dashboard for monitoring occupancy, revenue, and operational KPIs.",
    icon: LineChart,
    tech: ["Next.js", "Advanced Excel", "Google Apps Script"],
    href: "#", // TODO: GitHub repo
  },
];

/* ------------------------------------------------------------------ */
/*  Achievements                                                       */
/* ------------------------------------------------------------------ */

export interface Achievement {
  title: string;
  detail: string;
  icon: LucideIcon;
}

export const achievements: Achievement[] = [
  {
    title: "IEEE Published Researcher",
    detail:
      "Published conference paper on UAV-Based Smart Farming at IEEE STCR 2025.",
    icon: ScrollText,
  },
  {
    title: "Oracle Certified Generative AI Professional",
    detail: "October 2025",
    icon: Cpu,
  },
  {
    title: "5-Star SQL — HackerRank",
    detail: "Gold-tier SQL problem solving.",
    icon: Database,
  },
  {
    title: "McKinsey.org Forward Program",
    detail: "Certified",
    icon: Award,
  },
  {
    title: "Deloitte Australia Data Analytics Program",
    detail: "September 2025",
    icon: BarChart3,
  },
];

/* ------------------------------------------------------------------ */
/*  Nav                                                                */
/* ------------------------------------------------------------------ */

export const navLinks = [
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Skills", href: "#skills" },
  { label: "Playbook", href: "#playbook" },
  { label: "Projects", href: "#projects" },
  { label: "Achievements", href: "#achievements" },
  { label: "Contact", href: "#contact" },
] as const;
