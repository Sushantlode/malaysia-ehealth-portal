import { useCallback, useEffect, useRef, useState } from "react";
import Header from "./components/Header";
import HexMap from "./components/HexMap";
import PeoplePanel from "./components/PeoplePanel";
import SetuSections from "./components/SetuSections";
import { LANGUAGES } from "./data";

export default function App() {
  const [toast, setToast] = useState("");
  const [toastVisible, setToastVisible] = useState(false);
  const [showTop, setShowTop] = useState(false);
  const [stateValue, setStateValue] = useState("");
  const [districtValue, setDistrictValue] = useState("");
  const [languageValue, setLanguageValue] = useState("");
  const toastTimer = useRef(0);

  const showMessage = useCallback((message) => {
    setToast(message);
    setToastVisible(true);
    window.clearTimeout(toastTimer.current);
    toastTimer.current = window.setTimeout(() => setToastVisible(false), 3600);
  }, []);

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 400);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.clearTimeout(toastTimer.current);
    };
  }, []);

  function selectHex(hex) {
    if (hex.central) {
      showMessage("Welcome to the Malaysia eHealth System Portal.");
      document.getElementById("about-setu")?.scrollIntoView({ behavior: "smooth" });
      return;
    }
    showMessage(hex.name);
    document.getElementById("what-we-offer")?.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <>
      <div className="stage">
        <div className="portal">
          <div className="nav-shade" aria-hidden="true" />
          <Header
            stateValue={stateValue}
            districtValue={districtValue}
            languageValue={languageValue}
            onStateChange={(event) => {
              const state = event.target.value;
              setStateValue(state);
              setDistrictValue("");
              showMessage(
                state
                  ? `Selected state: ${state}. District filtering requires integration.`
                  : "Please select a state."
              );
            }}
            onDistrictChange={(event) => {
              const district = event.target.value;
              setDistrictValue(district);
              if (district) {
                showMessage(`Selected district: ${district}. This selection is not sent to a server.`);
              }
            }}
            onLanguageChange={(event) => {
              const value = event.target.value;
              setLanguageValue(value);
              if (value) {
                const language = LANGUAGES.find((item) => item.value === value);
                showMessage(
                  `Selected language: ${language?.name || value}. Translation files are not yet connected.`
                );
              }
            }}
            onSearch={(event) => {
              if (event.key !== "Enter") return;
              event.preventDefault();
              showMessage(
                "Card / MyKad verification is not connected. Do not enter real identity information on this demo."
              );
            }}
            onLogin={() => {
              showMessage(
                "Login and registration are demonstration-only. Connect an approved authentication service before use."
              );
            }}
          />

          <div className="body">
            <main className="main-panel">
              <HexMap onSelect={selectHex} />
            </main>
            <PeoplePanel />
          </div>
        </div>
      </div>

      <SetuSections />

      <button
        className={showTop ? "to-top show" : "to-top"}
        type="button"
        aria-label="Back to top"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      >
        &#8593;
      </button>
      <div className={toastVisible ? "toast visible" : "toast"} role="status" aria-live="polite">
        {toast}
      </div>
    </>
  );
}
