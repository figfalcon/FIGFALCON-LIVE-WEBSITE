import ScrollReveal from "@/components/ScrollReveal";
import PageHero from "@/components/PageHero";

const Privacy = () => {
  return (
    <>
      <PageHero
        badge="Legal"
        title={<>Privacy <span className="gradient-text">Policy</span></>}
        description="We are committed to protecting your privacy."
      />

      <section className="py-24">
        <div className="container mx-auto px-6 max-w-3xl">
          <ScrollReveal>
            <div className="glass-card p-8 md:p-12 space-y-8 text-muted-foreground leading-relaxed text-sm">
              <p>
                At <strong className="text-foreground">FIGFALCON</strong>, we collect only the minimum amount of information necessary to provide you with a smooth and satisfactory experience on our website. This Privacy Policy explains what data we may collect, how we use it, and how we safeguard it. By using figfalcon.com, you consent to the practices described here.
              </p>

              <div>
                <h2 className="text-foreground font-heading font-semibold text-lg mb-3">Information Collected</h2>
                <p className="mb-3">We may collect the following types of information depending on how you interact with our website:</p>
                <ul className="list-disc list-inside space-y-1">
                  <li>Name and email address (when submitted via forms)</li>
                  <li>IP address and general geolocation</li>
                  <li>Browser type and device information</li>
                  <li>Pages visited and time spent on the site</li>
                  <li>Any other details you voluntarily submit</li>
                </ul>
                <p className="mt-3">Additional information may be collected as specified in forms on the website or through analytics and tracking tools.</p>
              </div>

              <div>
                <h2 className="text-foreground font-heading font-semibold text-lg mb-3">How We Use This Information</h2>
                <p className="mb-3">Your data is used solely for the purpose of improving your experience and delivering the services or content you requested. Common uses include:</p>
                <ul className="list-disc list-inside space-y-1">
                  <li>Responding to inquiries or form submissions</li>
                  <li>Providing requested content or downloads</li>
                  <li>Analyzing user behavior for site improvements</li>
                  <li>Sending occasional marketing updates (only if you opt in)</li>
                </ul>
                <p className="mt-3">All data is handled securely and in line with applicable data protection regulations. Access to this data is restricted to authorized team members only.</p>
              </div>

              <div>
                <h2 className="text-foreground font-heading font-semibold text-lg mb-3">Cookies</h2>
                <p className="mb-3">Cookies are small files stored on your device to enhance your experience on our website. figfalcon.com uses cookies to:</p>
                <ul className="list-disc list-inside space-y-1">
                  <li>Remember user preferences</li>
                  <li>Analyze traffic and visitor interactions</li>
                  <li>Enable functionality across pages</li>
                </ul>
                <p className="mt-3">You can disable cookies through your browser settings at any time, though this may affect the functionality of some features.</p>
              </div>

              <div>
                <h2 className="text-foreground font-heading font-semibold text-lg mb-3">Third-Party Cookies and Advertising</h2>
                <p>We may partner with trusted third-party tools (e.g., Google Analytics, Facebook Pixel) to better understand user behavior or deliver personalized ads. These tools may set their own cookies and collect non-identifiable data. If you prefer not to participate in interest-based advertising, you can opt out through your browser settings or visit YourAdChoices.</p>
              </div>

              <div>
                <h2 className="text-foreground font-heading font-semibold text-lg mb-3">Disclosure of Information</h2>
                <p>We will never sell, trade, or rent your personal information to third parties. We may share general usage data (e.g., total visits) for statistical purposes, but these will never include personal identifiers. If in the future we need to disclose any personal data for a specific reason, we will do so only with your explicit consent.</p>
              </div>

              <div>
                <h2 className="text-foreground font-heading font-semibold text-lg mb-3">Data Security</h2>
                <p>We implement reasonable security measures to protect your personal information from unauthorized access or disclosure. However, no online platform is 100% secure, and you use this site at your own risk.</p>
              </div>

              <div>
                <h2 className="text-foreground font-heading font-semibold text-lg mb-3">Your Rights</h2>
                <p>If you would like to know what personal information we have collected about you, or wish to correct, update, or delete any data, please contact us at <a href="mailto:agency@figfalcon.com" className="text-primary hover:underline">agency@figfalcon.com</a>. You may also request removal from any mailing list or promotional communication at any time.</p>
              </div>

              <div>
                <h2 className="text-foreground font-heading font-semibold text-lg mb-3">Changes to This Policy</h2>
                <p>We may update this Privacy Policy from time to time. Any changes will be reflected on this page. We encourage you to review this document regularly to stay informed of how your information is used.</p>
              </div>

              <div>
                <h2 className="text-foreground font-heading font-semibold text-lg mb-3">Contacting Us</h2>
                <p>If you have any questions about this Privacy Policy or our data practices, please reach out to: <a href="mailto:agency@figfalcon.com" className="text-primary hover:underline">agency@figfalcon.com</a></p>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
};

export default Privacy;
