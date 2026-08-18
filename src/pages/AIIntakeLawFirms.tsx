import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import {
  Phone, Calendar, MessageSquare, ShieldCheck, Check, ChevronDown,
  Play, ArrowRight, FileText, Database, Languages, PhoneMissed,
} from "lucide-react";
import Cal, { getCalApi } from "@calcom/embed-react";
import logo from "@/assets/figfalcon-logo.png";
import { useToast } from "@/hooks/use-toast";

// ─── Swap-in constants (update these before launch) ────────────────────────────
const SLOTS_LEFT = 2;                                // must be literally true
const FOUNDING_CLOSE = "12 September";               // must be literally true
const CAL_LINK = "figfalcon/figfalcon-strategy-call";
const CAL_NAMESPACE = "consultation";

const track = (event: string) => {
  (window as unknown as { dataLayer?: { push: (o: object) => void } }).dataLayer?.push({ event });
};

const FadeIn = ({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) => (
  <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-40px" }} transition={{ duration: 0.55, delay, ease: [0.16, 1, 0.3, 1] }}>
    {children}
  </motion.div>
);

const Eyebrow = ({ children }: { children: React.ReactNode }) => (
  <p className="text-xs font-bold uppercase tracking-[0.3em] text-primary mb-4">{children}</p>
);

// Scroll CTA — jumps to the lead form or the booking calendar, brand primary
const ScrollCTA = ({ target, label, big = false, sub }: { target: string; label: string; big?: boolean; sub?: string }) => (
  <div className="flex flex-col items-center gap-2">
    <button
      onClick={() => { track(`cta_click_${target}`); document.getElementById(target)?.scrollIntoView({ behavior: "smooth" }); }}
      className={`inline-flex items-center gap-2.5 font-bold rounded-full bg-primary text-white hover:opacity-90 active:scale-95 transition-all shadow-lg shadow-primary/30 hover:shadow-primary/50 ${
        big ? "px-8 py-4 text-lg md:text-xl" : "px-6 py-3 text-base"
      }`}
    >
      <ArrowRight className={big ? "w-5 h-5" : "w-4 h-4"} /> {label}
    </button>
    {sub && <p className="text-xs text-muted-foreground text-center max-w-sm">{sub}</p>}
  </div>
);

// ─── Animated waveform (CSS bars) ──────────────────────────────────────────────
const Waveform = ({ className = "" }: { className?: string }) => (
  <div className={`flex items-center gap-1 ${className}`} aria-hidden>
    {Array.from({ length: 40 }).map((_, i) => (
      <span
        key={i}
        className="w-1 rounded-full bg-gradient-to-t from-primary to-accent motion-safe:animate-[wave_1.2s_ease-in-out_infinite]"
        style={{ height: `${20 + Math.abs(Math.sin(i * 0.9)) * 60}%`, animationDelay: `${i * 0.05}s` }}
      />
    ))}
  </div>
);

// ─── Loss calculator ───────────────────────────────────────────────────────────
const useCountUp = (target: number) => {
  const [val, setVal] = useState(target);
  const raf = useRef<number>();
  const from = useRef(target);
  useEffect(() => {
    const start = from.current;
    const t0 = performance.now();
    const tick = (t: number) => {
      const p = Math.min((t - t0) / 400, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setVal(Math.round((start + (target - start) * eased) / 100) * 100);
      if (p < 1) raf.current = requestAnimationFrame(tick);
      else from.current = target;
    };
    raf.current = requestAnimationFrame(tick);
    return () => { if (raf.current) cancelAnimationFrame(raf.current); };
  }, [target]);
  return val;
};

const Slider = ({ label, min, max, step, value, onChange, fmt }: {
  label: string; min: number; max: number; step: number; value: number; onChange: (v: number) => void; fmt: (v: number) => string;
}) => (
  <div>
    <div className="flex items-center justify-between mb-2">
      <label className="text-sm text-muted-foreground">{label}</label>
      <span className="font-mono font-semibold text-foreground">{fmt(value)}</span>
    </div>
    <input
      type="range" min={min} max={max} step={step} value={value}
      onChange={(e) => onChange(Number(e.target.value))}
      className="w-full accent-primary h-2 cursor-pointer"
      aria-label={label}
    />
  </div>
);

const LossCalculator = () => {
  const [calls, setCalls] = useState(42);
  const [fee, setFee] = useState(3500);
  const [rate, setRate] = useState(30);
  const [touched, setTouched] = useState(false);
  const loss = calls * 0.35 * (rate / 100) * fee * 12;
  const shown = useCountUp(Math.round(loss / 100) * 100);
  const onAny = (fn: (v: number) => void) => (v: number) => { if (!touched) { setTouched(true); track("calculator_used"); } fn(v); };

  return (
    <div className="glass-card p-8 md:p-10 max-w-2xl mx-auto">
      <div className="space-y-6 mb-8">
        <Slider label="Inbound calls per month" min={10} max={400} step={1} value={calls} onChange={onAny(setCalls)} fmt={(v) => `${v}`} />
        <Slider label="Average fee per signed matter" min={500} max={50000} step={250} value={fee} onChange={onAny(setFee)} fmt={(v) => `$${v.toLocaleString()}`} />
        <Slider label="Your sign rate" min={5} max={80} step={1} value={rate} onChange={onAny(setRate)} fmt={(v) => `${v}%`} />
      </div>
      <p className="text-xs text-muted-foreground mb-6">Defaults are the published averages for solo and small firms.</p>
      <div className="text-center border-t border-border/40 pt-8">
        <p className="text-sm text-muted-foreground mb-2">You are losing approximately</p>
        <p className="font-heading font-bold gradient-text text-5xl md:text-7xl mb-2">${shown.toLocaleString()}<span className="text-2xl text-muted-foreground"> / year</span></p>
        <p className="text-sm text-muted-foreground mb-8">to calls that nobody answers.</p>
        <ScrollCTA target="fit" label="See if we're a fit" sub="Takes two minutes." />
      </div>
    </div>
  );
};

// ─── Data ──────────────────────────────────────────────────────────────────────
const proof = [
  ["35%", "of calls to small firms go unanswered during business hours", "https://www.legalnavigator.ai/post/silent-lines-new-study-shows-35-of-calls-to-law-firms-now-go-unanswered", "Legal Navigator, 2026"],
  ["80%", "of voicemail callers hang up without leaving a message", "https://www.legalsoft.com/blog/law-firm-client-intake-statistics", "Legal Soft, 2026"],
  ["70%", "of cases go to whoever has the first live conversation", "https://www.legalsoft.com/blog/law-firm-client-intake-statistics", "Legal Soft, 2026"],
  ["$332,000", "lost per firm, per year, to missed intake calls", "https://www.voicecharm.ai/blog/law-firm-missed-calls", "VoiceCharm, 2026"],
];

const clips = [
  { title: "Car accident intake", len: "1:02", desc: "Caller describes a collision. The agent captures the date, injuries, whether police attended, and the other party's insurer — then books a consult for Tuesday at 2pm." },
  { title: "9:47 PM, Saturday", len: "0:41", desc: "The office is closed. The agent answers on the second ring, takes the matter details, and texts the attorney before the caller hangs up." },
  { title: "Conflict check", len: "0:36", desc: "The agent asks for the opposing party's name, flags a possible conflict, and routes the call to a human instead of booking it." },
];

const doesItems = [
  [Phone, "Answers in two rings. Always.", "Not \"usually.\" Not \"during business hours.\" Every call, including the one at 9pm on Sunday after a car accident."],
  [ShieldCheck, "Runs your conflict questions before anything gets booked.", "It asks for the opposing party by name and flags a match instead of walking you into a problem."],
  [Check, "Qualifies the matter before it touches your calendar.", "Practice area, date of incident, jurisdiction, injuries. You open your calendar to a briefed consult, not a mystery."],
  [Calendar, "Books straight into your calendar.", "The caller picks a slot while they're still on the phone — while they still want a lawyer. Not a callback. Not a message."],
  [MessageSquare, "Texts you inside 60 seconds.", "Name, matter type, phone number, and the full transcript. On your phone before you've left the courtroom."],
  [Database, "Pushes everything to your CRM.", "Clio, Lawmatics, or a webhook to whatever you run. Nothing gets re-typed and nothing gets lost."],
] as const;

const steps = [
  ["Day 1", "I build it.", "Trained on your website, your practice areas, your intake questions. You do nothing."],
  ["Day 3", "You read it.", "I send you the full script. Change anything you want. Takes about twenty minutes."],
  ["Day 5", "It goes live.", "On your number. Your callers notice nothing except that somebody finally picked up."],
];

const included = [
  "A 24/7 AI intake line that answers in two rings",
  "Your conflict questions, your practice areas, your intake script",
  "Consults booked directly into your calendar",
  "An SMS to you within 60 seconds of every call",
  "A full transcript of every call, searchable",
  "CRM push to Clio, Lawmatics, or your webhook",
  "Every-language handling — 30+ languages, automatic",
  "A monthly intake report",
];

const bonuses = [
  [FileText, "The Intake Audit", "$500", "Five test calls to your firm across three days, logged with timestamps. You find out exactly what a caller hears when they try to reach you — before you decide anything."],
  [MessageSquare, "Your Custom Intake Script", "$600", "Written from your own website, your practice areas, and your Google reviews. Not a template with your name pasted in."],
  [PhoneMissed, "Missed-Call Text-Back", "$400", "Anyone who hangs up before the AI answers gets an SMS within sixty seconds. The ones who almost called you still get caught."],
  [Languages, "Every Language, Handled", "$500", "Your caller speaks — the agent answers in their language automatically. Spanish, Mandarin, Vietnamese, Arabic and more. In Texas, Florida and Arizona this is not a nice-to-have."],
  [FileText, "Thirty Days of Transcripts + Intake Report", "$300", "Every call, searchable. Plus a one-page monthly report showing what came in, what got booked, and what would have been voicemail."],
] as const;

const objections: [string, React.ReactNode][] = [
  ["\"We already use an answering service.\"", "Then you're paying every month for someone to take a message and hang up. Mine asks your conflict questions, qualifies the matter, and books the consult into your calendar while the caller is still on the line. Send me what you pay now and I'll tell you honestly whether switching is worth it."],
  ["\"Can AI really handle legal intake?\"", "Yes — and it stays inside its lane. It does not give legal advice and it does not pretend to be a lawyer. It captures who, what, when and where, and books the consult — the same job your front desk does on its best day. Listen to the clips above and judge for yourself."],
  ["\"Is this confidential?\"", "The agent collects contact details and matter type. That's the same information a receptionist writes on a message pad. It gives no legal advice and forms no attorney-client relationship. The transcripts are yours, and I delete them on request."],
  ["\"What happens when it can't answer something?\"", "It says so, and either transfers to whoever you nominate or takes a message and texts you within sixty seconds. It never guesses. Listen to the conflict-check clip above — that's the behaviour, recorded."],
  ["\"What if my clients hate talking to a machine?\"", "Any caller can say \"representative\" at any point and be transferred. And the honest comparison isn't AI versus your paralegal. It's AI versus the voicemail they're getting right now at 6pm on a Friday."],
  ["\"Do I have to change my phone number?\"", "No. We forward your existing line, or give you a tracking number that rings straight through to your office. Your cards, your letterhead and your Google listing stay exactly as they are."],
  ["\"How fast can this be live?\"", "Five business days from the day you say go."],
  ["\"What does it cost?\"", "It depends on how many calls your firm actually takes — I don't sell a one-size package. Book fifteen minutes below and I'll quote you on your real volume."],
];

const notFor = [
  ["Under 30 inbound calls a month.", "The maths doesn't work in your favour yet. Come back when the phone rings more."],
  ["More than ten practitioners.", "You need an intake department and a proper vendor, not me."],
  ["Corporate, M&A, IP, or securities.", "Your work comes from referrals and relationships, not from strangers calling a number they found on Google. Nothing here applies to you."],
  ["Looking for the cheapest option.", "I'm not it, and we'd both regret it."],
];

// ─── Lead capture form — fields copied from /contact ───────────────────────────
const practiceAreas = ["Legal Practice", "Tax / Accounting", "Financial or Business Advisory", "Consulting", "Other Professional Services"];
const firmSizes = ["Solo", "2-5 practitioners", "6-10 practitioners", "11-15 staff", "15+ staff"];
const leadCountries: { iso: string; flag: string; dial: string }[] = [
  { iso: "US", flag: "🇺🇸", dial: "+1" },
  { iso: "CA", flag: "🇨🇦", dial: "+1" },
  { iso: "GB", flag: "🇬🇧", dial: "+44" },
  { iso: "AU", flag: "🇦🇺", dial: "+61" },
  { iso: "IN", flag: "🇮🇳", dial: "+91" },
];
const MIN_BUDGET = 500; // temporary lower floor

const LeadForm = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "", email: "", company: "", phone: "", phoneCountry: "US", industry: "", companySize: "", budget: "", challenge: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const budgetNum = Number(formData.budget);
  const budgetError = formData.budget !== "" && budgetNum < MIN_BUDGET;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.budget && budgetNum < MIN_BUDGET) {
      toast({ title: "Budget too low", description: `Anything below $${MIN_BUDGET.toLocaleString()}/mo is not a fit yet.`, variant: "destructive" });
      return;
    }
    setSubmitting(true);
    track("lead_form_submit");
    try {
      const country = leadCountries.find((c) => c.iso === formData.phoneCountry);
      const dial = country?.dial ?? "";
      const fullPhone = formData.phone ? `${dial} ${formData.phone}`.trim() : "";
      const res = await fetch("https://n8n-with-ai-assistant-q76o.srv1883884.hstgr.cloud/webhook/5f4734ad-fa9f-4394-8ed1-77284b47d13c", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          phone: fullPhone,
          phoneCountryIso: formData.phoneCountry,
          phoneDialCode: dial,
          phoneLocal: formData.phone,
          submittedAt: new Date().toISOString(),
          source: "figfalcon.com/ai-intake-law-firms",
        }),
      });
      if (!res.ok) throw new Error(`Webhook responded ${res.status}`);
      toast({ title: "Request received!", description: "We'll respond within 24 hours to see if we're a fit." });
      setFormData({ name: "", email: "", company: "", phone: "", phoneCountry: "US", industry: "", companySize: "", budget: "", challenge: "" });
    } catch {
      toast({ title: "Submission failed", description: "Something went wrong. Please try again or email agency@figfalcon.com.", variant: "destructive" });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="glass-card p-6 md:p-8">
      <h3 className="font-heading font-semibold text-xl mb-1">Request a fit call</h3>
      <p className="text-sm text-muted-foreground mb-6">Takes about two minutes. We respond within 24 hours.</p>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="text-sm font-medium mb-1.5 block">Full name <span className="text-destructive">*</span></label>
          <input name="name" value={formData.name} onChange={handleChange} required placeholder="Jordan Lee"
            className="w-full px-4 py-3 rounded-lg bg-secondary/50 border border-border/40 text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all text-sm" />
        </div>
        <div>
          <label className="text-sm font-medium mb-1.5 block">Work email <span className="text-destructive">*</span></label>
          <input name="email" type="email" value={formData.email} onChange={handleChange} required placeholder="jordan@firm.com"
            className="w-full px-4 py-3 rounded-lg bg-secondary/50 border border-border/40 text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all text-sm" />
        </div>
        <div>
          <label className="text-sm font-medium mb-1.5 block">Phone</label>
          <div className="flex gap-2">
            <select name="phoneCountry" value={formData.phoneCountry} onChange={handleChange} aria-label="Country code"
              className="px-3 py-3 rounded-lg bg-secondary/50 border border-border/40 text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all text-sm appearance-none [&>option]:bg-card [&>option]:text-foreground shrink-0 w-[100px]">
              {leadCountries.map((c) => <option key={c.iso} value={c.iso}>{c.flag} {c.dial}</option>)}
            </select>
            <input name="phone" type="tel" value={formData.phone} onChange={handleChange} placeholder="(305) 555-0142"
              className="flex-1 px-4 py-3 rounded-lg bg-secondary/50 border border-border/40 text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all text-sm" />
          </div>
        </div>
        <div>
          <label className="text-sm font-medium mb-1.5 block">Firm name</label>
          <input name="company" value={formData.company} onChange={handleChange} placeholder="Lee & Associates"
            className="w-full px-4 py-3 rounded-lg bg-secondary/50 border border-border/40 text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all text-sm" />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium mb-1.5 block">Practice type</label>
            <select name="industry" value={formData.industry} onChange={handleChange}
              className="w-full px-3 py-3 rounded-lg bg-secondary/50 border border-border/40 text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all text-sm appearance-none [&>option]:bg-card [&>option]:text-foreground">
              <option value="">Select one</option>
              {practiceAreas.map((p) => <option key={p} value={p}>{p}</option>)}
            </select>
          </div>
          <div>
            <label className="text-sm font-medium mb-1.5 block">Firm size</label>
            <select name="companySize" value={formData.companySize} onChange={handleChange}
              className="w-full px-3 py-3 rounded-lg bg-secondary/50 border border-border/40 text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all text-sm appearance-none [&>option]:bg-card [&>option]:text-foreground">
              <option value="">Select one</option>
              {firmSizes.map((s) => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>
        </div>
        <div>
          <label className="text-sm font-medium mb-1.5 block">Monthly investment budget</label>
          <input name="budget" type="number" inputMode="numeric" min={MIN_BUDGET} step={100} value={formData.budget} onChange={handleChange}
            placeholder={`Minimum $${MIN_BUDGET.toLocaleString()}/mo`}
            aria-invalid={budgetError ? true : undefined}
            className={`w-full px-4 py-3 rounded-lg bg-secondary/50 border text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 transition-all text-sm ${budgetError ? "border-destructive focus:ring-destructive/50" : "border-border/40 focus:ring-primary/50"}`} />
          {budgetError && <p className="mt-1.5 text-xs text-destructive">Anything below ${MIN_BUDGET.toLocaleString()}/mo isn't a fit yet.</p>}
        </div>
        <div>
          <label className="text-sm font-medium mb-1.5 block">How many calls are you missing right now?</label>
          <textarea name="challenge" value={formData.challenge} onChange={handleChange} rows={3}
            placeholder="Example: roughly 10-15 calls a month go to voicemail after hours"
            className="w-full px-4 py-3 rounded-lg bg-secondary/50 border border-border/40 text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all text-sm resize-none" />
        </div>
        <button type="submit" disabled={submitting} className="btn-primary w-full justify-center text-base py-4 disabled:opacity-60">
          {submitting ? "Sending..." : "Get Started"}
        </button>
      </form>
    </div>
  );
};

// ─── Media placeholders ────────────────────────────────────────────────────────
const AudioPlaceholder = ({ title, len, desc }: { title: string; len: string; desc: string }) => (
  <div className="glass-card p-6 h-full">
    <div className="flex items-center justify-between mb-4">
      <div className="flex items-center gap-2 text-sm">
        <span className="w-8 h-8 rounded-full bg-primary/15 border border-primary/30 flex items-center justify-center"><Play className="w-3.5 h-3.5 text-primary fill-primary" /></span>
        <span className="font-semibold">{title}</span>
      </div>
      <span className="text-xs font-mono text-muted-foreground">{len}</span>
    </div>
    <Waveform className="h-8 mb-4 opacity-70" />
    <p className="text-sm text-muted-foreground leading-relaxed">{desc}</p>
    <p className="text-[10px] uppercase tracking-widest text-muted-foreground/50 mt-3">Audio clip — drop file here</p>
  </div>
);

// ─── Objection accordion row ───────────────────────────────────────────────────
const ObjRow = ({ q, a }: { q: string; a: React.ReactNode }) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="glass-card overflow-hidden">
      <button onClick={() => setOpen((o) => !o)} className="w-full flex items-center justify-between p-5 text-left">
        <span className="font-semibold pr-4 text-ink">{q}</span>
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

// ─── Hero: glowing sphere + floating live-call card ────────────────────────────
const heroPrompts = [
  { icon: Phone, label: "Incoming call", line: "\"I was in a car accident yesterday and I'm not sure what to do…\"" },
  { icon: Calendar, label: "Book a consult", line: "\"Can I see the attorney Tuesday at 2pm?\"" },
  { icon: ShieldCheck, label: "Conflict check", line: "\"The other driver was James Bennett.\"" },
];

const HeroCallCard = () => {
  const [i, setI] = useState(0);
  useEffect(() => { const t = setInterval(() => setI((v) => (v + 1) % heroPrompts.length), 3000); return () => clearInterval(t); }, []);
  const P = heroPrompts[i];
  return (
    <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.35 }} className="relative mx-auto max-w-lg">
      <motion.div
        animate={{ y: [0, -10, 0] }} transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }}
        className="glass-card p-5 md:p-6 border border-primary/25 shadow-2xl shadow-primary/10 backdrop-blur-xl text-left"
      >
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
            <span className="text-xs text-muted-foreground font-mono">your AI intake line · live</span>
          </div>
          <Waveform className="h-4 w-24 opacity-60 justify-end" />
        </div>
        <div className="min-h-[52px] mb-4">
          <AnimatePresence mode="wait">
            <motion.p key={i} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} transition={{ duration: 0.35 }} className="text-sm text-foreground/90 font-mono leading-relaxed">{P.line}</motion.p>
          </AnimatePresence>
        </div>
        <div className="flex flex-wrap gap-2 mb-5">
          {heroPrompts.map((p, idx) => (
            <span key={idx} className={`inline-flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-full border transition-colors duration-300 ${idx === i ? "border-primary/50 bg-primary/15 text-primary" : "border-border/50 text-muted-foreground"}`}>
              <p.icon className="w-3.5 h-3.5" /> {p.label}
            </span>
          ))}
        </div>
        <button onClick={() => { track("cta_click_fit"); document.getElementById("fit")?.scrollIntoView({ behavior: "smooth" }); }} className="flex items-center justify-center gap-2 w-full bg-primary text-white font-bold rounded-xl py-3 hover:opacity-90 active:scale-[0.98] transition-all">
          <ArrowRight className="w-4 h-4" /> Get this for your firm
        </button>
      </motion.div>
    </motion.div>
  );
};

const HeroSphere = () => (
  <div className="absolute left-1/2 bottom-0 -translate-x-1/2 translate-y-1/2 w-[1100px] h-[1100px] max-w-[210vw] max-h-[210vw] pointer-events-none" aria-hidden>
    <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle,hsl(var(--primary)/0.18),transparent_60%)]" />
    <svg viewBox="0 0 400 400" className="absolute inset-0 w-full h-full opacity-25 motion-safe:animate-[spin_45s_linear_infinite]">
      <g fill="none" stroke="hsl(var(--primary))" strokeWidth="0.5">
        <circle cx="200" cy="200" r="196" />
        <circle cx="200" cy="200" r="150" />
        <circle cx="200" cy="200" r="104" />
        <circle cx="200" cy="200" r="58" />
        {Array.from({ length: 8 }).map((_, k) => (
          <ellipse key={k} cx="200" cy="200" rx={196} ry={196 - k * 24} />
        ))}
        {Array.from({ length: 12 }).map((_, k) => (
          <line key={k} x1="200" y1="4" x2="200" y2="396" transform={`rotate(${k * 15} 200 200)`} />
        ))}
      </g>
    </svg>
  </div>
);

const AIIntakeLawFirms = () => {
  const [showBar, setShowBar] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    (async () => { const cal = await getCalApi({ namespace: CAL_NAMESPACE }); cal("ui", { hideEventTypeDetails: false, theme: "dark" }); })();
    const onScroll = () => { setShowBar(window.scrollY > window.innerHeight * 0.25); setScrolled(window.scrollY > 20); };
    window.addEventListener("scroll", onScroll, { passive: true });
    const onDepth = () => { if ((window.scrollY + window.innerHeight) / document.body.scrollHeight > 0.75) { track("scroll_75"); window.removeEventListener("scroll", onDepth); } };
    window.addEventListener("scroll", onDepth, { passive: true });
    return () => { window.removeEventListener("scroll", onScroll); window.removeEventListener("scroll", onDepth); };
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground pb-16 md:pb-0">
      <style>{`
        @keyframes wave { 0%,100% { transform: scaleY(0.4);} 50% { transform: scaleY(1);} }
        @keyframes guarantee-pulse {
          0%, 100% { box-shadow: 0 0 0 0 hsl(var(--primary)/0.4), 0 0 20px hsl(var(--primary)/0.2); }
          50%      { box-shadow: 0 0 0 12px hsl(var(--primary)/0), 0 0 40px hsl(var(--primary)/0.4); }
        }
        .guarantee-glow { animation: guarantee-pulse 2.5s ease-in-out infinite; }
      `}</style>

      {/* Nav — anchor links + get started */}
      <header className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${scrolled ? "bg-background/85 backdrop-blur-xl border-b border-border/40" : ""}`}>
        <div className="container mx-auto px-6 flex items-center justify-between py-3.5">
          <Link to="/" className="flex items-center gap-2 shrink-0"><img src={logo} alt="Figfalcon" className="h-6 md:h-7" /></Link>
          <nav className="hidden lg:flex items-center gap-8">
            {[["What you're losing", "numbers"], ["Hear it work", "listen"], ["How it works", "how"], ["Guarantee", "guarantee"]].map(([label, id]) => (
              <button key={id} onClick={() => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })} className="text-sm text-muted-foreground hover:text-foreground transition-colors">{label}</button>
            ))}
          </nav>
          <button onClick={() => { track("cta_click_fit"); document.getElementById("fit")?.scrollIntoView({ behavior: "smooth" }); }} className="inline-flex items-center gap-2 text-sm font-bold px-5 py-2.5 rounded-full bg-primary text-white hover:opacity-90 transition-all shadow-lg shadow-primary/30 shrink-0">
            Get Started
          </button>
        </div>
      </header>

      {/* Hero */}
      <section className="relative pt-28 pb-20 md:pt-36 md:pb-24 overflow-hidden">
        <div className="absolute inset-0 gradient-hero opacity-60" />
        <HeroSphere />
        <div className="container mx-auto px-6 relative z-10 max-w-3xl text-center">
          <FadeIn>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/30 bg-primary/10 text-primary text-xs font-bold uppercase tracking-widest mb-6">
              <Phone className="w-3.5 h-3.5" /> AI intake for small professional-services firms
            </div>
          </FadeIn>
          <FadeIn delay={0.05}>
            <h1 className="font-heading font-bold leading-[1.15] tracking-tight mb-6">
              <span className="block text-[clamp(1rem,0.7rem+1.5vw,1.875rem)] text-foreground/75 mb-1.5">
                35% of calls go to voicemail.
              </span>
              <span className="gradient-text block text-[clamp(1.75rem,1rem+3.5vw,3.75rem)]">
                80% never call back.
              </span>
            </h1>
          </FadeIn>
          <FadeIn delay={0.1}>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-9 leading-relaxed">
              An AI voice employee that answers in two rings, qualifies the matter, and books the consult straight onto your calendar — nights, weekends, and while you're in court.
            </p>
          </FadeIn>
          <FadeIn delay={0.15}>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <ScrollCTA target="fit" label="Get Started" big />
              <button onClick={() => document.getElementById("how")?.scrollIntoView({ behavior: "smooth" })} className="inline-flex items-center gap-2 font-bold rounded-full border border-border/60 bg-secondary/30 text-foreground px-8 py-4 text-base hover:bg-secondary/50 active:scale-95 transition-all">
                <Play className="w-4 h-4 fill-current" /> See how it works
              </button>
            </div>
          </FadeIn>
          <FadeIn delay={0.25}>
            <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 mt-8 text-xs text-muted-foreground">
              <span className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-accent" /> Live in 5 days</span>
              <span className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-accent" /> Keep your existing number</span>
              <span className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-accent" /> Two-rings guarantee</span>
            </div>
          </FadeIn>

          {/* Floating live-call card over the rotating dome */}
          <div className="relative z-10 mt-16 md:mt-20"><HeroCallCard /></div>
        </div>
      </section>

      {/* Proof band */}
      <section id="numbers" className="py-14 bg-secondary/20 border-y border-border/40 scroll-mt-16">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {proof.map(([num, desc, href, cite], i) => (
              <FadeIn key={i} delay={i * 0.06}>
                <div>
                  <p className="font-heading font-bold text-4xl md:text-5xl gradient-text mb-2">{num}</p>
                  <p className="text-sm text-muted-foreground leading-snug mb-2">{desc}</p>
                  <a href={href} target="_blank" rel="noopener noreferrer" className="text-[11px] text-muted-foreground/70 hover:text-primary underline">{cite}</a>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Fit call — split layout: offer recap left, lead form right */}
      <section id="fit" className="py-20 md:py-24 scroll-mt-16">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-start">
            <FadeIn>
              <Eyebrow>Next step</Eyebrow>
              <h2 className="font-heading font-bold text-3xl md:text-5xl leading-[1.1] mb-5">
                See if we can fill your <span className="gradient-text">consult calendar.</span>
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-8 max-w-md">
                Best fit: solo to ~15-practitioner professional-services firms who want every call answered and booked, without hiring a receptionist.
              </p>
              <ul className="space-y-3">
                {[
                  "Primary metric: booked, qualified consultations",
                  "Built for owner-operated firms, not corporate departments",
                  "Clear KPIs — booked consults, show-up rate, cost per consult — before any kickoff",
                  "No lead dumps, no guaranteed outcomes — just a full calendar",
                ].map((t) => (
                  <li key={t} className="flex items-start gap-2.5 text-sm">
                    <Check className="w-4 h-4 text-accent shrink-0 mt-0.5" /><span className="text-foreground/90">{t}</span>
                  </li>
                ))}
              </ul>
            </FadeIn>
            <FadeIn delay={0.1}><LeadForm /></FadeIn>
          </div>
        </div>
      </section>

      {/* Calculator */}
      <section className="py-20 md:py-24 bg-secondary/10">
        <div className="container mx-auto px-6">
          <FadeIn>
            <div className="text-center max-w-2xl mx-auto mb-10">
              <Eyebrow>The loss calculator</Eyebrow>
              <h2 className="font-heading font-bold text-3xl md:text-5xl leading-[1.1] mb-4">What is your phone <span className="gradient-text">costing you?</span></h2>
              <p className="text-muted-foreground">Drag these to your real numbers. The maths is the industry average for firms your size — the loss is yours.</p>
            </div>
          </FadeIn>
          <FadeIn delay={0.1}><LossCalculator /></FadeIn>
        </div>
      </section>

      {/* Listen */}
      <section id="listen" className="py-20 md:py-24 bg-secondary/10 scroll-mt-16">
        <div className="container mx-auto px-6 max-w-6xl">
          <FadeIn><h2 className="font-heading font-bold text-3xl md:text-5xl text-center leading-[1.1] mb-12">Don't take my word for it. <span className="gradient-text">Listen to it work.</span></h2></FadeIn>
          <div className="grid md:grid-cols-3 gap-5">
            {clips.map((c, i) => <FadeIn key={i} delay={i * 0.08}><AudioPlaceholder {...c} /></FadeIn>)}
          </div>
        </div>
      </section>

      {/* Video */}
      <section className="py-20 md:py-24">
        <div className="container mx-auto px-6 max-w-4xl">
          <FadeIn><h2 className="font-heading font-bold text-3xl md:text-5xl text-center leading-[1.1] mb-10">Sixty seconds, <span className="gradient-text">start to finish.</span></h2></FadeIn>
          <FadeIn delay={0.1}>
            <div className="aspect-video rounded-2xl border border-border/50 bg-secondary/20 flex flex-col items-center justify-center gap-3">
              <span className="w-16 h-16 rounded-full bg-primary/15 border border-primary/30 flex items-center justify-center"><Play className="w-7 h-7 text-primary fill-primary ml-1" /></span>
              <p className="text-sm text-muted-foreground">60-second call recording — drop video here</p>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* What it does — bento */}
      <section className="py-20 md:py-24 bg-secondary/10">
        <div className="container mx-auto px-6 max-w-5xl">
          <FadeIn><h2 className="font-heading font-bold text-3xl md:text-5xl text-center leading-[1.1] mb-14">What it <span className="gradient-text">actually does.</span></h2></FadeIn>
          <div className="grid md:grid-cols-3 gap-4 auto-rows-fr">
            {doesItems.map(([Icon, head, body], i) => (
              <FadeIn key={i} delay={i * 0.05}>
                <div className={`glass-card-hover p-6 h-full ${i === 0 ? "md:col-span-2 md:row-span-1" : ""} ${i === 0 ? "bg-gradient-to-br from-primary/10 via-transparent to-transparent border-primary/25" : ""}`}>
                  <span className="w-11 h-11 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary mb-4"><Icon className="w-5 h-5" /></span>
                  <h3 className="font-heading font-semibold mb-1.5">{head}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{body}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="how" className="py-20 md:py-24 scroll-mt-16">
        <div className="container mx-auto px-6 max-w-5xl">
          <FadeIn><h2 className="font-heading font-bold text-3xl md:text-5xl text-center leading-[1.1] mb-14">Five days. <span className="gradient-text">Twenty minutes of your time.</span></h2></FadeIn>
          <div className="grid md:grid-cols-3 gap-8 mb-10">
            {steps.map(([day, head, body], i) => (
              <FadeIn key={i} delay={i * 0.08}>
                <div>
                  <div className="flex items-center gap-3 mb-4"><span className="text-xs font-bold uppercase tracking-widest text-primary">{day}</span></div>
                  <h3 className="font-heading font-semibold text-lg mb-2">{head}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{body}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Included + bonus stack */}
      <section id="included" className="py-20 md:py-24 bg-secondary/10 scroll-mt-16">
        <div className="container mx-auto px-6 max-w-5xl grid lg:grid-cols-2 gap-6">
          <FadeIn>
            <div className="glass-card p-8 h-full">
              <h3 className="font-heading font-bold text-xl mb-6">What you get</h3>
              <ul className="space-y-3">
                {included.map((t, i) => <li key={i} className="flex items-start gap-2.5 text-sm"><Check className="w-4 h-4 text-accent shrink-0 mt-0.5" /><span className="text-foreground/90">{t}</span></li>)}
              </ul>
            </div>
          </FadeIn>
          <FadeIn delay={0.1}>
            <div className="glass-card p-8 h-full">
              <h3 className="font-heading font-bold text-xl mb-6">And these, free, for founding clients</h3>
              <div className="space-y-5">
                {bonuses.map(([Icon, name, val, desc], i) => (
                  <div key={i}>
                    <div className="flex items-center justify-between mb-1">
                      <span className="flex items-center gap-2 font-semibold text-sm"><Icon className="w-4 h-4 text-primary" /> {name}</span>
                      <span className="text-sm shrink-0 ml-3"><span className="line-through text-muted-foreground/60">{val}</span> <span className="text-accent font-bold">FREE</span></span>
                    </div>
                    <p className="text-xs text-muted-foreground leading-relaxed pl-6">{desc}</p>
                  </div>
                ))}
              </div>
              <div className="mt-6 pt-5 border-t border-border/40 flex items-center justify-between">
                <span className="font-heading font-semibold">Total value</span>
                <span className="font-heading font-bold text-2xl gradient-text">$2,300</span>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Guarantee */}
      <section id="guarantee" className="py-16 md:py-20 bg-secondary/10 scroll-mt-16">
        <div className="container mx-auto px-6 max-w-3xl">
          <FadeIn>
            <div className="glass-card p-8 md:p-10 border border-primary/30 ring-1 ring-primary/10 text-center">
              <div className="flex justify-center mb-5">
                <div className="w-16 h-16 rounded-full bg-primary/10 border border-primary/30 flex items-center justify-center guarantee-glow">
                  <ShieldCheck className="w-8 h-8 text-primary" />
                </div>
              </div>
              <div className="text-xs uppercase tracking-widest text-primary mb-3">Our Guarantee</div>
              <h2 className="font-heading font-bold text-2xl md:text-4xl leading-tight mb-5">
                <span className="block md:whitespace-nowrap">Every Call Answered in Two Rings.</span>
                <span className="gradient-text block md:whitespace-nowrap">Miss One, and That Month Is Free.</span>
              </h2>
              <p className="text-muted-foreground leading-relaxed max-w-xl mx-auto mb-5">
                24 hours a day, with a full transcript of every call. We measure it from our own call logs — so the promise is on us, not on your demand.
              </p>
              <p className="text-sm font-semibold text-foreground">No answering service offers this. Because most cannot back it up.</p>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Objections */}
      <section id="faq" className="py-20 md:py-24 bg-secondary/10 scroll-mt-16">
        <div className="container mx-auto px-6 max-w-3xl">
          <FadeIn><h2 className="font-heading font-bold text-3xl md:text-4xl text-center leading-tight mb-12">The things you're <span className="gradient-text">already thinking.</span></h2></FadeIn>
          <div className="space-y-3">
            {objections.map(([q, a], i) => <FadeIn key={i} delay={i * 0.03}><ObjRow q={q} a={a} /></FadeIn>)}
          </div>
        </div>
      </section>

      {/* Who this is not for */}
      <section className="py-20 md:py-24">
        <div className="container mx-auto px-6 max-w-3xl">
          <FadeIn>
            <h2 className="font-heading font-bold text-3xl md:text-4xl leading-tight mb-4">This isn't for <span className="gradient-text">every firm.</span></h2>
            <p className="text-muted-foreground mb-10">I take three new firms a month, because I build each intake line myself. So I'd rather be straight with you about who this doesn't work for.</p>
          </FadeIn>
          <div className="space-y-5">
            {notFor.map(([head, body], i) => (
              <FadeIn key={i} delay={i * 0.06}>
                <div className="flex gap-3">
                  <span className="text-destructive text-lg leading-none mt-0.5">✕</span>
                  <div><p className="font-semibold mb-0.5">{head}</p><p className="text-sm text-muted-foreground">{body}</p></div>
                </div>
              </FadeIn>
            ))}
          </div>
          <FadeIn delay={0.3}><p className="mt-10 font-heading font-semibold text-lg">Still here? Then you're exactly who I built this for.</p></FadeIn>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 bg-secondary/20 border-t border-border/40">
        <div className="container mx-auto px-6 max-w-3xl text-center">
          <FadeIn>
            <h2 className="font-heading font-bold text-4xl md:text-5xl mb-4">Stop reading. <span className="gradient-text">Book it.</span></h2>
            <p className="text-muted-foreground max-w-md mx-auto mb-10">Fifteen minutes and you'll know immediately whether this is worth doing.</p>
          </FadeIn>
        </div>
        <div id="book" className="container mx-auto px-6 max-w-4xl scroll-mt-20">
          <FadeIn delay={0.15}>
            <div className="rounded-2xl overflow-hidden border border-border/40 shadow-xl mb-4">
              <Cal namespace={CAL_NAMESPACE} calLink={CAL_LINK} style={{ width: "100%", height: "100%", overflow: "scroll" }} config={{ layout: "month_view", theme: "dark" }} />
            </div>
            <p className="text-center text-xs text-muted-foreground">{SLOTS_LEFT} founding slots left this month. Founding terms close {FOUNDING_CLOSE}.</p>
          </FadeIn>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t border-border/40">
        <div className="container mx-auto px-6 flex items-center justify-center"><img src={logo} alt="Figfalcon" className="h-6 opacity-70" /></div>
      </footer>

      {/* Sticky mobile CTA bar */}
      <AnimatePresence>
        {showBar && (
          <motion.button
            onClick={() => { track("cta_click_fit"); document.getElementById("fit")?.scrollIntoView({ behavior: "smooth" }); }}
            initial={{ y: 80 }} animate={{ y: 0 }} exit={{ y: 80 }}
            className="md:hidden fixed bottom-0 inset-x-0 z-50 flex items-center justify-center gap-2 bg-primary text-white font-bold py-4 shadow-2xl"
          >
            Get Started
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AIIntakeLawFirms;
