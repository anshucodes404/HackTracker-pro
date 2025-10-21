"use client";

import React, { useEffect, useState } from "react";
import { CalendarDays, Users, Globe, MapPin } from "lucide-react";
import { useParams } from "next/navigation";
import { DetailedHackathon } from "@/types/types";
import Image from "next/image";
import Link from "next/link";
import TeamRegister from "@/components/hackathons/TeamRegister";
// import SendMessagetoParticipants from "@/components/hackathons/SendMessage";

export default function Page() {
  const params = useParams();
  const slug = params?.slug as string;
  const [hackathon, setHackathon] = useState<DetailedHackathon | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!slug) {
      setLoading(false);
      setError("Missing slug");
      return;
    }

    const getHackathonData = async () => {
      try {
        const res = await fetch(`/api/hackathons/${slug}`, {
          method: "GET",
        }).then((res) => res.json());

        if (!res?.success) {
          setError("Hackathon not found");
          return;
        }
console.log(res.data)
        setHackathon(res.data as DetailedHackathon);
      } catch (error) {
        setError((error as Error).message || String(error));
      } finally {
        setLoading(false);
      }
    };

    getHackathonData();
  }, [slug]);

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto px-6 py-10">
        <p className="text-gray-600">Loading hackathon...</p>
      </div>
    );
  }

  if (error || !hackathon) {
    return (
      <div className="max-w-6xl mx-auto px-6 py-10">
        <h2 className="text-2xl font-semibold mb-4">Hackathon not found</h2>
        <p className="text-gray-600">{error ?? "No data available."}</p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-6 py-10 mt-12">
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
          <CalendarDays size={16} />{" "}
          <span>
            {new Date(hackathon.startAt).toLocaleDateString()} —{" "}
            {hackathon.duration}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <Users size={16} />{" "}
          <span>
            Team Size: {hackathon.minTeamSize}–{hackathon.maxTeamSize}
          </span>
        </div>
        <div className="flex items-center gap-2">
          {hackathon.mode === "online" ? (
            //TODO: Add the location if In place and online for online
            <Globe size={16} />
          ) : (
            <MapPin size={16} />
          )}
          <span className="capitalize">{hackathon.mode}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
        <div className="md:col-span-2 space-y-8">
          <section>
            <h2 className="text-xl font-semibold mb-2">About the Hackathon</h2>
            <p className="text-gray-700 leading-relaxed">
              {hackathon.description}
            </p>
          </section>

          {hackathon.rules && (
            <section>
              <h2 className="text-xl font-semibold mb-2">Rules & Guidelines</h2>
              <p className="text-gray-700 whitespace-pre-line">
                {hackathon.rules}
              </p>
            </section>
          )}

          <section>
            <h2 className="text-xl font-semibold mb-2">Eligibility</h2>
            <p className="text-gray-700">{hackathon.criteria}</p>
          </section>

          {hackathon.tags && (
            <section>
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

        <div>
          {/* <SendMessagetoParticipants hackathonId={slug}/> */}
          <TeamRegister
            registrationDeadline={hackathon.registrationDeadline}
            hackathonId={slug as string}
          />
        </div>
      </div>
    </div>
  );
}
