# Story 2: "Orchestrating the Agentic Enterprise" — Texte (Single Source of Truth)

Seite: `stories/agentic-enterprise/index.html`. Akzentfarbe: Teal (#0f766e).

## 1. Opening (Scrollytelling: starre Pipeline → Agenten-Netzwerk)
1. For decades, automating work meant: software does exactly what we specify — *nothing more*.
2. GenAI agents are different: they plan, delegate, and improvise.
3. The design question of the decade: **how much autonomy do we grant them — and how do we stay in control?**

## 2. Intro
GenAI-based multi-agent systems can automate knowledge work that scripted automation
never could. But building them well is a design discipline, not trial and error. This
story walks through the design knowledge we develop between research and industry
practice — from orchestration choices to agile agent development.

## 3. Akt 1 — Orchestration is a choice (Oval um "choice")
**Eyebrow:** Act 1 · The design space
In practice, most agent systems are built the same way: try something, see what happens,
patch it. Our design science research systematizes what is actually being decided when
you build a multi-agent system — three interlocking design areas, sitting between IT
governance above and technical implementation below.
**Figur:** Orchestrierungs-Framework (inline SVG): IT governance / [Coordinated task
representation ⟷ Delegation mechanisms ⟷ Agent architectures] / Technical implementation.
**Pullquote:** Stop building agent teams by trial and error — make orchestration an
explicit design decision.
**Cards:** HICSS 2026 (Open Access, Link ScholarSpace) · Current work: Balancing human
agency and system autonomy (ohne Venue, Under-Review-Regel).

## 4. Akt 2 — Where do you set the dial? (FLAGSHIP, Oval um "dial")
**Eyebrow:** Act 2 · Control ⟷ Autonomy
Every orchestration decision sits somewhere on a spectrum between full control and full
autonomy. Our morphological box maps eleven such design dimensions. Try three of them —
drag the dial and watch how the same system changes character.
**Interaktives Spektrum** (Slider Control ⟷ Autonomy), Dimensionen (je Designbereich eine):
- Task representation · Process specification: Imperative process model → Declarative
  process model → Reference process → None
- Agent architectures · Tools per agent: Dedicated → Predefined pool → Marketplace at
  runtime → Generated at runtime
- Delegation mechanisms · Interaction structure: Deterministic → Centralized → Emergent
**Vier Zusammenfassungs-Bänder** (Texte in js/story-agentic.js, BANDS).
**Caption:** Three of eleven design dimensions from the morphological box (HICSS 2026).
**Pullquote:** More autonomy shifts control from design time to run time — from
prescribing behavior to observing it.

## 5. Akt 3 — When Scrum meets probabilistic software (Oval um "probabilistic")
**Eyebrow:** Act 3 · Agile agent development
Agile development assumes you can specify what "done" looks like. GenAI agents break
that assumption: they behave probabilistically, respond to context, and change under
the hood when models update. In development projects and expert interviews we mapped
where exactly the friction appears in a Scrum cycle — and what to do about it.
**Figur:** Englisches Scrum-Diagramm (inline SVG) mit 4 nummerierten Challenge-Markern.
**Challenge-Cards:**
1. Backlog items & acceptance criteria — How do you write acceptance criteria for
   output that is probabilistic by design?
2. Definition of Done — When is an agent "done" if the same input can produce
   different results?
3. Sprint review — Reviewing variable behavior with stakeholders takes evaluation
   runs, not a single demo.
4. Stability over time — Model updates cause drift: a "finished" agent does not stay
   finished.
**Paper-Cards:** HMD (forthcoming) · WI 2026 & DESRIST 2026 (PRIME-GEN.ai als Ausblick).

## 6. Practice — AWA (geerbt von der alten Seite) + Use-Case-Funnel
AWA-Beschreibung, Architektur-SVG, Phasen (Define/Build/Run), Nuggets 01–03, Partner.
**NEU: "Finding the right use cases first":** Before any agent is built, organizations
face a selection problem. In our industry projects — from manufacturing to knowledge
work — we run gallery walks and ideation formats, then condense ideas into one-page
profiles for structured evaluation. The funnel is steep:
**Funnel:** ~300 raw ideas → ~100 worth detailing in one-page profiles → 20–30 make it
onto the implementation roadmap. Note: Typical proportions; depends on AI maturity.
**CTA:** Talks, joint projects, applied research → Get in touch.

## 7. Teaching — Teaching the builders
- Lecture · Solution Architecture (identisch zu Story 1, bewusst redundant)
- Lecture · Business Processes 1 — From process modeling to process mining:
  understanding and improving how work actually flows — the foundation for deciding
  what agents should automate. [Kursbeschreibung von Manfred verifizieren lassen]

## 8. Continue exploring
Brücke zu Story 1 ("Where do the agents' judgments come from?"), All stories,
Publications, Get in touch.
