"use client";
import { useState, useEffect } from "react";
import ProfileHeader from "./components/ProfileHeader";
import StepOneProfileEdit from "./components/StepOne";
import { StepTwoProfileEdit } from "./components/StepTwo";

const ProfileUser = () => {
  const [step, setStep] = useState(1);


  return (
    <div className="min-h-screen p-8 pb-20 sm:p-10 font-sans grid grid-rows-[auto_1fr_auto] gap-16">
      <ProfileHeader />
      {step === 1 ? (
        <StepOneProfileEdit setStep={setStep} />
      ) : (
        <StepTwoProfileEdit />
      )}
    </div>
  );
};

export default ProfileUser;
