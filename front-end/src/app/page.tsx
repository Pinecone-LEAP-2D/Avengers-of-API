"use client";

import CoffeeLoading from "@/components/CoffeeLoading";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Main(){

  const router = useRouter();

  useEffect(()=>{
    if(typeof window !== undefined){
      if(window.localStorage.token){
        router.push("/home");
      }else{
        router.push("/login");
      }
    }
  },[])
    
  return (
    <CoffeeLoading />
  );
};