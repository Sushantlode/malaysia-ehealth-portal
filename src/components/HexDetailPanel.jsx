import { useEffect, useRef, useState } from "react";
import { HEXES } from "../data";
import { getHexDetail } from "../hexDetailContent";
import { isSetuLinkedHex } from "../setuConfig";

function HexServiceCard({ hex, index, scrollTargetId, onJumpToMap, onLaunchHmis, onLaunchSetu }) {
  const detail = getHexDetail(hex.id);
  const rowRef = useRef(null);
  const [inView, setInView] = useState(false);
  const [pulse, setPulse] = useState(false);

  useEffect(() => {
    const node = rowRef.current;
    if (!node) return undefined;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setInView(true);
      },
      { rootMargin: "0px 0px -4% 0px", threshold: 0.06 }
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

  return (
    <li style={{ "--i": index }}>
      <article
        ref={rowRef}
        id={`hex-detail-${hex.id}`}
        className={["hex-service-item", inView ? "is-inview" : "", pulse ? "is-pulse" : ""].filter(Boolean).join(" ")}
      >
        <figure className="hex-service-media">
          <img className="hex-service-thumb" src={detail.image} alt="" loading="lazy" />
        </figure>
        <div className="hex-service-main">
          <header className="hex-service-head">
            <span className="hex-service-index" aria-hidden="true">
              {String(index + 1).padStart(2, "0")}
            </span>
            <strong>{detail.title}</strong>
            {detail.tagline ? <em>{detail.tagline}</em> : null}
          </header>
          <div className="hex-service-body">
            <p>{detail.overview}</p>
            <ul>
              {detail.bullets.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <div className="hex-service-actions">
              {hex.id === "hmis" && onLaunchHmis ? (
                <button type="button" className="hex-service-launch-link" onClick={onLaunchHmis}>
                  Open HMIS login
                </button>
              ) : null}
              {isSetuLinkedHex(hex.id) && onLaunchSetu ? (
                <button type="button" className="hex-service-launch-link" onClick={() => onLaunchSetu(hex.id)}>
                  Open on SETU
                </button>
              ) : null}
              <button type="button" className="hex-service-map-link" onClick={() => onJumpToMap(hex.id)}>
                Back to map
              </button>
            </div>
          </div>
        </div>
      </article>
    </li>
  );
}

export default function HexDetailPanel({ scrollTargetId, onJumpToMap, onLaunchHmis, onLaunchSetu }) {
  return (
    <section className="hex-services setu-block" id="hex-service-detail" aria-labelledby="hex-services-heading">
      <div className="setu-wrap hex-services-intro">
        <p className="eyebrow anim-fade-up">Malaysia eHealth programmes</p>
        <h2 id="hex-services-heading" className="anim-fade-up">
          eHealth Healthcare ltd on the national HIX
        </h2>
        <p className="dek anim-fade-up">
          All programmes below — three per row. Select a hexagon on the map to jump to its card.
        </p>
      </div>
      <div className="setu-wrap">
        <ol className="hex-services-grid">
          {HEXES.map((hex, index) => (
            <HexServiceCard
              key={hex.id}
              hex={hex}
              index={index}
              scrollTargetId={scrollTargetId}
              onJumpToMap={onJumpToMap}
              onLaunchHmis={onLaunchHmis}
              onLaunchSetu={onLaunchSetu}
            />
          ))}
        </ol>
      </div>
    </section>
  );
}
