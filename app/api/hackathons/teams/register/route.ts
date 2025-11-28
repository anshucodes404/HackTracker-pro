import dbConnect from "@/lib/dbConnect";
import jwtDecode from "@/lib/jwtDecode";
// import { Hackathon } from "@/models/hackathon.model";
import { ApiResponse } from "@/utils/ApiResponse";
import { NextRequest, NextResponse } from "next/server";
// import { User } from "@/models/user.model";
import { Team } from "@/models/team.model";
import { Hackathon } from "@/models/hackathon.model";

export async function POST(req: NextRequest) {
  try {
    await dbConnect();

    const decodedUser = await (await jwtDecode()).json();
    console.log(decodedUser);

    const { name, hackathonId, hackathonName } = await req.json();

    if (!hackathonId) {
      return NextResponse.json(new ApiResponse(false, "Team ID is missing"), {
        status: 400,
      });
    }

    console.log(name);
    if (!name) {
      console.error("Team name is missing!!!");
      return NextResponse.json(new ApiResponse(false, "Team name is missing"), {
        status: 400,
      });
    }

    //? Be it commented for now will use later when to take all details of the team Members for then work with decoded data

    const team = {
      name,
      hackathonId,
      hackathonName,
      leader: decodedUser.data._id,
      members: [
        {
          userId: decodedUser.data._id,
          role: "leader",
          name: decodedUser.data.name,
          collegeEmail: decodedUser.data.collegeEmail,
          joinedAt: Date.now(),
        },
      ],
    };

    console.log(team.members);

    const teamRegistered = await Team.create(team);

    if (!teamRegistered) {
      console.error("Team registration failed");
      return NextResponse.json(
        new ApiResponse(false, "Team registeration failed"),
        { status: 500 }
      );
    }

    const hackathon = await Hackathon.findByIdAndUpdate(hackathonId, {
      $push: {participants: teamRegistered._id, participantsEmails: decodedUser.data.collegeEmail}  //here participants is the team and the participants Email is the team lead college Email
    })

    if(!hackathon){
      console.error("Team not registered")
      return NextResponse.json(
        new ApiResponse(false, "Team registeration failed"),
        {status: 500}
      )
    }

    return NextResponse.json(
      new ApiResponse(true, "Team registered successfully", teamRegistered),
      { status: 201 }
    );
  } catch (error) {
    console.log(error);
  }
}
