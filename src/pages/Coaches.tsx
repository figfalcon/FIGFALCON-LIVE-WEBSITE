import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  ArrowRight, ChevronDown, Sparkles, ShieldCheck, PhoneMissed, Camera,
  Filter, PhoneCall, CalendarCheck, Check, X,
} from "lucide-react";
import Cal, { getCalApi } from "@calcom/embed-react";
import logo from "@/assets/figfalcon-logo.png";
import RequestFitCallForm from "@/components/RequestFitCallForm";
import CoachValueCalculator from "@/components/CoachValueCalculator";
import CoachCaseStudies from "@/components/CoachCaseStudies";

const CAL_LINK = "figfalcon/figfalcon-strategy-call";
const CAL_NAMESPACE = "coaches-strategy";

const track = (event: string) => {
  (window as unknown as { dataLayer?: { push: (o: object) => void } }).dataLayer?.push({ event });
};

const FadeIn = ({ children, delay = 0, className }: { children: React.ReactNode; delay?: number; className?: string }) => (
  <motion.div className={className} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-40px" }} transition={{ duration: 0.55, delay, ease: [0.16, 1, 0.3, 1] }}>
    {children}
  </motion.div>
);

const Eyebrow = ({ children }: { children: React.ReactNode }) => (
  <p className="text-xs font-bold uppercase tracking-[0.3em] text-primary mb-4">{children}</p>
);

// ─── Tilt bento tile — subtle cursor-follow tilt, skipped entirely under reduced-motion ──
const Tilt = ({ children, className }: { children: React.ReactNode; className?: string }) => {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (reduce || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    ref.current.style.setProperty("--ry", `${px * 6}deg`);
    ref.current.style.setProperty("--rx", `${py * -6}deg`);
  };
  const onLeave = () => {
    if (!ref.current) return;
    ref.current.style.setProperty("--ry", "0deg");
    ref.current.style.setProperty("--rx", "0deg");
  };
  return (
    <div
      ref={ref} onMouseMove={onMove} onMouseLeave={onLeave}
      className={className}
      style={{ transform: "perspective(900px) rotateX(var(--rx,0deg)) rotateY(var(--ry,0deg))", transition: "transform 0.4s cubic-bezier(0.16,1,0.3,1)" }}
    >
      {children}
    </div>
  );
};

// ─── Signature bento tile — the AI voice agent booking the call, looping ──────────────
const SignatureTile = () => {
  const reduce = useReducedMotion();
  const [step, setStep] = useState(0);
  useEffect(() => {
    if (reduce) return;
    const id = setInterval(() => setStep((s) => (s + 1) % 3), 1600);
    return () => clearInterval(id);
  }, [reduce]);
  const active = reduce ? 2 : step;
  return (
    <div className="relative h-40 md:h-48 rounded-2xl border border-primary/25 bg-background/40 overflow-hidden flex items-center justify-center">
      <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse 60% 60% at 50% 40%, hsl(var(--primary)/0.14), transparent)" }} />
      <div className="relative z-10 flex flex-col items-center gap-3">
        <div className={`w-16 h-16 rounded-full flex items-center justify-center border-2 transition-colors duration-500 ${active >= 1 ? "border-primary bg-primary/15" : "border-primary/30 bg-transparent"}`}>
          {active < 2 ? (
            <PhoneCall className={`w-7 h-7 text-primary ${active === 0 && !reduce ? "animate-[ring_1s_ease-in-out_infinite]" : ""}`} />
          ) : (
            <CalendarCheck className="w-7 h-7 text-primary" />
          )}
        </div>
        <p className="text-xs font-semibold text-muted-foreground tracking-wide">
          {active === 0 ? "Call comes in — 11pm Saturday" : active === 1 ? "AI answers, qualifies" : "Booked on the calendar"}
        </p>
      </div>
      <style>{`@keyframes ring { 0%,100%{transform:rotate(0)} 25%{transform:rotate(-12deg)} 75%{transform:rotate(12deg)} }`}</style>
    </div>
  );
};

const problems = [
  { icon: Sparkles, label: "01 Visibility", text: "You post, then stop. Two weeks on, two months off. Nobody remembers a coach who shows up sometimes." },
  { icon: ShieldCheck, label: "02 Trust", text: "When someone checks your page, they find three testimonials from 2023 and a stock photo. That's not proof. That's a red flag." },
  { icon: PhoneMissed, label: "03 Conversion", text: "Someone actually wants to talk to you. Where do they go? If the answer is “they DM me and I get to it later” — that's the leak." },
];

const beforeAfter = [
  { before: "Post 2 weeks then stop", after: "Content daily — you didn't touch a camera" },
  { before: "Hired an agency, got content, never got a call", after: "Every video leads to a funnel" },
  { before: "Ads bring clicks, page looks empty", after: "AI answers every call, including 9pm" },
  { before: "Views pile up, calls don't", after: "Calendar fills with people who already trust you" },
  { before: "You know the system works, no time to run it", after: "You coach, we run the rest" },
];

const timeline = [
  { day: "Day 1", label: "We build it", text: "Trained on your content, niche, and voice. You do nothing." },
  { day: "Day 3", label: "You read it", text: "Full script review, twenty minutes of your time." },
  { day: "Day 5", label: "It goes live", text: "Content posts, the AI answers, you show up to calls." },
];

const faqs: [string, string][] = [
  ["Do I have to be on camera?", "No. Record twice a month if you want to, or use an AI clone trained on your existing footage — same face, same voice, without picking up a camera."],
  ["I already have content — does this still work?", "Yes. The system plugs in downstream: we add the funnel and the AI voice agent on top of what you're already posting. You don't start from zero."],
  ["What does the AI voice agent actually do?", "It answers every inbound call or booking request, asks qualifying questions, and puts the call directly on your calendar — day or night. You never touch the phone."],
  ["How long until I see results?", "Content goes live and the AI voice agent is answering calls within five days. Booked-call volume depends on your existing audience and how hard you promote the new funnel — we won't put a number on that without knowing your starting point."],
  ["What does it cost?", "Pricing depends on your content volume and call volume — I don't sell a one-size package. Book the call below and I'll quote you on your real numbers."],
  ["What if it doesn't work?", "Every call answered, or that month's free — tracked from our own logs, not your word against ours."],
];

const FaqRow = ({ q, a }: { q: string; a: string }) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="glass-card overflow-hidden">
      <button onClick={() => setOpen((o) => !o)} className="w-full flex items-center justify-between p-5 text-left">
        <span className="font-semibold pr-4">{q}</span>
        <ChevronDown className={`w-5 h-5 shrink-0 text-primary transition-transform ${open ? "rotate-180" : ""}`} />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3 }} className="overflow-hidden">
            <p className="px-5 pb-5 text-sm text-muted-foreground leading-relaxed">{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const BeforeAfterTile = ({ before, after, i }: { before: string; after: string; i: number }) => {
  const [hover, setHover] = useState(false);
  return (
    <FadeIn delay={i * 0.05}>
      <div
        onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}
        onClick={() => setHover((h) => !h)}
        className="relative glass-card-hover p-6 h-32 flex items-center cursor-pointer overflow-hidden"
      >
        <AnimatePresence mode="wait">
          {!hover ? (
            <motion.div key="before" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex items-center gap-3">
              <X className="w-5 h-5 text-muted-foreground shrink-0" />
              <p className="text-sm text-muted-foreground">{before}</p>
            </motion.div>
          ) : (
            <motion.div key="after" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex items-center gap-3">
              <Check className="w-5 h-5 text-primary shrink-0" />
              <p className="text-sm font-medium">{after}</p>
            </motion.div>
          )}
        </AnimatePresence>
        <span className="absolute top-3 right-4 text-[10px] font-semibold uppercase tracking-widest text-muted-foreground/50">{hover ? "with FigFalcon" : "hover to see the fix"}</span>
      </div>
    </FadeIn>
  );
};

const Coaches = () => {
  const [scrolled, setScrolled] = useState(false);
  const [showBar, setShowBar] = useState(false);

  useEffect(() => {
    (async () => { const cal = await getCalApi({ namespace: CAL_NAMESPACE }); cal("ui", { hideEventTypeDetails: false, theme: "dark" }); })();
    const onScroll = () => { setScrolled(window.scrollY > 20); setShowBar(window.scrollY > window.innerHeight * 0.4); };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="coaches-luxe min-h-screen bg-background text-foreground pb-16 md:pb-0">
      {/* Nav */}
      <header className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${scrolled ? "bg-background/90 backdrop-blur-xl border-b border-border/50" : ""}`}>
        <div className="container mx-auto px-6 flex items-center justify-between py-3.5">
          <Link to="/" className="flex items-center gap-2 shrink-0"><img src={logo} alt="Figfalcon" className="h-6 md:h-7" /></Link>
          <nav className="hidden lg:flex items-center gap-8">
            {[["What We Do", "system"], ["How It Works", "how"], ["FAQ", "faq"]].map(([label, id]) => (
              <button key={id} onClick={() => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })} className="text-sm text-muted-foreground hover:text-foreground transition-colors">{label}</button>
            ))}
          </nav>
          <button onClick={() => { track("coach_cta_click_fit"); document.getElementById("fit")?.scrollIntoView({ behavior: "smooth" }); }} className="inline-flex items-center gap-2 text-sm font-bold px-5 py-2.5 rounded-full bg-primary text-primary-foreground hover:opacity-90 transition-all shadow-lg shadow-primary/30 shrink-0">
            Book a Free Strategy Call
          </button>
        </div>
      </header>

      {/* Hero */}
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden text-center">
        <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse 70% 55% at 50% 0%, hsl(var(--primary)/0.14), transparent 70%)" }} />
        <div className="container mx-auto px-6 relative z-10 max-w-3xl">
          <FadeIn><Eyebrow>For Coaches &amp; Course Creators</Eyebrow></FadeIn>
          <FadeIn delay={0.05}>
            <h1 className="font-bold leading-[1.12] tracking-tight text-[clamp(2rem,1.2rem+2.6vw,3.6rem)] mb-6">
              You're posting content.<br />Nobody's <span className="font-script text-[1.15em] font-normal gradient-text">booking a call.</span>
            </h1>
          </FadeIn>
          <FadeIn delay={0.1}>
            <p className="text-lg text-muted-foreground max-w-xl mx-auto mb-9 leading-relaxed">
              We build the system that turns your content into booked, qualified calls — visibility, funnel, and an AI voice agent that answers and books while you sleep.
            </p>
          </FadeIn>
          <FadeIn delay={0.15}>
            <button onClick={() => { track("coach_cta_click_fit"); document.getElementById("fit")?.scrollIntoView({ behavior: "smooth" }); }} className="inline-flex items-center gap-2.5 font-bold rounded-full bg-primary text-primary-foreground hover:opacity-90 active:scale-95 transition-all shadow-lg shadow-primary/30 hover:shadow-primary/50 px-8 py-4 text-lg">
              <ArrowRight className="w-5 h-5" /> Book a Free Strategy Call
            </button>
          </FadeIn>
        </div>
      </section>

      {/* Problem */}
      <section className="py-20 px-6">
        <div className="container mx-auto max-w-5xl">
          <FadeIn className="text-center mb-14">
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-primary mb-4">Why the Calendar Stays Empty</p>
            <h2 className="font-bold text-3xl md:text-5xl leading-[1.1]">You're Not Short on Content.<br />You're Short on a System.</h2>
          </FadeIn>
          <div className="grid md:grid-cols-3 gap-5">
            {problems.map((p, i) => (
              <FadeIn key={p.label} delay={i * 0.06}>
                <div className="glass-card-hover p-6 h-full">
                  <p.icon className="w-6 h-6 text-primary mb-4" />
                  <p className="font-semibold mb-2">{p.label}</p>
                  <p className="text-sm text-muted-foreground leading-relaxed">{p.text}</p>
                </div>
              </FadeIn>
            ))}
          </div>
          <FadeIn delay={0.2}>
            <p className="text-center text-muted-foreground max-w-2xl mx-auto mt-10 italic">Content, trust, and conversion aren't three separate problems. They're three stages of the same system — and most coaches are only running one of them.</p>
          </FadeIn>
        </div>
      </section>

      {/* The System — bento */}
      <section id="system" className="py-20 px-6 scroll-mt-20">
        <div className="container mx-auto max-w-5xl">
          <FadeIn className="text-center mb-14">
            <h2 className="font-bold text-3xl md:text-5xl leading-[1.1]">One System. Three Jobs.<br />Zero Manual Follow-Up.</h2>
          </FadeIn>
          <div className="grid md:grid-cols-2 gap-5">
            <FadeIn delay={0.05}>
              <Tilt className="glass-card p-7 h-full">
                <Camera className="w-6 h-6 text-primary mb-4" />
                <p className="font-semibold text-lg mb-2">Stage 01 · We Make You Impossible to Miss</p>
                <p className="text-sm text-muted-foreground leading-relaxed">Record twice a month, or let an AI clone do it — same face, same voice, content goes out daily across Instagram, TikTok, and YouTube either way.</p>
              </Tilt>
            </FadeIn>
            <FadeIn delay={0.1}>
              <Tilt className="glass-card p-7 h-full">
                <Filter className="w-6 h-6 text-primary mb-4" />
                <p className="font-semibold text-lg mb-2">Stage 02 · We Turn Views Into a Funnel</p>
                <p className="text-sm text-muted-foreground leading-relaxed">Every piece of content leads somewhere — a lead magnet, a landing page, an email sequence that follows up automatically.</p>
              </Tilt>
            </FadeIn>
            <FadeIn delay={0.15} className="md:col-span-2">
              <Tilt className="glass-card p-7 border-primary/25">
                <div className="grid md:grid-cols-2 gap-6 items-center">
                  <div>
                    <span className="inline-block text-[10px] font-bold uppercase tracking-widest text-primary mb-3">The part nobody else automates</span>
                    <p className="font-semibold text-lg mb-2">Stage 03 · The AI Voice Agent Books the Call</p>
                    <p className="text-sm text-muted-foreground leading-relaxed">When someone's ready to talk, our AI voice agent answers, asks the right questions, and puts the call on your calendar — 2pm Tuesday or 11pm Saturday. You never touch the phone.</p>
                  </div>
                  <SignatureTile />
                </div>
              </Tilt>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Before / After — hover reveal bento */}
      <section className="py-20 px-6">
        <div className="container mx-auto max-w-3xl">
          <FadeIn className="text-center mb-10">
            <h2 className="font-bold text-3xl md:text-4xl leading-[1.1]">Before / After</h2>
            <p className="text-muted-foreground mt-3">Hover a tile — or tap, on mobile.</p>
          </FadeIn>
          <div className="grid gap-4">
            {beforeAfter.map((row, i) => <BeforeAfterTile key={row.before} {...row} i={i} />)}
          </div>
        </div>
      </section>

      {/* Value calculator */}
      <section className="py-20 px-6">
        <div className="container mx-auto max-w-3xl text-center">
          <FadeIn className="mb-10">
            <h2 className="font-bold text-3xl md:text-4xl leading-[1.1]">What's the Leak Actually Costing You?</h2>
          </FadeIn>
          <FadeIn delay={0.1}><CoachValueCalculator scrollTarget="fit" /></FadeIn>
        </div>
      </section>

      {/* Why Us + guarantee */}
      <section className="py-20 px-6">
        <div className="container mx-auto max-w-4xl grid md:grid-cols-2 gap-6">
          <FadeIn>
            <div className="glass-card p-8 h-full">
              <p className="font-semibold text-lg mb-2">Skip the $80K Hire</p>
              <p className="text-sm text-muted-foreground leading-relaxed">A content person, a setter, and a funnel manager costs six figures in salary. This is one system, one price.</p>
            </div>
          </FadeIn>
          <FadeIn delay={0.05}>
            <div className="glass-card p-8 h-full">
              <p className="font-semibold text-lg mb-2">The Part Nobody Else Automates</p>
              <p className="text-sm text-muted-foreground leading-relaxed">Every agency stops at "we got you leads." Ours books the call — day or night, no human required.</p>
            </div>
          </FadeIn>
          <FadeIn delay={0.1} className="md:col-span-2">
            <div className="glass-card p-8 md:p-10 border border-primary/30 ring-1 ring-primary/10 text-center">
              <p className="text-xs font-bold uppercase tracking-[0.3em] text-primary mb-3">Guarantee</p>
              <h3 className="font-bold text-2xl md:text-3xl mb-3">Every Call Answered. Or That Month's Free.</h3>
              <p className="text-sm text-muted-foreground max-w-md mx-auto">If the AI voice agent misses a call, that month's on us. We track it from our own logs, not your word against ours.</p>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Proof — honest placeholder component */}
      <CoachCaseStudies />

      {/* How it works */}
      <section id="how" className="py-20 px-6 scroll-mt-20">
        <div className="container mx-auto max-w-4xl">
          <FadeIn className="text-center mb-14">
            <h2 className="font-bold text-3xl md:text-4xl leading-[1.1]">Five Days From Yes to Live</h2>
          </FadeIn>
          <div className="grid md:grid-cols-3 gap-5">
            {timeline.map((t, i) => (
              <FadeIn key={t.day} delay={i * 0.08}>
                <div className="glass-card-hover p-6 h-full relative">
                  <p className="text-xs font-bold uppercase tracking-widest text-primary mb-3">{t.day}</p>
                  <p className="font-semibold mb-2">{t.label}</p>
                  <p className="text-sm text-muted-foreground leading-relaxed">{t.text}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Lead form + booking */}
      <section id="fit" className="py-20 px-6 scroll-mt-20 bg-secondary/20 border-y border-border/40">
        <div className="container mx-auto max-w-5xl grid lg:grid-cols-5 gap-10">
          <FadeIn className="lg:col-span-2">
            <h2 className="font-bold text-3xl md:text-4xl leading-[1.1] mb-4">See if we can fill your <span className="gradient-text">consult calendar.</span></h2>
            <p className="text-muted-foreground mb-6">Tell us where you're at. If it's a fit, we'll get you on the calendar below.</p>
          </FadeIn>
          <FadeIn delay={0.1} className="lg:col-span-3"><RequestFitCallForm source="figfalcon.com/coaches" /></FadeIn>
        </div>
        <div className="container mx-auto max-w-4xl mt-12">
          <FadeIn delay={0.15}>
            <div className="rounded-2xl overflow-hidden border border-border/40 shadow-xl">
              <Cal namespace={CAL_NAMESPACE} calLink={CAL_LINK} style={{ width: "100%", height: "100%", overflow: "scroll" }} config={{ layout: "month_view", theme: "dark" }} />
            </div>
          </FadeIn>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-20 px-6 scroll-mt-20">
        <div className="container mx-auto max-w-3xl">
          <FadeIn><h2 className="font-bold text-3xl md:text-4xl text-center leading-tight mb-12">The things you're <span className="font-script text-[1.2em] font-normal gradient-text">already thinking.</span></h2></FadeIn>
          <div className="space-y-3">
            {faqs.map(([q, a], i) => <FadeIn key={q} delay={i * 0.03}><FaqRow q={q} a={a} /></FadeIn>)}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 px-6 text-center border-t border-border/40">
        <FadeIn>
          <h2 className="font-bold text-4xl md:text-5xl mb-4">Stop Posting Into the Void.<br /><span className="font-script text-[1.1em] font-normal gradient-text">Start booking calls.</span></h2>
          <button onClick={() => { track("coach_cta_click_fit"); document.getElementById("fit")?.scrollIntoView({ behavior: "smooth" }); }} className="mt-6 inline-flex items-center gap-2.5 font-bold rounded-full bg-primary text-primary-foreground hover:opacity-90 active:scale-95 transition-all shadow-lg shadow-primary/30 hover:shadow-primary/50 px-8 py-4 text-lg">
            <ArrowRight className="w-5 h-5" /> Book a Free Strategy Call
          </button>
        </FadeIn>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t border-border/40">
        <div className="container mx-auto px-6 flex items-center justify-center"><img src={logo} alt="Figfalcon" className="h-6 opacity-70" /></div>
      </footer>

      {/* Sticky mobile CTA */}
      <AnimatePresence>
        {showBar && (
          <motion.button
            onClick={() => { track("coach_cta_click_fit"); document.getElementById("fit")?.scrollIntoView({ behavior: "smooth" }); }}
            initial={{ y: 80 }} animate={{ y: 0 }} exit={{ y: 80 }}
            className="md:hidden fixed bottom-0 inset-x-0 z-50 flex items-center justify-center gap-2 bg-primary text-primary-foreground font-bold py-4 shadow-2xl"
          >
            Book a Free Strategy Call
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Coaches;
