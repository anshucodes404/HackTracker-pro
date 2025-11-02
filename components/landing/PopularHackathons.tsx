import React from "react";
import HackathonCard from "./HackathonCard";
import { Button } from "../ui";
import Link from "next/link";

const PopularHackathons = () => {
  return (
    <section className="py-20 px-20">
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

        <div className="text-center text-3xl font-bold text-gray-400">
          Will Implement later
        </div>

        {/* <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {upcomingHackathons.map((hackathon) => (
            <HackathonCard key={hackathon.slug} {...hackathon} />
          ))}
        </div> */}
      </div>
    </section>
  );
};

export default PopularHackathons;
