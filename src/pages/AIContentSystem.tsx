import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, ChevronLeft, ChevronRight, ChevronDown, Check, X, Menu } from "lucide-react";
import useEmblaCarousel from "embla-carousel-react";
import { getCalApi } from "@calcom/embed-react";
import Cal from "@calcom/embed-react";
import logo from "@/assets/figfalcon-logo.png";

const CAL_LINK = "figfalcon/consultation-on-ai-helping-your-business";
const CAL_NAMESPACE = "consultation";

// Set src to a YouTube embed URL, Vimeo URL, or direct MP4 when videos are ready.
// Leaving src empty renders a clean placeholder with a play icon.
type VideoSlot = { src?: string; poster?: string; title?: string };

const heroVideo: VideoSlot = { title: "Figfalcon AI Content System" };
const clientVideos: VideoSlot[] = [
  { title: "Client result 1" },
  { title: "Client result 2" },
  { title: "Client result 3" },
  { title: "Client result 4" },
];

// AI Clone challenge — mark which tile is the real human (others are AI clones).
// Replace placeholders with real video URLs later.
const cloneChallenge: (VideoSlot & { isReal: boolean })[] = [
  { title: "Video A", isReal: false },
  { title: "Video B", isReal: true },
  { title: "Video C", isReal: false },
  { title: "Video D", isReal: false },
];

const VideoPlayer = ({ video, aspect = "video" }: { video: VideoSlot; aspect?: "video" | "portrait" }) => {
  const aspectClass = aspect === "portrait" ? "aspect-[9/16]" : "aspect-video";

  if (video.src) {
    const isIframe = /youtube\.com|youtu\.be|vimeo\.com/.test(video.src);
    return (
      <div className={`relative ${aspectClass} w-full rounded-2xl overflow-hidden border border-border/50 bg-secondary/40`}>
        {isIframe ? (
          <iframe
            src={video.src}
            title={video.title ?? "Video"}
            className="absolute inset-0 w-full h-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        ) : (
          <video
            src={video.src}
            poster={video.poster}
            controls
            playsInline
            className="absolute inset-0 w-full h-full object-cover"
          />
        )}
      </div>
    );
  }

  return (
    <div
      className={`relative ${aspectClass} w-full rounded-2xl overflow-hidden border border-border/50 flex items-center justify-center bg-gradient-to-br from-secondary/70 to-background`}
      aria-label={video.title ?? "Video placeholder"}
    >
      <div className="absolute inset-0 opacity-40 bg-[radial-gradient(circle_at_30%_20%,hsl(var(--primary)/0.25),transparent_50%)]" />
      <div className="relative flex flex-col items-center gap-3 text-muted-foreground">
        <div className="w-16 h-16 rounded-full bg-primary/15 border border-primary/30 flex items-center justify-center backdrop-blur-sm">
          <Play className="w-7 h-7 text-primary fill-primary" />
        </div>
        {video.title && <span className="text-sm">{video.title}</span>}
      </div>
    </div>
  );
};

const scrollToBooking = () => {
  const el = document.getElementById("booking");
  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
};

const BookButton = ({ label = "Book a Strategy Call", large = false }: { label?: string; large?: boolean }) => (
  <button
    type="button"
    onClick={scrollToBooking}
    className={`btn-primary justify-center ${large ? "text-lg px-10 py-4" : ""}`}
  >
    {label}
  </button>
);

const FadeIn = ({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 18 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-60px" }}
    transition={{ duration: 0.5, delay }}
  >
    {children}
  </motion.div>
);

/* ------------------------------- Navbar --------------------------------- */

const LandingNavbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const links = [
    { label: "How It Works", href: "#how-it-works" },
    { label: "Results", href: "#results" },
    { label: "Book a Call", href: "#booking" },
    { label: "FAQ", href: "#faq" },
  ];

  const handleNav = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-400 ${
        scrolled
          ? "bg-background/85 backdrop-blur-xl border-b border-border/40 shadow-md shadow-background/40"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-6 flex items-center justify-between h-16 md:h-18">
        <a href="#" className="flex items-center gap-2 shrink-0">
          <img src={logo} alt="Figfalcon" className="h-7 md:h-8" />
        </a>

        <nav className="hidden md:flex items-center gap-1">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={(e) => handleNav(e, l.href)}
              className="text-sm font-medium px-4 py-2 rounded-full text-muted-foreground hover:text-foreground transition-colors duration-200"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div className="hidden md:block">
          <BookButton label="Book a Free Strategy Call" />
        </div>

        <button
          className="md:hidden text-foreground p-2"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-background/95 backdrop-blur-xl border-b border-border/40"
          >
            <div className="container mx-auto px-6 py-5 flex flex-col gap-2">
              {links.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  onClick={(e) => handleNav(e, l.href)}
                  className="text-base font-medium px-4 py-3 rounded-xl text-muted-foreground hover:text-foreground transition-colors"
                >
                  {l.label}
                </a>
              ))}
              <div className="mt-3">
                <BookButton label="Book a Free Strategy Call" />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

/* ------------------------------- Sections ------------------------------- */

const ProblemCards = () => {
  const items = [
    {
      n: "01",
      title: "Visibility",
      body: "You've got the results and the experience. But if someone looks you up right now, they won't see any of that.",
    },
    {
      n: "02",
      title: "Trust",
      body: "Even if they do find you, your content is dead or outdated. So they go with the competitor who shows up every day.",
    },
    {
      n: "03",
      title: "Conversion",
      body: "Even if you post, where do those people go? No funnel. No follow-up. Just views that never turn into calls.",
    },
  ];
  return (
    <section className="py-24">
      <div className="container mx-auto px-6 max-w-3xl">
        <FadeIn>
          <h2 className="font-heading font-bold text-3xl md:text-[2.6rem] text-center leading-tight mb-4">
            <span className="block whitespace-nowrap">Why Your Business Isn&apos;t <span className="gradient-text">Growing</span></span>
            <span className="block">As Fast As It Should</span>
          </h2>
          <p className="text-center text-muted-foreground mb-14">
            You&apos;re great at what you do. But not enough people know you exist.
          </p>
        </FadeIn>

        <div className="space-y-5">
          {items.map((it, i) => (
            <FadeIn key={it.n} delay={i * 0.08}>
              <div className="relative rounded-2xl bg-card border border-border/60 p-7 md:p-8 shadow-sm overflow-hidden">
                <div className="absolute left-0 top-6 bottom-6 w-[3px] rounded-r-full bg-primary" />
                <div className="flex items-start gap-5">
                  <div className="w-11 h-11 rounded-full bg-primary text-white flex items-center justify-center font-heading font-semibold text-sm shrink-0">
                    {it.n}
                  </div>
                  <div className="flex-1">
                    <div className="text-xs font-medium text-primary/80 mb-2 tracking-wider">
                      / {it.n} of 03
                    </div>
                    <h3 className="font-heading font-bold text-3xl md:text-4xl mb-3">{it.title}</h3>
                    <p className="text-muted-foreground leading-relaxed max-w-xl">{it.body}</p>
                  </div>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>

        <FadeIn delay={0.2}>
          <div className="flex flex-col items-center mt-14">
            <div className="w-10 h-10 rounded-full border border-primary/30 bg-primary/5 flex items-center justify-center mb-5">
              <ChevronDown className="w-5 h-5 text-primary" />
            </div>
            <div className="h-px w-full max-w-md bg-border/60 mb-6" />
            <p className="text-center text-foreground max-w-xl leading-relaxed">
              That&apos;s why we don&apos;t just make content for you. We build the entire system from the first video to the booked call.
            </p>
          </div>
        </FadeIn>
      </div>
    </section>
  );
};

const SocialProof = () => {
  const logos = ["Brand 1", "Brand 2", "Brand 3", "Brand 4", "Brand 5", "Brand 6", "Brand 1", "Brand 2", "Brand 3", "Brand 4", "Brand 5", "Brand 6"];
  const testimonials = [
    { quote: "We went from random posting to booked calls every week. Same team, same budget.", name: "Founder name", role: "Coach" },
    { quote: "The system runs itself. I show up to calls that are already warm.", name: "Founder name", role: "Consultant" },
    { quote: "Content used to take my Sundays. Now it takes 30 minutes once a week.", name: "Founder name", role: "Agency owner" },
  ];
  return (
    <section className="py-16 border-y border-border/30 bg-secondary/10">
      <div className="container mx-auto px-6">
        <FadeIn>
          <p className="text-center text-xs uppercase tracking-widest text-muted-foreground mb-8">
            Trusted by coaches, consultants, and agencies
          </p>
        </FadeIn>
        <div className="overflow-hidden mb-14 mask-edges">
          <div className="trust-slider flex items-center gap-16 whitespace-nowrap">
            {logos.map((n, i) => (
              <span key={i} className="font-heading font-bold text-lg text-muted-foreground/60 shrink-0">{n}</span>
            ))}
          </div>
        </div>
        <div className="grid md:grid-cols-3 gap-5">
          {testimonials.map((t, i) => (
            <FadeIn key={i} delay={i * 0.08}>
              <div className="glass-card p-6 h-full">
                <p className="text-foreground leading-relaxed mb-5">&ldquo;{t.quote}&rdquo;</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/15 border border-primary/30" />
                  <div>
                    <div className="text-sm font-semibold">{t.name}</div>
                    <div className="text-xs text-muted-foreground">{t.role}</div>
                  </div>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
};

const SystemStages = () => {
  const stages = [
    { n: "01", title: "Visibility", body: "We identify the exact topics your buyers already search for. Content is built to match." },
    { n: "02", title: "Trust & capture", body: "Landing page, VSL, and a 7-day email sequence do the belief-building for you." },
    { n: "03", title: "Conversion", body: "Warm leads hit your calendar. Retargeting catches the rest." },
  ];
  return (
    <section className="py-24">
      <div className="container mx-auto px-6 max-w-6xl">
        <FadeIn>
          <h2 className="font-heading font-bold text-3xl md:text-4xl text-center mb-4">
            A <span className="gradient-text">three-stage</span> system
          </h2>
          <p className="text-center text-muted-foreground max-w-2xl mx-auto mb-16">
            Each stage plugs into the next. You don&apos;t assemble it. We do.
          </p>
        </FadeIn>
        <div className="grid lg:grid-cols-2 gap-10 items-center">
          <div className="space-y-4">
            {stages.map((s, i) => (
              <FadeIn key={s.n} delay={i * 0.1}>
                <div className="glass-card p-6 flex gap-5">
                  <div className="text-3xl font-heading font-bold text-primary/50 shrink-0">{s.n}</div>
                  <div>
                    <h3 className="font-heading font-semibold text-lg mb-1.5">{s.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{s.body}</p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>

          <FadeIn delay={0.2}>
            {/* Email sequence mockup */}
            <div className="glass-card p-5">
              <div className="flex items-center gap-2 pb-3 border-b border-border/40 mb-3">
                <span className="w-2.5 h-2.5 rounded-full bg-red-400/70" />
                <span className="w-2.5 h-2.5 rounded-full bg-yellow-400/70" />
                <span className="w-2.5 h-2.5 rounded-full bg-green-400/70" />
                <span className="text-xs text-muted-foreground ml-2">7-day email sequence</span>
              </div>
              <div className="space-y-2">
                {[
                  { day: "Day 1", subject: "The 3-part system that fixes slow growth" },
                  { day: "Day 2", subject: "Why most content never books a call" },
                  { day: "Day 3", subject: "The funnel that does the selling for you" },
                  { day: "Day 4", subject: "Before and after: one client's numbers" },
                  { day: "Day 5", subject: "Can an AI clone really replace you on camera?" },
                  { day: "Day 6", subject: "What 30 minutes per week actually produces" },
                  { day: "Day 7", subject: "Ready? Here's how to start." },
                ].map((e, i) => (
                  <div key={i} className="flex items-center gap-3 p-2.5 rounded-lg bg-secondary/40 border border-border/30">
                    <span className="text-[10px] uppercase tracking-wider text-primary font-semibold w-12 shrink-0">{e.day}</span>
                    <span className="text-sm text-foreground truncate">{e.subject}</span>
                  </div>
                ))}
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
};

const BeforeAfter = () => {
  const without = [
    "Posting, crickets, repeat",
    "No system for follow-up",
    "Content burns your weekends",
    "Leads leak out of DMs",
    "No way to track what's working",
  ];
  const withUs = [
    "Content built around buying intent",
    "7-day email nurture on autopilot",
    "30 minutes per week, or none",
    "Every lead hits a booking page",
    "Clear numbers, every week",
  ];
  return (
    <section className="py-24 bg-secondary/10">
      <div className="container mx-auto px-6 max-w-5xl">
        <FadeIn>
          <h2 className="font-heading font-bold text-3xl md:text-4xl text-center mb-14">
            Before and <span className="gradient-text">after</span>
          </h2>
        </FadeIn>
        <div className="grid md:grid-cols-2 gap-5">
          <FadeIn>
            <div className="glass-card p-7 h-full border border-border/60">
              <div className="text-xs uppercase tracking-widest text-muted-foreground mb-5">Without Figfalcon</div>
              <ul className="space-y-3">
                {without.map((w) => (
                  <li key={w} className="flex items-start gap-3 text-muted-foreground">
                    <X className="w-5 h-5 shrink-0 mt-0.5 text-red-400/70" />
                    <span>{w}</span>
                  </li>
                ))}
              </ul>
            </div>
          </FadeIn>
          <FadeIn delay={0.1}>
            <div className="glass-card p-7 h-full border border-primary/40 ring-1 ring-primary/20">
              <div className="text-xs uppercase tracking-widest text-primary mb-5">With Figfalcon</div>
              <ul className="space-y-3">
                {withUs.map((w) => (
                  <li key={w} className="flex items-start gap-3 text-foreground">
                    <Check className="w-5 h-5 shrink-0 mt-0.5 text-primary" />
                    <span>{w}</span>
                  </li>
                ))}
              </ul>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
};

const AICloneChallenge = () => {
  const [picked, setPicked] = useState<number | null>(null);
  const realIndex = cloneChallenge.findIndex((c) => c.isReal);
  const correct = picked !== null && picked === realIndex;

  return (
    <section className="py-24">
      <div className="container mx-auto px-6 max-w-5xl">
        <FadeIn>
          <h2 className="font-heading font-bold text-3xl md:text-4xl text-center mb-4">
            Spot the real <span className="gradient-text">human</span>
          </h2>
          <p className="text-center text-muted-foreground max-w-2xl mx-auto mb-12">
            One of these is the real founder. The other three are AI clones. Pick one.
          </p>
        </FadeIn>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {cloneChallenge.map((c, i) => {
            const isPicked = picked === i;
            const reveal = picked !== null;
            const showAsReal = reveal && c.isReal;
            return (
              <button
                key={i}
                type="button"
                onClick={() => setPicked(i)}
                className={`text-left transition-all duration-300 rounded-2xl ${isPicked ? "ring-2 ring-primary" : ""} ${
                  reveal && !c.isReal && !isPicked ? "opacity-60" : ""
                }`}
              >
                <VideoPlayer video={c} aspect="portrait" />
                <div className="mt-3 text-center">
                  <div className="text-sm font-medium">{c.title}</div>
                  {reveal && (
                    <div className={`text-xs mt-1 ${showAsReal ? "text-primary" : "text-muted-foreground"}`}>
                      {showAsReal ? "Real human" : "AI clone"}
                    </div>
                  )}
                </div>
              </button>
            );
          })}
        </div>

        <AnimatePresence>
          {picked !== null && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="text-center mt-10"
            >
              <p className="text-lg mb-4">
                {correct
                  ? "You got it. Now imagine your audience trying to tell the difference."
                  : "Not quite. That's the point. Clones do the work, you stay in control."}
              </p>
              <button
                type="button"
                onClick={() => setPicked(null)}
                className="text-sm text-primary underline underline-offset-4"
              >
                Try again
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

const ROICalculator = () => {
  const [leads, setLeads] = useState(20);
  const [closeRate, setCloseRate] = useState(20);
  const [dealValue, setDealValue] = useState(3000);
  const [hoursContent, setHoursContent] = useState(6);

  const currentRevenue = Math.round((leads * (closeRate / 100)) * dealValue);
  const projectedRevenue = Math.round((leads * 2.5) * (closeRate / 100) * dealValue);
  const hoursSaved = Math.max(0, Math.round((hoursContent - 0.5) * 4));

  const money = (n: number) => "$" + n.toLocaleString();

  return (
    <section className="py-24 bg-secondary/10">
      <div className="container mx-auto px-6 max-w-5xl">
        <FadeIn>
          <h2 className="font-heading font-bold text-3xl md:text-4xl text-center mb-4">
            What the system is <span className="gradient-text">worth</span>
          </h2>
          <p className="text-center text-muted-foreground max-w-2xl mx-auto mb-12">
            Drag the sliders. See the math.
          </p>
        </FadeIn>

        <div className="grid lg:grid-cols-2 gap-8">
          <FadeIn>
            <div className="glass-card p-7 space-y-6">
              {[
                { label: "Leads per month (today)", value: leads, min: 5, max: 200, step: 1, set: setLeads, display: leads.toString() },
                { label: "Close rate", value: closeRate, min: 5, max: 60, step: 1, set: setCloseRate, display: `${closeRate}%` },
                { label: "Average deal value", value: dealValue, min: 500, max: 25000, step: 100, set: setDealValue, display: money(dealValue) },
                { label: "Hours per week on content", value: hoursContent, min: 0, max: 30, step: 1, set: setHoursContent, display: `${hoursContent} hrs` },
              ].map((s) => (
                <div key={s.label}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">{s.label}</span>
                    <span className="text-sm font-semibold text-primary">{s.display}</span>
                  </div>
                  <input
                    type="range"
                    min={s.min}
                    max={s.max}
                    step={s.step}
                    value={s.value}
                    onChange={(e) => s.set(Number(e.target.value))}
                    className="w-full accent-primary"
                  />
                </div>
              ))}
            </div>
          </FadeIn>

          <FadeIn delay={0.1}>
            <div className="glass-card p-7 space-y-5 border border-primary/30 ring-1 ring-primary/10">
              <div>
                <div className="text-xs uppercase tracking-widest text-muted-foreground mb-1">Monthly revenue today</div>
                <div className="font-heading font-bold text-3xl">{money(currentRevenue)}</div>
              </div>
              <div className="h-px bg-border/40" />
              <div>
                <div className="text-xs uppercase tracking-widest text-muted-foreground mb-1">Projected with Figfalcon system</div>
                <div className="font-heading font-bold text-4xl gradient-text">{money(projectedRevenue)}</div>
                <div className="text-xs text-muted-foreground mt-1">Assuming 2.5x pipeline from content system</div>
              </div>
              <div className="h-px bg-border/40" />
              <div>
                <div className="text-xs uppercase tracking-widest text-muted-foreground mb-1">Hours saved per month</div>
                <div className="font-heading font-bold text-3xl">{hoursSaved} hrs</div>
                <div className="text-xs text-muted-foreground mt-1">30 minutes per week vs your current time</div>
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
};

const StepMockup = ({ step }: { step: number }) => {
  const mockups = [
    // Step 1: Strategy call mockup — two people / calendar
    <div className="w-full h-full flex items-center justify-center gap-6 p-8">
      {[{ label: "Marketing expert" }, { label: "You" }].map((p, i) => (
        <div key={i} className="flex flex-col items-center gap-3">
          <div className="w-16 h-16 rounded-full bg-primary/30 border-2 border-primary/50 flex items-center justify-center">
            <svg viewBox="0 0 24 24" className="w-8 h-8 text-primary/80 fill-current"><path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z"/></svg>
          </div>
          <span className="text-xs text-white/70">{p.label}</span>
        </div>
      ))}
    </div>,
    // Step 2: Onboarding — recording / converting doc
    <div className="w-full h-full flex items-center justify-center gap-5 p-6">
      <div className="w-28 h-20 rounded-xl bg-primary/20 border border-primary/30 flex flex-col items-center justify-center gap-1">
        <svg viewBox="0 0 24 24" className="w-7 h-7 text-primary/80 fill-current"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.5v-9l6 4.5-6 4.5z"/></svg>
        <span className="text-[10px] text-white/60">Recording</span>
      </div>
      <div className="w-28 h-20 rounded-xl bg-white/10 border border-white/20 flex flex-col items-center justify-center gap-1 px-3">
        <span className="text-[10px] text-white/80 font-semibold mb-1">Converting</span>
        {[...Array(4)].map((_, i) => (
          <div key={i} className="w-full h-1.5 rounded-full bg-white/20" />
        ))}
      </div>
    </div>,
    // Step 3: Results dashboard
    <div className="w-full h-full flex items-start gap-3 p-5">
      <div className="flex flex-col gap-1 shrink-0">
        {["Social Media", "Instagram", "Facebook", "Website", "Youtube"].map((item, i) => (
          <div key={i} className={`text-[10px] px-2 py-0.5 rounded ${i === 0 ? "text-white/80 font-semibold" : "text-white/50 hover:text-white/70"}`}>{item}</div>
        ))}
      </div>
      <div className="flex-1 flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <span className="text-xs text-white/60">Revenue</span>
          <span className="text-xs font-bold text-green-400">+65.34%</span>
        </div>
        <div className="h-12 w-full rounded-lg bg-primary/20 flex items-end px-2 gap-1 pb-1">
          {[30, 50, 35, 60, 45, 75, 55, 80].map((h, i) => (
            <div key={i} className="flex-1 rounded-sm bg-primary/60" style={{ height: `${h}%` }} />
          ))}
        </div>
        <div className="self-end w-14 h-10 rounded-lg bg-green-500/20 border border-green-500/30 flex items-center justify-center">
          <span className="text-sm font-bold text-green-400">98%</span>
        </div>
      </div>
    </div>,
  ];

  return (
    <div className="rounded-2xl overflow-hidden bg-gradient-to-br from-primary/30 via-primary/20 to-primary/10 border border-primary/30 h-[200px] md:h-[240px]">
      {mockups[step]}
    </div>
  );
};

const Onboarding = () => {
  const steps = [
    {
      n: "01",
      label: "STEP 01",
      title: "Book a Free Strategy Call",
      body: "We talk about your business and your goals. If it's a fit, we map out your system and agree on lead targets.",
    },
    {
      n: "02",
      label: "STEP 02",
      title: "Onboarding & One Time Handover",
      body: "We onboard you within the first 14 days and take a complete handover from you to avoid any back & forth.",
    },
    {
      n: "03",
      label: "STEP 03",
      title: "We Build & Run Everything",
      body: "Short form and long form content, full funnel, emails, and landing pages live within 30 days & we also manage it all month over month.",
    },
  ];

  return (
    <section className="py-24" id="how-it-works">
      <div className="container mx-auto px-6 max-w-4xl">
        <FadeIn>
          <h2 className="font-heading font-bold text-4xl md:text-5xl text-center mb-2">
            Get Started
          </h2>
          <p className="text-center text-muted-foreground mb-14">As Easy As 1, 2, 3</p>
        </FadeIn>

        <div className="space-y-6">
          {steps.map((s, i) => (
            <FadeIn key={s.n} delay={i * 0.1}>
              <div className="relative grid md:grid-cols-2 gap-0 rounded-2xl overflow-hidden border border-border/60 bg-card shadow-sm">
                {/* Step number top-right badge */}
                <div className="absolute top-4 right-4 text-xs font-semibold text-muted-foreground/50">
                  {s.n}
                </div>

                {/* Left: mockup */}
                <div className="p-4 md:p-5 flex items-center justify-center bg-secondary/20">
                  <div className="w-full">
                    <StepMockup step={i} />
                  </div>
                </div>

                {/* Right: content */}
                <div className="p-7 md:p-9 flex flex-col justify-center border-l border-border/40">
                  <div className="text-xs font-semibold tracking-widest text-muted-foreground mb-3 uppercase">
                    {s.label}
                  </div>
                  <h3 className="font-heading font-bold text-3xl md:text-4xl leading-tight mb-4">
                    {s.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">{s.body}</p>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>

        <FadeIn delay={0.3}>
          <div className="flex justify-center mt-10">
            <BookButton label="Book a Free Strategy Call" />
          </div>
        </FadeIn>
      </div>
    </section>
  );
};

const VideoGallery = () => {
  // Triplicate so the loop is seamless
  const looped = [...clientVideos, ...clientVideos, ...clientVideos];

  return (
    <section className="py-24 bg-secondary/10" id="results">
      <style>{`
        @keyframes video-marquee {
          from { transform: translateX(0); }
          to   { transform: translateX(calc(-100% / 3)); }
        }
        .video-marquee-track {
          animation: video-marquee 18s linear infinite;
        }
        .video-marquee-track:hover {
          animation-play-state: paused;
        }
      `}</style>
      <div className="container mx-auto px-6 max-w-6xl">
        <FadeIn>
          <h2 className="font-heading font-bold text-3xl md:text-4xl text-center mb-4">
            See it in <span className="gradient-text">action</span>
          </h2>
          <p className="text-center text-muted-foreground max-w-xl mx-auto mb-12">
            Real content produced by our AI system for real clients. Short-form, scroll-stopping, and built to convert viewers into booked calls.
          </p>
        </FadeIn>
        <div className="overflow-hidden">
          <div className="video-marquee-track flex gap-5" style={{ width: "max-content" }}>
            {looped.map((v, i) => (
              <div key={i} className="shrink-0 w-[240px]">
                <VideoPlayer video={v} aspect="portrait" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const About = () => (
  <section className="py-24">
    <div className="container mx-auto px-6 max-w-3xl text-center">
      <FadeIn>
        <h2 className="font-heading font-bold text-3xl md:text-4xl mb-6">
          Built for founders who already ship
        </h2>
        <p className="text-lg text-muted-foreground leading-relaxed mb-8">
          We work with coaches, consultants, agencies, and course creators who already make money and want to stop trading hours for leads. Not a guru course. Not a template pack. A system we build and run for you.
        </p>
        <BookButton />
      </FadeIn>
    </div>
  </section>
);

const FinalCTA = () => (
  <section className="py-24 relative overflow-hidden">
    <div className="absolute inset-0 gradient-hero opacity-70" />
    <div className="container mx-auto px-6 relative z-10 max-w-3xl text-center">
      <FadeIn>
        <h2 className="font-heading font-bold text-3xl md:text-5xl mb-6">
          <span className="block">Ready to Be Seen, Trusted,</span>
          <span className="gradient-text block">and Chosen?</span>
        </h2>
      </FadeIn>
      <FadeIn delay={0.1}>
        <div className="flex flex-col items-center gap-2 mt-6">
          <BookButton label="Book Your Strategy Call" large />
          <p className="text-xs text-muted-foreground">Takes less than 2 minutes. No obligation.</p>
        </div>
      </FadeIn>
    </div>
  </section>
);

const BookingEmbed = () => (
  <section className="py-24" id="booking">
    <div className="container mx-auto px-6 max-w-4xl">
      <FadeIn>
        <div className="text-xs font-semibold tracking-widest text-primary uppercase text-center mb-3">
          Book a Free Strategy Call.
        </div>
        <h2 className="font-heading font-bold text-4xl md:text-5xl text-center leading-tight mb-12">
          <span className="block">Ready To Be Seen,</span>
          <span className="gradient-text block">Trusted, and Chosen?</span>
        </h2>
      </FadeIn>
      <FadeIn delay={0.1}>
        <div className="rounded-2xl overflow-hidden border border-border/40 shadow-xl">
          <Cal
            calLink={CAL_LINK}
            style={{ width: "100%", height: "100%", overflow: "scroll" }}
            config={{ layout: "month_view", theme: "dark" }}
          />
        </div>
      </FadeIn>
    </div>
  </section>
);

const FAQ = () => {
  const items = [
    { q: "How fast will I see results?", a: "First content goes live in 2 weeks. First booked calls typically in weeks 3-6 once the nurture is running." },
    { q: "Do I have to be on camera?", a: "No. You can go full AI clone. If you do want to be on camera, we need 30 minutes of raw footage per week." },
    { q: "Is the AI clone realistic?", a: "Realistic enough that most people can't tell. Try the challenge above if you haven't already." },
    { q: "What platforms do you publish to?", a: "YouTube Shorts, Instagram Reels, TikTok, and LinkedIn. We double-post where it makes sense and skip where it doesn't." },
    { q: "What does it cost?", a: "Pricing depends on scope. We cover it on the strategy call once we know what you actually need. No pressure, no deck." },
    { q: "What if I already have a funnel?", a: "We audit it first. If it works, we plug into it. If it doesn't, we replace it." },
  ];
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section className="py-24 bg-secondary/10" id="faq">
      <div className="container mx-auto px-6 max-w-3xl">
        <FadeIn>
          <h2 className="font-heading font-bold text-3xl md:text-4xl text-center mb-12">
            Frequently Asked <span className="gradient-text">Questions</span>
          </h2>
        </FadeIn>
        <div className="space-y-3">
          {items.map((it, i) => (
            <FadeIn key={i} delay={i * 0.04}>
              <div className="glass-card overflow-hidden">
                <button
                  type="button"
                  onClick={() => setOpen(open === i ? null : i)}
                  className="w-full flex items-center justify-between p-5 text-left"
                >
                  <span className="font-medium pr-4">{it.q}</span>
                  <ChevronDown className={`w-5 h-5 text-muted-foreground shrink-0 transition-transform duration-300 ${open === i ? "rotate-180" : ""}`} />
                </button>
                <AnimatePresence>
                  {open === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <p className="px-5 pb-5 text-sm text-muted-foreground leading-relaxed">{it.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
};

/* --------------------------------- SEO --------------------------------- */

const SEO = () => {
  useEffect(() => {
    const prevTitle = document.title;
    document.title = "AI Content System — Figfalcon";

    const setMeta = (name: string, content: string, attr: "name" | "property" = "name") => {
      let el = document.querySelector(`meta[${attr}="${name}"]`) as HTMLMetaElement | null;
      if (!el) {
        el = document.createElement("meta");
        el.setAttribute(attr, name);
        document.head.appendChild(el);
      }
      el.setAttribute("content", content);
      return el;
    };

    const desc = "Turn your content into a client acquisition system that brings you qualified leads, without spending hours creating content.";
    const created = [
      setMeta("description", desc),
      setMeta("og:title", "AI Content System — Figfalcon", "property"),
      setMeta("og:description", desc, "property"),
      setMeta("og:type", "website", "property"),
      setMeta("og:url", "https://figfalcon.com/ai-content-system", "property"),
      setMeta("twitter:card", "summary_large_image"),
      setMeta("twitter:title", "AI Content System — Figfalcon"),
      setMeta("twitter:description", desc),
    ];

    return () => {
      document.title = prevTitle;
      created.forEach((el) => el.parentNode?.removeChild(el));
    };
  }, []);
  return null;
};

/* --------------------------------- Page -------------------------------- */

const AIContentSystem = () => {
  useEffect(() => {
    (async () => {
      const cal = await getCalApi({ namespace: CAL_NAMESPACE });
      cal("ui", { hideEventTypeDetails: false, theme: "dark" });
    })();
  }, []);

  return (
    <>
      <SEO />
      <LandingNavbar />

      {/* HERO — unchanged */}
      <section className="relative pt-24 pb-16 md:pt-32 md:pb-20 overflow-hidden">
        <div className="absolute inset-0 gradient-hero opacity-70" />
        <div className="container mx-auto px-6 relative z-10 max-w-4xl">
          <FadeIn>
            <h1 className="font-heading font-bold text-4xl md:text-[2.75rem] lg:text-5xl text-center leading-tight mb-5">
              <span className="block">Turn Your Content Into a</span>
              <span className="gradient-text block">Client Acquisition System</span>
              <span className="block whitespace-nowrap">That Brings You Qualified Leads</span>
            </h1>
          </FadeIn>
          <FadeIn delay={0.1}>
            <p className="text-center text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto mb-10">
              We build and run your entire AI-powered content and funnel system so you get consistent inbound sales calls without becoming a full-time creator.
            </p>
          </FadeIn>
          <FadeIn delay={0.2}>
            <div className="mb-8">
              <VideoPlayer video={heroVideo} />
            </div>
          </FadeIn>
          <FadeIn delay={0.3}>
            <div className="flex flex-col items-center gap-2">
              <BookButton large />
              <p className="text-xs text-muted-foreground">Takes less than 2 minutes. No obligation.</p>
            </div>
          </FadeIn>
        </div>
      </section>

      <ProblemCards />
      <SystemStages />
      <BeforeAfter />
      <Onboarding />
      <VideoGallery />
      <FinalCTA />
      <BookingEmbed />
      <FAQ />

      <div className="py-10 text-center text-xs text-muted-foreground border-t border-border/30">
        &copy; {new Date().getFullYear()} Figfalcon
      </div>
    </>
  );
};

export default AIContentSystem;
