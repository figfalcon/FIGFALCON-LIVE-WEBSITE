import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const track = (event: string) => {
  (window as unknown as { dataLayer?: { push: (o: object) => void } }).dataLayer?.push({ event });
};

const FadeIn = ({ children, delay = 0, className }: { children: React.ReactNode; delay?: number; className?: string }) => (
  <motion.div className={className} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-40px" }} transition={{ duration: 0.55, delay, ease: [0.16, 1, 0.3, 1] }}>
    {children}
  </motion.div>
);

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

const CoachValueCalculator = ({ scrollTarget = "fit" }: { scrollTarget?: string }) => {
  const [inquiries, setInquiries] = useState(40);
  const [value, setValue] = useState(3000);
  const [followUp, setFollowUp] = useState(40);
  const [touched, setTouched] = useState(false);

  const gap = inquiries * value * ((100 - followUp) / 100) * 12;
  const shown = useCountUp(Math.round(gap / 100) * 100);
  const onAny = (fn: (v: number) => void) => (v: number) => { if (!touched) { setTouched(true); track("coach_calculator_used"); } fn(v); };

  return (
    <div className="coaches-luxe glass-card p-8 md:p-10 max-w-2xl mx-auto">
      <div className="space-y-6 mb-8">
        <Slider label="Inquiries / DMs per month" min={5} max={200} step={5} value={inquiries} onChange={onAny(setInquiries)} fmt={(v) => `${v}`} />
        <Slider label="Average program value" min={500} max={15000} step={250} value={value} onChange={onAny(setValue)} fmt={(v) => `$${v.toLocaleString()}`} />
        <Slider label="Your current follow-up rate — inquiries you actually turn into a booked call" min={5} max={90} step={5} value={followUp} onChange={onAny(setFollowUp)} fmt={(v) => `${v}%`} />
      </div>
      <p className="text-xs text-muted-foreground mb-6">These are your own numbers — drag to match your business, not an industry average.</p>
      <div className="text-center border-t border-border/40 pt-8">
        <p className="font-script text-2xl text-primary mb-1">you're leaving roughly</p>
        <p className="font-bold gradient-text text-5xl md:text-7xl mb-2">${shown.toLocaleString()}<span className="text-2xl text-muted-foreground"> / year</span></p>
        <p className="text-sm text-muted-foreground mb-8">on the table in inquiries that never became a booked call.</p>
        <button
          onClick={() => { track(`cta_click_${scrollTarget}`); document.getElementById(scrollTarget)?.scrollIntoView({ behavior: "smooth" }); }}
          className="inline-flex items-center gap-2.5 font-bold rounded-full bg-primary text-white hover:opacity-90 active:scale-95 transition-all shadow-lg shadow-primary/30 hover:shadow-primary/50 px-6 py-3 text-base"
        >
          <ArrowRight className="w-4 h-4" /> See if we're a fit
        </button>
      </div>
    </div>
  );
};

export default CoachValueCalculator;
