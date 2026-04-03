"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import Image from "next/image";

const ease = (t: number) => t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
const clamp01 = (v: number) => Math.max(0, Math.min(1, v));

export default function LetterFoldFly() {
  const sectionRef = useRef<HTMLDivElement>(null);

  // Only these cause re-renders — they toggle ~2 times total
  const [letterVisible, setLetterVisible] = useState(true);
  const [envelopeVisible, setEnvelopeVisible] = useState(false);
  const [sealShock, setSealShock] = useState(false);
  const [twistParticles, setTwistParticles] = useState(false);
  const [isFlying, setIsFlying] = useState(false);
  const [showStars, setShowStars] = useState(false);
  const [showBurst, setShowBurst] = useState(false);

  // Refs for direct DOM manipulation — no re-renders
  const titleRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const auraRef = useRef<HTMLDivElement>(null);
  const letterRef = useRef<HTMLDivElement>(null);
  const letterInnerRef = useRef<HTMLDivElement>(null);
  const envelopeRef = useRef<HTMLDivElement>(null);
  const sealRef = useRef<SVGGElement>(null);
  const shockRefs = useRef<(HTMLDivElement | null)[]>([]);
  const envelopeGlowRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const starsRef = useRef<HTMLDivElement>(null);
  const trailRef = useRef<HTMLDivElement>(null);
  const burstRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const particleContainerRef = useRef<HTMLDivElement>(null);
  const flapRef = useRef<SVGPathElement>(null);

  const prevVisibility = useRef({ letter: true, envelope: false, shock: false, particles: false, flying: false, stars: false, burst: false });

  const update = useCallback(() => {
    if (!sectionRef.current) return;
    const rect = sectionRef.current.getBoundingClientRect();
    const h = sectionRef.current.offsetHeight;
    const vh = window.innerHeight;
    const p = clamp01(-rect.top / (h - vh));

    // ─── PHASE CALCULATIONS ───
    const titleIn = ease(clamp01(p / 0.08));
    const titleOut = p > 0.15 ? Math.max(0, 1 - (p - 0.15) / 0.05) : 1;

    const letterIn = ease(clamp01(p / 0.10));
    const letterHover = Math.sin(p * 12) * 3 * (p < 0.10 ? 1 : 0);

    const twistRaw = clamp01((p - 0.10) / 0.25);
    const twist = ease(twistRaw);
    const rotY = twist * 90;

    const auraInt = p < 0.10 ? 0.15 : lerp(0.15, 0.7, twist);

    const envRaw = clamp01((p - 0.34) / 0.08);
    const env = ease(envRaw);
    const envRotY = lerp(90, 0, env);

    const sealRaw = clamp01((p - 0.40) / 0.08);
    const seal = ease(sealRaw);
    const shockP = clamp01((p - 0.40) / 0.10);

    const flightRaw = clamp01((p - 0.50) / 0.30);
    const flight = ease(flightRaw);
    const flightY = flight * -550;
    const flightX = Math.sin(flight * Math.PI * 4) * 40 * (1 - flight * 0.8);
    const flightRot = Math.sin(flight * Math.PI * 3) * 10 * (1 - flight);
    const flightScale = 1 - flight * 0.85;
    const flightOpacity = flight > 0.75 ? Math.max(0, 1 - (flight - 0.75) / 0.25) : 1;
    const flying = p > 0.50;

    const burstRaw = clamp01((p - 0.80) / 0.20);
    const burst = ease(burstRaw);
    const textOp = clamp01((p - 0.86) / 0.14);

    // ─── DISCRETE VISIBILITY TOGGLES (rare re-renders) ───
    const vis = prevVisibility.current;
    const newLetter = p < 0.35;
    const newEnvelope = p > 0.34;
    const newShock = p > 0.40 && p < 0.52;
    const newParticles = p > 0.12 && p < 0.42;
    const newFlying = flying;
    const newStars = flying && flight > 0;
    const newBurst = p > 0.78;

    if (newLetter !== vis.letter) { vis.letter = newLetter; setLetterVisible(newLetter); }
    if (newEnvelope !== vis.envelope) { vis.envelope = newEnvelope; setEnvelopeVisible(newEnvelope); }
    if (newShock !== vis.shock) { vis.shock = newShock; setSealShock(newShock); }
    if (newParticles !== vis.particles) { vis.particles = newParticles; setTwistParticles(newParticles); }
    if (newFlying !== vis.flying) { vis.flying = newFlying; setIsFlying(newFlying); }
    if (newStars !== vis.stars) { vis.stars = newStars; setShowStars(newStars); }
    if (newBurst !== vis.burst) { vis.burst = newBurst; setShowBurst(newBurst); }

    // ─── DIRECT DOM UPDATES (every frame, zero re-renders) ───

    // Title
    if (titleRef.current) {
      const o = titleIn * titleOut;
      titleRef.current.style.opacity = String(o);
      titleRef.current.style.transform = `translateY(${(1 - titleIn) * 40}px)`;
    }

    // Background
    if (bgRef.current) {
      bgRef.current.style.background = flying
        ? `radial-gradient(ellipse at 50% ${30 - flight * 20}%, #1a0a2e 0%, #0a0a14 50%, #080810 100%)`
        : "linear-gradient(to bottom, #0c0c10, #0a0a0e)";
    }

    // Stage (letter or envelope container)
    if (stageRef.current) {
      if (flying) {
        stageRef.current.style.transform = `translateY(${flightY}px) translateX(${flightX}px) scale(${flightScale}) rotate(${flightRot}deg)`;
        stageRef.current.style.opacity = String(flightOpacity);
      } else {
        stageRef.current.style.transform = `translateY(${letterHover}px)`;
        stageRef.current.style.opacity = String(letterIn);
      }
    }

    // Aura
    if (auraRef.current) {
      auraRef.current.style.opacity = String(auraInt);
      auraRef.current.style.transform = `scale(${1 + twist * 0.4})`;
    }

    // Letter twist
    if (letterRef.current) {
      letterRef.current.style.transform = `rotateY(${rotY}deg)`;
    }
    if (letterInnerRef.current) {
      letterInnerRef.current.style.boxShadow = `0 0 ${20 + twist * 50}px #e8439330, 0 0 ${40 + twist * 80}px #e8439315, 0 0 ${twist * 120}px #00d4ff10`;
      letterInnerRef.current.style.borderColor = `rgba(232, 67, 147, ${0.4 + twist * 0.4})`;
    }

    // Envelope
    if (envelopeRef.current) {
      envelopeRef.current.style.transform = `rotateY(${envRotY}deg)`;
    }
    if (sealRef.current) {
      sealRef.current.style.opacity = String(seal);
    }
    if (flapRef.current) {
      flapRef.current.style.opacity = String(seal > 0 ? 0.9 : 0.4);
    }

    // Shockwaves
    shockRefs.current.forEach((el, i) => {
      if (!el) return;
      const sizes = [400, 280, 500];
      const opacities = [0.6, 0.4, 0.3];
      const decays = [0.8, 0.6, 0.5];
      el.style.width = el.style.height = `${shockP * sizes[i]}px`;
      el.style.opacity = String(Math.max(0, opacities[i] - shockP * decays[i]));
    });

    // Envelope glow
    if (envelopeGlowRef.current) {
      if (p > 0.44 && p < 0.52) {
        envelopeGlowRef.current.style.opacity = String(Math.sin((p - 0.44) / 0.08 * Math.PI));
        envelopeGlowRef.current.style.display = "";
      } else {
        envelopeGlowRef.current.style.display = "none";
      }
    }

    // Stars
    if (starsRef.current) {
      starsRef.current.style.opacity = String(flying ? flight * 0.9 : 0);
    }

    // Twist particles — update positions
    if (particleContainerRef.current) {
      const children = particleContainerRef.current.children;
      for (let i = 0; i < children.length; i++) {
        const el = children[i] as HTMLElement;
        const angle = (i / 30) * Math.PI * 2 + twist * Math.PI * 3;
        const radius = 120 + Math.sin(twist * Math.PI + i) * 60;
        const px = 50 + Math.cos(angle) * radius * 0.12;
        const py = 50 + Math.sin(angle) * radius * 0.08;
        const opacity = twist > 0.1 ? Math.min(0.8, twist * 1.5) * (1 - Math.abs(0.5 - twist) * 0.5) : 0;
        el.style.left = `${px}%`;
        el.style.top = `${py}%`;
        el.style.opacity = String(opacity);
      }
    }

    // Trail
    if (trailRef.current) {
      const children = trailRef.current.children;
      for (let i = 0; i < children.length; i++) {
        const el = children[i] as HTMLElement;
        const delay = i * 0.03;
        const tf = Math.max(0, flight - delay);
        const tx = Math.sin(tf * Math.PI * 4 + i * 0.6) * (25 + i * 1.5);
        const ty = tf * 250 + i * 12;
        const opacity = Math.max(0, 0.9 - i * 0.025 - tf * 0.6);
        el.style.transform = `translate(${tx}px, ${ty}px)`;
        el.style.opacity = String(opacity);
      }
    }

    // Burst
    if (burstRef.current) {
      const children = burstRef.current.children;
      // First child is the glow
      const glow = children[0] as HTMLElement;
      if (glow) {
        glow.style.width = glow.style.height = `${burst * 100}px`;
        glow.style.opacity = String(burst < 0.3 ? burst / 0.3 : Math.max(0, 1 - (burst - 0.3) / 0.7));
        glow.style.filter = `blur(${burst * 8}px)`;
      }
      // Remaining children are sparkles
      for (let i = 1; i < children.length; i++) {
        const el = children[i] as HTMLElement;
        const a = ((i - 1) / 20) * Math.PI * 2;
        const d = burst * 160;
        el.style.transform = `translate(${Math.cos(a) * d}px, ${Math.sin(a) * d}px)`;
        el.style.opacity = String(burst < 0.4 ? burst / 0.4 : Math.max(0, 1 - (burst - 0.4) / 0.6));
      }
    }

    // Final text
    if (textRef.current) {
      textRef.current.style.opacity = String(textOp);
      textRef.current.style.transform = `translateY(${(1 - textOp) * 25}px)`;
    }
  }, []);

  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(() => {
          update();
          ticking = false;
        });
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    update();
    return () => window.removeEventListener("scroll", onScroll);
  }, [update]);

  const colors8 = ["#e84393", "#00d4ff", "#ff2d95", "#6c5ce7", "#fd79a8", "#a29bfe", "#74b9ff", "#fff"];
  const colors6 = ["#e84393", "#00d4ff", "#ff2d95", "#6c5ce7", "#fd79a8", "#fff"];
  const starColors = ["#fff", "#e84393", "#00d4ff", "#6c5ce7", "#fd79a8", "#fff", "#74b9ff"];
  const burstColors = ["#e84393", "#00d4ff", "#ff2d95", "#fff", "#6c5ce7", "#fd79a8"];
  const ambientColors = ["#e84393", "#00d4ff", "#6c5ce7", "#fd79a8"];

  return (
    <section ref={sectionRef} className="relative bg-background" style={{ height: "400vh" }}>
      <div className="sticky top-0 h-screen overflow-hidden flex items-center justify-center"
        style={{ perspective: "1200px" }}>

        <div ref={bgRef} className="absolute inset-0" style={{ willChange: "contents" }} />

        {/* Star field */}
        {showStars && (
          <div ref={starsRef} className="absolute inset-0 pointer-events-none" style={{ opacity: 0 }}>
            {[...Array(50)].map((_, i) => {
              const x = (i * 37 + 11) % 100;
              const y = (i * 53 + 3) % 100;
              const s = 0.8 + (i % 4) * 0.5;
              return (
                <div key={`s-${i}`} className="absolute rounded-full" style={{
                  left: `${x}%`, top: `${y}%`, width: s, height: s,
                  backgroundColor: starColors[i % starColors.length],
                  opacity: 0.5,
                  boxShadow: `0 0 ${s * 4}px ${starColors[i % starColors.length]}`,
                }} />
              );
            })}
          </div>
        )}

        <div className="relative z-10 w-full max-w-3xl mx-auto px-6">
          {/* Title */}
          <div ref={titleRef} style={{ opacity: 0, willChange: "transform, opacity" }}>
            <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tight text-white mb-4 text-center">
              This is a <span className="text-pink-neon">real letter.</span>
            </h2>
            <p className="text-center text-white/40 mb-12 text-lg">
              AI-crafted. Human-hearted. Illustrated. Personalised. Printed and posted.
            </p>
          </div>

          {/* Main stage */}
          <div ref={stageRef} className="relative max-w-2xl mx-auto"
            style={{ opacity: 0, transformStyle: "preserve-3d", willChange: "transform, opacity" }}>

            {/* Aura */}
            <div ref={auraRef}
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
              style={{
                width: 500, height: 500,
                background: `radial-gradient(circle, #e8439325 0%, #00d4ff12 30%, #6c5ce708 50%, transparent 70%)`,
                opacity: 0.15, filter: "blur(40px)", willChange: "transform, opacity",
              }} />

            {/* Twist particles */}
            {twistParticles && (
              <div ref={particleContainerRef} className="absolute inset-0 pointer-events-none z-30">
                {[...Array(30)].map((_, i) => {
                  const size = 2 + (i % 3) * 1.5;
                  return (
                    <div key={`tp-${i}`} className="absolute" style={{ opacity: 0, willChange: "left, top, opacity" }}>
                      <svg width={size * 2} height={size * 2} viewBox="0 0 8 8">
                        <path d="M4 0L5 3L8 4L5 5L4 8L3 5L0 4L3 3Z" fill={colors8[i % colors8.length]} />
                      </svg>
                    </div>
                  );
                })}
              </div>
            )}

            {/* THE LETTER */}
            {letterVisible && (
              <div ref={letterRef} className="relative z-10"
                style={{ transformStyle: "preserve-3d", backfaceVisibility: "hidden", willChange: "transform" }}>
                <div ref={letterInnerRef} className="overflow-hidden"
                  style={{ border: "1px solid rgba(232, 67, 147, 0.4)" }}>
                  <Image src="/brand/first-letter.jpg" alt="A real Wonderpunk letter"
                    width={800} height={1100} className="w-full h-auto" priority />
                </div>
              </div>
            )}

            {/* THE ENVELOPE */}
            {envelopeVisible && (
              <div ref={envelopeRef} className="relative z-20"
                style={{ transformStyle: "preserve-3d", backfaceVisibility: "hidden", willChange: "transform" }}>
                <svg viewBox="0 0 600 380" className="w-full" fill="none">
                  <rect x="10" y="10" width="580" height="360" fill="#12121e" stroke="#e84393" strokeWidth="2" />
                  <rect x="20" y="20" width="560" height="340" fill="none" stroke="#e84393" strokeWidth="0.3" opacity="0.1" />
                  <path ref={flapRef} d="M10 10L300 180L590 10" fill="#161628" stroke="#e84393" strokeWidth="1.5" opacity="0.4" />
                  <text x="300" y="235" textAnchor="middle" fontSize="20" fill="#e84393" opacity="0.5" fontFamily="Georgia, serif" fontStyle="italic">Miss Joanie</text>
                  <line x1="200" y1="260" x2="400" y2="260" stroke="#e84393" strokeWidth="1" opacity="0.15" />
                  <line x1="220" y1="278" x2="380" y2="278" stroke="#e84393" strokeWidth="1" opacity="0.1" />
                  <text x="30" y="325" fontSize="9" fill="#e84393" opacity="0.25" fontFamily="Georgia, serif" fontStyle="italic">The Office of Magical Correspondence</text>
                  <text x="30" y="340" fontSize="9" fill="#e84393" opacity="0.2" fontFamily="Georgia, serif" fontStyle="italic">Whispering Woods Post Office</text>
                  <g ref={sealRef} opacity="0">
                    <circle cx="300" cy="175" r="26" fill="#e84393" />
                    <circle cx="300" cy="175" r="17" fill="#ff2d95" />
                    <path d="M300 163L304 171L312 171L306 176L308 184L300 179L292 184L294 176L288 171L296 171Z" fill="white" opacity="0.85" />
                  </g>
                </svg>

                {/* Seal shockwaves */}
                {sealShock && (
                  <>
                    {[0, 1, 2].map((i) => (
                      <div key={`sh-${i}`}
                        ref={(el) => { shockRefs.current[i] = el; }}
                        className="absolute left-1/2 top-[46%] -translate-x-1/2 -translate-y-1/2 rounded-full pointer-events-none"
                        style={{
                          border: i === 0 ? "2px solid #e84393" : i === 1 ? "1px solid #00d4ff" : "1px solid #6c5ce7",
                          boxShadow: i === 0 ? "0 0 20px #e8439330" : "none",
                          willChange: "width, height, opacity",
                        }} />
                    ))}
                    {[...Array(24)].map((_, i) => {
                      const a = (i / 24) * Math.PI * 2;
                      return (
                        <div key={`sp-${i}`} className="absolute" style={{
                          left: `${50 + Math.cos(a) * 12}%`, top: `${46 + Math.sin(a) * 12}%`, opacity: 0.5,
                        }}>
                          <svg width="5" height="5" viewBox="0 0 5 5">
                            <path d="M2.5 0L3 2L5 2.5L3 3L2.5 5L2 3L0 2.5L2 2Z" fill={colors6[i % colors6.length]} />
                          </svg>
                        </div>
                      );
                    })}
                  </>
                )}

                <div ref={envelopeGlowRef} className="absolute inset-0 pointer-events-none" style={{
                  boxShadow: `0 0 40px #e8439340, 0 0 80px #e8439320, inset 0 0 40px #e8439310`,
                  display: "none",
                }} />
              </div>
            )}

            {/* Comet trail */}
            {isFlying && (
              <div ref={trailRef} className="absolute inset-0 pointer-events-none z-30">
                {[...Array(32)].map((_, i) => {
                  const size = 2 + (i % 5) * 1.5;
                  return (
                    <div key={`ct-${i}`} className="absolute left-1/2 top-1/2"
                      style={{ opacity: 0, willChange: "transform, opacity" }}>
                      <svg width={size} height={size} viewBox="0 0 6 6">
                        <path d="M3 0L3.6 2.4L6 3L3.6 3.6L3 6L2.4 3.6L0 3L2.4 2.4Z" fill={colors8[i % colors8.length]} />
                      </svg>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Starburst */}
          {showBurst && (
            <div ref={burstRef} className="absolute left-1/2 top-[30%] -translate-x-1/2 pointer-events-none">
              <div className="rounded-full" style={{
                background: "radial-gradient(circle, #ffffff50, #e8439330, transparent)",
                transform: "translate(-50%, -50%)",
                willChange: "width, height, opacity, filter",
              }} />
              {[...Array(20)].map((_, i) => (
                <div key={`b-${i}`} className="absolute" style={{
                  left: "50%", top: "50%", opacity: 0, willChange: "transform, opacity",
                }}>
                  <svg width="6" height="6" viewBox="0 0 6 6">
                    <path d="M3 0L3.5 2.5L6 3L3.5 3.5L3 6L2.5 3.5L0 3L2.5 2.5Z" fill={burstColors[i % burstColors.length]} />
                  </svg>
                </div>
              ))}
            </div>
          )}

          {/* Final text */}
          <div ref={textRef} className="text-center mt-12" style={{ opacity: 0, willChange: "transform, opacity" }}>
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
          {[...Array(12)].map((_, i) => (
            <div key={`a-${i}`} className="absolute" style={{
              left: `${(i * 21 + 8) % 85 + 7}%`, top: `${(i * 31 + 12) % 75 + 12}%`, opacity: 0.15,
            }}>
              <svg width="4" height="4" viewBox="0 0 4 4">
                <path d="M2 0L2.4 1.6L4 2L2.4 2.4L2 4L1.6 2.4L0 2L1.6 1.6Z" fill={ambientColors[i % ambientColors.length]} />
              </svg>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
