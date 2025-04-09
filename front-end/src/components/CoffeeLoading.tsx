"use client";

import React, { useEffect, useState } from "react";
import Header from "./Header";

const CoffeeLoading = () => {
  const [dotCount, setDotCount] = useState(1);
  const [increasing, setIncreasing] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setDotCount((prev) => {
        if (prev === 3) setIncreasing(false);
        if (prev === 1) setIncreasing(true);
        return increasing ? prev + 1 : prev - 1;
      });
    }, 500);
    return () => clearInterval(interval);
  }, [increasing]);

  return (
    <div className="h-screen">
      <Header />

      <div className="flex flex-col items-center justify-center h-[calc(100vh-250px)] bg-white">
        {/* Coffee beans animation */}
        <div className="flex">
          <img src="./coffee-loading.gif" alt="" />
          {/* <div className="w-20 h-25 bg-[url('/coffee-bean.png')] bg-contain bg-no-repeat animate-bounce [animation-delay:0s]"></div>
          <div className="w-20 h-25 bg-[url('/coffee-bean.png')] bg-contain bg-no-repeat animate-bounce [animation-delay:0.2s] "></div>
          <div className="w-20 h-25 bg-[url('/coffee-bean.png')] bg-contain bg-no-repeat animate-bounce [animation-delay:0.4s] "></div> */}
        </div>

        {/* Loading text with animated dots */}
        <h1 className="text-2xl font-bold text-black">
          Loading{".".repeat(dotCount)}
        </h1>
      </div>
    </div>
  );
};

export default CoffeeLoading;
