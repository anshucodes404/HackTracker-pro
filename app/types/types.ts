export type signInuserObjectType = {
  name: string;
  collegeEmail: string;
  email: string;
  githubUsername: string;
  mode: string;
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
  name: string;
  collegeEmail: string;
  email: string;
  githubUsername: string;
  mode: string;
  otp: string;
};

export type verifyOTPProps = {
  user: signInuserObjectType | logInuserObjectType;
};
