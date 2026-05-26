// About.jsx — light editorial section
const { useEffect: useEffectAbout, useState: useStateAbout } = React;

const ABOUT_SLIDE_INTERVAL = 5000;

function About({ lang }) {
  const t = window.MP_I18N[lang].about;
  const krCls = lang === "ko" ? "kr-display" : "";
  const cardKr = lang === "ko" ? "kr" : "";
  const hasMvv = t.mvv && t.mvv.length > 0;
  const paragraphs = t.paragraphs || [];
  const isStructured = paragraphs.length > 0 && typeof paragraphs[0] === "object";
  const hero = t.hero;
  // hero.images 배열을 우선 사용. 항목은 문자열 또는 {src, position} 객체.
  // 구버전(hero.image 단일) 호환도 유지. 항상 {src, position} 형태로 정규화.
  const rawHeroImages = hero
    ? (hero.images && hero.images.length > 0
        ? hero.images
        : (hero.image ? [hero.image] : []))
    : [];
  const heroImages = rawHeroImages.map(it =>
    typeof it === "string" ? { src: it, position: "center" } : { position: "center", ...it }
  );
  const [slideIdx, setSlideIdx] = useStateAbout(0);

  useEffectAbout(() => {
    if (heroImages.length <= 1) return;
    const id = setInterval(
      () => setSlideIdx(i => (i + 1) % heroImages.length),
      ABOUT_SLIDE_INTERVAL
    );
    return () => clearInterval(id);
  }, [heroImages.length]);

  return (
    <section id="about" className="block light">
      {hero && (
        <div className="about-hero">
          {heroImages.map((it, i) => (
            <div
              key={it.src}
              className={`about-hero-slide ${i === slideIdx ? "is-active" : ""}`}
              style={{
                backgroundImage: `url("${it.src}")`,
                backgroundPosition: it.position,
              }}
              aria-hidden={i !== slideIdx}
            />
          ))}
          <div className="about-hero-inner">
            {hero.eyebrow && <div className="about-hero-eyebrow">{hero.eyebrow}</div>}
            {/* caption(큰 글씨, 영어) + sub(작은 글씨, 한국어) 모두 슬라이드별로 다르다.
                key={slideIdx}로 두면 React가 매번 재마운트해 fadeIn 애니메이션이 다시 재생된다.
                구버전 hero.caption / hero.sub fallback도 지원. */}
            {(heroImages[slideIdx]?.caption || hero.caption) && (
              <h1
                key={`cap-${slideIdx}`}
                className="about-hero-caption about-hero-caption--anim kr-display"
              >
                {heroImages[slideIdx]?.caption || hero.caption}
              </h1>
            )}
            {(heroImages[slideIdx]?.sub || hero.sub) && (
              <p
                key={`sub-${slideIdx}`}
                className="about-hero-sub about-hero-sub--anim"
              >
                {heroImages[slideIdx]?.sub || hero.sub}
              </p>
            )}
          </div>
          {heroImages.length > 1 && (
            <div className="about-hero-dots" role="tablist" aria-label="hero slides">
              {heroImages.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  className={`about-hero-dot ${i === slideIdx ? "is-active" : ""}`}
                  onClick={() => setSlideIdx(i)}
                  aria-label={`Slide ${i + 1}`}
                  aria-selected={i === slideIdx}
                />
              ))}
            </div>
          )}
        </div>
      )}
      {t.affiliates && t.affiliates.length > 0 && (
        <div className="affiliates-strip" aria-label={t.affiliatesLabel || "Affiliates"}>
          <div className="container">
            <div className="affiliates-row">
              {t.affiliates.map((a, i) => {
                const inner = <img src={a.src} alt={a.name} loading="lazy" />;
                return a.href ? (
                  <a
                    className="affiliate-item"
                    key={i}
                    href={a.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={a.name}
                  >
                    {inner}
                  </a>
                ) : (
                  <div className="affiliate-item" key={i}>{inner}</div>
                );
              })}
            </div>
          </div>
        </div>
      )}
      <div className="container">
        <div className={`about-grid ${hasMvv ? "" : "about-grid--single"}`}>
          <div>
            <h2 className={`section-title about-title ${krCls}`} dangerouslySetInnerHTML={{__html: t.title}}></h2>
            {!isStructured && (
              <div className="about-body">
                {paragraphs.map((p, i) => <p key={i}>{p}</p>)}
              </div>
            )}
          </div>
          {hasMvv && (
            <div className="mvv">
              {t.mvv.map((m, i) => (
                <div className={`card ${cardKr}`} key={i}>
                  <h4>{m.title}</h4>
                  <p>{m.body}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        {isStructured && (
          <div className="philosophy-grid">
            {paragraphs.map((p, i) => (
              <div className="philosophy-card" key={i}>
                <div className="philosophy-label">{p.label}</div>
                <p className="philosophy-body">{p.body}</p>
              </div>
            ))}
          </div>
        )}

        {/* Stats sit AFTER the philosophy cards so they read as the closing
            evidence row, not the lead-in. */}
        {t.stats && t.stats.length > 0 && (
          <div className="about-stats">
            {t.stats.map((s, i) => (
              <div className="about-stat" key={i}>
                <div className="big" dangerouslySetInnerHTML={{__html: s.value}}></div>
                <div className="lbl">{s.label}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

window.About = About;
