import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Target, TrendingUp, Zap, Globe, Mail, Bot, Mic, Video, Package, AlertTriangle, CheckCircle, Sparkles } from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";

const stats = [
  { icon: <Target className="w-5 h-5 text-primary" />, value: "5,000+", label: "Appointments Booked" },
  { icon: <TrendingUp className="w-5 h-5 text-primary" />, value: "$1M+", label: "Pipeline Value Generated" },
  { icon: <Zap className="w-5 h-5 text-accent" />, value: "45%", label: "Avg Efficiency Improvement" },
];

const problems = [
  {
    title: "Leads Slipping Through Cracks",
    breakdown: "Forms go unchecked for hours. Inbound traffic converts but nobody responds in time. High-value leads vanish before anyone follows up.",
    fix: "Automated lead capture and instant response systems that engage every prospect within seconds.",
  },
  {
    title: "Manual Follow-Ups Killing Scale",
    breakdown: "Your team is stuck in spreadsheets and CRM tabs. Every follow-up requires human attention. Growth is capped by headcount.",
    fix: "AI-powered nurture sequences that run autonomously, freeing your team to focus on closing, not chasing.",
  },
  {
    title: "No Automation Layer",
    breakdown: "Tools are disconnected. Data doesn't flow. There's no system, just scattered manual processes stitched together.",
    fix: "Integrated operations infrastructure connecting your funnel, CRM, and booking calendar into one seamless machine.",
  },
];

const services = [
  { icon: <Bot className="w-6 h-6" />, title: "Chatbot & Lead Collection", desc: "AI chatbots that capture, qualify, and route leads 24/7 from your website." },
  { icon: <Mic className="w-6 h-6" />, title: "Voice AI Receptionist", desc: "Never miss a call. AI handles inbound calls, books appointments, answers FAQs." },
  { icon: <Globe className="w-6 h-6" />, title: "Website & Funnel Building", desc: "High-converting websites and funnels that capture leads and feed your CRM." },
  { icon: <Mail className="w-6 h-6" />, title: "Cold Email Outreach Systems", desc: "Complete outbound email infrastructure that generates predictable leads." },
  { icon: <Video className="w-6 h-6" />, title: "AI Clone & Video Creation", desc: "Your AI twin creates consistent video content without you filming." },
  { icon: <Package className="w-6 h-6" />, title: "Bundled Packages", desc: "Starter, Growth, and Authority bundles combining multiple services at value pricing." },
];

const processSteps = [
  {
    step: "01",
    title: "Growth Infrastructure Audit",
    desc: "We map your current funnel, CRM, and lead flow. Identify bottlenecks, automation gaps, and conversion leaks.",
    items: ["Pipeline Analysis", "Funnel Audit", "Automation Gap Review", "Custom Strategy Blueprint"],
  },
  {
    step: "02",
    title: "Funnel + Automation Architecture",
    desc: "We design and build your custom growth system from capture pages to CRM pipelines to AI powered follow up sequences.",
    items: ["Landing Page Build", "CRM Pipeline Setup", "Automation Workflows", "AI Integration"],
  },
  {
    step: "03",
    title: "System Deployment & Scaling",
    desc: "Your infrastructure goes live. We monitor, optimize, and refine until your pipeline runs predictably.",
    items: ["Staged Rollout", "Performance Monitoring", "Ongoing Optimization", "Scaling Support"],
  },
];

const Index = () => {
  return (
    <>
      {/* Hero */}
      <section className="relative min-h-screen flex items-center pt-32 md:pt-36 pb-12 overflow-hidden">
        <div className="absolute inset-0 gradient-hero" />
        <div className="absolute inset-0 gradient-glow" />
        <div className="absolute top-1/4 right-0 w-96 h-96 bg-primary/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 left-0 w-72 h-72 bg-accent/20 rounded-full blur-[100px]" />
        <div className="absolute inset-0 grid-pattern opacity-30" />

        <div className="container mx-auto px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col items-center lg:items-start"
            >
              <div className="section-badge mb-6">
                <Sparkles className="w-4 h-4 text-primary" />
                Your Operations & Growth Partner
              </div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold font-heading tracking-tight leading-[1.15] mb-6 text-center lg:text-left">
                Run Your Business<br />
                <span className="gradient-text">Without Operational Chaos</span>
              </h1>
              <p className="text-base md:text-lg text-muted-foreground mb-8 max-w-lg leading-relaxed text-center lg:text-left mx-auto lg:mx-0">
                We handle the systems, automation, and backend operations so you can focus on growth, clients, and delivery.
              </p>
              <div className="flex flex-wrap gap-4 mb-8 justify-center lg:justify-start">
                <Link to="/contact" className="btn-primary">
                  Let's Automate Your Growth <ArrowRight className="w-4 h-4" />
                </Link>
                <Link to="/case-studies" className="btn-secondary text-lg px-8 py-4 border border-border/60">
                  See Our Results
                </Link>
              </div>
              <div className="flex items-center gap-3 text-xs sm:text-sm text-muted-foreground justify-center lg:justify-start flex-wrap">
                <span className="flex items-center gap-2"><span className="glow-dot" /> Done-for-you systems</span>
                <span className="flex items-center gap-2"><span className="glow-dot" /> Custom automation</span>
                <span className="flex items-center gap-2"><span className="glow-dot" /> Structured growth</span>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="flex justify-center"
            >
              <div className="glass-card p-8 sm:p-10 w-full max-w-[494px] relative">
                {/* Systems Active floating badge */}
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: [0, -6, 0] }}
                  transition={{ delay: 0.4, y: { delay: 1, duration: 2.5, repeat: Infinity, ease: "easeInOut" } }}
                  className="absolute -top-4 right-6 glass-card px-4 py-2 rounded-xl flex items-center gap-2 text-sm border border-primary"
                  style={{ boxShadow: '0 0 16px 4px rgba(59,130,246,0.55)' }}
                >
                  <div>
                    <div className="font-heading font-semibold text-foreground">Systems Active</div>
                    <div className="text-xs text-muted-foreground">Automation running</div>
                  </div>
                </motion.div>

                <div className="flex items-center justify-between mb-6 mt-2">
                  <h3 className="font-heading font-bold text-xl">Client Results</h3>
                  <span className="text-xs text-accent font-medium px-3 py-1.5 rounded-full bg-accent/10 border border-accent/20">Live Data</span>
                </div>
                <div className="space-y-4">
                  {stats.map((stat, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.5 + i * 0.15 }}
                      className="flex items-center gap-4 p-4 rounded-xl bg-secondary/50 border border-border/30"
                    >
                      <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                        {stat.icon}
                      </div>
                      <div>
                        <div className="stat-number text-2xl font-bold">{stat.value}</div>
                        <div className="text-sm text-muted-foreground">{stat.label}</div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Trust Bar */}
      <section className="py-12 border-y border-border/30">
        <div className="container mx-auto px-6">
          <p className="text-center text-xs text-muted-foreground uppercase tracking-widest mb-8">
            Trusted by disruptive B2B companies to scale operations without the chaos
          </p>
          <div className="flex items-center gap-4">
            <button className="w-10 h-10 rounded-full border border-border/40 flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-border transition-colors shrink-0">
              <ArrowRight className="w-4 h-4 rotate-180" />
            </button>
            <div className="flex-1 overflow-hidden">
              <div className="trust-slider flex items-center gap-16 whitespace-nowrap">
                {["InnovateLabs", "ScaleUp Inc", "GrowthCo", "DataDrive", "CloudPeak", "NextGen", "InnovateLabs", "ScaleUp Inc", "GrowthCo", "DataDrive", "CloudPeak", "NextGen"].map((name, i) => (
                  <span key={i} className="font-heading font-bold text-lg text-muted-foreground/60 shrink-0">{name}</span>
                ))}
              </div>
            </div>
            <button className="w-10 h-10 rounded-full border border-border/40 flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-border transition-colors shrink-0">
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* Problems Section */}
      <section className="py-24 relative">
        <div className="absolute top-0 left-1/4 w-72 h-72 bg-primary/5 rounded-full blur-[100px]" />
        <div className="container mx-auto px-6 relative z-10">
          <ScrollReveal className="text-center mb-16">
            <div className="section-badge mx-auto mb-4">The Real Problem</div>
            <h2 className="section-heading mb-4">
              Operations Problems Are{" "}
              <span className="gradient-text">Growth Problems</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Most businesses don't lack leads. They lack the systems to capture, convert, and scale efficiently.
            </p>
          </ScrollReveal>

          <div className="grid lg:grid-cols-3 gap-6">
            {problems.map((problem, i) => (
              <ScrollReveal key={i} delay={i * 0.1}>
                <div className="glass-card-hover p-8 h-full">
                  <div className="w-10 h-10 rounded-lg bg-destructive/10 flex items-center justify-center mb-4">
                    <AlertTriangle className="w-5 h-5 text-destructive" />
                  </div>
                  <h3 className="font-heading font-semibold text-lg mb-4">{problem.title}</h3>
                  <div className="mb-4">
                    <span className="text-xs font-semibold text-destructive/80 uppercase tracking-wider">The Breakdown</span>
                    <p className="text-sm text-muted-foreground mt-2">{problem.breakdown}</p>
                  </div>
                  <div>
                    <span className="text-xs font-semibold text-accent uppercase tracking-wider">The System Fix</span>
                    <p className="text-sm text-muted-foreground mt-2">{problem.fix}</p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-24 relative">
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent/5 rounded-full blur-[120px]" />
        <div className="container mx-auto px-6 relative z-10">
          <ScrollReveal className="text-center mb-16">
            <div className="section-badge mx-auto mb-4">What We Build For You</div>
            <h2 className="section-heading mb-4">
              Done-for-You <span className="gradient-text">Growth Systems</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              We build and manage operational systems that save you time, reduce chaos, and increase efficiency without adding complexity.
            </p>
          </ScrollReveal>

          <div className="grid lg:grid-cols-3 gap-6">
            {services.map((service, i) => (
              <ScrollReveal key={i} delay={i * 0.08}>
                <Link to="/services" className="glass-card-hover p-8 block h-full group">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 text-primary group-hover:bg-primary/20 transition-colors">
                    {service.icon}
                  </div>
                  <h3 className="font-heading font-semibold text-lg mb-2">{service.title}</h3>
                  <p className="text-sm text-muted-foreground">{service.desc}</p>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-24 relative">
        <div className="container mx-auto px-6 relative z-10">
          <ScrollReveal className="text-center mb-16">
            <div className="section-badge mx-auto mb-4">Our Process</div>
            <h2 className="section-heading mb-4">
              How We Engineer{" "}
              <span className="gradient-text">Your Growth</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              A systematic approach to building revenue infrastructure. No outsourcing. No templates. Custom architecture for your business.
            </p>
          </ScrollReveal>

          <div className="grid lg:grid-cols-3 gap-8">
            {processSteps.map((step, i) => (
              <ScrollReveal key={i} delay={i * 0.15}>
                <div className="glass-card p-8 h-full relative overflow-hidden">
                  <span className="absolute top-4 right-4 text-6xl font-heading font-bold text-primary/5">{step.step}</span>
                  <div className="relative z-10">
                    <div className="text-sm font-semibold text-primary mb-2">Step {step.step}</div>
                    <h3 className="font-heading font-semibold text-xl mb-3">{step.title}</h3>
                    <p className="text-sm text-muted-foreground mb-6">{step.desc}</p>
                    <div className="space-y-2">
                      {step.items.map((item, j) => (
                        <div key={j} className="flex items-center gap-2 text-sm">
                          <CheckCircle className="w-4 h-4 text-accent shrink-0" />
                          <span className="text-muted-foreground">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonial */}
      <section className="py-24 relative">
        <div className="container mx-auto px-6 relative z-10">
          <ScrollReveal className="text-center mb-12">
            <div className="section-badge mx-auto mb-4">Client Results</div>
            <h2 className="section-heading mb-4">
              Systems That Deliver <span className="gradient-text">Results</span>
            </h2>
          </ScrollReveal>

          <ScrollReveal>
            <div className="glass-card p-10 max-w-3xl mx-auto text-center">
              <blockquote className="text-xl md:text-2xl font-heading leading-relaxed mb-8 text-foreground/90">
                "Finally, a system that runs without me. The automation handles lead capture, follow-up, and booking. I just show up to qualified calls."
              </blockquote>
              <div className="flex flex-col sm:flex-row items-center sm:justify-center gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-sm font-bold text-primary">SC</div>
                  <div className="text-left">
                    <div className="font-semibold text-sm">Sarah Chen</div>
                    <div className="text-xs text-muted-foreground">Founder, Growth Advisory Co</div>
                  </div>
                </div>
                <span className="sm:ml-4 text-xs text-accent font-medium px-2 py-1 rounded-full bg-accent/10 border border-accent/20">
                  Pipeline on autopilot
                </span>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 gradient-hero" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[150px]" />
        <div className="container mx-auto px-6 relative z-10 text-center">
          <ScrollReveal>
              <h2 className="section-heading mb-6">
                Let's Build Your{" "}
                <span className="gradient-text">Growth Systems</span>
              </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
              Book your Immediate AI Demo Call. We'll audit your operations, map automation opportunities, and design a custom system for predictable results. Not a sales call, a strategy conversation.
            </p>
            <div className="flex items-center justify-center gap-4 flex-wrap">
              <Link to="/contact" className="btn-primary text-lg px-8 py-4">
                Let's Automate Your Growth <ArrowRight className="w-5 h-5" />
              </Link>
              <Link to="/case-studies" className="btn-secondary text-lg px-8 py-4">
                View Case Studies
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
};

export default Index;
