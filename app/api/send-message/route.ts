import dbConnect from "@/lib/dbConnect";
import jwtDecode from "@/lib/jwtDecode";
import { ApiResponse } from "@/utils/ApiResponse";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest){
    try {
        await dbConnect()
        const {_id} = await(await jwtDecode(req)).json().then(res => res.data)
        const {message, sendToParticipants} = await req.json()
        console.log(message)
        console.log(sendToParticipants + "   " + _id)

        return NextResponse.json(
            new ApiResponse(false, "Message recieved successfully", "", "Message recieved"),
            {status: 200}
        )
    } catch (error) {
        
    }
}