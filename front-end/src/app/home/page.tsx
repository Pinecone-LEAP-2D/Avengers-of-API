"use client";

import Header from "@/components/Header";
import HomeMenu from "./_components/HomeMenu";
import NavBar from "@/components/NavBar";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
      const router = useRouter();
  
      useEffect(()=>{
          if(typeof window !== undefined){
              if(!window.localStorage.token){
                  router.push("/login");
              }
          }
      },[])
      
  return (
    <div className="flex flex-col items-center">
      <Header />
      <div className="flex mt-[60px] gap-[100px]">
        <NavBar location={"home"} />
        <HomeMenu />
      </div>
    </div>
  );
}
