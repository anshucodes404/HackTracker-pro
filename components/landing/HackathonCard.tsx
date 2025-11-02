
import { Button } from "../ui";
import type { HackathonCardProps } from "@/types/types";
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
  // biome-ignore lint/suspicious/noShadowRestrictedNames: <>
  Map
} from "lucide-react";
import { usePathname, useRouter } from "next/navigation";


const HackathonCard = ({
  _id,
  hackathonName,
  mode,
  location,
  tagline,
  organiserName,
  duration,
  minTeamSize,
  maxTeamSize,
  startAt,
  registrationDeadline,
  tags,
  participants,
  prize,
  status,
  bannerImage,
  btnText
}: HackathonCardProps) => {

  const router = useRouter()
  const path = usePathname()

    const redirectToDetailedPage = () => {
    if (!_id) return;
    
    if(path === "/hackathons"){
      router.push(`/hackathons/${_id}`);
    } else {
      router.push(`/hosted-hackathons/${_id}`)
    }
  };


  return (
    <div className=" rounded-lg text-sm border border-gray-200/70 transition-colors shadow-md hover:bg-gray-200/80 hover:shadow-md mt-8 p-6 grid grid-cols-1 lg:grid-cols-[100px_2fr_1fr] h-52 max-w-5/6 overflow-y-hidden ">
      <section className="lg:block hidden">
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
           { mode === "online" ? (<span className="flex gap-2 mt-2 items-center">
              <Globe className="size-4" />
              {mode}
            </span> ) : 
             (<span className="flex gap-2 mt-2 items-center">
              <Map size={4} />
              {location}
            </span>)}
            <span className="flex gap-2 mt-2 items-center">
              <Users className="size-4" />
              {`${participants?.length} Teams`}
            </span>
          </div>
        </div>

        <div className="mr-10 mt-4">
          <Button onClick={redirectToDetailedPage} className="w-full cursor-pointer">{btnText}</Button>
        </div>
      </section>
      <section className="hidden lg:block">
        <div className="flex gap-2 mt-2 items-center">
          <Flag className="size-4" />
          <span>{organiserName}</span>
        </div>
        <div className="flex gap-2 mt-2 items-center">
          <Calendar className="size-4" />
          {new Date(startAt).toLocaleDateString()}
        </div>
        <div className="flex gap-2 mt-2 items-center">
          <CalendarClock className="size-4" />
          {new Date(registrationDeadline).toLocaleDateString()}
        </div>
        <div className="flex gap-2 mt-2 items-center">
          <Clock className="size-4" />
          {duration}
        </div>
        <div className="flex gap-2 mt-2 items-center flex-wrap">
          <Tags className="size-4" />
          {tags.map((tag, index) => {
            // biome-ignore lint/suspicious/noArrayIndexKey: <>
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
        <span>{status.toUpperCase()}</span>
      </span>
    );
  } 
   if (status === "published") {
    return (
      <span className="w-1/2 bg-gray-400 text-black px-4 py-1 rounded-full ">
        <span>{status.toUpperCase()}</span>
      </span>
    );
  } 
   if (status === "ended") {
    return (
      <span className="w-1/2 bg-[#b41313] text-white px-4 py-1 rounded-full ">
        <span>{status.toUpperCase()}</span>
      </span>
    );
  } 
  
}

export default HackathonCard;
