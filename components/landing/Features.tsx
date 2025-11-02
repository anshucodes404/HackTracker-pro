
import FeatureCard from "./FeatureCard";

const features = [
  {
    icon: "🎯",
    title: "Host Hackathons",
    description:
      "Create and manage hackathons for your college society with powerful organizing tools",
  },
  {
    icon: "👥",
    title: "Build Teams",
    description: "Find teammates or invite friends to join your hackathon team",
  },
  {
    icon: "🔍",
    title: "Discover Events",
    description:
      "Browse upcoming hackathons filtered by date, tech stack, or prize pool",
  },
  {
    icon: "🚀",
    title: "Quick Register",
    description:
      "One-click registration and team creation for participating in hackathons",
  },
];

const Features = () => {
  return (
    <section className="py-20 bg-background px-20">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl font-bold mb-4">
            Everything You Need to Hack
          </h2>
          <p className="text-textSecondary">
            Whether you&apos;re organizing a hackathon or participating in one,
            we&apos;ve got all the tools you need
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature) => (
            <FeatureCard key={feature.title} {...feature} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
