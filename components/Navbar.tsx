"use client"

import React, { useEffect, useState } from "react";
import { Button } from "./ui";
import Avatar from "./Avatar";
import Link from "next/link";
import clsx from "clsx";
import { usePathname } from "next/navigation";
import { useUser } from "./UserContext";
import {UserData} from "./UserContext";

const Navbar = () => {
  const path = usePathname()
  const { user } = useUser()

  return (
    
      <div className="fixed top-0 w-full h-12 z-50 backdrop-blur-md bg-white/30 flex items-center justify-between px-30">
        <div className="flex items-center">
          <h1 className="logo text-2xl font-bold"><Link href={"/"}>HackHub</Link></h1>
          <div className="ml-20">
            <ul className="flex gap-8">
              <Link href={"/hackathons"}> <li className={clsx(path === "/hackathons" && "text-blue-600 font-bold", "cursor-pointer")}>Hackathons</li></Link>
              <Link href={"/organise-hackathons"}><li className={clsx(path === "/organise-hackathons" && "text-blue-600 font-bold", "cursor-pointer")}>Organise Hackathon</li></Link>
            </ul>
          </div>
        </div>

        {!user ? (
          <div className="flex gap-4 mr-16">
            <Link href={"/login"}><Button className="cursor-pointer">Log In</Button></Link>
            <Link href={"/signup"}><Button variant="secondary" className="cursor-pointer">Sign Up</Button></Link>
          </div>
        ) : (
          <Avatar name={(user as UserData)?.name ?? "Guest"} src={(user as UserData)?.profileImageUrl} />
        )}
      </div>
    
  );
};

export default Navbar;
