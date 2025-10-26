import { NextRequest, NextResponse } from "next/server";
import { sendInviteEmail } from "@/lib/sendInviteEmail";
import { ApiResponse } from "@/utils/ApiResponse";
import jwtDecode from "@/lib/jwtDecode";
import { Team } from "@/models/team.model";
import dbConnect from "@/lib/dbConnect";

export async function POST(req: NextRequest) {

  try {
    console.log("Request")
    await dbConnect()
    const body = await req.json()
    console.log(body)
  
    const { _id, name } = await (await jwtDecode(req)).json().then(res => res.data)
  
    const { hackathonId, membersEmail, hackathonName } = body;
  
    if (!hackathonId || !membersEmail || !hackathonName || !Array.isArray(membersEmail)) {
      return NextResponse.json(new ApiResponse(false, "Details not enough"), { status: 400 });
    }
  
    const teamDetails = await Team.findOne({ leader: _id, hackathonId })
    console.log(teamDetails)
  
    if (!teamDetails) {
      return NextResponse.json(new ApiResponse(false, "Team not found"), { status: 404 })
    }
  
    const teamMembersEmail = membersEmail.map((email: string) => email.toLowerCase().concat("@kiit.ac.in"))
  
    const { name: teamName, _id: teamId } = teamDetails
  
  
    const inviteLink = `http:localhost:3000/accept-invite/${teamId}`
  
  
    await sendInviteEmail(teamMembersEmail, teamName, inviteLink, hackathonName, name);
  
    return NextResponse.json(new ApiResponse(true, "Email sent successfully"), { status: 200 });
  } catch (error) {
    console.error(error)
     return NextResponse.json(new ApiResponse(false, "Email sending failed", "", error), { status: 500 });
  }
}