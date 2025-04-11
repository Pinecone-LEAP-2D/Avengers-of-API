"use client";

import Header from "@/components/Header";
import ExploreMenu from "./_components/ExploreMenu";
import NavBar from "@/components/NavBar";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home(){
    const router = useRouter();

    useEffect(()=>{
        if(typeof window !== undefined){
            if(!window.localStorage.token){
                router.push("/login");
            }
        }
    },[])

    return(
        <div className="flex flex-col items-center">
            <Header />
            <div className="flex mt-[60px] gap-[100px]">
                <NavBar location="explore"/>
                <ExploreMenu />
            </div>
        </div>
    )
}