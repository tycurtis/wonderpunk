export function MagicEnvelopeScene({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 600 400"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Sky gradient background */}
      <defs>
        <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#74b9ff" stopOpacity="0.15" />
          <stop offset="100%" stopColor="#fd79a8" stopOpacity="0.1" />
        </linearGradient>
        <linearGradient id="envelope-grad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="100%" stopColor="#f0f4ff" />
        </linearGradient>
        <filter id="glow">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <filter id="soft-shadow">
          <feDropShadow dx="0" dy="8" stdDeviation="12" floodColor="#e84393" floodOpacity="0.15" />
        </filter>
      </defs>

      <rect width="600" height="400" fill="url(#sky)" rx="20" />

      {/* Clouds */}
      <ellipse cx="100" cy="80" rx="60" ry="25" fill="white" opacity="0.6" />
      <ellipse cx="130" cy="70" rx="45" ry="20" fill="white" opacity="0.5" />
      <ellipse cx="480" cy="120" rx="55" ry="22" fill="white" opacity="0.5" />
      <ellipse cx="510" cy="110" rx="40" ry="18" fill="white" opacity="0.4" />
      <ellipse cx="300" cy="50" rx="50" ry="18" fill="white" opacity="0.3" />

      {/* Sparkle trail */}
      <circle cx="180" cy="230" r="3" fill="#e84393" opacity="0.6">
        <animate attributeName="opacity" values="0.3;0.8;0.3" dur="2s" repeatCount="indefinite" />
      </circle>
      <circle cx="200" cy="250" r="2" fill="#fd79a8" opacity="0.5">
        <animate attributeName="opacity" values="0.2;0.7;0.2" dur="1.5s" repeatCount="indefinite" />
      </circle>
      <circle cx="220" cy="220" r="2.5" fill="#0984e3" opacity="0.5">
        <animate attributeName="opacity" values="0.3;0.9;0.3" dur="2.5s" repeatCount="indefinite" />
      </circle>
      <circle cx="160" cy="210" r="2" fill="#74b9ff" opacity="0.4">
        <animate attributeName="opacity" values="0.2;0.6;0.2" dur="1.8s" repeatCount="indefinite" />
      </circle>
      <circle cx="240" cy="240" r="1.5" fill="#e84393" opacity="0.5">
        <animate attributeName="opacity" values="0.3;0.8;0.3" dur="2.2s" repeatCount="indefinite" />
      </circle>

      {/* Main envelope */}
      <g filter="url(#soft-shadow)">
        <g>
          <animateTransform
            attributeName="transform"
            type="translate"
            values="0,0; 0,-10; 0,0"
            dur="4s"
            repeatCount="indefinite"
          />
          <animateTransform
            attributeName="transform"
            type="rotate"
            values="-3,300,200; 3,300,200; -3,300,200"
            dur="5s"
            repeatCount="indefinite"
            additive="sum"
          />
          {/* Envelope body */}
          <rect x="230" y="160" width="140" height="100" rx="6" fill="url(#envelope-grad)" stroke="#e84393" strokeWidth="2.5" />
          {/* Envelope flap */}
          <path d="M230 166L300 210L370 166" stroke="#e84393" strokeWidth="2.5" strokeLinecap="round" fill="none" />
          {/* Wax seal */}
          <circle cx="300" cy="245" r="12" fill="#e84393" />
          <circle cx="300" cy="245" r="8" fill="#fd79a8" />
          {/* Star on seal */}
          <path d="M300 239L301.5 243.5L306 244.5L302.5 247L303.5 251.5L300 249L296.5 251.5L297.5 247L294 244.5L298.5 243.5Z" fill="white" />
          {/* Address lines */}
          <line x1="255" y1="195" x2="310" y2="195" stroke="#0984e3" strokeWidth="1.5" strokeLinecap="round" opacity="0.4" />
          <line x1="260" y1="205" x2="300" y2="205" stroke="#0984e3" strokeWidth="1.5" strokeLinecap="round" opacity="0.3" />
        </g>
      </g>

      {/* Stars scattered */}
      {[
        { x: 80, y: 150, s: 8, d: "1.5s" },
        { x: 450, y: 80, s: 10, d: "2s" },
        { x: 520, y: 250, s: 7, d: "2.5s" },
        { x: 150, y: 100, s: 6, d: "1.8s" },
        { x: 400, y: 300, s: 9, d: "2.2s" },
        { x: 350, y: 70, s: 7, d: "1.3s" },
        { x: 50, y: 280, s: 5, d: "2.8s" },
        { x: 550, y: 180, s: 6, d: "1.6s" },
      ].map((star, i) => (
        <g key={i} filter="url(#glow)">
          <path
            d={`M${star.x} ${star.y - star.s}L${star.x + star.s * 0.3} ${star.y - star.s * 0.3}L${star.x + star.s} ${star.y}L${star.x + star.s * 0.3} ${star.y + star.s * 0.3}L${star.x} ${star.y + star.s}L${star.x - star.s * 0.3} ${star.y + star.s * 0.3}L${star.x - star.s} ${star.y}L${star.x - star.s * 0.3} ${star.y - star.s * 0.3}Z`}
            fill={i % 2 === 0 ? "#e84393" : "#74b9ff"}
            opacity="0.7"
          >
            <animate
              attributeName="opacity"
              values="0.3;0.9;0.3"
              dur={star.d}
              repeatCount="indefinite"
            />
            <animateTransform
              attributeName="transform"
              type="scale"
              values="0.8;1.1;0.8"
              dur={star.d}
              repeatCount="indefinite"
              additive="sum"
            />
          </path>
        </g>
      ))}

      {/* Fairy dust trail behind envelope */}
      {[...Array(12)].map((_, i) => (
        <circle
          key={`dust-${i}`}
          cx={190 + Math.random() * 80}
          cy={180 + Math.random() * 60}
          r={1 + Math.random() * 2}
          fill={i % 3 === 0 ? "#e84393" : i % 3 === 1 ? "#fd79a8" : "#74b9ff"}
          opacity={0.3 + Math.random() * 0.4}
        >
          <animate
            attributeName="opacity"
            values={`${0.2 + Math.random() * 0.3};${0.6 + Math.random() * 0.3};${0.2 + Math.random() * 0.3}`}
            dur={`${1.5 + Math.random() * 2}s`}
            repeatCount="indefinite"
          />
        </circle>
      ))}
    </svg>
  );
}

export function UnicornWriter({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 400 400"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="uw-bg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#f0f4ff" />
          <stop offset="100%" stopColor="#fdf2f8" />
        </linearGradient>
        <filter id="uw-glow">
          <feGaussianBlur stdDeviation="4" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      <rect width="400" height="400" fill="url(#uw-bg)" rx="20" />

      {/* Desk */}
      <rect x="80" y="260" width="240" height="12" rx="3" fill="#1a1a3e" opacity="0.1" />
      <rect x="90" y="272" width="8" height="60" rx="2" fill="#1a1a3e" opacity="0.08" />
      <rect x="302" y="272" width="8" height="60" rx="2" fill="#1a1a3e" opacity="0.08" />

      {/* Letter on desk */}
      <rect x="130" y="230" width="70" height="40" rx="3" fill="white" stroke="#e84393" strokeWidth="1.5" transform="rotate(-5, 165, 250)" />
      <line x1="140" y1="242" x2="185" y2="240" stroke="#74b9ff" strokeWidth="1" opacity="0.4" />
      <line x1="142" y1="250" x2="178" y2="248" stroke="#74b9ff" strokeWidth="1" opacity="0.3" />

      {/* Stack of letters */}
      <rect x="240" y="238" width="50" height="30" rx="2" fill="#fdf2f8" stroke="#fd79a8" strokeWidth="1" transform="rotate(8, 265, 253)" />
      <rect x="243" y="235" width="50" height="30" rx="2" fill="#f0f4ff" stroke="#74b9ff" strokeWidth="1" transform="rotate(3, 268, 250)" />
      <rect x="245" y="232" width="50" height="30" rx="2" fill="white" stroke="#e84393" strokeWidth="1" />

      {/* Unicorn body */}
      <ellipse cx="200" cy="210" rx="45" ry="35" fill="white" stroke="#dfe6f6" strokeWidth="1.5" />

      {/* Unicorn head */}
      <ellipse cx="195" cy="160" rx="28" ry="25" fill="white" stroke="#dfe6f6" strokeWidth="1.5" />

      {/* Horn */}
      <path d="M195 135L200 105L190 135" fill="#e84393" stroke="#e84393" strokeWidth="1" />
      <line x1="193" y1="128" x2="199" y2="128" stroke="white" strokeWidth="1" opacity="0.6" />
      <line x1="194" y1="120" x2="198" y2="120" stroke="white" strokeWidth="1" opacity="0.6" />

      {/* Mane */}
      <path d="M175 140C168 145 165 155 168 170" stroke="#e84393" strokeWidth="3" strokeLinecap="round" fill="none" />
      <path d="M178 138C170 142 162 150 163 165" stroke="#fd79a8" strokeWidth="2.5" strokeLinecap="round" fill="none" />
      <path d="M182 137C175 143 170 155 172 168" stroke="#e84393" strokeWidth="2" strokeLinecap="round" fill="none" opacity="0.7" />

      {/* Eye */}
      <circle cx="205" cy="155" r="4" fill="#1a1a3e" />
      <circle cx="206.5" cy="153.5" r="1.5" fill="white" />

      {/* Smile */}
      <path d="M208 165C210 168 215 168 217 165" stroke="#1a1a3e" strokeWidth="1.5" strokeLinecap="round" fill="none" />

      {/* Front leg holding quill */}
      <path d="M220 210C225 225 230 235 225 250" stroke="#dfe6f6" strokeWidth="8" strokeLinecap="round" fill="white" />

      {/* Quill */}
      <line x1="228" y1="220" x2="160" y2="260" stroke="#0984e3" strokeWidth="2" strokeLinecap="round" />
      <path d="M228 220L240 208L235 225Z" fill="#0984e3" opacity="0.8" />
      <path d="M240 208L245 200" stroke="#74b9ff" strokeWidth="1" strokeLinecap="round" />

      {/* Ink jar */}
      <rect x="100" y="245" width="18" height="18" rx="3" fill="#0984e3" opacity="0.8" />
      <ellipse cx="109" cy="245" rx="10" ry="3" fill="#0652a8" />

      {/* Tail */}
      <path d="M155 215C140 210 130 220 125 235" stroke="#e84393" strokeWidth="3" strokeLinecap="round" fill="none" />
      <path d="M155 218C138 215 128 225 125 240" stroke="#fd79a8" strokeWidth="2.5" strokeLinecap="round" fill="none" />
      <path d="M155 220C142 220 132 228 130 242" stroke="#74b9ff" strokeWidth="2" strokeLinecap="round" fill="none" />

      {/* Sparkles around */}
      {[
        { x: 100, y: 130, s: 6, c: "#e84393" },
        { x: 310, y: 150, s: 8, c: "#74b9ff" },
        { x: 320, y: 210, s: 5, c: "#fd79a8" },
        { x: 85, y: 200, s: 7, c: "#0984e3" },
        { x: 280, y: 120, s: 5, c: "#e84393" },
      ].map((s, i) => (
        <path
          key={i}
          d={`M${s.x} ${s.y - s.s}L${s.x + s.s * 0.25} ${s.y - s.s * 0.25}L${s.x + s.s} ${s.y}L${s.x + s.s * 0.25} ${s.y + s.s * 0.25}L${s.x} ${s.y + s.s}L${s.x - s.s * 0.25} ${s.y + s.s * 0.25}L${s.x - s.s} ${s.y}L${s.x - s.s * 0.25} ${s.y - s.s * 0.25}Z`}
          fill={s.c}
          opacity="0.6"
        >
          <animate attributeName="opacity" values="0.3;0.8;0.3" dur={`${1.5 + i * 0.4}s`} repeatCount="indefinite" />
        </path>
      ))}

      {/* Candle */}
      <rect x="310" y="230" width="8" height="25" rx="2" fill="#fdf2f8" stroke="#fd79a8" strokeWidth="1" />
      <ellipse cx="314" cy="228" rx="6" ry="4" fill="#e84393" opacity="0.6">
        <animate attributeName="ry" values="3;5;3" dur="1s" repeatCount="indefinite" />
        <animate attributeName="opacity" values="0.4;0.7;0.4" dur="1s" repeatCount="indefinite" />
      </ellipse>
      <ellipse cx="314" cy="225" rx="3" ry="5" fill="#fd79a8" opacity="0.4">
        <animate attributeName="ry" values="4;6;4" dur="0.8s" repeatCount="indefinite" />
      </ellipse>
    </svg>
  );
}

export function PropsLayout({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 600 300"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="props-bg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#fdf2f8" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#f0f4ff" stopOpacity="0.5" />
        </linearGradient>
      </defs>

      <rect width="600" height="300" fill="url(#props-bg)" rx="16" />

      {/* Treasure map scroll */}
      <g transform="translate(60, 80)">
        <rect x="0" y="10" width="80" height="100" rx="3" fill="#fdf2f8" stroke="#e84393" strokeWidth="1.5" />
        <ellipse cx="0" cy="60" rx="8" ry="50" fill="#fdf2f8" stroke="#e84393" strokeWidth="1.5" />
        <ellipse cx="80" cy="60" rx="8" ry="50" fill="#fdf2f8" stroke="#e84393" strokeWidth="1.5" />
        {/* Map details */}
        <path d="M20 40L40 35L55 50L65 45" stroke="#e84393" strokeWidth="1" opacity="0.4" strokeDasharray="3,3" />
        <circle cx="65" cy="45" r="4" fill="#e84393" opacity="0.3" />
        <path d="M60 41L65 36L70 41" stroke="#e84393" strokeWidth="1" opacity="0.5" />
        <text x="25" y="85" fontSize="8" fill="#e84393" opacity="0.5" fontFamily="serif" fontStyle="italic">treasure!</text>
      </g>

      {/* Fairy dust vial */}
      <g transform="translate(200, 90)">
        <rect x="15" y="0" width="30" height="8" rx="2" fill="#74b9ff" opacity="0.6" />
        <rect x="10" y="8" width="40" height="80" rx="6" fill="white" stroke="#74b9ff" strokeWidth="1.5" />
        {/* Glitter inside */}
        {[...Array(15)].map((_, i) => (
          <circle
            key={i}
            cx={18 + Math.random() * 24}
            cy={25 + Math.random() * 55}
            r={1 + Math.random() * 2}
            fill={i % 3 === 0 ? "#e84393" : i % 3 === 1 ? "#74b9ff" : "#a29bfe"}
            opacity={0.4 + Math.random() * 0.4}
          >
            <animate attributeName="opacity" values="0.3;0.8;0.3" dur={`${1 + Math.random() * 2}s`} repeatCount="indefinite" />
          </circle>
        ))}
        <text x="8" y="110" fontSize="9" fill="#0984e3" opacity="0.6" fontFamily="sans-serif" textAnchor="start">fairy dust</text>
      </g>

      {/* Sticker sheet */}
      <g transform="translate(310, 70)">
        <rect x="0" y="0" width="90" height="110" rx="6" fill="white" stroke="#dfe6f6" strokeWidth="1.5" />
        {/* Star sticker */}
        <path d="M25 25L28 18L31 25L38 25L33 30L35 37L28 33L21 37L23 30L18 25Z" fill="#e84393" opacity="0.7" />
        {/* Heart sticker */}
        <path d="M65 22C65 18 60 15 57 18C54 15 49 18 49 22C49 28 57 33 57 33C57 33 65 28 65 22Z" fill="#fd79a8" opacity="0.7" />
        {/* Moon sticker */}
        <path d="M25 55C25 45 33 38 43 38C36 38 30 45 30 55C30 65 36 72 43 72C33 72 25 65 25 55Z" fill="#74b9ff" opacity="0.6" />
        {/* Unicorn sticker (simple) */}
        <circle cx="65" cy="60" r="10" fill="#fdf2f8" stroke="#fd79a8" strokeWidth="1" />
        <path d="M65 50L67 44L63 50" fill="#e84393" />
        <circle cx="67" cy="58" r="1.5" fill="#1a1a3e" />
        <text x="20" y="100" fontSize="9" fill="#e84393" opacity="0.6" fontFamily="sans-serif">stickers!</text>
      </g>

      {/* Unicorn poop (coloured cotton balls) */}
      <g transform="translate(470, 85)">
        <path d="M20 90C10 90 0 80 5 70L30 30C32 26 38 26 40 30L65 70C70 80 60 90 50 90Z" fill="#fdf2f8" stroke="#fd79a8" strokeWidth="1.5" />
        <circle cx="25" cy="65" r="8" fill="#fd79a8" opacity="0.5" />
        <circle cx="40" cy="60" r="9" fill="#e84393" opacity="0.4" />
        <circle cx="35" cy="75" r="7" fill="#a29bfe" opacity="0.5" />
        <circle cx="50" cy="70" r="6" fill="#74b9ff" opacity="0.4" />
        <circle cx="30" cy="50" r="5" fill="#fd79a8" opacity="0.3" />
        <text x="10" y="110" fontSize="9" fill="#e84393" opacity="0.6" fontFamily="sans-serif">unicorn poop</text>
      </g>

      {/* Scattered sparkles */}
      {[
        { x: 170, y: 50 }, { x: 290, y: 40 }, { x: 450, y: 60 },
        { x: 550, y: 200 }, { x: 30, y: 200 }, { x: 180, y: 240 },
      ].map((s, i) => (
        <path
          key={i}
          d={`M${s.x} ${s.y - 4}L${s.x + 1} ${s.y - 1}L${s.x + 4} ${s.y}L${s.x + 1} ${s.y + 1}L${s.x} ${s.y + 4}L${s.x - 1} ${s.y + 1}L${s.x - 4} ${s.y}L${s.x - 1} ${s.y - 1}Z`}
          fill={i % 2 === 0 ? "#e84393" : "#74b9ff"}
          opacity="0.5"
        >
          <animate attributeName="opacity" values="0.2;0.7;0.2" dur={`${1.5 + i * 0.3}s`} repeatCount="indefinite" />
        </path>
      ))}
    </svg>
  );
}

export function LetterboxMoment({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 400 300"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="lb-bg" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#74b9ff" stopOpacity="0.1" />
          <stop offset="100%" stopColor="#fdf2f8" stopOpacity="0.3" />
        </linearGradient>
      </defs>

      <rect width="400" height="300" fill="url(#lb-bg)" rx="16" />

      {/* Letterbox */}
      <rect x="155" y="100" width="90" height="70" rx="8" fill="#1a1a3e" opacity="0.85" />
      <rect x="160" y="130" width="80" height="8" rx="4" fill="#0984e3" opacity="0.4" />
      <rect x="155" y="170" width="90" height="100" rx="0" fill="#1a1a3e" opacity="0.7" />
      <rect x="195" y="170" width="8" height="100" rx="4" fill="#0984e3" opacity="0.2" />

      {/* Post */}
      <rect x="192" y="270" width="16" height="30" fill="#1a1a3e" opacity="0.5" />

      {/* Letter poking out! */}
      <g>
        <animateTransform
          attributeName="transform"
          type="translate"
          values="0,0; 0,-5; 0,0"
          dur="3s"
          repeatCount="indefinite"
        />
        <rect x="170" y="95" width="65" height="45" rx="3" fill="white" stroke="#e84393" strokeWidth="2" transform="rotate(-8, 200, 117)" />
        <circle cx="215" cy="125" r="6" fill="#e84393" transform="rotate(-8, 200, 117)" />
        <circle cx="215" cy="125" r="3.5" fill="#fd79a8" transform="rotate(-8, 200, 117)" />
      </g>

      {/* Sparkles bursting from letterbox */}
      {[
        { x: 145, y: 100, d: "1.5s" },
        { x: 255, y: 95, d: "2s" },
        { x: 140, y: 130, d: "1.8s" },
        { x: 260, y: 120, d: "2.3s" },
        { x: 200, y: 80, d: "1.4s" },
        { x: 170, y: 75, d: "2.1s" },
        { x: 235, y: 85, d: "1.7s" },
      ].map((s, i) => (
        <path
          key={i}
          d={`M${s.x} ${s.y - 5}L${s.x + 1.5} ${s.y - 1.5}L${s.x + 5} ${s.y}L${s.x + 1.5} ${s.y + 1.5}L${s.x} ${s.y + 5}L${s.x - 1.5} ${s.y + 1.5}L${s.x - 5} ${s.y}L${s.x - 1.5} ${s.y - 1.5}Z`}
          fill={i % 3 === 0 ? "#e84393" : i % 3 === 1 ? "#74b9ff" : "#fd79a8"}
          opacity="0.6"
        >
          <animate attributeName="opacity" values="0.2;0.9;0.2" dur={s.d} repeatCount="indefinite" />
        </path>
      ))}

      {/* Ground / grass */}
      <ellipse cx="200" cy="300" rx="180" ry="15" fill="#74b9ff" opacity="0.08" />
    </svg>
  );
}
