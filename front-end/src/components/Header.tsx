"use client";

import { Coffee } from "lucide-react";
import { useRouter } from "next/navigation";
import { useProfile } from "@/context/ProfileContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function Header() {
  const { profile } = useProfile();
  const router = useRouter();

  return (
    <div className="flex bg-white justify-center items-center w-full h-[56px]">
      <div className="w-[90%] flex justify-between">
          <a href="../home">
        <div className="flex items-center gap-2">
            <Coffee />
            <h2 className=" font-bold">Buy Me Coffee</h2>
        </div>
          </a>
        <DropdownMenu>
          <DropdownMenuTrigger className="w-[40px] h-[40px] border rounded-full overflow-hidden">
            <img
              src={profile?.avatarImage || "/default-avatar.png"}
              alt="Profile"
              className="w-full h-full object-cover"
            />
          </DropdownMenuTrigger>
          <DropdownMenuContent className="flex flex-col items-center">
            <DropdownMenuLabel>{profile?.name}</DropdownMenuLabel>
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
