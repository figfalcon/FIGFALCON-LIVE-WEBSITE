import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

const consultCapacities = ["1-5 consults/mo", "6-15 consults/mo", "16-30 consults/mo", "30+ consults/mo"];
const leadCountries: { iso: string; flag: string; dial: string }[] = [
  { iso: "US", flag: "🇺🇸", dial: "+1" },
  { iso: "CA", flag: "🇨🇦", dial: "+1" },
  { iso: "GB", flag: "🇬🇧", dial: "+44" },
  { iso: "AU", flag: "🇦🇺", dial: "+61" },
  { iso: "IN", flag: "🇮🇳", dial: "+91" },
];

const track = (event: string) => {
  (window as unknown as { dataLayer?: { push: (o: object) => void } }).dataLayer?.push({ event });
};

const RequestFitCallForm = ({ source }: { source: string }) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "", email: "", company: "", phone: "", phoneCountry: "US", website: "", consultCapacity: "", notes: "",
  });
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    track("lead_form_submit");
    try {
      const country = leadCountries.find((c) => c.iso === formData.phoneCountry);
      const dial = country?.dial ?? "";
      const fullPhone = formData.phone ? `${dial} ${formData.phone}`.trim() : "";
      const res = await fetch("https://n8n-with-ai-assistant-q76o.srv1883884.hstgr.cloud/webhook/5f4734ad-fa9f-4394-8ed1-77284b47d13c", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          phone: fullPhone,
          phoneCountryIso: formData.phoneCountry,
          phoneDialCode: dial,
          phoneLocal: formData.phone,
          submittedAt: new Date().toISOString(),
          source,
        }),
      });
      if (!res.ok) throw new Error(`Webhook responded ${res.status}`);
      toast({ title: "Request received!", description: "We'll respond within 24 hours to see if we're a fit." });
      setFormData({ name: "", email: "", company: "", phone: "", phoneCountry: "US", website: "", consultCapacity: "", notes: "" });
    } catch {
      toast({ title: "Submission failed", description: "Something went wrong. Please try again or email agency@figfalcon.com.", variant: "destructive" });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="glass-card p-6 md:p-8">
      <h3 className="font-heading font-semibold text-xl mb-1">Request a fit call</h3>
      <p className="text-sm text-muted-foreground mb-6">Takes about two minutes. We respond within 24 hours.</p>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium mb-1.5 block">Full Name <span className="text-destructive">*</span></label>
            <input name="name" value={formData.name} onChange={handleChange} required placeholder="Jordan Lee"
              className="w-full px-4 py-3 rounded-lg bg-secondary/50 border border-border/40 text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all text-sm" />
          </div>
          <div>
            <label className="text-sm font-medium mb-1.5 block">Email address <span className="text-destructive">*</span></label>
            <input name="email" type="email" value={formData.email} onChange={handleChange} required placeholder="jordan@firm.com"
              className="w-full px-4 py-3 rounded-lg bg-secondary/50 border border-border/40 text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all text-sm" />
          </div>
        </div>
        <div>
          <label className="text-sm font-medium mb-1.5 block">Company Name <span className="text-destructive">*</span></label>
          <input name="company" value={formData.company} onChange={handleChange} required placeholder="Lee & Associates"
            className="w-full px-4 py-3 rounded-lg bg-secondary/50 border border-border/40 text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all text-sm" />
        </div>
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium mb-1.5 block">Phone number</label>
            <div className="flex gap-2">
              <select name="phoneCountry" value={formData.phoneCountry} onChange={handleChange} aria-label="Country code"
                className="px-3 py-3 rounded-lg bg-secondary/50 border border-border/40 text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all text-sm appearance-none [&>option]:bg-card [&>option]:text-foreground shrink-0 w-[92px]">
                {leadCountries.map((c) => <option key={c.iso} value={c.iso}>{c.flag} {c.dial}</option>)}
              </select>
              <input name="phone" type="tel" value={formData.phone} onChange={handleChange} placeholder="(305) 555-0142"
                className="flex-1 min-w-0 px-4 py-3 rounded-lg bg-secondary/50 border border-border/40 text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all text-sm" />
            </div>
          </div>
          <div>
            <label className="text-sm font-medium mb-1.5 block">Website <span className="text-destructive">*</span></label>
            <input name="website" value={formData.website} onChange={handleChange} required placeholder="https://yourfirm.com"
              className="w-full px-4 py-3 rounded-lg bg-secondary/50 border border-border/40 text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all text-sm" />
          </div>
        </div>
        <div>
          <label className="text-sm font-medium mb-1.5 block">Whats your monthly Consult capacity <span className="text-destructive">*</span></label>
          <select name="consultCapacity" value={formData.consultCapacity} onChange={handleChange} required
            className="w-full px-3 py-3 rounded-lg bg-secondary/50 border border-border/40 text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all text-sm appearance-none [&>option]:bg-card [&>option]:text-foreground">
            <option value="">Select one</option>
            {consultCapacities.map((c) => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>
        <div>
          <label className="text-sm font-medium mb-1.5 block">Additional notes</label>
          <textarea name="notes" value={formData.notes} onChange={handleChange} rows={3}
            placeholder="Please share anything that will help prepare for our meeting."
            className="w-full px-4 py-3 rounded-lg bg-secondary/50 border border-border/40 text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all text-sm resize-none" />
        </div>
        <button type="submit" disabled={submitting} className="btn-primary w-full justify-center text-base py-4 disabled:opacity-60">
          {submitting ? "Sending..." : "Get Started"}
        </button>
      </form>
    </div>
  );
};

export default RequestFitCallForm;
