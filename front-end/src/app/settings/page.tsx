"use client";
import Header from "@/components/Header";
import NavBar from "@/components/NavBar";
import StepOneProfileEdit from "../create-profile/_components/profileUser/components/StepOne";
import StepTwoProfileEdit from "../create-profile/_components/profileUser/components/StepTwo";
import SetNewPasswordForm from "./_components/SetPasswordForm";

export default function Settings() {
  return (
    <div className="flex flex-col items-center">
      <Header />
      <div className="flex mt-[60px] gap-[100px]">
        <NavBar location="settings" />
        <div>
          <div>
            <StepOneProfileEdit />
          </div>
          <div className="mt-[60px]">
            <SetNewPasswordForm />
          </div>
          <div className="mt-[60px]">
            <StepTwoProfileEdit />
          </div>
        </div>
      </div>
    </div>
  );
}
