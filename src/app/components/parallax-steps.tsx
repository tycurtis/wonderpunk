"use client";

import { useEffect, useRef, useState } from "react";

const steps = [
  {
    num: "01",
    title: "Tell us about your kid.",
    subtitle: "THE SPARK",
    desc: "Their name. Their age. What makes them lose their mind with excitement. Dinosaurs? Fairies? Space? Dogs? Does the family cat have a weird name? The more you share, the more personal the magic gets.",
    accent: "#e84393",
    icon: (
      <svg viewBox="0 0 120 120" fill="none" className="w-full h-full">
        <circle cx="60" cy="45" r="20" stroke="#e84393" strokeWidth="2" fill="none" />
        <circle cx="55" cy="42" r="2" fill="#e84393" />
        <circle cx="65" cy="42" r="2" fill="#e84393" />
        <path d="M55 50C57 53 63 53 65 50" stroke="#e84393" strokeWidth="1.5" strokeLinecap="round" fill="none" />
        <path d="M60 25L62 18L58 18Z" fill="#00d4ff" />
        <rect x="35" y="75" width="50" height="35" rx="0" stroke="#e84393" strokeWidth="1.5" fill="none" />
        <line x1="45" y1="85" x2="75" y2="85" stroke="#e84393" strokeWidth="1" opacity="0.4" />
        <line x1="45" y1="92" x2="68" y2="92" stroke="#00d4ff" strokeWidth="1" opacity="0.3" />
        <line x1="45" y1="99" x2="72" y2="99" stroke="#e84393" strokeWidth="1" opacity="0.2" />
        {[{ x: 20, y: 30 }, { x: 95, y: 25 }, { x: 100, y: 80 }, { x: 15, y: 90 }].map((s, i) => (
          <path key={i} d={`M${s.x} ${s.y - 4}L${s.x + 1} ${s.y - 1}L${s.x + 4} ${s.y}L${s.x + 1} ${s.y + 1}L${s.x} ${s.y + 4}L${s.x - 1} ${s.y + 1}L${s.x - 4} ${s.y}L${s.x - 1} ${s.y - 1}Z`} fill={i % 2 === 0 ? "#e84393" : "#00d4ff"} opacity="0.5">
            <animate attributeName="opacity" values="0.2;0.8;0.2" dur={`${1.5 + i * 0.4}s`} repeatCount="indefinite" />
          </path>
        ))}
      </svg>
    ),
  },
  {
    num: "02",
    title: "Choose your adventure.",
    subtitle: "THE ARC",
    desc: "A 12-week quest to find the Rainbow Dragon. A mystery in the Whispering Woods. Letters from Stardust the Unicorn. Pick a pre-built story arc or go completely freestyle. Each one is built on real children's literature principles.",
    accent: "#00d4ff",
    icon: (
      <svg viewBox="0 0 120 120" fill="none" className="w-full h-full">
        <rect x="25" y="20" width="70" height="85" rx="0" stroke="#00d4ff" strokeWidth="1.5" fill="none" />
        <rect x="30" y="20" width="3" height="85" fill="#00d4ff" opacity="0.15" />
        <line x1="40" y1="35" x2="80" y2="35" stroke="#00d4ff" strokeWidth="1" opacity="0.5" />
        <line x1="40" y1="45" x2="75" y2="45" stroke="#e84393" strokeWidth="1" opacity="0.3" />
        <line x1="40" y1="55" x2="78" y2="55" stroke="#00d4ff" strokeWidth="1" opacity="0.4" />
        <line x1="40" y1="65" x2="70" y2="65" stroke="#e84393" strokeWidth="1" opacity="0.2" />
        <path d="M50 80L55 72L60 78L65 70L70 80" stroke="#00d4ff" strokeWidth="1.5" strokeLinecap="round" fill="none" />
        <circle cx="60" cy="76" r="3" fill="#e84393" opacity="0.4" />
        {/* Page turn effect */}
        <path d="M95 20C95 20 90 50 95 105" stroke="#00d4ff" strokeWidth="0.5" opacity="0.3" />
        {[{ x: 15, y: 40 }, { x: 105, y: 60 }, { x: 10, y: 100 }].map((s, i) => (
          <path key={i} d={`M${s.x} ${s.y - 4}L${s.x + 1} ${s.y - 1}L${s.x + 4} ${s.y}L${s.x + 1} ${s.y + 1}L${s.x} ${s.y + 4}L${s.x - 1} ${s.y + 1}L${s.x - 4} ${s.y}L${s.x - 1} ${s.y - 1}Z`} fill={i % 2 === 0 ? "#00d4ff" : "#e84393"} opacity="0.5">
            <animate attributeName="opacity" values="0.2;0.8;0.2" dur={`${1.8 + i * 0.3}s`} repeatCount="indefinite" />
          </path>
        ))}
      </svg>
    ),
  },
  {
    num: "03",
    title: "Craft your letter.",
    subtitle: "THE MAGIC",
    desc: "Our AI writes the first draft — age-perfect language, proper narrative structure, wonder baked in. You edit, add personal touches, make it yours. \"Remember when we found that shell at the beach? Well, the fairies found it too...\" Takes 5 minutes.",
    accent: "#6c5ce7",
    icon: (
      <svg viewBox="0 0 120 120" fill="none" className="w-full h-full">
        {/* Quill */}
        <line x1="30" y1="95" x2="80" y2="30" stroke="#6c5ce7" strokeWidth="2" strokeLinecap="round" />
        <path d="M80 30L90 20L85 35Z" fill="#6c5ce7" opacity="0.8" />
        <path d="M90 20L95 15" stroke="#a29bfe" strokeWidth="1" strokeLinecap="round" />
        {/* Writing lines appearing */}
        <line x1="35" y1="100" x2="75" y2="100" stroke="#e84393" strokeWidth="1" opacity="0.5">
          <animate attributeName="x2" values="35;75;75" dur="2s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="0;0.5;0.5" dur="2s" repeatCount="indefinite" />
        </line>
        <line x1="35" y1="107" x2="65" y2="107" stroke="#6c5ce7" strokeWidth="1" opacity="0.3">
          <animate attributeName="x2" values="35;65;65" dur="2s" begin="0.3s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="0;0.3;0.3" dur="2s" begin="0.3s" repeatCount="indefinite" />
        </line>
        {/* AI sparkle burst */}
        <circle cx="55" cy="60" r="12" stroke="#6c5ce7" strokeWidth="1" fill="none" opacity="0.3">
          <animate attributeName="r" values="8;15;8" dur="2s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="0.1;0.4;0.1" dur="2s" repeatCount="indefinite" />
        </circle>
        {[{ x: 55, y: 45 }, { x: 40, y: 55 }, { x: 70, y: 55 }, { x: 50, y: 70 }, { x: 65, y: 68 }].map((s, i) => (
          <path key={i} d={`M${s.x} ${s.y - 3}L${s.x + 0.8} ${s.y - 0.8}L${s.x + 3} ${s.y}L${s.x + 0.8} ${s.y + 0.8}L${s.x} ${s.y + 3}L${s.x - 0.8} ${s.y + 0.8}L${s.x - 3} ${s.y}L${s.x - 0.8} ${s.y - 0.8}Z`} fill={i % 2 === 0 ? "#6c5ce7" : "#e84393"} opacity="0.6">
            <animate attributeName="opacity" values="0.2;0.9;0.2" dur={`${1 + i * 0.3}s`} repeatCount="indefinite" />
          </path>
        ))}
      </svg>
    ),
  },
  {
    num: "04",
    title: "We print, pack & post.",
    subtitle: "THE MAKING",
    desc: "Your letter gets printed on premium stock with beautiful illustrations. Sealed in a custom envelope addressed to the child in handwriting. Sometimes with a prop tucked inside — fairy dust, a treasure map, unicorn poop. Then posted to their letterbox.",
    accent: "#fd79a8",
    icon: (
      <svg viewBox="0 0 120 120" fill="none" className="w-full h-full">
        {/* Envelope */}
        <rect x="20" y="35" width="80" height="55" rx="0" stroke="#fd79a8" strokeWidth="2" fill="none" />
        <path d="M20 40L60 70L100 40" stroke="#fd79a8" strokeWidth="2" strokeLinecap="round" fill="none" />
        {/* Wax seal */}
        <circle cx="60" cy="82" r="8" fill="#e84393" />
        <circle cx="60" cy="82" r="5" fill="#ff2d95" />
        <path d="M60 78L61 81L64 81L62 83L63 86L60 84L57 86L58 83L56 81L59 81Z" fill="white" opacity="0.8" />
        {/* Props peeking out */}
        <circle cx="85" cy="30" r="4" fill="#00d4ff" opacity="0.4">
          <animate attributeName="opacity" values="0.2;0.6;0.2" dur="2s" repeatCount="indefinite" />
        </circle>
        <circle cx="78" cy="25" r="3" fill="#6c5ce7" opacity="0.3">
          <animate attributeName="opacity" values="0.3;0.7;0.3" dur="1.5s" repeatCount="indefinite" />
        </circle>
        <circle cx="92" cy="28" r="2.5" fill="#e84393" opacity="0.4">
          <animate attributeName="opacity" values="0.2;0.5;0.2" dur="1.8s" repeatCount="indefinite" />
        </circle>
        {/* Postmark */}
        <circle cx="85" cy="50" r="10" stroke="#fd79a8" strokeWidth="0.5" fill="none" opacity="0.3" />
        <line x1="78" y1="50" x2="92" y2="50" stroke="#fd79a8" strokeWidth="0.5" opacity="0.3" />
        {/* Stamp */}
        <rect x="25" y="100" width="20" height="15" stroke="#fd79a8" strokeWidth="0.5" fill="none" opacity="0.3" strokeDasharray="2,1" />
      </svg>
    ),
  },
  {
    num: "05",
    title: "Magic arrives.",
    subtitle: "THE MOMENT",
    desc: "A letter in the letterbox. Addressed to THEM. Their name, their story, from someone who loves them. They rip it open. Glitter goes everywhere. They read it three times. They put it under their pillow. They ask every single day if the next one has arrived yet.",
    accent: "#ff2d95",
    icon: (
      <svg viewBox="0 0 120 120" fill="none" className="w-full h-full">
        {/* Explosion center */}
        <circle cx="60" cy="55" r="15" fill="#ff2d95" opacity="0.1">
          <animate attributeName="r" values="10;20;10" dur="2s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="0.05;0.15;0.05" dur="2s" repeatCount="indefinite" />
        </circle>
        {/* Glitter burst */}
        {[...Array(16)].map((_, i) => {
          const angle = (i / 16) * 360;
          const rad = (angle * Math.PI) / 180;
          const dist = 25 + (i * 5) % 20;
          const x = 60 + Math.cos(rad) * dist;
          const y = 55 + Math.sin(rad) * dist;
          const colors = ["#e84393", "#00d4ff", "#6c5ce7", "#fd79a8", "#ff2d95", "#74b9ff", "#a29bfe", "#ffffff"];
          return (
            <path key={i}
              d={`M${x} ${y - 3}L${x + 0.8} ${y - 0.8}L${x + 3} ${y}L${x + 0.8} ${y + 0.8}L${x} ${y + 3}L${x - 0.8} ${y + 0.8}L${x - 3} ${y}L${x - 0.8} ${y - 0.8}Z`}
              fill={colors[i % colors.length]} opacity="0.7">
              <animate attributeName="opacity" values="0.3;1;0.3" dur={`${0.8 + i * 0.15}s`} repeatCount="indefinite" />
              <animateTransform attributeName="transform" type="scale" values="0.8;1.3;0.8" dur={`${0.8 + i * 0.15}s`} repeatCount="indefinite" additive="sum" />
            </path>
          );
        })}
        {/* Heart in center */}
        <path d="M60 50C60 46 55 43 52 46C49 43 44 46 44 50C44 56 52 61 52 61C52 61 60 56 60 50Z" fill="#ff2d95" opacity="0.6" transform="translate(8, 0) scale(1.2)">
          <animate attributeName="opacity" values="0.4;0.8;0.4" dur="1.5s" repeatCount="indefinite" />
        </path>
        {/* "Under the pillow" text hint */}
        <line x1="30" y1="100" x2="90" y2="100" stroke="#ff2d95" strokeWidth="0.5" opacity="0.2" />
        <line x1="35" y1="105" x2="85" y2="105" stroke="#ff2d95" strokeWidth="0.5" opacity="0.15" />
      </svg>
    ),
  },
];

export default function ParallaxSteps() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let rafId: number;

    const onScroll = () => {
      rafId = requestAnimationFrame(() => {
        if (!containerRef.current) return;
        const rect = containerRef.current.getBoundingClientRect();
        const containerHeight = containerRef.current.offsetHeight;
        const viewportHeight = window.innerHeight;
        // Progress from 0 (top of container at bottom of viewport) to 1 (bottom of container at top)
        const rawProgress = (-rect.top) / (containerHeight - viewportHeight);
        setScrollProgress(Math.max(0, Math.min(1, rawProgress)));
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(rafId);
    };
  }, []);

  const totalSteps = steps.length;
  // Map scroll progress to a continuous step value (0 to totalSteps-1)
  const continuousStep = scrollProgress * (totalSteps - 1);
  const activeStep = Math.round(continuousStep);

  const ease = (t: number) => t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

  // Each step gets its own zone with generous overlap for crossfading
  const getVisibility = (index: number) => {
    // Each step center point
    const center = index / (totalSteps - 1);
    // How far is scroll from this step's center
    const distance = Math.abs(scrollProgress - center);
    // Visibility window — wider = more hold time
    const window = 0.12;

    if (distance < window) return 1; // Fully visible near center
    // Fade zone
    const fadeRange = 0.06;
    const fadeProgress = Math.min(1, (distance - window) / fadeRange);
    return Math.max(0, 1 - ease(fadeProgress));
  };

  const getStepStyle = (index: number) => {
    const vis = getVisibility(index);
    const center = index / (totalSteps - 1);
    const direction = scrollProgress - center;

    // Smooth entrance from below, exit upward
    const translateY = direction > 0
      ? -(1 - vis) * 40  // Exit: slide up
      : (1 - vis) * 40;  // Enter: from below
    const scale = 0.92 + vis * 0.08;
    const blur = (1 - vis) * 6;

    return {
      opacity: vis,
      transform: `translateY(${translateY}px) scale(${scale})`,
      filter: blur > 0.5 ? `blur(${blur}px)` : "none",
      transition: "none",
    };
  };

  const getTextStyle = (index: number) => {
    const vis = getVisibility(index);
    const center = index / (totalSteps - 1);
    const direction = scrollProgress - center;

    const translateY = direction > 0
      ? -(1 - vis) * 50
      : (1 - vis) * 50;

    return {
      opacity: vis,
      transform: `translateY(${translateY}px)`,
      transition: "none",
    };
  };

  return (
    <section className="relative bg-background" ref={containerRef}>
      {/* Section header */}
      <div className="text-center pt-24 pb-12 px-6">
        <p className="text-sm font-bold text-pink-neon uppercase tracking-[0.3em] mb-4">
          How it works
        </p>
        <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tight text-white">
          Five steps to<br />
          <span className="text-pink-neon">magic mail.</span>
        </h2>
      </div>

      {/* Desktop: tall scrollable container with sticky panels */}
      <div className="hidden md:block" style={{ height: `${totalSteps * 200}vh` }}>
        <div className="sticky top-0 h-screen flex overflow-hidden">
          {/* Left — animated icon */}
          <div className="w-1/2 flex items-center justify-center px-12 relative">
            {steps.map((step, i) => (
              <div
                key={i}
                className="absolute flex items-center justify-center"
                style={getStepStyle(i)}
              >
                <div
                  className="w-72 h-72"
                  style={{ filter: `drop-shadow(0 0 25px ${step.accent}50)` }}
                >
                  {step.icon}
                </div>
              </div>
            ))}

            {/* Vertical progress line */}
            <div className="absolute right-0 top-1/2 -translate-y-1/2 h-64 w-[2px] bg-white/5">
              <div
                className="w-full rounded-full"
                style={{
                  height: `${(scrollProgress * 100)}%`,
                  background: `linear-gradient(to bottom, #e84393, #00d4ff, #6c5ce7, #fd79a8, #ff2d95)`,
                  boxShadow: "0 0 10px #e8439360",
                  transition: "none",
                }}
              />
            </div>
          </div>

          {/* Right — text content */}
          <div className="w-1/2 flex items-center justify-center px-12 relative">
            {steps.map((step, i) => (
              <div
                key={i}
                className="absolute max-w-md"
                style={getTextStyle(i)}
              >
                <p
                  className="text-xs font-bold uppercase tracking-[0.3em] mb-2"
                  style={{ color: step.accent }}
                >
                  {step.subtitle}
                </p>
                <span
                  className="text-8xl font-black block mb-4 leading-none"
                  style={{ color: step.accent, opacity: 0.15 }}
                >
                  {step.num}
                </span>
                <h3 className="text-3xl md:text-4xl font-black text-white uppercase tracking-tight mb-6">
                  {step.title}
                </h3>
                <p className="text-lg text-white/50 leading-relaxed">
                  {step.desc}
                </p>
                {/* Progress dots */}
                <div className="flex gap-2 mt-8">
                  {steps.map((_, j) => (
                    <div
                      key={j}
                      className="h-1 rounded-full"
                      style={{
                        width: activeStep === j ? "32px" : "8px",
                        backgroundColor: activeStep === j ? step.accent : "#333",
                        boxShadow: activeStep === j ? `0 0 10px ${step.accent}60` : "none",
                        transition: "width 0.3s, background-color 0.3s, box-shadow 0.3s",
                      }}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Mobile layout (stacked) */}
      <div className="md:hidden px-6 pb-24">
        {steps.map((step, i) => (
          <div key={i} className="py-16 border-t border-white/5 first:border-t-0">
            <div className="w-40 h-40 mx-auto mb-8" style={{ filter: `drop-shadow(0 0 15px ${step.accent}40)` }}>
              {step.icon}
            </div>
            <p className="text-xs font-bold uppercase tracking-[0.3em] mb-2" style={{ color: step.accent }}>
              {step.subtitle}
            </p>
            <span className="text-6xl font-black block mb-2 leading-none" style={{ color: step.accent, opacity: 0.15 }}>
              {step.num}
            </span>
            <h3 className="text-2xl font-black text-white uppercase tracking-tight mb-4">
              {step.title}
            </h3>
            <p className="text-base text-white/50 leading-relaxed">
              {step.desc}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
