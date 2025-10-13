import {User} from "@/models/user.model";
import dbConnect from "@/lib/dbConnect";
import { NextRequest, NextResponse } from "next/server";
import z from "zod";

const reqSchema = z.object({
  name: z.string().min(2).max(50),
  email: z.email(),
  password: z
    .string()
    .min(6, "Min length 6 required for password")
    .max(20, "Max length 20 for password"),
  confirmPassword: z
    .string()
    .min(6, "Min length 6 required for password")
    .max(20, "Max length 20 for password"),
});

export async function POST(req: NextRequest) {
  await dbConnect();
  try {
    const body = await req.json();
    console.log(body);
    const parsedBody = reqSchema.safeParse(body);

    if (!parsedBody.success) {
      return NextResponse.json(
        {
          error: "Invalid request body",
          success: false,
        },
        { status: 400 }
      );
    }

    const { name, email, password, confirmPassword } = parsedBody.data;

    if (password !== confirmPassword) {
      const error = "Password and confirm password are not equal";
      console.log(error);
      return NextResponse.json(
        {
          success: false,
          error: `Internal server error while signing up: ${error}`,
        },
        { status: 500 }
      );
    }

    const existUser = await User.findOne({ email });
    if (existUser) {
      console.log("User already exist with this email");
      return NextResponse.json(
        {
          success: false,
          error: "User already exists with this email",
        },
        { status: 400 }
      );
    }

    const user = await User.create({
      name,
      email,
    });

    if (!user) {
      console.error("User creation failed");
      return NextResponse.json(
        {
          success: false,
          error: "User creation failed",
        },
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "User created successfully",
        data: user,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error while signing Up", error);
    return NextResponse.json(
      {
        success: false,
        error: `Internal server error while signing up: ${error}`,
      },
      { status: 500 }
    );
  }
}
