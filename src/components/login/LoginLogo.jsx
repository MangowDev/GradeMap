import React from "react";
import GrademapLogo from "../../assets/logo/GradeMapLogo.png";

export default function LoginLogo() {
  return (
    <div className="w-full">
      <div className="flex space-x-8 flex-row justify-center items-center">
        <div className="flex space-y-20 flex-col justify-end items-end w-full max-w-full">
          <div className="bg-primary w-[90%] h-2"></div>
          <div className="bg-primary w-[80%] h-2"></div>
        </div>
        <img src={GrademapLogo} alt="grademaplogo" className="w-100 h-100" />
        <div className="flex space-y-20 flex-col justify-end items-start w-full max-w-full">
          <div className="bg-primary w-[90%] h-2"></div>
          <div className="bg-primary w-[80%] h-2"></div>
        </div>
      </div>
      <div className="flex space-x-8 flex-row mt-8 justify-center items-center w-full max-w-full">
        <div className="flex space-y-20 flex-col justify-end items-end w-full max-w-full">
          <div className="bg-primary w-[70%] h-2"></div>
        </div>
        <h1 className="text-6xl text-white font-josefin">GradeMap</h1>
        <div className="flex space-y-20 flex-col justify-start items-start w-full max-w-full">
          <div className="bg-primary w-[70%] h-2"></div>
        </div>
      </div>
    </div>
  );
}
