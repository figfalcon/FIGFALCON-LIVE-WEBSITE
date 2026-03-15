import { Link } from "react-router-dom";
import { ArrowRight, Bot, Mic, Globe, Mail, Video, Package, CheckCircle } from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";
import PageHero from "@/components/PageHero";

const services = [
  {
    id: "chatbot",
    icon: <Bot className="w-7 h-7" />,
    title: "Chatbot & Lead Collection",
    bestFor: "Coaches, clinic owners, real estate agents, consultants",
    desc: "AI chatbots that capture, qualify, and route leads 24/7 from your website. People visit your website but never contact you? We fix that with intelligent conversation flows that engage every visitor and collect their info automatically.",
    included: ["Custom AI chatbot design & deployment", "Lead qualification logic", "CRM integration & auto-routing", "24/7 automated lead capture", "Conversation analytics dashboard", "Monthly optimization"],
    benefits: ["Capture leads you're currently losing", "Respond to prospects in seconds, not hours", "Zero manual effort after setup"],
    result: "Visitors become leads automatically — even while you sleep",
  },
  {
    id: "voice-ai",
    icon: <Mic className="w-7 h-7" />,
    title: "Voice AI Receptionist",
    bestFor: "Dental clinics, law firms, med spas, physiotherapy, real estate offices",
    desc: "Never miss a call again. Our AI voice receptionist handles inbound calls, answers FAQs, books appointments, and routes urgent calls — 24/7. Stop paying a receptionist $3,000-$5,000/month when AI can handle it better.",
    included: ["AI voice agent setup & training", "Inbound call handling", "Appointment booking automation", "FAQ response system", "After-hours coverage", "Call analytics & reporting"],
    benefits: ["24/7 call coverage without staff", "Never miss a lead or patient call", "Reduce receptionist costs by 70%+"],
    result: "Every call answered, every appointment booked — automatically",
  },
  {
    id: "websites",
    icon: <Globe className="w-7 h-7" />,
    title: "Website & Funnel Building",
    bestFor: "Coaches, consultants, local service businesses, solopreneurs",
    desc: "Your website should be your best salesperson. We build high-converting websites and funnels that capture leads, integrate with your CRM, and automatically follow up with prospects. Not just a pretty site — a revenue machine.",
    included: ["Website design & development", "Landing pages & lead funnels", "Form capture & CRM integration", "Booking link setup", "Email auto-response sequences", "Mobile-optimized design"],
    benefits: ["Complete inbound system", "Automated lead capture", "Seamless CRM sync"],
    result: "Website that captures leads and feeds them into your system",
  },
  {
    id: "cold-email",
    icon: <Mail className="w-7 h-7" />,
    title: "Cold Email System Setup",
    bestFor: "Marketing agencies, recruitment firms, B2B consultants",
    desc: "Your complete outbound engine. We handle everything from domain setup and infrastructure to sequences, copy, and automation. Get a predictable lead generation system that fills your pipeline consistently.",
    included: ["Domain & infrastructure setup", "Email warmup & deliverability", "Sequence copywriting", "Automation workflow design", "Reply handling flow", "Performance tracking"],
    benefits: ["Predictable lead flow", "Scalable infrastructure", "Optimized sequences"],
    result: "Predictable outbound lead generation filling your pipeline",
  },
  {
    id: "ai-clone",
    icon: <Video className="w-7 h-7" />,
    title: "AI Clone & Video Creation",
    bestFor: "Founders, coaches, consultants who want consistent video content without filming",
    desc: "You record yourself once for 20 minutes. We handle the rest. Your AI clone produces 8-12 fresh videos per month, written, generated, and delivered ready to post to Instagram Reels and YouTube Shorts.",
    included: ["AI voice & face clone creation", "8-12 videos per month", "Custom script writing each month", "Videos ready for Instagram Reels & YouTube Shorts", "Review & approval process", "Monthly content calendar"],
    benefits: ["Consistent content without filming", "Professional quality every time", "Built from a single 20-min recording"],
    result: "Fresh video content every month without you touching a camera",
  },
];

const bundles = [
  {
    name: "Starter Bundle",
    tag: "Most Popular",
    combo: "Website + Chatbot + Lead Collection",
    icp: "Coach or consultant, weak or no online presence, losing leads daily",
    offer: "We build your entire lead system in under a week. Website, chatbot and automated lead collection all done for you. If you don't get at least 5 new leads in your first 30 days we'll work for free until you do.",
    services: ["Website & Funnel", "AI Chatbot", "Lead Collection System"],
  },
  {
    name: "Growth Bundle",
    tag: "Best Value",
    combo: "Website + Chatbot + Voice AI + Cold Email",
    icp: "Local service business, missing leads after hours, wants full automation",
    offer: "We automate your entire front desk and outreach in one system. Never miss a call, never miss a lead. Fully done for you and live in under 2 weeks.",
    services: ["Website & Funnel", "AI Chatbot", "Voice AI Receptionist", "Cold Email System"],
  },
  {
    name: "Authority Bundle",
    tag: "Premium",
    combo: "Website + Chatbot + AI Clone Videos + Cold Email",
    icp: "Established founder earning $5k-$20k/month, wants to dominate online",
    offer: "You record yourself once for 20 minutes. We handle the rest. Your website captures leads. Your AI clone produces fresh content. Your cold email brings outbound leads. All built and maintained without you lifting a finger.",
    services: ["Website & Funnel", "AI Chatbot", "AI Clone Videos", "Cold Email System"],
  },
];

const Services = () => {
  return (
    <>
      <PageHero
        badge="Our Services"
        title={<>Business <span className="gradient-text">Automation & Operations</span> Services</>}
        description="Done-for-you operations, automation, and backend systems to help your business grow faster and run smoother."
      />

      {/* Service Cards Overview */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-3 gap-6">
            {services.slice(0, 3).map((service, i) => (
              <ScrollReveal key={i} delay={i * 0.1}>
                <a href={`#${service.id}`} className="glass-card-hover p-8 block h-full group">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 text-primary group-hover:bg-primary/20 transition-colors">
                    {service.icon}
                  </div>
                  <h3 className="font-heading font-semibold mb-2">{service.title}</h3>
                  <p className="text-sm text-muted-foreground">{service.bestFor}</p>
                </a>
              </ScrollReveal>
            ))}
          </div>
          <div className="grid md:grid-cols-3 gap-6 mt-6">
            {services.slice(3).map((service, i) => (
              <ScrollReveal key={i} delay={i * 0.1}>
                <a href={`#${service.id}`} className="glass-card-hover p-8 block h-full group">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 text-primary group-hover:bg-primary/20 transition-colors">
                    {service.icon}
                  </div>
                  <h3 className="font-heading font-semibold mb-2">{service.title}</h3>
                  <p className="text-sm text-muted-foreground">{service.bestFor}</p>
                </a>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Individual Service Sections */}
      {services.map((service, i) => (
        <section key={i} id={service.id} className="py-24 relative scroll-mt-24">
          {i % 2 === 0 && <div className="absolute top-0 right-0 w-72 h-72 bg-primary/5 rounded-full blur-[100px]" />}
          <div className="container mx-auto px-6 relative z-10">
            <div className="grid lg:grid-cols-2 gap-12 items-start">
              <ScrollReveal direction={i % 2 === 0 ? "left" : "right"}>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary">{service.icon}</div>
                  <h2 className="section-heading text-3xl">{service.title}</h2>
                </div>
                
                <p className="text-muted-foreground leading-relaxed mb-8">{service.desc}</p>
                <h4 className="font-heading font-semibold mb-4">What's Included:</h4>
                <div className="space-y-2 mb-8">
                  {service.included.map((item, j) => (
                    <div key={j} className="flex items-center gap-2 text-sm">
                      <CheckCircle className="w-4 h-4 text-accent shrink-0" />
                      <span className="text-muted-foreground">{item}</span>
                    </div>
                  ))}
                </div>
                <Link to="/contact" className="btn-primary">
                  Get Started <ArrowRight className="w-4 h-4" />
                </Link>
              </ScrollReveal>

              <ScrollReveal direction={i % 2 === 0 ? "right" : "left"}>
                <div className="glass-card p-8">
                  <h4 className="font-heading font-semibold mb-4">Key Benefits:</h4>
                  <div className="space-y-3 mb-6">
                    {service.benefits.map((benefit, j) => (
                      <div key={j} className="flex items-center gap-3">
                        <span className="glow-dot" />
                        <span className="text-foreground font-medium">{benefit}</span>
                      </div>
                    ))}
                  </div>
                  <div className="border-t border-border/40 pt-6">
                    <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Typical Result</span>
                    <p className="text-foreground mt-2">{service.result}</p>
                  </div>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </section>
      ))}

      {/* Bundles */}
      <section className="py-24 relative" id="bundles">
        <div className="absolute inset-0 gradient-hero" />
        <div className="container mx-auto px-6 relative z-10">
          <ScrollReveal className="text-center mb-16">
            <div className="section-badge mx-auto mb-4">Bundled Packages</div>
            <h2 className="section-heading mb-4">
              Save More With <span className="gradient-text">Bundled Systems</span>
            </h2>

            <p className="text-muted-foreground max-w-2xl mx-auto">
              Get multiple services working together as one integrated growth machine at better value.
            </p>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {bundles.map((bundle, i) => (
              <ScrollReveal key={i} delay={i * 0.12}>
                <div className={`glass-card-hover p-8 h-full flex flex-col ${i === 1 ? "border-primary/30 ring-1 ring-primary/20" : ""}`}>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-heading font-bold text-xl">{bundle.name}</h3>
                    <span className={`text-xs font-semibold px-3 py-1.5 rounded-full whitespace-nowrap ${i === 0 ? "bg-accent/10 text-accent border border-accent/20" : i === 1 ? "bg-primary/20 text-primary border border-primary/30" : "bg-accent/10 text-accent border border-accent/20"}`}>
                      {bundle.tag}
                    </span>
                  </div>
                  <p className="text-sm text-primary font-medium mb-2">{bundle.combo}</p>
                  <p className="text-xs text-muted-foreground mb-4">ICP: {bundle.icp}</p>
                  <p className="text-sm text-muted-foreground mb-6 flex-1">{bundle.offer}</p>
                  <div className="space-y-2 mb-6">
                    {bundle.services.map((s, j) => (
                      <div key={j} className="flex items-center gap-2 text-sm">
                        <CheckCircle className="w-4 h-4 text-accent shrink-0" />
                        <span className="text-foreground">{s}</span>
                      </div>
                    ))}
                  </div>
                  <Link to="/contact" className={i === 1 ? "btn-primary w-full justify-center" : "btn-secondary w-full justify-center"}>
                    Get Started <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24">
        <div className="container mx-auto px-6 text-center">
          <ScrollReveal>
            <h2 className="section-heading mb-4">Not Sure Which Service Is <span className="gradient-text">Right for You?</span></h2>
            <p className="text-muted-foreground mb-8">Book a free strategy call and we'll analyze your situation to recommend the best approach.</p>
            <Link to="/contact" className="btn-primary text-lg px-8 py-4">
              Let's Automate Your Growth <ArrowRight className="w-5 h-5" />
            </Link>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
};

export default Services;
