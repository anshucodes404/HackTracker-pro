import mongoose, {Schema, Document} from "mongoose";

export interface ITeamMember {
    userId: mongoose.Types.ObjectId;
    role: string;
    name: string;
    joinedAt: Date;
}

export interface ITeam extends Document{
    name: string;
    members: ITeamMember[];
    hackathonId: mongoose.Types.ObjectId;
    leader: mongoose.Types.ObjectId;
    status: "Registered" | "Disqualified" | "Won";
    createdAt: Date;
    updatedAt: Date;
}

const teamMemberSchema = new Schema<ITeamMember>({
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    role: {
        type: String,
        default: "member",
    },
    joinedAt: {
        type: Date,
        default: Date.now()
    }
})

export const teamSchema = new Schema<ITeam>({
    name: {
        type: String,
        required: true,
    },
    hackathonId: {
        type: Schema.Types.ObjectId,
        ref: "Hackathon",
        required: true
    },
    leader: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    members: [teamMemberSchema],
    status:{
        type: String ,
        enum: ["Registered", "Disqualified", "Won"],
        default: "Registered"
    }
}, {timestamps: true})

export const Team = mongoose.models.Team || mongoose.model<ITeam>("Team", teamSchema)