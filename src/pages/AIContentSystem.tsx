import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Play, ChevronLeft, ChevronRight } from "lucide-react";
import useEmblaCarousel from "embla-carousel-react";
import { getCalApi } from "@calcom/embed-react";

const CAL_LINK = "figfalcon/consultation-on-ai-helping-your-business";
const CAL_NAMESPACE = "consultation";

// Set src to a YouTube embed URL, Vimeo URL, or direct MP4 when videos are ready.
// Leaving src empty renders a clean placeholder with a play icon.
type VideoSlot = { src?: string; poster?: string; title?: string };

const heroVideo: VideoSlot = { title: "Figfalcon AI Content System" };
const processVideo: VideoSlot = { title: "How it works" };
const clientVideos: VideoSlot[] = [
  { title: "Client result 1" },
  { title: "Client result 2" },
  { title: "Client result 3" },
  { title: "Client result 4" },
];

const VideoPlayer = ({ video, aspect = "video" }: { video: VideoSlot; aspect?: "video" | "portrait" }) => {
  const aspectClass = aspect === "portrait" ? "aspect-[9/16]" : "aspect-video";

  if (video.src) {
    // External embed (YouTube/Vimeo) or direct video
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

  // Placeholder
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

const BookButton = ({ label = "Book a Strategy Call", large = false }: { label?: string; large?: boolean }) => (
  <button
    type="button"
    data-cal-namespace={CAL_NAMESPACE}
    data-cal-link={CAL_LINK}
    data-cal-config='{"layout":"month_view","theme":"dark"}'
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

const ClientCarousel = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ align: "start", loop: false });
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(true);

  useEffect(() => {
    if (!emblaApi) return;
    const update = () => {
      setCanPrev(emblaApi.canScrollPrev());
      setCanNext(emblaApi.canScrollNext());
    };
    update();
    emblaApi.on("select", update);
    emblaApi.on("reInit", update);
  }, [emblaApi]);

  return (
    <div>
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex gap-5">
          {clientVideos.map((v, i) => (
            <div key={i} className="shrink-0 w-[260px] sm:w-[300px]">
              <VideoPlayer video={v} aspect="portrait" />
            </div>
          ))}
        </div>
      </div>
      <div className="flex items-center gap-3 mt-6">
        <button
          type="button"
          onClick={() => emblaApi?.scrollPrev()}
          disabled={!canPrev}
          aria-label="Previous"
          className="w-10 h-10 rounded-full border border-border/50 flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-border transition-colors disabled:opacity-40"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <button
          type="button"
          onClick={() => emblaApi?.scrollNext()}
          disabled={!canNext}
          aria-label="Next"
          className="w-10 h-10 rounded-full border border-border/50 flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-border transition-colors disabled:opacity-40"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

const processSteps = [
  { n: "1", title: "Research", body: "We identify what your audience is already searching for." },
  { n: "2", title: "Create", body: "We produce high-converting content, with or without you on camera." },
  { n: "3", title: "Systemize", body: "We build your funnel, VSL, and lead flow." },
  { n: "4", title: "Convert", body: "Leads are nurtured and booked into your calendar." },
];

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

      {/* HERO */}
      <section className="relative pt-20 pb-16 md:pt-28 md:pb-20 overflow-hidden">
        <div className="absolute inset-0 gradient-hero opacity-70" />
        <div className="container mx-auto px-6 relative z-10 max-w-4xl">
          <FadeIn>
            <h1 className="font-heading font-bold text-4xl md:text-5xl lg:text-6xl text-center leading-tight mb-5">
              Turn Your Content Into a <span className="gradient-text">Client Acquisition System</span> That Brings You Qualified Leads
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

      {/* SOCIAL PROOF */}
      <section className="py-10 border-y border-border/30">
        <div className="container mx-auto px-6 text-center">
          <p className="text-xs uppercase tracking-widest text-muted-foreground">
            Worked with coaches, consultants, and agencies
          </p>
        </div>
      </section>

      {/* PROBLEM */}
      <section className="py-20">
        <div className="container mx-auto px-6 max-w-3xl text-center">
          <FadeIn>
            <h2 className="font-heading font-bold text-3xl md:text-4xl mb-8">You already know content works.</h2>
          </FadeIn>
          <FadeIn delay={0.1}>
            <div className="space-y-3 text-lg text-muted-foreground">
              <p>But it takes too much time.</p>
              <p>Or it does not convert.</p>
              <p>Or it never stays consistent.</p>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* SOLUTION SNAPSHOT */}
      <section className="py-20 bg-secondary/20">
        <div className="container mx-auto px-6 max-w-4xl">
          <FadeIn>
            <h2 className="font-heading font-bold text-3xl md:text-4xl text-center mb-4">
              This isn&apos;t content. It&apos;s a <span className="gradient-text">system.</span>
            </h2>
          </FadeIn>
          <FadeIn delay={0.1}>
            <div className="grid sm:grid-cols-2 gap-4 mt-10">
              {[
                "Done-for-you content engine",
                "AI clone (optional)",
                "Full funnel: VSL, landing pages, booking",
                "Email and retargeting system",
              ].map((item) => (
                <div key={item} className="glass-card p-5 flex items-center gap-3">
                  <span className="glow-dot" />
                  <span className="font-medium">{item}</span>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* CLIENT RESULTS CAROUSEL */}
      <section className="py-20">
        <div className="container mx-auto px-6 max-w-5xl">
          <FadeIn>
            <h2 className="font-heading font-bold text-3xl md:text-4xl text-center mb-10">
              See how this works <span className="gradient-text">in action</span>
            </h2>
          </FadeIn>
          <FadeIn delay={0.1}>
            <ClientCarousel />
          </FadeIn>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="py-20 bg-secondary/20">
        <div className="container mx-auto px-6 max-w-5xl">
          <FadeIn>
            <h2 className="font-heading font-bold text-3xl md:text-4xl text-center mb-12">
              How we turn content into <span className="gradient-text">clients</span>
            </h2>
          </FadeIn>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5 mb-14">
            {processSteps.map((s, i) => (
              <FadeIn key={s.n} delay={i * 0.08}>
                <div className="glass-card p-6 h-full">
                  <div className="w-10 h-10 rounded-lg bg-primary/15 border border-primary/30 flex items-center justify-center text-primary font-heading font-bold mb-4">
                    {s.n}
                  </div>
                  <h3 className="font-heading font-semibold text-lg mb-2">{s.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{s.body}</p>
                </div>
              </FadeIn>
            ))}
          </div>

          <FadeIn delay={0.2}>
            <div className="max-w-3xl mx-auto">
              <VideoPlayer video={processVideo} />
            </div>
          </FadeIn>
        </div>
      </section>

      {/* AUTHORITY */}
      <section className="py-20">
        <div className="container mx-auto px-6 max-w-3xl text-center">
          <FadeIn>
            <h2 className="font-heading font-bold text-3xl md:text-4xl mb-6">We don&apos;t work with everyone.</h2>
          </FadeIn>
          <FadeIn delay={0.1}>
            <p className="text-lg text-muted-foreground mb-6">We work with coaches, consultants, agencies, and course creators.</p>
            <p className="text-base text-foreground">Already generating revenue and looking to scale.</p>
          </FadeIn>
        </div>
      </section>

      {/* OBJECTIONS */}
      <section className="py-20 bg-secondary/20">
        <div className="container mx-auto px-6 max-w-4xl">
          <FadeIn>
            <div className="grid md:grid-cols-2 gap-5">
              <div className="glass-card p-6">
                <p className="text-sm uppercase tracking-wider text-primary font-semibold mb-3">&ldquo;I don&apos;t have time&rdquo;</p>
                <p className="text-muted-foreground leading-relaxed">You only need 30 minutes per week. Or none if you use the AI clone.</p>
              </div>
              <div className="glass-card p-6">
                <p className="text-sm uppercase tracking-wider text-primary font-semibold mb-3">&ldquo;I tried content before&rdquo;</p>
                <p className="text-muted-foreground leading-relaxed">You didn&apos;t have a system. Just random posts.</p>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* MID CTA */}
      <section className="py-16">
        <div className="container mx-auto px-6 text-center">
          <FadeIn>
            <BookButton label="Book Your Strategy Call" large />
          </FadeIn>
        </div>
      </section>

      {/* FINAL CLOSE */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 gradient-hero opacity-70" />
        <div className="container mx-auto px-6 relative z-10 max-w-3xl text-center">
          <FadeIn>
            <h2 className="font-heading font-bold text-3xl md:text-4xl mb-6">
              If you want inbound leads without spending your life creating content, <span className="gradient-text">this is the system.</span>
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

      <div className="py-10 text-center text-xs text-muted-foreground">
        &copy; {new Date().getFullYear()} Figfalcon
      </div>
    </>
  );
};

export default AIContentSystem;
