import mongoose, { Schema, Document } from "mongoose";
import jwt from "jsonwebtoken";

export interface IUser extends Document {
  name: string;
  username: string;
  collegeId: string;
  email: string;
  rollno: number;
  otp?: number;
  otpExpiry: number;
  refreshToken: string;
  createdAt: Date;
  updatedAt: Date;
  generateAccessToken(): string;
}

export const userSchema: Schema<IUser> = new Schema(
  {
    name: {
      type: String,
      required: true
    },
    username: {
      type: String,
      required: true,
      unique: true,
    },
    collegeId: {
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

userSchema.methods.generateAccessToken = function (): string {
  const payload = {
    _id: this._id,
    username: this.username,
    email: this.email,
  };

  const secret = process.env.ACCESS_TOKEN_SECRET as string;
  const options: jwt.SignOptions = {
    expiresIn: process.env
      .ACCESS_TOKEN_EXPIRY_DATE as jwt.SignOptions["expiresIn"],
  };

  return jwt.sign(payload, secret, options);
};

export const User =
  (mongoose.models.User as mongoose.Model<IUser>) ||
  mongoose.model("User", userSchema);
