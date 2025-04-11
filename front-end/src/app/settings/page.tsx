"use client";

import Header from "@/components/Header";
import NavBar from "@/components/NavBar";
import SetNewPasswordForm from "./_components/SetPasswordForm";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Settings() {
      const router = useRouter();
  
      useEffect(()=>{
          if(typeof window !== undefined){
              if(!window.localStorage.token){
                  router.push("/login");
              }
          }
      },[])
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="flex flex-1 mt-[60px] px-8 gap-12">
        {/* Left sidebar */}
        <div className="w-[220px]">
          <NavBar location="settings" />
        </div>

        {/* Right content */}
        <div className="flex-1 flex justify-center">
          <SetNewPasswordForm />
        </div>
      </div>
    </div>
  );
}
