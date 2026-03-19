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
        setProgress(Math.max(0, Math.min(1, -rect.top / (h - vh))));
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => { window.removeEventListener("scroll", onScroll); cancelAnimationFrame(rafId); };
  }, []);

  const ease = (t: number) => t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
  const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

  // ─── PHASES ───
  // 0.00–0.15: Title + letter fade in
  // 0.15–0.30: Letter hovers, aura builds
  // 0.30–0.48: Letter TWISTS (rotateY 0→90°) — edge-on at 90°
  // 0.48–0.50: Snap — letter hidden, envelope revealed (at 90° rotateY, then untwists to 0°)
  // 0.50–0.58: Envelope settles, wax seal stamps, shockwave
  // 0.58–0.62: Glow pause
  // 0.62–0.88: Flight
  // 0.88–1.00: Starburst + text

  const titleIn = ease(Math.min(1, progress / 0.12));
  const titleOut = progress > 0.25 ? Math.max(0, 1 - (progress - 0.25) / 0.06) : 1;
  const titleOpacity = titleIn * titleOut;

  // Letter
  const letterIn = ease(Math.min(1, progress / 0.15));
  const letterHover = Math.sin(progress * 8) * 4 * (progress < 0.3 ? 1 : 0);

  // Twist: 0.30–0.48
  const twistRaw = Math.max(0, Math.min(1, (progress - 0.30) / 0.18));
  const twist = ease(twistRaw);
  const rotateY = twist * 90;
  const letterVisible = progress < 0.48;

  // Aura builds during twist
  const auraIntensity = progress < 0.3 ? 0.15 : lerp(0.15, 0.7, twist);

  // Twist particles — spawn during the twist
  const twistParticles = progress > 0.32 && progress < 0.55;

  // Envelope appears at the midpoint of twist, untwists from 90° to 0°
  const envelopeRaw = Math.max(0, Math.min(1, (progress - 0.47) / 0.08));
  const envelope = ease(envelopeRaw);
  const envelopeRotateY = lerp(90, 0, envelope);
  const envelopeVisible = progress > 0.47;

  // Seal: 0.52–0.58
  const sealRaw = Math.max(0, Math.min(1, (progress - 0.52) / 0.06));
  const seal = ease(sealRaw);
  const sealShock = progress > 0.52 && progress < 0.62;
  const shockProgress = Math.max(0, Math.min(1, (progress - 0.52) / 0.08));

  // Flight: 0.62–0.88
  const flightRaw = Math.max(0, Math.min(1, (progress - 0.62) / 0.26));
  const flight = ease(flightRaw);
  const flightY = flight * -550;
  const flightX = Math.sin(flight * Math.PI * 4) * 40 * (1 - flight * 0.8);
  const flightRotate = Math.sin(flight * Math.PI * 3) * 10 * (1 - flight);
  const flightScale = 1 - flight * 0.85;
  const flightOpacity = flight > 0.75 ? Math.max(0, 1 - (flight - 0.75) / 0.25) : 1;
  const isFlying = progress > 0.62;

  // Burst: 0.88–1.0
  const burstRaw = Math.max(0, Math.min(1, (progress - 0.88) / 0.12));
  const burst = ease(burstRaw);
  const textOpacity = Math.max(0, Math.min(1, (progress - 0.92) / 0.08));

  // Stars during flight
  const starsOpacity = isFlying ? flight * 0.9 : 0;

  return (
    <section ref={sectionRef} className="relative bg-gray-900" style={{ height: "900vh" }}>
      <div className="absolute left-0 top-0 w-full h-[1px] holographic" />

      <div className="sticky top-0 h-screen overflow-hidden flex items-center justify-center"
        style={{ perspective: "1200px" }}>

        {/* Background */}
        <div className="absolute inset-0" style={{
          background: isFlying
            ? `radial-gradient(ellipse at 50% ${30 - flight * 20}%, #1a0a2e 0%, #0a0a14 50%, #080810 100%)`
            : "linear-gradient(to bottom, #111114, #0e0e12)",
        }} />

        {/* Star field */}
        {starsOpacity > 0 && (
          <div className="absolute inset-0 pointer-events-none" style={{ opacity: starsOpacity }}>
            {[...Array(50)].map((_, i) => {
              const x = (i * 37 + 11) % 100;
              const y = (i * 53 + 3) % 100;
              const s = 0.8 + (i % 4) * 0.5;
              const colors = ["#fff", "#e84393", "#00d4ff", "#6c5ce7", "#fd79a8", "#fff", "#74b9ff"];
              const twinkle = Math.sin(progress * 18 + i * 1.9) * 0.4 + 0.5;
              return (
                <div key={`s-${i}`} className="absolute rounded-full" style={{
                  left: `${x}%`, top: `${y}%`, width: s, height: s,
                  backgroundColor: colors[i % colors.length],
                  opacity: twinkle,
                  boxShadow: `0 0 ${s * 4}px ${colors[i % colors.length]}`,
                }} />
              );
            })}
          </div>
        )}

        <div className="relative z-10 w-full max-w-3xl mx-auto px-6">
          {/* Title */}
          <div style={{ opacity: titleOpacity, transform: `translateY(${(1 - titleIn) * 40}px)` }}>
            <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tight text-white mb-4 text-center">
              This is a <span className="text-pink-neon">real letter.</span>
            </h2>
            <p className="text-center text-white/40 mb-12 text-lg">
              AI-crafted. Human-hearted. Illustrated. Personalised. Printed and posted.
            </p>
          </div>

          {/* Main stage */}
          <div className="relative max-w-2xl mx-auto"
            style={{
              transform: isFlying
                ? `translateY(${flightY}px) translateX(${flightX}px) scale(${flightScale}) rotate(${flightRotate}deg)`
                : `translateY(${letterHover}px)`,
              opacity: isFlying ? flightOpacity : letterIn,
              transformStyle: "preserve-3d",
            }}>

            {/* Aura */}
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
              style={{
                width: 500, height: 500,
                background: `radial-gradient(circle, #e8439325 0%, #00d4ff12 30%, #6c5ce708 50%, transparent 70%)`,
                opacity: auraIntensity,
                filter: "blur(40px)",
                transform: `scale(${1 + twist * 0.4})`,
              }} />

            {/* Twist particles — swirl around during transformation */}
            {twistParticles && (
              <div className="absolute inset-0 pointer-events-none z-30">
                {[...Array(30)].map((_, i) => {
                  const t = twist;
                  const angle = (i / 30) * Math.PI * 2 + t * Math.PI * 3;
                  const radius = 120 + Math.sin(t * Math.PI + i) * 60;
                  const px = 50 + Math.cos(angle) * radius * 0.12;
                  const py = 50 + Math.sin(angle) * radius * 0.08;
                  const colors = ["#e84393", "#00d4ff", "#ff2d95", "#6c5ce7", "#fd79a8", "#a29bfe", "#74b9ff", "#fff"];
                  const size = 2 + (i % 3) * 1.5;
                  const opacity = t > 0.1 ? Math.min(0.8, t * 1.5) * (1 - Math.abs(0.5 - t) * 0.5) : 0;
                  return (
                    <div key={`tp-${i}`} className="absolute" style={{
                      left: `${px}%`, top: `${py}%`, opacity,
                    }}>
                      <svg width={size * 2} height={size * 2} viewBox="0 0 8 8">
                        <path d="M4 0L5 3L8 4L5 5L4 8L3 5L0 4L3 3Z" fill={colors[i % colors.length]} />
                      </svg>
                    </div>
                  );
                })}
              </div>
            )}

            {/* THE LETTER — twists on Y axis */}
            {letterVisible && (
              <div className="relative z-10" style={{
                transform: `rotateY(${rotateY}deg)`,
                transformStyle: "preserve-3d",
                backfaceVisibility: "hidden",
              }}>
                <div className="overflow-hidden" style={{
                  boxShadow: `0 0 ${20 + twist * 50}px #e8439330, 0 0 ${40 + twist * 80}px #e8439315, 0 0 ${twist * 120}px #00d4ff10`,
                  border: `1px solid rgba(232, 67, 147, ${0.4 + twist * 0.4})`,
                }}>
                  <Image src="/brand/first-letter.png" alt="A real Wonderpunk letter"
                    width={800} height={1100} className="w-full h-auto" priority />
                </div>
              </div>
            )}

            {/* THE ENVELOPE — untwists from 90° */}
            {envelopeVisible && (
              <div className="relative z-20" style={{
                transform: `rotateY(${envelopeRotateY}deg)`,
                transformStyle: "preserve-3d",
                backfaceVisibility: "hidden",
              }}>
                <svg viewBox="0 0 600 380" className="w-full" fill="none">
                  {/* Envelope body */}
                  <rect x="10" y="10" width="580" height="360" fill="#12121e"
                    stroke="#e84393" strokeWidth="2" />
                  <rect x="20" y="20" width="560" height="340" fill="none"
                    stroke="#e84393" strokeWidth="0.3" opacity="0.1" />

                  {/* Flap */}
                  <path d="M10 10L300 180L590 10" fill="#161628" stroke="#e84393"
                    strokeWidth="1.5" opacity={seal > 0 ? 0.9 : 0.4} />

                  {/* Child's name */}
                  <text x="300" y="235" textAnchor="middle" fontSize="20" fill="#e84393"
                    opacity="0.5" fontFamily="Georgia, serif" fontStyle="italic">
                    Miss Joanie
                  </text>
                  <line x1="200" y1="260" x2="400" y2="260" stroke="#e84393"
                    strokeWidth="1" opacity="0.15" />
                  <line x1="220" y1="278" x2="380" y2="278" stroke="#e84393"
                    strokeWidth="1" opacity="0.1" />

                  {/* Return address */}
                  <text x="30" y="325" fontSize="9" fill="#e84393" opacity="0.25"
                    fontFamily="Georgia, serif" fontStyle="italic">
                    The Office of Magical Correspondence
                  </text>
                  <text x="30" y="340" fontSize="9" fill="#e84393" opacity="0.2"
                    fontFamily="Georgia, serif" fontStyle="italic">
                    Whispering Woods Post Office
                  </text>

                  {/* Wax seal */}
                  <g opacity={seal}>
                    <circle cx="300" cy="175" r="26" fill="#e84393" />
                    <circle cx="300" cy="175" r="17" fill="#ff2d95" />
                    <path d="M300 163L304 171L312 171L306 176L308 184L300 179L292 184L294 176L288 171L296 171Z"
                      fill="white" opacity="0.85" />
                  </g>
                </svg>

                {/* Seal shockwaves */}
                {sealShock && (
                  <>
                    <div className="absolute left-1/2 top-[46%] -translate-x-1/2 -translate-y-1/2 rounded-full pointer-events-none"
                      style={{
                        width: shockProgress * 400,
                        height: shockProgress * 400,
                        border: "2px solid #e84393",
                        opacity: Math.max(0, 0.6 - shockProgress * 0.8),
                        boxShadow: "0 0 20px #e8439330",
                      }} />
                    <div className="absolute left-1/2 top-[46%] -translate-x-1/2 -translate-y-1/2 rounded-full pointer-events-none"
                      style={{
                        width: shockProgress * 280,
                        height: shockProgress * 280,
                        border: "1px solid #00d4ff",
                        opacity: Math.max(0, 0.4 - shockProgress * 0.6),
                      }} />
                    <div className="absolute left-1/2 top-[46%] -translate-x-1/2 -translate-y-1/2 rounded-full pointer-events-none"
                      style={{
                        width: shockProgress * 500,
                        height: shockProgress * 500,
                        border: "1px solid #6c5ce7",
                        opacity: Math.max(0, 0.3 - shockProgress * 0.5),
                      }} />
                    {/* Seal burst particles */}
                    {[...Array(24)].map((_, i) => {
                      const a = (i / 24) * Math.PI * 2;
                      const d = shockProgress * 180;
                      const px = 50 + Math.cos(a) * d * 0.12;
                      const py = 46 + Math.sin(a) * d * 0.12;
                      const colors = ["#e84393", "#00d4ff", "#ff2d95", "#6c5ce7", "#fd79a8", "#fff"];
                      return (
                        <div key={`sp-${i}`} className="absolute" style={{
                          left: `${px}%`, top: `${py}%`,
                          opacity: Math.max(0, 0.9 - shockProgress * 1.2),
                        }}>
                          <svg width="5" height="5" viewBox="0 0 5 5">
                            <path d="M2.5 0L3 2L5 2.5L3 3L2.5 5L2 3L0 2.5L2 2Z"
                              fill={colors[i % colors.length]} />
                          </svg>
                        </div>
                      );
                    })}
                  </>
                )}

                {/* Envelope glow border during pause */}
                {progress > 0.56 && progress < 0.65 && (
                  <div className="absolute inset-0 pointer-events-none" style={{
                    boxShadow: `0 0 40px #e8439340, 0 0 80px #e8439320, inset 0 0 40px #e8439310`,
                    opacity: Math.sin((progress - 0.56) / 0.09 * Math.PI),
                  }} />
                )}
              </div>
            )}

            {/* Comet trail during flight */}
            {isFlying && flight < 0.9 && (
              <div className="absolute inset-0 pointer-events-none z-30">
                {[...Array(32)].map((_, i) => {
                  const delay = i * 0.03;
                  const tf = Math.max(0, flight - delay);
                  const tx = Math.sin(tf * Math.PI * 4 + i * 0.6) * (25 + i * 1.5);
                  const ty = tf * 250 + i * 12;
                  const colors = ["#e84393", "#00d4ff", "#ff2d95", "#6c5ce7", "#fd79a8", "#fff", "#74b9ff", "#a29bfe"];
                  const size = 2 + (i % 5) * 1.5;
                  const opacity = Math.max(0, 0.9 - i * 0.025 - tf * 0.6);
                  return (
                    <div key={`ct-${i}`} className="absolute left-1/2 top-1/2" style={{
                      transform: `translate(${tx}px, ${ty}px)`,
                      opacity,
                    }}>
                      <svg width={size} height={size} viewBox="0 0 6 6">
                        <path d="M3 0L3.6 2.4L6 3L3.6 3.6L3 6L2.4 3.6L0 3L2.4 2.4Z"
                          fill={colors[i % colors.length]} />
                      </svg>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Starburst */}
          {progress > 0.86 && (
            <div className="absolute left-1/2 top-[30%] -translate-x-1/2 pointer-events-none">
              <div className="rounded-full" style={{
                width: burst * 100, height: burst * 100,
                background: "radial-gradient(circle, #ffffff50, #e8439330, transparent)",
                opacity: burst < 0.3 ? burst / 0.3 : Math.max(0, 1 - (burst - 0.3) / 0.7),
                filter: `blur(${burst * 8}px)`,
                transform: "translate(-50%, -50%)",
              }} />
              {[...Array(20)].map((_, i) => {
                const a = (i / 20) * Math.PI * 2;
                const d = burst * 160;
                const colors = ["#e84393", "#00d4ff", "#ff2d95", "#fff", "#6c5ce7", "#fd79a8"];
                return (
                  <div key={`b-${i}`} className="absolute" style={{
                    left: "50%", top: "50%",
                    transform: `translate(${Math.cos(a) * d}px, ${Math.sin(a) * d}px)`,
                    opacity: burst < 0.4 ? burst / 0.4 : Math.max(0, 1 - (burst - 0.4) / 0.6),
                  }}>
                    <svg width="6" height="6" viewBox="0 0 6 6">
                      <path d="M3 0L3.5 2.5L6 3L3.5 3.5L3 6L2.5 3.5L0 3L2.5 2.5Z"
                        fill={colors[i % colors.length]} />
                    </svg>
                  </div>
                );
              })}
            </div>
          )}

          {/* Final text */}
          <div className="text-center mt-12" style={{
            opacity: textOpacity,
            transform: `translateY(${(1 - textOpacity) * 25}px)`,
          }}>
            <p className="text-2xl md:text-4xl font-black uppercase tracking-tight text-white">
              On its way to the <span className="text-pink-neon">letterbox.</span>
            </p>
            <p className="text-white/30 mt-4 text-sm uppercase tracking-[0.3em]">Magic, delivered.</p>
            <div className="flex items-center justify-center gap-4 mt-8 text-sm text-white/20">
              <span className="border border-pink-neon/40 text-pink-neon px-3 py-1 text-xs font-bold uppercase tracking-wider">Ages 3-6</span>
              <span>AI-crafted. Human-hearted.</span>
            </div>
          </div>
        </div>

        {/* Ambient particles */}
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(12)].map((_, i) => {
            const x = (i * 21 + 8) % 85 + 7;
            const y = (i * 31 + 12) % 75 + 12;
            const fx = Math.cos(progress * 6 + i * 1.1) * 6;
            const fy = Math.sin(progress * 9 + i * 1.4) * 8;
            const colors = ["#e84393", "#00d4ff", "#6c5ce7", "#fd79a8"];
            const o = Math.sin(progress * 16 + i * 2.3) * 0.2 + 0.15;
            return (
              <div key={`a-${i}`} className="absolute" style={{
                left: `${x + fx}%`, top: `${y + fy}%`, opacity: o,
              }}>
                <svg width="4" height="4" viewBox="0 0 4 4">
                  <path d="M2 0L2.4 1.6L4 2L2.4 2.4L2 4L1.6 2.4L0 2L1.6 1.6Z"
                    fill={colors[i % colors.length]} />
                </svg>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
