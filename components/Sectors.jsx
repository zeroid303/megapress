// Sectors.jsx — 메가프레스 사업 부문 소개. 부문별 컬러 pill + 본문을 세로로 스택.
function Sectors({ lang }) {
  const t = window.MP_I18N[lang].sectors;
  const krCls = lang === "ko" ? "kr-display" : "";
  return (
    <section id="sectors" className="block light">
      <div className="container">
        <h2 className={`section-title ${krCls}`} dangerouslySetInnerHTML={{__html: t.title}}></h2>
        {t.lead && <p className="section-lead">{t.lead}</p>}
        <div className="sector-list">
          {t.cards.map((c, i) => (
            <article
              className="sector-card"
              key={i}
              style={{ "--sector-color": c.color, "--sector-text": c.textColor || "#fff" }}
            >
              <span className="sector-chip">{c.name}</span>
              <p className="sector-body">{c.body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

window.Sectors = Sectors;
