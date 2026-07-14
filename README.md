# Scrollytelling-MS — Research Portfolio

Persönliche Forschungsportfolio-Website von Manfred Schoch: ein Scrollytelling-One-Pager,
der die Forschungsstory von kollektiver Intelligenz über Mensch-KI-Kollaboration zu
Multi-Agenten-Systemen erzählt — plus Praxis (AWA), Lehre und Publikationsliste.

**Live:** https://manfredschoch.github.io/Scrollytelling-MS/ (nach erstem Deploy)

## Struktur

- `index.html` — die Seite (One-Pager, Englisch)
- `content.md` — **Single Source of Truth für alle Texte.** Hier editieren, dann
  Claude "sync content" sagen; das HTML nicht direkt anfassen.
- `css/style.css`, `js/main.js` — Design und Scroll-Animationen (keine Dependencies,
  kein Build-Schritt, keine externen Requests)
- `assets/` — Bilder
- `impressum.html`, `datenschutz.html` — Rechtsseiten (Deutsch)
- `NOTES.md` — offene TODOs, Rechte-Flags, Zählweise der Statistiken

## Deployment

Jeder Push auf `main` deployed automatisch via GitHub Actions auf GitHub Pages
(`.github/workflows/deploy-pages.yml`). Falls der erste Lauf die Pages-Aktivierung
nicht selbst vornehmen kann: einmalig **Settings → Pages → Source: "GitHub Actions"**
setzen und den Workflow erneut starten.

Kosten: 0 € (öffentliches Repo, statische Seite, kein Server).
