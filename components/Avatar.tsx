import { LogOut, Lightbulb, Rocket, User } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface AvatarProps {
  imageUrl?: string;
  user?: string;
}

const Avatar: React.FC<AvatarProps> = ({ user = "User" }) => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        //here it is checking is the clicked element lies inside the useRef div and dropdownRef.current points to the DOM element it is attached to
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-10 h-10 rounded-lg bg-gray-200 hover:bg-blue-50 transition-colors flex items-center justify-center overflow-hidden hover:text-blue-600 focus:text-blue-600 focus:bg-blue-50 text-2xl font-semibold"
      >
        {user.charAt(0).toUpperCase()}
      </button>
      {isOpen && (
        <div className="absolute right-0 mt-2 w-44 py-2 px-1 bg-white rounded-lg shadow-md border border-gray-200">
          <div className="px-4 py-2">
            <p className="text-base font-medium text-gray-900">{user}</p>
          </div>
          <hr className="text-gray-200" />

          <div className="flex flex-col items-center mt-1">
            <Link
              href="/profile"
              className="flex items-center w-full rounded-md px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
              <User className="w-4 h-4 mr-2" />
              Profile
            </Link>

            <Link
              href="/hackathons-participated"
              className="flex items-center w-full rounded-md px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
              <Lightbulb className="w-4 h-4 mr-2" />
              My Hacks
            </Link>

            <Link
              href="/hosted-hackathons"
              className="flex items-center w-full rounded-md px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
              <Rocket className="w-4 h-4 mr-2" />
              Hosted
            </Link>

            <button
              onClick={async () => {
                const res = await fetch("/api/logout", {
                  method: "POST",
                }).then((res) => res.json());
                if (res.success) {
                  router.refresh();
                  router.push("/");
                }
              }}
              className="flex items-center w-[95%] rounded-md px-4 py-2 text-sm text-red-600 hover:bg-red-50"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Sign out
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Avatar;
