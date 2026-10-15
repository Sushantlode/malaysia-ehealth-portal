import {
  HIE_ACTIVITY_BARS,
  HIE_ECOSYSTEM,
  HIE_FLOWS,
  HIE_HUB,
  HIE_JOURNEY,
  HIE_LAYERS,
  HIE_METRICS,
  HIE_NODES,
  HIE_OVERVIEW,
  HIE_TREND,
} from "../hixAnalyticsData";

const CX = 200;
const CY = 200;
const TREND_MAX = 100;
const TREND_W = 320;
const TREND_H = 100;
const TREND_PAD = 24;

function trendPoints() {
  const innerW = TREND_W - TREND_PAD * 2;
  const innerH = TREND_H - TREND_PAD * 2;
  return HIE_TREND.map((point, i) => {
    const x = TREND_PAD + (i / (HIE_TREND.length - 1)) * innerW;
    const y = TREND_PAD + innerH - (point.value / TREND_MAX) * innerH;
    return `${x},${y}`;
  }).join(" ");
}

export default function HixStakeholderAnalytics() {
  const flowTotal = HIE_FLOWS.reduce((sum, f) => sum + f.share, 0);

  return (
    <section className="hie-ecosystem setu-block" id="hix-stakeholder-analytics" aria-labelledby="hie-ecosystem-heading">
      <div className="setu-wrap">
        <p className="eyebrow">{HIE_ECOSYSTEM.eyebrow}</p>
        <h2 id="hie-ecosystem-heading">{HIE_ECOSYSTEM.title}</h2>
        <p className="dek hie-ecosystem-dek">{HIE_ECOSYSTEM.subtitle}</p>

        <ul className="hie-overview-grid">
          {HIE_OVERVIEW.map((block) => (
            <li key={block.id}>
              <h3>{block.title}</h3>
              <p>{block.text}</p>
            </li>
          ))}
        </ul>

        <ul className="hie-metrics" aria-label="Ecosystem overview">
          {HIE_METRICS.map((m) => (
            <li key={m.id}>
              <span className="hie-metrics-value">{m.value}</span>
              <span className="hie-metrics-label">{m.label}</span>
            </li>
          ))}
        </ul>

        <div className="hie-diagram-wrap">
          <svg
            className="hie-diagram-svg"
            viewBox="0 0 400 400"
            role="img"
            aria-labelledby="hie-diagram-title hie-diagram-desc"
          >
            <title id="hie-diagram-title">Malaysia HIE stakeholder hub</title>
            <desc id="hie-diagram-desc">
              National HIX at the centre with eight stakeholder groups connected by exchange lines.
            </desc>
            <circle className="hie-ring" cx={CX} cy={CY} r={118} />
            <circle className="hie-ring hie-ring-inner" cx={CX} cy={CY} r={88} />
            {HIE_NODES.map((node) => (
              <line
                key={`line-${node.id}`}
                className="hie-spoke"
                x1={CX}
                y1={CY}
                x2={node.x}
                y2={node.y}
              />
            ))}
            <circle className="hie-hub-outer" cx={CX} cy={CY} r={52} />
            <circle className="hie-hub-inner" cx={CX} cy={CY} r={40} />
            <text className="hie-hub-text" x={CX} y={CY - 6} textAnchor="middle">
              {HIE_HUB.label}
            </text>
            <text className="hie-hub-sub" x={CX} y={CY + 12} textAnchor="middle">
              {HIE_HUB.sub}
            </text>
            {HIE_NODES.map((node) => (
              <g key={node.id} className="hie-node">
                <circle cx={node.x} cy={node.y} r={14} fill={node.color} />
                <text className="hie-node-label" x={node.x} y={node.y + 28} textAnchor="middle">
                  {node.label}
                </text>
              </g>
            ))}
          </svg>

          <ul className="hie-node-cards">
            {HIE_NODES.map((node) => (
              <li key={node.id}>
                <span className="hie-node-dot" style={{ background: node.color }} aria-hidden="true" />
                <div>
                  <strong>{node.label}</strong>
                  <span className="hie-node-role">{node.role}</span>
                  <span className="hie-node-detail">{node.detail}</span>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className="hie-charts-row">
          <div className="hie-chart-panel">
            <h3 className="hie-chart-title">HIE activity by stakeholder</h3>
            <p className="hie-chart-caption">Relative exchange index (illustrative)</p>
            <ul className="hie-bar-chart">
              {HIE_ACTIVITY_BARS.map((row) => (
                <li key={row.id}>
                  <span className="hie-bar-label">{row.label}</span>
                  <div className="hie-bar-track">
                    <div
                      className="hie-bar-fill"
                      style={{ width: `${row.value}%`, background: row.color }}
                    />
                  </div>
                  <span className="hie-bar-value">{row.value}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="hie-chart-panel">
            <h3 className="hie-chart-title">Share of message types on HIX</h3>
            <p className="hie-chart-caption">Mix of clinical, admin, financial, public health</p>
            <div className="hie-donut-wrap">
              <svg className="hie-donut" viewBox="0 0 120 120" role="img" aria-label="Flow type mix chart">
                {(() => {
                  let offset = 0;
                  return HIE_FLOWS.map((flow) => {
                    const dash = (flow.share / flowTotal) * 100;
                    const circle = (
                      <circle
                        key={flow.id}
                        className="hie-donut-segment"
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
              </svg>
              <ul className="hie-donut-legend">
                {HIE_FLOWS.map((flow) => (
                  <li key={flow.id}>
                    <span className="hie-node-dot" style={{ background: flow.color }} aria-hidden="true" />
                    <span>
                      {flow.label} — {flow.share}%
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="hie-chart-panel">
            <h3 className="hie-chart-title">Connected exchange growth</h3>
            <p className="hie-chart-caption">Illustrative national HIX volume index by quarter</p>
            <svg className="hie-line-chart" viewBox={`0 0 ${TREND_W} ${TREND_H}`} role="img" aria-label="Trend line chart">
              <line x1={TREND_PAD} y1={TREND_H - TREND_PAD} x2={TREND_W - TREND_PAD} y2={TREND_H - TREND_PAD} className="hie-axis" />
              <polyline points={trendPoints()} className="hie-trend-line" />
              {HIE_TREND.map((point, i) => {
                const innerW = TREND_W - TREND_PAD * 2;
                const innerH = TREND_H - TREND_PAD * 2;
                const x = TREND_PAD + (i / (HIE_TREND.length - 1)) * innerW;
                const y = TREND_PAD + innerH - (point.value / TREND_MAX) * innerH;
                return (
                  <g key={point.q}>
                    <circle cx={x} cy={y} r="4" className="hie-trend-dot" />
                    <text x={x} y={TREND_H - 6} textAnchor="middle" className="hie-trend-label">
                      {point.q}
                    </text>
                  </g>
                );
              })}
            </svg>
          </div>
        </div>

        <div className="hie-layers">
          <h3 className="hie-layers-title">Four layers of the Malaysia HIE stack</h3>
          <ul className="hie-layers-stack">
            {HIE_LAYERS.map((layer) => (
              <li key={layer.id} style={{ borderLeftColor: layer.color }}>
                <strong>{layer.label}</strong>
                <span>{layer.items}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="hie-journey">
          <h3 className="hie-journey-title">Typical patient journey on the exchange</h3>
          <ol className="hie-journey-steps">
            {HIE_JOURNEY.map((item) => (
              <li key={item.step}>
                <span className="hie-journey-num">{item.step}</span>
                <div>
                  <strong>{item.title}</strong>
                  <span>{item.detail}</span>
                </div>
              </li>
            ))}
          </ol>
        </div>

        <div className="hie-flows">
          <h3 className="hie-flows-title">Data exchanged on the HIE</h3>
          <ul className="hie-flows-grid">
            {HIE_FLOWS.map((flow) => (
              <li key={flow.id}>
                <strong>{flow.label}</strong>
                <span>{flow.detail}</span>
              </li>
            ))}
          </ul>
        </div>

        <p className="hie-disclaimer">{HIE_ECOSYSTEM.disclaimer}</p>
      </div>
    </section>
  );
}
