"use client";

import { useEffect, useRef, useState } from "react";

const items = [
  {
    name: "The Letter",
    desc: "Printed on premium stock. Your words, their name, AI-crafted illustrations. Every one is unique.",
    color: "#e84393",
    icon: (
      <svg viewBox="0 0 100 100" fill="none" className="w-full h-full">
        <rect x="15" y="20" width="70" height="55" stroke="#e84393" strokeWidth="2" fill="none" />
        <path d="M15 25L50 50L85 25" stroke="#e84393" strokeWidth="2" strokeLinecap="round" fill="none" />
        <line x1="30" y1="45" x2="55" y2="45" stroke="#e84393" strokeWidth="1" opacity="0.3" />
        <line x1="30" y1="52" x2="50" y2="52" stroke="#00d4ff" strokeWidth="1" opacity="0.2" />
        <circle cx="50" cy="68" r="6" fill="#e84393" opacity="0.6" />
        <path d="M48 68L50 66L52 68L50 70Z" fill="white" opacity="0.6" />
      </svg>
    ),
  },
  {
    name: "Fairy Dust",
    desc: "A sachet of biodegradable glitter. Because no magic letter is complete without a little sparkle explosion.",
    color: "#00d4ff",
    icon: (
      <svg viewBox="0 0 100 100" fill="none" className="w-full h-full">
        <rect x="30" y="15" width="40" height="10" rx="0" fill="#00d4ff" opacity="0.3" stroke="#00d4ff" strokeWidth="1" />
        <rect x="25" y="25" width="50" height="55" rx="0" fill="none" stroke="#00d4ff" strokeWidth="2" />
        {[...Array(20)].map((_, i) => {
          const cx = 30 + (i * 17) % 40;
          const cy = 35 + (i * 23) % 38;
          const colors = ["#e84393", "#00d4ff", "#6c5ce7", "#fd79a8", "#ff2d95"];
          return (
            <circle key={i} cx={cx} cy={cy} r={1 + (i % 3)} fill={colors[i % colors.length]} opacity={0.5 + (i % 3) * 0.15}>
              <animate attributeName="opacity" values={`${0.3};${0.9};${0.3}`} dur={`${1 + i * 0.15}s`} repeatCount="indefinite" />
            </circle>
          );
        })}
      </svg>
    ),
  },
  {
    name: "Treasure Maps",
    desc: "Hand-drawn scrolls that connect to the story. Clues, paths, and X marks the spot. They'll study these for hours.",
    color: "#6c5ce7",
    icon: (
      <svg viewBox="0 0 100 100" fill="none" className="w-full h-full">
        <rect x="15" y="20" width="70" height="65" rx="0" fill="none" stroke="#6c5ce7" strokeWidth="2" />
        <rect x="10" y="20" width="5" height="65" fill="#6c5ce7" opacity="0.15" />
        <rect x="85" y="20" width="5" height="65" fill="#6c5ce7" opacity="0.15" />
        <path d="M30 40L45 35L60 50L75 42" stroke="#6c5ce7" strokeWidth="1.5" opacity="0.6" strokeDasharray="4,3" />
        <circle cx="75" cy="42" r="5" fill="none" stroke="#e84393" strokeWidth="1" opacity="0.5" />
        <path d="M72 39L75 35L78 39" stroke="#e84393" strokeWidth="1" opacity="0.6" />
        <line x1="25" y1="60" x2="55" y2="60" stroke="#6c5ce7" strokeWidth="0.5" opacity="0.3" />
        <line x1="25" y1="67" x2="45" y2="67" stroke="#6c5ce7" strokeWidth="0.5" opacity="0.2" />
      </svg>
    ),
  },
  {
    name: "Unicorn Poop",
    desc: "Colourful cotton balls in a tiny bag. Yes, really. Kids lose their minds. Parents roll their eyes and smile.",
    color: "#fd79a8",
    icon: (
      <svg viewBox="0 0 100 100" fill="none" className="w-full h-full">
        <path d="M25 80C15 80 10 70 15 62L38 28C40 24 46 24 48 28L73 62C78 70 73 80 63 80Z" fill="none" stroke="#fd79a8" strokeWidth="2" />
        <circle cx="35" cy="58" r="8" fill="#e84393" opacity="0.35">
          <animate attributeName="opacity" values="0.2;0.5;0.2" dur="2s" repeatCount="indefinite" />
        </circle>
        <circle cx="50" cy="52" r="9" fill="#6c5ce7" opacity="0.3">
          <animate attributeName="opacity" values="0.3;0.5;0.3" dur="1.5s" repeatCount="indefinite" />
        </circle>
        <circle cx="45" cy="68" r="7" fill="#00d4ff" opacity="0.35">
          <animate attributeName="opacity" values="0.2;0.45;0.2" dur="1.8s" repeatCount="indefinite" />
        </circle>
        <circle cx="58" cy="64" r="6" fill="#fd79a8" opacity="0.3">
          <animate attributeName="opacity" values="0.25;0.5;0.25" dur="2.2s" repeatCount="indefinite" />
        </circle>
        <circle cx="40" cy="45" r="5" fill="#e84393" opacity="0.2" />
      </svg>
    ),
  },
  {
    name: "Sticker Sheets",
    desc: "Characters from their story. They end up on everything — lunchboxes, windows, foreheads, the dog.",
    color: "#ff2d95",
    icon: (
      <svg viewBox="0 0 100 100" fill="none" className="w-full h-full">
        <rect x="15" y="15" width="70" height="70" rx="0" fill="none" stroke="#ff2d95" strokeWidth="1.5" />
        {/* Star */}
        <path d="M35 30L38 23L41 30L48 30L43 35L45 42L38 38L31 42L33 35L28 30Z" fill="#e84393" opacity="0.7">
          <animate attributeName="opacity" values="0.5;0.9;0.5" dur="2s" repeatCount="indefinite" />
        </path>
        {/* Heart */}
        <path d="M65 27C65 23 60 20 57 23C54 20 49 23 49 27C49 33 57 38 57 38C57 38 65 33 65 27Z" fill="#00d4ff" opacity="0.6" />
        {/* Moon */}
        <path d="M30 55C30 47 36 40 44 40C38 40 33 47 33 55C33 63 38 70 44 70C36 70 30 63 30 55Z" fill="#6c5ce7" opacity="0.5" />
        {/* Skull (punk!) */}
        <circle cx="65" cy="60" r="10" fill="none" stroke="#ff2d95" strokeWidth="1" />
        <circle cx="61" cy="57" r="2" fill="#ff2d95" />
        <circle cx="69" cy="57" r="2" fill="#ff2d95" />
        <line x1="63" y1="66" x2="67" y2="66" stroke="#ff2d95" strokeWidth="1" />
      </svg>
    ),
  },
  {
    name: "Magic Coins",
    desc: "Foil-stamped cardboard tokens. Collect them across the story arc. Some say they unlock a secret at the end.",
    color: "#74b9ff",
    icon: (
      <svg viewBox="0 0 100 100" fill="none" className="w-full h-full">
        <circle cx="50" cy="50" r="30" stroke="#74b9ff" strokeWidth="2" fill="none" />
        <circle cx="50" cy="50" r="24" stroke="#74b9ff" strokeWidth="0.5" fill="none" opacity="0.3" />
        <path d="M50 30L53 42L66 42L56 49L59 62L50 54L41 62L44 49L34 42L47 42Z" fill="#74b9ff" opacity="0.5">
          <animate attributeName="opacity" values="0.3;0.7;0.3" dur="3s" repeatCount="indefinite" />
        </path>
      </svg>
    ),
  },
];

export default function MagicMailReveal() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let rafId: number;
    const onScroll = () => {
      rafId = requestAnimationFrame(() => {
        if (!sectionRef.current) return;
        const rect = sectionRef.current.getBoundingClientRect();
        const h = sectionRef.current.offsetHeight;
        const vh = window.innerHeight;
        const p = Math.max(0, Math.min(1, -rect.top / (h - vh)));
        setProgress(p);
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => { window.removeEventListener("scroll", onScroll); cancelAnimationFrame(rafId); };
  }, []);

  return (
    <section ref={sectionRef} className="relative bg-background" style={{ height: "400vh" }}>
      <div className="sticky top-0 h-screen overflow-hidden flex items-center justify-center">
        {/* Background glow that intensifies */}
        <div
          className="absolute inset-0"
          style={{
            background: `radial-gradient(circle at 50% 50%, #e8439308 0%, transparent 60%)`,
            opacity: progress * 2,
          }}
        />

        {/* Floating particles that appear as you scroll */}
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(30)].map((_, i) => {
            const x = 10 + (i * 31) % 80;
            const y = 10 + (i * 47) % 80;
            const colors = ["#e84393", "#00d4ff", "#6c5ce7", "#fd79a8", "#ff2d95"];
            const appearAt = (i / 30) * 0.6;
            const opacity = Math.max(0, Math.min(0.5, (progress - appearAt) * 2));
            const floatY = Math.sin((progress * 10) + i) * 15;
            return (
              <div
                key={i}
                className="absolute"
                style={{
                  left: `${x}%`,
                  top: `${y}%`,
                  opacity,
                  transform: `translateY(${floatY}px)`,
                }}
              >
                <svg width="8" height="8" viewBox="0 0 8 8">
                  <path d="M4 0L4.8 3.2L8 4L4.8 4.8L4 8L3.2 4.8L0 4L3.2 3.2Z" fill={colors[i % colors.length]} />
                </svg>
              </div>
            );
          })}
        </div>

        <div className="relative z-10 w-full max-w-5xl mx-auto px-6">
          {/* Title — fades in early */}
          <div
            className="text-center mb-16"
            style={{
              opacity: Math.min(1, progress * 5),
              transform: `translateY(${Math.max(0, (1 - progress * 5) * 40)}px)`,
            }}
          >
            <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tight text-white mb-4">
              What&apos;s inside the<br />
              <span className="text-pink-neon animate-neon">magic mail?</span>
            </h2>
            <p className="text-lg text-white/40 max-w-xl mx-auto">
              Every letter comes with a piece of the story you can hold.
            </p>
          </div>

          {/* Items grid — each appears at different scroll points */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">
            {items.map((item, i) => {
              const appearAt = 0.15 + (i / items.length) * 0.5;
              const itemProgress = Math.max(0, Math.min(1, (progress - appearAt) * 3));
              const ease = itemProgress < 0.5
                ? 2 * itemProgress * itemProgress
                : 1 - Math.pow(-2 * itemProgress + 2, 2) / 2;

              return (
                <div
                  key={i}
                  className="text-center"
                  style={{
                    opacity: ease,
                    transform: `translateY(${(1 - ease) * 60}px) scale(${0.85 + ease * 0.15})`,
                  }}
                >
                  {/* Icon with glow */}
                  <div
                    className="w-24 h-24 md:w-28 md:h-28 mx-auto mb-4 relative"
                    style={{
                      filter: `drop-shadow(0 0 ${15 + ease * 15}px ${item.color}${Math.round(ease * 60).toString(16).padStart(2, "0")})`,
                    }}
                  >
                    {/* Rotating ring */}
                    <svg
                      className="absolute inset-0 w-full h-full"
                      viewBox="0 0 100 100"
                      style={{
                        transform: `rotate(${progress * 360 + i * 60}deg)`,
                        opacity: ease * 0.3,
                      }}
                    >
                      <circle cx="50" cy="50" r="48" stroke={item.color} strokeWidth="0.5" fill="none" strokeDasharray="8,12" />
                    </svg>
                    {item.icon}
                  </div>
                  <h3
                    className="text-sm md:text-base font-black uppercase tracking-wider mb-2"
                    style={{ color: item.color }}
                  >
                    {item.name}
                  </h3>
                  <p className="text-xs md:text-sm text-white/40 leading-relaxed max-w-[200px] mx-auto">
                    {item.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Holographic line at bottom */}
        <div
          className="absolute bottom-0 left-0 w-full h-[1px] holographic"
          style={{ opacity: progress > 0.8 ? (progress - 0.8) * 5 : 0 }}
        />
      </div>
    </section>
  );
}
