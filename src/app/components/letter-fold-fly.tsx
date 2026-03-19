"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

export default function LetterFoldFly() {
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
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(rafId);
    };
  }, []);

  const ease = (t: number) =>
    t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

  // ─── PHASE CALCULATIONS ───

  // Phase 1: 0.00–0.20 — Letter floats in with glow
  const revealRaw = Math.min(1, progress / 0.2);
  const reveal = ease(revealRaw);

  // Phase 2: 0.20–0.40 — Letter gently compresses and glow intensifies
  const compressRaw = Math.max(0, Math.min(1, (progress - 0.2) / 0.2));
  const compress = ease(compressRaw);

  // Phase 3: 0.40–0.50 — Envelope wraps, wax seal stamps with shockwave
  const sealRaw = Math.max(0, Math.min(1, (progress - 0.4) / 0.1));
  const seal = ease(sealRaw);

  // Phase 4: 0.50–0.55 — Brief pause, envelope glows
  const pauseGlow = progress >= 0.5 && progress <= 0.55 ? 1 : 0;

  // Phase 5: 0.55–0.90 — Dreamy flight
  const flightRaw = Math.max(0, Math.min(1, (progress - 0.55) / 0.35));
  const flight = ease(flightRaw);

  // Phase 6: 0.90–1.00 — Starburst and text
  const burstRaw = Math.max(0, Math.min(1, (progress - 0.88) / 0.12));
  const burst = ease(burstRaw);

  // ─── DERIVED VALUES ───

  // Letter
  const letterScale = 1 - compress * 0.55;
  const letterOpacity = compress > 0.9 ? Math.max(0, 1 - (compress - 0.9) / 0.1) : 1;
  const letterFloat = Math.sin(progress * 6) * 3 * (1 - compress);
  const letterGlow = 20 + compress * 40;

  // Aura pulse
  const auraPulse = Math.sin(progress * 12) * 0.15 + 0.3;
  const auraSize = 100 + compress * 50;

  // Envelope
  const envelopeVisible = compress > 0.6;
  const envelopeOpacity = envelopeVisible ? Math.min(1, (compress - 0.6) / 0.3) : 0;
  const envelopeScale = 0.85 + seal * 0.15;

  // Seal shockwave
  const shockwaveSize = seal * 300;
  const shockwaveOpacity = seal < 0.5 ? seal * 2 : Math.max(0, 1 - (seal - 0.5) * 2.5);

  // Flight path — wobble with sine curves
  const flightY = flight * -500;
  const flightX = Math.sin(flight * Math.PI * 3) * 30 * (1 - flight * 0.7);
  const flightRotate = Math.sin(flight * Math.PI * 2.5) * 8 * (1 - flight);
  const flightScale = 1 - flight * 0.8;
  const flightOpacity = flight > 0.8 ? Math.max(0, 1 - (flight - 0.8) / 0.2) : 1;

  // Overall envelope/letter container
  const isFlying = progress > 0.55;
  const showLetter = progress < 0.48;
  const showEnvelope = progress > 0.35;

  // Starburst
  const starburstScale = burst * 3;
  const starburstOpacity = burst < 0.3 ? burst / 0.3 : Math.max(0, 1 - (burst - 0.3) / 0.7);

  // "On its way" text
  const textOpacity = Math.max(0, Math.min(1, (progress - 0.92) / 0.08));

  // Title
  const titleOpacity =
    progress < 0.05 ? progress / 0.05 : progress > 0.3 ? Math.max(0, 1 - (progress - 0.3) / 0.08) : 1;

  // Background stars that appear during flight
  const starsVisible = progress > 0.5;

  return (
    <section ref={sectionRef} className="relative bg-gray-900" style={{ height: "800vh" }}>
      <div className="absolute left-0 top-0 w-full h-[1px] holographic" />

      <div className="sticky top-0 h-screen overflow-hidden flex items-center justify-center">
        {/* Background darkens and stars appear during flight */}
        <div
          className="absolute inset-0 transition-none"
          style={{
            background: starsVisible
              ? `radial-gradient(circle at ${50 + flightX * 0.3}% ${50 + flightY * 0.05}%, #e8439308 0%, transparent 40%), linear-gradient(to bottom, #0a0a14, #111111)`
              : "#111111",
          }}
        />

        {/* Stars field — fades in during flight */}
        {starsVisible && (
          <div className="absolute inset-0 pointer-events-none" style={{ opacity: flight * 0.8 }}>
            {[...Array(40)].map((_, i) => {
              const x = (i * 37 + 13) % 100;
              const y = (i * 53 + 7) % 100;
              const s = 1 + (i % 3);
              const colors = ["#ffffff", "#e84393", "#00d4ff", "#6c5ce7", "#fd79a8"];
              const twinkle = Math.sin(progress * 15 + i * 1.7) * 0.4 + 0.5;
              return (
                <div
                  key={`star-${i}`}
                  className="absolute rounded-full"
                  style={{
                    left: `${x}%`,
                    top: `${y}%`,
                    width: s,
                    height: s,
                    backgroundColor: colors[i % colors.length],
                    opacity: twinkle * (i < 20 ? 1 : flight),
                    boxShadow: `0 0 ${s * 3}px ${colors[i % colors.length]}`,
                  }}
                />
              );
            })}
          </div>
        )}

        <div className="relative z-10 w-full max-w-3xl mx-auto px-6">
          {/* Title */}
          <div style={{ opacity: titleOpacity, transform: `translateY(${(1 - reveal) * 30}px)` }}>
            <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tight text-white mb-4 text-center">
              This is a <span className="text-pink-neon">real letter.</span>
            </h2>
            <p className="text-center text-white/40 mb-12 text-lg">
              AI-crafted. Human-hearted. Illustrated. Personalised. Printed and posted.
            </p>
          </div>

          {/* Main container — holds letter, envelope, and effects */}
          <div
            className="relative max-w-2xl mx-auto"
            style={{
              transform: isFlying
                ? `translateY(${flightY}px) translateX(${flightX}px) scale(${flightScale}) rotate(${flightRotate}deg)`
                : `translateY(${letterFloat}px)`,
              opacity: isFlying ? flightOpacity : reveal,
            }}
          >
            {/* Magical aura behind the letter */}
            <div
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full pointer-events-none"
              style={{
                width: auraSize * 2,
                height: auraSize * 2,
                background: `radial-gradient(circle, #e8439320 0%, #00d4ff10 40%, transparent 70%)`,
                opacity: auraPulse + (pauseGlow ? 0.3 : 0),
                filter: `blur(30px)`,
              }}
            />

            {/* Seal shockwave */}
            {progress > 0.4 && progress < 0.55 && (
              <div
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full pointer-events-none"
                style={{
                  width: shockwaveSize,
                  height: shockwaveSize,
                  border: "2px solid #e84393",
                  opacity: shockwaveOpacity * 0.6,
                  boxShadow: `0 0 30px #e8439340, inset 0 0 30px #e8439320`,
                }}
              />
            )}
            {progress > 0.42 && progress < 0.55 && (
              <div
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full pointer-events-none"
                style={{
                  width: shockwaveSize * 0.7,
                  height: shockwaveSize * 0.7,
                  border: "1px solid #00d4ff",
                  opacity: shockwaveOpacity * 0.4,
                }}
              />
            )}

            {/* Seal burst particles */}
            {progress > 0.4 && progress < 0.58 && (
              <div className="absolute inset-0 pointer-events-none">
                {[...Array(20)].map((_, i) => {
                  const angle = (i / 20) * 360;
                  const rad = (angle * Math.PI) / 180;
                  const dist = seal * 150;
                  const px = 50 + Math.cos(rad) * dist * 0.15;
                  const py = 50 + Math.sin(rad) * dist * 0.15;
                  const colors = ["#e84393", "#00d4ff", "#ff2d95", "#6c5ce7", "#fd79a8", "#ffffff"];
                  return (
                    <div
                      key={`seal-p-${i}`}
                      className="absolute"
                      style={{
                        left: `${px}%`,
                        top: `${py}%`,
                        opacity: shockwaveOpacity,
                      }}
                    >
                      <svg width="6" height="6" viewBox="0 0 6 6">
                        <path d="M3 0L3.6 2.4L6 3L3.6 3.6L3 6L2.4 3.6L0 3L2.4 2.4Z" fill={colors[i % colors.length]} />
                      </svg>
                    </div>
                  );
                })}
              </div>
            )}

            {/* THE LETTER */}
            {showLetter && (
              <div
                className="relative z-10"
                style={{
                  transform: `scaleY(${letterScale}) scaleX(${1 - compress * 0.1})`,
                  opacity: letterOpacity,
                  transformOrigin: "center center",
                }}
              >
                <div
                  className="overflow-hidden"
                  style={{
                    boxShadow: `0 0 ${letterGlow}px #e8439330, 0 0 ${letterGlow * 2}px #e8439315`,
                    border: "1px solid #e8439360",
                  }}
                >
                  <Image
                    src="/brand/first-letter.png"
                    alt="A real Wonderpunk letter"
                    width={800}
                    height={1100}
                    className="w-full h-auto"
                    priority
                  />
                </div>
              </div>
            )}

            {/* THE ENVELOPE */}
            {showEnvelope && (
              <div
                className="relative z-20"
                style={{
                  opacity: envelopeOpacity,
                  transform: `scale(${envelopeScale})`,
                  marginTop: showLetter ? "-30%" : "0",
                }}
              >
                <svg viewBox="0 0 600 380" className="w-full" fill="none">
                  {/* Envelope body */}
                  <rect
                    x="10"
                    y="10"
                    width="580"
                    height="360"
                    fill="#12121e"
                    stroke="#e84393"
                    strokeWidth="2"
                  />
                  {/* Inner shadow */}
                  <rect x="20" y="20" width="560" height="340" fill="none" stroke="#e84393" strokeWidth="0.3" opacity="0.15" />

                  {/* Flap (triangle) — closes as seal progresses */}
                  <path
                    d="M10 10L300 200L590 10"
                    fill="#161626"
                    stroke="#e84393"
                    strokeWidth="1.5"
                    opacity={seal > 0 ? 0.9 : 0.3}
                  />

                  {/* Address lines */}
                  <line x1="200" y1="240" x2="400" y2="240" stroke="#e84393" strokeWidth="1" opacity="0.2" />
                  <line x1="220" y1="260" x2="380" y2="260" stroke="#e84393" strokeWidth="1" opacity="0.15" />
                  <line x1="240" y1="280" x2="360" y2="280" stroke="#e84393" strokeWidth="1" opacity="0.1" />

                  {/* Child's name */}
                  <text x="300" y="240" textAnchor="middle" fontSize="18" fill="#e84393" opacity="0.4" fontFamily="Georgia, serif" fontStyle="italic">Miss Joanie</text>

                  {/* Return address */}
                  <text x="30" y="330" fontSize="9" fill="#e84393" opacity="0.25" fontFamily="Georgia, serif" fontStyle="italic">
                    The Office of Magical Correspondence
                  </text>
                  <text x="30" y="345" fontSize="9" fill="#e84393" opacity="0.2" fontFamily="Georgia, serif" fontStyle="italic">
                    Whispering Woods Post Office
                  </text>

                  {/* Wax seal — appears with stamp */}
                  <g
                    transform="translate(300, 180)"
                    opacity={seal}
                    style={{ transform: `translate(300px, 180px) scale(${seal})`, transformOrigin: "300px 180px" }}
                  >
                    <circle cx="0" cy="0" r="24" fill="#e84393" />
                    <circle cx="0" cy="0" r="16" fill="#ff2d95" />
                    <path d="M0 -10L3 -2L10 -2L5 3L7 10L0 6L-7 10L-5 3L-10 -2L-3 -2Z" fill="white" opacity="0.85" />
                    {/* Seal glow */}
                    <circle cx="0" cy="0" r="30" fill="none" stroke="#e84393" strokeWidth="1" opacity={pauseGlow ? 0.5 : 0.2}>
                      {pauseGlow ? null : null}
                    </circle>
                  </g>
                </svg>
              </div>
            )}

            {/* Flight sparkle trail */}
            {isFlying && flight < 0.95 && (
              <div className="absolute inset-0 pointer-events-none z-30">
                {[...Array(24)].map((_, i) => {
                  const trailDelay = i * 0.04;
                  const trailFlight = Math.max(0, flight - trailDelay);
                  const tx = Math.sin(trailFlight * Math.PI * 3 + i * 0.5) * (20 + i * 2);
                  const ty = trailFlight * 200 + i * 15;
                  const colors = ["#e84393", "#00d4ff", "#ff2d95", "#6c5ce7", "#fd79a8", "#ffffff", "#74b9ff", "#a29bfe"];
                  const size = 3 + (i % 4) * 2;
                  const opacity = Math.max(0, 0.8 - i * 0.03 - trailFlight * 0.5);
                  return (
                    <div
                      key={`trail-${i}`}
                      className="absolute left-1/2 top-1/2"
                      style={{
                        transform: `translate(${tx}px, ${ty}px)`,
                        opacity,
                      }}
                    >
                      <svg width={size} height={size} viewBox="0 0 8 8">
                        <path d="M4 0L4.8 3.2L8 4L4.8 4.8L4 8L3.2 4.8L0 4L3.2 3.2Z" fill={colors[i % colors.length]} />
                      </svg>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Starburst when envelope vanishes */}
          {progress > 0.85 && (
            <div className="absolute left-1/2 top-1/3 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
              {/* Central flash */}
              <div
                className="rounded-full"
                style={{
                  width: starburstScale * 60,
                  height: starburstScale * 60,
                  background: `radial-gradient(circle, #ffffff40, #e8439320, transparent)`,
                  opacity: starburstOpacity,
                  filter: `blur(${starburstScale * 5}px)`,
                  transform: "translate(-50%, -50%)",
                }}
              />
              {/* Burst rays */}
              {[...Array(16)].map((_, i) => {
                const angle = (i / 16) * 360;
                const rad = (angle * Math.PI) / 180;
                const dist = burst * 120;
                const x = Math.cos(rad) * dist;
                const y = Math.sin(rad) * dist;
                const colors = ["#e84393", "#00d4ff", "#ff2d95", "#ffffff", "#6c5ce7", "#fd79a8", "#74b9ff", "#a29bfe"];
                return (
                  <div
                    key={`burst-${i}`}
                    className="absolute left-1/2 top-1/2"
                    style={{
                      transform: `translate(${x}px, ${y}px)`,
                      opacity: starburstOpacity,
                    }}
                  >
                    <svg width="8" height="8" viewBox="0 0 8 8">
                      <path d="M4 0L4.8 3.2L8 4L4.8 4.8L4 8L3.2 4.8L0 4L3.2 3.2Z" fill={colors[i % colors.length]} />
                    </svg>
                  </div>
                );
              })}
            </div>
          )}

          {/* "On its way..." text */}
          <div
            className="text-center mt-12"
            style={{
              opacity: textOpacity,
              transform: `translateY(${(1 - textOpacity) * 20}px)`,
            }}
          >
            <p className="text-2xl md:text-4xl font-black uppercase tracking-tight text-white">
              On its way to the <span className="text-pink-neon">letterbox.</span>
            </p>
            <p className="text-white/30 mt-4 text-sm uppercase tracking-[0.3em]">
              Magic, delivered.
            </p>
            <div className="flex items-center justify-center gap-4 mt-8 text-sm text-white/20">
              <span className="border border-pink-neon/40 text-pink-neon px-3 py-1 text-xs font-bold uppercase tracking-wider">
                Ages 3-6
              </span>
              <span>AI-crafted. Human-hearted.</span>
            </div>
          </div>
        </div>

        {/* Ambient floating particles */}
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(15)].map((_, i) => {
            const x = (i * 19 + 5) % 90 + 5;
            const baseY = (i * 29 + 10) % 80 + 10;
            const floatY = Math.sin(progress * 8 + i * 1.3) * 10;
            const floatX = Math.cos(progress * 5 + i * 0.9) * 5;
            const colors = ["#e84393", "#00d4ff", "#6c5ce7", "#fd79a8"];
            const twinkle = Math.sin(progress * 14 + i * 2.1) * 0.25 + 0.2;
            return (
              <div
                key={`ambient-${i}`}
                className="absolute"
                style={{
                  left: `${x + floatX}%`,
                  top: `${baseY + floatY}%`,
                  opacity: twinkle,
                }}
              >
                <svg width="5" height="5" viewBox="0 0 5 5">
                  <path d="M2.5 0L3 2L5 2.5L3 3L2.5 5L2 3L0 2.5L2 2Z" fill={colors[i % colors.length]} />
                </svg>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
