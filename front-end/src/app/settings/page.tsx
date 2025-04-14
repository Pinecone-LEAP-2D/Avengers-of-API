"use client";
import Header from "@/components/Header";
import NavBar from "@/components/NavBar";
import StepOneProfileEdit from "../create-profile/_components/profileUser/components/StepOne";
import SetNewPasswordForm from "./_components/SetPasswordForm";
import SuccessPage from "./_components/SuccessPage";
import BankCardForm from "./_components/BankCardForm";

export default function Settings() {
  return (
    <div className="flex flex-col items-center">
      <Header />
      <div className="flex mt-[60px] gap-[100px]">
        <NavBar location="settings" />
        <div className="w-[650px]">
          <h1 className="text-2xl font-bold mb-8">My Account</h1>
          <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
            <div className="p-4 [&_h1]:hidden">
              <h2 className="pl-5 text-lg font-bold">Personal Info</h2>
              <StepOneProfileEdit />
            </div>
          </div>
          <div className="mt-6 g-white rounded-lg border border-gray-200 overflow-hidden">
            <div className="p-4">
              <SetNewPasswordForm />
            </div>
          </div>
          <div className="mt-6 g-white rounded-lg border border-gray-200 overflow-hidden">
            <div className="p-4">
              <BankCardForm />
            </div>
          </div>
          <div className="mt-6 g-white rounded-lg border border-gray-200 overflow-hidden">
            <div className="p-4">
              <SuccessPage />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
