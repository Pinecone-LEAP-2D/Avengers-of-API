"use client";

import { ExternalLink } from "lucide-react";
import { useRouter } from "next/navigation";

type Props = {
  location: string;
};

export default function NavBar(props: Props) {
  const { location } = props;
  const router = useRouter();

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
        onClick={()=>window.open("user/x","_blank")}
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
