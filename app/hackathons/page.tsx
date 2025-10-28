"use client";
import Aside from "@/components/hackathons/Aside";
import HackathonCard from "@/components/landing/HackathonCard";
import { HackathonCardProps } from "@/types/types";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Loader from "@/components/ui/Loader";

const Page = () => {
  useEffect(() => {
    console.log("Hackathons page mounted");
    (async () => {
      await getHackathonInfos();
    })();
  }, []);

  const [isLoading, setIsLoading] = useState<boolean>(false)

  const [hackathons, setHackathons] = useState<HackathonCardProps[]>([]);

  const router = useRouter();

 
  const getHackathonInfos = async () => {
    try {
      setIsLoading(true)
      console.log("fetching hackathons...");
      const raw = await fetch("/api/hackathons", { method: "GET" });
      const res = await raw.json();
      console.log("hackathons response:", res);
      if (res && res.data) setHackathons(res.data as HackathonCardProps[]);
    } catch (err) {
      console.error("Error fetching hackathons:", err);
    } finally{
      setIsLoading(false)
    }
  };

  if(isLoading){
    return <Loader fullscreen/>
  }

  return (
    <>
      <div className="grid grid-cols-[1fr_2fr] h-screen ">
        <Aside />

        <div className="h-full overflow-y-auto pr-4 min-w-0 pt-12">
          {!hackathons
            ? "No Hackathons are open or Upcoming"
            : hackathons.map((hackathon) => {
                return (
                  <div
                    key={hackathon._id}
                    
                  >
                    <HackathonCard {...hackathon} btnText="View and Register" />
                  </div>
                );
              })}
        </div>
      </div>
    </>
  );
};

export default Page;
