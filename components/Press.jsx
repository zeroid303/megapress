// Press.jsx — 언론 보도 모음. 카드(메타) + 매거진 스프레드 이미지를 세로로 적재.
function Press({ lang }) {
  const t = window.MP_I18N[lang].press;
  const krCls = lang === "ko" ? "kr-display" : "";
  const hasItems = t.items && t.items.length > 0;
  return (
    <section id="press" className="block light">
      <div className="container">
        <h2 className={`section-title ${krCls}`} dangerouslySetInnerHTML={{__html: t.title}}></h2>
        {t.lead && <p className="section-lead">{t.lead}</p>}

        {!hasItems && <p className="press-empty">{t.emptyLabel}</p>}

        {hasItems && (
          <ul className="press-list">
            {t.items.map((it, i) => (
              <li className="press-card" key={i}>
                <div className="press-meta">
                  <div className="press-source-row">
                    <span className="press-source">{it.source}</span>
                    {it.issue && <span className="press-issue">{it.issue}</span>}
                    {it.section && <span className="press-section">{it.section}</span>}
                  </div>
                  <h3 className={`press-headline ${krCls}`}>{it.headline}</h3>
                  {it.lead && <p className="press-lead">{it.lead}</p>}
                </div>
                {it.images && it.images.length > 0 && (
                  <div className="press-pages">
                    {it.images.map((src, j) => (
                      <img
                        className="press-page"
                        key={j}
                        src={src}
                        alt={`${it.headline} — ${j + 1}`}
                        loading="lazy"
                      />
                    ))}
                  </div>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}

window.Press = Press;
