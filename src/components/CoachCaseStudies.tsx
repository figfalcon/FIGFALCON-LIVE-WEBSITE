import { motion } from "framer-motion";
import { FileText } from "lucide-react";

const FadeIn = ({ children, delay = 0, className }: { children: React.ReactNode; delay?: number; className?: string }) => (
  <motion.div className={className} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-40px" }} transition={{ duration: 0.55, delay, ease: [0.16, 1, 0.3, 1] }}>
    {children}
  </motion.div>
);

const slots = [1, 2, 3];

const CoachCaseStudies = () => (
  <section className="coaches-luxe py-20 px-4">
    <div className="max-w-5xl mx-auto">
      <FadeIn>
        <h2 className="font-bold text-3xl md:text-5xl text-center leading-[1.1] mb-4">
          Real results, <span className="font-script text-4xl md:text-6xl gradient-text">coming soon.</span>
        </h2>
        <p className="text-center text-muted-foreground max-w-2xl mx-auto mb-14">
          We're onboarding our first Coaches clients right now. Rather than fake a case study, here's where the real ones go the moment we have them — with names, numbers, and timelines attached.
        </p>
      </FadeIn>
      <div className="grid md:grid-cols-3 gap-6">
        {slots.map((n, i) => (
          <FadeIn key={n} delay={i * 0.06}>
            <div className="glass-card-hover p-6 h-full flex flex-col items-center text-center border-dashed border-2 border-border/50">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <FileText className="w-5 h-5 text-primary" />
              </div>
              <p className="font-semibold mb-2">Case study slot #{n}</p>
              <p className="text-sm text-muted-foreground">Reserved for a founding client's real result — client name, numbers, timeline.</p>
            </div>
          </FadeIn>
        ))}
      </div>
    </div>
  </section>
);

export default CoachCaseStudies;
