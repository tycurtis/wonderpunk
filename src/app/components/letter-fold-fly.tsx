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

  // Phase breakdown:
  // 0.00 - 0.25: Letter visible, title fades in
  // 0.25 - 0.45: Letter folds (top half folds down via rotateX)
  // 0.45 - 0.55: Envelope seals (wax seal appears, letter fully folded into envelope)
  // 0.55 - 0.75: Envelope lifts off
  // 0.75 - 1.00: Envelope flies away into distance

  const ease = (t: number) => t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;

  // Title
  const titleOpacity = progress < 0.05 ? progress / 0.05 : progress > 0.35 ? Math.max(0, 1 - (progress - 0.35) / 0.1) : 1;

  // Letter visibility (visible until fold completes)
  const letterOpacity = progress > 0.5 ? 0 : 1;

  // Fold progress (0 = flat, 1 = fully folded)
  const foldRaw = Math.max(0, Math.min(1, (progress - 0.25) / 0.2));
  const foldProgress = ease(foldRaw);

  // Letter scale (shrinks as it folds)
  const letterScale = 1 - foldProgress * 0.4;

  // Letter rotateX (folds forward)
  const letterRotateX = foldProgress * 85;

  // Envelope visibility
  const envelopeAppear = Math.max(0, Math.min(1, (progress - 0.35) / 0.1));
  const envelopeOpacity = ease(envelopeAppear);

  // Wax seal
  const sealProgress = Math.max(0, Math.min(1, (progress - 0.45) / 0.1));
  const sealScale = ease(sealProgress);

  // Fly away (0.55 - 1.0)
  const flyRaw = Math.max(0, Math.min(1, (progress - 0.55) / 0.45));
  const flyProgress = ease(flyRaw);

  // Envelope position during flight
  const flyY = flyProgress * -600;
  const flyScale = 1 - flyProgress * 0.85;
  const flyRotate = flyProgress * -8;
  const flyOpacity = flyProgress > 0.7 ? 1 - (flyProgress - 0.7) / 0.3 : 1;

  // Sparkle trail during flight
  const showTrail = progress > 0.6 && progress < 0.95;

  // "Gone" text
  const goneOpacity = Math.max(0, Math.min(1, (progress - 0.88) / 0.1));

  return (
    <section
      ref={sectionRef}
      className="relative bg-gray-900"
      style={{ height: "600vh" }}
    >
      <div className="absolute left-0 top-0 w-full h-[1px] holographic" />

      <div className="sticky top-0 h-screen overflow-hidden flex items-center justify-center">
        {/* Background glow during flight */}
        <div
          className="absolute inset-0"
          style={{
            background: `radial-gradient(circle at 50% ${40 - flyProgress * 30}%, #e8439310 0%, transparent 50%)`,
            opacity: progress > 0.5 ? 1 : 0,
          }}
        />

        <div className="relative z-10 w-full max-w-3xl mx-auto px-6">
          {/* Title */}
          <h2
            className="text-3xl md:text-5xl font-black uppercase tracking-tight text-white mb-4 text-center"
            style={{ opacity: titleOpacity }}
          >
            This is a <span className="text-pink-neon">real letter.</span>
          </h2>
          <p
            className="text-center text-white/40 mb-12 text-lg"
            style={{ opacity: titleOpacity }}
          >
            AI-crafted. Human-hearted. Illustrated. Personalised. Printed and posted.
          </p>

          {/* Container for letter + envelope */}
          <div
            className="relative max-w-2xl mx-auto"
            style={{
              transform: `translateY(${flyY}px) scale(${flyScale}) rotate(${flyRotate}deg)`,
              opacity: flyOpacity,
              transition: "none",
            }}
          >
            {/* The envelope (appears during fold) */}
            <div
              className="absolute inset-x-0 bottom-0 h-[45%] z-20"
              style={{
                opacity: envelopeOpacity,
                transform: `translateY(${(1 - envelopeOpacity) * 20}px)`,
              }}
            >
              <svg viewBox="0 0 600 250" className="w-full h-full" fill="none" preserveAspectRatio="xMidYMax meet">
                {/* Envelope body */}
                <rect x="10" y="10" width="580" height="230" fill="#1a1a2e" stroke="#e84393" strokeWidth="2" />
                {/* Flap lines (open) */}
                <path
                  d="M10 15L300 140L590 15"
                  stroke="#e84393"
                  strokeWidth="1.5"
                  fill="none"
                  opacity="0.3"
                />
                {/* Address lines */}
                <line x1="200" y1="160" x2="400" y2="160" stroke="#e84393" strokeWidth="1" opacity="0.2" />
                <line x1="220" y1="175" x2="380" y2="175" stroke="#e84393" strokeWidth="1" opacity="0.15" />
                {/* Return address */}
                <text x="30" y="210" fontSize="9" fill="#e84393" opacity="0.3" fontFamily="Georgia, serif" fontStyle="italic">The Office of Magical Correspondence</text>
                <text x="30" y="225" fontSize="9" fill="#e84393" opacity="0.25" fontFamily="Georgia, serif" fontStyle="italic">Whispering Woods Post Office</text>
              </svg>
            </div>

            {/* Wax seal (appears after fold) */}
            <div
              className="absolute z-30 left-1/2 -translate-x-1/2"
              style={{
                bottom: "18%",
                transform: `translateX(-50%) scale(${sealScale})`,
                opacity: sealScale,
              }}
            >
              <svg width="50" height="50" viewBox="0 0 50 50" fill="none">
                <circle cx="25" cy="25" r="22" fill="#e84393" />
                <circle cx="25" cy="25" r="15" fill="#ff2d95" />
                <path d="M25 14L28 22L36 22L30 27L32 35L25 30L18 35L20 27L14 22L22 22Z" fill="white" opacity="0.85" />
              </svg>
            </div>

            {/* The letter image — folds as you scroll */}
            <div
              className="relative z-10"
              style={{
                perspective: "1200px",
                opacity: letterOpacity,
              }}
            >
              {/* Top half (this folds down) */}
              <div
                style={{
                  transformOrigin: "center bottom",
                  transform: `rotateX(${letterRotateX}deg) scale(${letterScale})`,
                  transition: "none",
                }}
              >
                <div className="neon-border overflow-hidden shadow-[0_0_60px_#e8439320]">
                  <Image
                    src="/brand/first-letter.png"
                    alt="A real Wonderpunk letter — handwritten, illustrated, personalised"
                    width={800}
                    height={1100}
                    className="w-full h-auto"
                    priority
                  />
                </div>
              </div>
            </div>

            {/* Envelope flap closing (during seal phase) */}
            {progress > 0.4 && (
              <div
                className="absolute inset-x-0 top-0 z-25"
                style={{
                  perspective: "800px",
                  opacity: Math.min(1, (progress - 0.4) / 0.1),
                }}
              >
                <svg
                  viewBox="0 0 600 200"
                  className="w-full"
                  fill="none"
                  style={{
                    transformOrigin: "center top",
                    transform: `rotateX(${Math.max(0, 180 - (progress - 0.4) / 0.15 * 180)}deg)`,
                  }}
                >
                  <path d="M10 0L300 180L590 0Z" fill="#1a1a2e" stroke="#e84393" strokeWidth="1.5" />
                </svg>
              </div>
            )}

            {/* Sparkle trail during flight */}
            {showTrail && (
              <div className="absolute inset-0 pointer-events-none z-40">
                {[...Array(12)].map((_, i) => {
                  const trailProgress = flyProgress;
                  const x = 50 + Math.sin(i * 1.8 + trailProgress * 6) * 30;
                  const y = 100 + i * 8 + trailProgress * 40;
                  const colors = ["#e84393", "#00d4ff", "#6c5ce7", "#fd79a8", "#ff2d95"];
                  const opacity = Math.max(0, 0.7 - i * 0.06);
                  return (
                    <div
                      key={i}
                      className="absolute"
                      style={{
                        left: `${x}%`,
                        top: `${y}%`,
                        opacity: opacity * (1 - Math.abs(flyProgress - 0.5) * 2),
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
          </div>

          {/* "On its way..." text after envelope flies away */}
          <div
            className="text-center mt-12"
            style={{ opacity: goneOpacity }}
          >
            <p className="text-2xl md:text-3xl font-black uppercase tracking-tight text-white">
              On its way to the <span className="text-pink-neon">letterbox.</span>
            </p>
            <p className="text-white/30 mt-3 text-sm uppercase tracking-widest">
              Magic, delivered.
            </p>
          </div>

          {/* Tags */}
          <div
            className="flex items-center justify-center gap-4 mt-8 text-sm text-white/20"
            style={{ opacity: progress < 0.3 ? 1 : progress > 0.85 ? goneOpacity : Math.max(0, 1 - (progress - 0.3) / 0.1) }}
          >
            <span className="border border-pink-neon/40 text-pink-neon px-3 py-1 text-xs font-bold uppercase tracking-wider">
              Ages 3-6
            </span>
            <span>AI-crafted. Human-hearted.</span>
          </div>
        </div>

        {/* Floating sparkles in background */}
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(8)].map((_, i) => {
            const x = 10 + (i * 23) % 80;
            const baseY = 20 + (i * 31) % 60;
            const y = baseY + Math.sin(progress * 8 + i) * 5;
            const colors = ["#e84393", "#00d4ff", "#6c5ce7", "#fd79a8"];
            const sparkleOpacity = 0.2 + Math.sin(progress * 12 + i * 2) * 0.15;
            return (
              <div
                key={i}
                className="absolute"
                style={{ left: `${x}%`, top: `${y}%`, opacity: sparkleOpacity }}
              >
                <svg width="6" height="6" viewBox="0 0 6 6">
                  <path d="M3 0L3.6 2.4L6 3L3.6 3.6L3 6L2.4 3.6L0 3L2.4 2.4Z" fill={colors[i % colors.length]} />
                </svg>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
