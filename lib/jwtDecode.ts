import { ApiResponse } from "@/utils/ApiResponse";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken"


export default async function jwtDecode(req: NextRequest){

   try {
    console.log("Jwt decode request")
     const cookieToken = (await cookies()).get("Token")?.value

     const headerToken = req.headers.get("Authorization")?.split(" ")[1]


     const token = cookieToken || headerToken

     if(!token){
        console.error("NO token provided")
         return NextResponse.json(
             new ApiResponse(false, "Token is not valid, Please Login!!", null),
             {status: 302}
         )
     }
 
     const decoded = jwt.verify(token, process.env.JWT_TOKEN_SECRET as string)

     if(!decoded){
        console.error("No decoded made")
     }
 
     console.log(decoded)
     return NextResponse.json(
         new ApiResponse(true, "Decoded successfully", decoded)
     )
   } catch (error) {
    return NextResponse.json(
        new ApiResponse(false, "Something went wrong while verifying JWT", "",  error)
    )
   }

}