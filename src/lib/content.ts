export type Locale = "en" | "fr";
export type Track = "all" | "finance" | "tech";

export interface ProjectItem {
  id: string;
  track: Exclude<Track, "all">;
  title: string;
  tag: string;
  summary: Record<Locale, string>;
  metrics: string[];
  link?: string;
}

export interface TimelineItem {
  period: string;
  title: Record<Locale, string>;
  institution: string;
  detail: Record<Locale, string>;
}

export const SITE_CONFIG = {
  name: "Gabriel Minka Bassi",
  alias: "Bassi Gabriel",
  location: "Douala, Cameroon",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://gabrielbassi.com",
};

export const UI_COPY: Record<
  Locale,
  {
    badge: string;
    headline: string;
    subheadline: string;
    ctaPrimary: string;
    ctaSecondary: string;
    filterAll: string;
    filterFinance: string;
    filterTech: string;
    projectsHeading: string;
    timelineHeading: string;
    contactHeading: string;
    contactSub: string;
    namePlaceholder: string;
    emailPlaceholder: string;
    messagePlaceholder: string;
    sendButton: string;
    sentSuccess: string;
  }
> = {
  en: {
    badge: "Douala, Cameroon • Finance & Software Architecture",
    headline: "Bridging Financial Strategy & High-Velocity Software.",
    subheadline:
      "MBA 2 candidate in Financial Management & Control and Software Engineering graduate building scalable platforms, quantitative models, and automated digital products.",
    ctaPrimary: "Explore Work",
    ctaSecondary: "Start a Conversation",
    filterAll: "All Pillars",
    filterFinance: "Finance & Control",
    filterTech: "Software & Web3",
    projectsHeading: "Selected Initiatives & Systems",
    timelineHeading: "Academic & Technical Trajectory",
    contactHeading: "Let's Build or Collaborate",
    contactSub: "Available for financial advisory, control, and full-stack product engineering.",
    namePlaceholder: "Your Name",
    emailPlaceholder: "Work or Personal Email",
    messagePlaceholder: "Tell me about your project, role, or opportunity...",
    sendButton: "Send Message",
    sentSuccess: "Message received. I will respond shortly.",
  },
  fr: {
    badge: "Douala, Cameroun • Finance & Architecture Logicielle",
    headline: "Allier Stratégie Financière et Ingénierie Logicielle.",
    subheadline:
      "Étudiant en MBA 2 Gestion Financière et Contrôle, diplômé en Génie Logiciel, concevant des plateformes évolutives, des modèles quantitatifs et des produits numériques.",
    ctaPrimary: "Découvrir les Projets",
    ctaSecondary: "Prendre Contact",
    filterAll: "Tous les Piliers",
    filterFinance: "Finance & Contrôle",
    filterTech: "Logiciel & Web3",
    projectsHeading: "Initiatives & Systèmes Clés",
    timelineHeading: "Parcours Académique & Technique",
    contactHeading: "Collaborons Ensemble",
    contactSub: "Disponible pour des missions en conseil financier, contrôle de gestion et ingénierie produit.",
    namePlaceholder: "Votre Nom",
    emailPlaceholder: "Email Professionnel ou Personnel",
    messagePlaceholder: "Décrivez votre projet, poste ou opportunité...",
    sendButton: "Envoyer le Message",
    sentSuccess: "Message reçu. Je vous répondrai rapidement.",
  },
};

export const PROJECTS: ProjectItem[] = [
  {
    id: "toonslab",
    track: "tech",
    title: "Toonslab (Toonslab.fun)",
    tag: "Web3 Publishing & Creator Economy",
    summary: {
      en: "Creator-first webcomics publishing platform offering 70–80% revenue share with integrated Web3 and local fiat payment rails.",
      fr: "Plateforme de publication de webcomics offrant 70 à 80 % de partage des revenus avec paiements Web3 et passerelles locales.",
    },
    metrics: ["70–80% Creator Share", "Global Creator Onboarding", "Multi-Rail Payments"],
    link: "https://toonslab.fun",
  },
  {
    id: "quant-control",
    track: "finance",
    title: "Financial Control & M&A Valuation Models",
    tag: "Corporate Finance & Risk",
    summary: {
      en: "Structured cash-flow forecasting, variance control dashboards, and OHADA-compliant corporate structuring frameworks.",
      fr: "Modèles de prévision de trésorerie, tableaux de contrôle budgétaire et structuration d'entreprise conforme OHADA.",
    },
    metrics: ["DCF & Valuation", "OHADA Compliance", "Variance Analytics"],
  },
  {
    id: "ai-pipelines",
    track: "tech",
    title: "Autonomous Data & Outreach Pipelines",
    tag: "Python • Async Scraping • AI Workflows",
    summary: {
      en: "High-throughput Python scraping and human-in-the-loop CRM automation workflows connecting structured datasets with personalized outreach.",
      fr: "Pipelines Python d'extraction de données et d'automatisation CRM avec validation humaine.",
    },
    metrics: ["Python 3.14 & Scrapy", "Automated Lead Scoring", "Zero-Spam Guardrails"],
  },
];

export const TIMELINE: TimelineItem[] = [
  {
    period: "Present",
    title: {
      en: "MBA 2 — Financial Management & Control",
      fr: "MBA 2 — Gestion Financière et Contrôle",
    },
    institution: "IUGET, Douala",
    detail: {
      en: "Corporate finance, management control systems, audit, and strategic valuation.",
      fr: "Finance d'entreprise, contrôle de gestion, audit et évaluation stratégique.",
    },
  },
  {
    period: "Prior Degree",
    title: {
      en: "Bachelor in Banking & Finance",
      fr: "Licence en Banque et Finance",
    },
    institution: "IUC Logbessou, Douala",
    detail: {
      en: "Financial markets, credit risk analysis, corporate treasury, and banking operations.",
      fr: "Marchés financiers, analyse du risque de crédit, trésorerie et opérations bancaires.",
    },
  },
  {
    period: "Engineering Foundation",
    title: {
      en: "Licence Technologique & DUT in Software Engineering",
      fr: "Licence Technologique & DUT en Génie Logiciel",
    },
    institution: "IUT of Douala",
    detail: {
      en: "Full-stack architecture, relational databases, algorithms, and production software engineering.",
      fr: "Architecture full-stack, bases de données relationnelles, algorithmes et génie logiciel.",
    },
  },
];
