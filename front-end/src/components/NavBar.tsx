"use client";

import { ExternalLink } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import jwt, {JwtPayload} from "jsonwebtoken";

type Props = {
  location: string;
};

export default function NavBar(props: Props) {

  const [username, setUsername] = useState<String>();
  const { location } = props;
  const router = useRouter();

  useEffect(()=>{
    if(typeof window !== undefined){
      const token = window.localStorage.token;
      if(token){
        const decoded = jwt.decode(token);

        if (decoded && typeof decoded !== 'string') {
          const user = decoded as JwtPayload;
          if (user.username) {
            setUsername(user.username as string);
          }
        }
      }else{
        router.push("login");
      }
    }
  },[])

  return (
    <div className="flex flex-col gap-[10px]">
      <button
        className={`w-[250px] h-[40px] transition duration-[.3s] hover:bg-gray-100 rounded-[10px] text-start pl-[15px] ${
          location === "home" ? "bg-gray-200 hover:bg-gray-200" : ""
        }`}
        onClick={() => router.push("/home")}
      >
        Home
      </button>
      <button
        className={`w-[250px] h-[40px] transition duration-[.3s] hover:bg-gray-100 rounded-[10px] text-start pl-[15px] ${
          location === "explore" ? "bg-gray-200 hover:bg-gray-200" : ""
        }`}
        onClick={() => router.push("/explore")}
      >
        Explore
      </button>
      <button
        className={`w-[250px] h-[40px] transition duration-[.3s] flex items-center gap-[10px] hover:bg-gray-100 rounded-[10px] text-start pl-[15px] ${
          location === "view" ? "bg-gray-200 hover:bg-gray-200" : ""
        }`}
        onClick={()=>window.open(`user/${username}`,"_blank")}
      >
        View page <ExternalLink className="w-[18px] h-[18px]" strokeWidth={1} />
      </button>
      <button
        className={`w-[250px] h-[40px] transition duration-[.3s] hover:bg-gray-100 rounded-[10px] text-start pl-[15px] ${
          location === "settings" ? "bg-gray-200 hover:bg-gray-200" : ""
        }`}
        onClick={() => router.push("/settings")}
      >
        Account settings
      </button>
    </div>
  );
}
