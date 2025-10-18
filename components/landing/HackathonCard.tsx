import React from "react";
import { Button } from "../ui";
import Link from "next/link";
import { HackathonCardProps } from "@/types/types";
import Image from "next/image";
import {
  Award,
  Calendar,
  CalendarClock,
  Clock,
  Flag,
  Globe,
  Tags,
  Users,
} from "lucide-react";


const HackathonCard = ({
  _id,
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
  prize,
  status,
  bannerImage,
}: HackathonCardProps) => {
  return (
    <div className="bg-card rounded-lg text-sm shadow-sm hover:bg-slate-100/70 hover:shadow-md mt-8 p-6 grid grid-cols-[100px_2fr_1fr] h-52 max-w-5/6 border-gray-100">
      <section className="md:block">
        {bannerImage ? (
          <Image src={bannerImage} alt="Banner" />
        ) : (
          <div>No banner</div>
        )}
      </section>
      <section className="mx-2">
        <h1 className="text-2xl font-bold">{hackathonName}</h1>
        <p className="text-base">{tagline}</p>
        <div className="ml-6 grid md:grid-cols-2 grid-cols-1">
          <div className="mt-2">
            <span className="text-sm">{Status(status)}</span>
            <span className="flex gap-2 mt-2 items-center">
              <Award className="size-4" />
              {`₹ ${prize} in prize`}
            </span>
          </div>
          <div className="">
            <span className="flex gap-2 mt-2 items-center">
              <Globe className="size-4" />
              {mode}
            </span>
            <span className="flex gap-2 mt-2 items-center">
              <Users className="size-4" />
              {`${registeredTeams} participants`}
            </span>
          </div>
        </div>

        <div className="mr-10 mt-4">
          <Button className="w-full">View and Register</Button>
        </div>
      </section>
      <section>
        <div className="flex gap-2 mt-2 items-center">
          <Flag className="size-4" />
          <span>{organiser}</span>
        </div>
        <div className="flex gap-2 mt-2 items-center">
          <Calendar className="size-4" />
          {startAt.toString()}
        </div>
        <div className="flex gap-2 mt-2 items-center">
          <CalendarClock className="size-4" />
          {registrationDeadline.toString()}
        </div>
        <div className="flex gap-2 mt-2 items-center">
          <Clock className="size-4" />
          {duration}
        </div>
        <div className="flex gap-2 mt-2 items-center">
          <Tags className="size-4" />
          {tags.map((tag, index) => {
            return (<div key={index}>{TagsList(tag)}</div> )
          })}
        </div>
      </section>
    </div>
  );
};

function TagsList(tag: string): React.ReactNode {
  return (
    <div className="px-2 py-1 text-xs whitespace-pre bg-blue-100 text-blue-600 rounded-full">
      {tag}
    </div>
  );
}

function Status(status: string) {
  if (status === "upcoming") {
    return (
      <span className="w-1/2 bg-[#23A196] text-white px-4 py-1 rounded-full ">
        <span>{status}</span>
      </span>
    );
  }
}

export default HackathonCard;
