import dbConnect from "@/lib/dbConnect";
import jwtDecode from "@/lib/jwtDecode";
import { Hackathon } from "@/models/hackathon.model";
import { ApiResponse } from "@/utils/ApiResponse";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, {params}: {params:Promise< {_id: string}>}){
    try {
        const {_id} = await params
        console.log("Request received")
        const {collegeEmail} = await (await jwtDecode()).json().then(res => res.data)
        await dbConnect()
        
        const hackathon = await Hackathon.findById(_id)
        if(!hackathon){
            console.error("No hackathon found")
            return NextResponse.json(
                new ApiResponse(false, "No Hackathon found corresponding this ID"),
                {status: 500}
            )
        }

        //FIXME: change the logic for registered b/c now it's only for leader
        
        const registered = hackathon.participantsEmails?.includes(collegeEmail)

        return NextResponse.json(
            new ApiResponse(true, "Hackathon corresponding the ID found", {...hackathon.toObject(), registered}),
            {status: 200},
        )

    } catch (error) {
        console.error("Error occured while searching the hackathon")
        return NextResponse.json(
            new ApiResponse(false, "Something went wrong", "", error),
            {status: 500}
        )
    }
}