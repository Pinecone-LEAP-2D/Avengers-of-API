"use client";

import { useParams, useRouter } from "next/navigation";
import { use, useEffect, useState } from "react";
import { Heart, Coffee } from "lucide-react";
import Header from "@/components/Header";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { QRCodeCanvas } from "qrcode.react";
import axios from "axios";
import { fetchProfile } from "@/lib/fetchProfile";
import Link from "next/link";
import CoffeeLoading from "@/components/CoffeeLoading";
import NotFound from "@/components/NotFound";
import jwt, { JwtPayload } from "jsonwebtoken";

export default function User() {
  const [user, setUser] = useState({});
  const [profile, setProfile] = useState({
    name: '',
    about: '',
    socialMediaURL: '',
    backgroundImage: '',
    avatarImage: '',
    userId: 0,
  });
  const [coffeeCount, setCoffeeCount] = useState(0);
  const [isMonthly, setIsMonthly] = useState(false);
  const [notFound, setNotFound] = useState(false);
  const [isLoading, setLoading] = useState(true);
  const [origin, setOrigin] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [input, setInput] = useState({
    link: "",
    message: "",
  })


  const params = useParams();
  const { userID } = params;
  const router = useRouter();



  useEffect(()=>{
    
    const fetchAll = async() => {
      try{
        const response = await axios.get(`http://localhost:3000/user/?username=${userID}`);
        const userid = response.data.id;
        const profile = await fetchProfile(userid);
        console.log(profile);
        if(typeof profile == "string" || profile === undefined){
          setNotFound(true);
        }else{
          setLoading(false);
          setProfile(profile);
        }
      }catch(err){
        setNotFound(true);
      }
    }

    if(typeof window !== undefined){
      const token = window.localStorage.token;
      if(token){
        const decode = jwt.decode(token) as JwtPayload;
        setUser(decode);
      }else{
        router.push("login");
      }

      setOrigin(window.location.origin);

    }
    
    fetchAll()
  },[]);

  const changeCoffeeAmount = (e: React.ChangeEvent<HTMLInputElement>) => {
    
    if(Number(e.target.value) < 0){
      setCoffeeCount(0);
    }else if(Number(e.target.value) > 50000){
    }else
    setCoffeeCount(Number(e.target.value));
  };
  const handleCoffeeKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const disallowedKeys = ['e', 'E', '+', '-', '.'];

    if (disallowedKeys.includes(e.key)) {
      e.preventDefault();
      return;
    }
  }
  const changeToMonthly = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsMonthly(e.target.checked);
  };

  const handleSend = async() => {
    
    console.log(user.userId, profile.userId);
    

    try{
      const res = await axios.post("http://localhost:3000/donation",{
        amount: coffeeCount ? coffeeCount : 1,
        specialMessage: "Hi",
        socialURLOrBuyMeACoffee: `${origin}/user/${user.username}`,
        donorId: user.userId,
        recipientId: profile.userId
      });
      console.log(res);
      setIsDialogOpen(false);
    }catch(err){
      console.log(err);
    }
  }


  return notFound ? (
    <NotFound />
  ) : isLoading ? (
    <CoffeeLoading />
  ) : (
    <div className="w-screen min-h-screen flex flex-col items-center bg-[#EEEEEE] font-light">
      <Header />
      <div className="w-screen h-[40vh]">
        {profile.backgroundImage ? (
          <img src={profile.backgroundImage} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full bg-gray-700"></div>
        )}
      </div>
      <div className="flex w-[1040px] justify-between mt-[-80px]">
        <div className="w-[500px] flex flex-col gap-[20px]">
          <div className="bg-white rounded-[20px] h-fit p-[25px]">
            <div className="flex gap-[15px] items-center border-b-[.5px] border-[#DDDDDD] pb-[20px]">
              <div className="w-[30px] h-[30px] rounded-full overflow-hidden">
                <img src={profile.avatarImage} className="w-full h-full object-cover" />
              </div>
              <div className="text-[22px] font-semibold">{profile.name}</div>
            </div>
            <div className="flex flex-col py-[20px] gap-[20px]">
              <div className="font-semibold text-[19px]">
                About {profile.name}
              </div>
              <div className="">{profile.about}</div>
            </div>
          </div>
          <div className="bg-white rounded-[20px] h-fit p-[20px]">
            <div className="flex flex-col py-[10px]">
              <div className="font-semibold pb-[10px] text-[19px]">
                Social media URL
              </div>
              <Link href={profile.socialMediaURL.startsWith("https://") ? profile.socialMediaURL : "https://"+profile.socialMediaURL} target="_blank">{profile.socialMediaURL}</Link>
            </div>
          </div>
          <div className="bg-white rounded-[20px] h-fit p-[20px]">
            <div className="flex flex-col py-[10px]">
              <div className="font-semibold pb-[10px] text-[19px]">
                Recent supporters
              </div>
              <div className="flex flex-col">
                {/* {user.recents.length ? (
                  user.recents.map((el, index) => <div key={index}>{el}</div>)
                ) : (
                  <div className="w-full h-[160px] mt-[15px] border border-gray-300 rounded-[8px] flex justify-center items-center">
                    <div className="flex flex-col items-center gap-[20px]">
                      <Heart fill="black" />
                      <div className="font-semibold">
                        Be the first one to support {profile.name}
                      </div>
                    </div>
                  </div>
                )} */}
              </div>
            </div>
          </div>
        </div>
        <div className="w-[500px] rounded-[20px] bg-white p-[25px] h-fit flex flex-col">
          <div className="text-[22px] font-bold">
            Buy {profile.name} a Coffee
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
                min={1}
                max={50000}
                className="w-[50px] h-[50px] outline-none border rounded-[12px] border-gray-300 text-center text-[24px] font-semibold coffeeInput"
                placeholder="10"
                value={coffeeCount > 0 ? coffeeCount : "" }
                onChange={changeCoffeeAmount}
                onKeyDown={handleCoffeeKey}
              />
            </div>
          </div>
          <div className="mt-[40px] flex flex-col gap-[12px]">
            <div className="text-[18px] font-semibold">
              Enter buyMeCoffee or social account URL:
            </div>
            <input
              type="text"
              placeholder="buymeacoffee.com/"
              className="outline-none border border-gray-300 px-[10px] w-full h-[35px] rounded-[5px] focus:border-orange-400"
            />
          </div>
          <div className="mt-[40px] flex flex-col gap-[12px]">
            <div className="text-[18px] font-semibold">Special message</div>
            <textarea
              className="outline-none border rounded-[5px] resize-none h-fit min-h-[140px] p-[10px] border-gray-300 focus:border-orange-400"
              placeholder={`Send your special thanks to ${profile.name}`}
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
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <button
                className={`text-white rounded-full w-full h-[40px] font-semibold mt-[20px] ${user.userId === profile.userId ? "bg-gray-400/50 cursor-not-allowed" : "bg-orange-400"}`}
                disabled={user.userId === profile.userId}
              >
                Support ${coffeeCount === 0 ? 1 : coffeeCount}
                {isMonthly && " / month"}
              </button>
            </DialogTrigger>

            <DialogContent className="flex flex-col items-center text-center w-fit p-[50px] gap-[50px]">
              <DialogTitle className="text-[25px] font-semibold flex flex-col gap-[15px]">
                Scan QR code ${coffeeCount === 0 ? 1 : coffeeCount}
                <p className="text-sm text-muted-foreground font-light">
                  Scan the QR code to complete your donation
                </p>
              </DialogTitle>
              <img
                src="../Lines.svg"
                className="w-[270px] h-[270px] absolute mt-[89px]"
              />
              <QRCodeCanvas
                className="mb-12 z-10"
                value="https://www.streamhub.com/wasteland7"
                size={200}
              />
              <button className="border px-[30px] py-[5px] bg-black text-white rounded-[10px] text-[18px]" onClick={()=>handleSend()}>Send</button>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </div>
  );
}
