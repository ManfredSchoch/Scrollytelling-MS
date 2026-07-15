# Content-Plan: Story 2 — "Orchestrating the Agentic Enterprise" (Phase 2)

Status: Input gesammelt (14.07.2026), Umsetzung noch nicht gestartet.
Charakter: **gestaltungsorientierte Forschung** (Design Science) — kaum quantitative
Charts. Visuelle Sprache daher: Architektur-Schemata, Entscheidungsräume,
Prozess-Diagramme, Vorher/Nachher — statt Datenplots. Vor Umsetzung nochmal mit
Manfred über die Content-Dramaturgie sprechen.

## Kernmaterial

### 1. HICSS 2026 Paper (Orchestrating GenAI-Based MAS, Open Access)
- Volltext: https://scholarspace.manoa.hawaii.edu/server/api/core/bitstreams/4d6fa4a9-9727-41fc-a479-1f299d56f5e4/content
- **Orchestrierungs-Framework** (Screenshot vorhanden, als engl. SVG nachbauen):
  Design phase, eingerahmt von "IT Governance" (oben) und "Technical Implementation"
  (unten), dazwischen drei wechselseitig verbundene Boxen unter dem Dach
  "GenAI-based MAS Orchestration":
  1. **Coordinated Task Representation** — Translation of workflow design to MAS
  2. **Design of Delegation Mechanisms** — Delegation relationships between agents
  3. **Design of Agent Architectures** — Design of individual agents
- **Morphologischer Kasten** = Herzstück: Entwicklungsoptionen entlang eines
  **Control-Autonomy-Spektrums**, gegliedert nach den drei Orchestrierungsaspekten.
  Beispiel-Dimension "Tools pro Agent": dedicated → predefined pool → marketplace →
  generation at runtime. → Idee: interaktive/scrollgetriebene Darstellung des
  Spektrums (Slider-Metapher Control ⟷ Autonomy) statt statischer Tabelle.
- Vier Propositions zur Steuerung von MAS.
- **Erweiterung in Begutachtung** (5 Cases, eines davon = GDN26): NICHT verwenden
  (Under-Review-Regel), aber Dramaturgie so bauen, dass Cases später andockbar sind.

### 2. HMD Paper (Agile Entwicklung generativer KI-Agenten, accepted/forthcoming)
- Basis: Workshops im AWA-Konsortium, weniger methodisch-quantitativ.
- **Scrum-Prozess-Diagramm** (Screenshot vorhanden, auf ENGLISCH nachbauen):
  Klassischer Scrum-Flow (Fachliche Anforderungen → Product Backlog → Sprint
  Planning → Sprint Backlog mit Akzeptanzkriterien → Sprint mit Daily Scrum →
  Inkrement → Sprint Review → Sprint Retrospective; Rollen: Product Owner, Scrum
  Master, Entwicklungsteam, fachliche Stakeholder) mit **vier markierten
  Herausforderungs-Punkten (#1–#4)**, an denen GenAI-Agenten den Prozess brechen:
  #1 beim Sprint Planning / Backlog Items & Akzeptanzkriterien, #2 am Übergang
  Sprint → Inkrement (Definition of Done), #3 beim Sprint Review, #4 nach dem
  Review (Stabilität über Zeit / Drift). Übersetzungen: Fachliche Anforderungen =
  Business requirements, Entwicklungsteam = Development team, Herausforderungen =
  Challenges.
- Paperausschnitt liegt Manfred vor; für Details nachfragen.

### 3. AWA (erbt die komplette Praxis-Sektion von der bisherigen Seite)
- Projektbeschreibung, Phasen (Define/Build/Run), Partner, Knowledge Nuggets 01–03,
  AWA-Architektur-SVG (`assets/awa-architecture.svg`) — wandert von Story 1 hierher.

### 4. Industrieprojekte (Unternehmen NICHT namentlich nennen)
- **AI Use Case Identification** (Produktion + Knowledge Work): Gallery Walk
  verschiedener Use Cases → Ideation → Bewertung & Ausarbeitung per Steckbriefen.
- **Prozess-Slide** (Screenshot vorhanden, auf ENGLISCH nachbauen, falls verwendet):
  "Umsetzung von KI Use Cases in Unternehmen" = Trichter KI-Ideation (~35) →
  Bewertung der KI Use Cases (~10) → 3 ausgewählte → Roadmap & KI-Strategie →
  Rapid Prototyping / Design Sprint → Umsetzung & Betrieb. Daneben "Portfolio of
  AI Initiatives": Risiko (gering/mittel/hoch) × Komplexität/Umsetzungsdauer
  (gering/mittel/hoch), Blasengröße = Impact in €.

### 5. Teaching-Zuschnitt Story 2
- Solution Architecture (redundant zu Story 1, bewusst akzeptiert)
- **Geschäftsprozesse 1** (NEU): Lehrveranstaltung mit Process Mining.

## Nicht in Story 2

- **PRIME-GEN.ai** = eigene Story-Kandidatin (siehe story-prime-gen.md):
  Referenzarchitektur, wie MAS Business Process Improvement automatisieren —
  Workflow Process Data Exploration → As-is Diagnostics → To-be Process Design →
  Alternative Selection (Screenshot der Referenzarchitektur vorhanden: 4 Systeme
  S1–S4 mit Measure/Analyze/Improve-Ebenen, deterministische vs. agentische
  Komponenten, Interaction & Dashboard, Double-Diamond-Logik).
