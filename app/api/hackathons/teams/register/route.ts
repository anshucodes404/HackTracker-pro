import dbConnect from "@/lib/dbConnect";
import jwtDecode from "@/lib/jwtDecode";
import { Hackathon } from "@/models/hackathon.model";
import { ApiResponse } from "@/utils/ApiResponse";
import { NextRequest, NextResponse } from "next/server";
import { User } from "@/models/user.model";


export async function POST(req: NextRequest){
    
    try {
        await dbConnect()

        const decodedUser = await (await jwtDecode(req)).json()
        console.log(decodedUser)

        const {name, teamId} = await req.json()

        if(!teamId){
            return NextResponse.json(
                new ApiResponse(false, "Team ID is missing"),
                {status: 400}
            ) 
        }

        console.log(name)
        if(!name){
            console.error("Team name is missing!!!")
            return NextResponse.json(
                new ApiResponse(false, "Team name is missing"),
                {status: 400}
            )
        }

        const hackathon = await Hackathon.findById(teamId)
        const user = await User.findById(decodedUser._id)

        console.log(hackathon)
        console.log(user)






        
        
    
        return NextResponse.json(
            new ApiResponse(true, "Team registered successfully"),
            {status: 201}
        )
    } catch (error) {
        
    }
}