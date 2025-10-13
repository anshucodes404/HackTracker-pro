import dbConnect from "@/lib/dbConnect";
import { sendOTP } from "@/lib/sendOtpEmail";
import { OTP } from "@/models/otp.model";
import { IUser, User } from "@/models/user.model";
import { ApiResponse } from "@/utils/ApiResponse";
import { NextRequest, NextResponse } from "next/server";
import z from "zod";

const reqSchema = z.object({
  collegeEmail: z.email(),
});

export async function POST(req: NextRequest) {
  const body = await req.json();

  const parsedBody = reqSchema.safeParse(body);
  if (!parsedBody.success) {
    return NextResponse.json(new ApiResponse(false, "Email is missing"), {
      status: 400,
    });
  }

  const { collegeEmail } = parsedBody.data;

  await dbConnect();

  try {
    const existingUser: IUser | null = await User.findOne({ collegeEmail });
    const mode = existingUser ? "login" : "signup";

    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    await OTP.deleteMany({ collegeEmail });

    await OTP.create({
      collegeEmail,
      otp,
      expiresAt: new Date(Date.now() + 5 * 60 * 1000),
    });

    await sendOTP(collegeEmail, otp, mode, existingUser);

    return NextResponse.json(
      new ApiResponse(true, `OTP sent successfully to email ${collegeEmail}`, {
        mode,
      }), {status: 200}
    );
  } catch (error) {
    console.error("Error occured while sending otp");
    return NextResponse.json(
      new ApiResponse(false, "Error occured while sending otp", "", error), {status: 500}
    );
  }
}
