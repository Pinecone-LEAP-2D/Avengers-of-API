import { ArrowLeft, ArrowRight, Rabbit } from "lucide-react";
import { useEffect, useState } from "react";
import Link from "next/link";


export default function NotFound(){

      const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

      useEffect(() => {
        const handleMouseMove = (event: MouseEvent) => {
          setMousePosition({
            x: event.clientX,
            y: event.clientY,
          });
        };
    
        window.addEventListener('mousemove', handleMouseMove);
    
        return () => {
          window.removeEventListener('mousemove', handleMouseMove);
        };
      }, []);
      

    return (
        <div className="w-screen h-screen flex items-center justify-center bg-black flex-col gap-[0px]">
        <Rabbit className={`text-white w-[250px] h-[250px] ${window.screen.width/2 > mousePosition.x ? "transform scale-x-[-1]" : ""}`}/>
        <div className="text-[60px] text-white flex flex-col items-center">
          {/* <div className="text-[140px] font-bold">404</div> */}
          <div className="py-[10px] text-[30px] border-t-[2px] border-white text-center">The page you're looking<br /> for doesn't exist.</div>
        </div>
        <Link href="../home" className="mt-[500px] absolute flex border border-white rounded-full p-[10px] px-[30px] items-center gap-[10px]">
            <ArrowLeft className="text-white w-[15px] h-[15px]"/>
            <div className="text-white text-[19px]">Go to home page</div>
        </Link>
      </div>
    )
}