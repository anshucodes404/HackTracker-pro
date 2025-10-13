"use client"

import React, { useState } from 'react'
import { loginUser, signupUser, verifyOTPProps } from "@/app/types/types"

const VerifyOTP: React.FC<verifyOTPProps> = ({user}) => {
const [otp, setOtp] = useState<string>("");

console.log(user)
const mode = user?.mode

const buildData = (): loginUser | signupUser => {
  if(mode == "login"){
    return {
      collegeEmail: user.collegeEmail,
      otp,
      mode
    }
  } else {
    return {
      name: user.name,
      collegeEmail: user.collegeEmail,
      email: user.email,
      githubUsername: user.githubUsername,
      otp,
      mode
    }

  }
}

const VerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault()

    const data = buildData()
  console.log(data)
    const res = await fetch("/api/auth", {
        method: "POST",
        body: JSON.stringify(data)
    }).then(res => res.json())

    console.log(res)
}

  return (
    <>
      <form onSubmit={VerifyOtp}>
        <input type="text" placeholder='Enter OTP' value={otp} onChange={(e) => setOtp(e.target.value)}/>
        <button type='submit'>Verify OTP</button>
      </form>
    </>
  )
}

export default VerifyOTP
