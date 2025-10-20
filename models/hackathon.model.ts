import mongoose, { Schema, Document } from "mongoose";

export interface IHackathon extends Document {
  hackathonName: string;
  mode: "online" | "inplace";
  tagline?: string;
  description: string;
  paricipants?: mongoose.Types.ObjectId[];
  participantsEmails: string[];  //? team leaders email
  rules?: string;
  organiser: mongoose.Types.ObjectId;
  startAt: Date;
  duration: string;
  registrationDeadline: Date;
  minTeamSize: number;
  maxTeamSize: number;
  criteria: string;
  // bannerImage?: string;
  organiserEmail: string;
  OCEmails: string[];
  socialLink?: string;
  webSiteLink?: string;
  tags?: string[];
  status: "draft" | "open" | "ended" | "upcoming";
  createdAt: Date;
  updatedAt: Date;
}

const hackathonSchema = new Schema<IHackathon>(
  {
    hackathonName: {
      type: String,
    },
    mode: {
      type: String,
      enum: ["online", "inplace"]
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
    participantsEmails: {
      type: [String],
      required: true
    },
    rules: {
      type: String,
    },
    organiser: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
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
      type: String,
      required: true
    },
    // bannerImage: {
    //   type: String
    // },
    organiserEmail: {
      type: String,
      required: true
    },
    OCEmails: {
      type: [String],
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
      enum: ["draft", "published", "ended", "upcoming"],
      default: "draft",
    },
  },
  { timestamps: true }
);


export const Hackathon = mongoose.models.Hackathon || mongoose.model<IHackathon>("Hackathon", hackathonSchema)