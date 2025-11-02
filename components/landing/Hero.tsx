import React from "react";
import { Button } from "../ui";
import Link from "next/link";
import Image from "next/image";


const Hero = () => {
  return (
    <section className="pl-20 pt-20 pb-6">
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
          
        </div>
        <div className="hidden md:block">
          <div className="relative">
            
          
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
