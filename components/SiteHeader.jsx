// SiteHeader.jsx — sticky header with multi-page nav
// Active link is determined by the `data-page` attribute on #app, set in each HTML.
const { useEffect: useEffectHeader, useState: useStateHeader } = React;

const NAV_ITEMS = [
  { key: "about",        href: "about.html" },
  { key: "history",      href: "history.html" },
  { key: "sectors",      href: "sectors.html" },
  { key: "work",         href: "work.html" },
  { key: "facilities",   href: "facilities.html" },
  { key: "press",        href: "press.html" },
  { key: "contact",      href: "contact.html" },
];

function SiteHeader({ lang, setLang, scrolled }) {
  const t = window.MP_I18N[lang];
  const [page, setPage] = useStateHeader("");

  useEffectHeader(() => {
    const el = document.getElementById("app");
    setPage(el ? el.getAttribute("data-page") || "" : "");
  }, []);

  return (
    <header className={`site-header on-light ${scrolled ? "is-stuck" : ""}`}>
      <div className="inner">
        <a href="index.html" className="brand-wordmark" aria-label="MEGA PRESS 홈">
          <img src="assets/logo/megapress.svg" alt="MEGA PRESS" />
        </a>
        <nav className="nav">
          {NAV_ITEMS.map(item => (
            <a
              key={item.key}
              className={`nav-link ${page === item.key ? "is-active" : ""}`}
              href={item.href}
            >
              {t.nav[item.key]}
            </a>
          ))}
          <button
            className="lang-toggle"
            onClick={() => setLang(lang === "ko" ? "en" : "ko")}
            aria-label="Toggle language"
          >
            <span className={lang === "ko" ? "on" : ""}>KO</span>
            <span style={{opacity:0.5}}>/</span>
            <span className={lang === "en" ? "on" : ""}>EN</span>
          </button>
        </nav>
      </div>
    </header>
  );
}

window.SiteHeader = SiteHeader;
