"use client";

import { Check, Copy } from "lucide-react";
import { useState } from "react"
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"

export default function HomeMenu(){

    const [user,setUser] = useState({
        id: "1234-2136-6231-6533",
        username: "xhz",
        pfp: "https://cdn.buymeacoffee.com/uploads/cover_images/2023/06/f9ed63251a832c6db79ed2e80400da09.jpg@2560w_0e.webp",
        about: "Iaskaljewiopi",
        recents: [],
      });
    const [copyState, setCopyState] = useState(false);

    const handleCopyButton = () => {
        navigator.clipboard.writeText(`http://localhost:3000/user/${user.username}`);
        setCopyState(true);
        setTimeout(() => {
            setCopyState(false);
        }, (2000));
    }
    
    return(
        <div className="w-[955px] h-fit px-[20px]">
            <div className="w-full border border-gray-300 rounded-[8px] p-[25px]">
                <div className="w-full border-b-[1px] pb-[15px] border-gray-300 flex justify-between">
                    <div className="flex gap-[15px] mt-[10px]">
                        <div className="w-[40px] h-[40px] overflow-hidden rounded-full">
                            <img src={user.pfp} className="w-full h-full object-cover"/>
                        </div>
                        <div className="flex flex-col mt-[-5px]">
                            <div className="font-semibold">{user.username}</div>
                            <a href={`http://localhost:3000/user/${user.username}`} className="underline text-[14px]">buymeacoffee.com/user/{user.username}</a>
                        </div>
                    </div>
                    {copyState 
                    ? <button className="flex text-[15px] w-[170px] bg-black text-white font-light gap-[10px] items-center justify-center px-[20px] h-[40px] rounded-[10px]"><Check strokeWidth={1.5} className="w-[17px] h-[17px]"/>Link copied</button>
                    : <button className="flex text-[15px] w-[170px] bg-black text-white font-light gap-[10px] items-center justify-center px-[20px] h-[40px] rounded-[10px]" onClick={handleCopyButton}><Copy strokeWidth={1.5} className="w-[17px] h-[17px]"/>Copy page link</button>}
                </div>
                <div className="w-full">
                    <div className="flex pt-[20px] gap-[20px] items-center">
                        <div className="font-semibold text-[24px]">Earnings</div>
                        <Select defaultValue="7days">
                            <SelectTrigger className="w-[180px]">
                                <SelectValue/>
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
    )
}