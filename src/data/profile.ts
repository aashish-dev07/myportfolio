/**
 * Single source of truth for every piece of content on the site.
 * Everything here was taken from the resume — edit this file, not the components.
 */

// ---------------------------------------------------------------------------
// ⚠️  EDIT ME: paste your real GitHub + LinkedIn URLs here.
// ---------------------------------------------------------------------------
export const GITHUB_URL = "https://github.com/aashish-kumar";
export const LINKEDIN_URL = "https://www.linkedin.com/in/aashish-kumar";

export const profile = {
  name: "Aashish Kumar",
  role: "Full Stack Developer",
  // Rotated one word at a time in the hero.
  roles: [
    "Full Stack Developer",
    // "Node.js & Laravel Engineer",
    // "Next.js & TypeScript Engineer",
    "REST API Architect",
    // "AI-Assisted Developer",
  ],
  location: "Mohali, Punjab, India",
  phone: "+91-9896595913",
  phoneHref: "tel:+919896595913",
  email: "aashishvermaisonline@gmail.com",
  github: GITHUB_URL,
  linkedin: LINKEDIN_URL,
  // Served from /public — replace the file to update the download.
  resume: "/Aashish-Kumar-Resume.pdf",
  resumeFileName: "Aashish-Kumar-Resume.pdf",
  summary:
    "Full Stack Developer with 4+ years of experience building scalable, secure web applications across two stacks — Node.js, Express.js, React.js and MongoDB on one side, Laravel, PHP and MySQL on the other, with Next.js and TypeScript throughout. At Seraphic Infosolutions, I am currently building Tourneyfest end-to-end — a tournament, team and sports management platform for colleges.",
  summaryExtended:
    "My day-to-day is REST API design, OAuth 2.0 authentication, role-based access control, MongoDB aggregation pipelines, AWS S3 and payment gateway integrations. I lean on AI-assisted development with Claude Code and OpenAI Codex to ship clean, reliable features faster.",
} as const;

export const stats = [
  { value: 4, suffix: "+", label: "Years of experience" },
  { value: 180, suffix: "+", label: "REST endpoints shipped" },
  { value: 10, suffix: "", label: "Sports scoring engines" },
  { value: 8, suffix: "+", label: "Products delivered" },
] as const;

// --- Skills -----------------------------------------------------------------

export type SkillGroup = {
  id: string;
  title: string;
  blurb: string;
  skills: { name: string; level: number }[];
};

export const skillGroups: SkillGroup[] = [
  {
    id: "languages",
    title: "Languages",
    blurb: "The core I write production code in every day.",
    skills: [
      { name: "JavaScript (ES6+)", level: 95 },
      { name: "TypeScript", level: 90 },
      { name: "PHP", level: 85 },
      { name: "SQL", level: 85 },
      { name: "Java", level: 70 },
      { name: "HTML5", level: 95 },
      { name: "CSS3", level: 90 },
    ],
  },
  {
    id: "frontend",
    title: "Frontend",
    blurb: "Dashboards and public sites that stay fast under real data.",
    skills: [
      { name: "React.js (Hooks)", level: 95 },
      { name: "Next.js (App Router)", level: 90 },
      { name: "Tailwind CSS", level: 90 },
      { name: "Zustand", level: 85 },
      { name: "React Router", level: 88 },
      { name: "Axios", level: 90 },
      { name: "Angular", level: 72 },
      { name: "Bootstrap", level: 85 },
      { name: "Responsive Web Design", level: 92 },
    ],
  },
  {
    id: "backend",
    title: "Backend",
    blurb: "APIs, middleware and architecture that scale past the demo.",
    skills: [
      { name: "Node.js", level: 93 },
      { name: "Express.js", level: 93 },
      { name: "RESTful APIs", level: 95 },
      { name: "Laravel", level: 88 },
      { name: "Mongoose (ODM)", level: 90 },
      { name: "Eloquent ORM", level: 85 },
      { name: "MVC Architecture", level: 90 },
      { name: "Multer (File Uploads)", level: 85 },
      { name: "Winston (Logging)", level: 80 },
      { name: "CodeIgniter", level: 70 },
    ],
  },
  {
    id: "databases",
    title: "Databases",
    blurb: "Modelling, aggregation pipelines and indexes that earn their keep.",
    skills: [
      { name: "MongoDB", level: 92 },
      { name: "Aggregation Pipelines", level: 88 },
      { name: "Indexing", level: 85 },
      { name: "MySQL", level: 88 },
    ],
  },
  {
    id: "security",
    title: "Auth & Security",
    blurb: "Who gets in, and exactly what they are allowed to touch.",
    skills: [
      { name: "OAuth 2.0 / Google Sign-In", level: 90 },
      { name: "Passport.js", level: 88 },
      { name: "Role-Based Access Control", level: 90 },
      { name: "bcrypt", level: 88 },
      { name: "Google reCAPTCHA", level: 82 },
    ],
  },
  {
    id: "cloud",
    title: "Cloud & Integrations",
    blurb: "Storage, payments and the third-party glue in between.",
    skills: [
      { name: "AWS S3", level: 85 },
      { name: "Payment Gateways", level: 87 },
      { name: "Third-Party APIs", level: 90 },
      { name: "Nodemailer", level: 88 },
      { name: "Deep Linking (App / Universal Links)", level: 80 },
    ],
  },
  {
    id: "ai",
    title: "AI Tooling",
    blurb: "Shipping faster without giving up on code review.",
    skills: [
      { name: "Claude Code (Anthropic)", level: 92 },
      { name: "OpenAI Codex", level: 88 },
      { name: "Prompt Engineering", level: 88 },
      { name: "AI-Assisted Development", level: 90 },
    ],
  },
  {
    id: "tools",
    title: "Tools & Practices",
    blurb: "How the work actually gets from my machine to production.",
    skills: [
      { name: "Git & GitHub", level: 92 },
      { name: "Postman", level: 90 },
      { name: "Vite", level: 85 },
      { name: "npm", level: 90 },
      { name: "CI/CD", level: 78 },
      { name: "TDD", level: 75 },
      { name: "Data Structures", level: 82 },
      { name: "OOPs", level: 88 },
    ],
  },
];

// --- Experience -------------------------------------------------------------

export type Experience = {
  company: string;
  role: string;
  period: string;
  location?: string;
  points: string[];
};

export const experience: Experience[] = [
  {
    company: "Seraphic Infosolutions Pvt. Ltd.",
    role: "Full Stack Developer",
    period: "Dec 2025 – Present",
    location: "Mohali, Punjab",
    points: [
      "Building Tourneyfest end-to-end — a tournament, team and sports management platform for colleges.",
      "Built the Equine Directory module for Equicare and enhanced its calendar and My Stable APIs.",
      "Use Claude Code and OpenAI Codex for AI-assisted development, debugging and code reviews.",
    ],
  },
  {
    company: "SmartInfo Care Solutions",
    role: "Software Engineer",
    period: "Jul 2023 – Nov 2025",
    points: [
      "Developed Legendetell, a Laravel web application that automates services through third-party API integrations.",
      "Built First Class Cleaning Service, a booking platform using Laravel and Angular, with authentication and payment gateway integration.",
      "Upgraded an application from Laravel 5.8 to Laravel 9.0, refactoring deprecated code and updating dependencies.",
      "Designed and developed REST APIs for the Courtsmith and Marshing-Star applications.",
    ],
  },
  {
    company: "Kadam Technologies",
    role: "Junior Web Developer",
    period: "Jun 2022 – Jun 2023",
    points: [
      "Developed the admin panel of an Inventory Management System in Laravel covering Buyer, Vendor, Purchase, Tax Invoice and Dashboard modules.",
      "Built Healer Management System, a self-driven project using Laravel and React.js for slot booking, tax invoices and payments.",
      "Added new features and fixed bugs across existing modules.",
    ],
  },
];

// --- Projects ---------------------------------------------------------------

export type Project = {
  id: string;
  title: string;
  tagline: string;
  role: string;
  period: string;
  featured: boolean;
  category: "Node.js" | "Laravel" | "Personal";
  description: string;
  highlights: string[];
  stack: string[];
  accent: string; // tailwind gradient stops
};

export const projects: Project[] = [
  {
    id: "tourneyfest",
    title: "Tourneyfest",
    tagline: "Tournament, Team & Sports Management Platform",
    role: "End-to-End Full Stack Developer",
    period: "Dec 2025 – Present",
    featured: true,
    category: "Node.js",
    description:
      "A complete sports management platform for colleges, built from scratch — a React admin dashboard, a Node/Express REST API on MongoDB, and a Next.js public website all running off the same core.",
    highlights: [
      "Built a Node.js / Express REST API with 180+ endpoints on MongoDB, powering both the admin dashboard and the Next.js public site.",
      "Implemented Google OAuth 2.0 login with role-based access control for admins, coaches and players.",
      "Developed fixture generation for Knockout, League and Group + Knockout formats.",
      "Built a live scoring engine for 10 sports with standings and leaderboards.",
      "Co-developed the tournament registration and approval workflow with AWS S3 uploads and email notifications.",
    ],
    stack: ["React.js", "TypeScript", "Node.js", "Express.js", "MongoDB", "Next.js", "OAuth 2.0", "AWS S3"],
    accent: "from-emerald-400 to-cyan-400",
  },
  {
    id: "kenzari",
    title: "Kenzari",
    tagline: "Jewellery Marketplace & Custom Gold Platform",
    // TODO: confirm the role, period and stack below.
    role: "Full Stack Developer",
    period: "2026",
    featured: true,
    category: "Node.js",
    description:
      "A jewellery marketplace where buyers purchase ready-made pieces or order custom gold products, retailers publish and manage their own catalogue, and a super admin approves every request. The platform takes a commission on each sale.",
    highlights: [
      "Built the buy and sell flows for ready jewellery alongside custom gold orders made to the buyer's specification.",
      "Developed the retailer portal so sellers can publish, price and manage their own product listings.",
      "Implemented commission handling on every transaction, splitting each payout between the retailer and the platform.",
      "Built the super-admin approval workflow gating retailer onboarding, product listings and payout requests.",
      "Modelled products, orders and commission records in MongoDB behind a Node.js / Express REST API.",
    ],
    stack: ["Node.js", "Express.js", "MongoDB", "React.js", "TypeScript", "Payment Gateway", "RBAC"],
    accent: "from-yellow-400 to-amber-500",
  },
  {
    id: "equicare",
    title: "Equicare",
    tagline: "Horse Feed & Stable Management System",
    role: "Full Stack Developer",
    period: "2026",
    featured: true,
    category: "Laravel",
    description:
      "A stable management system covering equine records, feeding schedules and mobile onboarding, with a Laravel/MySQL backend serving a Next.js web app and iOS/Android clients.",
    highlights: [
      "Built the Equine Directory module with Laravel, MySQL and REST APIs.",
      "Enhanced the calendar and My Stable APIs.",
      "Implemented invite deep links for the iOS and Android apps (App Links / Universal Links).",
      "Improved the Add Feed flow in the Next.js web app.",
    ],
    stack: ["Laravel", "PHP", "MySQL", "Next.js", "TypeScript", "Deep Linking"],
    accent: "from-violet-400 to-fuchsia-400",
  },
  {
    id: "legendetell",
    title: "Legendetell",
    tagline: "Service Automation Platform",
    role: "Software Engineer",
    period: "2023 – 2025",
    featured: false,
    category: "Laravel",
    description:
      "A Laravel web application that automates service delivery by orchestrating a set of third-party API integrations.",
    highlights: [
      "Developed the application end to end in Laravel.",
      "Automated service workflows through third-party API integrations.",
    ],
    stack: ["Laravel", "PHP", "MySQL", "REST APIs"],
    accent: "from-amber-400 to-orange-400",
  },
  {
    id: "first-class-cleaning",
    title: "First Class Cleaning Service",
    tagline: "Cleaning Service Booking Platform",
    role: "Software Engineer",
    period: "2023 – 2025",
    featured: false,
    category: "Laravel",
    description:
      "A booking platform for a cleaning service business, with user accounts and online payments handled end to end.",
    highlights: [
      "Built the platform with a Laravel backend and an Angular frontend.",
      "Implemented user authentication and payment gateway integration.",
    ],
    stack: ["Laravel", "Angular", "MySQL", "Payment Gateway"],
    accent: "from-sky-400 to-blue-500",
  },
  {
    id: "courtsmith",
    title: "Courtsmith & Marshing-Star",
    tagline: "REST API Development",
    role: "Software Engineer",
    period: "2023 – 2025",
    featured: false,
    category: "Laravel",
    description:
      "Designed and developed the REST API layer for two client applications, alongside a Laravel 5.8 → 9.0 upgrade on a separate legacy codebase.",
    highlights: [
      "Designed and developed REST APIs for the Courtsmith and Marshing-Star applications.",
      "Upgraded an application from Laravel 5.8 to Laravel 9.0, refactoring deprecated code.",
      "Implemented third-party API and payment gateway integrations across client projects.",
    ],
    stack: ["Laravel", "PHP", "REST APIs", "MySQL"],
    accent: "from-rose-400 to-pink-500",
  },
  {
    id: "healer",
    title: "Healer Management System",
    tagline: "Slot Booking, Invoicing & Payments",
    role: "Junior Web Developer",
    period: "2022 – 2023",
    featured: false,
    category: "Personal",
    description:
      "A self-driven internal product built to learn the full request cycle — Laravel on the backend, React on the frontend.",
    highlights: [
      "Built slot booking, tax invoice generation and payment flows.",
      "Laravel backend with a React.js frontend.",
    ],
    stack: ["Laravel", "React.js", "MySQL"],
    accent: "from-teal-400 to-emerald-500",
  },
  {
    id: "inventory",
    title: "Simple Inventory System",
    tagline: "Items, Tax Invoices & Credit Notes",
    role: "Personal Project",
    period: "2022",
    featured: false,
    category: "Personal",
    description:
      "A personal Laravel application for managing inventory items and generating tax invoices and credit notes.",
    highlights: [
      "Item and stock management.",
      "Tax invoice and credit note generation.",
    ],
    stack: ["Laravel", "PHP", "MySQL"],
    accent: "from-indigo-400 to-violet-500",
  },
];

// --- Education & certifications --------------------------------------------

export const education = [
  {
    degree: "Master of Computer Applications (MCA)",
    school: "Guru Jambheshwar University of Science & Technology, Hisar",
    period: "2022 – 2024",
  },
  {
    degree: "Bachelor of Computer Applications (BCA)",
    school: "Guru Jambheshwar University of Science & Technology, Hisar",
    period: "2018 – 2021",
  },
  {
    degree: "Senior Secondary (Class XII), CBSE",
    school: "Apex Public School, Fatehabad, Haryana",
    period: "2017",
  },
] as const;

export const certifications = [
  { name: "SQL (Basic) Certificate", issuer: "HackerRank", year: "Nov 2022" },
  { name: "C & C++ Programming Training", issuer: "8 Weeks", year: "Jun 2020" },
  { name: "National Service Scheme (NSS)", issuer: "Certificate", year: "2020" },
] as const;

export const navLinks = [
  { href: "#home", label: "Home" },
  { href: "#about", label: "About" },
  { href: "#skills", label: "Skills" },
  { href: "#experience", label: "Experience" },
  { href: "#projects", label: "Projects" },
  { href: "#contact", label: "Contact" },
] as const;
