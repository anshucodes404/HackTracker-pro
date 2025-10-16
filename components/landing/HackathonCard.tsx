import React from "react";
import { Button } from "../ui";
import Link from "next/link";
import Image from "next/image";
import { Award, Calendar, CalendarClock, Clock, Flag, Globe, Tags, Users } from "lucide-react";

export interface HackathonCardProps {
  hackathonName: string;
  mode: string;
  tagline: string;
  organiser: string;
  duration: string;
  teamSize: string;
  startAt: string;
  registrationDeadline: string;
  tags: string[];
  registeredTeams?: number;
  slug: string;
  prize: string;
  status: string;
  bannerImage?: string;
}

const HackathonCard = ({
  hackathonName,
  mode,
  tagline,
  organiser,
  duration,
  teamSize,
  startAt,
  registrationDeadline,
  tags,
  registeredTeams,
  slug,
  prize,
  status,
  bannerImage,
}: HackathonCardProps) => {
  return (
    <div className="bg-card rounded-lg shadow-sm hover:shadow-md p-6 grid grid-cols-[100px_2fr_1fr] h-52 max-w-5/6 border-gray-100">
      <section className="border-r-2">
        {bannerImage ? (
          <Image src={bannerImage} alt="Banner" />
        ) : (
          <div>No banner</div>
        )}
      </section>
      <section className="border-r-2 mx-2">
        <h1 className="text-2xl font-bold">{hackathonName}</h1>
        <p>{tagline}</p>
        <div>
          <span>{`• ${status}`}</span>
          <span><Globe />{mode}</span>
        </div>
        <div>
          <span><Award />{`₹ ${prize}`}</span>
          <span><Users />{`${registeredTeams} participants`}</span>
        </div>
      </section>
      <section>
        <div ><Flag /><span>{organiser}</span></div>
        <div><Calendar />{startAt}</div>
        <div><CalendarClock />{registrationDeadline}</div>
        <div><Clock />{duration}</div>
        <div><Tags />{tags}</div>
      </section>
    </div>
  );
};

export default HackathonCard;
