# Website-Notizen

## Deployment
- Kanonisches Zuhause der Website ist das öffentliche Repo
  **ManfredSchoch/Scrollytelling-MS**. Jeder Push auf dessen `main` deployed
  automatisch auf GitHub Pages (Workflow `deploy-pages.yml`). Falls der erste Lauf an
  der Pages-Aktivierung scheitert: einmalig **Settings → Pages → Source: "GitHub
  Actions"** setzen und den Workflow erneut starten.
- Das öffentliche Repo enthält NUR die Website. Forschungsnotizen/Vault bleiben im
  privaten Hermes-Repo.

## Content-Workflow
- **`content.md` ist die Single Source of Truth für alle Website-Texte.** Dort direkt
  editieren (auch im GitHub-Web-Editor), dann "sync content" sagen — Claude überträgt
  die Änderungen nach `index.html`.

## Zur Prüfung geflaggt (Urheberrecht / Freigaben)
- **Porträtfoto** (`assets/portrait.jpg`): Nutzung vom Eigentümer freigegeben (14.07.2026).
  Wasserzeichen "Bayerisches Zentrum FIM" → ggf. Bildnachweis ins Impressum. Aktuell nur
  400×400 px — höher aufgelöste Version wäre gut.
- **AWA-Schaubild** (`assets/awa-architecture.jpg`): Fraunhofer-FIT-Material, vom
  Projektbeteiligten bereitgestellt; Credit "Illustration: Fraunhofer FIT" steht in der
  Caption. Formale Freigabe durch Fraunhofer im Zweifel bestätigen.
- **Density-Chart in Akt 3**: Eigene schematische Nachzeichnung, KEINE Kopie der
  Original-Abbildung. Paper ist Open Access (Springer, vermutlich CC BY) — Original-Figures
  könnten alternativ direkt verwendet werden, dann mit Lizenzhinweis.
- **Zahlen/Aussagen**: ρ = 0.76 und Kernaussagen stammen aus dem Graphical Abstract zu
  Probost, Schoch, et al. (2026, GDN). Akt-2-Findings (divergent/konvergent) aus der
  Zusammenfassung zu Endres et al. (SJIS). Vor Livegang gegen die Paper prüfen.
- **Under-Review-Papers**: erscheinen bewusst NICHT auf der Website (Entscheidung 14.07.2026).
  Nach Annahme eines Papers: Eintrag in `content.md` + `index.html` ergänzen.
- **Bildnachweise im Impressum**: "Porträtfoto: FIM Forschungszentrum" bitte bestätigen
  (exakte gewünschte Credit-Schreibweise?).
- **Hero-Statistiken** (Zählweise, Stand 14.07.2026):
  - "30+ publications": alle veröffentlichten/angenommenen Journal-, Konferenz- und
    White-Paper-Beiträge inkl. forthcoming.
  - "6 journal articles (VHB A/B)": EJIS 2023 (A), I&M 2026 (B), GDN 2026 (B),
    GDN 2025 (B), SJIS forthcoming (B), CAIS 2023 (B).
  - "12 conference papers (VHB A/B)": ECIS 2015/2018/2019/2023/2024 (5×A),
    ICIS 2017/2022/2023 (3×A), HICSS 2023 (2×B), HICSS 2026 (B), WI 2023 (B).
    WI 2026 (conditionally accepted) noch nicht mitgezählt → nach Annahme: 13.

## Offene Inhalte (TODO)
- Knowledge Nugget 03 verlinken, sobald online.
- Vibe-Coding-Workshop: Termin/Raum "tba" — auf der Website bewusst ohne Termin.
- Optional: eigener Domain-Name (CNAME-Datei + DNS).
- Optional: OG-Preview-Bild (`og:image`) für LinkedIn-Shares — lohnt sich!

## Technik
- Reines HTML/CSS/JS, keine Dependencies, kein Build-Schritt, keine externen Requests
  (DSGVO-freundlich: keine Webfonts, keine CDNs).
- Scrollytelling: `position: sticky` + rAF-Scroll-Progress (Opening), IntersectionObserver
  (Reveals, Oval-Animationen, Chart). `prefers-reduced-motion` wird respektiert.
