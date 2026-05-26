// Contact.jsx — "오시는길" directions section: contact list + embedded map
function Contact({ lang }) {
  const t = window.MP_I18N[lang].contact;
  const krCls = lang === "ko" ? "kr-display" : "";

  // Map: Naver requires an API key for iframe embedding, so the inline preview
  // and the "open in maps" button both point to Google Maps for now.
  const mapQuery = encodeURIComponent("서울특별시 중구 을지로18길 31 프린트시티인쇄센터");
  const previewSrc = `https://www.google.com/maps?q=${mapQuery}&hl=ko&z=15&output=embed`;
  const mapLink = `https://www.google.com/maps/search/?api=1&query=${mapQuery}`;

  return (
    <section id="contact" className="block dark">
      <div className="container">
        <div className="contact-grid">
          <div className="contact-info">
            <h2 className={krCls} dangerouslySetInnerHTML={{__html: t.title}}></h2>
            {t.lead && <p className="lead">{t.lead}</p>}
            <div className="contact-list">
              <div className="contact-item">
                <div className="ic-box"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg></div>
                <div><div className="lbl">{t.emailLabel}</div><div className="val">{t.email}</div></div>
              </div>
              <div className="contact-item">
                <div className="ic-box"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg></div>
                <div><div className="lbl">{t.phoneLabel}</div><div className="val">{t.phone}</div></div>
              </div>
              {t.fax && (
                <div className="contact-item">
                  <div className="ic-box"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="6" y="14" width="12" height="8"/><path d="M6 14V4h9l3 3v7"/><path d="M6 18H4a2 2 0 0 1-2-2v-4a2 2 0 0 1 2-2h2"/><path d="M18 14h2a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2h-2"/></svg></div>
                  <div><div className="lbl">{t.faxLabel}</div><div className="val">{t.fax}</div></div>
                </div>
              )}
            </div>
          </div>
          <div className="map-card">
            <iframe
              className="map-frame"
              src={previewSrc}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title={t.mapTitle}
            ></iframe>
            <a className="map-link" href={mapLink} target="_blank" rel="noreferrer">
              {t.mapLink}
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M7 17 17 7"/><path d="M7 7h10v10"/></svg>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

window.Contact = Contact;
