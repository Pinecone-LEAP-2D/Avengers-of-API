"use client";

import LoginForm from "./_components/LoginForm";
import { useEffect } from "react";

export default function LoginPage() {
  useEffect(()=>{
    if(typeof window !== undefined){
      window.localStorage.clear();
    }
  },[])
  return (
    <div>
      <LoginForm />
    </div>
  );
}
