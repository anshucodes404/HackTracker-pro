import mongoose, { Schema, Document } from "mongoose";
import jwt from "jsonwebtoken";

export interface IUser extends Document {
  name: string;
  githubUsername?: string;
  collegeEmail: string;
  email: string;
  rollno: number;
  otp?: number;
  otpExpiry: number;
  refreshToken: string;
  createdAt: Date;
  updatedAt: Date;
}

export const userSchema: Schema<IUser> = new Schema(
  {
    name: {
      type: String,
      required: true
    },
    githubUsername: {
      type: String,
    },
    collegeEmail: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    rollno: {
      type: Number,
    },
    otp: {
      type: Number,
    },
    otpExpiry: {
      type: Number,
      default: 3600,
    },
    refreshToken: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);


export const User =
  (mongoose.models.User as mongoose.Model<IUser>) ||
  mongoose.model("User", userSchema);
