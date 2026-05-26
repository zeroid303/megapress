// Facilities.jsx — placeholder section for equipment & awards/certifications.
// Layout-only: content comes later. Keep markup ready so we can drop real
// equipment specs and award entries in without rewiring the section.
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
          <div className="fac-equip-grid">
            {t.equipmentPlaceholders.map((e, i) => (
              <div className="fac-equip-card" key={i}>
                <div className="fac-equip-thumb" aria-hidden="true">
                  <span className="fac-equip-thumb-hint">사진 추가 예정</span>
                </div>
                <div className="fac-equip-name">{e.name}</div>
                <div className="fac-equip-spec">{e.spec}</div>
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
