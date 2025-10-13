import { IUser, User } from "@/models/user.model";
import dbConnect from "@/lib/dbConnect";
import { NextRequest, NextResponse } from "next/server";
import z from "zod";
import { ApiResponse } from "@/utils/ApiResponse";
import { OTP } from "@/models/otp.model";
import jwt, { SignOptions } from "jsonwebtoken"

const logInSchema = z.object({
  collegeEmail: z.email(),
  otp: z.string().length(6),
  mode: z.enum(["login", "signup"]),
});

const signUpSchema = z.object({
  name: z.string().min(2).max(50),
  githubUsername: z.string().optional(),
  collegeEmail: z.email(),
  email: z.email(),
  otp: z.string().length(6),
  mode: z.enum(["login", "signup"]),
});

export async function POST(req: NextRequest) {
  let user: IUser | null
  await dbConnect();
  try {
    const body = await req.json();
    console.log(body);

    const mode = body.mode;

    if (mode === "login") {
      const parsedBody = logInSchema.safeParse(body);

      if (!parsedBody.success) {
        return NextResponse.json(
          new ApiResponse(false, "Invalid request body"),
          {
            status: 400,
          }
        );
      }

      const { collegeEmail, otp } = parsedBody.data;

      const otpDoc = await OTP.findOne({ collegeEmail });

      if (otp != otpDoc.otp) {
        return NextResponse.json(new ApiResponse(false, "OTP does not match"), {
          status: 400,
        });
      }

      user = await User.findOne({ collegeEmail });
    } else {
      const parsedBody = signUpSchema.safeParse(body);

      if (!parsedBody.success) {
        return NextResponse.json(
          new ApiResponse(false, "Invalid request body"),
          {
            status: 400,
          }
        );
      }

      const { name, collegeEmail, email, githubUsername, otp } = parsedBody.data;

      const otpDoc = await OTP.findOne({ collegeEmail });

      if (otp != otpDoc.otp) {
        return NextResponse.json(new ApiResponse(false, "OTP does not match"), {
          status: 400,
        });
      }

      const rollno = collegeEmail.split("@")[0];

      user = await User.create({
        name,
        githubUsername,
        collegeEmail,
        email,
        rollno,
      });

      if (!user) {
        return NextResponse.json(new ApiResponse(false, "Signing up failed"), {
          status: 500,
        });
      }
    }

    //Now Isssuing tokens

    const payload: jwt.JwtPayload = {
        _id: user?._id,
        collegeEmail: user?.collegeEmail,
    }
    const secret = process.env.JWT_TOKEN_SECRET as string
    const expiry = {
        expiresIn: process.env.JWT_TOKEN_EXPIRY_DATE as SignOptions["expiresIn"]
    }

    const token = jwt.sign(payload, secret, expiry)

    const response = NextResponse.json(new ApiResponse(true, "Authentication successfull", user), {status: 200})

    response.cookies.set("Token", token, {httpOnly: true, secure: true})

    return response

  } catch (error) {
    console.error("Error while Authenticating", error);
    return NextResponse.json(
      new ApiResponse(false, "Error while Authenticating", "", error),
      { status: 500 }
    );
  }
}
