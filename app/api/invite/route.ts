import { NextRequest, NextResponse } from "next/server";
import { sendInviteEmail } from "@/Emails/sendInviteEmail";
import { ApiResponse } from "@/utils/ApiResponse";
import jwtDecode from "@/lib/jwtDecode";
import { Team } from "@/models/team.model";
import dbConnect from "@/lib/dbConnect";
import { Invite } from "@/models/invite.model";

export async function POST(req: NextRequest) {

  try {
    console.log("Request")
    await dbConnect()
    const body = await req.json()
    console.log(body)
  
    const { _id, name, collegeEmail } = await (await jwtDecode(req)).json().then(res => res.data)
  
    const { hackathonId, membersEmail, hackathonName, rules } = body;
  
    if (!hackathonId || !membersEmail || !hackathonName || !Array.isArray(membersEmail)) {
      return NextResponse.json(new ApiResponse(false, "Details not enough"), { status: 400 });
    }
  
    const teamDetails = await Team.findOne({ leader: _id, hackathonId }).populate("hackathonId").exec()
    console.log(teamDetails)
  
    if (!teamDetails) {
      return NextResponse.json(new ApiResponse(false, "Team not found"), { status: 404 })
    }

    const InviteData = {
      teamId: teamDetails._id,
      hackathonName: teamDetails.hackathonName,
      tagline: teamDetails.hackathonId.tagline,
      teamName: teamDetails.name,
      inviterName: name,
      inviterEmail: collegeEmail,
      rules: rules?.split(",")
    }


    const invite = await Invite.create(InviteData)

    if(!invite){
      return NextResponse.json(
        new ApiResponse(false, "Invitation failed"), {status: 500}
      )
    }

    const teamMembersEmail = membersEmail.map((email: string) => email.toLowerCase().concat("@kiit.ac.in"))
  
    const { name: teamName, _id: teamId } = teamDetails
  
  
    const inviteLink = `localhost:3000/accept-invite/${teamId}`
  
  
    await sendInviteEmail(teamMembersEmail, teamName, inviteLink, hackathonName, name);
  
    return NextResponse.json(new ApiResponse(true, "Email sent successfully"), { status: 200 });
  } catch (error) {
    console.error(error)
     return NextResponse.json(new ApiResponse(false, "Email sending failed", "", error), { status: 500 });
  }
}


export async function GET(req: NextRequest){
  try {
    await dbConnect()
    const {teamId} = await req.json()

    if(!teamId){
      return NextResponse.json(
        new ApiResponse(false, "Team ID is missing"), {status: 400}
      )
    }

    const teamData = await Invite.findById(teamId).select("-expiresAt -createdAt")

    if(!teamData){
      return NextResponse.json(
        new ApiResponse(false, "Invitation not found"), {status: 500}
      )
    }

    return NextResponse.json(
      new ApiResponse(true, "Team Data Fetched", teamData), {status: 200}
    )








  } catch (error) {
    
  }
}