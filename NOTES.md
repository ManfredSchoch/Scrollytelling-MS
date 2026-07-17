# Website-Notizen

## Deployment
- Kanonisches Zuhause der Website ist das öffentliche Repo
  **ManfredSchoch/Scrollytelling-MS**. Jeder Push auf dessen `main` deployed
  automatisch auf GitHub Pages (Workflow `deploy-pages.yml`). Falls der erste Lauf an
  der Pages-Aktivierung scheitert: einmalig **Settings → Pages → Source: "GitHub
  Actions"** setzen und den Workflow erneut starten.
- Das öffentliche Repo enthält NUR die Website. Forschungsnotizen/Vault bleiben im
  privaten Hermes-Repo.

## Struktur (seit Hub-Umbau, Phase 1)
- `/` = Landingpage (Persona: Hero, Story-Kacheln, About, Publikationsliste).
- `/stories/crowds-to-agents/` = Story 1. Weitere Stories folgen als
  `/stories/<slug>/` (Pläne unter `content/plans/`).
- JS: `js/shared.js` (alle Seiten) + `js/story-<slug>.js` (je Story).
- CSS: ein gemeinsames `css/style.css`; Story-spezifische Akzente können später als
  eigene Variablen-Overrides ergänzt werden (Story 2: Teal, Story 3: warmes Rot —
  Motiv-Farben der Landing-Kacheln).
- Doppelungs-Regel: Publikationsliste, About und Kontakt wohnen NUR auf der Landing.

## Content-Workflow
- **`content/landing.md` und `content/story-*.md` sind die Single Source of Truth
  für alle Website-Texte.** Dort direkt editieren (auch im GitHub-Web-Editor), dann
  "sync content" sagen — Claude überträgt die Änderungen ins HTML.
- Phasenstatus: Phase 1 (Hub + Story 1), Phase 2 (Story 2 "Agentic Enterprise") und
  Phase 3 (Story 3 "Digital Work") umgesetzt. PRIME-GEN.ai als Story-Kandidat offen.
- Story-2-Prüfpunkte: Challenge-3-Formulierung (Sprint Review) gegen das HMD-Paper
  prüfen; Kursbeschreibung "Business Processes 1" verifizieren; Spektrum-Band-Texte
  (js/story-agentic.js, BANDS) sind eigene Zuspitzungen — gegen HICSS-Paper lesen.
- Story-3-Prüfpunkte (nach Umbau 17.07.2026 — Spine "Evolution statt Revolution", AI-forward):
  - Emotions-Twist (challenge↓/achievement↑, challenge→adaptive use) stammt aus der
    Journal-Erweiterung (UNDER REVIEW). Bewusst gezeigt, aber Erweiterung nicht genannt;
    Karte auf publiziertes ICIS-2023-Paper geankert (Freigabe Manfred 16.07.2026).
  - **Externer AI-Fakt in Akt 1** ("Zugang ist nicht mehr der Unterschied, Adoption schon;
    wenige Enthusiasten treiben den Großteil der KI-Nutzung") ist bewusst qualitativ (keine
    erfundene Prozentzahl) — vor Livegang auf Stimmigkeit prüfen/schärfen.
  - Akt-Figuren (EJIS-Slope, Adaptationskurve, Emotionen, Struggle-Uhr, Service-Routing) sind
    eigene schematische EN-Nachzeichnungen — Levels stilisiert. Kernaussagen gegenlesen.
  - Agent-Tracing-Ausblick: nur Thema, WIP-Paper NICHT benannt.
  - Awards/Service-Formulierungen (Recognition-Block) auf exakte Schreibweise prüfen.
  - **Backup:** Time-Poverty-Framework + LAHMER-App liegen in
    `content/backup/story-digital-work-cuts.md` (bewusst aus der Story entfernt).

## Zur Prüfung geflaggt (Urheberrecht / Freigaben)
- **Porträtfoto** (`assets/portrait.jpg`): Nutzung vom Eigentümer freigegeben (14.07.2026).
  Wasserzeichen "Bayerisches Zentrum FIM" → ggf. Bildnachweis ins Impressum. Aktuell nur
  400×400 px — höher aufgelöste Version wäre gut.
- **AWA-Schaubild**: eigene englische SVG-Nachzeichnung (`assets/awa-architecture.svg`),
  KEINE Kopie des Fraunhofer-Originals; Caption nennt "Own schematic, based on the AWA
  project (Fraunhofer FIT)". Kein Freigabe-Risiko mehr.
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
  - "13 conference papers (VHB A/B)": ECIS 2015/2018/2019/2023/2024 (5×A),
    ICIS 2017/2022/2023 (3×A), HICSS 2023 (2×B), HICSS 2026 (B), WI 2023 (B),
    WI 2026 (B, accepted — "to be presented").

## Offene Inhalte (TODO)
- Knowledge Nugget 03 verlinken, sobald online.
- Vibe-Coding-Workshop: Termin/Raum "tba" — auf der Website bewusst ohne Termin.
- Optional: eigener Domain-Name (CNAME-Datei + DNS).
- ~~OG-Preview-Bild~~: erledigt — `assets/og-image.png` (1200×630), generiert aus
  `og-image.html`-Vorlage; bei Änderung neu rendern.

## Technik
- Reines HTML/CSS/JS, keine Dependencies, kein Build-Schritt, keine externen Requests
  (DSGVO-freundlich: keine Webfonts, keine CDNs).
- Scrollytelling: `position: sticky` + rAF-Scroll-Progress (Opening), IntersectionObserver
  (Reveals, Oval-Animationen, Chart). `prefers-reduced-motion` wird respektiert.
