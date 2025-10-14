import React from "react";
import HackathonCard from "./HackathonCard";
import { Button } from "../ui";
import Link from "next/link";

const upcomingHackathons = [
  {
    title: "AI Hack 2025",
    organizer: "IEEE Student Branch",
    date: "Nov 1-3, 2025",
    duration: "48 hours",
    teamSize: "3-4 members",
    registrationOpen: true,
    tags: ["AI/ML", "Computer Vision", "NLP"],
    registeredTeams: 45,
    slug: "ai-hack-2025",
  },
  {
    title: "WebDev Summit",
    organizer: "Developer Student Club",
    date: "Nov 15-16, 2025",
    duration: "24 hours",
    teamSize: "2-3 members",
    registrationOpen: true,
    tags: ["Web Development", "UI/UX", "Full Stack"],
    registeredTeams: 30,
    slug: "webdev-summit-2025",
  },
  {
    title: "Blockchain Build",
    organizer: "Cryptography Club",
    date: "Dec 1-3, 2025",
    duration: "36 hours",
    teamSize: "2-4 members",
    registrationOpen: false,
    tags: ["Blockchain", "Web3", "DeFi"],
    registeredTeams: 25,
    slug: "blockchain-build-2025",
  },
];

const PopularHackathons = () => {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-12">
          <div>
            <h2 className="text-3xl font-bold mb-2">Popular Hackathons</h2>
            <p className="text-textSecondary">
              Discover trending hackathons happening soon
            </p>
          </div>
          <Link href="/hackathons">
            <Button variant="secondary">View All</Button>
          </Link>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {upcomingHackathons.map((hackathon) => (
            <HackathonCard key={hackathon.slug} {...hackathon} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default PopularHackathons;
