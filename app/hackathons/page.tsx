import Aside from "@/components/hackathons/Aside";
import HackathonCard from "@/components/landing/HackathonCard";
import React from "react";



const page = () => {

  const hackathon = {
    hackathonName: "AI Hack 2025",
    mode: "Online",
    tagline: "Learn, Code and Win",
    organiser: "IEEE Student Branch",
    startAt: "Nov 1-3, 2025",
    duration: "48 hours",
    teamSize: "3-4 members",
    registrationDeadline: "23-4-2025",
    status: "upcoming",
    tags: ["AI/ML", "Computer Vision", "NLP"],
    registeredTeams: 45,
    slug: "ai-hack-2025",
    prize: "2500 Rs"
  }
  return (
    <>
      <div className="mt-16 grid grid-cols-[1fr_2fr]">
        <Aside/>
        <HackathonCard {...hackathon}/>
      </div>
    </>
  );
};

export default page;
