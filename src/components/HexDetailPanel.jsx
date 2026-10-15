import { useEffect, useRef, useState } from "react";
import { HEXES } from "../data";
import { getHexDetail } from "../hexDetailContent";

function HexServiceRow({ hex, index, scrollTargetId, onJumpToMap }) {
  const detail = getHexDetail(hex.id);
  const rowRef = useRef(null);
  const [open, setOpen] = useState(true);
  const [inView, setInView] = useState(false);
  const [pulse, setPulse] = useState(false);

  useEffect(() => {
    const node = rowRef.current;
    if (!node) return undefined;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setInView(true);
      },
      { rootMargin: "0px 0px -4% 0px", threshold: 0.08 }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (scrollTargetId !== hex.id) return undefined;
    setPulse(true);
    const timer = window.setTimeout(() => setPulse(false), 1400);
    return () => window.clearTimeout(timer);
  }, [scrollTargetId, hex.id]);

  if (!detail) return null;

  const slideClass = index % 2 === 0 ? "is-slide-left" : "is-slide-right";

  return (
    <li style={{ "--i": index }}>
      <article
        ref={rowRef}
        id={`hex-detail-${hex.id}`}
        className={[
          "hex-service-item",
          slideClass,
          inView ? "is-inview" : "",
          pulse ? "is-pulse" : "",
          open ? "is-open" : "",
        ]
          .filter(Boolean)
          .join(" ")}
      >
        <div className="hex-service-layout">
          <figure className="hex-service-media">
            <img className="hex-service-thumb" src={detail.image} alt="" loading="lazy" />
          </figure>
          <div className="hex-service-main">
            <button
              type="button"
              className="hex-service-toggle"
              aria-expanded={open}
              onClick={() => setOpen((value) => !value)}
            >
              <span className="hex-service-head">
                <span className="hex-service-index" aria-hidden="true">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <strong>{detail.title}</strong>
                {detail.tagline ? <em>{detail.tagline}</em> : null}
              </span>
              <span className="hex-service-chevron" aria-hidden="true" />
            </button>
            <div className="hex-service-body">
              <div className="hex-service-body-inner">
                <p>{detail.overview}</p>
                <ul>
                  {detail.bullets.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
                <button type="button" className="hex-service-map-link" onClick={() => onJumpToMap(hex.id)}>
                  Back to map
                </button>
              </div>
            </div>
          </div>
        </div>
      </article>
    </li>
  );
}

export default function HexDetailPanel({ scrollTargetId, onJumpToMap }) {
  return (
    <section className="hex-services setu-block" id="hex-service-detail" aria-labelledby="hex-services-heading">
      <div className="setu-wrap hex-services-intro">
        <p className="eyebrow anim-fade-up">Malaysia eHealth programmes</p>
        <h2 id="hex-services-heading" className="anim-fade-up">
          SETU eHealth on the national HIX
        </h2>
        <p className="dek anim-fade-up">
          Every service listed below — tap a row to fold details, or pick a hexagon on the map to jump here.
        </p>
      </div>
      <div className="setu-wrap">
        <ol className="hex-services-list">
          {HEXES.map((hex, index) => (
            <HexServiceRow
              key={hex.id}
              hex={hex}
              index={index}
              scrollTargetId={scrollTargetId}
              onJumpToMap={onJumpToMap}
            />
          ))}
        </ol>
      </div>
    </section>
  );
}
