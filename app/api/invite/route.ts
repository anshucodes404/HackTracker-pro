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
  
    const { _id, name, collegeEmail } = await (await jwtDecode()).json().then(res => res.data)
  
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
      rules: rules?.split(","),
      expiresAt: new Date(Date.now() + 96 * 60 * 60 * 1000) // 4 day timing set after invitation
    }


    const invite = await Invite.create(InviteData)

    if(!invite){
      return NextResponse.json(
        new ApiResponse(false, "Invitation failed"), {status: 500}
      )
    }

    const teamMembersEmail = membersEmail.map((email: string) => email.toLowerCase().concat("@kiit.ac.in"))
  
    const { name: teamName } = teamDetails
  
  
    const inviteLink = `http://localhost:3000/accept-invite/${invite._id}`
  
  
    await sendInviteEmail(teamMembersEmail, teamName, inviteLink, hackathonName, name);
  
    return NextResponse.json(new ApiResponse(true, "Email sent successfully"), { status: 200 });
  } catch (error) {
    console.error(error)
     return NextResponse.json(new ApiResponse(false, "Email sending failed", "", error), { status: 500 });
  }
}


export async function GET(req: NextRequest){
  console.log("Request recieved")
  try {
    await dbConnect()
    const searchParams = req.nextUrl.searchParams
    const inviteId = searchParams.get("inviteId")

    if(!inviteId){
      return NextResponse.json(
        new ApiResponse(false, "Team ID is missing"), {status: 400}
      )
    }

    const InviteData = await Invite.findById(inviteId).select("-expiresAt -createdAt")

    if(!InviteData){
      return NextResponse.json(
        new ApiResponse(false, "Invitation not found"), {status: 500}
      )
    }

    return NextResponse.json(
      new ApiResponse(true, "Team Data Fetched", InviteData), {status: 200}
    )

  } catch (_) {
    return NextResponse.json(
      new ApiResponse(false, "Something went wrong while fetching invitation data")
    )
  }
}