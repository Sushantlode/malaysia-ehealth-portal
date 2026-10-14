const CDN = "https://d10pnqyli54qno.cloudfront.net/Website";

export const HERO_VIDEO = `${CDN}/videos/herovideo.mp4?v=2`;
export const HERO_POSTER = `${CDN}/enhanced/general/hero-fg.webp`;
export const ABOUT_IMAGE = `${CDN}/enhanced/general/about-team.webp`;
export const DASHBOARD_IMAGE = `${CDN}/enhanced/services/preventive-ehealth-center.webp`;
export const RISK_IMAGE = `${CDN}/enhanced/services/preventive-health-kit.webp`;

export const MODULES = [
  {
    id: "telemedicine",
    title: "Telemedicine",
    tagline: "Consult doctors online, anywhere",
    description:
      "Connect with qualified doctors for online consultations, prescriptions, and follow-ups. Book appointments by city, access emergency doctors, and get timely medical advice without visiting a clinic.",
    icon: `${CDN}/dashboard/Appointment.png`,
    accent: "#5B4DFF",
  },
  {
    id: "preventive-health",
    title: "Preventive Health",
    tagline: "Screening, devices & lab reports",
    description:
      "Book doorstep or center preventive checkups, manage packages and patients, pay via UPI or cash, and access lab reports including GenVCare cancer reports.",
    icon: `${CDN}/enhanced/services/preventive-health-kit.webp`,
    accent: "#7C3AED",
  },
  {
    id: "book-tests",
    title: "Book Tests",
    tagline: "Trusted lab tests at your doorstep",
    description:
      "Compare and book diagnostic tests from certified labs. Schedule home sample collection, choose health packages, and receive accurate digital reports on time.",
    icon: `${CDN}/dashboard/Book_Test.png`,
    accent: "#C026D3",
  },
  {
    id: "generic-medicine",
    title: "Generic Medicine",
    tagline: "Affordable medicines, delivered fast",
    description:
      "Compare branded and generic medicine prices, upload prescriptions, order from nearby pharmacies, and find Jan Aushadhi stores near you.",
    icon: `${CDN}/dashboard/Generic_Medicine.png`,
    accent: "#0D9488",
  },
  {
    id: "mental-health",
    title: "Mental Health",
    tagline: "Understand and improve emotional wellness",
    description:
      "Assess emotional well-being with guided self-checks, track mood patterns, and connect with a mental wellness specialist when you need support.",
    icon: `${CDN}/dashboard/Mental_Health.png`,
    accent: "#8B5CF6",
  },
  {
    id: "govt-schemes",
    title: "Government Schemes",
    tagline: "500+ health & welfare schemes",
    description:
      "Explore government health and welfare schemes in one place, and find programs based on eligibility, needs, and residence.",
    icon: `${CDN}/dashboard/Govt_Schemes.png`,
    accent: "#2563EB",
  },
  {
    id: "drug-directory",
    title: "Drug Directory",
    tagline: "Know your medicines, stay safe",
    description:
      "Search medicines by name, category, or symptoms. Review uses, dosage, and safety guidance, including side-effect analysis and medication reminders.",
    icon: `${CDN}/dashboard/Drug_Directory.png`,
    accent: "#1D4ED8",
  },
  {
    id: "agriculture",
    title: "Agriculture",
    tagline: "Smart farming guidance & support",
    description:
      "Crop care tips, soil test booking, weather insights, and farming products for rural communities, with a way to connect with experts.",
    icon: `${CDN}/dashboard/Agri_Solutions.png`,
    accent: "#EA580C",
  },
  {
    id: "abha",
    title: "ABHA",
    tagline: "Your digital health identity",
    description:
      "Create or access a national health ID to manage digital health records, share them with consent, and avail government benefits in one place.",
    icon: `${CDN}/dashboard/Aabha.png`,
    accent: "#4338CA",
  },
  {
    id: "fitness",
    title: "Fitness",
    tagline: "Workouts, nutrition & dietitian care",
    description:
      "Personalized workouts, meal plans, water intake tracking, and dietitian consultations to build daily habits for preventive wellness.",
    icon: `${CDN}/dashboard/Fitness.png`,
    accent: "#DB2777",
  },
];

export const INSIGHTS = [
  {
    id: "dashboards",
    title: "Real-Time Health Dashboards",
    tagline: "Live visibility across programs",
    description:
      "Cloud-connected dashboards give health teams instant insight into screenings, trends, and outcomes — from district camps to statewide deployments.",
    image: DASHBOARD_IMAGE,
  },
  {
    id: "risk-scoring",
    title: "Predictive Risk Scoring",
    tagline: "Act before conditions escalate",
    description:
      "AI models analyze screening data to flag at-risk individuals early — enabling timely follow-ups, referrals, and preventive interventions at scale.",
    image: RISK_IMAGE,
  },
];
