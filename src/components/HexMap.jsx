import { Fragment } from "react";
import { HEXES } from "../data";

export default function HexMap({ onSelect }) {
  return (
    <div className="hex-map-stage">
      <div className="hex-map-glass" aria-hidden="true" />
      <div className="hex-map" aria-label="Malaysia eHealth portal services">
      {HEXES.map((hex) => (
        <button
          key={hex.id}
          className={hex.central ? "hex central" : "hex"}
          style={{ "--c": hex.c, "--r": hex.r, "--hex-i": hex.c + hex.r }}
          type="button"
          onClick={() => onSelect(hex)}
        >
          <span className={hex.size ? `in ${hex.size}` : "in"}>
            {hex.lines.map((line, index) => (
              <Fragment key={`${hex.id}-${index}`}>
                {index > 0 && <br />}
                {line}
              </Fragment>
            ))}
          </span>
        </button>
      ))}
      </div>
    </div>
  );
}
