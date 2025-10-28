"use client"

import React, { useEffect, useState } from "react";
import { Button } from "./ui";
import Avatar from "./Avatar";
import Link from "next/link";
import clsx from "clsx";
import { usePathname } from "next/navigation";

const Navbar = () => {
    const path = usePathname()
      const [loading, setLoading] = useState<boolean>(true);
      const [error, setError] = useState<string | null>(null)

      const [user, setUser] = useState<unknown>()

      useEffect(() => {

        try {
          const getUser = async() => {
            const res = await fetch("/api/user",
              {
                method: "GET"
              }
            ).then(res => res.json())
            console.log(res.data)
            setUser(res.data)
          }
  
          getUser()
        } catch (error) {
          setError((error as Error).message || String(error))
        } finally{
          setLoading(false)
        }
      }, [error])

      console.log(user)

      if(loading){
        return (
          <>
            <div>Loading User</div>
          </>
        )
      }
  return (
    <>
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
          <Avatar user={(user as any)?.name ?? "Guest"} />
        )}
      </div>
    </>
  );
};

export default Navbar;
