import mongoose, { Schema, Document } from "mongoose";

export interface IUser extends Document {
  name: string;
  githubUsername?: string;
  collegeEmail: string;
  email: string;
  rollno: number;
  token?: string;
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
    token: {
      type: String,
      
    },
  },
  { timestamps: true }
);


export const User =
  (mongoose.models.User as mongoose.Model<IUser>) ||
  mongoose.model("User", userSchema);
