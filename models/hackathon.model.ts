import mongoose, { Schema, Document } from "mongoose";
import { required } from "zod/mini";

export interface IHackathon extends Document {
  hackathonName: string;
  tagline?: string;
  description: string;
  paricipants?: mongoose.Types.ObjectId[];
  rules?: string;
  organiser: mongoose.Types.ObjectId;
  startAt: Date;
  duration: string;
  registrationDeadline: Date;
  minTeamSize: number;
  maxTeamSize: number;
  criteria: string[];
  bannerImage?: string;
  organiserEmail: string;
  socialLink?: string;
  webSiteLink?: string;
  tags?: string[];
  status: "draft" | "published" | "closed";
  createdAt: Date;
  updatedAt: Date;
}

const hackathonSchema = new Schema<IHackathon>(
  {
    hackathonName: {
      type: String,
    },
    tagline: {
      type: String
    },
    description: {
      type: String,
    },
    paricipants: {
      type: [Schema.Types.ObjectId],
      ref: "Team",
    },
    rules: {
      type: String,
    },
    organiser: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    startAt: {
      type: Date,
      required: true,
    },
    duration: {
      type: String,
      required: true
    },
    registrationDeadline: {
      type: Date,
      required: true
    },
    minTeamSize: {
      type: Number,
    },
    maxTeamSize: {
      type: Number,
    },
    criteria: {
      type: [String],
      required: true
    },
    bannerImage: {
      type: String
    },
    organiserEmail: {
      type: String,
      required: true
    },
    socialLink: {
      type: String,
    },
    webSiteLink: {
      type: String
    },
    tags: {
      type: [String],
    },
    status: {
      type: String,
      enum: ["draft", "published", "closed"],
      default: "draft",
    },
  },
  { timestamps: true }
);


export const Hackathon = mongoose.models.Hackathon || mongoose.model<IHackathon>("Hackathon", hackathonSchema)