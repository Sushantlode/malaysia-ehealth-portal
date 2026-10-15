export default function SiteFooter({ onHome, onAbout, onProgrammes }) {
  const year = new Date().getFullYear();

  function navButton(label, action) {
    return (
      <button type="button" className="site-footer-link-btn" onClick={action}>
        {label}
      </button>
    );
  }

  return (
    <footer className="site-footer">
      <div className="site-footer-inner">
        <div className="site-footer-grid">
          <div className="site-footer-col site-footer-brand-block">
            <span className="logo">
              <b>M</b>
              <small>eHealth</small>
            </span>
            <p className="site-footer-lead">Malaysia eHealth System Portal</p>
            <p className="site-footer-copy">
              Demo entry point for HIX programmes — citizens, providers, and SETU eHealth (not an official MOH site).
            </p>
          </div>

          <div className="site-footer-col">
            <h3 className="site-footer-heading">Portal</h3>
            <ul className="site-footer-list">
              <li>{navButton("Home", onHome)}</li>
              <li>{navButton("About SETU", onAbout)}</li>
              <li>{navButton("Programmes", onProgrammes)}</li>
            </ul>
          </div>

          <div className="site-footer-col">
            <h3 className="site-footer-heading">Links</h3>
            <ul className="site-footer-list">
              <li>
                <a href="https://www.moh.gov.my/" target="_blank" rel="noopener noreferrer">
                  MOH Malaysia
                </a>
              </li>
              <li>
                <a href="https://setuai.com" target="_blank" rel="noopener noreferrer">
                  SETU eHealth
                </a>
              </li>
            </ul>
          </div>

          <div className="site-footer-col">
            <h3 className="site-footer-heading">Contact (demo)</h3>
            <ul className="site-footer-list site-footer-contact-compact">
              <li>
                <a href="tel:+60380008000">+60 3-8000 8000</a>
                <span className="site-footer-muted"> · </span>
                <a href="tel:+60130088000">BPO 24×7</a>
              </li>
              <li>
                <a href="mailto:support@setuai.com">support@setuai.com</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="site-footer-meta">
          <p className="site-footer-legal">
            <strong className="site-footer-disclaimer-label">Demo only.</strong> Do not submit real MyKad or clinical
            data. © {year} Malaysia eHealth Portal.
            <span className="site-footer-sep"> · </span>
            <button type="button" className="site-footer-link-btn inline">
              Privacy
            </button>
            <span className="site-footer-sep"> · </span>
            <button type="button" className="site-footer-link-btn inline">
              Terms
            </button>
          </p>
        </div>
      </div>
    </footer>
  );
}
