import { CalendarDays, Globe, MapPin, Users } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const HackathonDetails = ({ hackathon }) => {
   return (
      <div>
         <div className="w-full h-64 md:h-80 rounded-2xl overflow-hidden mb-10 shadow">
            <Image
               width={300}
               height={100}
               src={hackathon.bannerImage || "/placeholder-banner.jpg"}
               alt={hackathon.hackathonName}
               className="w-full h-full object-cover"
            />
         </div>
         <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
            <div>
               <h1 className="text-3xl font-bold text-gray-900">
                  {hackathon.hackathonName}
               </h1>
               {hackathon.tagline && (
                  <p className="text-gray-600 mt-1">{hackathon.tagline}</p>
               )}
            </div>
            <span
               className={`px-4 py-1 rounded-full text-sm font-semibold ${
                  hackathon.status === "open"
                     ? "bg-green-100 text-green-700"
                     : hackathon.status === "upcoming"
                       ? "bg-yellow-100 text-yellow-700"
                       : hackathon.status === "ended"
                         ? "bg-red-100 text-red-700"
                         : "bg-gray-200 text-gray-700"
               }`}
            >
               {hackathon.status?.toUpperCase()}
            </span>
         </div>
         <div className="flex flex-wrap gap-4 text-sm text-gray-700 mb-10">
            <div className="flex items-center gap-2">
               <CalendarDays size={16} />
               <span>
                  {new Date(hackathon.startAt).toLocaleDateString()} —{" "}
                  {hackathon.duration}
               </span>
            </div>
            <div className="flex items-center gap-2">
               <Users size={16} />
               <span>
                  Team Size: {hackathon.minTeamSize}–{hackathon.maxTeamSize}
               </span>
            </div>

            {hackathon.mode === "online" ? (
               <div className="flex items-center gap-2">
                  <Globe size={16} />
                  <span className="capitalize">{hackathon.mode}</span>
               </div>
            ) : (
               <div className="flex items-center gap-2">
                  <MapPin size={16} />
                  <span className="capitalize">
                     {hackathon?.location ?? "No Location Provided"}
                  </span>
               </div>
            )}
         </div>
         <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-12">
            <div className="md:col-span-2 space-y-8 border-r border-gray-400">
               <section>
                  <h2 className="text-xl font-semibold mb-2">
                     About the Hackathon
                  </h2>
                  <p className="text-gray-700 leading-relaxed">
                     {hackathon.description}
                  </p>
               </section>

               {hackathon.rules && (
                  <section>
                     <h2 className="text-xl font-semibold mb-2">
                        Rules & Guidelines
                     </h2>
                     <p className="text-gray-700 whitespace-pre-line">
                        {hackathon.rules}
                     </p>
                  </section>
               )}

               <section>
                  <h2 className="text-xl font-semibold mb-2">Eligibility</h2>
                  <p className="text-gray-700">{hackathon.criteria}</p>
               </section>
            </div>

            <div>
               {hackathon.tags && (
                  <section className="mb-8">
                     <h2 className="text-xl font-semibold mb-2">Tags</h2>
                     <div className="flex flex-wrap gap-2">
                        {hackathon.tags.map((tag: string) => (
                           <span
                              key={tag}
                              className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm"
                           >
                              {tag}
                           </span>
                        ))}
                     </div>
                  </section>
               )}

               <section>
                  <h2 className="text-xl font-semibold mb-2">Useful Links</h2>
                  <div className="flex flex-col gap-2">
                     {hackathon.webSiteLink && (
                        <Link
                           href={hackathon.webSiteLink}
                           target="_blank"
                           className="text-blue-600 hover:underline"
                        >
                           🌐 Official Website
                        </Link>
                     )}
                     {hackathon.socialLink && (
                        <Link
                           href={hackathon.socialLink}
                           target="_blank"
                           className="text-blue-600 hover:underline"
                        >
                           🔗 Social Media
                        </Link>
                     )}
                  </div>
               </section>
            </div>
         </div>
         
      </div>
   );
};

export default HackathonDetails;
