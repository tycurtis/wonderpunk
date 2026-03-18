"use client";

function LogoConcept1() {
  return (
    <div className="bg-white rounded-2xl p-12 border border-ice-dark">
      <p className="text-sm text-navy/40 mb-6 font-medium uppercase tracking-wider">
        Concept 1 — Clean Wordmark
      </p>
      <svg viewBox="0 0 500 100" className="w-full max-w-md">
        <text
          x="0"
          y="75"
          fontFamily="system-ui, -apple-system, sans-serif"
          fontSize="80"
          fontWeight="800"
          letterSpacing="-3"
        >
          <tspan fill="#1a1a2e">wonder</tspan>
          <tspan fill="#e84393">punk</tspan>
        </text>
      </svg>
      <p className="text-sm text-navy/40 mt-4">
        Bold geometric sans. &quot;wonder&quot; in navy, &quot;punk&quot; in
        hot pink. Tight tracking. No fuss.
      </p>
    </div>
  );
}

function LogoConcept2() {
  return (
    <div className="bg-white rounded-2xl p-12 border border-ice-dark">
      <p className="text-sm text-navy/40 mb-6 font-medium uppercase tracking-wider">
        Concept 2 — Sparkle Accent
      </p>
      <svg viewBox="0 0 520 100" className="w-full max-w-md">
        <text
          x="0"
          y="75"
          fontFamily="system-ui, -apple-system, sans-serif"
          fontSize="80"
          fontWeight="800"
          letterSpacing="-3"
        >
          <tspan fill="#1a1a2e">wonder</tspan>
          <tspan fill="#e84393">punk</tspan>
        </text>
        {/* Sparkle replacing the dot/accent */}
        <path
          d="M500 15L504 8L508 15L515 15L510 20L512 27L504 23L496 27L498 20L493 15Z"
          fill="#e84393"
        />
        <path
          d="M470 5L472 0L474 5L479 5L475 8L477 13L472 10L467 13L469 8L465 5Z"
          fill="#74b9ff"
          opacity="0.6"
        />
      </svg>
      <p className="text-sm text-navy/40 mt-4">
        Same wordmark with star sparkles as a signature element. Pink and
        blue stars.
      </p>
    </div>
  );
}

function LogoConcept3() {
  return (
    <div className="bg-white rounded-2xl p-12 border border-ice-dark">
      <p className="text-sm text-navy/40 mb-6 font-medium uppercase tracking-wider">
        Concept 3 — Stacked with Tagline
      </p>
      <svg viewBox="0 0 400 140" className="w-full max-w-sm">
        <text
          x="200"
          y="70"
          fontFamily="system-ui, -apple-system, sans-serif"
          fontSize="72"
          fontWeight="800"
          letterSpacing="-2"
          textAnchor="middle"
        >
          <tspan fill="#1a1a2e">wonder</tspan>
          <tspan fill="#e84393">punk</tspan>
        </text>
        <text
          x="200"
          y="105"
          fontFamily="system-ui, -apple-system, sans-serif"
          fontSize="18"
          fontWeight="300"
          letterSpacing="6"
          textAnchor="middle"
          fill="#0984e3"
        >
          WONDER, DELIVERED.
        </text>
        <line
          x1="100"
          y1="82"
          x2="300"
          y2="82"
          stroke="#e84393"
          strokeWidth="0.5"
          opacity="0.3"
        />
      </svg>
      <p className="text-sm text-navy/40 mt-4">
        Centred lockup with tagline underneath. Thin pink rule separating.
        Tagline in blue, wide letter-spacing.
      </p>
    </div>
  );
}

function LogoConcept4() {
  return (
    <div className="bg-white rounded-2xl p-12 border border-ice-dark">
      <p className="text-sm text-navy/40 mb-6 font-medium uppercase tracking-wider">
        Concept 4 — Icon + Wordmark
      </p>
      <svg viewBox="0 0 550 100" className="w-full max-w-lg">
        {/* Envelope icon with sparkle */}
        <g transform="translate(0, 10)">
          <rect
            x="5"
            y="15"
            width="60"
            height="45"
            rx="5"
            fill="white"
            stroke="#e84393"
            strokeWidth="3"
          />
          <path
            d="M5 20L35 45L65 20"
            stroke="#e84393"
            strokeWidth="3"
            strokeLinecap="round"
            fill="none"
          />
          {/* Sparkle popping out */}
          <path
            d="M55 10L58 2L61 10L69 10L63 15L65 23L58 18L51 23L53 15L47 10Z"
            fill="#0984e3"
          />
          <path
            d="M42 5L43.5 0L45 5L50 5L46.5 8L48 13L43.5 10L39 13L40.5 8L37 5Z"
            fill="#e84393"
            opacity="0.6"
          />
        </g>
        <text
          x="85"
          y="65"
          fontFamily="system-ui, -apple-system, sans-serif"
          fontSize="68"
          fontWeight="800"
          letterSpacing="-2"
        >
          <tspan fill="#1a1a2e">wonder</tspan>
          <tspan fill="#e84393">punk</tspan>
        </text>
      </svg>
      <p className="text-sm text-navy/40 mt-4">
        Envelope with sparkle burst as icon mark, paired with wordmark. Icon
        works standalone for favicons and app icons.
      </p>
    </div>
  );
}

function IconMark() {
  return (
    <div className="bg-white rounded-2xl p-12 border border-ice-dark">
      <p className="text-sm text-navy/40 mb-6 font-medium uppercase tracking-wider">
        Icon Mark — Standalone
      </p>
      <div className="flex gap-8 items-center justify-center flex-wrap">
        {/* Large */}
        <div className="text-center">
          <svg viewBox="0 0 80 80" width="120" height="120">
            <rect width="80" height="80" rx="16" fill="#e84393" />
            <rect
              x="15"
              y="22"
              width="50"
              height="36"
              rx="4"
              fill="none"
              stroke="white"
              strokeWidth="2.5"
            />
            <path
              d="M15 26L40 46L65 26"
              stroke="white"
              strokeWidth="2.5"
              strokeLinecap="round"
              fill="none"
            />
            <path
              d="M52 15L54.5 8L57 15L64 15L59 19L61 26L54.5 22L48 26L50 19L45 15Z"
              fill="white"
            />
          </svg>
          <p className="text-xs text-navy/30 mt-2">App icon</p>
        </div>

        {/* Medium */}
        <div className="text-center">
          <svg viewBox="0 0 80 80" width="64" height="64">
            <rect width="80" height="80" rx="16" fill="#e84393" />
            <rect
              x="15"
              y="22"
              width="50"
              height="36"
              rx="4"
              fill="none"
              stroke="white"
              strokeWidth="2.5"
            />
            <path
              d="M15 26L40 46L65 26"
              stroke="white"
              strokeWidth="2.5"
              strokeLinecap="round"
              fill="none"
            />
            <path
              d="M52 15L54.5 8L57 15L64 15L59 19L61 26L54.5 22L48 26L50 19L45 15Z"
              fill="white"
            />
          </svg>
          <p className="text-xs text-navy/30 mt-2">Profile pic</p>
        </div>

        {/* Small */}
        <div className="text-center">
          <svg viewBox="0 0 80 80" width="32" height="32">
            <rect width="80" height="80" rx="16" fill="#e84393" />
            <rect
              x="15"
              y="22"
              width="50"
              height="36"
              rx="4"
              fill="none"
              stroke="white"
              strokeWidth="3"
            />
            <path
              d="M15 26L40 46L65 26"
              stroke="white"
              strokeWidth="3"
              strokeLinecap="round"
              fill="none"
            />
            <path
              d="M52 15L54.5 8L57 15L64 15L59 19L61 26L54.5 22L48 26L50 19L45 15Z"
              fill="white"
            />
          </svg>
          <p className="text-xs text-navy/30 mt-2">Favicon</p>
        </div>

        {/* On blue */}
        <div className="text-center">
          <svg viewBox="0 0 80 80" width="64" height="64">
            <rect width="80" height="80" rx="16" fill="#0984e3" />
            <rect
              x="15"
              y="22"
              width="50"
              height="36"
              rx="4"
              fill="none"
              stroke="white"
              strokeWidth="2.5"
            />
            <path
              d="M15 26L40 46L65 26"
              stroke="white"
              strokeWidth="2.5"
              strokeLinecap="round"
              fill="none"
            />
            <path
              d="M52 15L54.5 8L57 15L64 15L59 19L61 26L54.5 22L48 26L50 19L45 15Z"
              fill="white"
            />
          </svg>
          <p className="text-xs text-navy/30 mt-2">Alt (blue)</p>
        </div>

        {/* On dark */}
        <div className="text-center">
          <svg viewBox="0 0 80 80" width="64" height="64">
            <rect width="80" height="80" rx="16" fill="#1a1a2e" />
            <rect
              x="15"
              y="22"
              width="50"
              height="36"
              rx="4"
              fill="none"
              stroke="#e84393"
              strokeWidth="2.5"
            />
            <path
              d="M15 26L40 46L65 26"
              stroke="#e84393"
              strokeWidth="2.5"
              strokeLinecap="round"
              fill="none"
            />
            <path
              d="M52 15L54.5 8L57 15L64 15L59 19L61 26L54.5 22L48 26L50 19L45 15Z"
              fill="#74b9ff"
            />
          </svg>
          <p className="text-xs text-navy/30 mt-2">Dark mode</p>
        </div>
      </div>
    </div>
  );
}

function ColourSystem() {
  const colours = [
    { name: "Hot Pink", hex: "#e84393", use: "Primary accent, CTAs, punk energy" },
    { name: "Pink Light", hex: "#fd79a8", use: "Hover states, soft backgrounds" },
    { name: "Ocean Blue", hex: "#0984e3", use: "Trust, secondary actions, wonder" },
    { name: "Blue Light", hex: "#74b9ff", use: "Accents, illustrations, sparkles" },
    { name: "Navy", hex: "#1a1a2e", use: "Text, authority, grounding" },
    { name: "Purple", hex: "#6c5ce7", use: "Magic moments, variety" },
    { name: "Purple Light", hex: "#a29bfe", use: "Subtle accents" },
    { name: "White", hex: "#ffffff", use: "Space, clarity" },
    { name: "Ice", hex: "#f0f4ff", use: "Card backgrounds" },
    { name: "Ice Dark", hex: "#dfe6f6", use: "Borders, dividers" },
  ];

  return (
    <div className="bg-white rounded-2xl p-12 border border-ice-dark">
      <p className="text-sm text-navy/40 mb-6 font-medium uppercase tracking-wider">
        Colour System
      </p>
      <div className="grid grid-cols-5 gap-4">
        {colours.map((c) => (
          <div key={c.hex}>
            <div
              className="w-full aspect-square rounded-xl mb-2 border border-black/5"
              style={{ backgroundColor: c.hex }}
            />
            <p className="text-sm font-bold text-navy">{c.name}</p>
            <p className="text-xs text-navy/40 font-mono">{c.hex}</p>
            <p className="text-xs text-navy/50 mt-1">{c.use}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function EnvelopeMockup() {
  return (
    <div className="bg-white rounded-2xl p-12 border border-ice-dark">
      <p className="text-sm text-navy/40 mb-6 font-medium uppercase tracking-wider">
        Envelope Mockup
      </p>
      <svg viewBox="0 0 500 350" className="w-full max-w-lg mx-auto">
        <defs>
          <filter id="env-shadow">
            <feDropShadow
              dx="0"
              dy="4"
              stdDeviation="8"
              floodColor="#1a1a2e"
              floodOpacity="0.08"
            />
          </filter>
        </defs>

        {/* Envelope body */}
        <g filter="url(#env-shadow)">
          <rect
            x="30"
            y="30"
            width="440"
            height="290"
            rx="8"
            fill="#fafbff"
            stroke="#dfe6f6"
            strokeWidth="1"
          />
        </g>

        {/* Decorative border */}
        <rect
          x="40"
          y="40"
          width="420"
          height="270"
          rx="4"
          fill="none"
          stroke="#e84393"
          strokeWidth="0.5"
          strokeDasharray="4,4"
          opacity="0.3"
        />

        {/* Small stars scattered on envelope */}
        {[
          { x: 60, y: 60 },
          { x: 430, y: 55 },
          { x: 55, y: 280 },
          { x: 440, y: 290 },
          { x: 380, y: 70 },
        ].map((s, i) => (
          <path
            key={i}
            d={`M${s.x} ${s.y - 4}L${s.x + 1.2} ${s.y - 1.2}L${s.x + 4} ${s.y}L${s.x + 1.2} ${s.y + 1.2}L${s.x} ${s.y + 4}L${s.x - 1.2} ${s.y + 1.2}L${s.x - 4} ${s.y}L${s.x - 1.2} ${s.y - 1.2}Z`}
            fill={i % 2 === 0 ? "#e84393" : "#74b9ff"}
            opacity="0.25"
          />
        ))}

        {/* Child's name */}
        <text
          x="250"
          y="140"
          textAnchor="middle"
          fontFamily="Georgia, serif"
          fontSize="32"
          fill="#1a1a2e"
          fontStyle="italic"
        >
          Miss Mia Johnson
        </text>

        {/* Address lines */}
        <text
          x="250"
          y="170"
          textAnchor="middle"
          fontFamily="Georgia, serif"
          fontSize="14"
          fill="#1a1a2e"
          opacity="0.5"
        >
          42 Rosemary Lane
        </text>
        <text
          x="250"
          y="190"
          textAnchor="middle"
          fontFamily="Georgia, serif"
          fontSize="14"
          fill="#1a1a2e"
          opacity="0.5"
        >
          Paddington QLD 4064
        </text>

        {/* Return address */}
        <text
          x="70"
          y="75"
          fontFamily="Georgia, serif"
          fontSize="9"
          fill="#e84393"
          opacity="0.6"
        >
          The Office of Magical Correspondence
        </text>
        <text
          x="70"
          y="88"
          fontFamily="Georgia, serif"
          fontSize="9"
          fill="#e84393"
          opacity="0.6"
        >
          Whispering Woods Post Office
        </text>

        {/* Wax seal */}
        <circle cx="400" cy="260" r="22" fill="#e84393" />
        <circle cx="400" cy="260" r="16" fill="#fd79a8" />
        <path
          d="M400 248L403 254L410 254L405 258L407 265L400 261L393 265L395 258L390 254L397 254Z"
          fill="white"
        />

        {/* Stamp area */}
        <rect
          x="380"
          y="55"
          width="55"
          height="65"
          rx="2"
          fill="none"
          stroke="#dfe6f6"
          strokeWidth="1"
          strokeDasharray="2,2"
        />
        <text
          x="407"
          y="92"
          textAnchor="middle"
          fontSize="7"
          fill="#dfe6f6"
        >
          STAMP
        </text>
      </svg>
    </div>
  );
}

export default function BrandPage() {
  return (
    <div className="min-h-screen bg-ice py-16 px-6">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-navy mb-4">
            wonder<span className="text-pink">punk</span> brand identity
          </h1>
          <p className="text-navy/50 text-lg">
            Logo concepts, colour system, and brand applications
          </p>
        </div>

        <div className="space-y-8">
          <h2 className="text-2xl font-bold text-navy">Logo Concepts</h2>
          <LogoConcept1 />
          <LogoConcept2 />
          <LogoConcept3 />
          <LogoConcept4 />

          <h2 className="text-2xl font-bold text-navy pt-8">Icon Mark</h2>
          <IconMark />

          <h2 className="text-2xl font-bold text-navy pt-8">
            Colour System
          </h2>
          <ColourSystem />

          <h2 className="text-2xl font-bold text-navy pt-8">
            Brand Application — Envelope
          </h2>
          <EnvelopeMockup />

          <h2 className="text-2xl font-bold text-navy pt-8">
            Typography Scale
          </h2>
          <div className="bg-white rounded-2xl p-12 border border-ice-dark space-y-6">
            <div>
              <p className="text-xs text-navy/30 mb-1">
                H1 — 4xl/5xl Bold -0.02em
              </p>
              <p className="text-5xl font-bold text-navy tracking-tight">
                Wonder, Delivered.
              </p>
            </div>
            <div>
              <p className="text-xs text-navy/30 mb-1">
                H2 — 3xl/4xl Bold
              </p>
              <p className="text-4xl font-bold text-navy">
                Magic mail from magical friends.
              </p>
            </div>
            <div>
              <p className="text-xs text-navy/30 mb-1">H3 — xl Bold</p>
              <p className="text-xl font-bold text-navy">
                You craft the story. We make it real.
              </p>
            </div>
            <div>
              <p className="text-xs text-navy/30 mb-1">
                Body — lg Regular, 1.7 line-height
              </p>
              <p className="text-lg text-navy/60 leading-relaxed">
                A letter arrives addressed to THEM. Their name, their
                adventure, from someone who loves them. They wait for the
                next one. Every. Single. Fortnight.
              </p>
            </div>
            <div>
              <p className="text-xs text-navy/30 mb-1">
                Small — sm, navy/40
              </p>
              <p className="text-sm text-navy/40">
                Prices in AUD. Launching in Australia first. All families
                welcome.
              </p>
            </div>
            <div>
              <p className="text-xs text-navy/30 mb-1">
                CTA — lg Bold, pink bg, white text
              </p>
              <button className="bg-pink text-white px-8 py-4 rounded-full text-lg font-medium shadow-lg shadow-pink/25">
                Join the waitlist
              </button>
            </div>
            <div>
              <p className="text-xs text-navy/30 mb-1">
                Label — xs uppercase, wide tracking
              </p>
              <p className="text-xs font-bold text-pink uppercase tracking-wider">
                Most Magic
              </p>
            </div>
          </div>

          <h2 className="text-2xl font-bold text-navy pt-8">
            Gradient Combinations
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="h-40 rounded-2xl bg-gradient-to-br from-pink via-pink-dark to-blue-dark flex items-center justify-center">
              <p className="text-white font-bold text-lg">
                Pink → Blue (Primary CTA)
              </p>
            </div>
            <div className="h-40 rounded-2xl bg-gradient-to-br from-navy to-blue-dark flex items-center justify-center">
              <p className="text-white font-bold text-lg">
                Navy → Blue (Trust sections)
              </p>
            </div>
            <div className="h-40 rounded-2xl bg-gradient-to-br from-white via-ice to-pink-light/10 flex items-center justify-center border border-ice-dark">
              <p className="text-navy font-bold text-lg">
                White → Ice → Pink hint (Hero)
              </p>
            </div>
            <div className="h-40 rounded-2xl bg-gradient-to-b from-white to-ice flex items-center justify-center border border-ice-dark">
              <p className="text-navy font-bold text-lg">
                White → Ice (Content)
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
