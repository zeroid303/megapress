// Facilities.jsx — equipment list + awards/certifications.
// Equipment: category sections, each with a blurb and an equipment list.
// Awards remain placeholder cards until real entries land.
// All copy lives in i18n's `facilities`.
function Facilities({ lang }) {
  const t = window.MP_I18N[lang].facilities;
  const krCls = lang === "ko" ? "kr-display" : "";
  return (
    <section id="facilities" className="block light">
      <div className="container">
        <h2 className={`section-title ${krCls}`} dangerouslySetInnerHTML={{__html: t.title}}></h2>
        {t.lead && <p className="section-lead">{t.lead}</p>}

        <div className="fac-block">
          <div className="fac-block-label">{t.equipmentLabel}</div>

          <div className="fac-cat-grid">
            {t.equipmentCategories.map((c, i) => (
              <div className="fac-cat" key={i}>
                <h3 className="fac-cat-name">{c.name}</h3>
                <div className="fac-cat-content">
                  <p className="fac-cat-desc">{c.desc}</p>
                  {c.groups ? (
                    c.groups.map((g, gi) => (
                      <div className="fac-cat-group" key={gi}>
                        <div className="fac-cat-group-label">{g.label}</div>
                        <ul className="fac-cat-items">
                          {g.items.map((it, ii) => <li key={ii}>{it}</li>)}
                        </ul>
                      </div>
                    ))
                  ) : (
                    <ul className="fac-cat-items">
                      {c.items.map((it, ii) => <li key={ii}>{it}</li>)}
                    </ul>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="fac-block">
          <div className="fac-block-label">{t.awardsLabel}</div>
          <div className="fac-awards-grid">
            {t.awardsPlaceholders.map((a, i) => (
              <div className="fac-awards-card" key={i}>
                <div className="fac-awards-title">{a.title}</div>
                <p className="fac-awards-body">{a.body}</p>
                <ul className="fac-awards-list" aria-hidden="true">
                  <li></li>
                  <li></li>
                  <li></li>
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

window.Facilities = Facilities;
