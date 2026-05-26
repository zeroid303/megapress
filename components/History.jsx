// History.jsx — 연혁 타임라인. 좌측 연도(악센트 컬러) + 우측 마일스톤 카드 구조.
function History({ lang }) {
  const t = window.MP_I18N[lang].history;
  const krCls = lang === "ko" ? "kr-display" : "";
  return (
    <section id="history" className="block light">
      <div className="container">
        <h2 className={`section-title ${krCls}`} dangerouslySetInnerHTML={{__html: t.title}}></h2>
        {t.lead && <p className="section-lead">{t.lead}</p>}
        <ol className="timeline">
          {t.milestones.map((m, i) => (
            <li className="timeline-row" key={i}>
              <div className="timeline-year">{m.year}</div>
              <ul className="timeline-card">
                {m.lines.map((line, j) => (
                  <li key={j}>{line}</li>
                ))}
              </ul>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

window.History = History;
