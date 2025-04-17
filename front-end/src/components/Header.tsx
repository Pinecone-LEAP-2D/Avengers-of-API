"use client";

"use client";

import { Coffee } from "lucide-react";
import jwt from "jsonwebtoken";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useProfile } from "@/context/ProfileContext";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

type User = {
  email: string;
  username: string;
};

export default function Header() {
  const [user, setUser] = useState<User | null>(null);
  const { profile } = useProfile();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const token = window.localStorage.token;
      if (token) {
        const decoded = jwt.decode(token) as User | null;
        setUser(decoded);
      }
    }
  }, []);
  console.log("user", profile);

  useEffect(()=>{
      const fetchAll = async() => {
          
          const avatar= await fetchProfile(user.userId);
          
          
          if(avatar=== "No profile"){
              router.push("create-profile");
          }else{
              setAvatar(avatar.avatarImage);
          }
      }

      if(user){
          fetchAll();
      }

  },[user]);

  return (
    <div className="flex bg-white justify-center items-center w-full h-[56px]">
      <div className="w-[90%] flex justify-between">
        <div className="flex items-center gap-2">
          <Coffee />
          <h2 className=" font-bold">Buy Me Coffee</h2>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger className="w-[40px] h-[40px] border rounded-full overflow-hidden">
            <img
              src={profile?.avatarImage || "/default-avatar.png"}
              alt="Profile"
              className="w-full h-full object-cover"
            />
          </DropdownMenuTrigger>
          <DropdownMenuContent className="flex flex-col items-center">
            <DropdownMenuLabel>{user?.username}</DropdownMenuLabel>
            <DropdownMenuItem>
              <div
                className="cursor-pointer"
                onClick={() => {
                  router.push("../login");
                }}
              >
                Log out
              </div>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}
