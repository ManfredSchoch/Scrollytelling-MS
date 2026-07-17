# Story 3 — herausgenommene Bausteine (Backup, 17.07.2026)

Beim Story-3-Umbau ("Technologie vom Menschen her denken", entschlackt) aus
`stories/digital-work/index.html` entfernt, weil sie eher verwirrten. Hier
1:1 aufbewahrt für eine spätere, spezialisiertere Story (z. B. Time Poverty,
oder eine eigene Story zu In-the-moment-Support). Zugehöriges CSS: die Regeln
`.timeloss*` und `.phones` wurden aus css/style.css entfernt und lassen sich
aus der Git-Historie (Branch main, PR #4) wiederherstellen.

## 1. Time-Poverty-Framework (war in Akt 2)
Quelle: Schoch & Weinert (2023, Wirtschaftsinformatik). Interaktiv (staggered reveal + hover).

```html
      <p class="reveal">Dozens of small frictions — interruptions, notifications, ever-changing tools — rarely
      register on their own. Together they converge into something people feel acutely: never enough time.
      And that scarcity radiates outward.</p>

      <div class="timeloss reveal" aria-label="How many IT-related frictions converge into a felt lack of time and radiate into consequences">
        <div class="timeloss__col timeloss__col--in">
          <p class="timeloss__head">What piles up</p>
          <div class="timeloss__cat" style="--i:0"><b>User</b><span>Less training or experience with IT</span></div>
          <div class="timeloss__cat" style="--i:1"><b>IT system</b><span>Interruptions, addictive features, information overload</span></div>
          <div class="timeloss__cat" style="--i:2"><b>IT use</b><span>Always-on use, work–life spillover</span></div>
          <div class="timeloss__cat" style="--i:3"><b>Task</b><span>Back-to-back digital meetings, little control over deadlines</span></div>
        </div>
        <div class="timeloss__core">
          A felt lack of time
          <small>time pressure · time urgency</small>
        </div>
        <div class="timeloss__col timeloss__col--out">
          <p class="timeloss__head">What it costs</p>
          <div class="timeloss__cat" style="--i:5"><b>Performance</b><span>Rushed decisions, less focus</span></div>
          <div class="timeloss__cat" style="--i:6"><b>Wellbeing</b><span>Anxiety and insecurity</span></div>
          <div class="timeloss__cat" style="--i:7"><b>Social</b><span>Less time for colleagues</span></div>
          <div class="timeloss__cat" style="--i:8"><b>Technology</b><span>A negative view of IT, narrower use</span></div>
        </div>
      </div>
      <p class="timeloss__flow reveal">Many small demands → one scarce resource → broad fallout. <span aria-hidden="true">Hover a card to lift it.</span></p>
      <p class="band__note reveal">Antecedents and consequences of an IT-related lack of time. Own schematic
      based on Schoch &amp; Weinert (2023, <em>Wirtschaftsinformatik</em>).</p>
```

## 2. LAHMER-App / Personalized Notification Support System (war in Akt 3)
Quelle: Lahmer, Okrusch, Schoch & Gimpel (2024, ECIS). Eigene englische Nachzeichnung der App-Screens.

```html
      <p class="reveal">A second move meets people <em>in the moment</em>. We designed a personalized support
      app that turns the very source of the problem — notifications — into the channel for helping people
      regain control of their attention: it surfaces one small, actionable tip at a time, keeps a history,
      and lets people reflect on their own interruption load.</p>

      <figure class="figure reveal phones">
        <svg viewBox="0 0 720 380" role="img" font-family="system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif"
             aria-label="Three schematic phone screens: Home with a single actionable tip and an interruption-load gauge; History listing past tips; Reflection with a chart of interruption load over time and notifications per app">
          <!-- Phone 1: Home -->
          <g>
            <rect x="20" y="20" width="200" height="340" rx="26" fill="#ffffff" stroke="#15151d" stroke-width="2"/>
            <rect x="20" y="20" width="200" height="46" rx="26" fill="#6d4aa6"/>
            <rect x="20" y="44" width="200" height="22" fill="#6d4aa6"/>
            <text x="40" y="49" font-size="13" fill="#fff" font-weight="700">Home</text>
            <rect x="36" y="82" width="168" height="96" rx="10" fill="#f7f6f2" stroke="#dcd9d0"/>
            <circle cx="56" cy="104" r="9" fill="#15151d"/><text x="56" y="108" text-anchor="middle" font-size="11" fill="#fff">i</text>
            <text x="74" y="100" font-size="10.5" fill="#15151d">Turn off message</text>
            <text x="74" y="114" font-size="10.5" fill="#15151d">preview to cut</text>
            <text x="74" y="128" font-size="10.5" fill="#15151d">distraction.</text>
            <text x="50" y="160" font-size="10" fill="#6d4aa6">Samsung · Google · Xiaomi</text>
            <circle cx="120" cy="262" r="52" fill="none" stroke="#e2dcef" stroke-width="12"/>
            <path d="M120 210 A52 52 0 0 1 168 246" fill="none" stroke="#6d4aa6" stroke-width="12" stroke-linecap="round"/>
            <text x="120" y="258" text-anchor="middle" font-size="13" fill="#15151d" font-weight="700">60 / 100</text>
            <text x="120" y="276" text-anchor="middle" font-size="10" fill="#4a4a58">interruption load</text>
            <text x="120" y="346" text-anchor="middle" font-size="11" fill="#8f8fa3">Home</text>
          </g>
          <!-- Phone 2: History -->
          <g>
            <rect x="260" y="20" width="200" height="340" rx="26" fill="#ffffff" stroke="#15151d" stroke-width="2"/>
            <rect x="260" y="20" width="200" height="46" rx="26" fill="#6d4aa6"/>
            <rect x="260" y="44" width="200" height="22" fill="#6d4aa6"/>
            <text x="280" y="49" font-size="13" fill="#fff" font-weight="700">History</text>
            <g>
              <rect x="276" y="82" width="168" height="70" rx="10" fill="#f7f6f2" stroke="#dcd9d0"/>
              <text x="292" y="104" font-size="10.5" fill="#15151d">Deactivate message</text>
              <text x="292" y="118" font-size="10.5" fill="#15151d">preview on screen</text>
              <text x="292" y="140" font-size="9.5" fill="#8f8fa3">Fri, Nov 10 · applied</text>
              <rect x="276" y="164" width="168" height="70" rx="10" fill="#f7f6f2" stroke="#dcd9d0"/>
              <text x="292" y="186" font-size="10.5" fill="#15151d">Use focus mode to</text>
              <text x="292" y="200" font-size="10.5" fill="#15151d">avoid leisure pings</text>
              <text x="292" y="222" font-size="9.5" fill="#8f8fa3">Fri, Nov 10 · skipped</text>
              <rect x="276" y="246" width="168" height="56" rx="10" fill="#f7f6f2" stroke="#dcd9d0"/>
              <text x="292" y="268" font-size="10.5" fill="#15151d">Batch email checks</text>
              <text x="292" y="288" font-size="9.5" fill="#8f8fa3">Thu, Nov 9 · applied</text>
            </g>
            <text x="360" y="346" text-anchor="middle" font-size="11" fill="#8f8fa3">History</text>
          </g>
          <!-- Phone 3: Reflection -->
          <g>
            <rect x="500" y="20" width="200" height="340" rx="26" fill="#ffffff" stroke="#15151d" stroke-width="2"/>
            <rect x="500" y="20" width="200" height="46" rx="26" fill="#6d4aa6"/>
            <rect x="500" y="44" width="200" height="22" fill="#6d4aa6"/>
            <text x="520" y="49" font-size="13" fill="#fff" font-weight="700">Reflection</text>
            <rect x="516" y="82" width="168" height="104" rx="10" fill="#f7f6f2" stroke="#dcd9d0"/>
            <text x="530" y="102" font-size="10" fill="#15151d">Interruption load over time</text>
            <polyline points="530,168 566,150 602,120 638,132 668,150" fill="none" stroke="#6d4aa6" stroke-width="2.4"/>
            <circle cx="530" cy="168" r="2.6" fill="#6d4aa6"/><circle cx="566" cy="150" r="2.6" fill="#6d4aa6"/>
            <circle cx="602" cy="120" r="2.6" fill="#6d4aa6"/><circle cx="638" cy="132" r="2.6" fill="#6d4aa6"/>
            <circle cx="668" cy="150" r="2.6" fill="#6d4aa6"/>
            <rect x="516" y="198" width="168" height="104" rx="10" fill="#f7f6f2" stroke="#dcd9d0"/>
            <text x="530" y="218" font-size="10" fill="#15151d">Notifications per app</text>
            <g font-size="9.5" fill="#4a4a58">
              <text x="530" y="238">Chat</text><rect x="600" y="230" width="70" height="8" rx="4" fill="#6d4aa6"/>
              <text x="530" y="258">Email</text><rect x="600" y="250" width="54" height="8" rx="4" fill="#8b6fc4"/>
              <text x="530" y="278">Calendar</text><rect x="600" y="270" width="34" height="8" rx="4" fill="#b892e6"/>
            </g>
            <text x="600" y="346" text-anchor="middle" font-size="11" fill="#8f8fa3">Reflection</text>
          </g>
        </svg>
        <figcaption>“The problem as part of the solution”: a personalized notification support system. Own
        English schematic, based on Lahmer, Okrusch, Schoch &amp; Gimpel (2024, <em>European Conference on
        Information Systems</em>).</figcaption>
      </figure>
```
