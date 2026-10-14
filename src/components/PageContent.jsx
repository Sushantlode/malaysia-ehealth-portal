import { ABOUT } from "../data";

export default function PageContent({ services, flashId, onOpen }) {
  return (
    <div className="page-content">
      <section className="section" id="about">
        <h2>About the Portal</h2>
        <p className="lead">One connected digital front door for health services across Malaysia.</p>
        <div className="about-grid">
          {ABOUT.map((card) => (
            <div className="about-card" key={card.title}>
              <h3>{card.title}</h3>
              <p>{card.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="section" id="services">
        <h2>eHealth Services</h2>
        <p className="lead">Select any hexagon above to jump to its service here.</p>
        <div className="service-grid" id="serviceGrid">
          {services.map((service) => (
            <article
              className={flashId === service.id ? "service-card flash" : "service-card"}
              id={service.id}
              key={service.id}
            >
              <h3>{service.name}</h3>
              <p>Concept service tile. Connect the relevant page or API to enable this service.</p>
              <button type="button" onClick={() => onOpen(service)}>
                Open service
              </button>
            </article>
          ))}
        </div>
      </section>

      <footer className="site-footer">
        <span className="logo">
          <b>e</b>
          <small>+</small>
        </span>
        <span>Malaysia eHealth System Portal</span>
        <span>Concept design — not an official government website</span>
      </footer>
      <div style={{ height: 32 }} />
    </div>
  );
}
