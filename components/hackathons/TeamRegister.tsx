import React, { FormEvent, useState } from "react";
import { Button, Input } from "../ui";

const TeamRegister = ({
  registrationDeadline,
  teamId
}: {
  registrationDeadline: Date, teamId: string
}) => {

    const [teamName, setTeamName] = useState<string>("")

    const handleSubmit = async () => {
        const res = await fetch("/api/hackathons/teams/register", 
            {
                method: "POST",
                body: JSON.stringify({name: teamName, teamId})
            }
        ).then(res => res.json())

        console.log(res)
        console.log(res.message)
        console.log(res.data)
    }
  return (
    <div className="bg-white shadow-md border border-gray-200 rounded-xl p-6 sticky top-20">
      <h2 className="text-xl font-semibold mb-4">
        Register for this Hackathon
      </h2>
      <div
        onSubmit={handleSubmit}
        className="space-y-4"
      >
        <div>
          <Input
            label="Team Name"
            type="text"
            name="teamName"
            value={teamName}
            onChange={(e) => setTeamName(e.target.value)}
            required
            placeholder="Enter your team name"
          />
        </div>

        <Button
          type="submit"
          className="w-full"
          onClick={handleSubmit}
        >
          Register as Team Lead
        </Button>
      </div>
      <p className="text-xs text-gray-500 mt-3">
        Registration closes on{" "}
        <strong>{new Date(registrationDeadline).toLocaleDateString()}</strong>
      </p>
    </div>
  );
};

export default TeamRegister;
