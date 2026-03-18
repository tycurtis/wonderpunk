export function UnicornWriter({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 400 400" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="uw-bg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#111111" />
          <stop offset="100%" stopColor="#1a1a2e" />
        </linearGradient>
        <filter id="neon-glow-pink">
          <feGaussianBlur stdDeviation="4" result="blur" />
          <feFlood floodColor="#e84393" floodOpacity="0.6" result="color" />
          <feComposite in="color" in2="blur" operator="in" result="glow" />
          <feMerge><feMergeNode in="glow" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
        <filter id="neon-glow-cyan">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feFlood floodColor="#00d4ff" floodOpacity="0.5" result="color" />
          <feComposite in="color" in2="blur" operator="in" result="glow" />
          <feMerge><feMergeNode in="glow" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
      </defs>

      <rect width="400" height="400" fill="url(#uw-bg)" rx="0" />

      {/* Desk */}
      <rect x="80" y="260" width="240" height="10" rx="0" fill="#e84393" opacity="0.15" />
      <rect x="80" y="260" width="240" height="1" fill="#e84393" opacity="0.6" />
      <rect x="90" y="270" width="6" height="60" fill="#e84393" opacity="0.08" />
      <rect x="304" y="270" width="6" height="60" fill="#e84393" opacity="0.08" />

      {/* Letter on desk */}
      <rect x="130" y="230" width="70" height="40" rx="0" fill="#1a1a1a" stroke="#e84393" strokeWidth="1" transform="rotate(-5, 165, 250)" opacity="0.8" />
      <line x1="140" y1="242" x2="185" y2="240" stroke="#e84393" strokeWidth="1" opacity="0.3" />
      <line x1="142" y1="250" x2="178" y2="248" stroke="#00d4ff" strokeWidth="1" opacity="0.2" />

      {/* Stack of letters */}
      <rect x="240" y="238" width="50" height="30" rx="0" fill="#1a1a1a" stroke="#fd79a8" strokeWidth="0.5" transform="rotate(8, 265, 253)" opacity="0.6" />
      <rect x="243" y="235" width="50" height="30" rx="0" fill="#1a1a1a" stroke="#00d4ff" strokeWidth="0.5" transform="rotate(3, 268, 250)" opacity="0.7" />
      <rect x="245" y="232" width="50" height="30" rx="0" fill="#1a1a1a" stroke="#e84393" strokeWidth="1" />

      {/* Unicorn body */}
      <ellipse cx="200" cy="210" rx="45" ry="35" fill="#1a1a2e" stroke="#e84393" strokeWidth="1.5" filter="url(#neon-glow-pink)" />

      {/* Unicorn head */}
      <ellipse cx="195" cy="160" rx="28" ry="25" fill="#1a1a2e" stroke="#e84393" strokeWidth="1.5" />

      {/* Horn */}
      <path d="M195 135L200 105L190 135" fill="#00d4ff" stroke="#00d4ff" strokeWidth="1" filter="url(#neon-glow-cyan)" />
      <line x1="193" y1="128" x2="199" y2="128" stroke="#0a0a0a" strokeWidth="1" opacity="0.4" />
      <line x1="194" y1="120" x2="198" y2="120" stroke="#0a0a0a" strokeWidth="1" opacity="0.4" />

      {/* Mane */}
      <path d="M175 140C168 145 165 155 168 170" stroke="#e84393" strokeWidth="3" strokeLinecap="round" fill="none" filter="url(#neon-glow-pink)" />
      <path d="M178 138C170 142 162 150 163 165" stroke="#fd79a8" strokeWidth="2.5" strokeLinecap="round" fill="none" />
      <path d="M182 137C175 143 170 155 172 168" stroke="#00d4ff" strokeWidth="2" strokeLinecap="round" fill="none" opacity="0.5" />

      {/* Eye */}
      <circle cx="205" cy="155" r="4" fill="#e84393" />
      <circle cx="206.5" cy="153.5" r="1.5" fill="white" />

      {/* Smile */}
      <path d="M208 165C210 168 215 168 217 165" stroke="#e84393" strokeWidth="1.5" strokeLinecap="round" fill="none" />

      {/* Front leg holding quill */}
      <path d="M220 210C225 225 230 235 225 250" stroke="#e84393" strokeWidth="6" strokeLinecap="round" fill="none" opacity="0.6" />

      {/* Quill */}
      <line x1="228" y1="220" x2="160" y2="260" stroke="#00d4ff" strokeWidth="2" strokeLinecap="round" filter="url(#neon-glow-cyan)" />
      <path d="M228 220L240 208L235 225Z" fill="#00d4ff" opacity="0.8" />

      {/* Ink jar */}
      <rect x="100" y="245" width="18" height="18" rx="0" fill="#0984e3" opacity="0.6" stroke="#00d4ff" strokeWidth="0.5" />
      <ellipse cx="109" cy="245" rx="10" ry="3" fill="#0652a8" />

      {/* Tail */}
      <path d="M155 215C140 210 130 220 125 235" stroke="#e84393" strokeWidth="3" strokeLinecap="round" fill="none" />
      <path d="M155 218C138 215 128 225 125 240" stroke="#00d4ff" strokeWidth="2.5" strokeLinecap="round" fill="none" />
      <path d="M155 220C142 220 132 228 130 242" stroke="#6c5ce7" strokeWidth="2" strokeLinecap="round" fill="none" />

      {/* Neon sparkles */}
      {[
        { x: 100, y: 130, s: 6, c: "#e84393", d: "1.5s" },
        { x: 310, y: 150, s: 8, c: "#00d4ff", d: "2s" },
        { x: 320, y: 210, s: 5, c: "#fd79a8", d: "2.5s" },
        { x: 85, y: 200, s: 7, c: "#00d4ff", d: "1.8s" },
        { x: 280, y: 120, s: 5, c: "#e84393", d: "1.3s" },
      ].map((s, i) => (
        <path key={i}
          d={`M${s.x} ${s.y - s.s}L${s.x + s.s * 0.25} ${s.y - s.s * 0.25}L${s.x + s.s} ${s.y}L${s.x + s.s * 0.25} ${s.y + s.s * 0.25}L${s.x} ${s.y + s.s}L${s.x - s.s * 0.25} ${s.y + s.s * 0.25}L${s.x - s.s} ${s.y}L${s.x - s.s * 0.25} ${s.y - s.s * 0.25}Z`}
          fill={s.c} opacity="0.8">
          <animate attributeName="opacity" values="0.3;0.9;0.3" dur={s.d} repeatCount="indefinite" />
        </path>
      ))}

      {/* Candle with neon flame */}
      <rect x="310" y="230" width="8" height="25" rx="0" fill="#1a1a1a" stroke="#e84393" strokeWidth="0.5" />
      <ellipse cx="314" cy="228" rx="6" ry="4" fill="#e84393" opacity="0.8">
        <animate attributeName="ry" values="3;5;3" dur="1s" repeatCount="indefinite" />
      </ellipse>
      <ellipse cx="314" cy="225" rx="3" ry="5" fill="#ff2d95" opacity="0.4">
        <animate attributeName="ry" values="4;6;4" dur="0.8s" repeatCount="indefinite" />
      </ellipse>
    </svg>
  );
}

export function PropsLayout({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 600 300" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <filter id="props-glow-pink">
          <feGaussianBlur stdDeviation="2" result="blur" />
          <feFlood floodColor="#e84393" floodOpacity="0.4" result="color" />
          <feComposite in="color" in2="blur" operator="in" result="glow" />
          <feMerge><feMergeNode in="glow" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
        <filter id="props-glow-cyan">
          <feGaussianBlur stdDeviation="2" result="blur" />
          <feFlood floodColor="#00d4ff" floodOpacity="0.4" result="color" />
          <feComposite in="color" in2="blur" operator="in" result="glow" />
          <feMerge><feMergeNode in="glow" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
      </defs>

      <rect width="600" height="300" fill="#111111" rx="0" />
      {/* Subtle grid */}
      {[...Array(12)].map((_, i) => (
        <line key={`v${i}`} x1={i * 50} y1="0" x2={i * 50} y2="300" stroke="#e84393" strokeWidth="0.3" opacity="0.05" />
      ))}
      {[...Array(6)].map((_, i) => (
        <line key={`h${i}`} x1="0" y1={i * 50} x2="600" y2={i * 50} stroke="#e84393" strokeWidth="0.3" opacity="0.05" />
      ))}

      {/* Treasure map scroll */}
      <g transform="translate(60, 70)">
        <rect x="0" y="10" width="80" height="100" rx="0" fill="#1a1a1a" stroke="#e84393" strokeWidth="1" />
        <rect x="-4" y="10" width="4" height="100" fill="#e84393" opacity="0.15" />
        <rect x="80" y="10" width="4" height="100" fill="#e84393" opacity="0.15" />
        <path d="M20 40L40 35L55 50L65 45" stroke="#e84393" strokeWidth="1" opacity="0.5" strokeDasharray="3,3" />
        <circle cx="65" cy="45" r="4" fill="none" stroke="#e84393" strokeWidth="1" opacity="0.4" />
        <path d="M60 41L65 36L70 41" stroke="#e84393" strokeWidth="1" opacity="0.6" />
        <text x="15" y="85" fontSize="8" fill="#e84393" opacity="0.6" fontFamily="monospace">TREASURE</text>
        <line x1="0" y1="10" x2="80" y2="10" stroke="#e84393" strokeWidth="1.5" filter="url(#props-glow-pink)" />
      </g>

      {/* Fairy dust vial */}
      <g transform="translate(200, 80)">
        <rect x="15" y="0" width="30" height="8" rx="0" fill="#00d4ff" opacity="0.4" stroke="#00d4ff" strokeWidth="0.5" />
        <rect x="10" y="8" width="40" height="80" rx="0" fill="#1a1a1a" stroke="#00d4ff" strokeWidth="1" />
        {[...Array(15)].map((_, i) => (
          <circle key={i}
            cx={18 + Math.random() * 24} cy={25 + Math.random() * 55}
            r={1 + Math.random() * 2}
            fill={i % 3 === 0 ? "#e84393" : i % 3 === 1 ? "#00d4ff" : "#6c5ce7"}
            opacity={0.5 + Math.random() * 0.5}>
            <animate attributeName="opacity" values={`${0.3};${0.9};${0.3}`} dur={`${1 + Math.random() * 2}s`} repeatCount="indefinite" />
          </circle>
        ))}
        <text x="5" y="108" fontSize="8" fill="#00d4ff" opacity="0.6" fontFamily="monospace">FAIRY DUST</text>
      </g>

      {/* Sticker sheet */}
      <g transform="translate(310, 60)">
        <rect x="0" y="0" width="90" height="110" rx="0" fill="#1a1a1a" stroke="#fd79a8" strokeWidth="1" />
        {/* Star sticker */}
        <path d="M25 25L28 18L31 25L38 25L33 30L35 37L28 33L21 37L23 30L18 25Z" fill="#e84393" opacity="0.8" filter="url(#props-glow-pink)" />
        {/* Heart sticker */}
        <path d="M65 22C65 18 60 15 57 18C54 15 49 18 49 22C49 28 57 33 57 33C57 33 65 28 65 22Z" fill="#fd79a8" opacity="0.8" />
        {/* Moon sticker */}
        <path d="M25 55C25 45 33 38 43 38C36 38 30 45 30 55C30 65 36 72 43 72C33 72 25 65 25 55Z" fill="#00d4ff" opacity="0.6" />
        {/* Skull sticker (punk!) */}
        <circle cx="65" cy="62" r="10" fill="none" stroke="#e84393" strokeWidth="1" />
        <circle cx="61" cy="59" r="2" fill="#e84393" />
        <circle cx="69" cy="59" r="2" fill="#e84393" />
        <line x1="63" y1="67" x2="67" y2="67" stroke="#e84393" strokeWidth="1" />
        <line x1="63" y1="67" x2="63" y2="70" stroke="#e84393" strokeWidth="0.5" />
        <line x1="65" y1="67" x2="65" y2="70" stroke="#e84393" strokeWidth="0.5" />
        <line x1="67" y1="67" x2="67" y2="70" stroke="#e84393" strokeWidth="0.5" />
        <text x="15" y="100" fontSize="8" fill="#fd79a8" opacity="0.6" fontFamily="monospace">STICKERS</text>
      </g>

      {/* Unicorn poop bag */}
      <g transform="translate(470, 75)">
        <path d="M20 90C10 90 0 80 5 70L30 30C32 26 38 26 40 30L65 70C70 80 60 90 50 90Z" fill="#1a1a1a" stroke="#6c5ce7" strokeWidth="1" />
        <circle cx="25" cy="65" r="8" fill="#e84393" opacity="0.4" />
        <circle cx="40" cy="60" r="9" fill="#6c5ce7" opacity="0.3" />
        <circle cx="35" cy="75" r="7" fill="#00d4ff" opacity="0.4" />
        <circle cx="50" cy="70" r="6" fill="#fd79a8" opacity="0.3" />
        <circle cx="30" cy="50" r="5" fill="#e84393" opacity="0.2" />
        <text x="5" y="110" fontSize="8" fill="#6c5ce7" opacity="0.6" fontFamily="monospace">UNICORN POOP</text>
      </g>

      {/* Neon sparkles scattered */}
      {[
        { x: 170, y: 50, c: "#e84393" }, { x: 290, y: 40, c: "#00d4ff" },
        { x: 450, y: 55, c: "#fd79a8" }, { x: 550, y: 200, c: "#e84393" },
        { x: 30, y: 220, c: "#00d4ff" }, { x: 180, y: 250, c: "#6c5ce7" },
      ].map((s, i) => (
        <path key={i}
          d={`M${s.x} ${s.y - 4}L${s.x + 1} ${s.y - 1}L${s.x + 4} ${s.y}L${s.x + 1} ${s.y + 1}L${s.x} ${s.y + 4}L${s.x - 1} ${s.y + 1}L${s.x - 4} ${s.y}L${s.x - 1} ${s.y - 1}Z`}
          fill={s.c} opacity="0.6">
          <animate attributeName="opacity" values="0.2;0.8;0.2" dur={`${1.5 + i * 0.3}s`} repeatCount="indefinite" />
        </path>
      ))}
    </svg>
  );
}

export function LetterboxMoment({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 400 300" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <filter id="lb-neon">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feFlood floodColor="#e84393" floodOpacity="0.5" result="color" />
          <feComposite in="color" in2="blur" operator="in" result="glow" />
          <feMerge><feMergeNode in="glow" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
      </defs>

      <rect width="400" height="300" fill="#111111" rx="0" />

      {/* Letterbox */}
      <rect x="155" y="100" width="90" height="70" rx="0" fill="#1a1a2e" stroke="#e84393" strokeWidth="1.5" />
      <rect x="160" y="130" width="80" height="6" rx="0" fill="#e84393" opacity="0.2" />
      <line x1="160" y1="130" x2="240" y2="130" stroke="#e84393" strokeWidth="1" opacity="0.6" />
      <line x1="160" y1="136" x2="240" y2="136" stroke="#e84393" strokeWidth="1" opacity="0.6" />
      <rect x="155" y="170" width="90" height="100" rx="0" fill="#1a1a2e" stroke="#e84393" strokeWidth="0.5" opacity="0.5" />

      {/* Post */}
      <rect x="193" y="270" width="14" height="30" fill="#1a1a2e" stroke="#e84393" strokeWidth="0.5" opacity="0.3" />

      {/* Letter poking out with neon glow */}
      <g filter="url(#lb-neon)">
        <animateTransform attributeName="transform" type="translate" values="0,0; 0,-5; 0,0" dur="3s" repeatCount="indefinite" />
        <rect x="170" y="95" width="65" height="45" rx="0" fill="#1a1a1a" stroke="#e84393" strokeWidth="2" transform="rotate(-8, 200, 117)" />
        <circle cx="215" cy="125" r="6" fill="#e84393" transform="rotate(-8, 200, 117)" />
        <circle cx="215" cy="125" r="3" fill="#ff2d95" transform="rotate(-8, 200, 117)" />
      </g>

      {/* Neon sparkle burst */}
      {[
        { x: 140, y: 95, d: "1.5s", c: "#e84393" },
        { x: 260, y: 90, d: "2s", c: "#00d4ff" },
        { x: 135, y: 130, d: "1.8s", c: "#fd79a8" },
        { x: 265, y: 120, d: "2.3s", c: "#00d4ff" },
        { x: 200, y: 75, d: "1.4s", c: "#e84393" },
        { x: 165, y: 70, d: "2.1s", c: "#6c5ce7" },
        { x: 240, y: 80, d: "1.7s", c: "#e84393" },
        { x: 150, y: 60, d: "2.5s", c: "#00d4ff" },
        { x: 250, y: 65, d: "1.9s", c: "#fd79a8" },
      ].map((s, i) => (
        <path key={i}
          d={`M${s.x} ${s.y - 6}L${s.x + 1.5} ${s.y - 1.5}L${s.x + 6} ${s.y}L${s.x + 1.5} ${s.y + 1.5}L${s.x} ${s.y + 6}L${s.x - 1.5} ${s.y + 1.5}L${s.x - 6} ${s.y}L${s.x - 1.5} ${s.y - 1.5}Z`}
          fill={s.c} opacity="0.7">
          <animate attributeName="opacity" values="0.2;1;0.2" dur={s.d} repeatCount="indefinite" />
        </path>
      ))}

      {/* Ground line */}
      <line x1="50" y1="299" x2="350" y2="299" stroke="#e84393" strokeWidth="0.5" opacity="0.2" />
    </svg>
  );
}
