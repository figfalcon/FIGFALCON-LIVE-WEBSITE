import { Link } from "react-router-dom";
import { Mail, Phone, MapPin } from "lucide-react";
import logo from "@/assets/figfalcon-logo.png";

const Footer = () => {
  return (
    <footer className="border-t border-border/40 bg-card/30">
      <div className="container mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="md:col-span-1">
            <img src={logo} alt="Figfalcon" className="h-8 mb-4" />
            <p className="text-muted-foreground text-sm leading-relaxed">
              Your operations & growth partner. We handle the systems so you can focus on what matters.
            </p>
          </div>

          <div>
            <h4 className="font-heading font-semibold text-foreground mb-4">Company</h4>
            <div className="flex flex-col gap-3">
              <Link to="/about" className="text-sm text-muted-foreground hover:text-foreground transition-colors">About</Link>
              <Link to="/services" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Services</Link>
              <Link to="/case-studies" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Case Studies</Link>
              <Link to="/contact" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Contact</Link>
            </div>
          </div>

          <div>
            <h4 className="font-heading font-semibold text-foreground mb-4">Services</h4>
            <div className="flex flex-col gap-3">
              <Link to="/services#chatbot" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Chatbot & Lead Collection</Link>
              <Link to="/services#voice-ai" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Voice AI Receptionist</Link>
              <Link to="/services#websites" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Website & Funnel Building</Link>
              <Link to="/services#cold-email" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Cold Email Systems</Link>
              <Link to="/services#ai-clone" className="text-sm text-muted-foreground hover:text-foreground transition-colors">AI Clone & Video Creation</Link>
            </div>
          </div>

          <div>
            <h4 className="font-heading font-semibold text-foreground mb-4">Contact</h4>
            <div className="flex flex-col gap-3">
              <a href="mailto:agency@figfalcon.com" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
                <Mail className="w-4 h-4" /> agency@figfalcon.com
              </a>
              <a href="https://wa.me/917995602748" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
                <Phone className="w-4 h-4" /> +91 7303318392
              </a>
              <div className="flex items-start gap-2 text-sm text-muted-foreground">
                <MapPin className="w-4 h-4 mt-0.5 shrink-0" />
                <span>303 Coromondal Residency, Malkapuram, Visakhapatnam</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-border/40 mt-12 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Figfalcon. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Privacy Policy</a>
            <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
