import { Link } from "react-router-dom";
import { ArrowRight, Users, TrendingUp, DollarSign } from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";
import PageHero from "@/components/PageHero";

const caseStudies = [
  {
    tag: "Healthcare",
    title: "AI Lead Automation",
    improvement: "+44% Improvement",
    desc: "A multi-location healthcare clinic was losing leads due to delayed response. We built an AI automation system that responds in under 2 minutes.",
    stats: [
      { icon: <Users className="w-4 h-4" />, label: "MEETINGS", value: "+44%" },
      { icon: <TrendingUp className="w-4 h-4" />, label: "LEADS", value: "3.2×" },
      { icon: <DollarSign className="w-4 h-4" />, label: "PIPELINE", value: "30-50%" },
    ],
  },
  {
    tag: "B2B Advisory",
    title: "Growth Website & Funnel",
    improvement: "2× Improvement",
    desc: "A B2B advisory firm had strong traffic but weak conversion. We rebuilt their site as a growth funnel, not a brochure.",
    stats: [
      { icon: <Users className="w-4 h-4" />, label: "MEETINGS", value: "2×" },
      { icon: <TrendingUp className="w-4 h-4" />, label: "LEADS", value: "+280%" },
      { icon: <DollarSign className="w-4 h-4" />, label: "PIPELINE", value: "25-40%" },
    ],
  },
  {
    tag: "B2B SaaS",
    title: "Cold Email Outreach",
    improvement: "+60% Improvement",
    desc: "A SaaS startup had a strong product but inconsistent pipeline. We engineered a cold outreach infrastructure that delivers predictable meetings.",
    stats: [
      { icon: <Users className="w-4 h-4" />, label: "MEETINGS", value: "+60%" },
      { icon: <TrendingUp className="w-4 h-4" />, label: "LEADS", value: "92-95%" },
      { icon: <DollarSign className="w-4 h-4" />, label: "PIPELINE", value: "20-30%" },
    ],
  },
];

const CaseStudies = () => {
  return (
    <>
      <PageHero
        badge="Case Studies"
        title={<>Real Results for <span className="gradient-text">Real Companies</span></>}
        description="See how B2B companies like yours achieved predictable pipeline growth with Figfalcon."
      />

      <section className="py-24">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-3 gap-8">
            {caseStudies.map((study, i) => (
              <ScrollReveal key={i} delay={i * 0.12}>
                <div className="glass-card-hover overflow-hidden h-full flex flex-col">
                   <div className="h-40 bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
                     <div className="w-16 h-16 rounded-2xl bg-primary/20 flex items-center justify-center text-primary font-heading font-bold text-xl">CS</div>
                   </div>
                   <div className="p-8 flex-1 flex flex-col">
                     <span className="text-xs font-medium text-primary px-2 py-1 rounded-full bg-primary/10 border border-primary/20 w-fit mb-3">{study.tag}</span>
                     <h3 className="font-heading font-semibold text-xl mb-1">{study.title}</h3>
                     <p className="text-sm text-accent font-medium mb-3">{study.improvement}</p>
                     <p className="text-sm text-muted-foreground mb-6 flex-1">{study.desc}</p>
                     <div className="grid grid-cols-3 gap-4 border-t border-border/30 pt-6 mb-6">
                       {study.stats.map((stat, j) => (
                         <div key={j} className="text-center">
                           <div className="flex items-center justify-center gap-1 text-muted-foreground mb-1">{stat.icon}<span className="text-xs uppercase">{stat.label}</span></div>
                           <div className="font-heading font-bold text-primary">{stat.value}</div>
                         </div>
                       ))}
                     </div>
                     <button className="w-full py-3 rounded-lg border border-border/60 text-sm font-medium text-foreground hover:bg-secondary/50 transition-colors">
                       View Full Case Study
                     </button>
                   </div>
                 </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 gradient-hero" />
        <div className="container mx-auto px-6 relative z-10 text-center">
          <ScrollReveal>
            <h2 className="section-heading mb-6">Ready to Be Our <span className="gradient-text">Next Success Story?</span></h2>
            <Link to="/contact" className="btn-primary text-lg px-8 py-4">
              Book Your Strategy Call <ArrowRight className="w-5 h-5" />
            </Link>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
};

export default CaseStudies;
