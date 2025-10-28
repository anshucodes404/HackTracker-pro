import React from "react";
import { Button } from "../ui";
import Link from "next/link";
import HackathonCard from "./HackathonCard";
import Image from "next/image";

const featuredHackathon = {
  title: "CodeSprint 2025",
  organizer: "ACM Student Chapter",
  date: "Oct 20-22, 2025",
  duration: "48 hours",
  teamSize: "2-4 members",
  registrationOpen: true,
  tags: ["AI/ML", "Web3", "Open Innovation"],
  registeredTeams: 120,
  slug: "codesprint-2025",
};

const Hero = () => {
  return (
    <section className="min-h-[85vh] bg-gradient-to-b from-primary/5 to-transparent pt-20 pb-16">
      <div className="container mx-auto px-4 grid lg:grid-cols-2 gap-12 items-center">
        <div className="space-y-6">
          <h1 className="text-5xl font-bold leading-tight">
            Discover & Join Amazing
            <span className="text-primary block">Campus Hackathons</span>
          </h1>
          <p className="text-lg text-textSecondary">
            Connect with fellow hackers, form teams, and participate in exciting
            hackathons. Or host your own hackathon and bring your college&apos;s tech
            community together.
          </p>
          <div className="flex gap-4 pt-4">
            <Link href="/hackathons">
              <Button variant="primary">Explore Hackathons</Button>
            </Link>
            <Link href="/organise-hackathons">
              <Button variant="secondary">Host a Hackathon</Button>
            </Link>
          </div>
          <div className="pt-8">
            <p className="text-sm text-textSecondary mb-4">
              🔥 Featured Hackathon
            </p>
            {/* <HackathonCard {...featuredHackathon} /> */}
          </div>
        </div>
        <div className="hidden lg:block">
          <div className="relative">
            <div className="absolute -top-6 -left-6 w-24 h-24 bg-secondary/10 rounded-full blur-xl"></div>
            <div className="absolute -bottom-8 -right-8 w-32 h-32 bg-primary/10 rounded-full blur-xl"></div>
            <Image
              width={1920}
              height={800}
              src={"/landing.png"}
              alt="Hackathon Illustration"
              className="relative z-10 w-full max-w-lg mx-auto"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
