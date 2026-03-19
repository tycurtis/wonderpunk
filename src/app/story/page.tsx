"use client";

import { useEffect, useRef, useState, useCallback } from "react";

// ─── ELECTRICITY CANVAS ───
function ElectricityCanvas({ className = "" }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    interface Bolt {
      x1: number;
      y1: number;
      x2: number;
      y2: number;
      life: number;
      maxLife: number;
      color: string;
      width: number;
    }

    const bolts: Bolt[] = [];
    const colors = ["#00d4ff", "#74b9ff", "#ff2d95", "#fd79a8", "#0984e3", "#e84393"];

    function createBolt() {
      const w = canvas!.width;
      const h = canvas!.height;
      const side = Math.random();
      let x1: number, y1: number, x2: number, y2: number;

      if (side < 0.25) {
        x1 = Math.random() * w;
        y1 = 0;
        x2 = x1 + (Math.random() - 0.5) * 400;
        y2 = Math.random() * h * 0.6;
      } else if (side < 0.5) {
        x1 = 0;
        y1 = Math.random() * h;
        x2 = Math.random() * w * 0.5;
        y2 = y1 + (Math.random() - 0.5) * 200;
      } else if (side < 0.75) {
        x1 = w;
        y1 = Math.random() * h;
        x2 = w - Math.random() * w * 0.5;
        y2 = y1 + (Math.random() - 0.5) * 200;
      } else {
        x1 = Math.random() * w;
        y1 = Math.random() * h;
        x2 = x1 + (Math.random() - 0.5) * 300;
        y2 = y1 + (Math.random() - 0.5) * 300;
      }

      bolts.push({
        x1, y1, x2, y2,
        life: 0,
        maxLife: 8 + Math.random() * 12,
        color: colors[Math.floor(Math.random() * colors.length)],
        width: 1 + Math.random() * 2,
      });
    }

    function drawLightning(
      ctx: CanvasRenderingContext2D,
      x1: number, y1: number,
      x2: number, y2: number,
      color: string, width: number, opacity: number,
      depth: number
    ) {
      if (depth <= 0) return;

      const segments = 6 + Math.floor(Math.random() * 4);
      const dx = (x2 - x1) / segments;
      const dy = (y2 - y1) / segments;
      const len = Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
      const jitter = len * 0.15;

      ctx.beginPath();
      ctx.moveTo(x1, y1);

      let px = x1, py = y1;
      for (let i = 1; i <= segments; i++) {
        const nx = x1 + dx * i + (i < segments ? (Math.random() - 0.5) * jitter : 0);
        const ny = y1 + dy * i + (i < segments ? (Math.random() - 0.5) * jitter : 0);
        ctx.lineTo(nx, ny);

        // branch
        if (depth > 1 && Math.random() < 0.3) {
          const bx = nx + (Math.random() - 0.5) * jitter * 1.5;
          const by = ny + (Math.random() - 0.5) * jitter * 1.5;
          drawLightning(ctx, nx, ny, bx, by, color, width * 0.5, opacity * 0.6, depth - 1);
        }

        px = nx;
        py = ny;
      }

      ctx.strokeStyle = color;
      ctx.lineWidth = width;
      ctx.globalAlpha = opacity;
      ctx.shadowColor = color;
      ctx.shadowBlur = 15;
      ctx.stroke();

      // glow pass
      ctx.lineWidth = width * 3;
      ctx.globalAlpha = opacity * 0.3;
      ctx.shadowBlur = 30;
      ctx.stroke();

      ctx.globalAlpha = 1;
      ctx.shadowBlur = 0;
    }

    // floating electric particles
    interface Particle {
      x: number; y: number;
      vx: number; vy: number;
      size: number; color: string;
      pulse: number; pulseSpeed: number;
    }
    const particles: Particle[] = [];
    for (let i = 0; i < 80; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        size: Math.random() * 2.5 + 0.5,
        color: colors[Math.floor(Math.random() * colors.length)],
        pulse: Math.random() * Math.PI * 2,
        pulseSpeed: 0.02 + Math.random() * 0.03,
      });
    }

    let frame = 0;

    const animate = () => {
      ctx.fillStyle = "rgba(5, 5, 15, 0.15)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      frame++;

      // spawn bolts
      if (Math.random() < 0.08) createBolt();

      // draw & update bolts
      for (let i = bolts.length - 1; i >= 0; i--) {
        const b = bolts[i];
        b.life++;
        const progress = b.life / b.maxLife;
        const opacity = progress < 0.3 ? progress / 0.3 : 1 - (progress - 0.3) / 0.7;

        if (opacity > 0) {
          drawLightning(ctx, b.x1, b.y1, b.x2, b.y2, b.color, b.width, opacity, 3);
        }

        if (b.life >= b.maxLife) bolts.splice(i, 1);
      }

      // draw particles
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        p.pulse += p.pulseSpeed;

        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;

        const glow = 0.3 + Math.sin(p.pulse) * 0.4;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = glow;
        ctx.shadowColor = p.color;
        ctx.shadowBlur = 10;
        ctx.fill();
        ctx.globalAlpha = 1;
        ctx.shadowBlur = 0;
      });

      // draw connecting arcs between nearby particles occasionally
      if (frame % 3 === 0) {
        for (let i = 0; i < particles.length; i++) {
          for (let j = i + 1; j < particles.length; j++) {
            const dist = Math.sqrt((particles[i].x - particles[j].x) ** 2 + (particles[i].y - particles[j].y) ** 2);
            if (dist < 80 && Math.random() < 0.02) {
              ctx.beginPath();
              ctx.moveTo(particles[i].x, particles[i].y);
              ctx.lineTo(particles[j].x, particles[j].y);
              ctx.strokeStyle = particles[i].color;
              ctx.globalAlpha = 0.15;
              ctx.lineWidth = 0.5;
              ctx.stroke();
              ctx.globalAlpha = 1;
            }
          }
        }
      }

      animationId = requestAnimationFrame(animate);
    };

    // clear canvas initially
    ctx.fillStyle = "#05050f";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    animate();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return <canvas ref={canvasRef} className={`absolute inset-0 ${className}`} />;
}

// ─── ELECTRIC TEXT ───
function ElectricText({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <span
      className={`relative inline-block ${className}`}
      style={{
        textShadow: "0 0 10px #00d4ff, 0 0 30px #00d4ff80, 0 0 60px #0984e340",
      }}
    >
      {children}
    </span>
  );
}

// ─── ARC LINE ───
function ArcDivider() {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;
    let frame = 0;
    let animId: number;

    const animate = () => {
      frame++;
      const paths = svg.querySelectorAll("path");
      paths.forEach((path, i) => {
        const offset = Math.sin(frame * 0.05 + i) * 5;
        const d = `M0,25 Q${125 + offset},${5 + Math.sin(frame * 0.03 + i * 2) * 15} 250,25 Q${375 + offset},${45 + Math.cos(frame * 0.04 + i) * 15} 500,25`;
        path.setAttribute("d", d);
      });
      animId = requestAnimationFrame(animate);
    };
    animate();
    return () => cancelAnimationFrame(animId);
  }, []);

  return (
    <svg ref={svgRef} viewBox="0 0 500 50" className="w-full max-w-2xl mx-auto h-12" preserveAspectRatio="none">
      <path d="M0,25 Q125,5 250,25 Q375,45 500,25" fill="none" stroke="#00d4ff" strokeWidth="1.5" opacity="0.6" />
      <path d="M0,25 Q125,5 250,25 Q375,45 500,25" fill="none" stroke="#ff2d95" strokeWidth="1" opacity="0.4" />
      <path d="M0,25 Q125,5 250,25 Q375,45 500,25" fill="none" stroke="#74b9ff" strokeWidth="0.5" opacity="0.3" />
    </svg>
  );
}

// ─── STORY SECTION ───
function StorySection({
  title,
  body,
  accent = "blue",
  align = "left",
}: {
  title: string;
  body: React.ReactNode;
  accent?: "blue" | "pink";
  align?: "left" | "right" | "center";
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.2 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const accentColor = accent === "pink" ? "#ff2d95" : "#00d4ff";
  const textAlign = align === "center" ? "text-center" : align === "right" ? "text-right" : "text-left";

  return (
    <div
      ref={ref}
      className={`transition-all duration-1000 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"} ${textAlign}`}
    >
      <h2
        className="text-3xl md:text-5xl font-black uppercase tracking-tight mb-6"
        style={{ color: accentColor, textShadow: `0 0 20px ${accentColor}60` }}
      >
        {title}
      </h2>
      <div className="text-lg md:text-xl text-white/60 leading-relaxed max-w-2xl space-y-4" style={align === "center" ? { margin: "0 auto" } : align === "right" ? { marginLeft: "auto" } : {}}>
        {body}
      </div>
    </div>
  );
}

// ─── VOLTAGE METER ───
function VoltageMeter({ label, value, color }: { label: string; value: number; color: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.3 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div ref={ref} className="space-y-2">
      <div className="flex justify-between text-sm uppercase tracking-wider">
        <span className="text-white/40">{label}</span>
        <span style={{ color }}>{value}%</span>
      </div>
      <div className="h-1 bg-white/5 rounded-full overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-1500 ease-out"
          style={{
            width: visible ? `${value}%` : "0%",
            background: `linear-gradient(90deg, ${color}, ${color}80)`,
            boxShadow: `0 0 10px ${color}60`,
            transitionDuration: "1.5s",
          }}
        />
      </div>
    </div>
  );
}

// ─── MAIN PAGE ───
export default function StoryPage() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    setMousePos({ x: e.clientX, y: e.clientY });
  }, []);

  return (
    <div className="bg-[#05050f] text-white min-h-screen overflow-hidden" onMouseMove={handleMouseMove}>
      {/* ═══ HERO ═══ */}
      <section className="relative min-h-screen flex items-center justify-center">
        <ElectricityCanvas />

        {/* Mouse-following glow */}
        <div
          className="pointer-events-none fixed w-96 h-96 rounded-full opacity-10 blur-3xl z-0"
          style={{
            left: mousePos.x - 192,
            top: mousePos.y - 192,
            background: "radial-gradient(circle, #00d4ff 0%, #ff2d95 50%, transparent 70%)",
          }}
        />

        <div className="relative z-10 text-center px-6">
          <div className="mb-6">
            <span className="text-sm uppercase tracking-[0.3em] text-cyan/60 font-mono">
              // initializing brand.story
            </span>
          </div>

          <h1 className="text-7xl md:text-[10rem] font-black uppercase leading-none tracking-tighter">
            <span className="text-white" style={{ textShadow: "0 0 40px #00d4ff40" }}>
              Wonder
            </span>
            <br />
            <ElectricText className="text-[#ff2d95]">Punk</ElectricText>
          </h1>

          <div className="mt-8 flex items-center justify-center gap-4">
            <div className="h-px w-16 bg-gradient-to-r from-transparent to-cyan/50" />
            <span className="text-xs uppercase tracking-[0.5em] text-white/30">
              Wonder, Delivered.
            </span>
            <div className="h-px w-16 bg-gradient-to-l from-transparent to-pink-neon/50" />
          </div>

          <p className="mt-12 text-white/30 text-lg max-w-lg mx-auto leading-relaxed">
            This is the story of how a simple idea became
            something <span className="text-cyan">electric</span>.
          </p>

          <div className="mt-16 animate-bounce">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="mx-auto text-white/20">
              <path d="M12 5v14M5 12l7 7 7-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </div>
        </div>
      </section>

      {/* ═══ THE SPARK ═══ */}
      <section className="relative py-32 px-6">
        <ArcDivider />
        <div className="max-w-5xl mx-auto mt-20">
          <StorySection
            title="The Spark"
            accent="blue"
            body={
              <>
                <p>
                  It started with a question no one was asking:
                  <strong className="text-white"> How do you stay in a kid&apos;s imagination when you live on the other side of the country?</strong>
                </p>
                <p>
                  FaceTime lasts 90 seconds with a four-year-old. Gift cards feel hollow.
                  Birthday visits are great — but they&apos;re once a year.
                </p>
                <p>
                  The people who love kids the most — uncles, aunties, grandparents, godparents, chosen family —
                  had no tool for ongoing, magical connection.
                </p>
                <p className="text-white/80 border-l-2 border-cyan pl-6">
                  Until now.
                </p>
              </>
            }
          />
        </div>
      </section>

      {/* ═══ THE CHARGE ═══ */}
      <section className="relative py-32 px-6">
        <ArcDivider />
        <div className="max-w-5xl mx-auto mt-20">
          <StorySection
            title="The Charge"
            accent="pink"
            align="right"
            body={
              <>
                <p>
                  Wonderpunk is a subscription service that sends <strong className="text-pink-neon">personalised, AI-crafted illustrated letters</strong> to the kids you love.
                </p>
                <p>
                  Real, physical mail. In their letterbox. Addressed to them.
                  With fairy dust, treasure maps, and unicorn poop tucked inside.
                </p>
                <p>
                  Every letter is unique — powered by an AI story engine that knows
                  the child&apos;s name, their interests, their favourite animals,
                  and the adult who&apos;s sending the magic.
                </p>
                <p className="text-white/80 border-r-2 border-pink-neon pr-6 text-right">
                  You subscribe. They believe in magic. It&apos;s that simple.
                </p>
              </>
            }
          />
        </div>
      </section>

      {/* ═══ THE CURRENT ═══ */}
      <section className="relative py-32 px-6">
        <ArcDivider />
        <div className="max-w-5xl mx-auto mt-20">
          <StorySection
            title="The Current"
            accent="blue"
            align="center"
            body={
              <>
                <p>
                  Wonderpunk is for the misfits who love kids.
                  The ones who don&apos;t fit the &quot;parent&quot; box but love just as fiercely.
                </p>
              </>
            }
          />

          <div className="grid md:grid-cols-2 gap-6 mt-16 max-w-3xl mx-auto">
            {[
              { who: "The Gay Uncle", icon: "zap", desc: "You adore your nieces and nephews. Now you're the one who sends weekly magic." },
              { who: "The Overseas Grandparent", icon: "globe", desc: "Twelve thousand kilometres away. Present in their imagination every fortnight." },
              { who: "The Fun Aunty", icon: "heart", desc: "Godmother. Chosen family. More than a birthday visitor." },
              { who: "The FIFO Parent", icon: "send", desc: "Two weeks on, one week off. Your letters arrive even when you can't." },
            ].map((p) => (
              <div
                key={p.who}
                className="border border-white/5 bg-white/[0.02] p-8 backdrop-blur-sm hover:border-cyan/30 transition-colors group"
              >
                <h3 className="text-pink-neon font-black uppercase tracking-wide text-lg mb-3 group-hover:text-cyan transition-colors">
                  {p.who}
                </h3>
                <p className="text-white/40 leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ THE VOLTAGE ═══ */}
      <section className="relative py-32 px-6">
        <ArcDivider />
        <div className="max-w-3xl mx-auto mt-20">
          <StorySection
            title="The Voltage"
            accent="pink"
            align="center"
            body={
              <p>
                Every element of Wonderpunk is designed to carry maximum emotional charge.
              </p>
            }
          />

          <div className="mt-16 space-y-6">
            <VoltageMeter label="Emotional Connection" value={97} color="#ff2d95" />
            <VoltageMeter label="Wonder Factor" value={94} color="#00d4ff" />
            <VoltageMeter label="Imagination Fuel" value={91} color="#74b9ff" />
            <VoltageMeter label="Punk Energy" value={88} color="#ff2d95" />
            <VoltageMeter label="Magic Per Dollar" value={96} color="#00d4ff" />
          </div>
        </div>
      </section>

      {/* ═══ WHAT'S INSIDE ═══ */}
      <section className="relative py-32 px-6">
        <ArcDivider />
        <div className="max-w-4xl mx-auto mt-20">
          <StorySection
            title="What's Inside"
            accent="blue"
            align="center"
            body={
              <p>Every letter is a pocket-sized adventure.</p>
            }
          />

          <div className="mt-16 grid md:grid-cols-3 gap-1">
            {[
              { name: "The Letter", desc: "Personalised, illustrated, printed on premium stock. Their name woven into every adventure.", color: "#00d4ff" },
              { name: "The Props", desc: "Fairy dust. Treasure maps. Unicorn poop. Stickers. Tiny mysteries sealed in wax.", color: "#ff2d95" },
              { name: "The Envelope", desc: "Custom illustrated. Addressed by name. Posted to their letterbox.", color: "#74b9ff" },
            ].map((item) => (
              <div
                key={item.name}
                className="border border-white/5 bg-white/[0.02] p-10 text-center hover:bg-white/[0.04] transition-colors"
              >
                <div
                  className="w-3 h-3 rounded-full mx-auto mb-6"
                  style={{ background: item.color, boxShadow: `0 0 20px ${item.color}60` }}
                />
                <h3
                  className="text-xl font-black uppercase tracking-wide mb-4"
                  style={{ color: item.color }}
                >
                  {item.name}
                </h3>
                <p className="text-white/40 leading-relaxed text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ THE FREQUENCY ═══ */}
      <section className="relative py-32 px-6">
        <ArcDivider />
        <div className="max-w-3xl mx-auto mt-20 text-center">
          <StorySection
            title="The Frequency"
            accent="pink"
            align="center"
            body={
              <p>Two tiers. One mission: deliver wonder.</p>
            }
          />

          <div className="mt-16 grid md:grid-cols-2 gap-6 max-w-2xl mx-auto">
            <div className="border border-cyan/20 bg-white/[0.02] p-10 text-left">
              <span className="text-xs uppercase tracking-[0.3em] text-cyan/60 font-mono block mb-4">
                // sparkle_post
              </span>
              <div className="flex items-baseline gap-1 mb-6">
                <span className="text-5xl font-black text-white" style={{ textShadow: "0 0 20px #00d4ff40" }}>$14.95</span>
                <span className="text-white/20">/mo</span>
              </div>
              <ul className="space-y-3 text-white/40 text-sm">
                <li className="flex gap-2"><span className="text-cyan">+</span> 2 personalised illustrated letters</li>
                <li className="flex gap-2"><span className="text-cyan">+</span> AI story engine</li>
                <li className="flex gap-2"><span className="text-cyan">+</span> Custom illustrated envelope</li>
                <li className="flex gap-2"><span className="text-cyan">+</span> Premium print stock</li>
                <li className="flex gap-2"><span className="text-cyan">+</span> Posted to their letterbox</li>
              </ul>
            </div>

            <div className="border border-pink-neon/30 bg-white/[0.02] p-10 text-left relative overflow-hidden">
              <div className="absolute top-0 right-0 bg-pink-neon text-white text-[10px] font-black px-3 py-1 uppercase tracking-wider">
                Max Voltage
              </div>
              <span className="text-xs uppercase tracking-[0.3em] text-pink-neon/60 font-mono block mb-4">
                // magic_mail
              </span>
              <div className="flex items-baseline gap-1 mb-6">
                <span className="text-5xl font-black text-white" style={{ textShadow: "0 0 20px #ff2d9540" }}>$24.95</span>
                <span className="text-white/20">/mo</span>
              </div>
              <ul className="space-y-3 text-white/40 text-sm">
                <li className="flex gap-2"><span className="text-pink-neon">+</span> Everything in Sparkle Post</li>
                <li className="flex gap-2"><span className="text-pink-neon">+</span> Themed props in every letter</li>
                <li className="flex gap-2"><span className="text-pink-neon">+</span> Fairy dust, treasure maps, unicorn poop</li>
                <li className="flex gap-2"><span className="text-pink-neon">+</span> Premium sealed envelope</li>
                <li className="flex gap-2"><span className="text-pink-neon">+</span> Story compilation book option</li>
              </ul>
            </div>
          </div>

          <p className="mt-8 text-white/15 text-xs uppercase tracking-[0.3em] font-mono">
            Prices in AUD. Launching in Australia first.
          </p>
        </div>
      </section>

      {/* ═══ THE SIGNAL ═══ */}
      <section className="relative py-32 px-6">
        <ArcDivider />
        <div className="max-w-2xl mx-auto mt-20 text-center">
          <StorySection
            title="The Signal"
            accent="blue"
            align="center"
            body={
              <p>
                Wonderpunk is launching soon. Get on the frequency.
              </p>
            }
          />

          <div className="mt-12">
            <a
              href="https://wonderpunk.studio#waitlist"
              className="inline-block px-12 py-5 font-black text-lg uppercase tracking-wider transition-all"
              style={{
                background: "linear-gradient(135deg, #00d4ff 0%, #ff2d95 100%)",
                boxShadow: "0 0 40px #00d4ff30, 0 0 80px #ff2d9520",
              }}
            >
              Join the Waitlist
            </a>
          </div>

          <p className="mt-8 text-white/20 text-sm">
            wonderpunk.studio
          </p>
        </div>
      </section>

      {/* ═══ FOOTER ═══ */}
      <footer className="py-16 px-6 border-t border-white/5">
        <div className="max-w-3xl mx-auto text-center space-y-4">
          <h3 className="text-2xl font-black uppercase tracking-tighter">
            <span className="text-white/60">Wonder</span>
            <span className="text-pink-neon">Punk</span>
          </h3>
          <p className="text-white/15 text-xs uppercase tracking-[0.3em] font-mono">
            A product of Activate Studios // Brisbane, Australia
          </p>
          <p className="text-white/10 text-xs">
            All families welcome. All magic real.
          </p>
        </div>
      </footer>
    </div>
  );
}
