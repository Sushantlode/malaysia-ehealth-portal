import { useState } from "react";

const MAGNIFIC_DOCTOR_PAGE = "https://www.magnific.com/photos/malaysian-doctor";

const PM_IMAGE = `${import.meta.env.BASE_URL}assets/pm.jpg`;

const PM_SOURCES = [
  PM_IMAGE,
  "https://commons.wikimedia.org/wiki/Special:FilePath/Anwar_Ibrahim_2026_%28cropped%29.jpg",
  `${import.meta.env.BASE_URL}assets/portrait-placeholder.svg`,
];

const DOCTOR_IMAGE = `${import.meta.env.BASE_URL}assets/doctor-magnific.jpg`;

const CCAM_HOME = "https://ccam.org.my/";
const BPO_IMAGE = `${import.meta.env.BASE_URL}assets/bpo-call-center.jpg`;

const BPO_SOURCES = [
  BPO_IMAGE,
  `${import.meta.env.BASE_URL}assets/bpo-malaysia-youth.jpg`,
  `${import.meta.env.BASE_URL}assets/portrait-placeholder.svg`,
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
            alt="YAB Prime Minister of Malaysia"
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
      <a className="person-card tone-blue" href={CCAM_HOME} target="_blank" rel="noopener noreferrer">
        <div className="person-photo-wrap">
          <img
            className="portrait-bpo"
            src={BPO_SOURCES[bpoSource]}
            alt="Call center operator — Contact Centre Association of Malaysia (CCAM)"
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
      </a>
    </aside>
  );
}
