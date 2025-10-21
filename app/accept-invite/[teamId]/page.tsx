"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";


async function fetchInviteDetails(teamId: string) {

  return {
    hackathonName: "HackHub Spring Challenge",
    hackathonDescription: "Build something amazing in 48 hours!",
    teamName: "Innovators",
    inviterName: "Anshu Kumar",
    inviterEmail: "anshu@example.com",
    deadline: "2025-10-31",
    rules: [
      "Teams must have 3-5 members.",
      "All code must be original.",
      "Respect the hackathon timeline.",
    ],
  };
}
 function Page({ params }: { params: { teamId: string } }) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [invite, setInvite] = useState<any>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    async function load() {
      try {
        const data = await fetchInviteDetails(params.teamId);
        setInvite(data);
      } catch (error) {
        console.log(error)
        setError("Invalid or expired invitation link.");
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [params.teamId]);

  const handleAccept = () => {
    // TODO: Call accept API, then redirect
    alert("Invitation accepted!");
    router.push("/dashboard");
  };

  const handleDecline = () => {
    // TODO: Call decline API, then redirect
    alert("Invitation declined.");
    router.push("/");
  };

  if (loading)
    return (
      <div className="flex items-center justify-center h-screen">
        Loading...
      </div>
    );
  if (error)
    return (
      <div className="flex items-center justify-center h-screen text-red-500">
        {error}
      </div>
    );

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-indigo-100 to-white">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8 mx-4">
        <h1 className="text-2xl font-bold text-indigo-700 mb-2 text-center">
          {invite.hackathonName}
        </h1>
        <p className="text-gray-600 text-center mb-4">
          {invite.hackathonDescription}
        </p>
        <div className="bg-indigo-50 rounded-lg p-4 mb-4">
          <div className="mb-2">
            <span className="font-semibold text-indigo-600">Team:</span>{" "}
            {invite.teamName}
          </div>
          <div>
            <span className="font-semibold text-indigo-600">Invited by:</span>{" "}
            {invite.inviterName} (
            <a
              href={`mailto:${invite.inviterEmail}`}
              className="underline text-indigo-500"
            >
              {invite.inviterEmail}
            </a>
            )
          </div>
        </div>
        <div className="mb-4">
          <div className="font-semibold text-gray-700 mb-1">Deadline:</div>
          <div className="text-sm text-gray-500 mb-2">{invite.deadline}</div>
          <div className="font-semibold text-gray-700 mb-1">Rules:</div>
          <ul className="list-disc list-inside text-sm text-gray-600">
            {invite.rules.map((rule: string, idx: number) => (
              <li key={idx}>{rule}</li>
            ))}
          </ul>
        </div>
        <div className="flex gap-4 mt-6">
          <button
            className="flex-1 py-2 px-4 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition"
            onClick={handleAccept}
          >
            Accept Invitation
          </button>
          <button
            className="flex-1 py-2 px-4 bg-gray-200 text-gray-700 rounded-lg font-semibold hover:bg-gray-300 transition"
            onClick={handleDecline}
          >
            Decline
          </button>
        </div>
      </div>
    </div>
  );
}

export default Page