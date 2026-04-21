import { useState } from "react";
import { motion } from "framer-motion";
import { Clock, Tag, Search } from "lucide-react";
import { Link } from "react-router-dom";
import PageHero from "@/components/PageHero";
import ScrollReveal from "@/components/ScrollReveal";

const categories = ["All", "AI Automation", "Lead Generation", "CRM & Sales", "Content & Video", "Growth Strategy"];

const posts = [
  {
    slug: "ai-chatbot-vs-voice-receptionist",
    category: "AI Automation",
    title: "AI Chatbot vs Voice AI Receptionist: Which One Does Your Business Actually Need?",
    excerpt: "Both capture leads — but they work very differently. Here's how to pick the right one based on your business model, industry, and the type of leads you're trying to convert.",
    readTime: "5 min read",
    date: "Apr 15, 2026",
    featured: true,
  },
  {
    slug: "cold-email-system-setup-guide",
    category: "Lead Generation",
    title: "How to Set Up a Cold Email System That Books Calls on Autopilot",
    excerpt: "Most cold email fails because it's not a system — it's a one-off blast. Here's the exact infrastructure we build for clients to generate consistent outbound pipeline.",
    readTime: "7 min read",
    date: "Apr 10, 2026",
    featured: false,
  },
  {
    slug: "crm-pipeline-setup-for-local-business",
    category: "CRM & Sales",
    title: "CRM Pipeline Setup for Local Service Businesses: Stop Losing Leads in Spreadsheets",
    excerpt: "If your follow-up process lives in a spreadsheet, you're leaving money on the table every single day. Here's how we structure CRM pipelines that run without manual input.",
    readTime: "6 min read",
    date: "Apr 5, 2026",
    featured: false,
  },
  {
    slug: "ai-clone-video-creation-guide",
    category: "Content & Video",
    title: "AI Clone Video Creation: How We Produce Daily Content Without You Filming a Thing",
    excerpt: "You record yourself once for 20 minutes. We handle everything else — scripting, production, publishing across Instagram, TikTok, and YouTube. Here's how it works.",
    readTime: "8 min read",
    date: "Mar 28, 2026",
    featured: false,
  },
  {
    slug: "lead-funnel-architecture-b2b",
    category: "Growth Strategy",
    title: "Lead Funnel Architecture for B2B: From First Click to Booked Call",
    excerpt: "A lead funnel isn't just a landing page. It's a connected system of capture, nurture, and conversion. Here's the full architecture we deploy for B2B clients.",
    readTime: "9 min read",
    date: "Mar 20, 2026",
    featured: false,
  },
  {
    slug: "voice-ai-receptionist-dental-clinics",
    category: "AI Automation",
    title: "Why Dental Clinics Are Switching to Voice AI Receptionists (And What Happens After Hours)",
    excerpt: "Missed calls after hours mean missed bookings. Voice AI receptionists handle inbound calls 24/7, qualify patients, and book appointments — all without a human on the line.",
    readTime: "5 min read",
    date: "Mar 14, 2026",
    featured: false,
  },
];

const Blog = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [search, setSearch] = useState("");

  const featured = posts.find((p) => p.featured);
  const filtered = posts
    .filter((p) => !p.featured)
    .filter((p) => activeCategory === "All" || p.category === activeCategory)
    .filter(
      (p) =>
        search === "" ||
        p.title.toLowerCase().includes(search.toLowerCase()) ||
        p.excerpt.toLowerCase().includes(search.toLowerCase())
    );

  return (
    <div className="min-h-screen">
      <PageHero
        badge="Figfalcon Blog"
        title={
          <>
            Insights on <span className="gradient-text">AI, Automation</span> & B2B Growth
          </>
        }
        description="Practical guides, frameworks, and strategies for local service businesses and founders ready to automate their growth."
      />

      <section className="py-20 relative">
        <div className="absolute inset-0 gradient-hero opacity-50" />
        <div className="container mx-auto px-6 relative z-10">

          {/* Featured Post */}
          {featured && (
            <ScrollReveal className="mb-16">
              <div className="glass-card-hover p-0 overflow-hidden rounded-2xl">
                <div className="grid lg:grid-cols-2 gap-0">
                  {/* Left — visual placeholder */}
                  <div className="relative bg-gradient-to-br from-primary/20 via-accent/10 to-background min-h-[280px] lg:min-h-[380px] flex items-center justify-center">
                    <div className="absolute inset-0 grid-pattern opacity-20" />
                    <div className="relative z-10 text-center px-8">
                      <div className="w-20 h-20 rounded-2xl bg-primary/20 border border-primary/30 flex items-center justify-center mx-auto mb-4">
                        <span className="text-4xl">🤖</span>
                      </div>
                      <span className="text-xs font-semibold text-primary uppercase tracking-widest">Featured Article</span>
                    </div>
                  </div>

                  {/* Right — content */}
                  <div className="p-10 flex flex-col justify-center">
                    <div className="flex items-center gap-3 mb-4">
                      <span className="section-badge text-xs">{featured.category}</span>
                      <span className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Clock className="w-3 h-3" /> {featured.readTime}
                      </span>
                      <span className="text-xs text-muted-foreground">{featured.date}</span>
                    </div>
                    <h2 className="font-heading font-bold text-2xl lg:text-3xl mb-4 text-foreground leading-snug">
                      {featured.title}
                    </h2>
                    <p className="text-muted-foreground mb-6 leading-relaxed">{featured.excerpt}</p>
                    <Link
                      to={`/blog/${featured.slug}`}
                      className="btn-primary text-sm w-fit"
                    >
                      Read Article
                    </Link>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          )}

          {/* Search + Filter */}
          <ScrollReveal className="mb-10">
            <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
              {/* Category filters */}
              <div className="flex flex-wrap gap-2">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`text-xs font-semibold px-4 py-2 rounded-full border transition-all duration-200 ${
                      activeCategory === cat
                        ? "bg-primary/20 border-primary/40 text-primary"
                        : "border-border/40 text-muted-foreground hover:text-foreground hover:border-border"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              {/* Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search articles..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="bg-secondary/40 border border-border/40 text-foreground placeholder:text-muted-foreground rounded-full pl-9 pr-4 py-2 text-sm outline-none focus:border-primary/50 transition-colors w-56"
                />
              </div>
            </div>
          </ScrollReveal>

          {/* Posts Grid */}
          {filtered.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((post, i) => (
                <ScrollReveal key={post.slug} delay={i * 0.08}>
                  <Link
                    to={`/blog/${post.slug}`}
                    className="glass-card-hover p-7 flex flex-col h-full group block"
                  >
                    {/* Icon placeholder */}
                    <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center mb-5 group-hover:bg-primary/20 transition-colors">
                      <Tag className="w-5 h-5 text-primary" />
                    </div>

                    {/* Meta */}
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-xs font-semibold text-accent bg-accent/10 border border-accent/20 px-2.5 py-1 rounded-full">
                        {post.category}
                      </span>
                      <span className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Clock className="w-3 h-3" /> {post.readTime}
                      </span>
                    </div>

                    <h3 className="font-heading font-semibold text-lg text-foreground leading-snug mb-3 group-hover:text-primary transition-colors">
                      {post.title}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed flex-1 mb-5">
                      {post.excerpt}
                    </p>

                    <div className="flex items-center justify-between mt-auto pt-4 border-t border-border/30">
                      <span className="text-xs text-muted-foreground">{post.date}</span>
                      <span className="flex items-center gap-1 text-xs text-primary font-semibold group-hover:gap-2 transition-all">
                        Read more
                      </span>
                    </div>
                  </Link>
                </ScrollReveal>
              ))}
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20 text-muted-foreground"
            >
              <p className="text-lg">No articles found for &ldquo;{search}&rdquo;</p>
              <button
                onClick={() => { setSearch(""); setActiveCategory("All"); }}
                className="mt-4 text-sm text-primary underline"
              >
                Clear filters
              </button>
            </motion.div>
          )}

          {/* Bottom CTA */}
          <ScrollReveal className="mt-20">
            <div className="glass-card p-10 text-center relative overflow-hidden">
              <div className="absolute inset-0 gradient-hero opacity-60" />
              <div className="relative z-10">
                <div className="section-badge mx-auto mb-4">Ready to Automate?</div>
                <h2 className="font-heading font-bold text-3xl md:text-4xl mb-4">
                  Stop Reading. <span className="gradient-text">Start Automating.</span>
                </h2>
                <p className="text-muted-foreground max-w-xl mx-auto mb-8">
                  Book a free strategy call and we&apos;ll audit your current setup, identify the biggest gaps, and map out exactly what to build first.
                </p>
                <Link to="/contact" className="btn-primary">
                  Let&apos;s Automate Your Growth
                </Link>
              </div>
            </div>
          </ScrollReveal>

        </div>
      </section>
    </div>
  );
};

export default Blog;
