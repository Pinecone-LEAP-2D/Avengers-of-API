"use client";

import { useState } from "react";
import { Search } from "lucide-react";

export default function ExploreMenu() {
  const [searchValue, setSearchValue] = useState("");

  return (
    <div className="w-[955px] h-fit p-[20px] flex flex-col gap-[25px]">
      <div className="text-[22px] font-semibold">Explore creators</div>
      <div className="">
        <div className="mt-[7px] ml-[7px] absolute">
            <Search className="w-[18px] h-[18px] text-gray-400" />
        </div>
        <input
          type="text"
          className="w-[300px] border outline-none pl-[28px] py-[3px] rounded-[5px]"
          id="searchBar"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          placeholder="Search name"
        />
      </div>
      <div className="w-full h-fit flex flex-col"></div>
    </div>
  );
}
