/** Malaysia HIX stakeholder ecosystem (visual analytics — illustrative planning view). */

export const HIX_ECOSYSTEM = {
  eyebrow: "After the programme map",
  title: "Malaysia HIX stakeholder ecosystem",
  subtitle:
    "How MOH, providers, payers, citizens, and programmes connect on one national exchange — eHealth Healthcare ltd programmes on the hex map plug into this hub.",
  disclaimer: "Figures below are illustrative for planning — not official MOH statistics.",
};

export const HIX_OVERVIEW = [
  {
    id: "purpose",
    title: "Purpose",
    text: "The national HIX lets authorised organisations share the same trusted health facts instead of duplicating records in silos.",
  },
  {
    id: "govern",
    title: "Governance",
    text: "MOH sets standards, consent rules, and audit. State health offices monitor programmes, outbreaks, and district performance through the same hub.",
  },
  {
    id: "citizen",
    title: "Citizens",
    text: "Personal health records (PHR) give Malaysians a timeline of care and control over what is shared with each provider or scheme.",
  },
];

export const HIX_HUB = {
  label: "National HIX",
  sub: "MOH-governed exchange",
};

export const HIX_METRICS = [
  { id: "stakeholders", value: "8", label: "Core stakeholder groups" },
  { id: "programmes", value: "21", label: "Programmes on the map" },
  { id: "flows", value: "4", label: "Primary data flow types" },
  { id: "states", value: "16", label: "States & territories linked" },
];

export const HIX_LAYERS = [
  { id: "experience", label: "Experience layer", items: "Portal, PHR, telemedicine, schemes", color: "#ffd100" },
  { id: "exchange", label: "HIX exchange layer", items: "APIs, consent, routing, audit log", color: "#0b2a66" },
  { id: "source", label: "Source systems", items: "HMIS, LIS, RIS, payers, NGOs", color: "#1d4ed8" },
  { id: "insight", label: "Insight layer", items: "Command centre, analytics, research", color: "#7c3aed" },
];

export const HIX_FLOWS = [
  { id: "clinical", label: "Clinical", detail: "Encounters, orders, results", share: 38, color: "#1d4ed8" },
  { id: "admin", label: "Administrative", detail: "Beds, referrals, discharge", share: 26, color: "#0b2a66" },
  { id: "financial", label: "Financial", detail: "Cover, claims, schemes", share: 22, color: "#b45309" },
  { id: "public", label: "Public health", detail: "Outbreaks, immunisation, KPIs", share: 14, color: "#0f766e" },
];

/** Relative daily exchange activity index (illustrative, max = 100). */
export const HIX_ACTIVITY_BARS = [
  { id: "moh", label: "MOH & states", value: 100, color: "#0b2a66" },
  { id: "hospitals", label: "Hospitals", value: 88, color: "#1d4ed8" },
  { id: "primary", label: "Clinics & PHC", value: 76, color: "#0369a1" },
  { id: "labs", label: "Labs & imaging", value: 68, color: "#7c3aed" },
  { id: "citizens", label: "Citizens (PHR)", value: 58, color: "#c8102e" },
  { id: "payers", label: "Insurers & takaful", value: 52, color: "#b45309" },
  { id: "ngo", label: "NGOs", value: 36, color: "#0f766e" },
  { id: "research", label: "Analytics & R&D", value: 28, color: "#4c1d95" },
];

export const HIX_JOURNEY = [
  { step: "1", title: "Register & consent", detail: "Citizen or provider identity on HIX" },
  { step: "2", title: "Capture at source", detail: "Clinic, hospital, lab, or camp" },
  { step: "3", title: "Publish to HIX", detail: "Standard summary + coded results" },
  { step: "4", title: "Consume & act", detail: "Referral, claim, PHR update, dashboard" },
];

/** Positions on 400×400 diagram (center 200,200). */
export const HIX_NODES = [
  {
    id: "moh",
    label: "MOH & states",
    role: "Governance & standards",
    detail: "Policy, licensing, notifiable disease, national KPIs",
    x: 200,
    y: 48,
    color: "#0b2a66",
  },
  {
    id: "hospitals",
    label: "Hospitals",
    role: "Inpatient & emergency",
    detail: "Admissions, theatre, ICU beds, discharge summaries",
    x: 318,
    y: 95,
    color: "#1d4ed8",
  },
  {
    id: "primary",
    label: "Clinics & PHC",
    role: "Primary & e-consult",
    detail: "Registration, e-prescriptions, referrals upstream",
    x: 352,
    y: 200,
    color: "#0369a1",
  },
  {
    id: "labs",
    label: "Labs & imaging",
    role: "Diagnostics",
    detail: "Structured results, imaging links, TAT metrics",
    x: 318,
    y: 305,
    color: "#7c3aed",
  },
  {
    id: "citizens",
    label: "Citizens (PHR)",
    role: "View & consent",
    detail: "Timeline, dependants, share with provider or insurer",
    x: 200,
    y: 352,
    color: "#c8102e",
  },
  {
    id: "payers",
    label: "Insurers & takaful",
    role: "Cover & claims",
    detail: "Eligibility, pre-auth, encounter-based claims",
    x: 82,
    y: 305,
    color: "#b45309",
  },
  {
    id: "ngo",
    label: "NGOs",
    role: "Outreach & camps",
    detail: "Screening camps, charity care, disaster response",
    x: 48,
    y: 200,
    color: "#0f766e",
  },
  {
    id: "research",
    label: "Analytics & R&D",
    role: "De-identified insight",
    detail: "Population trends, approved research datasets",
    x: 82,
    y: 95,
    color: "#4c1d95",
  },
];

/** Quarterly trend (illustrative index) for line chart. */
export const HIX_TREND = [
  { q: "Q1", value: 42 },
  { q: "Q2", value: 55 },
  { q: "Q3", value: 68 },
  { q: "Q4", value: 79 },
];
