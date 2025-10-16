"use client";

import React, { useState } from "react";
import VerifyOTP from "../verifyOTP/page";
import { logInuserObjectType } from "@/types/types";

const Page = () => {
  const userObject = {
    collegeEmail: "",
    mode: "",
  };

  const [user, setUser] = useState<logInuserObjectType>(userObject);

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
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={user.collegeEmail}
          name="collegeEmail"
          placeholder="Enter email"
          onChange={handleChange}
        />
        <button type="submit">Get OTP</button>
      </form>
      <VerifyOTP user={user} />
    </>
  );
};

export default Page;
