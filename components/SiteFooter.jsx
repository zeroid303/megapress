// SiteFooter.jsx — 회사 신원·법적 링크·카피라이트 컴팩트 푸터.
// 회사명 / 사업자번호 / 대표 등 한국 법령상 명시 의무 정보를 한 곳에.
function SiteFooter({ lang }) {
  const t = window.MP_I18N[lang].footer;
  return (
    <footer className="site-footer">
      <div className="container">
        {t.identity && t.identity.length > 0 && (
          <ul className="footer-line footer-identity">
            {t.identity.map((s, i) => <li key={i}>{s}</li>)}
          </ul>
        )}
        <div className="footer-bottom-row">
          <div className="rights">{t.rights}</div>
          {t.legal && t.legal.length > 0 && (
            <div className="legal">
              {t.legal.map((it, i) => (
                <a key={i} href={it.href}>{it.label}</a>
              ))}
            </div>
          )}
        </div>
      </div>
    </footer>
  );
}

window.SiteFooter = SiteFooter;
