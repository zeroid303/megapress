/* MEGA PRESS — shared page bootstrap.
 *
 * Every HTML page mounts the same shell: <SiteHeader> + page body + <SiteFooter>.
 * The body component is supplied by the page itself, via:
 *     <script type="text/babel">window.MP_PAGE = "About";</script>
 * — a comma-separated list of component names registered on `window` (e.g. by
 * About.jsx → window.About = About). The bootstrap renders them in order inside
 * <main>. The data-page attribute on #app controls nav active state. */
const { useEffect: useEffectApp, useState: useStateApp } = React;

function MegaPressApp() {
  const [lang, setLang] = useStateApp("ko");
  const [scrolled, setScrolled] = useStateApp(false);

  useEffectApp(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Smooth in-page anchor scrolling (still useful for footer / map link anchors).
  useEffectApp(() => {
    const handler = e => {
      const a = e.target.closest("a[href^='#']");
      if (!a) return;
      const href = a.getAttribute("href");
      if (href === "#" || href.length < 2) return;
      const el = document.getElementById(href.slice(1));
      if (!el) return;
      e.preventDefault();
      el.scrollIntoView({ behavior: "smooth" });
    };
    document.addEventListener("click", handler);
    return () => document.removeEventListener("click", handler);
  }, []);

  const bodyNames = (window.MP_PAGE || "").split(",").map(s => s.trim()).filter(Boolean);

  return (
    <>
      <window.SiteHeader lang={lang} setLang={setLang} scrolled={scrolled} />
      <main>
        {bodyNames.map((name, i) => {
          const Comp = window[name];
          if (!Comp) return null;
          return <Comp key={i} lang={lang} />;
        })}
      </main>
      <window.SiteFooter lang={lang} />
    </>
  );
}

window.MegaPressApp = MegaPressApp;
window.MP_MOUNT = () => {
  ReactDOM.createRoot(document.getElementById("app")).render(<MegaPressApp />);
};
