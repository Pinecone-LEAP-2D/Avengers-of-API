"use client";

import { useParams } from "next/navigation";
import { useState } from "react";
import { Heart, Coffee } from "lucide-react";
import Header from "@/components/Header";

export default function User() {
  const [user, setUser] = useState({
    id: "1234-2136-6231-6533",
    username: "xhz",
    cover:
      "https://cdn.buymeacoffee.com/uploads/cover_images/2023/06/f9ed63251a832c6db79ed2e80400da09.jpg@2560w_0e.webp",
    pfp: "https://cdn.buymeacoffee.com/uploads/cover_images/2023/06/f9ed63251a832c6db79ed2e80400da09.jpg@2560w_0e.webp",
    about: "Iaskaljewiopi",
    socials: [],
    recents: [],
  });
  const [coffeeCount, setCoffeeCount] = useState(1);
  const [isMonthly, setIsMonthly] = useState(false);

  const params = useParams();
  const { userID } = params;

  const changeCoffeeAmount = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCoffeeCount(Number(e.target.value));
  };
  const changeToMonthly = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsMonthly(e.target.checked);
  };

  console.log(isMonthly);

  return (
    <div className="w-screen min-h-screen flex flex-col items-center bg-[#EEEEEE] font-light">
      <Header />
      <div className="w-screen h-[40vh]">
        <img src={user.cover} className="w-full h-full object-cover" />
      </div>
      <div className="flex w-[1040px] justify-between mt-[-80px]">
        <div className="w-[500px] flex flex-col gap-[20px]">
          <div className="bg-white rounded-[20px] h-fit p-[25px]">
            <div className="flex gap-[15px] items-center border-b-[.5px] border-[#DDDDDD] pb-[20px]">
              <div className="w-[30px] h-[30px] rounded-full overflow-hidden">
                <img src={user.pfp} className="w-full h-full object-cover" />
              </div>
              <div className="text-[22px] font-semibold">{user.username}</div>
            </div>
            <div className="flex flex-col py-[20px] gap-[20px]">
              <div className="font-semibold text-[19px]">
                About {user.username}
              </div>
              <div className="">{user.about}</div>
            </div>
          </div>
          <div className="bg-white rounded-[20px] h-fit p-[20px]">
            <div className="flex flex-col py-[10px]">
              <div className="font-semibold pb-[10px] text-[19px]">
                Social media URL
              </div>
              <div className="flex flex-col">
                {user.socials.length ? (
                  user.socials.map((el, index) => <div key={index}>{el}</div>)
                ) : (
                  <div className="text-gray-400 text-[16px]">Nothing here</div>
                )}
              </div>
            </div>
          </div>
          <div className="bg-white rounded-[20px] h-fit p-[20px]">
            <div className="flex flex-col py-[10px]">
              <div className="font-semibold pb-[10px] text-[19px]">
                Recent supporters
              </div>
              <div className="flex flex-col">
                {user.recents.length ? (
                  user.recents.map((el, index) => <div key={index}>{el}</div>)
                ) : (
                  <div className="w-full h-[160px] mt-[15px] border border-gray-300 rounded-[8px] flex justify-center items-center">
                    <div className="flex flex-col items-center gap-[20px]">
                      <Heart fill="black" />
                      <div className="font-semibold">
                        Be the first one to support {user.username}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="w-[500px] rounded-[20px] bg-white p-[25px] h-fit flex flex-col">
          <div className="text-[22px] font-bold">
            Buy {user.username} a Coffee
          </div>
          <div className="mt-[25px] w-full flex flex-col items-center justify-center border border-orange-400 py-[10px] rounded-[10px] bg-orange-100/20">
            <div className="flex items-center gap-[20px]">
              <Coffee className="w-[40px] h-[40px]" />
              <div className="text-[20px] font-semibold text-gray-300">x</div>
              <div
                className={`text-[20px] flex items-center justify-center font-semibold border hover:border-orange-400 rounded-full w-[50px] h-[50px] cursor-pointer ${
                  coffeeCount == 1
                    ? "bg-orange-400 text-white border-orange-400"
                    : "bg-white text-orange-400 border-orange-200"
                }`}
                onClick={() => setCoffeeCount(1)}
              >
                1
              </div>
              <div
                className={`text-[20px] flex items-center justify-center font-semibold border hover:border-orange-400 rounded-full w-[50px] h-[50px] cursor-pointer ${
                  coffeeCount == 3
                    ? "bg-orange-400 text-white border-orange-400"
                    : "bg-white text-orange-400 border-orange-200"
                }`}
                onClick={() => setCoffeeCount(3)}
              >
                3
              </div>
              <div
                className={`text-[20px] flex items-center justify-center font-semibold border hover:border-orange-400 rounded-full w-[50px] h-[50px] cursor-pointer ${
                  coffeeCount == 5
                    ? "bg-orange-400 text-white border-orange-400"
                    : "bg-white text-orange-400 border-orange-200"
                }`}
                onClick={() => setCoffeeCount(5)}
              >
                5
              </div>
              <input
                type="number"
                className="w-[50px] h-[50px] outline-none border rounded-[5px] border-gray-300 text-center text-[24px] font-semibold"
                value={coffeeCount}
                onChange={changeCoffeeAmount}
              />
            </div>
          </div>
          <div className="mt-[40px] flex flex-col gap-[12px]">
            <div className="text-[18px] font-semibold">
              Enter your name to donate
            </div>
            <input
              type="text"
              placeholder="Leave blank to use your username"
              className="outline-none border border-gray-300 px-[10px] w-full h-[35px] rounded-[5px] focus:border-orange-400"
            />
          </div>
          <div className="mt-[40px] flex flex-col gap-[12px]">
            <div className="text-[18px] font-semibold">Special message</div>
            <textarea
              className="outline-none border rounded-[5px] resize-none h-fit min-h-[140px] p-[10px] border-gray-300 focus:border-orange-400"
              placeholder={`Send your special thanks to ${user.username}`}
            />
          </div>
          <div className="mt-[20px] flex gap-[5px] items-center">
            <input
              type="checkbox"
              checked={isMonthly}
              onChange={changeToMonthly}
              className="w-[17px] h-[17px] opacity-0 absolute"
            />
            <div
              className={`w-[17px] h-[17px] rounded-sm border flex items-center justify-center transition-colors duration-150 ease-in-out ${
                isMonthly
                  ? "bg-orange-400 border-orange-400"
                  : "bg-white border-gray-400"
              }`}
              role="checkbox"
              aria-checked={isMonthly}
            >
              {isMonthly && (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={3.5}
                  stroke="currentColor"
                  className="w-[10px] h-[10px] text-white"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4.5 12.75l6 6 9-13.5"
                  />
                </svg>
              )}
            </div>
            <div>Make this monthly</div>
          </div>
          <button className="bg-orange-400 text-white rounded-full w-full h-[40px] font-semibold mt-[20px]">
            Support ${5 * coffeeCount}
            {isMonthly && " / month"}
          </button>
        </div>
      </div>
    </div>
  );
}
