"use client";

import { Coffee } from "lucide-react";
import jwt from "jsonwebtoken";
import { useEffect, useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useRouter } from "next/navigation";

type User = {
  email: string;
  username: string;
};

export default function Header() {
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const token = window.localStorage.token;
      if (token) {
        const decoded = jwt.decode(token) as User | null;
        setUser(decoded);
      }
    }
  }, []);

  return (
    <div className="flex bg-white justify-center items-center w-full h-[56px]">
      <div className="w-[90%] flex justify-between">
        <div className="flex items-center gap-2">
          <Coffee />
          <h2 className=" font-bold">Buy Me Coffee</h2>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger className="w-[40px] h-[40px] border rounded-full">
            <img src="./coffee-bean.png" className="w-full h-full object-cover"/>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="flex flex-col items-center">
          <DropdownMenuLabel>{user?.username}</DropdownMenuLabel>
          <DropdownMenuItem>
            <div className="cursor-pointer" onClick={()=>{router.push("../login")}}>Log out</div>
          </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}
