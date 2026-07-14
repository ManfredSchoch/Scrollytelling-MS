# Website-Inhalte — Single Source of Truth

Diese Datei enthält **alle Texte der Website** in der Reihenfolge, in der sie auf der
Seite erscheinen. **Du kannst hier direkt editieren** (auch auf GitHub im Browser).
Sag danach einfach "sync content" — dann übertrage ich die Änderungen nach `index.html`.
Die HTML-Datei selbst musst du nicht anfassen.

Konventionen:
- Seitensprache ist Englisch; nur Impressum/Datenschutz sind deutsch (separate Dateien).
- `[TODO]` markiert offene Stellen, `<!-- ... -->` sind Anmerkungen, die nicht auf der
  Website erscheinen.

---

## 1. Opening (Scrollytelling-Thesen)

<!-- Drei Sätze, die nacheinander über der Crowd→Agenten-Animation erscheinen. -->

1. Generative AI is flooding organizations with ideas, drafts, and decisions.
2. The bottleneck is no longer *creating* — it is *judging*.
3. My research asks: can we orchestrate AI agents to evaluate, decide, and collaborate — **without losing human agency?**

## 2. Intro + Hero-Stats

I am Professor of Information Systems at Esslingen University of Applied Sciences.
My research spans the interface of generative AI, multi-agent systems, and the
transformation of knowledge work: how AI agents change what organizations can automate,
what digital work does to the people doing it, and how universities should teach in the
AI era. The story below follows one thread of that portfolio — from the wisdom of
crowds to the wisdom of agents.

**Stats:**
- 30+ · peer-reviewed publications
- 6 · journal articles in VHB-A/B journals
- 12 · papers at VHB-A/B conferences

<!-- Zählweise siehe NOTES.md. Bei neuen Papers hier + NOTES.md aktualisieren. -->

## 3. Akt 1 — The wisdom of crowds

**Eyebrow:** Act 1 · Collective intelligence
**Titel:** The wisdom of **crowds** (Oval um "crowds")

Long before large language models, one question drove this research: how can
**many people together** make better judgments than any individual? For wicked
problems — climate, health, the future of work — crowds can generate and evaluate
solution ideas at scale. But collective intelligence needs careful design:
incentives, aggregation, and process.

**Pullquote:** Crowds can evaluate ideas for problems that overwhelm any single
expert — if the inner workings of the collective are managed well.

**Paper-Cards:**
- Communications of the AIS · 2023 — *Managing the Inner Workings of Collective
  Intelligence for Wicked Problems* — An assessment model for collective intelligence
  approaches — and its evaluation in practice. → https://doi.org/10.17705/1CAIS.05249
- Group Decision and Negotiation · 2025 — *Idea Evaluation for Solutions to Specialized
  Problems* — Leveraging the potential of crowds *and* large language models for judging
  ideas — the bridge into act 2. → https://doi.org/10.1007/s10726-025-09935-y

## 4. Akt 2 — Humans + AI: hybrid judgment

**Eyebrow:** Act 2 · Human–AI collaboration
**Titel:** Humans **+ AI**: hybrid judgment (Oval um "+ AI")

Generative AI turned the crowd's toolkit upside down: suddenly the machine ideates
and evaluates alongside us. In a controlled lab study we watched people solve
creative tasks with GenAI and analyzed their prompting: whether the partnership
pays off depends on **AI literacy** — and on which kind of thinking the task demands.
Human judgment does not disappear; it moves up the stack.

**Finding-Cards:**
- Finding · Divergent thinking — *AI levels the playing field* — For idea generation,
  people benefit from GenAI largely regardless of their AI literacy.
- Finding · Convergent thinking — *Judgment is a skill* — When selecting and refining
  ideas, AI literacy and prompting strategy largely determine success.

**Pullquote:** For brainstorming, AI levels the playing field. For deciding, human
judgment makes the difference.

**Paper-Cards:**
- Scandinavian Journal of Information Systems · forthcoming — *Prompting for
  Creativity* — Human–AI decision making and the role of AI literacy in divergent
  and convergent thinking.
- Journal of Information Systems Education · 2025 — *Using Generative AI in Higher
  Education* — A guide for instructors — where hybrid judgment meets the classroom.
  → https://doi.org/10.62273/QLLG7172

## 5. Akt 3 — The crowd without people

**Eyebrow:** Act 3 · Multi-agent systems
**Titel:** The crowd **without** people (Oval um "without")

What if the crowd itself were made of AI agents? We built single-agent and
multi-agent LLM systems of various sizes and let them judge the quality of real
ideas. The result mirrors a century of collective-intelligence research —
**the wisdom of the crowd works for AI, too.**

**Data-Viz (Sticky-Text):**
Titel: Wisdom of the crowd, silicon edition
Single LLMs systematically **overestimate idea quality** compared to human judgment.
But orchestrate a **diverse set of agents with structured collaboration** — heterogeneous
agents, coordinated by a facilitator — and the collective comes remarkably close to
human experts.
Stat: ρ = 0.76 — alignment of the collaborative multi-agent system with human expert ratings
Caption: Schematic recreation based on the open-access article (Probost, Schoch, et al., 2026).

**Pullquote:** Agent heterogeneity and structured collaboration unlock collective
intelligence effects that go beyond what stronger individual models achieve.

**Paper-Cards:**
- Group Decision and Negotiation · 2026 · Open Access — *The Crowd Without People:
  Multi-agent LLMs as Idea Evaluators* — Multiple LLMs beat a single model; diversity
  and collaboration add value beyond scale. → https://doi.org/10.1007/s10726-026-09993-w
- HICSS · 2026 — *Orchestrating GenAI-Based Multi-Agent Systems for Complex Knowledge
  Work* — A design science approach: a morphological box of orchestration options and
  four propositions for steering agent teams.
- WI · 2026 & DESRIST · 2026 — *Let the Agents Close the Loop / PRIME-GEN.ai* —
  A GenAI-based multi-agent prototype for business process improvement — live-demoed
  at DESRIST.

**Outlook:** Currently under review: how to balance *human agency and system autonomy*
when orchestrating multi-agent systems — the question that connects all three acts,
and the one I care about most.

## 6. Practice — Agentic Work Automation (AWA)

**Eyebrow:** From lab to practice
**Titel:** Agentic Work Automation (AWA)

Generative AI opens new ways to automate complex knowledge work. GenAI-based
multi-agent systems go a step further: several specialized agents work together,
coordinate tasks, and support people in complex processes — an enormous potential
for productivity, quality, and new forms of collaboration, especially against the
backdrop of skilled-labor shortage. In the AWA research project at the Fraunhofer FIT
Institute Branch Information Systems, where I co-lead a research group, we develop
and test such systems along concrete industry use cases.

**Bild:** `assets/awa-architecture.jpg` — Caption: How a GenAI-based multi-agent
system is embedded in an organization: coordinated specialist agents, each perceiving,
remembering, and acting on top of a foundation model. Illustration: Fraunhofer FIT.

The project distills scientific and practical guidance along three phases:

1. **Define** — goals, requirements, and use cases for GenAI-based multi-agent systems
2. **Build** — architecture and implementation
3. **Run** — steering, quality, and traceability

**Knowledge-Nugget-Cards:**
- Knowledge Nugget · 01 — *Chatbots, Agents, Multi-Agent Systems* — What AI agents and
  multi-agent systems actually are — a map of the terrain.
  → https://www.wi.fit.fraunhofer.de/content/dam/fit/witschaftsinformatik/dokumente/01_AWA_Chatbot-Agents-MAS.pdf
- Knowledge Nugget · 02 — *When a Multi-Agent System Makes Sense* — Multi-agent vs.
  single-agent: a decision guide for real-world automation.
  → https://www.wi.fit.fraunhofer.de/content/dam/fit/witschaftsinformatik/dokumente/Wann-ein-Multi-Agenten-System-sinnvoll-ist.pdf
- Knowledge Nugget · 03 — *Agile Development of GenAI Agents* — Probabilistic agents
  break Scrum's assumptions: how to adapt backlog items, acceptance criteria, and the
  Definition of Done — companion to our HMD article. *Coming soon.* [TODO: Link]

**Partner-Zeile:** Project partners: Fraunhofer FIT, Ancud IT-Beratung, DATEV, soffico,
and Brauerei Gebr. Maisel, plus associated partners. → Project page:
https://www.wi.fit.fraunhofer.de/de/projekte/oeffentliche-projekte/Agentic-Work-Automation.html

**CTA:** Interested in talks, joint projects, or applied research on AI agents? Get in touch.

## 7. Teaching

**Eyebrow:** Teaching & academic leadership
**Titel:** Teaching the AI generation

As head of the Central Academic Institution for Digital Transformation in Study and
Teaching at Esslingen University, I work on bringing AI into the classroom
responsibly — from organizing the university-wide **Cyberweek** to building new
course formats around generative AI.

**Cards:**
- Lecture — *Solution Architecture* — A semester-long arc from AI and Python
  fundamentals through generative and agentic AI to architecture principles and
  hands-on prototyping: student teams identify AI use cases, pitch them, and build
  them — vibe coding included.
- Cyberweek workshop — *Vibe Coding: From Creativity to AI Prototype* — With Benjamin
  Wiedenbruch: creative methods to find smart AI use cases in the morning; in the
  afternoon, steering AI assistants in natural language to turn the concept into
  running code — deliberately without needing to understand the code behind it.
  One day, one working AI prototype.
- Guides · 2023 / 2025 — *Generative AI in Higher Education* — Co-author of widely
  used guides for students and instructors on using GenAI in university teaching.
  → https://doi.org/10.62273/QLLG7172

## 8. Beyond agents — Digital work, technostress & time

**Eyebrow:** Beyond agents
**Titel:** Digital work, technostress & time

A second strand of my research studies the human side of digital work over time:
how IT use creates stress and time poverty, how people cope, and which interventions
help — published in outlets such as the *European Journal of Information Systems* and
*Information & Management*. One example: the timing of misinformation warnings decides
their effect. Shown *after* a false message, a warning makes people pause and reflect;
shown *before*, it is processed in passive "scroll mode" — and two weeks later, users
tend to remember the misinformation as true. If act 3 asks what agents can do, this
strand asks what constant connectivity does to us.

## 9. Publications

<!-- Liste wird aus dem Schriftenverzeichnis gepflegt (vollständig in index.html).
     Filter: All / Journal articles / Conference papers / Studies & white papers / In progress.
     Under-Review-Einträge bewusst ohne Journalnamen. -->

**Media-Note:** Selected media coverage: General-Anzeiger Bonn, Augsburger Allgemeine,
Deutschlandfunk Kultur, Highways to Health, Digital Business Cloud.

## 10. About / Kontakt

**Prof. Dr. Manfred Schoch**
- Professor of Information Systems, Esslingen University of Applied Sciences
- Head, Central Academic Institution for Digital Transformation in Study and Teaching
- Co-Head of Research Group, Fraunhofer FIT Institute Branch Information Systems

Links: E-Mail (manfred.schoch@hs-esslingen.de) · LinkedIn
(https://www.linkedin.com/in/manfred-schoch-42257877) · Google Scholar
(https://scholar.google.com/citations?user=WTYQ880AAAAJ&hl=en)

**Footer:** © [Jahr] Manfred Schoch · This site sets no cookies and uses no tracking.
Links: Impressum · Datenschutz
