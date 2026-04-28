import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, ChevronDown, Check, X, Menu, ShieldCheck, Clock, Zap, Users, Trophy } from "lucide-react";
import { getCalApi } from "@calcom/embed-react";
import Cal from "@calcom/embed-react";
import logo from "@/assets/figfalcon-logo.png";

const CAL_LINK = "figfalcon/consultation-on-ai-helping-your-business";
const CAL_NAMESPACE = "consultation";

type VideoSlot = { src?: string; poster?: string; title?: string; label?: string };

const heroVideo: VideoSlot = { title: "Watch: How the AI Content System Works" };

// Process section — 3 static real videos showing raw → AI clone → polished
const processVideos: VideoSlot[] = [
  {
    src: "https://www.youtube.com/embed/FmApOzxTkbc",
    title: "The Raw Recording",
    label: "Step 1 — You Record Once",
  },
  {
    src: "https://www.youtube.com/embed/m98z1j2bC_k",
    title: "AI Clone Output",
    label: "Step 2 — We Build Your AI Clone",
  },
  {
    src: "https://www.youtube.com/embed/Dkeh0ZUHU7c",
    title: "Final Polished Reel",
    label: "Step 3 — Ready to Post",
  },
];

// Client projects carousel — add real client video URLs here when ready
const clientProjectVideos: VideoSlot[] = [
  { title: "Client Project 1", label: "AI Clone" },
  { title: "Client Project 2", label: "AI Clone" },
  { title: "Client Project 3", label: "AI Clone" },
  { title: "Client Project 4", label: "AI Clone" },
  { title: "Client Project 5", label: "AI Clone" },
  { title: "Client Project 6", label: "AI Clone" },
];

/* ─────────────────────────── Primitives ─────────────────────────── */

const VideoPlayer = ({ video, aspect = "video" }: { video: VideoSlot; aspect?: "video" | "portrait" }) => {
  const aspectClass = aspect === "portrait" ? "h-[480px]" : "aspect-video";

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
          <video src={video.src} poster={video.poster} controls playsInline className="absolute inset-0 w-full h-full object-cover" />
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
        {video.title && <span className="text-sm text-center px-4">{video.title}</span>}
      </div>
    </div>
  );
};

const scrollToBooking = () => {
  const el = document.getElementById("booking");
  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
};

const BookButton = ({ label = "Claim Your Free Strategy Call", large = false }: { label?: string; large?: boolean }) => (
  <button
    type="button"
    onClick={scrollToBooking}
    className={`btn-primary justify-center ${large ? "text-lg px-10 py-5" : ""}`}
  >
    {label}
  </button>
);

const FadeIn = ({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-60px" }}
    transition={{ duration: 0.5, delay }}
  >
    {children}
  </motion.div>
);

/* ─────────────────────────── Navbar ─────────────────────────── */

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
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-background/90 backdrop-blur-xl border-b border-border/40 shadow-lg" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-6 flex items-center justify-between h-16">
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
          <BookButton label="Claim Your Free Strategy Call" />
        </div>
        <button className="md:hidden text-foreground p-2" onClick={() => setMobileOpen(!mobileOpen)} aria-label="Toggle menu">
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
                  className="text-base font-medium px-4 py-3 rounded-xl text-muted-foreground hover:text-foreground"
                >
                  {l.label}
                </a>
              ))}
              <div className="mt-3">
                <BookButton label="Claim Your Free Strategy Call" />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

/* ─────────────────────────── Numbers Bar ─────────────────────────── */

const NumbersBar = () => {
  const stats = [
    { value: "1", label: "Recording Session" },
    { value: "15+", label: "Pieces of Content" },
    { value: "3", label: "Platforms Posted" },
    { value: "30", label: "Days to Go Live" },
    { value: "0", label: "Hours From You" },
  ];
  return (
    <section className="py-10 border-y border-border/30 bg-secondary/10">
      <div className="container mx-auto px-6">
        <div className="flex flex-wrap justify-center gap-8 md:gap-16">
          {stats.map((s, i) => (
            <FadeIn key={i} delay={i * 0.06}>
              <div className="text-center">
                <div className="font-heading font-bold text-4xl md:text-5xl gradient-text">{s.value}</div>
                <div className="text-xs text-muted-foreground mt-1 uppercase tracking-widest">{s.label}</div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
};

/* ─────────────────────────── Problem ─────────────────────────── */

const ProblemCards = () => {
  const items = [
    {
      n: "01",
      title: "Visibility",
      body: "You have the results and the track record. But if someone searches you right now, they see nothing. You are invisible to the clients who are already looking for exactly what you do.",
    },
    {
      n: "02",
      title: "Consistency",
      body: "You post once, get busy, and disappear for three weeks. Meanwhile the competitor who shows up every day is the one getting the call. Not because they are better. Because they are visible.",
    },
    {
      n: "03",
      title: "Time",
      body: "You know content matters. But between client work, sales calls, and running your business, content always falls to the bottom of the list. Another week passes. Nothing goes out.",
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
            You are great at what you do. But not enough people know you exist.
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
                    <div className="text-xs font-medium text-primary/80 mb-2 tracking-wider">/ {it.n} of 03</div>
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
            <p className="text-center text-foreground font-medium max-w-xl leading-relaxed">
              That is why we do not just make content for you. We build the entire system from your first recording to booked calls landing on your calendar.
            </p>
          </div>
        </FadeIn>
      </div>
    </section>
  );
};

/* ─────────────────────────── System ─────────────────────────── */

const SystemStages = () => {
  const stages = [
    {
      n: "01",
      title: "We Build Your AI Clone",
      body: "You do one 30-minute recording. We extract your voice, your delivery style, your facial expressions and build an AI clone that generates video content without you ever needing to record again.",
    },
    {
      n: "02",
      title: "We Repurpose Everything",
      body: "That one recording becomes 15 or more short-form videos. Every clip gets custom hooks, captions, and platform-specific edits for Instagram Reels, LinkedIn, and YouTube Shorts.",
    },
    {
      n: "03",
      title: "We Post It All. You Focus on Your Business.",
      body: "We schedule, post, and manage everything across your platforms. You show up everywhere your clients are without opening a single app or spending a single hour on content.",
    },
  ];

  const timeline = [
    { day: "Week 1", subject: "AI clone built. First 15 clips in production." },
    { day: "Week 2", subject: "Content live on Instagram, LinkedIn and YouTube." },
    { day: "Week 3", subject: "Algorithm picks it up. Views start compounding." },
    { day: "Week 4", subject: "First inbound messages. Warm leads in your inbox." },
    { day: "Month 2", subject: "Consistent presence. Trust building at scale." },
    { day: "Month 3", subject: "Inbound calls. People already know you before the call." },
  ];

  return (
    <section className="py-24 bg-secondary/10" id="how-it-works">
      <div className="container mx-auto px-6 max-w-6xl">
        <FadeIn>
          <h2 className="font-heading font-bold text-3xl md:text-4xl text-center leading-tight mb-4">
            <span className="block">The AI System That Runs</span>
            <span className="gradient-text block">Your Personal Brand For You</span>
          </h2>
          <p className="text-center text-muted-foreground max-w-2xl mx-auto mb-16">
            One shoot. Everywhere. Every week. Without you touching it.
          </p>
        </FadeIn>
        <div className="grid lg:grid-cols-2 gap-10 items-center">
          <div className="space-y-4">
            {stages.map((s, i) => (
              <FadeIn key={s.n} delay={i * 0.1}>
                <div className="glass-card p-6 flex gap-5">
                  <div className="text-3xl font-heading font-bold text-primary/50 shrink-0 w-10">{s.n}</div>
                  <div>
                    <h3 className="font-heading font-semibold text-lg mb-1.5">{s.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{s.body}</p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
          <FadeIn delay={0.2}>
            <div className="glass-card p-5">
              <div className="flex items-center gap-2 pb-3 border-b border-border/40 mb-3">
                <span className="w-2.5 h-2.5 rounded-full bg-red-400/70" />
                <span className="w-2.5 h-2.5 rounded-full bg-yellow-400/70" />
                <span className="w-2.5 h-2.5 rounded-full bg-green-400/70" />
                <span className="text-xs text-muted-foreground ml-2">Your first 90 days</span>
              </div>
              <div className="space-y-2">
                {timeline.map((e, i) => (
                  <div key={i} className="flex items-center gap-3 p-2.5 rounded-lg bg-secondary/40 border border-border/30">
                    <span className="text-[10px] uppercase tracking-wider text-primary font-semibold w-16 shrink-0">{e.day}</span>
                    <span className="text-sm text-foreground">{e.subject}</span>
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

/* ─────────────────────────── Offer Stack ─────────────────────────── */

const OfferStack = () => {
  const deliverables = [
    { item: "AI Clone Creation and Setup", value: "$2,000", note: "Your face. Your voice. Unlimited content." },
    { item: "Done-For-You Scripts and Hooks (monthly)", value: "$997/mo", note: "Written around what your buyers search for." },
    { item: "15 or More Short-Form Videos Per Month", value: "$1,500/mo", note: "Reels, Shorts, LinkedIn clips. Fully edited." },
    { item: "Platform Posting and Management", value: "$800/mo", note: "Instagram, LinkedIn and YouTube Shorts." },
    { item: "Monthly Strategy and Performance Call", value: "$400/mo", note: "We review numbers and adjust the system." },
    { item: "Competitor Content Audit", value: "$500", note: "We study what is working in your niche first." },
    { item: "Personal Brand Strategy Session", value: "$300", note: "Your hook, your positioning, your content pillars." },
  ];

  return (
    <section className="py-24">
      <div className="container mx-auto px-6 max-w-4xl">
        <FadeIn>
          <h2 className="font-heading font-bold text-3xl md:text-4xl text-center leading-tight mb-4">
            <span className="block">Everything You Get</span>
            <span className="gradient-text block">Inside the System</span>
          </h2>
          <p className="text-center text-muted-foreground max-w-xl mx-auto mb-12">
            Most agencies sell you one piece of the puzzle. We build and run the whole machine.
          </p>
        </FadeIn>
        <FadeIn delay={0.1}>
          <div className="glass-card overflow-hidden border border-border/60">
            <div className="px-6 py-4 border-b border-border/40 bg-secondary/20">
              <p className="text-xs uppercase tracking-widest text-muted-foreground">The AI Personal Brand System — What is included</p>
            </div>
            <div className="divide-y divide-border/30">
              {deliverables.map((d, i) => (
                <div key={i} className="flex items-start gap-4 px-6 py-4">
                  <Check className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                  <div>
                    <div className="font-medium text-sm">{d.item}</div>
                    <div className="text-xs text-muted-foreground mt-0.5">{d.note}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Hormozi: get them to the call — close on the call. Don't price them out before they speak to you. */}
            <div className="px-6 py-8 bg-primary/5 border-t border-primary/20 text-center">
              <div className="text-xs text-primary uppercase tracking-widest mb-3">How Pricing Works</div>
              <p className="font-heading font-bold text-xl text-foreground mb-2">
                Your Package Is Built on the Call. Not Before It.
              </p>
              <p className="text-sm text-muted-foreground leading-relaxed max-w-lg mx-auto mb-6">
                We do not sell templates. On your free strategy call we scope exactly what your content system needs and tell you the investment required to hit your goals. No guessing. No surprise fees.
              </p>
              <BookButton label="Build My Content System" large />
              <p className="text-xs text-muted-foreground mt-3">Free 30-min call. No commitment. No hard sell.</p>
            </div>
          </div>
        </FadeIn>
        <FadeIn delay={0.2}>
          <div className="flex flex-col items-center mt-10 gap-3">
            <BookButton label="Claim Your Free Strategy Call" large />
            <p className="text-xs text-muted-foreground">Takes less than 2 minutes to book. No commitment required.</p>
          </div>
        </FadeIn>
      </div>
    </section>
  );
};

/* ─────────────────────────── Guarantee ─────────────────────────── */

const Guarantee = () => (
  <section className="py-16 bg-secondary/10">
    <div className="container mx-auto px-6 max-w-3xl">
      <FadeIn>
        <div className="glass-card p-8 md:p-10 border border-primary/30 ring-1 ring-primary/10 text-center">
          <div className="flex justify-center mb-5">
            <div className="w-16 h-16 rounded-full bg-primary/10 border border-primary/30 flex items-center justify-center">
              <Trophy className="w-8 h-8 text-primary" />
            </div>
          </div>
          <div className="text-xs uppercase tracking-widest text-primary mb-3">Our Guarantee</div>
          <h2 className="font-heading font-bold text-3xl md:text-4xl leading-tight mb-5">
            <span className="block">100K Views in 60 Days.</span>
            <span className="gradient-text block">Or We Work Free Until You Do.</span>
          </h2>
          <p className="text-muted-foreground leading-relaxed max-w-xl mx-auto mb-4">
            If your content does not hit 100,000 views within 60 days of going live, we keep working at no charge until it does. No excuses. No renegotiating. We either perform or we earn it.
          </p>
          <p className="text-sm text-muted-foreground/80 max-w-xl mx-auto mb-6">
            Views are combined across Instagram Reels, LinkedIn, and YouTube Shorts and tracked in a shared dashboard you can check at any time.
          </p>
          <p className="text-sm font-semibold text-foreground">
            No other content agency in the market offers this. Because most cannot back it up. We can.
          </p>
        </div>
      </FadeIn>
    </div>
  </section>
);

/* ─────────────────────────── Before / After ─────────────────────────── */

const BeforeAfter = () => {
  const without = [
    "Posting whenever you remember or not at all",
    "Spending 5 to 8 hours a week on content that does not convert",
    "Going quiet for weeks when life gets busy",
    "Creating content no one watches, wondering if it is even worth it",
    "Losing clients to competitors who just show up more consistently",
    "No system. No strategy. Just hoping something lands.",
  ];
  const withUs = [
    "Consistent presence across every platform, every week",
    "30 minutes once and then zero hours for the rest of the month",
    "Content keeps posting even when you are on holiday",
    "Every clip built around buyer intent and scroll-stopping hooks",
    "Inbound leads who already know, like, and trust you before the call",
    "A system that compounds and gets stronger every single month",
  ];
  return (
    <section className="py-24">
      <div className="container mx-auto px-6 max-w-5xl">
        <FadeIn>
          <h2 className="font-heading font-bold text-3xl md:text-4xl text-center leading-tight mb-14">
            <span className="block">Before Figfalcon</span>
            <span className="gradient-text block">vs. After</span>
          </h2>
        </FadeIn>
        <div className="grid md:grid-cols-2 gap-5">
          <FadeIn>
            <div className="glass-card p-7 h-full border border-border/60">
              <div className="flex items-center gap-2 mb-5">
                <div className="w-7 h-7 rounded-full bg-red-500/15 border border-red-500/30 flex items-center justify-center">
                  <X className="w-4 h-4 text-red-400" />
                </div>
                <div className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Without Figfalcon</div>
              </div>
              <ul className="space-y-3">
                {without.map((w) => (
                  <li key={w} className="flex items-start gap-3 text-muted-foreground">
                    <X className="w-4 h-4 shrink-0 mt-0.5 text-red-400/60" />
                    <span className="text-sm leading-relaxed">{w}</span>
                  </li>
                ))}
              </ul>
            </div>
          </FadeIn>
          <FadeIn delay={0.1}>
            <div className="glass-card p-7 h-full border border-primary/40 ring-1 ring-primary/20">
              <div className="flex items-center gap-2 mb-5">
                <div className="w-7 h-7 rounded-full bg-primary/15 border border-primary/30 flex items-center justify-center">
                  <Check className="w-4 h-4 text-primary" />
                </div>
                <div className="text-sm font-semibold text-primary uppercase tracking-wider">With Figfalcon</div>
              </div>
              <ul className="space-y-3">
                {withUs.map((w) => (
                  <li key={w} className="flex items-start gap-3">
                    <Check className="w-4 h-4 shrink-0 mt-0.5 text-primary" />
                    <span className="text-sm leading-relaxed">{w}</span>
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

/* ─────────────────────────── Onboarding ─────────────────────────── */

const StepMockup = ({ step }: { step: number }) => {
  const mockups = [
    <div className="w-full h-full flex items-center justify-center gap-6 p-8">
      {[{ label: "Your Strategist" }, { label: "You" }].map((p, i) => (
        <div key={i} className="flex flex-col items-center gap-3">
          <div className="w-16 h-16 rounded-full bg-primary/30 border-2 border-primary/50 flex items-center justify-center">
            <svg viewBox="0 0 24 24" className="w-8 h-8 text-primary/80 fill-current"><path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z" /></svg>
          </div>
          <span className="text-xs text-white/70">{p.label}</span>
        </div>
      ))}
    </div>,
    <div className="w-full h-full flex items-center justify-center gap-5 p-6">
      <div className="w-28 h-20 rounded-xl bg-primary/20 border border-primary/30 flex flex-col items-center justify-center gap-1">
        <svg viewBox="0 0 24 24" className="w-7 h-7 text-primary/80 fill-current"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.5v-9l6 4.5-6 4.5z" /></svg>
        <span className="text-[10px] text-white/60">30 min</span>
      </div>
      <div className="w-28 h-20 rounded-xl bg-white/10 border border-white/20 flex flex-col items-center justify-center gap-1 px-3">
        <span className="text-[10px] text-white/80 font-semibold mb-1">AI Clone</span>
        {[...Array(4)].map((_, i) => (<div key={i} className="w-full h-1.5 rounded-full bg-primary/40" />))}
      </div>
    </div>,
    <div className="w-full h-full flex items-start gap-3 p-5">
      <div className="flex flex-col gap-1 shrink-0">
        {["Instagram", "LinkedIn", "YouTube"].map((item) => (
          <div key={item} className="text-[10px] px-2 py-0.5 rounded text-white/60">{item}</div>
        ))}
      </div>
      <div className="flex-1 flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <span className="text-xs text-white/60">Content live</span>
          <span className="text-xs font-bold text-green-400">active</span>
        </div>
        <div className="h-12 w-full rounded-lg bg-primary/20 flex items-end px-2 gap-1 pb-1">
          {[30, 50, 35, 60, 45, 75, 55, 80].map((h, i) => (
            <div key={i} className="flex-1 rounded-sm bg-primary/60" style={{ height: `${h}%` }} />
          ))}
        </div>
        <div className="self-end w-14 h-10 rounded-lg bg-green-500/20 border border-green/30 flex items-center justify-center">
          <span className="text-sm font-bold text-green-400">Live</span>
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
      n: "01", label: "STEP 01",
      title: "Book a Free Strategy Call",
      body: "We talk about your business, your audience, and your goals. If it is a fit, we map out your content system and agree on targets. No fluff. No pitch deck.",
    },
    {
      n: "02", label: "STEP 02",
      title: "One 30-Minute Recording",
      body: "You show up once. We handle scripting, prompts, and everything you need. No fancy setup. No stress. Or skip it entirely and go full AI clone.",
    },
    {
      n: "03", label: "STEP 03",
      title: "We Build. We Post. You Close.",
      body: "Content goes live across every platform within 14 days. 15 or more pieces per month. Everywhere your clients are. While you focus on running your business.",
    },
  ];
  return (
    <section className="py-24 bg-secondary/10" id="get-started">
      <div className="container mx-auto px-6 max-w-4xl">
        <FadeIn>
          <h2 className="font-heading font-bold text-4xl md:text-5xl text-center mb-2">Get Started</h2>
          <p className="text-center text-muted-foreground mb-14">As Easy As 1, 2, 3</p>
        </FadeIn>
        <div className="space-y-6">
          {steps.map((s, i) => (
            <FadeIn key={s.n} delay={i * 0.1}>
              <div className="relative grid md:grid-cols-2 gap-0 rounded-2xl overflow-hidden border border-border/60 bg-card shadow-sm">
                <div className="absolute top-4 right-4 text-xs font-semibold text-muted-foreground/40">{s.n}</div>
                <div className="p-4 md:p-5 flex items-center justify-center bg-secondary/20">
                  <div className="w-full"><StepMockup step={i} /></div>
                </div>
                <div className="p-7 md:p-9 flex flex-col justify-center border-l border-border/40">
                  <div className="text-xs font-semibold tracking-widest text-muted-foreground mb-3 uppercase">{s.label}</div>
                  <h3 className="font-heading font-bold text-3xl md:text-4xl leading-tight mb-4">{s.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{s.body}</p>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
        <FadeIn delay={0.3}>
          <div className="flex flex-col items-center mt-10 gap-3">
            <BookButton label="Book a Free Strategy Call" large />
          </div>
        </FadeIn>
      </div>
    </section>
  );
};

/* ─────────────────────────── Scarcity ─────────────────────────── */

const ScarcityBar = () => {
  const month = new Date().toLocaleString("default", { month: "long", year: "numeric" });
  return (
    <section className="py-10">
      <div className="container mx-auto px-6 max-w-3xl">
        <FadeIn>
          <div className="glass-card border border-primary/40 ring-1 ring-primary/10 p-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-primary/10 border border-primary/30 flex items-center justify-center shrink-0">
                <Clock className="w-6 h-6 text-primary" />
              </div>
              <div>
                <div className="font-heading font-bold text-lg">{month} — 2 of 5 Spots Remaining</div>
                <div className="text-sm text-muted-foreground">We cap onboarding to protect results. When spots fill, the next opening is next month.</div>
              </div>
            </div>
            <BookButton label="Check Availability" />
          </div>
        </FadeIn>
      </div>
    </section>
  );
};

/* ─────────────────────────── Process Videos (3 static) ─────────────────────────── */

const ProcessVideos = () => (
  <section className="py-24 bg-secondary/10" id="results">
    <div className="container mx-auto px-6 max-w-5xl">
      <FadeIn>
        <h2 className="font-heading font-bold text-3xl md:text-4xl text-center leading-tight mb-4">
          <span className="block">One Shoot.</span>
          <span className="gradient-text block">Here is What Comes Out.</span>
        </h2>
        <p className="text-center text-muted-foreground max-w-xl mx-auto mb-12">
          Raw recording goes in. Polished, platform-ready content comes out. Watch the exact transformation below.
        </p>
      </FadeIn>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {processVideos.map((v, i) => (
          <FadeIn key={i} delay={i * 0.1}>
            <div className="flex flex-col gap-3">
              <VideoPlayer video={v} aspect="portrait" />
              {v.label && (
                <div className="text-center text-xs font-semibold text-primary uppercase tracking-wider">{v.label}</div>
              )}
            </div>
          </FadeIn>
        ))}
      </div>
    </div>
  </section>
);

/* ─────────────────────────── Client Projects (auto-scroll) ─────────────────────────── */

const ClientProjects = () => {
  const looped = [...clientProjectVideos, ...clientProjectVideos, ...clientProjectVideos];
  return (
    <section className="py-24">
      <style>{`
        @keyframes client-marquee {
          from { transform: translateX(0); }
          to   { transform: translateX(calc(-100% / 3)); }
        }
        .client-marquee-track { animation: client-marquee 22s linear infinite; }
        .client-marquee-track:hover { animation-play-state: paused; }
      `}</style>
      <div className="container mx-auto px-6 max-w-6xl">
        <FadeIn>
          <h2 className="font-heading font-bold text-3xl md:text-4xl text-center leading-tight mb-4">
            <span className="block">Real Creators.</span>
            <span className="gradient-text block">Real AI Clones. Real Results.</span>
          </h2>
          <p className="text-center text-muted-foreground max-w-xl mx-auto mb-12">
            These are actual AI clone videos we have built for creators. The same system gets built for you. Watch and try to spot the difference from a real recording.
          </p>
        </FadeIn>
        <div
          className="overflow-hidden"
          style={{ maskImage: "linear-gradient(to right, transparent, black 10%, black 90%, transparent)" }}
        >
          <div className="client-marquee-track flex gap-5" style={{ width: "max-content" }}>
            {looped.map((v, i) => (
              <div key={i} className="shrink-0 w-[220px]">
                <VideoPlayer video={v} aspect="portrait" />
                {v.label && (
                  <div className="mt-2 text-center text-xs text-muted-foreground font-medium">{v.label}</div>
                )}
              </div>
            ))}
          </div>
        </div>
        <FadeIn delay={0.2}>
          <div className="flex flex-col items-center mt-10 gap-3">
            <BookButton label="Get Your AI Clone Built" large />
            <p className="text-xs text-muted-foreground">Free strategy call. We show you samples before you commit to anything.</p>
          </div>
        </FadeIn>
      </div>
    </section>
  );
};

/* ─────────────────────────── Testimonials ─────────────────────────── */

const Testimonials = () => {
  const items = [
    {
      name: "James M.",
      role: "Business Coach, Toronto",
      result: "First inbound client in 5 weeks",
      text: "I was posting twice a week and getting zero traction. Figfalcon built my content system in 14 days. By week 5 I had three people in my DMs who I had never met asking about my coaching program. First client from content alone closed for $6,000. The system just runs.",
    },
    {
      name: "Sarah K.",
      role: "Real Estate Agent, Vancouver",
      result: "Inbound buyer in week 3",
      text: "I did not want to be on camera. They set me up as a full AI clone. The videos went live and within three weeks I had a buyer reach out saying they had been watching my content for weeks before contacting me. That is exactly the kind of trust-first lead I wanted.",
    },
    {
      name: "Daniel R.",
      role: "Agency Owner, Calgary",
      result: "6 hours saved every single week",
      text: "I was spending six hours a week trying to keep up with content and it still looked inconsistent. Now I do one 30-minute call a month with their team and I am posting every single day across three platforms. I look like I have a full content team. I kind of do.",
    },
  ];

  return (
    <section className="py-24 bg-secondary/10">
      <div className="container mx-auto px-6 max-w-5xl">
        <FadeIn>
          <h2 className="font-heading font-bold text-3xl md:text-4xl text-center leading-tight mb-4">
            <span className="block">What Happens When</span>
            <span className="gradient-text block">The System Runs For You</span>
          </h2>
          <p className="text-center text-muted-foreground max-w-xl mx-auto mb-12">
            Real clients. Real results. Zero hours from them.
          </p>
        </FadeIn>
        <div className="grid md:grid-cols-3 gap-5">
          {items.map((t, i) => (
            <FadeIn key={i} delay={i * 0.1}>
              <div className="glass-card p-7 h-full border border-border/60 flex flex-col">
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(5)].map((_, s) => (
                    <svg key={s} className="w-4 h-4 text-primary fill-primary" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed flex-1 mb-5 italic">"{t.text}"</p>
                <div className="pt-4 border-t border-border/40">
                  <div className="font-semibold text-sm text-foreground">{t.name}</div>
                  <div className="text-xs text-muted-foreground mt-0.5">{t.role}</div>
                  <div className="mt-3 inline-block px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-xs text-primary font-medium">
                    {t.result}
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

/* ─────────────────────────── Who It Is For ─────────────────────────── */

const WhoItsFor = () => {
  // Hormozi: qualify by pain + aspiration, not income bracket.
  // The right client has a proven offer, is already closing clients,
  // and is stuck at invisible. Income check happens on the call.
  const forYou = [
    "You already have a proven offer and paying clients. You are not starting from zero.",
    "You want to build a personal brand that brings inbound leads without becoming a full-time creator.",
    "You have tried posting consistently and know it works. You just do not have the time to keep it up.",
    "You want to show up everywhere your clients are without being everywhere yourself.",
    "You are ready to hand it off and let a team that knows what they are doing run it properly.",
  ];
  const notForYou = [
    "You do not have an existing offer or a business that is already making money.",
    "You are not willing to do a single 30-minute recording or strategy call.",
    "You want to control every piece of content down to the word.",
  ];
  return (
    <section className="py-24 bg-secondary/10">
      <div className="container mx-auto px-6 max-w-5xl">
        <FadeIn>
          <h2 className="font-heading font-bold text-3xl md:text-4xl text-center leading-tight mb-14">
            <span className="block">Is This</span>
            <span className="gradient-text block">Built For You?</span>
          </h2>
        </FadeIn>
        <div className="grid md:grid-cols-2 gap-5">
          <FadeIn>
            <div className="glass-card p-7 h-full border border-primary/40 ring-1 ring-primary/20">
              <div className="flex items-center gap-2 mb-5">
                <Users className="w-5 h-5 text-primary" />
                <div className="text-sm font-semibold text-primary uppercase tracking-wider">This is for you if...</div>
              </div>
              <ul className="space-y-4">
                {forYou.map((w) => (
                  <li key={w} className="flex items-start gap-3">
                    <Check className="w-5 h-5 shrink-0 mt-0.5 text-primary" />
                    <span className="text-sm leading-relaxed">{w}</span>
                  </li>
                ))}
              </ul>
            </div>
          </FadeIn>
          <FadeIn delay={0.1}>
            <div className="glass-card p-7 h-full border border-border/60">
              <div className="flex items-center gap-2 mb-5">
                <X className="w-5 h-5 text-muted-foreground" />
                <div className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">This is NOT for you if...</div>
              </div>
              <ul className="space-y-4">
                {notForYou.map((w) => (
                  <li key={w} className="flex items-start gap-3 text-muted-foreground">
                    <X className="w-5 h-5 shrink-0 mt-0.5 text-red-400/60" />
                    <span className="text-sm leading-relaxed">{w}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-8 pt-5 border-t border-border/40">
                <p className="text-sm text-muted-foreground leading-relaxed">
                  We only take clients we know we can get results for. If you are not a fit, we will tell you on the call and point you in the right direction.
                </p>
              </div>
            </div>
          </FadeIn>
        </div>
        <FadeIn delay={0.2}>
          <div className="flex flex-col items-center mt-10 gap-3">
            <BookButton label="Find Out If You Qualify" large />
            <p className="text-xs text-muted-foreground">Free 30-minute call. No pitch. Just strategy.</p>
          </div>
        </FadeIn>
      </div>
    </section>
  );
};

/* ─────────────────────────── Final CTA ─────────────────────────── */

const FinalCTA = () => (
  <section className="py-24 relative overflow-hidden">
    <div className="absolute inset-0 gradient-hero opacity-60" />
    <div className="container mx-auto px-6 relative z-10 max-w-3xl text-center">
      <FadeIn>
        <div className="flex justify-center mb-6">
          <div className="flex items-center gap-2 px-4 py-2 rounded-full border border-primary/30 bg-primary/5 text-xs text-primary font-medium">
            <Zap className="w-3.5 h-3.5" />
            Only 5 spots open this month
          </div>
        </div>
        <h2 className="font-heading font-bold text-3xl md:text-5xl leading-tight mb-6">
          <span className="block">Stop Being the Best-Kept</span>
          <span className="gradient-text block">Secret in Your Industry.</span>
        </h2>
        <p className="text-muted-foreground text-lg mb-8 max-w-xl mx-auto leading-relaxed">
          Your competitors are showing up every day. The only difference between you and the person getting inbound calls is that they are visible and you are not. We fix that.
        </p>
      </FadeIn>
      <FadeIn delay={0.1}>
        <div className="flex flex-col items-center gap-3">
          <BookButton label="Claim Your Free Strategy Call" large />
          <p className="text-xs text-muted-foreground">Takes 2 minutes to book. No commitment. No hard sell.</p>
        </div>
      </FadeIn>
    </div>
  </section>
);

/* ─────────────────────────── Booking Embed ─────────────────────────── */

const BookingEmbed = () => (
  <section className="py-24 bg-secondary/10" id="booking">
    <div className="container mx-auto px-6 max-w-4xl">
      <FadeIn>
        <div className="text-xs font-semibold tracking-widest text-primary uppercase text-center mb-3">
          Book a Free Strategy Call.
        </div>
        <h2 className="font-heading font-bold text-4xl md:text-5xl text-center leading-tight mb-4">
          <span className="block">{new Date().toLocaleString("default", { month: "long" })} Is Filling Fast.</span>
          <span className="gradient-text block">Book Your Spot Below.</span>
        </h2>
        <p className="text-center text-muted-foreground mb-10 max-w-xl mx-auto">
          30 minutes. No hard sell. We map out exactly what your content system looks like, show you AI clone samples, and tell you if we are a fit.
        </p>
      </FadeIn>
      <FadeIn delay={0.1}>
        <div className="rounded-2xl overflow-hidden border border-border/40 shadow-xl">
          <Cal calLink={CAL_LINK} style={{ width: "100%", height: "100%", overflow: "scroll" }} config={{ layout: "month_view", theme: "dark" }} />
        </div>
      </FadeIn>
    </div>
  </section>
);

/* ─────────────────────────── FAQ ─────────────────────────── */

const FAQ = () => {
  const items = [
    {
      q: "Do I have to be on camera?",
      a: "No. We can go 100% AI clone. If you have never recorded a single video in your life, we can still build you a full personal brand content system. If you do want to be on camera, all we need is one 30-minute session.",
    },
    {
      q: "How fast will I see results?",
      a: "First content goes live within 14 days of onboarding. You will start building presence immediately. Inbound leads and messages typically start appearing in weeks 4 to 8 as the algorithm begins pushing your content to the right people.",
    },
    {
      q: "What platforms do you post to?",
      a: "Instagram Reels, LinkedIn, and YouTube Shorts. We post where your audience actually is. We tell you exactly which platforms matter for your niche on the strategy call.",
    },
    {
      q: "How realistic is the AI clone?",
      a: "Realistic enough that most people genuinely cannot tell the difference. We will show you sample outputs on your strategy call before you commit to anything.",
    },
    {
      q: "What do I actually have to do after onboarding?",
      a: "Show up to your strategy call. Do one 30-minute recording or skip it and go full clone. After that, nothing. We handle scripting, editing, posting, and management. You focus on closing the leads that come in.",
    },
    {
      q: "What does it cost?",
      a: "Most clients invest between $2,500 and $4,500 per month depending on scope. Your exact package is built on your strategy call based on your goals. No surprise fees.",
    },
    {
      q: "What if I already have social media accounts?",
      a: "Even better. We audit what you already have, build on what is working, and fix what is not. You do not need to start from scratch. We just need access to your accounts.",
    },
    {
      q: "What is your guarantee?",
      a: "We guarantee 100,000 views within 60 days of going live. If we miss that, we keep working at no charge until we hit it. No excuses. No fine print.",
    },
  ];
  const [open, setOpen] = useState<number | null>(null);
  return (
    <section className="py-24" id="faq">
      <div className="container mx-auto px-6 max-w-3xl">
        <FadeIn>
          <h2 className="font-heading font-bold text-3xl md:text-4xl text-center leading-tight mb-12">
            <span className="block">Everything You Are</span>
            <span className="gradient-text block">Thinking About Asking</span>
          </h2>
        </FadeIn>
        <div className="space-y-3">
          {items.map((it, i) => (
            <FadeIn key={i} delay={i * 0.04}>
              <div className="glass-card overflow-hidden">
                <button type="button" onClick={() => setOpen(open === i ? null : i)}
                  className="w-full flex items-center justify-between p-5 text-left">
                  <span className="font-medium pr-4">{it.q}</span>
                  <ChevronDown className={`w-5 h-5 text-muted-foreground shrink-0 transition-transform duration-300 ${open === i ? "rotate-180" : ""}`} />
                </button>
                <AnimatePresence>
                  {open === i && (
                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3 }} className="overflow-hidden">
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

/* ─────────────────────────── SEO ─────────────────────────── */

const SEO = () => {
  useEffect(() => {
    const prevTitle = document.title;
    document.title = "AI Content System — Figfalcon | Personal Brand That Gets You Clients";
    const setMeta = (name: string, content: string, attr: "name" | "property" = "name") => {
      let el = document.querySelector(`meta[${attr}="${name}"]`) as HTMLMetaElement | null;
      if (!el) { el = document.createElement("meta"); el.setAttribute(attr, name); document.head.appendChild(el); }
      el.setAttribute("content", content);
      return el;
    };
    const desc = "One 30-minute recording. 15 or more pieces of content. Posted across Instagram, LinkedIn and YouTube every week. Done for you so you focus on your business.";
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
    return () => { document.title = prevTitle; created.forEach((el) => el.parentNode?.removeChild(el)); };
  }, []);
  return null;
};

/* ─────────────────────────── Page ─────────────────────────── */

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

      {/* ── HERO ── */}
      <section className="relative pt-24 pb-16 md:pt-32 md:pb-20 overflow-hidden">
        <div className="absolute inset-0 gradient-hero opacity-70" />
        <div className="container mx-auto px-6 relative z-10 max-w-4xl">
          <FadeIn>
            <div className="flex justify-center mb-6">
              <div className="flex items-center gap-2 px-4 py-2 rounded-full border border-primary/30 bg-primary/5 text-xs text-primary font-medium tracking-wide uppercase">
                AI-Powered Personal Brand System
              </div>
            </div>
            <h1 className="font-heading font-bold text-4xl md:text-[2.75rem] lg:text-5xl text-center leading-tight mb-5">
              <span className="block">One 30-Minute Recording.</span>
              <span className="gradient-text block">Everywhere Your Clients Look.</span>
              <span className="block whitespace-nowrap">Every Week. While You Do Nothing.</span>
            </h1>
          </FadeIn>
          <FadeIn delay={0.1}>
            <p className="text-center text-muted-foreground text-base md:text-lg max-w-2xl mx-auto mb-10 leading-relaxed">
              Coaches and consultants using this system start getting inbound messages within 30 days. Your content runs on every platform, every week. You never touch a single app.
            </p>
          </FadeIn>
          <FadeIn delay={0.15}>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-10">
              <BookButton label="Claim Your Free Strategy Call" large />
              <p className="text-xs text-muted-foreground sm:ml-2">No commitment. 30-min call. 5 spots left this month.</p>
            </div>
          </FadeIn>
          <FadeIn delay={0.2}>
            <VideoPlayer video={heroVideo} />
          </FadeIn>
        </div>
      </section>

      <NumbersBar />
      <ProblemCards />
      <SystemStages />
      <BeforeAfter />
      <ProcessVideos />
      <Testimonials />
      <OfferStack />
      <Guarantee />
      <ClientProjects />
      <WhoItsFor />
      <Onboarding />
      <ScarcityBar />
      <FinalCTA />
      <BookingEmbed />
      <FAQ />

      <div className="py-10 text-center text-xs text-muted-foreground border-t border-border/30">
        &copy; {new Date().getFullYear()} Figfalcon. Built to get you seen.
      </div>
    </>
  );
};

export default AIContentSystem;
