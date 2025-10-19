import { NextRequest, NextResponse } from "next/server";
import { sendInviteEmail } from "@/lib/sendInviteEmail";
import { ApiResponse } from "@/utils/ApiResponse";

export async function POST(req: NextRequest) {
  const body = await req.json()

  const {hackathonName, teamName, teamId, leader, memberEmail} = body;

  if(!hackathonName || !teamName || !teamId || !leader){
    return NextResponse.json(new ApiResponse(false, "Details not enough"), { status: 400 });
  }

  const inviteLink = `http:localhost:3000/accept-invite/${teamId}`
  

  await sendInviteEmail(memberEmail,teamName,inviteLink, hackathonName, leader );

  return NextResponse.json(new ApiResponse(true, "Email sent successfully"), {status: 200});
}