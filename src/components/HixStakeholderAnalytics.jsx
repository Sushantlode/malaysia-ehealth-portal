import { useEffect, useRef, useState } from "react";
import {
  HIX_ACTIVITY_BARS,
  HIX_ECOSYSTEM,
  HIX_FLOWS,
  HIX_HUB,
  HIX_JOURNEY,
  HIX_LAYERS,
  HIX_METRICS,
  HIX_NODES,
  HIX_OVERVIEW,
  HIX_TREND,
} from "../hixAnalyticsData";

const CX = 200;
const CY = 200;
const TREND_MAX = 100;
const TREND_W = 420;
const TREND_H = 140;
const TREND_PAD = 28;

function trendCoords() {
  const innerW = TREND_W - TREND_PAD * 2;
  const innerH = TREND_H - TREND_PAD * 2;
  return HIX_TREND.map((point, i) => ({
    x: TREND_PAD + (i / (HIX_TREND.length - 1)) * innerW,
    y: TREND_PAD + innerH - (point.value / TREND_MAX) * innerH,
  }));
}

function trendPoints() {
  return trendCoords()
    .map(({ x, y }) => `${x},${y}`)
    .join(" ");
}

function trendPathD() {
  const coords = trendCoords();
  if (!coords.length) return "";
  return coords.map(({ x, y }, i) => `${i === 0 ? "M" : "L"} ${x} ${y}`).join(" ");
}

function trendAreaPoints() {
  const coords = trendCoords();
  if (!coords.length) return "";
  const baseline = TREND_H - TREND_PAD;
  const line = coords.map(({ x, y }) => `${x},${y}`).join(" ");
  return `${coords[0].x},${baseline} ${line} ${coords[coords.length - 1].x},${baseline}`;
}

function useCountUp(target, active, duration = 900, delay = 0) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!active) {
      setValue(0);
      return undefined;
    }
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setValue(target);
      return undefined;
    }

    let raf = 0;
    const startAt = performance.now() + delay;

    const tick = (now) => {
      if (now < startAt) {
        raf = requestAnimationFrame(tick);
        return;
      }
      const progress = Math.min(1, (now - startAt) / duration);
      const eased = 1 - (1 - progress) ** 3;
      setValue(Math.round(target * eased));
      if (progress < 1) raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [active, target, duration, delay]);

  return value;
}

function BarValue({ target, live, index }) {
  const value = useCountUp(target, live, 1000, 280 + index * 95);
  return <span className="hix-bar-value">{value}</span>;
}

function LegendShare({ share, live, index }) {
  const value = useCountUp(share, live, 800, 520 + index * 110);
  return <span className="hix-legend-share">{value}%</span>;
}

export default function HixStakeholderAnalytics() {
  const flowTotal = HIX_FLOWS.reduce((sum, f) => sum + f.share, 0);
  const sectionRef = useRef(null);
  const chartsRef = useRef(null);
  const [animated, setAnimated] = useState(false);
  const [chartsLive, setChartsLive] = useState(false);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      setAnimated(true);
      setChartsLive(true);
      return undefined;
    }

    const sectionNode = sectionRef.current;
    const chartsNode = chartsRef.current;
    const observers = [];

    if (sectionNode) {
      const sectionObserver = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setAnimated(true);
            sectionObserver.disconnect();
          }
        },
        { threshold: 0.08, rootMargin: "0px 0px -40px 0px" }
      );
      sectionObserver.observe(sectionNode);
      observers.push(sectionObserver);
    }

    if (chartsNode) {
      const chartsObserver = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setChartsLive(true);
            chartsObserver.disconnect();
          }
        },
        { threshold: 0.2, rootMargin: "0px 0px -8% 0px" }
      );
      chartsObserver.observe(chartsNode);
      observers.push(chartsObserver);
    }

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  const sectionClass = animated ? "hix-ecosystem setu-block is-animated" : "hix-ecosystem setu-block";
  const chartsClass = chartsLive ? "hix-charts-row is-live" : "hix-charts-row";

  return (
    <section
      ref={sectionRef}
      className={sectionClass}
      id="hix-stakeholder-analytics"
      aria-labelledby="hix-ecosystem-heading"
    >
      <div className="setu-wrap">
        <p className="eyebrow">{HIX_ECOSYSTEM.eyebrow}</p>
        <h2 id="hix-ecosystem-heading">{HIX_ECOSYSTEM.title}</h2>
        <p className="dek hix-ecosystem-dek">{HIX_ECOSYSTEM.subtitle}</p>

        <ul className="hix-overview-grid">
          {HIX_OVERVIEW.map((block) => (
            <li key={block.id}>
              <h3>{block.title}</h3>
              <p>{block.text}</p>
            </li>
          ))}
        </ul>

        <ul className="hix-metrics" aria-label="Ecosystem overview">
          {HIX_METRICS.map((m, i) => (
            <li key={m.id} style={{ "--metric-i": i }}>
              <span className="hix-metrics-value">{m.value}</span>
              <span className="hix-metrics-label">{m.label}</span>
            </li>
          ))}
        </ul>

        <div className="hix-diagram-wrap">
          <svg
            className="hix-diagram-svg"
            viewBox="0 0 400 412"
            role="img"
            aria-labelledby="hix-diagram-title hix-diagram-desc"
          >
            <title id="hix-diagram-title">Malaysia HIX stakeholder hub</title>
            <desc id="hix-diagram-desc">
              National HIX at the centre with eight stakeholder groups connected by exchange lines.
            </desc>
            <circle className="hix-ring" cx={CX} cy={CY} r={118} />
            <circle className="hix-ring hix-ring-inner" cx={CX} cy={CY} r={88} />
            {HIX_NODES.map((node, i) => (
              <line
                key={`line-${node.id}`}
                className="hix-spoke"
                style={{ "--spoke-i": i }}
                x1={CX}
                y1={CY}
                x2={node.x}
                y2={node.y}
              />
            ))}
            <circle className="hix-hub-outer" cx={CX} cy={CY} r={52} />
            <circle className="hix-hub-inner" cx={CX} cy={CY} r={46} />
            {HIX_NODES.map((node, i) => (
              <g key={node.id} className="hix-node" style={{ "--node-i": i }}>
                <circle className="hix-node-dot-svg" cx={node.x} cy={node.y} r={18} fill={node.color} />
                <rect
                  className="hix-node-label-bg"
                  x={node.x - 66}
                  y={node.y + 22}
                  width={132}
                  height={22}
                  rx={6}
                />
                <text className="hix-node-label" x={node.x} y={node.y + 37} textAnchor="middle">
                  {node.label}
                </text>
              </g>
            ))}
            <g className="hix-hub-labels" aria-hidden="true">
              <rect className="hix-hub-label-bg" x={CX - 72} y={CY - 30} width={144} height={58} rx={12} />
              <text className="hix-hub-text" x={CX} y={CY - 8} textAnchor="middle">
                {HIX_HUB.label}
              </text>
              <text className="hix-hub-sub" x={CX} y={CY + 10} textAnchor="middle">
                MOH-governed
              </text>
              <text className="hix-hub-sub" x={CX} y={CY + 24} textAnchor="middle">
                exchange
              </text>
            </g>
          </svg>

          <ul className="hix-node-cards">
            {HIX_NODES.map((node) => (
              <li key={node.id}>
                <span className="hix-node-dot" style={{ background: node.color }} aria-hidden="true" />
                <div>
                  <strong>{node.label}</strong>
                  <span className="hix-node-role">{node.role}</span>
                  <span className="hix-node-detail">{node.detail}</span>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div ref={chartsRef} className={chartsClass}>
          <div className="hix-chart-panel" style={{ "--panel-i": 0 }}>
            <div className="hix-chart-head">
              <h3 className="hix-chart-title">HIX activity by stakeholder</h3>
              <p className="hix-chart-caption">Relative exchange index (illustrative)</p>
            </div>
            <ul className="hix-bar-chart">
              {HIX_ACTIVITY_BARS.map((row, i) => (
                <li key={row.id} style={{ "--bar-i": i }}>
                  <span className="hix-bar-label">{row.label}</span>
                  <div className="hix-bar-track">
                    <div
                      className="hix-bar-fill"
                      style={{ "--bar-pct": `${row.value}%`, "--bar-color": row.color, background: row.color }}
                    />
                  </div>
                  <BarValue target={row.value} live={chartsLive} index={i} />
                </li>
              ))}
            </ul>
          </div>

          <div className="hix-chart-panel" style={{ "--panel-i": 1 }}>
            <div className="hix-chart-head">
              <h3 className="hix-chart-title">Share of message types on HIX</h3>
              <p className="hix-chart-caption">Mix of clinical, admin, financial, public health</p>
            </div>
            <div className="hix-donut-wrap">
              <svg className="hix-donut" viewBox="0 0 120 120" role="img" aria-label="Flow type mix chart">
                <circle className="hix-donut-orbit" cx="60" cy="60" r="54" />
                {(() => {
                  let offset = 0;
                  return HIX_FLOWS.map((flow, i) => {
                    const dash = (flow.share / flowTotal) * 100;
                    const circle = (
                      <circle
                        key={flow.id}
                        className="hix-donut-segment"
                        style={{ "--seg-i": i, "--seg-dash": dash }}
                        cx="60"
                        cy="60"
                        r="46"
                        fill="none"
                        stroke={flow.color}
                        strokeWidth="16"
                        pathLength="100"
                        strokeDasharray={`${dash} ${100 - dash}`}
                        strokeDashoffset={-offset}
                        transform="rotate(-90 60 60)"
                      />
                    );
                    offset += dash;
                    return circle;
                  });
                })()}
                <circle className="hix-donut-center" cx="60" cy="60" r="28" />
                <text className="hix-donut-center-label" x="60" y="58" textAnchor="middle">
                  HIX
                </text>
                <text className="hix-donut-center-sub" x="60" y="72" textAnchor="middle">
                  mix
                </text>
              </svg>
              <ul className="hix-donut-legend">
                {HIX_FLOWS.map((flow, i) => (
                  <li key={flow.id} style={{ "--legend-i": i }}>
                    <span className="hix-legend-dot" style={{ "--dot-color": flow.color }} aria-hidden="true" />
                    <span className="hix-legend-text">
                      {flow.label} — <LegendShare share={flow.share} live={chartsLive} index={i} />
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="hix-chart-panel" style={{ "--panel-i": 2 }}>
            <div className="hix-chart-head">
              <h3 className="hix-chart-title">Connected exchange growth</h3>
              <p className="hix-chart-caption">Illustrative national HIX volume index by quarter</p>
            </div>
            <svg className="hix-line-chart" viewBox={`0 0 ${TREND_W} ${TREND_H}`} role="img" aria-label="Trend line chart">
              <defs>
                <linearGradient id="hixAreaGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#0b2a66" stopOpacity="0.38" />
                  <stop offset="100%" stopColor="#0b2a66" stopOpacity="0.04" />
                </linearGradient>
              </defs>
              {trendCoords().map(({ x }, i) => (
                <line
                  key={`grid-${HIX_TREND[i].q}`}
                  className="hix-trend-grid"
                  style={{ "--grid-i": i }}
                  x1={x}
                  y1={TREND_PAD}
                  x2={x}
                  y2={TREND_H - TREND_PAD}
                />
              ))}
              <polygon className="hix-trend-area" points={trendAreaPoints()} />
              <line x1={TREND_PAD} y1={TREND_H - TREND_PAD} x2={TREND_W - TREND_PAD} y2={TREND_H - TREND_PAD} className="hix-axis" />
              <polyline pathLength="100" points={trendPoints()} className="hix-trend-line" />
              {chartsLive && (
                <circle className="hix-trend-runner" r="5">
                  <animateMotion dur="4.5s" repeatCount="indefinite" path={trendPathD()} />
                </circle>
              )}
              {HIX_TREND.map((point, i) => {
                const { x, y } = trendCoords()[i];
                return (
                  <g key={point.q} style={{ "--dot-i": i }}>
                    <circle cx={x} cy={y} r="4" className="hix-trend-dot" />
                    <text x={x} y={TREND_H - 6} textAnchor="middle" className="hix-trend-label">
                      {point.q}
                    </text>
                  </g>
                );
              })}
            </svg>
          </div>
        </div>

        <div className="hix-layers">
          <h3 className="hix-layers-title">Four layers of the Malaysia HIX stack</h3>
          <ul className="hix-layers-stack">
            {HIX_LAYERS.map((layer) => (
              <li key={layer.id} style={{ borderLeftColor: layer.color }}>
                <strong>{layer.label}</strong>
                <span>{layer.items}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="hix-journey">
          <h3 className="hix-journey-title">Typical patient journey on the exchange</h3>
          <ol className="hix-journey-steps">
            {HIX_JOURNEY.map((item) => (
              <li key={item.step}>
                <span className="hix-journey-num">{item.step}</span>
                <div>
                  <strong>{item.title}</strong>
                  <span>{item.detail}</span>
                </div>
              </li>
            ))}
          </ol>
        </div>

        <div className="hix-flows">
          <h3 className="hix-flows-title">Data exchanged on the HIX</h3>
          <ul className="hix-flows-grid">
            {HIX_FLOWS.map((flow) => (
              <li key={flow.id}>
                <strong>{flow.label}</strong>
                <span>{flow.detail}</span>
              </li>
            ))}
          </ul>
        </div>

        <p className="hix-disclaimer">{HIX_ECOSYSTEM.disclaimer}</p>
      </div>
    </section>
  );
}
