import React from "react";
import { Button } from "../ui";
import Link from "next/link";

export interface HackathonCardProps {
  title: string;
  organizer: string;
  date: string;
  duration: string;
  teamSize: string;
  registrationOpen: boolean;
  tags: string[];
  registeredTeams?: number;
  slug: string;
}

const HackathonCard = ({
  title,
  organizer,
  date,
  duration,
  teamSize,
  registrationOpen,
  tags,
  registeredTeams,
  slug,
}: HackathonCardProps) => {
  return (
    <div className="bg-card rounded-lg shadow-sm hover:shadow-md transition-shadow p-6 flex flex-col">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="font-bold text-xl mb-1">{title}</h3>
          <p className="text-textSecondary text-sm">by {organizer}</p>
        </div>
        <span
          className={`px-3 py-1 rounded-full text-xs ${
            registrationOpen
              ? "bg-success/10 text-success"
              : "bg-danger/10 text-danger"
          }`}
        >
          {registrationOpen ? "Registration Open" : "Registration Closed"}
        </span>
      </div>

      <div className="space-y-2 mb-4">
        <div className="flex items-center text-sm text-textSecondary">
          <span className="mr-4">🗓 {date}</span>
          <span>⏱ {duration}</span>
        </div>
        <div className="flex items-center text-sm text-textSecondary">
          <span className="mr-4">👥 {teamSize}</span>
          {registeredTeams && (
            <span>🏃‍♂️ {registeredTeams} teams registered</span>
          )}
        </div>
      </div>

      <div className="flex flex-wrap gap-2 mb-6">
        {tags.map((tag) => (
          <span
            key={tag}
            className="bg-background px-2 py-1 rounded text-xs text-textSecondary"
          >
            {tag}
          </span>
        ))}
      </div>

      <div className="mt-auto">
        <Link href={`/hackathons/${slug}`}>
          <Button
            className="w-full"
            variant={registrationOpen ? "primary" : "secondary"}
          >
            {registrationOpen ? "View Details & Register" : "View Details"}
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default HackathonCard;
