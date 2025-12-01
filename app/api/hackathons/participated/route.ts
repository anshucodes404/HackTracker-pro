import dbConnect from "@/lib/dbConnect";
import jwtDecode from "@/lib/jwtDecode";
import { Hackathon } from "@/models/hackathon.model";
import { ApiResponse } from "@/utils/ApiResponse";
import { NextResponse } from "next/server";


export async function GET(){
    try {
        await dbConnect()
        const {_id} = await (await jwtDecode()).json().then(res => res.data);

        const hackathonsData = await Hackathon.find({participants: _id}).select("hackathonName startAt mode location organiserName status minTeamSize maxTeamSize _id bannerImage ");

    } catch (error) {
        return NextResponse.json(
            new ApiResponse(false, "Something went wrong", null, error)
        )
    }
}