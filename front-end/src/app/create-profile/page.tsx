"use client";

import CoffeeLoading from "@/components/CoffeeLoading";
import ProfileUser from "./_components/profileUser/page";
import { useEffect, useState } from "react";
import { fetchProfile } from "@/lib/fetchProfile";
import jwt from "jsonwebtoken";
import { useRouter } from "next/navigation";

export const Home = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  
  useEffect(() => {
    const checkProfile = async () => {
      if (typeof window !== "undefined") {
        const token = window.localStorage.getItem("token");
        if (token) {
          const decode = jwt.decode(token);
          if (decode && typeof decode === "object" && "userId" in decode) {
            const id = decode.userId;
            
            const res = await fetchProfile(id);
            
            if (res !== "No profile") {
              router.push("/home");
            }
          }
        }
      }
      setIsLoading(false);
    };
    
    checkProfile();
    
    
  }, []);


  if (isLoading) {
    return <CoffeeLoading />;
  }else{
    return <ProfileUser />;
  }
};

export default Home;
