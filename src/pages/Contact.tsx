import { useState, useEffect } from "react";
import { Mail, Phone, MapPin, Calendar, CheckCircle, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { getCalApi } from "@calcom/embed-react";
import ScrollReveal from "@/components/ScrollReveal";
import PageHero from "@/components/PageHero";
import { useToast } from "@/hooks/use-toast";

const CAL_LINK = "figfalcon/consultation-on-ai-helping-your-business";

const industries = [
  "Technology / SaaS", "Healthcare", "Financial Services", "E-commerce / Retail",
  "Manufacturing", "Real Estate", "Professional Services", "Education", "Media / Entertainment", "Other",
];

const companySizes = ["Solo", "2-5", "6-15", "16-50", "50+"];
const budgets = ["$3,000 - $5,000", "$5,000 - $10,000", "$10,000 - $20,000", "$20,000+"];

// ISO code, flag emoji, country name, dial code
const countries: { iso: string; flag: string; name: string; dial: string }[] = [
  { iso: "IN", flag: "🇮🇳", name: "India", dial: "+91" },
  { iso: "US", flag: "🇺🇸", name: "United States", dial: "+1" },
  { iso: "GB", flag: "🇬🇧", name: "United Kingdom", dial: "+44" },
  { iso: "CA", flag: "🇨🇦", name: "Canada", dial: "+1" },
  { iso: "AU", flag: "🇦🇺", name: "Australia", dial: "+61" },
  { iso: "AE", flag: "🇦🇪", name: "UAE", dial: "+971" },
  { iso: "SG", flag: "🇸🇬", name: "Singapore", dial: "+65" },
  { iso: "DE", flag: "🇩🇪", name: "Germany", dial: "+49" },
  { iso: "FR", flag: "🇫🇷", name: "France", dial: "+33" },
  { iso: "NL", flag: "🇳🇱", name: "Netherlands", dial: "+31" },
  { iso: "ES", flag: "🇪🇸", name: "Spain", dial: "+34" },
  { iso: "IT", flag: "🇮🇹", name: "Italy", dial: "+39" },
  { iso: "CH", flag: "🇨🇭", name: "Switzerland", dial: "+41" },
  { iso: "SE", flag: "🇸🇪", name: "Sweden", dial: "+46" },
  { iso: "NO", flag: "🇳🇴", name: "Norway", dial: "+47" },
  { iso: "DK", flag: "🇩🇰", name: "Denmark", dial: "+45" },
  { iso: "FI", flag: "🇫🇮", name: "Finland", dial: "+358" },
  { iso: "IE", flag: "🇮🇪", name: "Ireland", dial: "+353" },
  { iso: "BE", flag: "🇧🇪", name: "Belgium", dial: "+32" },
  { iso: "AT", flag: "🇦🇹", name: "Austria", dial: "+43" },
  { iso: "PT", flag: "🇵🇹", name: "Portugal", dial: "+351" },
  { iso: "PL", flag: "🇵🇱", name: "Poland", dial: "+48" },
  { iso: "CZ", flag: "🇨🇿", name: "Czech Republic", dial: "+420" },
  { iso: "GR", flag: "🇬🇷", name: "Greece", dial: "+30" },
  { iso: "TR", flag: "🇹🇷", name: "Turkey", dial: "+90" },
  { iso: "RU", flag: "🇷🇺", name: "Russia", dial: "+7" },
  { iso: "UA", flag: "🇺🇦", name: "Ukraine", dial: "+380" },
  { iso: "IL", flag: "🇮🇱", name: "Israel", dial: "+972" },
  { iso: "SA", flag: "🇸🇦", name: "Saudi Arabia", dial: "+966" },
  { iso: "QA", flag: "🇶🇦", name: "Qatar", dial: "+974" },
  { iso: "KW", flag: "🇰🇼", name: "Kuwait", dial: "+965" },
  { iso: "BH", flag: "🇧🇭", name: "Bahrain", dial: "+973" },
  { iso: "OM", flag: "🇴🇲", name: "Oman", dial: "+968" },
  { iso: "EG", flag: "🇪🇬", name: "Egypt", dial: "+20" },
  { iso: "ZA", flag: "🇿🇦", name: "South Africa", dial: "+27" },
  { iso: "NG", flag: "🇳🇬", name: "Nigeria", dial: "+234" },
  { iso: "KE", flag: "🇰🇪", name: "Kenya", dial: "+254" },
  { iso: "GH", flag: "🇬🇭", name: "Ghana", dial: "+233" },
  { iso: "MA", flag: "🇲🇦", name: "Morocco", dial: "+212" },
  { iso: "PK", flag: "🇵🇰", name: "Pakistan", dial: "+92" },
  { iso: "BD", flag: "🇧🇩", name: "Bangladesh", dial: "+880" },
  { iso: "LK", flag: "🇱🇰", name: "Sri Lanka", dial: "+94" },
  { iso: "NP", flag: "🇳🇵", name: "Nepal", dial: "+977" },
  { iso: "CN", flag: "🇨🇳", name: "China", dial: "+86" },
  { iso: "HK", flag: "🇭🇰", name: "Hong Kong", dial: "+852" },
  { iso: "TW", flag: "🇹🇼", name: "Taiwan", dial: "+886" },
  { iso: "JP", flag: "🇯🇵", name: "Japan", dial: "+81" },
  { iso: "KR", flag: "🇰🇷", name: "South Korea", dial: "+82" },
  { iso: "MY", flag: "🇲🇾", name: "Malaysia", dial: "+60" },
  { iso: "ID", flag: "🇮🇩", name: "Indonesia", dial: "+62" },
  { iso: "PH", flag: "🇵🇭", name: "Philippines", dial: "+63" },
  { iso: "TH", flag: "🇹🇭", name: "Thailand", dial: "+66" },
  { iso: "VN", flag: "🇻🇳", name: "Vietnam", dial: "+84" },
  { iso: "NZ", flag: "🇳🇿", name: "New Zealand", dial: "+64" },
  { iso: "MX", flag: "🇲🇽", name: "Mexico", dial: "+52" },
  { iso: "BR", flag: "🇧🇷", name: "Brazil", dial: "+55" },
  { iso: "AR", flag: "🇦🇷", name: "Argentina", dial: "+54" },
  { iso: "CL", flag: "🇨🇱", name: "Chile", dial: "+56" },
  { iso: "CO", flag: "🇨🇴", name: "Colombia", dial: "+57" },
  { iso: "PE", flag: "🇵🇪", name: "Peru", dial: "+51" },
];

const faqs = [
  { q: "How is this different from a marketing agency?", a: "We don't run ads or create content. We build the operational infrastructure — the systems, automation, and backend processes — that make your marketing actually convert into revenue." },
  { q: "Why work with Figfalcon instead of hiring in-house?", a: "Hiring an operations specialist costs $80-120K+/year. We deliver the same (often better) results at a fraction of the cost, with zero training, zero management overhead, and immediate results." },
  { q: "What happens after a lead books?", a: "Our systems handle the entire flow: confirmation emails, reminder sequences, no-show follow-ups, and CRM updates. Your team just shows up to qualified conversations." },
  { q: "Can automation replace my sales team?", a: "No — and it shouldn't. Automation handles the repetitive work (follow-ups, scheduling, data entry) so your sales team can focus on what humans do best: building relationships and closing deals." },
  { q: "How fast do systems go live?", a: "Most systems are live within 1-2 weeks. Complex multi-system builds take 2-4 weeks. We move fast because we've built these systems dozens of times." },
  { q: "What CRM and tools do you support?", a: "We work with HubSpot, GoHighLevel, Salesforce, Pipedrive, and most major CRMs. We also integrate with Calendly, Cal.com, Zapier, Make, and custom APIs." },
];

const whatHappensNext = [
  "Response within 24 hours with initial assessment",
  "Operations audit and automation opportunity analysis",
  "Custom systems proposal",
  "Hands-on implementation with no sales handoffs",
];

const Contact = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "", email: "", company: "", phone: "", phoneCountry: "IN", industry: "", companySize: "", budget: "", challenge: "",
  });
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    (async () => {
      const cal = await getCalApi({ namespace: "consultation" });
      cal("ui", {
        hideEventTypeDetails: false,
        theme: "dark",
      });
    })();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const country = countries.find(c => c.iso === formData.phoneCountry);
      const dial = country?.dial ?? "";
      const fullPhone = formData.phone ? `${dial} ${formData.phone}`.trim() : "";
      const res = await fetch("https://n8n.srv813240.hstgr.cloud/webhook/5f4734ad-fa9f-4394-8ed1-77284b47d13c", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          phone: fullPhone,
          phoneCountryIso: formData.phoneCountry,
          phoneDialCode: dial,
          phoneLocal: formData.phone,
          submittedAt: new Date().toISOString(),
          source: "figfalcon.com/contact",
        }),
      });
      if (!res.ok) throw new Error(`Webhook responded ${res.status}`);
      toast({
        title: "Message sent!",
        description: "We'll get back to you within 24 hours with an initial assessment.",
      });
      setFormData({ name: "", email: "", company: "", phone: "", phoneCountry: "IN", industry: "", companySize: "", budget: "", challenge: "" });
    } catch (err) {
      toast({
        title: "Submission failed",
        description: "Something went wrong. Please try again or email agency@figfalcon.com.",
        variant: "destructive",
      });
    } finally {
      setSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <>
      <PageHero
        badge="Start a Conversation"
        title={<>Let's Build Your <span className="gradient-text">Growth Systems</span></>}
        description="This is a strategy intake, not a generic contact form. Tell us about your business and we'll respond with specific insights."
      />

      <section className="py-24">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-5 gap-12">
            {/* Form */}
            <div className="lg:col-span-3">
              <ScrollReveal>
                <div className="glass-card p-8">
                  <h3 className="font-heading font-semibold text-xl mb-2">Get Free AI Voice Agent Demo</h3>
                  <p className="text-sm text-muted-foreground mb-6">See how our AI agents can transform your operations.</p>

                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid md:grid-cols-2 gap-5">
                      <div>
                        <label className="text-sm font-medium mb-1.5 block">Name <span className="text-destructive">*</span></label>
                        <input
                          name="name" value={formData.name} onChange={handleChange} required
                          placeholder="Your name"
                          className="w-full px-4 py-3 rounded-lg bg-secondary/50 border border-border/40 text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all text-sm"
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium mb-1.5 block">Email <span className="text-destructive">*</span></label>
                        <input
                          name="email" type="email" value={formData.email} onChange={handleChange} required
                          placeholder="you@company.com"
                          className="w-full px-4 py-3 rounded-lg bg-secondary/50 border border-border/40 text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all text-sm"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="text-sm font-medium mb-1.5 block">Company <span className="text-destructive">*</span></label>
                      <input
                        name="company" value={formData.company} onChange={handleChange} required
                        placeholder="Your company name"
                        className="w-full px-4 py-3 rounded-lg bg-secondary/50 border border-border/40 text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all text-sm"
                      />
                    </div>

                    <div>
                      <label className="text-sm font-medium mb-1.5 block">Phone Number</label>
                      <div className="flex gap-2">
                        <select
                          name="phoneCountry"
                          value={formData.phoneCountry}
                          onChange={handleChange}
                          aria-label="Country code"
                          className="px-3 py-3 rounded-lg bg-secondary/50 border border-border/40 text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all text-sm appearance-none [&>option]:bg-card [&>option]:text-foreground shrink-0 w-[130px]"
                        >
                          {countries.map(c => (
                            <option key={c.iso} value={c.iso}>{c.flag} {c.dial}</option>
                          ))}
                        </select>
                        <input
                          name="phone" type="tel" value={formData.phone} onChange={handleChange}
                          placeholder="Your phone"
                          className="flex-1 px-4 py-3 rounded-lg bg-secondary/50 border border-border/40 text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all text-sm"
                        />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-5">
                      <div>
                        <label className="text-sm font-medium mb-1.5 block">Industry / Business Type</label>
                      <select
                          name="industry" value={formData.industry} onChange={handleChange}
                          className="w-full px-4 py-3 rounded-lg bg-secondary/50 border border-border/40 text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all text-sm appearance-none [&>option]:bg-card [&>option]:text-foreground"
                        >
                          <option value="">Select your industry</option>
                          {industries.map((ind) => <option key={ind} value={ind}>{ind}</option>)}
                        </select>
                      </div>
                      <div>
                        <label className="text-sm font-medium mb-1.5 block">Company Size</label>
                      <select
                          name="companySize" value={formData.companySize} onChange={handleChange}
                          className="w-full px-4 py-3 rounded-lg bg-secondary/50 border border-border/40 text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all text-sm appearance-none [&>option]:bg-card [&>option]:text-foreground"
                        >
                          <option value="">Select company size</option>
                          {companySizes.map((s) => <option key={s} value={s}>{s}</option>)}
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="text-sm font-medium mb-1.5 block">Investment Budget</label>
                      <select
                        name="budget" value={formData.budget} onChange={handleChange}
                        className="w-full px-4 py-3 rounded-lg bg-secondary/50 border border-border/40 text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all text-sm appearance-none [&>option]:bg-card [&>option]:text-foreground"
                      >
                        <option value="">Select budget range</option>
                        {budgets.map((b) => <option key={b} value={b}>{b}</option>)}
                      </select>
                    </div>

                    <div>
                      <label className="text-sm font-medium mb-1.5 block">Current Business Challenge</label>
                      <textarea
                        name="challenge" value={formData.challenge} onChange={handleChange}
                        placeholder="Tell us about your biggest operational challenge..."
                        rows={4}
                        className="w-full px-4 py-3 rounded-lg bg-secondary/50 border border-border/40 text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all text-sm resize-none"
                      />
                    </div>

                    <button type="submit" disabled={submitting} className="btn-primary w-full justify-center text-base py-4 disabled:opacity-60">
                      {submitting ? "Sending..." : "Surprise Me"}
                    </button>
                  </form>
                </div>
              </ScrollReveal>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-2 space-y-6">
              <ScrollReveal delay={0.1}>
                <div className="glass-card p-8">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                    <Calendar className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="font-heading font-semibold text-lg mb-2">Get Your Company AI Agent Today</h3>
                  <p className="text-sm text-muted-foreground mb-6">Experience our AI voice agent firsthand. Fill out the form and get an instant demo call.</p>
                  <button
                    type="button"
                    data-cal-namespace="consultation"
                    data-cal-link={CAL_LINK}
                    data-cal-config='{"layout":"month_view","theme":"dark"}'
                    className="btn-primary w-full justify-center"
                  >
                    Get Your Free Consultation
                  </button>
                </div>
              </ScrollReveal>

              <ScrollReveal delay={0.2}>
                <div className="glass-card p-8">
                  <h3 className="font-heading font-semibold text-lg mb-6">Direct Contact</h3>
                  <div className="space-y-4">
                    <a href="mailto:agency@figfalcon.com" className="flex items-center gap-3 text-sm group">
                      <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                        <Mail className="w-4 h-4 text-primary" />
                      </div>
                      <div>
                        <div className="text-xs text-muted-foreground">Email</div>
                        <div className="text-foreground group-hover:text-primary transition-colors">agency@figfalcon.com</div>
                      </div>
                    </a>
                    <a href="https://wa.me/7303318392" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-sm group">
                      <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                        <Phone className="w-4 h-4 text-primary" />
                      </div>
                      <div>
                        <div className="text-xs text-muted-foreground">Phone</div>
                        <div className="text-foreground group-hover:text-primary transition-colors">+91 7303318392</div>
                      </div>
                    </a>
                    <div className="flex items-start gap-3 text-sm">
                      <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                        <MapPin className="w-4 h-4 text-primary" />
                      </div>
                      <div>
                        <div className="text-xs text-muted-foreground">Office</div>
                        <div className="text-foreground">303 Coromondal Residency, Malkapuram, Visakhapatnam</div>
                      </div>
                    </div>
                  </div>
                </div>
              </ScrollReveal>

              <ScrollReveal delay={0.3}>
                <div className="glass-card p-8">
                  <h3 className="font-heading font-semibold text-lg mb-4">What Happens Next</h3>
                  <div className="space-y-3">
                    {whatHappensNext.map((item, i) => (
                      <div key={i} className="flex items-start gap-2 text-sm">
                        <CheckCircle className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                        <span className="text-muted-foreground">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 border-t border-border/30">
        <div className="container mx-auto px-6 max-w-3xl">
          <ScrollReveal className="text-center mb-12">
            <div className="section-badge mx-auto mb-4">FAQ</div>
            <h2 className="section-heading">Frequently Asked Questions</h2>
          </ScrollReveal>

          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <ScrollReveal key={i} delay={i * 0.05}>
                <div className="glass-card overflow-hidden">
                  <button
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className="w-full flex items-center justify-between p-5 text-left"
                  >
                    <span className="font-medium pr-4">{faq.q}</span>
                    <ChevronDown className={`w-5 h-5 text-muted-foreground shrink-0 transition-transform duration-300 ${openFaq === i ? "rotate-180" : ""}`} />
                  </button>
                  <AnimatePresence>
                    {openFaq === i && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <p className="px-5 pb-5 text-sm text-muted-foreground">{faq.a}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Contact;
