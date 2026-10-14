import { useState } from "react";

const MAGNIFIC_DOCTOR_PAGE = "https://www.magnific.com/photos/malaysian-doctor";

const PM_SOURCES = [
  "/assets/pm.jpg",
  "https://commons.wikimedia.org/wiki/Special:FilePath/Anwar_Ibrahim_2026_%28cropped%29.jpg",
  "/assets/portrait-placeholder.svg",
];

/** Served from Magnific via /api/doctor-image on Vercel; local fallback in dev. */
const DOCTOR_IMAGE = import.meta.env.PROD ? "/api/doctor-image" : "/assets/doctor-magnific.jpg";

const BPO_SOURCES = [
  "/assets/bpo-center.jpg",
  "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=1920&q=80",
  "/assets/skillset.jpg",
];

export default function PeoplePanel() {
  const [pmSource, setPmSource] = useState(0);
  const [bpoSource, setBpoSource] = useState(0);

  return (
    <aside className="people-panel" aria-label="Leadership and healthcare services">
      <a className="person-card tone-gold leader" href="https://www.pmo.gov.my/en/" target="_blank" rel="noopener noreferrer">
        <div className="person-photo-wrap">
          <img
            className="portrait-leader"
            src={PM_SOURCES[pmSource]}
            alt="Prime Minister of Malaysia"
            onError={() => {
              setPmSource((current) => (current < PM_SOURCES.length - 1 ? current + 1 : current));
            }}
          />
        </div>
        <span className="person-cap">
          <small>Leadership</small>
          YAB Prime Minister
        </span>
      </a>
      <a
        className="person-card tone-red"
        href={MAGNIFIC_DOCTOR_PAGE}
        target="_blank"
        rel="noopener noreferrer"
      >
        <div className="person-photo-wrap">
          <img
            className="portrait-doctor"
            src={DOCTOR_IMAGE}
            alt="Malaysian doctor from Magnific"
            referrerPolicy="no-referrer"
          />
        </div>
        <span className="person-cap">
          <small>Care</small>
          Dial a Doctor
          <br />
          eVideo Clinic
        </span>
      </a>
      <article className="person-card tone-blue">
        <div className="person-photo-wrap">
          <img
            className="portrait-bpo"
            src={BPO_SOURCES[bpoSource]}
            alt="24x7 BPO health support center"
            onError={() => {
              setBpoSource((current) => (current < BPO_SOURCES.length - 1 ? current + 1 : current));
            }}
          />
        </div>
        <span className="person-cap">
          <small>BPO</small>
          24x7 Health Support
          <br />
          &amp; Skill Mapping
        </span>
      </article>
    </aside>
  );
}
