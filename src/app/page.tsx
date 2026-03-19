"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { UnicornWriter, LetterboxMoment, LetterboxExplosion } from "./components/illustrations";
import ParallaxSteps from "./components/parallax-steps";
import MagicMailReveal from "./components/magic-mail-reveal";
import LetterFoldFly from "./components/letter-fold-fly";

function Sparkle({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" width="24" height="24">
      <path d="M12 0L14.59 8.41L23 12L14.59 15.59L12 24L9.41 15.59L1 12L9.41 8.41L12 0Z" />
    </svg>
  );
}

function GlitterCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    const particles: {
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      opacity: number;
      color: string;
      twinkleSpeed: number;
      twinkleOffset: number;
    }[] = [];

    const colors = ["#e84393", "#fd79a8", "#0984e3", "#74b9ff", "#00d4ff", "#6c5ce7", "#a29bfe"];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    // Create particles
    for (let i = 0; i < 120; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        size: Math.random() * 3 + 1,
        opacity: Math.random() * 0.6 + 0.1,
        color: colors[Math.floor(Math.random() * colors.length)],
        twinkleSpeed: Math.random() * 0.02 + 0.005,
        twinkleOffset: Math.random() * Math.PI * 2,
      });
    }

    let time = 0;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      time += 1;

      particles.forEach((p) => {
        // Swirl motion
        const swirlX = Math.sin(time * 0.005 + p.twinkleOffset) * 0.15;
        const swirlY = Math.cos(time * 0.004 + p.twinkleOffset) * 0.15;
        p.x += p.vx + swirlX;
        p.y += p.vy + swirlY;

        // Wrap around
        if (p.x < -10) p.x = canvas.width + 10;
        if (p.x > canvas.width + 10) p.x = -10;
        if (p.y < -10) p.y = canvas.height + 10;
        if (p.y > canvas.height + 10) p.y = -10;

        // Twinkle
        const twinkle = Math.sin(time * p.twinkleSpeed + p.twinkleOffset);
        const currentOpacity = p.opacity * (0.5 + twinkle * 0.5);

        // Draw sparkle
        ctx.save();
        ctx.globalAlpha = currentOpacity;
        ctx.fillStyle = p.color;
        ctx.shadowColor = p.color;
        ctx.shadowBlur = 8;

        // Draw 4-point star
        const s = p.size * (0.8 + twinkle * 0.3);
        ctx.beginPath();
        ctx.moveTo(p.x, p.y - s * 2);
        ctx.lineTo(p.x + s * 0.4, p.y - s * 0.4);
        ctx.lineTo(p.x + s * 2, p.y);
        ctx.lineTo(p.x + s * 0.4, p.y + s * 0.4);
        ctx.lineTo(p.x, p.y + s * 2);
        ctx.lineTo(p.x - s * 0.4, p.y + s * 0.4);
        ctx.lineTo(p.x - s * 2, p.y);
        ctx.lineTo(p.x - s * 0.4, p.y - s * 0.4);
        ctx.closePath();
        ctx.fill();
        ctx.restore();
      });

      animationId = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none"
    />
  );
}

function BunnyLogo({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 80 100" fill="currentColor">
      {/* Ears */}
      <path d="M25 40L20 5L35 30Z" fill="currentColor" />
      <path d="M55 40L60 5L45 30Z" fill="currentColor" />
      {/* Head */}
      <ellipse cx="40" cy="55" rx="25" ry="22" fill="currentColor" />
      {/* Eyes */}
      <circle cx="30" cy="50" r="5" fill="#e84393" />
      <circle cx="50" cy="50" r="5" fill="#e84393" />
      <circle cx="30" cy="50" r="2" fill="#0a0a0a" />
      <circle cx="50" cy="50" r="2" fill="#0a0a0a" />
      {/* Nose */}
      <path d="M37 60L40 57L43 60L40 62Z" fill="#e84393" />
      {/* Cross on forehead */}
      <line x1="40" y1="38" x2="40" y2="48" stroke="#e84393" strokeWidth="2" />
      <line x1="35" y1="43" x2="45" y2="43" stroke="#e84393" strokeWidth="2" />
    </svg>
  );
}

export default function Home() {
  const [email, setEmail] = useState("");
  const [persona, setPersona] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubmitting(true);
    await new Promise((r) => setTimeout(r, 800));
    setSubmitted(true);
    setSubmitting(false);
  };

  return (
    <div className="min-h-screen bg-background text-white">
      {/* ═══ HERO ═══ */}
      <section className="relative min-h-screen flex items-center justify-center px-6 overflow-hidden bg-white">
        <GlitterCanvas />

        {/* Gradient transition to dark at bottom */}
        <div className="absolute bottom-0 left-0 right-0 h-[40vh] bg-gradient-to-b from-transparent via-[#111111]/60 to-[#111111] pointer-events-none z-20" />

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <BunnyLogo className="w-16 h-20 mx-auto mb-8 text-gray-900" />

          <h1 className="text-6xl md:text-8xl font-black uppercase tracking-tighter mb-4">
            <span className="text-gray-900">Wonder</span>
            <span className="text-pink-neon animate-neon">Punk</span>
          </h1>

          <div className="holographic h-[2px] w-48 mx-auto mb-6" />

          <p className="text-xl md:text-2xl font-light tracking-widest text-gray-400 uppercase mb-3">
            Wonder, Delivered.
          </p>

          <p className="text-lg text-gray-400 max-w-xl mx-auto mb-12">
            Magic mail from magical friends and family.
            <br />
            <span className="text-gray-400/60">
              Personalised, illustrated letters that land in a
              child&apos;s letterbox — from the people who love them most.
            </span>
          </p>

          <a
            href="#waitlist"
            className="inline-block bg-pink-neon text-white px-10 py-4 rounded-none text-lg font-bold uppercase tracking-wider hover:bg-pink transition-colors shadow-[0_0_30px_#e8439360]"
          >
            Join the Waitlist
          </a>
        </div>
      </section>

      {/* ═══ THE PROBLEM ═══ */}
      <section className="pt-32 pb-24 px-6 bg-gradient-to-b from-[#111111] to-gray-900 relative">
        <div className="max-w-4xl mx-auto md:flex md:items-center md:gap-16">
          <div className="md:w-1/2 mb-10 md:mb-0">
            <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tight text-white mb-8">
              You love a kid<br />
              who lives too<br />
              <span className="text-pink-neon">far away.</span>
            </h2>
            <div className="space-y-5 text-lg text-white/50 leading-relaxed">
              <p>
                You&apos;re the fun uncle. The cool aunty. The grandparent on
                the other side of the country. The godparent who shows up at
                Christmas with the best present but fades between visits.
              </p>
              <p>
                You FaceTime, but a four-year-old tolerates that for about 90
                seconds. You send a gift card. A book they already have.
              </p>
              <p className="text-white text-xl font-bold border-l-2 border-pink-neon pl-6">
                None of it builds a real connection. None of it is magic.
              </p>
            </div>
          </div>
          <div className="md:w-1/2">
            <LetterboxMoment className="w-full" />
          </div>
        </div>
      </section>

      {/* ═══ HOW IT WORKS — PARALLAX SCROLL ═══ */}
      <ParallaxSteps />

      {/* ═══ FOR WHO ═══ */}
      <section className="py-32 px-6 bg-gradient-to-b from-background via-[#0d0d18] to-background relative overflow-hidden">
        {/* Subtle ambient glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-pink-neon/[0.03] blur-[100px] pointer-events-none" />

        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tight text-white mb-16">
            Built for the <span className="text-pink-neon">misfits</span>
            <br />who love kids.
          </h2>

          {/* Staggered glass cards */}
          <div className="max-w-3xl mx-auto space-y-6">
            {[
              {
                who: "The Gay Uncle",
                desc: "You adore your nieces and nephews. Now you can be the one who sends them weekly magic.",
                color: "#e84393",
                align: "mr-auto",
              },
              {
                who: "The Overseas Grandparent",
                desc: "Twelve thousand kilometres away but present in their imagination every single fortnight.",
                color: "#00d4ff",
                align: "ml-auto",
              },
              {
                who: "The Fun Aunty",
                desc: "You're the godmother, the chosen family, the one who wants to be more than a birthday visitor.",
                color: "#6c5ce7",
                align: "mr-auto md:ml-12",
              },
              {
                who: "The FIFO Parent",
                desc: "Two weeks on, one week off. Your letters arrive even when you can't.",
                color: "#fd79a8",
                align: "ml-auto md:mr-12",
              },
            ].map((p) => (
              <div
                key={p.who}
                className={`${p.align} max-w-sm p-8 rounded-2xl backdrop-blur-sm text-left`}
                style={{
                  background: `linear-gradient(135deg, ${p.color}08, ${p.color}03)`,
                  border: `1px solid ${p.color}20`,
                  boxShadow: `0 0 30px ${p.color}08`,
                }}
              >
                <h3
                  className="font-bold text-lg mb-3 uppercase tracking-wide"
                  style={{ color: p.color }}
                >
                  {p.who}
                </h3>
                <p className="text-white/50 text-sm leading-relaxed">
                  {p.desc}
                </p>
              </div>
            ))}
          </div>

          <p className="mt-16 text-white/20 text-sm tracking-widest">
            All family shapes welcome. Chosen family. Blended family.
            <br />Any configuration of people who love a kid.
          </p>
        </div>
      </section>

      {/* ═══ THE MOMENT ═══ */}
      <section className="py-32 px-6 bg-gradient-to-b from-background to-gray-900 relative">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tight text-white mb-4">
            The <span className="text-pink-neon">moment</span> it arrives.
          </h2>
          <p className="text-white/40 mb-12 text-lg">
            This is what it&apos;s all about. The letterbox. The envelope. The explosion of wonder.
          </p>
          <LetterboxExplosion className="w-full max-w-2xl mx-auto" />
        </div>
      </section>

      {/* ═══ WHAT'S INSIDE ═══ */}
      <MagicMailReveal />

      {/* ═══ LETTER FOLD & FLY ═══ */}
      <LetterFoldFly />

      {/* ═══ PRICING ═══ */}
      <section className="py-32 px-6 bg-gradient-to-b from-gray-900 to-background">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tight text-white mb-4">
            Less than a <span className="text-pink-neon">coffee</span> a week.
          </h2>
          <p className="text-white/30 mb-12 text-lg">
            Two letters a month. Fortnightly magic that builds anticipation.
          </p>

          <div className="grid md:grid-cols-2 gap-6 max-w-2xl mx-auto">
            <div className="bg-gray-900/50 p-8 text-left border border-white/10">
              <h3 className="text-sm font-bold text-cyan uppercase tracking-widest mb-1">
                Sparkle Post
              </h3>
              <div className="flex items-baseline gap-1 mb-6">
                <span className="text-4xl font-black text-white">$14.95</span>
                <span className="text-white/20">/month</span>
              </div>
              <ul className="space-y-3 text-white/50">
                {[
                  "2 personalised illustrated letters",
                  "AI story engine",
                  "Custom illustrated envelope",
                  "Printed on premium stock",
                  "Posted to their letterbox",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <span className="text-cyan mt-0.5">&#10003;</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-8 text-left neon-border bg-gray-900/50 relative">
              <span className="absolute -top-3 right-6 bg-pink-neon text-white text-xs font-black px-3 py-1 uppercase tracking-wider">
                Most Magic
              </span>
              <h3 className="text-sm font-bold text-pink-neon uppercase tracking-widest mb-1">
                Magic Mail
              </h3>
              <div className="flex items-baseline gap-1 mb-6">
                <span className="text-4xl font-black text-white">$24.95</span>
                <span className="text-white/20">/month</span>
              </div>
              <ul className="space-y-3 text-white/50">
                {[
                  "Everything in Sparkle Post",
                  "Themed props in every letter",
                  "Fairy dust, treasure maps, unicorn poop",
                  "Premium sealed envelope",
                  "Story compilation book option",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <span className="text-pink-neon mt-0.5">&#10003;</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <p className="mt-8 text-white/15 text-sm uppercase tracking-widest">
            Gift subscriptions available in 3, 6, and 12 month packs.
            <br />
            Prices in AUD. Launching in Australia first.
          </p>
        </div>
      </section>

      {/* ═══ WAITLIST ═══ */}
      <section
        id="waitlist"
        className="py-32 px-6 bg-gradient-to-b from-background to-gray-900 relative"
      >
        <div className="max-w-xl mx-auto text-center">
          <BunnyLogo className="w-12 h-16 mx-auto mb-6 text-pink-neon" />
          <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tight text-white mb-4">
            Be first to send <span className="text-pink-neon">magic.</span>
          </h2>
          <p className="text-white/40 mb-10 text-lg">
            We&apos;re launching soon. Join the waitlist and we&apos;ll let
            you know when you can start sending wonder.
          </p>

          {submitted ? (
            <div className="neon-border bg-gray-900/50 p-8">
              <Sparkle className="w-8 h-8 text-pink-neon mx-auto mb-4" />
              <h3 className="text-xl font-black text-white uppercase mb-2">
                You&apos;re on the list.
              </h3>
              <p className="text-white/40">
                The fairies have noted your address.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email"
                required
                className="w-full px-6 py-4 bg-black/50 border border-white/15 text-white placeholder:text-white/25 text-lg focus:outline-none focus:border-pink-neon transition-colors"
              />

              <div className="flex flex-wrap justify-center gap-2">
                <span className="text-white/30 text-sm self-center mr-1 uppercase tracking-wider">
                  I&apos;m a:
                </span>
                {[
                  "Uncle / Aunty",
                  "Grandparent",
                  "Godparent",
                  "Parent",
                  "Other",
                ].map((p) => (
                  <button
                    key={p}
                    type="button"
                    onClick={() => setPersona(p)}
                    className={`px-4 py-2 text-sm transition-colors uppercase tracking-wider ${
                      persona === p
                        ? "bg-pink-neon text-white font-bold"
                        : "border border-white/15 text-white/40 hover:border-pink-neon/50"
                    }`}
                  >
                    {p}
                  </button>
                ))}
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="w-full bg-pink-neon text-white px-8 py-4 text-lg font-black uppercase tracking-wider hover:bg-pink transition-colors disabled:opacity-50 shadow-[0_0_30px_#e8439340]"
              >
                {submitting ? "Joining..." : "Join the Waitlist"}
              </button>
            </form>
          )}
        </div>
      </section>

      {/* ═══ FOOTER ═══ */}
      <footer className="py-12 px-6 bg-background border-t border-white/5">
        <div className="max-w-3xl mx-auto text-center space-y-4">
          <div className="flex items-center justify-center gap-3">
            <BunnyLogo className="w-6 h-8 text-white/40" />
            <p className="text-white/40 font-black text-lg uppercase tracking-wider">
              Wonder<span className="text-pink-neon">Punk</span>
            </p>
          </div>
          <p className="text-sm text-white/20">
            Wonder, Delivered. Magic mail from magical friends and family.
          </p>
          <p className="text-xs text-white/10 uppercase tracking-widest">
            A product of Activate Studios Pty Ltd, Brisbane, Australia.
            <br />
            All families welcome. All magic real.
          </p>
        </div>
      </footer>
    </div>
  );
}
