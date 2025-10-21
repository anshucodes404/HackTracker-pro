
import dbConnect from "@/lib/dbConnect";
import jwtDecode from "@/lib/jwtDecode";
import { sendMessageToOCs } from "@/lib/sendMessageToOCs";
import { sendMessageToTeamLeads } from "@/lib/sendMessageToTeamLeads";
import { Hackathon } from "@/models/hackathon.model";
import { ApiResponse } from "@/utils/ApiResponse";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    await dbConnect();
    const { _id, name } = await (await jwtDecode(req)).json().then((res) => res.data);
    const { message, sendToParticipants, hackathonId } = await req.json();

    console.log(message);
    console.log(sendToParticipants + "   " + _id);

    if(sendToParticipants){
        const hackathon = await Hackathon.findById(hackathonId)

        if(!hackathon){
            return NextResponse.json(
                new ApiResponse(false, "Hackathon do not exists"),
                {status: 400}
            )
        }

        const msgSent = await sendMessageToTeamLeads(hackathon.participantsEmails, message, hackathon.hackathonName, name)
        
            if(!msgSent){
                return NextResponse.json(
                    new ApiResponse(false, "Message sending failed"),
                    {status: 500}
                )
            }
    } else {
        const hackathon = await Hackathon.findById(hackathonId)

        if(!hackathon){
            return NextResponse.json(
                new ApiResponse(false, "Hackathon do not exists"),
                {status: 400}
            )
        }

        const msgSent = await sendMessageToOCs(hackathon.OCEmails, message, hackathon.hackathonName, name)
        
            if(!msgSent){
                return NextResponse.json(
                    new ApiResponse(false, "Message sending failed"),
                    {status: 500}
                )
            }
    }

    return NextResponse.json(
      new ApiResponse(
        true,
        "Message recieved successfully",
        "",
        "Message recieved"
      ),
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
        new ApiResponse(false, "Something went wrong while sending message", "", error), {status: 500}
    )
  }
}
