export type signInuserObjectType = {
  name: string,
  mobileNumber: string,
  collegeEmail: string,
  email: string,
  hostelEmail: string,
  branch: string,
  hostel: string,
  studyYear: string,
  githubLink?: string,
  LinkedInLink?: string,
  mode: string,
};

export type logInuserObjectType = {
  collegeEmail: string;
  mode: string;
};

export type loginUser = {
  collegeEmail: string;
  otp: string;
  mode: string;
};

export type signupUser = {
  name: string,
  mobileNumber: string,
  collegeEmail: string,
  email: string,
  hostelEmail: string,
  branch: string,
  hostel: string,
  studyYear: string,
  githubLink?: string,
  LinkedInLink?: string,
  mode: string,
  otp: string;
};

export type verifyOTPProps = {
  user: signInuserObjectType | logInuserObjectType;
};

export interface HackathonCardProps {
  _id: string;
  hackathonName: string;
  mode: string;
  tagline: string;
  organiser: string;
  duration: string;
  teamSize: string;
  startAt: Date;
  registrationDeadline: Date;
  tags: string[];
  registeredTeams?: number;
  slug: string;
  prize: string;
  status: string;
  bannerImage?: string;
  btnText: string
}

export type DetailedHackathon = {
  _id: string
  hackathonName: string;
  mode: "online" | "inplace";
  tagline?: string;
  description: string;
  paricipants?: string[];
  rules?: string;
  organiser: string;
  startAt: Date;
  duration: string;
  registrationDeadline: Date;
  minTeamSize: number;
  maxTeamSize: number;
  criteria: string;
  bannerImage?: string;
  organiserEmail: string;
  socialLink?: string;
  webSiteLink?: string;
  tags?: string[];
  status: "draft" | "open" | "ended" | "upcoming";
  createdAt: Date;
  updatedAt: Date;
}
