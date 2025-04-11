"use client";

import SignUpPage from "./_components/SignUpForm";
import { useEffect } from "react";

export default function LoginPage() {

    useEffect(()=>{
      if(typeof window !== undefined){
        window.localStorage.clear();
      }
    },[])

  return (
    <div className="">
      <SignUpPage />
    </div>
  );
}
