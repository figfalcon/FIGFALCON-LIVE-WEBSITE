import { Link } from "react-router-dom";
import { ArrowRight, Cog, Zap, Wrench, Users } from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";
import PageHero from "@/components/PageHero";
import founderImg from "@/assets/founder-bikram.png";

const philosophy = [
  { icon: <Cog className="w-6 h-6" />, title: "Systems Over Hacks", desc: "We build infrastructure that scales, not quick fixes that break." },
  { icon: <Zap className="w-6 h-6" />, title: "Automation First", desc: "Every process should run without manual intervention." },
  { icon: <Wrench className="w-6 h-6" />, title: "Engineering Precision", desc: "Architecture designed for reliability and performance." },
  { icon: <Users className="w-6 h-6" />, title: "Hands-On Expertise", desc: "Direct expert involvement on every project." },
];

const whyChoose = [
  "Direct access to experienced operators, not junior account managers",
  "Custom systems designed for your specific business and industry",
  "No templates or cookie-cutter approaches. Every system is built for you",
  "Hands-on implementation without adding complexity to your workflow",
  "Obsession with efficiency. Systems that eliminate manual work",
];

const About = () => {
  return (
    <>
      <PageHero
        badge="About"
        title={<>Your Operations <span className="gradient-text">Growth Partner</span></>}
        description="We help businesses simplify operations and scale with structured systems and automation."
      />

      {/* Why We Built */}
      <section className="py-24">
        <div className="container mx-auto px-6 max-w-3xl">
          <ScrollReveal>
            <h2 className="section-heading text-center mb-12">Why We Built Figfalcon</h2>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <div className="space-y-6 text-muted-foreground leading-relaxed">
              <p>Most companies don't lack leads. They lack systems.</p>
              <p>Manual operations break growth. Disconnected tools waste opportunity. Automation done wrong destroys pipelines. We watched companies burn through agencies, hire extra staff, and still end up with unpredictable revenue.</p>
              <p>The problem was never effort. It was architecture.</p>
              <p>We built Figfalcon to take the operational workload off business owners and managers so they can focus on growth, clients, and delivery. We handle the systems, the automation, and the backend execution.</p>
              <p className="text-foreground font-medium">This is not a traditional marketing agency. This is a specialist operations partner focused on one thing: building systems that run your business more efficiently while you focus on what matters.</p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Philosophy */}
      <section className="py-24 relative">
        <div className="absolute top-0 right-0 w-72 h-72 bg-primary/5 rounded-full blur-[100px]" />
        <div className="container mx-auto px-6 relative z-10">
          <ScrollReveal className="text-center mb-16">
            <div className="section-badge mx-auto mb-4">Philosophy</div>
            <h2 className="section-heading">Structure, Not Chaos</h2>
          </ScrollReveal>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {philosophy.map((item, i) => (
              <ScrollReveal key={i} delay={i * 0.1}>
                <div className="glass-card-hover p-8 text-center h-full">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 mx-auto text-primary">
                    {item.icon}
                  </div>
                  <h3 className="font-heading font-semibold mb-2">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Founder */}
      <section className="py-24">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center max-w-5xl mx-auto">
            <ScrollReveal direction="left">
              <div className="glass-card p-8 flex flex-col items-center text-center">
                <img src={founderImg} alt="Bikram - Founder of Figfalcon" className="w-32 h-32 rounded-full object-cover mb-4" />
                <h3 className="font-heading font-semibold text-xl">Bikram</h3>
                <p className="text-sm text-muted-foreground">Founder & Head of Systems Architecture</p>
                <div className="flex gap-6 mt-6">
                  <div className="text-center">
                    <div className="text-2xl font-bold font-heading">2+</div>
                    <div className="text-xs text-muted-foreground">Years Experience</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold font-heading">50+</div>
                    <div className="text-xs text-muted-foreground">Projects Scaled</div>
                  </div>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal direction="right">
              <div className="section-badge mb-4">Our Leadership</div>
              <h2 className="section-heading mb-6">Systems With <span className="gradient-text">A Soul</span></h2>
              <blockquote className="text-muted-foreground leading-relaxed space-y-4">
                <p>"I started Figfalcon because I saw too many brilliant founders getting buried under their own success. They had the demand, but their operations were a house of cards."</p>
                <p>My background is in engineering and scale-up operations. I don't believe in 'marketing hacks' or temporary fixes. I believe in building infrastructure that breathes—systems that allow you to step back from the chaos and step into your role as a true CEO.</p>
                <p>When you work with us, you're not just getting a partner who cares about your Friday nights as much as your conversion rates. We build the systems so you can build your legacy.</p>
              </blockquote>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Why Choose */}
      <section className="py-24 relative">
        <div className="container mx-auto px-6 max-w-3xl">
          <ScrollReveal>
            <h2 className="section-heading text-center mb-12">Why Choose <span className="gradient-text">Figfalcon</span></h2>
          </ScrollReveal>
          <div className="space-y-4">
            {whyChoose.map((item, i) => (
              <ScrollReveal key={i} delay={i * 0.08}>
                <div className="glass-card p-5 flex items-center gap-4">
                  <div className="glow-dot shrink-0" />
                  <p className="text-muted-foreground">{item}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 gradient-hero" />
        <div className="container mx-auto px-6 relative z-10 text-center">
          <ScrollReveal>
            <h2 className="section-heading mb-6">Ready to Streamline <span className="gradient-text">Your Operations?</span></h2>
            <Link to="/contact" className="btn-primary text-lg px-8 py-4">
              Let's Automate Your Growth <ArrowRight className="w-5 h-5" />
            </Link>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
};

export default About;
