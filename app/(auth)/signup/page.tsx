"use client";

import { signInuserObjectType } from "@/types/types";
// import { useRouter } from "next/navigation";
import React, { useState } from "react";
import VerifyOTP from "../verifyOTP/page";

const Page = () => {
  // const router = useRouter()

  const userObject = {
    name: "",
    collegeEmail: "",
    email: "",
    githubUsername: "",
    mode: "",
  };

  const [user, setUser] = useState<signInuserObjectType>(userObject);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUser((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch("/api/send-otp", {
      method: "POST",
      body: JSON.stringify({ collegeEmail: user.collegeEmail }),
    }).then((data) => data.json());

    const data = res.data;
    if (res.success) {
      user.mode = data.mode;
      // router.push("/verifyOTP")
    }

    console.log(data);
  };

  return (
    <>
      <form className="mt-20" onSubmit={handleSubmit}>
        <input
          name="name"
          onChange={handleChange}
          type="text"
          placeholder="Enter your name"
          value={user.name}
        />
        <input
          name="collegeEmail"
          onChange={handleChange}
          type="email"
          placeholder="Enter college Email ID"
          value={user.collegeEmail}
        />
        <input
          onChange={handleChange}
          type="email"
          name="email"
          placeholder="Enter your mail"
          value={user.email}
        />
        <input
          name="githubUsername"
          onChange={handleChange}
          type="text"
          placeholder="Enter github link"
          value={user.githubUsername}
        />
        <button type="submit" className="bg-slate-300 text-black">
          Get OTP
        </button>
      </form>
      <VerifyOTP user={user} />
    </>
  );
};

export default Page;
