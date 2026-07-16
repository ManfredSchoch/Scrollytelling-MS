# Story 1: "From Crowds to Agents" — Texte (Single Source of Truth)

Seite: `stories/crowds-to-agents/index.html`. Diese Datei enthält alle Texte der
Story in Seitenreihenfolge. **Du kannst hier direkt editieren** (auch auf GitHub im Browser).
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

(Stats: auf die Landingpage umgezogen, siehe content/landing.md)

## 3. Akt 1 — The wisdom of crowds

**Eyebrow:** Act 1 · Collective intelligence
**Titel:** The wisdom of **crowds** (Oval um "crowds")

Long before large language models, one question drove this research: how can
**many people together** make better judgments than any individual? For wicked
problems — climate, health, the future of work — crowds can generate and evaluate
solution ideas at scale. But collective intelligence needs careful design:
incentives, aggregation, and process.

**Data-Viz (Sticky-Text):**
Titel: Same answers, different reading
Across four innovation contests of ascending specialization — from *attitudes &
behaviors* to *energy supply* — we compared crowd judgments with an LLM evaluator.
Used as **absolute ratings** — averaging the raw scores — the LLM's judgments hovered
at chance level. Turned into **computed rankings** — relative ranks built from those
same scores — they kept pace with the crowd, even in the most specialized contest.
**What you do with the answers matters more than what you ask.**
Stat: 50 % → 80 % — LLM balanced accuracy: the same scores, read as averages
(absolute ratings) vs. as computed rankings
Chart: zwei Panels (Absolute ratings / Computed rankings), Linien Crowd vs. LLM über
Contests C1–C4, gestrichelte "chance"-Linie bei 50 %.
Caption: Schematic recreation (balanced accuracy) based on Gimpel, Laubacher, Probost,
Schäfer & Schoch (2025, GDN). Contests 1→4 in ascending specialization.

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

**Data-Viz (Sticky-Text):**
Titel: Where AI literacy pays off
In **divergent** tasks — generating ideas — GenAI levels the playing field: effects of
AI literacy are mixed, and performance differences flatten out.
In **convergent** tasks — selecting and refining — **AI literacy decides**, because
convergence requires sophisticated prompting. The steepest gains go to people with
*lower* individual creativity: skilled prompting lets them close the gap. And it takes
**human–AI co-creation**, not AI alone, to turn that capability into performance.
Chart: zwei schematische Simple-Slopes-Panels (divergent: "Differences flatten out" /
convergent: "AI literacy decides"), Linien nach Individual Creativity (low/medium/high).
Caption: Schematic recreation of the simple-slopes analysis in Endres, Kreuzer,
Schoch & Schöttl (forthcoming, SJIS).

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

**Outlook:** Current work: how to balance *human agency and system autonomy*
when orchestrating multi-agent systems — the question that connects all three acts,
and the one I care about most.

## 6. Practice — Making ideation work

**Eyebrow:** From lab to practice
**Titel:** Making ideation work

The same questions drive my applied projects with industry partners: how do teams
generate good ideas — and how do organizations judge which ones to pursue?

**Cards:**
- Industry project · Manufacturing — *Design sprints on the shop floor* — Design-thinking
  sprints with an industrial partner: taking a production problem from first ideas to
  tested concepts within days — creativity methods at work, no AI required.
- Industry project · Strategy — *Balancing exploitation and exploration* — Leadership
  workshops on organizational ambidexterity: mapping where the company excels and where
  to invest — across strategy, processes, IT systems, culture, and structure — on an
  importance–fulfillment matrix (invest, manage excellence, reprioritize).

**Subtitle:** From many ideas to a workable shortlist
When an organization has more ideas than it can pursue, the evaluation question returns at
portfolio scale. In our industry projects — from manufacturing to knowledge work — we run
gallery walks and ideation formats, then condense ideas into one-page profiles for
structured selection. The funnel is steep:
**Funnel** (kam von Story 2 hierher): ~300 raw ideas from ideation & gallery walks → ~100
worth detailing in one-page profiles → 20–30 make it onto the implementation roadmap.
**Note:** Typical proportions that we see in our projects with organizations at the
beginning of their GenAI journey — the exact shape depends on the organization's AI maturity.

**CTA:** Interested in ideation formats or applied research? Get in touch.

<!-- AWA ist komplett in Story 2 umgezogen (content/plans/story-agentic-enterprise.md). -->

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
- Cyberweek workshop — *Vibe Coding: From Creativity to AI Prototype* — Creative
  methods to find smart AI use cases in the morning; in the afternoon, steering AI
  assistants in natural language to turn the concept into running code — deliberately
  without needing to understand the code behind it. One day, one working AI prototype.
- Guides · 2023 / 2025 — *Generative AI in Higher Education* — Co-author of widely
  used guides for students and instructors on using GenAI in university teaching.
  → https://doi.org/10.62273/QLLG7172

## 8. Continue exploring (Abschluss-Band)

**Eyebrow:** Continue exploring
**Titel:** This is one of several stories
My research portfolio covers more than agents: the full publication list, my roles,
and further research stories live on the main page.
Links: ← All stories · Publications · Get in touch

<!-- "Beyond agents" (Digital Work Teaser), Publikationen und About sind auf die
     Landingpage umgezogen (content/landing.md). Der Digital-Work-Teaser wird zur
     eigenen Story 3 (content/plans/story-digital-work.md). -->
