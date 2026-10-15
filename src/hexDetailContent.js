/** Per–hexagon copy and imagery for Malaysia eHealth / SETU on the HIX. */

function detail(title, tagline, overview, bullets, imageAlt) {
  return { title, tagline, overview, bullets, imageAlt };
}

const hexImage = (hexId) => `${import.meta.env.BASE_URL}assets/hex/${hexId}.jpg`;

export const HEX_DETAIL_BY_ID = {
  "blood-banks": detail(
    "Blood Banks, Cord Blood Bank and R&D Centre",
    "National visibility for life-saving supply",
    "Malaysia needs real-time matching of blood and cord-blood inventory with patient needs across states and private banks. SETU eHealth registers donors, units, and cold-chain handoffs on the HIX so hospitals avoid delays and research centres access de-identified datasets safely.",
    [
      "Live inventory and cross-match requests between MOH, university hospitals, and private blood centres.",
      "Cord-blood registry linked to maternity and PHR records with parent consent.",
      "R&D analytics on aggregated, privacy-preserving HIX data for haematology programmes.",
    ]
  ),
  "organ-donor": detail(
    "Organ Donor & Recipient Programme",
    "Coordinated transplant pathways",
    "Organ donation spans registries, hospitals, and follow-up care. SETU eHealth connects donor pledges, recipient waitlists, and transplant centre workflows through the HIX so matching, notifications, and post-transplant monitoring stay aligned nationwide.",
    [
      "Single national donor intent record tied to MyKad-verified identity.",
      "Secure exchange of compatibility and allocation data between transplant networks.",
      "Longitudinal PHR updates for recipients and living donors after discharge.",
    ]
  ),
  "medical-stores": detail(
    "Medical Stores & Ambulances",
    "Pharmacy and emergency logistics on one network",
    "Essential medicines and ambulance dispatch must be findable in minutes. SETU eHealth maps licensed pharmacies, medical stores, and ambulance fleets to the HIX so clinicians, insurers, and command centres see availability, stock alerts, and ETA for emergency response.",
    [
      "Geo-indexed pharmacy and store stock for chronic and acute prescriptions.",
      "Ambulance status, routing, and handover notes to receiving hospitals via HMIS.",
      "Integration with medical tourism and insurance for cashless fulfilment where eligible.",
    ]
  ),
  insurance: detail(
    "Integration with Insurance",
    "Cashless, rules-based coverage at point of care",
    "Malaysia’s mixed public–private financing works best when eligibility and claims flow digitally. SETU eHealth plugs takaful and health insurers into the HIX for real-time authorization, package pricing, and discharge summaries — reducing fraud and patient out-of-pocket friction.",
    [
      "Policy lookup and pre-authorization at registration using standard HIX identifiers.",
      "Automated claim payloads from HMIS encounters and lab/diagnostic results.",
      "Transparent benefit rules for federal schemes and employer plans in one citizen view.",
    ]
  ),
  communication: detail(
    "Free Communication Channel",
    "Trusted outreach for every household",
    "Preventive programmes fail when reminders never reach the patient. SETU eHealth provides MOH-approved SMS, app, and IVR channels tied to PHR and programme enrolment — all logged on the HIX for compliance and multilingual delivery by state.",
    [
      "Appointment, screening, and medication reminders in Bahasa Melayu, English, and other national languages.",
      "Two-way triage chatbot escalation to 24×7 BPO nurses with context from the HIX.",
      "Campaign analytics for outbreaks, maternal care, and scheme enrolment without exposing clinical detail.",
    ]
  ),
  checkups: detail(
    "Preventive Health Check-ups",
    "Screen early, act statewide",
    "SETU’s preventive health modules — camps, home collection, and package booking — feed structured results into the HIX so MOH and insurers see population trends and individuals receive follow-up in their PHR.",
    [
      "Book doorstep or centre check-ups with digital reports attached to the citizen record.",
      "Risk flags and referral queues for primary care and specialists.",
      "Dashboards for district and state screening coverage targets.",
    ]
  ),
  specialists: detail(
    "Specialist Doctors & Clinics",
    "Referral-grade care beyond the capital",
    "Specialist capacity is uneven across states. SETU eHealth lists credentialed specialists and clinics on the HIX, supports e-referrals from primary care, and shares imaging and lab context so second opinions do not restart from zero.",
    [
      "Searchable specialist directory with wait times and telemedicine slots.",
      "Interoperable referral letters and shared diagnostic artefacts.",
      "Quality metrics reported back to MOH credentialing programmes.",
    ]
  ),
  dashboard: detail(
    "Dashboard and Command Centre",
    "One operational picture for Malaysia",
    "Command centres need live situational awareness — beds, outbreaks, supply, and programme KPIs. SETU eHealth aggregates HIX feeds into MOH and state dashboards with role-based views for ministers, DHOs, and hospital CEOs.",
    [
      "Real-time bed, ICU, and ambulance capacity by facility.",
      "Programme dashboards for maternal health, NCDs, and scheme uptake.",
      "Drill-down from national map to district and facility without duplicate data entry.",
    ]
  ),
  ngos: detail(
    "NGOs & Charitable Trusts",
    "Community partners on the same rails",
    "NGOs deliver outreach, charity care, and disaster response. SETU eHealth gives vetted partners limited HIX roles to register beneficiaries, schedule camps, and report outcomes while MOH retains governance and audit.",
    [
      "Partner onboarding with scoped access to enrolment and camp modules.",
      "Donor-funded care tracked against utilisation and outcomes.",
      "Volunteer skill mapping linked to local employment initiatives.",
    ]
  ),
  phr: detail(
    "PHR to Citizens & Residents",
    "Your health story, under your control",
    "A national portal is only as strong as the citizen record. SETU eHealth PHR (aligned with digital health ID concepts) lets Malaysians view visits, labs, immunisations, and schemes — sharing with providers through consent on the HIX.",
    [
      "Unified timeline from public and private providers that publish to the HIX.",
      "Consent-based sharing for travel, insurance, and second opinions.",
      "Family and caregiver access modes for children and elderly dependents.",
    ]
  ),
  portal: detail(
    "MALAYSIA Portal",
    "Front door to an interoperable national HIX",
    "The Malaysia eHealth portal is the citizen and provider entry point to SETU eHealth — connecting clinics, hospitals, labs, insurers, NGOs, and programmes on one Health Information Exchange. One login surfaces services by state, language, and role while MOH governs standards, privacy, and uptime.",
    [
      "Single sign-on to telemedicine, PHR, schemes, diagnostics, and command views.",
      "State and district context from the navbar flows into every service request.",
      "Built to interoperate with existing MOH systems via APIs — not replace them overnight.",
    ]
  ),
  clinics: detail(
    "Clinic In Every Town & e-Video Clinic in Every Village",
    "Primary care and virtual reach",
    "Town clinics anchor daily care; e-video extends specialists to rural villages. SETU eHealth registers every clinic on the HIX, powers e-consult workflows, and syncs prescriptions and referrals to HMIS and pharmacies.",
    [
      "Clinic locator with services, hours, and telehealth readiness.",
      "e-Video visits with documentation auto-filed to the patient PHR.",
      "Dial-a-doctor and BPO escalation when connectivity or acuity requires it.",
    ]
  ),
  hmis: detail(
    "Free HMIS To Private & Govt. Hospitals",
    "One clinical record layer for all facilities",
    "Free HMIS on the HIX gives public and private hospitals the same admission, orders, discharge, and reporting templates — so Malaysia builds interoperability by default, not by retrofit.",
    [
      "Cloud HMIS with MOH master data (facilities, codes, schemes).",
      "Automatic HIX submission of summaries, notifiable events, and bed stats.",
      "Lower IT burden for small private hospitals joining the national network.",
    ]
  ),
  tracking: detail(
    "Mother, Child & Adolescent Female Tracking System",
    "Continuity from pregnancy to adulthood",
    "Maternal and child health spans antenatal visits, immunisation, and adolescent services. SETU eHealth tracks milestones on the HIX, triggers reminders, and links to federal schemes when eligibility matches.",
    [
      "Pregnancy risk stratification with referral to higher-level facilities.",
      "Immunisation and growth records in the child PHR.",
      "Adolescent female health programmes with privacy-appropriate access controls.",
    ]
  ),
  schemes: detail(
    "Federal Government Schemes",
    "Benefits discovered and redeemed digitally",
    "Hundreds of health and welfare schemes fail when citizens cannot find them. SETU eHealth maps federal programmes to HIX eligibility rules and surfaces entitlements in the app and portal at point of care.",
    [
      "Scheme finder by residence, income band, and clinical context.",
      "Enrolment and utilisation reporting for MOH and implementing agencies.",
      "Integration with insurance and HMIS for automatic subsidy application.",
    ]
  ),
  employment: detail(
    "Additional Local Employment",
    "Health economy jobs in every district",
    "Digital health scale creates local roles — community health workers, lab phlebotomists, BPO agents, and data stewards. SETU eHealth ties skill-set mapping and training completion to HIX workforce registries MOH and states can plan against.",
    [
      "District job boards linked to census and facility demand signals.",
      "Certification tracking for lay counsellors and telehealth facilitators.",
      "KPO analytics roles fed by anonymised HIX operational data.",
    ]
  ),
  pathology: detail(
    "Pathology Labs",
    "Results that follow the patient",
    "Labs must publish structured results once, consumed everywhere. SETU eHealth connects pathology networks to the HIX with standard codes, turnaround metrics, and home-collection scheduling from the Book Tests module.",
    [
      "Digital lab reports attached to PHR and referring clinician inbox.",
      "Network-wide QC and volume dashboards for MOH licensing.",
      "Reduced duplicate testing when prior results are visible with consent.",
    ]
  ),
  diagnostics: detail(
    "Diagnostic Centres",
    "Imaging and advanced diagnostics interoperably",
    "Diagnostic centres generate large files and reports that often stay trapped. SETU eHealth routes orders from HMIS and telemedicine, stores report metadata on the HIX, and links imaging viewers for authorised providers.",
    [
      "E-referrals with clinical indication and insurance pre-auth.",
      "Report and key image pointers available to specialists nationwide.",
      "Capacity and modality maps for medical tourism and public referrals.",
    ]
  ),
  census: detail(
    "Census, Skill-Set Mapping, 24×7 BPO and KPO",
    "Population intelligence and always-on support",
    "National health planning needs people and skills data, not just facilities. SETU eHealth combines community census, workforce skills, and 24×7 BPO health desks — every interaction optionally enriching authorised HIX programme views.",
    [
      "Household health surveys feeding district prevalence estimates.",
      "BPO triage with escalation to clinicians and ambulance when needed.",
      "KPO teams curating data quality across HMIS and lab feeds.",
    ]
  ),
  tourism: detail(
    "Enhancing Medical Tourism",
    "Trusted care for visitors and export revenue",
    "Medical tourists need transparent packages, quality credentials, and portable records. SETU eHealth publishes accredited centres on the HIX, supports international patient journeys, and integrates insurance and discharge summaries for continuity after travel.",
    [
      "Accredited hospital and specialist packages with indicative pricing.",
      "Visitor PHR and consent for foreign payer and embassy requirements.",
      "Outcome reporting to maintain Malaysia’s global reputation.",
    ]
  ),
  informatics: detail(
    "Health Informatics Network Value Chain",
    "From data to decisions at scale",
    "The value chain closes when data becomes insight — research, policy, and payment reform. SETU eHealth’s analytics layer sits on the HIX with governance, de-identification, and AI-assisted risk scoring for population health.",
    [
      "Longitudinal datasets for NCD, infectious disease, and scheme effectiveness studies.",
      "Predictive models flagging at-risk cohorts for proactive outreach.",
      "Vendor-neutral APIs so universities and approved innovators build on MOH rails.",
    ]
  ),
};

export function getHexDetail(hexId) {
  const entry = HEX_DETAIL_BY_ID[hexId];
  if (!entry) return null;
  return {
    ...entry,
    image: hexImage(hexId),
    imageAlt: entry.imageAlt ?? `${entry.title} — Malaysia eHealth`,
  };
}

