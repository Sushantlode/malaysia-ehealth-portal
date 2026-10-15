import { useState } from "react";
import { ABOUT_IMAGE, INSIGHTS, MODULES } from "../setuContent";

export default function AboutPage() {
  const [activeId, setActiveId] = useState(MODULES[0].id);
  const active = MODULES.find((module) => module.id === activeId) || MODULES[0];

  return (
    <div className="about-page" id="about">
      <section className="setu-block" id="what-we-offer">
        <div className="setu-wrap">
          <p className="eyebrow">What we offer</p>
          <h2>Everything in the SETU app</h2>
          <p className="dek">
            Tap any module from the app dashboard to explore what it offers — the same services millions use on the SETU super app.
          </p>
          <div className="offer-layout">
            <div className="module-grid" role="list">
              {MODULES.map((module) => (
                <button
                  key={module.id}
                  type="button"
                  role="listitem"
                  className={module.id === active.id ? "module-tile is-active" : "module-tile"}
                  onClick={() => setActiveId(module.id)}
                >
                  <span className="module-icon">
                    <img src={module.icon} alt="" />
                  </span>
                  <span>{module.title}</span>
                </button>
              ))}
            </div>
            <article className="module-detail" style={{ "--accent": active.accent }}>
              <div className="module-detail-head">
                <span className="module-icon lg">
                  <img src={active.icon} alt="" />
                </span>
                <div>
                  <h3>{active.title}</h3>
                  <p>{active.tagline}</p>
                </div>
              </div>
              <p className="module-copy">{active.description}</p>
            </article>
          </div>
        </div>
      </section>

      <section className="setu-block about-setu" id="about-setu">
        <div className="setu-wrap about-grid-setu">
          <div>
            <p className="eyebrow">About SETU</p>
            <h2>Health begins with awareness. Care begins with connection.</h2>
            <p>
              SETU brings mothers, children, working adults, and seniors together under a seamless digital health platform — where prevention is prioritized, access is simplified, and care is personal.
            </p>
            <p>
              In India, many illnesses are detected late — not because care isn&apos;t available, but because it isn&apos;t accessible, coordinated, or preventive.
            </p>
          </div>
          <figure>
            <img src={ABOUT_IMAGE} alt="SETU team and healthcare work" />
          </figure>
        </div>
      </section>

      <section className="setu-block insights" id="insights">
        <div className="setu-wrap">
          <p className="eyebrow">Smarter care</p>
          <h2>Predictive analytics for smarter care</h2>
          <p className="dek">
            Turn health data into actionable insights — identifying trends and risks before they become emergencies.
          </p>
          <div className="insight-grid">
            {INSIGHTS.map((item) => (
              <article className="insight-card" key={item.id}>
                <img src={item.image} alt="" />
                <div>
                  <h3>{item.title}</h3>
                  <p className="insight-tag">{item.tagline}</p>
                  <p>{item.description}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="setu-block partner" id="partner">
        <div className="setu-wrap partner-panel">
          <p className="eyebrow">Why partner with us</p>
          <h2>Let&apos;s build healthier communities together</h2>
          <p>
            By partnering with SETU, you gain access to a unified platform enabling seamless collaboration, shared value, and measurable health improvement.
          </p>
          <a className="talk-btn" href="#contact">
            Start a Conversation
          </a>
        </div>
      </section>

      <section className="setu-block contact" id="contact">
        <div className="setu-wrap">
          <p className="eyebrow">Contact</p>
          <h2>Get in Touch.</h2>
          <p className="dek">
            Have a question, collaboration idea, or want to explore how SETU can support your healthcare goals? We&apos;d love to hear from you.
          </p>
          <div className="contact-grid">
            <a className="contact-card" href="mailto:support@setuai.com">
              <span>Email us</span>
              <strong>support@setuai.com</strong>
            </a>
            <a className="contact-card" href="tel:+919272439392">
              <span>Call us</span>
              <strong>+91 9272439392</strong>
            </a>
            <div className="contact-card">
              <span>Visit us</span>
              <strong>1073, Bhosale Mystiqa, Model Colony, Shivaji Nagar, Pune, Maharashtra 411016</strong>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
