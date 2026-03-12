import { ReactNode } from "react";

interface PageHeroProps {
  badge: string;
  title: ReactNode;
  description: string;
}

const PageHero = ({ badge, title, description }: PageHeroProps) => {
  return (
    <section className="relative pt-32 pb-20 overflow-hidden">
      <div className="absolute inset-0 gradient-hero" />
      <div className="absolute inset-0 gradient-glow" />
      <div className="absolute top-1/3 right-0 w-96 h-96 bg-primary/10 rounded-full blur-[120px]" />
      <div className="absolute inset-0 grid-pattern opacity-30" />

      <div className="container mx-auto px-6 relative z-10 text-center">
        <div className="section-badge mx-auto mb-8">{badge}</div>
        <h1 className="section-heading max-w-4xl mx-auto mb-6">{title}</h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">{description}</p>
      </div>
    </section>
  );
};

export default PageHero;
