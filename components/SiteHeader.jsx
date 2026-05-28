// SiteHeader.jsx — sticky header with multi-page nav
// 데스크탑(>768px): nav가 가로로 펼쳐지고, 모바일(≤768px): 햄버거 버튼 → 드로어.
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
  const [menuOpen, setMenuOpen] = useStateHeader(false);

  useEffectHeader(() => {
    const el = document.getElementById("app");
    setPage(el ? el.getAttribute("data-page") || "" : "");
  }, []);

  // 드로어 열렸을 때 본문 스크롤 잠금
  useEffectHeader(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  // ESC로 닫기 + 데스크탑 폭으로 커지면 자동 닫기
  useEffectHeader(() => {
    const onKey = e => { if (e.key === "Escape") setMenuOpen(false); };
    const onResize = () => { if (window.innerWidth > 768) setMenuOpen(false); };
    document.addEventListener("keydown", onKey);
    window.addEventListener("resize", onResize);
    return () => {
      document.removeEventListener("keydown", onKey);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  const langToggle = (extraCls = "") => (
    <button
      className={`lang-toggle ${extraCls}`}
      onClick={() => setLang(lang === "ko" ? "en" : "ko")}
      aria-label="Toggle language"
    >
      <span className={lang === "ko" ? "on" : ""}>KO</span>
      <span style={{opacity:0.5}}>/</span>
      <span className={lang === "en" ? "on" : ""}>EN</span>
    </button>
  );

  // 드로어는 <header> 외부로 분리. 헤더에 적용된 backdrop-filter가 fixed 자식의
  // containing block을 헤더로 묶어버려서, 안에 두면 드로어가 헤더 안에 갇힌다.
  return (
    <>
      <header className={`site-header on-light ${scrolled ? "is-stuck" : ""} ${menuOpen ? "menu-open" : ""}`}>
        <div className="inner">
          <a href="index.html" className="brand-wordmark" aria-label="MEGA PRESS 홈">
            <img src="assets/logo/megapress.svg" alt="MEGA PRESS" />
          </a>
          <nav className="nav nav--desktop">
            {NAV_ITEMS.map(item => (
              <a
                key={item.key}
                className={`nav-link ${page === item.key ? "is-active" : ""}`}
                href={item.href}
              >
                {t.nav[item.key]}
              </a>
            ))}
            {langToggle()}
          </nav>
          <button
            className={`menu-toggle ${menuOpen ? "is-open" : ""}`}
            onClick={() => setMenuOpen(o => !o)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            aria-controls="mobile-nav"
          >
            {/* Lucide-style menu icon — 모든 라인이 동일한 stroke-width, round cap */}
            <svg
              width="26" height="26" viewBox="0 0 24 24"
              fill="none" stroke="currentColor"
              strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"
              aria-hidden="true"
            >
              <line x1="4" y1="7"  x2="20" y2="7"  />
              <line x1="4" y1="12" x2="20" y2="12" />
              <line x1="4" y1="17" x2="20" y2="17" />
            </svg>
          </button>
        </div>
      </header>
      <div
        className={`mobile-drawer ${menuOpen ? "is-open" : ""}`}
        id="mobile-nav"
        aria-hidden={!menuOpen}
      >
        <nav className="mobile-nav">
          {NAV_ITEMS.map(item => (
            <a
              key={item.key}
              className={`mobile-nav-link ${page === item.key ? "is-active" : ""}`}
              href={item.href}
            >
              {t.nav[item.key]}
            </a>
          ))}
          {langToggle("mobile-lang-toggle")}
        </nav>
      </div>
    </>
  );
}

window.SiteHeader = SiteHeader;
