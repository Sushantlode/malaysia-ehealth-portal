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

function trendPoints() {
  const innerW = TREND_W - TREND_PAD * 2;
  const innerH = TREND_H - TREND_PAD * 2;
  return HIX_TREND.map((point, i) => {
    const x = TREND_PAD + (i / (HIX_TREND.length - 1)) * innerW;
    const y = TREND_PAD + innerH - (point.value / TREND_MAX) * innerH;
    return `${x},${y}`;
  }).join(" ");
}

export default function HixStakeholderAnalytics() {
  const flowTotal = HIX_FLOWS.reduce((sum, f) => sum + f.share, 0);

  return (
    <section className="hix-ecosystem setu-block" id="hix-stakeholder-analytics" aria-labelledby="hix-ecosystem-heading">
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
          {HIX_METRICS.map((m) => (
            <li key={m.id}>
              <span className="hix-metrics-value">{m.value}</span>
              <span className="hix-metrics-label">{m.label}</span>
            </li>
          ))}
        </ul>

        <div className="hix-diagram-wrap">
          <svg
            className="hix-diagram-svg"
            viewBox="0 0 400 400"
            role="img"
            aria-labelledby="hix-diagram-title hix-diagram-desc"
          >
            <title id="hix-diagram-title">Malaysia HIX stakeholder hub</title>
            <desc id="hix-diagram-desc">
              National HIX at the centre with eight stakeholder groups connected by exchange lines.
            </desc>
            <circle className="hix-ring" cx={CX} cy={CY} r={118} />
            <circle className="hix-ring hix-ring-inner" cx={CX} cy={CY} r={88} />
            {HIX_NODES.map((node) => (
              <line
                key={`line-${node.id}`}
                className="hix-spoke"
                x1={CX}
                y1={CY}
                x2={node.x}
                y2={node.y}
              />
            ))}
            <circle className="hix-hub-outer" cx={CX} cy={CY} r={52} />
            <circle className="hix-hub-inner" cx={CX} cy={CY} r={40} />
            <text className="hix-hub-text" x={CX} y={CY - 6} textAnchor="middle">
              {HIX_HUB.label}
            </text>
            <text className="hix-hub-sub" x={CX} y={CY + 12} textAnchor="middle">
              {HIX_HUB.sub}
            </text>
            {HIX_NODES.map((node) => (
              <g key={node.id} className="hix-node">
                <circle cx={node.x} cy={node.y} r={18} fill={node.color} />
                <text className="hix-node-label" x={node.x} y={node.y + 32} textAnchor="middle">
                  {node.label}
                </text>
              </g>
            ))}
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

        <div className="hix-charts-row">
          <div className="hix-chart-panel">
            <h3 className="hix-chart-title">HIX activity by stakeholder</h3>
            <p className="hix-chart-caption">Relative exchange index (illustrative)</p>
            <ul className="hix-bar-chart">
              {HIX_ACTIVITY_BARS.map((row) => (
                <li key={row.id}>
                  <span className="hix-bar-label">{row.label}</span>
                  <div className="hix-bar-track">
                    <div
                      className="hix-bar-fill"
                      style={{ width: `${row.value}%`, background: row.color }}
                    />
                  </div>
                  <span className="hix-bar-value">{row.value}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="hix-chart-panel">
            <h3 className="hix-chart-title">Share of message types on HIX</h3>
            <p className="hix-chart-caption">Mix of clinical, admin, financial, public health</p>
            <div className="hix-donut-wrap">
              <svg className="hix-donut" viewBox="0 0 120 120" role="img" aria-label="Flow type mix chart">
                {(() => {
                  let offset = 0;
                  return HIX_FLOWS.map((flow) => {
                    const dash = (flow.share / flowTotal) * 100;
                    const circle = (
                      <circle
                        key={flow.id}
                        className="hix-donut-segment"
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
              <ul className="hix-donut-legend">
                {HIX_FLOWS.map((flow) => (
                  <li key={flow.id}>
                    <span className="hix-node-dot" style={{ background: flow.color }} aria-hidden="true" />
                    <span>
                      {flow.label} — {flow.share}%
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="hix-chart-panel">
            <h3 className="hix-chart-title">Connected exchange growth</h3>
            <p className="hix-chart-caption">Illustrative national HIX volume index by quarter</p>
            <svg className="hix-line-chart" viewBox={`0 0 ${TREND_W} ${TREND_H}`} role="img" aria-label="Trend line chart">
              <line x1={TREND_PAD} y1={TREND_H - TREND_PAD} x2={TREND_W - TREND_PAD} y2={TREND_H - TREND_PAD} className="hix-axis" />
              <polyline points={trendPoints()} className="hix-trend-line" />
              {HIX_TREND.map((point, i) => {
                const innerW = TREND_W - TREND_PAD * 2;
                const innerH = TREND_H - TREND_PAD * 2;
                const x = TREND_PAD + (i / (HIX_TREND.length - 1)) * innerW;
                const y = TREND_PAD + innerH - (point.value / TREND_MAX) * innerH;
                return (
                  <g key={point.q}>
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
