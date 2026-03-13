import ScrollReveal from "@/components/ScrollReveal";
import PageHero from "@/components/PageHero";

const Terms = () => {
  return (
    <>
      <PageHero
        badge="Legal"
        title={<>Terms and <span className="gradient-text">Conditions</span></>}
        description="Effective Date: May 01, 2025"
      />

      <section className="py-24">
        <div className="container mx-auto px-6 max-w-3xl">
          <ScrollReveal>
            <div className="glass-card p-8 md:p-12 space-y-8 text-muted-foreground leading-relaxed text-sm">
              <div>
                <h2 className="text-foreground font-heading font-semibold text-lg mb-3">Introduction</h2>
                <p>By using this website, you agree to the following Terms and Conditions. These terms outline how you may interact with the site and its content, and what you can expect from <strong className="text-foreground">FIGFALCON</strong>, a digital agency based in Delhi, India. If you do not agree with these terms, we kindly ask that you do not use this site.</p>
              </div>

              <div>
                <h2 className="text-foreground font-heading font-semibold text-lg mb-3">Use of Website</h2>
                <p>You are welcome to use this site for personal and non-commercial purposes. You may view, share, or download content for reference, provided you do not alter the material or use it without proper attribution or permission. Commercial use or republication of any content is not allowed without written consent. All content, unless stated otherwise, is owned by FIGFALCON and protected by intellectual property laws.</p>
              </div>

              <div>
                <h2 className="text-foreground font-heading font-semibold text-lg mb-3">Content Accuracy</h2>
                <p>We strive to ensure all information on this site is current, accurate, and helpful. However, we make no guarantees that all content will be complete, error-free, or continuously updated. Your use of any information or materials from this site is entirely at your own discretion and risk.</p>
              </div>

              <div>
                <h2 className="text-foreground font-heading font-semibold text-lg mb-3">Visitor Conduct</h2>
                <p>By using this website, you agree not to submit or transmit any content that is unlawful, harmful, offensive, defamatory, or otherwise inappropriate. You also agree not to tamper with the functionality or security of the website, access restricted areas, or interfere with other users' experience.</p>
              </div>

              <div>
                <h2 className="text-foreground font-heading font-semibold text-lg mb-3">External Links</h2>
                <p>Our site may include links to external websites for your convenience. These links are provided as references and do not imply endorsement. We are not responsible for the content or privacy practices of any third-party websites you may access through figfalcon.com. We encourage you to read their terms and privacy policies.</p>
              </div>

              <div>
                <h2 className="text-foreground font-heading font-semibold text-lg mb-3">Website Availability</h2>
                <p>We aim to keep figfalcon.com accessible at all times, but we cannot guarantee uninterrupted access. The site may be temporarily unavailable due to maintenance, technical issues, or other circumstances beyond our control. We are not liable for any downtime or related consequences.</p>
              </div>

              <div>
                <h2 className="text-foreground font-heading font-semibold text-lg mb-3">Limitation of Liability</h2>
                <p>We are not responsible for any direct or indirect loss, damage, or inconvenience that may result from the use of our website. This includes, but not limited to, data loss, service interruptions, or any issues caused by reliance on the information presented here.</p>
              </div>

              <div>
                <h2 className="text-foreground font-heading font-semibold text-lg mb-3">Intellectual Property</h2>
                <p>All elements of the website including branding, design, text, graphics, and code are the intellectual property of FIGFALCON, unless otherwise noted. Use of these materials without permission is prohibited and may result in legal action.</p>
              </div>

              <div>
                <h2 className="text-foreground font-heading font-semibold text-lg mb-3">Jurisdiction and Governing Law</h2>
                <p>These Terms and Conditions are governed by the laws of the Republic of India and fall under the jurisdiction of courts in Delhi. Any legal matters related to the website will be handled in accordance with local laws.</p>
              </div>

              <div>
                <h2 className="text-foreground font-heading font-semibold text-lg mb-3">Changes to These Terms</h2>
                <p>We may update these Terms and Conditions from time to time without prior notice. Any changes will be posted on this page. We encourage you to check this page regularly to stay informed about your rights and obligations.</p>
              </div>

              <div>
                <h2 className="text-foreground font-heading font-semibold text-lg mb-3">Contact Information</h2>
                <p>If you have any questions or concerns about these Terms and Conditions, please contact us at: <a href="mailto:agency@figfalcon.com" className="text-primary hover:underline">agency@figfalcon.com</a></p>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
};

export default Terms;
