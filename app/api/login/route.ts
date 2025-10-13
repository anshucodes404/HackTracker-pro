import dbConnect from "@/lib/dbConnect";
import { NextRequest, NextResponse } from "next/server";
import z from "zod";
import {User} from "@/models/user.model";
import { IUser } from "@/models/user.model";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

const reqSchema = z.object({
  email: z.email(),
  
});

export async function GET(req: NextRequest) {
  try {
    await dbConnect();

    const body = await req.json();
    const parsedBody = reqSchema.safeParse(body);

    if (!parsedBody.success) {
      console.error("Invalid Input");
      return NextResponse.json(
        {
          success: false,
          error: "Invalid Input",
        },
        { status: 400 }
      );
    }

    const { email } = parsedBody.data;

    const user = (await User.findOne({ email })) as IUser;
    console.log(user);
    if (!user) {
      console.error("User not found");
      return NextResponse.json(
        {
          success: false,
          error: "User not found with this email",
        },
        { status: 404 }
      );
    }


    if (!process.env.SECRET_KEY) {
      console.error("Secret key not found");
      return;
    }

    const options = {
      httpOnly: true,
      secure: true,
    };

    const accessToken = user.generateAccessToken()

    const response =  NextResponse.json(
      {
        success: true,
        message: "User logged in successfully",
        data: user,
      },
      { status: 200 }
    );

    response.cookies.set("accessToken", accessToken)
  } catch (error) {
    console.error("Failure while logging in");
    return NextResponse.json(
      {
        success: false,
        error: `Log in failed: ${error}`,
      },
      { status: 404 }
    );
  }
}
