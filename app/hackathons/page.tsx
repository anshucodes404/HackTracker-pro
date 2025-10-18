"use client";
import Aside from "@/components/hackathons/Aside";
import HackathonCard from "@/components/landing/HackathonCard";
import { HackathonCardProps } from "@/types/types";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const Page = () => {
  useEffect(() => {
    console.log("Hackathons page mounted");
    (async () => {
      await getHackathonInfos();
    })();
  }, []);

  const [hackathons, setHackathons] = useState<HackathonCardProps[]>([]);

  const router = useRouter();

  const redirectToDetailedPage = (_id: string) => {
    if (!_id) return;
    router.push(`/hackathons/${_id}`);
  };

  const getHackathonInfos = async () => {
    try {
      console.log("fetching hackathons...");
      const raw = await fetch("/api/hackathons", { method: "GET" });
      const res = await raw.json();
      console.log("hackathons response:", res);
      if (res && res.data) setHackathons(res.data as HackathonCardProps[]);
    } catch (err) {
      console.error("Error fetching hackathons:", err);
    }
  };

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
                    onClick={() =>
                      redirectToDetailedPage(hackathon._id as string)
                    }
                    key={hackathon._id}
                    className="cursor-pointer"
                  >
                    <HackathonCard {...hackathon} />
                  </div>
                );
              })}
        </div>
      </div>
    </>
  );
};

export default Page;
