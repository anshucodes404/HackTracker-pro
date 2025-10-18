import dbConnect from "@/lib/dbConnect"
import { Hackathon } from "@/models/hackathon.model"
import { ApiResponse } from "@/utils/ApiResponse"
import { NextResponse } from "next/server"

//  {
//     _id: new ObjectId('68f073ad14b6abe6d785bfda'),
//     hackathonName: 'jhdbfjvhdjh',
//     tagline: 'jhdfhvdery',
//     description: 'hvhdrgfhegr',
//     paricipants: [],
//     startAt: 2025-10-18T04:24:00.000Z,
//     duration: '23hr',
//     registrationDeadline: 2025-10-31T00:00:00.000Z,
//     minTeamSize: 4,
//     maxTeamSize: 6,
//     criteria: 'edrget',
//     organiserEmail: 'jeurygueyr@gmail.com',
//     socialLink: 'mjsndvjkdsj',
//     webSiteLink: 'jhbdjsrfjer',
//     tags: [ 'vhdjrfgjyger', ' hdfjhgedr', ' bdhfbjder', ' jdbfjhd' ],
//     status: 'published',
//     createdAt: 2025-10-16T04:25:17.779Z,
//     updatedAt: 2025-10-16T04:25:17.779Z,
//     __v: 0
//   }

export async function GET(req: Request){
    console.log("Hackathon call recieved")
await dbConnect()
    const hackathons = await Hackathon.find({status: {$nin: ["ended","draft"]}}).select("-description -criteria -organiserEmail -socialLink -webSiteLink -createdAt -updatedAt -__v")
    console.log(hackathons)
    return NextResponse.json(
        new ApiResponse(true, "Hackathon call recieved", hackathons),
        {status: 200}
    )
}