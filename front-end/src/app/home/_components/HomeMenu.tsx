"use client";

import { Check, Copy } from "lucide-react";
import { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useRouter } from "next/navigation";
import jwt from "jsonwebtoken";
import { fetchProfile } from "@/lib/fetchProfile";
import CoffeeLoading from "@/components/CoffeeLoading";

export default function HomeMenu() {
  const [user, setUser] = useState({});
  const [profile, setProfile] = useState({
    name: "",
    about: "",
    socialMediaURL: "",
    backgroundImage: "",
    avatarImage: "",
  });
  const [copyState, setCopyState] = useState(false);
  const [origin, setOrigin] = useState("");
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== undefined) {
      setOrigin(window.location.origin);
      const token = window.localStorage.token;
      if (token) {
        const decode = jwt.decode(token);
        if (decode) setUser(decode);
      } else {
        router.push("login");
      }
    }
  }, []);

  useEffect(() => {
    const fetchAll = async () => {
      const profile = await fetchProfile(user.userId);

      if (profile === "No profile") {
        // router.push("create-profile");
      } else {
        setProfile(profile);
      }
    };

    if (user) {
      fetchAll();
    }
  }, [user]);

  const handleCopyButton = () => {
    navigator.clipboard.writeText(`${origin}/user/${user.username}`);
    setCopyState(true);
    setTimeout(() => {
      setCopyState(false);
    }, 2000);
  };

  return !profile.name ? (
    <div className="w-[955px] h-fit px-[20px]">
      <div className="w-full h-[280px] rounded-[8px] bg-gray-100"></div>
      <div className="w-full h-[400px] rounded-[8px] bg-gray-100 mt-[50px]"></div>
    </div>
  ) : (
    <div className="w-[955px] h-fit px-[20px]">
      <div className="w-full border border-gray-300 rounded-[8px] p-[25px]">
        <div className="w-full border-b-[1px] pb-[15px] border-gray-300 flex justify-between">
          <div className="flex gap-[15px] mt-[10px]">
            <div className="w-[40px] h-[40px] overflow-hidden rounded-full">
              <img
                src={profile.avatarImage}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex flex-col mt-[-5px]">
              <div className="font-semibold">{profile.name}</div>
              <a
                href={`${origin}/user/${user.username}`}
                className="underline text-[14px]"
              >
                buymeacoffee.com/user/{user.username}
              </a>
            </div>
          </div>
          {copyState ? (
            <button className="flex text-[15px] w-[170px] bg-black text-white font-light gap-[10px] items-center justify-center px-[20px] h-[40px] rounded-[10px]">
              <Check strokeWidth={1.5} className="w-[17px] h-[17px]" />
              Link copied
            </button>
          ) : (
            <button
              className="flex text-[15px] w-[170px] bg-black text-white font-light gap-[10px] items-center justify-center px-[20px] h-[40px] rounded-[10px]"
              onClick={handleCopyButton}
            >
              <Copy strokeWidth={1.5} className="w-[17px] h-[17px]" />
              Copy page link
            </button>
          )}
        </div>
        <div className="w-full">
          <div className="flex pt-[20px] gap-[20px] items-center">
            <div className="font-semibold text-[24px]">Earnings</div>
            <Select defaultValue="7days">
              <SelectTrigger className="w-[180px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="7days">Last 7 days</SelectItem>
                  <SelectItem value="30days">Last 30 days</SelectItem>
                  <SelectItem value="90days">Last 90 days</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div className="text-[40px] my-[20px] font-bold">$450</div>
        </div>
      </div>
      <div className="w-full flex justify-between mt-[20px] mb-[10px]">
        <div className="text-[17px] font-semibold">Recent transactions</div>
      </div>
      <div className="w-full border border-gray-300 rounded-[8px] p-[20px]"></div>
    </div>
  );
}
