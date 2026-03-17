"use client";

import { useState } from "react";

function Sparkle({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      width="24"
      height="24"
    >
      <path d="M12 0L14.59 8.41L23 12L14.59 15.59L12 24L9.41 15.59L1 12L9.41 8.41L12 0Z" />
    </svg>
  );
}

function EnvelopeIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 120 90"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect
        x="4"
        y="4"
        width="112"
        height="82"
        rx="6"
        fill="#ffffff"
        stroke="#e84393"
        strokeWidth="3"
      />
      <path
        d="M4 10L60 52L116 10"
        stroke="#e84393"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <circle cx="60" cy="72" r="8" fill="#0984e3" />
      <path
        d="M56 72L59 75L65 69"
        stroke="#ffffff"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function StarBurst() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <Sparkle className="absolute top-[15%] left-[10%] w-4 h-4 text-pink animate-sparkle" />
      <Sparkle className="absolute top-[25%] right-[15%] w-3 h-3 text-blue-light animate-sparkle [animation-delay:0.5s]" />
      <Sparkle className="absolute top-[60%] left-[8%] w-3 h-3 text-pink-light animate-sparkle [animation-delay:1s]" />
      <Sparkle className="absolute top-[45%] right-[10%] w-5 h-5 text-blue animate-sparkle [animation-delay:0.3s]" />
      <Sparkle className="absolute top-[80%] left-[20%] w-3 h-3 text-purple-light animate-sparkle [animation-delay:1.5s]" />
      <Sparkle className="absolute top-[10%] right-[30%] w-4 h-4 text-pink animate-sparkle [animation-delay:0.8s]" />
    </div>
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
    // TODO: Connect to email service (e.g., Mailchimp, ConvertKit, or Supabase)
    await new Promise((r) => setTimeout(r, 800));
    setSubmitted(true);
    setSubmitting(false);
  };

  return (
    <div className="min-h-screen">
      {/* ═══ HERO ═══ */}
      <section className="relative min-h-screen flex items-center justify-center px-6 overflow-hidden bg-gradient-to-br from-white via-ice to-pink-light/10">
        <StarBurst />
        <div className="max-w-3xl mx-auto text-center relative z-10">
          <div className="mb-8 flex justify-center">
            <div className="animate-envelope">
              <EnvelopeIcon className="w-28 h-28 md:w-36 md:h-36" />
            </div>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-navy mb-4">
            wonder
            <span className="text-pink">punk</span>
          </h1>

          <p className="text-xl md:text-2xl font-light text-blue tracking-wide mb-3">
            Wonder, Delivered.
          </p>

          <p className="text-lg md:text-xl text-navy/60 max-w-xl mx-auto mb-10">
            Magic mail from magical friends and family.
            <br />
            <span className="text-navy/40">
              Personalised, illustrated letters that land in a
              child&apos;s letterbox — from the people who love them most.
            </span>
          </p>

          <a
            href="#waitlist"
            className="inline-block bg-pink text-white px-8 py-4 rounded-full text-lg font-medium hover:bg-pink-dark transition-colors shadow-lg shadow-pink/25"
          >
            Join the waitlist
          </a>
        </div>
      </section>

      {/* ═══ THE PROBLEM ═══ */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-navy mb-8 text-center">
            You love a kid who lives too far away.
          </h2>
          <div className="space-y-6 text-lg text-navy/60 leading-relaxed">
            <p>
              You&apos;re the fun uncle. The cool aunty. The grandparent on
              the other side of the country. The godparent who shows up at
              Christmas with the best present but fades between visits.
            </p>
            <p>
              You FaceTime, but a four-year-old tolerates that for about 90
              seconds before showing you a toy and wandering off. You send a
              gift card. A book they already have. A text that gets lost in
              the group chat.
            </p>
            <p className="text-navy font-medium text-xl">
              None of it builds a real, ongoing connection. None of it is
              magic.
            </p>
          </div>
        </div>
      </section>

      {/* ═══ THE SOLUTION ═══ */}
      <section className="py-24 px-6 relative bg-gradient-to-b from-white to-ice">
        <StarBurst />
        <div className="max-w-3xl mx-auto relative z-10">
          <h2 className="text-3xl md:text-4xl font-bold text-navy mb-4 text-center">
            What if you could be the most anticipated
            <br />
            person in their week?
          </h2>
          <p className="text-center text-navy/50 mb-16 text-lg">
            Wonderpunk lets you send personalised, illustrated magic letters
            to the kids you love — no matter where you are.
          </p>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-2xl p-8 text-center shadow-sm border border-ice-dark">
              <div className="w-14 h-14 rounded-full bg-pink/10 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">&#9997;&#65039;</span>
              </div>
              <h3 className="text-xl font-bold text-navy mb-3">
                You craft the story
              </h3>
              <p className="text-navy/50">
                Our AI helps you write age-perfect letters with beautiful
                illustrations. Add personal touches only you would know.
                Takes 5 minutes.
              </p>
            </div>
            <div className="bg-white rounded-2xl p-8 text-center shadow-sm border border-ice-dark">
              <div className="w-14 h-14 rounded-full bg-blue/10 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">&#10024;</span>
              </div>
              <h3 className="text-xl font-bold text-navy mb-3">
                We make it real
              </h3>
              <p className="text-navy/50">
                We print your letter on beautiful stock, add props
                (fairy dust, treasure maps, unicorn poop), and post it to
                their letterbox.
              </p>
            </div>
            <div className="bg-white rounded-2xl p-8 text-center shadow-sm border border-ice-dark">
              <div className="w-14 h-14 rounded-full bg-purple/10 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">&#128141;</span>
              </div>
              <h3 className="text-xl font-bold text-navy mb-3">
                They get magic mail
              </h3>
              <p className="text-navy/50">
                A letter arrives addressed to THEM. Their name, their
                adventure, from someone who loves them. They wait for the
                next one. Every. Single. Fortnight.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ FOR WHO ═══ */}
      <section className="py-24 px-6 bg-gradient-to-br from-navy to-blue-dark text-white">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-12">
            Built for the people who love kids from far away.
          </h2>
          <div className="grid sm:grid-cols-2 gap-6 text-left max-w-2xl mx-auto">
            {[
              {
                who: "The Gay Uncle",
                desc: "You adore your nieces and nephews. Now you can be the one who sends them weekly magic.",
              },
              {
                who: "The Overseas Grandparent",
                desc: "Twelve thousand kilometres away but present in their imagination every single fortnight.",
              },
              {
                who: "The Fun Aunty",
                desc: "You're the godmother, the chosen family, the one who wants to be more than a birthday visitor.",
              },
              {
                who: "The FIFO Parent",
                desc: "Two weeks on, one week off. Your letters arrive even when you can't.",
              },
            ].map((p) => (
              <div
                key={p.who}
                className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/10"
              >
                <h3 className="font-bold text-pink-light text-lg mb-2">
                  {p.who}
                </h3>
                <p className="text-white/70 text-sm leading-relaxed">
                  {p.desc}
                </p>
              </div>
            ))}
          </div>
          <p className="mt-10 text-white/40 text-sm">
            All family shapes welcome. Chosen family. Blended family.
            Any configuration of people who love a kid.
          </p>
        </div>
      </section>

      {/* ═══ HOW IT WORKS ═══ */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-navy mb-16 text-center">
            How it works
          </h2>
          <div className="space-y-12">
            {[
              {
                step: "01",
                title: "Tell us about the kid",
                desc: "Their name, age, interests. Does she love dinosaurs? Is he obsessed with space? Does the dog have a funny name? The more you share, the more personal the magic.",
                color: "pink",
              },
              {
                step: "02",
                title: "Choose your adventure",
                desc: "Pick a story arc — a 12-week quest to find the Rainbow Dragon, a mystery in the Enchanted Forest, or go freestyle. Our AI writes children's literature, not generic text.",
                color: "blue",
              },
              {
                step: "03",
                title: "Make it yours",
                desc: "The AI drafts each letter with age-perfect language and beautiful illustrations. You review, tweak, and add the personal touches only you can — \"Remember when we found that shell at the beach? Well...\"",
                color: "purple",
              },
              {
                step: "04",
                title: "We handle the rest",
                desc: "Printed on premium stock, sealed in an illustrated envelope with their name in handwriting, sometimes with a prop tucked inside. Posted to their letterbox. Magic, delivered.",
                color: "pink",
              },
            ].map((s) => (
              <div key={s.step} className="flex gap-6 items-start">
                <div
                  className={`flex-shrink-0 w-14 h-14 rounded-full flex items-center justify-center ${
                    s.color === "pink"
                      ? "bg-pink/10 text-pink"
                      : s.color === "blue"
                        ? "bg-blue/10 text-blue"
                        : "bg-purple/10 text-purple"
                  }`}
                >
                  <span className="font-bold text-lg">{s.step}</span>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-navy mb-2">
                    {s.title}
                  </h3>
                  <p className="text-navy/50 leading-relaxed">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ SAMPLE LETTER ═══ */}
      <section className="py-24 px-6 bg-ice">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-navy mb-10 text-center">
            A letter from Stardust
          </h2>
          <div className="bg-white rounded-2xl p-8 md:p-12 shadow-lg border border-ice-dark">
            <p className="text-sm text-navy/30 mb-4 italic">
              Week 1: The First Sparkle
            </p>
            <div className="font-serif text-navy/70 leading-relaxed space-y-4 text-lg">
              <p>Dear Little One,</p>
              <p>
                Something extraordinary happened last night. The fairies
                held a Grand Council under the old oak tree and YOUR name
                came up. They said you have the rarest kind of magic — the
                kind that comes from a truly kind heart.
              </p>
              <p>
                So they asked me, Stardust the Unicorn, to write to you
                every fortnight and share the news from our enchanted world.
              </p>
              <p>
                Look closely at your windowsill tonight. If you see a faint
                shimmer, that means the fairy mail carriers found your house.
              </p>
              <p>More soon.</p>
              <p className="italic">
                Your friend in magic,
                <br />
                Stardust
              </p>
            </div>
            <div className="mt-6 pt-6 border-t border-ice-dark flex items-center gap-3 text-sm text-navy/30">
              <span className="bg-pink/10 text-pink px-3 py-1 rounded-full text-xs font-medium">
                Ages 3-6
              </span>
              <span>AI-crafted, human-hearted</span>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ PRICING ═══ */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-navy mb-4">
            Less than a coffee a week.
          </h2>
          <p className="text-navy/50 mb-12 text-lg">
            Two letters a month. Fortnightly magic that builds anticipation.
          </p>

          <div className="grid md:grid-cols-2 gap-8 max-w-2xl mx-auto">
            <div className="bg-ice rounded-2xl p-8 text-left border-2 border-transparent">
              <h3 className="text-sm font-bold text-blue uppercase tracking-wider mb-1">
                Sparkle Post
              </h3>
              <div className="flex items-baseline gap-1 mb-4">
                <span className="text-4xl font-bold text-navy">$14.95</span>
                <span className="text-navy/30">/month</span>
              </div>
              <ul className="space-y-3 text-navy/60">
                <li className="flex items-start gap-2">
                  <span className="text-blue mt-0.5">&#10003;</span>
                  2 personalised illustrated letters
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue mt-0.5">&#10003;</span>
                  AI story engine with children&apos;s lit principles
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue mt-0.5">&#10003;</span>
                  Custom illustrated envelope
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue mt-0.5">&#10003;</span>
                  Printed on premium stock
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue mt-0.5">&#10003;</span>
                  Posted to their letterbox
                </li>
              </ul>
            </div>

            <div className="bg-ice rounded-2xl p-8 text-left border-2 border-pink relative">
              <span className="absolute -top-3 right-6 bg-pink text-white text-xs font-bold px-3 py-1 rounded-full">
                MOST MAGIC
              </span>
              <h3 className="text-sm font-bold text-pink uppercase tracking-wider mb-1">
                Magic Mail
              </h3>
              <div className="flex items-baseline gap-1 mb-4">
                <span className="text-4xl font-bold text-navy">$24.95</span>
                <span className="text-navy/30">/month</span>
              </div>
              <ul className="space-y-3 text-navy/60">
                <li className="flex items-start gap-2">
                  <span className="text-pink mt-0.5">&#10003;</span>
                  Everything in Sparkle Post
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-pink mt-0.5">&#10003;</span>
                  Themed props in every letter
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-pink mt-0.5">&#10003;</span>
                  Fairy dust, treasure maps, unicorn poop
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-pink mt-0.5">&#10003;</span>
                  Premium sealed envelope
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-pink mt-0.5">&#10003;</span>
                  Story compilation book option
                </li>
              </ul>
            </div>
          </div>

          <p className="mt-8 text-navy/30 text-sm">
            Gift subscriptions available in 3, 6, and 12 month packs.
            <br />
            Prices in AUD. Launching in Australia first.
          </p>
        </div>
      </section>

      {/* ═══ WAITLIST ═══ */}
      <section
        id="waitlist"
        className="py-24 px-6 bg-gradient-to-br from-pink via-pink-dark to-blue-dark"
      >
        <div className="max-w-xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Be first to send magic.
          </h2>
          <p className="text-white/70 mb-10 text-lg">
            We&apos;re launching soon. Join the waitlist and we&apos;ll let
            you know when you can start sending wonder.
          </p>

          {submitted ? (
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
              <div className="text-4xl mb-4">&#10024;</div>
              <h3 className="text-xl font-bold text-white mb-2">
                You&apos;re on the list!
              </h3>
              <p className="text-white/70">
                We&apos;ll be in touch soon. The fairies have noted your
                address.
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
                className="w-full px-6 py-4 rounded-full bg-white/15 backdrop-blur-sm border border-white/25 text-white placeholder:text-white/40 text-lg focus:outline-none focus:ring-2 focus:ring-white/50"
              />

              <div className="flex flex-wrap justify-center gap-2">
                <span className="text-white/50 text-sm self-center mr-1">
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
                    className={`px-4 py-2 rounded-full text-sm transition-colors ${
                      persona === p
                        ? "bg-white text-pink-dark font-medium"
                        : "bg-white/10 text-white/70 hover:bg-white/20 border border-white/15"
                    }`}
                  >
                    {p}
                  </button>
                ))}
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="w-full bg-white text-pink-dark px-8 py-4 rounded-full text-lg font-bold hover:bg-white/90 transition-colors disabled:opacity-50 shadow-lg"
              >
                {submitting ? "Joining..." : "Join the waitlist"}
              </button>
            </form>
          )}
        </div>
      </section>

      {/* ═══ FOOTER ═══ */}
      <footer className="py-12 px-6 bg-navy text-white/40">
        <div className="max-w-3xl mx-auto text-center space-y-4">
          <p className="text-white/60 font-bold text-lg">
            wonder<span className="text-pink">punk</span>
          </p>
          <p className="text-sm">
            Wonder, Delivered. Magic mail from magical friends and family.
          </p>
          <p className="text-xs text-white/25">
            A product of Activate Studios Pty Ltd, Brisbane, Australia.
            <br />
            All families welcome. All magic real.
          </p>
        </div>
      </footer>
    </div>
  );
}
