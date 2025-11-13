"use client";
import Aside from "@/components/hackathons/Aside";
import HackathonCard from "@/components/landing/HackathonCard";
import type { HackathonCardProps } from "@/types/types";
import { useCallback, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Loader from "@/components/ui/Loader";

const Page = () => {
   const [isLoading, setIsLoading] = useState<boolean>(false);

   const [hackathons, setHackathons] = useState<HackathonCardProps[]>([]);

   const searchParams = useSearchParams();

   const getHackathonInfos = useCallback(async () => {
      try {
         setIsLoading(true);
         console.log("fetching hackathons...");

         const queryString = searchParams.toString();
         const url = queryString
            ? `/api/hackathons?${queryString}`
            : "/api/hackathons";

         const raw = await fetch(url, { method: "GET" });
         const res = await raw.json();
         console.log("hackathons response:", res);
         if (res?.data) setHackathons(res.data as HackathonCardProps[]);
      } catch (err) {
         console.error("Error fetching hackathons:", err);
      } finally {
         setIsLoading(false);
      }
   }, [searchParams]);

   useEffect(() => {
      getHackathonInfos();
   }, [getHackathonInfos]);

   return (
      <div className="grid grid-cols-[1fr_2fr] h-screen ">
         <Aside />

         <div className="h-full overflow-y-auto pr-4 min-w-0 pt-12 pb-8 ">
            {isLoading ? (
               <div className="h-full flex justify-center items-center">
                  <Loader size={500} />
               </div>
            ) : !hackathons || hackathons.length === 0 ? (
               <div className="h-full flex justify-center items-center">
                  <span className="text-2xl font-bold text-gray-400">
                     No Hackathons are published or Upcoming
                  </span>
               </div>
            ) : (
               hackathons.map((hackathon) => {
                  return (
                     <div key={hackathon._id}>
                        <HackathonCard
                           {...hackathon}
                           btnText="View and Register"
                        />
                     </div>
                  );
               })
            )}
         </div>
      </div>
   );
};

export default Page;
