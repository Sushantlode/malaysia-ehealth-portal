import { useCallback, useEffect, useRef, useState } from "react";
import AboutPage from "./components/AboutPage";
import Header from "./components/Header";
import HexDetailPanel from "./components/HexDetailPanel";
import HixStakeholderAnalytics from "./components/HixStakeholderAnalytics";
import HexMap from "./components/HexMap";
import PeoplePanel from "./components/PeoplePanel";
import SiteFooter from "./components/SiteFooter";
import { LANGUAGES } from "./data";
import { SETU_OPEN_TOAST, isSetuLinkedHex, launchSetuForHex, launchSetuLogin } from "./externalLinks";
import { launchHmis } from "./hmisLaunch";

export default function App() {
  const [view, setView] = useState("home");
  const [toast, setToast] = useState("");
  const [toastVisible, setToastVisible] = useState(false);
  const [showTop, setShowTop] = useState(false);
  const [navScrolled, setNavScrolled] = useState(false);
  const [stateValue, setStateValue] = useState("");
  const [districtValue, setDistrictValue] = useState("");
  const [languageValue, setLanguageValue] = useState("");
  const [scrollTargetHexId, setScrollTargetHexId] = useState(null);
  const toastTimer = useRef(0);
  const detailScrollTimer = useRef(0);

  const showMessage = useCallback((message) => {
    setToast(message);
    setToastVisible(true);
    window.clearTimeout(toastTimer.current);
    toastTimer.current = window.setTimeout(() => setToastVisible(false), 3600);
  }, []);

  useEffect(() => {
    const onScroll = () => {
      setShowTop(window.scrollY > 400);
      setNavScrolled(window.scrollY > 16);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.clearTimeout(toastTimer.current);
      window.clearTimeout(detailScrollTimer.current);
    };
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [view]);

  function goHome() {
    setView("home");
  }

  function goAbout() {
    setView("about");
  }

  function selectHex(hex) {
    if (hex.id === "hmis") {
      launchHmis();
      showMessage("Opening Tata MD HMIS (auto sign-in)…");
      return;
    }
    if (isSetuLinkedHex(hex.id)) {
      launchSetuForHex(hex.id);
      showMessage(SETU_OPEN_TOAST);
      return;
    }
    const onHome = view === "home";
    if (!onHome) {
      setView("home");
    }
    setScrollTargetHexId(hex.id);
    showMessage(hex.central ? "MALAYSIA HIE PORTAL — national HIX overview" : hex.name);
    window.clearTimeout(detailScrollTimer.current);
    detailScrollTimer.current = window.setTimeout(() => {
      document.getElementById(`hex-detail-${hex.id}`)?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, onHome ? 80 : 360);
  }

  return (
    <div className={navScrolled ? "app-shell nav-scrolled" : "app-shell"}>
      <Header
        scrolled={navScrolled}
        activeView={view}
        onHome={goHome}
        onAbout={goAbout}
        stateValue={stateValue}
        districtValue={districtValue}
        languageValue={languageValue}
        onStateChange={(event) => {
          const state = event.target.value;
          setStateValue(state);
          setDistrictValue("");
          showMessage(
            state ? `Selected state: ${state}. District filtering requires integration.` : "Please select a state."
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
            showMessage(`Selected language: ${language?.name || value}. Translation files are not yet connected.`);
          }
        }}
        onSearch={(event) => {
          if (event.key !== "Enter") return;
          event.preventDefault();
          showMessage(
            "MyKad verification is not connected. Do not enter real identity information on this demo."
          );
        }}
        onLogin={() => {
          launchSetuLogin();
          showMessage("Opening SETU login — mobile 9999999999, OTP 000000 (copied).");
        }}
      />

      {view === "home" ? (
        <>
          <div className="stage">
            <div className="portal">
              <div className="body">
                <main className="main-panel">
                  <HexMap onSelect={selectHex} />
                </main>
                <PeoplePanel />
              </div>
            </div>
          </div>
          <HixStakeholderAnalytics />
          <HexDetailPanel
            scrollTargetId={scrollTargetHexId}
            onJumpToMap={() => {
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            onLaunchHmis={() => {
              launchHmis();
              showMessage("Opening Tata MD HMIS (auto sign-in)…");
            }}
            onLaunchSetu={(hexId) => {
              launchSetuForHex(hexId);
              showMessage(SETU_OPEN_TOAST);
            }}
          />
        </>
      ) : (
        <AboutPage />
      )}

      <SiteFooter onHome={goHome} onAbout={goAbout} />

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
    </div>
  );
}
