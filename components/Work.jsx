// Work.jsx — dark section, numbered case rows
function Work({ lang }) {
  const t = window.MP_I18N[lang].work;
  const krCls = lang === "ko" ? "kr-display" : "";
  return (
    <section id="work" className="block dark">
      <div className="container">
        {t.title && <h2 className={`section-title ${krCls}`}>{t.title}</h2>}
        {t.lead && <p className="section-lead" style={{maxWidth: "60ch", marginBottom: "120px"}}>{t.lead}</p>}
        {t.cases.map((c, i) => {
          const slot = (
            <image-slot
              id={`work-case-${i + 1}`}
              shape="rounded"
              radius="16"
              placeholder={c.imgPlaceholder}
              class="work-image"
            ></image-slot>
          );
          const meta = <CaseMeta c={c} t={t} krCls={krCls} />;
          return (
            <div className="work-row" key={i}>
              {i % 2 === 0 ? <>{slot}{meta}</> : <>{meta}{slot}</>}
            </div>
          );
        })}
      </div>
    </section>
  );
}

function CaseMeta({ c, t, krCls }) {
  return (
    <div className="work-meta">
      <div className="num">{c.num}</div>
      <div className="eyebrow-row">{c.sector}</div>
      <h3 className={krCls}>{c.title}</h3>
      <p className="desc">{c.desc}</p>
      <div className="work-stats">
        {c.stats.map((s, j) => (
          <div className="work-stat" key={j}>
            <div className="big">{s.value}</div>
            <div className="lbl">{s.label}</div>
          </div>
        ))}
      </div>
      <a className="work-cta" href="#contact">{t.caseCta} <span className="arrow">→</span></a>
    </div>
  );
}

window.Work = Work;
