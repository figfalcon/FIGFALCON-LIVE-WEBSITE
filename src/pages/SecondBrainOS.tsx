import { useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Brain, RefreshCw, ShieldCheck, Zap, Clock, Check, ArrowLeft } from "lucide-react";
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

const scrollToBook = () => document.getElementById("book")?.scrollIntoView({ behavior: "smooth" });

const BookBtn = ({ label = "Claim Your Founding-Client Build", large = false }: { label?: string; large?: boolean }) => (
  <button
    onClick={scrollToBook}
    className={`inline-flex items-center gap-2 font-bold rounded-full bg-primary text-white hover:opacity-90 active:scale-95 transition-all duration-200 shadow-lg shadow-primary/30 hover:shadow-primary/50 ${
      large ? "px-8 py-4 text-base" : "px-6 py-3 text-sm"
    }`}
  >
    {label}
  </button>
);

// Problem (buyer words) → named solution
const problems: [string, string][] = [
  ["\"I'm the only one who remembers why we killed that campaign.\"", "Team Brain Extraction — strategy and decisions pulled out of heads into searchable form."],
  ["\"Every account manager who leaves takes six months of client context with them.\"", "Knowledge Continuity System — context captured so nothing walks out the door."],
  ["\"Onboarding a new account manager takes forever.\"", "Onboarding Engine — role-based paths so a new hire ramps in days, not weeks."],
  ["\"Our stuff is scattered across five different tools.\"", "Single Source of Truth — one AI-searchable system across the tools you already use."],
  ["\"We tried something like this before and nobody used it.\"", "Done-for-you build + adoption setup, inside tools your team already opens."],
  ["\"I can't find anything fast when a client asks a question.\"", "AI Search Layer — ask in plain English, get your agency's own answer back instantly."],
  ["\"Renewal/QBR prep eats days every quarter.\"", "Renewal/QBR Auto-Draft — summaries generated from the same captured history."],
  ["\"What if you disappear?\"", "You own the system outright. The retainer is optional maintenance, not a hostage fee."],
];

// Stack (what they get + anchored value)
const stack: [string, string, string][] = [
  ["Team Brain Extraction", "Sessions that pull strategy, decisions and \"how we do it\" out of your team's heads into the system", "$2,000"],
  ["Single Source of Truth Build", "One connected, AI-searchable system of record across your existing tools", "$2,500"],
  ["AI Search Layer", "Ask a plain-English question, get your agency's own answer back instantly", "$2,000"],
  ["Onboarding Engine", "Role-based onboarding paths so new hires ramp in days", "$2,000"],
  ["Knowledge Continuity System", "Client context captured so nothing walks out when someone quits", "$1,500"],
  ["Renewal/QBR Auto-Draft", "Renewal and QBR summaries auto-generated from captured history", "$1,000"],
  ["Process & Margin Map", "Single visual of where hours and money leak across accounts", "$1,000"],
  ["Adoption Setup", "Built inside tools the team already uses, with a rollout plan so it gets used", "$1,000"],
];

const bonuses: [string, string, string][] = [
  ["\"First Win in 10 Days\" Sprint", "One painful process (usually AM onboarding) fully systematized in the first 10 days — value before the full build lands.", "$1,500"],
  ["AI Prompt Pack for Your Agency", "Ready-to-use prompts wired to your system for reporting, recaps and client comms.", "$750"],
  ["60-Day Adoption Check-ins", "Two scheduled reviews to make sure the team is actually using it.", "$1,000"],
  ["Client Handoff Template Pack", "Plug-and-play templates for clean transitions between team members.", "$500"],
  ["Owner's Escape Checklist", "The exact checklist for taking a week off without the agency falling apart.", "$500"],
];

const forYou = [
  "Marketing agency — paid media, SEO, social, content or PR",
  "10-40 people, $1M-$8M revenue, 8-25 active retainers",
  "Already AI-comfortable (you run ChatGPT/Claude), not a tinkerer",
  "Caught at a trigger: someone quit, you're hiring, or a renewal nearly slipped",
];
const notForYou = [
  "Solo freelancers or agencies under ~8 people — pain isn't acute yet",
  "Pre-$1M / pre-revenue — no client history to organize yet",
  "40+ people with a dedicated ops hire and procurement process",
  "The DIY tinkerer who wants to build it himself in Notion",
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
          <Link to="/" className="flex items-center gap-2">
            <img src={logo} alt="Figfalcon" className="h-6 md:h-7" />
          </Link>
          <div className="flex items-center gap-4">
            <Link to="/services" className="hidden sm:inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors">
              <ArrowLeft className="w-4 h-4" /> All services
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
              <BookBtn large />
              <p className="text-xs text-muted-foreground">Only 2 new agency builds per month. Founding-client rate while it lasts.</p>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Problem → Solution */}
      <section className="py-20 md:py-24 bg-secondary/10">
        <div className="container mx-auto px-6 max-w-4xl">
          <FadeIn>
            <h2 className="font-heading font-bold text-3xl md:text-4xl text-center leading-tight mb-3">
              Your Knowledge Lives in <span className="gradient-text">Slack Threads and a Few People's Heads.</span>
            </h2>
            <p className="text-center text-muted-foreground max-w-2xl mx-auto mb-12">
              Every departed account manager is a fire drill. Every new hire takes weeks to ramp. Every dropped client detail is a retainer at risk. Here's what we fix.
            </p>
          </FadeIn>
          <div className="space-y-4">
            {problems.map(([pain, fix], i) => (
              <FadeIn key={i} delay={i * 0.04}>
                <div className="glass-card p-6 grid md:grid-cols-2 gap-4 items-center">
                  <p className="text-foreground/90 font-medium italic">{pain}</p>
                  <div className="flex items-start gap-2.5">
                    <Check className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                    <p className="text-sm text-muted-foreground">{fix}</p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* The Build (stack) */}
      <section className="py-20 md:py-24">
        <div className="container mx-auto px-6 max-w-4xl">
          <FadeIn>
            <h2 className="font-heading font-bold text-3xl md:text-4xl text-center leading-tight mb-3">
              What We <span className="gradient-text">Build For You.</span>
            </h2>
            <p className="text-center text-muted-foreground max-w-xl mx-auto mb-12">
              Done-for-you, end to end. Your only input is a few extraction sessions where we pull what's in your team's heads.
            </p>
          </FadeIn>
          <FadeIn delay={0.1}>
            <div className="glass-card overflow-hidden">
              <div className="px-6 py-4 border-b border-border/40 bg-secondary/20">
                <p className="text-xs uppercase tracking-widest text-muted-foreground">The Agency Second Brain OS — what's included</p>
              </div>
              <div className="divide-y divide-border/40">
                {stack.map(([name, what, val], i) => (
                  <div key={i} className="px-6 py-4 flex items-start justify-between gap-4">
                    <div>
                      <p className="font-heading font-semibold text-foreground">{name}</p>
                      <p className="text-sm text-muted-foreground mt-0.5">{what}</p>
                    </div>
                    <span className="text-muted-foreground/70 line-through shrink-0 text-sm mt-0.5">{val}</span>
                  </div>
                ))}
                <div className="px-6 py-4 flex items-center justify-between bg-secondary/10">
                  <span className="font-heading font-bold">Total build value</span>
                  <span className="font-heading font-bold text-lg gradient-text">$13,000</span>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Bonuses */}
      <section className="py-20 md:py-24 bg-secondary/10">
        <div className="container mx-auto px-6 max-w-4xl">
          <FadeIn>
            <h2 className="font-heading font-bold text-3xl md:text-4xl text-center leading-tight mb-3">
              Plus <span className="gradient-text">$4,250 in Bonuses.</span>
            </h2>
            <p className="text-center text-muted-foreground max-w-xl mx-auto mb-12">
              Stacked on top of the core build — each one kills a specific objection.
            </p>
          </FadeIn>
          <div className="grid md:grid-cols-2 gap-4">
            {bonuses.map(([name, desc, val], i) => (
              <FadeIn key={i} delay={i * 0.05}>
                <div className="glass-card p-6 h-full">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-heading font-semibold">{name}</h3>
                    <span className="text-xs font-bold text-accent">{val}</span>
                  </div>
                  <p className="text-sm text-muted-foreground">{desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Guarantee */}
      <section className="py-20 md:py-24">
        <div className="container mx-auto px-6 max-w-3xl">
          <FadeIn>
            <div className="glass-card p-8 md:p-10 text-center border border-primary/20">
              <div className="w-14 h-14 rounded-full bg-primary/10 border border-primary/30 flex items-center justify-center mx-auto mb-5">
                <ShieldCheck className="w-7 h-7 text-primary" />
              </div>
              <h2 className="font-heading font-bold text-2xl md:text-3xl mb-4">
                Our Guarantee: <span className="gradient-text">Your Team Uses It, or We Don't Stop.</span>
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                If your team isn't actively using the system 30 days after launch, we run additional adoption sessions free until they are. And you start with a small deposit — the balance is due only after your first-win milestone is delivered and approved.
              </p>
              <p className="text-sm text-muted-foreground">
                Your risk is capped at a small deposit. Ours is capped at more work — never your delivered system.
              </p>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-20 md:py-24 bg-secondary/10">
        <div className="container mx-auto px-6 max-w-3xl text-center">
          <FadeIn>
            <h2 className="font-heading font-bold text-3xl md:text-4xl leading-tight mb-3">
              ~$17,250 of Value. <span className="gradient-text">Founding Rate: $2,500.</span>
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto mb-10">
              A single reclaimed billable hour per week pays for this many times over. The founding rate is real — it rises to $4,000-$5,000 once we have case studies.
            </p>
          </FadeIn>
          <div className="grid md:grid-cols-2 gap-5 text-left">
            <FadeIn delay={0.05}>
              <div className="glass-card p-8 h-full">
                <div className="flex items-center gap-2 mb-2 text-primary"><Zap className="w-5 h-5" /><span className="text-xs font-bold uppercase tracking-widest">Build fee</span></div>
                <p className="font-heading font-bold text-4xl mb-2">$2,500</p>
                <p className="text-sm text-muted-foreground">One-time, founding-client rate. The full system built and delivered — you own it outright.</p>
              </div>
            </FadeIn>
            <FadeIn delay={0.1}>
              <div className="glass-card p-8 h-full">
                <div className="flex items-center gap-2 mb-2 text-accent"><RefreshCw className="w-5 h-5" /><span className="text-xs font-bold uppercase tracking-widest">Retainer</span></div>
                <p className="font-heading font-bold text-4xl mb-2">$600-800<span className="text-lg text-muted-foreground font-normal">/mo</span></p>
                <p className="text-sm text-muted-foreground">Optional. Keeps your system current as processes and clients change, plus continued adoption support.</p>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Fit / not fit */}
      <section className="py-20 md:py-24">
        <div className="container mx-auto px-6 max-w-4xl">
          <div className="grid md:grid-cols-2 gap-6">
            <FadeIn>
              <div className="glass-card p-8 h-full">
                <div className="flex items-center gap-2 mb-5">
                  <Check className="w-5 h-5 text-accent" />
                  <h3 className="font-heading font-semibold uppercase tracking-wider text-sm text-accent">This is for you if</h3>
                </div>
                <ul className="space-y-3">
                  {forYou.map((t, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-muted-foreground">
                      <Check className="w-4 h-4 text-accent shrink-0 mt-0.5" /> {t}
                    </li>
                  ))}
                </ul>
              </div>
            </FadeIn>
            <FadeIn delay={0.1}>
              <div className="glass-card p-8 h-full">
                <div className="flex items-center gap-2 mb-5">
                  <span className="text-destructive text-lg leading-none">✕</span>
                  <h3 className="font-heading font-semibold uppercase tracking-wider text-sm text-destructive">Not for you if</h3>
                </div>
                <ul className="space-y-3">
                  {notForYou.map((t, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-muted-foreground">
                      <span className="text-destructive shrink-0 mt-0.5">✕</span> {t}
                    </li>
                  ))}
                </ul>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Book */}
      <section id="book" className="py-20 md:py-24 bg-secondary/10">
        <div className="container mx-auto px-6 max-w-4xl">
          <FadeIn>
            <div className="text-center mb-10">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-accent/30 bg-accent/10 text-accent text-xs font-bold uppercase tracking-widest mb-5">
                <Clock className="w-4 h-4" /> 2 builds per month
              </div>
              <h2 className="font-heading font-bold text-3xl md:text-4xl leading-tight mb-3">
                See It Answer a Real Question <span className="gradient-text">Live.</span>
              </h2>
              <p className="text-muted-foreground max-w-xl mx-auto">
                Book a 20-minute call. We'll show you the system working on real data before you commit to anything.
              </p>
            </div>
          </FadeIn>
          <FadeIn delay={0.1}>
            <div className="rounded-2xl overflow-hidden border border-border/40 shadow-xl">
              <Cal
                namespace={CAL_NAMESPACE}
                calLink={CAL_LINK}
                style={{ width: "100%", height: "100%", overflow: "scroll" }}
                config={{ layout: "month_view", theme: "dark" }}
              />
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Footer strip */}
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

export default SecondBrainOS;
