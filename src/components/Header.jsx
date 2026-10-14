import { useEffect, useId, useMemo, useRef, useState } from "react";
import { DISTRICTS_BY_STATE, LANGUAGES, STATES } from "../data";

const FLAG_SRC = "https://upload.wikimedia.org/wikipedia/commons/6/66/Flag_of_Malaysia.svg";

function NavMenu({ label, value, options, onChange, disabled = false }) {
  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);
  const listId = useId();
  const current = options.find((option) => option.value === value);

  useEffect(() => {
    if (!open) return undefined;
    function closeOnOutside(event) {
      if (!menuRef.current?.contains(event.target)) setOpen(false);
    }
    function closeOnEscape(event) {
      if (event.key === "Escape") setOpen(false);
    }
    document.addEventListener("pointerdown", closeOnOutside);
    document.addEventListener("keydown", closeOnEscape);
    return () => {
      document.removeEventListener("pointerdown", closeOnOutside);
      document.removeEventListener("keydown", closeOnEscape);
    };
  }, [open]);

  useEffect(() => {
    if (disabled) setOpen(false);
  }, [disabled]);

  return (
    <div
      className={open ? "nav-menu is-open" : value ? "nav-menu has-value" : "nav-menu"}
      ref={menuRef}
    >
      <button
        type="button"
        className="nav-trigger"
        aria-expanded={open}
        aria-controls={listId}
        disabled={disabled}
        onClick={() => setOpen((currentOpen) => !currentOpen)}
      >
        <span>{current?.label || label}</span>
        <i className="tri" />
      </button>
      {open && !disabled && (
        <ul className="nav-list" id={listId} role="listbox">
          {options.map((option) => (
            <li key={option.value || "empty"}>
              <button
                type="button"
                role="option"
                aria-selected={option.value === value}
                className={option.value === value ? "is-selected" : undefined}
                onClick={() => {
                  onChange(option.value);
                  setOpen(false);
                }}
              >
                {option.label}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default function Header({
  stateValue,
  districtValue,
  languageValue,
  onStateChange,
  onDistrictChange,
  onLanguageChange,
  onSearch,
  onLogin,
}) {
  const districtOptions = useMemo(() => {
    if (!stateValue) {
      return [{ value: "", label: "Select state first" }];
    }
    const districts = DISTRICTS_BY_STATE[stateValue] || [];
    return [
      { value: "", label: "Select District" },
      ...districts.map((district) => ({ value: district, label: district })),
    ];
  }, [stateValue]);

  function choose(handler, value) {
    handler({ target: { value } });
  }

  function submitSearch(event) {
    event.preventDefault();
    onSearch({ key: "Enter", preventDefault() {} });
  }

  return (
    <header className="topbar">
      <div className="brand">
        <div className="brand-mark">
          <img src={FLAG_SRC} alt="Flag of Malaysia" />
        </div>
        <div className="brand-text">
          <div className="brand-title">MALAYSIA</div>
          <div className="brand-subtitle">eHealth System Portal</div>
        </div>
      </div>

      <nav className="nav-controls" aria-label="Location and language">
        <NavMenu
          label="Select State"
          value={stateValue}
          options={[{ value: "", label: "Select State" }, ...STATES.map((state) => ({ value: state, label: state }))]}
          onChange={(value) => choose(onStateChange, value)}
        />
        <NavMenu
          label="Select District"
          value={districtValue}
          options={districtOptions}
          disabled={!stateValue}
          onChange={(value) => choose(onDistrictChange, value)}
        />
        <NavMenu
          label="Select Language"
          value={languageValue}
          options={[
            { value: "", label: "Select Language" },
            ...LANGUAGES.map((language) => ({ value: language.value, label: language.label })),
          ]}
          onChange={(value) => choose(onLanguageChange, value)}
        />
      </nav>

      <form className="id-search" onSubmit={submitSearch}>
        <input
          id="mykadInput"
          type="text"
          placeholder="eHS Card No. / MyKad No."
          autoComplete="off"
          aria-label="eHS Card number or MyKad number"
          onKeyDown={onSearch}
        />
        <button type="submit" className="id-icon-btn" aria-label="Search card number">
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <circle cx="10" cy="10" r="6.2" fill="none" stroke="currentColor" strokeWidth="2.4" />
            <path d="M14.6 14.6 20.5 20.5" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" />
          </svg>
        </button>
      </form>
      <button className="login" id="loginButton" type="button" onClick={onLogin}>
        Login / Register
      </button>
    </header>
  );
}
