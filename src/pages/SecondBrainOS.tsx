import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import {
  Brain, ShieldCheck, Clock, Check, ArrowLeft, ArrowRight, Search, Sparkles,
  Database, GraduationCap, FileText, Workflow, Rocket, LogOut, Layers, TrendingDown, Gift, Play,
} from "lucide-react";
import { getCalApi } from "@calcom/embed-react";
import Cal from "@calcom/embed-react";
import logo from "@/assets/figfalcon-logo.png";

const CAL_LINK = "figfalcon/figfalcon-strategy-call";
const CAL_NAMESPACE = "consultation";

const FadeIn = ({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 24 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-40px" }}
    transition={{ duration: 0.55, delay, ease: [0.16, 1, 0.3, 1] }}
  >
    {children}
  </motion.div>
);

const scrollTo = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

const BookBtn = ({ label = "Book Your Call", large = false }: { label?: string; large?: boolean }) => (
  <button
    onClick={() => scrollTo("book")}
    className={`inline-flex items-center gap-2 font-bold rounded-full bg-primary text-white hover:opacity-90 active:scale-95 transition-all duration-200 shadow-lg shadow-primary/30 hover:shadow-primary/50 ${
      large ? "px-8 py-4 text-base" : "px-6 py-3 text-sm"
    }`}
  >
    {label}
  </button>
);

const Eyebrow = ({ children }: { children: React.ReactNode }) => (
  <p className="text-xs font-bold uppercase tracking-[0.3em] text-primary mb-4">{children}</p>
);

// ─── Animated agency-brain search demo ─────────────────────────────────────────
const demoQA = [
  { q: "Where did we land on Acme's Q3 paid-social strategy?", a: "Shifted budget from feed to Reels after CPMs spiked. Target CPA $42, creative refresh every 2 weeks. Decided Jul 8 — logged by Priya." },
  { q: "Why did we pause Nolan Co's retargeting?", a: "Audience too small post-iOS update — pooling with lookalikes instead. Revisit at 5k list size. Note by Marcus, Aug 2." },
  { q: "What's our onboarding checklist for a new account manager?", a: "12-step path: access grants → brand docs → campaign history → first QBR shadow. Ramps a new AM in 4 days." },
];

const AgencyBrainDemo = () => {
  const [idx, setIdx] = useState(0);
  const [typed, setTyped] = useState("");
  const [phase, setPhase] = useState<"typing" | "searching" | "answer">("typing");
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  useEffect(() => {
    const { q } = demoQA[idx];
    timers.current.forEach(clearTimeout);
    timers.current = [];
    setTyped("");
    setPhase("typing");
    for (let c = 1; c <= q.length; c++) {
      timers.current.push(setTimeout(() => setTyped(q.slice(0, c)), c * 45));
    }
    const done = q.length * 45;
    timers.current.push(setTimeout(() => setPhase("searching"), done + 400));
    timers.current.push(setTimeout(() => setPhase("answer"), done + 1900));
    timers.current.push(setTimeout(() => setIdx((i) => (i + 1) % demoQA.length), done + 6200));
    return () => timers.current.forEach(clearTimeout);
  }, [idx]);

  return (
    <div className="max-w-2xl mx-auto rounded-2xl border border-border/60 bg-background/80 shadow-2xl shadow-primary/5 overflow-hidden font-mono">
      <div className="flex items-center justify-between px-4 py-3 border-b border-border/40 bg-secondary/20">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-muted-foreground/40" />
          <span className="w-2.5 h-2.5 rounded-full bg-muted-foreground/40" />
          <span className="w-2.5 h-2.5 rounded-full bg-muted-foreground/40" />
          <span className="ml-3 text-xs text-muted-foreground">agency-brain · source of truth</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
          <span className="text-[10px] font-bold tracking-widest text-accent">LIVE</span>
        </div>
      </div>
      <div className="px-5 py-4 flex items-center gap-3 border-b border-border/30">
        <Search className="w-4 h-4 text-primary shrink-0" />
        <span className="text-sm text-foreground flex-1">
          {typed}
          {phase === "typing" && <span className="inline-block w-2 h-4 -mb-0.5 bg-primary/80 animate-pulse ml-0.5" />}
        </span>
        <span className="text-[10px] text-muted-foreground border border-border/50 rounded px-1.5 py-0.5 shrink-0">↵ ask</span>
      </div>
      <div className="px-5 py-5 min-h-[150px]">
        <AnimatePresence mode="wait">
          {phase === "searching" && (
            <motion.div key="s" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex items-center gap-2 text-sm text-muted-foreground">
              <Sparkles className="w-4 h-4 text-primary" />
              searching across your tools
              <span className="flex gap-0.5">
                {[0, 1, 2].map((d) => <span key={d} className="w-1 h-1 rounded-full bg-primary animate-pulse" style={{ animationDelay: `${d * 0.2}s` }} />)}
              </span>
            </motion.div>
          )}
          {phase === "answer" && (
            <motion.div key="a" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }}>
              <div className="flex items-start gap-2.5">
                <span className="mt-0.5 w-5 h-5 rounded-md bg-primary/15 border border-primary/30 flex items-center justify-center shrink-0">
                  <Brain className="w-3 h-3 text-primary" />
                </span>
                <p className="text-sm text-foreground/90 leading-relaxed">{demoQA[idx].a}</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <div className="px-5 py-3 border-t border-border/30 flex items-center justify-between">
        <div className="flex items-center gap-1">
          <span className="w-6 h-1 rounded-full bg-primary/60" />
          <span className="w-2 h-1 rounded-full bg-muted-foreground/30" />
          <span className="w-2 h-1 rounded-full bg-muted-foreground/30" />
        </div>
        <span className="text-[10px] text-muted-foreground">real questions · real answers</span>
      </div>
    </div>
  );
};

// ─── Data ──────────────────────────────────────────────────────────────────────
const pains = [
  { icon: Brain, q: "\"Everything runs through me.\"", body: "You're the bottleneck on strategy, client calls and quality control. You can't step away for a day without the phone blowing up." },
  { icon: LogOut, q: "\"When someone quits, we scramble.\"", body: "An account manager leaves and their client context, campaign history and how-we-do-it walks out the door — sometimes the client follows." },
  { icon: Clock, q: "\"Onboarding takes weeks.\"", body: "A new hire needs weeks to get productive because there's no documented process — they learn by shadowing and asking around." },
  { icon: Layers, q: "\"Our stuff is scattered across 5 tools.\"", body: "Client info in the CRM, assets in Drive, decisions in Slack, tasks in ClickUp. Nothing is the source of truth. 'Just ask Sarah, she knows.'" },
  { icon: TrendingDown, q: "\"I can't see where hours leak.\"", body: "You sense some clients are unprofitable and hours vanish somewhere — but with no single view of how work flows, you can't point to it." },
];

const stack = [
  { icon: Brain, name: "Team Brain Extraction", desc: "Structured sessions pull strategy, decisions and how-we-do-it out of your team's heads and into the system.", val: "$2,000", feat: true },
  { icon: Database, name: "Single Source of Truth", desc: "One connected, AI-searchable system of record across the tools your team already uses.", val: "$2,500", feat: true },
  { icon: Search, name: "AI Search Layer", desc: "Ask a plain-English question, get your agency's own answer back instantly — with sources.", val: "$2,000" },
  { icon: GraduationCap, name: "Onboarding Engine", desc: "Role-based paths so a new hire ramps in days, not weeks.", val: "$2,000" },
  { icon: ShieldCheck, name: "Knowledge Continuity", desc: "Client context captured so nothing walks out when someone quits.", val: "$1,500" },
  { icon: FileText, name: "Renewal / QBR Auto-Draft", desc: "Renewal and QBR summaries auto-generated from the same captured history.", val: "$1,000" },
  { icon: Workflow, name: "Process & Margin Map", desc: "A single visual of how work flows, so you can finally see where hours and money leak.", val: "$1,000" },
  { icon: Rocket, name: "Adoption Setup", desc: "Built inside the tools your team already opens, with a rollout so it actually gets used.", val: "$1,000" },
];

const steps = [
  { n: "01", when: "Days 1-3", title: "Extraction", body: "A few focused sessions where we pull what's in your team's heads — strategy, decisions, how work really flows. This is your entire involvement." },
  { n: "02", when: "Days 3-10", title: "Build", body: "We build the connected system of record inside your existing tools, wire up the AI search layer, and structure your SOPs and playbooks." },
  { n: "03", when: "Day 10", title: "First Win", body: "One painful process — usually account-manager onboarding — fully systematized, so you see real value before the full build lands." },
  { n: "04", when: "Days 10-90", title: "Adoption", body: "Rollout and check-ins so the team actually uses it. Not using it 30 days after launch? We run more sessions free until they are." },
];

const bonuses: [string, string][] = [
  ["\"First Win in 10 Days\" Sprint", "$1,500"],
  ["AI Prompt Pack for your agency", "$750"],
  ["60-Day Adoption Check-ins", "$1,000"],
  ["Client Handoff Template Pack", "$500"],
  ["Owner's Escape Checklist", "$500"],
];

const includedList = [
  "8-part Second Brain OS, fully installed",
  "Team Brain Extraction sessions",
  "AI search layer across your tools",
  "Onboarding Engine + SOP library",
  "Knowledge Continuity + Process Map",
];

const forYou = [
  "Marketing agency — paid media, SEO, social, content or PR",
  "10-40 people, $1M-$8M revenue, 8-25 active retainers",
  "Already AI-comfortable (you run ChatGPT/Claude), not a tinkerer",
  "Caught at a trigger: someone quit, you're hiring, a renewal nearly slipped",
];
const notForYou = [
  "Solo freelancers or agencies under ~8 people — pain isn't acute yet",
  "Pre-$1M / pre-revenue — no client history to organize yet",
  "40+ people with a dedicated ops hire and procurement process",
  "The DIY tinkerer who wants to build it himself in Notion",
];

const navLinks = [
  { label: "The problem", id: "problem" },
  { label: "The system", id: "system" },
  { label: "How it works", id: "how" },
  { label: "Offer", id: "offer" },
];

const SecondBrainOS = () => {
  useEffect(() => {
    (async () => {
      const cal = await getCalApi({ namespace: CAL_NAMESPACE });
      cal("ui", { hideEventTypeDetails: false, theme: "dark" });
    })();
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Nav */}
      <header className="sticky top-0 z-50 border-b border-border/40 bg-background/80 backdrop-blur-xl">
        <div className="container mx-auto px-6 flex items-center justify-between py-3">
          <Link to="/" className="flex items-center gap-2 shrink-0"><img src={logo} alt="Figfalcon" className="h-6 md:h-7" /></Link>
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((l) => (
              <button key={l.id} onClick={() => scrollTo(l.id)} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                {l.label}
              </button>
            ))}
          </nav>
          <div className="flex items-center gap-4">
            <Link to="/services" className="hidden sm:inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors">
              <ArrowLeft className="w-4 h-4" /> Services
            </Link>
            <BookBtn label="Book a Call" />
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative pt-20 pb-16 md:pt-28 md:pb-20 overflow-hidden">
        <div className="absolute inset-0 gradient-hero opacity-70" />
        <div className="container mx-auto px-6 relative z-10 max-w-4xl text-center">
          <FadeIn>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/30 bg-primary/10 text-primary text-xs font-bold uppercase tracking-widest mb-6">
              <Brain className="w-4 h-4" /> The Agency Second Brain OS
            </div>
          </FadeIn>
          <FadeIn delay={0.05}>
            <h1 className="font-heading font-bold text-4xl md:text-6xl leading-[1.05] tracking-tight mb-6">
              Get Your Entire Agency
              <span className="gradient-text block">Out of Your Team's Heads.</span>
            </h1>
          </FadeIn>
          <FadeIn delay={0.1}>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-9 leading-relaxed">
              We install a done-for-you AI "second brain" that pulls every process, client detail and SOP into one system your whole agency can actually search — so onboarding drops from months to days, nothing falls through the cracks, and the business stops running through one or two people.
            </p>
          </FadeIn>
          <FadeIn delay={0.15}>
            <div className="flex flex-col items-center gap-3">
              <div className="flex flex-wrap items-center justify-center gap-3">
                <BookBtn large />
                <button
                  onClick={() => scrollTo("system")}
                  className="inline-flex items-center gap-2 font-bold rounded-full border border-border/60 bg-secondary/30 text-foreground px-8 py-4 text-base hover:bg-secondary/50 active:scale-95 transition-all duration-200"
                >
                  <Play className="w-4 h-4 fill-current" /> See the system
                </button>
              </div>
              <p className="text-xs text-muted-foreground">Only 2 new agency builds per month. Founding-client rate while it lasts.</p>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Live demo */}
      <section className="pb-16 md:pb-24">
        <div className="container mx-auto px-6">
          <FadeIn><p className="text-center text-xs font-bold uppercase tracking-[0.3em] text-muted-foreground mb-6">Ask it anything your agency should know</p></FadeIn>
          <FadeIn delay={0.1}><AgencyBrainDemo /></FadeIn>
        </div>
      </section>

      {/* Problem — card grid */}
      <section id="problem" className="py-20 md:py-24 bg-secondary/10 scroll-mt-20">
        <div className="container mx-auto px-6 max-w-6xl">
          <FadeIn>
            <Eyebrow>The real problem</Eyebrow>
            <h2 className="font-heading font-bold text-3xl md:text-5xl leading-[1.1] tracking-tight mb-4 max-w-3xl">
              Your agency runs on memory. <span className="gradient-text">That's the risk.</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mb-12">
              The problem was never a lack of tools — it's that nothing is the source of truth, and the knowledge that runs your agency lives in a handful of people's heads.
            </p>
          </FadeIn>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {pains.map((p, i) => (
              <FadeIn key={i} delay={i * 0.06}>
                <div className="glass-card p-7 h-full">
                  <div className="w-11 h-11 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary mb-5">
                    <p.icon className="w-5 h-5" />
                  </div>
                  <h3 className="font-heading font-semibold text-lg mb-2">{p.q}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{p.body}</p>
                </div>
              </FadeIn>
            ))}
            {/* THE COST card */}
            <FadeIn delay={pains.length * 0.06}>
              <div className="rounded-2xl p-7 h-full border border-primary/30 bg-gradient-to-br from-primary/15 via-primary/5 to-transparent">
                <p className="text-xs font-bold uppercase tracking-[0.25em] text-primary mb-4">The cost</p>
                <p className="font-heading font-bold text-4xl mb-3">Weeks<span className="text-lg text-muted-foreground font-normal"> per hire</span></p>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  to ramp every new account manager — while dropped details put retainers at risk and every internal hour is one you can't bill.
                </p>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Why this gets done — promise + stats */}
      <section className="py-20 md:py-24">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <FadeIn>
              <Eyebrow>Why this actually gets done</Eyebrow>
              <h2 className="font-heading font-bold text-3xl md:text-4xl leading-[1.1] tracking-tight mb-6">
                You're not going to build this yourself. It's been on the roadmap <span className="gradient-text">for a year.</span>
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                You could build it — you have AI-savvy people. But you won't, because every internal hour is a billable hour lost, and an ops system that isn't urgent never wins against client work. That's exactly why it stays broken.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                We're not a vendor pitching a concept. We build with the exact automation stack this runs on and hand you a working system — done for you, owned by you.
              </p>
            </FadeIn>
            <FadeIn delay={0.1}>
              <div className="space-y-5">
                <div className="glass-card p-8">
                  <p className="font-heading text-xl md:text-2xl leading-snug mb-6">
                    "You don't build anything. You don't maintain anything. You answer a few questions — <span className="gradient-text">we install the rest.</span>"
                  </p>
                  <div className="flex items-center gap-3 pt-4 border-t border-border/40">
                    <span className="w-9 h-9 rounded-lg bg-primary/15 border border-primary/30 flex items-center justify-center"><Brain className="w-4 h-4 text-primary" /></span>
                    <div>
                      <p className="text-sm font-semibold">How the Second Brain OS works</p>
                      <p className="text-xs text-muted-foreground">Done-for-you, start to finish</p>
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-3">
                  {[["100%", "You own it"], ["10 days", "To first win"], ["2/mo", "Builds taken"]].map(([big, sub], i) => (
                    <div key={i} className="glass-card p-4 text-center">
                      <p className="font-heading font-bold text-xl gradient-text">{big}</p>
                      <p className="text-[10px] uppercase tracking-widest text-muted-foreground mt-1">{sub}</p>
                    </div>
                  ))}
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* System — stack cards */}
      <section id="system" className="py-20 md:py-24 bg-secondary/10 scroll-mt-20">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="grid lg:grid-cols-2 gap-6 items-end mb-12">
            <FadeIn>
              <Eyebrow>What gets installed</Eyebrow>
              <h2 className="font-heading font-bold text-3xl md:text-5xl leading-[1.1] tracking-tight">
                One operating system. <span className="gradient-text">Eight moving parts.</span>
              </h2>
            </FadeIn>
            <FadeIn delay={0.1}>
              <p className="text-muted-foreground lg:text-right">
                Not another tool to ignore. A done-for-you system of record, built around your real processes — inside the stack you already run.
              </p>
            </FadeIn>
          </div>
          {/* 2 featured */}
          <div className="grid md:grid-cols-2 gap-5 mb-5">
            {stack.filter((s) => s.feat).map((s, i) => (
              <FadeIn key={i} delay={i * 0.08}>
                <StackCard {...s} large />
              </FadeIn>
            ))}
          </div>
          {/* 6 grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {stack.filter((s) => !s.feat).map((s, i) => (
              <FadeIn key={i} delay={i * 0.05}>
                <StackCard {...s} />
              </FadeIn>
            ))}
          </div>
          <FadeIn delay={0.2}>
            <div className="mt-8 flex items-center justify-center gap-3 text-sm text-muted-foreground">
              <span className="line-through">$13,000 of build if you priced each piece separately.</span>
              <span className="text-foreground font-semibold">You're not paying that.</span>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* How it works — timeline */}
      <section id="how" className="py-20 md:py-24 scroll-mt-20">
        <div className="container mx-auto px-6 max-w-6xl">
          <FadeIn>
            <Eyebrow>How it works</Eyebrow>
            <h2 className="font-heading font-bold text-3xl md:text-5xl leading-[1.1] tracking-tight mb-14 max-w-3xl">
              Value in 10 days. <span className="gradient-text">Not a 3-month slog.</span>
            </h2>
          </FadeIn>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((s, i) => (
              <FadeIn key={i} delay={i * 0.08}>
                <div className="relative">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="w-9 h-9 rounded-full border border-primary/40 text-primary font-heading font-bold text-sm flex items-center justify-center shrink-0">{s.n}</span>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">{s.when}</span>
                  </div>
                  <h3 className="font-heading font-semibold text-lg mb-2">{s.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{s.body}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Fit / not fit */}
      <section className="py-20 md:py-24 bg-secondary/10">
        <div className="container mx-auto px-6 max-w-4xl">
          <div className="grid md:grid-cols-2 gap-6">
            <FadeIn>
              <div className="glass-card p-8 h-full">
                <div className="flex items-center gap-2 mb-5"><Check className="w-5 h-5 text-accent" /><h3 className="font-heading font-semibold uppercase tracking-wider text-sm text-accent">This is for you if</h3></div>
                <ul className="space-y-3">
                  {forYou.map((t, i) => <li key={i} className="flex items-start gap-3 text-sm text-muted-foreground"><Check className="w-4 h-4 text-accent shrink-0 mt-0.5" /> {t}</li>)}
                </ul>
              </div>
            </FadeIn>
            <FadeIn delay={0.1}>
              <div className="glass-card p-8 h-full">
                <div className="flex items-center gap-2 mb-5"><span className="text-destructive text-lg leading-none">✕</span><h3 className="font-heading font-semibold uppercase tracking-wider text-sm text-destructive">Not for you if</h3></div>
                <ul className="space-y-3">
                  {notForYou.map((t, i) => <li key={i} className="flex items-start gap-3 text-sm text-muted-foreground"><span className="text-destructive shrink-0 mt-0.5">✕</span> {t}</li>)}
                </ul>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Offer / pricing */}
      <section id="offer" className="py-20 md:py-24 scroll-mt-20">
        <div className="container mx-auto px-6 max-w-6xl">
          <FadeIn>
            <div className="text-center mb-12">
              <Eyebrow>The offer</Eyebrow>
              <h2 className="font-heading font-bold text-3xl md:text-5xl leading-[1.1] tracking-tight mb-4">
                ~$17,250 of value. <span className="gradient-text">Custom pricing.</span>
              </h2>
              <p className="text-muted-foreground max-w-xl mx-auto">
                A single reclaimed billable hour a week pays for it many times over. You only pay the balance after you've seen it working on a real process.
              </p>
            </div>
          </FadeIn>
          <div className="grid lg:grid-cols-5 gap-6">
            {/* Install card */}
            <div className="lg:col-span-3">
              <FadeIn delay={0.05}>
              <div className="glass-card p-8 md:p-10 h-full flex flex-col">
                <div className="flex items-center justify-between gap-3 mb-6">
                  <span className="text-xs font-bold uppercase tracking-widest text-primary bg-primary/10 border border-primary/25 rounded-full px-3 py-1 whitespace-nowrap">The Agency Brain Install</span>
                  <span className="text-xs text-muted-foreground uppercase tracking-widest whitespace-nowrap">2 builds / month</span>
                </div>
                <div className="flex items-end gap-3 mb-2">
                  <span className="font-heading font-bold text-5xl">Custom</span>
                  <span className="text-muted-foreground line-through mb-2">$17,250</span>
                </div>
                <p className="text-sm text-muted-foreground mb-6">Founding-client rate · scoped to your agency · + $600/mo optional maintenance</p>
                <ul className="space-y-3 mb-8">
                  {includedList.map((t, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-sm"><Check className="w-4 h-4 text-accent shrink-0 mt-0.5" /><span className="text-foreground/90">{t}</span></li>
                  ))}
                </ul>
                <button onClick={() => scrollTo("book")} className="mt-auto w-full inline-flex items-center justify-center gap-2 font-bold rounded-full bg-primary text-white px-8 py-4 hover:opacity-90 active:scale-95 transition-all shadow-lg shadow-primary/30">
                  Book your call <ArrowRight className="w-4 h-4" />
                </button>
                <p className="text-center text-xs text-muted-foreground mt-3">Deposit to start · balance due after your first win</p>
              </div>
              </FadeIn>
            </div>
            {/* Bonuses + guarantee */}
            <div className="lg:col-span-2 flex flex-col gap-6">
              <FadeIn delay={0.1}>
                <div className="glass-card p-7">
                  <div className="flex items-center gap-2 mb-4"><Gift className="w-4 h-4 text-accent" /><span className="text-xs font-bold uppercase tracking-widest text-accent">Bonuses · $4,250</span></div>
                  <ul className="divide-y divide-border/40">
                    {bonuses.map(([name, val], i) => (
                      <li key={i} className="flex items-center justify-between py-2.5 text-sm">
                        <span className="text-foreground/90">{name}</span>
                        <span className="text-muted-foreground shrink-0 ml-3">{val}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </FadeIn>
              <FadeIn delay={0.15}>
                <div className="glass-card p-7 border border-primary/20">
                  <div className="flex items-center gap-2 mb-3"><ShieldCheck className="w-4 h-4 text-primary" /><span className="text-xs font-bold uppercase tracking-widest text-primary">The adoption guarantee</span></div>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    If your team isn't actively using the OS 30 days after launch, we run additional adoption sessions free — until they are. You don't just get a system built; you get one your people actually use.
                  </p>
                </div>
              </FadeIn>
            </div>
          </div>
        </div>
      </section>

      {/* Book */}
      <section id="book" className="py-20 md:py-24 bg-secondary/10 scroll-mt-20">
        <div className="container mx-auto px-6 max-w-4xl">
          <FadeIn>
            <div className="text-center mb-10">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-accent/30 bg-accent/10 text-accent text-xs font-bold uppercase tracking-widest mb-5">
                <Clock className="w-4 h-4" /> 2 builds per month
              </div>
              <h2 className="font-heading font-bold text-3xl md:text-4xl leading-tight mb-3">See It Answer a Real Question <span className="gradient-text">Live.</span></h2>
              <p className="text-muted-foreground max-w-xl mx-auto">Book a 20-minute call. We'll show you the system working on real data before you commit to anything.</p>
            </div>
          </FadeIn>
          <FadeIn delay={0.1}>
            <div className="rounded-2xl overflow-hidden border border-border/40 shadow-xl">
              <Cal namespace={CAL_NAMESPACE} calLink={CAL_LINK} style={{ width: "100%", height: "100%", overflow: "scroll" }} config={{ layout: "month_view", theme: "dark" }} />
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-10 border-t border-border/40">
        <div className="container mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <img src={logo} alt="Figfalcon" className="h-6 opacity-80" />
          <div className="flex items-center gap-6 text-sm text-muted-foreground">
            <Link to="/services" className="hover:text-foreground transition-colors">All services</Link>
            <Link to="/contact" className="hover:text-foreground transition-colors">Contact</Link>
          </div>
        </div>
      </footer>
    </div>
  );
};

// Stack card
const StackCard = ({ icon: Icon, name, desc, val, large = false }: { icon: typeof Brain; name: string; desc: string; val: string; large?: boolean }) => (
  <div className={`glass-card-hover h-full ${large ? "p-8" : "p-7"}`}>
    <div className="flex items-start justify-between mb-4">
      <div className={`rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary ${large ? "w-12 h-12" : "w-10 h-10"}`}>
        <Icon className={large ? "w-6 h-6" : "w-5 h-5"} />
      </div>
      <span className="text-xs text-muted-foreground/60 line-through">{val}</span>
    </div>
    <h3 className={`font-heading font-semibold mb-2 ${large ? "text-xl" : "text-base"}`}>{name}</h3>
    <p className="text-sm text-muted-foreground leading-relaxed">{desc}</p>
  </div>
);

export default SecondBrainOS;
